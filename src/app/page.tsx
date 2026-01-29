"use client";

import { supabase } from '@/lib/supabaseClient';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Check,
  Cpu,
  User,
  MousePointer2,
  Ghost,
  Camera,
  FileText,

  TrendingUp,
  Instagram
} from 'lucide-react';
import KairiLogoImg from './Logo_Kairi_Kana.png';
import { SpotlightCard } from './components/SpotlightCard';

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const KairiLogo = () => (
  <motion.div
    animate={{ rotate: [0, 10, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
  >
    <Image src={KairiLogoImg} alt="Kairi Kana Logo" width={32} height={32} />
  </motion.div>
);

const App = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting to submit email:', email);

    if (!email) return;

    try {
      const { data, error } = await supabase
        .from('whitelist')
        .insert([{ email }]);

      if (error) {
        console.error('❌ Supabase Error:', error.message);
        alert('Failed to save email. Check console for details.');
      } else {
        console.log('✅ Email saved to Supabase:', data);

        // Trigger n8n Webhook
        try {
          console.log('🚀 Triggering n8n webhook...');
          await fetch('https://omegaarch.taila8068d.ts.net/webhook/aa9c0f66-344c-478e-8d65-6178c93b17f8', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          console.log('✅ n8n Webhook triggered successfully');
        } catch (webhookError) {
          console.error('⚠️ Failed to trigger n8n webhook:', webhookError);
        }

        setSubmitted(true);
      }
    } catch (err) {
      console.error('❌ Unexpected Error:', err);
    }
  };

  const pricingTiers = [
    {
      id: 'T1',
      name: 'Shoshin',
      price: '$3',
      status: 'Live',
      color: 'from-pink-500/20',
      sellingPoint: 'Kill your manual admin. Just snap and chat.',
      features: [
        'Multimodal Vision: Turn photos of boards, receipts, or notes into digital data.',
        'Task & Habit Loop: Standard task management with smart habit tracking & XP points.',
        'Smart Scheduling: Tell Kairi your free slots, and she will map your tasks automatically.',
        'Simplified WhatsApp Assistant Access'
      ],
      popular: true
    },
    {
      id: 'T2',
      name: 'Sensei',
      price: 'Coming Soon',
      status: 'Waitlist',
      color: 'from-purple-500/20',
      sellingPoint: 'Your research assistant and life coach in one chat.',
      features: [
        'PDF/Document Analysis (RAG): Upload PDFs and ask questions or request summaries.',
        'The Challenge: Daily mini-tasks based on your habits to keep you disciplined.',
        'Deep Journaling: Reflective AI interaction acting as your personal life coach.',
        'Extended Memory Context'
      ],

    },
    {
      id: 'T3',
      name: 'Ethereal',
      price: 'Coming Soon',
      status: 'Waitlist',
      color: 'from-blue-500/20',
      sellingPoint: 'Architect of your future. Turn data into success.',
      features: [
        'Future Self Projection: Data-driven projection of your life patterns 5 years ahead.',
        'Financial Genius: Deep audits, investment simulations, and leak detection.',
        'Integrated Learning Path: Custom learning curriculum auto-generated for you.',
        'Pure Unquantized SOTA Model Access'
      ]
    },
    {
      id: 'T0',
      name: 'The Creator',
      price: 'Coming Soon',
      status: 'Waitlist',
      color: 'from-slate-500/20',
      sellingPoint: 'Ultimate sovereignty for digital pioneers.',
      features: [
        'Totally Bespoke AI Infrastructure',
        'Private Dedicated Servers',
        'Fine-tuning on your specific private knowledge base',
        '24/7 Priority Access to Ace Elevate Labs'
      ],
      special: true
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-[#01040D] text-slate-200 font-sans selection:bg-pink-500/30 overflow-x-hidden">

      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"
        />
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#01040D]/90 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <KairiLogo />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none italic uppercase group-hover:text-pink-400 transition">KAIRI KANA</span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-pink-500/80 uppercase">Ace Elevate Startup</span>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center space-x-12 text-[10px] font-black uppercase tracking-widest text-slate-500">
            {['concept', 'tech', 'pricing'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-pink-400 transition-colors duration-300 relative group py-2">
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            {/* Desktop Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-white/10 pl-6 ml-6">
              <span className="text-pink-500 font-bold">En</span>
              <span className="text-white/20">|</span>
              <a href="/id" className="hover:text-white transition-colors">Id</a>
            </div>
          </div>

          {/* Mobile Language Switcher */}
          <div className="md:hidden flex items-center space-x-2 mr-4">
            <span className="text-pink-500 font-bold text-xs">En</span>
            <span className="text-white/20">|</span>
            <a href="/id" className="hover:text-white transition-colors text-xs">Id</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-[10px] tracking-widest shadow-lg shadow-pink-500/20"
          >
            JOIN WAITLIST
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 lg:pt-64 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:w-3/5 text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
              <Ghost size={14} className="text-pink-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Built for the digital native</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-2xl lg:text-3xl font-black text-pink-500 italic tracking-tighter uppercase leading-none mb-4">Kairi Kana</p>
              <h1 className="text-6xl lg:text-[8rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                Kill the <br />
                <motion.span
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 bg-[length:200%_auto]"
                >
                  Chaos.
                </motion.span>
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed font-medium">
              You don&apos;t need another complex app. You need an assistant that lives where you do. Snap your world and let Kairi organize your life.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-10">
              <button
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-pink-500 hover:text-white transition-all shadow-2xl hover:shadow-pink-500/20 active:scale-95 duration-300 italic"
              >
                Start Shoshin — $3
              </button>
              <div className="flex items-center gap-3">
                <MousePointer2 size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">500+ in the flow era</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:w-2/5 w-full perspective-1000"
          >
            <div className="relative group">
              <div className="absolute -inset-10 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-[100px] opacity-40 group-hover:opacity-100 transition duration-1000"></div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-[4rem] p-5 shadow-2xl relative overflow-hidden"
              >
                <div className="bg-[#020617] rounded-[3rem] h-[550px] flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 p-[1.5px]">
                        <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center"><KairiLogo /></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white tracking-tight leading-none mb-1">Kairi Kana</p>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
                          <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="ml-auto bg-purple-600/30 border border-purple-500/20 p-4 rounded-3xl rounded-tr-none text-sm text-slate-200 max-w-[90%] shadow-lg shadow-purple-900/10"
                    >
                      &quot;Hey Kairi, remind me to finish my Ace Elevate project deck by 9 PM tonight.&quot;
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5 }}
                      className="mr-auto bg-white/5 border border-white/5 p-4 rounded-3xl rounded-tl-none text-sm text-slate-300 max-w-[90%] relative"
                    >
                      <p className="text-blue-400 font-black text-[9px] uppercase tracking-widest mb-2">Kairi AI</p>
                      Got it! 🚀 I&apos;ve set your reminder for 9 PM. Stay focused, you&apos;ve got this!
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      <section id="concept" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-24"
          >
            <motion.h2 variants={fadeUp} className="text-5xl lg:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter">The Anti-App</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs underline decoration-pink-500/50 underline-offset-8">No UI, No Fatigue, No Friction</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,1fr)]">
            {[
              {
                icon: <Camera className="text-pink-500" size={32} />,
                title: "Vision Mode",
                desc: "Snap a photo of the whiteboard or your receipts. Kairi reads, understands, and logs it instantly. No manual typing.",
                className: "md:col-span-2 md:row-span-1 bg-white/[0.03] border-white/10"
              },
              {
                icon: <TrendingUp className="text-purple-500" size={32} />,
                title: "Gamified Flow",
                desc: "Turn your life into a game. Earn XP for every habit you maintain and task you crush without opening a dashboard.",
                className: "md:col-span-1 md:row-span-2 bg-[#0F172A]/40 border-purple-500/20"
              },
              {
                icon: <FileText className="text-blue-500" size={32} />,
                title: "Research Lab",
                desc: "Upload PDF papers. Ask Kairi to summarize journals or quiz you directly in your chat.",
                className: "md:col-span-2 md:row-span-1 bg-blue-900/[0.1] border-blue-500/20"
              }
            ].map((f, i) => (
              <SpotlightCard
                key={i}
                className={`p-10 rounded-[3rem] border transition-all duration-300 group flex flex-col justify-between ${f.className}`}
                spotlightColor={i === 1 ? "rgba(168, 85, 247, 0.25)" : i === 2 ? "rgba(59, 130, 246, 0.25)" : "rgba(236, 72, 153, 0.25)"}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl backdrop-blur-sm">{f.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{f.desc}</p>
                </motion.div>
                {i === 1 && (
                  <div className="mt-8 flex gap-2">
                    <div className="h-2 w-full bg-purple-500/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-purple-500"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-purple-400">XP</span>
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* M-MCP Technology Section */}
      <section id="tech" className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[5rem] bg-gradient-to-br from-slate-900 via-black to-slate-900 p-12 lg:p-24 border border-white/5 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-8">
                <Cpu size={20} className="text-blue-400" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-600 italic">Ace Elevate Technology</span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9] italic">
                M-MCP <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-[length:200%_auto]">Processing</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                Kairi Kana isn&apos;t just a chatbot. It&apos;s a Multi-Model Context Engine. We cross-verify every snapshot and message across distinct AI models to ensure zero hallucinations and 100% flow accuracy.
              </p>
              <div className="flex gap-10">
                <div><p className="text-3xl font-black text-white italic">99.8%</p><p className="text-[9px] font-bold text-slate-600 uppercase">Accuracy</p></div>
                <div><p className="text-3xl font-black text-white italic">&lt; 1.5s</p><p className="text-[9px] font-bold text-slate-600 uppercase">Latency</p></div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              {[
                { title: "Zero Hallucination", desc: "Dual-model verification ensures records are always based on facts.", color: "pink" },
                { title: "Smart Logic", desc: "Human-like context retention that understands messy inputs and voice notes.", color: "blue" }
              ].map((box, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-lg"
                >
                  <p className={`text-[10px] font-black uppercase tracking-widest text-${box.color}-500 mb-2 italic`}>{box.title}</p>
                  <p className="text-slate-400 text-sm italic font-medium">{box.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-9xl font-black text-white tracking-tighter uppercase italic leading-none mb-6">T-Series</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs underline decoration-purple-600">The Global Access Strategy</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className={`p-10 rounded-[4rem] flex flex-col border transition-all duration-500 relative group overflow-hidden ${tier.popular ? 'bg-gradient-to-b from-slate-900 to-black border-purple-500/40 shadow-2xl shadow-purple-500/10' : 'bg-white/[0.01] border-white/5'}`}
              >
                <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${tier.color} to-transparent opacity-0 group-hover:opacity-100 transition duration-700`}></div>

                {tier.popular && (
                  <div className="relative z-10 mb-4 text-center">
                    <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[8px] font-black uppercase tracking-[0.15em] rounded-full shadow-lg">Recommended</span>
                  </div>
                )}

                <div className="mb-10 relative z-10">
                  <span className="text-pink-500 font-black text-6xl italic tracking-tighter">{tier.id}</span>
                  <h3 className="text-2xl font-black text-white mt-2 uppercase tracking-tight italic leading-none">{tier.name}</h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">{tier.price}</span>
                    {tier.price.includes('$') && <span className="text-slate-600 font-bold text-xs tracking-widest uppercase">/mo</span>}
                  </div>
                  <p className="text-[10px] text-pink-400 font-black uppercase tracking-widest mt-4 mb-2 italic">{tier.sellingPoint}</p>
                </div>

                <div className="flex-1 space-y-4 mb-12 relative z-10">
                  {tier.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[10px] text-slate-400 font-black uppercase tracking-tight leading-snug">
                      <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all relative z-10 ${tier.status === 'Waitlist' ? 'bg-white/5 text-slate-700 border border-white/5 cursor-not-allowed' : 'bg-white text-black hover:bg-pink-500 hover:text-white shadow-xl'}`}>
                  {tier.status === 'Waitlist' ? 'Join Waitlist' : `Access ${tier.name}`}
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">FAQ</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Common Curiosities</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is my data safe?", a: "Absolutely. We use enterprise-grade encryption for our database and leverage WhatsApp's native end-to-end encryption for message delivery. Your data is yours alone." },
              { q: "How do I access Kairi?", a: "Once you subscribe, you will receive a unique access link to chat with Kairi directly on WhatsApp. No new apps to download." },
              { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any moment via your account portal. No questions asked." },
              { q: "What happens if I send a voice note?", a: "Kairi's M-MCP engine transcribes and analyzes it instantly, extracting tasks and context just like a text message." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ace Elevate Vision Section */}
      <section id="vision" className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-[5rem] p-12 lg:p-24 text-center border border-white/5 bg-white/[0.01] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition group-hover:rotate-0"><Zap size={150} /></div>
          <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-white/10 flex items-center justify-center mx-auto mb-10 overflow-hidden grayscale">
            <User size={48} className="text-slate-600" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-8 tracking-tighter italic uppercase">Ace Elevate Vision</h2>
          <p className="text-xl text-slate-400 italic leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
            &quot;We were promised technology would simplify our lives, but we ended up working for our apps. Kairi Kana is the Anti-App. Zero setup, 100% flow. Built for those who have a world to build, not a notification center to manage.&quot;
          </p>
          <div className="flex justify-center gap-10 opacity-30 grayscale text-[9px] font-black tracking-[0.4em] uppercase italic">
            <span>Innovation Lab</span>
            <span>Individual Startup</span>
            <span className="underline decoration-pink-500 underline-offset-4">Est. 2024</span>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="py-48 px-6 relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl lg:text-[9rem] font-black text-white mb-10 tracking-tighter leading-[0.85] italic uppercase">
            Live in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500">Flow.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-16 max-w-xl mx-auto italic font-medium tracking-tight">Claim your Shoshin tier spot for $3/month. Early access invitations are being sent daily.</p>

          <AnimatePresence mode='wait'>
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-5"
              >
                <input
                  type="email"
                  placeholder="Drop your professional email"
                  className="w-full px-10 py-7 rounded-3xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-all text-center text-xl font-black tracking-tighter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="group relative w-full py-7 bg-white text-black font-black text-2xl rounded-3xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl italic uppercase tracking-tighter overflow-hidden">
                  <span className="relative z-10">Secure Access</span>
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent -z-0"
                  />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-pink-500/30 p-16 rounded-[5rem] shadow-2xl shadow-pink-500/10"
              >
                <motion.div
                  initial={{ rotate: -10, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white"
                >
                  <Check size={40} strokeWidth={4} />
                </motion.div>
                <h3 className="text-4xl font-black text-white mb-3 tracking-tight italic uppercase leading-none text-center">Spot Secured.</h3>
                <p className="text-slate-500 italic font-medium text-center">Ace Elevate will contact you shortly. Get ready for the flow era.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <KairiLogo />
            <span className="font-black text-white tracking-tighter italic uppercase text-2xl">KAIRI KANA</span>
          </div>
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] italic leading-none">Ace Elevate Innovation Lab</span>
        </div>
        <div className="flex gap-12 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
          <a href="/privacy" className="hover:text-pink-500 transition-colors duration-300">Privacy</a>
          <a href="/terms" className="hover:text-purple-500 transition-colors duration-300">Terms</a>
          <a href="#" className="hover:text-blue-500 transition-colors duration-300">Manifesto</a>
        </div>

        {/* Socials */}
        <div className="flex gap-6 items-center">
          <a href="https://www.instagram.com/ace_elevate.ai?igsh=MXBtNXNqMHpuajZhaQ==" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-slate-500 hover:text-pink-500 transition-all duration-300 transform hover:scale-110">
            <Instagram size={20} />
          </a>
          <a href="https://www.tiktok.com/@acelevate.ai" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="text-slate-500 hover:text-purple-500 transition-all duration-300 transform hover:scale-110">
            <TikTokIcon size={20} />
          </a>
        </div>

        <div className="text-right">
          <p className="text-[9px] font-black text-slate-800 uppercase tracking-widest italic mb-2 leading-none">Built for the Global Gen-Z Era</p>
          <p className="text-[9px] font-bold text-slate-900 tracking-widest opacity-30 italic">© 2024 ACE ELEVATE GLOBAL.</p>
        </div>
      </footer>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #01040D; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #FF00FF; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default App;