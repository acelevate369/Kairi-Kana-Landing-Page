"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, EyeOff } from 'lucide-react';
import Link from 'next/link';

const PrivacyPageId = () => {
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
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">Manifesto <span className="text-pink-500">Privasi</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-16">
                        Kairi Kana dibangun di atas premis sederhana: <strong>Datamu adalah milikmu.</strong> Kami tidak menjual data pribadimu. Kami tidak melatih model publik dengan percakapan pribadimu tanpa izin.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: <Lock className="text-pink-500" />, title: "Enkripsi Enterprise", desc: "Semua datamu tersimpan di lingkungan database berkeamanan tinggi yang terenkripsi. Kami menggunakan standar AES-256 untuk data at rest." },
                        { icon: <Shield className="text-blue-500" />, title: "Keamanan WhatsApp", desc: "Kami memanfaatkan infrastruktur enkripsi end-to-end WhatsApp untuk pengiriman pesan, memastikan tidak ada penyadapan di tengah jalan." },
                        { icon: <EyeOff className="text-purple-500" />, title: "Privasi Desain", desc: "Memori dan log kamu di-sandbox. HANYA kamu dan instance Kairi pribadimu yang memiliki akses ke konteksmu." }
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
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">1. Pengumpulan Data</h2>
                        <p>Kami hanya mengumpulkan apa yang diperlukan untuk berfungsi: nomor teleponmu (untuk identifikasi WhatsApp), emailmu (untuk manajemen akun), dan teks/gambar yang secara sukarela kamu kirim ke Kairi Kana.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">2. Bagaimana Kami Menggunakan Datamu</h2>
                        <p>Inputmu diproses oleh Multi-Model Context Engine khusus kami untuk memberikan respons, mengatur tugas, dan melacak kebiasaanmu. Kami <strong>tidak pernah</strong> membagikan log percakapanmu dengan pengiklan pihak ketiga.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">3. Penyimpanan & Keamanan Data</h2>
                        <p>Kami menggunakan infrastruktur database cloud kelas enterprise yang aman dengan Row Level Security (RLS) yang diaktifkan. Ini berarti datamu terisolasi secara logis. Bahkan di dalam sistem kami sendiri, kontrol akses ketat diterapkan untuk mencegah akses tidak sah.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">4. Hak Kamu</h2>
                        <p>Kamu berhak meminta ekspor penuh datamu atau penghapusan total akunmu (“Hak untuk Dilupakan”) kapan saja dengan menghubungi dukungan kami.</p>
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 pt-12 border-t border-white/10 text-center"
                >
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Terakhir Diperbarui: Januari 2024</p>
                </motion.div>

            </div>
        </div>
    );
};

export default PrivacyPageId;
