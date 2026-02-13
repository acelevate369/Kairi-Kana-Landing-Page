import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { snap } from '@/lib/midtrans'; // Ensure we have the Midtrans SDK initialized

// Initialize Supabase Client (Server-side)
// CRITICAL: Use Service Role Key to bypass RLS policies for backend processing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const { orderId, payment_type, token, account_id, email } = await request.json();

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        // 🔒 SECURITY CHECK: Don't trust the frontend status!
        // Verify directly with Midtrans Server to prevent spoofing.
        let transactionStatusResponse;
        try {
            transactionStatusResponse = await snap.transaction.status(orderId);
        } catch (midtransError) {
            console.error("Midtrans Status Check Failed:", midtransError);
            return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
        }

        const fraudStatus = transactionStatusResponse.fraud_status;
        const transactionStatus = transactionStatusResponse.transaction_status;

        // Determine Status based on Midtrans Response
        let finalStatus = 'pending';
        let statusMessage = 'Waiting for payment';

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'challenge') {
                finalStatus = 'challenge';
                statusMessage = 'Payment Challenged';
            } else if (fraudStatus == 'accept') {
                finalStatus = 'active'; // Success!
                statusMessage = 'Payment Successful';
            }
        } else if (transactionStatus == 'settlement') {
            finalStatus = 'active'; // Success!
            statusMessage = 'Payment Successful';
        } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
            finalStatus = 'failure';
            statusMessage = 'Payment Failed/Expired';
        } else if (transactionStatus == 'pending') {
            finalStatus = 'pending';
            statusMessage = 'Waiting for payment';
        }

        const updates: any = {
            status: finalStatus,
            status_message: statusMessage,
            update_at: new Date().toISOString()
        };

        if (payment_type) updates.payment_type = payment_type;

        // Kartu Kredit Token Logic
        if (payment_type === 'credit_card' && token) {
            updates['token (Card Payment)'] = token;
            updates['token'] = token;
        }

        // GoPay Token Logic
        if (payment_type === 'gopay') {
            if (token) updates['token (GoPay)'] = token;
            if (account_id) updates['account_id (GoPay)'] = account_id;
            if (token) updates['token'] = token;
        }

        if (email) updates.email = email;

        const { data, error: MxError } = await supabase
            .from('subscription')
            .update(updates)
            .eq('order_id', orderId)
            .select();

        if (MxError) {
            throw new Error(MxError.message);
        }

        return NextResponse.json({ message: 'Subscription verified & updated', status: finalStatus });
    } catch (error: any) {
        // console.error('Supabase Update Error:', error); // Cleaned up log
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
