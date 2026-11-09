import Reveal from "./Reveal";
import { SectionHead, Tape } from "./ui";
import styles from "./Schedule.module.css";

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
          <p className={styles.note}>当日のタイムテーブルは、決まり次第こちらでお知らせします。</p>
          <p className={styles.start}>
            <span className="num">01.10</span>
            <span className={styles.day}>SUN</span>
            <span className="num">18:00</span>
            <span className={styles.label}>開宴</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
