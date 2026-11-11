/** OGP画像・アイコンを next/og で描くための共通部品 */

export const COLORS = {
  pink: "#ec4b86",
  green: "#179c6b",
  lemon: "#f4dc3c",
  ink: "#161616",
  paper: "#f9f8f6",
  kraft: "#f3ebd9",
};

/** Google Fonts から、使う文字だけに絞った TTF を取ってくる（Satori は woff2 を読めない） */
export async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`failed to load font: ${family}`);
  return (await fetch(match[1])).arrayBuffer();
}

/** 手でちぎったような縁。四辺を細かく揺らした多角形を返す */
export function tornClip(seed: number, amp = 2.2, steps = 9) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const pts: string[] = [];
  const edge = (x0: number, y0: number, x1: number, y1: number, nx: number, ny: number) => {
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const j = (rand() - 0.5) * 2 * amp;
      pts.push(`${(x0 + (x1 - x0) * t + nx * j).toFixed(1)}% ${(y0 + (y1 - y0) * t + ny * j).toFixed(1)}%`);
    }
  };
  edge(amp, amp, 100 - amp, amp, 0, 1);
  edge(100 - amp, amp, 100 - amp, 100 - amp, 1, 0);
  edge(100 - amp, 100 - amp, amp, 100 - amp, 0, 1);
  edge(amp, 100 - amp, amp, amp, 1, 0);
  return `polygon(${pts.join(",")})`;
}

/** タブ用アイコンとホーム画面アイコンで共通の絵柄 */
export function IconArt({ size: s }: { size: number }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: s * 0.06,
          top: s * 0.06,
          width: s * 0.88,
          height: s * 0.88,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.pink,
          color: "#fff",
          fontFamily: "NotoSansJP",
          fontSize: s * 0.66,
          lineHeight: 1,
          transform: "rotate(-5deg)",
          clipPath: tornClip(7, 2.5, 7),
        }}
      >
        <span style={{ marginTop: -s * 0.05 }}>保</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: -s * 0.04,
          top: s * 0.1,
          width: s * 0.46,
          height: s * 0.17,
          background: COLORS.lemon,
          transform: "rotate(-38deg)",
          clipPath: tornClip(3, 4, 5),
        }}
      />
    </div>
  );
}
