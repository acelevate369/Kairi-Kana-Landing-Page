import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPublishedPosts } from '@/lib/blog';
import { Calendar, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export const revalidate = 3600; // ISR: revalidate every 1 hour

export const metadata: Metadata = {
    title: 'Blog - Insights & Articles',
    description: 'Explore articles on AI productivity, personal growth, financial management, and how to optimize your life with Kairi Kana.',
    keywords: ['Kairi Kana Blog', 'AI Productivity', 'Personal Growth', 'Financial Management', 'Agentic AI'],
    openGraph: {
        title: 'Blog - Kairi Kana',
        description: 'Explore articles on AI productivity, personal growth, and financial management.',
        url: 'https://kairikana.vercel.app/blog',
        type: 'website',
    },
};

export default async function BlogPage() {
    const posts = await getAllPublishedPosts();

    return (
        <div className="min-h-screen bg-[#01040D] text-slate-200 font-sans selection:bg-pink-500/30">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
            </div>

            {/* Minimal Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
                <div className="flex justify-between items-center w-full max-w-7xl py-4 px-6">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tighter text-white leading-none italic uppercase group-hover:text-pink-400 transition">KAIRI</span>
                            <span className="text-[9px] font-bold tracking-[0.3em] text-pink-500/80 uppercase">Kana</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center space-x-2 text-[10px] font-bold">
                            <span className="text-white cursor-default">En</span>
                            <span className="text-white/20">|</span>
                            <Link href="/id/blog" className="text-slate-500 hover:text-white transition-colors">Id</Link>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
                        >
                            <ArrowLeft size={14} />
                            HOME
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-40 pb-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                        <BookOpen size={14} className="text-pink-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Insights & Articles</span>
                    </div>
                    <h1 className="text-5xl lg:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter">
                        Blog
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">
                        AGENTIC AI • CHAOS MANAGEMENT • FINANCIAL SURVIVAL
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-5xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen size={32} className="text-slate-600" />
                            </div>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No articles yet</p>
                            <p className="text-slate-700 text-xs mt-2">New content is on its way. Stay tuned.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {posts.map((post) => {
                                const date = new Date(post.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                });
                                return (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-pink-500/30 transition-all duration-500 hover:bg-white/[0.04] flex flex-col"
                                    >
                                        <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-4">
                                            <Calendar size={12} />
                                            <span>{date}</span>
                                        </div>
                                        <h2 className="text-xl lg:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-pink-400 transition-colors leading-tight">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-6">
                                            {post.meta_description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-pink-500 group-hover:text-pink-400 transition-colors">
                                            <span>Read More</span>
                                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 text-center">
                <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest italic">© 2026 Ace Elevate Global.</p>
            </footer>
        </div>
    );
}
