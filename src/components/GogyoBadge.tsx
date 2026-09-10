"use client";

import React from "react";
import { getGogyoColor } from "@/utils/gogyoColor";

interface Props {
  target: string; // 例: "肝", "木", "心・小腸", "脾"
  size?: "xs" | "sm" | "md";
  showElement?: boolean;
  showColorName?: boolean;
  className?: string;
}

export default function GogyoBadge({
  target,
  size = "sm",
  showElement = true,
  showColorName = false,
  className = ""
}: Props) {
  const gogyo = getGogyoColor(target);

  const sizeClasses = {
    xs: "text-[10px] px-2 py-0.5 gap-1",
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-xs sm:text-sm px-3 py-1 gap-2 font-bold"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold transition-colors border shadow-xs ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: gogyo.bgLight,
        borderColor: gogyo.borderLight,
        color: gogyo.textLight
      }}
    >
      {/* 象徴する丸ポチ（ダーク時は発光） */}
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: gogyo.accent }}
      />

      {showElement && (
        <span className="font-serif">
          {gogyo.element}
        </span>
      )}

      <span>{target.includes(gogyo.element) ? target : `${target}`}</span>

      {showColorName && (
        <span className="text-[10px] opacity-75 font-mono">
          ({gogyo.colorShort})
        </span>
      )}
    </span>
  );
}
