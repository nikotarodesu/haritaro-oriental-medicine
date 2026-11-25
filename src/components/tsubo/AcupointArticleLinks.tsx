import Link from "next/link";
import { BookOpen, ClipboardList } from "lucide-react";
import { getCaseStudyUsingAcupoint } from "@/data/cases/caseStudyCatalog";
import { getDiagnosisStudyLinks } from "@/utils/diagnosisStudyLinks";
import { getAcupointGuideLinks } from "@/utils/symptomGuides";
import type { AcupointAtlasArticle } from "@/data/tsubo/atlas/types";
import { getAcupointKeyPointTypes, KEY_POINT_TYPES_GUIDE, type AcupointKeyPointType } from "@/data/tsubo/keyPointTypes";
import { ATLAS_LEARNING_PAIRS, atlasLearningPairHref } from "@/data/tsubo/atlas/learningPairs";
import { FEATURED_ACUPOINT_PAIRS_ANCHOR, getFeaturedPairs } from "@/data/tsubo/atlas/featuredPairs";
import { readingPartHref } from "@/data/publicLectures/readingUnitCatalog";
import { ATLAS_STUDY_ROUTES, atlasStudyExercise } from "@/data/tsubo/atlas/studyRoutes";
import { caseQuestionAnchor } from "@/utils/caseStudyNavigation";

const sectionLinks = [
  { href: "#acupoint-location", label: "場所" },
  { href: "#acupoint-cautions", label: "注意点" },
  { href: "#acupoint-anatomy", label: "断面図" },
  { href: "#acupoint-compare", label: "近くのツボ" },
  { href: "#acupoint-traditional", label: "使われ方・研究" },
];
const linkClass = "inline-flex min-h-11 items-center font-semibold underline underline-offset-4";
const diagnosisPointPaths = new Set(
  Object.values(getDiagnosisStudyLinks()).flatMap(({ points }) => points.map(point => point.href)),
);

export function AcupointSectionLinks({ hasAnatomyDiagram, pointCode }: {
  hasAnatomyDiagram: boolean;
  pointCode?: string;
}) {
  return (
    <nav aria-label="このツボのページ内を移動" className="atlas-section-nav">
      {sectionLinks.filter(({ href }) => hasAnatomyDiagram || href !== "#acupoint-anatomy").map(({ href, label }) => (
        <a key={href} href={href} className={linkClass}>{label}</a>
      ))}
      {pointCode && getFeaturedPairs(pointCode).length > 0 && (
        <a href={`#${FEATURED_ACUPOINT_PAIRS_ANCHOR}`} className={linkClass}>配穴</a>
      )}
    </nav>
  );
}

export function AcupointStudyLinks({ code }: { code: string }) {
  const standardCode = code.toUpperCase();
  const route = ATLAS_STUDY_ROUTES.find(({ codes }) => codes.includes(standardCode));
  const pointType = getAcupointKeyPointTypes(code.toLowerCase())[0];
  const lecture = route
    ? { href: route.readingHref, label: route.readingLabel }
    : pointType
      ? { href: `${KEY_POINT_TYPES_GUIDE}#${pointType.id}`, label: `${pointType.label}を読む` }
      : { href: readingPartHref("lecture-meridians-1"), label: "経絡とツボの講義を読む" };
  const pair = ATLAS_LEARNING_PAIRS.find(({ codes }) => codes.includes(standardCode));
  const relatedCase = getCaseStudyUsingAcupoint(code);
  const caseId = pair?.caseId ?? relatedCase?.id;
  const mentionsPoint = (text: string) => text.match(/\b[A-Z]{2}\d{1,2}\b/g)?.includes(standardCode);
  const relatedStep = relatedCase && relatedCase.id === caseId ? relatedCase.reasoningSteps.find(step =>
    mentionsPoint(step.question) || step.options.some(option => option.isCorrect && mentionsPoint(option.label)),
  ) : undefined;
  const exercise = (route && atlasStudyExercise(route)) ?? {
    href: caseId ? `/cases/${caseId}${relatedStep ? `#${caseQuestionAnchor(relatedStep.stepNumber)}` : ""}` : "/cases",
    label: relatedStep ? "このツボが出る設問を解く" : pair?.caseLabel ?? (caseId ? "このツボが出る模擬症例を解く" : "模擬症例を探す"),
  };

  return (
    <nav aria-label="講義と模擬症例" className="atlas-study-links print:hidden">
      <Link href={lecture.href} className="page-secondary-action" prefetch={false}>
        <BookOpen size={16} aria-hidden="true" />{lecture.label}
      </Link>
      <Link href={exercise.href} className="page-secondary-action" prefetch={false}>
        <ClipboardList size={16} aria-hidden="true" />{exercise.label}
      </Link>
    </nav>
  );
}

export function AcupointComparisonLink({ code }: { code: string }) {
  const pair = ATLAS_LEARNING_PAIRS.find(({ codes }) => codes[0] === code);
  if (!pair) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-frame bg-panel p-3 print:hidden">
      <p className="min-w-0 flex-1 basis-48 text-sm leading-relaxed">{pair.comparisonPrompt}</p>
      <a
        href={atlasLearningPairHref(pair.codes)}
        className="page-secondary-action"
        data-analytics-action="atlas_compare"
      >
        {pair.comparisonLabel}
      </a>
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
