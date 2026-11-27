import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import LearningReviewPanel from "@/components/learning/LearningReviewPanel";
import PageIntro from "@/components/design/PageIntro";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { READING_UNIT_QUESTIONS } from "@/data/publicLectures/readingUnitQuestions";
import { PRACTICE_REVIEW_QUESTIONS } from "@/data/practiceReviewCatalog";
import { readingUnits } from "@/data/publicLectures/readingUnits";

const description = "講義・ツボの図・模擬症例の問題に取り組めます。このブラウザーに残った回答履歴から、間違えた問題と復習日が来た問題を見直せます。";
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
    <noscript>
      <style>{".learning-review-loading { display: none; }"}</style>
      <section className="space-y-2 border-y border-frame py-4">
        <p>確認問題に答えたり、このブラウザーの回答履歴を読んだりするには、JavaScriptを有効にしてください。講義の本文はそのまま読めます。</p>
        <Link href={readingUnits[0].href} className="ui-text-link min-h-11">第1講を読む</Link>
      </section>
    </noscript>
    <Suspense fallback={<p role="status" className="learning-review-loading">復習の準備をしています。</p>}>
      <LearningReviewPanel readingQuestions={READING_UNIT_QUESTIONS} practiceQuestions={PRACTICE_REVIEW_QUESTIONS} />
    </Suspense>
    <p className="text-sm text-muted">旧マイノートの保存データについては、<Link href="/updates#notes-ended" className="ui-text-link min-h-11">提供終了のお知らせ</Link>をご覧ください。</p>
  </div>;
}
