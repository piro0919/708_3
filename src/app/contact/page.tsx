import { Metadata } from "next";
import Client from "./client";
import defaultMetadata from "@/lib/defaultMetadata";

const title = "CONTACT";
const url = "/contact";

export const metadata: Metadata = {
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title,
    type: "article",
    url,
  },
  title,
  twitter: {
    ...defaultMetadata.twitter,
    title,
  },
};

export default function Page(): JSX.Element {
  return <Client />;
}
