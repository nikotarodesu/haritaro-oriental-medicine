"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import QiBloodLearningScope from './QiBloodLearningScope';

type TriangleRelation = "qi-blood" | "blood-qi" | "qi-water" | "blood-water";

export default function QiBloodTriangle() {
  const [activeRel, setActiveRel] = useState<TriangleRelation>("qi-blood");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：気・血・水の相互依存・循環トライアングル</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            気・血・水の関係を、伝統理論の用語から学ぶ
          </h4>
        </div>

        {/* 連動関係切り替えボタン */}
        <div className="flex flex-wrap items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
          <button
            onClick={() => setActiveRel("qi-blood")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              activeRel === "qi-blood" ? "bg-[#FFA000] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            気 ➜ 血（気為血之帥）
          </button>
          <button
            onClick={() => setActiveRel("blood-qi")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              activeRel === "blood-qi" ? "bg-[#D32F2F] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            血 ➜ 気（血為気之母）
          </button>
          <button
            onClick={() => setActiveRel("qi-water")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              activeRel === "qi-water" ? "bg-[#0288D1] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            気 ⇄ 水（推動と舞台）
          </button>
          <button
            onClick={() => setActiveRel("blood-water")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              activeRel === "blood-water" ? "bg-[#7B1FA2] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            血 ⇄ 水（津血同源）
          </button>
        </div>
      </div>

      {/* トライアングルSVGと解説 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8">
        {/* 左側：SVG循環トライアングル */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-square">
            <svg viewBox="0 0 260 260" className="w-full h-full drop-shadow-sm">
              <defs>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFA000" />
                </marker>
                <marker id="arrow-crimson" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#D32F2F" />
                </marker>
                <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0288D1" />
                </marker>
              </defs>

              {/* 外枠三角形ガイドライン */}
              <polygon points="130,45 220,195 40,195" fill="none" stroke="#E5DEC9" strokeWidth="2" strokeDasharray="3 3" className="dark:stroke-[#2A3B4A]" />

              {/* 辺の矢印群 */}
              {/* 気 ➜ 血（上から右下） */}
              <path
                d="M 145 65 Q 185 110 205 170"
                fill="none"
                stroke="#FFA000"
                strokeWidth={activeRel === "qi-blood" ? "4" : "1.5"}
                markerEnd="url(#arrow-amber)"
                opacity={activeRel === "qi-blood" ? "1" : "0.3"}
              />

              {/* 血 ➜ 気（右下から上） */}
              <path
                d="M 195 180 Q 165 110 135 75"
                fill="none"
                stroke="#D32F2F"
                strokeWidth={activeRel === "blood-qi" ? "4" : "1.5"}
                markerEnd="url(#arrow-crimson)"
                opacity={activeRel === "blood-qi" ? "1" : "0.3"}
              />

              {/* 気 ⇄ 水（上から左下、および戻り） */}
              <path
                d="M 115 70 Q 75 110 55 170"
                fill="none"
                stroke="#0288D1"
                strokeWidth={activeRel === "qi-water" ? "4" : "1.5"}
                markerEnd="url(#arrow-cyan)"
                opacity={activeRel === "qi-water" ? "1" : "0.3"}
              />

              {/* 水 ⇄ 血（底辺の相互移動：津血同源） */}
              <path
                d="M 70 200 L 190 200"
                fill="none"
                stroke="#7B1FA2"
                strokeWidth={activeRel === "blood-water" ? "4" : "1.5"}
                strokeDasharray="4 2"
                opacity={activeRel === "blood-water" ? "1" : "0.3"}
              />

              {/* ノード：気（頂点） */}
              <g transform="translate(130, 45)" className="cursor-pointer" onClick={() => setActiveRel("qi-blood")}>
                <circle cx="0" cy="0" r="26" fill="#FFA000" />
                <text x="0" y="5" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">気</text>
                <text x="0" y="-32" textAnchor="middle" fill="#B86924" fontSize="10" fontWeight="bold">推動・温煦</text>
              </g>

              {/* ノード：血（右下） */}
              <g transform="translate(215, 195)" className="cursor-pointer" onClick={() => setActiveRel("blood-qi")}>
                <circle cx="0" cy="0" r="26" fill="#D32F2F" />
                <text x="0" y="5" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">血</text>
                <text x="0" y="38" textAnchor="middle" fill="#D32F2F" fontSize="10" fontWeight="bold">滋養・精神</text>
              </g>

              {/* ノード：水（左下） */}
              <g transform="translate(45, 195)" className="cursor-pointer" onClick={() => setActiveRel("qi-water")}>
                <circle cx="0" cy="0" r="26" fill="#0288D1" />
                <text x="0" y="5" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">水</text>
                <text x="0" y="38" textAnchor="middle" fill="#0288D1" fontSize="10" fontWeight="bold">滋潤・冷却</text>
              </g>
            </svg>
          </div>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-2 text-center">
            矢印は伝統理論上の関係を整理する比喩
          </span>
        </div>

        {/* 右側：選択された関係の詳しい解説 */}
        <div className="lg:col-span-7 space-y-4">
          {activeRel === "qi-blood" && (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#FFA000]/50 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#B86924] dark:text-[#FFA000]">
                  【気為血之帥（きはけつのすい）】
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF8E1] text-[#B86924] font-bold">
                  推動・先導
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                「気為血之帥」は、血の巡りを気の推動作用と関連づける伝統的な説明です。気が物理的に血液を引っ張ることや、心臓・血管の働きの機序を示すものではありません。
              </p>
              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
                <strong className="text-[#C62828] block mb-1">【伝統的な関連例】気滞と瘀血</strong>
                張りと固定痛などの所見から、気滞と瘀血の候補を比較することがあります。この関連から、微小循環障害や血液粘稠度の変化を確定することはできません。
              </div>
            </div>
          )}

          {activeRel === "blood-qi" && (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#D32F2F]/50 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#D32F2F]">
                  【血為気之母（けつはきの母）】
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDECEC] text-[#D32F2F] font-bold">
                  器・担持
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                「血為気之母」は、血の滋養と気の働きを相互に関連づける伝統的な説明です。「器・乗り物」は記憶を助ける比喩で、気が空気中へ霧散するという物理現象を意味しません。
              </p>
              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
                <strong className="text-[#D32F2F] block mb-1">【用語と安全性】気随血脱</strong>
                出血と著しい衰弱を関連づけた伝統的な用語です。大出血や意識の異常は救急評価を優先します。血虚を貧血の診断と同一視せず、疲労などの原因は医学的に確認します。
              </div>
            </div>
          )}

          {activeRel === "qi-water" && (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#0288D1]/50 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#0288D1]">
                  【気水連動：推動と運化の舞台】
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E1F5FE] text-[#0288D1] font-bold">
                  気化・利水
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                津液の生成・散布・排泄を、肺の宣発、脾の運化、腎の気化などと関連づけて学びます。これらは伝統理論の分類で、腎機能や水分代謝の医学的評価を代替しません。
              </p>
              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
                <strong className="text-[#0288D1] block mb-1">【伝統的な関連例】気虚と水滞</strong>
                疲労とむくみなどの所見から候補を比較する学習例です。むくみの原因や薬の必要性は、この図や伝統分類だけでは判断できません。
              </div>
            </div>
          )}

          {activeRel === "blood-water" && (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#7B1FA2]/50 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#7B1FA2]">
                  【津血同源（しんけつどうげん）】
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3E5F5] text-[#7B1FA2] font-bold">
                  津液と血の関係
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                「津血同源」は、津液と血の生成・滋養を共通の由来から説明する伝統的な概念です。津液を血漿と同一視したり、血管内外の液体の交換をこの概念だけで説明したりしません。
              </p>
              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
                <strong className="text-[#7B1FA2] block mb-1">【古典の読み方】汗と血の喪失を関連づける記述</strong>
                古典上の注意を学ぶ際も、原文・文脈・底本を確認します。脱水や出血を瘀血の確定材料にせず、医療評価を優先してください。この図から発汗・刺絡の手順や適応を判断しません。
              </div>
            </div>
          )}
        </div>
      </div>
      <QiBloodLearningScope />
    </figure>
  );
}
