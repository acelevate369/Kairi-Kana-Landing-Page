"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const TermsPage = () => {
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
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">Terms of <span className="text-purple-500">Service</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-16">
                        By using Kairi Kana, you agree to enter the Flow state. Here are the rules of engagement for our digital ecosystem.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: <BookOpen className="text-purple-500" />, title: "Usage Policy", desc: "Use Kairi for productivity and growth. Do not use for illegal activities or harassment." },
                        { icon: <RefreshCw className="text-pink-500" />, title: "Subscriptions", desc: "Subscriptions are billed monthly. You can cancel anytime, but flow requires consistency." },
                        { icon: <AlertCircle className="text-blue-500" />, title: "AI Limitations", desc: "Kairi is an AI. While highly accurate, she may occasionally hallucinate. Verified facts are your responsibility." }
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
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">1. Acceptance of Terms</h2>
                        <p>By accessing or using the Kairi Kana service via WhatsApp or our web interface, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">2. Service Description</h2>
                        <p>Kairi Kana is an AI-powered personal assistant service provided by Ace Elevate. We reserve the right to modify, suspend, or discontinue the service at any time, though we will aim to provide reasonable notice.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">3. User Responsibilities</h2>
                        <p>You are responsible for safeguarding the WhatsApp account used to access the service. You agree not to reverse engineer the AI, attempt to bypass rate limits, or send malicious payloads to our infrastructure.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">4. Limitation of Liability</h2>
                        <p>Ace Elevate shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">5. Changes to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes through our official channels.</p>
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 pt-12 border-t border-white/10 text-center"
                >
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Effective Date: January 2024</p>
                </motion.div>

            </div>
        </div>
    );
};

export default TermsPage;
