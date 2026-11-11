import type { CSSProperties } from "react";
import styles from "./CollageLogo.module.css";

/** 1文字ずつ別の紙から切り抜いて貼った、脅迫状風のタイトルロゴ */
type Paper = "pink" | "green" | "lemon" | "black" | "white" | "kraft";

const LINE1: [string, Paper, number][] = [
  ["保", "pink", -6],
  ["々", "white", 4],
  ["中", "green", -2],
  ["学", "lemon", 5],
  ["校", "black", -4],
];

const LINE2: [string, Paper, number][] = [
  ["新", "white", 3],
  ["成", "pink", -5],
  ["人", "kraft", 2],
  ["同", "green", -3],
  ["窓", "lemon", 6],
  ["会", "black", -2],
];

const CLIPS = [
  "polygon(3% 6%, 96% 0%, 100% 88%, 6% 100%)",
  "polygon(0% 2%, 100% 8%, 94% 100%, 4% 94%)",
  "polygon(6% 0%, 98% 4%, 96% 96%, 0% 100%)",
  "polygon(2% 10%, 92% 0%, 100% 94%, 8% 98%)",
];

function Letter({ ch, paper, rotate, index }: { ch: string; paper: Paper; rotate: number; index: number }) {
  return (
    <span
      className={`${styles.letter} ${styles[paper]}`}
      style={
        {
          "--r": `${rotate}deg`,
          "--i": index,
          clipPath: CLIPS[index % CLIPS.length],
          marginTop: `${(index % 3) * 0.04 - 0.04}em`,
        } as CSSProperties
      }
    >
      {ch}
    </span>
  );
}

export default function CollageLogo({ className, animate = true }: { className?: string; animate?: boolean }) {
  return (
    <div className={[styles.logo, animate ? styles.animate : "", className].filter(Boolean).join(" ")}>
      <span className="visually-hidden">保々中学校 新成人同窓会 2027</span>
      <span className={styles.scraps} aria-hidden="true">
        <span className={`${styles.scrap} ${styles.scrapStripe}`} />
        <span className={`${styles.scrap} ${styles.scrapCheck}`} />
        <span className={`${styles.scrap} ${styles.scrapDots}`} />
        <span className={`${styles.star} ${styles.star1}`}>★</span>
        <span className={`${styles.star} ${styles.star2}`}>★</span>
        <span className={`${styles.star} ${styles.star3}`}>★</span>
      </span>
      <span className={`${styles.line} ${styles.line1}`} aria-hidden="true">
        {LINE1.map(([ch, paper, r], i) => (
          <Letter key={ch + i} ch={ch} paper={paper} rotate={r} index={i} />
        ))}
      </span>
      <span className={`${styles.line} ${styles.line2}`} aria-hidden="true">
        {LINE2.map(([ch, paper, r], i) => (
          <Letter key={ch + i} ch={ch} paper={paper} rotate={r} index={i + LINE1.length} />
        ))}
      </span>
      <span className={styles.year} aria-hidden="true">
        2027
      </span>
    </div>
  );
}
