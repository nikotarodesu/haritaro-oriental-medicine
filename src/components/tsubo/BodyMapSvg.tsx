"use client";

import React, { useState } from "react";
import { BodyPart } from "@/data/tsubo/types";
import { User, RotateCcw, ArrowDown } from "lucide-react";

interface BodyMapSvgProps {
  selectedBodyPart: string;
  onSelectBodyPart: (part: string) => void;
  pointCountsByPart?: Record<string, number>;
}

export default function BodyMapSvg({
  selectedBodyPart,
  onSelectBodyPart,
  pointCountsByPart = {},
}: BodyMapSvgProps) {
  const [viewMode, setViewMode] = useState<"front" | "back">("front");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const regions: { id: BodyPart; label: string; count?: number; side: "both" | "front" | "back" }[] = [
    { id: "頭部・顔面", label: "頭部・顔面", count: pointCountsByPart["頭部・顔面"] || 52, side: "both" },
    { id: "首・肩", label: "首・肩", count: pointCountsByPart["首・肩"] || 34, side: "both" },
    { id: "胸・腹", label: "胸・腹", count: pointCountsByPart["胸・腹"] || 46, side: "front" },
    { id: "背中・腰", label: "背中・腰", count: pointCountsByPart["背中・腰"] || 68, side: "back" },
    { id: "手・腕", label: "手・腕", count: pointCountsByPart["手・腕"] || 73, side: "both" },
    { id: "足・脚", label: "足・脚", count: pointCountsByPart["足・脚"] || 88, side: "both" },
  ];

  // 前面・背面切替時の整合性処理
  const handleSwitchView = (newView: "front" | "back") => {
    setViewMode(newView);
    if (newView === "back" && selectedBodyPart === "胸・腹") {
      onSelectBodyPart("すべて");
      setNoticeMessage("背面視に切り替えたため、「胸・腹」の選択を解除しました");
      setTimeout(() => setNoticeMessage(null), 3500);
    } else if (newView === "front" && selectedBodyPart === "背中・腰") {
      onSelectBodyPart("すべて");
      setNoticeMessage("前面視に切り替えたため、「背中・腰」の選択を解除しました");
      setTimeout(() => setNoticeMessage(null), 3500);
    }
  };

  // 部位選択時の前面・背面自動連動
  const handleSelectRegion = (part: string) => {
    if (part === "胸・腹" && viewMode === "back") {
      setViewMode("front");
    } else if (part === "背中・腰" && viewMode === "front") {
      setViewMode("back");
    }
    setNoticeMessage(null);
    onSelectBodyPart(part);
  };

  const currentCount = selectedBodyPart !== "すべて" ? pointCountsByPart[selectedBodyPart] || 0 : 361;

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-6 shadow-xs space-y-4 transition-colors">
      {/* 上部ヘッダー ＆ 前面/背面切替 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center">
            <User className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              身体部位から探す（人体図セレクター）
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6]">
              図の部位またはボタンをタップして該当経穴を絞り込み
            </p>
          </div>
        </div>

        {/* 前面/背面トグルボタン */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] p-0.5 border border-[#E5DEC9] dark:border-[#263542] text-xs">
            <button
              type="button"
              onClick={() => handleSwitchView("front")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                viewMode === "front"
                  ? "bg-[#1E3D34] text-white dark:bg-[#2B6958] shadow-xs"
                  : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34]"
              }`}
            >
              前面視
            </button>
            <button
              type="button"
              onClick={() => handleSwitchView("back")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                viewMode === "back"
                  ? "bg-[#1E3D34] text-white dark:bg-[#2B6958] shadow-xs"
                  : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34]"
              }`}
            >
              背面視
            </button>
          </div>

          {selectedBodyPart !== "すべて" && (
            <button
              type="button"
              onClick={() => onSelectBodyPart("すべて")}
              className="text-xs text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>全身に戻す</span>
            </button>
          )}
        </div>
      </div>

      {/* 通知バー（視点切替時の自動解除案内など） */}
      {noticeMessage && (
        <div className="p-2.5 rounded-xl bg-[#FFF8E6] dark:bg-[#282210] border border-[#F2DEB0] dark:border-[#42381C] text-xs text-[#B86924] dark:text-[#E6C387] flex items-center justify-between">
          <span>{noticeMessage}</span>
          <button
            type="button"
            onClick={() => setNoticeMessage(null)}
            className="text-[10px] text-[#737C77] hover:underline ml-2"
          >
            閉じる
          </button>
        </div>
      )}

      {/* 選択中の部位と件数リアルタイムインジケーター（直近に配置） */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {selectedBodyPart !== "すべて" ? (
            <>
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2.5 py-0.5 rounded-md border border-[#C5DED4] dark:border-[#2A5243]">
                【{selectedBodyPart}】を選択中
              </span>
              <span className="text-[#333835] dark:text-[#C5D2DB] font-medium">
                該当 <strong className="text-sm font-mono text-[#1E3D34] dark:text-[#74BA9E]">{currentCount}</strong> 穴
              </span>
            </>
          ) : (
            <span className="text-[#59615D] dark:text-[#A0B0BC]">
              全身の <strong className="font-mono text-[#1E3D34] dark:text-[#74BA9E]">361</strong> 経穴を表示中（部位タップで即座に絞り込み）
            </span>
          )}
        </div>

        {selectedBodyPart !== "すべて" && (
          <a
            href="#tsubo-list"
            className="px-3.5 py-1.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold hover:bg-[#162E27] transition-all flex items-center gap-1 shadow-xs"
          >
            <span>該当 {currentCount} 穴を見る</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* SVG人体図 ＆ ボタンセレクター */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* SVG人体図（5カラム） */}
        <div className="md:col-span-5 flex justify-center py-1">
          <div className="relative w-[180px] sm:w-[200px] h-[280px] sm:h-[300px] bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-2 flex justify-center items-center shadow-inner select-none">
            
            <svg viewBox="0 0 160 250" className="w-full h-full">
              {/* 頭部・顔面 */}
              <g
                onClick={() => handleSelectRegion("頭部・顔面")}
                className="cursor-pointer group"
              >
                <circle
                  cx="80"
                  cy="26"
                  r="18"
                  className={`transition-all duration-200 ${
                    selectedBodyPart === "頭部・顔面"
                      ? "fill-[#1E3D34] dark:fill-[#74BA9E] stroke-[#1E3D34] stroke-2"
                      : "fill-[#E5DEC9] dark:fill-[#263542] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                  }`}
                />
              </g>

              {/* 首・肩 */}
              <g
                onClick={() => handleSelectRegion("首・肩")}
                className="cursor-pointer group"
              >
                <path
                  d="M 50,48 L 110,48 L 120,62 L 40,62 Z"
                  className={`transition-all duration-200 ${
                    selectedBodyPart === "首・肩"
                      ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                      : "fill-[#D8CFC0] dark:fill-[#2D3E50] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                  }`}
                />
              </g>

              {/* 胸・腹（前面）または 背中・腰（背面） */}
              {viewMode === "front" ? (
                <g
                  onClick={() => handleSelectRegion("胸・腹")}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 50,65 L 110,65 L 105,120 L 55,120 Z"
                    className={`transition-all duration-200 ${
                      selectedBodyPart === "胸・腹"
                        ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                        : "fill-[#E5DEC9] dark:fill-[#263542] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                    }`}
                  />
                  <text x="80" y="95" textAnchor="middle" className="text-[9px] fill-[#59615D] dark:fill-[#A0B0BC] pointer-events-none font-bold">
                    胸腹部
                  </text>
                </g>
              ) : (
                <g
                  onClick={() => handleSelectRegion("背中・腰")}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 50,65 L 110,65 L 105,120 L 55,120 Z"
                    className={`transition-all duration-200 ${
                      selectedBodyPart === "背中・腰"
                        ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                        : "fill-[#E5DEC9] dark:fill-[#263542] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                    }`}
                  />
                  <text x="80" y="95" textAnchor="middle" className="text-[9px] fill-[#59615D] dark:fill-[#A0B0BC] pointer-events-none font-bold">
                    背腰部
                  </text>
                </g>
              )}

              {/* 手・腕（両側） */}
              <g
                onClick={() => handleSelectRegion("手・腕")}
                className="cursor-pointer group"
              >
                {/* 左上肢 */}
                <path
                  d="M 48,65 L 38,65 L 22,135 L 32,135 Z"
                  className={`transition-all duration-200 ${
                    selectedBodyPart === "手・腕"
                      ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                      : "fill-[#D8CFC0] dark:fill-[#2D3E50] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                  }`}
                />
                {/* 右上肢 */}
                <path
                  d="M 112,65 L 122,65 L 138,135 L 128,135 Z"
                  className={`transition-all duration-200 ${
                    selectedBodyPart === "手・腕"
                      ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                      : "fill-[#D8CFC0] dark:fill-[#2D3E50] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                  }`}
                />
              </g>

              {/* 骨盤・臀部 */}
              <path
                d="M 55,122 L 105,122 L 95,138 L 65,138 Z"
                fill="#D0C7B6"
                className="cursor-pointer hover:opacity-80"
                onClick={() => handleSelectRegion(viewMode === "back" ? "背中・腰" : "胸・腹")}
              />

              {/* 足・脚（両側） */}
              <g
                onClick={() => handleSelectRegion("足・脚")}
                className="cursor-pointer group"
              >
                {/* 左下肢 */}
                <path
                  d="M 58,138 L 78,138 L 74,235 L 56,235 Z"
                  className={`transition-all duration-200 ${
                    selectedBodyPart === "足・脚"
                      ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                      : "fill-[#E5DEC9] dark:fill-[#263542] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                  }`}
                />
                {/* 右下肢 */}
                <path
                  d="M 82,138 L 102,138 L 104,235 L 86,235 Z"
                  className={`transition-all duration-200 ${
                    selectedBodyPart === "足・脚"
                      ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                      : "fill-[#E5DEC9] dark:fill-[#263542] hover:fill-[#C5DED4] dark:hover:fill-[#385348]"
                  }`}
                />
              </g>
            </svg>

            <span className="absolute bottom-1 right-2 text-[9px] text-[#88928D] dark:text-[#6A7C8B] font-mono">
              ※身体本人の左右
            </span>
          </div>
        </div>

        {/* ボタン一覧セレクター（7カラム） */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {regions.map((region) => {
            const isSelected = selectedBodyPart === region.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => handleSelectRegion(isSelected ? "すべて" : region.id)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm scale-102"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] hover:border-[#1E3D34]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm">{region.label}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#E6C387] shrink-0" />
                  )}
                </div>
                <span className={`text-[10px] mt-1.5 ${isSelected ? "text-[#E6C387]" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                  収録 {region.count} 穴
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
