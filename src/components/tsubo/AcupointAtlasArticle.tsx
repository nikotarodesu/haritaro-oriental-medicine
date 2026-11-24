import Link from "next/link";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import ContentEndAd from "@/components/ads/ContentEndAd";
import { AcupointComparisonLink, AcupointReadingLinks, AcupointSectionLinks } from "./AcupointArticleLinks";
import AcupointArticleHeader, { AcupointPointDetails } from "./AcupointArticleHeader";
import AcupointNameGuide from "./AcupointNameGuide";
import AcupointResearch from "./AcupointResearch";
import WhoPointLocation from "./WhoPointLocation";
import CrossSectionViewer from "./CrossSectionViewer";
import NearbyPointComparison from "./atlas/NearbyPointComparison";
import PointAtlasDiagrams from "./atlas/PointAtlasDiagrams";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getAcupointByCode } from "@/data/tsubo";
import { getNearbyComparisons } from "@/data/tsubo/atlas/nearbyComparisons";
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

  return (
    <article data-atlas-point={point.code} className="page-layout atlas-page atlas-entry">
      <AcupointArticleHeader point={point} lead={article.lead} warning={article.safetyWarning} />

      <section id="acupoint-location" className="atlas-target">
        <h2 className={headingClass}>場所と見つけ方</h2>
        <PointAtlasDiagrams point={point} meridianPoints={meridianPoints} illustration={article.illustration} marker={marker}>
          <div className="atlas-location-copy">
            <h3>図の読み方</h3>
            <Paragraphs paragraphs={article.location} />
          </div>
          <WhoPointLocation code={point.codeLower} pointName={point.name} />
          <AcupointComparisonLink code={point.code} />
          <AcupointPointDetails point={point} meridianReading={article.meridianReading} />
          <AcupointSectionLinks />
        </PointAtlasDiagrams>
        {nearbyComparisons.map((comparison, index) => (
          <NearbyPointComparison
            key={comparison.id}
            comparison={comparison}
            code={point.codeLower}
            anchorId={index === 0 ? "acupoint-nearby" : `acupoint-nearby-${comparison.id}`}
          />
        ))}
      </section>

      <section id="acupoint-cautions" className="atlas-target atlas-cautions">
        <h2 className={headingClass}>注意したいこと</h2>
        {article.safetyWarning && <p className="mb-3 font-semibold">{article.safetyWarning}</p>}
        <Paragraphs paragraphs={article.cautions} />
      </section>

      <section id="acupoint-traditional" className="atlas-target">
        <h2 className={headingClass}>{traditionalTitle}</h2>
        <Paragraphs paragraphs={article.traditional} />
        <AcupointReadingLinks code={point.codeLower} editorialLinks={article.symptomLinks} />
      </section>

      <section>
        <h2 className={headingClass}>{article.visualOnly ? "図で場所を確かめる" : "自分で押してみる"}</h2>
        <Paragraphs paragraphs={article.selfCare} />
      </section>

      <AcupointNameGuide code={point.codeLower} />
      <AcupointResearch point={point} traditionalTitle={traditionalTitle} />

      <details className="atlas-disclosure atlas-reading-details">
        <summary>詳しい解剖と位置の資料</summary>
        <div className="mt-4 space-y-4">
          <Paragraphs paragraphs={article.expert} />
          <p className="text-sm">図と説明で、ツボの位置と周りの骨・筋を確かめられます。施術については、はり師・きゅう師に相談してください。</p>
          {individualModel && point.crossSection && (
            <CrossSectionViewer model={getPublicCrossSectionModel(point.crossSection)} pointName={point.name} pointCode={point.code} individualModel />
          )}
        </div>
      </details>

      <section>
        <h2 className={headingClass}>位置を見比べるツボ</h2>
        {nearbyComparisons.length > 0 && (
          <a href="#acupoint-nearby" className="atlas-text-action">同じ図で比べる</a>
        )}
        <ul className="list-disc space-y-2 pl-5">
          {article.relatedPoints.map(({ code, text }) => {
            const related = getAcupointByCode(code);
            if (!related) return null;
            return (
              <li key={code}>
                {text}{" "}
                <Link href={`/tsubo/${related.codeLower}`} className={linkClass}>{related.name}（{related.kana}・{related.code}）</Link>
              </li>
            );
          })}
        </ul>
      </section>

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
