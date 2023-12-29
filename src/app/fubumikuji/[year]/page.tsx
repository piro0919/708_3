import { Metadata } from "next";
import Fubumikuji from "@/components/Fubumikuji";

export type PageProps = {
  params: { year: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params: { year } }: PageProps): Metadata {
  return {
    alternates: {
      canonical: `/fubumikuji/${year}`,
    },
    title: `フブみくじ${year}`,
  };
}

export default function Page({ params: { year } }: PageProps): JSX.Element {
  return <Fubumikuji year={parseInt(year, 10)} />;
}
