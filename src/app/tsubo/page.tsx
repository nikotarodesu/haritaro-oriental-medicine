"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";
import { Compass, Search, Filter, AlertTriangle, BookOpen, Sparkles, Check } from "lucide-react";

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
      // 検索キーワード
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

      // 部位フィルター
      const matchBodyPart = selectedBodyPart === "すべて" || t.bodyPart === selectedBodyPart;

      // 経絡フィルター
      const matchMeridian = selectedMeridian === "すべて" || t.meridianShort === selectedMeridian;

      return matchQuery && matchBodyPart && matchMeridian;
    });
  }, [searchQuery, selectedBodyPart, selectedMeridian]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* ページ見出し */}
      <div className="border-b border-[#E8E1D1] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3D34] tracking-widest uppercase mb-2">
          <Compass className="w-4 h-4" />
          <span>Acupoint Comprehensive Database</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] tracking-tight">
          十四経脈・経穴（ツボ）辞典
        </h1>
        <p className="mt-2 text-sm text-[#59615D] max-w-3xl leading-relaxed">
          WHO標準361経穴に対応する基幹データベースです。一般向けの分かりやすい取穴法から、専門家向けの骨度法・解剖学的取穴、臨床での配穴・ワンポイント知見、禁忌事項まで網羅しています。
        </p>
      </div>

      {/* 検索・絞り込みバー */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5DEC9] shadow-sm space-y-5">
        {/* キーワード入力 */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#8A948F] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ツボ名（合谷、ごうこく、LI4）、症状（頭痛、胃痛、不眠）、部位など..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#D5CCBC] bg-[#FAF8F5] focus:bg-[#FFFFFF] focus:outline-none focus:border-[#1E3D34] focus:ring-1 focus:ring-[#1E3D34] text-sm text-[#232826] placeholder-[#8A948F] transition-all"
          />
        </div>

        {/* フィルタータグ群 */}
        <div className="space-y-3 pt-2">
          {/* 部位 */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#59615D] mr-2">身体部位:</span>
            {bodyParts.map((part) => (
              <button
                key={part}
                onClick={() => setSelectedBodyPart(part)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedBodyPart === part
                    ? "bg-[#1E3D34] text-[#FAF8F5] border-[#1E3D34] font-medium shadow-sm"
                    : "bg-[#FAF8F5] text-[#404743] border-[#E8E1D1] hover:bg-[#EBF3EF]"
                }`}
              >
                {part}
              </button>
            ))}
          </div>

          {/* 経絡 */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#59615D] mr-2">所属経絡:</span>
            {meridians.map((mer) => (
              <button
                key={mer}
                onClick={() => setSelectedMeridian(mer)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedMeridian === mer
                    ? "bg-[#1E2D3D] text-[#FAF8F5] border-[#1E2D3D] font-medium shadow-sm"
                    : "bg-[#FAF8F5] text-[#404743] border-[#E8E1D1] hover:bg-[#EDF3F8]"
                }`}
              >
                {mer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 検索結果サマリー */}
      <div className="flex items-center justify-between text-xs text-[#59615D] px-1">
        <span>該当件数: <strong className="text-[#1E3D34] text-sm">{filteredTsubos.length}</strong> 件</span>
        {(searchQuery || selectedBodyPart !== "すべて" || selectedMeridian !== "すべて") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedBodyPart("すべて");
              setSelectedMeridian("すべて");
            }}
            className="text-[#B86924] hover:underline"
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
            className="bg-[#FFFFFF] rounded-2xl border border-[#E5DEC9] p-6 hover:border-[#1E3D34] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* ヘッダー情報 */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] text-[#1E3D34]">
                    {tsubo.code}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E1D1] text-[#59615D]">
                    {tsubo.bodyPart}
                  </span>
                </div>
                <span className="text-xs font-medium text-[#1E2D3D]">{tsubo.meridian}</span>
              </div>

              {/* ツボ名 */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-serif text-2xl font-bold text-[#232826] group-hover:text-[#1E3D34] transition-colors">
                    {tsubo.name}
                  </h2>
                  <span className="text-xs text-[#59615D]">{tsubo.kana}</span>
                </div>
                <span className="text-[11px] text-[#8A948F] font-mono">{tsubo.romaji}</span>
              </div>

              {/* 要穴カテゴリバッジ */}
              {tsubo.category && tsubo.category.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tsubo.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FCF4EB] text-[#B86924] border border-[#F3E1CB]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* 取穴法（一般向け） */}
              <div className="mb-4 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EDE7DB] space-y-1">
                <span className="text-[11px] font-bold text-[#1E3D34] block">📍 取穴法（場所の目安）</span>
                <p className="text-xs text-[#404743] leading-relaxed">{tsubo.locationSimple}</p>
              </div>

              {/* 主治・効能 */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-semibold text-[#59615D] block">主治・適応症:</span>
                <div className="flex flex-wrap gap-1.5">
                  {tsubo.indications.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#F2EDE4] text-[#232826]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 下部：詳細ボタンと臨床ノート */}
            <div className="pt-4 border-t border-[#F2ECE0] space-y-3">
              <p className="text-xs text-[#59615D] leading-relaxed line-clamp-2">
                <strong className="text-[#1E3D34]">臨床知見:</strong> {tsubo.clinicalNote}
              </p>

              {tsubo.caution && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#A83629] bg-[#FDEDEC] px-2.5 py-1.5 rounded-lg border border-[#FADBD8]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{tsubo.caution}</span>
                </div>
              )}

              <button
                onClick={() => setSelectedTsubo(tsubo)}
                className="w-full py-2 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3EF] border border-[#D5CCBC] hover:border-[#1E3D34] text-xs font-semibold text-[#1E3D34] transition-all flex items-center justify-center gap-1.5"
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
        <div className="fixed inset-0 z-50 bg-[#232826]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#E5DEC9] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedTsubo(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EBE4D5] text-[#59615D] transition-colors"
            >
              ✕
            </button>

            {/* モーダルヘッダー */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1E3D34] text-[#FAF8F5]">
                  {selectedTsubo.code}
                </span>
                <span className="text-xs text-[#59615D]">{selectedTsubo.meridian}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl font-bold text-[#232826]">{selectedTsubo.name}</h2>
                <span className="text-base text-[#59615D]">{selectedTsubo.kana}</span>
                <span className="text-xs font-mono text-[#8A948F]">({selectedTsubo.romaji})</span>
              </div>
            </div>

            {/* 要穴 */}
            {selectedTsubo.category && (
              <div className="flex flex-wrap gap-2">
                {selectedTsubo.category.map((c, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-[#FCF4EB] text-[#B86924] font-medium border border-[#F3E1CB]">
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* 取穴法（一般 & 専門詳細） */}
            <div className="space-y-4">
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5DEC9]">
                <h3 className="text-xs font-bold text-[#1E3D34] uppercase tracking-wider mb-1">
                  【一般向け】わかりやすい取穴法
                </h3>
                <p className="text-sm text-[#232826] leading-relaxed">{selectedTsubo.locationSimple}</p>
              </div>

              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5DEC9]">
                <h3 className="text-xs font-bold text-[#1E2D3D] uppercase tracking-wider mb-1">
                  【専門家向け】解剖学・骨度法取穴
                </h3>
                <p className="text-sm text-[#232826] leading-relaxed font-mono">{selectedTsubo.locationDetail}</p>
              </div>
            </div>

            {/* 臨床知見 */}
            <div className="bg-[#EBF3EF] p-5 rounded-xl border border-[#C5DED4]">
              <h3 className="text-xs font-bold text-[#1E3D34] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B86924]" />
                <span>はり太郎の臨床知見・配穴の真髄</span>
              </h3>
              <p className="text-sm text-[#232826] leading-relaxed">{selectedTsubo.clinicalNote}</p>
            </div>

            {/* 注意事項 */}
            {selectedTsubo.caution && (
              <div className="bg-[#FDEDEC] p-4 rounded-xl border border-[#FADBD8] text-[#A83629] text-xs leading-relaxed flex items-start gap-2">
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
                className="px-6 py-2.5 rounded-xl bg-[#1E3D34] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] transition-all"
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
