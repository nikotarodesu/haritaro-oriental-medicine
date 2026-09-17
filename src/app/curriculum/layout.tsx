import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "東洋医学カリキュラム｜基礎理論から臨床実践まで体系的に学ぶ | はり太郎の東洋医学",
  description:
    "陰陽論・五行論・気血水・臓腑経絡・病因病機・診断弁証・治則治法・現代医学統合の東洋医学8大体系を網羅。段階的レクチャーと理解度確認クイズで体系的に学習できるオンライン講座。",
  alternates: {
    canonical: "/curriculum",
  },
  openGraph: {
    title: "東洋医学カリキュラム｜基礎理論から臨床実践まで体系的に学ぶ | はり太郎の東洋医学",
    description: "陰陽五行から臨床弁証まで、東洋医学8大体系を体系的レクチャーとクイズで学習。",
    url: "https://www.haritaro.jp/curriculum",
  },
};

export default function CurriculumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
