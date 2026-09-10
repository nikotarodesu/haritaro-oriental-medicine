"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Scan, Compass, BookOpen, Stethoscope, CheckCircle2, ChevronRight } from "lucide-react";

interface Props {
  onNextLecture?: () => void;
}

export default function PathomechanismDiagnosticBridge({ onNextLecture }: Props) {
  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑧：病態の解読から確定診断へのブリッジ図（Bridge to Diagnosis）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            絡み合う病機をスキャンし「確定証」へ収束させる ── 診断学へのゲートウェイ
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          病機論から診断論への論理的展開
        </span>
      </div>

      {/* フロー模式図（3ステップ収束） */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* STEP 1: 混沌とした病態 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] relative">
            <div className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-1">
              INPUT 01
            </div>
            <div className="text-xs font-bold text-[#D32F2F] dark:text-[#EF5350] mb-2 flex items-center gap-1">
              <span>複雑な病態カオス</span>
            </div>
            <div className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
              気機失調 ＋ 痰湿 ＋ 瘀血
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              頭痛・胃もたれ・不眠・冷えのぼせなど、多愁訴が重なり合って一見どこから手をつけて良いかわからない状態。
            </p>
          </div>

          {/* STEP 2: 四診スキャナー */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border-2 border-[#1E3D34] dark:border-[#74BA9E] relative shadow-xs">
            <div className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-1">
              PROCESSING 02
            </div>
            <div className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2 flex items-center gap-1">
              <Scan className="w-3.5 h-3.5" />
              <span>四診フィルター（望・聞・問・切）</span>
            </div>
            <div className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
              身体サインの客観スキャン
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              舌質・舌苔、脈状、腹壁の硬結、顔色、呼吸音、問診情報を照合し、主病因と病位を絞り込む。
            </p>
          </div>

          {/* STEP 3: 確定診断（証） */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-1">
              OUTPUT 03
            </div>
            <div className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] mb-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              <span>八綱弁証 ＆ 臓腑弁証</span>
            </div>
            <div className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
              確定診断（証）の同定
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              「肝気鬱結 ➜ 脾失健運（本虚標実）」のように、病気の方角と治療の優先順位（治則）を確定させる。
            </p>
          </div>
        </div>

        {/* 診断論への導入解説 */}
        <div className="mt-5 p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#232826] dark:text-[#FAF8F5]">病機論がもたらす最大の臨床的武器：</strong>
            病機（破綻プロセス）を知っている施術者は、患者の1つの症状だけを見て場当たり的にツボを選ぶことがありません。
            「この症状はどのドミノ倒しのどこに位置しているのか」を正確に逆算し、根っこのドミノを狙い撃つことができるようになります。
          </div>
        </div>
      </div>

      {/* 次の講義へのナビゲーションカード */}
      <div className="bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] dark:from-[#122816] dark:to-[#1B4D3E] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A5D6A7] font-bold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>カリキュラムの次なるステージへ</span>
          </div>
          <h5 className="font-serif font-bold text-lg sm:text-xl text-white">
            体系学習カリキュラム⑥：診断論（四診法と弁証論治 ― 望聞問切から導く診断アルゴリズム）
          </h5>
          <p className="text-xs text-[#E8F5E9]/90 mt-1 max-w-xl leading-relaxed">
            患者の訴えと身体サインを客観的に収集し、八綱弁証（陰陽・表裏・寒熱・虚実）から臓腑証へ落とし込む診断の思考回路を網羅します。
          </p>
        </div>

        <button
          onClick={onNextLecture}
          className="shrink-0 px-5 py-3 rounded-xl bg-[#FFA000] hover:bg-[#FF8F00] text-[#1E3D34] font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:translate-x-0.5"
        >
          <span>第6講へ進む</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </figure>
  );
}
