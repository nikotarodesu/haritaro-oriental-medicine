import Link from "next/link";
import { comparisonSelectionHref } from "@/app/tsubo/compare/selection";
import { getAcupointByCode } from "@/data/tsubo";
import { atlasLocationWithoutUnitNote } from "@/data/tsubo/friendlyLocations";
import type { AcupointMaster } from "@/data/tsubo/types";
import type { ReactNode } from "react";

export default function AcupointLocationComparison({ point, related, byName = false, children }: {
  point: AcupointMaster;
  related: readonly { code: string; text?: string; includeLocation?: boolean }[];
  byName?: boolean;
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
  const Heading = byName ? "h4" : "h3";

  return (
    <div id={byName ? "acupoint-similar-names" : "acupoint-compare"} tabIndex={-1} className="atlas-target">
      {byName && <h3 className="atlas-section-title">名前が似ているツボ</h3>}
      {entries.length > 0 && (
        <ul id={byName ? undefined : "acupoint-compare-title"} className="atlas-target atlas-point-compare-grid" role="list"
          aria-label={byName ? "名前が似ているツボの位置" : "近くのツボの位置と目印"}>
          {entries.map(({ other, description }) => (
            <li key={other.codeLower} className="atlas-point-compare-card">
              <Heading>
                <Link
                  href={`/tsubo/${other.codeLower}#acupoint-location`}
                  prefetch={false}
                  aria-label={`${other.name} ${other.code}の位置図を見る`}
                >
                  {other.name} <span>{other.code}</span>
                </Link>
              </Heading>
              <p>{description}</p>
              <Link
                className="atlas-point-compare-action"
                href={comparisonSelectionHref([point.codeLower, other.codeLower])}
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
      {children && <div id={!byName && !entries.length ? "acupoint-compare-title" : undefined}
        className="atlas-target atlas-point-compare-extras">{children}</div>}
    </div>
  );
}
