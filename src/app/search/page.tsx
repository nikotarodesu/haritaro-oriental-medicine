import type { Metadata } from "next";
import Link from "next/link";
import PlatformSearchForm from "@/components/search/PlatformSearchForm";
import { preparePurposeSearchQuery } from "@/utils/searchPurpose";
import { findPublicReadingResults } from "@/data/publicReadingSearch";
import { getPointSearchTopic, matchesSearchCategory, normalizeSearchText, parseSearchCategory, SEARCH_CATEGORIES, searchResultsHref } from "@/utils/search";

export const metadata: Metadata = {
  title: "サイト内検索｜ツボ・症状・東洋医学",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

const PAGE_SIZE = 24;

export default async function SearchPage({ searchParams }: {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[]; category?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const category = parseSearchCategory(params.category);
  const matchedTopic = preparePurposeSearchQuery(query).matchedTopic;
  const normalizedQuery = normalizeSearchText(query.replace(/[?？。!！]+\s*$/, ""));
  const dictionaryHref = getPointSearchTopic(normalizedQuery) !== normalizedQuery
    ? `/tsubo?${new URLSearchParams({ q: query })}` : null;
  const results = findPublicReadingResults(query).filter(result => matchesSearchCategory(result.item, category));
  const hasAtlasPoints = results.some(result => result.item.type === "acupoint");
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page = Number.isInteger(requestedPage) ? Math.max(1, Math.min(totalPages, requestedPage)) : 1;
  const searchUrl = (nextPage: number) => searchResultsHref(query, category, nextPage);

  return (
    <div className="page-layout platform-results">
      <h1 className="font-serif text-3xl font-bold">サイト内検索</h1>
      <PlatformSearchForm key={query} query={query} category={category} />
      {query && <section className="space-y-4" aria-labelledby="search-results-title">
        <h2 id="search-results-title" className="text-lg font-bold">「{query}」の検索結果</h2>
        <nav className="platform-search-categories" aria-label="検索結果の種類で絞り込む">
          {SEARCH_CATEGORIES.map(filter => <Link key={filter.id} href={searchResultsHref(query, filter.id)} aria-current={filter.id === category ? "true" : undefined} prefetch={false}>{filter.label}</Link>)}
        </nav>
        {matchedTopic && <p className="ui-muted text-sm">索引では「{matchedTopic}」で照合しました。</p>}
        <p className="ui-muted" role="status" aria-live="polite" aria-atomic="true">{results.length === 0 ? "0件。見つかりませんでした。" : totalPages === 1 ? `${results.length}件` : `全${results.length}件のうち${(page - 1) * PAGE_SIZE + 1}〜${Math.min(page * PAGE_SIZE, results.length)}件目`}</p>
        {category === "all" && dictionaryHref && <Link href={dictionaryHref} className="page-secondary-action">この検索語でツボ図鑑を絞り込む</Link>}
        {hasAtlasPoints && results.some(result => result.item.type === "symptom" || result.item.searchRole === "professional-guide") && <p className="ui-muted text-sm">ツボ図鑑の結果では、ツボの位置や注意点を確認できます。</p>}
        {results.length === 0 ? <div className="space-y-2 rounded-xl border border-frame px-4 py-3"><p className="ui-muted">ツボは名前（合谷）、読み方（ごうこく）、経穴コード（LI4）で検索できます。症状は「肩こり」のように短く入力するか、<Link href="/symptoms" className="ui-text-link">症状別ガイド</Link>から探してください。</p><a href="/search#platform-query" className="ui-text-link inline-flex min-h-11 items-center">条件をクリア</a></div> : (
          <ul className="platform-result-list">
            {results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(({ item, hint, href }) => (
              <li key={item.id}>
                <Link href={href} className="ui-card platform-result" prefetch={false}>
                  <span className="platform-result-badge">{item.badge}</span>
                  <strong>{item.title}</strong>
                  {item.context && <span className="ui-muted text-sm">{item.context}</span>}
                  {item.subtitle && <span className="leading-relaxed">{item.subtitle}</span>}
                  {hint && <span className="ui-muted text-sm">{hint}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {totalPages > 1 && <nav aria-label="検索結果のページ" className="platform-result-pagination">
          {page > 1 && <Link href={searchUrl(page - 1)} className="ui-text-link">前のページ</Link>}
          <span>{page} / {totalPages}</span>
          {page < totalPages && <Link href={searchUrl(page + 1)} className="ui-text-link">次のページ</Link>}
        </nav>}
      </section>}
    </div>
  );
}
