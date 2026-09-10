"use client";

import React, { useState } from "react";
import { Sparkles, Eye, Ear, MessageSquare, Hand, Stethoscope, ArrowRight } from "lucide-react";

type ShishinTab = "all" | "bo" | "bun" | "mon" | "setsu";

export default function YinYangShishinChart() {
  const [activeTab, setActiveTab] = useState<ShishinTab>("all");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：四診の陰陽対照チェックチャート</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            診察ベッドで見極める「病態ベクトルの陰陽スキャン」
          </h4>
        </div>

        {/* 四診フィルター */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "all" ? "bg-[#1E3D34] text-white" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            全体
          </button>
          <button
            onClick={() => setActiveTab("bo")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "bo" ? "bg-[#1E3D34] text-white" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            望診（視）
          </button>
          <button
            onClick={() => setActiveTab("bun")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "bun" ? "bg-[#1E3D34] text-white" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            聞診（聴嗅）
          </button>
          <button
            onClick={() => setActiveTab("mon")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "mon" ? "bg-[#1E3D34] text-white" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            問診（問）
          </button>
          <button
            onClick={() => setActiveTab("setsu")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "setsu" ? "bg-[#1E3D34] text-white" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            切診（触）
          </button>
        </div>
      </div>

      {/* 診察ベッドと左右引き出し線レイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7">
        {/* 左側：陽証（熱・動・実）の引き出しカード */}
        <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
          <div className="p-3.5 rounded-2xl bg-[#FCF4EB] dark:bg-[#2A1713] border-2 border-[#C45A4A]/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C45A4A] dark:text-[#F87171] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C45A4A]" />
                陽証のサイン（動・熱・実）
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C45A4A] text-white font-bold">亢進・熱邪</span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#D1A39D]">
              生命エネルギーが過剰に浮揚・亢進し、熱と炎症が外表・上部に噴出している状態。
            </p>
          </div>

          <div className="space-y-2 text-xs">
            {(activeTab === "all" || activeTab === "bo") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【望診・目と顔色】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  顔色紅潮・つやあり、眼光鋭く落ち着きがない。舌質紅（真っ赤）・乾燥・黄色い苔（黄燥苔）。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "bun") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【聞診・声と呼吸】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  声が太く大きく高い。呼吸が荒く息遣いが強い（喘鳴・上逆）。激しい咳。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "mon") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【問診・自覚症状】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  発熱・身体の熱感、冷たい水を欲する（喜冷飲）、頑固な便秘、イライラ・不眠。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "setsu") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#C45A4A] shadow-xs">
                <strong className="text-[#C45A4A] dark:text-[#F87171] block font-bold mb-0.5">【切診・脈と腹壁】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  脈が浮いて速く指を強く弾く（浮・数・実）。腹壁に強い張り・緊張・抵抗感・圧痛（拒按）。
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
                臨床診察ベッド（四診統合スキャン）
              </span>
            </div>

            <svg viewBox="0 0 200 240" className="w-full h-auto mx-auto">
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
          </div>
        </div>

        {/* 右側：陰証（寒・静・虚）の引き出しカード */}
        <div className="lg:col-span-4 space-y-3 order-3">
          <div className="p-3.5 rounded-2xl bg-[#EBF1F6] dark:bg-[#13202C] border-2 border-[#1E3A5F]/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E3A5F] dark:text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A5F]" />
                陰証のサイン（静・寒・虚）
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E3A5F] text-white font-bold">沈滞・寒邪</span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#9FB7CE]">
              生命エネルギーが沈滞・減退し、冷えと機能低下が深層・内臓に滞留している状態。
            </p>
          </div>

          <div className="space-y-2 text-xs">
            {(activeTab === "all" || activeTab === "bo") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【望診・目と顔色】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  顔色蒼白・つやなく枯燥、表情が乏しく沈鬱。舌質淡白（白っぽい）・湿潤・白い苔（白滑苔）。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "bun") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【聞診・声と呼吸】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  声が小さく消え入りそう、話すのを億劫がる（少気懶言）。呼吸が浅く細く弱々しい。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "mon") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【問診・自覚症状】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  身体の芯からの悪寒、温かい飲み物を欲する（喜熱飲）、軟便・水様便、過眠・強い無力感。
                </p>
              </div>
            )}
            {(activeTab === "all" || activeTab === "setsu") && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border-r-4 border-[#1E3A5F] shadow-xs">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block font-bold mb-0.5">【切診・脈と腹壁】</strong>
                <p className="text-[#404743] dark:text-[#D1C6BA] text-[11px]">
                  脈が沈んで遅く、押さえると力がない（沈・遅・虚・微）。腹壁軟弱無力で底冷え、圧迫を喜ぶ（喜按）。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
