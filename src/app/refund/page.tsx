"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

const RefundPage = () => {
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
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">Refund <span className="text-pink-500">Policy</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-16">
                        We believe in Kairi Kana. But if you don't find your flow, we've got you covered.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: <RefreshCcw className="text-pink-500" />, title: "14-Day Guarantee", desc: "If you are not satisfied with the service within the first 14 days, you are eligible for a full refund." },
                        { icon: <ShieldCheck className="text-purple-500" />, title: "Secure Process", desc: "Refunds are processed securely back to your original payment method via Paddle." },
                        { icon: <Mail className="text-blue-500" />, title: "Contact Support", desc: "To initiate a refund, simply email our support team. No questions asked." }
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
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">1. Eligibility for Refund</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>You are within the first 14 days of your initial subscription purchase.</li>
                            <li>The service was not functioning as described due to technical issues on our end.</li>
                            <li>You have not violated our Terms of Service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">2. Non-Refundable Items</h2>
                        <p>There are certain situations where only partial refunds are granted or denied (if applicable):</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Any request made more than 14 days after purchase.</li>
                            <li>Renewal payments where the user failed to cancel before the billing cycle.</li>
                            <li><strong>Exceptions:</strong> Refunds are not available if the user has violated our Terms of Service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">3. How to Request a Refund</h2>
                        <p>To start a refund request, please email us at <strong>acelevateglobal@gmail.com</strong> (or your designated support email) with your order ID and the email address used for purchase. We will notify you of the approval or rejection of your refund within 2 business days.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-sm">4. Processing Time</h2>
                        <p>If your refund is approved, it will be processed, and a credit will automatically be applied to your credit card or original method of payment, typically within 5-10 business days depending on your bank.</p>
                    </section>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 pt-12 border-t border-white/10 text-center"
                >
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Last Updated: January 2026</p>
                    <p className="text-xs text-slate-600 mt-2">Ace Elevate &copy; 2026</p>
                </motion.div>

            </div>
        </div>
    );
};

export default RefundPage;
