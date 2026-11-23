"use client";

import { Suspense, useState, useMemo, useEffect, useRef, useCallback, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  getAllAcupoints, 
  getPublishedAcupoints, 
  AcupointMaster, 
  MERIDIANS, 
  compareAcupointsByMeridianOrder 
} from "@/data/tsubo";
import { 
  Compass, 
  SlidersHorizontal,
  ChevronDown,
  Search, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  GitCompare, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  X 
} from "lucide-react";
import BodyMapSvg from "@/components/tsubo/BodyMapSvg";
import TsuboReviewEntry from '@/components/tsubo/TsuboReviewEntry';
import ClinicalPairsSection from "@/components/ClinicalPairsSection";
import { getPointSearchTopic, normalizeSearchText } from "@/utils/search";
import { prepareAcupointSearch, getAcupointMatchReason, matchesPrimaryJoint } from "@/utils/acupointSearch";
import { setAnalyticsDisabled } from "@/utils/analytics";

type SortOption = "meridian" | "kana" | "detailed";
type ViewMode = "grid" | "table";

const PAGE_SIZE = 24;
const EXAMPLE_SEARCH_TERMS = ["合谷", "手首", "ひざ"];
const ATLAS_INDEX_LINKS = [
  { href: "#illustrated-points", label: "部位別の索引" },
  { href: "#tsubo-index", label: "経絡別の索引" },
  { href: "#atlas-research-index", label: "研究から探す" },
];
const DEFAULT_SELECTION = {
  selectedBodyPart: "すべて",
  selectedMeridian: "すべて",
  selectedCategory: "すべて",
  onlyPublished: false,
};
const DEFAULT_FILTERS = {
  ...DEFAULT_SELECTION,
  searchQuery: "",
  sortOption: "meridian" as SortOption,
  viewMode: "grid" as ViewMode,
  currentPage: 1,
};
type Filters = typeof DEFAULT_FILTERS;

function TsuboUrlSync({ restore }: { restore: (query: string) => void | (() => void) }) {
  const query = useSearchParams()?.toString() ?? "";
  useEffect(() => restore(query), [query, restore]);
  return null;
}

export default function TsuboInteractiveClient({ relatedGuides, featuredPoints }: {
  relatedGuides?: ReactNode;
  featuredPoints?: ReactNode;
} = {}) {
  const allPoints = useMemo(() => getAllAcupoints(), []);
  const publishedCount = useMemo(() => getPublishedAcupoints().length, []);
  const searchIndex = useMemo(() => new Map(allPoints.map(point => [point.code, prepareAcupointSearch(point)])), [allPoints]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { searchQuery, selectedBodyPart, selectedMeridian, selectedCategory, onlyPublished, sortOption, viewMode } = filters;
  const [selectedTsubo, setSelectedTsubo] = useState<AcupointMaster | null>(null);
  const [showBodyMap, setShowBodyMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const lastQuery = useRef("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);

  const restoreUrl = useCallback((query: string) => {
    if (query === lastQuery.current) return;
    lastQuery.current = query;
    const params = new URLSearchParams(query);
    const sort = params.get("sort");
    const restored: Filters = {
      searchQuery: params.get("q") || "",
      selectedBodyPart: params.get("bodyPart") || DEFAULT_SELECTION.selectedBodyPart,
      selectedMeridian: params.get("meridian") || DEFAULT_SELECTION.selectedMeridian,
      selectedCategory: params.get("category") || DEFAULT_SELECTION.selectedCategory,
      onlyPublished: params.get("published") === "true",
      sortOption: sort === "kana" || sort === "detailed" ? sort : DEFAULT_FILTERS.sortOption,
      viewMode: params.get("view") === "table" ? "table" : "grid",
      currentPage: Math.max(1, Number.parseInt(params.get("page") || "1", 10) || 1),
    };
    setFilters(restored);
    setShowBodyMap(restored.selectedBodyPart !== DEFAULT_SELECTION.selectedBodyPart && !restored.searchQuery);
    setShowFilters(restored.selectedMeridian !== DEFAULT_SELECTION.selectedMeridian ||
      restored.selectedCategory !== DEFAULT_SELECTION.selectedCategory || restored.onlyPublished);

    const id = (params.get("id") || params.get("highlight") || "").replace(/^tsubo-/i, "").toLowerCase();
    const point = id ? allPoints.find(item =>
      item.codeLower === id || item.id.toLowerCase() === id || item.legacyId.toLowerCase() === id,
    ) : undefined;
    setSelectedTsubo(point ?? null);
    if (point) {
      const timeout = window.setTimeout(() => {
        document.getElementById(`tsubo-card-${point.codeLower}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 350);
      return () => window.clearTimeout(timeout);
    }
  }, [allPoints]);

  function updateFilters(change: Partial<Filters>) {
    const next = { ...filters, ...change };
    setFilters(next);

    const url = new URL(window.location.href);
    const previous = url.searchParams.toString();
    const values = {
      q: next.searchQuery.trim(),
      bodyPart: next.selectedBodyPart !== DEFAULT_SELECTION.selectedBodyPart ? next.selectedBodyPart : "",
      meridian: next.selectedMeridian !== DEFAULT_SELECTION.selectedMeridian ? next.selectedMeridian : "",
      category: next.selectedCategory !== DEFAULT_SELECTION.selectedCategory ? next.selectedCategory : "",
      published: next.onlyPublished ? "true" : "",
      sort: next.sortOption !== DEFAULT_FILTERS.sortOption ? next.sortOption : "",
      view: next.viewMode !== DEFAULT_FILTERS.viewMode ? next.viewMode : "",
      page: next.currentPage > 1 ? String(next.currentPage) : "",
    };
    for (const [key, value] of Object.entries(values)) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    const query = url.searchParams.toString();
    if (query !== previous) {
      lastQuery.current = query;
      // Stop the Google tag before its history listener can see a search URL.
      if (query) setAnalyticsDisabled(true);
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }

  // 経絡リスト（全14経脈から動的生成）
  const meridianOptions = useMemo(() => {
    return ["すべて", ...MERIDIANS.map((m) => m.shortName)];
  }, []);

  // 要穴リスト
  const categoryOptions = useMemo(() => {
    return ["すべて", "原穴", "絡穴", "郄穴", "募穴", "背部兪穴", "合穴", "四総穴", "八脈交会穴", "八会穴"];
  }, []);

  const normalizedQuery = normalizeSearchText(searchQuery);
  const searchTopic = getPointSearchTopic(normalizedQuery);

  // 検索・フィルタリング・並び替え処理
  const filteredTsubos = useMemo(() => {
    return allPoints
      .filter((t) => {
        if (onlyPublished && t.status !== "published") return false;
        if (selectedBodyPart !== "すべて" && t.bodyPart !== selectedBodyPart) return false;
        if (selectedMeridian !== "すべて" && t.meridianShort !== selectedMeridian) return false;
        if (
          selectedCategory !== "すべて" &&
          !t.categories.some((c) => c.includes(selectedCategory))
        )
          return false;

        if (!searchTopic) return true;

        const indexed = searchIndex.get(t.code);
        return indexed ? getAcupointMatchReason(indexed, searchTopic) !== null : false;
      })
      .sort((a, b) => {
        if (sortOption === "kana") {
          return a.kana.localeCompare(b.kana, "ja");
        }
        if (sortOption === "detailed") {
          if (a.hasDetailedAnatomy && !b.hasDetailedAnatomy) return -1;
          if (!a.hasDetailedAnatomy && b.hasDetailedAnatomy) return 1;
          if (a.status === "published" && b.status !== "published") return -1;
          if (a.status !== "published" && b.status === "published") return 1;
          return compareAcupointsByMeridianOrder(a, b);
        }

        // デフォルト：経絡順（検索語がある場合は完全一致優先）
        if (searchTopic) {
          const aIndexed = searchIndex.get(a.code)!;
          const bIndexed = searchIndex.get(b.code)!;
          const aExact = aIndexed.name === searchTopic || aIndexed.code === searchTopic;
          const bExact = bIndexed.name === searchTopic || bIndexed.code === searchTopic;
          if (aExact !== bExact) return aExact ? -1 : 1;
          const aJoint = matchesPrimaryJoint(aIndexed, searchTopic);
          const bJoint = matchesPrimaryJoint(bIndexed, searchTopic);
          if (aJoint !== bJoint) return aJoint ? -1 : 1;
        }

        return compareAcupointsByMeridianOrder(a, b);
      });
  }, [allPoints, searchIndex, searchTopic, selectedBodyPart, selectedMeridian, selectedCategory, onlyPublished, sortOption]);

  // ページネーション計算
  const totalItems = filteredTsubos.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(filters.currentPage, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paginatedTsubos = filteredTsubos.slice(pageStart, pageStart + PAGE_SIZE);

  // 検索語を保って、部位・経脈などの条件だけを解除する。
  const resetSelectionFilters = () => {
    updateFilters({ ...DEFAULT_SELECTION, currentPage: 1 });
    searchInputRef.current?.focus();
  };
  const clearSearchQuery = () => {
    updateFilters({ searchQuery: "", currentPage: 1 });
    searchInputRef.current?.focus();
  };
  const searchExample = (term: string) => {
    setShowBodyMap(false);
    updateFilters({ searchQuery: term, currentPage: 1 });
    resultsRef.current?.focus();
  };
  const resetAllFilters = () => {
    updateFilters({ ...DEFAULT_SELECTION, searchQuery: "", currentPage: 1 });
    searchInputRef.current?.focus();
  };
  const goToPage = (page: number) => {
    updateFilters({ currentPage: page });
    document.getElementById("tsubo-list")?.scrollIntoView({ behavior: "smooth" });
  };

  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasSelectionFilters = selectedBodyPart !== "すべて" || selectedMeridian !== "すべて" || selectedCategory !== "すべて" || onlyPublished;

  return (
    <div className="tsubo-search-layout atlas-search-layout">
      <Suspense fallback={null}><TsuboUrlSync restore={restoreUrl} /></Suspense>
      <form action="/search" role="search" aria-label="ツボ図鑑内の検索" className="atlas-search-panel" onSubmit={event => {
        event.preventDefault();
        resultsRef.current?.focus();
      }}>
        <label htmlFor="tsubo-search" className="atlas-search-label">
          ツボを検索
        </label>
        <div className="relative">
          <Search aria-hidden="true" className="w-5 h-5 text-[#737C77] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="tsubo-search"
            name="q"
            ref={searchInputRef}
            aria-describedby="tsubo-search-examples"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            value={searchQuery}
            onChange={event => {
              const value = event.target.value;
              if (!searchQuery.trim() && value.trim()) setShowBodyMap(false);
              updateFilters({ searchQuery: value, currentPage: 1 });
            }}
            placeholder="合谷、手首のツボ、LI4"
            className="atlas-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearchQuery}
              className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#737C77] hover:text-[#232826] dark:hover:text-[#FAF8F5] p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              title="検索語をクリア"
              aria-label="検索語をクリア"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <p id="tsubo-search-examples" className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          名前・読み方・部位・番号で探せます。
        </p>
        <noscript><button type="submit" className="atlas-text-action">サイト内検索で調べる</button></noscript>

        <div className="tsubo-filter-toggles">
          <button
            type="button"
            onClick={() => setShowBodyMap(!showBodyMap)}
            aria-expanded={showBodyMap}
            aria-controls="tsubo-body-filter"
            className="tsubo-filter-toggle"
          >
            <Compass aria-hidden="true" className="h-4 w-4" />
            <span>部位から探す</span><ChevronDown aria-hidden="true" className="tsubo-toggle-chevron h-4 w-4" />
          </button>
          <button type="button" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters} aria-controls="tsubo-detail-filters" className="tsubo-filter-toggle"><SlidersHorizontal aria-hidden="true" className="h-4 w-4" /><span>詳細条件</span><ChevronDown aria-hidden="true" className="tsubo-toggle-chevron h-4 w-4" /></button>
          <Link href="/tsubo/compare" className="atlas-compare-shortcut">
            <GitCompare aria-hidden="true" size={16} />
            経穴を比べる
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
          <a href="#illustrated-points" className="atlas-search-index-link">一覧から探す</a>
        </div>
        {hasSelectionFilters && <p className="tsubo-active-filters">選択中：{[selectedBodyPart !== 'すべて' && selectedBodyPart, selectedMeridian !== 'すべて' && selectedMeridian, selectedCategory !== 'すべて' && selectedCategory, onlyPublished && '主要経穴のみ'].filter(Boolean).join('・')}</p>}
      </form>

      <section id="tsubo-body-filter" hidden={!showBodyMap}>
          <BodyMapSvg
            selectedBodyPart={selectedBodyPart}
            onSelectBodyPart={part => updateFilters({ selectedBodyPart: part, currentPage: 1 })}
          />
      </section>
      <section id="tsubo-detail-filters" hidden={!showFilters} aria-label="経脈・要穴の詳細条件" className="tsubo-detail-filters">
          <div className="space-y-5">
            
            {/* 十四経脈フィルター */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#59615D] dark:text-[#A0B0BC] block">
                十四経脈から探す：
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {meridianOptions.map((mer) => (
                  <button
                    key={mer}
                    type="button"
                    onClick={() => updateFilters({ selectedMeridian: mer, currentPage: 1 })}
                    aria-pressed={selectedMeridian === mer}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-xs transition-all ${
                      selectedMeridian === mer
                        ? "bg-[#1E3D34] text-white border-[#1E3D34] dark:bg-[#2B6958] font-bold shadow-xs"
                        : "bg-[#FAF8F5] dark:bg-[#10171F] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34]"
                    }`}
                  >
                    {mer}
                  </button>
                ))}
              </div>
            </div>

            {/* 要穴分類フィルター */}
            <div className="space-y-1.5 pt-1 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <span className="text-xs font-bold text-[#59615D] dark:text-[#A0B0BC] block">
                要穴分類から探す：
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateFilters({ selectedCategory: cat, currentPage: 1 })}
                    aria-pressed={selectedCategory === cat}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-xs transition-all ${
                      selectedCategory === cat
                        ? "bg-[#B86924] text-white border-[#B86924] dark:bg-[#9C5417] font-bold shadow-xs"
                        : "bg-[#FAF8F5] dark:bg-[#10171F] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:border-[#B86924]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 精密図解絞り込み ＆ リセット */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={onlyPublished}
                  onChange={event => updateFilters({ onlyPublished: event.target.checked, currentPage: 1 })}
                  className="rounded border-[#D8CFC0] text-[#1E3D34] focus:ring-[#1E3D34]"
                />
                <span className="text-[#333835] dark:text-[#C5D2DB] font-medium">
                  主要経穴（{publishedCount}穴）のみ表示
                </span>
              </label>

            </div>
          </div>
      </section>

      {!hasSearchQuery && !hasSelectionFilters && featuredPoints}

      {/* 経穴一覧セクション */}
      <section ref={resultsRef} id="tsubo-list" tabIndex={-1} aria-label="ツボの検索結果" className="atlas-target space-y-4">
        {/* 一覧上部コントロールバー */}
        <div className="tsubo-results-toolbar">
          <div className="min-w-0 space-y-1">
            <p role="status" aria-live="polite" aria-atomic="true" className="tsubo-result-count">
              {hasSearchQuery ? `「${searchQuery.trim()}」：` : hasSelectionFilters ? '該当：' : '全'}<strong>{totalItems}</strong>穴
              {searchTopic !== normalizedQuery && <span className="block text-sm">「{searchTopic}」で検索</span>}
            </p>
            {hasSelectionFilters && totalItems > 0 && <div className="tsubo-reset-actions">{hasSearchQuery && <button type="button" onClick={resetSelectionFilters}>検索語を保って条件を解除</button>}<button type="button" onClick={resetAllFilters}><RotateCcw aria-hidden="true" className="h-4 w-4" />検索・条件をすべて解除</button></div>}
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* 並び順 */}
            <select
              value={sortOption}
              aria-label="経穴の並び順"
              onChange={event => updateFilters({ sortOption: event.target.value as SortOption, currentPage: 1 })}
              className="bg-white dark:bg-[#17212A] border border-[#D8CFC0] dark:border-[#2A3B4A] rounded-lg px-2.5 py-1 text-xs text-[#333835] dark:text-[#C5D2DB]"
            >
              <option value="meridian">{searchTopic ? "一致を優先" : "流注順（経絡順）"}</option>
              <option value="kana">五十音順</option>
              <option value="detailed">主要経穴を先に表示</option>
            </select>

            {/* 表示モード（グリッド／テーブル） */}
            <div className="flex items-center border border-[#D8CFC0] dark:border-[#2A3B4A] rounded-lg overflow-hidden bg-white dark:bg-[#17212A]">
              <button
                type="button"
                onClick={() => updateFilters({ viewMode: "grid" })}
                className={`p-1.5 ${viewMode === "grid" ? "bg-[#1E3D34] text-white" : "text-[#737C77]"}`}
                title="グリッド表示"
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateFilters({ viewMode: "table" })}
                className={`p-1.5 ${viewMode === "table" ? "bg-[#1E3D34] text-white" : "text-[#737C77]"}`}
                title="テーブル表示"
                aria-pressed={viewMode === "table"}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 経穴グリッド表示 */}
        {totalItems === 0 ? (
          <div className="rounded-2xl border border-[#E5DEC9] bg-white px-4 py-8 text-center dark:border-[#2A3B4A] dark:bg-[#17212A]">
            <Search aria-hidden="true" className="mx-auto h-7 w-7 text-[#737C77] dark:text-[#8899A6]" />
            <h3 className="mt-3 text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">条件に合う経穴が見つかりませんでした</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {hasSelectionFilters ? "検索条件を外すと、ほかの部位や経絡のツボも探せます。" : "部位や名前を短く入れると探しやすくなります。下の例でも検索できます。"}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {hasSearchQuery && !hasSelectionFilters && EXAMPLE_SEARCH_TERMS.map(term => (
                <button key={term} type="button" onClick={() => searchExample(term)} className="ui-button ui-button-outline text-sm">「{term}」で探す</button>
              ))}
              {hasSearchQuery && hasSelectionFilters && <button type="button" onClick={resetSelectionFilters} className="min-h-11 rounded-xl border border-[#C5DED4] px-4 py-2 text-sm font-semibold text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:text-[#83BEA8] dark:hover:bg-[#182823]">同じ検索語で条件を解除</button>}
              {hasSearchQuery && <button type="button" onClick={() => searchInputRef.current?.focus()} className="min-h-11 rounded-xl border border-[#C5DED4] px-4 py-2 text-sm font-semibold text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:text-[#83BEA8] dark:hover:bg-[#182823]">検索語を編集する</button>}
              <button type="button" onClick={resetAllFilters} className="min-h-11 rounded-xl bg-[#1E3D34] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2B5A46] focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-[#2B6958]">検索・条件を解除して全{allPoints.length}穴を表示</button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="atlas-result-grid">
            {paginatedTsubos.map((point) => {
              const indexed = searchIndex.get(point.code);
              const matchReason = indexed ? getAcupointMatchReason(indexed, searchTopic) : null;
              const locationPreview = point.locationSimple.match(/^[^。]+。?/)?.[0] ?? point.locationSimple;
              return (
                <Link
                  key={point.id}
                  href={`/tsubo/${point.codeLower}`}
                  prefetch={false}
                  id={`tsubo-card-${point.codeLower}`}
                  className="dictionary-result-card atlas-result-card"
                  data-selected={selectedTsubo?.id === point.id ? true : undefined}
                >
                  <div className="atlas-result-title">
                    <h3>{point.name} <span>{point.kana}</span></h3>
                    <span className="atlas-code">{point.code}</span>
                  </div>
                  <p className="atlas-result-location">{locationPreview}</p>
                  <div className="atlas-result-footer">
                    <p className="atlas-result-meta">
                      <span>{point.bodyPart} <span aria-hidden="true">·</span> {point.meridian}</span>
                      {matchReason && <span className="atlas-result-match">{matchReason}</span>}
                    </p>
                    <ArrowRight aria-hidden="true" size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* テーブル表示 */
          <div className="overflow-x-auto rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF8F5] dark:bg-[#121920] border-b border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77]">
                <tr>
                  <th className="p-3">コード</th>
                  <th className="p-3">経穴名</th>
                  <th className="p-3">経脈</th>
                  <th className="p-3">部位</th>
                  <th className="p-3">取穴要約</th>
                  <th className="p-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE0] dark:divide-[#22303D]">
                {paginatedTsubos.map((point) => (
                  <tr key={point.id} className="hover:bg-[#FAF8F5] dark:hover:bg-[#15202B]">
                    <td className="p-3 font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      {point.code}
                    </td>
                    <td className="p-3 font-semibold text-[#232826] dark:text-[#FAF8F5]">
                      <Link href={`/tsubo/${point.codeLower}`} prefetch={false} className="hover:underline">
                        {point.name}
                      </Link>
                      <span className="text-sm font-normal text-[var(--text-secondary)] ml-1">({point.kana})</span>
                    </td>
                    <td className="p-3 text-[#59615D] dark:text-[#A0B0BC]">{point.meridian}</td>
                    <td className="p-3 text-[#59615D] dark:text-[#A0B0BC]">{point.bodyPart}</td>
                    <td className="p-3 text-[#59615D] dark:text-[#A0B0BC] max-w-xs truncate">{point.locationSimple}</td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/tsubo/${point.codeLower}`}
                        prefetch={false}
                        className="font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
                      >
                        詳細
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-4">
            <button
              type="button"
              aria-label="前のページ"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
              className="p-2 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white text-xs font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 text-xs">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      aria-label={`${pageNum}ページ目`}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                      onClick={() => goToPage(pageNum)}
                      className={`w-8 h-8 rounded-xl font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-[#1E3D34] text-white dark:bg-[#2B6958]"
                          : "border border-[#D8CFC0] dark:border-[#2A3B4A] hover:bg-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                  return <span key={pageNum} className="px-1 text-[#737C77]">…</span>;
                }
                return null;
              })}
            </div>

            <button
              type="button"
              aria-label="次のページ"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="p-2 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white text-xs font-medium"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      <nav aria-label="ツボ図鑑の索引" className="atlas-directory-index-links">
        {ATLAS_INDEX_LINKS.map(({ href, label }) => <a key={href} href={href} className="atlas-search-index-link">{label}</a>)}
      </nav>
      {relatedGuides}

      <TsuboReviewEntry placement="dictionary" />
      <nav className="dictionary-tools" aria-label="経穴の学習ツール">
        <Link href="/tsubo/practice"><BookOpen aria-hidden="true" className="h-4 w-4" />今日の復習<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        <Link href="/kikei">奇経八脈<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
      </nav>


      {/* 関連する基礎解説・配穴案内 */}
      <section className="space-y-4 pt-4 border-t border-[#F2ECE0] dark:border-[#22303D]">
        <ClinicalPairsSection />
      </section>
    </div>
  );
}
