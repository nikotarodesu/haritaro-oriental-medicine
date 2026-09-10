"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layers, Sparkles, ArrowRight, Activity, Stethoscope } from "lucide-react";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";
import EastWestIntegrativeSwitch from "@/components/EastWestIntegrativeSwitch";

export default function SimulatorHub() {
  const [activeTool, setActiveTool] = useState<"diagnosis" | "matrix">("diagnosis");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") || params.get("tool");
      if (tab === "matrix" || tab === "eastwest" || tab === "integrative") {
        setActiveTool("matrix");
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
            onClick={() => setActiveTool("matrix")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTool === "matrix"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Stethoscope className="w-4 h-4 text-[#C45A4A]" />
            <span>② 東西医学 相補マトリクス</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C45A4A] text-white">
              新機能
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

      {/* 2. 東西医学 相補マトリクススイッチ */}
      {activeTool === "matrix" && (
        <div className="space-y-10 animate-fadeIn">
          {/* ツール見出し */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#251A14] border border-[#F3E1CB] dark:border-[#422B1E] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>陰陽論第8節 臨床統合モデル</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
              東西医学の「相補マトリクス」切り替えスイッチ
            </h2>

            <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              「西洋医学（陽：構造・病名・除外診断）」と「東洋医学（陰：機能・証・気機調律）」の相補関係を直感的なトグルで可視化。
              医療関係者の信頼に応える厳格なレッドフラッグ除外診断と、東洋医学の根本体質治癒が歯車のように噛み合います。
            </p>

            {/* 特徴3点 */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
                <span className="text-[10px] font-bold text-[#C45A4A] block mb-1">
                  1. 西洋医学（陽の医療）
                </span>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
                  構造特定 ＆ 除外診断
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                  胃カメラ・画像診断・血液検査による悪性病変除外と、急性期標準薬物。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
                <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  2. 東洋医学（陰の医療）
                </span>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
                  気機昇降 ＆ 弁証論治
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                  半夏瀉心湯の辛開苦降や内関・足三里の配穴で機能性障害・NERDを根本寛解。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
                <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-1">
                  3. 4段階シームレス連携
                </span>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
                  相補マトリクスプロトコル
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                  危険排除 ➜ 急性期鎮静 ➜ 機能回復 ➜ 再発ゼロ維持の理想の統合医療。
                </p>
              </div>
            </div>
          </div>

          <EastWestIntegrativeSwitch initialCaseId="gerd-gastric" />
        </div>
      )}
    </div>
  );
}
