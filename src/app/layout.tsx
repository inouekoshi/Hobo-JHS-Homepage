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

export const metadata: Metadata = {
  title: "保々中学校 新成人同窓会 2027",
  description:
    "2027年1月10日開催 保々中学校 新成人同窓会の公式サイト。懐かしい仲間たちと再会しよう。",
  keywords: ["保々中学校", "同窓会", "新成人", "2027", "同窓会"],
  openGraph: {
    title: "保々中学校 新成人同窓会 2027",
    description: "懐かしい仲間たちと再会しよう。2027年1月10日開催。",
    type: "website",
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
