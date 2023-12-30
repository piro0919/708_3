import { Metadata } from "next";
import Client from "./client";
import openGraph from "@/lib/openGraph";
import twitter from "@/lib/twitter";

const title = "CONTACT";
const url = "/contact";

export const metadata: Metadata = {
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...openGraph,
    title,
    type: "article",
    url,
  },
  title,
  twitter: {
    ...twitter,
    title,
  },
};

export default function Page(): JSX.Element {
  return <Client />;
}
