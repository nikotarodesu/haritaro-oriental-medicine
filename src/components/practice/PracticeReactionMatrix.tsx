"use client";

import React, { useState } from "react";
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  Heart,
} from "lucide-react";

export default function PracticeReactionMatrix() {
  const [selectedCase, setSelectedCase] = useState<"meigen" | "worsened">("meigen");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：瞑眩（好転反応）vs 悪化（誤治）の峻別マトリクス</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            術後のだるさ・変化は「治癒の摩擦」か「生体の悲鳴」か？
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          48時間ルールによる判定
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        施術後の患者から「身体が重だるくなった」「痛みが強くなった気がする」と連絡があったとき、
        すべてを安易に「好転反応（瞑眩）ですから様子を見てください」と言い逃れるのは極めて危険な誤治の見逃しです。
        <strong>「回復プロセスの摩擦（瞑眩）」</strong>と<strong>「刺激過剰・方向違いによる生体破壊（誤治・伐身）」</strong>を客観指標で峻別します。
      </p>

      {/* 2分岐トグルボタン */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setSelectedCase("meigen")}
          className={`p-4 rounded-xl text-left border transition-all ${
            selectedCase === "meigen"
              ? "bg-[#E8F5E9] dark:bg-[#132A1C] border-[#2E7D32] dark:border-[#74BA9E] shadow-sm ring-2 ring-[#2E7D32]/20"
              : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2 py-0.5 rounded">
              好転反応
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          </div>
          <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
            瞑眩（めいげん・調整反応）
          </div>
          <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] mt-1">
            滞っていた気血が急激に流れ出すことで生じる一過性の摩擦現象。
          </p>
        </button>

        <button
          onClick={() => setSelectedCase("worsened")}
          className={`p-4 rounded-xl text-left border transition-all ${
            selectedCase === "worsened"
              ? "bg-[#FFEBEE] dark:bg-[#2D1618] border-[#D32F2F] dark:border-[#EF5350] shadow-sm ring-2 ring-[#D32F2F]/20"
              : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#D32F2F] dark:text-[#EF5350] bg-[#FFCDD2] dark:bg-[#421A20] px-2 py-0.5 rounded">
              誤治・生体損傷
            </span>
            <AlertTriangle className="w-4 h-4 text-[#D32F2F] dark:text-[#EF5350]" />
          </div>
          <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
            悪化（伐身・ばつしん）
          </div>
          <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] mt-1">
            補瀉の方向ミス、または刺激総量オーバーにより正気が削られた状態。
          </p>
        </button>
      </div>

      {/* 詳細比較テーブルカード */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 space-y-4">
        {selectedCase === "meigen" ? (
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <CheckCircle2 className="w-4 h-4" />
              <span>【瞑眩の特徴】48時間以内に自然消失し、その後劇的に軽快する</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  ① 自律神経・睡眠
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  だるさはあるが「泥のように深く眠れた」。起床後に目が冴え、気分は明るい。
                </p>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  ② 脈状・腹壁の変化
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  脈は落ち着いて胃気（柔らかさ）があり、お腹の硬結・圧痛は減少している。
                </p>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  ③ 臨床対処アクション
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  水分をとって安静を指示。次回は刺激量を「2〜3割減」にして最適点へ微調整。
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#D32F2F] dark:text-[#EF5350]">
              <AlertTriangle className="w-4 h-4" />
              <span>【悪化（誤治）の特徴】48時間を超えても症状が増悪・持続する</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[11px] text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                  ① 自律神経・睡眠
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  目が冴えて眠れない、悪夢、動悸、吐き気、イライラ、防御性の強い筋緊張。
                </p>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[11px] text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                  ② 脈状・腹壁の変化
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  脈が弦急に張るか極度に沈衰。お腹が板のように突っ張る（交感神経過緊張）。
                </p>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[11px] text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                  ③ 臨床対処アクション
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  自らの過誤を認め、湧泉等で気を降ろし安静を促す。次回は診断を最初からリセット。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
