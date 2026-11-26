"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Search, X } from "lucide-react";
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
      <PageIntro title="東洋医学の解説記事" description="陰陽・経絡・脈診などをテーマ別に読めます。" art="reading" compact />

      {ready && !hasFilters && recentPositions.length > 0 && <section aria-labelledby="article-resume-title" className="space-y-3">
        <div><h2 id="article-resume-title" className="font-serif text-lg font-bold text-ink">保存した位置から読み直す</h2><p className="mt-1 text-sm leading-relaxed text-muted">最近スクロールした記事です。途中の節から続けられます。</p></div>
        <div className="grid gap-3 md:grid-cols-3">{recentPositions.map(position => {
          const article = articles.find(item => item.id === position.articleId)!;
          const metadata = readingCatalog.find(item => item.articleId === position.articleId)!;
          return <Link key={position.articleId} href={articleReadingResumeHref(position, metadata)} onClick={() => trackEvent("context_link_click", { placement: "articles_resume", article_id: article.id })} className="flex min-h-11 min-w-0 flex-col gap-2 rounded-xl border border-frame bg-panel-selected p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <h3 className="font-bold leading-relaxed text-ink [overflow-wrap:anywhere]">{article.title}</h3><span className="text-sm text-muted">閲覧位置 {position.progress}% · 約 {article.readTime}</span><span className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 text-sm font-bold text-accent">保存した節を開く<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span>
          </Link>;
        })}</div>
      </section>}

      <section aria-labelledby="article-search-title" className="space-y-4 rounded-xl border border-frame bg-panel p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="article-search-title" className="font-serif text-lg font-bold text-ink">読みたい記事を探す</h2>
          <div className="w-full sm:max-w-sm">
            <label htmlFor="article-search" className="mb-1 block text-sm font-semibold text-ink">記事をキーワードで絞る</label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input id="article-search" type="text" inputMode="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="記事・キーワード" aria-describedby="article-search-hint" className="min-h-11 w-full rounded-lg border border-field bg-page py-2 pl-10 pr-12 text-base placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
              {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="検索キーワードを消す" className="absolute right-0 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:bg-panel-selected focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"><X aria-hidden="true" className="h-4 w-4" /></button>}
            </div>
            <p id="article-search-hint" className="mt-1 text-sm text-muted">例：陰陽・経絡・脈診</p>
          </div>
        </div>
        <div role="group" aria-label="記事のカテゴリ" className="flex flex-wrap gap-2">
          {categories.map(category => <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)} className={`min-h-11 cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selectedCategory === category ? "border-accent bg-panel-selected text-accent" : "border-frame bg-panel text-muted hover:bg-page"}`}>{CATEGORY_LABELS[category] || category}</button>)}
        </div>
      </section>

      <section aria-labelledby="article-results-title" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="article-results-title" className="font-serif text-lg font-bold text-ink">{hasFilters ? "条件に合う記事" : "すべての記事"}</h2>
          <p role="status" aria-atomic="true" className="text-sm text-muted">
            {hasFilters ? `全${articles.length}件中${filteredArticles.length}件` : `全${articles.length}件`}
          </p>
          {hasFilters && <button type="button" onClick={resetFilters} className="ui-text-link text-sm">条件を解除</button>}
        </div>
        {filteredArticles.length === 0 ? <div className="mx-auto max-w-xl space-y-4 rounded-xl border border-frame bg-panel px-5 py-8 text-center">
          <BookOpen aria-hidden="true" className="mx-auto h-8 w-8 text-accent" />
          <h3 className="font-serif text-lg font-bold text-ink">該当する記事が見つかりませんでした</h3>
          <p className="text-sm leading-relaxed text-muted">検索キーワードまたはカテゴリの選択を変更してお試しください。</p>
          <button type="button" onClick={resetFilters} className="page-primary-action">すべての記事を表示する</button>
        </div> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filteredArticles.map(article => <Link key={article.id} href={`/articles/${article.id}`} aria-labelledby={`article-list-${article.id} article-action-${article.id}`} onClick={() => trackEvent("context_link_click", { placement: "article_list", article_id: article.id })} className="article-cover-card group flex flex-col gap-3 rounded-2xl border border-frame p-5 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <ArticleCover articleId={article.id} />
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted"><span className="font-semibold text-accent">{CATEGORY_LABELS[article.category] || article.category}</span><span className="inline-flex items-center gap-1"><Clock aria-hidden="true" className="h-4 w-4" />約 {article.readTime}</span></div>
          <div className="space-y-2"><h3 id={`article-list-${article.id}`} className="text-lg leading-[1.5] font-semibold group-hover:text-accent">{article.title}</h3><p className="text-sm leading-[1.7] text-muted line-clamp-2">{article.summary}</p></div>
          <span className="mt-auto flex min-h-11 items-center justify-between gap-2 border-t border-frame pt-2 text-sm font-semibold text-accent"><span id={`article-action-${article.id}`}>{article.hasFigures ? "図解と本文を読む" : "本文を読む"}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span>
        </Link>)}</div>}
      </section>
      <Link href="/learn#learn-courses-heading" className="ui-text-link">講義の目次へ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
    </div>
  );
}
