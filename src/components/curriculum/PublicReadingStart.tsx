"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import { getReadingUnitForLecture, readingPartHref } from "@/data/publicLectures/readingUnitCatalog";
import ContentNavigationLink from "@/components/learning/ContentNavigationLink";

export default function PublicReadingStart({ firstHref, className }: { firstHref: string; className: string }) {
  const { isMounted, lastVisitedLectureId } = useCurriculumProgress();
  const part = isMounted && lastVisitedLectureId ? lastVisitedLectureId : undefined;
  const unit = part ? getReadingUnitForLecture(part) : undefined;
  const href = part && unit ? readingPartHref(part) : firstHref;

  return (
    <ContentNavigationLink href={href} placement={unit ? "learn_resume_lecture" : "learn_intro_start"} className={className}>
      <span className="learning-option-icon"><BookOpen size={21} aria-hidden="true" /></span>
      <span className="learning-option-label">
        <strong>{unit ? "続きから読む" : "第1講から読む"}</strong>
        <span>{unit?.title ?? "東洋医学では何を確かめるか"}</span>
      </span>
      <ArrowRight size={18} aria-hidden="true" />
    </ContentNavigationLink>
  );
}
