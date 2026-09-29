import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CURRICULUM_DATA, Lecture } from "@/data/curriculumData";
import CurriculumLectureReader from "@/components/curriculum/CurriculumLectureReader";
import CurriculumIndexClient from "@/components/curriculum/CurriculumIndexClient";

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
  searchParams: Promise<{ lecture?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const rawLectureId = params.lecture;

  if (rawLectureId) {
    const lectureId = resolveLectureId(rawLectureId);
    const lecture = allLectures.find((l) => l.id === lectureId);
    if (lecture) {
      const title = `${lecture.title} | 体系学習カリキュラム`;
      const description =
        lecture.summary ||
        lecture.whatYouWillLearn?.canDo ||
        `${lecture.title}の解説講義。東洋医学の基礎から実践まで体系的に学びます。`;

      return {
        title,
        description,
        alternates: {
          canonical: `https://www.haritaro.jp/curriculum?lecture=${lecture.id}`,
        },
        openGraph: {
          title,
          description,
          url: `https://www.haritaro.jp/curriculum?lecture=${lecture.id}`,
        },
      };
    }
  }

  return {
    title: "体系学習カリキュラム",
    description:
      "陰陽・五行・気血水から診断・治療・臨床実践まで全81レッスン。丸暗記ではなく、身体のバランスやつながりを理解する基礎を身につけます。",
    alternates: {
      canonical: "https://www.haritaro.jp/curriculum",
    },
    openGraph: {
      title: "体系学習カリキュラム | はり太郎の東洋医学",
      description:
        "陰陽・五行・気血水から診断・治療・臨床実践まで全81レッスン。丸暗記ではなく、身体のバランスやつながりを理解する基礎を身につけます。",
      url: "https://www.haritaro.jp/curriculum",
    },
  };
}

export default async function CurriculumPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawLectureId = params.lecture;

  if (rawLectureId) {
    const lectureId = resolveLectureId(rawLectureId);

    // 旧形式IDからのアクセスの場合は正規URLへ恒久転送
    if (rawLectureId !== lectureId) {
      permanentRedirect(`/curriculum?lecture=${lectureId}`);
    }

    const lecture = allLectures.find((l) => l.id === lectureId);
    if (!lecture) {
      notFound();
    }

    return <CurriculumLectureReader lecture={lecture} />;
  }

  return <CurriculumIndexClient />;
}
