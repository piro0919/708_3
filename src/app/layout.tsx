// eslint-disable-next-line filenames/match-exported
import type { Metadata } from "next";
import { Noto_Sans_JP as NotoSansJP } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "pattern.css";
import "react-18-image-lightbox/style.css";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "ress";
import "./globals.scss";
import "./mq-settings.scss";
import Layout from "@/components/Layout";

const notoSansJP = NotoSansJP({ subsets: ["latin"], weight: "900" });

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: "イラストレーター7:08のオフィシャルサイトです。",
  metadataBase: new URL("https://www.nbhyakuhati.com"),
  openGraph: {
    images: [
      {
        alt: "7:08",
        height: 630,
        type: "image/png",
        url: "/og-image-01.jpg",
        width: 1200,
      },
    ],
  },
  title: {
    default: "Lv40代 | イラストレーター 7:08 オフィシャルサイト",
    template: "%s | Lv40代 | イラストレーター 7:08 オフィシャルサイト",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@708_nhh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <NextTopLoader color="#49abb8" />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
