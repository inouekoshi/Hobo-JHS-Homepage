"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Schedule() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="schedule" className="relative py-20 sm:py-28 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0e1525] to-[#0a0a12]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">
            SCHEDULE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            当日のスケジュール
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            同窓会当日の流れをご案内します。
          </p>
        </motion.div>

        {/* Coming Soon placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-10 sm:p-16 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 flex items-center justify-center"
          >
            <svg
              className="w-10 h-10 text-amber-400/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Coming Soon
          </h3>
          <p className="text-sm sm:text-base text-white/50 max-w-md mx-auto leading-relaxed">
            詳しいスケジュールは決まり次第、
            <br className="sm:hidden" />
            こちらでお知らせします。
          </p>

          {/* Decorative timeline preview */}
          <div className="mt-8 flex flex-col items-center gap-3 opacity-30">
            {["18:00 開場・受付", "18:30 開宴", "... "].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-white/60"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
