import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import CurriculumIndexClient from "@/components/curriculum/CurriculumIndexClient";
import { getArticlePreviews } from "@/data/articleData";
import { getCurriculumIndexCatalog } from "@/data/curriculumIndexCatalog";

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
  title: "体系学習カリキュラム | 東洋医学基礎から臨床実践まで全81講",
  description:
    "陰陽・五行・気血水から診断・治療・臨床実践まで全81レッスン。丸暗記ではなく、身体のバランスやつながりを理解する基礎を身につけます。",
  alternates: {
    canonical: "https://www.haritaro.jp/curriculum",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "体系学習カリキュラム | はり太郎の東洋医学",
    description:
      "陰陽・五行・気血水から診断・治療・臨床実践まで全81レッスン。丸暗記ではなく、身体のバランスやつながりを理解する基礎を身につけます。",
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
    name: "東洋医学体系学習カリキュラム全81講",
    description:
      "陰陽・五行・気血水から診断・治療・臨床実践まで全81レッスン。丸暗記ではなく、身体のバランスやつながりを理解する基礎を身につけます。",
    url: "https://www.haritaro.jp/curriculum",
    provider: {
      "@type": "Organization",
      name: "はり太郎",
      url: "https://www.haritaro.jp",
    },
    educationalLevel: "Beginner to Advanced",
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
