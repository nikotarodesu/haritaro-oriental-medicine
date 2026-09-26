import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "東洋医学コラム・文献抄読・臨床知見アーカイブ",
  description:
    "古典（素問・霊枢・傷寒論・鍼灸大成）の精緻な読み解きから最新の現代医学・神経科学論文抄読、臨床実践知見まで。東洋医学の奥深さを探求する学術解説アーカイブ。",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "東洋医学コラム・文献抄読・臨床知見アーカイブ",
    description: "古典文献の精緻な読み解きから最新医学論文抄読、臨床知見までを網羅した解説記事アーカイブ。",
    url: "https://www.haritaro.jp/articles",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
