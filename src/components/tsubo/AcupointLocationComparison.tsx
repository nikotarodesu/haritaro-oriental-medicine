import Link from "next/link";
import { getAcupointByCode } from "@/data/tsubo";
import { atlasLocationWithoutUnitNote } from "@/data/tsubo/friendlyLocations";
import type { AcupointMaster } from "@/data/tsubo/types";
import type { ReactNode } from "react";

export default function AcupointLocationComparison({ point, related, children }: {
  point: AcupointMaster;
  related: readonly { code: string; text?: string; includeLocation?: boolean }[];
  children?: ReactNode;
}) {
  const entries = related.flatMap(({ code, text, includeLocation }) => {
    const other = getAcupointByCode(code);
    if (!other) return [];
    const relation = text?.trim() ?? "";
    const location = includeLocation || !relation ? atlasLocationWithoutUnitNote(other.locationSimple) : "";
    return [{ other, description: relation + location }];
  });
  if (!entries.length && !children) return null;

  return (
    <div id="acupoint-compare" tabIndex={-1} className="atlas-target">
      {entries.length > 0 && (
        <ul id="acupoint-compare-title" className="atlas-target atlas-point-compare-grid" role="list" aria-label="近くのツボの位置と目印">
          {entries.map(({ other, description }) => (
            <li key={other.codeLower} className="atlas-point-compare-card">
              <h3>
                <Link
                  href={`/tsubo/${other.codeLower}#acupoint-location`}
                  prefetch={false}
                  aria-label={`${other.name} ${other.code}の位置図を見る`}
                >
                  {other.name} <span>{other.code}</span>
                </Link>
              </h3>
              <p>{description}</p>
              <Link
                className="atlas-point-compare-action"
                href={`/tsubo/compare?a=${point.codeLower}&b=${other.codeLower}`}
                prefetch={false}
                aria-label={`${point.name}と${other.name}の位置を並べて見る`}
                data-analytics-action="atlas_compare"
              >
                並べて見る
              </Link>
            </li>
          ))}
        </ul>
      )}
      {children && <div className="atlas-point-compare-extras">{children}</div>}
    </div>
  );
}
