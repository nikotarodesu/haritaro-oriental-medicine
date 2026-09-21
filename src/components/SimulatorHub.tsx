"use client";

import React from "react";
import Link from "next/link";
import { Layers, Sparkles, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";

export default function SimulatorHub() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ツール見出し */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>八綱 ➜ 気血水 ➜ 臓腑経絡 3段階連動</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床弁証シミュレーター
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          八綱（深浅・勢い） ➜ 気血水（動態） ➜ 臓腑経絡（局在病位）を段階的に選択することで、
          複雑な病態から<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「一文の証」</strong>を抽出し、
          最小手数で最大の効果を狙う<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「最小構成のペアツボ」</strong>を瞬時に導き出します。
        </p>

        {/* このツールでできること（3ステップ）＆ こんな人におすすめ */}
        <div className="bg-white dark:bg-[#152028] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-xs space-y-4 max-w-4xl mx-auto text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>このツールでできること（3ステップ）</span>
            </span>
            <span className="text-xs text-[#59615D] dark:text-[#A0B0BC] bg-[#FAF8F5] dark:bg-[#10171F] px-2.5 py-1 rounded-full border border-[#E8E1D1] dark:border-[#22303D] font-medium">
              🎯 こんな人におすすめ：鍼灸学生の国試・臨床実習対策／臨床家の配穴処方見直し
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="w-5 h-5 rounded-full bg-[#1E3D34] text-white flex items-center justify-center text-xs font-mono">1</span>
                <span>証の選択</span>
              </div>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                八綱（表裏・寒熱・虚実）と気血水、臓腑経絡の病態条件を直感的に選択。
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="w-5 h-5 rounded-full bg-[#B86924] text-white flex items-center justify-center text-xs font-mono">2</span>
                <span>病態推論の可視化</span>
              </div>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                選択した組み合わせから「一文の証名」「治法（治療原則）」を即座に導出。
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="w-5 h-5 rounded-full bg-[#2B6958] text-white flex items-center justify-center text-xs font-mono">3</span>
                <span>経穴選定の確認</span>
              </div>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                最小構成のペアツボ・推奨要穴と、選定根拠・作用機序を確認・学習ノートへ保存。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 臨床弁証シミュレーター本体 */}
      <ThreeStageSimulator />

      {/* 関連リンクフッター案内 */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              弁証理論の科学的基盤を学ぶ
            </span>
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              八綱・気血水・臓腑経絡の「数理・システム科学的機序」
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] max-w-2xl">
              本シミュレーターの基盤となる「表裏・寒熱・虚実（状態空間モデル）」と「気血水（動態システム）」の学術講義録を公開しています。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/articles?article=science-of-yinyang-gogyo"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#1A2E26] hover:bg-[#D8EADB] dark:hover:bg-[#234237] px-3.5 py-2 rounded-xl transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>陰陽五行の科学</span>
            </Link>
            <Link
              href="/articles?article=science-of-kampo-network-pharmacology"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#1A2E26] hover:bg-[#D8EADB] dark:hover:bg-[#234237] px-3.5 py-2 rounded-xl transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>漢方医学の科学</span>
            </Link>
            <Link
              href="/articles?article=science-of-qi-blood-fluid"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1E3D34] dark:bg-[#2B6958] hover:opacity-90 px-3.5 py-2 rounded-xl transition-all shadow-sm"
            >
              <span>気血津液の科学</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
