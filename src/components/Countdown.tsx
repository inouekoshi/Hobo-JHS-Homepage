"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

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
          {/* 上下の区切り線 */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-black/30" />
          
          {/* 微かな光沢 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-1/2" />
          
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums relative z-10">
            {displayValue}
          </span>
        </motion.div>

        {/* グロウ効果 */}
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

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  const updateTime = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    setMounted(true);
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

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
    <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center">
      <FlipUnit value={timeLeft.days} label="DAYS" />
      <FlipUnit value={timeLeft.hours} label="HRS" />
      <FlipUnit value={timeLeft.minutes} label="MIN" />
      <FlipUnit value={timeLeft.seconds} label="SEC" />
    </div>
  );
}
