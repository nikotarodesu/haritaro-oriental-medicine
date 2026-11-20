import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import type { Metadata } from "next";
import React from "react";

const compareDescription = "冷えやほてりが重なる例などを横に並べ、どの所見が候補に合うか、まだ何を確かめる必要があるかを比べます。";

export const metadata: Metadata = {
  title: "鑑別例を見比べる｜弁証の練習",
  description: compareDescription,
  alternates: {
    canonical: "/simulator",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "鑑別例を見比べる｜弁証の練習",
    description: compareDescription,
    url: "https://www.haritaro.jp/simulator",
  },
};

export default function SimulatorCompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
