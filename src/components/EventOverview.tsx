"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const infoCards = [
  { icon: "📅", title: "日時", content: "2027年1月10日（土）\n18:00 開場 / 18:30 開宴", color: "from-blue-500/20 to-blue-600/10" },
  { icon: "📍", title: "会場", content: "会場は決まり次第\nお知らせします", color: "from-amber-500/20 to-amber-600/10" },
  { icon: "💰", title: "会費", content: "詳細は決まり次第\nお知らせします", color: "from-emerald-500/20 to-emerald-600/10" },
  { icon: "👔", title: "服装", content: "自由\n（成人式の振袖・スーツもOK）", color: "from-purple-500/20 to-purple-600/10" },
];

export default function EventOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="overview" className="relative py-20 sm:py-28 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1520] to-[#0a0a12]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">EVENT INFO</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">イベント概要</h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">懐かしい仲間たちと過ごす、特別な一夜の詳細をご案内します。</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {infoCards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="glass-card p-6 sm:p-8 hover:border-amber-500/30 transition-all duration-300 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm sm:text-base text-white/60 whitespace-pre-line leading-relaxed">{card.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 sm:mt-12 glass-card p-6 sm:p-8 text-center"
        >
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            卒業してから数年。みんなどんな大人になったんだろう？
            <br />
            <span className="text-amber-400 font-medium">あの日の教室の続きを、ここで。</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
