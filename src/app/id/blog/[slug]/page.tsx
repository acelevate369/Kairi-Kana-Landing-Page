import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BlogNavbar from '../../../blog/components/BlogNavbar';

export const revalidate = 3600;

export async function generateStaticParams() {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Artikel Tidak Ditemukan' };
    }

    const keywords = Array.isArray(post.keywords)
        ? post.keywords
        : typeof post.keywords === 'string'
            ? post.keywords.split(',').map((k: string) => k.trim())
            : [];

    return {
        title: post.title,
        description: post.meta_description,
        keywords,
        openGraph: {
            title: post.title,
            description: post.meta_description,
            url: `https://kairikana.vercel.app/id/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.published_at,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.meta_description,
        },
    };
}

export default async function BlogPostPageID({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const date = new Date(post.published_at).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const keywords = Array.isArray(post.keywords)
        ? post.keywords
        : typeof post.keywords === 'string'
            ? post.keywords.split(',').map((k: string) => k.trim())
            : [];

    return (
        <div className="min-h-screen bg-[#01040D] text-slate-200 font-sans selection:bg-pink-500/30">
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
            </div>

            <BlogNavbar homeHref="/id" />

            <article className="pt-40 pb-32 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-6">
                        <Calendar size={12} />
                        <span>{date}</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1] uppercase italic">
                        {post.title}
                    </h1>

                    <p className="text-lg text-slate-400 leading-relaxed mb-12 border-l-2 border-pink-500/50 pl-6 italic">
                        {post.meta_description}
                    </p>

                    {keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-12">
                            {keywords.map((kw: string, i: number) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider"
                                >
                                    <Tag size={10} />
                                    {kw}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

                    <div className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
                        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:uppercase prose-h2:italic
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-pink-400 prose-a:no-underline hover:prose-a:text-pink-300
                        prose-strong:text-white prose-strong:font-bold
                        prose-ul:text-slate-300 prose-ol:text-slate-300
                        prose-li:mb-2
                        prose-blockquote:border-pink-500/50 prose-blockquote:text-slate-400 prose-blockquote:italic
                        prose-code:text-pink-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
                        prose-pre:bg-[#0F172A] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
                        prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                        prose-hr:border-white/10
                    ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ src, alt, ...props }) => {
                                    const encodedSrc = src ? encodeURI(decodeURI(String(src))) : '';
                                    return (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={encodedSrc}
                                            alt={alt || ''}
                                            loading="lazy"
                                            className="rounded-2xl border border-white/10 w-full"
                                            {...props}
                                        />
                                    );
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center">
                        <Link
                            href="/id/blog"
                            className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors text-xs font-black uppercase tracking-widest"
                        >
                            <ArrowLeft size={14} />
                            Kembali ke Blog
                        </Link>
                        <Link
                            href="/id"
                            className="text-slate-600 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                        >
                            Beranda
                        </Link>
                    </div>
                </div>
            </article>

            <footer className="py-12 px-6 border-t border-white/5 text-center">
                <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest italic">© 2026 Ace Elevate Global.</p>
            </footer>
        </div>
    );
}
