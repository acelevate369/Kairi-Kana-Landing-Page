"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const TermsPageId = () => {
    return (
        <div className="min-h-screen bg-[#01040D] text-slate-200 font-sans selection:bg-pink-500/30 overflow-x-hidden">
            {/* Background Overlay */}
            <div className="fixed inset-0 overflow-hidden -z-10 bg-[url('/noise.png')] opacity-[0.03]"></div>

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
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">Syarat <span className="text-purple-500">Layanan</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-16">
                        Dengan menggunakan Kairi Kana, kamu setuju untuk memasuki state Flow. Berikut adalah aturan main untuk ekosistem digital kami.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: <BookOpen className="text-purple-500" />, title: "Kebijakan Penggunaan", desc: "Gunakan Kairi untuk produktivitas dan pertumbuhan. Jangan gunakan untuk aktivitas ilegal atau pelecehan." },
                        { icon: <RefreshCw className="text-pink-500" />, title: "Langganan", desc: "Langganan ditagih setiap bulan. Kamu bisa membatalkan kapan saja, tapi flow membutuhkan konsistensi." },
                        { icon: <AlertCircle className="text-blue-500" />, title: "Batasan AI", desc: "Kairi adalah AI. Meskipun sangat akurat, dia mungkin sesekali berhalusinasi. Fakta yang terverifikasi adalah tanggung jawabmu." }
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
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">1. Penerimaan Syarat</h2>
                        <p>Dengan mengakses atau menggunakan layanan Kairi Kana melalui WhatsApp atau antarmuka web kami, kamu setuju untuk terikat oleh Syarat ini. Jika kamu tidak setuju dengan bagian mana pun dari syarat ini, kamu tidak boleh mengakses layanan.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">2. Deskripsi Layanan</h2>
                        <p>Kairi Kana adalah layanan asisten pribadi berbasis AI yang disediakan oleh Ace Elevate. Kami berhak mengubah, menangguhkan, atau menghentikan layanan kapan saja, meskipun kami akan berusaha memberikan pemberitahuan yang wajar.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">3. Tanggung Jawab Pengguna</h2>
                        <p>Kamu bertanggung jawab untuk menjaga akun WhatsApp yang digunakan untuk mengakses layanan. Kamu setuju untuk tidak merekayasa balik (reverse engineer) AI, mencoba memecahkan batas kecepatan (rate limits), atau mengirim muatan berbahaya ke infrastruktur kami.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">4. Batasan Tanggung Jawab</h2>
                        <p>Ace Elevate tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, atau punitif yang diakibatkan oleh penggunaan atau ketidakmampuan menggunakan layanan.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">5. Perubahan Syarat</h2>
                        <p>Kami berhak mengubah syarat ini kapan saja. Kami akan memberikan pemberitahuan tentang perubahan signifikan melalui saluran resmi kami.</p>
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 pt-12 border-t border-white/10 text-center"
                >
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Tanggal Efektif: Januari 2024</p>
                </motion.div>

            </div>
        </div>
    );
};

export default TermsPageId;
