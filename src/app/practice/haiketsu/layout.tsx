import { SHARED_OG_IMAGES } from "@/config/seo";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "配穴設計ツール｜本治・標治・主治のツボ処方シミュレーション",
  description:
    "主訴や弁証に応じた経穴の組み合わせをシミュレーション。五行の相生相剋バランス、要穴理論に基づき、本治・標治の役割分担を整理した配穴処方を設計。",
  alternates: {
    canonical: "/practice/haiketsu",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    title: "配穴設計ツール｜本治・標治・主治のツボ処方シミュレーション｜はり太郎",
    description:
      "主訴や弁証に応じた経穴の組み合わせをシミュレーション。五行の相生相剋バランス、要穴理論に基づき、本治・標治の役割分担を整理した配穴処方を設計。",
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
