import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Server-side Supabase client (uses service role key for full access)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Lemon Squeezy Webhook Handler (Production-Grade)
 * 
 * 1. Verifies HMAC SHA256 signature (rejects spoofed requests)
 * 2. Processes order_created & subscription_created events
 * 3. Updates Supabase subscription status
 * 4. Forwards to n8n for automation
 * 
 * Setup in Lemon Squeezy Dashboard → Settings → Webhooks:
 *   URL: https://kairikana.vercel.app/api/webhooks/lemonsqueezy
 *   Events: order_created, subscription_created, subscription_updated
 *   Signing Secret: (copy from LEMONSQUEEZY_WEBHOOK_SECRET env var)
 */
export async function POST(request: Request) {
    try {
        // 1. Get raw body for signature verification
        const rawBody = await request.text();

        // Body size check (max 50KB — Lemon Squeezy payloads can be larger)
        if (rawBody.length > 51200) {
            return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
        }

        const signature = request.headers.get('x-signature') || '';
        const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';

        // 2. 🔒 HMAC SHA256 Signature Verification
        if (!webhookSecret) {
            console.error('❌ LEMONSQUEEZY_WEBHOOK_SECRET not configured');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }

        const hmac = crypto.createHmac('sha256', webhookSecret);
        hmac.update(rawBody);
        const digest = hmac.digest('hex');

        if (signature !== digest) {
            console.error('❌ Invalid Lemon Squeezy Signature! Potential spoofing attack.');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
        }

        // 3. Parse verified payload
        const payload = JSON.parse(rawBody);
        const eventName = payload.meta?.event_name;
        const customData = payload.meta?.custom_data || {};

        // Extract relevant data from Lemon Squeezy payload
        const attributes = payload.data?.attributes || {};
        const orderId = customData.order_id || null;
        const customerEmail = attributes.user_email || customData.email || '';
        const customerName = attributes.user_name || customData.name || '';
        const status = attributes.status;
        const totalFormatted = attributes.total_formatted || attributes.first_order_item?.price_formatted || '';

        console.log(`📦 Lemon Squeezy Webhook: ${eventName} | Email: ${customerEmail} | Status: ${status}`);

        // 4. Determine final status based on event
        let finalStatus = 'pending';
        let statusMessage = 'Processing';

        if (eventName === 'order_created') {
            if (status === 'paid' || status === 'active') {
                finalStatus = 'active';
                statusMessage = 'Payment completed via Lemon Squeezy';
            } else if (status === 'refunded') {
                finalStatus = 'refunded';
                statusMessage = 'Payment refunded';
            } else {
                finalStatus = 'pending';
                statusMessage = `Order status: ${status}`;
            }
        } else if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
            if (status === 'active' || status === 'on_trial') {
                finalStatus = 'active';
                statusMessage = status === 'on_trial' ? 'Trial active via Lemon Squeezy' : 'Subscription active via Lemon Squeezy';
            } else if (status === 'cancelled' || status === 'expired') {
                finalStatus = 'cancelled';
                statusMessage = `Subscription ${status}`;
            } else if (status === 'paused') {
                finalStatus = 'paused';
                statusMessage = 'Subscription paused';
            }
        }

        // 5. Update Supabase (match by order_id if available, otherwise by email)
        if (orderId) {
            const { error: dbError } = await supabase
                .from('subscription')
                .update({
                    status: finalStatus,
                    status_message: statusMessage,
                    payment_type: 'lemonsqueezy',
                    update_at: new Date().toISOString()
                })
                .eq('order_id', orderId);

            if (dbError) console.error('Supabase Update Error (by order_id):', dbError.message);
        } else if (customerEmail) {
            // Fallback: match by email + pending status
            const { error: dbError } = await supabase
                .from('subscription')
                .update({
                    status: finalStatus,
                    status_message: statusMessage,
                    payment_type: 'lemonsqueezy',
                    update_at: new Date().toISOString()
                })
                .eq('email', customerEmail)
                .eq('status', 'pending')
                .order('created_at', { ascending: false })
                .limit(1);

            if (dbError) console.error('Supabase Update Error (by email):', dbError.message);
        }

        // 6. 🚀 Forward to n8n (only for successful payments)
        if (finalStatus === 'active') {
            try {
                // Calculate subscription end date dynamically
                // Priority: trial_ends_at > renews_at > fallback +1 month
                let subscriptionEndDate: string;
                if (attributes.trial_ends_at) {
                    // Trial period (14 days from Lemon Squeezy)
                    subscriptionEndDate = attributes.trial_ends_at;
                } else if (attributes.renews_at) {
                    // Regular subscription renewal date
                    subscriptionEndDate = attributes.renews_at;
                } else {
                    // Fallback: 1 month from now (for one-time orders)
                    const endDate = new Date();
                    endDate.setMonth(endDate.getMonth() + 1);
                    subscriptionEndDate = endDate.toISOString();
                }

                fetch('https://omegaarch.taila8068d.ts.net/webhook/subscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        source: 'lemonsqueezy',
                        event: eventName,
                        final_status: finalStatus,
                        order_id: orderId,
                        name: customerName,
                        email: customerEmail,
                        whatsapp: customData.whatsapp || '',
                        total: totalFormatted,
                        payment_type: 'lemonsqueezy',
                        subscription_end_date: subscriptionEndDate,
                        is_trial: status === 'on_trial',
                        lemon_squeezy_data: attributes,
                        custom_field: {
                            origin: 'Vercel Webhook',
                            email: customerEmail
                        }
                    })
                }).catch(err => console.error('N8N Forward Error:', err));
            } catch {
                // Ignore setup errors
            }
        }

        return NextResponse.json({ message: 'OK', status: finalStatus });

    } catch (error: any) {
        console.error('Critical Lemon Squeezy Webhook Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
