"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Split, 
  ArrowLeft, 
  Search, 
  X, 
  Bookmark, 
  Check, 
  Sparkles, 
  Plus, 
  AlertTriangle,
  BookOpen,
  Printer,
  Crown
} from "lucide-react";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

// おすすめ比較プリセット
const PRESET_TSUBO_COMPARISONS = [
  {
    name: "四関穴の対比（合谷 vs 太衝）",
    tsuboCodes: ["LI4", "LR3"],
    desc: "手陽明大腸経（気・昇）と足厥陰肝経（血・降）の原穴対比。全身の気血巡行を司る2大原穴。"
  },
  {
    name: "下肢の2大補益穴（足三里 vs 三陰交）",
    tsuboCodes: ["ST36", "SP6"],
    desc: "胃の合穴（後天の本・気虚改善）と足三陰の交会穴（血虚・婦人科疾患）の使い分け。"
  },
  {
    name: "心胸・自律神経の要穴（内関 vs 神門）",
    tsuboCodes: ["PC6", "HT7"],
    desc: "心包経の絡穴（胸肋・胃腸・動悸の降気）と心経の原穴（心神安寧・不眠・健忘の鎮静）。"
  },
  {
    name: "腰背部痛の2大要穴（委中 vs 腎兪）",
    tsuboCodes: ["BL40", "BL23"],
    desc: "四総穴「腰背は委中に留む」（急性・瘀血・合穴）と腎の背部兪穴（慢性・腎虚腰痛）の比較。"
  }
];

function TsuboCompareContent() {
  const searchParams = useSearchParams();
  const { addMemo } = useClinicalMemo();
  const { isPremium } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSwapTsubo, setPendingSwapTsubo] = useState<Tsubo | null>(null);
  const [targetReplaceIndex, setTargetReplaceIndex] = useState<number | null>(null);

  // 初期値：URLクエリパラメータ（?a=lu1&b=li4 など）を優先
  const [selectedCodes, setSelectedCodes] = useState<string[]>(() => {
    const aParam = searchParams.get("a") || searchParams.get("code");
    const bParam = searchParams.get("b");
    const cParam = searchParams.get("c");

    const resolved: string[] = [];
    [aParam, bParam, cParam].forEach(param => {
      if (!param) return;
      const clean = param.trim().toLowerCase();
      const match = TSUBOS.find(
        t => t.code.toLowerCase() === clean || t.id.toLowerCase() === clean
      );
      if (match && !resolved.includes(match.code)) {
        resolved.push(match.code);
      }
    });

    if (resolved.length > 0) {
      return resolved;
    }
    // デフォルトで合谷(LI4)と太衝(LR3)
    return ["LI4", "LR3"];
  });
  const [saved, setSaved] = useState(false);

  // URLパラメータが動的に変化した際にも追従
  useEffect(() => {
    const aParam = searchParams.get("a") || searchParams.get("code");
    const bParam = searchParams.get("b");
    const cParam = searchParams.get("c");

    if (!aParam && !bParam && !cParam) return;

    const resolved: string[] = [];
    [aParam, bParam, cParam].forEach(param => {
      if (!param) return;
      const clean = param.trim().toLowerCase();
      const match = TSUBOS.find(
        t => t.code.toLowerCase() === clean || t.id.toLowerCase() === clean
      );
      if (match && !resolved.includes(match.code)) {
        resolved.push(match.code);
      }
    });

    if (resolved.length > 0) {
      // 無料会員は最大2穴までに切り詰め
      const limited = !isPremium && resolved.length > 2 ? resolved.slice(0, 2) : resolved;
      setSelectedCodes(limited);
    }
  }, [searchParams, isPremium]);

  // 選択されているツボの配列
  const selectedTsubos: Tsubo[] = useMemo(() => {
    return selectedCodes
      .map(code => TSUBOS.find(t => t.code === code))
      .filter((t): t is Tsubo => Boolean(t));
  }, [selectedCodes]);

  // 検索ヒットツボ一覧
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return TSUBOS.filter(t => 
      t.name.includes(q) || 
      t.kana.includes(q) || 
      t.code.toLowerCase().includes(q) ||
      t.meridian.includes(q)
    ).slice(0, 10);
  }, [searchQuery]);

  // ツボの追加・入れ替えハンドラー
  const handleSelectTsubo = (tsubo: Tsubo) => {
    if (selectedCodes.includes(tsubo.code)) return;

    // 特定の列の「変更」から指定された場合
    if (targetReplaceIndex !== null && targetReplaceIndex < selectedCodes.length) {
      const updated = [...selectedCodes];
      updated[targetReplaceIndex] = tsubo.code;
      setSelectedCodes(updated);
      setTargetReplaceIndex(null);
      setSearchQuery("");
      setSaved(false);
      return;
    }

    // 無料枠で既に2穴選ばれている場合：入れ替え選択ダイアログを表示
    if (!isPremium && selectedCodes.length >= 2) {
      setPendingSwapTsubo(tsubo);
      return;
    }

    // プレミアム会員で既に3穴選ばれている場合：入れ替え選択ダイアログを表示
    if (isPremium && selectedCodes.length >= 3) {
      setPendingSwapTsubo(tsubo);
      return;
    }

    // 空き枠がある場合はそのまま追加
    setSelectedCodes([...selectedCodes, tsubo.code]);
    setSearchQuery("");
    setSaved(false);
  };

  // ツボの削除
  const handleRemoveTsubo = (code: string) => {
    setSelectedCodes(selectedCodes.filter(c => c !== code));
    setTargetReplaceIndex(null);
    setSaved(false);
  };

  // プリセット適用
  const handleApplyPreset = (codes: string[]) => {
    setSelectedCodes(codes);
    setTargetReplaceIndex(null);
    setSaved(false);
  };

  // カルテに保存（プレミアム限定）
  const handleSaveToMemo = () => {
    if (!isPremium) {
      setAuthModalOpen(true);
      return;
    }
    const names = selectedTsubos.map(t => t.name).join(" vs ");
    addMemo({
      id: `tsubo-compare-${Date.now()}`,
      type: "pair",
      title: `【経穴比較】${names}`,
      subTitle: selectedTsubos.map(t => `${t.name}(${t.code})`).join("、 "),
      points: selectedTsubos.map(t => t.name),
      elements: ["木", "金"],
      indications: Array.from(new Set(selectedTsubos.flatMap(t => t.indications))).slice(0, 5),
      summary: selectedTsubos.map(t => `【${t.name}】${t.clinicalNote}`).join("\n"),
      mechanism: selectedTsubos.map(t => `【${t.name}】${t.meridian}（要穴: ${t.category?.join("・") || "特記なし"}）`).join(" / "),
      personalNotes: `経穴比較ツールにて対比 (${new Date().toLocaleDateString("ja-JP")})`
    });
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ヒーローセクション */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-10 sm:py-14 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243]">
              <Split className="w-3.5 h-3.5" />
              <span>経穴横並び比較マトリクス</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#151D25] text-[#737C77] dark:text-[#8899A6] border border-[#E5DEC9] dark:border-[#2A3B4A]">
              全361穴から最大3穴を厳密対比
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                経穴（ツボ）比較ツール
              </h1>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-2xl leading-relaxed">
                似た効能を持つツボや、相反する経絡のツボを2〜3穴並べて、取穴法・五行・要穴区分・臨床の作用機序の違いを徹底比較できます。
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs font-bold hover:bg-[#FAF8F5] transition-colors"
              >
                <Printer className="w-4 h-4 text-blue-600" />
                <span>比較表を印刷</span>
              </button>
              <button
                onClick={handleSaveToMemo}
                disabled={saved || selectedTsubos.length === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B86924] hover:bg-[#9B551B] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                <span>{saved ? "学習ノートに保存済" : "比較結果を学習ノート保存"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* 比較プリセット */}
        <div className="space-y-2 print:hidden">
          <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
            代表的な経穴比較セット:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_TSUBO_COMPARISONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.tsuboCodes)}
                className="text-left p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] transition-all space-y-1"
              >
                <span className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5] block">
                  {preset.name}
                </span>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6] line-clamp-2">
                  {preset.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ツボ検索・追加バー */}
        <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 shadow-sm space-y-3 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                比較するツボ（現在: {selectedTsubos.length} / {isPremium ? "最大3穴" : "2穴・無料枠"}）
              </span>
              {!isPremium && selectedTsubos.length >= 2 && (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E] hover:opacity-90 transition-opacity"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>3穴同時比較はプレミアム</span>
                </button>
              )}
            </div>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
              ツボ名（太衝、足三里など）やコード（LR3, ST36）で検索
            </span>
          </div>

          {/* 列変更中インジケーター */}
          {targetReplaceIndex !== null && selectedTsubos[targetReplaceIndex] && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-xs">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                第{targetReplaceIndex + 1}列「{selectedTsubos[targetReplaceIndex].name}（{selectedTsubos[targetReplaceIndex].code}）」を変更中：下から入れ替えたい経穴を選択してください
              </span>
              <button
                type="button"
                onClick={() => setTargetReplaceIndex(null)}
                className="px-2 py-0.5 rounded text-xs text-[#737C77] hover:text-[#232826] font-bold"
              >
                キャンセル
              </button>
            </div>
          )}

          <div className="relative">
            <Search className="w-4 h-4 text-[#8A948F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="compare-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ツボ名、読みがな、経穴コードで検索して追加・入れ替え..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] placeholder-[#8A948F] focus:outline-none focus:border-[#B86924]"
            />
          </div>

          {/* 検索候補ドロップダウン */}
          {searchResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50">
              {searchResults.map(t => {
                const isAlreadySelected = selectedCodes.includes(t.code);
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTsubo(t)}
                    disabled={isAlreadySelected}
                    className={`p-2.5 rounded-xl text-left border text-xs flex items-center justify-between transition-all ${
                      isAlreadySelected
                        ? "opacity-50 border-dashed border-[#E5DEC9] cursor-not-allowed"
                        : "bg-[#FAF8F5] dark:bg-[#151D25] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924]"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">{t.name}</span>
                      <span className="text-xs text-[#737C77]">{t.code} / {t.meridianShort}</span>
                    </div>
                    {!isAlreadySelected && <Plus className="w-3.5 h-3.5 text-[#B86924]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 横並び比較マトリクステーブル */}
        <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] overflow-hidden shadow-sm">
          {selectedTsubos.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#737C77]">
              比較するツボが選択されていません。上部のプリセットまたは検索から追加してください。
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF8F5] dark:bg-[#131B22] border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
                    <th className="p-4 w-32 sm:w-44 font-bold text-[#737C77] dark:text-[#8899A6]">
                      比較項目
                    </th>
                    {selectedTsubos.map((t, idx) => (
                      <th key={t.id} className="p-4 border-l border-[#E5DEC9] dark:border-[#2A3B4A] min-w-[260px]">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] block">
                                {t.name}
                              </span>
                              <span className="text-xs text-[#B86924] dark:text-[#E6C387] font-bold">
                                {t.code} ({t.kana})
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveTsubo(t.code)}
                              className="p-1.5 rounded-lg text-[#737C77] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors print:hidden"
                              title="比較から外す"
                              aria-label={`${t.name}を比較から外す`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* 列操作アクションバー（変更・詳細・外す） */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#F2ECE0] dark:border-[#22303D] print:hidden">
                            <button
                              type="button"
                              onClick={() => {
                                setTargetReplaceIndex(idx);
                                const input = document.getElementById("compare-search-input");
                                input?.focus();
                                input?.scrollIntoView({ behavior: "smooth", block: "center" });
                              }}
                              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                                targetReplaceIndex === idx
                                  ? "bg-[#1E3D34] text-white border-[#1E3D34]"
                                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:border-[#1E3D34]"
                              }`}
                            >
                              {targetReplaceIndex === idx ? "変更中（検索して選択）" : "この経穴を変更"}
                            </button>

                            <Link
                              href={`/tsubo/${t.code.toLowerCase()}`}
                              target="_blank"
                              className="px-2.5 py-1 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-xs font-medium text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] transition-colors"
                            >
                              詳細を見る ↗
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleRemoveTsubo(t.code)}
                              className="px-2 py-1 rounded-lg text-xs text-[#737C77] hover:text-red-600 hover:underline"
                            >
                              外す
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DEC9] dark:divide-[#2A3B4A]">
                  
                  {/* 所属経絡 */}
                  <tr>
                    <td className="p-4 font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5]/40 dark:bg-[#131B22]/40">
                      所属経絡
                    </td>
                    {selectedTsubos.map(t => (
                      <td key={t.id} className="p-4 border-l border-[#E5DEC9] dark:border-[#2A3B4A]">
                        <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{t.meridian}</span>
                        <span className="text-xs text-[#737C77] block mt-0.5">部位: {t.bodyPart}</span>
                      </td>
                    ))}
                  </tr>

                  {/* 要穴区分 */}
                  <tr>
                    <td className="p-4 font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5]/40 dark:bg-[#131B22]/40">
                      要穴・特異性
                    </td>
                    {selectedTsubos.map(t => (
                      <td key={t.id} className="p-4 border-l border-[#E5DEC9] dark:border-[#2A3B4A]">
                        {t.category && t.category.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {t.category.map((cat, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] font-bold border border-[#F3DEC5] dark:border-[#4A321E]">
                                {cat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[#737C77]">特記なし</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* 取穴法（骨度法・解剖） */}
                  <tr>
                    <td className="p-4 font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5]/40 dark:bg-[#131B22]/40">
                      取穴法（場所）
                    </td>
                    {selectedTsubos.map(t => (
                      <td key={t.id} className="p-4 border-l border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                        <p className="text-xs text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                          {t.locationSimple}
                        </p>
                        <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] leading-relaxed pt-1 border-t border-[#E5DEC9]/40">
                          {t.locationDetail}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* 主治・適応症 */}
                  <tr>
                    <td className="p-4 font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5]/40 dark:bg-[#131B22]/40">
                      主治病証・適応
                    </td>
                    {selectedTsubos.map(t => (
                      <td key={t.id} className="p-4 border-l border-[#E5DEC9] dark:border-[#2A3B4A]">
                        <div className="flex flex-wrap gap-1">
                          {t.indications.map((ind, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#151D25] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* 臨床知見（ワンポイント） */}
                  <tr>
                    <td className="p-4 font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5]/40 dark:bg-[#131B22]/40">
                      臨床知見・作用機序
                    </td>
                    {selectedTsubos.map(t => (
                      <td key={t.id} className="p-4 border-l border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                        {t.clinicalNote}
                      </td>
                    ))}
                  </tr>

                  {/* 注意・禁忌 */}
                  <tr>
                    <td className="p-4 font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5]/40 dark:bg-[#131B22]/40">
                      禁忌・安全深度
                    </td>
                    {selectedTsubos.map(t => (
                      <td key={t.id} className="p-4 border-l border-[#E5DEC9] dark:border-[#2A3B4A] text-xs">
                        {t.caution ? (
                          <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            {t.caution}
                          </span>
                        ) : (
                          <span className="text-green-700 dark:text-green-400">標準的刺灸が可能</span>
                        )}
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* 経穴入れ替え選択モーダル（2穴選択済み時に新しい経穴を追加しようとした場合） */}
      {pendingSwapTsubo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#17212A] rounded-3xl max-w-md w-full p-6 border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                比較する経穴の入れ替え
              </h3>
              <button
                type="button"
                onClick={() => setPendingSwapTsubo(null)}
                className="p-1.5 rounded-lg text-[#737C77] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              新しく「<strong className="text-[#1E3D34] dark:text-[#74BA9E]">{pendingSwapTsubo.name}（{pendingSwapTsubo.code}）</strong>」を追加します。どちらの経穴と入れ替えますか？
            </p>

            <div className="space-y-2 pt-1">
              {selectedTsubos.map((current, idx) => (
                <button
                  key={current.id}
                  type="button"
                  onClick={() => {
                    const updated = [...selectedCodes];
                    updated[idx] = pendingSwapTsubo.code;
                    setSelectedCodes(updated);
                    setPendingSwapTsubo(null);
                    setSearchQuery("");
                    setSaved(false);
                  }}
                  className="w-full p-3.5 rounded-2xl border border-[#D8CFC0] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:bg-[#FAF8F5] dark:hover:bg-[#1f2c38] text-left flex items-center justify-between transition-all group"
                >
                  <div>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6] block">
                      {idx === 0 ? "左の経穴" : idx === 1 ? "右の経穴" : `第${idx + 1}の経穴`}と入れ替え
                    </span>
                    <strong className="font-serif text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {current.name}（{current.code}）
                    </strong>
                  </div>
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] group-hover:underline">
                    入れ替える ➜
                  </span>
                </button>
              ))}

              {!isPremium && (
                <button
                  type="button"
                  onClick={() => {
                    setPendingSwapTsubo(null);
                    setAuthModalOpen(true);
                  }}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#FCF4EB] to-[#F7E8D8] dark:from-[#2A1E14] dark:to-[#382618] border border-[#F2DEB0] dark:border-[#4A321E] text-left flex items-center justify-between transition-all hover:opacity-95"
                >
                  <div className="flex items-center gap-2.5">
                    <Crown className="w-5 h-5 text-[#B86924] dark:text-[#E6C387] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">
                        3穴を同時に横並び比較する
                      </span>
                      <span className="text-xs text-[#737C77] dark:text-[#A0B0BC]">
                        プレミアムプランで最大3穴まで同時比較可能
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] shrink-0">
                    案内 ➜
                  </span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex justify-end">
              <button
                type="button"
                onClick={() => setPendingSwapTsubo(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#737C77] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="3穴同時精密比較 ＆ 学習ノート保存"
        description="全361穴からの3穴同時横並び精密比較、および比較結果の学習ノート保存はプレミアム会員限定機能です。"
      />
    </div>
  );
}

export default function TsuboComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-center text-sm text-[#737C77]">経穴比較データを読み込み中...</div>}>
      <TsuboCompareContent />
    </Suspense>
  );
}
