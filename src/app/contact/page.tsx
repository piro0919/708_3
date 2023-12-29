import { Metadata } from "next";
import Client from "./client";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "CONTACT",
};

export default function Page(): JSX.Element {
  return <Client />;
}
