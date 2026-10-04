"use client";

import React, { useState, useRef } from "react";
import { 
  X, 
  RotateCcw, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  SlidersHorizontal,
  GraduationCap,
  Stethoscope,
  LayoutGrid
} from "lucide-react";
import { 
  ALL_NAV_ITEMS, 
  NAV_PRESETS, 
  DEFAULT_NAV_CONFIG,
  NavItemId, 
  NavPresetType, 
  NavUserConfig,
  saveNavUserConfig
} from "@/config/navigationItems";
import { trackEvent } from "@/utils/analytics";
import { useModalDialog } from "@/hooks/useModalDialog";

interface NavCustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: NavUserConfig;
  onSaved: (newConfig: NavUserConfig) => void;
}

export default function NavCustomizeModal({
  isOpen,
  onClose,
  currentConfig,
  onSaved,
}: NavCustomizeModalProps) {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);
  const [slots, setSlots] = useState<[NavItemId, NavItemId, NavItemId, NavItemId]>(currentConfig.items);
  const [activePreset, setActivePreset] = useState<NavPresetType | undefined>(currentConfig.preset);
  const modalRef = useRef<HTMLDivElement>(null);
  useModalDialog(isOpen, modalRef, onClose);

  if (!isOpen) return null;

  // スロットの並び替え（左へ）
  const moveLeft = (index: number) => {
    if (index <= 0) return;
    const newSlots = [...slots] as [NavItemId, NavItemId, NavItemId, NavItemId];
    const temp = newSlots[index - 1];
    newSlots[index - 1] = newSlots[index];
    newSlots[index] = temp;
    setSlots(newSlots);
    setSelectedSlotIndex(index - 1);
    setActivePreset(undefined);
  };

  // スロットの並び替え（右へ）
  const moveRight = (index: number) => {
    if (index >= 3) return;
    const newSlots = [...slots] as [NavItemId, NavItemId, NavItemId, NavItemId];
    const temp = newSlots[index + 1];
    newSlots[index + 1] = newSlots[index];
    newSlots[index] = temp;
    setSlots(newSlots);
    setSelectedSlotIndex(index + 1);
    setActivePreset(undefined);
  };

  // アイテムを選択したスロットにセット（重複時はスワップ）
  const handleSelectItem = (itemId: NavItemId) => {
    const existingIndex = slots.indexOf(itemId);
    const newSlots = [...slots] as [NavItemId, NavItemId, NavItemId, NavItemId];

    if (existingIndex !== -1 && existingIndex !== selectedSlotIndex) {
      // 既にある場合は入れ替え（スワップ）
      const currentItemInSlot = newSlots[selectedSlotIndex];
      newSlots[selectedSlotIndex] = itemId;
      newSlots[existingIndex] = currentItemInSlot;
    } else {
      newSlots[selectedSlotIndex] = itemId;
    }

    setSlots(newSlots);
    setActivePreset(undefined);
  };

  // プリセット適用
  const applyPreset = (presetKey: NavPresetType) => {
    const preset = NAV_PRESETS[presetKey];
    if (preset) {
      setSlots([...preset.items]);
      setActivePreset(presetKey);
    }
  };

  // リセット
  const handleReset = () => {
    setSlots([...DEFAULT_NAV_CONFIG.items]);
    setActivePreset(DEFAULT_NAV_CONFIG.preset);
  };

  // 保存
  const handleSave = () => {
    const newConfig: NavUserConfig = {
      version: 1,
      items: slots,
      preset: activePreset,
      updatedAt: new Date().toISOString(),
    };
    saveNavUserConfig(newConfig);
    trackEvent("nav_customize_save", {
      preset: activePreset || "custom",
    });
    onSaved(newConfig);
    onClose();
  };

  const allItemIds = Object.keys(ALL_NAV_ITEMS) as NavItemId[];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-customize-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-lg bg-[#FAF8F5] dark:bg-[#151D24] rounded-t-2xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E8E1D1] dark:border-[#22303D]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#1E3D34] text-[#1E3D34] dark:text-[#74BA9E]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 id="nav-customize-title" className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                下部メニューのカスタマイズ
              </h2>
              <p className="text-xs text-[#59615D] dark:text-[#8899A6]">
                よく使う4つの機能を選んで好みに配置できます
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            data-modal-autofocus
            className="min-h-11 min-w-11 flex items-center justify-center rounded-lg text-[#737C77] dark:text-[#8899A6] hover:bg-[#EAE4D3] dark:hover:bg-[#22303D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* コンテンツ（スクロール領域） */}
        <div className="p-4 sm:p-5 space-y-5 overflow-y-auto overscroll-contain">
          {/* プリセット一括切替 */}
          <div>
            <div className="text-xs font-bold text-[#59615D] dark:text-[#8899A6] mb-2">
              用途別プリセットから選ぶ
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => applyPreset("standard")}
                aria-pressed={activePreset === "standard"}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activePreset === "standard"
                    ? "border-[#1E3D34] dark:border-[#74BA9E] bg-[#EBF3EF] dark:bg-[#1E3D34]/30 shadow-xs"
                    : "border-[#E8E1D1] dark:border-[#22303D] bg-white dark:bg-[#10161C] hover:border-[#1E3D34]/50"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>標準</span>
                </div>
                <div className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5 leading-relaxed">
                  学ぶ・経穴・検索・ノート
                </div>
              </button>

              <button
                type="button"
                onClick={() => applyPreset("student")}
                aria-pressed={activePreset === "student"}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activePreset === "student"
                    ? "border-[#B86924] dark:border-[#E6C387] bg-[#FCF4EB] dark:bg-[#B86924]/20 shadow-xs"
                    : "border-[#E8E1D1] dark:border-[#22303D] bg-white dark:bg-[#10161C] hover:border-[#B86924]/50"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>学生向け</span>
                </div>
                <div className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5 leading-relaxed">
                  学ぶ・国試・経穴・ノート
                </div>
              </button>

              <button
                type="button"
                onClick={() => applyPreset("clinician")}
                aria-pressed={activePreset === "clinician"}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activePreset === "clinician"
                    ? "border-[#2A5243] dark:border-[#83BEA8] bg-[#EBF3EF] dark:bg-[#1E3D34]/30 shadow-xs"
                    : "border-[#E8E1D1] dark:border-[#22303D] bg-white dark:bg-[#10161C] hover:border-[#2A5243]/50"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A5243] dark:text-[#83BEA8]">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>臨床家向け</span>
                </div>
                <div className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5 leading-relaxed">
                  弁証・配穴・経穴・ノート
                </div>
              </button>
            </div>
          </div>

          {/* 現在の配置スロット（4枠＋その他固定） */}
          <div className="bg-white dark:bg-[#10161C] p-3.5 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#59615D] dark:text-[#8899A6]">
              <span>配置する4枠（タップして編集枠を選択）</span>
              <span className="text-[11px] font-normal text-[#8899A6]">枠{selectedSlotIndex + 1}を選択中</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {slots.map((itemId, idx) => {
                const item = ALL_NAV_ITEMS[itemId];
                const Icon = item.icon;
                const isSelected = selectedSlotIndex === idx;

                return (
                  <button
                    key={`slot-${idx}`}
                    type="button"
                    onClick={() => setSelectedSlotIndex(idx)}
                    aria-pressed={isSelected}
                    aria-label={`枠${idx + 1}：${item.label}を編集`}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? "border-[#1E3D34] dark:border-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] shadow-xs"
                        : "border-dashed border-[#D5CDBD] dark:border-[#2C3B49] bg-[#FAF8F5] dark:bg-[#151D24] hover:border-[#1E3D34]/50"
                    }`}
                  >
                    <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-[#59615D] text-white text-[9px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#1E3D34] dark:text-[#74BA9E]" : "text-[#737C77] dark:text-[#8899A6]"}`} />
                    <span className="text-[10px] font-bold mt-1 text-[#232826] dark:text-[#FAF8F5] truncate max-w-full">
                      {item.shortLabel}
                    </span>
                  </button>
                );
              })}

              {/* 5枠目は固定の「その他」 */}
              <div className="flex flex-col items-center justify-center p-2 rounded-lg border border-dashed border-[#E8E1D1] dark:border-[#22303D] bg-[#F2ECE0]/50 dark:bg-[#18222C]/40 opacity-70">
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6]">⋯</span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-1">その他</span>
                <span className="text-[8px] text-[#8899A6]">(固定)</span>
              </div>
            </div>

            {/* スロットの並び替え左右ボタン */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                type="button"
                onClick={() => moveLeft(selectedSlotIndex)}
                disabled={selectedSlotIndex === 0}
                className="min-h-11 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF8F5] dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#22303D] text-[#59615D] dark:text-[#A0B0BC] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#EAE4D3] text-xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>枠を左へ移動</span>
              </button>
              <button
                type="button"
                onClick={() => moveRight(selectedSlotIndex)}
                disabled={selectedSlotIndex === 3}
                className="min-h-11 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF8F5] dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#22303D] text-[#59615D] dark:text-[#A0B0BC] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#EAE4D3] text-xs cursor-pointer"
              >
                <span>枠を右へ移動</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 機能一覧から選択 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#59615D] dark:text-[#8899A6]">
                枠 {selectedSlotIndex + 1} に設定する機能を選択（全{allItemIds.length}項目）
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {allItemIds.map((id) => {
                const item = ALL_NAV_ITEMS[id];
                const Icon = item.icon;
                const isCurrentInSlot = slots[selectedSlotIndex] === id;
                const slotIndexWhereUsed = slots.indexOf(id);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelectItem(id)}
                    aria-pressed={isCurrentInSlot}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isCurrentInSlot
                        ? "border-[#1E3D34] dark:border-[#74BA9E] bg-[#EBF3EF] dark:bg-[#1E3D34]/30"
                        : "border-[#E8E1D1] dark:border-[#22303D] bg-white dark:bg-[#10161C] hover:border-[#1E3D34]/40"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                      isCurrentInSlot 
                        ? "bg-[#1E3D34] text-white dark:bg-[#74BA9E] dark:text-[#10161C]" 
                        : "bg-[#FAF8F5] dark:bg-[#18222C] text-[#59615D] dark:text-[#A0B0BC]"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] truncate">
                          {item.label}
                        </span>
                        {slotIndexWhereUsed !== -1 && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                            isCurrentInSlot
                              ? "bg-[#1E3D34] text-white dark:bg-[#74BA9E] dark:text-[#10161C]"
                              : "bg-[#EAE4D3] text-[#59615D] dark:bg-[#22303D] dark:text-[#8899A6]"
                          }`}>
                            枠{slotIndexWhereUsed + 1}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#737C77] dark:text-[#8899A6] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="px-5 py-3 border-t border-[#E8E1D1] dark:border-[#22303D] bg-white dark:bg-[#10161C] flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="min-h-11 inline-flex items-center gap-1.5 text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>初期状態に戻す</span>
          </button>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 px-3.5 py-2 text-xs font-bold text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#18222C] rounded-lg transition-colors cursor-pointer"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="min-h-11 inline-flex items-center gap-1.5 px-4 py-2 bg-[#1E3D34] dark:bg-[#74BA9E] hover:bg-[#2A5243] text-white dark:text-[#10161C] rounded-lg font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>保存して適用</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
