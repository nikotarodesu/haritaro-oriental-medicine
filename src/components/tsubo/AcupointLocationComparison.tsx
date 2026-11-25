import Link from "next/link";
import { ArrowUpRight, GitCompare, MapPin } from "lucide-react";
import { getAcupointByCode } from "@/data/tsubo";
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
    <section id="acupoint-compare" className="atlas-target" aria-labelledby="acupoint-compare-title">
      <h2 className="atlas-section-title" id="acupoint-compare-title">位置を見比べるツボ</h2>
      {children}
      {entries.length > 0 && (
        <ul className="atlas-point-compare-grid" role="list">
          <li className="atlas-point-compare-card atlas-point-compare-current">
            <p className="atlas-point-compare-label"><MapPin aria-hidden="true" size={16} />このページのツボ</p>
            <h3>{point.name} <span>{point.code}</span></h3>
            <p>{point.locationSimple}</p>
          </li>
          {entries.map(({ other, text }) => (
            <li key={other.codeLower} className="atlas-point-compare-card">
              <h3>
                <Link href={`/tsubo/${other.codeLower}#acupoint-location`} prefetch={false}>
                  {other.name} <span>{other.code}</span><ArrowUpRight aria-hidden="true" size={14} />
                </Link>
              </h3>
              <p>{other.locationSimple}</p>
              {text && <p className="atlas-point-compare-relation">{text}</p>}
              <a
                className="atlas-point-compare-action"
                href={`/tsubo/compare?a=${point.codeLower}&b=${other.codeLower}`}
                aria-label={`${point.name}と${other.name}を比べる`}
                data-analytics-action="atlas_compare"
              >
                <GitCompare aria-hidden="true" size={15} />並べて見る
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
