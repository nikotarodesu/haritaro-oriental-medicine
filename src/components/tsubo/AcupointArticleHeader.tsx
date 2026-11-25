import type { AcupointDetail } from "@/data/tsubo/types";
import AtlasDictionaryReturnLink from "./AtlasDictionaryReturnLink";
import { AcupointKeyPointLinks } from "./AcupointArticleLinks";

export default function AcupointArticleHeader({ point }: {
  point: AcupointDetail;
}) {
  const indexMeridianId = point.meridianId === "governor" || point.meridianId === "conception"
    ? `${point.meridianId}-vessel`
    : point.meridianId;

  return (
    <header className="atlas-point-header">
      <nav aria-label="パンくず" className="atlas-breadcrumb">
        <AtlasDictionaryReturnLink>図鑑に戻る</AtlasDictionaryReturnLink>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{point.name}</span>
      </nav>
      <div className="atlas-point-identity">
        <h1>{point.name}</h1>
        <span className="atlas-point-kana">{point.kana}</span>
        <span className="atlas-code">{point.code}</span>
        <AcupointKeyPointLinks code={point.codeLower} />
      </div>
      {/* Native fragment navigation opens the index's enclosing disclosure. */}
      <p className="atlas-point-meta"><a href={`/tsubo#meridian-${indexMeridianId}`} className="atlas-source-link">{point.meridian}のツボ一覧</a> <span aria-hidden="true">·</span> {point.bodyPart}</p>
      <p className="atlas-point-lead">{point.locationSimple}</p>
    </header>
  );
}
