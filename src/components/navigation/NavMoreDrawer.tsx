"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { 
  X, 
  SlidersHorizontal, 
  GraduationCap,
  Stethoscope,
  BookOpenCheck,
  Bookmark
} from "lucide-react";
import { ALL_NAV_ITEMS, NavItemId } from "@/config/navigationItems";
import { useModalDialog } from "@/hooks/useModalDialog";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

interface NavMoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomize: () => void;
  onOpenSearch: () => void;
}

export default function NavMoreDrawer({
  isOpen,
  onClose,
  onOpenCustomize,
  onOpenSearch,
}: NavMoreDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { clipCount, patientNoteCount, openDrawer } = useClinicalMemo();
  useModalDialog(isOpen, drawerRef, onClose);

  if (!isOpen) return null;

  const categories: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: NavItemId[];
  }[] = [
    {
      title: "臨床・推論ツール",
      icon: Stethoscope,
      items: ["simulator", "haiketsu", "cases"],
    },
    {
      title: "学習・国家試験対策",
      icon: GraduationCap,
      items: ["curriculum", "review", "kokushi"],
    },
    {
      title: "総合辞典・記録・その他",
      icon: BookOpenCheck,
      items: ["tsubo", "search", "library"],
    },
  ];

  const handleItemClick = (item: (typeof ALL_NAV_ITEMS)[NavItemId]) => {
    onClose();
    if (item.isAction) {
      onOpenSearch();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-more-title"
      className="site-overlay fixed left-0 right-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-xs p-3 lg:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="nav-more-panel w-full max-w-lg bg-[#FAF8F5] dark:bg-[#151D24] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] shadow-2xl flex flex-col overflow-hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* バー（スワイプハンドル感） */}
        <div className="w-12 h-1.5 bg-[#D5CDBD] dark:bg-[#2C3B49] rounded-full mx-auto mt-2.5 mb-1" />

        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#E8E1D1] dark:border-[#22303D]">
          <div>
            <h2 id="nav-more-title" className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              目的から探す
            </h2>
            <p className="text-sm text-[#59615D] dark:text-[#AFBDC8]">
              学習・演習・記録へのショートカット
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            data-modal-autofocus
            className="min-h-11 min-w-11 flex items-center justify-center rounded-lg text-[#59615D] dark:text-[#AFBDC8] hover:bg-[#EAE4D3] dark:hover:bg-[#22303D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* メニューリスト（スクロール領域） */}
        <div className="nav-more-scroll p-4 space-y-4 overflow-y-auto overscroll-contain">
          <button type="button" onClick={() => { onClose(); openDrawer(); }} className="w-full flex min-h-11 flex-wrap items-center gap-3 ui-card text-left focus-visible:outline-2 focus-visible:outline-offset-4">
            <Bookmark aria-hidden="true" className="w-5 h-5 shrink-0 text-[var(--accent-readable)]" />
            <span className="text-base font-semibold">保存一覧</span>
            <span className="ui-count" aria-label={`保存済み ${clipCount + patientNoteCount}件`}>{clipCount + patientNoteCount}件</span>
            <span className="basis-full text-sm ui-muted">経穴・記事の保存と臨床ノートを開く</span>
          </button>
          <Link href="/clinical" onClick={onClose} className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">臨床ツールの一覧を見る</Link>
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.title} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#59615D] dark:text-[#AFBDC8] px-1">
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </div>
                <div className="nav-more-grid">
                  {cat.items.map((itemId) => {
                    const item = ALL_NAV_ITEMS[itemId];
                    const Icon = item.icon;

                    if (item.isAction) {
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleItemClick(item)}
                          className="flex items-start gap-2.5 min-h-11 p-2.5 hover:bg-white dark:hover:bg-[#10161C] rounded-lg text-left transition-all cursor-pointer"
                        >
                          <div className="p-1.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] break-words">
                              {item.label}
                            </div>
                            <div className="text-sm leading-relaxed text-[#59615D] dark:text-[#A8B8C4] mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-start gap-2.5 min-h-11 p-2.5 hover:bg-white dark:hover:bg-[#10161C] rounded-lg text-left transition-all cursor-pointer"
                      >
                        <div className="p-1.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] break-words">
                            {item.label}
                          </div>
                          <div className="text-sm leading-relaxed text-[#59615D] dark:text-[#A8B8C4] mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  {cat.title === "学習・国家試験対策" && (
                    <Link href="/notes?tab=learning" onClick={onClose} className="rounded-xl border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] p-2.5 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      学習ノート
                      <span className="mt-1 block text-sm font-normal leading-relaxed">講義や症例で考えたことを振り返る</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
          <details className="border-t border-[#D8CFC0] pt-3 dark:border-[#384C5E]">
            <summary className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold"><SlidersHorizontal aria-hidden="true" className="h-4 w-4" />メニュー・アプリの設定</summary>
            <div className="flex flex-col items-start gap-1">
              <button type="button" onClick={() => { onClose(); onOpenCustomize(); }} className="min-h-11 text-sm underline underline-offset-4">下部メニューを編集</button>
              <button type="button" onClick={() => { onClose(); window.dispatchEvent(new Event("haritaro:install-app")); }} className="min-h-11 text-sm underline underline-offset-4">ホーム画面に追加</button>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
