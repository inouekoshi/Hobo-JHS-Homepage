import CollageLogo from "./CollageLogo";
import Countdown from "./Countdown";
import ReplayButton from "./ReplayButton";
import { Star, Tape } from "./ui";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <Tape color="black" rotate={-2.5} className={styles.banner}>
        HOBO JUNIOR HIGH SCHOOL REUNION
      </Tape>

      <h1 className={styles.title}>
        <ReplayButton>
          <CollageLogo />
        </ReplayButton>
      </h1>

      <p className={styles.catch}>あの頃の絆を、もう一度。</p>

      <div className={styles.lower}>
        <div className={styles.info}>
          <p className={`${styles.date} num`}>
            <span className={styles.year}>2027.</span>
            <span className={styles.dayBlock}>
              01/10<span className={styles.day}>SUN</span>
            </span>
          </p>
          <p className={styles.time}>
            <span className="num">18:00</span> 開宴
          </p>
          <p className={styles.venue}>プラトンホテル四日市</p>

          <a href="#contact" className={`btn lemon ${styles.cta}`}>
            お問い合わせはこちら <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.frameWrap}>
          <span className={`${styles.frameTape} ${styles.frameTapeBlue}`} aria-hidden="true" />
          <span className={`${styles.frameTape} ${styles.frameTapeYellow}`} aria-hidden="true" />
          <Star className={styles.frameStar} color="var(--pink)" size={26} rotate={14} />
          <div className={styles.frame}>
            <Countdown />
            <svg className={styles.framePattern} width="56" height="56" aria-hidden="true">
              <rect width="56" height="56" fill="url(#dots-black)" filter="url(#torn-edge)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
