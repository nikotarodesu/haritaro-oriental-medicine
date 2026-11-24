import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import ContentEndAd from "@/components/ads/ContentEndAd";
import AcupointAnatomy from "./AcupointAnatomy";
import { AcupointComparisonLink, AcupointReadingLinks } from "./AcupointArticleLinks";
import AcupointArticleHeader, { AcupointPointDetails } from "./AcupointArticleHeader";
import AcupointCautions from "./AcupointCautions";
import AcupointLocationComparison from "./AcupointLocationComparison";
import AcupointLocationImage from "./AcupointLocationImage";
import AcupointNameGuide from "./AcupointNameGuide";
import AcupointResearch from "./AcupointResearch";
import WhoPointLocation from "./WhoPointLocation";
import NearbyPointComparison from "./atlas/NearbyPointComparison";
import PointAtlasDiagrams from "./atlas/PointAtlasDiagrams";
import { getNearbyComparisons, nearbyComparisonAnchor } from "@/data/tsubo/atlas/nearbyComparisons";
import type { AcupointDetail, AcupointMaster } from "@/data/tsubo/types";
import type { AcupointAtlasArticle as AtlasArticle, AtlasMarker } from "@/data/tsubo/atlas/types";

const headingClass = "atlas-section-title";
const linkClass = "font-semibold underline underline-offset-4";

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
  const traditionalTitle = article.traditionalTitle ?? "伝統的な使われ方";
  const nearbyComparisons = getNearbyComparisons(point.codeLower);
  const hasAnatomyDiagram = individualModel && !!point.crossSection;

  return (
    <article data-atlas-point={point.code} className="page-layout atlas-page atlas-entry">
      <AcupointArticleHeader point={point} lead={article.lead} hasAnatomyDiagram={hasAnatomyDiagram} />

      <section id="acupoint-location" className="atlas-target">
        <h2 className={headingClass}>場所と見つけ方</h2>
        <PointAtlasDiagrams point={point} meridianPoints={meridianPoints} illustration={article.illustration} marker={marker}>
          <div className="atlas-location-copy">
            <h3>図の読み方</h3>
            <Paragraphs paragraphs={article.location} />
          </div>
          <WhoPointLocation code={point.codeLower} pointName={point.name} />
          <AcupointPointDetails point={point} meridianReading={article.meridianReading} />
          <AcupointLocationImage code={point.codeLower} />
        </PointAtlasDiagrams>
      </section>

      <AcupointCautions>
        {article.safetyWarning && <p className="font-semibold">{article.safetyWarning}</p>}
        <Paragraphs paragraphs={article.cautions} />
        {article.visualOnly && <Paragraphs paragraphs={article.selfCare} />}
        {hasAnatomyDiagram && (
          <p>断面図は、周りの骨や筋を学ぶための図です。鍼を刺す深さや向きは図から判断できません。</p>
        )}
      </AcupointCautions>

      {hasAnatomyDiagram && <AcupointAnatomy point={point} paragraphs={article.expert} />}

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

      <section id="acupoint-traditional" className="atlas-target">
        <h2 className={headingClass}>{traditionalTitle}</h2>
        <Paragraphs paragraphs={article.traditional} />
        <AcupointReadingLinks code={point.codeLower} editorialLinks={article.symptomLinks} />
      </section>

      {!article.visualOnly && (
        <section>
          <h2 className={headingClass}>自分で押してみる</h2>
          <Paragraphs paragraphs={article.selfCare} />
        </section>
      )}

      <AcupointResearch point={point} traditionalTitle={traditionalTitle} />
      <AcupointNameGuide code={point.codeLower} />

      {!hasAnatomyDiagram && article.expert.length > 0 && (
        <details className="atlas-disclosure atlas-reading-details">
          <summary>位置図の補足</summary>
          <Paragraphs paragraphs={article.expert} />
        </details>
      )}

      <section id="acupoint-sources" className="atlas-target">
        <h2 className={headingClass}>出典</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
          {article.sources.map(({ name, url, scope }) => (
            <li key={url}>{scope}{" "}<a href={url} className={linkClass}>{name}</a></li>
          ))}
        </ul>
      </section>
      <AuthorSupervisorCard pointLocationChecked />
      <ContentEndAd key={point.code} />
    </article>
  );
}
