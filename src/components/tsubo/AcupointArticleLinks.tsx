import Link from "next/link";
import { getDiagnosisStudyLinks } from "@/utils/diagnosisStudyLinks";
import { getAcupointGuideLinks } from "@/utils/symptomGuides";
import type { AcupointAtlasArticle } from "@/data/tsubo/atlas/types";

const sectionLinks = [
  { href: "#acupoint-location", label: "場所と図版" },
  { href: "#acupoint-cautions", label: "注意点" },
  { href: "#acupoint-sources", label: "出典" },
];
const linkClass = "inline-flex min-h-11 items-center font-semibold underline underline-offset-4";
const diagnosisPointPaths = new Set(
  Object.values(getDiagnosisStudyLinks()).flatMap(({ points }) => points.map(point => point.href)),
);

export function AcupointSectionLinks() {
  return (
    <nav aria-label="このツボのページ内を移動" className="flex flex-wrap gap-x-5 text-sm">
      {sectionLinks.map(({ href, label }) => <a key={href} href={href} className={linkClass}>{label}</a>)}
    </nav>
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
