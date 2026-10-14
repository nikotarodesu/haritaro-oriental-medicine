import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "経穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比",
  description:
    "経穴を2〜3穴並べて、位置、所属する経絡、要穴の分類、伝統的な主治、学習上の補足、注意事項を比較できます。",
  alternates: {
    canonical: "/tsubo/compare",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "経穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比 | はり太郎の東洋医学",
    description:
      "混同しやすい経穴やペア要穴を横並びで精密対比。部位・解剖・主治の鑑別ツール。",
    url: "https://www.haritaro.jp/tsubo/compare",
  },
};

export default function TsuboComparePage() {
  return (
    <div className="min-h-screen">
      {/* 検索エンジン・アクセシビリティ用 静的SSRヘッダー */}
      <header className="sr-only">
        <p>経穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比</p>
        <p>
          合谷と太衝（四関穴）、足三里と三陰交などの経穴を2〜3穴並べて比較できます。位置、要穴の分類、伝統的な主治、注意事項の違いを確認してください。
        </p>
      </header>
      <CompareClient />
    </div>
  );
}
