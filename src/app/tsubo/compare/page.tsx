import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import Link from "next/link";
import AtlasOverviewArt from "@/components/tsubo/AtlasOverviewArt";
import { heguAtlasReading } from "@/components/tsubo/HeguAtlasPreview";
import HeguHandDiagram from "@/components/tsubo/atlas/HeguHandDiagram";
import { PointAtlasThumbnail } from "@/components/tsubo/atlas/PointAtlasDiagrams";
import { ALL_ACUPOINTS, DETAILED_ACUPOINTS } from "@/data/tsubo";
import type { AcupointMaster } from "@/data/tsubo/types";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { getAcupointStudies } from "@/data/tsubo/atlas/evidence";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { getAtlasLearningPair } from "@/data/tsubo/atlas/learningPairs";
import type { Metadata } from "next";
import CompareClient, { type ComparisonChoice, type ComparisonPoint } from "./CompareClient";
import { resolveComparisonCodes, type ComparisonSearchParams } from "./selection";

const title = seriesPageTitle("経穴比較ツール｜ツボの位置・経絡・注意点", "dictionary");
const description = `ツボ図鑑の全${ALL_ACUPOINTS.length}穴から選んだツボを図で見比べ、場所の目印、所属する経絡、分類、安全上の注意を確認できます。各ツボの詳しい図や、掲載している研究の出典にも進めます。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tsubo/compare",
  },
  ...pageSocialMetadata(title, description, "/tsubo/compare"),
};

const comparisonChoices: ComparisonChoice[] = ALL_ACUPOINTS.map(
  ({ legacyId, code, name, kana, romaji, meridian, meridianShort }) =>
    ({ id: legacyId, code, name, kana, romaji, meridian, meridianShort }),
);
const pointsByCode = new Map(ALL_ACUPOINTS.map(point => [point.code, point]));

function getComparisonPoint(point: AcupointMaster): ComparisonPoint {
  const { legacyId, code, codeLower, name, kana, romaji, meridian, meridianShort, bodyPart, locationSimple, clinicalNote, categories } = point;
  const article = ATLAS_ARTICLES[codeLower];
  const reading = code === "LI4" ? heguAtlasReading : {
    traditional: article.traditional[0],
    caution: article.safetyWarning ?? article.cautions[0],
  };
  const marker = ATLAS_POINT_MARKERS[codeLower];
  const locationFigure = code === "LI4"
    ? <HeguHandDiagram thumbnail />
    : marker && <PointAtlasThumbnail point={point} illustration={article.illustration} marker={marker} />;
  return {
    id: legacyId, code, name, kana, romaji, meridian, meridianShort, bodyPart, locationSimple, clinicalNote,
    category: [...new Set(categories)],
    hasResearch: getAcupointStudies(codeLower).length > 0 || Boolean(DETAILED_ACUPOINTS[codeLower]?.researchEvidence),
    locationFigure,
    ...reading,
  };
}

export default async function TsuboComparePage({ searchParams }: { searchParams: Promise<ComparisonSearchParams> }) {
  const selectedCodes = resolveComparisonCodes(await searchParams, comparisonChoices);
  const learningPair = getAtlasLearningPair(selectedCodes);
  const selectedTsubos = selectedCodes.flatMap(code => {
    const point = pointsByCode.get(code);
    return point ? [getComparisonPoint(point)] : [];
  });

  return (
    <div className="tsubo-compare-page atlas-page min-h-screen">
      <div className="page-layout page-layout--intro">
        <header className="atlas-directory-header atlas-directory-intro">
          <div>
            <nav aria-label="パンくず" className="atlas-breadcrumb">
              <Link href="/tsubo">はり太郎のツボ図鑑</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">比較</span>
            </nav>
            <h1>経穴を比べる</h1>
            <p>{comparisonChoices.length}穴から2〜3穴を選び、場所の目印や注意点を比べます。</p>
            {learningPair && (
              <div className="mt-3 print:hidden">
                <Link
                  href={`/cases/${learningPair.caseId}`}
                  prefetch={false}
                  className="page-secondary-action"
                  data-analytics-action="compare_case"
                >
                  {learningPair.caseLabel}
                </Link>
                <p className="text-sm">{learningPair.casePrompt}</p>
              </div>
            )}
          </div>
          <AtlasOverviewArt />
        </header>
      </div>
      <CompareClient choices={comparisonChoices} selectedTsubos={selectedTsubos} />
    </div>
  );
}
