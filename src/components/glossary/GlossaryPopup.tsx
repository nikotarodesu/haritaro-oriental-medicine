"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { GlossaryTerm } from "@/data/glossaryData";
import {
  X,
  BookOpen,
  Sparkles,
  ArrowRight,
  Layers,
  Lightbulb,
  Compass,
} from "lucide-react";

interface GlossaryPopupProps {
  term: GlossaryTerm | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GlossaryPopup({
  term,
  isOpen,
  onClose,
}: GlossaryPopupProps) {
  // ESCキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !term) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
    >
      {/* PC: 中央カード / スマホ: ボトムシート */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg bg-[#FAF8F5] dark:bg-[#16212B] rounded-t-3xl sm:rounded-3xl border-t sm:border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl p-5 sm:p-7 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
      >
        {/* スマホ用ドラッグハンドルバー */}
        <div className="sm:hidden flex justify-center pb-1">
          <div className="w-12 h-1 rounded-full bg-[#D5CCBC] dark:bg-[#2A3B4A]" />
        </div>

        {/* ヘッダー */}
        <div className="flex items-start justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243]">
                {term.category}
              </span>
              <span className="text-xs font-mono text-[#737C77] dark:text-[#8899A6]">
                読み：{term.reading}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              {term.term}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#EAE3D4] dark:hover:bg-[#202E3C] text-[#59615D] dark:text-[#96A6B2] transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 一言での意味（中学生でもわかる平易な説明） */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#2A3B4A] shadow-2xs space-y-1.5">
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            一言でいうと？
          </span>
          <p className="text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
            {term.oneLiner}
          </p>
        </div>

        {/* 身近な例・アナロジー（あれば表示） */}
        {term.analogy && (
          <div className="p-3.5 rounded-xl bg-[#FCF4EB] dark:bg-[#261E16] border border-[#F3DEC5] dark:border-[#4D331F] space-y-1">
            <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              身近な例え
            </span>
            <p className="text-xs sm:text-sm text-[#404743] dark:text-[#E6EFEA] leading-relaxed">
              {term.analogy}
            </p>
          </div>
        )}

        {/* 詳細解説 */}
        <div className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed space-y-1">
          <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block">
            詳細な解説:
          </span>
          <p>{term.summary}</p>
        </div>

        {/* 関連講義・ツールへの導線 */}
        {(term.relatedLectureId || term.relatedToolUrl) && (
          <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-wrap gap-2">
            {term.relatedLectureId && (
              <Link
                href={`/curriculum/${term.relatedLectureId}`}
                onClick={onClose}
                className="flex-1 min-w-[180px] p-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#162E27] text-white text-xs font-bold transition-all flex items-center justify-between shadow-2xs group"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate">{term.relatedLectureTitle || "講義で詳しく学ぶ"}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </Link>
            )}

            {term.relatedToolUrl && (
              <Link
                href={term.relatedToolUrl}
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white dark:bg-[#1A2632] hover:bg-[#FAF8F5] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              >
                <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>{term.relatedToolTitle || "関連ツール"}</span>
              </Link>
            )}
          </div>
        )}

        {/* 下部閉じるボタン */}
        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#EFE9DD] dark:bg-[#202E3C] hover:bg-[#E5DEC9] text-[#232826] dark:text-[#FAF8F5] text-xs font-bold transition-colors cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
