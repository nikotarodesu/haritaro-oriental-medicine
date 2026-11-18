import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

const title = "全361経穴を名前・場所・症状から探す｜はり太郎のツボ図鑑";
const description = "合谷や足三里など、全361のツボを名前・部位・経絡から探せます。場所を見つける目印や注意点を知りたい方へ。気になる症状から読める12のガイドもあります。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/tsubo",
  },
  openGraph: {
    images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title,
    description,
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
