import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export type PostEmailBody = {
  budget: number;
  companyName: string;
  deadline: string;
  email: string;
  name: string;
  subject: string;
  text: string;
};

export type PostEmailData = Record<string, never>;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostEmailData>> {
  const { budget, companyName, deadline, email, name, subject, text } =
    (await request.json()) as PostEmailBody;

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      port: 465,
      secure: true,
      service: "gmail",
    });

    await transporter.verify();

    await transporter.sendMail({
      replyTo: `"${[name, companyName]
        .filter((v) => !!v)
        .join(" - ")}" <${email}>`,
      subject: `【7:08 オフィシャルサイト】${subject}`,
      text: `${text}\n\n予算：${budget.toLocaleString()}円\n納期：${dayjs(
        deadline,
      ).format("YYYY年MM月DD日")}`,
      to: process.env.NODEMAILER_AUTH_USER,
    });

    return NextResponse.json<PostEmailData>({});
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
