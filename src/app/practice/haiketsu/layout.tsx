import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "配穴の練習｜基本32穴の構成と選定理由",
  description:
    "基本32穴から経穴を選び、本治・標治の目的や組み合わせの理由を教材例と比べる練習です。個別の施術適応を判断するものではありません。",
  alternates: {
    canonical: "/practice/haiketsu",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title: `配穴の練習｜基本32穴の構成と選定理由 | ${SITE_NAME}`,
    description:
      "基本32穴から経穴を選び、本治・標治の目的や組み合わせの理由を教材例と比べる練習です。個別の施術適応を判断するものではありません。",
    url: "https://www.haritaro.jp/practice/haiketsu",
  },
};

export default function HaiketsuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
