import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

const SITE_URL = "https://hobo-jhs-homepage.vercel.app";

export const metadata: Metadata = {
  title: "保々中学校 新成人同窓会 2027",
  description: "あの頃の絆を、もう一度。2027年1月10日（日）18:00 開催。",
  keywords: ["保々中学校", "同窓会", "新成人", "2027", "四日市"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "保々中学校 新成人同窓会 2027",
    description: "あの頃の絆を、もう一度。2027年1月10日（日）18:00 開催。",
    type: "website",
    url: SITE_URL,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "保々中学校 新成人同窓会 2027",
    description: "あの頃の絆を、もう一度。2027年1月10日（日）18:00 開催。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
