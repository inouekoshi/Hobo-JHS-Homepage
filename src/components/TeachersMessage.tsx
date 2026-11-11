import Reveal from "./Reveal";
import { SectionHead, Star } from "./ui";
import styles from "./TeachersMessage.module.css";

export default function TeachersMessage() {
  return (
    <section id="teachers" className={`section ${styles.teachers}`}>
      <Reveal rotate={1.5}>
        <SectionHead label="FOR OUR TEACHERS" color="pink" rotate={1.5} />
      </Reveal>

      <Reveal rotate={-0.8} y={32}>
        <article className={`card texture ${styles.letter}`}>
          <span className="pushpin" aria-hidden="true" />
          <span className={styles.tapeLeft} aria-hidden="true" />
          <span className={styles.tapeRight} aria-hidden="true" />
          <Star className={styles.star} color="var(--green)" size={24} rotate={-12} />

          <h2 className={styles.title}>恩師の皆様へ</h2>

          <div className={styles.body}>
            <p>
              保々中学校を卒業してから、早いもので5年の月日が流れました。
              あの頃、教室で私たちを導いてくださった先生方に、
              成人という大きな節目を迎えた私たちの姿を見ていただきたい。
              そんな思いから、この度同窓会を企画いたしました。
            </p>
            <p className={styles.highlight}>
              <span>先生方は「特別招待」としてお迎えいたします。</span>
              <span className={styles.sub}>会費はいただきません。</span>
            </p>
            <p>
              ご多忙中とは存じますが、
              皆様とお会いできることを学年一同、心より楽しみにしております。
            </p>
          </div>

          <div className={styles.sign}>
            <p>保々中学校 同窓会実行委員会</p>
            <span className={styles.hanko} aria-hidden="true">
              保々
            </span>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
