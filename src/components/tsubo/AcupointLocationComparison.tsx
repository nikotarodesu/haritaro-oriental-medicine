import Link from "next/link";
import { ArrowUp, ArrowUpRight, GitCompare } from "lucide-react";
import { getAcupointByCode } from "@/data/tsubo";
import { atlasLocationWithoutUnitNote } from "@/data/tsubo/friendlyLocations";
import type { AcupointMaster } from "@/data/tsubo/types";
import type { ReactNode } from "react";

export default function AcupointLocationComparison({ point, related, children }: {
  point: AcupointMaster;
  related: readonly { code: string; text?: string }[];
  children?: ReactNode;
}) {
  const entries = related.flatMap(({ code, text }) => {
    const other = getAcupointByCode(code);
    return other ? [{ other, text }] : [];
  });
  if (!entries.length && !children) return null;

  return (
    <section id="acupoint-compare" tabIndex={-1} className="atlas-target" aria-labelledby="acupoint-compare-title">
      <div className="atlas-point-compare-heading">
        <h2 className="atlas-section-title" id="acupoint-compare-title">位置を見比べるツボ</h2>
        {entries.length > 0 && <a href="#acupoint-location" className="atlas-text-action"><ArrowUp aria-hidden="true" size={15} />{point.name}の位置図に戻る</a>}
      </div>
      {entries.length > 0 && (
        <ul className="atlas-point-compare-grid" role="list">
          {entries.map(({ other, text }) => (
            <li key={other.codeLower} className="atlas-point-compare-card">
              <h3>
                <Link href={`/tsubo/${other.codeLower}#acupoint-location`} prefetch={false}>
                  {other.name} <span>{other.code}</span><ArrowUpRight aria-hidden="true" size={14} />
                </Link>
              </h3>
              <p>{atlasLocationWithoutUnitNote(other.locationSimple)}</p>
              {text && <p className="atlas-point-compare-relation">{text}</p>}
              <Link
                className="atlas-point-compare-action"
                href={`/tsubo/compare?a=${point.codeLower}&b=${other.codeLower}`}
                prefetch={false}
                aria-label={`${point.name}と${other.name}を比べる`}
                data-analytics-action="atlas_compare"
              >
                <GitCompare aria-hidden="true" size={15} />並べて見る
              </Link>
            </li>
          ))}
        </ul>
      )}
      {children && <div className="atlas-point-compare-extras">{children}</div>}
    </section>
  );
}
