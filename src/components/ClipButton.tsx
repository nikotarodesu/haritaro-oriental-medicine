"use client";

import React from "react";
import { Bookmark, Check, Plus } from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { ClinicalMemoItem } from "@/types/clinicalMemo";

interface ClipButtonProps {
  item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">;
  variant?: "icon" | "button" | "badge";
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
}

export default function ClipButton({
  item,
  variant = "button",
  size = "md",
  className = "",
  showLabel = true,
}: ClipButtonProps) {
  const { isClipped, toggleClip } = useClinicalMemo();
  const clipped = isClipped(item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleClip(item);
  };

  // 1. アイコン単体バリアント
  if (variant === "icon") {
    const sizeClasses = {
      sm: "w-7 h-7 p-1 text-xs",
      md: "w-8 h-8 p-1.5 text-sm",
      lg: "w-10 h-10 p-2 text-base",
    }[size];

    return (
      <button
        type="button"
        onClick={handleClick}
        title={clipped ? "マイカルテから解除" : "マイカルテにクリップ保存"}
        aria-label={clipped ? "マイカルテから解除" : "マイカルテにクリップ保存"}
        className={`rounded-full flex items-center justify-center transition-all ${sizeClasses} ${
          clipped
            ? "bg-[#B86924] text-white shadow-xs hover:bg-[#9B551B] scale-105"
            : "bg-[#FAF8F5] dark:bg-[#1A2530] text-[#737C77] dark:text-[#8899A6] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:text-[#B86924] hover:border-[#B86924] dark:hover:border-[#E6C387]"
        } ${className}`}
      >
        <Bookmark
          className={`${size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-5 h-5"} ${
            clipped ? "fill-current" : ""
          }`}
        />
      </button>
    );
  }

  // 2. バッジ風バリアント
  if (variant === "badge") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
          clipped
            ? "bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4D331F]"
            : "bg-[#FAF8F5] dark:bg-[#17212A] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] hover:text-[#B86924]"
        } ${className}`}
      >
        <Bookmark className={`w-3 h-3 ${clipped ? "fill-current" : ""}`} />
        <span>{clipped ? "保存済" : "保存"}</span>
      </button>
    );
  }

  // 3. 通常ボタンバリアント
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-xs sm:text-sm gap-2",
    lg: "px-4 py-2 text-sm sm:text-base gap-2.5",
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all shadow-2xs ${sizeClasses} ${
        clipped
          ? "bg-[#B86924] text-white hover:bg-[#9B551B] border border-[#9B551B]"
          : "bg-white dark:bg-[#1A2530] text-[#232826] dark:text-[#FAF8F5] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] dark:hover:bg-[#202E3C] hover:border-[#B86924] dark:hover:border-[#E6C387] hover:text-[#B86924] dark:hover:text-[#E6C387]"
      } ${className}`}
    >
      <Bookmark
        className={`${size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-4.5 h-4.5"} ${
          clipped ? "fill-current" : ""
        }`}
      />
      {showLabel && (
        <span>
          {clipped ? "マイカルテ保存済" : "マイカルテに保存"}
        </span>
      )}
    </button>
  );
}
