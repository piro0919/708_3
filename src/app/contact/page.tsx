import { Metadata } from "next";
import Client from "./client";

const title = "CONTACT";
const url = "/contact";

export const metadata: Metadata = {
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    type: "article",
    url,
  },
  title,
  twitter: { title },
};

export default function Page(): JSX.Element {
  return <Client />;
}
