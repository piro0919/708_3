import { MicroCMSListResponse } from "microcms-js-sdk";
import { Metadata } from "next";
import Gallery, { GalleryProps } from "@/components/Gallery";
import client from "@/lib/client";

const title = "GALLERY";
const url = "/gallery";

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

type GetGalleryListData = MicroCMSListResponse<MicroCMS.Illustrations>;

async function getGalleryList(): Promise<GetGalleryListData> {
  const response = await client.getList<MicroCMS.Illustrations>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "illustrations",
    queries: {
      limit: 100,
    },
  });

  return response;
}

export default async function Page(): Promise<JSX.Element> {
  const { contents } = await getGalleryList();
  const images: GalleryProps["images"] = contents.map(({ image: { url } }) => ({
    url,
  }));

  return <Gallery images={images} />;
}
