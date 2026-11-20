import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen } from "lucide-react";
import PublicLearningPath from "@/components/curriculum/PublicLearningPath";
import PublicLectureIndex from "@/components/curriculum/PublicLectureIndex";
import PageIntro from "@/components/design/PageIntro";
import { pageSocialMetadata } from "@/config/seo";
import { SERIES } from "@/config/series";
import { getArticlePreviews } from "@/data/articleData";

const title = "陰陽・気血水・経絡の読み物と体質チェック｜はり太郎の東洋医学";
const description = "東洋医学の基本を読む。陰陽五行や気血水、経絡の考え方を図と例から学び、気血水体質チェックにも進めます。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/learn" },
  ...pageSocialMetadata(title, description, "/learn"),
};

const FEATURED_ARTICLES = [
  "science-of-yinyang-gogyo",
  "science-of-qi-blood-fluid",
  "science-of-meridians-network",
];

export default function LearnGuidePage() {
  const articles = getArticlePreviews(FEATURED_ARTICLES);

  return (
    <div className="page-layout learning-guide space-y-8">
      <div className="learning-guide-intro">
        <PageIntro title={SERIES.reading.name} description="陰陽、気・血・津液、経絡。東洋医学の考え方を、図と身近な例で一つずつ学べます。">
          <div className="reader-navigation mt-4">
            <Link href="/curriculum/lecture-intro-1" className="page-primary-action"><BookOpen aria-hidden="true" />最初の講義へ</Link>
            <a href="#learn-courses-heading" className="page-secondary-action">講義の目次<ArrowDown aria-hidden="true" size={18} /></a>
          </div>
        </PageIntro>
        <PublicLearningPath />
      </div>

      <section aria-labelledby="oriental-reading" className="space-y-4">
        <h2 id="oriental-reading" className="reader-section-title">図解記事</h2>
        <ul className="page-link-grid">
          {articles.map(article => (
            <li key={article.id}>
              <Link href={`/articles/${article.id}`} className="page-link-card flex h-full items-center gap-3">
                <strong className="flex-1">{article.title}</strong><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/articles" className="ui-text-link">図解記事の一覧<ArrowRight aria-hidden="true" /></Link>
      </section>

      <section id="learn-courses-heading" aria-labelledby="reading-topics" className="space-y-4 scroll-mt-3">
        <h2 id="reading-topics" className="reader-section-title">講義の目次</h2>
        <PublicLectureIndex series="reading" />
      </section>

      <nav aria-label="東洋医学を詳しく調べる" className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/diagnosis" className="ui-text-link">気血水 体質チェック</Link>
        <Link href="/glossary" className="ui-text-link">用語集</Link>
        <Link href="/library" className="ui-text-link">古典・論文</Link>
        <Link href="/editorial-policy" className="ui-text-link">出典と確認範囲</Link>
      </nav>

      <Link href="/curriculum" className="ui-text-link">3シリーズの読み物・演習の全目次<ArrowRight aria-hidden="true" /></Link>
    </div>
  );
}
