"use client";

import React from "react";
import { KikeiVessel } from "@/data/kikeiData";

interface Props {
  vessel: KikeiVessel;
}

export default function KikeiPathwaySvg({ vessel }: Props) {
  const isYang = vessel.category === "陽奇経";
  const primaryColor = isYang ? "#B86924" : "#1E3D34";

  // 脈ごとのSVGパス・ポイント定義
  const renderVesselPath = () => {
    switch (vessel.slug) {
      case "toku": // 督脈: 会陰 -> 脊柱 -> 頭頂 -> 顔面
        return (
          <>
            <path
              d="M 120 310 L 120 180 L 120 70 C 120 40 100 35 90 45 C 80 55 80 75 75 90"
              fill="none"
              stroke={primaryColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="120" cy="310" r="5" fill={primaryColor} />
            <text x="132" y="314" fontSize="10" fill="currentColor" className="font-bold">長強 (会陰)</text>
            
            <circle cx="120" cy="230" r="4.5" fill={primaryColor} />
            <text x="132" y="234" fontSize="10" fill="currentColor">命門 (腰部)</text>

            <circle cx="120" cy="150" r="4.5" fill={primaryColor} />
            <text x="132" y="154" fontSize="10" fill="currentColor">大椎 (頸椎下)</text>

            <circle cx="120" cy="95" r="4.5" fill={primaryColor} />
            <text x="132" y="99" fontSize="10" fill="currentColor">風府 (後頭)</text>

            <circle cx="105" cy="36" r="5" fill={primaryColor} />
            <text x="115" y="32" fontSize="10" fill="currentColor" className="font-bold">百会 (頭頂)</text>

            <circle cx="75" cy="90" r="4" fill={primaryColor} />
            <text x="40" y="94" fontSize="10" fill="currentColor">齦交 (上唇)</text>
          </>
        );

      case "nin": // 任脈: 会陰 -> 恥骨 -> 腹部正中 -> 胸部正中 -> 喉頭 -> 下唇
        return (
          <>
            <path
              d="M 100 310 L 100 270 L 100 170 L 100 110 L 100 85"
              fill="none"
              stroke={primaryColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="310" r="5" fill={primaryColor} />
            <text x="112" y="314" fontSize="10" fill="currentColor" className="font-bold">会陰</text>

            <circle cx="100" cy="270" r="4.5" fill={primaryColor} />
            <text x="112" y="274" fontSize="10" fill="currentColor">曲骨・関元 (下腹)</text>

            <circle cx="100" cy="200" r="4.5" fill={primaryColor} />
            <text x="112" y="204" fontSize="10" fill="currentColor">中脘 (心窩部)</text>

            <circle cx="100" cy="150" r="4.5" fill={primaryColor} />
            <text x="112" y="154" fontSize="10" fill="currentColor">膻中 (前胸部)</text>

            <circle cx="100" cy="110" r="4.5" fill={primaryColor} />
            <text x="112" y="114" fontSize="10" fill="currentColor">天突 (咽喉)</text>

            <circle cx="100" cy="85" r="5" fill={primaryColor} />
            <text x="112" y="89" fontSize="10" fill="currentColor" className="font-bold">承漿 (下唇)</text>
          </>
        );

      case "tai": // 帯脈: 季肋下・腹部を水平に旋回
        return (
          <>
            <ellipse
              cx="100"
              cy="210"
              rx="48"
              ry="16"
              fill="none"
              stroke={primaryColor}
              strokeWidth="4"
              strokeDasharray="6 3"
            />
            <circle cx="55" cy="210" r="5" fill={primaryColor} />
            <text x="15" y="214" fontSize="10" fill="currentColor" className="font-bold">章門 (季肋)</text>

            <circle cx="70" cy="222" r="5" fill={primaryColor} />
            <text x="75" y="240" fontSize="10" fill="currentColor" className="font-bold">帯脈穴 (側腹)</text>

            <circle cx="145" cy="210" r="4.5" fill={primaryColor} />
            <text x="152" y="214" fontSize="10" fill="currentColor">五枢・維道</text>
          </>
        );

      case "shou": // 衝脈: 胞中 -> 腹部両側を上行 -> 胸部
        return (
          <>
            <path
              d="M 100 285 L 85 270 L 85 140 L 85 105"
              fill="none"
              stroke={primaryColor}
              strokeWidth="3.5"
            />
            <path
              d="M 100 285 L 115 270 L 115 140 L 115 105"
              fill="none"
              stroke={primaryColor}
              strokeWidth="3.5"
            />
            <circle cx="100" cy="285" r="5" fill={primaryColor} />
            <text x="55" y="302" fontSize="10" fill="currentColor" className="font-bold">胞中 (子宮・骨盤)</text>

            <circle cx="85" cy="260" r="4" fill={primaryColor} />
            <circle cx="115" cy="260" r="4" fill={primaryColor} />
            <text x="122" y="264" fontSize="10" fill="currentColor">気街・横骨</text>

            <circle cx="85" cy="180" r="4" fill={primaryColor} />
            <circle cx="115" cy="180" r="4" fill={primaryColor} />
            <text x="122" y="184" fontSize="10" fill="currentColor">腎経並行線 (商曲)</text>

            <circle cx="100" cy="105" r="4.5" fill={primaryColor} />
            <text x="108" y="102" fontSize="10" fill="currentColor">胸中・咽喉</text>
          </>
        );

      default: // 蹻脈・維脈（四肢から体幹・頭部への走行）
        return (
          <>
            <path
              d="M 75 350 L 78 280 L 82 170 L 88 120 L 92 70"
              fill="none"
              stroke={primaryColor}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="75" cy="350" r="5" fill={primaryColor} />
            <text x="10" y="354" fontSize="10" fill="currentColor" className="font-bold">
              {vessel.masterPoint.name} ({vessel.masterPoint.code})
            </text>

            <circle cx="82" cy="170" r="4" fill={primaryColor} />
            <text x="90" y="174" fontSize="10" fill="currentColor">体幹中継部</text>

            <circle cx="92" cy="70" r="5" fill={primaryColor} />
            <text x="100" y="74" fontSize="10" fill="currentColor" className="font-bold">頭頚・目部結節</text>
          </>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B86924] dark:text-[#E6C387]">
            Pathway Vector Schema
          </span>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
            {vessel.name} 流注循行SVGダイアグラム
          </h3>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#8899A6]">
          {vessel.category}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-2">
        {/* SVGグラフィック */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-[#FAF8F5] dark:bg-[#10161C] border border-[#E5DEC9] dark:border-[#2A3B4A] p-2 flex items-center justify-center overflow-hidden shrink-0">
          <svg
            viewBox="0 0 200 380"
            className="w-full h-full text-[#232826] dark:text-[#FAF8F5]"
          >
            {/* 人体シルエット（背面/前面の簡略背景） */}
            <path
              d="M 100 25 C 85 25 80 40 80 55 C 80 70 88 78 88 85 L 60 115 L 70 180 L 78 180 L 80 250 L 70 365 L 85 365 L 95 270 L 105 270 L 115 365 L 130 365 L 120 250 L 122 180 L 130 180 L 140 115 L 112 85 C 112 78 120 70 120 55 C 120 40 115 25 100 25 Z"
              fill="currentColor"
              className="opacity-5 dark:opacity-10"
            />
            {/* 正中線ガイド */}
            <line
              x1="100"
              y1="35"
              x2="100"
              y2="360"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              className="opacity-20"
            />

            {/* 流注パスと要穴ノード */}
            {renderVesselPath()}
          </svg>
        </div>

        {/* 流注ポイント解説 */}
        <div className="space-y-3 flex-1 text-xs sm:text-sm">
          <span className="font-bold text-[#737C77] dark:text-[#8899A6] text-xs block">
            流注ステップ詳細（起部から終部まで）:
          </span>
          <div className="space-y-2">
            {vessel.pathway.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5"
              >
                <span
                  className="w-5 h-5 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: primaryColor }}
                >
                  {idx + 1}
                </span>
                <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed text-xs">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 p-3 rounded-xl bg-[#FCF4EB] dark:bg-[#2A1E14] border border-[#F3DEC5] dark:border-[#4A321E] text-xs space-y-1">
            <span className="font-bold text-[#B86924] dark:text-[#E6C387] block">
              八脈交会穴（通穴）連携
            </span>
            <p className="text-[#59615D] dark:text-[#A8988B] leading-relaxed text-[11px]">
              本脈の循行異常（過不足）が生じた際は、主穴<strong>「{vessel.masterPoint.name}」</strong>（{vessel.masterPoint.meridian}）と対となる配穴<strong>「{vessel.couplePoint.name}」</strong>（{vessel.couplePoint.meridian}）を刺灸することで、奇経の気血を正経十二経脈へと速やかに誘導・調整します。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
