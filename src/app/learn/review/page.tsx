import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import LearningReviewPanel from "@/components/learning/LearningReviewPanel";
import PageIntro from "@/components/design/PageIntro";
import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";

const description = "間違えた問題、復習日を迎えた問題、まだ答えていない問題を選んで解けます。解説から関連する講義を開けます。";
export const metadata: Metadata = {
  title: "講義の復習｜確認問題と学習履歴",
  description,
  alternates: { canonical: "/learn/review" },
  openGraph: { title: "講義の復習｜はり太郎", description, url: "https://www.haritaro.jp/learn/review", siteName: SITE_NAME, images: SHARED_OG_IMAGES },
};

export default function LearningReviewPage() {
  return <div className="page-layout space-y-6">
    <PageIntro title="講義の復習" description={description} art="practice">
      <Link href="/learn" className="page-secondary-action">学習案内へ</Link>
    </PageIntro>
    <Suspense fallback={<p role="status">復習の準備をしています。</p>}><LearningReviewPanel /></Suspense>
  </div>;
}
