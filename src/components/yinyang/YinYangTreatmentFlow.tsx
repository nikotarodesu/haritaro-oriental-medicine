"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle, ArrowDown, CheckCircle2, AlertTriangle, Crosshair, ShieldCheck } from "lucide-react";

export default function YinYangTreatmentFlow() {
  const [hasEmergency, setHasEmergency] = useState<boolean | null>(null);

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：本治・標治の優先順位決定フローチャート</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            臨床意思決定：本治（根本）と標治（対症）の優先順位
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          「急なれば其の標を治し、緩なれば其の態を治す」
        </span>
      </div>

      {/* フローチャート判定エリア */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8 mb-6">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          {/* 第1ステップ：判定の問い */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/40 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Step 1：急性緊急サインのスクリーニング</span>
            </div>
            <h5 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              「大小便不通・激烈な激痛・高熱痙攣・重篤な呼吸困難」などの<br />
              急性・危機的症状（標症の暴走）は存在するか？
            </h5>

            {/* シミュレーション選択ボタン */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setHasEmergency(true)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  hasEmergency === true
                    ? "bg-[#C45A4A] text-white shadow-md scale-105"
                    : "bg-[#FCF4EB] text-[#C45A4A] border border-[#F3E1CB] hover:bg-[#FBE8E5]"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>YES（急性・激痛・閉塞あり）</span>
              </button>
              <button
                onClick={() => setHasEmergency(false)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  hasEmergency === false
                    ? "bg-[#1E3D34] text-white shadow-md scale-105"
                    : "bg-[#EBF3EF] text-[#1E3D34] border border-[#C5DED4] hover:bg-[#DEEFE8]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>NO（慢性・緩解・体質失調）</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-[#1E3D34] dark:text-[#74BA9E] animate-bounce" />
          </div>

          {/* 分岐結果カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* 標先治カード */}
            <div
              className={`p-5 rounded-2xl border-2 transition-all ${
                hasEmergency === true
                  ? "bg-white dark:bg-[#1A2530] border-[#C45A4A] ring-2 ring-[#C45A4A]/20 shadow-md"
                  : "bg-white/60 dark:bg-[#17212A]/60 border-[#E8E1D1] dark:border-[#22303D] opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#C45A4A] text-white text-[10px] font-bold">
                  急性期・緊急時
                </span>
                <span className="font-serif font-bold text-sm text-[#C45A4A]">【標先治（ひょうせんち）】</span>
              </div>
              <h6 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mb-1">
                まず局所の「標治」で邪気・激痛・滞りを迅速除去！
              </h6>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-3">
                生命の破綻を防ぐため、根本原因（虚）よりも現在の激しい苦痛・閉塞（実）を先に瀉法で解除します。
              </p>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px] text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <div><strong>鍼灸方針：</strong>瀉法、浅刺〜雀啄術、井穴刺絡、強い鎮痛配穴</div>
                <div><strong>臨床例：</strong>急性腰痛（ギックリ腰）、高熱痙攣、便秘膨満</div>
              </div>
            </div>

            {/* 本治優先カード */}
            <div
              className={`p-5 rounded-2xl border-2 transition-all ${
                hasEmergency === false
                  ? "bg-white dark:bg-[#1A2530] border-[#1E3D34] dark:border-[#74BA9E] ring-2 ring-[#1E3D34]/20 shadow-md"
                  : "bg-white/60 dark:bg-[#17212A]/60 border-[#E8E1D1] dark:border-[#22303D] opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#1E3D34] text-white text-[10px] font-bold">
                  慢性期・安定時
                </span>
                <span className="font-serif font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E]">【本治優先（ほんちゆうせん）】</span>
              </div>
              <h6 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mb-1">
                五臓・深部の「精気補充（補法）」を主軸に根本改善！
              </h6>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-3">
                局所痛だけを追わず、なぜその症状が生じたのかという「五臓の虚損・陰陽の傾き」を深層から補修します。
              </p>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px] text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <div><strong>鍼灸方針：</strong>補法、深刺・持続置針、温灸（施灸）、経絡調整</div>
                <div><strong>臨床例：</strong>慢性疲労、冷え性、自律神経失調、月経不順</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 病位の深浅（五層モデル）と刺鍼深度の対比 */}
      <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-3">
          <Crosshair className="w-4 h-4 text-[#B86924]" />
          <span>病位の深浅（五層モデル）と刺鍼深度の原則</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A]">
            <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block mb-1">
              【浅部・陽病】皮・肉・筋（表層）
            </span>
            <p className="text-[#59615D] dark:text-[#96A6B2] text-[11px] leading-relaxed mb-2">
              痒み、ピリピリした感覚、初期の急性痛、悪寒発熱など。外邪がまだ体表にある病態。
            </p>
            <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#15202B] text-[10px] text-[#232826] dark:text-[#D5E0DC] font-mono">
              ➜ 浅刺（0.3〜0.5寸）：衛気を奮い立たせ、表層の邪気を発散・排熱させる。
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#1E3A5F]">
            <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block mb-1">
              【深部・陰病】骨・髄・五臓（深層）
            </span>
            <p className="text-[#59615D] dark:text-[#96A6B2] text-[11px] leading-relaxed mb-2">
              重だるい鈍痛、骨身に染みる冷え、慢性固定痛、内臓虚損。病邪が深層に固着した病態。
            </p>
            <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#15202B] text-[10px] text-[#232826] dark:text-[#D5E0DC] font-mono">
              ➜ 深刺（1.5〜2.0寸）＋深部留針：深層の経気を動かし、持続的な代謝回復効果をもたらす。
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
