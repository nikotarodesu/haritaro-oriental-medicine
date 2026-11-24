import { PAGE_REVISIONS, SITE_REVISED_AT, ACUPOINT_PAGE_REVISED_AT, PUBLIC_VISUALS_REVISED_AT } from "@/config/contentUpdates";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH, acupunctureResearchHref } from "@/config/acupunctureLearning";
import { SITE_ORIGIN } from "@/config/seo";
import type { MetadataRoute } from "next";
import { ALL_ACUPOINTS } from "@/data/tsubo";
import { ARTICLES } from "@/data/articleData";
import { ACUPUNCTURE_RESEARCH_ARTICLES } from "@/data/acupunctureResearch";
import { getLectureIndexGroups, READING_LECTURES_REVISED_AT } from "@/data/publicLectures/readingUnits";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { KIKEI_VESSELS } from "@/data/kikeiData";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { CLINICAL_COMPLAINTS } from "@/data/clinicalWorkflow";
import { SYMPTOMS } from "@/data/symptomData";
import { SYMPTOM_GUIDES_REVISED_AT, symptomGuidePath } from "@/utils/symptomGuidePaths";
import { EXTRA_POINTS, EXTRA_POINTS_PATH, EXTRA_POINTS_REVISED_AT } from "@/data/tsubo/extraPoints";
import { KEY_POINT_TYPES_GUIDE } from "@/data/tsubo/keyPointTypes";
import { ACUPOINT_LOCATION_IMAGES } from "@/data/tsubo/atlas/locationImages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_ORIGIN;

  // 静的公開ページ台帳（実質更新日に基づく lastModified）
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/updates`, lastModified: new Date(PAGE_REVISIONS['/updates']) },
    { url: `${baseUrl}/safety`, lastModified: new Date("2026-10-02") },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date("2026-10-02") },
    {
      url: `${baseUrl}`,
      lastModified: new Date(PAGE_REVISIONS["/"]),
    },
    {
      url: `${baseUrl}/curriculum`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(PAGE_REVISIONS["/learn"]),
    },
    { url: `${baseUrl}/learn/essentials`, lastModified: new Date(PAGE_REVISIONS["/learn/essentials"]) },
    { url: `${baseUrl}${ACUPUNCTURE_GUIDE.href}`, lastModified: new Date(ACUPUNCTURE_GUIDE.revisedAt) },
    { url: `${baseUrl}${ACUPUNCTURE_RESEARCH.href}`, lastModified: new Date(ACUPUNCTURE_RESEARCH.revisedAt) },
    {
      url: `${baseUrl}/clinical`,
      lastModified: new Date("2026-09-29"),
    },
    {
      url: `${baseUrl}/learn/review`,
      lastModified: new Date("2026-09-28"),
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date("2026-09-28"),
    },
    {
      url: `${baseUrl}/diagnosis`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/diagnosis?tab=gorou`,
      lastModified: new Date(PAGE_REVISIONS["/diagnosis?tab=gorou"]),
    },
    {
      url: `${baseUrl}/simulator`,
      lastModified: new Date("2026-09-28"),
    },
    {
      url: `${baseUrl}/practice/haiketsu`,
      lastModified: new Date("2026-09-28"),
    },
    {
      url: `${baseUrl}/tsubo`,
      lastModified: new Date(PAGE_REVISIONS["/tsubo"]),
    },
    {
      url: `${baseUrl}/tsubo/compare`,
      lastModified: new Date(PUBLIC_VISUALS_REVISED_AT),
    },
    {
      url: `${baseUrl}/tsubo/names`,
      lastModified: new Date(ACUPOINT_PAGE_REVISED_AT),
    },
    {
      url: `${baseUrl}/tsubo/practice`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/tsubo/basics/bone-cun`,
      lastModified: new Date(PAGE_REVISIONS["/tsubo/basics/bone-cun"]),
    },
    {
      url: baseUrl + KEY_POINT_TYPES_GUIDE,
      lastModified: new Date(PAGE_REVISIONS[KEY_POINT_TYPES_GUIDE]),
    },
    ...[EXTRA_POINTS_PATH, ...EXTRA_POINTS.map(point => point.href)].map(href => ({
      url: baseUrl + href,
      lastModified: new Date(EXTRA_POINTS_REVISED_AT),
    })),
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date("2026-09-26"),
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date("2026-09-15"),
    },
    {
      url: `${baseUrl}/kikei`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/symptoms`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-09-26"),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-09-26"),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-09-26"),
    },
    {
      url: `${baseUrl}/tokushoho`,
      lastModified: new Date("2026-09-26"),
    },
  ];

  const curriculumLessonPages: MetadataRoute.Sitemap = getLectureIndexGroups().flatMap(group => group.entries).map(lecture => ({
    url: baseUrl + lecture.href,
    lastModified: new Date(lecture.href.startsWith("/learn/lectures/") ? READING_LECTURES_REVISED_AT : SITE_REVISED_AT),
  }));

  // 全361経穴詳細ページ
  const acupointPages: MetadataRoute.Sitemap = ALL_ACUPOINTS.map((point) => {
    const image = ACUPOINT_LOCATION_IMAGES[point.codeLower];
    return {
      url: `${baseUrl}/tsubo/${point.codeLower}`,
      lastModified: new Date(PUBLIC_VISUALS_REVISED_AT),
      ...(image && { images: [baseUrl + image.src] }),
    };
  });

  // 学術アーカイブ記事ページ（個別記事公開日を反映）
  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
  }));

  // 臨床症例演習ページ（全20症例）
  const casePages: MetadataRoute.Sitemap = CLINICAL_CASES.map((c) => ({
    url: `${baseUrl}/cases/${c.id}`,
    lastModified: new Date(PUBLIC_VISUALS_REVISED_AT),
  }));

  // 奇経八脈詳細ページ（全8経脈）
  const kikeiPages: MetadataRoute.Sitemap = KIKEI_VESSELS.map((v) => ({
    url: `${baseUrl}/kikei/${v.slug}`,
    lastModified: new Date("2026-09-20"),
  }));

  return [
    ...SYMPTOMS.map(guide => ({ url: `${baseUrl}${symptomGuidePath(guide)}`, lastModified: new Date(SYMPTOM_GUIDES_REVISED_AT) })),
    ...CLINICAL_COMPLAINTS.map(item => ({ url: `${baseUrl}/clinical/symptoms/${item.slug}`, lastModified: new Date('2026-10-04') })),
    { url: `${baseUrl}/glossary`, lastModified: new Date(SITE_REVISED_AT) },
    ...LEARNING_COURSES.map(course => ({ url: `${baseUrl}/learn/courses/${course.slug}`, lastModified: new Date("2026-10-03") })),
    ...staticPages,
    ...ACUPUNCTURE_RESEARCH_ARTICLES.map(article => ({
      url: baseUrl + acupunctureResearchHref(article.slug),
      lastModified: new Date(ACUPUNCTURE_RESEARCH.revisedAt),
    })),
    ...curriculumLessonPages,
    ...articlePages,
    ...casePages,
    ...kikeiPages,
    ...acupointPages,
  ].map(page => {
    const { pathname, search } = new URL(page.url);
    const revisedAt = PAGE_REVISIONS[pathname + search] ?? PAGE_REVISIONS[pathname];
    const revision = revisedAt ? new Date(revisedAt) : undefined;
    return revision && (!page.lastModified || revision > new Date(page.lastModified)) ? { ...page, lastModified: revision } : page;
  });
}
