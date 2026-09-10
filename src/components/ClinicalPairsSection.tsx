"use client";

import React, { useState } from "react";
import { Sparkles, Layers, BookOpen, ChevronRight, Zap } from "lucide-react";
import { CLASSIC_CLINICAL_PAIRS } from "@/types/clinicalMemo";
import ClipButton from "@/components/ClipButton";
import GogyoBadge from "@/components/GogyoBadge";

export default function ClinicalPairsSection() {
  const [selectedElement, setSelectedElement] = useState<string>("すべて");

  const elements = ["すべて", "木", "火", "土", "金", "水"];

  const filteredPairs = CLASSIC_CLINICAL_PAIRS.filter(pair => {
    if (selectedElement === "すべて") return true;
    return pair.elements.includes(selectedElement as any);
  });

  return (
    <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D1] dark:border-[#22303D] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#B86924] dark:text-[#E6C387] tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Classic Acupoint Combinations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            臨床名配穴（重要ツボの黄金ペア・トリオ集）
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-2xl leading-relaxed">
            単穴刺激にとどまらず、相乗効果を生み出す伝統的な配穴（太衝＋陽陵泉、開四関など）。ワンクリックでマイカルテに保存し、自分だけの要穴集として活用できます。
          </p>
        </div>

        {/* 五行フィルター */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-[#737C77] dark:text-[#8899A6] mr-1">五行絞込:</span>
          {elements.map(el => (
            <button
              key={el}
              onClick={() => setSelectedElement(el)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedElement === el
                  ? "bg-[#232826] text-white dark:bg-white dark:text-[#10161C] shadow-xs"
                  : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#EBF3EF]"
              }`}
            >
              {el}
            </button>
          ))}
        </div>
      </div>

      {/* 配穴グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPairs.map(pair => (
          <div
            key={pair.id}
            className="bg-[#FAF8F5] dark:bg-[#121920] rounded-xl border border-[#EDE7DB] dark:border-[#22303D] p-5 hover:border-[#B86924] dark:hover:border-[#E6C387] hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* カード上部：五行バッジ・タイトル・クリップボタン */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    {pair.elements.map(el => (
                      <GogyoBadge key={el} target={el} size="sm" showColorName />
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                    {pair.title}
                  </h3>
                  {pair.subTitle && (
                    <p className="text-xs text-[#737C77] dark:text-[#8899A6] font-medium">
                      {pair.subTitle}
                    </p>
                  )}
                </div>

                <ClipButton item={pair} variant="icon" size="sm" />
              </div>

              {/* 構成ツボ */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pair.points.map((pt, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2530] text-[#1E3D34] dark:text-[#74BA9E] font-bold border border-[#D5CCBC] dark:border-[#2D3E50] shadow-2xs"
                  >
                    {pt}
                  </span>
                ))}
              </div>

              {/* 主治・適応症 */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#737C77] dark:text-[#8899A6] block">主な適応症状:</span>
                <div className="flex flex-wrap gap-1">
                  {pair.indications.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-[#1A2530] text-[#404743] dark:text-[#C5D2DB] border border-[#E5DEC9]/80 dark:border-[#2A3B4A]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* 臨床要点・作用機序 */}
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {pair.summary}
              </p>

              {pair.mechanism && (
                <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                    💡 臨床メカニズム・配穴意図
                  </span>
                  {pair.mechanism}
                </div>
              )}
            </div>

            {/* クリップアクションバー */}
            <div className="pt-2 border-t border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center justify-between">
              <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                相補作用で効果最大化
              </span>
              <ClipButton item={pair} variant="button" size="sm" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
