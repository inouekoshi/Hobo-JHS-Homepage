import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "保々中学校 新成人同窓会 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050510 0%, #0a1628 50%, #0d1f3c 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Amber glow orb - left */}
        <div
          style={{
            position: "absolute",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(217,119,6,0.25) 40%, transparent 70%)",
            top: "60px",
            left: "-80px",
            filter: "blur(30px)",
          }}
        />

        {/* Blue glow orb - right */}
        <div
          style={{
            position: "absolute",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.2) 40%, transparent 70%)",
            bottom: "40px",
            right: "-40px",
            filter: "blur(30px)",
          }}
        />

        {/* Purple glow orb - center */}
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "40%",
            filter: "blur(40px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* School name */}
          <div
            style={{
              fontSize: "62px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}
          >
            保々中学校
          </div>

          {/* Event name */}
          <div
            style={{
              fontSize: "86px",
              fontWeight: 900,
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 70%, #fbbf24 100%)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
              lineHeight: 1.05,
              textShadow: "none",
              marginTop: "-4px",
            }}
          >
            新成人同窓会
          </div>

          {/* Date badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "8px",
              padding: "10px 36px",
              border: "2px solid rgba(245,158,11,0.6)",
              borderRadius: "50px",
              background: "rgba(245,158,11,0.07)",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: 600,
                color: "#fbbf24",
                letterSpacing: "3px",
              }}
            >
              2027.01.10　SUN　18:00
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "4px",
              marginTop: "6px",
            }}
          >
            あの頃の絆を、もう一度。
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
