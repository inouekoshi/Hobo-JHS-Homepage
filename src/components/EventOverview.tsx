"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const infoCards = [
  {
    icon: "📅",
    title: "日時",
    content: "2027年1月10日（土）\n18:00 開宴",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: "📍",
    title: "会場",
    content: "プラトンホテル四日市\n〒510-0087 三重県四日市市西新地7-3",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    icon: "💰",
    title: "会費",
    content: "10,000円",
    note: "※恩師の先生方からは徴収いたしません",
    color: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    icon: "🎓",
    title: "対象",
    content: "保々中学校 卒業生\n（新成人世代）",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    icon: "👔",
    title: "服装",
    content: "自由\n（成人式の振袖・スーツもOK）",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: "🎉",
    title: "イベント内容",
    content: "歓談・近況報告\n豪華景品抽選会 ほか",
    color: "from-rose-500/20 to-rose-600/10",
  },
];

export default function EventOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="overview" className="relative py-20 sm:py-28 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1520] to-[#0a0a12]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">
            EVENT INFO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            イベント概要
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            懐かしい仲間たちと過ごす、特別な一夜の詳細をご案内します。
          </p>
        </motion.div>

        {/* Info cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="glass-card p-6 sm:p-8 hover:border-amber-500/30 transition-all duration-300 group cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-white/60 whitespace-pre-line leading-relaxed">
                {card.content}
              </p>
              {card.note && (
                <p className="text-xs text-amber-400/60 mt-2 leading-relaxed">
                  {card.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Emotional message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 sm:mt-12 glass-card p-6 sm:p-8 text-center"
        >
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            卒業してから数年。みんなどんな大人になったんだろう？
            <br />
            <span className="text-amber-400 font-medium">
              あの日の教室の続きを、ここで。
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
