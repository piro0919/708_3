import { MicroCMSListResponse } from "microcms-js-sdk";
import { Metadata } from "next";
import Works, { WorksProps } from "@/components/Works";
import client from "@/lib/client";
import openGraph from "@/lib/openGraph";
import twitter from "@/lib/twitter";

const title = "WORKS";
const url = "/works";

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

type GetWorkListData = MicroCMSListResponse<MicroCMS.Works>;

async function getWorkList(): Promise<GetWorkListData> {
  const response = await client.getList<MicroCMS.Works>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "works",
    queries: {
      limit: 100,
    },
  });

  return response;
}

export default async function Page(): Promise<JSX.Element> {
  const { contents } = await getWorkList();
  const works: WorksProps["works"] = contents.map(
    ({ description, images, title }) => ({
      description,
      images: images.map(({ image: { url } }) => ({
        url,
      })),
      title,
    }),
  );

  return <Works works={works} />;
}
