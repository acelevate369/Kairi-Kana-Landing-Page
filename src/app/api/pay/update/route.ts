import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { snap } from '@/lib/midtrans';

// Initialize Supabase Client (Server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Handle Payload Variations (Frontend vs Midtrans Webhook)
        // Midtrans Webhook uses 'order_id', Frontend might use 'orderId'
        const orderId = body.order_id || body.orderId;
        const transactionStatus = body.transaction_status;
        const fraudStatus = body.fraud_status;
        const paymentType = body.payment_type;

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        // 2. 🔒 SECURITY CHECK: Verify Status with Midtrans
        // Always trust Midtrans Server State over the payload to prevent spoofing
        let midtransStatus;
        try {
            midtransStatus = await snap.transaction.status(orderId);
        } catch (midtransError) {
            console.error("Midtrans Verification Failed:", midtransError);
            return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
        }

        const cleanFraudStatus = midtransStatus.fraud_status;
        const cleanTransactionStatus = midtransStatus.transaction_status;
        const cleanPaymentType = midtransStatus.payment_type;

        // 3. Determine Final Status
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

        // 4. Update Supabase
        const updates: any = {
            status: finalStatus,
            status_message: statusMessage,
            payment_type: cleanPaymentType,
            update_at: new Date().toISOString()
        };

        // Extract Tokens for Recurring if available
        // Note: These might come from Frontend payload or Midtrans Metadata depending on flow
        if (body.token) updates['token'] = body.token;
        if (body.account_id) updates['account_id (GoPay)'] = body.account_id;
        if (body.saved_token_id) updates['token (Card Payment)'] = body.saved_token_id;

        const { error: dbError } = await supabase
            .from('subscription')
            .update(updates)
            .eq('order_id', orderId);

        if (dbError) throw new Error(dbError.message);

        // 5. 🚀 FORWARD TO N8N (The Critical Step)
        // Only forward if status is active/success to save n8n executions, or forward everything if you debug
        if (finalStatus === 'active') {
            try {
                await fetch('https://omegaarch.taila8068d.ts.net/webhook/subscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...midtransStatus, // Send full official Midtrans data
                        custom_field: {
                            origin: 'Vercel API',
                            email: body.email || midtransStatus.metadata?.user_email
                        }
                    })
                });
            } catch (n8nError) {
                console.error("N8N Forward Error (Non-blocking):", n8nError);
            }
        }

        return NextResponse.json({ message: 'OK', status: finalStatus });

    } catch (error: any) {
        console.error('Webhook Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
