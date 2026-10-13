import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経穴辞典（全361穴）｜部位・経絡・主治・取穴法",
  description:
    "WHO標準経穴部位を参照した361穴の経穴辞典。名前、部位、経絡、要穴の分類から検索できます。各経穴の位置、伝統的な主治、注意事項を学べます。個別の記載は確認・更新中です。",
  alternates: {
    canonical: "/tsubo",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title: `経穴辞典（全361穴）｜部位・経絡・主治・取穴法 | ${SITE_NAME}`,
    description:
      "WHO標準経穴部位を参照した361穴の経穴辞典。名前、部位、経絡、要穴の分類から検索できます。各経穴の位置、伝統的な主治、注意事項を学べます。個別の記載は確認・更新中です。",
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
