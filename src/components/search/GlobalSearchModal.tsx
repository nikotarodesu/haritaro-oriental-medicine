"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  GraduationCap,
  MapPin,
  FileText,
  SlidersHorizontal,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  FileCheck,
  HeartPulse,
  Award,
  Scroll,
  Trash2,
} from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { SEARCH_CATEGORIES, matchesSearchCategory, nextSearchResultIndex, prepareSearchItem, type SearchCategory } from "@/utils/search";
import { SEARCH_PURPOSES, preparePurposeSearchQuery, rankPurposeSearchResults, type SearchPurpose } from "@/utils/searchPurpose";
import { useModalDialog } from "@/hooks/useModalDialog";

export type { SearchItemType } from "@/utils/search";
import { SEARCH_CATALOG } from "@/data/searchCatalog";
import type { SearchResultItem } from "@/types/searchCatalog";

const SEARCH_INDEX = SEARCH_CATALOG.map(prepareSearchItem);
const SEARCH_SHORTCUTS = SEARCH_CATALOG.filter(item => ["clinical-home", "tool-kokushi", "tool-library", "tool-learning-notes", "tool-basics-cun", "tool-diagnosis-self"].includes(item.id));

const RECENT_SEARCHES_KEY = "haritaro_recent_searches";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [searchPurpose, setSearchPurpose] = useState<SearchPurpose>("auto");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(RECENT_SEARCHES_KEY) : null;
      const saved: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(saved) ? saved.filter((item): item is string => typeof item === 'string').slice(0, 6) : [];
    } catch { return []; }
  });
  const [resultLimit, setResultLimit] = useState(25);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const shouldScrollSelection = useRef(false);
  const id = useId();
  const listId = `${id}-results`;
  const helpId = `${id}-help`;
  const statusId = `${id}-status`;
  useModalDialog(isOpen, dialogRef, onClose);

  const saveRecentSearch = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch { /* Search remains usable without storage. */ }
  }, [recentSearches]);

  const removeRecentSearch = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    try {
      const updated = recentSearches.filter((s) => s !== text);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch { /* Search remains usable without browser storage. */ }
    inputRef.current?.focus();
  };

  const clearAllRecentSearches = () => {
    try {
      setRecentSearches([]);
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch { /* Search remains usable without browser storage. */ }
    inputRef.current?.focus();
  };

  const searchContext = useMemo(() => preparePurposeSearchQuery(query, searchPurpose === "auto" && activeCategory === "library" ? "research" : searchPurpose), [query, searchPurpose, activeCategory]);
  // The whole matching set is retained so users can continue past the first page.
  const matchingResults = useMemo(() => {
    if (!searchContext.query.normalized) return [];
    return rankPurposeSearchResults(SEARCH_INDEX, searchContext);
  }, [searchContext]);
  const filteredResults = useMemo(() => matchingResults.filter(result => matchesSearchCategory(result.item.type, activeCategory)), [matchingResults, activeCategory]);
  const categoryCounts = useMemo(() => Object.fromEntries(SEARCH_CATEGORIES.map(category => [category.id, matchingResults.filter(result => matchesSearchCategory(result.item.type, category.id)).length])), [matchingResults]);
  const visibleResults = useMemo(() => filteredResults.slice(0, resultLimit), [filteredResults, resultLimit]);
  const hasQuery = query.trim().length > 0;
  const selectedResult = selectedIndex >= 0 ? visibleResults[selectedIndex] : undefined;
  const activeCategoryLabel = SEARCH_CATEGORIES.find(category => category.id === activeCategory)?.label;
  const updateQuery = (next: string) => {
    setQuery(next); setSelectedIndex(-1); setResultLimit(25);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const chooseQuery = (next: string, category: SearchCategory = "all") => {
    updateQuery(next);
    setActiveCategory(category);
    inputRef.current?.focus();
  };
  const searchAllCategories = () => {
    setActiveCategory("all");
    setSelectedIndex(-1);
    setResultLimit(25);
    inputRef.current?.focus();
  };
  const clearQueryAndFocus = () => {
    updateQuery("");
    inputRef.current?.focus();
  };


  // Scroll only keyboard selections; a pointer hovering lower down must not jump the list.
  useEffect(() => {
    if (shouldScrollSelection.current) {
      optionRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
      shouldScrollSelection.current = false;
    }
  }, [selectedIndex, resultLimit]);

  const recordResultClick = (item: SearchResultItem) => {
    saveRecentSearch(query || item.title);
    trackEvent("search_result_click", { placement: "global_search", result_type: item.type });
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229 || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!filteredResults.length) return;
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? "next" : "previous";
      if (direction === "next" && selectedIndex === visibleResults.length - 1 && visibleResults.length < filteredResults.length) {
        shouldScrollSelection.current = true;
        setResultLimit(limit => limit + 25);
        setSelectedIndex(selectedIndex + 1);
      } else {
        const next = nextSearchResultIndex(selectedIndex, direction, visibleResults.length);
        if (next !== selectedIndex) { shouldScrollSelection.current = true; setSelectedIndex(next); }
      }
    } else if (event.key === "Enter") {
      const target = selectedResult || visibleResults[0];
      if (target) {
        event.preventDefault();
        recordResultClick(target.item);
        onClose();
        router.push(target.item.url);
      }
    }
  };

  // クイックサジェストのキーワード
  const quickSearches: Array<{ label: string; q: string; category?: SearchCategory }> = [
    { label: "合谷 (LI4)", q: "合谷" },
    { label: "足三里 (ST36)", q: "足三里" },
    { label: "講義の復習", q: "復習", category: "tool" },
    { label: "気虚", q: "気虚" },
    { label: "治未病 (古典)", q: "治未病", category: "library" },
    { label: "肩こり・頭痛", q: "頭痛" },
    { label: "膝痛・ランナー", q: "膝" },
    { label: "坐骨神経痛", q: "坐骨" },
    { label: "シミュレーター", q: "シミュレーター" },
  ];

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="site-overlay fixed left-0 right-0 z-[110] bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="サイト内検索"
        onClick={(e) => e.stopPropagation()}
        className="search-dialog w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#16212B] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* 検索入力ヘッダー */}
        <div className="search-dialog-header shrink-0 border-b border-[#F2ECE0] dark:border-[#22303D] flex items-center bg-white dark:bg-[#1A2632]">
          <Search className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
          <input
            aria-label="経穴・記事・講義などを検索"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={hasQuery && visibleResults.length > 0}
            aria-controls={visibleResults.length > 0 ? listId : undefined}
            aria-activedescendant={selectedResult ? `${id}-result-${selectedIndex}` : undefined}
            aria-describedby={`${helpId} ${statusId}`}
            data-modal-autofocus
            ref={inputRef}
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              updateQuery(e.target.value);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="経穴・記事・講義・症状を検索"
            className="flex-1 min-w-0 min-h-11 rounded-md bg-transparent text-[#232826] dark:text-[#FAF8F5] placeholder-[var(--text-secondary)] text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#74BA9E]"
          />
          {query && (
            <button
              type="button"
              aria-label="検索語を消去"
              onClick={clearQueryAndFocus}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#59615D] dark:text-[#A0B0BC] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="検索を閉じる" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2"><X className="w-5 h-5" /></button>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-sm font-mono font-bold text-[#59615D] dark:text-[#AFBDC8] bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-md">
            ESC
          </kbd>
        </div>

        {/* カテゴリクイックフィルターチップ */}
        <div role="group" aria-label="検索結果の種類で絞り込む" className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-[#F2EDE4]/70 dark:bg-[#121920]/80 border-b border-[#E8E1D1] dark:border-[#22303D] overflow-x-auto no-scrollbar text-sm">
          {SEARCH_CATEGORIES.map((chip) => (
            <button
              aria-pressed={activeCategory === chip.id}
              key={chip.id}
              type="button"
              onClick={() => {
                setActiveCategory(chip.id); setResultLimit(25);
                setSelectedIndex(-1);
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
              }}
              className={`min-h-11 px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#74BA9E] ${
                activeCategory === chip.id
                  ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white shadow-2xs"
                  : "bg-white dark:bg-[#1C2733] text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-white border border-[#E5DEC9] dark:border-[#2A3B4A]"
              }`}
            >
              {chip.label}
              {hasQuery && <span className="ml-1.5 text-sm tabular-nums">{categoryCounts[chip.id]}</span>}
            </button>
          ))}
        </div>

        {/* 検索結果・サジェスト一覧（スクロールエリア） */}
        <div ref={scrollRef} className="search-results-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain p-2 sm:p-3 space-y-1">
          {hasQuery && <div className="px-3 pt-2 pb-3 space-y-2 border-b border-[#E8E1D1] dark:border-[#22303D]">
            <div role="group" aria-label="検索の目的に合わせて表示順を変える" className="flex flex-wrap gap-2">
              {SEARCH_PURPOSES.map(purpose => <button key={purpose.id} type="button" aria-pressed={searchPurpose === purpose.id} onClick={() => {
                setSearchPurpose(purpose.id); setSelectedIndex(-1); setResultLimit(25);
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
              }} className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${searchPurpose === purpose.id ? "bg-[#1E3D34] text-white dark:bg-[#2B6958]" : "border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] hover:bg-[#EBF3EF] dark:hover:bg-[#182823]"}`}>{purpose.label}</button>)}
            </div>
          </div>}
          <p id={statusId} role="status" aria-live="polite" aria-atomic="true" className={hasQuery ? "px-3 py-1 text-sm font-semibold text-[#59615D] dark:text-[#A0B0BC]" : "sr-only"}>
            {hasQuery ? `${activeCategoryLabel}：${filteredResults.length}件${filteredResults.length > visibleResults.length ? `（${visibleResults.length}件を表示）` : ""}` : "検索語を入力してください。"}
          </p>
          <p id={helpId} className="sr-only">複数のキーワードは空白で区切れます。上下の矢印キーで結果を選び、Enterで移動します。選択前にEnterを押すと先頭の結果へ移動します。</p>
          {/* 未入力時：最近の検索 ＆ クイック検索候補 */}
          {!hasQuery && (
            <div className="p-4 sm:p-6 space-y-5">
              {/* 最近調べたキーワード（履歴） */}
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#59615D] dark:text-[#AFBDC8] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                      最近調べたキーワード
                    </span>
                    <button
                      type="button"
                      onClick={clearAllRecentSearches}
                      className="min-h-11 px-2 text-sm text-[#59615D] dark:text-[#A0B0BC] hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>履歴を消去</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="inline-flex max-w-full items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-sm font-semibold text-[#232826] dark:text-[#FAF8F5] transition-all hover:shadow-2xs cursor-pointer group"
                      >
                        <button type="button" onClick={() => chooseQuery(term)} className="min-h-11 min-w-0 break-all px-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2">{term}</button>
                        <button
                          type="button"
                          onClick={(e) => removeRecentSearch(e, term)}
                          aria-label={`${term}を検索履歴から削除`}
                          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-[#59615D] dark:text-[#A0B0BC] rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 人気のおすすめキーワード */}
              <div>
                <span className="text-sm font-bold text-[#59615D] dark:text-[#AFBDC8] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                  おすすめの検索キーワード
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickSearches.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => chooseQuery(item.q, item.category)}
                      className="min-h-11 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-sm font-semibold text-[#232826] dark:text-[#FAF8F5] transition-all hover:shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 主要ツール・新設ハブへのクイックアクセス */}
              <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <span className="text-sm font-bold text-[#59615D] dark:text-[#AFBDC8] uppercase tracking-wider block mb-2">
                  よく使うページ
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {SEARCH_SHORTCUTS.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push(tool.url);
                      }}
                      className="min-h-11 p-2.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-left transition-colors flex items-center justify-between group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block ">
                          {tool.title}
                        </span>
                        <span className="text-sm text-[#59615D] dark:text-[#AFBDC8] ">
                          {tool.subtitle}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 検索結果あり */}
          {hasQuery && filteredResults.length > 0 && (
            <>
              <div id={listId} role="listbox" aria-label={`${activeCategoryLabel}の検索結果`} className="space-y-1">

              {visibleResults.map(({ item, hint }, idx) => {
                const isSelected = idx === selectedIndex;
                let Icon = BookOpen;
                if (item.type === "acupoint") Icon = MapPin;
                if (item.type === "lecture") Icon = GraduationCap;
                if (item.type === "kokushi") Icon = Award;
                if (item.type === "case") Icon = FileText;
                if (item.type === "tool") Icon = SlidersHorizontal;
                if (item.type === "classic") Icon = Scroll;
                if (item.type === "paper") Icon = FileCheck;
                if (item.type === "symptom") Icon = HeartPulse;

                return (
                  <Link
                    key={item.id}
                    id={`${id}-result-${idx}`}
                    ref={element => { optionRefs.current[idx] = element; }}
                    href={item.url}
                    prefetch={false}
                    role="option"
                    tabIndex={-1}
                    aria-selected={isSelected}
                    aria-posinset={idx + 1}
                    aria-setsize={filteredResults.length}
                    onClick={() => recordResultClick(item)}
                    onNavigate={onClose}
                    onMouseMove={(event) => {
                      // 結果の再描画で静止中のポインタが重なっても、キーボードの選択は保つ。
                      if (event.movementX !== 0 || event.movementY !== 0) { shouldScrollSelection.current = false; setSelectedIndex(idx); }
                    }}
                    onFocus={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isSelected
                        ? "bg-[#1E3D34] text-white shadow-sm"
                        : "bg-white dark:bg-[#1A2632] hover:bg-[#FAF8F5] dark:hover:bg-[#202E3C] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]"
                      }`}
                    >
                      <Icon aria-hidden="true" className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="space-y-1">
                        <span
                          className={`inline-block text-sm font-bold px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#AFBDC8] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                          }`}
                        >
                          {item.badge}
                        </span>
                        <span className="block font-bold text-sm leading-relaxed  break-words">
                          {item.title}
                        </span>
                      </div>

                      {item.subtitle && (
                        <p
                          className={`text-sm leading-relaxed  break-words ${
                            isSelected
                              ? "text-emerald-100/90"
                              : "text-[#59615D] dark:text-[#A0B0BC]"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                      {hint && <span className={`block text-sm ${isSelected ? "text-emerald-100" : "text-[#59615D] dark:text-[#A0B0BC]"}`}>{hint}</span>}
                    </div>

                    <ArrowRight
                      aria-hidden="true"
                      className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                        isSelected
                          ? "translate-x-0.5 text-white"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  </Link>
                );
              })}
              </div>
            </>
          )}

          {filteredResults.length > visibleResults.length && <button type="button" onClick={() => { setResultLimit(limit => limit + 25); inputRef.current?.focus(); shouldScrollSelection.current = true; setSelectedIndex(visibleResults.length); }} className="w-full min-h-11 rounded-xl border border-[#C5DED4] p-3 text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8] focus-visible:outline-2 focus-visible:outline-offset-2">さらに表示（残り{filteredResults.length - visibleResults.length}件）</button>}

          {/* 検索結果ゼロ */}
          {hasQuery && filteredResults.length === 0 && (
            <div className="px-3 py-10 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                「{query}」に一致するコンテンツが見つかりませんでした
              </p>
              <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
                {activeCategory !== "all" ? "検索語はそのままで、ほかのカテゴリーも探せます。" : "別の言い方や、経穴コード（例：LI4、ST36）でお試しください。"}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {activeCategory !== "all" && <button type="button" onClick={searchAllCategories} className="min-h-11 rounded-xl bg-[#1E3D34] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2B5A46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:bg-[#2B6958] dark:focus-visible:outline-[#74BA9E]">同じ検索語ですべてを検索</button>}
                <button type="button" onClick={() => inputRef.current?.focus()} className="min-h-11 rounded-xl border border-[#C5DED4] px-4 py-2 text-sm font-semibold text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:text-[#83BEA8] dark:hover:bg-[#182823]">検索語を編集する</button>
                {activeCategory === "all" && <button type="button" onClick={clearQueryAndFocus} className="min-h-11 rounded-xl bg-[#1E3D34] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2B5A46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:bg-[#2B6958] dark:focus-visible:outline-[#74BA9E]">検索語を消して入力し直す</button>}
              </div>
            </div>
          )}
        </div>

        {/* フッター操作ガイド */}
        <div className="shrink-0 px-4 py-2.5 border-t border-[#F2ECE0] dark:border-[#22303D] bg-[#F2EDE4]/60 dark:bg-[#121920] flex flex-wrap items-center justify-between gap-2 text-sm text-[#59615D] dark:text-[#A0B0BC]">
          <span>空白で複数語を検索</span>
          <div className="hidden items-center gap-3 sm:flex" aria-hidden="true">
            <span>↑↓ 選択</span>
            <span>↵ 決定</span>
            <span>ESC 閉じる</span>
          </div>
        </div>
      </div>
    </div>
  );
}
