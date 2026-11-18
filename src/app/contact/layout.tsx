import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "はり太郎の掲載内容・経穴の解説・出典に関するご指摘や、取材・執筆のご依頼の窓口です。",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "お問い合わせ",
    description: "はり太郎の掲載内容・出典に関するご指摘や、取材・執筆のご依頼の窓口です。",
    url: "https://www.haritaro.jp/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
