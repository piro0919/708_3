const siteName = "Lv40代 | イラストレーター 7:08 オフィシャルサイト";
const description = "イラストレーター7:08のオフィシャルサイトです。";
const defaultMetadata = {
  description,
  openGraph: {
    description,
    images: ["https://www.nbhyakuhati.com/opengraph-image.png"],
    locale: "ja_JP",
    siteName,
    title: siteName,
    type: "website",
    url: "/",
  },
  siteName,
  twitter: {
    card: "summary_large_image",
    creator: "@708_nhh",
    description,
    title: siteName,
  },
};

export default defaultMetadata;
