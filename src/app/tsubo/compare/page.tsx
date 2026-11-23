import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import PageIntro from "@/components/design/PageIntro";
import { heguAtlasReading } from "@/components/tsubo/HeguAtlasPreview";
import { ALL_ACUPOINTS, DETAILED_ACUPOINTS } from "@/data/tsubo";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { getAcupointStudies } from "@/data/tsubo/atlas/evidence";
import type { Metadata } from "next";
import CompareClient, { ComparePrintButton, type ComparisonPoint } from "./CompareClient";

const title = seriesPageTitle("経穴比較ツール｜ツボの位置・経絡・注意点", "dictionary");
const description = `ツボ図鑑の全${ALL_ACUPOINTS.length}穴から経穴を2〜3穴選び、位置、経絡、分類、安全上の注意を比較できます。研究を掲載した経穴は図鑑の出典へ進めます。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tsubo/compare",
  },
  ...pageSocialMetadata(title, description, "/tsubo/compare"),
};

const comparisonPoints = ALL_ACUPOINTS.map((point): ComparisonPoint => {
  const { legacyId, code, codeLower, name, kana, romaji, meridian, meridianShort, bodyPart, locationSimple, clinicalNote, categories } = point;
  const article = ATLAS_ARTICLES[codeLower];
  const reading = code === "LI4" ? heguAtlasReading : {
    traditional: article.traditional[0],
    caution: article.safetyWarning ?? article.cautions[0],
  };
  return {
    id: legacyId, code, name, kana, romaji, meridian, meridianShort, bodyPart, locationSimple, clinicalNote,
    category: [...new Set(categories)],
    hasResearch: getAcupointStudies(codeLower).length > 0 || Boolean(DETAILED_ACUPOINTS[codeLower]?.researchEvidence),
    ...reading,
  };
});

export default function TsuboComparePage() {
  return (
    <div className="tsubo-compare-page min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      <div className="page-layout page-layout--intro print:hidden">
        <PageIntro compact eyebrow="位置・分類を並べて確認" title="経穴を比べる" description={`収録した${comparisonPoints.length}穴から2〜3穴を選び、ツボの位置や分類、安全上の注意を比べます。`} art="points">
          <ComparePrintButton />
        </PageIntro>
      </div>
      <CompareClient points={comparisonPoints} />
    </div>
  );
}
