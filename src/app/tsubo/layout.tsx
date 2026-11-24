import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

const title = "全361経穴を名前・場所・症状から探す｜はり太郎のツボ図鑑";
const description = "全361のツボを名前・部位・経絡から探せます。体表図で場所と目印を確認でき、合谷やひじの曲池・尺沢・曲沢などは断面図も掲載しています。名前の由来や注意点も読めます。";

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
