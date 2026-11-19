import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { heguAtlasReading } from "@/components/tsubo/HeguAtlasPreview";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { TSUBOS } from "@/data/tsuboData";
import type { Metadata } from "next";
import CompareClient, { type ComparisonPoint } from "./CompareClient";

const title = "経穴比較ツール｜ツボの位置・経絡・注意点";
const description = "経穴を2〜3穴並べて、位置、所属経絡、要穴の分類、安全上の注意、伝統での位置づけを比較できます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tsubo/compare",
  },
  openGraph: {
    images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title,
    description,
    url: "https://www.haritaro.jp/tsubo/compare",
  },
};

const comparisonPoints = TSUBOS.map((point): ComparisonPoint => {
  const { id, code, name, kana, romaji, meridian, meridianShort, bodyPart, locationSimple, clinicalNote } = point;
  const article = ATLAS_ARTICLES[code.toLowerCase()];
  const reading = code === "LI4" ? heguAtlasReading : {
    traditional: article.traditional[0],
    caution: article.safetyWarning ?? article.cautions[0],
  };
  return {
    id, code, name, kana, romaji, meridian, meridianShort, bodyPart, locationSimple, clinicalNote,
    category: [...new Set(point.category)],
    ...reading,
  };
});

export default function TsuboComparePage() {
  return (
    <div className="min-h-screen">
      {/* 検索エンジン・アクセシビリティ用 静的SSRヘッダー */}
      <header className="sr-only">
        <p>{title}</p>
        <p>{description}</p>
      </header>
      <CompareClient points={comparisonPoints} />
    </div>
  );
}
