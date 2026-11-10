import Reveal from "./Reveal";
import { Chip, SectionHead } from "./ui";
import styles from "./Access.module.css";

const MAP_SRC =
  "https://maps.google.com/maps?q=%E3%83%97%E3%83%A9%E3%83%88%E3%83%B3%E3%83%9B%E3%83%86%E3%83%AB%E5%9B%9B%E6%97%A5%E5%B8%82+%E4%B8%89%E9%87%8D%E7%9C%8C%E5%9B%9B%E6%97%A5%E5%B8%82%E5%B8%82%E8%A5%BF%E6%96%B0%E5%9C%B07-3&output=embed&hl=ja&z=16";

/* スマホでは Google マップのアプリが開く（universal link） */
const MAPS_APP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "プラトンホテル四日市 三重県四日市市西新地7-3",
)}`;

export default function Access() {
  return (
    <section id="access" className={`section wide ${styles.access}`}>
      <Reveal rotate={1.2}>
        <SectionHead
          label="ACCESS"
          color="yellow"
          rotate={1.2}
          title="アクセス"
          lead="会場へのアクセス方法をご案内します。"
        />
      </Reveal>

      <div className={styles.layout}>
        <Reveal rotate={-1} className={styles.mapCol}>
          <div className={styles.mapWrap}>
            <span className={`${styles.mapTape} ${styles.mapTapeRed}`} aria-hidden="true" />
            <span className={`${styles.mapTape} ${styles.mapTapeBlue}`} aria-hidden="true" />
            <div className={styles.mapFrame}>
              <iframe
                src={MAP_SRC}
                className={styles.map}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="プラトンホテル四日市 地図"
              />
            </div>
          </div>
        </Reveal>

        <Reveal rotate={0.8} delay={0.08} className={styles.infoCol}>
          <div className={`card ${styles.info}`}>
            <span className="corner-tape" aria-hidden="true" />
            <h3 className={styles.venue}>
              <a href="https://www.platon-hotel.co.jp/" target="_blank" rel="noopener noreferrer">
                プラトンホテル四日市 <span aria-hidden="true">↗</span>
              </a>
            </h3>
            <p className={styles.address}>〒510-0087 三重県四日市市西新地7-3</p>
            <a href={MAPS_APP_URL} target="_blank" rel="noopener noreferrer" className={`btn red ${styles.mapBtn}`}>
              地図アプリで開く <span aria-hidden="true">↗</span>
            </a>

            <dl className={styles.list}>
              <div>
                <dt>
                  <Chip color="blue" rotate={-2}>
                    電車
                  </Chip>
                </dt>
                <dd>近鉄四日市駅より徒歩約3分</dd>
              </div>
              <div>
                <dt>
                  <Chip color="red" rotate={1.5}>
                    お車
                  </Chip>
                </dt>
                <dd>ホテル提携駐車場あり（詳細はホテルへお問い合わせください）</dd>
              </div>
              <div>
                <dt>
                  <Chip color="yellow" rotate={-1}>
                    ご注意
                  </Chip>
                </dt>
                <dd>飲み放題プランです。お酒を飲む方は、電車などの公共交通機関でお越しください。</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
