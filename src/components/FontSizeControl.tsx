"use client";

import React from "react";
import { Type } from "lucide-react";
import { useFontSize, FontSize } from "@/contexts/FontSizeContext";

interface Props {
  variant?: "segmented" | "compact" | "drawer";
  className?: string;
}

export default function FontSizeControl({
  variant = "segmented",
  className = ""
}: Props) {
  const { fontSize, setFontSize, cycleFontSize } = useFontSize();

  const labels: Record<FontSize, string> = {
    normal: "標準",
    large: "大",
    xlarge: "特大"
  };

  // モバイルヘッダー用（コンパクト）
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={cycleFontSize}
        className={`relative flex items-center justify-center gap-0.5 px-2 py-1.5 rounded-full border border-[#E5DEC9] dark:border-[#2D3E50] bg-[#FAF8F5] dark:bg-[#151D25] text-[#404743] dark:text-[#C5D2DB] hover:bg-[#EBF3EF] dark:hover:bg-[#1C2834] transition-all shadow-2xs group ${className}`}
        title={`文字サイズ切り替え（現在: ${labels[fontSize]}）`}
        aria-label={`文字サイズ切り替え 現在は${labels[fontSize]}`}
      >
        <Type className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
        <span className="text-[10px] font-bold tracking-tight text-[#1E3D34] dark:text-[#74BA9E]">
          {labels[fontSize]}
        </span>
      </button>
    );
  }

  // モバイルドロワー用（幅いっぱい）
  if (variant === "drawer") {
    return (
      <div className={`p-3 rounded-2xl bg-[#F2EDE4] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2D3E50] space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs font-bold text-[#59615D] dark:text-[#96A6B2]">
          <span className="flex items-center gap-1.5 text-[#1E3D34] dark:text-[#74BA9E]">
            <Type className="w-4 h-4" />
            <span>文字サイズ変更</span>
          </span>
          <span className="text-[11px] font-medium text-[#737C77] dark:text-[#8899A6]">
            現在: {labels[fontSize]}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#FAF8F5] dark:bg-[#10161C] border border-[#E5DEC9] dark:border-[#243342]">
          {(["normal", "large", "xlarge"] as FontSize[]).map((size) => {
            const isActive = fontSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setFontSize(size)}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#1E3D34] text-[#FAF8F5] dark:bg-[#2B6958] dark:text-white shadow-sm scale-[1.02]"
                    : "text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#EBF3EF] dark:hover:bg-[#1E2B37]"
                }`}
              >
                {labels[size]}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // デスクトップヘッダー用（セグメント）
  return (
    <div
      className={`inline-flex items-center gap-0.5 p-1 rounded-full bg-[#FAF8F5] dark:bg-[#151D25] border border-[#E5DEC9] dark:border-[#2D3E50] shadow-2xs transition-colors ${className}`}
      role="group"
      aria-label="文字サイズ変更"
    >
      <div className="flex items-center gap-1 pl-2 pr-1 text-[#737C77] dark:text-[#8899A6] select-none">
        <Type className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
        <span className="text-[11px] font-bold hidden xl:inline">文字</span>
      </div>

      <div className="flex items-center gap-0.5">
        {(["normal", "large", "xlarge"] as FontSize[]).map((size) => {
          const isActive = fontSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => setFontSize(size)}
              className={`px-2.5 py-0.5 rounded-full text-xs transition-all ${
                isActive
                  ? "bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] font-bold shadow-xs scale-100"
                  : "text-[#59615D] dark:text-[#A0B0BC] font-medium hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1E2B37]"
              }`}
              title={`文字サイズを「${labels[size]}」にする`}
            >
              {labels[size]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
