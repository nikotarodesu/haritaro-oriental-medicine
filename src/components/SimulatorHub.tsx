"use client";

import React from "react";
import Link from "next/link";
import { Layers, Sparkles, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";

export default function SimulatorHub() {
  return (
    <div className="space-y-12">
      {/* ツール見出し */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>八綱 ➜ 気血水 ➜ 臓腑経絡 3段階連動</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床弁証シミュレーター
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          八綱（深浅・勢い） ➜ 気血水（動態） ➜ 臓腑経絡（局在病位）を段階的に選択することで、
          複雑な病態から<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「一文の証」</strong>を抽出し、
          最小手数で最大の効果を狙う<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「最小構成のペアツボ」</strong>を瞬時に導き出します。
        </p>

        {/* 3ステップの解説ピル */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
            <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-1">
              STEP 1: 八綱フィルタ
            </span>
            <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
              表裏・寒熱・虚実
            </p>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
              病の深浅、温度傾向、生体反応の過不足と勢いを大枠で把握。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
            <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
              STEP 2: 気血水動態
            </span>
            <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
              循環・過不足の動態
            </p>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
              気滞・気虚・血虚・瘀血・水滞など、生体因子の運動異常を特定。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
            <span className="text-[10px] font-bold text-[#1E2D3D] dark:text-[#7BAAD8] block mb-1">
              STEP 3: 臓腑経絡
            </span>
            <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
              五臓五腑・病位局在
            </p>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
              肝・心・脾・肺・腎・三焦など、病変の中心拠点を確定。
            </p>
          </div>
        </div>
      </div>

      {/* 臨床弁証シミュレーター本体 */}
      <ThreeStageSimulator />

      {/* 関連リンクフッター案内 */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
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
