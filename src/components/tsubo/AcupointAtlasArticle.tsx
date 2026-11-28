import ContentEndAd from "@/components/ads/ContentEndAd";
import AcupointAnatomy from "./AcupointAnatomy";
import RegionalPointAnatomy from "./RegionalPointAnatomy";
import { AcupointComparisonLink } from "./AcupointArticleLinks";
import AcupointArticleHeader from "./AcupointArticleHeader";
import AcupointCautions from "./AcupointCautions";
import AcupointLocationComparison from "./AcupointLocationComparison";
import { AcupointNameComparison, AcupointPairNotes, hasPointPairs } from "./AcupointPairNotes";
import AcupointNameGuide from "./AcupointNameGuide";
import AcupointReferences from "./AcupointReferences";
import AcupointResearch from "./AcupointResearch";
import AcupointSelfCare from "./AcupointSelfCare";
import { AcupointCareAndResearch, AcupointLocationDetails, AcupointLocationRows, AcupointTopic } from "./AcupointTopics";
import { AcupointTraditionalUses } from "./AcupointUses";
import WhoPointLocation from "./WhoPointLocation";
import NearbyPointComparison from "./atlas/NearbyPointComparison";
import { PointAtlasLocationFigure, PointAtlasLocationSupplement, PointAtlasThumbnail } from "./atlas/PointAtlasDiagrams";
import { getNearbyComparisons, nearbyComparisonAnchor } from "@/data/tsubo/atlas/nearbyComparisons";
import { TRADITIONAL_POINT_USES } from "@/data/tsubo/atlas/traditionalUses";
import { whoLocationNotes } from "@/data/tsubo/atlas/whoLocations";
import { getAtlasSafetyNotices } from "@/data/tsubo/atlas/safetyNotices";
import { getRegionalSection } from "@/data/tsubo/regionalSections";
import type { AcupointDetail, AcupointMaster } from "@/data/tsubo/types";
import type { AcupointAtlasArticle as AtlasArticle, AtlasMarker } from "@/data/tsubo/atlas/types";

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  );
}

export default function AcupointAtlasArticle({ point, article, marker, meridianPoints, individualModel }: {
  point: AcupointDetail;
  article: AtlasArticle;
  marker: AtlasMarker;
  meridianPoints: readonly AcupointMaster[];
  individualModel: boolean;
}) {
  const { comparisonNotes, researchNotes } = article;
  const nearbyComparisons = getNearbyComparisons(point.codeLower);
  const illustratedNeighbors = article.relatedPoints.flatMap(({ code }) => {
    const neighbor = code.toLowerCase();
    const comparison = nearbyComparisons.find(group => group.points.some(point => point.code === neighbor));
    return comparison ? [{ code: neighbor, comparisonId: comparison.id }] : [];
  });
  const nearbyCards = article.relatedPoints.filter(({ code }) => !illustratedNeighbors.some(neighbor => neighbor.code === code.toLowerCase()));
  const hasIndividualAnatomy = individualModel && !!point.crossSection;
  const regionalSection = hasIndividualAnatomy ? undefined : getRegionalSection(point.codeLower);
  const locationNotes = article.expert.filter((paragraph) => paragraph !== whoLocationNotes[point.codeLower]);
  const { pointWarning, symptomWarning } = getAtlasSafetyNotices(article);
  const hasPairs = hasPointPairs(point);
  const hasSymptomTiles = Boolean(TRADITIONAL_POINT_USES[point.codeLower]);
  const hasTraditional = hasSymptomTiles || article.traditional.length > 0;

  return (
    <article data-atlas-point={point.code} className="page-layout atlas-page atlas-entry">
      <AcupointArticleHeader point={point} />
      <AcupointNameGuide code={point.codeLower} />
      <AcupointTopic topic="location">
        <div id="acupoint-location" tabIndex={-1} className="atlas-target">
          <PointAtlasLocationFigure point={point} illustration={article.illustration} marker={marker} />
        </div>
        <AcupointLocationRows>
          <AcupointLocationDetails>
            <PointAtlasLocationSupplement point={point} meridianPoints={meridianPoints} illustration={article.illustration} marker={marker} finding={[...article.location, ...locationNotes]}>
              <WhoPointLocation code={point.codeLower} pointName={point.name} />
            </PointAtlasLocationSupplement>
          </AcupointLocationDetails>
          {hasIndividualAnatomy && <AcupointAnatomy point={point} />}
          {regionalSection && (
            <RegionalPointAnatomy
              code={point.code}
              name={point.name}
              section={regionalSection}
              locationHref="#acupoint-location"
              surface={<PointAtlasThumbnail point={point} illustration={article.illustration} marker={marker} />}
            />
          )}
        </AcupointLocationRows>
      </AcupointTopic>

      {hasTraditional && (
        <AcupointTopic topic="uses">
          <AcupointTraditionalUses code={point.codeLower} />
          {article.traditional.length > 0 && (
            <div id={hasSymptomTiles ? undefined : "acupoint-traditional"} className="atlas-target">
              <Paragraphs paragraphs={article.traditional} />
            </div>
          )}
        </AcupointTopic>
      )}

      <AcupointCareAndResearch preserveUsesAnchor={!hasTraditional}>
        <AcupointCautions priority={(symptomWarning || pointWarning) && <>
          {symptomWarning && <p>{symptomWarning}</p>}
          {pointWarning && <p>{pointWarning}</p>}
        </>}>
          <Paragraphs paragraphs={article.cautions} />
          {article.selfCare.length > 0 && <Paragraphs paragraphs={article.selfCare} />}
        </AcupointCautions>
        <AcupointSelfCare code={point.codeLower} />
        <AcupointResearch point={point} anchorId={hasTraditional ? "acupoint-study-overview" : undefined}
          context={researchNotes && { title: "出典に挙げた研究", paragraphs: researchNotes }} />
      </AcupointCareAndResearch>

      <AcupointTopic topic="nearby">
        <AcupointLocationComparison point={point} related={nearbyCards}>
          {nearbyComparisons.map((comparison, index) => (
            <NearbyPointComparison
              key={`${point.codeLower}-${comparison.id}`}
              comparison={comparison}
              code={point.codeLower}
              anchorId={nearbyComparisonAnchor(point.codeLower, comparison.id)}
              initiallyOpen={index === 0}
              pairedCodes={illustratedNeighbors.filter(neighbor => neighbor.comparisonId === comparison.id).map(neighbor => neighbor.code)}
            />
          ))}
          <AcupointComparisonLink code={point.code} />
        </AcupointLocationComparison>
        {comparisonNotes && (
          <div className="atlas-study-details">
            <h3 className="font-semibold">{comparisonNotes.title}</h3>
            <Paragraphs paragraphs={comparisonNotes.paragraphs} />
          </div>
        )}
        {article.similarNamePoints && <AcupointLocationComparison point={point} related={article.similarNamePoints} byName />}
        <AcupointNameComparison point={point} />
      </AcupointTopic>

      {hasPairs && <AcupointTopic topic="pairs"><AcupointPairNotes point={point} /></AcupointTopic>}

      <div className="atlas-secondary-sections">
        <AcupointReferences point={point} editorialLinks={article.symptomLinks} sources={article.sources} />
      </div>
      <ContentEndAd key={point.code} />
    </article>
  );
}
