"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

const RefundPageId = () => {
    return (
        <div className="min-h-screen bg-[#01040D] text-slate-200 font-sans selection:bg-pink-500/30 overflow-x-hidden">
            {/* Background Overlay */}
            <div className="fixed inset-0 overflow-hidden -z-10 bg-[url('/noise.svg')] opacity-[0.03]"></div>

            <div className="max-w-4xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link href="/id" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs uppercase tracking-widest font-bold">Kembali ke Kairi</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">Kebijakan <span className="text-pink-500">Refund</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-16">
                        Kami percaya pada Kairi Kana. Namun jika Anda tidak menemukan "flow" Anda, kami siap membantu.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: <RefreshCcw className="text-pink-500" />, title: "Garansi 14 Hari", desc: "Jika Anda tidak puas dengan layanan dalam 14 hari pertama, Anda berhak mendapatkan pengembalian dana penuh." },
                        { icon: <ShieldCheck className="text-purple-500" />, title: "Proses Aman", desc: "Pengembalian dana diproses secara aman kembali ke metode pembayaran asli Anda melalui Paddle." },
                        { icon: <Mail className="text-blue-500" />, title: "Hubungi Support", desc: "Untuk memulai proses refund, cukup email tim support kami. Tanpa ribet." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="p-8 bg-white/5 border border-white/10 rounded-3xl"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-12 text-slate-400 leading-relaxed prose prose-invert prose-lg max-w-none"
                >
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">1. Syarat Pengembalian Dana</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Anda berada dalam periode 14 hari pertama sejak pembelian langganan awal.</li>
                            <li>Layanan tidak berfungsi sebagaimana dijelaskan karena masalah teknis di pihak kami.</li>
                            <li>Anda tidak melanggar Ketentuan Layanan kami.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">2. Item Non-Refundable</h2>
                        <p>Ada situasi tertentu di mana pengembalian dana hanya sebagian atau ditolak:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Permintaan diajukan lebih dari 14 hari setelah pembelian.</li>
                            <li>Pembayaran perpanjangan di mana pengguna lupa membatalkan sebelum siklus penagihan.</li>
                            <li><strong>Pengecualian:</strong> Pengembalian dana tidak tersedia jika pengguna telah melanggar Ketentuan Layanan kami.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">3. Cara Mengajukan Refund</h2>
                        <p>Untuk memulai permintaan refund, silakan email kami di <strong>acelevateglobal@gmail.com</strong> dengan ID pesanan dan alamat email yang digunakan saat pembelian. Kami akan memberitahu Anda tentang persetujuan atau penolakan refund Anda dalam waktu 2 hari kerja.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">4. Waktu Pemrosesan</h2>
                        <p>Jika refund Anda disetujui, refund akan diproses, dan kredit akan secara otomatis diterapkan ke kartu kredit atau metode pembayaran asli Anda, biasanya dalam waktu 5-10 hari kerja tergantung pada bank Anda.</p>
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 pt-12 border-t border-white/10 text-center"
                >
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Terakhir Diperbarui: Januari 2026</p>
                    <p className="text-xs text-slate-600 mt-2">Ace Elevate &copy; 2026</p>
                </motion.div>

            </div>
        </div>
    );
};

export default RefundPageId;
