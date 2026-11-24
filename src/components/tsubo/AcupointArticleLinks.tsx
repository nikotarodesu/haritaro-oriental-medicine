import Link from "next/link";
import { getDiagnosisStudyLinks } from "@/utils/diagnosisStudyLinks";
import { getAcupointGuideLinks } from "@/utils/symptomGuides";
import type { AcupointAtlasArticle } from "@/data/tsubo/atlas/types";
import { KEY_POINT_TYPES_GUIDE, type AcupointKeyPointType } from "@/data/tsubo/keyPointTypes";
import { ATLAS_LEARNING_PAIRS, atlasLearningPairHref } from "@/data/tsubo/atlas/learningPairs";

const sectionLinks = [
  { href: "#acupoint-cautions", label: "注意点" },
  { href: "#acupoint-name", label: "名前の由来" },
  { href: "#acupoint-research", label: "研究と古典の配穴" },
  { href: "#acupoint-sources", label: "出典" },
];
const linkClass = "inline-flex min-h-11 items-center font-semibold underline underline-offset-4";
const diagnosisPointPaths = new Set(
  Object.values(getDiagnosisStudyLinks()).flatMap(({ points }) => points.map(point => point.href)),
);

export function AcupointSectionLinks() {
  return (
    <nav aria-label="このツボのページ内を移動" className="atlas-section-nav">
      {sectionLinks.map(({ href, label }) => <a key={href} href={href} className={linkClass}>{label}</a>)}
    </nav>
  );
}

export function AcupointComparisonLink({ code }: { code: string }) {
  const pair = ATLAS_LEARNING_PAIRS.find(({ codes }) => codes[0] === code);
  if (!pair) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-frame bg-panel p-3 print:hidden">
      <p className="min-w-0 flex-1 basis-48 text-sm leading-relaxed">{pair.comparisonPrompt}</p>
      <Link
        href={atlasLearningPairHref(pair.codes)}
        prefetch={false}
        className="page-secondary-action"
        data-analytics-action="atlas_compare"
      >
        {pair.comparisonLabel}
      </Link>
    </div>
  );
}

export function AcupointKeyPointLinks({ types }: { types: readonly AcupointKeyPointType[] }) {
  if (!types.length) return null;

  return (
    <div id="acupoint-classifications" className="atlas-target">
      <dt className="mb-1 text-sm ui-muted">要穴分類</dt>
      <dd>
        <ul className="flex flex-wrap gap-x-2 gap-y-1" role="list">
          {types.map(({ id, label }) => (
            <li key={id}>
              <Link href={`${KEY_POINT_TYPES_GUIDE}#${id}`} prefetch={false} className="atlas-source-link inline-flex min-h-11 items-center rounded-lg border border-frame px-2.5 text-sm">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}

export function AcupointReadingLinks({ code, editorialLinks }: {
  code: string;
  editorialLinks?: AcupointAtlasArticle["symptomLinks"];
}) {
  const links = getAcupointGuideLinks(code, editorialLinks);
  const hasDiagnosisLink = diagnosisPointPaths.has(`/tsubo/${code}`);
  if (!links.length && !hasDiagnosisLink) return null;

  return (
    <ul className="mt-2 space-y-1 text-sm">
      {links.map(({ href, label }) => <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>)}
      {hasDiagnosisLink && <li><Link href="/diagnosis" className={linkClass}>気血水の体質チェックで学ぶ</Link></li>}
    </ul>
  );
}
