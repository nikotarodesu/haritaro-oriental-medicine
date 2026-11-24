import { getCurriculumStats } from './curriculumData';
import { LEARNING_QUESTIONS } from './learningQuestionBank';
import { READING_UNIT_QUESTIONS } from './publicLectures/readingUnitQuestions';
import type { LearningProgressCatalog } from '@/types/learningProgressCatalog';

// Called by the server layout. Only counters and revision metadata cross to clients.
export function getLearningProgressCatalog(): LearningProgressCatalog {
  const stats = getCurriculumStats();
  return {
    totalPublished: stats.totalPublishedLessons,
    totalPlanned: stats.totalPlannedLessons,
    questions: [...LEARNING_QUESTIONS, ...READING_UNIT_QUESTIONS].map(({ id, revision, kind, href }) => ({ id, revision, kind, href })),
  };
}
