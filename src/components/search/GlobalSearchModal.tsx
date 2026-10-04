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
import { getAllAcupoints } from "@/data/tsubo";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { GLOSSARY_TERMS } from "@/data/glossaryData";
import { KOKUSHI_PAST_EXAMS } from "@/data/kokushiPastExams";
import { CLASSICAL_TEXTS } from "@/data/classicalTextsData";
import { VERIFIED_PAPERS as PAPERS_DATABASE } from "@/data/references/papersData";
import { ARTICLES } from "@/data/articleData";
import { trackEvent } from "@/utils/analytics";
import { SYMPTOMS } from "@/data/symptomData";
import { PUBLIC_ARCHIVE_CASES } from "@/data/cases/archiveCases";
import { TOOL_CATALOG } from "@/config/toolCatalog";
import { SEARCH_CATEGORIES, matchesSearchCategory, nextSearchResultIndex, prepareSearchItem, prepareSearchQuery, scoreSearchItem, searchMatchHint, type SearchCategory, type SearchItemType } from "@/utils/search";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { REFLECTION_CASES } from "@/data/learningReflectionCatalog";
import { useModalDialog } from "@/hooks/useModalDialog";

export type { SearchItemType } from "@/utils/search";

export interface SearchResultItem {
  id: string;
  type: SearchItemType;
  title: string;
  subtitle?: string;
  badge: string;
  url: string;
  tags?: string[];
  exactCode?: string; // 経穴コードなど
}

const STATIC_TOOLS: SearchResultItem[] = [
  {
    id: "tool-kokushi",
    type: "tool",
    title: TOOL_CATALOG.kokushi.title,
    subtitle: TOOL_CATALOG.kokushi.description,
    badge: "国試対策",
    url: "/kokushi",
    tags: ["国試", "国家試験", "オリジナル問題", "間隔復習", "日替わり", "問題演習"],
  },
  {
    id: "tool-simulator",
    type: "tool",
    title: TOOL_CATALOG.simulator.title,
    subtitle: TOOL_CATALOG.simulator.description,
    badge: "臨床ツール",
    url: "/simulator",
    tags: ["シミュレーター", "弁証", "配穴", "八綱", "気血水", "臓腑", "鑑別"],
  },
  {
    id: "tool-simulator-compare",
    type: "tool",
    title: "2案並列 鑑別シミュレーター",
    subtitle: "迷いやすい2つの証（例：気虚 vs 気滞、肝火上炎 vs 肝陽上亢）を並べて配穴比較",
    badge: "臨床鑑別",
    url: "/simulator/compare",
    tags: ["鑑別", "比較", "シミュレーター", "並列", "2案", "証の比較"],
  },
  {
    id: "tool-library",
    type: "tool",
    title: "医学文献・古典アーカイブ",
    subtitle: "古典の学習用引用・文献情報を探し、出典や書誌の照合状況を確認",
    badge: "文献アーカイブ",
    url: "/library",
    tags: ["古典", "素問", "霊枢", "難経", "論文", "エビデンス", "治未病", "ライブラリ"],
  },
  {
    id: "tool-symptoms",
    type: "tool",
    title: "お悩み・症状別 セルフケアガイド",
    subtitle: "頭痛・肩こり・不眠などの受診目安と、セルフケア・養生を学ぶ",
    badge: "セルフケア",
    url: "/symptoms",
    tags: ["症状", "セルフケア", "お悩み", "頭痛", "肩こり", "不眠", "胃もたれ", "生理痛", "冷え性"],
  },
  {
    id: "tool-haiketsu-optimizer",
    type: "tool",
    title: TOOL_CATALOG.haiketsu.title,
    subtitle: TOOL_CATALOG.haiketsu.description,
    badge: "臨床ツール",
    url: "/practice/haiketsu",
    tags: ["配穴", "処方", "原穴", "絡穴", "四関", "四総穴", "組み合わせ"],
  },
  {
    id: "tool-tsubo-compare",
    type: "tool",
    title: "経穴比較ツール",
    subtitle: "似た主治や近接する経穴（合谷と太衝、足三里と三陰交など）を並べて比較",
    badge: "学習ツール",
    url: "/tsubo/compare",
    tags: ["比較", "鑑別", "経穴", "ツボ比較"],
  },
  {
    id: "tool-learning-notes",
    type: "tool",
    title: "学習ノート・振り返り",
    subtitle: "講義や症例の要点・迷った理由・次に確かめることを記録し、以前の考え方と比較",
    badge: "学習記録",
    url: "/notes?tab=learning",
    tags: ["学習ノート", "振り返り", "学習記録", "考え方", "復習"],
  },
  {
    id: "tool-notes",
    type: "tool",
    title: "臨床カルテ・配穴ストックノート",
    subtitle: "患者カルテ、配穴ストック、A4患者養生処方せん・待合室POP印刷対応",
    badge: "臨床管理",
    url: "/notes",
    tags: ["ノート", "カルテ", "記録", "配穴ストック", "患者管理", "印刷", "A4"],
  },
  {
    id: "tool-basics-cun",
    type: "tool",
    title: "骨度法・寸の割り出しガイド",
    subtitle: "全身の骨度分寸（等分法・指寸同身寸）の基準と正確な取穴のコツ",
    badge: "解剖基礎",
    url: "/tsubo/basics/bone-cun",
    tags: ["骨度法", "寸", "取穴", "解剖", "基準"],
  },
  {
    id: "tool-kikei",
    type: "tool",
    title: "奇経八脈データベース",
    subtitle: "督脈・任脈・衝脈・帯脈・陰陽蹻脈・陰陽維脈の走行と主治病態",
    badge: "経絡理論",
    url: "/kikei",
    tags: ["奇経", "八脈", "任脈", "督脈", "衝脈", "帯脈"],
  },
  {
    id: "tool-diagnosis-self",
    type: "tool",
    title: "気血水 体質セルフチェック（12問）",
    subtitle: "伝統的な体質分類の学習用チェック。医学的な診断や治療判断には使用しません",
    badge: "セルフチェック",
    url: "/diagnosis",
    tags: ["気血水", "診断", "セルフチェック", "体質", "気虚", "血虚", "瘀血"],
  },
];

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

  // 全データのインデックス化（初回マウント時に一度だけ生成）
  const allItems = useMemo<SearchResultItem[]>(() => {
    const list: SearchResultItem[] = [];

    // 1. ツール群
    list.push(...STATIC_TOOLS);
    list.push(...LEARNING_COURSES.map((course): SearchResultItem => ({
      id: `course-${course.slug}`, type: "lecture", title: course.title,
      subtitle: `${course.steps.length}ステップ｜${course.description}`, badge: "目的別コース",
      url: `/learn/courses/${course.slug}`, tags: ["コース", "学び直し", course.eyebrow, ...course.goals],
    })));
    list.push(...ARTICLES.map((article): SearchResultItem => ({
      id: article.id, type: "article", title: article.title,
      subtitle: article.summary, badge: "解説記事",
      url: '/articles/' + article.id, tags: article.tags,
    })));
    list.push(...REFLECTION_CASES.map((caseItem): SearchResultItem => ({
      id: `progressive-case-${caseItem.id}`, type: "case", title: caseItem.title,
      subtitle: "架空の教材で、追加質問・安全判断・候補の比較・根拠・再評価を段階的に練習",
      badge: "段階式症例演習", url: `/simulator?case=${caseItem.id}#case-training`,
      tags: ["症例", "段階式", "症例演習", "判断根拠", "安全確認", "再評価"],
    })));

    // 2. 講義カリキュラム（全81レッスン）
    CURRICULUM_DATA.forEach((chapter) => {
      chapter.lectures.forEach((lec) => {
        list.push({
          id: `lecture-${lec.id}`,
          type: "lecture",
          title: lec.title,
          subtitle: `${lec.stageTitle} ➜ ${lec.seriesTitle || "講義"}（約${lec.duration}）`,
          badge: "講義教材",
          url: `/curriculum/${lec.id}`,
          tags: [
            lec.title,
            lec.subtitle || "",
            lec.summary || "",
            lec.whatYouWillLearn?.canDo || "",
            chapter.title,
            chapter.subtitle || "",
          ],
        });
      });
    });

    // 3. 経穴（全361穴）
    const acupoints = getAllAcupoints();
    acupoints.forEach((pt) => {
      list.push({
        id: `tsubo-${pt.codeLower}`,
        type: "acupoint",
        title: `${pt.name}（${pt.code}）`,
        subtitle: `${pt.meridian}｜${pt.bodyPart}・${pt.locationSimple}`,
        badge: "経穴辞典",
        url: `/tsubo/${pt.codeLower}`,
        exactCode: pt.code.toLowerCase(),
        tags: [
          pt.name,
          pt.kana,
          pt.code,
          pt.codeLower,
          pt.romaji,
          pt.meridian,
          pt.meridianShort,
          ...(pt.indications || []),
          ...(pt.categories || []),
          ...(pt.aliases || []),
        ],
      });
    });

    // 4. 国家試験 本試験実問（KOKUSHI_PAST_EXAMS）
    KOKUSHI_PAST_EXAMS.forEach((k) => {
      list.push({
        id: `kokushi-${k.id}`,
        type: "kokushi",
        title: k.questionType === 'official_past_exam' ? `第${k.examNumber}回国試 ${k.subject}【${k.questionNumber}】` : `${k.questionNumber}｜${k.subject}`,
        subtitle: `${k.question.slice(0, 48)}...`,
        badge: `${k.questionType === 'official_past_exam' ? '公式過去問' : k.questionType === 'modified_past_exam' ? '改変問題' : 'オリジナル演習'}：${k.category}`,
        url: `/kokushi?examId=${k.id}`,
        tags: [
          ...(k.examNumber ? [`第${k.examNumber}回`] : []),
          k.subject,
          k.category,
          k.questionNumber,
          k.question,
          ...k.options,
          k.explanation,
          ...k.keyPoints,
        ],
      });
    });

    // 5. 古典原典条文（CLASSICAL_TEXTS）
    CLASSICAL_TEXTS.forEach((c) => {
      list.push({
        id: `classic-${c.id}`,
        type: "classic",
        title: `『${c.book}』${c.chapter}：${c.theme}`,
        subtitle: `${c.translation.slice(0, 48)}...`,
        badge: `古典：${c.book}`,
        url: `/library#classic-${c.id}`,
        tags: [
          c.book,
          c.chapter,
          c.theme,
          c.original,
          c.verifiedQuotation?.text || '',
          c.verifiedQuotation?.section || '',
          c.translation,
          c.clinicalApplication,
          ...c.tags,
        ],
      });
    });

    // 6. 臨床医学論文（PAPERS_DATABASE）
    PAPERS_DATABASE.forEach((p) => {
      list.push({
        id: `paper-${p.id}`,
        type: "paper",
        title: p.japaneseTitle,
        subtitle: `${p.targetCondition}｜${p.studyDesign}・${p.journal} (${p.year})`,
        badge: "医学論文",
        url: `/library#paper-${p.id}`,
        tags: [
          p.title,
          p.japaneseTitle,
          p.targetCondition,
          p.studyDesign,
          p.journal,
          ...p.tags,
          ...(p.interventionProtocol?.acupoints || []),
        ],
      });
    });

    // 7. お悩み・症状別ガイド（SYMPTOMS）
    SYMPTOMS.forEach((s) => {
      list.push({
        id: `symptom-${s.id}`,
        type: "symptom",
        title: s.title,
        subtitle: `${s.category}｜${s.summary.slice(0, 48)}...`,
        badge: "症状別ガイド",
        url: `/symptoms#${s.id}`,
        tags: [
          s.title,
          s.category,
          s.summary,
          s.orientalMechanism,
          s.lifestyleAdvice.diet,
          s.lifestyleAdvice.habit,
        ],
      });
    });

    // 8. 症例演習（全20症例）
    CLINICAL_CASES.forEach((c) => {
      list.push({
        id: `case-${c.id}`,
        type: "case",
        title: c.title,
        subtitle: `${c.patient?.chiefComplaint || c.subTitle}（${c.difficulty}・${c.category}）`,
        badge: "症例演習",
        url: `/cases/${c.id}`,
        tags: [
          c.title,
          c.subTitle,
          c.patient?.chiefComplaint || "",
          c.correctDiagnosis?.pattern || "",
          c.correctDiagnosis?.hachiko || "",
          c.category,
          c.difficulty,
          ...(c.correctDiagnosis?.primaryPoints || []),
        ],
      });
    });

    // 9. 運動器・自律神経実例アーカイブ（出典確認待ち）
    PUBLIC_ARCHIVE_CASES.forEach((ac) => {
      list.push({
        id: `archive-case-${ac.id}`,
        type: "case",
        title: ac.title,
        subtitle: `${ac.category}｜${ac.location}・${ac.symptoms.slice(0, 40)}...`,
        badge: "症例資料",
        url: `/library#archive-${ac.id}`,
        tags: [
          ac.title,
          ac.category,
          ac.location,
          ac.symptoms,
          ac.treatmentAndCourse,
          ...ac.usedAcupoints,
          ...ac.tags,
        ],
      });
    });

    // 10. 専門用語（Glossary）
    Object.values(GLOSSARY_TERMS).forEach((term) => {
      list.push({
        id: `glossary-${term.term}`,
        type: "glossary",
        title: `${term.term}（${term.reading}）`,
        subtitle: term.oneLiner,
        badge: `用語：${term.category}`,
        url: `/glossary#term-${encodeURIComponent(term.term)}`,
        tags: [term.term, term.reading, term.oneLiner, term.summary],
      });
    });

    return list;
  }, []);

  const searchIndex = useMemo(() => allItems.map(prepareSearchItem), [allItems]);
  const preparedQuery = useMemo(() => prepareSearchQuery(query), [query]);
  // The whole matching set is retained so users can continue past the first page.
  const matchingResults = useMemo(() => {
    if (!preparedQuery.normalized) return [];
    return searchIndex
      .map(index => ({ item: index.item, score: scoreSearchItem(index, preparedQuery), hint: searchMatchHint(index, preparedQuery) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [searchIndex, preparedQuery]);
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
    { label: "国試演習", q: "陰陽", category: "kokushi" },
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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 sm:pt-16 animate-in fade-in duration-150"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="サイト内検索"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#16212B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl overflow-hidden flex flex-col max-h-[85dvh] animate-in zoom-in-95 duration-150"
      >
        {/* 検索入力ヘッダー */}
        <div className="shrink-0 p-3.5 sm:p-4 border-b border-[#F2ECE0] dark:border-[#22303D] flex items-center gap-3 bg-white dark:bg-[#1A2632]">
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
            className="flex-1 min-w-0 min-h-11 rounded-md bg-transparent text-[#232826] dark:text-[#FAF8F5] placeholder-[#8C9691] dark:placeholder-[#64748B] text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#74BA9E]"
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
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-md">
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
              {hasQuery && <span className="ml-1.5 text-xs tabular-nums">{categoryCounts[chip.id]}</span>}
            </button>
          ))}
        </div>

        {/* 検索結果・サジェスト一覧（スクロールエリア） */}
        <div ref={scrollRef} className="search-results-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain p-2 sm:p-3 space-y-1">
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
                    <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                      最近調べたキーワード
                    </span>
                    <button
                      type="button"
                      onClick={clearAllRecentSearches}
                      className="min-h-11 px-2 text-xs text-[#59615D] dark:text-[#A0B0BC] hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
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
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
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
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider block mb-2">
                  主要ハブ・ツールへ直接アクセス
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {STATIC_TOOLS.slice(0, 6).map((tool) => (
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
                        <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block truncate">
                          {tool.title}
                        </span>
                        <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] line-clamp-1">
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
              <p className="px-3 py-1 text-sm text-[#59615D] dark:text-[#A0B0BC]">空白で複数語を検索 · ↑↓で選択 · Enterで移動</p>
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
                          className={`inline-block text-xs font-bold px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[#FAF8F5] dark:bg-[#121920] text-[#737C77] dark:text-[#8899A6] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                          }`}
                        >
                          {item.badge}
                        </span>
                        <span className="block font-bold text-sm leading-relaxed line-clamp-2 break-words">
                          {item.title}
                        </span>
                      </div>

                      {item.subtitle && (
                        <p
                          className={`text-sm leading-relaxed line-clamp-2 break-words ${
                            isSelected
                              ? "text-emerald-100/90"
                              : "text-[#59615D] dark:text-[#A0B0BC]"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                      {hint && <span className={`block text-xs ${isSelected ? "text-emerald-100" : "text-[#59615D] dark:text-[#A0B0BC]"}`}>{hint}</span>}
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
        <div className="shrink-0 px-4 py-2.5 border-t border-[#F2ECE0] dark:border-[#22303D] bg-[#F2EDE4]/60 dark:bg-[#121920] flex flex-wrap items-center justify-between gap-2 text-xs text-[#59615D] dark:text-[#A0B0BC]">
          <div className="flex items-center gap-3">
            <span>↑↓ 選択</span>
            <span>↵ 決定</span>
            <span>ESC 閉じる</span>
          </div>
          <span>はり太郎 統合横断検索</span>
        </div>
      </div>
    </div>
  );
}
