"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  X, 
  SlidersHorizontal, 
  ExternalLink,
  GraduationCap,
  Stethoscope,
  BookOpenCheck
} from "lucide-react";
import { ALL_NAV_ITEMS, NavItemId } from "@/config/navigationItems";

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: NavItemId[];
  }[] = [
    {
      title: "臨床・推論ツール",
      icon: Stethoscope,
      items: ["diagnosis", "gorou", "simulator", "simulator_compare", "haiketsu", "cases"],
    },
    {
      title: "学習・国家試験対策",
      icon: GraduationCap,
      items: ["curriculum", "review", "kokushi"],
    },
    {
      title: "総合辞典・記録・その他",
      icon: BookOpenCheck,
      items: ["tsubo", "search", "library", "notes", "home"],
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 lg:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        className="w-full max-w-lg bg-[#FAF8F5] dark:bg-[#151D24] rounded-t-2xl border-t border-x border-[#E8E1D1] dark:border-[#22303D] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* バー（スワイプハンドル感） */}
        <div className="w-12 h-1.5 bg-[#D5CDBD] dark:bg-[#2C3B49] rounded-full mx-auto mt-2.5 mb-1" />

        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#E8E1D1] dark:border-[#22303D]">
          <div>
            <h2 id="nav-more-title" className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              全機能メニュー
            </h2>
            <p className="text-xs text-[#59615D] dark:text-[#8899A6]">
              はり太郎のすべてのツールと学習コンテンツ
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="p-1.5 rounded-lg text-[#737C77] dark:text-[#8899A6] hover:bg-[#EAE4D3] dark:hover:bg-[#22303D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* カスタマイズへのクイックアクセスバナー */}
        <div className="p-3 bg-[#EBF3EF] dark:bg-[#182823] border-b border-[#C5DED4] dark:border-[#2A5243] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              下部の4枠メニューを変更できます
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCustomize();
            }}
            className="px-3 py-1.5 bg-[#1E3D34] dark:bg-[#74BA9E] hover:bg-[#2A5243] text-white dark:text-[#10161C] rounded-lg text-xs font-bold shadow-2xs cursor-pointer transition-colors"
          >
            メニューを編集
          </button>
        </div>

        {/* メニューリスト（スクロール領域） */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.title} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#59615D] dark:text-[#8899A6] px-1">
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cat.items.map((itemId) => {
                    const item = ALL_NAV_ITEMS[itemId];
                    const Icon = item.icon;

                    if (item.isAction) {
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleItemClick(item)}
                          className="flex items-start gap-2.5 p-2.5 bg-white dark:bg-[#10161C] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] rounded-xl text-left transition-all cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#18222C] text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] truncate">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] line-clamp-1 mt-0.5">
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
                        className="flex items-start gap-2.5 p-2.5 bg-white dark:bg-[#10161C] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] rounded-xl text-left transition-all cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#18222C] text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] truncate">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] line-clamp-1 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
