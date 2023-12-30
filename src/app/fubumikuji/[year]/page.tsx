import { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";
import Fubumikuji from "@/components/Fubumikuji";

export type PageProps = {
  params: { year: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({
  params: { year },
  searchParams: { result },
}: PageProps): Metadata {
  if (typeof result !== "string") {
    return {
      alternates: {
        canonical: `/fubumikuji/${year}`,
      },
      openGraph: {
        title: `フブみくじ${year} | イラストレーター 7:08 オフィシャルサイト`,
        type: "article",
      },
      title: `フブみくじ${year}`,
    };
  }

  return {
    alternates: {
      canonical: queryString.stringify({ result, url: `/fubumikuji/${year}` }),
    },
    openGraph: {
      images: [`/fubumikuji${year}${result}.png`],
      title: `フブみくじ${year} | イラストレーター 7:08 オフィシャルサイト`,
      type: "article",
    },
    title: `フブみくじ${year}`,
    twitter: {
      card: "summary",
    },
  };
}

export default function Page({
  params: { year: paramYear },
  searchParams: { result },
}: PageProps): JSX.Element {
  const year = parseInt(paramYear, 10);

  if (
    (year !== 2021 && year !== 2022 && year !== 2023) ||
    (typeof result !== "undefined" && typeof result !== "string")
  ) {
    notFound();
  }

  return <Fubumikuji initialResult={result} year={year} />;
}
