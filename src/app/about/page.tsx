import { MicroCMSDate } from "microcms-js-sdk";
import { Metadata } from "next";
import About from "@/components/About";
import client from "@/lib/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "ABOUT",
};

type GetAboutData = MicroCMS.About & MicroCMSDate;

async function getAbout(): Promise<GetAboutData> {
  const response = await client.get<MicroCMS.About & MicroCMSDate>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "about",
  });

  return response;
}

export default async function Page(): Promise<JSX.Element> {
  const { profile } = await getAbout();

  return <About profile={profile} />;
}
