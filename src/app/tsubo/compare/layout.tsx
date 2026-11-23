import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

const description = "合谷と太衝、内関と外関など、混同しやすい経穴や伝統的な配穴（開四関・表裏相応など）を8大項目で横並び比較。解剖通過層・主治適応症・取穴手順の相違点を徹底対比。";
const title = seriesPageTitle("経穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比", "dictionary");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tsubo/compare",
  },
  ...pageSocialMetadata(title, description, "/tsubo/compare"),
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
