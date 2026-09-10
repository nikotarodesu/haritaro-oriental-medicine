"use client";

import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Minimize2,
  Layers,
  HelpCircle,
  Sliders,
  Target,
} from "lucide-react";

export default function PracticeMinimalistAcupoints() {
  const [activeTab, setActiveTab] = useState<"minimal" | "overload">("minimal");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：配穴設計のミニマリズム（Minimalist Formulation）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            「相殺効果」を排除し、最小構成で最大の生体出力を引き出す
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-[#F5F2EB] dark:bg-[#1C2630] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("minimal")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "minimal"
                ? "bg-white dark:bg-[#22303D] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>【推奨】少数精鋭穴（2〜4本）</span>
          </button>
          <button
            onClick={() => setActiveTab("overload")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "overload"
                ? "bg-white dark:bg-[#22303D] text-[#D32F2F] dark:text-[#EF5350] shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#D32F2F] dark:text-[#EF5350]" />
            <span>【警告】多穴乱れ打ち（20本以上）</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        初心者が最も陥りやすい罠が、「あれもこれも治したいからツボを20本も30本も打つ」という多穴刺激です。
        生体にとって、刺激は<strong>「情報」</strong>です。異なるベクトルの情報を同時に乱打すると、<strong>後の刺激が先の刺激を打ち消す『相殺効果』</strong>が発生し、自律神経がパニックを起こします。
      </p>

      {/* 対比コンテンツパネル */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        {activeTab === "minimal" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
                <h5 className="font-bold text-sm sm:text-base text-[#1E3D34] dark:text-[#74BA9E]">
                  最小構成アーキテクチャ：主穴（本治） ＋ 客穴（標治）の2〜4本
                </h5>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2.5 py-1 rounded">
                NOISE-FREE
              </span>
            </div>

            <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              治則を「疏肝理気」の1本に絞り、足の【太衝】で肝気の滞りを解除し、遠隔の【風池】で頭部の熱気を降ろす。
              余計な刺激がないため、中枢神経は<strong>「肝胆の気機を降下させよ」という単一の明確な命令コード</strong>を迷いなく受け取り、術後数分で脈が緩んで呼吸が深まります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  メリット①：明瞭な生体フィードバック
                </strong>
                <span className="text-[#59615D] dark:text-[#CBD5E1]">
                  どのツボが効いたかが100%把握でき、次回の再現性が担保される。
                </span>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  メリット②：正気の消耗ゼロ（安全）
                </strong>
                <span className="text-[#59615D] dark:text-[#CBD5E1]">
                  刺鍼侵襲が最小限であるため、もみ返しや術後の激しい倦怠感が皆無。
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] dark:bg-[#EF5350]" />
                <h5 className="font-bold text-sm sm:text-base text-[#D32F2F] dark:text-[#EF5350]">
                  多穴乱打の病理：相殺効果と自律神経パニック
                </h5>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#D32F2F] bg-[#FFEBEE] dark:bg-[#2D1618] px-2.5 py-1 rounded">
                SIGNAL INTERFERENCE
              </span>
            </div>

            <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              首・肩・背中・腰・手足に20本以上の鍼を打つと、ある部位では「補（交感神経抑制）」、別の部位では「強刺激（交感神経興奮）」が同時に送られます。
              大脳や脊髄の入力ゲート（ゲートコントロール系）が飽和し、<strong>「身体が温まったのか冷えたのか、緊張したのか緩んだのか」</strong>が混乱して、術後に激しい頭痛やだるさ（伐身・誤治）を招きます。
            </p>

            <div className="p-3.5 bg-[#FFEBEE] dark:bg-[#2D1618] rounded-xl border border-[#FFCDD2] dark:border-[#421A20] text-xs">
              <strong className="text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                ⚠️ 相殺効果（Cancellation Effect）のメカニズム：
              </strong>
              <span className="text-[#59615D] dark:text-[#E0D5C1]">
                最初に入れた「補法」の繊細な気至が、後から肩に打った強刺激の「痛覚反射」によって一瞬でかき消される現象。
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 配穴設計の3原則カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
            PRINCIPLE 01
          </span>
          <strong className="text-[#232826] dark:text-[#FAF8F5] block mb-1">
            治則は一つに絞る
          </strong>
          <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
            「実証なら疏肝理気・瀉法」と軸を完全に固定し、同伴する混線指示を徹底的に排除する。
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
            PRINCIPLE 02
          </span>
          <strong className="text-[#232826] dark:text-[#FAF8F5] block mb-1">
            変化量を限定する
          </strong>
          <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
            1回で全快を目指さず、「弦脈が平脈に近づく」「呼吸が深くなる」等の制御可能量を目標とする。
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
            PRINCIPLE 03
          </span>
          <strong className="text-[#232826] dark:text-[#FAF8F5] block mb-1">
            配穴の最小構成
          </strong>
          <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
            通路（経絡）を特定し、本治穴＋標治穴のわずか数穴で狙い撃つ「スナイパー配穴」を極める。
          </p>
        </div>
      </div>
    </figure>
  );
}
