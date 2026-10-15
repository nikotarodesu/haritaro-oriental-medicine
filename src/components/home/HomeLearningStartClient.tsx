"use client";

import { ArrowRight } from "lucide-react";
import ContentNavigationLink from "@/components/learning/ContentNavigationLink";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import { getHomeLearningEntry } from "@/utils/homeLearningEntry";
import { createCourseLectureHref } from "@/utils/courseJourney";
import { LEARNING_COURSES } from "@/data/learningCourses";
import type { ResumeLecture } from "@/types/learningProgressCatalog";

export default function HomeLearningStartClient({ lectures }: { lectures: ResumeLecture[] }) {
  const { isMounted, completedLectures, lastVisitedLectureId } = useCurriculumProgress();
  const entry = isMounted ? getHomeLearningEntry(lectures, completedLectures, lastVisitedLectureId) : null;
  const resume = Boolean(entry?.started);
  const label = resume ? entry?.href === "/learn/courses" ? "復習するコースを選ぶ" : "続きから学ぶ" : "第1講から始める";
  const firstCourse = LEARNING_COURSES[0];
  const href = resume && entry ? entry.href : createCourseLectureHref(firstCourse.slug, firstCourse.steps[0].lectureId);
  return <>
    <ContentNavigationLink href={href} placement={resume ? "home_resume_lecture" : "home_first_lecture"} className="ui-button ui-button-primary home-start-button">
      <span>{label}</span><ArrowRight aria-hidden="true" />
    </ContentNavigationLink>
    <p className="text-sm ui-muted">{resume && entry ? entry.title : "初めての方へ。「東洋医学とは何か」から学べます。"}</p>
  </>;
}
