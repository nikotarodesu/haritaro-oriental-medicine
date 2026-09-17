"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getAllAcupoints, getAcupointDetail } from "@/data/tsubo";
import { GitCompare, ArrowLeft, ArrowRight, Compass, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import LocalPointMapSvg from "@/components/tsubo/LocalPointMapSvg";

export default function ComparePage() {
  const allPoints = getAllAcupoints();
  const [pointCodeA, setPointCodeA] = useState("LI4");
  const [pointCodeB, setPointCodeB] = useState("LR3");

  const detailA = getAcupointDetail(pointCodeA);
  const detailB = getAcupointDetail(pointCodeB);

  // おすすめペア
  const PRESET_PAIRS = [
    { label: "開四関ペア（合谷 × 太衝）", codeA: "LI4", codeB: "LR3", note: "気血開通・自律神経リセットの古典最強ペア" },
    { label: "表裏相応ペア（内関 × 外関）", codeA: "PC6", codeB: "TE5", note: "前腕掌側と背側の表裏貫通・心胸と側頭部" },
    { label: "胃腸・補気血ペア（足三里 × 三陰交）", codeA: "ST36", codeB: "SP6", note: "後天の気と陰血滋養の代表処方" },
    { label: "消化器双璧（天枢 × 中脘）", codeA: "ST25", codeB: "CV12", note: "大腸募穴と胃募穴による中焦・下焦整腸" },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            経穴辞典
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">2穴比較ツール</span>
        </nav>

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Acupoint Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            経穴2穴 構造・適応 比較ツール
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            近隣穴や相応ペアを左右に並べ、解剖目印・取穴手順・要穴分類・主治の相違点を比較検討できます。
          </p>
        </div>

        {/* プリセット選択 */}
        <div className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 space-y-2">
          <span className="text-xs font-bold text-[#59615D] dark:text-[#A0B0BC] block">
            よく比較・併用される臨床ペア：
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_PAIRS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPointCodeA(p.codeA);
                  setPointCodeB(p.codeB);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                  pointCodeA === p.codeA && pointCodeB === p.codeB
                    ? "bg-[#1E3D34] text-white border-[#1E3D34] dark:bg-[#2B6958]"
                    : "bg-white dark:bg-[#10171F] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34]"
                }`}
              >
                <div className="font-bold">{p.label}</div>
                <div className={`text-[10px] mt-0.5 ${pointCodeA === p.codeA && pointCodeB === p.codeB ? "text-[#E6C387]" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                  {p.note}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 比較セレクターバー */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <label className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
              経穴 A を選択：
            </label>
            <select
              value={pointCodeA}
              onChange={(e) => setPointCodeA(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-xs font-medium text-[#232826] dark:text-[#FAF8F5]"
            >
              {allPoints.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code} - {p.name}（{p.meridianShort}）
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <label className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">
              経穴 B を選択：
            </label>
            <select
              value={pointCodeB}
              onChange={(e) => setPointCodeB(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-xs font-medium text-[#232826] dark:text-[#FAF8F5]"
            >
              {allPoints.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code} - {p.name}（{p.meridianShort}）
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 比較カード並列グリッド */}
        {detailA && detailB && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* 経穴 A */}
            <div className="bg-white dark:bg-[#17212A] rounded-3xl border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/30 p-5 sm:p-7 shadow-sm space-y-5">
              <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#1E3D34] text-white">
                    {detailA.code}
                  </span>
                  <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                    {detailA.meridian}
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {detailA.name} <span className="text-base font-normal text-[#737C77]">{detailA.kana}</span>
                </h2>
              </div>

              {/* 取穴部位 */}
              <div className="space-y-1 text-xs">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E] block">【取穴場所】</strong>
                <p className="text-[#333835] dark:text-[#C5D2DB] leading-relaxed">{detailA.locationSimple}</p>
                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] font-mono pt-1">{detailA.locationDetail}</p>
              </div>

              {/* 要穴分類 */}
              <div className="space-y-1 text-xs">
                <strong className="text-[#737C77] dark:text-[#8899A6] block">【要穴分類】</strong>
                <div className="flex flex-wrap gap-1">
                  {detailA.categories.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] font-medium text-[11px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* 主治 */}
              <div className="space-y-1 text-xs">
                <strong className="text-[#737C77] dark:text-[#8899A6] block">【主治適応症】</strong>
                <div className="flex flex-wrap gap-1">
                  {detailA.indications.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] text-[11px]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* 臨床ノート */}
              <div className="p-3.5 rounded-xl bg-[#EBF3EF] dark:bg-[#162A24] text-xs space-y-1">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E] block font-bold">臨床知見：</strong>
                <p className="text-[#232826] dark:text-[#E6EFEA] leading-relaxed">{detailA.clinicalNote}</p>
              </div>

              <Link
                href={`/tsubo/${detailA.codeLower}`}
                className="w-full py-2.5 rounded-xl bg-[#1E3D34] text-white text-xs font-bold text-center block hover:bg-[#162E27] transition-all"
              >
                {detailA.name}の個別詳細ページを開く ➜
              </Link>
            </div>

            {/* 経穴 B */}
            <div className="bg-white dark:bg-[#17212A] rounded-3xl border-2 border-[#B86924]/30 dark:border-[#E6C387]/30 p-5 sm:p-7 shadow-sm space-y-5">
              <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#B86924] text-white">
                    {detailB.code}
                  </span>
                  <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                    {detailB.meridian}
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {detailB.name} <span className="text-base font-normal text-[#737C77]">{detailB.kana}</span>
                </h2>
              </div>

              {/* 取穴部位 */}
              <div className="space-y-1 text-xs">
                <strong className="text-[#B86924] dark:text-[#E6C387] block">【取穴場所】</strong>
                <p className="text-[#333835] dark:text-[#C5D2DB] leading-relaxed">{detailB.locationSimple}</p>
                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] font-mono pt-1">{detailB.locationDetail}</p>
              </div>

              {/* 要穴分類 */}
              <div className="space-y-1 text-xs">
                <strong className="text-[#737C77] dark:text-[#8899A6] block">【要穴分類】</strong>
                <div className="flex flex-wrap gap-1">
                  {detailB.categories.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] font-medium text-[11px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* 主治 */}
              <div className="space-y-1 text-xs">
                <strong className="text-[#737C77] dark:text-[#8899A6] block">【主治適応症】</strong>
                <div className="flex flex-wrap gap-1">
                  {detailB.indications.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] text-[11px]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* 臨床ノート */}
              <div className="p-3.5 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-xs space-y-1">
                <strong className="text-[#B86924] dark:text-[#E6C387] block font-bold">臨床知見：</strong>
                <p className="text-[#232826] dark:text-[#E6EFEA] leading-relaxed">{detailB.clinicalNote}</p>
              </div>

              <Link
                href={`/tsubo/${detailB.codeLower}`}
                className="w-full py-2.5 rounded-xl bg-[#B86924] text-white text-xs font-bold text-center block hover:bg-[#9C5417] transition-all"
              >
                {detailB.name}の個別詳細ページを開く ➜
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
