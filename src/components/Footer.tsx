"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative py-12 sm:py-16" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#050508]" />
      
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-sm">
              保
            </div>
            <span className="text-base font-bold text-white/80">保母中学校 新成人同窓会</span>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <p className="text-sm text-white/40">お問い合わせ</p>
            <p className="text-sm text-white/60">
              メール：<a href="mailto:hobo-reunion@example.com" className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2">hobo-reunion@example.com</a>
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-white/10 mx-auto" />

          {/* Copyright */}
          <p className="text-xs text-white/30">
            © 2027 保母中学校 同窓会実行委員会. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
