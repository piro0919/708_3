import { Metadata } from "next";

const siteName = "Lv40代 | イラストレーター 7:08 オフィシャルサイト";
const description = "イラストレーター7:08のオフィシャルサイトです。";
const openGraph: Metadata["openGraph"] = {
  description,
  locale: "ja_JP",
  siteName,
  title: siteName,
  type: "website",
  url: "/",
};

export default openGraph;
