import { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";
import Fubumikuji from "@/components/Fubumikuji";
import openGraph from "@/lib/openGraph";
import twitter from "@/lib/twitter";

const title = "フブみくじ";
const url = "/fubumikuji";

export type PageProps = {
  params: { year: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({
  params: { year },
  searchParams: { result },
}: PageProps): Metadata {
  return typeof result === "string"
    ? {
        alternates: {
          canonical: queryString.stringify({
            result,
            url: `${url}/${year}`,
          }),
        },
        openGraph: {
          ...openGraph,
          images: [
            `https://www.nbhyakuhati.com/fubumikuji${year}${result}.png`,
          ],
          title: `${title}${year}`,
          type: "article",
          url: queryString.stringify({
            result,
            url: `${url}/${year}`,
          }),
        },
        title: `${title}${year}`,
        twitter: {
          ...twitter,
          title: `${title}${year}`,
        },
      }
    : {
        alternates: {
          canonical: `${url}/${year}`,
        },
        openGraph: {
          ...openGraph,
          title: `${title}${year}`,
          type: "article",
          url: `${url}/${year}`,
        },
        title: `${title}${year}`,
        twitter: {
          ...twitter,
          title: `${title}${year}`,
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
