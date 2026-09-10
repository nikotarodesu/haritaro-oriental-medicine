"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layers, Scissors, Sparkles, ArrowRight, Activity, Stethoscope } from "lucide-react";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";
import HaiketsuOptimizer from "@/components/HaiketsuOptimizer";

export default function SimulatorHub() {
  const [activeTool, setActiveTool] = useState<"diagnosis" | "haiketsu">("diagnosis");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "haiketsu" || params.get("tool") === "haiketsu") {
        setActiveTool("haiketsu");
      }
    }
  }, []);

  return (
    <div className="space-y-10">
      {/* ツール切り替えタブバー */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#EFE9DD] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2D3E50] shadow-inner max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTool("diagnosis")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTool === "diagnosis"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Layers className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <span>① 臨床弁証シミュレーター</span>
          </button>

          <button
            onClick={() => setActiveTool("haiketsu")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTool === "haiketsu"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Scissors className="w-4 h-4 text-[#A83629] dark:text-[#C47A72]" />
            <span>② 配穴の「最小構成」シミュレーター</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
              新設
            </span>
          </button>
        </div>
      </div>

      {/* 1. 臨床弁証シミュレーター */}
      {activeTool === "diagnosis" && (
        <div className="space-y-10 animate-fadeIn">
          {/* ツール見出し */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>八綱 ➜ 気血水 ➜ 臓腑経絡 3段階連動</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
              臨床弁証シミュレーター
            </h2>

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
                <span className="text-[10px] font-bold text-[#1E2D3D] dark:text-[#6FA0D6] block mb-1">
                  STEP 3: 臓腑局在
                </span>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
                  五臓五腑・経脈
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                  肝胆・心・脾胃・肺・腎の失調病位へフォーカスを決定。
                </p>
              </div>
            </div>
          </div>

          <ThreeStageSimulator />
        </div>
      )}

      {/* 2. 配穴の「最小構成」シミュレーター */}
      {activeTool === "haiketsu" && (
        <div className="space-y-10 animate-fadeIn">
          {/* ツール見出し */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDEDEC] dark:bg-[#251514] border border-[#F8C8C4] dark:border-[#4D2421] text-[#A83629] dark:text-[#C47A72] text-xs font-semibold tracking-wider">
              <Scissors className="w-3.5 h-3.5" />
              <span>相殺効果防止 ＆ 刺激の純化ツール</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
              配穴の「最小構成」シミュレーター<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] text-2xl sm:text-3xl font-normal block mt-1">
                ― 無駄なツボを削ぎ落とし、切れ味を研ぎ澄ます ―
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              「ツボを選びすぎると相殺効果が出る」という臨床の鉄則に基づき、
              選択したツボの役割（原穴・合穴・本治・標治）をタグ表示。<br className="hidden sm:inline" />
              昇降の衝突や余計な重複を自動検知し、<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「無駄を削ぎ落とした最小構成（ペア/トリオ）」</strong>へと導きます。
            </p>

            {/* 3大理念カード */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
                <span className="text-[10px] font-bold text-[#A83629] dark:text-[#C47A72] block mb-1">
                  1. 相殺効果の排除
                </span>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
                  昇降・補瀉のベクトル衝突
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                  引き上げる穴と引き下ろす穴の拮抗、温補と瀉火の干渉を防ぎます。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
                <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-1">
                  2. 役割タグの可視化
                </span>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
                  本治穴 vs 標治穴
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                  原穴・合穴・募穴・八会穴など、各ツボの臨床任務を色分けで把握。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
                <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  3. 黄金の最小構成
                </span>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
                  本治1〜2 ＋ 標治1〜2
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                  手数を極限まで削ぎ落とし、自己治癒シグナルを一点に集中させます。
                </p>
              </div>
            </div>
          </div>

          <HaiketsuOptimizer />
        </div>
      )}
    </div>
  );
}
