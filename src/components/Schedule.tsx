import Reveal from "./Reveal";
import { SectionHead, Tape } from "./ui";
import styles from "./Schedule.module.css";

const PREVIEW = [
  { time: "18:00", label: "開場・受付" },
  { time: "18:30", label: "開宴" },
  { time: "?", label: "and more..." },
];

export default function Schedule() {
  return (
    <section id="schedule" className={`section ${styles.schedule}`}>
      <Reveal rotate={-1.2}>
        <SectionHead
          label="SCHEDULE"
          color="blue"
          rotate={-1.2}
          title="当日のスケジュール"
          lead="同窓会当日の流れをご案内します。"
        />
      </Reveal>

      <Reveal rotate={0.8} delay={0.05}>
        <div className={`card ${styles.board}`}>
          <span className="corner-tape blue" aria-hidden="true" />
          <span className="corner-tape right" aria-hidden="true" />
          <Tape color="red" rotate={-2} className={styles.soon}>
            COMING SOON
          </Tape>
          <p className={styles.note}>詳しいスケジュールは決まり次第、こちらでお知らせします。</p>

          <ol className={styles.timeline} aria-label="予定（仮）">
            {PREVIEW.map((item) => (
              <li key={item.label}>
                <span className={`${styles.time} num`}>{item.time}</span>
                <span className={styles.dots} aria-hidden="true" />
                <span className={styles.label}>{item.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
