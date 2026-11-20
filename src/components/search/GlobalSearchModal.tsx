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
const SEARCH_SHORTCUTS = SEARCH_CATALOG.filter(item => ["clinical-home", "tool-kokushi", "tool-library", "tool-basics-cun", "tool-diagnosis-self"].includes(item.id));

const RECENT_SEARCHES_KEY = "haritaro_recent_searches";
const ACTIVE_FILTER = "border border-[var(--accent-readable)] bg-[var(--accent-soft)] text-[var(--accent-readable)]";
const INACTIVE_FILTER = "border border-[var(--border-washi)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-washi)] hover:text-[var(--text-sumi)]";

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
        className="search-dialog flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--border-washi)] bg-[var(--bg-card)] shadow-2xl"
      >
        {/* 検索入力ヘッダー */}
        <div className="search-dialog-header flex shrink-0 items-center border-b border-[var(--border-subtle)]">
          <Search className="h-5 w-5 shrink-0 text-[var(--accent-readable)]" />
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
            className="min-h-11 min-w-0 flex-1 rounded-md bg-transparent text-base placeholder-[var(--text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2"
          />
          {query && (
            <button
              type="button"
              aria-label="検索語を消去"
              onClick={clearQueryAndFocus}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="検索を閉じる" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2"><X className="w-5 h-5" /></button>
          <kbd className="hidden rounded-md border border-[var(--border-washi)] bg-[var(--bg-washi)] px-2 py-0.5 font-mono text-sm font-bold text-[var(--text-secondary)] sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* カテゴリクイックフィルターチップ */}
        <div role="group" aria-label="検索結果の種類で絞り込む" className="no-scrollbar flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-[var(--border-subtle)] bg-[var(--bg-washi)] px-3 py-2 text-sm">
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
              className={`min-h-11 shrink-0 rounded-lg px-2.5 py-1 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${activeCategory === chip.id ? ACTIVE_FILTER : INACTIVE_FILTER}`}
            >
              {chip.label}
              {hasQuery && <span className="ml-1.5 text-sm tabular-nums">{categoryCounts[chip.id]}</span>}
            </button>
          ))}
        </div>

        {/* 検索結果・サジェスト一覧（スクロールエリア） */}
        <div ref={scrollRef} className="search-results-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain p-2 sm:p-3 space-y-1">
          {hasQuery && <div className="space-y-2 border-b border-[var(--border-subtle)] px-3 pt-2 pb-3">
            <div role="group" aria-label="検索の目的に合わせて表示順を変える" className="flex flex-wrap gap-2">
              {SEARCH_PURPOSES.map(purpose => <button key={purpose.id} type="button" aria-pressed={searchPurpose === purpose.id} onClick={() => {
                setSearchPurpose(purpose.id); setSelectedIndex(-1); setResultLimit(25);
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
              }} className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${searchPurpose === purpose.id ? ACTIVE_FILTER : INACTIVE_FILTER}`}>{purpose.label}</button>)}
            </div>
          </div>}
          <p id={statusId} role="status" aria-live="polite" aria-atomic="true" className={hasQuery ? "px-3 py-1 text-sm font-semibold text-[var(--text-secondary)]" : "sr-only"}>
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
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)]">
                      <Clock className="h-3.5 w-3.5 text-[var(--accent-readable)]" />
                      最近調べたキーワード
                    </span>
                    <button
                      type="button"
                      onClick={clearAllRecentSearches}
                      className="flex min-h-11 cursor-pointer items-center gap-1 px-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-sumi)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>履歴を消去</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-[var(--border-washi)] px-3 py-1 text-sm font-semibold hover:border-[var(--accent-readable)]"
                      >
                        <button type="button" onClick={() => chooseQuery(term)} className="min-h-11 min-w-0 break-all px-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2">{term}</button>
                        <button
                          type="button"
                          onClick={(e) => removeRecentSearch(e, term)}
                          aria-label={`${term}を検索履歴から削除`}
                          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2"
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
                <span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)]">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--accent-readable)]" />
                  おすすめの検索キーワード
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickSearches.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => chooseQuery(item.q, item.category)}
                      className="min-h-11 cursor-pointer rounded-xl border border-[var(--border-washi)] px-3 py-1.5 text-sm font-semibold hover:border-[var(--accent-readable)] focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 主要ツール・新設ハブへのクイックアクセス */}
              <div className="border-t border-[var(--border-subtle)] pt-2">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
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
                      className="flex min-h-11 cursor-pointer items-center justify-between rounded-xl border border-[var(--border-washi)] p-2.5 text-left hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <div className="min-w-0">
                        <span className="block font-semibold text-[var(--accent-readable)]">
                          {tool.title}
                        </span>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {tool.subtitle}
                        </span>
                      </div>
                      <ArrowRight className="ml-2 h-3.5 w-3.5 shrink-0 text-[var(--accent-readable)]" />
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
                    className={`flex w-full cursor-pointer items-start gap-3 rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isSelected
                        ? "border-[var(--accent-readable)] bg-[var(--accent-soft)]"
                        : "border-[var(--border-washi)] hover:bg-[var(--bg-washi)]"
                    }`}
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-washi)] text-[var(--accent-readable)]">
                      <Icon aria-hidden="true" className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="space-y-1">
                        <span className="inline-block rounded-md bg-[var(--bg-washi)] px-1.5 py-0.5 text-sm font-medium text-[var(--text-secondary)]">
                          {item.badge}
                        </span>
                        <span className="block break-words text-sm font-bold leading-relaxed">
                          {item.title}
                        </span>
                      </div>

                      {item.subtitle && (
                        <p className="break-words text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.subtitle}
                        </p>
                      )}
                      {hint && <span className="block text-sm text-[var(--text-secondary)]">{hint}</span>}
                    </div>

                    <ArrowRight
                      aria-hidden="true"
                      className="mt-2 h-4 w-4 shrink-0 text-[var(--accent-readable)]"
                    />
                  </Link>
                );
              })}
              </div>
            </>
          )}

          {filteredResults.length > visibleResults.length && <button type="button" onClick={() => { setResultLimit(limit => limit + 25); inputRef.current?.focus(); shouldScrollSelection.current = true; setSelectedIndex(visibleResults.length); }} className="w-full min-h-11 rounded-xl border border-[var(--border-washi)] p-3 text-sm font-semibold text-[var(--accent-readable)] hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2">さらに表示（残り{filteredResults.length - visibleResults.length}件）</button>}

          {/* 検索結果ゼロ */}
          {hasQuery && filteredResults.length === 0 && (
            <div className="px-3 py-10 text-center space-y-3">
              <Search className="mx-auto h-8 w-8 text-[var(--text-secondary)]" />
              <p className="text-sm font-bold">
                「{query}」に一致するページが見つかりませんでした
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeCategory !== "all" ? "「すべて」を対象にすると、ほかの分類のページも検索できます。" : "ツボなら「合谷」「ごうこく」「LI4」、症状なら「肩こり」など、名前や読みで探せます。"}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {activeCategory !== "all" && <button type="button" onClick={searchAllCategories} className="ui-button ui-button-primary text-sm">同じ検索語ですべてを検索</button>}
                <button type="button" onClick={() => inputRef.current?.focus()} className="ui-button ui-button-outline text-sm">検索語を編集する</button>
                {activeCategory === "all" && <button type="button" onClick={clearQueryAndFocus} className="ui-button ui-button-primary text-sm">検索語を消して入力し直す</button>}
              </div>
            </div>
          )}
        </div>

        {/* フッター操作ガイド */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] bg-[var(--bg-washi)] px-4 py-2.5 text-sm text-[var(--text-secondary)]">
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
