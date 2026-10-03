import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CURRICULUM_DATA, Lecture } from "@/data/curriculumData";
import CurriculumLectureReader from "@/components/curriculum/CurriculumLectureReader";
import { getArticlePreviews } from "@/data/articleData";
import { createCurriculumReadingLinks, getCurriculumRelatedArticleIds } from "@/data/curriculumReadingGuides";

const allLectures: Lecture[] = CURRICULUM_DATA.flatMap((s) => s.lectures);

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
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allLectures.map((lecture) => ({
    id: lecture.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: rawId } = await params;
  const lectureId = resolveLectureId(rawId);
  const lecture = allLectures.find((l) => l.id === lectureId);

  if (!lecture) {
    return {
      title: "講義が見つかりません",
      description: "指定された講義は存在しないか、準備中です。",
    };
  }

  const title = `${lecture.title} | 体系学習カリキュラム`;
  const description =
    lecture.summary ||
    lecture.whatYouWillLearn?.canDo ||
    `${lecture.title}の解説講義。東洋医学の基礎から実践まで体系的に学びます。`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.haritaro.jp/curriculum/${lecture.id}`,
    },
    openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `https://www.haritaro.jp/curriculum/${lecture.id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: SHARED_OG_IMAGES.map(image => image.url),
    },
  };
}

export default async function CurriculumDetailPage({ params }: Props) {
  const { id: rawId } = await params;
  const lectureId = resolveLectureId(rawId);

  if (rawId !== lectureId) {
    permanentRedirect(`/curriculum/${lectureId}`);
  }

  const lecture = allLectures.find((l) => l.id === lectureId);
  if (!lecture) {
    notFound();
  }

  const pageUrl = `https://www.haritaro.jp/curriculum/${lecture.id}`;

  const lectureJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "LearningResource"],
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${lecture.title} | はり太郎の東洋医学`,
        description:
          lecture.summary ||
          `${lecture.title}の解説講義。東洋医学の基礎から実践まで体系的に学びます。`,
        learningResourceType: "Lesson",
        educationalLevel: "Professional / Academic",
        inLanguage: "ja",
        provider: {
          "@type": "Organization",
          name: "はり太郎",
          url: "https://www.haritaro.jp",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: "https://www.haritaro.jp",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "カリキュラム",
            item: "https://www.haritaro.jp/curriculum",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: lecture.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lectureJsonLd) }}
      />
      <CurriculumLectureReader lecture={lecture} relatedReadingLinks={createCurriculumReadingLinks(lecture.id, getArticlePreviews(getCurriculumRelatedArticleIds(lecture.id)))} />
    </>
  );
}
