import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "お悩み・症状別ツボ検索ガイド｜頭痛・肩こり・不眠・胃腸の東洋医学ケア | はり太郎の東洋医学",
  description:
    "頭・首・肩の凝り、自律神経・不眠、胃腸疲労、女性特有の不調など、お悩み別の原因弁証と効果的なツボ・セルフケア配穴ガイド。東洋医学と現代医学の統合的アプローチで解説。",
  alternates: {
    canonical: "/symptoms",
  },
  openGraph: {
    title: "お悩み・症状別ツボ検索ガイド｜頭痛・肩こり・不眠・胃腸の東洋医学ケア | はり太郎の東洋医学",
    description: "症状別の原因弁証と効果的なツボ・セルフケア配穴ガイド。統合的アプローチで解説。",
    url: "https://www.haritaro.jp/symptoms",
  },
};

export default function SymptomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
