import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "学習ノート・臨床ノート｜学びの振り返り・臨床記録・配穴ストック",
  description:
    "講義や架空症例の要点・判断理由を残して以前の学びと比較できる学習ノート。臨床ノート、配穴ストック、養生シート印刷も利用できます。",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title: `学習ノート・臨床ノート｜学びの振り返り・臨床記録・配穴ストック | ${SITE_NAME}`,
    description:
      "講義や架空症例の要点・判断理由を残して以前の学びと比較できる学習ノート。臨床ノート、配穴ストック、養生シート印刷も利用できます。",
    url: "https://www.haritaro.jp/notes",
  },
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
