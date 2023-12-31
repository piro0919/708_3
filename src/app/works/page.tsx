import { MicroCMSListResponse } from "microcms-js-sdk";
import { Metadata } from "next";
import Works, { WorksProps } from "@/components/Works";
import client from "@/lib/client";
import defaultMetadata from "@/lib/defaultMetadata";

const title = "WORKS";
const url = "/works";

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
    ({ description, images, title, url }) => ({
      description,
      images: images.map(({ image: { url } }) => ({
        url,
      })),
      title,
      url,
    }),
  );

  return <Works works={works} />;
}
