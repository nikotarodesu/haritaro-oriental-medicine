import Link from "next/link";
import ContentEndAd from "@/components/ads/ContentEndAd";
import AcupointAnatomy from "./AcupointAnatomy";
import RegionalPointAnatomy from "./RegionalPointAnatomy";
import { AcupointComparisonLink, AcupointStudyLinks } from "./AcupointArticleLinks";
import AcupointArticleHeader from "./AcupointArticleHeader";
import AcupointCautions from "./AcupointCautions";
import AcupointLocationComparison from "./AcupointLocationComparison";
import { AcupointNameComparison, AcupointPairNotes, hasPointPairs } from "./AcupointPairNotes";
import AcupointReferences, { AcupointPointBasics } from "./AcupointReferences";
import AcupointResearch from "./AcupointResearch";
import AcupointSelfCare from "./AcupointSelfCare";
import { AcupointTopic, AcupointTopicNav } from "./AcupointTopics";
import { AcupointTraditionalUses } from "./AcupointUses";
import WhoPointLocation from "./WhoPointLocation";
import NearbyPointComparison from "./atlas/NearbyPointComparison";
import PointAtlasDiagrams, { PointAtlasThumbnail } from "./atlas/PointAtlasDiagrams";
import { getAtlasComparisonGuide } from "@/data/tsubo/atlas/nearbyComparisonGuides";
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
  const comparisonGuide = nearbyComparisons.map(({ id }) => getAtlasComparisonGuide(id)).find(Boolean);
  const firstComparison = nearbyComparisons[0];
  const hasIndividualAnatomy = individualModel && !!point.crossSection;
  const regionalSection = hasIndividualAnatomy ? undefined : getRegionalSection(point.codeLower);
  const locationNotes = article.expert.filter((paragraph) => paragraph !== whoLocationNotes[point.codeLower]);
  const { pointWarning, symptomWarning } = getAtlasSafetyNotices(article);
  const hasPairs = hasPointPairs(point);
  const researchOnly = !TRADITIONAL_POINT_USES[point.codeLower] && article.traditional.length === 0;

  return (
    <article data-atlas-point={point.code} className="page-layout atlas-page atlas-entry">
      <AcupointArticleHeader point={point} />
      {(pointWarning || symptomWarning) && (
        <aside className="atlas-caution-priority space-y-2" aria-label="このツボを探す前に">
          {symptomWarning && <div><p className="font-semibold">症状がある場合の受診目安</p><p>{symptomWarning}</p></div>}
          {pointWarning && <div><p className="font-semibold">ツボごとの注意</p><p>{pointWarning}</p></div>}
        </aside>
      )}
      <AcupointTopicNav topics={["location", "uses", "nearby", ...(hasPairs ? ["pairs" as const] : [])]} researchOnly={researchOnly} />

      <AcupointTopic topic="location" whoLink>
        <div id="acupoint-location" tabIndex={-1} className="atlas-target">
          <PointAtlasDiagrams point={point} meridianPoints={meridianPoints} illustration={article.illustration} marker={marker} finding={article.location}>
            <WhoPointLocation code={point.codeLower} pointName={point.name} />
            {!hasIndividualAnatomy && locationNotes.length > 0 && (
              <div className="atlas-location-expert">
                <h3>位置図の補足</h3>
                <Paragraphs paragraphs={locationNotes} />
              </div>
            )}
          </PointAtlasDiagrams>
          <div className="atlas-location-links">
            {comparisonGuide ? (
              <Link className="atlas-source-link inline-flex min-h-11 items-center" href={comparisonGuide.href} prefetch={false}>
                {comparisonGuide.title}を見る
              </Link>
            ) : firstComparison && (
              <a className="atlas-source-link inline-flex min-h-11 items-center" href={`#${nearbyComparisonAnchor(point.codeLower, firstComparison.id)}`}>
                近いツボを同じ図で比べる
              </a>
            )}
            <AcupointStudyLinks code={point.code} />
          </div>
        </div>

        {hasIndividualAnatomy && <AcupointAnatomy point={point} paragraphs={article.expert} />}
        {regionalSection && (
          <RegionalPointAnatomy
            code={point.code}
            name={point.name}
            section={regionalSection}
            locationHref="#acupoint-location"
            surface={<PointAtlasThumbnail point={point} illustration={article.illustration} marker={marker} />}
          />
        )}
      </AcupointTopic>

      <AcupointTopic topic="uses" researchOnly={researchOnly}>
        <AcupointTraditionalUses code={point.codeLower} />
        {article.traditional.length > 0 && (
          <div className="atlas-study-details">
            <h3 className="font-semibold">使われ方の補足</h3>
            <Paragraphs paragraphs={article.traditional} />
          </div>
        )}
        <AcupointResearch point={point} context={researchNotes && { title: "出典に挙げた研究", paragraphs: researchNotes }} />
        <AcupointCautions>
          <Paragraphs paragraphs={article.cautions} />
          {article.selfCare.length > 0 && <Paragraphs paragraphs={article.selfCare} />}
          {hasIndividualAnatomy && (
            <p>断面図は、周りの骨や筋を学ぶための図です。鍼を刺す深さや向きは図から判断できません。</p>
          )}
        </AcupointCautions>
        <AcupointSelfCare code={point.codeLower} />
      </AcupointTopic>

      <AcupointTopic topic="nearby">
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
        {comparisonNotes && (
          <div className="atlas-study-details">
            <h3 className="font-semibold">{comparisonNotes.title}</h3>
            <Paragraphs paragraphs={comparisonNotes.paragraphs} />
          </div>
        )}
        <AcupointNameComparison point={point} />
      </AcupointTopic>

      {hasPairs && <AcupointTopic topic="pairs"><AcupointPairNotes point={point} /></AcupointTopic>}

      <div className="atlas-secondary-sections">
        <AcupointPointBasics point={point} meridianReading={article.meridianReading} />
        <AcupointReferences point={point} editorialLinks={article.symptomLinks} sources={article.sources} />
      </div>
      <ContentEndAd key={point.code} />
    </article>
  );
}
