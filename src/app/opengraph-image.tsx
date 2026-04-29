import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "保々中学校 新成人同窓会 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Noto Sans JP Bold をGoogle Fontsから取得
  const notoSansJPBold = await fetch(
    "https://fonts.gstatic.com/s/notosansjp/v53/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // ホームページと同じグラデーション: from-[#050510] via-[#0a1628] to-[#0a0a12]
          background: "linear-gradient(180deg, #050510 0%, #0a1628 55%, #0a0a12 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'NotoSansJP', sans-serif",
        }}
      >
        {/* bg-grid: ホームページと同じグリッドパターン */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(30,58,95,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.3,
          }}
        />

        {/* Amber glow orb — 左上 (ホームページ: top-1/4 -left-20) */}
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "rgba(245,158,11,1)",
            top: "40px",
            left: "-80px",
            filter: "blur(80px)",
            opacity: 0.15,
          }}
        />

        {/* Blue glow orb — 右下 (ホームページ: bottom-1/4 -right-10) */}
        <div
          style={{
            position: "absolute",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "rgba(59,130,246,1)",
            bottom: "20px",
            right: "-60px",
            filter: "blur(80px)",
            opacity: 0.15,
          }}
        />

        {/* Purple glow orb — 中央 (ホームページ: top-1/2 left-1/3) */}
        <div
          style={{
            position: "absolute",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(168,85,247,1)",
            top: "200px",
            left: "380px",
            filter: "blur(80px)",
            opacity: 0.10,
          }}
        />

        {/* メインコンテンツ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
            position: "relative",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          {/* 日付バッジ — ホームページの amber-400/90 border border-amber-500/30 rounded-full bg-amber-500/5 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 32px",
              border: "1.5px solid rgba(245,158,11,0.30)",
              borderRadius: "9999px",
              background: "rgba(245,158,11,0.05)",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontSize: "26px",
                fontWeight: 500,
                color: "rgba(251,191,36,0.90)",
                letterSpacing: "6px",
              }}
            >
              2027.01.10  SUN  —  18:00
            </span>
          </div>

          {/* 保々中学校 — text-white font-black */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            保々中学校
          </div>

          {/* 新成人同窓会 — gradient-text: linear-gradient(135deg, #f59e0b, #fbbf24, #d4a574) */}
          <div
            style={{
              fontSize: "100px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              marginTop: "4px",
              background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d4a574 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            新成人同窓会
          </div>

          {/* キャッチコピー — text-white/70 */}
          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.70)",
              letterSpacing: "6px",
              marginTop: "28px",
            }}
          >
            あの頃の絆を、もう一度。
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "NotoSansJP",
          data: notoSansJPBold,
          style: "normal",
          weight: 900,
        },
      ],
    }
  );
}
