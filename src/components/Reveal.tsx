"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  className?: string;
}

/**
 * スクロールで紙片が少し傾きながら貼られる登場演出。
 *
 * useReducedMotion() はサーバーでは常に false になるため、
 * マークアップ（要素の種類や initial）を出し分けてはいけない。
 * 低減設定の見え方は globals.css の [data-reveal] と、transition の duration 0 で担保する
 */
export default function Reveal({ children, delay = 0, y = 24, rotate = -1, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      className={className}
      style={{ "--reveal-rotate": `${rotate}deg` } as CSSProperties}
      initial={{ opacity: 0, y, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
