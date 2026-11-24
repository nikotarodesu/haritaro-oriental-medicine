import type { LearningQuestion } from "@/data/learningQuestionBank";
import { questionRevision } from "@/utils/learningReview";
import { readingUnits } from "./readingUnits";
import { readingUnitRevisions } from "./revisions/index";

const questionsByUnit = new Map(readingUnits.map(unit => {
  const questions = (readingUnitRevisions[unit.slug]?.questions ?? []).map(
    ({ question, choices, answer, explanation }, index): LearningQuestion => ({
      id: `reading-${unit.slug}-${index + 1}`,
      question,
      options: choices,
      correctIndex: answer,
      explanation,
      lectureId: unit.parts[0].lectureId,
      lectureTitle: unit.title,
      chapterId: unit.chapter,
      chapterTitle: unit.title,
      kind: "lecture",
      href: `${unit.href}#lecture-review`,
      revision: questionRevision(question, choices, answer, explanation),
    }),
  );
  return [unit.slug, questions] as const;
}));

export const READING_UNIT_QUESTIONS = [...questionsByUnit.values()].flat();

export function getReadingUnitQuestions(slug: string) {
  return questionsByUnit.get(slug) ?? [];
}
