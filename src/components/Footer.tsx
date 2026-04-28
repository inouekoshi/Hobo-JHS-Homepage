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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-sm">
              保
            </div>
            <span className="text-base font-bold text-white/80">
              保々中学校 新成人同窓会
            </span>
          </div>

          {/* Organizer SNS */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-white/40 tracking-widest">
              主催・管理：井上高志
            </p>
            <div className="flex items-center justify-center gap-4">
              {/* LINE */}
              <a
                href="https://line.me/ti/p/_eOAwVUtl4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06C755]/10 border border-[#06C755]/20 text-[#06C755] text-sm font-semibold hover:bg-[#06C755]/20 hover:border-[#06C755]/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 shrink-0"
                  fill="currentColor"
                >
                  <path d="M19.365 9.89c.50 0 .866.398.866.89s-.37.89-.866.89h-2.189v1.296h2.19c.496 0 .865.398.865.89s-.37.89-.866.89h-3.055c-.496 0-.865-.398-.865-.89V8.134c0-.492.37-.89.865-.89h3.055c.496 0 .866.398.866.89s-.37.89-.866.89h-2.189V9.89h2.19zM8.956 8.134c0-.492.37-.89.866-.89s.866.398.866.89v3.657l2.755-4.096a.866.866 0 0 1 .721-.45c.478 0 .866.397.866.887 0 .183-.054.355-.148.498l-.013.018-2.735 4.063 2.759 2.813a.884.884 0 0 1 .007 1.253.883.883 0 0 1-1.253.007L11.41 13.38v2.486c0 .492-.37.89-.866.89s-.866-.398-.866-.89V8.134h-.722zm-3.823 0c0-.492.37-.89.866-.89s.866.398.866.89v7.732c0 .492-.37.89-.866.89s-.866-.398-.866-.89V8.134zm-2.755 0c0-.492.37-.89.866-.89s.866.398.866.89v4.546L6.264 8.584a.867.867 0 0 1 .713-.45c.478 0 .866.397.866.887 0 .183-.054.355-.148.498L4.94 14.153v1.713c0 .492-.37.89-.866.89s-.866-.398-.866-.89v-7.73h-.827zM12 0C5.373 0 0 4.925 0 11c0 3.497 1.743 6.615 4.472 8.664L3.17 24l4.715-2.486C9.139 21.832 10.542 22 12 22c6.627 0 12-4.925 12-11S18.627 0 12 0z" />
                </svg>
                LINE
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/i_noueeeee?igsh=ZnJkdXo1dnVvano0&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-sm font-semibold hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  color: "rgb(232, 121, 249)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 shrink-0"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-white/10 mx-auto" />

          {/* Copyright */}
          <p className="text-xs text-white/30">
            © 2027 保々中学校 同窓会実行委員会. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
