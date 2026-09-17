import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "お問い合わせ | はり太郎の東洋医学",
  description:
    "はり太郎の東洋医学に関するご質問、学術内容・取穴解説に関するご指摘・ご感想、取材や執筆のご依頼はこちらからお問い合わせください。",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "お問い合わせ | はり太郎の東洋医学",
    description: "はり太郎の東洋医学に関するご質問、学術内容のご指摘、執筆・取材のご依頼窓口。",
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
