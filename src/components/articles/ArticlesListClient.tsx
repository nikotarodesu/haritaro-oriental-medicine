"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Search, X, ScrollText, MapPin, Microscope, Stethoscope } from "lucide-react";
import PageIntro from "@/components/design/PageIntro";
import ArticleCover from "@/components/articles/ArticleCover";
import { matchesSearchText } from "@/utils/search";
import { trackEvent } from "@/utils/analytics";
import { useLearningSync } from "@/contexts/LearningSyncContext";
import { articleReadingResumeHref, readArticleReadingPositions } from "@/utils/articleReadingPosition";

export interface ArticleListItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  readTime: string;
  summary: string;
  tags: readonly string[];
  authorName: string;
  hasFigures: boolean;
  readingRevision: string;
  readingHeadingIds: readonly string[];
}

interface ArticlesListClientProps {
  articles: readonly ArticleListItem[];
}

const CATEGORY_ICONS = { "古典深読み": ScrollText, "経穴・経絡学": MapPin, "論文・文献抄読": Microscope, "臨床・実践知見": Stethoscope };

const CATEGORY_LABELS: Record<string, string> = {
  "すべて": "すべて",
  "古典深読み": "古典・理論",
  "経穴・経絡学": "経穴・経絡",
  "論文・文献抄読": "研究・文献",
  "臨床・実践知見": "臨床・実践",
};

export default function ArticlesListClient({ articles }: ArticlesListClientProps) {
  const { ready, values } = useLearningSync();
  const readingCatalog = useMemo(() => articles.map(article => ({ articleId: article.id, revision: article.readingRevision, headingIds: article.readingHeadingIds })), [articles]);
  const recentPositions = useMemo(() => readArticleReadingPositions(values, readingCatalog).slice(0, 3), [values, readingCatalog]);
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["すべて", ...new Set(articles.map(article => article.category))];
  const filteredArticles = articles.filter(article =>
    (selectedCategory === "すべて" || article.category === selectedCategory) &&
    matchesSearchText(searchQuery, [article.title, article.summary, article.category, ...article.tags]));
  const hasFilters = selectedCategory !== "すべて" || searchQuery.trim().length > 0;
  const resetFilters = () => { setSelectedCategory("すべて"); setSearchQuery(""); };

  return (
    <div className="page-layout space-y-8">
      <PageIntro eyebrow="コラム・文献アーカイブ" title="図解で学ぶ、東洋医学" description="読みたいテーマを選んで、図解から理解を深めましょう。" art="reading" />

      {ready && !hasFilters && recentPositions.length > 0 && <section aria-labelledby="article-resume-title" className="space-y-3">
        <div><h2 id="article-resume-title" className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">保存した位置から読み直す</h2><p className="mt-1 text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">最近スクロールした記事です。途中の節から続けられます。</p></div>
        <div className="grid gap-3 md:grid-cols-3">{recentPositions.map(position => {
          const article = articles.find(item => item.id === position.articleId)!;
          const metadata = readingCatalog.find(item => item.articleId === position.articleId)!;
          return <Link key={position.articleId} href={articleReadingResumeHref(position, metadata)} onClick={() => trackEvent("context_link_click", { placement: "articles_resume", article_id: article.id })} className="flex min-h-11 min-w-0 flex-col gap-3 rounded-xl border border-[#C5DED4] bg-[#EBF3EF] p-4 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:bg-[#182823]">
            <h3 className="font-bold leading-relaxed text-[#232826] dark:text-[#FAF8F5] [overflow-wrap:anywhere]">{article.title}</h3><span className="text-sm text-[#59615D] dark:text-[#A0B0BC]">閲覧位置 {position.progress}% · 約 {article.readTime}</span><span className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8]">保存した節を開く<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span>
          </Link>;
        })}</div>
      </section>}

      <section aria-labelledby="article-search-title" className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="article-search-title" className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">読みたい記事を探す</h2>
          <div className="w-full sm:max-w-sm">
            <label htmlFor="article-search" className="mb-1 block text-sm font-semibold text-[#404743] dark:text-[#C5D2DB]">記事・キーワード検索</label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737C77] dark:text-[#8899A6]" />
              <input id="article-search" type="text" inputMode="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="記事・キーワード" aria-describedby="article-search-hint" className="min-h-[44px] w-full rounded-xl border border-[#D5CCBC] bg-white py-2 pl-10 pr-12 text-base text-[#232826] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2D3E50] dark:bg-[#17212A] dark:text-[#E6EFEA]" />
              {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="検索キーワードを消す" className="absolute right-0 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-lg text-[#59615D] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#A0B0BC] dark:hover:bg-[#182823]"><X aria-hidden="true" className="h-4 w-4" /></button>}
            </div>
            <p id="article-search-hint" className="mt-1 text-sm text-[#59615D] dark:text-[#A0B0BC]">例：陰陽・経絡・脈診</p>
          </div>
        </div>
        <div aria-label="記事のカテゴリ" className="flex flex-wrap gap-2">
          {categories.map(category => <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)} className={`min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedCategory === category ? "bg-[#1E2D3D] text-[#FAF8F5] dark:bg-[#375573]" : "bg-[#F0EDE6] text-[#404743] hover:bg-[#E7E2D7] dark:bg-[#22303D] dark:text-[#C5D2DB] dark:hover:bg-[#2A3B4A]"}`}>{CATEGORY_LABELS[category] || category}</button>)}
        </div>
      </section>

      <section aria-labelledby="article-results-title" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="article-results-title" className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">{hasFilters ? "条件に合う記事" : "すべての記事"}</h2>
          <p role="status" className="text-sm text-[#59615D] dark:text-[#A0B0BC]">{filteredArticles.length}件／全{articles.length}件</p>
          {hasFilters && <button type="button" onClick={resetFilters} className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold text-[#1E3D34] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#74BA9E]">条件を解除</button>}
        </div>
        {filteredArticles.length === 0 ? <div className="mx-auto max-w-xl space-y-4 rounded-2xl bg-white px-5 py-10 text-center dark:bg-[#17212A]">
          <BookOpen aria-hidden="true" className="mx-auto h-8 w-8 text-[#1E3D34] dark:text-[#74BA9E]" />
          <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">該当する記事が見つかりませんでした</h3>
          <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">検索キーワードまたはカテゴリの選択を変更してお試しください。</p>
          <button type="button" onClick={resetFilters} className="inline-flex min-h-[44px] items-center rounded-xl bg-[#1E3D34] px-4 py-2 text-sm font-semibold text-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-[#2B6958]">すべての記事を表示する</button>
        </div> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filteredArticles.map(article => { const CategoryIcon = CATEGORY_ICONS[article.category as keyof typeof CATEGORY_ICONS] || BookOpen; return <Link key={article.id} href={`/articles/${article.id}`} onClick={() => trackEvent("context_link_click", { placement: "article_list", article_id: article.id })} className="article-cover-card group flex flex-col gap-4 rounded-2xl border border-[#E5DEC9] bg-white p-5 hover:border-[#1E3D34] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A3B4A] dark:bg-[#17212A] dark:hover:border-[#4E8C76]">
          <ArticleCover articleId={article.id} />
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#59615D] dark:text-[#A0B0BC]"><span className="inline-flex items-center gap-2 font-semibold text-[#1E3D34] dark:text-[#83BEA8]"><span className="page-link-icon"><CategoryIcon aria-hidden="true" className="h-5 w-5" /></span>{CATEGORY_LABELS[article.category] || article.category}</span><span className="inline-flex items-center gap-1"><Clock aria-hidden="true" className="h-4 w-4" />約 {article.readTime}</span></div>
          <div className="space-y-2"><h3 className="text-lg font-bold leading-relaxed text-[#232826] group-hover:text-[#1E3D34] dark:text-[#FAF8F5] dark:group-hover:text-[#74BA9E]">{article.title}</h3><p className="line-clamp-3 text-sm leading-relaxed text-[#404743] dark:text-[#C5D2DB]">{article.summary}</p></div>
          <div className="mt-auto space-y-2 border-t border-[#F2ECE0] pt-3 dark:border-[#22303D]"><span className="flex min-h-11 items-center justify-between gap-2 text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E]"><span>{article.hasFigures ? "図解と本文を読む" : "記事を読む"}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span></div>
        </Link>; })}</div>}
      </section>
      <Link href="/learn/courses" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">順番に学びたい方：基礎コースへ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
    </div>
  );
}
