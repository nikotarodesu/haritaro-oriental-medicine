"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { PathwayNode, VesselConfig } from "@/data/kikeiPathways";
import type { KikeiVessel } from "@/data/kikeiData";
import { Info } from "lucide-react";

interface Props {
  vessel: KikeiVessel;
  config: VesselConfig;
}

export default function KikeiPathwaySvg({ vessel, config }: Props) {
  const isYang = vessel.category === "陽奇経";
  const primaryColor = "var(--kikei-route)";
  const glowColor = isYang ? "#E6C387" : "#74BA9E";

  const [activeNode, setActiveNode] = useState<PathwayNode | null>(null);

  return (
    <div id="kikei-pathway" className={`scroll-mt-28 ${isYang ? "[--kikei-route:#95501a] dark:[--kikei-route:#e6c387]" : "[--kikei-route:#285646] dark:[--kikei-route:#83c7ab]"} bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4`}>
      {/* ヘッダー情報 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3 gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#8899A6]">
              {config.viewLabel}
            </span>
          </div>
          <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
            {vessel.name}の流注図
          </h2>
          <p className="text-xs text-muted">伝統医学で、この脈が体のどこを通ると考えられてきたかを示す模式図です。</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
            <span className="h-0.5 w-4" style={{ backgroundColor: primaryColor }} />
            <span>線：伝統理論の経路</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
            <span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: primaryColor, backgroundColor: "white" }} />
            <span id="kikei-landmark-legend">丸：図中の目印</span>
          </span>
          {config.nodes.some(node => node.code === vessel.masterPoint.code) && (
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <span className="size-2.5 rounded-full border-[3px] bg-white" style={{ borderColor: primaryColor }} /><span id="kikei-meeting-legend">八脈交会穴</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 pt-2">
        {/* SVGグラフィックエリア */}
        <div className="relative w-64 max-w-full h-96 sm:w-72 sm:h-[400px] rounded-2xl bg-[#FAF8F5] dark:bg-[#10161C] border border-[#E5DEC9] dark:border-[#2A3B4A] p-2 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          <svg
            viewBox="0 0 220 390"
            role="group"
            aria-label={vessel.name + "の流注図。印を選ぶと説明を表示します"}
            className="w-full h-full text-[#232826] dark:text-[#FAF8F5] select-none"
          >
            <defs>
              {/* 矢印マーカー */}
              <marker
                id={`arrow-${vessel.slug}`}
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={primaryColor} />
              </marker>

              {/* グローフィルター */}
              <filter id={`glow-${vessel.slug}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 人体解剖シルエット背景 */}
            <path
              d="M 110 22 C 95 22 90 38 90 52 C 90 67 98 75 98 82 L 68 112 L 78 175 L 86 175 L 88 245 L 78 360 L 94 360 L 105 265 L 115 265 L 126 360 L 142 360 L 132 245 L 134 175 L 142 175 L 152 112 L 122 82 C 122 75 130 67 130 52 C 130 38 125 22 110 22 Z"
              fill="currentColor"
              className="opacity-5 dark:opacity-10"
            />

            {/* 解剖指標ライン（薄い破線） */}
            <g className="fill-current text-[#5c665f] dark:text-[#adbbb4] [&>line]:opacity-35">
              {/* 頭部 */}
              <line x1="45" y1="35" x2="175" y2="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* 大椎・喉頭部 */}
              <line x1="45" y1="100" x2="175" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* 心窩部・中脘 */}
              <line x1="45" y1="185" x2="175" y2="185" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* 臍部 */}
              <line x1="45" y1="230" x2="175" y2="230" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* 恥骨・会陰部 */}
              <line x1="45" y1="280" x2="175" y2="280" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* 下腿・果部 */}
              <line x1="45" y1="365" x2="175" y2="365" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />

              <text x="180" y="38" fontSize="8" fill="currentColor">頭頂</text>
              <text x="180" y="103" fontSize="8" fill="currentColor">頸項</text>
              <text x="180" y="188" fontSize="8" fill="currentColor">季肋</text>
              <text x="180" y="233" fontSize="8" fill="currentColor">臍部</text>
              <text x="180" y="283" fontSize="8" fill="currentColor">骨盤</text>
              <text x="180" y="368" fontSize="8" fill="currentColor">果部</text>
            </g>

            {/* 帯脈特有の水平リング描画 */}
            {config.isRing ? (
              <g>
                {/* 背面側の点線ベルト */}
                <path
                  d="M 62 205 C 80 185 140 185 158 205"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="3"
                  strokeDasharray="4 3"
                  className="opacity-50"
                />
                {/* 前面側の実線ベルト */}
                <path
                  d="M 62 205 C 75 235 145 235 158 205"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter={`url(#glow-${vessel.slug})`}
                />
              </g>
            ) : (
              /* 通常の縦走・流注メインパス */
              <g>
                {/* パス背景グロー */}
                {config.mainPath && (
                  <path
                    d={config.mainPath}
                    fill="none"
                    stroke={glowColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-30 dark:opacity-40"
                  />
                )}
                {/* 主走行ライン */}
                {config.mainPath && (
                  <path
                    d={config.mainPath}
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={`url(#arrow-${vessel.slug})`}
                  />
                )}
                {/* 第二系統（衝脈の両側上行など） */}
                {config.secondPath && (
                  <path
                    d={config.secondPath}
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    markerEnd={`url(#arrow-${vessel.slug})`}
                  />
                )}
                {/* 下行枝（衝脈の下行など） */}
                {config.downPath && (
                  <path
                    d={config.downPath}
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />
                )}
              </g>
            )}

            {/* ノード（経穴ポイント）の描画 */}
            {config.nodes.map((node) => {
              const isSelected = activeNode?.name === node.name;
              const isMeetingPoint = node.code === vessel.masterPoint.code;
              const labelOnRight = node.x > 110;
              const labelX = node.x + (labelOnRight ? 9 : -9);
              return (
                <g
                  key={node.name}
                  role="button"
                  tabIndex={0}
                  aria-label={node.code ? node.name + "（" + node.code + "）" : node.name}
                  aria-describedby={isMeetingPoint ? "kikei-meeting-legend" : "kikei-landmark-legend"}
                  aria-pressed={isSelected}
                  aria-controls="kikei-point-detail"
                  className="cursor-pointer group outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-current"
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveNode(node);
                    }
                  }}
                  onClick={() => setActiveNode(node)}
                >
                  {/* 透明な広域ヒットボックス（フリッカーを完全防止し確実にタップ可能にする） */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="15"
                    fill="transparent"
                  />

                  {/* ホバー＆選択時のグローリング */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 10 : 8}
                    fill={primaryColor}
                    className={`transition-opacity duration-150 ${
                      isSelected ? "opacity-30" : "opacity-0 group-hover:opacity-20"
                    }`}
                  />

                  {/* 外側リング / メインピン */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 7.5 : isMeetingPoint ? 6.5 : 5}
                    fill={isMeetingPoint ? primaryColor : "white"}
                    stroke={primaryColor}
                    strokeWidth={isMeetingPoint || isSelected ? 2.5 : 1.8}
                    className="transition-all duration-150"
                  />

                  {/* 八脈交会穴やハイライト時の中心ドット */}
                  {isMeetingPoint && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="2.5"
                      fill="white"
                    />
                  )}

                  {/* 経穴名ラベル */}
                  <text
                    x={labelX}
                    y={node.y + (node.labelLines ? -10 : 3.5)}
                    textAnchor={labelOnRight ? "start" : "end"}
                    fontSize={isMeetingPoint || isSelected ? "10" : "8.5"}
                    fontWeight={isMeetingPoint || isSelected ? "bold" : "normal"}
                    fill={isSelected ? primaryColor : "currentColor"}
                    className="drop-shadow-xs transition-colors duration-150 select-none pointer-events-none"
                  >
                    {node.labelLines ? (
                      <>
                        <tspan x={labelX}>{node.labelLines[0]}</tspan>
                        <tspan x={labelX} dy="12">{node.labelLines[1]}</tspan>
                      </>
                    ) : node.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>

        </div>

        {/* 右側：流注ポイント解説 & インタラクティブカード */}
        <div className="space-y-4 flex-1 text-xs sm:text-sm w-full">
          {/* 選択されたノードの詳細カード */}
          <div id="kikei-point-detail" aria-live="polite" aria-atomic="true">
            {activeNode ? (
              <div className="p-4 rounded-2xl bg-[#FCF4EB] dark:bg-[#2A1E14] border-2 border-[#B86924] dark:border-[#E6C387] space-y-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <strong className="text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                      {activeNode.name}
                    </strong>
                  </div>
                  {activeNode.code && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-white dark:bg-[#17212A] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
                      {activeNode.code}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#59615D] dark:text-[#C5D2DB] leading-relaxed">
                  {activeNode.desc}
                </p>
                <div className="text-[11px] text-[#B86924] dark:text-[#E6C387] font-semibold flex items-center gap-1 pt-1">
                  <span>{activeNode.code === vessel.masterPoint.code ? "この脈に対応する八脈交会穴" : "経路の目印"}</span>
                </div>
                {activeNode.code && <Link href={"/tsubo/" + activeNode.code.toLowerCase() + "#acupoint-location"} className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">{activeNode.name}の位置図を開く</Link>}
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2.5 text-xs text-[#737C77] dark:text-[#8899A6]">
                <Info className="w-4 h-4 text-[#B86924] shrink-0" />
                <span>
                  図の丸い印を選ぶと、その部位の説明が開きます。
                </span>
              </div>
            )}
          </div>

          {/* 流注ステップ詳細リスト */}
          <div className="space-y-2">
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs block">
              経路をたどる
            </span>
            <ol className="space-y-2">
              {vessel.pathway.map((step, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5"
                >
                  <span
                    className="w-5 h-5 rounded-full text-white dark:text-[#10161C] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {idx + 1}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed text-xs">
                      {step}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
}
