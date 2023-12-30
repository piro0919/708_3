import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";
import Fubumikuji from "@/components/Fubumikuji";

export type PageProps = {
  params: { year: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params: { year }, searchParams: { result } }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  if (typeof result !== "string") {
    return {
      alternates: {
        canonical: `/fubumikuji/${year}`,
      },
      title: `フブみくじ${year}`,
    };
  }

  const { openGraph = {}, twitter = {} } = await parent;

  return {
    alternates: {
      canonical: queryString.stringify({ result, url: `/fubumikuji/${year}` }),
    },
    openGraph: {
      ...openGraph,
      images: [`/fubumikuji${year}${result}`],
    },
    title: `フブみくじ${year}`,
    twitter: {
      ...twitter,
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
