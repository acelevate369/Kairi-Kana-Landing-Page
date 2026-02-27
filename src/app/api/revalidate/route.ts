import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret');

        // Validate secret
        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
        }

        // Parse optional body for specific slug revalidation
        let slug: string | null = null;
        try {
            const body = await request.json();
            slug = body.slug || null;
        } catch {
            // No body or invalid JSON — revalidate all blog pages
        }

        // Revalidate blog list pages
        revalidatePath('/blog');
        revalidatePath('/id/blog');

        // Revalidate specific post if slug provided
        if (slug) {
            revalidatePath(`/blog/${slug}`);
            revalidatePath(`/id/blog/${slug}`);
        }

        return NextResponse.json({
            revalidated: true,
            slug: slug || 'all',
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('Revalidation Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
