import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import LearningReviewPanel from "@/components/learning/LearningReviewPanel";
import PageIntro from "@/components/design/PageIntro";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { READING_UNIT_QUESTIONS } from "@/data/publicLectures/readingUnitQuestions";

const description = "間違えた問題、復習日を迎えた問題、まだ答えていない問題を選んで解けます。解説から関連する講義を開けます。";
const title = seriesPageTitle("講義の復習｜確認問題と学習履歴", "reading");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/learn/review" },
  ...pageSocialMetadata(title, description, "/learn/review"),
};

export default function LearningReviewPage() {
  return <div className="page-layout space-y-6">
    <PageIntro title="講義の復習" description={description} art="practice">
      <Link href="/learn" className="page-secondary-action">学習案内へ</Link>
    </PageIntro>
    <Suspense fallback={<p role="status">復習の準備をしています。</p>}><LearningReviewPanel readingQuestions={READING_UNIT_QUESTIONS} /></Suspense>
  </div>;
}
