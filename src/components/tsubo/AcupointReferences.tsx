import type { ReactNode } from "react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import type { AcupointDetail } from "@/data/tsubo/types";
import type { AcupointAtlasArticle } from "@/data/tsubo/atlas/types";
import { AcupointReadingLinks, AcupointStudyLinks } from "./AcupointArticleLinks";
import AcupointNameGuide from "./AcupointNameGuide";

export function AcupointPointBasics({ point, meridianReading }: {
  point: AcupointDetail;
  meridianReading: string;
}) {
  return (
    <HashTargetDetails className="atlas-disclosure atlas-reference-row atlas-point-basics" summary="基本情報・名前の由来">
      <div className="atlas-reference-content">
        <dl className="atlas-point-details">
          <div><dt>経絡（ツボをつなぐ道筋）</dt><dd>{point.meridian}（{meridianReading}）</dd></div>
          <div><dt>検索で使えるコード表記</dt><dd>{point.code}・{point.code.replace(/^(\D+)(\d+)$/, "$1-$2")}</dd></div>
          {point.aliases?.length ? <div><dt>別名・表記</dt><dd>{point.aliases.join("、")}</dd></div> : null}
        </dl>
        <AcupointNameGuide code={point.codeLower} />
      </div>
    </HashTargetDetails>
  );
}

export default function AcupointReferences({ point, editorialLinks, sources, sourceNote }: {
  point: AcupointDetail;
  editorialLinks?: AcupointAtlasArticle["symptomLinks"];
  sources: AcupointAtlasArticle["sources"];
  sourceNote?: ReactNode;
}) {
  return (
    <div className="atlas-reference-list">
      <details className="atlas-disclosure atlas-reference-row">
        <summary>症状ガイドと学習リンク</summary>
        <div className="atlas-reference-content">
          <AcupointReadingLinks code={point.codeLower} editorialLinks={editorialLinks} />
          <AcupointStudyLinks code={point.code} />
        </div>
      </details>
      <HashTargetDetails className="atlas-disclosure atlas-reference-row" summary="出典・執筆者">
        <section id="acupoint-sources" className="atlas-reference-content atlas-target" aria-label="出典と執筆者">
          {sourceNote}
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
            {sources.map(({ name, url, scope }) => (
              <li key={url}>{scope}{" "}<a href={url} className="atlas-source-link">{name}</a></li>
            ))}
          </ul>
          <AuthorSupervisorCard pointLocationChecked />
        </section>
      </HashTargetDetails>
    </div>
  );
}
