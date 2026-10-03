"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

type ShishinTab = "all" | "bo" | "bun" | "mon" | "setsu";

export default function YinYangShishinChart() {
  const [activeTab, setActiveTab] = useState<ShishinTab>("all");

  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：四診で観察する所見を比較する図</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            四診の所見を陰陽の観点から整理する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          図の下のボタンで観察方法ごとの例を切り替え
        </span>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
        左右は伝統的な傾向を学ぶための例示で、診断用のチェックリストではありません。顔色・舌・脈・症状を合わせても、炎症、内臓の異常、病気の原因や緊急性をこの図で確定することはできません。
      </p>

      {/* 診察ベッドと左右引き出し線レイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-7">
        {/* 左側：陽側に整理する所見の例 */}
        <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
          <div className="p-3.5 rounded-2xl bg-[#FCF4EB] dark:bg-[#2A1713] border-2 border-[#C45A4A]/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C45A4A] dark:text-[#F87171] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C45A4A]" />
                陽側に整理する所見の例
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C45A4A] text-white font-bold">学習上の傾向</span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#D1A39D]">
              活動的な様子や熱感などを陽の側に整理する伝統的な見方です。炎症の有無や程度を示す医学的な指標ではありません。
            </p>
          </div>

          <div className="space-y-2 text-xs">
            {(activeTab === "all" || activeTab === "bo") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【望診・目と顔色】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  顔の赤み、舌の赤み・乾燥、黄色い苔（黄苔）などの観察語。必ずそろう所見ではなく、それだけで分類や病気を確定できません。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "bun") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【聞診・声と呼吸】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  大きな声、荒い呼吸、咳などの様子を観察する例。急な強い息苦しさは、陰陽の分類より医学的評価と救急対応を優先します。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "mon") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【問診・自覚症状】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  熱感、冷たい飲み物を好む（喜冷飲）、便通、睡眠などを尋ねる例。主観的な熱感と測定した体温は区別し、冷却や薬の判断は行いません。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "setsu") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【切診・脈と腹壁】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  脈の浮・数・実、圧迫を嫌がる（拒按）などの伝統的な観察語。脈拍や腹部所見の医学的な評価とは区別し、自己触診で原因を決めつけません。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 中央：診察ベッドと患者イラストSVG */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[260px] bg-white dark:bg-[#17212A] rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A] p-4 shadow-sm">
            <div className="text-center mb-2">
              <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
                四診で観察する部位の模式図
              </span>
            </div>

            <svg viewBox="0 0 200 240" role="img" aria-label="舌・呼吸・脈・腹部などの観察位置を示す模式図" className="w-full h-auto mx-auto">
              {/* 診察ベッド */}
              <rect x="25" y="40" width="150" height="180" rx="14" fill="#FAF8F5" stroke="#E5DEC9" strokeWidth="2" className="dark:fill-[#121920] dark:stroke-[#2A3B4A]" />
              <rect x="40" y="50" width="120" height="35" rx="8" fill="#EBF3EF" stroke="#C5DED4" className="dark:fill-[#182823] dark:stroke-[#2A3B4A]" />

              {/* 仰臥位の患者シルエット */}
              {/* 頭部（顔・目・舌） */}
              <circle cx="100" cy="75" r="16" fill="#F2EDE4" stroke="#232826" strokeWidth="2" className="dark:fill-[#22303D] dark:stroke-[#FAF8F5]" />
              {/* 胴体（呼吸・胸腹部） */}
              <path d="M 75 100 Q 100 95 125 100 L 120 170 Q 100 175 80 170 Z" fill="#F2EDE4" stroke="#232826" strokeWidth="2" className="dark:fill-[#22303D] dark:stroke-[#FAF8F5]" />
              {/* 手首（脈診部位） */}
              <circle cx="65" cy="140" r="5" fill="#C45A4A" opacity="0.85" />
              <circle cx="135" cy="140" r="5" fill="#1E3A5F" opacity="0.85" />
              {/* 下肢 */}
              <path d="M 85 170 L 85 210" stroke="#232826" strokeWidth="5" strokeLinecap="round" className="dark:stroke-[#FAF8F5]" />
              <path d="M 115 170 L 115 210" stroke="#232826" strokeWidth="5" strokeLinecap="round" className="dark:stroke-[#FAF8F5]" />

              {/* 引き出し線（左＝陽証・赤） */}
              <line x1="84" y1="75" x2="30" y2="70" stroke="#C45A4A" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="75" y1="120" x2="25" y2="120" stroke="#C45A4A" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="65" y1="140" x2="20" y2="150" stroke="#C45A4A" strokeWidth="1.5" strokeDasharray="2 2" />

              {/* 引き出し線（右＝陰証・青） */}
              <line x1="116" y1="75" x2="170" y2="70" stroke="#1E3A5F" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="125" y1="120" x2="175" y2="120" stroke="#1E3A5F" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="135" y1="140" x2="180" y2="150" stroke="#1E3A5F" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>

            <div className="mt-2 text-center text-[10px] text-[#737C77] dark:text-[#8899A6]">
              手首（脈診）・腹壁（腹診）・舌（舌診）
            </div>

            {/* 四診切り替えボタン（体のSVGの直下に配置） */}
            <div className="mt-3 pt-3 border-t border-[#E8E1D1] dark:border-[#2A3B4A]">
              <div className="text-[10px] font-bold text-center text-[#1E3D34] dark:text-[#74BA9E] mb-2 flex items-center justify-center gap-1">
                <span>観察方法を選択して左右の例を比較</span>
              </div>
              <div role="group" aria-label="四診の観察方法" className="grid grid-cols-3 gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[11px]">
                <button
                  type="button"
                  aria-pressed={activeTab === "all"}
                  onClick={() => setActiveTab("all")}
                  className={`min-h-11 py-1.5 rounded-lg font-bold transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
                    activeTab === "all"
                      ? "bg-[#1E3D34] text-white shadow-xs"
                      : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
                  }`}
                >
                  全体
                </button>
                <button
                  type="button"
                  aria-pressed={activeTab === "bo"}
                  onClick={() => setActiveTab("bo")}
                  className={`min-h-11 py-1.5 rounded-lg font-bold transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
                    activeTab === "bo"
                      ? "bg-[#1E3D34] text-white shadow-xs"
                      : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
                  }`}
                >
                  望診
                </button>
                <button
                  type="button"
                  aria-pressed={activeTab === "bun"}
                  onClick={() => setActiveTab("bun")}
                  className={`min-h-11 py-1.5 rounded-lg font-bold transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
                    activeTab === "bun"
                      ? "bg-[#1E3D34] text-white shadow-xs"
                      : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
                  }`}
                >
                  聞診
                </button>
                <button
                  type="button"
                  aria-pressed={activeTab === "mon"}
                  onClick={() => setActiveTab("mon")}
                  className={`min-h-11 py-1.5 rounded-lg font-bold transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
                    activeTab === "mon"
                      ? "bg-[#1E3D34] text-white shadow-xs"
                      : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
                  }`}
                >
                  問診
                </button>
                <button
                  type="button"
                  aria-pressed={activeTab === "setsu"}
                  onClick={() => setActiveTab("setsu")}
                  className={`min-h-11 py-1.5 rounded-lg font-bold transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
                    activeTab === "setsu"
                      ? "bg-[#1E3D34] text-white shadow-xs"
                      : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
                  }`}
                >
                  切診
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右側：陰側に整理する所見の例 */}
        <div className="lg:col-span-4 space-y-3 order-3">
          <div className="p-3.5 rounded-2xl bg-[#EBF1F6] dark:bg-[#13202C] border-2 border-[#1E3A5F]/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E3A5F] dark:text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A5F]" />
                陰側に整理する所見の例
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E3A5F] text-white font-bold">学習上の傾向</span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#9FB7CE]">
              静かな様子や冷えなどを陰の側に整理する伝統的な見方です。内臓の機能低下や病変が深部にあることと同一ではありません。
            </p>
          </div>

          <div className="space-y-2 text-xs">
            {(activeTab === "all" || activeTab === "bo") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【望診・目と顔色】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  顔色が白っぽい、舌が淡白、白い苔などの観察語。顔色や舌の色だけで貧血・循環障害などの有無を判定することはできません。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "bun") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【聞診・声と呼吸】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  小さな声、少気懶言などの伝統的な観察語。呼吸の弱さや意識の変化を「陰の傾向」として放置せず、医学的評価を優先します。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "mon") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【問診・自覚症状】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  冷え、温かい飲み物を好む（喜熱飲）、軟便などを尋ねる例。加熱や灸の適否、症状の原因はこの分類だけでは判断できません。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "setsu") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【切診・脈と腹壁】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  脈の沈・遅・虚・微、圧迫を好む（喜按）などの伝統的な観察語。複数の所見を集めても、病気の原因や刺鍼条件が確定するわけではありません。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-[11px] leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
        急な強い呼吸困難、止まらないけいれん、意識の異常などは、四診の分類を続けず救急対応を優先してください。
        <a href="https://www.fdma.go.jp/publication/portal/items/portal002_japanese.pdf" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-2">消防庁：救急車利用マニュアル（2025年10月、印刷頁4・5）</a>
        で救急要請の目安を確認しています。この資料は、図中の伝統的な所見分類を検証するものではありません。
        <a href="/safety" className="ml-1 inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-2 dark:text-[#74BA9E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924]">受診の目安</a>
      </div>
    </figure>
  );
}
