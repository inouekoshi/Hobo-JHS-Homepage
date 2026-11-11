import { ImageResponse } from "next/og";
import { IconArt, loadGoogleFont } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** ブラウザのタブに出るアイコン。ピンクの紙片に白抜きの「保」、レモン色のテープで留める */
export default async function Icon() {
  const noto = await loadGoogleFont("Noto+Sans+JP:wght@900", "保");
  return new ImageResponse(<IconArt size={64} />, {
    ...size,
    fonts: [{ name: "NotoSansJP", data: noto, weight: 900, style: "normal" }],
  });
}
