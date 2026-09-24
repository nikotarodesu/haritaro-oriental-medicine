"use client";

import { useState, useMemo, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  getAllAcupoints, 
  getPublishedAcupoints, 
  AcupointMaster, 
  MERIDIANS, 
  ACUPOINT_CATEGORIES, 
  BODY_REGIONS,
  compareAcupointsByMeridianOrder 
} from "@/data/tsubo";
import { 
  Compass, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Bookmark, 
  RotateCcw, 
  BookOpen, 
  Eye, 
  Activity,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
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

export default function TsuboPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-16 text-center text-xs text-[#737C77]">経穴辞典を読み込み中...</div>}>
      <TsuboPageContent />
    </Suspense>
  );
}

function TsuboPageContent() {
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
    ? (searchParams!.get("sort") as "meridian" | "kana" | "detailed") 
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
  const [sortOption, setSortOption] = useState<"meridian" | "kana" | "detailed">(initialSort);
  const [pageSize, setPageSize] = useState<number>(24);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // 人体図・フィルターの開閉ステート（検索クエリがある場合は初期折りたたみ）
  const [showBodyMap, setShowBodyMap] = useState<boolean>(!initialQ);

  const { memos, isClipped, toggleClip } = useClinicalMemo();
  const savedTsuboMemos = useMemo(() => memos.filter((m) => m.type === "tsubo"), [memos]);

  // 初回マウントフラグ（初回ロード時のページ番号リセットを防止）
  const isFirstRender = useRef(true);

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
    const sort = (searchParams.get("sort") as "meridian" | "kana" | "detailed") || "meridian";
    const view = (searchParams.get("view") as "grid" | "table") || "grid";
    const pg = parseInt(searchParams.get("page") || "1", 10) || 1;

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

  // フィルター解除ヘルパー
  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedBodyPart("すべて");
    setSelectedMeridian("すべて");
    setSelectedCategory("すべて");
    setOnlyPublished(false);
  };

  const hasActiveFilters = searchQuery || selectedBodyPart !== "すべて" || selectedMeridian !== "すべて" || selectedCategory !== "すべて" || onlyPublished;

  return (
    <div className="space-y-8 sm:space-y-12">
      
      {/* 1. ページ名、短い説明、収録状況 */}
      <section className="text-center space-y-3 pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>WHO Standard 361 Acupoints Database</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          十四経脈・経穴図鑑
        </h1>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-2xl mx-auto">
          東洋医学の経絡流注・骨性目印から、浅深断面解剖、臨床配穴、EBMエビデンスまで網羅した鍼灸学習データベースです。
        </p>

        {/* 収録状況ステータスバー */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#15202B] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#333835] dark:text-[#C5D2DB]">
            WHO標準経穴：<strong className="font-mono text-[#1E3D34] dark:text-[#74BA9E]">{allPoints.length}</strong> 穴
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#281E15] border border-[#F2DEB0] dark:border-[#42381C] text-[#B86924] dark:text-[#E6C387]">
            詳細知見・先行公開：<strong className="font-mono">{publishedCount}</strong> 穴
          </span>
          {savedTsuboMemos.length > 0 && (
            <span className="px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] font-medium">
              学習ノート保存：<strong className="font-mono">{savedTsuboMemos.length}</strong> 穴
            </span>
          )}
        </div>
      </section>

      {/* 2. 「辞典で調べる／2穴を比べる／学習・復習／奇経八脈」コンパクトナビゲーション */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#1E3D34] dark:bg-[#2B6958] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Search className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold truncate">1. 経穴図鑑</span>
            </div>
            <span className="text-[11px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono shrink-0 hidden sm:inline-block">361穴</span>
          </div>

          <Link
            href="/tsubo/compare"
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center shrink-0">
                <GitCompare className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] truncate">
                2. 2穴比較
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
                3. 今日の復習
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
                4. 奇経八脈
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>
      </section>

      {/* 3. 大型検索バー（正規化対応） */}
      <section className="max-w-4xl mx-auto space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-[#737C77] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="経穴名、よみ、コード（合谷、ごうこく、LI4）、主治（頭痛、胃痛など）..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 border-[#D8CFC0] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] text-sm text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-all shadow-xs min-h-[48px]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737C77] hover:text-[#232826] p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="検索語をクリア"
              aria-label="検索語をクリア"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 検索直下のサマリー ＆ 人体図トグルバー */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-1">
          <div className="flex items-center gap-2 text-xs">
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

            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#182823] border border-[#D8CFC0] dark:border-[#2A5243] text-[#B86924] dark:text-[#E6C387] font-bold hover:bg-white text-xs transition-colors"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#FAF8F5] dark:hover:bg-[#1f2c38] transition-colors shadow-xs"
          >
            <Layers className="w-3.5 h-3.5 text-[#737C77]" />
            <span>{showBodyMap ? "人体図・経絡フィルターを閉じる ▲" : "人体図・経絡フィルターで探す ▼"}</span>
          </button>
        </div>
      </section>

      {/* 4. 人体図セレクター ＆ 経脈・要穴フィルター（折りたたみ対応） */}
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

            {/* 奇経八脈へのナビゲーションバナー */}
            <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#FCF8F2] to-[#FAF5ED] dark:from-[#1E1712] dark:to-[#17212A] p-3.5 rounded-xl border border-[#F0DFCD] dark:border-[#3D2C1B]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#B86924] dark:bg-[#D48239] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <GitCommit className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                      奇経八脈（全8脈）・八脈交会穴（4対）
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B86924]/10 text-[#B86924] dark:text-[#E6C387] font-bold border border-[#B86924]/20">
                      生体エネルギーの貯水池
                    </span>
                  </div>
                  <p className="text-[11px] text-[#737C77] dark:text-[#96A6B2] line-clamp-1 mt-0.5">
                    正経十二経脈の気血を調整する奇経八脈の流注・主治病証と臨床配穴を完全網羅
                  </p>
                </div>
              </div>
              <Link
                href="/kikei"
                className="self-end sm:self-center shrink-0 px-3.5 py-1.5 rounded-xl bg-[#B86924] hover:bg-[#A3591B] dark:bg-[#D48239] dark:hover:bg-[#B86924] text-white font-bold text-xs shadow-xs transition-all inline-flex items-center gap-1.5 group cursor-pointer"
              >
                <span>奇経八脈を見る</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 5. 選択中条件チップス ＆ 表示制御バー */}
      <section id="tsubo-list" className="space-y-4 pt-2">
        {/* 条件チップス */}
        {hasActiveFilters && (
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[#59615D] dark:text-[#A0B0BC]">現在の条件：</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#263542] font-medium">
                  <span>検索「{searchQuery}」</span>
                  <button type="button" onClick={() => setSearchQuery("")} className="text-[#737C77] hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedBodyPart !== "すべて" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] font-medium">
                  <span>部位: {selectedBodyPart}</span>
                  <button type="button" onClick={() => setSelectedBodyPart("すべて")} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedMeridian !== "すべて" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] font-medium">
                  <span>経脈: {selectedMeridian}</span>
                  <button type="button" onClick={() => setSelectedMeridian("すべて")} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== "すべて" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] border border-[#F2DEB0] font-medium">
                  <span>要穴: {selectedCategory}</span>
                  <button type="button" onClick={() => setSelectedCategory("すべて")} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={resetAllFilters}
              className="text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-bold shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>すべての条件を解除</span>
            </button>
          </div>
        )}

        {/* 八脈交会穴フィルター選択時の専用案内カード */}
        {selectedCategory === "八脈交会穴" && (
          <div className="bg-gradient-to-r from-[#FCF8F2] to-[#FAF5ED] dark:from-[#211812] dark:to-[#17212A] p-4 rounded-2xl border border-[#F2DEB0] dark:border-[#4D361F] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-[#B86924] text-white shrink-0 mt-0.5 shadow-2xs">
                <GitCommit className="w-4 h-4" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                  八脈交会穴（4対8穴）と奇経八脈の解説
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  公孫・内関（衝脈・陰維脈）、後渓・申脈（督脈・陽蹻脈）、足臨泣・外関（帯脈・陽維脈）、列欠・照海（任脈・陰蹻脈）の4対配穴と流注病証は、奇経八脈ページで完全体系化しています。
                </p>
              </div>
            </div>
            <Link
              href="/kikei"
              className="self-end sm:self-center shrink-0 px-4 py-2 rounded-xl bg-[#B86924] hover:bg-[#A3591B] dark:bg-[#D48239] text-white font-bold text-xs shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>奇経八脈・4対配穴を見る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* コントロールツールバー（件数、並び替え、表示切替、ページサイズ） */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white dark:bg-[#17212A] p-3 sm:p-4 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div className="flex items-center gap-2">
            <span className="text-[#59615D] dark:text-[#A0B0BC]">
              該当 <strong className="text-sm font-mono text-[#1E3D34] dark:text-[#74BA9E]">{totalItems}</strong> 穴
            </span>
            {!isAllPages && (
              <span className="text-[#737C77] dark:text-[#8899A6]">
                （{currentPage} / {totalPages} ページ）
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* 並び順 */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#737C77] dark:text-[#8899A6]">並び順：</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="p-1.5 rounded-lg border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#10171F] text-xs font-medium"
              >
                <option value="meridian">経脈順（標準）</option>
                <option value="kana">五十音順</option>
                <option value="detailed">詳細解説あり優先</option>
              </select>
            </div>

            {/* 1ページあたりの表示件数 */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#737C77] dark:text-[#8899A6]">件数：</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="p-1.5 rounded-lg border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#10171F] text-xs font-medium"
              >
                <option value={24}>24件</option>
                <option value={48}>48件</option>
                <option value={96}>96件</option>
                <option value={0}>全件表示</option>
              </select>
            </div>

            {/* 表示形式トグル */}
            <div className="inline-flex rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] p-0.5 border border-[#E5DEC9] dark:border-[#263542]">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="カードグリッド表示"
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "grid" ? "bg-white dark:bg-[#17212A] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs" : "text-[#737C77]"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                title="コンパクト一覧表示"
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "table" ? "bg-white dark:bg-[#17212A] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs" : "text-[#737C77]"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6. 経穴一覧（0件時・グリッド・テーブル） */}
        {totalItems === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F5] dark:bg-[#15202B] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-8 space-y-3">
            <AlertTriangle className="w-8 h-8 text-[#B86924] mx-auto opacity-70" />
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              該当する経穴が見つかりませんでした
            </h3>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6] max-w-md mx-auto">
              入力したキーワードまたは選択中の絞り込み条件（部位・経脈・要穴）をご確認ください。
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all"
            >
              条件をすべて解除して全穴を表示
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {paginatedTsubos.map((tsubo) => {
              const matchReason = getMatchReason(tsubo, searchQuery);
              return (
                <div
                  key={tsubo.id}
                  id={`tsubo-card-${tsubo.codeLower}`}
                  className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-xs hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* ヘッダー */}
                    <div className="flex items-start justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E0D8C8] dark:border-[#263542] text-[#1E3D34] dark:text-[#74BA9E]">
                            {tsubo.code}
                          </span>
                          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                            {tsubo.meridianShort} / {tsubo.bodyPart}
                          </span>
                          {matchReason && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold border border-[#C5DED4] dark:border-[#2A5243]">
                              <Sparkles className="w-3 h-3" />
                              <span>{matchReason}</span>
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-1.5">
                          {tsubo.name} <span className="text-xs font-normal text-[#737C77] ml-1">{tsubo.kana}</span>
                        </h3>
                      </div>

                      <ClipButton
                        item={{
                          id: `tsubo-${tsubo.codeLower}`,
                          title: `${tsubo.name}（${tsubo.code}）`,
                          type: "tsubo",
                          points: [tsubo.name],
                          elements: [],
                          indications: tsubo.indications,
                          summary: tsubo.locationSimple,
                        }}
                      />
                    </div>

                    {/* 取穴場所・部位要約 */}
                    <div className="text-xs space-y-1.5">
                      <p className="text-[#333835] dark:text-[#C5D2DB] leading-relaxed line-clamp-2">
                        {tsubo.locationSimple}
                      </p>
                      <p className="text-xs text-[#737C77] dark:text-[#8899A6] font-mono truncate">
                        WHO: {tsubo.locationDetail}
                      </p>
                    </div>

                    {/* 要穴バッジ */}
                    {tsubo.categories && tsubo.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tsubo.categories.map((c, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] font-medium text-xs"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* コンテンツ整備状況バッジ */}
                    <div className="flex items-center gap-1.5 pt-0.5 text-xs">
                      {tsubo.hasDetailedAnatomy ? (
                        <span className="px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#1A332B] text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                          精密解剖図・詳細知見
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                          標準取穴情報
                        </span>
                      )}
                    </div>
                  </div>

                  {/* アクションボトムバー */}
                  <div className="pt-2.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tsubo/compare?a=${tsubo.codeLower}`}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] flex items-center gap-1 text-xs font-medium transition-colors"
                        title="この経穴を2穴比較ツールに追加"
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                        <span>比較</span>
                      </Link>
                      <Link
                        href={`/tsubo/practice?course=meridian_${tsubo.meridianId.toLowerCase()}`}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-[#59615D] dark:text-[#A0B0BC] hover:text-[#B86924] flex items-center gap-1 text-xs font-medium transition-colors"
                        title="この経脈をクイズで学習"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>学習</span>
                      </Link>
                    </div>

                    <Link
                      href={`/tsubo/${tsubo.codeLower}`}
                      className="px-3 py-1.5 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#1E3D34] hover:text-white dark:hover:bg-[#2B6958] font-bold inline-flex items-center gap-1 transition-all"
                    >
                      <span>{tsubo.hasDetailedAnatomy ? "詳細・解剖図" : "基本情報"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* テーブル表示モード */
          <div className="bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] dark:bg-[#10171F] border-b border-[#E8E1D1] dark:border-[#22303D] text-[#59615D] dark:text-[#A0B0BC] font-bold">
                    <th className="p-3 w-16">コード</th>
                    <th className="p-3 w-32">経穴名</th>
                    <th className="p-3 w-28">経脈 / 部位</th>
                    <th className="p-3 min-w-[200px]">取穴場所・骨性目印</th>
                    <th className="p-3 w-28">要穴</th>
                    <th className="p-3 w-24">解説</th>
                    <th className="p-3 w-28 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE0] dark:divide-[#22303D]">
                  {paginatedTsubos.map((t) => {
                    const matchReason = getMatchReason(t, searchQuery);
                    return (
                      <tr key={t.id} className="hover:bg-[#FAF8F5] dark:hover:bg-[#121920] transition-colors">
                        <td className="p-3 font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                          {t.code}
                        </td>
                        <td className="p-3">
                          <strong className="font-serif text-sm block">{t.name}</strong>
                          <span className="text-xs text-[#737C77]">{t.kana}</span>
                          {matchReason && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-[#EBF3EF] text-[#1E3D34] text-[11px] font-bold">
                              {matchReason}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="block font-medium">{t.meridianShort}</span>
                          <span className="text-xs text-[#737C77]">{t.bodyPart}</span>
                        </td>
                        <td className="p-3 text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                          <span className="line-clamp-2">{t.locationSimple}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-[#B86924] font-medium text-xs block">
                            {t.categories.join("、") || "—"}
                          </span>
                        </td>
                        <td className="p-3">
                          {t.hasDetailedAnatomy ? (
                            <span className="px-2 py-0.5 rounded bg-[#EBF3EF] text-[#1E3D34] font-bold text-xs">
                              精密解剖図
                            </span>
                          ) : (
                            <span className="text-xs text-[#737C77]">標準情報</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <Link
                            href={`/tsubo/${t.codeLower}`}
                            className="text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-bold inline-flex items-center gap-0.5 p-1"
                          >
                            <span>開く</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ページネーションコントロール */}
        {!isAllPages && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
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

            {/* ページ番号ボタン */}
            <div className="flex items-center gap-1 text-xs">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 7) {
                  if (currentPage > 4) {
                    pageNum = currentPage - 3 + i;
                    if (pageNum > totalPages) pageNum = totalPages - (6 - i);
                  }
                }
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

      {/* 7. 保存済み経穴（学習ノート復習セクション） */}
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

      {/* 8. 関連する基礎解説・配穴案内（下部） */}
      <section className="space-y-4 pt-4 border-t border-[#F2ECE0] dark:border-[#22303D]">
        <ClinicalPairsSection />
      </section>

    </div>
  );
}
