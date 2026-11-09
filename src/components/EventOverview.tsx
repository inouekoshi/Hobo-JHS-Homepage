import Reveal from "./Reveal";
import { SectionHead } from "./ui";
import styles from "./EventOverview.module.css";

const INFO = [
  { en: "DATE", title: "日時", body: "2027年1月10日（日）\n18:00 開宴", tape: "red", rotate: -0.8 },
  {
    en: "PLACE",
    title: "会場",
    body: "プラトンホテル四日市\n〒510-0087 三重県四日市市西新地7-3",
    tape: "blue",
    rotate: 0.9,
  },
  {
    en: "FEE",
    title: "会費",
    body: "10,000円",
    note: "※恩師の先生方からは徴収いたしません",
    tape: "yellow",
    rotate: -0.6,
  },
  { en: "WHO", title: "参加者", body: "保々中学校 卒業生 48名\n＋ 恩師の先生方 4名", tape: "blue", rotate: 0.7 },
  { en: "DRESS", title: "服装", body: "自由\n（成人式の振袖・スーツもOK）", tape: "yellow", rotate: -0.9 },
  {
    en: "EVENT",
    title: "イベント内容",
    body: "食事＋飲み放題の同窓会プラン\nビンゴ大会も開催！",
    tape: "red",
    rotate: 0.6,
  },
] as const;

const EN_COLOR = { red: "var(--red)", blue: "var(--blue)", yellow: "var(--ink)" } as const;

export default function EventOverview() {
  return (
    <section id="overview" className={`section wide ${styles.overview}`}>
      <Reveal rotate={-1.5}>
        <SectionHead
          label="EVENT INFO"
          color="black"
          title="イベント概要"
          lead="出欠の回答は締め切りました。たくさんの回答、ありがとうございました！"
        />
      </Reveal>

      <ul className={styles.grid}>
        {INFO.map((item, i) => (
          <li key={item.en}>
            <Reveal delay={i * 0.06} rotate={item.rotate}>
              <div className={`card ${styles.card}`}>
                <span className={`corner-tape ${item.tape} ${i % 2 ? "right" : ""}`} aria-hidden="true" />
                <p className={`${styles.en} num`} style={{ color: EN_COLOR[item.tape] }}>
                  {item.en}
                </p>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
                {"note" in item && <p className={styles.note}>{item.note}</p>}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal rotate={1} delay={0.1}>
        <div className={styles.message}>
          <p>卒業してから数年。みんなどんな大人になったんだろう？</p>
          <p className={styles.messageStrong}>あの日の教室の続きを、ここで。</p>
        </div>
      </Reveal>
    </section>
  );
}
