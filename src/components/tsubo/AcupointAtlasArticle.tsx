import Link from "next/link";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import { AcupointReadingLinks } from "./AcupointArticleLinks";
import AcupointArticleHeader from "./AcupointArticleHeader";
import AcupointResearch from "./AcupointResearch";
import CrossSectionViewer from "./CrossSectionViewer";
import PointAtlasDiagrams from "./atlas/PointAtlasDiagrams";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getAcupointByCode } from "@/data/tsubo";
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
  return (
    <article data-atlas-point={point.code} className="page-layout atlas-page atlas-entry">
      <AcupointArticleHeader point={point} lead={article.lead} warning={article.safetyWarning} meridianReading={article.meridianReading} />

      <section id="acupoint-location" className="atlas-target">
        <h2 className={headingClass}>場所と見つけ方</h2>
        <Paragraphs paragraphs={article.location} />
        <div className="mt-5">
          <PointAtlasDiagrams point={point} meridianPoints={meridianPoints} illustration={article.illustration} marker={marker} />
        </div>
      </section>

      <AcupointResearch point={point} />

      <section id="acupoint-traditional" className="atlas-target">
        <h2 className={headingClass}>伝統的な使われ方</h2>
        <Paragraphs paragraphs={article.traditional} />
        <AcupointReadingLinks code={point.codeLower} editorialLinks={article.symptomLinks} />
      </section>

      <section>
        <h2 className={headingClass}>{article.visualOnly ? "図で場所を確かめる" : "自分で押してみる"}</h2>
        <Paragraphs paragraphs={article.selfCare} />
      </section>

      <section id="acupoint-cautions" className="atlas-target">
        <h2 className={headingClass}>注意したいこと</h2>
        {article.safetyWarning && <p className="mb-3 font-semibold">{article.safetyWarning}</p>}
        <Paragraphs paragraphs={article.cautions} />
      </section>

      <details className="atlas-disclosure atlas-reading-details">
        <summary>詳しい解剖と位置の資料</summary>
        <div className="mt-4 space-y-4">
          <Paragraphs paragraphs={article.expert} />
          <p className="text-sm">刺鍼（はりを刺す施術）や施灸（お灸をする施術）の手順は確認待ちです。位置の説明や模式図から個人の安全な刺入経路や深さを判断することはできません。</p>
          {individualModel && point.crossSection && (
            <CrossSectionViewer model={getPublicCrossSectionModel(point.crossSection)} pointName={point.name} pointCode={point.code} individualModel />
          )}
        </div>
      </details>

      <section>
        <h2 className={headingClass}>位置を見比べるツボ</h2>
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
      <AuthorSupervisorCard topic={point.name} />
    </article>
  );
}
