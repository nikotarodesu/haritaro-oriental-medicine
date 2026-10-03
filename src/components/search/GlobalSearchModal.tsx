"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
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
import { prepareSearchItem, scoreSearchItem } from "@/utils/search";
import { LEARNING_COURSES } from "@/data/learningCourses";

export type SearchItemType =
  | "article"
  | "acupoint"
  | "lecture"
  | "case"
  | "tool"
  | "glossary"
  | "kokushi"
  | "classic"
  | "paper"
  | "symptom";

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

type CategoryFilter = "article" | "all" | "acupoint" | "lecture" | "kokushi" | "case" | "library" | "symptom" | "tool";

export default function GlobalSearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
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
  };

  const clearAllRecentSearches = () => {
    try {
      setRecentSearches([]);
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch { /* Search remains usable without browser storage. */ }
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
  // The whole matching set is retained so users can continue past the first page.
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    // カテゴリフィルタ条件
    const matchCategory = (item: SearchResultItem): boolean => {
      if (activeCategory === "article") return item.type === "article";
      if (activeCategory === "all") return true;
      if (activeCategory === "acupoint") return item.type === "acupoint";
      if (activeCategory === "lecture") return item.type === "lecture";
      if (activeCategory === "kokushi") return item.type === "kokushi";
      if (activeCategory === "case") return item.type === "case";
      if (activeCategory === "library") return item.type === "classic" || item.type === "paper";
      if (activeCategory === "symptom") return item.type === "symptom";
      if (activeCategory === "tool") return item.type === "tool";
      return true;
    };

    return searchIndex.filter(index => matchCategory(index.item))
      .map(index => ({ item: index.item, score: scoreSearchItem(index, query) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(result => result.item);
  }, [searchIndex, query, activeCategory]);
  const visibleResults = useMemo(() => filteredResults.slice(0, resultLimit), [filteredResults, resultLimit]);
  const hasQuery = query.trim().length > 0;
  const updateQuery = (next: string) => { setQuery(next); setSelectedIndex(0); setResultLimit(25); };
  const searchAllCategories = () => {
    setActiveCategory("all");
    setSelectedIndex(0);
    setResultLimit(25);
    inputRef.current?.focus();
  };
  const clearQueryAndFocus = () => {
    updateQuery("");
    inputRef.current?.focus();
  };


  // モーダル開閉時のフォーカス制御 & 入力クリア
  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement as HTMLElement | null;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = previousOverflow;
        previousFocus?.focus();
      };
    }
  }, [isOpen]);

  // キーボードナビゲーション（上下移動、Enter、Esc）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || e.isComposing || e.keyCode === 229) return;

      if (e.key === "Tab") {
        const elements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button, input, a[href]') || []).filter(el => el.offsetParent !== null);
        const first = elements[0], last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
      if (document.activeElement !== inputRef.current && e.key !== "Escape") return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          visibleResults.length > 0 ? (prev + 1) % visibleResults.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          visibleResults.length > 0
            ? (prev - 1 + visibleResults.length) % visibleResults.length
            : 0
        );
      } else if (e.key === "Enter") {
        if (visibleResults[selectedIndex]) {
          e.preventDefault();
          const target = visibleResults[selectedIndex];
          saveRecentSearch(query || target.title);
          onClose();
          trackEvent("search_result_click", { placement: "global_search", result_type: target.type });
          router.push(target.url);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, visibleResults, selectedIndex, onClose, router, query, saveRecentSearch]);

  // クイックサジェストのキーワード
  const quickSearches = [
    { label: "合谷 (LI4)", q: "合谷" },
    { label: "足三里 (ST36)", q: "足三里" },
    { label: "国試演習", q: "陰陽五行" },
    { label: "気虚", q: "気虚" },
    { label: "治未病 (古典)", q: "治未病" },
    { label: "肩こり・頭痛", q: "頭痛" },
    { label: "膝痛・ランナー", q: "膝" },
    { label: "坐骨神経痛", q: "坐骨" },
    { label: "シミュレーター", q: "シミュレーター" },
  ];

  const categoryChips: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: "すべて" },
    { id: "article", label: "解説記事" },
    { id: "acupoint", label: "経穴 (361)" },
    { id: "kokushi", label: "国試演習" },
    { id: "lecture", label: "講義 (81)" },
    { id: "symptom", label: "症状別ケア" },
    { id: "library", label: "論文・古典" },
    { id: "case", label: "症例・実例" },
    { id: "tool", label: "ツール" },
  ];

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 sm:pt-16 animate-in fade-in duration-150"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="サイト内検索"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#16212B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
      >
        {/* 検索入力ヘッダー */}
        <div className="p-3.5 sm:p-4 border-b border-[#F2ECE0] dark:border-[#22303D] flex items-center gap-3 bg-white dark:bg-[#1A2632]">
          <Search className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
          <input
            aria-label="経穴・記事・講義などを検索"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              updateQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="経穴・記事・講義・症状を検索"
            className="flex-1 min-w-0 min-h-11 rounded-md bg-transparent text-[#232826] dark:text-[#FAF8F5] placeholder-[#8C9691] dark:placeholder-[#64748B] text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#74BA9E]"
          />
          {query && (
            <button
              type="button"
              aria-label="検索語を消去"
              onClick={() => updateQuery("")}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="検索を閉じる" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-5 h-5" /></button>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-md">
            ESC
          </kbd>
        </div>

        {/* カテゴリクイックフィルターチップ */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F2EDE4]/70 dark:bg-[#121920]/80 border-b border-[#E8E1D1] dark:border-[#22303D] overflow-x-auto no-scrollbar text-xs">
          {categoryChips.map((chip) => (
            <button
              aria-pressed={activeCategory === chip.id}
              key={chip.id}
              type="button"
              onClick={() => {
                setActiveCategory(chip.id); setResultLimit(25);
                setSelectedIndex(0);
              }}
              className={`min-h-11 px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                activeCategory === chip.id
                  ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white shadow-2xs"
                  : "bg-white dark:bg-[#1C2733] text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-white border border-[#E5DEC9] dark:border-[#2A3B4A]"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* 検索結果・サジェスト一覧（スクロールエリア） */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
          <p role="status" aria-live="polite" aria-atomic="true" className={hasQuery ? "px-3 py-1 text-sm font-semibold text-[#59615D] dark:text-[#A0B0BC]" : "sr-only"}>
            {hasQuery ? `検索結果：${filteredResults.length}件` : "検索語を入力してください。"}
          </p>
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
                      className="text-[11px] text-[#8899A6] hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>履歴を消去</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs font-semibold text-[#232826] dark:text-[#FAF8F5] transition-all hover:shadow-2xs cursor-pointer group"
                      >
                        <button type="button" onClick={() => updateQuery(term)} className="min-h-11 px-1">{term}</button>
                        <button
                          type="button"
                          onClick={(e) => removeRecentSearch(e, term)}
                          aria-label={`${term}を検索履歴から削除`}
                          className="text-slate-400 group-hover:text-slate-600 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
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
                      onClick={() => updateQuery(item.q)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs font-semibold text-[#232826] dark:text-[#FAF8F5] transition-all hover:shadow-2xs cursor-pointer"
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
                      className="p-2.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-left transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div>
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
            <div className="space-y-1">
              <p className="px-3 py-1 text-sm text-[#59615D] dark:text-[#A0B0BC]">↑↓キーで選択・Enterで移動</p>

              {visibleResults.map((item, idx) => {
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
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      saveRecentSearch(query || item.title);
                      onClose();
                      trackEvent("search_result_click", { placement: "global_search", result_type: item.type });
                      router.push(item.url);
                    }}
                    onMouseMove={(event) => {
                      // 結果の再描画で静止中のポインタが重なっても、キーボードの選択は保つ。
                      if (event.movementX !== 0 || event.movementY !== 0) setSelectedIndex(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
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
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[#FAF8F5] dark:bg-[#121920] text-[#737C77] dark:text-[#8899A6] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                          }`}
                        >
                          {item.badge}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm truncate">
                          {item.title}
                        </h4>
                      </div>

                      {item.subtitle && (
                        <p
                          className={`text-xs truncate ${
                            isSelected
                              ? "text-emerald-100/90"
                              : "text-[#59615D] dark:text-[#A0B0BC]"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                        isSelected
                          ? "translate-x-0.5 text-white"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {filteredResults.length > visibleResults.length && <button type="button" onClick={() => setResultLimit(limit => limit + 25)} className="w-full min-h-11 rounded-xl border border-[#C5DED4] p-3 text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8]">さらに表示（残り{filteredResults.length - visibleResults.length}件）</button>}

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
        <div className="px-4 py-2.5 border-t border-[#F2ECE0] dark:border-[#22303D] bg-[#F2EDE4]/60 dark:bg-[#121920] flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
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
