"use client";

import React from "react";
import { Sparkles, ArrowRight, Compass, Network, GitMerge, Check } from "lucide-react";

interface Props {
  onNextLecture?: () => void;
}

export default function WuxingClinicalDecisionTree({ onNextLecture }: Props) {
  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden relative">
      {/* 背景装飾 */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-tl from-[#EBF5EE] to-transparent dark:from-[#2E7D32]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑧：臨床思考の2ステップ・ツリーチャート（Two-Step Clinical Algorithm）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰陽で「方向」を決め、五行で「ターゲットと連鎖」を射抜く
          </h4>
        </div>
      </div>

      {/* 2ステップツリーチャート */}
      <div className="relative z-10 bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Step 1：陰陽論 */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#1E3D34]/40 dark:border-[#74BA9E]/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold">
                Step 1：陰陽論（大局判断）
              </span>
              <Compass className="w-5 h-5 text-[#B86924]" />
            </div>

            <h5 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              進むべき「ベクトル」の決定
            </h5>

            <ul className="space-y-2 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3D34] shrink-0 mt-0.5" />
                <span><strong>病位の判定：</strong>表（浅い）か 裏（深い）か</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3D34] shrink-0 mt-0.5" />
                <span><strong>温度の判定：</strong>熱（炎症・興奮）か 寒（冷却・沈滞）か</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3D34] shrink-0 mt-0.5" />
                <span><strong>勢力の判定：</strong>実（邪気過剰）か 虚（正気不足）か</span>
              </li>
            </ul>

            <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] text-center">
              ➜ 結論：「補法」か「瀉法」か、「温」か「清」か
            </div>
          </div>

          {/* 中央の矢印 */}
          <div className="md:col-span-2 flex flex-col items-center justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shadow-xs">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] mt-1.5 text-center">
              詳細化
            </span>
          </div>

          {/* Step 2：五行論 */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#2E7D32]/50 dark:border-[#81C784]/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF5EE] dark:bg-[#15281B] text-[#2E7D32] dark:text-[#81C784] text-xs font-bold">
                Step 2：五行論（精密照準）
              </span>
              <Network className="w-5 h-5 text-[#2E7D32]" />
            </div>

            <h5 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              病根と「波及連鎖」の特定
            </h5>

            <ul className="space-y-2 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                <span><strong>病巣の同定：</strong>肝・心・脾・肺・腎のどこが震源地か</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                <span><strong>連鎖の解読：</strong>相乗（過剰制約）か 相侮（逆流）か</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                <span><strong>治療点の選定：</strong>母を補うか、子を瀉すか（子母補瀉）</span>
              </li>
            </ul>

            <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px] font-bold text-[#2E7D32] dark:text-[#81C784] text-center">
              ➜ 結論：経穴（ツボ）と配穴、生薬処方の決定
            </div>
          </div>
        </div>
      </div>

      {/* 次の講義（第3講：気血津液論）への誘導バナー */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1E3D34] to-[#152C25] text-white shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#E6C387] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next Lecture ── 第3講</span>
          </div>
          <h5 className="font-serif font-bold text-base sm:text-lg">
            第3講：気血津液論 ― エネルギー代謝と体液循環の病態学
          </h5>
          <p className="text-xs text-[#D3DFDA]">
            五行ネットワークを流れる「生命の燃料」気・血・津液の生理と病理を徹底解説
          </p>
        </div>

        {onNextLecture ? (
          <button
            onClick={onNextLecture}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#E6C387] hover:bg-[#DFC07D] text-[#1E3D34] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group"
          >
            <span>次へ進む：③ 気血津液論</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <a
            href="/curriculum?lecture=lecture-3-qiblood"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#E6C387] hover:bg-[#DFC07D] text-[#1E3D34] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group"
          >
            <span>次へ進む：③ 気血津液論</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </figure>
  );
}
