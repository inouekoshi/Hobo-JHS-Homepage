"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CollageLogo from "./CollageLogo";
import styles from "./OpSplash.module.css";
import {
  daysToEvent,
  digitPosition,
  DIGITS_SRC,
  OP_COUNTDOWN_END,
  OP_REPLAY_EVENT,
  OP_SESSION_KEY,
} from "@/lib/event";

const LOAD_FAILSAFE_MS = 5000;
/** 数字の紙片を貼り終えるまで。ワイプ以降はここから逆算する */
const PASTE_MS = 1300;
const WIPE_AT = 120 + PASTE_MS + 260;
const TOTAL_MS = WIPE_AT + 1500;
const ROWS = 6;
const COLS = 4;

/** 1つの数字を 4×6 の紙片に切り分ける。辺を少し波打たせて、手でちぎった継ぎ目にする */
function makeClips() {
  const pts = Array.from({ length: ROWS + 1 }, (_, r) =>
    Array.from({ length: COLS + 1 }, (_, c) => [
      (c * 100) / COLS + (c === 0 || c === COLS ? 0 : Math.sin(r * 2.3 + c * 3.1) * 4),
      (r * 100) / ROWS + (r === 0 || r === ROWS ? 0 : Math.cos(c * 1.7 + r * 1.3) * 3),
    ]),
  );
  const clips: { clip: string; origin: string }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const v = [pts[r][c], pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]];
      const cx = v.reduce((s, p) => s + p[0], 0) / 4;
      const cy = v.reduce((s, p) => s + p[1], 0) / 4;
      // 継ぎ目に髪の毛ほどの隙間を残すと「貼った紙」らしくなる
      const clip = `polygon(${v.map(([x, y]) => `${cx + (x - cx) * 0.998}% ${cy + (y - cy) * 0.998}%`).join(",")})`;
      clips.push({ clip, origin: `${cx}% ${cy}%` });
    }
  }
  return clips;
}
const CLIPS = makeClips();

function isSlowNetwork() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!(c?.saveData || (c?.effectiveType && ["slow-2g", "2g"].includes(c.effectiveType)));
}

function preload(src: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("OP image unavailable"));
    img.src = src;
  });
}

function sizeDigits(stage: HTMLElement, count: number) {
  const box = stage.getBoundingClientRect();
  const size = Math.min(box.height * 0.5, (box.width * 0.84) / (count * 0.87));
  stage.style.setProperty("--digit-size", `${size}px`);
  return size;
}

function runStage(stage: HTMLElement, day: string) {
  const anims: Animation[] = [];
  const size = sizeDigits(stage, day.length);
  const interval = PASTE_MS / (ROWS * COLS * day.length);
  const landing = Math.min(120, Math.max(70, interval * 1.8));
  const play = (el: Element | null, frames: Keyframe[], delay: number, duration: number, easing = "linear") => {
    if (el) anims.push(el.animate(frames, { delay, duration, fill: "both", easing }));
  };

  stage.querySelectorAll<HTMLElement>("[data-piece]").forEach((piece) => {
    const digit = Number(piece.dataset.digit);
    const index = Number(piece.dataset.piece);
    const row = Math.floor(index / COLS);
    const part = index % COLS;
    // 行ごとに左右へ折り返しながら、全桁をまたいで上から貼っていく
    const col = row % 2 ? COLS - 1 - part : part;
    const order = row * day.length * COLS + (row % 2 ? (day.length - 1 - digit) : digit) * COLS + col;
    const sign = index % 2 ? 1 : -1;
    play(
      piece,
      [
        { opacity: 0, transform: `translate(${sign * size * 0.05}px,${-size * 0.1}px) rotate(${sign * 12}deg) scale(1.32)`, filter: "drop-shadow(7px 12px 4px #0004)" },
        { opacity: 1, transform: `translate(${sign * size * 0.04}px,${-size * 0.08}px) rotate(${sign * 9}deg) scale(1.25)`, filter: "drop-shadow(6px 10px 3px #0004)", offset: 0.12, easing: "cubic-bezier(.7,0,1,.6)" },
        { opacity: 1, transform: "translateY(2px) rotate(0deg) scale(1.08,.92)", filter: "drop-shadow(0 1px 0 #0003)", offset: 0.65, easing: "cubic-bezier(.1,.85,.2,1)" },
        { opacity: 1, transform: "none", filter: "drop-shadow(0 0 0 transparent)" },
      ],
      120 + order * interval,
      landing,
    );
  });

  stage.querySelectorAll("[data-chrome]").forEach((el, i) =>
    play(el, [{ opacity: 0, transform: "translateY(10px) rotate(-3deg)" }, { opacity: 1, transform: "none" }], 60 + i * 90, 380, "cubic-bezier(.22,1,.36,1)"),
  );

  play(
    stage.querySelector("[data-wipe]"),
    [
      { transform: "translateY(115%) rotate(-8deg)", easing: "ease-in-out" },
      { transform: "translateY(-2%) rotate(0deg)", offset: 0.5, easing: "ease-in-out" },
      { transform: "translateY(-118%) rotate(5deg)" },
    ],
    WIPE_AT,
    820,
  );
  play(stage.querySelector("[data-finale]"), [{ opacity: 0 }, { opacity: 1 }], WIPE_AT + 410, 1);
  play(stage.querySelector("[data-finale-logo]"), [{ transform: "scale(.94) rotate(-2deg)" }, { transform: "scale(1.02) rotate(.5deg)", offset: 0.7 }, { transform: "none" }], WIPE_AT + 410, 480, "ease-out");
  play(stage.querySelector("[data-finale-copy]"), [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], WIPE_AT + 650, 400, "ease-out");

  return () => anims.forEach((a) => a.cancel());
}

function CountdownStage({ day }: { day: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    const stop = runStage(stage, day);
    const ro = new ResizeObserver(() => sizeDigits(stage, day.length));
    ro.observe(stage);
    return () => {
      ro.disconnect();
      stop();
    };
  }, [day]);

  return (
    <div ref={ref} className={styles.stage} aria-label={`開催まであと${day}日`}>
      <div className={styles.grain} />
      <div className={styles.offcuts} aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className={`${styles.offcut} ${styles[`offcut${i}`]}`} />
        ))}
      </div>
      <div className={`${styles.edge} ${styles.edgeRed}`} />
      <div className={`${styles.edge} ${styles.edgeStripe}`} />
      <div className={`${styles.edge} ${styles.edgeYellow}`} />
      <div className={`${styles.edge} ${styles.edgeBlue}`} />

      <p className={styles.eyebrow} data-chrome>
        <span className="tape black">開催まであと</span>
      </p>
      <div className={styles.digits}>
        {[...day].map((d, di) => (
          <div className={styles.digit} key={`${d}-${di}`}>
            {CLIPS.map(({ clip, origin }, pi) => (
              <div className={styles.piece} key={pi} data-piece={pi} data-digit={di} style={{ transformOrigin: origin }}>
                <div
                  className={styles.face}
                  style={{
                    backgroundImage: `url(${DIGITS_SRC})`,
                    backgroundPosition: digitPosition(d),
                    clipPath: clip,
                    filter: `saturate(${[1.12, 0.85, 1, 0.94][pi % 4]})`,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className={styles.unit} data-chrome>
        <span className={styles.unitDays}>DAYS</span>
        <span className="tape red">
          2027.01.10 <span className={styles.sun}>SUN</span> 18:00
        </span>
      </p>

      <div className={styles.finale} data-finale>
        <div data-finale-logo>
          <CollageLogo animate={false} className={styles.finaleLogo} />
        </div>
        <p className={styles.finaleCopy} data-finale-copy>
          あの頃の絆を、もう一度。
        </p>
      </div>
      <div className={styles.wipe} data-wipe />
    </div>
  );
}

function clearCover() {
  delete document.documentElement.dataset.op;
}

export default function OpSplash() {
  const [day, setDay] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const request = useRef(0);
  const timers = useRef<number[]>([]);
  const closed = useRef(true);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const close = () => {
    if (closed.current) return;
    closed.current = true;
    request.current++;
    clearTimers();
    try {
      sessionStorage.setItem(OP_SESSION_KEY, "1");
    } catch {
      /* ストレージが使えない環境 */
    }
    setDay(null);
    clearCover();
  };

  const show = async () => {
    const days = daysToEvent();
    if (Date.now() >= OP_COUNTDOWN_END || days < 1) {
      clearCover();
      return;
    }
    clearTimers();
    closed.current = false;
    const current = ++request.current;
    timers.current.push(window.setTimeout(close, LOAD_FAILSAFE_MS));
    try {
      await Promise.all([preload(DIGITS_SRC), document.fonts?.ready]);
      if (current !== request.current || closed.current) return;
      clearTimers();
      document.documentElement.dataset.op = "playing";
      setDay(String(Math.min(999, days)));
      setRun((v) => v + 1);
      timers.current.push(window.setTimeout(close, TOTAL_MS));
    } catch {
      if (current === request.current) close();
    }
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(OP_SESSION_KEY);
    } catch {
      /* ストレージが使えない環境 */
    }
    const skip =
      seen ||
      Date.now() >= OP_COUNTDOWN_END ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      isSlowNetwork();
    // 画像とフォントを待ってから始めるので、開始は次のフレームに回す
    const frame = skip ? 0 : requestAnimationFrame(() => void show());
    if (skip) clearCover();

    const replay = () => void show();
    window.addEventListener(OP_REPLAY_EVENT, replay);
    const req = request;
    return () => {
      cancelAnimationFrame(frame);
      req.current++;
      clearTimers();
      window.removeEventListener(OP_REPLAY_EVENT, replay);
    };
    // 2回目以降の再生は replay イベントが担う
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!day) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  return (
    <AnimatePresence>
      {day ? (
        <motion.div
          className={styles.splash}
          role="dialog"
          aria-label="オープニング"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <CountdownStage day={day} key={run} />
          <button type="button" className={styles.skip} onClick={close}>
            SKIP ↗
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
