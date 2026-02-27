import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    meta_description: string;
    keywords: string | string[];
    published_at: string;
    published_status: string;
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('published_status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error.message);
        return [];
    }

    return data || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('slug', slug)
        .eq('published_status', 'published')
        .single();

    if (error) {
        console.error('Error fetching blog post:', error.message);
        return null;
    }

    return data;
}

export async function getAllSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('blog')
        .select('slug')
        .eq('published_status', 'published');

    if (error) {
        console.error('Error fetching slugs:', error.message);
        return [];
    }

    return (data || []).map((post) => post.slug);
}
