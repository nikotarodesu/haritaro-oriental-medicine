import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import CurriculumIndexClient from "@/components/curriculum/CurriculumIndexClient";
import { getArticlePreviews } from "@/data/articleData";
import { getCurriculumIndexCatalog } from "@/data/curriculumIndexCatalog";
import { CURRICULUM_TOTAL_LESSONS, CURRICULUM_TOTAL_CHAPTERS } from "@/data/curriculumOutline";

const curriculumDescription = `東洋医学とは何かを知る概論から、陰陽・気血津液・臓腑・五行・経絡、病因病機・四診・治法・統合症例へ。初学者と鍼灸学生のための全${CURRICULUM_TOTAL_CHAPTERS}章・${CURRICULUM_TOTAL_LESSONS}講義。理論と短い学習例を往復して学びます。`;

// 旧形式IDのマッピング
const OLD_ID_MAP: Record<string, string> = {
  "lecture-1": "lecture-yinyang-1",
  "lecture-1-yinyang": "lecture-yinyang-1",
  "lecture-2": "lecture-wuxing-1",
  "lecture-2-wuxing": "lecture-wuxing-1",
  "lecture-3": "lecture-qiblood-1",
  "lecture-3-qiblood": "lecture-qiblood-1",
  "lecture-4": "lecture-lifedynamics-1",
  "lecture-4-lifedynamics": "lecture-lifedynamics-1",
  "lecture-5": "lecture-pathomechanism-1",
  "lecture-5-pathomechanism": "lecture-pathomechanism-1",
  "lecture-6": "lecture-diagnosis-1",
  "lecture-6-diagnosis": "lecture-diagnosis-1",
  "lecture-7": "lecture-treatment-1",
  "lecture-7-treatment": "lecture-treatment-1",
  "lecture-8": "lecture-practice-1",
  "lecture-8-practice": "lecture-practice-1",
};

function resolveLectureId(rawId: string): string {
  return OLD_ID_MAP[rawId] || rawId;
}

interface Props {
  searchParams: Promise<{ lecture?: string; focus?: string }>;
}

export const metadata: Metadata = {
  title: `東洋医学カリキュラム | 概論から臨床の基礎まで全${CURRICULUM_TOTAL_LESSONS}講`,
  description: curriculumDescription,
  alternates: {
    canonical: "https://www.haritaro.jp/curriculum",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "体系学習カリキュラム | はり太郎の東洋医学",
    description: curriculumDescription,
    url: "https://www.haritaro.jp/curriculum",
  },
};

export default async function CurriculumPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawLectureId = params.lecture;

  // 旧クエリURL（lectureクエリパラメータ付き）からのアクセスは静的個別URL（/curriculum/[id]）へ308恒久転送
  if (rawLectureId) {
    const lectureId = resolveLectureId(rawLectureId);
    const focusQuery = params.focus ? `?focus=${encodeURIComponent(params.focus)}` : "";
    permanentRedirect(`/curriculum/${lectureId}${focusQuery}`);
  }

  const indexJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `東洋医学体系学習カリキュラム全${CURRICULUM_TOTAL_LESSONS}講`,
    description: curriculumDescription,
    url: "https://www.haritaro.jp/curriculum",
    provider: {
      "@type": "Organization",
      name: "はり太郎",
      url: "https://www.haritaro.jp",
    },
    educationalLevel: "初学者・鍼灸学生：臨床の基礎まで",
    teaches: ["伝統的な基本用語を説明する", "観察事実と解釈を分ける", "根拠と不足情報を比較する", "新情報で判断を修正する"],
    inLanguage: "ja",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(indexJsonLd) }}
      />
      <CurriculumIndexClient catalog={getCurriculumIndexCatalog()} relatedArticles={getArticlePreviews([
        "science-of-oriental-medicine-history",
        "science-of-yinyang-gogyo",
        "science-of-qi-blood-fluid",
        "science-of-acupuncture-neuroscience",
        "science-of-kampo-network-pharmacology",
        "east-west-integrative-unified-theory",
      ])} />
    </>
  );
}
