"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "HOME", href: "#top" },
  { label: "INFO", href: "#overview" },
  { label: "TEACHERS", href: "#teachers" },
  { label: "SCHEDULE", href: "#schedule" },
  { label: "ACCESS", href: "#access" },
  { label: "CONTACT", href: "#contact" },
];

/* 縮む/戻る閾値をずらす（ヒステリシス）。1点だと縮んだ分のレイアウト変化で
   判定が反転し、ガクガク往復する */
const SHRINK_AT = 140;
const EXPAND_AT = 40;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setShrunk((s) => (!s && y > SHRINK_AT ? true : s && y < EXPAND_AT ? false : s));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // いま読んでいるセクションにピンクのテープの下線を付ける
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${shrunk ? styles.shrunk : ""}`}>
      <div className={styles.pc}>
        <a href="#top" className={styles.logo}>
          <span>HOBO JHS</span>
          <span>REUNION</span>
          <span>2027</span>
        </a>
        <nav aria-label="メインナビゲーション">
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                {i > 0 && <span className={styles.tick} aria-hidden="true" />}
                <a href={item.href} aria-current={active === item.href ? "location" : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.sp}>
        <a href="#top" className={styles.logoSp}>
          HOBO JHS REUNION 2027
        </a>
        <button
          type="button"
          className={`${styles.hamburger} ${open ? styles.isOpen : ""}`}
          aria-expanded={open}
          aria-controls="sp-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.bar} ${styles.b1}`} />
          <span className={`${styles.bar} ${styles.b2}`} />
          <span className={`${styles.bar} ${styles.b3}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="sp-menu"
            className={styles.menu}
            aria-label="メインナビゲーション"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className={`${styles.menuDeco} ${styles.decoCheck}`} aria-hidden="true" />
            <span className={`${styles.menuDeco} ${styles.decoStripe}`} aria-hidden="true" />
            <span className={styles.menuStar} aria-hidden="true">
              ★
            </span>
            <ul>
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -30, rotate: -3 }}
                  animate={{ opacity: 1, x: 0, rotate: (i % 2 === 0 ? -1 : 1) * 2 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "location" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
