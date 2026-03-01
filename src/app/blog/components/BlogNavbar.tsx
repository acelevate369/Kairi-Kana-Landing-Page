"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import KairiLogoImg from '../../Logo_Kairi_Kana.png';

const KairiLogo = () => (
    <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    >
        <Image
            src={KairiLogoImg}
            alt="Kairi Kana Logo"
            width={32}
            height={32}
        />
    </motion.div>
);

interface BlogNavbarProps {
    homeHref?: string;
    isPost?: boolean; // true when inside a blog post
}

export default function BlogNavbar({ homeHref = "/", isPost = false }: BlogNavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const blogHref = homeHref === '/id' ? '/id/blog' : '/blog';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled ? 'pt-4' : 'pt-6'}`}>
            <div
                className={`
                    flex justify-between items-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] w-full
                    ${scrolled
                        ? 'max-w-[90%] md:max-w-[60%] bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20 rounded-full py-3 px-6'
                        : 'max-w-7xl bg-transparent border-transparent py-4 px-6'}
                `}
            >
                {/* Logo */}
                <Link href={homeHref} className="flex items-center space-x-3 group">
                    <div className={`p-1.5 rounded-full transition-all duration-500 ${scrolled ? 'bg-gradient-to-tr from-pink-500/20 to-purple-500/20' : 'bg-transparent'}`}>
                        <KairiLogo />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tighter text-white leading-none italic uppercase group-hover:text-pink-400 transition">KAIRI</span>
                        {!scrolled && <span className="text-[9px] font-bold tracking-[0.3em] text-pink-500/80 uppercase">Kana</span>}
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className={`hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-80'}`}>
                    <Link href={homeHref} className="hover:text-white transition-colors duration-300 relative group py-2">
                        HOME
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {isPost ? (
                        <Link href={blogHref} className="hover:text-white transition-colors duration-300 relative group py-2">
                            BLOG
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ) : (
                        <span className="text-pink-500 cursor-default py-2">
                            BLOG
                        </span>
                    )}
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden flex items-center gap-4">
                    {isPost ? (
                        <Link
                            href={blogHref}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
                        >
                            <ArrowLeft size={14} />
                            BLOG
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={homeHref}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
                            >
                                <ArrowLeft size={14} />
                                HOME
                            </Link>
                            <span className="text-pink-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <BookOpen size={12} />
                                BLOG
                            </span>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
