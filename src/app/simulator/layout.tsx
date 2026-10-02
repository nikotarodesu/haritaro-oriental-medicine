import { SHARED_OG_IMAGES } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "臨床弁証シミュレーター｜八綱・気血水・臓腑を整理",
  description:
    "症状や所見を整理し、八綱・気血水・臓腑の視点から弁証を検討する補助ツール。学習と臨床推論の振り返りに活用できます。",
  alternates: {
    canonical: "/simulator",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    title: "臨床弁証シミュレーター｜八綱・気血水・臓腑を整理",
    description:
      "症状や所見を整理し、八綱・気血水・臓腑の視点から弁証を検討する補助ツール。学習と臨床推論の振り返りに活用できます。",
    url: "https://www.haritaro.jp/simulator",
  },
};

export default function SimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
