import type { PublicLectureArticle } from "../types";

export interface ReadingCheckQuestion {
  question: string;
  choices: readonly [string, string, string];
  answer: 0 | 1 | 2;
  explanation: string;
}

type SectionCopy = string | readonly string[] | null;

export interface ReadingUnitRevision {
  copy: Readonly<Record<string, readonly SectionCopy[]>>;
  takeaways: readonly [string, string, string];
  questions: readonly [ReadingCheckQuestion, ReadingCheckQuestion];
}

export function reviseLectureSections(sections: PublicLectureArticle["sections"], copy: readonly SectionCopy[] = []) {
  return sections.map((section, index) => {
    const text = copy[index];
    if (text == null) return section;
    return { ...section, paragraphs: typeof text === "string" ? [text] : [...text] };
  });
}
