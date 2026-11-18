import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen } from "lucide-react";
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
    <div className="page-layout space-y-8">
      <PageIntro title={SERIES.reading.name} description="冷えやすい、眠りにくい。身近な体の変化を、東洋医学ではどう捉えるのでしょう。気になるテーマから読んでみてください。" art="study">
        <div className="page-actions">
          <a href="#oriental-reading" className="page-primary-action">読み物を探す<ArrowDown aria-hidden="true" size={18} /></a>
          <Link href="/diagnosis" className="page-secondary-action">気血水 体質チェック</Link>
        </div>
      </PageIntro>

      <section aria-labelledby="oriental-reading" className="space-y-4">
        <h2 id="oriental-reading" className="scroll-mt-28 font-serif text-2xl font-bold">東洋医学の基本を読む</h2>
        <Link href="/curriculum/lecture-intro-1" className="page-link-card flex items-center gap-3">
          <span className="page-link-icon"><BookOpen className="h-5 w-5" aria-hidden="true" /></span>
          <span className="flex-1"><strong className="block">東洋医学とは何か</strong><span className="ui-muted">鍼灸・漢方・養生と、東洋医学の考え方</span></span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
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

      <section id="learn-courses-heading" aria-labelledby="reading-topics" className="scroll-mt-28 space-y-4">
        <h2 id="reading-topics" className="font-serif text-2xl font-bold">読み物をテーマから探す</h2>
        <PublicLectureIndex series="reading" />
      </section>

      <nav aria-label="東洋医学を詳しく調べる" className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/glossary" className="ui-text-link">用語集</Link>
        <Link href="/library" className="ui-text-link">古典・論文</Link>
        <Link href="/editorial-policy" className="ui-text-link">出典と確認範囲</Link>
      </nav>

      <Link href="/curriculum" className="ui-text-link">3シリーズの読み物・演習の全目次<ArrowRight aria-hidden="true" /></Link>
    </div>
  );
}
