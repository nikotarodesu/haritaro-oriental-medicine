"use client";

import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { ResolvedReference } from "@/types/references";

interface CitationBadgeProps {
  reference?: ResolvedReference;
  displayNumber: number;
  targetAnchorId: string;
}

export default function CitationBadge({
  reference,
  displayNumber,
  targetAnchorId,
}: CitationBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetAnchorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // ハイライトアニメーション用
      el.classList.add("ring-2", "ring-[#1E3D34]", "dark:ring-[#74BA9E]");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-[#1E3D34]", "dark:ring-[#74BA9E]");
      }, 2500);
      window.history.pushState(null, "", `#${targetAnchorId}`);
    }
  };

  return (
    <span
      className="relative inline-block align-super leading-none mx-0.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={`#${targetAnchorId}`}
        onClick={handleClick}
        className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold text-[#1E3D34] dark:text-[#83BEA8] bg-[#EBF3EF] dark:bg-[#182823] hover:bg-[#1E3D34] hover:text-[#FAF8F5] dark:hover:bg-[#2B6958] rounded-md transition-all border border-[#1E3D34]/20 dark:border-[#83BEA8]/30 cursor-pointer select-none no-underline shadow-2xs group"
        title={reference ? `${reference.title} (${reference.source})` : `参考文献 [${displayNumber}]`}
      >
        <span>[{displayNumber}]</span>
      </a>

      {/* ツールチッププレビュー */}
      {isOpen && reference && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3 bg-[#FAF8F5] dark:bg-[#1A2530] text-[#232826] dark:text-[#E6EFEA] border border-[#D8CFC0] dark:border-[#2D3E50] rounded-xl shadow-xl z-50 animate-fadeIn pointer-events-auto text-left block"
          style={{ lineHeight: "1.4" }}
        >
          <span className="flex items-center justify-between gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
              <BookOpen className="w-3 h-3" />
              <span>文献 [{displayNumber}]</span>
            </span>
            {reference.type && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#EBF3EF] dark:bg-[#121920] text-[#1E3D34] dark:text-[#83BEA8] font-medium">
                {reference.type === "paper" ? "学術論文" : reference.type === "classic" ? "古典原典" : reference.type}
              </span>
            )}
          </span>

          <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] line-clamp-2 block mb-1">
            {reference.title}
          </span>

          <span className="text-[10px] text-[#59615D] dark:text-[#A0B0BC] block">
            {reference.source} {reference.year ? `(${reference.year})` : ""}
          </span>

          {reference.url && (
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 pt-1.5 border-t border-[#E8E1D1] dark:border-[#2A3B4A] inline-flex items-center gap-1 text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{reference.pmid ? "PubMedで確認" : reference.doi ? "DOI論文を見る" : "出典リンク"}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}

          {/* 下向きの三角矢印 */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#D8CFC0] dark:border-t-[#2D3E50]" />
        </span>
      )}
    </span>
  );
}
