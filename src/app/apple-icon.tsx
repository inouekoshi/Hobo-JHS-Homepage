import { ImageResponse } from "next/og";
import { COLORS, IconArt, loadGoogleFont } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iPhone のホーム画面用。透過できないので紙色の地に貼る */
export default async function AppleIcon() {
  const noto = await loadGoogleFont("Noto+Sans+JP:wght@900", "保");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: COLORS.paper, padding: 18 }}>
        <IconArt size={144} />
      </div>
    ),
    { ...size, fonts: [{ name: "NotoSansJP", data: noto, weight: 900, style: "normal" }] },
  );
}
