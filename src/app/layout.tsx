// eslint-disable-next-line filenames/match-exported
import type { Metadata } from "next";
import { Noto_Sans_JP as NotoSansJP } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "pattern.css";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "ress";
import "yet-another-react-lightbox/styles.css";
import "./globals.scss";
import "./mq-settings.scss";
import Layout from "@/components/Layout";

const notoSansJP = NotoSansJP({ subsets: ["latin"], weight: "900" });
const siteName = "Lv40代 | イラストレーター 7:08 オフィシャルサイト";
const description = "イラストレーター7:08のオフィシャルサイトです。";
const url = "https://www.nbhyakuhati.com";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description,
  metadataBase: new URL(url),
  openGraph: {
    description,
    locale: "ja_JP",
    siteName,
    title: siteName,
    type: "website",
    url: "/",
  },
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@708_nhh",
    description,
    title: siteName,
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
