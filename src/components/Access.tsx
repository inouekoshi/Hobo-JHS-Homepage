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
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">
            ACCESS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            アクセス
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            会場へのアクセス方法をご案内します。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {/* Google Maps embed */}
          <div className="w-full h-64 sm:h-80 md:h-96 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.5!2d136.623!3d34.966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60038e3fd5c3f8e5%3A0x2c3e3e3e3e3e3e3e!2z44OX44Op44OI44Oz44Ob44OG44Or!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="プラトンホテル 地図"
            />
          </div>

          {/* Access info */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm">🏨</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">プラトンホテル</p>
                <p className="text-sm text-white/50 mt-0.5">
                  〒510-0067 三重県四日市市浜田町12-5
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm">🚃</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">電車でお越しの場合</p>
                <p className="text-sm text-white/50 mt-0.5">
                  近鉄四日市駅より徒歩約3分
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm">🚗</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">お車でお越しの場合</p>
                <p className="text-sm text-white/50 mt-0.5">
                  ホテル提携駐車場あり（詳細はホテルへお問い合わせください）
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
