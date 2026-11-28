import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import AtlasDictionaryReturnLink from "@/components/tsubo/AtlasDictionaryReturnLink";
import { heguAtlasReading } from "@/components/tsubo/HeguAtlasPreview";
import { ComparisonGuideFigure } from "@/components/tsubo/atlas/ComparisonGuideFigure";
import HeguHandDiagram from "@/components/tsubo/atlas/HeguHandDiagram";
import { PointAtlasThumbnail } from "@/components/tsubo/atlas/PointAtlasDiagrams";
import { ALL_ACUPOINTS, DETAILED_ACUPOINTS } from "@/data/tsubo";
import type { AcupointMaster } from "@/data/tsubo/types";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { atlasLocationWithoutUnitNote } from "@/data/tsubo/friendlyLocations";
import { getAcupointStudies } from "@/data/tsubo/atlas/evidence";
import { ACUPOINT_PAIRS_PATH, featuredPairAnchor, featuredPairs } from "@/data/tsubo/atlas/featuredPairs";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { getAtlasComparisonGuide } from "@/data/tsubo/atlas/nearbyComparisonGuides";
import { findNearbyComparison } from "@/data/tsubo/atlas/nearbyComparisons";
import { TRADITIONAL_POINT_USES } from "@/data/tsubo/atlas/traditionalUses";
import { getAtlasSafetyNotices } from "@/data/tsubo/atlas/safetyNotices";
import { getAcupointKeyPointTypes } from "@/data/tsubo/keyPointTypes";
import type { Metadata } from "next";
import CompareClient, { type ComparisonChoice, type ComparisonPoint } from "./CompareClient";
import { comparisonPairOrigin, resolveComparisonSelection, type ComparisonSearchParams } from "./selection";
import "./compare-flow.css";

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

const commonForearmNotices = {
  caution: "腕に傷や腫れがあるときは押さず、指先にしびれが出たら刺激をやめてください。",
  symptomWarning: "胸の痛みや動悸、脈の乱れを感じるときは、ツボ押しより先に医療機関に相談してください。急な激しい胸の痛みや息苦しさがあるときは、すぐに119番へ連絡してください。",
};

// These three points share the same advice. Keep the extra circumstances for each point.
const remainingForearmNotices: Readonly<Partial<Record<string, Pick<ComparisonPoint, "caution" | "symptomWarning">>>> = {
  PC4: { caution: "二本のすじを強く押して探したり、熱いものを肌に当てたりしないでください。指先に響く痛みが出たら手を離してください。" },
  PC5: { caution: "二本のすじを見分けにくいときは、つまんだり強く押したりせず、図で確かめてください。" },
  PC6: {
    caution: "発疹のある場所は押さず、指先に電気が走るような痛みが出たら、すぐに手を離してください。",
    symptomWarning: "動悸に胸の痛みや気が遠くなる感じを伴うときも、すぐに119番へ連絡してください。",
  },
};

function comparisonCategories(point: AcupointMaster) {
  const categories = [...new Set(point.categories)];
  if (!categories.includes("兪土穴・原穴")) return categories;
  const types = getAcupointKeyPointTypes(point.codeLower);
  const stream = types.find(({ id }) => id === "shu-stream");
  if (!stream || !types.some(({ id }) => id === "yuan")) return categories;
  return [stream.label, "原穴", ...categories.filter(category => !["兪土穴・原穴", "兪土穴", "輸土穴", "原穴"].includes(category))];
}

function getComparisonPoint(point: AcupointMaster, useSharedNotices: boolean): ComparisonPoint {
  const { legacyId, code, codeLower, name, kana, romaji, meridian, meridianShort, bodyPart, locationSimple } = point;
  const article = ATLAS_ARTICLES[codeLower];
  const { pointWarning, symptomWarning } = code === "LI4"
    ? { pointWarning: heguAtlasReading.caution, symptomWarning: heguAtlasReading.symptomWarning }
    : getAtlasSafetyNotices(article);
  const remainingNotices = useSharedNotices ? remainingForearmNotices[code] : undefined;
  const marker = ATLAS_POINT_MARKERS[codeLower];
  const locationFigure = code === "LI4"
    ? <HeguHandDiagram thumbnail />
    : marker && <PointAtlasThumbnail point={point} illustration={article.illustration} marker={marker} />;
  return {
    id: legacyId, code, name, kana, romaji, meridian, meridianShort, bodyPart,
    figureRegion: code === "LI4" ? "手の甲" : code === "LR3" ? "足の甲" : bodyPart,
    locationSimple: atlasLocationWithoutUnitNote(locationSimple),
    traditional: TRADITIONAL_POINT_USES[codeLower]?.labels.join("、"),
    caution: remainingNotices?.caution ?? pointWarning ?? article.cautions[0],
    symptomWarning: remainingNotices ? remainingNotices.symptomWarning : symptomWarning,
    category: comparisonCategories(point),
    hasResearch: getAcupointStudies(codeLower).length > 0 || Boolean(DETAILED_ACUPOINTS[codeLower]?.researchEvidence),
    locationFigure,
  };
}

export default async function TsuboComparePage({ searchParams }: { searchParams: Promise<ComparisonSearchParams> }) {
  const params = await searchParams;
  const { codes: selectedCodes, unavailableCount } = resolveComparisonSelection(params, comparisonChoices);
  const forearmCodes = selectedCodes.filter(code => Object.hasOwn(remainingForearmNotices, code));
  const shareForearmNotices = forearmCodes.length > 1;
  const matchingComparison = findNearbyComparison(selectedCodes);
  const guide = matchingComparison && getAtlasComparisonGuide(matchingComparison.id);
  const requestedOrigin = comparisonPairOrigin(params);
  const origin = requestedOrigin && featuredPairs.some(pair => pair.id === requestedOrigin.pairId) ? requestedOrigin : undefined;
  const selectedTsubos = selectedCodes.flatMap(code => {
    const point = pointsByCode.get(code);
    return point ? [getComparisonPoint(point, shareForearmNotices)] : [];
  });

  return (
    <div className="tsubo-compare-page atlas-page min-h-screen">
      <div className="page-layout page-layout--intro">
        <header className="tsubo-compare-header">
          <nav aria-label="図鑑への移動" className="atlas-breadcrumb print:hidden">
            <AtlasDictionaryReturnLink className="tsubo-compare-return" />
            {origin && <a href={`${ACUPOINT_PAIRS_PATH}?return=1#${featuredPairAnchor(origin.pairId)}`} className="atlas-source-link inline-flex min-h-11 items-center">組み合わせ一覧へ</a>}
          </nav>
          <h1>ツボを比べる</h1>
        </header>
      </div>
      <CompareClient
        choices={comparisonChoices}
        selectedTsubos={selectedTsubos}
        origin={origin}
        unavailableCount={unavailableCount}
        sharedDiagram={guide ? {
          figure: <ComparisonGuideFigure guide={guide} />,
          guideHref: guide.href,
          guideLabel: "この図の目印・出典を見る",
        } : undefined}
        sharedForearmNotices={shareForearmNotices ? { ...commonForearmNotices, codes: forearmCodes } : undefined}
      />
    </div>
  );
}
