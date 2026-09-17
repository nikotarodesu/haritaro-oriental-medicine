"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  getAllAcupoints, 
  getPublishedAcupoints, 
  AcupointMaster, 
  MERIDIANS, 
  ACUPOINT_CATEGORIES, 
  BODY_REGIONS 
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
  GitCompare
} from "lucide-react";
import BodyMapSvg from "@/components/tsubo/BodyMapSvg";
import ClipButton from "@/components/ClipButton";
import ClinicalPairsSection from "@/components/ClinicalPairsSection";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

export default function TsuboPage() {
  const allPoints = useMemo(() => getAllAcupoints(), []);
  const publishedCount = useMemo(() => getPublishedAcupoints().length, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("すべて");
  const [selectedMeridian, setSelectedMeridian] = useState<string>("すべて");
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [onlyPublished, setOnlyPublished] = useState<boolean>(false);
  const [selectedTsubo, setSelectedTsubo] = useState<AcupointMaster | null>(null);

  const { memos } = useClinicalMemo();
  const savedTsuboMemos = useMemo(() => memos.filter((m) => m.type === "tsubo"), [memos]);

  // 部位ごとの経穴数を集計
  const pointCountsByPart = useMemo(() => {
    const counts: Record<string, number> = {};
    allPoints.forEach((p) => {
      counts[p.bodyPart] = (counts[p.bodyPart] || 0) + 1;
    });
    return counts;
  }, [allPoints]);

  // URLクエリ（?id=xxx または ?meridian=xxx または ?highlight=xxx）処理
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const targetId = params.get("id") || params.get("highlight");
      const targetMeridian = params.get("meridian");
      const targetBodyPart = params.get("bodyPart");

      if (targetMeridian) {
        setSelectedMeridian(targetMeridian);
      }
      if (targetBodyPart) {
        setSelectedBodyPart(targetBodyPart);
      }

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
    }
  }, [allPoints]);

  // 経絡リスト（全14経脈から動的生成）
  const meridianOptions = useMemo(() => {
    return ["すべて", ...MERIDIANS.map((m) => m.shortName)];
  }, []);

  // 要穴リスト
  const categoryOptions = useMemo(() => {
    return ["すべて", "原穴", "絡穴", "郄穴", "募穴", "背部兪穴", "合穴", "四総穴", "八脈交会穴", "八会穴"];
  }, []);

  // 検索・フィルタリング処理
  const filteredTsubos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase().replace(/\s+/g, " ");

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

        if (!query) return true;

        // コード完全一致
        if (t.codeLower === query || t.code.toLowerCase() === query) return true;

        // 名称・読み・別名
        if (t.name.includes(query) || t.kana.includes(query) || t.romaji.toLowerCase().includes(query)) return true;
        if (t.aliases?.some((a) => a.includes(query))) return true;

        // 主治・部位・臨床ノート
        if (t.indications.some((ind) => ind.toLowerCase().includes(query))) return true;
        if (t.locationSimple.includes(query) || t.locationDetail.includes(query)) return true;
        if (t.clinicalNote.includes(query)) return true;

        return false;
      })
      .sort((a, b) => {
        if (!query) {
          // 旗艦3穴を最上位に、次いで公開穴、その後に経絡順
          const flagshipCodes = ["LI4", "PC6", "ST36"];
          const aFlag = flagshipCodes.includes(a.code);
          const bFlag = flagshipCodes.includes(b.code);
          if (aFlag && !bFlag) return -1;
          if (!aFlag && bFlag) return 1;

          if (a.status === "published" && b.status !== "published") return -1;
          if (a.status !== "published" && b.status === "published") return 1;

          return a.meridianOrder - b.meridianOrder;
        }

        // 完全一致優先
        const aExact = a.name === query || a.codeLower === query;
        const bExact = b.name === query || b.codeLower === query;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        return 0;
      });
  }, [allPoints, searchQuery, selectedBodyPart, selectedMeridian, selectedCategory, onlyPublished]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBodyPart("すべて");
    setSelectedMeridian("すべて");
    setSelectedCategory("すべて");
    setOnlyPublished(false);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedBodyPart !== "すべて" ||
    selectedMeridian !== "すべて" ||
    selectedCategory !== "すべて" ||
    onlyPublished;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-8 sm:space-y-12">
      
      {/* 1. ページ名と短い説明、実際の収録状況 */}
      <section className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-6 sm:pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] tracking-widest uppercase">
          <Compass className="w-4 h-4" />
          <span>Acupoint Comprehensive Database</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
              十四経脈・経穴（ツボ）辞典
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-3xl leading-relaxed">
              「暗記だけでなく構造と関係から学ぶ」を軸にした図解学習データベース。身体のどこにあるかを人体図から直感的に探し、浅層から深層の断面構造と取穴手順、臨床配穴までを立体的に理解できます。
            </p>
          </div>

          {/* 実際の収録状況インジケーター */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-3 sm:p-4 text-xs shrink-0 space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#737C77] dark:text-[#8899A6]">総収録規格：</span>
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">WHO標準 361穴</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#737C77] dark:text-[#8899A6]">詳細・臨床知見公開：</span>
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{publishedCount} 穴 先行公開</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[10px] text-[#B86924] dark:text-[#E6C387]">
              <span>旗艦3穴（合谷・内関・足三里）：</span>
              <span className="font-bold">断面解剖モデル完備</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 名称・読み・コードで探せる検索欄（最優先配置） */}
      <section className="bg-[#FFFFFF] dark:bg-[#17212A] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-4 transition-colors">
        <div className="relative">
          <Search className="w-5 h-5 text-[#8A948F] dark:text-[#6A7C8B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ツボ名（合谷、ごうこく、LI4）、症状（頭痛、胃痛、不眠）、部位、別名..."
            className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border border-[#D5CCBC] dark:border-[#2D3E50] bg-[#FAF8F5] dark:bg-[#121920] focus:bg-[#FFFFFF] dark:focus:bg-[#1A2530] focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] focus:ring-2 focus:ring-[#1E3D34]/20 text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] placeholder-[#8A948F] dark:placeholder-[#6A7C8B] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8A948F] hover:text-[#232826] dark:hover:text-[#FAF8F5] p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* 絞り込みタグ・クイックトグル */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-[#59615D] dark:text-[#A0B0BC]">
              <input
                type="checkbox"
                checked={onlyPublished}
                onChange={(e) => setOnlyPublished(e.target.checked)}
                className="rounded border-[#D5CCBC] text-[#1E3D34] focus:ring-[#1E3D34] w-4 h-4"
              />
              <span className="font-medium">詳細解説・臨床知見のある経穴（{publishedCount}穴）のみ</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>すべての絞り込みをリセット</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. 身体の部位を選べる人体図 */}
      <section>
        <BodyMapSvg
          selectedBodyPart={selectedBodyPart}
          onSelectBodyPart={(part) => setSelectedBodyPart(part)}
          pointCountsByPart={pointCountsByPart}
        />
      </section>

      {/* 4. 「経絡から探す」「要穴から探す」「比較・復習」への入口 */}
      <section className="bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-7 shadow-xs space-y-5 transition-colors">
        
        {/* 上段：学習・機能リンク（比較・復習・骨度法） */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4 border-b border-[#F2ECE0] dark:border-[#22303D]">
          <Link
            href="/tsubo/compare"
            className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E5DEC9] dark:border-[#263542] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center">
                <GitCompare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                  2穴比較ツール
                </span>
                <p className="text-[10px] text-[#737C77] dark:text-[#8899A6]">合谷×太衝など左右・近隣穴比較</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#737C77] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/tsubo/practice"
            className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E5DEC9] dark:border-[#263542] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387]">
                  経穴クイズ・復習
                </span>
                <p className="text-[10px] text-[#737C77] dark:text-[#8899A6]">名称隠し・要穴分類の暗記確認</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#737C77] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/tsubo/basics/bone-cun"
            className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E5DEC9] dark:border-[#263542] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#17212A] text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D]">
                  骨度法・取穴の基礎
                </span>
                <p className="text-[10px] text-[#737C77] dark:text-[#8899A6]">同身寸・骨性目印の読み方</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#737C77] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 経絡別フィルターボタン群 */}
        <div className="space-y-2">
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

        {/* 要穴別フィルターボタン群 */}
        <div className="space-y-2 pt-1">
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
      </section>

      {/* 5. 検索結果・経穴一覧グリッド */}
      <section className="space-y-4">
        {/* 結果サマリーバー */}
        <div className="flex items-center justify-between text-xs text-[#59615D] dark:text-[#96A6B2] px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span>該当件数: <strong className="text-[#1E3D34] dark:text-[#74BA9E] text-base">{filteredTsubos.length}</strong> 穴</span>
            {selectedBodyPart !== "すべて" && (
              <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px]">
                部位: {selectedBodyPart}
              </span>
            )}
            {selectedMeridian !== "すべて" && (
              <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px]">
                経絡: {selectedMeridian}
              </span>
            )}
            {selectedCategory !== "すべて" && (
              <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px]">
                要穴: {selectedCategory}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#B86924] dark:text-[#E6C387] hover:underline"
            >
              条件をリセット
            </button>
          )}
        </div>

        {/* 0件ヒット時のガイド */}
        {filteredTsubos.length === 0 ? (
          <div className="py-16 text-center bg-[#FAF8F5] dark:bg-[#15202B] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-8 space-y-4">
            <HelpCircle className="w-12 h-12 text-[#8A948F] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              該当する経穴が見つかりませんでした
            </h3>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] max-w-md mx-auto leading-relaxed">
              検索ワードの綴り（ひらがな・漢字・コード）をご確認いただくか、絞り込み条件（部位・経絡・要穴）を「すべて」に戻してお試しください。
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold hover:bg-[#162E27] transition-all"
            >
              検索条件をすべてリセットする
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTsubos.map((tsubo) => (
              <div
                key={tsubo.id}
                id={`tsubo-card-${tsubo.codeLower}`}
                className={`bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border transition-all flex flex-col justify-between group scroll-mt-24 p-4 sm:p-6 ${
                  tsubo.hasDetailedAnatomy
                    ? "border-[#1E3D34]/40 dark:border-[#74BA9E]/40 shadow-xs hover:border-[#1E3D34] dark:hover:border-[#74BA9E]"
                    : "border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76]"
                } hover:shadow-md`}
              >
                <div>
                  {/* ヘッダー情報 */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                        {tsubo.code}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-[#59615D] dark:text-[#96A6B2]">
                        {tsubo.bodyPart}
                      </span>
                      {tsubo.hasDetailedAnatomy && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FCF4EB] text-[#B86924] font-bold border border-[#F3DEC5]">
                          断面図
                        </span>
                      )}
                    </div>
                    <ClipButton
                      item={{
                        id: `tsubo-${tsubo.id}`,
                        type: "tsubo",
                        title: `${tsubo.name}（${tsubo.code}）`,
                        subTitle: `${tsubo.meridian} | ${tsubo.bodyPart}`,
                        points: [tsubo.name],
                        elements: [],
                        indications: tsubo.indications,
                        summary: tsubo.clinicalNote,
                        caution: tsubo.caution,
                      }}
                      variant="icon"
                      size="sm"
                    />
                  </div>

                  {/* 経穴名 ＆ 個別リンク */}
                  <div className="mb-2">
                    <Link
                      href={`/tsubo/${tsubo.codeLower}`}
                      className="group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors inline-block"
                    >
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                          {tsubo.name}
                        </h3>
                        <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">{tsubo.kana}</span>
                        <span className="text-[11px] font-mono text-[#8A948F] dark:text-[#6A7C8B]">
                          ({tsubo.romaji})
                        </span>
                      </div>
                    </Link>
                    <div className="text-xs font-medium text-[#1E3D34] dark:text-[#74BA9E] mt-0.5">
                      {tsubo.meridian}
                    </div>
                  </div>

                  {/* 要穴バッジ */}
                  {tsubo.categories && tsubo.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tsubo.categories.map((c, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 取穴法（一般向け） */}
                  <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#E8E1D1] dark:border-[#263542] mb-3">
                    <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] block mb-0.5">
                      【場所の目安】
                    </span>
                    <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed line-clamp-2">
                      {tsubo.locationSimple}
                    </p>
                  </div>

                  {/* 主治・効能 */}
                  <div className="space-y-1 mb-4">
                    <div className="flex flex-wrap gap-1">
                      {tsubo.indications.slice(0, 4).map((ind, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-[#F2EDE4] dark:bg-[#1E2B36] text-[#232826] dark:text-[#E6EFEA]"
                        >
                          {ind}
                        </span>
                      ))}
                      {tsubo.indications.length > 4 && (
                        <span className="text-[10px] text-[#737C77] self-center">
                          +{tsubo.indications.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 下部アクション：個別ページへのリンク（主導線） */}
                <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-2">
                  <Link
                    href={`/tsubo/${tsubo.codeLower}`}
                    className="w-full py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] hover:bg-[#162E27] dark:hover:bg-[#225345] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-xs"
                  >
                    <span>取穴・解剖・詳細ページを見る</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedTsubo(tsubo)}
                    className="w-full py-1.5 text-center text-[11px] text-[#737C77] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#74BA9E]"
                  >
                    ポップアップで簡易プレビュー
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. 保存した経穴・マイカルテ案内 */}
      {savedTsuboMemos.length > 0 && (
        <section className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                保存した経穴（マイカルテ連携）
              </h3>
            </div>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
              {savedTsuboMemos.length} 件保存中
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {savedTsuboMemos.slice(0, 4).map((m) => {
              const cleanCode = m.title.match(/（([A-Z0-9]+)）/)?.[1] || "";
              return (
                <Link
                  key={m.id}
                  href={`/tsubo/${cleanCode.toLowerCase()}`}
                  className="p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs transition-all space-y-1 block"
                >
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block truncate">
                    {m.title}
                  </span>
                  <p className="text-[10px] text-[#737C77] dark:text-[#8899A6] line-clamp-1">
                    {m.summary}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. 関連する学術特集 ＆ 臨床名配穴 */}
      <section className="space-y-8 pt-4 border-t border-[#E8E1D1] dark:border-[#22303D]">
        {/* 臨床名配穴 */}
        <div>
          <div className="mb-4">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              臨床名配穴（古典相応ペア）
            </h2>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5">
              単穴にとどまらず、相乗作用を発揮する臨床必須のペア処方
            </p>
          </div>
          <ClinicalPairsSection />
        </div>

        {/* 経絡・経穴の科学的機序を深掘りする講義録バナー */}
        <div className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                学術特集：経絡とツボ（経穴）の科学的機序を学ぶ
              </h3>
            </div>
            <Link
              href="/articles"
              className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
            >
              <span>知見・論文アーカイブ一覧へ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/articles?article=science-of-meridians-network"
              className="bg-[#FFFFFF] dark:bg-[#1A2632] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#8A948F] dark:text-[#6A7C8B]">論文考証</span>
                <h4 className="font-sans text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] leading-relaxed">
                  【経絡の科学】多層生体情報ネットワーク仮説
                </h4>
              </div>
              <div className="pt-2.5 mt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
                <span>記事を読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/articles?article=science-of-acupoints-mechanotransduction"
              className="bg-[#FFFFFF] dark:bg-[#1A2632] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#8A948F] dark:text-[#6A7C8B]">生物物理学</span>
                <h4 className="font-sans text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] leading-relaxed">
                  【経穴の科学】ツボの物理的実体 ― メカノトランスダクション
                </h4>
              </div>
              <div className="pt-2.5 mt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#B86924] dark:text-[#E6C387] font-semibold">
                <span>記事を読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/articles?article=science-of-acupuncture-neuroscience"
              className="bg-[#FFFFFF] dark:bg-[#1A2632] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#8A948F] dark:text-[#6A7C8B]">神経科学</span>
                <h4 className="font-sans text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] leading-relaxed">
                  【鍼灸の科学】生体情報制御学としての鍼灸医学
                </h4>
              </div>
              <div className="pt-2.5 mt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
                <span>記事を読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 簡易プレビューモーダル（ポップアップ） */}
      {selectedTsubo && (
        <div className="fixed inset-0 z-50 bg-[#232826]/70 dark:bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FAF8F5] dark:bg-[#16212B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] max-w-xl w-full max-h-[85vh] overflow-y-auto p-5 sm:p-7 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setSelectedTsubo(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EBE4D5] dark:hover:bg-[#202E3C] text-[#59615D] dark:text-[#A0B0BC] transition-colors"
            >
              ✕
            </button>

            <div className="pr-8 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] dark:bg-[#2B6958] text-white">
                  {selectedTsubo.code}
                </span>
                <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                  {selectedTsubo.meridian}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                {selectedTsubo.name} <span className="text-sm font-normal text-[#59615D]">{selectedTsubo.kana}</span>
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#10171F] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1 text-xs">
              <strong className="text-[#1E3D34] dark:text-[#74BA9E] block">場所の目安：</strong>
              <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">{selectedTsubo.locationSimple}</p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#10171F] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1 text-xs font-mono">
              <strong className="text-[#1E2D3D] dark:text-[#7BAAD8] block">WHO標準取穴部位：</strong>
              <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">{selectedTsubo.locationDetail}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href={`/tsubo/${selectedTsubo.codeLower}`}
                className="flex-1 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold text-center hover:bg-[#162E27] transition-all flex items-center justify-center gap-1.5"
              >
                <span>断面解剖・取穴手順の個別ページを開く</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedTsubo(null)}
                className="px-4 py-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs font-medium hover:bg-[#EBE4D5] dark:hover:bg-[#1E2B38]"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
