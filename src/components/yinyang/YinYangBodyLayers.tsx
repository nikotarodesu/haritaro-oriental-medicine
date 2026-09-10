"use client";

import React, { useState } from "react";
import { Sparkles, Layers, Shield, Heart, Zap, User } from "lucide-react";

type LayerTab = "anatomy" | "zangfu" | "physiology";

export default function YinYangBodyLayers() {
  const [activeTab, setActiveTab] = useState<LayerTab>("anatomy");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：人体の陰陽レイヤー解剖図（Multi-Layer Body Scanning）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            多層レイヤーで読み解く「人体の陰陽立体マップ」
          </h4>
        </div>

        {/* タブ切り替えボタン */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("anatomy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "anatomy"
                ? "bg-[#1E3D34] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>① 解剖配置</span>
          </button>
          <button
            onClick={() => setActiveTab("zangfu")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "zangfu"
                ? "bg-[#1E3D34] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>② 蔵象（臓腑）</span>
          </button>
          <button
            onClick={() => setActiveTab("physiology")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "physiology"
                ? "bg-[#1E3D34] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>③ 現代生理学</span>
          </button>
        </div>
      </div>

      {/* メイン表示エリア */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8">
        {/* 左側：人体シルエットSVGと陰陽オーバーレイ */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex items-center justify-center bg-white dark:bg-[#1A2530] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-inner p-4">
            <svg viewBox="0 0 200 320" className="w-full h-full">
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
                  <text x="100" y="40" textAnchor="middle" fill="#C45A4A" fontSize="11" fontWeight="bold">
                    ▲ 上部・背側・表層（陽）
                  </text>
                  <text x="100" y="270" textAnchor="middle" fill="#7BAAD8" fontSize="11" fontWeight="bold">
                    ▼ 下部・腹側・深部（陰）
                  </text>
                </>
              )}

              {activeTab === "zangfu" && (
                <>
                  {/* 胸郭（心・肺：上焦の陰臓） */}
                  <circle cx="100" cy="115" r="14" fill="#C45A4A" opacity="0.85" />
                  <text x="100" y="119" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold">心・肺</text>
                  {/* 腹部（脾・胃・肝・胆・腎・腸） */}
                  <circle cx="85" cy="145" r="10" fill="#1E3D34" opacity="0.8" />
                  <circle cx="115" cy="145" r="10" fill="#B86924" opacity="0.8" />
                  <rect x="75" y="160" width="50" height="20" rx="6" fill="#1E3A5F" opacity="0.85" />
                  <text x="100" y="174" textAnchor="middle" fill="#FFF" fontSize="8" fontWeight="bold">五臓(貯蔵)/六腑(流動)</text>
                </>
              )}

              {activeTab === "physiology" && (
                <>
                  {/* 自律神経・代謝の動態シンボル */}
                  <path d="M 50 100 Q 100 130 150 100" fill="none" stroke="#C45A4A" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="100" y="95" textAnchor="middle" fill="#C45A4A" fontSize="10" fontWeight="bold">交感神経 / 異化</text>
                  <path d="M 150 210 Q 100 180 50 210" fill="none" stroke="#1E3A5F" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="100" y="235" textAnchor="middle" fill="#60A5FA" fontSize="10" fontWeight="bold">副交感神経 / 同化</text>
                </>
              )}
            </svg>

            {/* カラーインジケーター */}
            <div className="absolute bottom-2 inset-x-2 flex justify-between px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-[10px] text-white font-medium">
              <span className="flex items-center gap-1 text-[#F87171]">
                ● 陽：軽快・防御・活動
              </span>
              <span className="flex items-center gap-1 text-[#60A5FA]">
                ● 陰：重厚・蓄積・維持
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
                <span>① 解剖学的配置（Anatomical Coordinates）</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                人体の空間座標は、外界の刺激を受ける側と内側を守る側で厳密に陰陽が分化しています。
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block">【上部】頭・頸・胸（陽）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">軽快、外界の刺激受容、陽気が上昇して集まる</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block">【下部】腹・腰・下肢（陰）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">重厚、安定・蓄積、大地に接して体を支える</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block">【表層】皮膚・筋膜・筋肉（陽）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">衛気（バリア免疫）が巡り外邪から防衛</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block">【深部】骨・骨髄・内臓（陰）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">生命の根源物質（精・津液）を深層に温存</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#C45A4A] dark:text-[#F87171] block">【背部】背中・腰背筋群（陽）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">太陽の光を受け、起立・外力に耐える「陽面」</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#1E3A5F] dark:text-[#60A5FA] block">【腹部】胸腹部・屈曲面（陰）</span>
                    <span className="text-[#59615D] dark:text-[#96A6B2] text-[11px]">柔らかく内臓を包み、消化・抱擁する「陰面」</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "zangfu" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Heart className="w-4 h-4 text-[#B86924]" />
                <span>② 蔵象（臓腑の役割：五臓 vs 六腑）</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                『素問・五臓別論』が説く、実質器官（五臓）と管腔器官（六腑）の機能対比です。
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
                    血液・体液・生命エネルギー（精）を蓄える実質臓器。常に満たされているべきだが、過剰にパンパンに張って滞ってはならない。
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
                    飲食物を受け入れ、消化・分解し、速やかに排泄する管腔臓器。滞りなく常に流れて空になる必要があり、溜め込んではならない。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "physiology" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Zap className="w-4 h-4 text-[#B86924]" />
                <span>③ 現代生理学・代謝との対応（Modern Science Mapping）</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                古代の「陰陽」は、現代の自律神経生理学や代謝生化学と驚くほど正確に一致します。
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                    自律神経系（Autonomic Nervous System）
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="text-[#C45A4A] dark:text-[#F87171]">
                      <strong>交感神経（陽）：</strong>心拍促進・血圧上昇・闘争逃走・消費
                    </span>
                    <span className="text-[#1E3A5F] dark:text-[#60A5FA]">
                      <strong>副交感神経（陰）：</strong>消化吸収・睡眠・修復・エネルギー蓄積
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                    生体代謝（Cellular Metabolism）
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="text-[#C45A4A] dark:text-[#F87171]">
                      <strong>異化（陽・カタボリズム）：</strong>物質分解・熱産生・ATP消費
                    </span>
                    <span className="text-[#1E3A5F] dark:text-[#60A5FA]">
                      <strong>同化（陰・アナボリズム）：</strong>タンパク質合成・細胞修復・蓄熱
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                    脈管系（Vascular Dynamics）
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="text-[#C45A4A] dark:text-[#F87171]">
                      <strong>動脈（陽）：</strong>高圧拍出・全身への酸素・熱・推進力供給
                    </span>
                    <span className="text-[#1E3A5F] dark:text-[#60A5FA]">
                      <strong>静脈・リンパ（陰）：</strong>低圧回収・老廃物浸透・体液プール
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
