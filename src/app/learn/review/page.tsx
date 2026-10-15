import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import LearningReviewPanel from "@/components/learning/LearningReviewPanel";
import PageIntro from "@/components/design/PageIntro";
import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";

const description = "講義の確認問題を、回答履歴と復習予定から解き直せます。解説から本文へ戻り、間違えた内容やまだ答えていない問題を確かめましょう。";
export const metadata: Metadata = {
  title: "講義の復習｜確認問題と学習履歴",
  description,
  alternates: { canonical: "/learn/review" },
  openGraph: { title: "講義の復習｜はり太郎", description, url: "https://www.haritaro.jp/learn/review", siteName: SITE_NAME, images: SHARED_OG_IMAGES },
};

export default function LearningReviewPage() {
  return <div className="page-layout space-y-6">
    <PageIntro eyebrow="講義で学んだことを確かめる" title="講義の復習" description="予定が来た問題や間違えた問題を解き、迷ったところは本文で確かめましょう。" art="practice">
      <Link href="/learn" className="page-secondary-action">学習案内へ</Link>
    </PageIntro>
    <Suspense fallback={<p role="status">復習の準備をしています。</p>}><LearningReviewPanel /></Suspense>
  </div>;
}
