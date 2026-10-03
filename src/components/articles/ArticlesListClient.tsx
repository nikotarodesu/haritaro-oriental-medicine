"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Compass, FlaskConical, Leaf, Search, X } from "lucide-react";
import { matchesSearchText } from "@/utils/search";
import { trackEvent } from "@/utils/analytics";

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

const READING_STARTS = [
  { articleId: "science-of-yinyang-gogyo", label: "理論の土台をつかむ", description: "陰陽五行の分類と、学習用の比喩を分けて読む。", icon: Leaf },
  { articleId: "science-of-pulse-diagnosis", label: "身体の所見を学ぶ", description: "観察できることと、診断できることの違いを確かめる。", icon: Compass },
  { articleId: "science-of-acupuncture-neuroscience", label: "研究の読み方を知る", description: "作用機序の研究と、患者の臨床効果を分けて読む。", icon: FlaskConical },
];

export default function ArticlesListClient({ articles }: ArticlesListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["すべて", ...new Set(articles.map(article => article.category))];
  const filteredArticles = articles.filter(article =>
    (selectedCategory === "すべて" || article.category === selectedCategory) &&
    matchesSearchText(searchQuery, [article.title, article.summary, article.category, ...article.tags]));
  const hasFilters = selectedCategory !== "すべて" || searchQuery.trim().length > 0;
  const readingStarts = READING_STARTS.flatMap(start => {
    const article = articles.find(candidate => candidate.id === start.articleId);
    return article ? [{ ...start, article }] : [];
  });
  const resetFilters = () => { setSelectedCategory("すべて"); setSearchQuery(""); };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-3 py-6 sm:px-6 sm:py-16 lg:px-8">
      <header className="space-y-3 border-b border-[#E8E1D1] pb-6 dark:border-[#22303D] sm:pb-8">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[#1E2D3D] dark:text-[#7BAAD8]"><BookOpen aria-hidden="true" className="h-4 w-4" />コラム・文献アーカイブ</p>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5] sm:text-4xl">図解で学ぶ、東洋医学</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">経絡・経穴・四診などの伝統的な用語と観察所見を学び、原著研究や公的な医療情報と比較する解説記事です。伝統的な見立て、研究で測定した結果、学習用の比喩を区別し、解釈の限界も確認します。</p>
      </header>

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

      {!hasFilters && readingStarts.length > 0 && <section aria-labelledby="article-reading-starts" className="space-y-3">
        <div><h2 id="article-reading-starts" className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">どこから読むか迷ったら</h2><p className="mt-1 text-sm text-[#59615D] dark:text-[#A0B0BC]">学びたい目的から、図解のある記事へ。</p></div>
        <div className="grid gap-3 md:grid-cols-3">{readingStarts.map(({ article, label, description, icon: Icon }) => <Link key={article.id} href={`/articles/${article.id}`} onClick={() => trackEvent("context_link_click", { placement: "article_reading_start", article_id: article.id })} className="group flex flex-col gap-3 rounded-2xl bg-[#EBF3EF] p-5 hover:bg-[#DFEBE5] focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-[#182823] dark:hover:bg-[#20372F]">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3D34] dark:text-[#83BEA8]"><Icon aria-hidden="true" className="h-5 w-5 shrink-0" />{label}</span>
          <h3 className="font-serif text-base font-bold leading-relaxed text-[#232826] dark:text-[#FAF8F5]">{article.title}</h3>
          <p className="text-sm leading-relaxed text-[#404743] dark:text-[#C5D2DB]">{description}</p>
          <span className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 text-sm text-[#1E3D34] dark:text-[#83BEA8]"><span>約 {article.readTime}{article.hasFigures ? "・図解付き" : ""}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span>
        </Link>)}</div>
      </section>}

      {!hasFilters && <aside className="flex flex-col gap-4 rounded-2xl border border-[#D9E3DD] bg-[#F6F4EE] p-5 sm:flex-row sm:items-center sm:justify-between dark:border-[#2A3B4A] dark:bg-[#182823]">
        <div className="space-y-1"><h2 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">記事でつかんだことを、講義で確かめる</h2><p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">陰陽・五行・気血津液を、学ぶ順番と確認クイズがあるコースで整理できます。</p></div>
        <Link href="/learn/courses" onClick={() => trackEvent("context_link_click", { placement: "articles_courses" })} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#184F49] px-4 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]">学習コースを見る<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
      </aside>}

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
        </div> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filteredArticles.map(article => <Link key={article.id} href={`/articles/${article.id}`} onClick={() => trackEvent("context_link_click", { placement: "article_list", article_id: article.id })} className="group flex flex-col gap-4 rounded-2xl border border-[#E5DEC9] bg-white p-5 hover:border-[#1E3D34] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A3B4A] dark:bg-[#17212A] dark:hover:border-[#4E8C76]">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#59615D] dark:text-[#A0B0BC]"><span className="font-semibold text-[#1E3D34] dark:text-[#83BEA8]">{CATEGORY_LABELS[article.category] || article.category}</span><span className="inline-flex items-center gap-1"><Clock aria-hidden="true" className="h-4 w-4" />約 {article.readTime}</span></div>
          <div className="space-y-2"><h3 className="text-lg font-bold leading-relaxed text-[#232826] group-hover:text-[#1E3D34] dark:text-[#FAF8F5] dark:group-hover:text-[#74BA9E]">{article.title}</h3>{article.subtitle && <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">{article.subtitle}</p>}<p className="text-sm leading-relaxed text-[#404743] dark:text-[#C5D2DB]">{article.summary}</p></div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">{article.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
          <div className="mt-auto space-y-2 border-t border-[#F2ECE0] pt-3 dark:border-[#22303D]"><p className="text-sm text-[#59615D] dark:text-[#A0B0BC]">執筆・編集：{article.authorName}</p><span className="flex min-h-11 items-center justify-between gap-2 text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E]"><span>{article.hasFigures ? "図解と本文を読む" : "記事を読む"}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span></div>
        </Link>)}</div>}
      </section>
    </div>
  );
}
