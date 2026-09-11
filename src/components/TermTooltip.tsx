"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlossaryTerm } from "@/data/glossaryData";
import { Sparkles, X } from "lucide-react";

interface TermTooltipProps {
  termInfo: GlossaryTerm;
  children: React.ReactNode;
}

export default function TermTooltip({ termInfo, children }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [align, setAlign] = useState<"center" | "left" | "right">("center");
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 画面外クリック & Escキーで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // デスクトップでのツールチップ位置（左右見切れ防止計算）
  useEffect(() => {
    if (isOpen && containerRef.current && typeof window !== "undefined") {
      const rect = containerRef.current.getBoundingClientRect();
      const tooltipWidth = 320;
      const windowWidth = window.innerWidth;

      if (rect.left + rect.width / 2 - tooltipWidth / 2 < 24) {
        setAlign("left");
      } else if (rect.left + rect.width / 2 + tooltipWidth / 2 > windowWidth - 24) {
        setAlign("right");
      } else {
        setAlign("center");
      }
    }
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
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="cursor-help font-semibold text-[#1E3D34] dark:text-[#68B094] 
                   border-b-2 border-dashed border-[#1E3D34]/50 dark:border-[#4E8C76]/60 
                   hover:bg-[#E8EFEA] dark:hover:bg-[#182823] rounded px-0.5 transition-colors"
      >
        {children}
      </span>

      {/* デスクトップ用：ホバー辞書ツールチップ（PC・タブレット向け） */}
      {isOpen && (
        <span
          role="tooltip"
          className={`hidden sm:block absolute bottom-full mb-2 w-80 p-4 
                     bg-[#FCFAF6] dark:bg-[#17212A] text-[#232826] dark:text-[#FAF8F5] 
                     rounded-2xl border-2 border-[#1E3D34] dark:border-[#3A6B5B] 
                     shadow-2xl z-50 animate-fadeIn pointer-events-auto text-left
                     ${
                       align === "left"
                         ? "left-0"
                         : align === "right"
                         ? "right-0"
                         : "left-1/2 -translate-x-1/2"
                     }`}
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
              <Sparkles className="w-3 h-3 text-[#B86924] dark:text-[#E6C387]" />
              <span>3秒でわかる要約</span>
            </strong>
            {termInfo.summary}
          </span>

          {/* 下向きの三角形（吹き出し矢印） */}
          <span
            className={`absolute top-full -mt-1 border-4 border-transparent border-t-[#1E3D34] dark:border-t-[#3A6B5B] block w-0 h-0 ${
              align === "left"
                ? "left-6"
                : align === "right"
                ? "right-6"
                : "left-1/2 -translate-x-1/2"
            }`}
          />
        </span>
      )}

      {/* モバイル用：ボトムシート解説カード（スマホで画面外に見切れる問題を100%解消） */}
      {isOpen && mounted && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 z-[100] sm:hidden flex items-end justify-center pointer-events-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* 背景タップで閉じるオーバーレイ */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />

          {/* ボトムシートカード */}
          <div
            className="relative w-full max-w-lg mx-auto bg-[#FCFAF6] dark:bg-[#17212A] text-[#232826] dark:text-[#FAF8F5] 
                       rounded-t-3xl border-t-2 border-x-2 border-[#1E3D34] dark:border-[#3A6B5B] 
                       p-5 pb-8 shadow-2xl z-10 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 上部グラブバー（スマホのシート風インジケーター） */}
            <div className="w-12 h-1.5 rounded-full bg-[#D5CCBC] dark:bg-[#3D4F60] mx-auto mb-4" />

            {/* ヘッダーエリア */}
            <div className="flex items-start justify-between gap-3 border-b border-[#E2D9C5] dark:border-[#2A3B4A] pb-3 mb-3">
              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {termInfo.term}
                  </span>
                  <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                    （{termInfo.reading}）
                  </span>
                </div>
                <span className="inline-block mt-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F3E1CB] dark:border-[#423321]">
                  {termInfo.category}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#737C77] dark:text-[#8899A6] bg-[#F5F1E8] dark:bg-[#121920] border border-[#E2D9C5] dark:border-[#2A3B4A] hover:bg-[#E8EFEA] transition-colors shrink-0"
                aria-label="閉じる"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3秒要約 */}
            <div className="space-y-2">
              <strong className="text-[#1E3D34] dark:text-[#68B094] block text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>3秒でわかる要約</span>
              </strong>
              <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed bg-[#F5F1E8] dark:bg-[#121920] p-3.5 rounded-2xl border border-[#EDE7DB] dark:border-[#22303D]">
                {termInfo.summary}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </span>
  );
}
