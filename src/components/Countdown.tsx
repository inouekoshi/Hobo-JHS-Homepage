"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { digitPosition, DIGITS_SRC, EVENT_START } from "@/lib/event";
import styles from "./Countdown.module.css";

/** 1秒ごとに進む時計。サーバーでは null（＝空の台紙を描く） */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}
const getSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => null;

const CELEBRATE_FOR_MS = 12 * 60 * 60 * 1000;

function split(nowSec: number) {
  const diff = Math.max(0, EVENT_START - nowSec * 1000);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

/** 数字が変わるたびに、その桁の紙片だけが貼り直される */
function PaperDigits({ value, pad, size, label }: { value: number | null; pad: number; size: "lg" | "md"; label: string }) {
  const text = value === null ? null : String(value).padStart(pad, "0");
  const slots = text ? [...text] : Array.from({ length: pad }, () => null);
  return (
    <div className={`${styles.unit} ${styles[size]}`}>
      <div className={styles.digits} aria-hidden="true">
        {slots.map((d, i) =>
          d === null ? (
            <span key={`blank-${i}`} className={`${styles.digit} ${styles.blank}`} />
          ) : (
            <span
              key={`${slots.length - i}-${d}`}
              className={styles.digit}
              style={
                {
                  backgroundImage: `url(${DIGITS_SRC})`,
                  backgroundPosition: digitPosition(d),
                  "--tilt": `${((i * 7 + Number(d) * 3) % 5) - 2}deg`,
                } as CSSProperties
              }
            />
          ),
        )}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

const CONFETTI_COLORS = ["var(--red)", "var(--blue)", "var(--yellow)", "var(--ink)"];

function Celebration({ onClose }: { onClose: () => void }) {
  const [pieces] = useState(() =>
    Array.from({ length: 36 }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      w: 10 + Math.random() * 18,
      h: 8 + Math.random() * 14,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      duration: 2.2 + Math.random() * 2,
      spin: (Math.random() - 0.5) * 720,
    })),
  );
  return (
    <motion.div
      className={styles.celebration}
      role="dialog"
      aria-label="開催のお知らせ"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className={styles.confetti}
          style={{ left: `${p.x}%`, width: p.w, height: p.h, background: p.color }}
          initial={{ y: "-10vh", rotate: 0 }}
          animate={{ y: "110vh", rotate: p.spin }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
      <motion.div
        className={styles.celebrationBody}
        initial={{ scale: 0.4, rotate: -12 }}
        animate={{ scale: 1, rotate: -2 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
      >
        <p className={styles.celebrationTitle} aria-label="祝・開催">
          {["祝", "・", "開", "催"].map((ch, i) => (
            <span key={i} className={styles[`c${i}`]}>
              {ch}
            </span>
          ))}
        </p>
        <p className={styles.celebrationText}>保々中学校 新成人同窓会へようこそ！</p>
        <button type="button" className="btn" onClick={onClose}>
          とじる
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Countdown() {
  const nowSec = useSyncExternalStore(subscribe, getSecond, getServerSecond);
  const [dismissed, setDismissed] = useState(false);
  const t = nowSec === null ? null : split(nowSec);
  const sinceStart = nowSec === null ? -1 : nowSec * 1000 - EVENT_START;
  const celebrate = !dismissed && sinceStart >= 0 && sinceStart < CELEBRATE_FOR_MS;

  return (
    <>
      <div className={styles.countdown} role="timer" aria-live="off">
        <p className={styles.eyebrow}>
          <span className="tape black">開催まであと</span>
        </p>
        {t && (
          <p className="visually-hidden">
            {t.days > 0 ? `${t.days}日` : `${t.hours}時間${t.minutes}分${t.seconds}秒`}
          </p>
        )}
        {/* 1日以上は日数だけ。1日を切ったら時・分・秒に切り替える */}
        {!t || t.days > 0 ? (
          <PaperDigits value={t?.days ?? null} pad={2} size="lg" label="DAYS" />
        ) : (
          <div className={styles.hms}>
            <PaperDigits value={t.hours} pad={2} size="md" label="HRS" />
            <PaperDigits value={t.minutes} pad={2} size="md" label="MIN" />
            <PaperDigits value={t.seconds} pad={2} size="md" label="SEC" />
          </div>
        )}
      </div>
      <AnimatePresence>{celebrate && <Celebration onClose={() => setDismissed(true)} />}</AnimatePresence>
    </>
  );
}
