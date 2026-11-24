import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

const title = "全361経穴を名前・場所・症状から探す｜はり太郎のツボ図鑑";
const description = "全361のツボを名前・部位・経絡から探せます。図で場所と目印を確認でき、合谷・内関・足三里は骨や筋、腱を断面図でも学べます。名前の由来や注意点も掲載しています。";

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
