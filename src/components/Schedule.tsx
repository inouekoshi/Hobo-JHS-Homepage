import Reveal from "./Reveal";
import { SectionHead, Tape } from "./ui";
import styles from "./Schedule.module.css";

const STEPS = [
  { date: "11月中旬", day: "", title: "会費の振込先をご案内", body: "PayPay銀行の口座を、出席者の皆さんへ LINE などでお知らせします。" },
  { date: "12.06", day: "SUN", title: "会費の振込締切", body: "振込が済んだ時点で出席確定です。" },
  { date: "01.08", day: "FRI", title: "欠席連絡の期限（正午）", body: "ここまでのご連絡なら会費を全額返金します。" },
  { date: "01.10", day: "SUN", title: "同窓会 当日", body: "18:00 開宴。プラトンホテル四日市にて。" },
];

export default function Schedule() {
  return (
    <section id="schedule" className={`section ${styles.schedule}`}>
      <Reveal rotate={-1.2}>
        <SectionHead
          label="SCHEDULE"
          color="green"
          rotate={-1.2}
          title="当日までのスケジュール"
          lead="開催までの流れをまとめました。日付はお見逃しなく。"
        />
      </Reveal>

      <ol className={styles.steps}>
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <Reveal rotate={i % 2 ? 0.8 : -0.8} delay={i * 0.06}>
              <div className={`card ${styles.step} ${i === STEPS.length - 1 ? styles.final : ""}`}>
                <p className={styles.date}>
                  {/^[\d.]+$/.test(step.date) ? (
                    <span className="num">{step.date}</span>
                  ) : (
                    <span className={styles.dateJp}>{step.date}</span>
                  )}
                  {step.day && <span className={styles.day}>{step.day}</span>}
                </p>
                <div>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.body}>{step.body}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal rotate={0.8} delay={0.05}>
        <div className={`card ${styles.board}`}>
          <span className="corner-tape green" aria-hidden="true" />
          <span className="corner-tape right" aria-hidden="true" />
          <Tape color="pink" rotate={-2} className={styles.soon}>
            COMING SOON
          </Tape>
          <p className={styles.note}>当日のタイムテーブルは、決まり次第こちらでお知らせします。</p>
        </div>
      </Reveal>
    </section>
  );
}
