"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle, Layers, Activity, History, Smartphone } from "lucide-react";

export default function LifeDynamicsAncientModern() {
  const [selectedEra, setSelectedEra] = useState<"ancient" | "modern">("modern");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：古代病理 vs 現代病理の構造比較（Evolution of Pathology Architecture）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            外邪の直進侵入から「虚実挟雑・ミルフィーユ構造」へ ── 時代が生んだ病理の変容
          </h4>
        </div>

        {/* 時代切り替えタブ */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#121920] p-1.5 rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A]">
          <button
            onClick={() => setSelectedEra("ancient")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              selectedEra === "ancient"
                ? "bg-[#546E7A] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826]"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            古代病理モデル（単線侵入）
          </button>
          <button
            onClick={() => setSelectedEra("modern")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              selectedEra === "modern"
                ? "bg-[#1E3D34] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            現代病理モデル（多重複合）
          </button>
        </div>
      </div>

      {/* 比較カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* 古代病理モデル */}
        <div
          onClick={() => setSelectedEra("ancient")}
          className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
            selectedEra === "ancient"
              ? "bg-[#FAF8F5] dark:bg-[#121920] border-[#546E7A] shadow-sm"
              : "bg-white dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between mb-3 border-b border-[#EAE4D5] dark:border-[#22303D] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#546E7A]" />
              <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                古代病理：外邪の「単線侵入」モデル
              </h5>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ECEFF1] text-[#455A64] font-bold">
              傷寒論の世界
            </span>
          </div>

          <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-4">
            肉体労働が中心で、栄養は粗食だが自律神経は健全。病気の主因は、気候の急変や寒波（風寒邪）が体表から一直線に侵入してくる「感染・急性疾患」でした。
          </p>

          {/* 単線侵入フローSVG */}
          <div className="p-3 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] mb-3">
            <div className="text-[10px] font-bold text-[#8C9691] dark:text-[#64748B] mb-2">
              三陽三陰の深度侵入ルート
            </div>
            <div className="flex items-center justify-between text-center text-xs">
              <div className="p-2 rounded bg-[#FFEBEE] text-[#C62828] font-bold">
                表：太陽病<br />
                <span className="text-[9px] font-normal">悪寒・発熱</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#78909C]" />
              <div className="p-2 rounded bg-[#FFF8E1] text-[#E65100] font-bold">
                半表半裏：少陽病<br />
                <span className="text-[9px] font-normal">胸脇苦満・口苦</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#78909C]" />
              <div className="p-2 rounded bg-[#E1F5FE] text-[#0277BD] font-bold">
                裏：陽明・三陰<br />
                <span className="text-[9px] font-normal">高熱・下痢・臓器不全</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#59615D] dark:text-[#96A6B2] space-y-1">
            <div><strong>主病因：</strong>外邪（六淫：風・寒・暑・湿・燥・火）</div>
            <div><strong>体質基盤：</strong>正気（生命力）は頑健、余計な夾雑物はない</div>
            <div><strong>治法：</strong>発汗・瀉下・催吐による邪気の力づくの排除（瀉法一辺倒）</div>
          </div>
        </div>

        {/* 現代病理モデル */}
        <div
          onClick={() => setSelectedEra("modern")}
          className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
            selectedEra === "modern"
              ? "bg-[#FAF8F5] dark:bg-[#121920] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm"
              : "bg-white dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between mb-3 border-b border-[#EAE4D5] dark:border-[#22303D] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
              <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                現代病理：虚実挟雑の「ミルフィーユ複合」モデル
              </h5>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#1E3D34]/30 text-[#1E3D34] dark:text-[#74BA9E] font-bold">
              内傷・自律神経失調
            </span>
          </div>

          <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-4">
            運動不足・高カロリー食・エアコンによる体温調節の退化、そしてSNSや過密労働による脳疲労。基礎体力が削られた上に、ストレス性の滞りが多重に重なる複合病態です。
          </p>

          {/* ミルフィーユ重層構造SVG */}
          <div className="p-3 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] mb-3 space-y-1.5 text-xs">
            <div className="p-1.5 rounded bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] font-bold text-center">
              最表層【標実】：局所の激痛・偏頭痛・高血圧・肩こり（実邪）
            </div>
            <div className="p-1.5 rounded bg-[#FFF8E1] border border-[#FFE082] text-[#E65100] font-bold text-center">
              中間層【気機鬱滞】：自律神経失調・気滞血瘀・痰湿沈殿（流通不全）
            </div>
            <div className="p-1.5 rounded bg-[#E1F5FE] border border-[#B3E5FC] text-[#0277BD] font-bold text-center">
              最深部【本虚】：脾胃虚弱・副腎疲労・腎精消耗・冷え（バッテリー枯渇）
            </div>
          </div>

          <div className="text-xs text-[#59615D] dark:text-[#96A6B2] space-y-1">
            <div><strong>主病因：</strong>内傷七情（ストレス）・生活起居の乱れ・運動不足</div>
            <div><strong>体質基盤：</strong>虚実挟雑（ベースが虚弱なのに、表面はゴミだらけ）</div>
            <div><strong>治法：</strong>根っこを補いつつ滞りを解く「扶正袪邪・標本兼治」が必須</div>
          </div>
        </div>
      </div>

      {/* 臨床的アドバイスコールアウト */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4 text-xs leading-relaxed flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-[#B86924] shrink-0 mt-0.5" />
        <p className="text-[#59615D] dark:text-[#CBD5E1]">
          <strong className="text-[#232826] dark:text-[#FAF8F5]">現代臨床の鉄則：</strong>
          現代人を古典の公式通りに「強い瀉法（解熱鎮痛剤の乱用や激しい整体）」だけで治療すると、最深部の本虚（腎精・脾気）が吹き飛んで寝たきり状態に陥ります。痛みを緩解させる（疏通）と同時に、胃腸とお腹を温めて充電する（扶正）という「二重の配穴」が不可欠です。
        </p>
      </div>
    </figure>
  );
}
