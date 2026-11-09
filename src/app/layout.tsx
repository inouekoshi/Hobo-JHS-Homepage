import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Courier_Prime, Murecho, Noto_Sans_JP } from "next/font/google";
import SvgDefs from "@/components/SvgDefs";
import { OP_COUNTDOWN_END, OP_SESSION_KEY } from "@/lib/event";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const murecho = Murecho({
  variable: "--font-murecho",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

const SITE_URL = "https://hobo-jhs-homepage.vercel.app";
const TITLE = "保々中学校 新成人同窓会 2027";
const DESCRIPTION = "あの頃の絆を、もう一度。2027年1月10日（日）18:00 開宴、プラトンホテル四日市にて。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["保々中学校", "同窓会", "新成人", "2027", "四日市"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f8f8",
};

/* 初回訪問ならOPが始まるまで紙で覆う（Reactのハイドレーションを待たずに判定する）。
   html の属性を書き換えるので <html> に suppressHydrationWarning を付けている */
const opCoverScript = `(function(){try{
if(Date.now()>=${OP_COUNTDOWN_END})return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(sessionStorage.getItem("${OP_SESSION_KEY}"))return;
document.documentElement.dataset.op="pending";
setTimeout(function(){delete document.documentElement.dataset.op},5000);
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${notoSansJP.variable} ${bebas.variable} ${murecho.variable} ${courier.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: opCoverScript }} />
      </head>
      <body>
        <SvgDefs />
        {children}
      </body>
    </html>
  );
}
