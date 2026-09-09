"use client";

import { useState, useRef, useEffect } from "react";
import { GlossaryTerm } from "@/data/glossaryData";
import { BookOpen, Sparkles } from "lucide-react";

interface TermTooltipProps {
  termInfo: GlossaryTerm;
  children: React.ReactNode;
}

export default function TermTooltip({ termInfo, children }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // 画面外クリックで閉じる（スマホ対応）
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* ハイライトされた用語テキスト */}
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-help font-semibold text-[#1E3D34] dark:text-[#68B094] 
                   border-b-2 border-dashed border-[#1E3D34]/50 dark:border-[#4E8C76]/60 
                   hover:bg-[#EBF3EF] dark:hover:bg-[#182823] rounded px-0.5 transition-colors"
      >
        {children}
      </span>

      {/* ポップアップ（ホバー辞書カード） */}
      {isOpen && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-4 
                     bg-[#FAF8F5] dark:bg-[#17212A] text-[#232826] dark:text-[#FAF8F5] 
                     rounded-2xl border-2 border-[#1E3D34] dark:border-[#3A6B5B] 
                     shadow-2xl z-50 animate-fadeIn pointer-events-auto text-left block"
        >
          {/* カードヘッダー */}
          <span className="flex items-center justify-between gap-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2 mb-2.5">
            <span className="flex items-baseline gap-1.5">
              <span className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                {termInfo.term}
              </span>
              <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                （{termInfo.reading}）
              </span>
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F3E1CB] dark:border-[#423321] shrink-0">
              {termInfo.category}
            </span>
          </span>

          {/* 3秒要約 */}
          <span className="block text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            <strong className="text-[#1E3D34] dark:text-[#68B094] block text-[11px] mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>3秒でわかる要約</span>
            </strong>
            {termInfo.summary}
          </span>

          {/* 下向きの三角形（吹き出し矢印） */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1E3D34] dark:border-t-[#3A6B5B] block w-0 h-0" />
        </span>
      )}
    </span>
  );
}
