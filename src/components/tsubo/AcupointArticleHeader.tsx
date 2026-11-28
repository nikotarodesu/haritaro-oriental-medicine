import type { AcupointDetail } from "@/data/tsubo/types";
import { atlasLocationWithoutUnitNote } from "@/data/tsubo/friendlyLocations";
import AtlasDictionaryReturnLink from "./AtlasDictionaryReturnLink";
import { AcupointKeyPointLinks } from "./AcupointArticleLinks";

export function AcupointLocationActions() {
  return (
    <nav aria-label="ツボの位置" className="atlas-point-location-actions">
      <a href="#acupoint-location" className="atlas-text-action">位置図へ</a>
      <a href="#acupoint-who-location" className="atlas-text-action">WHOの位置と出典</a>
    </nav>
  );
}

export default function AcupointArticleHeader({ point, folio = false }: {
  point: AcupointDetail;
  folio?: boolean;
}) {
  const indexMeridianId = point.meridianId === "governor" || point.meridianId === "conception"
    ? `${point.meridianId}-vessel`
    : point.meridianId;
  const classification = <AcupointKeyPointLinks code={point.codeLower} />;

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
        {!folio && classification}
      </div>
      {/* Native fragment navigation opens the index's enclosing disclosure. */}
      <p className="atlas-point-meta"><a href={`/tsubo#meridian-${indexMeridianId}`} className="atlas-source-link">{point.meridian}のツボ一覧</a> <span aria-hidden="true">·</span> {point.bodyPart}</p>
      {folio && classification}
      <p className="atlas-point-lead">{atlasLocationWithoutUnitNote(point.locationSimple)}</p>
      {!folio && <AcupointLocationActions />}
    </header>
  );
}
