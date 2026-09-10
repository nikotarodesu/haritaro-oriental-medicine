"use client";

import React, { useState } from "react";
import { Sparkles, Activity, AlertCircle, Eye, Moon, Zap, Layers } from "lucide-react";

export default function PathomechanismMicroLuomai() {
  const [activeSign, setActiveSign] = useState<number>(1);

  const signs = [
    {
      id: 1,
      title: "① 局所の刺すような固定痛（刺痛）",
      badge: "自覚症状のサイン",
      icon: Zap,
      desc: "鈍痛やだるさではなく、「針で刺されたようなチクチク・ズキズキする鋭い痛み」。痛む場所が移動せずピンポイントに固定するのが特徴（不通則痛）。",
      mechanism: "絡脈（毛細血管）が血栓や血管攣縮で完全に閉塞し、虚血・酸欠に陥った侵害受容器が悲鳴を上げている物理的シグナル。",
    },
    {
      id: 2,
      title: "② 夜間に悪化する痛み（夜間増悪）",
      badge: "時間軸のサイン",
      icon: Moon,
      desc: "昼間の活動中は紛れていた痛みが、夜間布団に入るとズキズキと激化して眠れなくなる、あるいは夜中に痛みで目が覚める。",
      mechanism: "夜間は副交感神経優位となり心拍数・血圧が低下。血流速度が落ちるため、狭窄した絡脈内の血流が完全にストップして内圧が跳ね上がる。",
    },
    {
      id: 3,
      title: "③ 舌裏・口唇の暗紫と静脈怒張",
      badge: "客観的身体所見",
      icon: Eye,
      desc: "舌を巻き上げて裏側を見ると、舌下静脈が青紫色に太く蛇行・怒張している。唇がくすんだ紫色、目の下に頑固なクマ。",
      mechanism: "全身の毛細血管網（微小循環）のうっ血が、粘膜の薄い舌裏や唇に直接透けて見えている状態。全身の血液粘度上昇（ドロドロ血）の証拠。",
    },
  ];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：毛細血管・間質レベルの「絡脈鬱血」ミクロ図解</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            太い経脈から毛細血管（絡脈）へ ── 微小循環の渋滞と瘀血の3大サイン
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          サインをタップして病理機序を展開
        </span>
      </div>

      {/* メイングリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        {/* 左側：絡脈ミクロ拡大SVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-square">
            <svg viewBox="0 0 280 280" className="w-full h-full">
              {/* 背景間質（細胞間マトリックス） */}
              <rect x="10" y="10" width="260" height="260" rx="16" fill="#FCE4EC" opacity="0.4" className="dark:fill-[#880E4F]/10" />

              {/* 太い経脈（幹線） */}
              <path d="M 30 140 C 70 140 100 130 140 140" stroke="#D32F2F" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.8" />
              <text x="60" y="130" fontSize="10" fontWeight="bold" fill="#B71C1C">
                経脈（太い幹線）
              </text>

              {/* 分岐する絡脈（毛細血管） */}
              <path d="M 140 140 C 180 140 190 80 240 70 M 140 140 C 170 160 190 220 245 230" stroke="#880E4F" strokeWidth="8" strokeLinecap="round" fill="none" />
              <text x="210" y="55" fontSize="9" fontWeight="bold" fill="#880E4F">
                絡脈・孫絡
              </text>

              {/* 渋滞・血栓塊（瘀血コア） */}
              <ellipse cx="195" cy="100" rx="18" ry="12" fill="#4A148C" opacity="0.9" />
              <circle cx="185" cy="98" r="4" fill="#D50000" />
              <circle cx="195" cy="105" r="4" fill="#B71C1C" />
              <circle cx="205" cy="96" r="4" fill="#880E4F" />

              {/* 周囲の痰湿・線維化ヘドロ */}
              <path d="M 170 115 C 200 125 220 110 230 130" stroke="#689F38" strokeWidth="5" strokeLinecap="round" fill="none" strokeDasharray="3 3" />
              <text x="210" y="145" fontSize="8" fontWeight="bold" fill="#33691E">
                痰湿の付着
              </text>

              {/* 針刺痛の放電シンボル */}
              <path d="M 195 80 L 190 65 L 205 68 L 200 50" stroke="#FFD600" strokeWidth="2.5" fill="none" />
              <text x="195" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#D50000">
                固定刺痛！
              </text>

              <text x="140" y="260" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4A148C" className="dark:fill-[#CE93D8]">
                毛細血管レベルの血流停止と組織虚血
              </text>
            </svg>
          </div>
          <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
            「久病入絡（病が長引けば絡脈に入る）」── 慢性痛の本体は微小血管の渋滞
          </span>
        </div>

        {/* 右側：瘀血の3大サインカード */}
        <div className="lg:col-span-7 space-y-3">
          {signs.map((s) => {
            const isSelected = activeSign === s.id;
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => setActiveSign(s.id)}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                  isSelected
                    ? "bg-white dark:bg-[#17212A] border-[#880E4F] shadow-sm scale-[1.01]"
                    : "bg-white/60 dark:bg-[#17212A]/60 border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#880E4F] text-white flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {s.title}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FCE4EC] dark:bg-[#880E4F]/20 text-[#880E4F] dark:text-[#F48FB1] font-bold">
                    {s.badge}
                  </span>
                </div>

                <p className="text-xs text-[#59615D] dark:text-[#D1D5DB] leading-relaxed mb-2">
                  {s.desc}
                </p>

                {isSelected && (
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#4A148C] dark:text-[#CE93D8] leading-relaxed">
                    <strong>生化学・生理学メカニズム：</strong>{s.mechanism}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
