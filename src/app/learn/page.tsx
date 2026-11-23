import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, LibraryBig, List } from "lucide-react";
import PublicLearningPath from "@/components/curriculum/PublicLearningPath";
import PublicLectureIndex from "@/components/curriculum/PublicLectureIndex";
import PageIntro from "@/components/design/PageIntro";
import { collectionPageJsonLd, pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { getArticlePreviews } from "@/data/articleData";
import { readingUnits } from "@/data/publicLectures/readingUnits";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";

const heading = "東洋医学を図で学ぶ";
const title = seriesPageTitle(`${heading}｜全${readingUnits.length}講義と要点まとめ`, "reading");
const introduction = `陰陽では何を比べるか、気・血・津液にはどんな役割があると考えるか。食事や眠りの例と図を使って、全${readingUnits.length}講で学びます。`;
const description = `${introduction} 各講義に要点まとめと確認問題があります。`;

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        "/learn", heading, introduction, "講義の目次",
        readingUnits.map(({ href, title }) => ({ href, name: title })),
      ) }} />
      <div className="learning-guide-intro">
        <PageIntro title={heading} description={introduction} art="study" />
        <nav aria-label="学び方を選ぶ" className="learning-options">
          <Link href={ACUPUNCTURE_GUIDE.href} className="learning-option">
            <span className="learning-option-icon"><LibraryBig size={21} aria-hidden="true" /></span>
            <span className="learning-option-label"><strong>{ACUPUNCTURE_GUIDE.label}</strong><span>はり・お灸の道具と施術の流れ</span></span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href={readingUnits[0].href} className="learning-option">
            <span className="learning-option-icon"><BookOpen size={21} aria-hidden="true" /></span>
            <span className="learning-option-label"><strong>第1講から読む</strong><span>東洋医学では何を確かめるか</span></span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/learn/essentials" className="learning-option">
            <span className="learning-option-icon"><List size={21} aria-hidden="true" /></span>
            <span className="learning-option-label"><strong>用語の要点を読む</strong><span>陰陽や気血水の意味を図で確認する</span></span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </nav>
        <PublicLearningPath />
      </div>

      <section aria-labelledby="oriental-reading" className="space-y-4">
        <h2 id="oriental-reading" className="reader-section-title">図解記事</h2>
        <ul className="page-link-grid">
          {articles.map(article => (
            <li key={article.id}>
              <Link href={`/articles/${article.id}`} className="page-link-card learning-article-card">
                <span>
                  <strong>{article.title}</strong>
                  <span className="learning-article-summary">{article.summary}</span>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/articles" className="ui-text-link">図解記事の一覧<ArrowRight aria-hidden="true" /></Link>
      </section>

      <section id="learn-courses-heading" aria-labelledby="reading-topics" className="space-y-4">
        <h2 id="reading-topics" className="reader-section-title">講義の目次</h2>
        <PublicLectureIndex series="reading" />
      </section>

      <nav aria-label="学んだことを確かめる" className="page-actions">
        <Link href="/learn/review" className="page-secondary-action">講義の確認問題を復習する</Link>
        <Link href="/clinical" className="page-secondary-action">臨床演習へ進む</Link>
      </nav>

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
