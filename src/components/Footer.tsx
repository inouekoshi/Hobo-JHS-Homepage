import { Tape } from "./ui";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Tape as="p" color="lemon" rotate={-1.5} className={styles.title}>
          HOBO JHS REUNION 2027
        </Tape>
        <p className={styles.name}>保々中学校 新成人同窓会</p>
        <p className={styles.copyright}>© 2027 保々中学校 同窓会実行委員会</p>
      </div>
    </footer>
  );
}
