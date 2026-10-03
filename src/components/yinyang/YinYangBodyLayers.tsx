"use client";

import React, { useState } from "react";
import { Sparkles, Layers, Heart, Zap, User } from "lucide-react";

type LayerTab = "anatomy" | "zangfu" | "physiology";

export default function YinYangBodyLayers() {
  const [activeTab, setActiveTab] = useState<LayerTab>("anatomy");

  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：身体の陰陽を比較する模式図</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            比較の基準を変えて学ぶ「身体の陰陽」
          </h4>
        </div>

        {/* タブ切り替えボタン */}
        <div role="group" aria-label="陰陽を比較する観点" className="grid grid-cols-3 sm:flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] w-full sm:w-auto">
          <button
            type="button"
            aria-pressed={activeTab === "anatomy"}
            onClick={() => setActiveTab("anatomy")}
            className={`min-h-11 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
              activeTab === "anatomy"
                ? "bg-[#1E3D34] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span>① 配置</span>
          </button>
          <button
            type="button"
            aria-pressed={activeTab === "zangfu"}
            onClick={() => setActiveTab("zangfu")}
            className={`min-h-11 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
              activeTab === "zangfu"
                ? "bg-[#1E3D34] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Heart className="w-3.5 h-3.5 shrink-0" />
            <span>② 蔵象</span>
          </button>
          <button
            type="button"
            aria-pressed={activeTab === "physiology"}
            onClick={() => setActiveTab("physiology")}
            className={`min-h-11 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${
              activeTab === "physiology"
                ? "bg-[#1E3D34] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span>③ 比較の限界</span>
          </button>
        </div>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
        陰陽は、比較する基準によって変わる伝統的な分類です。図の色分けは学習用の例で、身体機能や病気を判定する検査ではありません。
      </p>

      {/* メイン表示エリア */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-6 md:p-8">
        {/* 左側：人体シルエットSVGと陰陽オーバーレイ */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[210px] h-72 sm:w-64 sm:h-96 flex items-center justify-center bg-white dark:bg-[#1A2530] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-inner p-3 sm:p-4">
            <svg viewBox="0 0 200 320" role="img" aria-label="身体の上下、蔵象、現代医学との比較を示す陰陽の模式図" className="w-full h-full">
              <defs>
                <linearGradient id="bodyYangGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C45A4A" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E26A5A" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="bodyYinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0F1E30" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* 上半身（陽）：赤色ハイライト */}
              <rect x="20" y="20" width="160" height="120" rx="10" fill="url(#bodyYangGrad)" opacity={activeTab === "anatomy" ? "0.8" : "0.3"} />
              
              {/* 下半身（陰）：青色ハイライト */}
              <rect x="20" y="150" width="160" height="150" rx="10" fill="url(#bodyYinGrad)" opacity={activeTab === "anatomy" ? "0.8" : "0.3"} />

              {/* 人体シルエット（簡易抽象アイコン） */}
              {/* 頭部 */}
              <circle cx="100" cy="50" r="22" fill="#FAF8F5" stroke="#232826" strokeWidth="2.5" className="dark:fill-[#17212A] dark:stroke-[#FAF8F5]" />
              {/* 胴体 */}
              <path
                d="M 65 85 Q 100 78 135 85 L 125 190 Q 100 195 75 190 Z"
                fill="#FAF8F5"
                stroke="#232826"
                strokeWidth="2.5"
                className="dark:fill-[#17212A] dark:stroke-[#FAF8F5]"
              />
              {/* 両腕 */}
              <path d="M 65 90 L 40 180" stroke="#232826" strokeWidth="6" strokeLinecap="round" className="dark:stroke-[#FAF8F5]" />
              <path d="M 135 90 L 160 180" stroke="#232826" strokeWidth="6" strokeLinecap="round" className="dark:stroke-[#FAF8F5]" />
              {/* 両脚 */}
              <path d="M 85 190 L 80 290" stroke="#232826" strokeWidth="7" strokeLinecap="round" className="dark:stroke-[#FAF8F5]" />
              <path d="M 115 190 L 120 290" stroke="#232826" strokeWidth="7" strokeLinecap="round" className="dark:stroke-[#FAF8F5]" />

              {/* レイヤー別アノテーション */}
              {activeTab === "anatomy" && (
                <>
                  <line x1="10" y1="145" x2="190" y2="145" stroke="#E6C387" strokeWidth="2" strokeDasharray="4 3" />
                  
                  {/* 上部・陽バッジ */}
                  <g>
                    <rect x="20" y="24" width="160" height="24" rx="12" fill="#FFFFFF" fillOpacity="0.92" stroke="#DC2626" strokeWidth="1.5" className="dark:fill-[#17212A] dark:stroke-[#F87171]" />
                    <text x="100" y="40" textAnchor="middle" fill="#991B1B" fontSize="11" fontWeight="bold" className="dark:fill-[#FCA5A5]">
                      ▲ 上部・背側・表層（陽）
                    </text>
                  </g>

                  {/* 下部・陰バッジ */}
                  <g>
                    <rect x="20" y="254" width="160" height="24" rx="12" fill="#FFFFFF" fillOpacity="0.92" stroke="#2563EB" strokeWidth="1.5" className="dark:fill-[#17212A] dark:stroke-[#60A5FA]" />
                    <text x="100" y="270" textAnchor="middle" fill="#1E3A8A" fontSize="11" fontWeight="bold" className="dark:fill-[#93C5FD]">
                      ▼ 下部・腹側・深部（陰）
                    </text>
                  </g>
                </>
              )}

              {activeTab === "zangfu" && (
                <>
                  {/* 胸郭（心・肺：上焦の陰臓） */}
                  <circle cx="100" cy="115" r="18" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="2" className="dark:fill-[#DC2626] dark:stroke-[#17212A]" />
                  <text x="100" y="119" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">心・肺</text>

                  {/* 腹部（脾・胃・肝・胆・腎・腸） */}
                  <circle cx="80" cy="146" r="12" fill="#1E3D34" stroke="#FFFFFF" strokeWidth="1.5" className="dark:stroke-[#17212A]" />
                  <circle cx="120" cy="146" r="12" fill="#B86924" stroke="#FFFFFF" strokeWidth="1.5" className="dark:stroke-[#17212A]" />
                  
                  {/* 五臓六腑バッジ */}
                  <rect x="35" y="162" width="130" height="22" rx="11" fill="#1E3A5F" stroke="#FFFFFF" strokeWidth="1.5" className="dark:fill-[#1E293B] dark:stroke-[#64748B]" />
                    <text x="100" y="177" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">五臓・六腑：伝統的分類</text>
                </>
              )}

              {activeTab === "physiology" && (
                <>
                  {/* 分類と医学的な機序を区別するための表示 */}
                  <path d="M 45 98 Q 100 128 155 98" fill="none" stroke="#DC2626" strokeWidth="3" />
                  <g>
                    <rect x="35" y="78" width="130" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.95" stroke="#DC2626" strokeWidth="1.5" className="dark:fill-[#17212A] dark:stroke-[#F87171]" />
                    <text x="100" y="93" textAnchor="middle" fill="#991B1B" fontSize="10" fontWeight="bold" className="dark:fill-[#FCA5A5]">
                      陰陽：伝統的な分類
                    </text>
                  </g>

                  <path d="M 155 210 Q 100 180 45 210" fill="none" stroke="#2563EB" strokeWidth="3" />
                  <g>
                    <rect x="30" y="222" width="140" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.95" stroke="#2563EB" strokeWidth="1.5" className="dark:fill-[#17212A] dark:stroke-[#60A5FA]" />
                    <text x="100" y="237" textAnchor="middle" fill="#1E3A8A" fontSize="10" fontWeight="bold" className="dark:fill-[#93C5FD]">
                      医学：機序を検証
                    </text>
                  </g>
                </>
              )}
            </svg>

            {/* カラーインジケーター */}
            <div className="absolute bottom-2 inset-x-2 flex justify-between px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-[10px] text-white font-medium">
              <span className="flex items-center gap-1 text-[#F87171]">
                ● 陽：比較の一方
              </span>
              <span className="flex items-center gap-1 text-[#60A5FA]">
                ● 陰：対となる側
              </span>
            </div>
          </div>
        </div>

        {/* 右側：タブに応じた詳細対照データ */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === "anatomy" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Layers className="w-4 h-4 text-[#B86924]" />
                <span>① 身体の配置を相対的に比べる</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                上下・表層と深部・背腹など、比較する位置を決めて陰陽を当てはめます。同じ部位でも比較相手や基準が変われば分類が変わります。
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                  <div>
                    <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block">【上部】頭・頸・胸（陽）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">下部と比較して、上に位置する側を陽とする例</span>
                  </div>
                  <div className="sm:text-right border-t sm:border-t-0 pt-1 sm:pt-0 border-[#E5DEC9]/40">
                    <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block">【下部】腹・腰・下肢（陰）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">上部と比較して、下に位置する側を陰とする例</span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                  <div>
                    <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block">【表層】皮膚・筋膜・筋肉（陽）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">深部との比較では、外側にある層を陽とする例</span>
                  </div>
                  <div className="sm:text-right border-t sm:border-t-0 pt-1 sm:pt-0 border-[#E5DEC9]/40">
                    <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block">【深部】骨・骨髄・内臓（陰）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">表層との比較では、内側にある層を陰とする例</span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                  <div>
                    <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block">【背部】背中・腰背筋群（陽）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">背と腹を対にして、背側を陽とする伝統的な分類</span>
                  </div>
                  <div className="sm:text-right border-t sm:border-t-0 pt-1 sm:pt-0 border-[#E5DEC9]/40">
                    <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block">【腹部】胸腹部・屈曲面（陰）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">背と腹を対にして、腹側を陰とする伝統的な分類</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "zangfu" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Heart className="w-4 h-4 text-[#B86924]" />
                <span>② 蔵象（五臓と六腑の伝統的な役割）</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                『素問・五臓別論』では、精気を蔵す五臓と、水穀を伝化する六腑を対比します。蔵象の名称・働きは、現代解剖学の臓器と同一ではありません。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-4 rounded-xl bg-[#EBF1F6] dark:bg-[#152535] border border-[#D5E1EC] dark:border-[#243B52] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#1E3A5F] dark:text-[#60A5FA]">五臓（陰）</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-[#0E1A26] text-[#1E3A5F] dark:text-[#60A5FA] font-mono">肝・心・脾・肺・腎</span>
                  </div>
                  <strong className="block text-[11px] text-[#232826] dark:text-[#FAF8F5]">
                    「精気を蔵して漏らさず、満ちて実すべからず」
                  </strong>
                  <p className="text-[11px] text-[#59615D] dark:text-[#9FB7CE] leading-relaxed">
                    精気を蔵すという伝統的な働きに着目した分類です。「蔵す」を血液や体液の貯蔵量に置き換えて、臓器の正常・異常を判断することはできません。
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCF4EB] dark:bg-[#281A16] border border-[#F3E1CB] dark:border-[#4A2C22] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#C45A4A] dark:text-[#F87171]">六腑（陽）</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-[#1D110D] text-[#C45A4A] dark:text-[#F87171] font-mono">胆・小腸・胃・大腸・膀胱・三焦</span>
                  </div>
                  <strong className="block text-[11px] text-[#232826] dark:text-[#FAF8F5]">
                    「水穀を伝化して蔵さず、実して満つべからず」
                  </strong>
                  <p className="text-[11px] text-[#59615D] dark:text-[#D1A39D] leading-relaxed">
                    水穀を伝化するという伝統的な働きに着目した分類です。六腑すべてを管腔臓器とみなすことはできず、三焦も現代解剖学の単独の器官とは同一ではありません。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "physiology" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Zap className="w-4 h-4 text-[#B86924]" />
                <span>③ 現代医学との比較と限界</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                活動と休息などを例に陰陽を考えることはできますが、比喩と医学的な機序は区別します。神経・代謝・血管を固定的に陰陽へ対応させることはできません。
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                    自律神経との比較
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <span className="text-[#C45A4A] dark:text-[#F87171]">
                      <strong>学習上の比較：</strong>活動と休息の対比から、陰陽が相対的であることを考える。
                    </span>
                    <span className="text-[#1E3A5F] dark:text-[#60A5FA]">
                      <strong>適用の限界：</strong>交感神経・副交感神経の働きや疾患は、陰陽の分類だけでは判定できない。
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                    代謝との比較
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <span className="text-[#C45A4A] dark:text-[#F87171]">
                      <strong>学習上の比較：</strong>異化・同化は具体的な代謝反応を表す用語で、陰陽と同義ではない。
                    </span>
                    <span className="text-[#1E3A5F] dark:text-[#60A5FA]">
                      <strong>適用の限界：</strong>冷え・ほてりだけから、代謝反応や内分泌疾患の有無を判断しない。
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                    血管・リンパとの比較
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <span className="text-[#C45A4A] dark:text-[#F87171]">
                      <strong>学習上の比較：</strong>動脈・静脈・リンパ管は、それぞれの構造と機能から学ぶ。
                    </span>
                    <span className="text-[#1E3A5F] dark:text-[#60A5FA]">
                      <strong>適用の限界：</strong>器官名だけで陰陽を固定したり、循環障害を判定したりしない。
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
