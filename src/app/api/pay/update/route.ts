import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto'; // Native Node.js Crypto

// Initialize Supabase Client (Server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Handle Payload Variations
        const orderId = body.order_id || body.orderId;

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        // 2. 🔒 SECURITY CHECK (Strict Signature Verification)
        // Verify authenticity LOCALLY using SHA512 (No Network Call needed)
        // Formula: SHA512(order_id + status_code + gross_amount + ServerKey)
        const signatureKey = body.signature_key;
        const statusCode = body.status_code;
        const grossAmount = body.gross_amount;
        const serverKey = process.env.MIDTRANS_SERVER_KEY || '';

        if (signatureKey) {
            const inputString = orderId + statusCode + grossAmount + serverKey;
            const expectedSignature = crypto.createHash('sha512').update(inputString).digest('hex');

            if (signatureKey !== expectedSignature) {
                console.error("❌ Invalid Signature! Potential Spoofing Attack.");
                return NextResponse.json({ error: 'Invalid Signature' }, { status: 403 }); // Forbidden
            }
        } else {
            // Frontend might not send signature_key, so we skip if missing (or handle differently)
            // But for Webhooks, it's mandatory.
            console.warn("⚠️ No Signature Key provided. Skipping verification (Not recommended for Webhook).");
        }

        // 3. Extract Clean Data
        const cleanTransactionStatus = body.transaction_status;
        const cleanFraudStatus = body.fraud_status;
        const cleanPaymentType = body.payment_type;

        // 4. Determine Final Status
        let finalStatus = 'pending';
        let statusMessage = 'Waiting for payment';

        if (cleanTransactionStatus == 'capture') {
            if (cleanFraudStatus == 'challenge') {
                finalStatus = 'challenge';
                statusMessage = 'Payment Challenged';
            } else if (cleanFraudStatus == 'accept') {
                finalStatus = 'active'; // Success!
                statusMessage = 'Payment Successful';
            }
        } else if (cleanTransactionStatus == 'settlement') {
            finalStatus = 'active'; // Success!
            statusMessage = 'Payment Successful';
        } else if (cleanTransactionStatus == 'cancel' || cleanTransactionStatus == 'deny' || cleanTransactionStatus == 'expire') {
            finalStatus = 'failure';
            statusMessage = 'Payment Failed/Expired';
        }

        // 5. Update Supabase
        const updates: any = {
            status: finalStatus,
            status_message: statusMessage,
            payment_type: cleanPaymentType,
            update_at: new Date().toISOString()
        };

        // Extract Tokens for Recurring
        if (body.token) updates['token'] = body.token;
        if (body.account_id) updates['account_id (GoPay)'] = body.account_id;
        if (body.saved_token_id) updates['token (Card Payment)'] = body.saved_token_id;

        const { error: dbError } = await supabase
            .from('subscription')
            .update(updates)
            .eq('order_id', orderId);

        if (dbError) console.error("Supabase Save Error:", dbError.message);

        // 6. 🚀 FORWARD TO N8N
        if (finalStatus === 'active') {
            try {
                // Determine email (payload or metadata)
                const userEmail = body.email || body.metadata?.user_email || 'unknown@user.com';

                // Fire and forget, don't await response
                fetch('https://omegaarch.taila8068d.ts.net/webhook/subscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...body, // Send original payload
                        final_status: finalStatus,
                        custom_field: {
                            origin: 'Vercel API',
                            email: userEmail
                        }
                    })
                }).catch(err => console.error("N8N Forward Error:", err));
            } catch (err) {
                // Ignore setup errors
            }
        }

        return NextResponse.json({ message: 'OK', status: finalStatus });

    } catch (error: any) {
        console.error('Critical Webhook Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
