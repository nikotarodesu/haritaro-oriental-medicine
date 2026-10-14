"use client";

import React, { useState } from "react";
import { BodyPart } from "@/data/tsubo/types";
import { User, RotateCcw, ArrowDown } from "lucide-react";

interface BodyMapSvgProps {
  selectedBodyPart: string;
  onSelectBodyPart: (part: string) => void;
}

export default function BodyMapSvg({
  selectedBodyPart,
  onSelectBodyPart,
}: BodyMapSvgProps) {
  const [viewMode, setViewMode] = useState<"front" | "back">("front");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const displayedView = selectedBodyPart === "胸・腹" ? "front" : selectedBodyPart === "背中・腰" ? "back" : viewMode;

  const regions: { id: BodyPart; label: string }[] = [
    { id: "頭部・顔面", label: "頭部・顔面" },
    { id: "首・肩", label: "首・肩" },
    { id: "胸・腹", label: "胸・腹" },
    { id: "背中・腰", label: "背中・腰" },
    { id: "手・腕", label: "手・腕" },
    { id: "足・脚", label: "足・脚" },
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
    if (part === "胸・腹" && displayedView === "back") {
      setViewMode("front");
    } else if (part === "背中・腰" && displayedView === "front") {
      setViewMode("back");
    }
    setNoticeMessage(null);
    onSelectBodyPart(part);
  };

  return (
    <div className="tsubo-body-map bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-6 space-y-4">
      {/* 上部ヘッダー ＆ 前面/背面切替 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center">
            <User className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              部位から探す
            </h3>
            <p className="text-sm text-[#737C77] dark:text-[#8899A6]">
              図かボタンで選択
            </p>
          </div>
        </div>

        {/* 前面/背面トグルボタン */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] p-0.5 border border-[#E5DEC9] dark:border-[#263542] text-xs">
            <button
              type="button"
              onClick={() => handleSwitchView("front")}
              aria-pressed={displayedView === "front"}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                displayedView === "front"
                  ? "bg-[#1E3D34] text-white dark:bg-[#2B6958] shadow-xs"
                  : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34]"
              }`}
            >
              前面視
            </button>
            <button
              type="button"
              onClick={() => handleSwitchView("back")}
              aria-pressed={displayedView === "back"}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                displayedView === "back"
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
        <div role="status" className="p-2.5 rounded-xl bg-[#FFF8E6] dark:bg-[#282210] border border-[#F2DEB0] dark:border-[#42381C] text-xs text-[#B86924] dark:text-[#E6C387] flex items-center justify-between">
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

      {/* SVG人体図 ＆ ボタンセレクター */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* SVG人体図（5カラム） */}
        <div className="md:col-span-5 flex flex-col items-center gap-2 py-1">
          <div className="relative w-[180px] sm:w-[200px] h-[280px] sm:h-[300px] bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-2 flex justify-center items-center shadow-inner select-none">
            
            <svg viewBox="0 0 160 250" className="w-full h-full" aria-hidden="true" focusable="false">
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
              {displayedView === "front" ? (
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

          </div>
          <p className="text-center text-xs text-[#59615D] dark:text-[#A0B0BC]">左右は、図の人物から見た向きです</p>
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
                aria-pressed={isSelected}
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
              </button>
            );
          })}
        </div>

      </div>
      {selectedBodyPart !== "すべて" && <a href="#tsubo-list" className="tsubo-result-jump"><span>絞り込んだ経穴を見る</span><ArrowDown aria-hidden="true" className="h-4 w-4" /></a>}
    </div>
  );
}
