import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比",
  description:
    "合谷と太衝、内関と外関など、混同しやすい経穴や伝統的な配穴（開四関・表裏相応など）を8大項目で横並び比較。解剖通過層・主治適応症・取穴手順の相違点を徹底対比。",
  alternates: {
    canonical: "/tsubo/compare",
  },
  openGraph: {
    title: "2穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比 | はり太郎の東洋医学",
    description: "合谷と太衝、内関と外関など、混同しやすい経穴や伝統的な配穴を8大項目で横並び比較。",
    url: "https://www.haritaro.jp/tsubo/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
