import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "経穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比",
  description:
    "混同しやすい近隣経穴や表裏経・相生相克の要穴を横並びで徹底比較。取穴部位・解剖構造・主治効能・刺鍼深度の違いを一目で確認できます。",
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
        <h1>経穴比較ツール｜ツボの場所・鑑別・臨床配合の横並び対比</h1>
        <p>
          合谷と太衝（四関穴）、足三里と三陰交など、部位や主治が混同しやすい経穴を2〜3穴並べて比較。取穴部位、解剖断面、要穴分類、刺鍼注意点を一覧対比できます。
        </p>
      </header>
      <CompareClient />
    </div>
  );
}
