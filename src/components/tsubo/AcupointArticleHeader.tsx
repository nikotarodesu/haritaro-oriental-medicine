import Link from "next/link";
import { getAcupointKeyPointTypes } from "@/data/tsubo/keyPointTypes";
import type { AcupointDetail } from "@/data/tsubo/types";
import { AcupointKeyPointLinks, AcupointSectionLinks, AcupointStudyLinks } from "./AcupointArticleLinks";

export default function AcupointArticleHeader({ point, lead, hasAnatomyDiagram }: {
  point: AcupointDetail;
  lead: string;
  hasAnatomyDiagram: boolean;
}) {
  const indexMeridianId = point.meridianId === "governor" || point.meridianId === "conception"
    ? `${point.meridianId}-vessel`
    : point.meridianId;

  return (
    <header className="atlas-point-header">
      <nav aria-label="パンくず" className="atlas-breadcrumb">
        <Link href="/tsubo">はり太郎のツボ図鑑</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{point.name}</span>
      </nav>
      <div className="atlas-point-identity">
        <h1>{point.name}</h1>
        <span className="atlas-point-kana">{point.kana}</span>
        <span className="atlas-code">{point.code}</span>
      </div>
      {/* Native fragment navigation opens the index's enclosing disclosure. */}
      <p className="atlas-point-meta">標準361経穴 <span aria-hidden="true">·</span> <a href={`/tsubo#meridian-${indexMeridianId}`} className="atlas-source-link">{point.meridian}のツボ一覧</a> <span aria-hidden="true">·</span> {point.bodyPart}</p>
      <p className="atlas-point-lead">{lead}</p>
      <AcupointStudyLinks code={point.code} />
      <AcupointSectionLinks hasAnatomyDiagram={hasAnatomyDiagram} pointCode={point.codeLower} />
    </header>
  );
}

export function AcupointPointDetails({ point, meridianReading }: {
  point: AcupointDetail;
  meridianReading: string;
}) {
  return (
    <details className="atlas-disclosure atlas-point-details">
      <summary>基本情報・別名</summary>
      <dl>
        <div><dt>所属経絡の読み</dt><dd>{meridianReading}</dd></div>
        <div><dt>検索で使えるコード表記</dt><dd>{point.code}・{point.code.replace(/^(\D+)(\d+)$/, "$1-$2")}</dd></div>
        {point.aliases?.length ? <div><dt>別名・表記</dt><dd>{point.aliases.join("、")}</dd></div> : null}
        <AcupointKeyPointLinks types={getAcupointKeyPointTypes(point.codeLower)} />
      </dl>
    </details>
  );
}
