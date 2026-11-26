import type { Metadata } from "next";
import Link from "next/link";
import PlatformSearchForm from "@/components/search/PlatformSearchForm";
import { ARTICLES } from "@/data/articleData";
import { getPublicLectureArticle, publicLectureText } from "@/data/publicLectures/index";
import { PUBLIC_SYMPTOM_CONTENT } from "@/data/publicSymptoms";
import { SEARCH_CATALOG } from "@/data/searchCatalog";
import { getPointSearchTopic, normalizeSearchText, prepareSearchItem } from "@/utils/search";
import { preparePurposeSearchQuery, rankPurposeSearchResults } from "@/utils/searchPurpose";

export const metadata: Metadata = {
  title: "サイト内検索｜ツボ・症状・東洋医学",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

const PAGE_SIZE = 24;
const index = SEARCH_CATALOG.map(prepareSearchItem);

// Search published reading content on the server. The browser catalog stays small
// and the body index excludes quiz choices, drafts, and raw research records.
const publicBodies = new Map<string, string>([
  ...ARTICLES.map(article => [`/articles/${article.id}`, article.contentMarkdown] as const),
  ...Object.entries(PUBLIC_SYMPTOM_CONTENT).map(([id, guide]) => [
    `/symptoms/${id}`, [
      ...guide.dailyLife.flatMap(item => [item.title, item.body]),
      ...guide.observations, ...guide.traditional,
    ].join(" "),
  ] as const),
]);
const bodyIndex = SEARCH_CATALOG.flatMap(item => {
  const lecture = item.url.startsWith("/curriculum/") ? getPublicLectureArticle(item.url.slice("/curriculum/".length)) : undefined;
  const body = lecture ? publicLectureText(lecture) : publicBodies.get(item.url);
  if (!body) return [];
  return [{ item, text: normalizeSearchText([item.title, item.subtitle, ...(item.tags ?? []), body].join(" ")) }];
});

function findResults(query: string) {
  if (!query) return [];
  const context = preparePurposeSearchQuery(query);
  const primary = rankPurposeSearchResults(index, context);
  const seen = new Set(primary.map(({ item }) => item.url));
  const matches = bodyIndex.filter(({ item, text }) =>
    !seen.has(item.url) && context.query.tokens.every(token => text.includes(token)),
  );
  return [...primary, ...matches.map(({ item }) => ({ item, hint: "本文に一致" }))];
}

export default async function SearchPage({ searchParams }: {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const normalizedQuery = normalizeSearchText(query.replace(/[?？。!！]+\s*$/, ""));
  const dictionaryHref = getPointSearchTopic(normalizedQuery) !== normalizedQuery
    ? `/tsubo?${new URLSearchParams({ q: query })}` : null;
  const results = findResults(query);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page = Number.isInteger(requestedPage) ? Math.max(1, Math.min(totalPages, requestedPage)) : 1;
  const searchUrl = (nextPage: number) => `/search?${new URLSearchParams({ q: query, page: String(nextPage) })}`;

  return (
    <div className="page-layout platform-results">
      <h1 className="font-serif text-3xl font-bold">サイト内検索</h1>
      <PlatformSearchForm key={query} query={query} />
      {!query && <p className="ui-muted" role="status">検索語を入力してください。</p>}
      {query && <section className="space-y-4" aria-labelledby="search-results-title">
        <h2 id="search-results-title" className="text-lg font-bold">「{query}」の検索結果</h2>
        <p className="ui-muted" role="status" aria-live="polite" aria-atomic="true">{results.length === 0 ? "該当する結果はありません（0件）。" : `${results.length}件見つかりました。`}</p>
        {dictionaryHref && <Link href={dictionaryHref} className="page-secondary-action">この検索語でツボ図鑑を絞り込む</Link>}
        {results.length === 0 ? <p className="ui-muted">ツボは名前（合谷）、読み方（ごうこく）、経穴コード（LI4）で検索できます。症状は「肩こり」のように短く入力するか、<Link href="/symptoms" className="ui-text-link">症状別ガイド</Link>から探してください。</p> : (
          <ul className="platform-result-list">
            {results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(({ item, hint }) => (
              <li key={item.id}>
                <Link href={item.url} className="ui-card platform-result" prefetch={false}>
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
