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
    body: "10,000円\n12月6日（日）までに事前振込",
    note: "※恩師の先生方からは徴収いたしません",
    tape: "yellow",
    rotate: -0.6,
  },
  { en: "WHO", title: "参加者", body: "保々中学校 卒業生 48名\n＋ 恩師の先生方 4名", tape: "blue", rotate: 0.7 },
  { en: "DRESS", title: "服装", body: "自由\n（成人式の振袖・スーツもOK）", tape: "yellow", rotate: -0.9 },
  {
    en: "EVENT",
    title: "イベント内容",
    body: "食事＋飲み放題の同窓会プラン\n余興も企画中…！？",
    tape: "red",
    rotate: 0.6,
  },
] as const;

const NOTICE = [
  { head: "振込締切", body: "12月6日（日）までに専用口座へお振込みください。振込が済んだ時点で出席確定です。" },
  {
    head: "振込先",
    body: "PayPay銀行の同窓会専用口座です。口座番号は出席者の皆さんへ LINE などでお知らせします。PayPayアプリからは振り込めないので、銀行振込でお願いします。",
  },
  {
    head: "振込名義",
    body: "ご本人のフルネームでお願いします。ご家族など別の名義で振り込んだ場合は、幹事にひとことご連絡ください。",
  },
  { head: "期限を過ぎたら", body: "12月6日までにお振込みがない場合は、欠席扱いとさせていただきます。" },
  { head: "キャンセル", body: "1月8日（金）正午までに欠席のご連絡をいただければ全額返金します。それ以降は料理代がかかるため返金できません。" },
  { head: "手数料", body: "振込手数料は各自でご負担ください。" },
];

const EN_COLOR = { red: "var(--red)", blue: "var(--blue)", yellow: "var(--ink)" } as const;

export default function EventOverview() {
  return (
    <section id="overview" className={`section wide ${styles.overview}`}>
      <Reveal rotate={-1.5}>
        <SectionHead
          label="EVENT INFO"
          color="black"
          title="イベント概要"
          lead={
            <>
              出欠の回答は締め切りました。たくさんの回答、ありがとうございました！
              <span className={styles.leadNote}>
                ※招待状が届いた方は、同封のチラシのQRコード（出欠回答フォーム）から11月30日（月）までにご回答ください。
              </span>
            </>
          }
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

      <Reveal rotate={-0.6} delay={0.05}>
        <div className={`card ${styles.notice}`}>
          <span className="corner-tape red" aria-hidden="true" />
          <h3 className={styles.noticeTitle}>
            <span className="num">NOTICE</span>会費のお支払いについて
          </h3>
          <ul className={styles.noticeList}>
            {NOTICE.map((item) => (
              <li key={item.head}>
                <strong>{item.head}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal rotate={1} delay={0.1}>
        <div className={styles.message}>
          <p>卒業してから数年。みんなどんな大人になったんだろう？</p>
          <p className={styles.messageStrong}>あの日の教室の続きを、ここで。</p>
        </div>
      </Reveal>
    </section>
  );
}
