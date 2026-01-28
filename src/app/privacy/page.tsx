"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, EyeOff } from 'lucide-react';
import Link from 'next/link';

const PrivacyPage = () => {
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
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs uppercase tracking-widest font-bold">Back to Kairi</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">Privacy <span className="text-pink-500">Manifesto</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-16">
                        Kairi Kana is built on a simple premise: <strong>Your data is yours.</strong> We do not sell your personal data. We do not train public models on your private conversations without consent.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: <Lock className="text-pink-500" />, title: "Enterprise Encryption", desc: "All your data stays in an encrypted, high-security database environment. We use industry-standard AES-256 for data at rest." },
                        { icon: <Shield className="text-blue-500" />, title: "WhatsApp Security", desc: "We leverage WhatsApp's end-to-end encryption infrastructure for message delivery, ensuring no middleman interception." },
                        { icon: <EyeOff className="text-purple-500" />, title: "Private by Design", desc: "Your memories and logs are sandboxed. Only YOU and your personal Kairi instance have access to your context." }
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
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">1. Data Collection</h2>
                        <p>We collect only what is necessary to function: your phone number (for WhatsApp identification), your email (for account management), and the text/images you voluntarily send to Kairi Kana.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">2. How We Use Your Data</h2>
                        <p>Your inputs are processed by our specialized Multi-Model Context Engine to provide responses, organize your tasks, and track your habits. We <strong>never</strong> share your conversation logs with third-party advertisers.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">3. Data Storage & Security</h2>
                        <p>We utilize a secure, enterprise-grade cloud database infrastructure with Row Level Security (RLS) enabled. This means your data is logically isolated. Even within our own systems,strict access controls are in place to prevent unauthorized access.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">4. Your Rights</h2>
                        <p>You have the right to request a full export of your data or a complete deletion of your account (“Right to be Forgotten”) at any time by contacting our support.</p>
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 pt-12 border-t border-white/10 text-center"
                >
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Last Updated: January 2024</p>
                </motion.div>

            </div>
        </div>
    );
};

export default PrivacyPage;
