import { NextResponse } from 'next/server';
import { snap } from '@/lib/midtrans';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase Client (Server-side)
// Initialize Supabase Client (Server-side)
// CRITICAL: Use Service Role Key to bypass RLS policies for backend processing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, email, phone, tierId, price, timezone } = body;

        // Input Validation
        if (!firstName || !email || !phone || !tierId || !price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // Validate tier ID
        const validTiers = ['T0', 'T1', 'T2', 'T3'];
        if (!validTiers.includes(tierId)) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
        }

        // 1. Generate Order ID (UUID)
        const orderId = uuidv4();
        const grossAmount = parseInt(price.replace(/[^0-9]/g, ''));
        const cleanPhone = phone.replace(/[^0-9]/g, '');

        // Validate parsed amount
        if (!grossAmount || grossAmount <= 0) {
            return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
        }

        // 2. Prepare Midtrans Parameter
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount,
            },
            customer_details: {
                first_name: firstName,
                email: email,
                phone: cleanPhone, // Use cleaned phone
            },
            item_details: [
                {
                    id: tierId,
                    price: grossAmount,
                    quantity: 1,
                    name: `Subscription ${tierId}`,
                }
            ],
            // METADATA: This will be sent back to your n8n Webhook!
            metadata: {
                timezone: timezone || 'Asia/Jakarta', // Default if missing
                tier: tierId,
                whatsapp: cleanPhone,
                user_email: email
            },
            // Enable common payment methods
            enabled_payments: ['credit_card', 'gopay', 'shopeepay', 'bca_va', 'bri_va', 'bni_va', 'mandiri_clickpay', 'cimb_clicks', 'echannel'],
            credit_card: {
                secure: false, // Temporarily disabled for sandbox testing
                save_card: true, // MANDATORY for Subscription/Recurring
            },
            gopay: {
                enable_callback: true, // For GoPay Tokenization if supported
            },
        };

        // 3. Create 'Pending' Record in `subscription` table
        // Note: cleanPhone is already defined above

        const subscriptionSchedule = {
            interval: 1,
            interval_unit: 'month',
            max_billing: 12, // Default 1 year subscription
            start_time: new Date().toISOString()
        };

        const customerDetails = {
            first_name: firstName,
            email: email,
            phone: phone,
        };

        const { data: dbData, error: dbError } = await supabase
            .from('subscription')
            .insert([
                {
                    order_id: orderId,
                    name: firstName,
                    // If user_id is missing, we prioritize getting the token. 
                    // N8N webhook will handle user reconciliation.
                    name_transaction: `Subscription ${tierId}`,
                    whatsapp_number: parseInt(cleanPhone) || 0,
                    amount: grossAmount,
                    status: 'pending', // Restored as User added column back
                    payment_type: 'unknown', // Will be updated by webhook

                    created_at: new Date().toISOString(),
                    // New Fields for Midtrans Subscription Compatibility
                    currency: 'IDR',
                    schedule: subscriptionSchedule,
                    customer_details: customerDetails,
                    status_message: 'Waiting for payment',
                    email: email, // Populating explicit email column
                    max_billing: 12, // Default max_billing
                    // Tokens will be updated after successful payment
                }
            ])
            .select();

        if (dbError) {
            console.error("Supabase Insert Error:", dbError.message);
        }

        // 4. Get Token from Midtrans
        const token = await snap.createTransaction(parameter);

        return NextResponse.json({ token: token.token, orderId });
    } catch (error: any) {
        console.error('Midtrans API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
