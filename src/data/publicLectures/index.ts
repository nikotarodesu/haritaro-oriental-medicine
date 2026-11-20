import { CURRICULUM_CHAPTERS_META } from "../curriculumOutline";
import { approvedIntro, approvedIntroId } from "./approvedIntro";
import { clinicalArticles } from "./clinical";
import { foundationArticles } from "./foundations";
import { functionAndPatternsArticles } from "./functionAndPatterns";
import type { PublicLectureArticle } from "./types";

const articles: Record<string, PublicLectureArticle> = {
  [approvedIntroId]: approvedIntro,
  ...foundationArticles,
  ...functionAndPatternsArticles,
  ...clinicalArticles,
};

export type PublicLectureSeries = "dictionary" | "reading" | "practice";

const dictionaryIds = new Set(["lecture-meridians-2", "lecture-meridians-3"]);
const practiceIds = new Set([
  "lecture-meridians-4",
  "lecture-diagnosis-10", "lecture-diagnosis-11", "lecture-diagnosis-12",
  "lecture-treatment-8", "lecture-treatment-9", "lecture-treatment-11", "lecture-treatment-12",
]);

const chapterLabels: Record<string, string> = {
  intro: "東洋医学の入り口",
  "yin-yang": "陰陽",
  "qi-blood-water": "気・血・津液",
  zangfu: "五臓・六腑",
  "vital-function": "体の働きとつながり",
  "five-elements": "五行",
  meridians: "経絡とツボ",
  pathology: "不調の経過をどう考えるか",
  diagnosis: "所見の集め方と見立て",
  treatment: "施術方針と振り返りの考え方",
  practice: "架空症例の演習",
};

export function getPublicLectureSeries(id: string): PublicLectureSeries {
  if (dictionaryIds.has(id)) return "dictionary";
  if (id.startsWith("lecture-practice-") || practiceIds.has(id)) return "practice";
  return "reading";
}

export function getPublicLectureArticle(id: string): PublicLectureArticle | undefined {
  return Object.hasOwn(articles, id) ? articles[id] : undefined;
}

export function publicLectureText(article: PublicLectureArticle): string {
  return [
    article.title, article.description, article.lead,
    ...article.sections.flatMap(section => [section.heading, ...section.paragraphs]),
  ].join(" ");
}

export function getPublicLectureGroups(series?: PublicLectureSeries) {
  return CURRICULUM_CHAPTERS_META.flatMap(chapter => {
    const entries = chapter.lectureIds.flatMap(id => {
      const article = getPublicLectureArticle(id);
      if (!article || (series && getPublicLectureSeries(id) !== series)) return [];
      return [{ id, title: article.title, description: article.description }];
    });
    return entries.length ? [{ id: chapter.id, label: chapterLabels[chapter.id] ?? chapter.shortTitle, entries }] : [];
  });
}

export function getPublicLectureReadingPosition(id: string) {
  const chapters = getPublicLectureGroups("reading");
  const chapterIndex = chapters.findIndex(chapter => chapter.entries.some(entry => entry.id === id));
  if (chapterIndex === -1) return null;

  const chapter = chapters[chapterIndex];
  const entryIndex = chapter.entries.findIndex(entry => entry.id === id);
  return {
    chapter: chapter.label,
    number: entryIndex + 1,
    total: chapter.entries.length,
    previous: chapter.entries[entryIndex - 1] ?? chapters[chapterIndex - 1]?.entries.at(-1),
    next: chapter.entries[entryIndex + 1] ?? chapters[chapterIndex + 1]?.entries[0],
  };
}
