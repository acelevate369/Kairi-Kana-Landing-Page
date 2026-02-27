"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ghost, ArrowLeft, Zap } from 'lucide-react';

export default function NotFound() {
    const [isID, setIsID] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsID(window.location.pathname.startsWith('/id'));

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const t = {
        subtitle: isID ? 'DIMENSI TIDAK DITEMUKAN' : 'DIMENSION NOT FOUND',
        desc: isID
            ? 'Kamu tersesat di void digital. Halaman ini tidak ada — atau mungkin belum ada.'
            : "You've drifted into the digital void. This page doesn't exist — or maybe it doesn't exist yet.",
        back: isID ? 'KEMBALI KE BERANDA' : 'BACK TO HOME',
        homeLink: isID ? '/id' : '/',
        explore: isID ? 'JELAJAHI BLOG' : 'EXPLORE BLOG',
        blogLink: isID ? '/id/blog' : '/blog',
    };

    // Fixed particle positions (deterministic — no Math.random to avoid hydration mismatch)
    const particles = [
        { id: 0, x: 5, y: 12, size: 2, duration: 12, delay: 0 },
        { id: 1, x: 15, y: 45, size: 3, duration: 15, delay: 1 },
        { id: 2, x: 25, y: 78, size: 1.5, duration: 11, delay: 2 },
        { id: 3, x: 35, y: 30, size: 4, duration: 18, delay: 0.5 },
        { id: 4, x: 45, y: 65, size: 2, duration: 13, delay: 3 },
        { id: 5, x: 55, y: 20, size: 3.5, duration: 16, delay: 1.5 },
        { id: 6, x: 65, y: 85, size: 1, duration: 14, delay: 4 },
        { id: 7, x: 75, y: 40, size: 2.5, duration: 17, delay: 2.5 },
        { id: 8, x: 85, y: 55, size: 3, duration: 12, delay: 0.8 },
        { id: 9, x: 92, y: 15, size: 1.5, duration: 19, delay: 3.5 },
        { id: 10, x: 10, y: 90, size: 4, duration: 11, delay: 1.2 },
        { id: 11, x: 30, y: 50, size: 2, duration: 15, delay: 4.5 },
        { id: 12, x: 50, y: 8, size: 3, duration: 13, delay: 0.3 },
        { id: 13, x: 70, y: 72, size: 1.5, duration: 16, delay: 2.8 },
        { id: 14, x: 88, y: 35, size: 2.5, duration: 14, delay: 1.8 },
    ];

    return (
        <div className="min-h-screen bg-[#01040D] text-slate-200 font-sans selection:bg-pink-500/30 overflow-hidden relative flex items-center justify-center">

            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <motion.div
                    animate={{
                        x: mousePos.x * 0.02 - 20,
                        y: mousePos.y * 0.02 - 20,
                    }}
                    transition={{ type: "spring", damping: 50 }}
                    className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-purple-600/15 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{
                        x: -mousePos.x * 0.015 + 15,
                        y: -mousePos.y * 0.015 + 15,
                    }}
                    transition={{ type: "spring", damping: 50 }}
                    className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-pink-600/15 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[200px] rounded-full"
                />
            </div>

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white/20"
                    style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.6, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Grid Pattern Overlay */}
            <div
                className="fixed inset-0 opacity-[0.03] -z-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Main Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

                {/* Glitch 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mb-8"
                >
                    {/* Shadow layers for depth */}
                    <motion.span
                        animate={{ x: [0, -3, 3, -1, 0], y: [0, 2, -2, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                        className="absolute inset-0 text-[12rem] md:text-[20rem] font-black text-pink-500/20 italic tracking-tighter leading-none select-none blur-sm"
                    >
                        404
                    </motion.span>
                    <motion.span
                        animate={{ x: [0, 2, -2, 1, 0], y: [0, -1, 1, -2, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 3 }}
                        className="absolute inset-0 text-[12rem] md:text-[20rem] font-black text-blue-500/15 italic tracking-tighter leading-none select-none blur-sm"
                    >
                        404
                    </motion.span>
                    <span className="relative text-[12rem] md:text-[20rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 italic tracking-tighter leading-none block">
                        404
                    </span>
                </motion.div>

                {/* Ghost Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-6"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                    >
                        <Ghost size={32} className="text-pink-500" />
                    </motion.div>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8"
                >
                    <Zap size={12} className="text-pink-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                        {t.subtitle}
                    </span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-medium max-w-lg mx-auto"
                >
                    {t.desc}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href={t.homeLink}>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-pink-500 hover:text-white transition-colors shadow-xl"
                        >
                            <ArrowLeft size={16} />
                            {t.back}
                        </motion.button>
                    </Link>
                    <Link href={t.blogLink}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-slate-300 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
                        >
                            {t.explore}
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Bottom Branding */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20 flex flex-col items-center gap-3"
                >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] italic">
                        Kairi Kana — Kill the Chaos
                    </p>
                </motion.div>
            </div>

            {/* Scanline Effect */}
            <div
                className="fixed inset-0 pointer-events-none z-20 opacity-[0.015]"
                style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
                }}
            />
        </div>
    );
}
