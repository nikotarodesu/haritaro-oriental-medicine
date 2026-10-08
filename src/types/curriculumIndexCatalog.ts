/** Only the public fields used by the curriculum index cross the client boundary. */
export interface CurriculumLecturePreview {
  id: string;
  stageTitle: string;
  seriesId?: string;
  seriesTitle?: string;
  lessonNumber?: number;
  title: string;
  subtitle: string;
  duration: string;
  isPublished: boolean;
  whatYouWillLearn: { topics: string; canDo: string };
  summary: string;
}

export interface PlannedCurriculumLecturePreview {
  seriesId: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
}

export interface CurriculumIndexCatalog {
  chapters: readonly CurriculumChapterPreview[];
  lectures: readonly CurriculumLecturePreview[];
  plannedLessons: Record<string, readonly PlannedCurriculumLecturePreview[]>;
}

export interface CurriculumChapterPreview {
  chapterNumber: number;
  id: string;
  seriesId: string;
  title: string;
  shortTitle: string;
  lead: string;
  description: string;
  plannedLessons: number;
  lectureIds: readonly string[];
  firstLectureId?: string;
  stageId: string;
  stageTitle: string;
  goal: string;
  courseSlug: string;
}
