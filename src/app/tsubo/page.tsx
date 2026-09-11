"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";
import { Compass, Search, Filter, AlertTriangle, BookOpen, Sparkles, Check, ArrowRight } from "lucide-react";
import ClinicalPairsSection from "@/components/ClinicalPairsSection";
import ClipButton from "@/components/ClipButton";

const getMeridianElement = (meridian: string): ("木" | "火" | "土" | "金" | "水")[] => {
  if (meridian.includes("肝") || meridian.includes("胆")) return ["木"];
  if (meridian.includes("心") || meridian.includes("小腸") || meridian.includes("三焦")) return ["火"];
  if (meridian.includes("脾") || meridian.includes("胃")) return ["土"];
  if (meridian.includes("肺") || meridian.includes("大腸")) return ["金"];
  if (meridian.includes("腎") || meridian.includes("膀胱")) return ["水"];
  return [];
};

export default function TsuboPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("すべて");
  const [selectedMeridian, setSelectedMeridian] = useState<string>("すべて");
  const [selectedTsubo, setSelectedTsubo] = useState<Tsubo | null>(null);

  const bodyParts = ["すべて", "頭部・顔面", "首・肩", "背中・腰", "手・腕", "足・脚", "胸・腹"];
  const meridians = [
    "すべて",
    "大腸経",
    "胃経",
    "肝経",
    "脾経",
    "心包経",
    "督脈",
    "任脈",
    "膀胱経",
    "腎経"
  ];

  const filteredTsubos = useMemo(() => {
    return TSUBOS.filter((t) => {
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        t.name.includes(query) ||
        t.kana.includes(query) ||
        t.romaji.toLowerCase().includes(query) ||
        t.code.toLowerCase().includes(query) ||
        t.indications.some((ind) => ind.includes(query)) ||
        t.locationSimple.includes(query) ||
        t.locationDetail.includes(query);

      const matchBodyPart = selectedBodyPart === "すべて" || t.bodyPart === selectedBodyPart;
      const matchMeridian = selectedMeridian === "すべて" || t.meridianShort === selectedMeridian;

      return matchQuery && matchBodyPart && matchMeridian;
    });
  }, [searchQuery, selectedBodyPart, selectedMeridian]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* ページ見出し */}
      <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] tracking-widest uppercase mb-2">
          <Compass className="w-4 h-4" />
          <span>Acupoint Comprehensive Database</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          十四経脈・経穴（ツボ）辞典
        </h1>
        <p className="mt-2 text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-3xl leading-relaxed">
          WHO標準361経穴に対応する基幹データベースです。一般向けの分かりやすい取穴法から、専門家向けの骨度法・解剖学的取穴、臨床での配穴・ワンポイント知見、禁忌事項まで網羅しています。
        </p>
      </div>

      {/* 臨床名配穴 */}
      <ClinicalPairsSection />

      {/* 経絡・経穴の科学的機序を深掘りする講義録バナー */}
      <div className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h2 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              学術特集：経絡とツボ（経穴）の科学的機序を学ぶ
            </h2>
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
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#162A24] text-[#1E3D34] dark:text-[#74BA9E]">
                  第187講 統合講義
                </span>
                <span className="text-[11px] text-[#8A948F] dark:text-[#6A7C8B]">約 15分</span>
              </div>
              <h3 className="font-sans text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【経絡の科学】経絡とは何か ― 多層生体情報ネットワーク仮説
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                「気の通り道」を神経反射・筋膜経線（アナトミートレイン）・流体力学モデル・脳機能画像（fMRI）から自然科学の言葉で再定義。
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>講義を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/articles?article=science-of-acupoints-mechanotransduction"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                  第188講 統合講義
                </span>
                <span className="text-[11px] text-[#8A948F] dark:text-[#6A7C8B]">約 16分</span>
              </div>
              <h3 className="font-sans text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors leading-relaxed tracking-normal">
                【経穴の科学】ツボの物理的実体 ― メカノトランスダクション
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                筋膜の力学変形からATP放出・TRPチャネル活性化・微小炎症・局所免疫・神経血管束に至るツボの生物物理学的実体を解明。
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#B86924] dark:text-[#E6C387] font-semibold">
              <span>講義を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/articles?article=science-of-acupuncture-neuroscience"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#162A24] text-[#1E3D34] dark:text-[#74BA9E]">
                  第192-199講 統合
                </span>
                <span className="text-[11px] text-[#8A948F] dark:text-[#6A7C8B]">約 25分</span>
              </div>
              <h3 className="font-sans text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【鍼灸の科学】生体情報制御学としての鍼灸医学
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                ゲート制御・下行性疼痛抑制系（PAG-RVM）・自律神経HRV・迷走神経炎症反射・刺激パラメータとEBMを統合。
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>講義を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* 検索・絞り込みバー */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-6 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-5 transition-colors">
        {/* キーワード入力 */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#8A948F] dark:text-[#6A7C8B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ツボ名（合谷、ごうこく、LI4）、症状（頭痛、胃痛、不眠）、部位など..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#D5CCBC] dark:border-[#2D3E50] bg-[#FAF8F5] dark:bg-[#121920] focus:bg-[#FFFFFF] dark:focus:bg-[#1A2530] focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#4E8C76] focus:ring-1 focus:ring-[#1E3D34] dark:focus:ring-[#4E8C76] text-sm text-[#232826] dark:text-[#E6EFEA] placeholder-[#8A948F] dark:placeholder-[#6A7C8B] transition-all"
          />
        </div>

        {/* フィルタータグ群 */}
        <div className="space-y-3 pt-2">
          {/* 部位 */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#59615D] dark:text-[#96A6B2] mr-2">身体部位:</span>
            {bodyParts.map((part) => (
              <button
                key={part}
                onClick={() => setSelectedBodyPart(part)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedBodyPart === part
                    ? "bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] border-[#1E3D34] dark:border-[#2B6958] font-medium shadow-sm"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#404743] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                }`}
              >
                {part}
              </button>
            ))}
          </div>

          {/* 経絡 */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#59615D] dark:text-[#96A6B2] mr-2">所属経絡:</span>
            {meridians.map((mer) => (
              <button
                key={mer}
                onClick={() => setSelectedMeridian(mer)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedMeridian === mer
                    ? "bg-[#1E2D3D] dark:bg-[#375573] text-[#FAF8F5] border-[#1E2D3D] dark:border-[#375573] font-medium shadow-sm"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#404743] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#EDF3F8] dark:hover:bg-[#1B2936]"
                }`}
              >
                {mer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 検索結果サマリー */}
      <div className="flex items-center justify-between text-xs text-[#59615D] dark:text-[#96A6B2] px-1">
        <span>該当件数: <strong className="text-[#1E3D34] dark:text-[#74BA9E] text-sm">{filteredTsubos.length}</strong> 件</span>
        {(searchQuery || selectedBodyPart !== "すべて" || selectedMeridian !== "すべて") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedBodyPart("すべて");
              setSelectedMeridian("すべて");
            }}
            className="text-[#B86924] dark:text-[#E6C387] hover:underline"
          >
            条件をリセット
          </button>
        )}
      </div>

      {/* ツボ一覧グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTsubos.map((tsubo) => (
          <div
            key={tsubo.id}
            className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all flex flex-col justify-between group"
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
                  <span className="text-xs font-medium text-[#1E2D3D] dark:text-[#7BAAD8]">{tsubo.meridian}</span>
                </div>
                <ClipButton
                  item={{
                    id: `tsubo-${tsubo.id}`,
                    type: "tsubo",
                    title: `${tsubo.name}（${tsubo.code}）`,
                    subTitle: `${tsubo.meridian} | ${tsubo.bodyPart}`,
                    points: [tsubo.name],
                    elements: getMeridianElement(tsubo.meridian),
                    indications: tsubo.indications,
                    summary: tsubo.clinicalNote,
                    caution: tsubo.caution
                  }}
                  variant="icon"
                  size="sm"
                />
              </div>

              {/* ツボ名 */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                    {tsubo.name}
                  </h2>
                  <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">{tsubo.kana}</span>
                </div>
                <span className="text-[11px] text-[#8A948F] dark:text-[#6A7C8B] font-mono">{tsubo.romaji}</span>
              </div>

              {/* 要穴カテゴリバッジ */}
              {tsubo.category && tsubo.category.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tsubo.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F3E1CB] dark:border-[#423321]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* 取穴法（一般向け） */}
              <div className="mb-4 bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D] space-y-1">
                <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">📍 取穴法（場所の目安）</span>
                <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">{tsubo.locationSimple}</p>
              </div>

              {/* 主治・効能 */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-semibold text-[#59615D] dark:text-[#96A6B2] block">主治・適応症:</span>
                <div className="flex flex-wrap gap-1.5">
                  {tsubo.indications.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#F2EDE4] dark:bg-[#1E2B36] text-[#232826] dark:text-[#E6EFEA]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 下部：詳細ボタンと臨床ノート */}
            <div className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-3">
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E]">臨床知見:</strong> {tsubo.clinicalNote}
              </p>

              {tsubo.caution && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#A83629] dark:text-[#C47A72] bg-[#FDEDEC] dark:bg-[#231816] px-2.5 py-1.5 rounded-lg border border-[#FADBD8] dark:border-[#3D2220]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{tsubo.caution}</span>
                </div>
              )}

              <button
                onClick={() => setSelectedTsubo(tsubo)}
                className="w-full py-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EBF3EF] dark:hover:bg-[#1C2C3A] border border-[#D5CCBC] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] transition-all flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>骨度法・解剖学的詳細を見る</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル（専門家向け詳細） */}
      {selectedTsubo && (
        <div className="fixed inset-0 z-50 bg-[#232826]/70 dark:bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] dark:bg-[#16212B] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedTsubo(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EBE4D5] dark:hover:bg-[#202E3C] text-[#59615D] dark:text-[#A0B0BC] transition-colors"
            >
              ✕
            </button>

            {/* モーダルヘッダー */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]">
                    {selectedTsubo.code}
                  </span>
                  <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">{selectedTsubo.meridian}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <h2 className="font-serif text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">{selectedTsubo.name}</h2>
                  <span className="text-base text-[#59615D] dark:text-[#A0B0BC]">{selectedTsubo.kana}</span>
                  <span className="text-xs font-mono text-[#8A948F] dark:text-[#6A7C8B]">({selectedTsubo.romaji})</span>
                </div>
              </div>

              <ClipButton
                item={{
                  id: `tsubo-${selectedTsubo.id}`,
                  type: "tsubo",
                  title: `${selectedTsubo.name}（${selectedTsubo.code}）`,
                  subTitle: `${selectedTsubo.meridian} | ${selectedTsubo.bodyPart}`,
                  points: [selectedTsubo.name],
                  elements: getMeridianElement(selectedTsubo.meridian),
                  indications: selectedTsubo.indications,
                  summary: selectedTsubo.clinicalNote,
                  caution: selectedTsubo.caution
                }}
                variant="button"
                size="sm"
              />
            </div>

            {/* 要穴 */}
            {selectedTsubo.category && (
              <div className="flex flex-wrap gap-2">
                {selectedTsubo.category.map((c, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] font-medium border border-[#F3E1CB] dark:border-[#423321]">
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* 取穴法 */}
            <div className="space-y-4">
              <div className="bg-[#FFFFFF] dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                <h3 className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
                  【一般向け】わかりやすい取穴法
                </h3>
                <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">{selectedTsubo.locationSimple}</p>
              </div>

              <div className="bg-[#FFFFFF] dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                <h3 className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] uppercase tracking-wider mb-1">
                  【専門家向け】解剖学・骨度法取穴
                </h3>
                <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed font-mono">{selectedTsubo.locationDetail}</p>
              </div>
            </div>

            {/* 臨床知見 */}
            <div className="bg-[#EBF3EF] dark:bg-[#162A24] p-5 rounded-xl border border-[#C5DED4] dark:border-[#2A5243]">
              <h3 className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>はり太郎の臨床知見・配穴の真髄</span>
              </h3>
              <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">{selectedTsubo.clinicalNote}</p>
            </div>

            {/* 注意事項 */}
            {selectedTsubo.caution && (
              <div className="bg-[#FDEDEC] dark:bg-[#231816] p-4 rounded-xl border border-[#FADBD8] dark:border-[#3D2220] text-[#A83629] dark:text-[#C47A72] text-xs leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">臨床上の禁忌・注意：</strong>
                  <p className="mt-0.5">{selectedTsubo.caution}</p>
                </div>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                onClick={() => setSelectedTsubo(null)}
                className="px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all"
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
