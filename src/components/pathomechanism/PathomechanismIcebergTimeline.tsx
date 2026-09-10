"use client";

import React, { useState } from "react";
import { Sparkles, Clock, AlertTriangle, Layers, Activity, ChevronRight, Anchor } from "lucide-react";

export default function PathomechanismIcebergTimeline() {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      stage: 1,
      name: "初期：機能的気機失調（数週間〜数ヶ月）",
      surface: "「なんとなく疲れる」「イライラ」「肩が張る」程度の不定愁訴",
      underwater: "感情抑圧や過労による【気滞・気逆】。西洋医学の血液検査や画像診断では『異常なし』と判定される段階。",
      pathology: "気の昇降出入のリズムが乱れ、自律神経の交感神経過緊張が萌芽。",
      color: "#FFA000",
    },
    {
      stage: 2,
      name: "中期：流体システムの濁り（数ヶ月〜半年）",
      surface: "頭痛、胃もたれ、めまい、下肢のむくみ、PMS、朝の起きづらさ",
      underwater: "気が滞ることで三焦水道が塞がり【水湿 ➜ 痰湿】が沈殿。リンパ流うっ滞や間質浮腫が慢性化。",
      pathology: "機能障害から物質的停滞へ転化。身体が『重だるい』ヘドロを背負った状態。",
      color: "#0288D1",
    },
    {
      stage: 3,
      name: "慢性期：微小循環破綻と瘀血（半年〜数年）",
      surface: "刺すような固定痛、慢性不眠、冷えのぼせ、肌のくすみ・舌裏静脈怒張",
      underwater: "痰湿と気滞が毛細血管（絡脈）を締め付け【瘀血】が形成。局所組織が持続的酸欠・低栄養に陥る。",
      pathology: "「痰瘀互結（たんおごけつ）」。水と血の濁りが強固に結合し、難治性慢性炎症へ発展。",
      color: "#D32F2F",
    },
    {
      stage: 4,
      name: "固定期：組織器質化と虚実錯雑（数年〜）",
      surface: "高血圧、動脈硬化、関節拘縮、線維筋痛、内臓機能不全、重度の自律神経失調",
      underwater: "組織の線維化・器質的固定化。深部が激しく消耗し【本虚】、表面にゴミが山積する【標実】のミルフィーユ構造。",
      pathology: "もはや単純なマッサージや対症療法ではびくともしない構造的固定化。",
      color: "#7B1FA2",
    },
  ];

  const current = stages.find((s) => s.stage === activeStage)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：病の氷山モデルと病機タイムライン（Pathomechanism Iceberg & Timeline）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            症状は氷山の一角 ── 海面下に連鎖する「破綻の歴史（病機）」を読み解く
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          進行ステージを選択して深層を確認
        </span>
      </div>

      {/* メインダイアグラム：氷山SVG ＆ タイムライン */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        {/* 左側：氷山モデルSVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[300px] aspect-[1/1.2]">
            <svg viewBox="0 0 280 320" className="w-full h-full">
              <defs>
                {/* 海水グラデーション */}
                <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0288D1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#01579B" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              {/* 空（海面上） */}
              <rect x="10" y="10" width="260" height="90" fill="#FFF9C4" opacity="0.3" rx="8" className="dark:fill-[#2A3B4A]/20" />
              <text x="25" y="32" fontSize="10" fontWeight="bold" fill="#B86924" className="dark:fill-[#FFE082]">
                【海面上】患者の自覚症状（標）
              </text>

              {/* 海水領域（海面下） */}
              <rect x="10" y="100" width="260" height="210" fill="url(#seaGrad)" rx="8" />
              <text x="25" y="120" fontSize="10" fontWeight="bold" fill="#01579B" className="dark:fill-[#81D4FA]">
                【海面下】病機プロセスの連鎖（本）
              </text>

              {/* 海面ライン */}
              <line x1="10" y1="100" x2="270" y2="100" stroke="#0288D1" strokeWidth="2.5" strokeDasharray="5 3" />

              {/* 氷山ポリゴン */}
              {/* 頂上部（海面上） */}
              <polygon
                points="140,35 175,95 105,95"
                fill="#FFFFFF"
                stroke="#B0BEC5"
                strokeWidth="2"
                className="dark:fill-[#E0E0E0] dark:stroke-[#78909C]"
              />
              <text x="140" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#D32F2F">
                主訴・痛み
              </text>

              {/* 深部巨大氷塊（海面下） */}
              <polygon
                points="105,105 175,105 230,220 190,290 90,290 50,210"
                fill="#ECEFF1"
                stroke="#78909C"
                strokeWidth="2"
                opacity="0.9"
                className="dark:fill-[#17212A] dark:stroke-[#90A4AE]"
              />

              {/* 深度レイヤーライン */}
              {/* 深さ1: 気滞 */}
              <line x1="85" y1="140" x2="195" y2="140" stroke="#FFA000" strokeWidth="2" strokeDasharray="3 3" />
              <text x="140" y="130" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E65100" className="dark:fill-[#FFE082]">
                ① 気機失調（気鬱・気逆）
              </text>

              {/* 深さ2: 痰湿 */}
              <line x1="68" y1="190" x2="212" y2="190" stroke="#0288D1" strokeWidth="2" strokeDasharray="3 3" />
              <text x="140" y="175" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0277BD" className="dark:fill-[#81D4FA]">
                ② 水液停滞 ➜ 痰湿沈殿
              </text>

              {/* 深さ3: 瘀血 */}
              <line x1="62" y1="240" x2="218" y2="240" stroke="#D32F2F" strokeWidth="2" strokeDasharray="3 3" />
              <text x="140" y="225" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#C62828" className="dark:fill-[#EF9A9A]">
                ③ 絡脈鬱滞 ➜ 瘀血形成
              </text>

              {/* 深さ4: 器質化 */}
              <text x="140" y="275" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7B1FA2" className="dark:fill-[#CE93D8]">
                ④ 組織線維化・虚実錯雑
              </text>
            </svg>
          </div>
          <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
            目に見える症状（氷山の上）だけを叩いても、海面下の巨大病機は消えない
          </span>
        </div>

        {/* 右側：タイムライン進行カード */}
        <div className="lg:col-span-7 space-y-3">
          {/* ステージセレクター */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            {stages.map((s) => (
              <button
                key={s.stage}
                onClick={() => setActiveStage(s.stage)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                  activeStage === s.stage
                    ? "bg-[#1E3D34] text-white shadow-xs"
                    : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826]"
                }`}
              >
                第{s.stage}段階
              </button>
            ))}
          </div>

          {/* 選択されたステージの詳細 */}
          <div className="bg-white dark:bg-[#17212A] rounded-xl p-5 border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-2.5">
              <span className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                {current.name}
              </span>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: current.color }}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                <span className="font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                  ▲ 海面上（患者が自覚する症状）：
                </span>
                <p className="text-[#3E4541] dark:text-[#CBD5E1]">
                  {current.surface}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                <span className="font-bold text-[#0288D1] dark:text-[#81D4FA] block mb-1">
                  ▼ 海面下（深部で進行する病機メカニズム）：
                </span>
                <p className="text-[#3E4541] dark:text-[#CBD5E1]">
                  {current.underwater}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FFF8E1] dark:bg-[#FFA000]/15 border border-[#FFE082]/60 text-[11px] text-[#5D4037] dark:text-[#FFE082]">
                <strong>病理の要約：</strong>{current.pathology}
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
