import ContentEndAd from "@/components/ads/ContentEndAd";
import AcupointAnatomy from "./AcupointAnatomy";
import RegionalPointAnatomy from "./RegionalPointAnatomy";
import { AcupointComparisonLink } from "./AcupointArticleLinks";
import AcupointArticleHeader from "./AcupointArticleHeader";
import AcupointCautions from "./AcupointCautions";
import AcupointLocationComparison from "./AcupointLocationComparison";
import AcupointReferences from "./AcupointReferences";
import AcupointResearch from "./AcupointResearch";
import AcupointSelfCare from "./AcupointSelfCare";
import { AcupointTraditionalUses } from "./AcupointUses";
import FeaturedAcupointPairs from "./FeaturedAcupointPairs";
import WhoPointLocation from "./WhoPointLocation";
import NearbyPointComparison from "./atlas/NearbyPointComparison";
import PointAtlasDiagrams, { PointAtlasThumbnail } from "./atlas/PointAtlasDiagrams";
import { getNearbyComparisons, nearbyComparisonAnchor } from "@/data/tsubo/atlas/nearbyComparisons";
import { WHO_ATLAS_PDF, whoAtlasPages } from "@/data/tsubo/atlas/whoAtlasPages";
import { whoLocations } from "@/data/tsubo/atlas/whoLocations";
import { getRegionalSection } from "@/data/tsubo/regionalSections";
import { ATLAS_SELF_CARE } from "@/data/tsubo/atlas/selfCare";
import type { AcupointDetail, AcupointMaster } from "@/data/tsubo/types";
import type { AcupointAtlasArticle as AtlasArticle, AtlasMarker } from "@/data/tsubo/atlas/types";

const headingClass = "atlas-section-title";

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
  const { traditionalTitle } = article;
  const contextTitle = traditionalTitle && traditionalTitle !== "伝統的な使われ方" ? traditionalTitle : "使われ方の補足";
  const nearbyComparisons = getNearbyComparisons(point.codeLower);
  const hasIndividualAnatomy = individualModel && !!point.crossSection;
  const regionalSection = hasIndividualAnatomy ? undefined : getRegionalSection(point.codeLower);
  const positionPage = whoAtlasPages[point.codeLower];

  return (
    <article data-atlas-point={point.code} className="page-layout atlas-page atlas-entry">
      <AcupointArticleHeader point={point} lead={article.lead} hasAnatomyDiagram={hasIndividualAnatomy || !!regionalSection} />

      <AcupointTraditionalUses code={point.codeLower} />

      <section id="acupoint-location" className="atlas-target">
        <h2 className={headingClass}>場所と見つけ方</h2>
        <PointAtlasDiagrams point={point} meridianPoints={meridianPoints} illustration={article.illustration} marker={marker} finding={article.location}>
          <WhoPointLocation code={point.codeLower} pointName={point.name} />
          {!hasIndividualAnatomy && article.expert.length > 0 && (
            <div className="atlas-location-expert">
              <h3>位置図の補足</h3>
              <Paragraphs paragraphs={article.expert} />
            </div>
          )}
        </PointAtlasDiagrams>
      </section>

      <div className="atlas-care-section">
        <AcupointCautions initiallyOpen={Boolean(ATLAS_SELF_CARE[point.codeLower]?.length)} priority={article.safetyWarning && <p>{article.safetyWarning}</p>}>
          <Paragraphs paragraphs={article.cautions} />
          {article.selfCare.length > 0 && <Paragraphs paragraphs={article.selfCare} />}
          {hasIndividualAnatomy && (
            <p>断面図は、周りの骨や筋を学ぶための図です。鍼を刺す深さや向きは図から判断できません。</p>
          )}
        </AcupointCautions>
        <AcupointSelfCare code={point.codeLower} />
      </div>

      {hasIndividualAnatomy && <AcupointAnatomy point={point} paragraphs={article.expert} />}
      {regionalSection && (
        <RegionalPointAnatomy
          code={point.code}
          name={point.name}
          section={regionalSection}
          position={whoLocations[point.codeLower]}
          locationSource={positionPage ? { title: `WHO原本 p.${positionPage - 9}（PDF）`, url: `${WHO_ATLAS_PDF}#page=${positionPage}` } : undefined}
          surface={<PointAtlasThumbnail point={point} illustration={article.illustration} marker={marker} />}
        />
      )}

      <AcupointLocationComparison point={point} related={article.relatedPoints}>
        {nearbyComparisons.map((comparison, index) => (
          <NearbyPointComparison
            key={`${point.codeLower}-${comparison.id}`}
            comparison={comparison}
            code={point.codeLower}
            anchorId={nearbyComparisonAnchor(point.codeLower, comparison.id)}
            initiallyOpen={index === 0}
          />
        ))}
        <AcupointComparisonLink code={point.code} />
      </AcupointLocationComparison>

      <div className="atlas-secondary-sections">
        <FeaturedAcupointPairs pointCode={point.codeLower} />
        <AcupointResearch point={point} context={{ title: contextTitle, paragraphs: article.traditional }} />
        <AcupointReferences point={point} meridianReading={article.meridianReading} editorialLinks={article.symptomLinks} sources={article.sources} />
      </div>
      <ContentEndAd key={point.code} />
    </article>
  );
}
