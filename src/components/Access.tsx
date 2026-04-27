"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Access() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="access" className="relative py-20 sm:py-28 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0e1a2a] to-[#0a0a12]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">ACCESS</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">アクセス</h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">会場へのアクセス方法をご案内します。</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {/* Map placeholder */}
          <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-[#1a2744] to-[#0f1a2e] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative z-10 text-center px-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm sm:text-base font-medium">会場が決定次第、地図を掲載します</p>
              <p className="text-white/30 text-xs sm:text-sm mt-2">Coming Soon</p>
            </div>
          </div>

          {/* Access info */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm">🏫</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">会場名</p>
                <p className="text-sm text-white/50 mt-0.5">決まり次第お知らせします</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm">🚗</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">アクセス</p>
                <p className="text-sm text-white/50 mt-0.5">詳細は決まり次第お知らせします</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
