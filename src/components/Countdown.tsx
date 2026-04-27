"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2027-01-10T18:00:00+09:00").getTime();

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function isExpired(): boolean {
  return new Date().getTime() >= TARGET_DATE;
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const displayValue = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-xl bg-gradient-to-b from-[#1a2744] to-[#0f1a2e] border border-amber-500/20 flex items-center justify-center shadow-xl shadow-black/30 relative overflow-hidden"
        >
          <div className="absolute left-0 right-0 top-1/2 h-px bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-1/2" />
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums relative z-10">
            {displayValue}
          </span>
        </motion.div>
        {isFlipping && (
          <div className="absolute inset-0 rounded-xl bg-amber-500/10 animate-pulse" />
        )}
      </div>
      <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-amber-400/70 tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

/* ── 開催到達時の「祝・開催」オーバーレイ ── */
function CelebrationOverlay({ onClose }: { onClose: () => void }) {
  // パーティクル（クラッカー風）
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    size: 4 + Math.random() * 8,
    color: ["#f59e0b", "#fbbf24", "#ef4444", "#3b82f6", "#a855f7", "#10b981"][
      i % 6
    ],
    duration: 2 + Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Confetti particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: 360 * (p.id % 2 === 0 ? 1 : -1),
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          className="absolute top-0 rounded-sm"
          style={{
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
          }}
        />
      ))}

      {/* Main celebration text */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-4"
        >
          <span className="text-6xl sm:text-7xl md:text-8xl">🎊</span>
        </motion.div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black gradient-text mb-4">
          祝・開催
        </h2>
        <p className="text-lg sm:text-xl text-white/80 mb-6">
          保々中学校 新成人同窓会へようこそ！
        </p>
        <p className="text-sm text-white/40">
          タップして閉じる
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);

  const updateTime = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    setMounted(true);
    updateTime();
    const timer = setInterval(() => {
      updateTime();
      // カウントダウンが0になったら祝賀表示
      if (isExpired() && !celebrationDismissed) {
        setShowCelebration(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [updateTime, celebrationDismissed]);

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    setCelebrationDismissed(true);
  };

  if (!mounted || !timeLeft) {
    return (
      <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center">
        {["DAYS", "HRS", "MIN", "SEC"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-xl bg-gradient-to-b from-[#1a2744] to-[#0f1a2e] border border-amber-500/20 flex items-center justify-center shadow-xl shadow-black/30">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/30">
                --
              </span>
            </div>
            <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-amber-400/70 tracking-wider uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center">
        <FlipUnit value={timeLeft.days} label="DAYS" />
        <FlipUnit value={timeLeft.hours} label="HRS" />
        <FlipUnit value={timeLeft.minutes} label="MIN" />
        <FlipUnit value={timeLeft.seconds} label="SEC" />
      </div>

      {/* 祝賀オーバーレイ */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay onClose={handleCloseCelebration} />
        )}
      </AnimatePresence>
    </>
  );
}
