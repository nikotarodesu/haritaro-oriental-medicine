"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import { useLearningSync } from "@/contexts/LearningSyncContext";
import { useProgressAvailability } from "@/hooks/useProgressAvailability";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { createCourseLectureHref } from "@/utils/courseJourney";
import { getHomeLearningEntry } from "@/utils/homeLearningEntry";
import type { ResumeLecture } from "@/types/learningProgressCatalog";
import ContentNavigationLink from "./ContentNavigationLink";

/** A single learning-guide entry; unready owner records never select its destination. */
export default function LearningGuideStart({ lectures }: { lectures: ResumeLecture[] }) {
  const { isMounted, completedLectures, lastVisitedLectureId, totalCompleted } = useCurriculumProgress();
  const { status } = useLearningSync();
  const availability = useProgressAvailability(isMounted, status === "memory");
  const entry = availability === "ready" ? getHomeLearningEntry(lectures, completedLectures, lastVisitedLectureId) : null;
  const firstCourse = LEARNING_COURSES[0];
  const firstLecture = firstCourse.steps[0];
  const resume = Boolean(entry?.started);
  const href = resume && entry ? entry.href : createCourseLectureHref(firstCourse.slug, firstLecture.lectureId);
  const label = resume ? entry?.href === "/learn/courses" ? "復習するコースを選ぶ" : "続きから学ぶ" : "第1講から始める";

  return <div className="mt-5 space-y-2">
    <ContentNavigationLink href={href} placement={resume ? "learn_resume_lecture" : "learn_intro_start"} className="page-primary-action">
      <BookOpen aria-hidden="true" className="h-5 w-5" /><span>{label}</span><ArrowRight aria-hidden="true" className="h-4 w-4" />
    </ContentNavigationLink>
    {availability === "ready" ? <p className="text-sm leading-relaxed ui-muted">{resume && entry ? entry.title : firstLecture.title}<span className="ml-3 inline-block">{totalCompleted} / {lectures.length}講義完了</span></p> : <p role="status" className="text-sm leading-relaxed ui-muted">{availability === "loading" ? "学習履歴を確認中です。第1講から学べます。" : "学習履歴を読み込めませんでした。保存済みの記録は削除していません。"}</p>}
    {availability === "unavailable" && <button type="button" onClick={() => window.location.reload()} className="min-h-11 text-sm underline underline-offset-4">再読み込み</button>}
    {availability === "ready" && (status === "offline" || status === "setup") && <p role="status" className="text-sm leading-relaxed ui-muted">この端末の履歴を表示しています。クラウドへの同期は未完了です。</p>}
  </div>;
}
