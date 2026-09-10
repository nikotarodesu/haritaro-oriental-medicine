"use client";

import React, { useState } from "react";
import { Sparkles, Palette, Check, HelpCircle, X, Layers } from "lucide-react";
import { GOGYO_LIST } from "@/utils/gogyoColor";

interface Props {
  className?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function GogyoColorPaletteGuide({
  className = "",
  isModal = false,
  onClose
}: Props) {
  return (
    <div className={`bg-white dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm overflow-hidden ${className}`}>
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-[#1E3D34] via-[#1E2D3D] to-[#B86924] p-5 sm:p-7 text-white flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[11px] font-bold tracking-wider backdrop-blur-sm flex items-center gap-1 w-fit mb-2">
            <Palette className="w-3 h-3 text-[#E6C387]" />
            五行カラーユニバーサルデザイン
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
            五行色彩体系（木:翠・火:朱・土:琥珀・金:白銀・水:藍）
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
            文字を読まなくても色だけで「どの臓腑・機能か」を直感的に脳へ届ける色彩設計
          </p>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 5色のパレットカード一覧 */}
      <div className="p-5 sm:p-7 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {GOGYO_LIST.map((item) => (
            <div
              key={item.element}
              className="rounded-2xl border p-4 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-xs"
              style={{
                backgroundColor: item.bgLight,
                borderColor: item.borderLight,
                color: item.primary
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: item.accent }}
                  >
                    {item.element}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/70 border border-black/5 font-semibold">
                    {item.primary}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                    {item.element}（{item.colorName}）
                  </h4>
                  <span className="text-xs font-semibold block text-[#59615D] dark:text-[#96A6B2]">
                    主司臓腑：{item.organ}
                  </span>
                </div>

                <div className="pt-2 border-t border-black/10 text-xs space-y-1 text-[#404743] dark:text-[#C5D2DB]">
                  <div className="flex justify-between">
                    <span className="text-[11px] opacity-75">季節:</span>
                    <span className="font-medium">{item.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] opacity-75">五味:</span>
                    <span className="font-medium">{item.flavor}味</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] opacity-75">方位:</span>
                    <span className="font-medium">{item.direction}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2">
                <div className="h-2 rounded-full w-full" style={{ backgroundColor: item.accent }} />
              </div>
            </div>
          ))}
        </div>

        {/* 思想解説 */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex items-start gap-3 text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
          <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
          <p>
            当ポータルでは、古典『素問』金匱真言論および現代のカラーユニバーサルデザイン（CUD）基準に基づき、
            緑（翠）・赤（朱）・黄（琥珀）・白（白銀/薄墨）・黒（藍）の明度・彩度・コントラスト比を精密に調整。
            色覚特性を問わず、すべてのユーザーが直感的に五臓の連動を理解できる視覚言語として統一しています。
          </p>
        </div>
      </div>
    </div>
  );
}
