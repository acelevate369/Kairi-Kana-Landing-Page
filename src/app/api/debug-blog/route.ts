import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const usedKey = serviceKey ? 'SERVICE_ROLE' : (anonKey ? 'ANON' : 'NONE');

    const supabase = createClient(supabaseUrl, serviceKey || anonKey || '');

    // Query 1: Get ALL rows (no filter)
    const { data: allRows, error: allError } = await supabase
        .from('blog')
        .select('id, title, slug, published_status, published_at')
        .limit(10);

    // Query 2: Get only published
    const { data: pubRows, error: pubError } = await supabase
        .from('blog')
        .select('id, title, slug, published_status')
        .eq('published_status', 'published');

    return NextResponse.json({
        debug: true,
        supabase_url: supabaseUrl,
        key_used: usedKey,
        has_service_key: !!serviceKey,
        has_anon_key: !!anonKey,
        all_rows: {
            count: allRows?.length || 0,
            data: allRows,
            error: allError?.message || null,
        },
        published_rows: {
            count: pubRows?.length || 0,
            data: pubRows,
            error: pubError?.message || null,
        },
    });
}
