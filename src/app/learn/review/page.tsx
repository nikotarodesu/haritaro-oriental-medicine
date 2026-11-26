import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import LearningReviewPanel from "@/components/learning/LearningReviewPanel";
import PageIntro from "@/components/design/PageIntro";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { READING_UNIT_QUESTIONS } from "@/data/publicLectures/readingUnitQuestions";
import { PRACTICE_REVIEW_QUESTIONS } from "@/data/practiceReviewCatalog";

const description = "講義・ツボの図・模擬症例の問題に取り組めます。回答履歴があると、間違えた問題や復習日を迎えた問題を見直せます。";
const title = seriesPageTitle("確認問題と復習｜講義・ツボの図・模擬症例", "reading");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/learn/review" },
  ...pageSocialMetadata(title, description, "/learn/review"),
};

export default function LearningReviewPage() {
  return <div className="page-layout space-y-6">
    <PageIntro title="確認問題と復習" description={description} art="practice">
      <Link href="/learn" className="page-secondary-action">東洋医学の学習案内へ</Link>
    </PageIntro>
    <Suspense fallback={<p role="status">復習の準備をしています。</p>}>
      <LearningReviewPanel readingQuestions={READING_UNIT_QUESTIONS} practiceQuestions={PRACTICE_REVIEW_QUESTIONS} />
    </Suspense>
  </div>;
}
