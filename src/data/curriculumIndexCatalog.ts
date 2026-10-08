import "server-only";

import { CURRICULUM_DATA, PLANNED_UNPUBLISHED_LESSONS } from "./curriculumData";
import { CURRICULUM_CHAPTERS_META } from "./curriculumOutline";
import { getLearningCourseForSeries } from "./learningCourses";
import type { CurriculumIndexCatalog } from "@/types/curriculumIndexCatalog";

/** Derive previews from the current source; lecture bodies stay on the server. */
export function getCurriculumIndexCatalog(): CurriculumIndexCatalog {
  const allLectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
  return {
    chapters: CURRICULUM_CHAPTERS_META.map(chapter => {
      const lectures = allLectures.filter(lecture => lecture.seriesId === chapter.seriesId);
      const course = getLearningCourseForSeries(chapter.seriesId);
      return {
        ...chapter,
        lectureIds: lectures.filter(lecture => lecture.isPublished !== false).map(lecture => lecture.id),
        firstLectureId: lectures.find(lecture => lecture.isPublished !== false)?.id,
        stageTitle: lectures[0]?.stageTitle || '',
        goal: course?.goals[0] || chapter.description,
        courseSlug: course?.slug || '',
      };
    }),
    lectures: allLectures.map(lecture => ({
      id: lecture.id,
      stageTitle: lecture.stageTitle,
      seriesId: lecture.seriesId,
      seriesTitle: lecture.seriesTitle,
      lessonNumber: lecture.lessonNumber,
      title: lecture.title,
      subtitle: lecture.subtitle,
      duration: lecture.duration,
      isPublished: lecture.isPublished,
      whatYouWillLearn: {
        topics: lecture.whatYouWillLearn.topics,
        canDo: lecture.whatYouWillLearn.canDo,
      },
      summary: lecture.summary,
    })),
    plannedLessons: Object.fromEntries(Object.entries(PLANNED_UNPUBLISHED_LESSONS).map(([seriesId, lessons]) => [
      seriesId,
      lessons.map(({ seriesId, lessonNumber, title, subtitle }) => ({ seriesId, lessonNumber, title, subtitle })),
    ])),
  };
}
