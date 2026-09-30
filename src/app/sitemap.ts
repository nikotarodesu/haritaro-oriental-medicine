import type { MetadataRoute } from "next";
import { ALL_ACUPOINTS } from "@/data/tsubo";
import { ARTICLES } from "@/data/articleData";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { KIKEI_VESSELS } from "@/data/kikeiData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.haritaro.jp";

  // 静的公開ページ台帳（実質更新日に基づく lastModified）
  const staticPages: MetadataRoute.Sitemap = [
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
      lastModified: new Date("2026-09-20"),
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
      url: `${baseUrl}/notes`,
      lastModified: new Date("2026-09-26"),
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

  // カリキュラム全81レッスン（個別教材の正規URL）
  const allLectures = CURRICULUM_DATA.flatMap((stage) => stage.lectures).filter(
    (l) => l.isPublished !== false
  );
  const curriculumLessonPages: MetadataRoute.Sitemap = allLectures.map((lecture) => ({
    url: `${baseUrl}/curriculum?lecture=${lecture.id}`,
    lastModified: new Date("2026-09-20"),
  }));

  // 全361経穴詳細ページ
  const acupointPages: MetadataRoute.Sitemap = ALL_ACUPOINTS.map((pt) => ({
    url: `${baseUrl}/tsubo/${pt.code.toLowerCase()}`,
    lastModified: new Date(pt.hasDetailedAnatomy ? "2026-09-25" : "2026-09-20"),
  }));

  // 学術アーカイブ記事ページ（個別記事公開日を反映）
  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date("2026-03-01"),
  }));

  // 臨床症例演習ページ（全20症例）
  const casePages: MetadataRoute.Sitemap = CLINICAL_CASES.map((c) => ({
    url: `${baseUrl}/cases/${c.id}`,
    lastModified: new Date("2026-09-15"),
  }));

  // 奇経八脈詳細ページ（全8経脈）
  const kikeiPages: MetadataRoute.Sitemap = KIKEI_VESSELS.map((v) => ({
    url: `${baseUrl}/kikei/${v.slug}`,
    lastModified: new Date("2026-09-20"),
  }));

  return [
    ...staticPages,
    ...curriculumLessonPages,
    ...articlePages,
    ...casePages,
    ...kikeiPages,
    ...acupointPages,
  ];
}
