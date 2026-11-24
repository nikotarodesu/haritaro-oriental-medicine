"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useLearningSync } from "@/contexts/LearningSyncContext";
import { caseQuestionAnchor } from "@/utils/caseStudyNavigation";
import { getCaseStudyProgress, type CaseStudyDescriptor } from "@/utils/caseStudyProgress";

export default function CaseStudyResume({ studies, className = "", fallback = null }: {
  studies: readonly CaseStudyDescriptor[];
  className?: string;
  fallback?: ReactNode;
}) {
  const { ready, values } = useLearningSync();
  if (!ready) return fallback;

  const resume = studies
    .map(study => ({ study, progress: getCaseStudyProgress(values, study) }))
    .filter(({ progress }) => progress.answered > 0 && !progress.complete)
    .sort((left, right) => right.progress.updatedAt - left.progress.updatedAt)[0];
  if (!resume) return fallback;

  const { study, progress } = resume;
  const nextQuestion = study.reasoningSteps.find(({ stepNumber }) => !progress.answers[stepNumber]);
  if (!nextQuestion) return fallback;

  return (
    <section aria-labelledby="case-resume-title" className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border border-frame bg-panel p-4 ${className}`}>
      <div className="min-w-0">
        <h2 id="case-resume-title" className="font-semibold">前回の続き</h2>
        <p className="text-sm leading-relaxed">{study.title}</p>
        <p className="ui-muted text-sm">{progress.answered} / {progress.total}問 回答済み</p>
      </div>
      <Link href={`/cases/${study.id}#${caseQuestionAnchor(nextQuestion.stepNumber)}`} scroll={false} className="page-secondary-action">
        続きから解く<ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}
