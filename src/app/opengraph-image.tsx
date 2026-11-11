import { ImageResponse } from "next/og";
import { COLORS, loadGoogleFont, tornClip } from "@/lib/og";

export const alt = "保々中学校 新成人同窓会 2027 — 2027年1月10日（日）18:00 開宴／プラトンホテル四日市";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const { pink: PINK, green: GREEN, lemon: LEMON, ink: INK, paper: PAPER, kraft: KRAFT } = COLORS;

type Letter = [string, string, string, number];

const LINE1: Letter[] = [
  ["保", PINK, "#fff", -6],
  ["々", "#fff", INK, 4],
  ["中", GREEN, "#fff", -2],
  ["学", LEMON, INK, 5],
  ["校", INK, "#fff", -4],
];
const LINE2: Letter[] = [
  ["新", "#fff", INK, 3],
  ["成", PINK, "#fff", -5],
  ["人", KRAFT, PINK, 2],
  ["同", GREEN, "#fff", -3],
  ["窓", LEMON, INK, 6],
  ["会", INK, "#fff", -2],
];

/** 1文字ずつ別の紙から切り抜いて貼ったタイトル（サイトの CollageLogo と同じ配色） */
function Letters({ items, size: fontSize, seed }: { items: Letter[]; size: number; seed: number }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {items.map(([ch, bg, color, r], i) => (
        <div key={i} style={{ display: "flex", transform: `rotate(${r}deg)`, marginTop: (i % 3) * 6 - 6 }}>
          <div
            style={{
              display: "flex",
              padding: `${fontSize * 0.1}px ${fontSize * 0.14}px ${fontSize * 0.16}px`,
              background: bg === "#fff" ? INK : bg,
              clipPath: tornClip(seed + i * 7, 1.6, 6),
            }}
          >
            {/* 白い紙は、黒い縁を残して内側を白で塗る */}
            <div
              style={{
                display: "flex",
                margin: bg === "#fff" ? -fontSize * 0.06 : 0,
                padding: bg === "#fff" ? fontSize * 0.06 : 0,
                background: bg === "#fff" ? "#fff" : "transparent",
                color,
                fontFamily: "NotoSansJP",
                fontSize,
                lineHeight: 1,
              }}
            >
              {ch}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** 日付・時刻の大きな数字（Bebas Neue） */
function BigNum({ text, color }: { text: string; color: string }) {
  return <div style={{ display: "flex", color, fontFamily: "Bebas", fontSize: 76, lineHeight: 1 }}>{text}</div>;
}

function Scrap({ style, seed, background }: { style: React.CSSProperties; seed: number; background: string }) {
  return <div style={{ position: "absolute", display: "flex", background, clipPath: tornClip(seed, 3, 7), ...style }} />;
}

export default async function Image() {
  const jp = "保々中学校新成人同窓会あの頃の絆を、もう一度。プラトンホテル四日市開宴";
  const [noto, bebas, courier] = await Promise.all([
    loadGoogleFont("Noto+Sans+JP:wght@900", jp),
    loadGoogleFont("Bebas+Neue", "0123456789.:HOBOJUNIRGSCLEUN "),
    loadGoogleFont("Courier+Prime:wght@700", "SUN"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: PAPER,
          color: INK,
          fontFamily: "NotoSansJP",
        }}
      >
        {/* 画面の端に貼った紙片 */}
        <Scrap seed={11} background={PINK} style={{ left: -70, top: -60, width: 170, height: 780, transform: "rotate(-7deg)" }} />
        <Scrap
          seed={23}
          background={`repeating-linear-gradient(55deg, ${INK} 0px, ${INK} 12px, ${PAPER} 12px, ${PAPER} 27px)`}
          style={{ right: -60, top: -60, width: 280, height: 210, transform: "rotate(13deg)" }}
        />
        <Scrap seed={5} background={LEMON} style={{ right: 70, top: 168, width: 96, height: 70, transform: "rotate(-14deg)" }} />
        <Scrap seed={37} background={GREEN} style={{ left: 150, bottom: -50, width: 360, height: 100, transform: "rotate(7deg)" }} />
        <Scrap
          seed={41}
          background={`radial-gradient(circle, ${GREEN} 28%, transparent 30%)`}
          style={{ right: 40, bottom: 30, width: 150, height: 110, backgroundSize: "16px 16px", transform: "rotate(-8deg)" }}
        />
        <svg width="70" height="70" viewBox="0 0 24 24" style={{ position: "absolute", left: 150, top: 70, transform: "rotate(-14deg)" }}>
          <path fill={LEMON} d="M12 1.5l3.1 6.9 7.4.7-5.6 5 1.7 7.4L12 17.7l-6.6 3.8 1.7-7.4-5.6-5 7.4-.7z" />
        </svg>
        <svg width="54" height="54" viewBox="0 0 24 24" style={{ position: "absolute", right: 210, bottom: 150, transform: "rotate(18deg)" }}>
          <path fill={PINK} d="M12 1.5l3.1 6.9 7.4.7-5.6 5 1.7 7.4L12 17.7l-6.6 3.8 1.7-7.4-5.6-5 7.4-.7z" />
        </svg>

        {/* 黒テープの見出し */}
        <div
          style={{
            display: "flex",
            padding: "10px 34px 6px",
            background: INK,
            color: "#fff",
            fontFamily: "Bebas",
            fontSize: 32,
            letterSpacing: 3,
            transform: "rotate(-2deg)",
            clipPath: tornClip(17, 1.2, 14),
            marginBottom: 22,
          }}
        >
          HOBO JUNIOR HIGH SCHOOL REUNION
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative" }}>
          <div style={{ display: "flex", marginLeft: -70 }}>
            <Letters items={LINE1} size={62} seed={100} />
          </div>
          <Letters items={LINE2} size={96} seed={200} />
          <div
            style={{
              position: "absolute",
              right: -40,
              bottom: -26,
              display: "flex",
              padding: "6px 18px 2px",
              background: PINK,
              color: "#fff",
              fontFamily: "Bebas",
              fontSize: 54,
              lineHeight: 1,
              transform: "rotate(-6deg)",
              clipPath: tornClip(31, 2, 8),
            }}
          >
            2027
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 30, fontSize: 30, letterSpacing: 4 }}>あの頃の絆を、もう一度。</div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <BigNum text="2027.01.10" color={INK} />
            <div
              style={{
                display: "flex",
                fontFamily: "Courier",
                fontSize: 24,
                color: PINK,
                marginLeft: 8,
                marginTop: 6,
              }}
            >
              SUN
            </div>
            <div style={{ display: "flex", marginLeft: 22 }}>
              <BigNum text="18:00" color={GREEN} />
            </div>
            <div style={{ display: "flex", fontSize: 26, marginLeft: 8, marginTop: 40 }}>開宴</div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 26px",
              background: LEMON,
              fontSize: 28,
              transform: "rotate(2deg)",
              clipPath: tornClip(53, 1.4, 10),
            }}
          >
            プラトンホテル四日市
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NotoSansJP", data: noto, weight: 900, style: "normal" },
        { name: "Bebas", data: bebas, weight: 400, style: "normal" },
        { name: "Courier", data: courier, weight: 700, style: "normal" },
      ],
    },
  );
}
