"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle, ArrowDown, CheckCircle2, AlertTriangle, Crosshair, ShieldCheck } from "lucide-react";

export default function YinYangTreatmentFlow() {
  const [hasEmergency, setHasEmergency] = useState<boolean | null>(null);

  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：本治・標治の考え方と救急対応の区別</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            救急対応を優先し、本治・標治の学習と区別する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          標：現れている所見 ／ 本：背景として考えるもの
        </span>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
        ボタンは教材上の例を切り替えます。この図で、病気の原因・緊急性・鍼灸の適否を判定することはできません。救急が疑われるときは、陰陽や本治・標治の分類より医学的評価と救急対応を優先します。
      </p>

      {/* フローチャート判定エリア */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-8 mb-4 sm:mb-6">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-center">
          {/* 第1ステップ：判定の問い */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/40 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Step 1：救急対応を優先する例を確認</span>
            </div>
            <h5 className="font-serif font-bold text-sm sm:text-lg text-[#232826] dark:text-[#FAF8F5] leading-snug">
              急な強い息苦しさ、止まらないけいれん、意識の異常、<br className="hidden sm:inline" />
              突然の激しい痛みなど、救急が疑われる症状がある例か？
            </h5>

            {/* シミュレーション選択ボタン */}
            <div role="group" aria-label="救急対応と学習場面の例を切り替え" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 pt-2">
              <button
                type="button"
                aria-pressed={hasEmergency === true}
                onClick={() => setHasEmergency(true)}
                className={`min-h-11 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
                  hasEmergency === true
                    ? "bg-[#C45A4A] text-white shadow-md scale-105"
                    : "bg-[#FCF4EB] text-[#C45A4A] border border-[#F3E1CB] hover:bg-[#FBE8E5]"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>救急が疑われる例</span>
              </button>
              <button
                type="button"
                aria-pressed={hasEmergency === false}
                onClick={() => setHasEmergency(false)}
                className={`min-h-11 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
                  hasEmergency === false
                    ? "bg-[#1E3D34] text-white shadow-md scale-105"
                    : "bg-[#EBF3EF] text-[#1E3D34] border border-[#C5DED4] hover:bg-[#DEEFE8]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>救急症状が示されない教材の例</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-[#1E3D34] dark:text-[#74BA9E] animate-bounce" />
          </div>

          {/* 分岐結果カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* 救急対応を優先するカード */}
            <div
              className={`p-5 rounded-2xl border-2 transition-all ${
                hasEmergency === true
                  ? "bg-white dark:bg-[#1A2530] border-[#C45A4A] ring-2 ring-[#C45A4A]/20 shadow-md"
                  : "bg-white/60 dark:bg-[#17212A]/60 border-[#E8E1D1] dark:border-[#22303D] opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#C45A4A] text-white text-[10px] font-bold">
                  救急が疑われるとき
                </span>
                <span className="font-serif font-bold text-sm text-[#C45A4A]">【医学的評価・救急対応】</span>
              </div>
              <h6 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mb-1">
                救急対応を鍼灸で代替しない
              </h6>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-3">
                強い呼吸困難、止まらないけいれん、けいれん後に意識が戻らない、突然の激痛などは119番への連絡を優先してください。高熱を伴うけいれんも、瀉法・刺絡・灸などで救急評価を先延ばしにしてはいけません。
              </p>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px] text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <div><strong>対応：</strong>119番通報後は通信指令員の案内に従います。</div>
                <div><strong>学習上の注意：</strong>「標を先に考える」という伝統的な整理から、救急時の鍼灸手技は導けません。</div>
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
                  救急症状が示されない例
                </span>
                <span className="font-serif font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E]">【本治・標治を比較】</span>
              </div>
              <h6 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mb-1">
                現れている所見と背景を分けて考える
              </h6>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-3">
                本治・標治は伝統的な治療の考え方を整理する用語です。症状が慢性であることだけで、安全な状態・五臓の虚損・施術の適応を確定することはできません。
              </p>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px] text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <div><strong>学習の観点：</strong>所見、経過、既往歴、医学的評価など、追加で必要な情報を整理します。</div>
                <div><strong>保留する判断：</strong>具体的な選穴・刺入・留針・施灸の条件は、この図では案内しません。</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 伝統的な深浅の分類と施術条件の区別 */}
      <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-3">
          <Crosshair className="w-4 h-4 text-[#B86924]" />
          <span>伝統的な深浅の分類から、刺鍼深度は決められない</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A]">
            <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block mb-1">
              【浅部の分類例】皮・肉・筋
            </span>
            <p className="text-[#59615D] dark:text-[#96A6B2] text-[11px] leading-relaxed mb-2">
              皮・肉・筋などを用いて病位の深浅を整理する、伝統的な説明モデルです。症状から実際の解剖学的な病変の深さを確定するものではありません。
            </p>
            <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#15202B] text-[10px] text-[#232826] dark:text-[#D5E0DC] font-mono">
              一律の刺入深度・手技は提示できません。局所解剖、安全深度、患者の状態などの確認が必要です。
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#1E3A5F]">
            <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block mb-1">
              【深部の分類例】骨・髄・五臓
            </span>
            <p className="text-[#59615D] dark:text-[#96A6B2] text-[11px] leading-relaxed mb-2">
              骨・髄・五臓などを用いる伝統的な分類です。慢性症状や「深部」という言葉だけで、深い刺入・留針の必要性や効果は判断できません。
            </p>
            <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#15202B] text-[10px] text-[#232826] dark:text-[#D5E0DC] font-mono">
              具体的な施術条件は個別の一次資料との照合と専門家確認が未了です。この図は実技手順の案内として使えません。
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-[11px] leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
        <span className="inline-flex items-center gap-1 font-semibold"><ShieldCheck className="h-3.5 w-3.5" />出典と確認範囲：</span>
        <a href="https://www.fdma.go.jp/publication/portal/items/portal002_japanese.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-2">消防庁：救急車利用マニュアル（2025年10月、印刷頁2・4・5）</a>
        、
        <a href="https://safety.jsam.jp/img/file.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-2">全日本鍼灸学会：鍼灸安全対策ガイドライン2025年版（印刷頁33・35）</a>
        。救急要請と一般的な施術安全の原則を確認した説明です。個々の病態・配穴・実技条件を検証済みとするものではありません。
        <a href="/safety" className="ml-1 inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-2 dark:text-[#74BA9E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924]">受診の目安</a>
      </div>
    </figure>
  );
}
