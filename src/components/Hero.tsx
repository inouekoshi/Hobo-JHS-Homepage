"use client";

import { motion } from "framer-motion";
import Countdown from "./Countdown";

export default function Hero() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a1628] to-[#0a0a12]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="glow-orb w-96 h-96 bg-amber-500 top-1/4 -left-20" />
        <motion.div animate={{ x: [0, -30, 20, 0], y: [0, 30, -30, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="glow-orb w-80 h-80 bg-blue-500 bottom-1/4 -right-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-4 sm:mb-6">
          <span className="inline-block px-4 py-1.5 text-xs sm:text-sm font-medium text-amber-400/90 border border-amber-500/30 rounded-full bg-amber-500/5 tracking-widest">
            2027.01.10 SAT — 18:00
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 sm:mb-6">
          <span className="block text-white">保々中学校</span>
          <span className="block gradient-text mt-1 sm:mt-2">新成人同窓会</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          あの頃の仲間と、大人になった今だからこそ語り合える。
          <br className="hidden sm:block" />
          特別な一夜を、一緒に。
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mb-8 sm:mb-12">
          <p className="text-sm sm:text-base text-white/40 mb-4 sm:mb-6 tracking-wider font-medium">開催まであと</p>
          <Countdown />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }}>
          <button onClick={scrollToContact} className="group relative inline-flex items-center gap-2 px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-base sm:text-lg rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95">
            <span>お問い合わせはこちら</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <div className="absolute inset-0 rounded-full overflow-hidden"><div className="absolute inset-0 shimmer" /></div>
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
