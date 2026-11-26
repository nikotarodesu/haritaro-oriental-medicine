import { acupunctureResearchHref } from "@/config/acupunctureLearning";
import { ACUPUNCTURE_RESEARCH_ARTICLES } from "@/data/acupunctureResearch";
import { ARTICLES } from "@/data/articleData";
import { getPublicLectureArticle } from "@/data/publicLectures";
import { readingUnits } from "@/data/publicLectures/readingUnitCatalog";
import { readingUnitRevisions } from "@/data/publicLectures/revisions";
import { reviseLectureSections } from "@/data/publicLectures/revisions/types";
import { PUBLIC_SYMPTOM_CONTENT } from "@/data/publicSymptoms";
import { SEARCH_CATALOG } from "@/data/searchCatalog";
import { normalizeSearchText, prepareSearchItem } from "@/utils/search";
import { preparePurposeSearchQuery, rankPurposeSearchResults } from "@/utils/searchPurpose";

type Passage = { text: string; heading?: string; anchor?: string };

// Keep long-form text on the server. Index the published wording, excluding study answers.
const passages = new Map<string, Passage[]>();
for (const article of ARTICLES) {
  passages.set(`/articles/${article.id}`, [{ text: article.contentMarkdown }]);
}
for (const [id, guide] of Object.entries(PUBLIC_SYMPTOM_CONTENT)) {
  passages.set(`/symptoms/${id}`, [{ text: [
    ...guide.dailyLife.flatMap(item => [item.title, item.body]), ...guide.observations, ...guide.traditional,
  ].join(" ") }]);
}
for (const article of ACUPUNCTURE_RESEARCH_ARTICLES) {
  passages.set(acupunctureResearchHref(article.slug), article.sections.map(section => ({
    heading: section.title, anchor: section.id, text: section.paragraphs.join(" "),
  })));
}
for (const unit of readingUnits) {
  const revision = readingUnitRevisions[unit.slug];
  if (!revision) continue;
  passages.set(unit.href, [
    { text: unit.opening.join(" ") },
    ...unit.parts.flatMap(part => {
      const article = getPublicLectureArticle(part.lectureId);
      if (!article) return [];
      return reviseLectureSections(article.sections, revision.copy[part.lectureId]).map((section, index) => ({
        heading: index === 0 ? part.label : section.heading,
        anchor: `${part.anchor}-section-${index + 1}`,
        text: section.paragraphs.join(" "),
      }));
    }),
    { heading: "要点まとめ", anchor: "lecture-review", text: revision.takeaways.join(" ") },
  ]);
}

const index = SEARCH_CATALOG.map(prepareSearchItem);
const bodyIndex = SEARCH_CATALOG.flatMap(item => {
  let sections = passages.get(item.url);
  if (item.url.startsWith("/curriculum/")) {
    const lecture = getPublicLectureArticle(item.url.slice("/curriculum/".length));
    if (lecture) sections = [
      { text: lecture.lead },
      ...lecture.sections.map((section, index) => ({
        heading: section.heading, anchor: `lecture-section-${index + 1}`, text: section.paragraphs.join(" "),
      })),
    ];
  }
  if (!sections) return [];
  const normalized = sections.map(({ text, heading, anchor }) => ({
    heading, anchor, text: normalizeSearchText([heading, text].filter(Boolean).join(" ")),
  }));
  const text = [normalizeSearchText([item.title, item.subtitle, ...(item.tags ?? [])].join(" ")), ...normalized.map(p => p.text)].join(" ");
  return [{ item, text, sections: normalized }];
});

export function findPublicReadingResults(query: string) {
  const context = preparePurposeSearchQuery(query);
  if (context.query.tokens.length === 0) return [];
  const primary = rankPurposeSearchResults(index, context);
  const seen = new Set(primary.map(({ item }) => item.url));
  const containsTerms = (text: string) => context.query.tokens.every(token => text.includes(token));
  const bodyMatches = bodyIndex.flatMap(({ item, text, sections }) => {
    if (seen.has(item.url) || !containsTerms(text)) return [];
    const section = sections.find(passage => passage.anchor && containsTerms(passage.text));
    return [{
      item, href: section?.anchor ? `${item.url}#${section.anchor}` : item.url,
      hint: section ? `本文の「${section.heading}」に一致` : "本文に一致",
    }];
  });
  return [...primary.map(({ item, hint }) => ({ item, hint, href: item.url })), ...bodyMatches];
}
