"use client";

import React, { useState, useMemo } from "react";
import { getAllAcupoints, AcupointMaster, MERIDIANS } from "@/data/tsubo";
import { Search, X, Check, Compass } from "lucide-react";

interface AcupointPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (point: AcupointMaster) => void;
  selectedCode?: string;
  disabledCode?: string; // 既にもう一方で選ばれているコード（二重選択防止）
  title?: string;
}

export default function AcupointPickerModal({
  isOpen,
  onClose,
  onSelect,
  selectedCode,
  disabledCode,
  title = "経穴を選択",
}: AcupointPickerModalProps) {
  const [query, setQuery] = useState("");
  const [selectedMeridian, setSelectedMeridian] = useState("すべて");

  const allPoints = useMemo(() => getAllAcupoints(), []);

  const filteredPoints = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPoints.filter((p) => {
      if (selectedMeridian !== "すべて" && p.meridianShort !== selectedMeridian) {
        return false;
      }
      if (!q) return true;
      if (p.codeLower.includes(q) || p.code.toLowerCase().includes(q)) return true;
      if (p.name.includes(q) || p.kana.includes(q) || p.romaji.toLowerCase().includes(q)) return true;
      if (p.locationSimple.includes(q) || p.indications.some((ind) => ind.includes(q))) return true;
      return false;
    });
  }, [allPoints, query, selectedMeridian]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* モーダルヘッダー */}
        <div className="p-4 sm:p-5 border-b border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              {title}
            </h3>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              名称・ふりがな・コード（LI4など）から検索できます
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#737C77] hover:bg-[#FAF8F5] dark:hover:bg-[#10171F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 検索バー ＆ 経脈フィルター */}
        <div className="p-4 bg-[#FAF8F5] dark:bg-[#121920] border-b border-[#E8E1D1] dark:border-[#22303D] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#737C77] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="経穴名、よみ、コード（合谷、ごうこく、LI4など）..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] text-xs font-medium text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2 focus:ring-[#1E3D34]"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737C77] hover:text-[#232826]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 経脈チップス */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedMeridian("すべて")}
              className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                selectedMeridian === "すべて"
                  ? "bg-[#1E3D34] text-white"
                  : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#263542]"
              }`}
            >
              全経絡
            </button>
            {MERIDIANS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMeridian(m.shortName)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                  selectedMeridian === m.shortName
                    ? "bg-[#1E3D34] text-white"
                    : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#263542]"
                }`}
              >
                {m.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* 候補リスト */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-[#F2ECE0] dark:divide-[#22303D]">
          {filteredPoints.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-xs text-[#737C77]">
              <p>該当する経穴が見つかりませんでした。</p>
              <button
                type="button"
                onClick={() => { setQuery(""); setSelectedMeridian("すべて"); }}
                className="text-[#1E3D34] dark:text-[#74BA9E] underline font-bold"
              >
                条件をクリア
              </button>
            </div>
          ) : (
            filteredPoints.map((pt) => {
              const isSelected = selectedCode === pt.code;
              const isDisabled = disabledCode === pt.code;

              return (
                <button
                  key={pt.code}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onSelect(pt);
                    onClose();
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-[#EBF3EF] dark:bg-[#162A24]"
                      : isDisabled
                      ? "opacity-40 cursor-not-allowed bg-[#FAF8F5] dark:bg-[#121920]"
                      : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E0D8C8] dark:border-[#263542] text-[#1E3D34] dark:text-[#74BA9E] shrink-0">
                      {pt.code}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                          {pt.name}
                        </span>
                        <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                          {pt.kana}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] truncate">
                        {pt.meridianShort} / {pt.bodyPart} - {pt.locationSimple}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {isDisabled && (
                      <span className="text-[10px] text-[#A83629] font-medium">選択中</span>
                    )}
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* フッター */}
        <div className="p-3 bg-[#FAF8F5] dark:bg-[#121920] border-t border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between text-xs text-[#737C77]">
          <span>該当 {filteredPoints.length} 穴</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] font-medium hover:bg-white"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
