import { MetadataRoute } from 'next';
import { getAllPublishedPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: 'https://kairikana.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kairikana.vercel.app/id',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kairikana.vercel.app/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://kairikana.vercel.app/id/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://kairikana.vercel.app/refund',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://kairikana.vercel.app/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://kairikana.vercel.app/privacy',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Dynamic blog post pages
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const posts = await getAllPublishedPosts();
        blogPages = posts.flatMap((post) => [
            {
                url: `https://kairikana.vercel.app/blog/${post.slug}`,
                lastModified: new Date(post.published_at),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            },
            {
                url: `https://kairikana.vercel.app/id/blog/${post.slug}`,
                lastModified: new Date(post.published_at),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            },
        ]);
    } catch {
        // If Supabase is unreachable, return static pages only
    }

    return [...staticPages, ...blogPages];
}
