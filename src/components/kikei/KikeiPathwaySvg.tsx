"use client";

import React, { useState } from "react";
import { KikeiVessel } from "@/data/kikeiData";
import { Sparkles, Compass, Eye, Info, CheckCircle2, ChevronRight } from "lucide-react";

interface Props {
  vessel: KikeiVessel;
}

interface PathwayNode {
  x: number;
  y: number;
  name: string;
  code?: string;
  desc: string;
  isMaster?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
}

interface VesselConfig {
  viewLabel: string;
  mainPath?: string;
  secondPath?: string;
  downPath?: string;
  dashPath?: string;
  isRing?: boolean;
  nodes: PathwayNode[];
}

export default function KikeiPathwaySvg({ vessel }: Props) {
  const isYang = vessel.category === "陽奇経";
  const primaryColor = isYang ? "#B86924" : "#1E3D34";
  const glowColor = isYang ? "#E6C387" : "#74BA9E";

  const [activeNode, setActiveNode] = useState<PathwayNode | null>(null);

  // 各奇経八脈の解剖学的プロファイル
  const getVesselConfig = (): VesselConfig => {
    switch (vessel.slug) {
      case "toku": // 督脈（背面正中・陽気の統括）
        return {
          viewLabel: "背面・正中観（脊柱ライン）",
          mainPath: "M 110 320 L 110 260 L 110 190 L 110 135 L 110 75 C 110 42 90 30 80 40 C 72 48 70 70 65 85",
          dashPath: "M 80 40 C 70 50 68 75 65 85",
          nodes: [
            { x: 110, y: 320, name: "長強 (GV1)", code: "GV1", desc: "尾骨先端と肛門の間。督脈の起始部。", isStart: true },
            { x: 110, y: 260, name: "命門 (GV4)", code: "GV4", desc: "第2腰椎棘突起下。腎陽の根源。" },
            { x: 110, y: 190, name: "至陽 (GV9)", code: "GV9", desc: "第7胸椎棘突起下。胸背部の陽気交通部。" },
            { x: 110, y: 135, name: "大椎 (GV14)", code: "GV14", desc: "第7頸椎棘突起下。手足の全陽経が交会する諸陽の会。" },
            { x: 110, y: 75, name: "風府 (GV16)", code: "GV16", desc: "外後頭隆起直下。脳内へと経脈が入る要衝。" },
            { x: 92, y: 33, name: "百会 (GV20)", code: "GV20", desc: "頭頂部正中。天と交わり陽気を昇挙する最高穴。", isMaster: true },
            { x: 65, y: 85, name: "齦交 (GV28)", code: "GV28", desc: "上唇結節上唇小帯の中央。督脈の終点。", isEnd: true }
          ]
        };

      case "nin": // 任脈（前面正中・陰気の統括）
        return {
          viewLabel: "前面・正中観（胸腹ライン）",
          mainPath: "M 110 320 L 110 280 L 110 230 L 110 185 L 110 140 L 110 95 L 110 75",
          nodes: [
            { x: 110, y: 320, name: "会陰 (CV1)", code: "CV1", desc: "外生殖器と肛門の中間。任・督・衝三脈の起始部。", isStart: true },
            { x: 110, y: 280, name: "曲骨・関元 (CV4)", code: "CV4", desc: "臍下3寸。小腸募穴・丹田原気の集積地。" },
            { x: 110, y: 230, name: "神闕 (CV8)", code: "CV8", desc: "臍中央。先天の精と後天の気の中枢。" },
            { x: 110, y: 185, name: "中脘 (CV12)", code: "CV12", desc: "臍上4寸。胃の募穴・八会穴（腑会）。" },
            { x: 110, y: 140, name: "膻中 (CV17)", code: "CV17", desc: "両乳頭中間。心包の募穴・八会穴（気会）。" },
            { x: 110, y: 95, name: "天突 (CV22)", code: "CV22", desc: "胸骨切痕中央。咽喉と肺呼吸を整える要穴。" },
            { x: 110, y: 75, name: "承漿 (CV24)", code: "CV24", desc: "オトガイ唇溝中央。任脈の終点。", isEnd: true }
          ]
        };

      case "sho": // 衝脈（十二経の海・血海・逆気上衝）
        return {
          viewLabel: "前面・胞中〜腎経並行線（両側上衝）",
          mainPath: "M 110 295 C 95 275 92 245 92 180 C 92 140 100 110 110 90",
          secondPath: "M 110 295 C 125 275 128 245 128 180 C 128 140 120 110 110 90",
          downPath: "M 110 295 C 95 315 90 345 88 370",
          nodes: [
            { x: 110, y: 295, name: "胞中 (骨盤内深部)", desc: "子宮・骨盤腔内。衝脈・任脈・督脈の源泉。", isStart: true },
            { x: 92, y: 275, name: "気街 (ST30)", code: "ST30", desc: "鼠径部動脈部。経気が体表へ湧出する要衝。" },
            { x: 92, y: 245, name: "横骨・大赫 (KI12)", code: "KI12", desc: "足少陰腎経と合流し、下腹部の衝気を制御。" },
            { x: 92, y: 185, name: "商曲・陰都 (KI19)", code: "KI19", desc: "腹部正中外方0.5寸。胃腸の気逆を抑える。" },
            { x: 92, y: 145, name: "幽門 (KI21)", code: "KI21", desc: "巨闕の外方0.5寸。胸中に散じる直前の境界。" },
            { x: 110, y: 90, name: "咽喉・口唇", desc: "気血が顔面・鼻腔に広がり気逆を司る。", isEnd: true },
            { x: 88, y: 370, name: "下行枝（足底・内果）", desc: "足少陰経に沿って足部へ下行する調節枝。" }
          ]
        };

      case "tai": // 帯脈（体幹水平環状・全経束ね）
        return {
          viewLabel: "体幹・腹腰部水平旋回観（ベルトリング）",
          isRing: true,
          nodes: [
            { x: 62, y: 205, name: "章門 (LR13)", code: "LR13", desc: "第11肋骨先端下。帯脈が起こる季肋部起点。", isStart: true },
            { x: 74, y: 220, name: "帯脈穴 (GB26)", code: "GB26", desc: "第11肋骨先端下垂線と臍水平線の交点。" },
            { x: 85, y: 236, name: "五枢 (GB27)", code: "GB27", desc: "上前腸骨棘の内側。骨盤腔を束ねる要穴。" },
            { x: 96, y: 248, name: "維道 (GB28)", code: "GB28", desc: "五枢の前下方0.5寸。帯脈が前下方に巡る。", isEnd: true },
            { x: 155, y: 220, name: "腰部全周環回", desc: "腰背部を水平に旋回し、すべての縦走経脈を束ねる。" }
          ]
        };

      case "yokyo": // 陽蹻脈（外果〜体側〜肩〜目頭）
        return {
          viewLabel: "外側面・足外果〜肩〜目内眥（覚醒・陽急）",
          mainPath: "M 62 365 L 62 335 L 66 260 L 72 195 L 75 130 L 95 85 L 108 58",
          nodes: [
            { x: 62, y: 365, name: "申脈 (BL62)", code: "BL62", desc: "外果直下の陥凹部。陽蹻脈の八脈交会穴（通穴）。", isMaster: true, isStart: true },
            { x: 62, y: 335, name: "僕参・跗陽 (BL59)", code: "BL59", desc: "外果後上方。陽蹻脈の郄穴（跗陽）。" },
            { x: 66, y: 260, name: "居髎 (GB29)", code: "GB29", desc: "上前腸骨棘と大転子の中点。下肢外側の運動制御。" },
            { x: 75, y: 130, name: "肩髃・巨骨 (LI15)", code: "LI15", desc: "肩峰外端。肩関節を越えて頚部へ上行。" },
            { x: 95, y: 85, name: "地倉・承泣 (ST1)", code: "ST1", desc: "口角から眼窩下縁を巡り目頭へ向かう。" },
            { x: 108, y: 58, name: "睛明 (BL1)", code: "BL1", desc: "目内眥。陰蹻脈と合流し、脳・風池へ抜ける。", isEnd: true }
          ]
        };

      case "inkyo": // 陰蹻脈（内果〜前陰〜胸〜目頭）
        return {
          viewLabel: "内側面・足内果〜胸部〜目内眥（睡眠・陰急）",
          mainPath: "M 102 365 L 102 335 L 104 275 L 108 245 L 108 170 L 108 105 L 108 58",
          nodes: [
            { x: 102, y: 365, name: "照海 (KI6)", code: "KI6", desc: "内果尖の直下1寸。陰蹻脈の八脈交会穴（通穴）。", isMaster: true, isStart: true },
            { x: 102, y: 335, name: "交信 (KI8)", code: "KI8", desc: "内果上方2寸。陰蹻脈の郄穴。下肢内側の引き攣れを治す。" },
            { x: 104, y: 275, name: "大腿内側直行", desc: "足少陰腎経の内側を直行し前陰部に達する。" },
            { x: 108, y: 245, name: "前陰（恥骨部）", desc: "生殖器を巡り腹腔・胸腔内へと深部に入る。" },
            { x: 108, y: 170, name: "胸腔・缺盆部", desc: "胸部を直上し、鎖骨上窩から喉頭を巡る。" },
            { x: 108, y: 58, name: "睛明 (BL1)", code: "BL1", desc: "目内眥。陽蹻脈と合流して開眼・閉眼リズムを調節。", isEnd: true }
          ]
        };

      case "yoi": // 陽維脈（足外側〜側腹〜肩井〜頭維〜風池）
        return {
          viewLabel: "外側・体表網羅観（寒熱往来・諸陽の統制）",
          mainPath: "M 62 365 L 65 315 L 75 220 L 78 128 L 84 55 L 102 75",
          nodes: [
            { x: 62, y: 365, name: "金門 (BL63)", code: "BL63", desc: "外果前下方。諸陽経が交会し陽維脈が起こる点。", isStart: true },
            { x: 65, y: 315, name: "陽交 (GB35)", code: "GB35", desc: "外果上方7寸。陽維脈の郄穴。" },
            { x: 75, y: 220, name: "側腹部・脇肋", desc: "日月・期門を交会し、少陽胆経と結合。" },
            { x: 78, y: 128, name: "天髎・肩井 (GB21)", code: "GB21", desc: "肩上部の中央。体表の衛気を総括。" },
            { x: 84, y: 55, name: "頭維・本神・陽白", code: "GB14", desc: "前額部・側頭部を巡り、頭部気機を連絡。" },
            { x: 102, y: 75, name: "風池 (GB20)", code: "GB20", desc: "後頭骨下陥凹部。督脈（風府・唖門）と合流。", isEnd: true }
          ]
        };

      case "ini": // 陰維脈（下腿内側〜腹部大横〜期門〜天突）
        return {
          viewLabel: "前面・内側面（心痛胸悶・諸陰の調和）",
          mainPath: "M 98 330 L 98 275 L 85 225 L 88 175 L 110 105 L 110 88",
          nodes: [
            { x: 98, y: 330, name: "築賓 (KI9)", code: "KI9", desc: "内果上方5寸。陰維脈の郄穴・起始点。", isStart: true },
            { x: 98, y: 275, name: "大腿内側上行", desc: "足三陰経と交差しつつ大腿内側を上行。" },
            { x: 85, y: 225, name: "府舎・大横 (SP15)", code: "SP15", desc: "腹部正中外方4寸。脾経と合流し中焦を調律。" },
            { x: 88, y: 175, name: "期門 (LR14)", code: "LR14", desc: "第6肋間。肝の募穴。胸脇の気滞を解除。" },
            { x: 110, y: 105, name: "天突 (CV22)", code: "CV22", desc: "任脈と合流。咽喉と胸部の気機を開通。" },
            { x: 110, y: 88, name: "廉泉 (CV23)", code: "CV23", desc: "甲状軟骨上縁。陰維脈の終点。", isEnd: true }
          ]
        };

      default:
        return {
          viewLabel: "四肢〜体幹走行",
          mainPath: "M 75 350 L 78 280 L 82 170 L 88 120 L 92 70",
          nodes: []
        };
    }
  };

  const config = getVesselConfig();

  return (
    <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4">
      {/* ヘッダー情報 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3 gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B86924] dark:text-[#E6C387]">
              Pathway Vector Schema
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#8899A6]">
              {config.viewLabel}
            </span>
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
            {vessel.name} 流注循行ダイアグラム
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span>流注ルート</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
            <span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: primaryColor, backgroundColor: "white" }} />
            <span>通過穴</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 pt-2">
        {/* SVGグラフィックエリア */}
        <div className="relative w-64 h-96 sm:w-72 sm:h-[400px] rounded-2xl bg-[#FAF8F5] dark:bg-[#10161C] border border-[#E5DEC9] dark:border-[#2A3B4A] p-2 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          <svg
            viewBox="0 0 220 390"
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
            <g className="opacity-15 dark:opacity-20 text-[9px] fill-current">
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
            {config.nodes.map((node, idx) => {
              const isSelected = activeNode?.name === node.name;
              return (
                <g
                  key={idx}
                  className="cursor-pointer transition-transform hover:scale-125"
                  onClick={() => setActiveNode(node)}
                >
                  {/* 外側リング */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 8 : node.isMaster ? 7 : 5}
                    fill={node.isMaster ? primaryColor : "white"}
                    stroke={primaryColor}
                    strokeWidth={node.isMaster ? 2.5 : 2}
                    className="transition-all"
                  />

                  {/* 八脈交会穴やハイライト時の中心ドット */}
                  {node.isMaster && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="3"
                      fill="white"
                    />
                  )}

                  {/* 経穴名ラベル */}
                  <text
                    x={node.x > 110 ? node.x + 8 : node.x - 8}
                    y={node.y + 3}
                    textAnchor={node.x > 110 ? "start" : "end"}
                    fontSize={node.isMaster || isSelected ? "10" : "8.5"}
                    fontWeight={node.isMaster || isSelected ? "bold" : "normal"}
                    fill={isSelected ? primaryColor : "currentColor"}
                    className="drop-shadow-xs"
                  >
                    {node.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* 右上視点バッジ */}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-white/80 dark:bg-[#121920]/80 backdrop-blur-xs border border-[#E5DEC9] dark:border-[#2A3B4A] text-[9px] font-bold text-[#737C77] dark:text-[#8899A6]">
            ピンをタップして解説
          </div>
        </div>

        {/* 右側：流注ポイント解説 & インタラクティブカード */}
        <div className="space-y-4 flex-1 text-xs sm:text-sm w-full">
          {/* 選択されたノードの詳細カード */}
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
                <span>{activeNode.isMaster ? "★ 八脈交会穴（本脈を統括駆動する要穴）" : "通過部位・重要解剖ランドマーク"}</span>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2.5 text-xs text-[#737C77] dark:text-[#8899A6]">
              <Info className="w-4 h-4 text-[#B86924] shrink-0" />
              <span>
                ダイアグラム上の各経穴ピンをタップすると、その位置と臨床的役割を確認できます。
              </span>
            </div>
          )}

          {/* 流注ステップ詳細リスト */}
          <div className="space-y-2">
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs block">
              流注ステップ循行解説（起部から終部まで）:
            </span>
            <div className="space-y-2">
              {vessel.pathway.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5 hover:border-[#B86924] transition-colors"
                >
                  <span
                    className="w-5 h-5 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {idx + 1}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed text-xs">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 八脈交会穴の連携ボックス */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FAF8F5] to-[#FCF4EB] dark:from-[#151D25] dark:to-[#221810] border border-[#E5DEC9] dark:border-[#382618] text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#B86924] dark:text-[#E6C387] font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>八脈交会穴（通穴）による奇経駆動メカニズム</span>
            </div>
            <p className="text-[#59615D] dark:text-[#A8988B] leading-relaxed text-[11px]">
              本脈の循行ライン上に病変（滞り・過緊張・虚脱）が現れた場合、四肢に位置する主穴<strong>「{vessel.masterPoint.name}」</strong>（{vessel.masterPoint.meridian}）と、対となる配穴<strong>「{vessel.couplePoint.name}」</strong>（{vessel.couplePoint.meridian}）を刺灸することで、奇経の気血を正経十二経脈へと循環させ、速やかな治効を導きます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
