import { getPublicLectureArticle, getPublicLectureGroups, getPublicLectureSeries, publicLectureText } from "@/data/publicLectures/index";

const index = getPublicLectureGroups()
  .flatMap(group => group.entries)
  .map(entry => {
    const article = getPublicLectureArticle(entry.id);
    return { ...entry, text: article ? publicLectureText(article) : "", series: getPublicLectureSeries(entry.id) };
  });

export function getLecturesForAcupoint(name: string, code?: string) {
  const standardCode = code?.toUpperCase();
  const codePattern = standardCode && /^[A-Z]{2}\d{1,2}$/.test(standardCode) ? new RegExp(`\\b${standardCode}\\b`, "i") : undefined;
  return index.filter(entry => entry.text.includes(name) || codePattern?.test(entry.text)).slice(0, 4);
}
