"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
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
  Search, 
  ArrowRight, 
  Bookmark, 
  RotateCcw, 
  BookOpen, 
  GitCompare, 
  GitCommit, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  X 
} from "lucide-react";
import BodyMapSvg from "@/components/tsubo/BodyMapSvg";
import ClipButton from "@/components/ClipButton";
import ClinicalPairsSection from "@/components/ClinicalPairsSection";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import ClinicalToolBridge from "@/components/clinical/ClinicalToolBridge";

const MERIDIAN_ELEMENT_MAP: Record<string, "木" | "火" | "土" | "金" | "水"> = {
  lung: "金",
  "large-intestine": "金",
  stomach: "土",
  spleen: "土",
  heart: "火",
  "small-intestine": "火",
  bladder: "水",
  kidney: "水",
  pericardium: "火",
  "triple-energizer": "火",
  gallbladder: "木",
  liver: "木",
};

type SortOption = "meridian" | "kana" | "detailed";

export default function TsuboInteractiveClient() {
  const allPoints = useMemo(() => getAllAcupoints(), []);
  const publishedCount = useMemo(() => getPublishedAcupoints().length, []);
  const searchParams = useSearchParams();

  // URLクエリから初期値を復元
  const initialQ = searchParams?.get("q") || "";
  const initialBodyPart = searchParams?.get("bodyPart") || "すべて";
  const initialMeridian = searchParams?.get("meridian") || "すべて";
  const initialCategory = searchParams?.get("category") || "すべて";
  const initialPublished = searchParams?.get("published") === "true";
  const initialSort = (["meridian", "kana", "detailed"].includes(searchParams?.get("sort") || "")) 
    ? (searchParams!.get("sort") as SortOption)
    : "meridian";
  const initialView = searchParams?.get("view") === "table" ? "table" : "grid";
  const initialPage = parseInt(searchParams?.get("page") || "1", 10) || 1;

  // 検索・絞り込みステート
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>(initialBodyPart);
  const [selectedMeridian, setSelectedMeridian] = useState<string>(initialMeridian);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [onlyPublished, setOnlyPublished] = useState<boolean>(initialPublished);
  const [selectedTsubo, setSelectedTsubo] = useState<AcupointMaster | null>(null);

  // 表示・ページネーション・並び順ステート
  const [viewMode, setViewMode] = useState<"grid" | "table">(initialView);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [pageSize] = useState<number>(24);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // 人体図・フィルターの開閉ステート（検索クエリがある場合は初期折りたたみ）
  const [showBodyMap, setShowBodyMap] = useState<boolean>(!initialQ);

  const { memos } = useClinicalMemo();
  const savedTsuboMemos = useMemo(() => memos.filter((m) => m.type === "tsubo"), [memos]);

  // 初回マウントフラグ（初回ロード時のページ番号リセットを防止）
  const isFirstRender = useRef(true);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // 検索クエリが入力されたら人体図を自動で折りたたむ（空に戻ったら自動展開）
  const prevQueryRef = useRef(initialQ);
  useEffect(() => {
    if (prevQueryRef.current !== searchQuery) {
      if (searchQuery.trim().length > 0 && prevQueryRef.current === "") {
        setShowBodyMap(false);
      } else if (searchQuery.trim().length === 0 && prevQueryRef.current !== "") {
        setShowBodyMap(true);
      }
      prevQueryRef.current = searchQuery;
    }
  }, [searchQuery]);

  // 部位ごとの経穴数を集計
  const pointCountsByPart = useMemo(() => {
    const counts: Record<string, number> = {};
    allPoints.forEach((p) => {
      counts[p.bodyPart] = (counts[p.bodyPart] || 0) + 1;
    });
    return counts;
  }, [allPoints]);

  // URLクエリ変更の検知（ブラウザバック・フォワード・リンク遷移時の同期）
  useEffect(() => {
    if (!searchParams) return;
    const q = searchParams.get("q") || "";
    const bp = searchParams.get("bodyPart") || "すべて";
    const mer = searchParams.get("meridian") || "すべて";
    const cat = searchParams.get("category") || "すべて";
    const pub = searchParams.get("published") === "true";
    const sort = (searchParams.get("sort") as SortOption) || "meridian";
    const view = (searchParams.get("view") as "grid" | "table") || "grid";
    const pg = parseInt(searchParams.get("page") || "1", 10) || 1;

    // ブラウザの戻る・進むなどで変わる外部URLを、検索状態へ同期する。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery((prev) => (prev !== q ? q : prev));
    setSelectedBodyPart((prev) => (prev !== bp ? bp : prev));
    setSelectedMeridian((prev) => (prev !== mer ? mer : prev));
    setSelectedCategory((prev) => (prev !== cat ? cat : prev));
    setOnlyPublished((prev) => (prev !== pub ? pub : prev));
    setSortOption((prev) => (prev !== sort ? sort : prev));
    setViewMode((prev) => (prev !== view ? view : prev));
    setCurrentPage((prev) => (prev !== pg ? pg : prev));

    const targetId = searchParams.get("id") || searchParams.get("highlight");
    if (targetId) {
      const cleanId = targetId.replace(/^tsubo-/, "").toLowerCase();
      const found = allPoints.find(
        (t) =>
          t.codeLower === cleanId ||
          t.id.toLowerCase() === cleanId ||
          t.legacyId.toLowerCase() === cleanId
      );
      if (found) {
        setSelectedTsubo(found);
        setTimeout(() => {
          const el = document.getElementById(`tsubo-card-${found.codeLower}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 350);
      }
    }
  }, [searchParams, allPoints]);

  // フィルター・検索条件変更時にページを1に戻す（初回マウント時はスキップ）
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(1);
  }, [searchQuery, selectedBodyPart, selectedMeridian, selectedCategory, onlyPublished, sortOption, pageSize]);

  // ステート変化時にURLクエリを同期（ブラウザバック・URL共有対応）
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedBodyPart !== "すべて") params.set("bodyPart", selectedBodyPart);
    if (selectedMeridian !== "すべて") params.set("meridian", selectedMeridian);
    if (selectedCategory !== "すべて") params.set("category", selectedCategory);
    if (onlyPublished) params.set("published", "true");
    if (sortOption !== "meridian") params.set("sort", sortOption);
    if (viewMode !== "grid") params.set("view", viewMode);
    if (currentPage > 1) params.set("page", String(currentPage));

    const currentUrlParams = new URLSearchParams(window.location.search);
    const targetId = currentUrlParams.get("id") || currentUrlParams.get("highlight");
    if (targetId) params.set("id", targetId);

    const newQuery = params.toString();
    const newPath = newQuery ? `${window.location.pathname}?${newQuery}` : window.location.pathname;
    const currentFull = `${window.location.pathname}${window.location.search}`;

    if (newPath !== currentFull) {
      window.history.replaceState(null, "", newPath);
    }
  }, [searchQuery, selectedBodyPart, selectedMeridian, selectedCategory, onlyPublished, sortOption, viewMode, currentPage]);

  // 経絡リスト（全14経脈から動的生成）
  const meridianOptions = useMemo(() => {
    return ["すべて", ...MERIDIANS.map((m) => m.shortName)];
  }, []);

  // 要穴リスト
  const categoryOptions = useMemo(() => {
    return ["すべて", "原穴", "絡穴", "郄穴", "募穴", "背部兪穴", "合穴", "四総穴", "八脈交会穴", "八会穴"];
  }, []);

  // 全角英数を半角英数へ正規化
  const normalizeQuery = (text: string) => {
    return text
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
      .trim()
      .toLowerCase();
  };

  // 検索クエリと経穴の一致理由を判定
  const getMatchReason = useCallback((tsubo: AcupointMaster, rawQuery: string): string | null => {
    if (!rawQuery) return null;
    const q = normalizeQuery(rawQuery);
    if (!q) return null;

    if (tsubo.codeLower === q || tsubo.code.toLowerCase() === q) return "コード完全一致";
    if (tsubo.name === rawQuery.trim()) return "経穴名完全一致";
    if (tsubo.codeLower.startsWith(q)) return "コード前方一致";
    if (tsubo.name.includes(rawQuery.trim())) return "経穴名に含む";
    if (tsubo.kana.includes(rawQuery.trim()) || tsubo.romaji.toLowerCase().includes(q)) return "読み一致";
    if (tsubo.aliases?.some((a) => a.includes(rawQuery.trim()))) return "別名一致";
    if (tsubo.indications.some((ind) => ind.toLowerCase().includes(q) || ind.includes(rawQuery.trim()))) return "主治・適応症一致";
    if (tsubo.locationSimple.includes(rawQuery.trim()) || tsubo.locationDetail.includes(rawQuery.trim())) return "取穴部位一致";
    if (tsubo.clinicalNote.includes(rawQuery.trim())) return "解説・臨床ノート一致";
    return "関連語一致";
  }, []);

  // 検索・フィルタリング・並び替え処理
  const filteredTsubos = useMemo(() => {
    const q = normalizeQuery(searchQuery);

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

        if (!q) return true;

        // コード完全一致または前方一致
        if (t.codeLower === q || t.code.toLowerCase() === q) return true;
        if (t.codeLower.startsWith(q)) return true;

        // 名称・読み・別名
        if (t.name.includes(q) || t.kana.includes(q) || t.romaji.toLowerCase().includes(q)) return true;
        if (t.aliases?.some((a) => a.includes(q))) return true;

        // 主治・部位・臨床ノート
        if (t.indications.some((ind) => ind.toLowerCase().includes(q))) return true;
        if (t.locationSimple.includes(q) || t.locationDetail.includes(q)) return true;
        if (t.clinicalNote.includes(q)) return true;

        return false;
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
        if (q) {
          const aExact = a.name === q || a.codeLower === q;
          const bExact = b.name === q || b.codeLower === q;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
        }

        return compareAcupointsByMeridianOrder(a, b);
      });
  }, [allPoints, searchQuery, selectedBodyPart, selectedMeridian, selectedCategory, onlyPublished, sortOption]);

  // ページネーション計算
  const totalItems = filteredTsubos.length;
  const isAllPages = pageSize >= totalItems || pageSize === 0;
  const totalPages = isAllPages ? 1 : Math.ceil(totalItems / pageSize);
  const paginatedTsubos = useMemo(() => {
    if (isAllPages) return filteredTsubos;
    const start = (currentPage - 1) * pageSize;
    return filteredTsubos.slice(start, start + pageSize);
  }, [filteredTsubos, currentPage, pageSize, isAllPages]);

  // 検索語を保って、部位・経脈などの条件だけを解除する。
  const resetSelectionFilters = () => {
    setSelectedBodyPart("すべて");
    setSelectedMeridian("すべて");
    setSelectedCategory("すべて");
    setOnlyPublished(false);
    setCurrentPage(1);
    searchInputRef.current?.focus();
  };
  const clearSearchQuery = () => {
    setSearchQuery("");
    setCurrentPage(1);
    searchInputRef.current?.focus();
  };
  const resetAllFilters = () => {
    setSearchQuery("");
    resetSelectionFilters();
  };

  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasSelectionFilters = selectedBodyPart !== "すべて" || selectedMeridian !== "すべて" || selectedCategory !== "すべて" || onlyPublished;
  const hasActiveFilters = hasSearchQuery || hasSelectionFilters;

  return (
    <div className="space-y-8 sm:space-y-12">
      <ClinicalToolBridge />
      {/* 大型検索バー（最優先配置） */}
      <section className="max-w-4xl mx-auto space-y-3">
        <label htmlFor="tsubo-search" className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
          経穴を検索
        </label>
        <div className="relative">
          <Search className="w-5 h-5 text-[#737C77] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="tsubo-search"
            ref={searchInputRef}
            aria-describedby="tsubo-search-examples"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="経穴名・コード"
            className="w-full pl-12 pr-16 py-3.5 rounded-2xl border-2 border-[#D8CFC0] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] text-base text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-all shadow-xs min-h-[56px]"
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
          例：合谷、ごうこく、LI4、頭痛
        </p>

        {/* 検索直下のサマリー ＆ 人体図トグルバー */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-1">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <p role="status" aria-live="polite" aria-atomic="true">
              {searchQuery.trim() ? (
                <span className="text-[#333835] dark:text-[#C5D2DB]">
                  「<strong className="text-[#1E3D34] dark:text-[#74BA9E] font-bold">{searchQuery.trim()}</strong>」の検索結果：
                  該当 <strong className="font-mono text-sm text-[#1E3D34] dark:text-[#74BA9E]">{totalItems}</strong> 穴
                </span>
              ) : (
                <span className="text-[#59615D] dark:text-[#A0B0BC]">
                  全361穴から絞り込み中：該当 <strong className="font-mono text-sm text-[#1E3D34] dark:text-[#74BA9E]">{totalItems}</strong> 穴
                </span>
              )}
            </p>

            {searchQuery.trim() && (
              <button
                type="button"
                onClick={clearSearchQuery}
                className="inline-flex min-h-11 items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#182823] border border-[#D8CFC0] dark:border-[#2A5243] text-[#B86924] dark:text-[#E6C387] font-bold hover:bg-white text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>検索解除</span>
              </button>
            )}
          </div>

          {/* 人体図・フィルターの開閉ボタン */}
          <button
            type="button"
            onClick={() => setShowBodyMap(!showBodyMap)}
            aria-expanded={showBodyMap}
            className="inline-flex min-h-11 items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#FAF8F5] dark:hover:bg-[#1f2c38] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{showBodyMap ? "人体図・詳細条件を閉じる ▲" : "人体図・部位から探す ▼"}</span>
          </button>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {hasSelectionFilters && hasSearchQuery && <button type="button" onClick={resetSelectionFilters} className="inline-flex min-h-11 items-center rounded-lg border border-[#C5DED4] px-3 py-2 text-sm font-semibold text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:text-[#83BEA8] dark:hover:bg-[#182823]">検索語を保って条件を解除</button>}
            <button type="button" onClick={resetAllFilters} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[#1E3D34] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#83BEA8]"><RotateCcw aria-hidden="true" className="h-4 w-4" />検索・条件をすべて解除</button>
          </div>
        )}

        {/* 常時アクセス可能な要穴クイックピルフィルター */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1.5 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] shrink-0">
            要穴絞り込み:
          </span>
          {["すべて", "原穴", "郄穴", "絡穴", "募穴", "背部兪穴", "四総穴", "八会穴"].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#B86924] text-white shadow-2xs dark:bg-[#9C5417]"
                    : "bg-white/80 dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:border-[#B86924] hover:text-[#B86924]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 「2穴比較／今日の復習／奇経八脈」コンパクトナビゲーション */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 text-xs">
          <Link
            href="/tsubo/compare"
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center shrink-0">
                <GitCompare className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] truncate">
                2穴を比べる
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          <Link
            href="/tsubo/practice"
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] truncate">
                今日の復習
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          <Link
            href="/kikei"
            className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-[#FCF4EB] to-[#FAF8F5] dark:from-[#261B12] dark:to-[#17212A] border border-[#F2DEB0] dark:border-[#4D361F] hover:border-[#B86924] dark:hover:border-[#E6C387] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#B86924] dark:bg-[#D48239] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <GitCommit className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] group-hover:underline truncate">
                奇経八脈
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>
      </section>

      {/* 人体図セレクター ＆ 経脈・要穴フィルター（折りたたみ対応） */}
      {showBodyMap && (
        <section className="space-y-5 animate-in fade-in duration-200">
          <BodyMapSvg
            selectedBodyPart={selectedBodyPart}
            onSelectBodyPart={(part) => setSelectedBodyPart(part)}
            pointCountsByPart={pointCountsByPart}
          />

          {/* 経絡・要穴フィルターカード */}
          <div className="bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-xs space-y-4 transition-colors">
            
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
                    onClick={() => setSelectedMeridian(mer)}
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
                    onClick={() => setSelectedCategory(cat)}
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
                  onChange={(e) => setOnlyPublished(e.target.checked)}
                  className="rounded border-[#D8CFC0] text-[#1E3D34] focus:ring-[#1E3D34]"
                />
                <span className="text-[#333835] dark:text-[#C5D2DB] font-medium">
                  精密断面図解つき（{publishedCount}穴）のみ表示
                </span>
              </label>

            </div>
          </div>
        </section>
      )}

      {/* 経穴一覧セクション */}
      <section id="tsubo-list" className="space-y-4">
        {/* 一覧上部コントロールバー */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#59615D] dark:text-[#A0B0BC]">
              表示件数：<strong className="text-[#1E3D34] dark:text-[#74BA9E] font-bold">{totalItems}</strong> 穴
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* 並び順 */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-white dark:bg-[#17212A] border border-[#D8CFC0] dark:border-[#2A3B4A] rounded-lg px-2.5 py-1 text-xs text-[#333835] dark:text-[#C5D2DB]"
            >
              <option value="meridian">流注順（経絡順）</option>
              <option value="kana">五十音順</option>
              <option value="detailed">図解充実度順</option>
            </select>

            {/* 表示モード（グリッド／テーブル） */}
            <div className="flex items-center border border-[#D8CFC0] dark:border-[#2A3B4A] rounded-lg overflow-hidden bg-white dark:bg-[#17212A]">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 ${viewMode === "grid" ? "bg-[#1E3D34] text-white" : "text-[#737C77]"}`}
                title="グリッド表示"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 ${viewMode === "table" ? "bg-[#1E3D34] text-white" : "text-[#737C77]"}`}
                title="テーブル表示"
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
            <p className="mt-2 text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">経穴名・読み方・コードや、部位・経脈・要穴の条件を変えてお試しください。</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {hasSearchQuery && hasSelectionFilters && <button type="button" onClick={resetSelectionFilters} className="min-h-11 rounded-xl border border-[#C5DED4] px-4 py-2 text-sm font-semibold text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:text-[#83BEA8] dark:hover:bg-[#182823]">同じ検索語で条件を解除</button>}
              {hasSearchQuery && <button type="button" onClick={() => searchInputRef.current?.focus()} className="min-h-11 rounded-xl border border-[#C5DED4] px-4 py-2 text-sm font-semibold text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:text-[#83BEA8] dark:hover:bg-[#182823]">検索語を編集する</button>}
              <button type="button" onClick={resetAllFilters} className="min-h-11 rounded-xl bg-[#1E3D34] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2B5A46] focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-[#2B6958]">検索・条件を解除して全{allPoints.length}穴を表示</button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {paginatedTsubos.map((point) => {
              const matchReason = searchQuery ? getMatchReason(point, searchQuery) : null;
              return (
                <div
                  key={point.id}
                  id={`tsubo-card-${point.codeLower}`}
                  className={`bg-white dark:bg-[#17212A] rounded-2xl border transition-all p-4 flex flex-col justify-between group shadow-2xs hover:shadow-md ${
                    selectedTsubo?.id === point.id
                      ? "border-[#1E3D34] dark:border-[#74BA9E] ring-2 ring-[#1E3D34]/20"
                      : "border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E]"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                            {point.code}
                          </span>
                          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                            {point.meridian}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] pt-1 group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                          <Link href={`/tsubo/${point.codeLower}`} className="hover:underline">
                            {point.name}
                          </Link>
                          <span className="text-xs font-normal text-[#737C77] ml-1.5 font-sans">
                            {point.kana}
                          </span>
                        </h3>
                      </div>
                      <ClipButton
                        item={{
                          id: `tsubo-${point.codeLower}`,
                          type: "tsubo",
                          title: `${point.name}（${point.code}）`,
                          points: [point.name],
                          elements: MERIDIAN_ELEMENT_MAP[point.meridianId] ? [MERIDIAN_ELEMENT_MAP[point.meridianId]] : [],
                          indications: point.indications || [],
                          summary: `${point.meridian}・${point.locationSimple}`,
                        }}
                      />
                    </div>

                    <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-2 leading-relaxed">
                      {point.locationSimple}
                    </p>

                    {matchReason && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#2A1E14] px-1.5 py-0.5 rounded">
                        <span>一致: {matchReason}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      {point.bodyPart}
                    </span>
                    <Link
                      href={`/tsubo/${point.codeLower}`}
                      className="font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>詳細を見る</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* テーブル表示 */
          <div className="overflow-x-auto rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A]">
            <table className="w-full text-left text-xs">
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
                    <td className="p-3 font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                      <Link href={`/tsubo/${point.codeLower}`} className="hover:underline">
                        {point.name}
                      </Link>
                      <span className="text-[11px] font-normal text-[#737C77] ml-1">({point.kana})</span>
                    </td>
                    <td className="p-3 text-[#59615D] dark:text-[#A0B0BC]">{point.meridian}</td>
                    <td className="p-3 text-[#59615D] dark:text-[#A0B0BC]">{point.bodyPart}</td>
                    <td className="p-3 text-[#59615D] dark:text-[#A0B0BC] max-w-xs truncate">{point.locationSimple}</td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/tsubo/${point.codeLower}`}
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
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                document.getElementById("tsubo-list")?.scrollIntoView({ behavior: "smooth" });
              }}
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
                      onClick={() => {
                        setCurrentPage(pageNum);
                        document.getElementById("tsubo-list")?.scrollIntoView({ behavior: "smooth" });
                      }}
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
              disabled={currentPage >= totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                document.getElementById("tsubo-list")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-2 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white text-xs font-medium"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 保存済み経穴 */}
      {savedTsuboMemos.length > 0 && (
        <section className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#B86924]" />
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                学習ノートに保存した経穴（{savedTsuboMemos.length}件）
              </h2>
            </div>
            <Link href="/curriculum" className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-bold">
              学習ノートを開く ➜
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {savedTsuboMemos.map((memo) => (
              <div
                key={memo.id}
                className="p-3.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#263542] flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <strong className="text-xs font-serif text-[#232826] dark:text-[#FAF8F5] block truncate">
                    {memo.title}
                  </strong>
                  <span className="text-xs text-[#737C77] line-clamp-1">{memo.summary}</span>
                </div>
                <Link
                  href={`/tsubo/${memo.id.replace(/^tsubo-/, "")}`}
                  className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-bold shrink-0 ml-2 px-2.5 py-1 rounded-lg border border-[#C5DED4] hover:bg-[#EBF3EF]"
                >
                  確認
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 関連する基礎解説・配穴案内 */}
      <section className="space-y-4 pt-4 border-t border-[#F2ECE0] dark:border-[#22303D]">
        <ClinicalPairsSection />
      </section>
    </div>
  );
}
