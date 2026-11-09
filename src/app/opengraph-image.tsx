import { ImageResponse } from "next/og";

export const alt = "保々中学校 新成人同窓会 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#e31b23";
const BLUE = "#1a33d6";
const YELLOW = "#f4d21f";
const INK = "#111111";
const PAPER = "#f8f8f8";

/** Google Fonts から、使う文字だけに絞った TTF を取ってくる（Satori は woff2 を読めない） */
async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`failed to load font: ${family}`);
  return (await fetch(match[1])).arrayBuffer();
}

const LINE1: [string, string, string, number][] = [
  ["保", RED, "#fff", -6],
  ["々", "#fff", INK, 4],
  ["中", BLUE, "#fff", -2],
  ["学", YELLOW, INK, 5],
  ["校", INK, "#fff", -4],
];
const LINE2: [string, string, string, number][] = [
  ["新", "#fff", INK, 3],
  ["成", RED, "#fff", -5],
  ["人", "#f3ebd9", RED, 2],
  ["同", BLUE, "#fff", -3],
  ["窓", YELLOW, INK, 6],
  ["会", INK, "#fff", -2],
];

function Letters({ items, size: fontSize }: { items: typeof LINE1; size: number }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {items.map(([ch, bg, color, r], i) => (
        <div
          key={i}
          style={{
            display: "flex",
            padding: "6px 10px 10px",
            background: bg,
            color,
            fontSize,
            lineHeight: 1,
            transform: `rotate(${r}deg)`,
            border: bg === "#fff" ? `4px solid ${INK}` : "none",
            boxShadow: "3px 3px 0 rgba(17,17,17,0.2)",
          }}
        >
          {ch}
        </div>
      ))}
    </div>
  );
}

export default async function Image() {
  const jpText = "保々中学校新成人同窓会あの頃の絆を、もう一度。プラトンホテル四日市開宴";
  const [noto, bebas] = await Promise.all([
    loadGoogleFont("Noto+Sans+JP:wght@900", jpText),
    loadGoogleFont("Bebas+Neue", "0123456789./:SUNHOBOJHSREUNION "),
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
          background: PAPER,
          position: "relative",
          fontFamily: "NotoSansJP",
          color: INK,
        }}
      >
        {/* 端に貼った紙片 */}
        <div style={{ position: "absolute", left: -60, top: -40, width: 150, height: 760, background: RED, transform: "rotate(-7deg)" }} />
        <div
          style={{
            position: "absolute",
            right: -50,
            top: -50,
            width: 260,
            height: 200,
            transform: "rotate(13deg)",
            backgroundImage: `repeating-linear-gradient(55deg, ${INK} 0px, ${INK} 12px, ${PAPER} 12px, ${PAPER} 26px)`,
          }}
        />
        <div style={{ position: "absolute", right: 60, top: 170, width: 90, height: 70, background: YELLOW, transform: "rotate(-14deg)" }} />
        <div style={{ position: "absolute", left: 120, bottom: -40, width: 340, height: 90, background: BLUE, transform: "rotate(8deg)" }} />
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          style={{ position: "absolute", right: 120, bottom: 40, transform: "rotate(14deg)" }}
        >
          <path fill={RED} d="M12 1.5l3.1 6.9 7.4.7-5.6 5 1.7 7.4L12 17.7l-6.6 3.8 1.7-7.4-5.6-5 7.4-.7z" />
        </svg>

        <div
          style={{
            display: "flex",
            padding: "8px 28px",
            background: INK,
            color: "#fff",
            fontFamily: "Bebas",
            fontSize: 34,
            letterSpacing: 3,
            transform: "rotate(-2deg)",
            marginBottom: 26,
          }}
        >
          HOBO JHS REUNION
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", marginLeft: -60 }}>
            <Letters items={LINE1} size={64} />
          </div>
          <Letters items={LINE2} size={96} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 34 }}>
          <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Bebas", fontSize: 76, lineHeight: 1 }}>
            <span style={{ fontFamily: "Bebas" }}>2027.01.10</span>
            <span style={{ fontSize: 40, color: RED, marginLeft: 12 }}>SUN</span>
            <span style={{ fontSize: 56, color: BLUE, marginLeft: 22 }}>18:00</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 22px",
              background: YELLOW,
              fontSize: 30,
              transform: "rotate(2deg)",
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
      ],
    },
  );
}
