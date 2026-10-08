import "server-only";

import { CURRICULUM_DATA, PLANNED_UNPUBLISHED_LESSONS } from "./curriculumData";
import type { CurriculumIndexCatalog } from "@/types/curriculumIndexCatalog";

/** Derive previews from the current source; lecture bodies stay on the server. */
export function getCurriculumIndexCatalog(): CurriculumIndexCatalog {
  return {
    lectures: CURRICULUM_DATA.flatMap(stage => stage.lectures).map(lecture => ({
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
