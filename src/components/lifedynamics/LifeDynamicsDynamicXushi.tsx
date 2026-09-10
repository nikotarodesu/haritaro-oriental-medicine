"use client";

import React, { useState } from "react";
import { Sparkles, ArrowDown, ArrowUp, AlertCircle, RefreshCw, GitCommit, Split } from "lucide-react";

type ModelMode = "up-down" | "root-branch" | "sanjiao-signs";

export default function LifeDynamicsDynamicXushi() {
  const [mode, setMode] = useState<ModelMode>("up-down");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：虚実の偏在（上実下虚・本虚標実）動態グラフィック</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            対立ではなく「エネルギーの偏在」 ── 上下のアンバランスと本末の二重構造
          </h4>
        </div>

        {/* タブ切り替え */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
          <button
            onClick={() => setMode("up-down")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === "up-down" ? "bg-[#D32F2F] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            ① 上実下虚モデル
          </button>
          <button
            onClick={() => setMode("root-branch")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === "root-branch" ? "bg-[#1E3D34] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            ② 本虚標実（樹木）モデル
          </button>
          <button
            onClick={() => setMode("sanjiao-signs")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === "sanjiao-signs" ? "bg-[#FFA000] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            ③ 三焦の虚実サイン
          </button>
        </div>
      </div>

      {mode === "up-down" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6">
          {/* 左側：上実下虚SVG */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[260px] aspect-[1/1.3]">
              <svg viewBox="0 0 240 320" className="w-full h-full">
                {/* 人体シルエット */}
                {/* 上半身（赤グラデーション：上実） */}
                <rect x="30" y="20" width="180" height="135" rx="16" fill="#FFEBEE" className="dark:fill-[#D32F2F]/20" />
                <circle cx="120" cy="55" r="28" fill="#D32F2F" opacity="0.85" />
                <path d="M 120 90 L 120 145 M 80 120 L 160 120" stroke="#D32F2F" strokeWidth="6" strokeLinecap="round" />
                <text x="120" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  上実（鬱熱）
                </text>
                <text x="120" y="115" textAnchor="middle" fill="#C62828" fontSize="9" fontWeight="bold" className="dark:fill-[#FFCDD2]">
                  ▲ のぼせ・頭痛・怒り・眼充血
                </text>

                {/* 境界線（横隔膜・気機のブロック） */}
                <line x1="30" y1="160" x2="210" y2="160" stroke="#757575" strokeWidth="2" strokeDasharray="4 4" />
                <text x="120" y="164" textAnchor="middle" fill="#616161" fontSize="9" className="dark:fill-[#9E9E9E]">
                  ── 中焦の気機閉塞（昇降不全） ──
                </text>

                {/* 下半身（青グラデーション：下虚） */}
                <rect x="30" y="170" width="180" height="135" rx="16" fill="#E1F5FE" className="dark:fill-[#0288D1]/20" />
                <path d="M 90 190 L 80 290 M 150 190 L 160 290" stroke="#0288D1" strokeWidth="5" strokeDasharray="4 4" strokeLinecap="round" />
                <circle cx="120" cy="235" r="24" fill="#0288D1" opacity="0.4" />
                <text x="120" y="238" textAnchor="middle" fill="#01579B" fontSize="11" fontWeight="bold" className="dark:fill-[#81D4FA]">
                  下虚（虚寒）
                </text>
                <text x="120" y="280" textAnchor="middle" fill="#0277BD" fontSize="9" fontWeight="bold" className="dark:fill-[#B3E5FC]">
                  ▼ 足腰の冷え・脱力・頻尿
                </text>
              </svg>
            </div>
            <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
              頭はカッカと熱く、足先は氷のように冷たい「冷えのぼせ」の病態
            </span>
          </div>

          {/* 右側：解説 */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <h5 className="font-bold text-sm text-[#D32F2F] dark:text-[#EF5350] mb-2">
                上実下虚（じょうじつげきょ）のメカニズム
              </h5>
              <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                本来、火（陽気）は下半身（腎）を温めるために下に降り、水（陰液）は上半身を冷やすために上に昇る必要があります（水火既済）。しかし、ストレスや過労で中焦（胃腸・肝）が詰まると、<strong>熱が頭頂に閉じ込められて「上実」となり、熱が届かない下半身はスカスカに冷え切る「下虚」</strong>が生じます。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#FFEBEE] dark:bg-[#D32F2F]/20 border border-[#FFCDD2]/50">
                <span className="font-bold text-[#C62828] dark:text-[#EF9A9A] block mb-1">
                  上の実（過密・充血）：
                </span>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  頭痛、顔面のぼせ、イライラ、目の充血、不眠、高血圧傾向。
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#E1F5FE] dark:bg-[#0288D1]/20 border border-[#B3E5FC]/50">
                <span className="font-bold text-[#0277BD] dark:text-[#81D4FA] block mb-1">
                  ー 下の虚（脱力・冷え）：
                </span>
                <p className="text-[#59615D] dark:text-[#CBD5E1]">
                  腰痛、下肢の激しい冷え、朝起き上がれない、夜間頻尿、下痢。
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFF8E1] dark:bg-[#FFA000]/15 border border-[#FFE082]/60 text-xs text-[#5D4037] dark:text-[#FFE082] leading-relaxed">
              <strong>治療の鉄則（引火帰元・降気）：</strong>
              頭の熱を冷まそうと氷嚢で冷やすだけでは下半身がさらに冷え悪化します。「足のツボ（太衝・太渓・湧泉）」にお灸や鍼をして、上に昇った気を下へ引き戻す（引火帰元）ことが根本治癒の要となります。
            </div>
          </div>
        </div>
      )}

      {mode === "root-branch" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6">
          {/* 左側：樹木モデルSVG */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[260px] aspect-[1/1.3]">
              <svg viewBox="0 0 240 320" className="w-full h-full">
                {/* 樹木の枝葉（標実：ゴミが詰まる） */}
                <ellipse cx="120" cy="80" rx="90" ry="60" fill="#FFEBEE" stroke="#D32F2F" strokeWidth="2" className="dark:fill-[#D32F2F]/20 dark:stroke-[#EF5350]" />
                <text x="120" y="65" textAnchor="middle" fill="#C62828" fontSize="12" fontWeight="bold" className="dark:fill-[#EF9A9A]">
                  【枝葉】標実（ひょうじつ）
                </text>
                <text x="120" y="82" textAnchor="middle" fill="#59615D" fontSize="9">
                  局所の気滞・瘀血・痰湿
                </text>
                <text x="120" y="98" textAnchor="middle" fill="#C62828" fontSize="9" fontWeight="bold">
                  （痛み・しこり・炎症）
                </text>

                {/* 幹（循環不全） */}
                <rect x="105" y="140" width="30" height="70" fill="#8D6E63" rx="4" />

                {/* 地面ライン */}
                <line x1="20" y1="210" x2="220" y2="210" stroke="#795548" strokeWidth="3" />

                {/* 根（本虚：根腐れ・栄養枯渇） */}
                <path d="M 120 210 Q 90 260 60 290 M 120 210 Q 120 270 110 305 M 120 210 Q 150 260 180 290" stroke="#0288D1" strokeWidth="3" strokeDasharray="3 3" />
                <rect x="40" y="225" width="160" height="75" rx="10" fill="#E1F5FE" opacity="0.6" className="dark:fill-[#0288D1]/20" />
                <text x="120" y="250" textAnchor="middle" fill="#01579B" fontSize="12" fontWeight="bold" className="dark:fill-[#81D4FA]">
                  【根】本虚（ほんきょ）
                </text>
                <text x="120" y="268" textAnchor="middle" fill="#59615D" fontSize="9">
                  脾腎のエネルギー枯渇（気虚・陽虚）
                </text>
                <text x="120" y="285" textAnchor="middle" fill="#0277BD" fontSize="9" fontWeight="bold">
                  （動力不足によるゴミ排出不能）
                </text>
              </svg>
            </div>
            <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
              根（本）のパワーが足りないために、枝葉（標）に老廃物が停滞する二重構造
            </span>
          </div>

          {/* 右側：解説 */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <h5 className="font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E] mb-2">
                本虚標実（ほんきょひょうじつ）の臨床原則
              </h5>
              <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                現代人の慢性疾患の9割は「本虚標実」です。局所の激痛や腫れ、炎症（標実）だけを見て「瀉法（鎮痛剤や強い揉みほぐし）」を続けると、患者の根本体力（本虚）がさらに削られ、ますますゴミが溜まりやすい身体になります。
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E]">本（ほん・根源）：</strong>
                脾胃の弱り（後天の本虚）や腎精の不足（先天の本虚）。エネルギーが足りないからゴミを流せない。
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                <strong className="text-[#D32F2F] dark:text-[#EF5350]">標（ひょう・枝葉）：</strong>
                首肩のこり、関節の腫れ、頭痛、脂肪肝、血栓、PMSなどの自覚症状。
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#E8F5E9] dark:bg-[#1B5E20]/20 border border-[#A5D6A7]/50 text-xs text-[#1B5E20] dark:text-[#A5D6A7] leading-relaxed">
              <strong>臨床の二刀流（標本兼治）：</strong>
              「急なれば標を治し、緩なれば本を治す」。激痛時はまず標（局所の滞り）を緩解させ、痛みが引いたら直ちに本（根っこの胃腸や腎）を補うことで再発を完全に封じ込めます。
            </div>
          </div>
        </div>
      )}

      {mode === "sanjiao-signs" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 上焦 */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5">
              <div className="flex items-center justify-between mb-3 border-b border-[#EAE4D5] dark:border-[#22303D] pb-2">
                <span className="font-bold text-sm text-[#C62828] dark:text-[#EF9A9A]">
                  上焦（心・肺）
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFEBEE] dark:bg-[#D32F2F]/20 text-[#C62828] font-bold">
                  呼吸・心拍・頭部
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#0288D1] block mb-1">【虚のサイン】</span>
                  <p className="text-[#59615D] dark:text-[#CBD5E1]">
                    声が細い、息切れ、風邪を引きやすい、自汗（動かなくても汗が出る）、顔色不良。
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#D32F2F] block mb-1">【実のサイン】</span>
                  <p className="text-[#59615D] dark:text-[#CBD5E1]">
                    激しい咳、喘鳴、顔面紅潮、胸苦しさ、熱感、喉の腫れと激痛。
                  </p>
                </div>
              </div>
            </div>

            {/* 中焦 */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5">
              <div className="flex items-center justify-between mb-3 border-b border-[#EAE4D5] dark:border-[#22303D] pb-2">
                <span className="font-bold text-sm text-[#E65100] dark:text-[#FFE082]">
                  中焦（脾・胃）
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFF8E1] dark:bg-[#FFA000]/20 text-[#E65100] font-bold">
                  消化・吸収・運化
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#0288D1] block mb-1">【虚のサイン】</span>
                  <p className="text-[#59615D] dark:text-[#CBD5E1]">
                    食欲不振、胃もたれ、消化不良、泥状便・下痢、四肢無力、食後の強い眠気。
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#D32F2F] block mb-1">【実のサイン】</span>
                  <p className="text-[#59615D] dark:text-[#CBD5E1]">
                    食滞（胃のつかえ）、強い腹部膨満痛、口臭、胸焼け、押されると痛む（拒按）。
                  </p>
                </div>
              </div>
            </div>

            {/* 下焦 */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5">
              <div className="flex items-center justify-between mb-3 border-b border-[#EAE4D5] dark:border-[#22303D] pb-2">
                <span className="font-bold text-sm text-[#0277BD] dark:text-[#81D4FA]">
                  下焦（腎・膀胱・腸）
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#E1F5FE] dark:bg-[#0288D1]/20 text-[#0277BD] font-bold">
                  排泄・生殖・貯蔵
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#0288D1] block mb-1">【虚のサイン】</span>
                  <p className="text-[#59615D] dark:text-[#CBD5E1]">
                    失禁・遺尿、足腰の脱力・だるさ、耳鳴り、朝一番の下痢（五更瀉）、性機能低下。
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="font-bold text-[#D32F2F] block mb-1">【実のサイン】</span>
                  <p className="text-[#59615D] dark:text-[#CBD5E1]">
                    頑固な熱性便秘、下腹部の硬結・刺痛、排尿痛・血尿、下肢の激しい浮腫。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
