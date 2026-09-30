"use client";

import React from "react";
import { Bookmark, FileText } from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

export default function ClinicalDrawerTrigger() {
  const { clipCount, patientNoteCount, openDrawer, isDrawerOpen } = useClinicalMemo();

  // ドロワーが開いている時、またはストックもカルテもゼロの時は表示しない
  if (isDrawerOpen || (clipCount === 0 && patientNoteCount === 0)) {
    return null;
  }

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-3.5 lg:right-6 z-30 print:hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
      <button
        type="button"
        onClick={openDrawer}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1E3D34] hover:bg-[#162D26] text-white shadow-md hover:shadow-lg transition-all active:scale-95 group cursor-pointer border border-emerald-600/40"
        title="臨床カルテ・配穴ストックを開く"
        aria-label="臨床カルテ・配穴ストックを開く"
      >
        <div className="relative flex items-center justify-center">
          <Bookmark className="w-4 h-4 fill-current text-[#E6C387]" />
          <span className="absolute -top-2 -right-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#B86924] text-white leading-none shadow-xs">
            {clipCount + patientNoteCount}
          </span>
        </div>
        <span className="text-xs font-bold tracking-tight hidden sm:inline">
          配穴ストック
        </span>
      </button>
    </div>
  );
}
