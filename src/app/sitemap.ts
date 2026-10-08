import { PAGE_REVISIONS, SITE_REVISED_AT, ACUPOINT_PAGE_REVISED_AT } from "@/config/contentUpdates";
import type { MetadataRoute } from "next";
import { ALL_ACUPOINTS } from "@/data/tsubo";
import { ARTICLES } from "@/data/articleData";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { KIKEI_VESSELS } from "@/data/kikeiData";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { CLINICAL_COMPLAINTS } from "@/data/clinicalWorkflow";
import { SYMPTOMS } from "@/data/symptomData";
import { SYMPTOM_GUIDES_REVISED_AT, symptomGuidePath } from "@/utils/symptomGuidePaths";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.haritaro.jp";

  // 静的公開ページ台帳（実質更新日に基づく lastModified）
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/updates`, lastModified: new Date(PAGE_REVISIONS['/updates']) },
    { url: `${baseUrl}/safety`, lastModified: new Date("2026-10-02") },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date("2026-10-02") },
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-09-26"),
    },
    {
      url: `${baseUrl}/curriculum`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date("2026-09-29"),
    },
    {
      url: `${baseUrl}/clinical`,
      lastModified: new Date("2026-09-29"),
    },
    {
      url: `${baseUrl}/kokushi`,
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
      lastModified: new Date(PAGE_REVISIONS["/diagnosis"] || SITE_REVISED_AT),
    },
    {
      url: `${baseUrl}/simulator`,
      lastModified: new Date("2026-09-28"),
    },
    {
      url: `${baseUrl}/simulator/compare`,
      lastModified: new Date("2026-09-28"),
    },
    {
      url: `${baseUrl}/practice/haiketsu`,
      lastModified: new Date("2026-09-28"),
    },
    {
      url: `${baseUrl}/tsubo`,
      lastModified: new Date("2026-09-25"),
    },
    {
      url: `${baseUrl}/tsubo/compare`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/tsubo/practice`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/tsubo/basics/bone-cun`,
      lastModified: new Date("2026-09-20"),
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date("2026-09-26"),
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date("2026-09-15"),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date("2026-09-26"),
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

  // カリキュラム全81レッスン（個別教材の正規URL・SSG静的ページ）
  const allLectures = CURRICULUM_DATA.flatMap((stage) => stage.lectures).filter(
    (l) => l.isPublished !== false
  );
  const curriculumLessonPages: MetadataRoute.Sitemap = allLectures.map((lecture) => ({
    url: `${baseUrl}/curriculum/${lecture.id}`,
    lastModified: new Date(SITE_REVISED_AT),
  }));

  // 全361経穴詳細ページ
  const acupointPages: MetadataRoute.Sitemap = ALL_ACUPOINTS.map((pt) => ({
    url: `${baseUrl}/tsubo/${pt.code.toLowerCase()}`,
    lastModified: new Date(ACUPOINT_PAGE_REVISED_AT),
  }));

  // 学術アーカイブ記事ページ（個別記事公開日を反映）
  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
  }));

  // 臨床症例演習ページ（全20症例）
  const casePages: MetadataRoute.Sitemap = CLINICAL_CASES.map((c) => ({
    url: `${baseUrl}/cases/${c.id}`,
    lastModified: new Date("2026-10-02"),
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
    { url: `${baseUrl}/learn/courses`, lastModified: new Date("2026-10-03") },
    ...LEARNING_COURSES.map(course => ({ url: `${baseUrl}/learn/courses/${course.slug}`, lastModified: new Date("2026-10-03") })),
    ...staticPages,
    ...curriculumLessonPages,
    ...articlePages,
    ...casePages,
    ...kikeiPages,
    ...acupointPages,
  ].map(page => {
    const pathname = new URL(page.url).pathname;
    return PAGE_REVISIONS[pathname] ? { ...page, lastModified: new Date(PAGE_REVISIONS[pathname]) } : page;
  });
}
