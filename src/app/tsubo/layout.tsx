import { SHARED_OG_IMAGES } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経穴辞典（全361穴）｜部位・経絡・主治・取穴法",
  description:
    "WHO標準経穴部位に準拠した361穴の経穴辞典。部位別・経絡別・要穴（原穴・合穴・背部兪穴・腹募穴等）での絞り込み、解剖学的取穴法、臨床応用知見、日常のセルフケア目安を網羅。",
  alternates: {
    canonical: "/tsubo",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    title: "経穴辞典（全361穴）｜部位・経絡・主治・取穴法｜はり太郎",
    description:
      "WHO標準経穴部位に準拠した361穴の経穴辞典。部位別・経絡別・要穴（原穴・合穴・背部兪穴・腹募穴等）での絞り込み、解剖学的取穴法、臨床応用知見、日常のセルフケア目安を網羅。",
    url: "https://www.haritaro.jp/tsubo",
  },
};

export default function TsuboLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
