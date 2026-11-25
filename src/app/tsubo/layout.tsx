import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

const title = "標準361穴を名前・部位・経絡から探す｜はり太郎のツボ図鑑";
const description = "全361のツボを名前・部位・経絡から探せます。体表図で場所を確かめ、断面模式図で周りの骨や筋などを学べます。名前の由来や注意点も掲載しています。";

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
