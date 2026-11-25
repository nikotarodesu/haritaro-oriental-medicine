import type { LearningQuestion } from "@/data/learningQuestionBank";
import { questionRevision } from "@/utils/learningReview";
import { readingPartAnchor, readingUnits } from "./readingUnitCatalog";
import { readingUnitRevisions } from "./revisions/index";

export type ReadingUnitQuestion = LearningQuestion & {
  reviewHref: string;
  reviewLabel: string;
};

const questionsByUnit = new Map(readingUnits.map(unit => {
  const questions = (readingUnitRevisions[unit.slug]?.questions ?? []).map(
    ({ question, choices, answer, explanation, reviewAt: [lectureId, section] }, index): ReadingUnitQuestion => {
      const anchor = readingPartAnchor(lectureId);
      const isDiagram = section === "diagram";
      return {
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
        reviewHref: `#${anchor}-${isDiagram ? "diagram" : `section-${section}`}`,
        reviewLabel: isDiagram ? "本文の図表で確認する" : "本文の該当箇所を読む",
      };
    },
  );
  return [unit.slug, questions] as const;
}));

export const READING_UNIT_QUESTIONS = [...questionsByUnit.values()].flat();

export function getReadingUnitQuestions(slug: string) {
  return questionsByUnit.get(slug) ?? [];
}
