import { Metadata } from "next";
import Client from "./client";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "CONTACT | イラストレーター 7:08 オフィシャルサイト",
    type: "article",
  },
  title: "CONTACT",
};

export default function Page(): JSX.Element {
  return <Client />;
}
