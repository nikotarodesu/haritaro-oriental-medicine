import Link from "next/link";
import { BookOpen, ClipboardList } from "lucide-react";
import { getCaseStudyUsingAcupoint } from "@/data/cases/caseStudyCatalog";
import { getDiagnosisStudyLinks } from "@/utils/diagnosisStudyLinks";
import { getAcupointGuideLinks } from "@/utils/symptomGuides";
import type { AcupointAtlasArticle } from "@/data/tsubo/atlas/types";
import { getAcupointKeyPointTypes, KEY_POINT_TYPES_GUIDE } from "@/data/tsubo/keyPointTypes";
import { ATLAS_LEARNING_PAIRS, atlasLearningPairHref } from "@/data/tsubo/atlas/learningPairs";
import { readingPartHref } from "@/data/publicLectures/readingUnitCatalog";
import { ATLAS_STUDY_ROUTES, atlasStudyExercise } from "@/data/tsubo/atlas/studyRoutes";
import { caseQuestionAnchor } from "@/utils/caseStudyNavigation";

const linkClass = "inline-flex min-h-11 items-center font-semibold underline underline-offset-4";
const diagnosisPointPaths = new Set(
  Object.values(getDiagnosisStudyLinks()).flatMap(({ points }) => points.map(point => point.href)),
);

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

export function AcupointKeyPointLinks({ code }: { code: string }) {
  const types = getAcupointKeyPointTypes(code);
  if (!types.length) return null;

  return (
    <div id="acupoint-classifications" className="atlas-target flex min-w-0 max-w-full flex-wrap items-center gap-x-2">
      <span id="acupoint-classifications-label" className="text-xs ui-muted">要穴分類</span>
      <ul className="flex min-w-0 flex-wrap gap-x-1.5" role="list" aria-labelledby="acupoint-classifications-label">
        {types.map(({ id, label }) => (
          <li key={id}>
            <Link href={`${KEY_POINT_TYPES_GUIDE}#${id}`} prefetch={false} className="atlas-source-link inline-flex min-h-11 min-w-11 items-center justify-center text-sm whitespace-nowrap">
              <span className="rounded-md bg-panel-selected px-1.5 py-1">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
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
    <details className="atlas-disclosure atlas-reference-row">
      <summary>関連する症状ガイド・体質チェック</summary>
      <div className="atlas-reference-content">
        <ul className="mt-2 space-y-1 text-sm">
          {links.map(({ href, label }) => <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>)}
          {hasDiagnosisLink && <li><Link href="/diagnosis" className={linkClass}>気血水の体質チェックで学ぶ</Link></li>}
        </ul>
      </div>
    </details>
  );
}
