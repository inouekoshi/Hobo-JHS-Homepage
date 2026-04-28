"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── 装飾用 SVG コーナーオーナメント ── */
function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 58 L2 2 L58 2"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 52 L8 8 L52 8"
        stroke="url(#goldGrad)"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.5"
      />
      <circle cx="2" cy="2" r="2" fill="url(#goldGrad)" />
      <circle cx="14" cy="14" r="1.5" fill="url(#goldGrad)" opacity="0.6" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d4a574" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── 封蝋（シール）アイコン ── */
function WaxSeal() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
      {/* 外側の光彩 */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-amber-500/20 blur-md"
      />
      {/* シール本体 */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 border border-amber-400/40 flex items-center justify-center shadow-lg shadow-amber-500/30">
        {/* 八角形の刻印 */}
        <svg viewBox="0 0 40 40" className="w-10 h-10 sm:w-12 sm:h-12">
          <polygon
            points="20,2 28,7 35,14 38,22 35,30 28,37 20,40 12,37 5,30 2,22 5,14 12,7"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
          />
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="13"
            fontWeight="900"
            fill="rgba(255,255,255,0.9)"
            fontFamily="serif"
          >
            保々
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function TeachersMessage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  /* 本文の各パラグラフを順番に表示するアニメーション */
  const paragraphVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.5 + i * 0.18,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="teachers"
      className="relative py-20 sm:py-28 md:py-32 overflow-hidden"
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0c1420] to-[#0a0a12]" />
      {/* 背景グロウ */}
      <motion.div
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#f59e0b,transparent)]"
      />

      <div
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6"
        ref={ref}
      >
        {/* セクションラベル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 tracking-widest">
            FOR OUR TEACHERS
          </span>
        </motion.div>

        {/* ── 招待状カード ── */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.88, y: 24 }}
          animate={isInView ? { opacity: 1, scaleY: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top center" }}
          className="relative"
        >
          {/* 外枠グロウ */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/30 via-transparent to-amber-700/20 blur-sm" />

          {/* カード本体 */}
          <div className="relative rounded-2xl border border-amber-500/25 bg-gradient-to-b from-[#111827]/90 to-[#0d1a2a]/90 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/40">

            {/* 上部ゴールドライン */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

            {/* 内部コンテンツ */}
            <div className="relative px-6 sm:px-10 md:px-14 py-10 sm:py-14">

              {/* 四隅オーナメント */}
              <CornerOrnament className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 opacity-70" />
              <CornerOrnament className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 opacity-70 rotate-90" />
              <CornerOrnament className="absolute bottom-4 left-4 w-10 h-10 sm:w-12 sm:h-12 opacity-70 -rotate-90" />
              <CornerOrnament className="absolute bottom-4 right-4 w-10 h-10 sm:w-12 sm:h-12 opacity-70 rotate-180" />

              {/* 封蝋シール */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
                className="mb-8"
              >
                <WaxSeal />
              </motion.div>

              {/* タイトル */}
              <motion.h2
                custom={0}
                variants={paragraphVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-8 tracking-wide"
              >
                恩師の皆様へ
              </motion.h2>

              {/* 区切り線 */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
              </motion.div>

              {/* 本文 */}
              <div className="space-y-5 text-center">
                <motion.p
                  custom={1}
                  variants={paragraphVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-sm sm:text-base text-white/65 leading-relaxed sm:leading-loose"
                >
                  保々中学校を卒業してから、早いもので5年の月日が流れました。
                  <br className="hidden sm:block" />
                  あの頃、教室で私たちを導いてくださった先生方に、
                  <br className="hidden sm:block" />
                  成人という大きな節目を迎えた私たちの姿を見ていただきたい。
                  <br className="hidden sm:block" />
                  そんな思いから、この度同窓会を企画いたしました。
                </motion.p>

                {/* 強調テキスト */}
                <motion.div
                  custom={2}
                  variants={paragraphVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative py-5 px-4 sm:px-8"
                >
                  {/* 強調背景 */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/8 via-amber-500/14 to-amber-500/8 border border-amber-500/20" />
                  <p className="relative text-base sm:text-lg md:text-xl font-bold text-amber-300 leading-relaxed">
                    先生方は「特別招待」としてお迎えいたします。
                  </p>
                </motion.div>

                <motion.p
                  custom={3}
                  variants={paragraphVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-sm sm:text-base text-white/65 leading-relaxed sm:leading-loose"
                >
                  ご多忙中とは存じますが、
                  <br className="hidden sm:block" />
                  皆様とお会いできることを学年一同、心より楽しみにしております。
                </motion.p>
              </div>

              {/* 下部区切り */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                className="flex items-center gap-3 mt-8"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
              </motion.div>

              {/* 署名 */}
              <motion.p
                custom={4}
                variants={paragraphVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-right text-xs sm:text-sm text-amber-400/60 mt-6 italic tracking-wider"
              >
                保々中学校 同窓会実行委員会
              </motion.p>
            </div>

            {/* 下部ゴールドライン */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
