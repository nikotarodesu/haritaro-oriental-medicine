"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { 
  ALL_NAV_ITEMS, 
  loadNavUserConfig, 
  DEFAULT_NAV_CONFIG,
  NavUserConfig, 
  NavItemId 
} from "@/config/navigationItems";
import NavCustomizeModal from "./NavCustomizeModal";
import NavMoreDrawer from "./NavMoreDrawer";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { clipCount } = useClinicalMemo();
  const [config, setConfig] = useState<NavUserConfig>(DEFAULT_NAV_CONFIG);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeHiddenMenus = () => {
      if (desktop.matches) { setIsMoreOpen(false); setIsCustomizeOpen(false); }
    };
    desktop.addEventListener("change", closeHiddenMenus);
    return () => desktop.removeEventListener("change", closeHiddenMenus);
  }, []);

  // 設定読み込み＆更新イベント購読
  const refreshConfig = useCallback(() => {
    setConfig(loadNavUserConfig());
  }, []);

  useEffect(() => {
    const timer = setTimeout(refreshConfig, 0);
    const handleNavUpdated = () => refreshConfig();
    window.addEventListener("haritaro:nav-updated", handleNavUpdated);
    window.addEventListener("storage", handleNavUpdated);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("haritaro:nav-updated", handleNavUpdated);
      window.removeEventListener("storage", handleNavUpdated);
    };
  }, [refreshConfig]);

  const handleOpenSearch = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.dispatchEvent(new CustomEvent("haritaro:open-search"));
  };

  const isItemActive = (id: NavItemId, href: string): boolean => {
    if (id === "home") return pathname === "/";
    if (id === "search") return false;
    if (id === "curriculum") return pathname.startsWith("/learn") || pathname.startsWith("/curriculum");
    if (id === "review") return pathname === "/kokushi";
    if (id === "notes") return pathname.startsWith("/notes") || pathname.startsWith("/mynote");
    if (id === "diagnosis") return pathname === "/diagnosis";
    if (id === "gorou") return pathname.startsWith("/diagnosis") && typeof window !== "undefined" && window.location.search.includes("gorou");
    if (id === "simulator") return pathname === "/simulator";
    if (id === "simulator_compare") return pathname.startsWith("/simulator/compare");
    if (id === "haiketsu") return pathname.startsWith("/practice/haiketsu");
    return pathname.startsWith(href.split(/[?#]/)[0]);
  };

  return (
    <>
      <nav
        aria-label="モバイル下部ナビゲーション"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-t border-[#E8E1D1] dark:border-[#22303D] lg:hidden print:hidden transition-all duration-300"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-around h-15 px-1 max-w-lg mx-auto">
          {/* カスタマイズされた4枠 */}
          {config.items.map((itemId, idx) => {
            const item = ALL_NAV_ITEMS[itemId] || ALL_NAV_ITEMS.home;
            const Icon = item.icon;
            const active = isItemActive(item.id, item.href);
            const isNote = item.id === "notes";
            const badge = isNote && clipCount > 0 ? clipCount : undefined;

            if (item.isAction) {
              return (
                <button
                  key={`${item.id}-${idx}`}
                  type="button"
                  onClick={handleOpenSearch}
                  className="flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] active:scale-95 transition-all cursor-pointer relative"
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span className="text-xs font-bold mt-0.5 tracking-tight">
                    {item.shortLabel}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={`${item.id}-${idx}`}
                href={item.href}
                className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-all active:scale-95 relative ${
                  active
                    ? "text-[#1E3D34] dark:text-[#74BA9E] font-bold"
                    : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
                }`}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : "stroke-2"}`} />
                  {badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#B86924] text-white shadow-xs animate-in zoom-in">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-0.5 tracking-tight truncate max-w-[64px]">
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}

          {/* 5枠目：その他 ⋯ （固定） */}
          <button
            id="mobile-more-trigger"
            type="button"
            onClick={() => setIsMoreOpen(true)}
            className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] active:scale-95 transition-all cursor-pointer relative ${
              isMoreOpen ? "text-[#1E3D34] dark:text-[#74BA9E] font-bold" : ""
            }`}
            aria-label="その他メニューを展開"
            aria-expanded={isMoreOpen}
          >
            <div className="relative">
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="text-xs mt-0.5 tracking-tight">
              その他
            </span>
          </button>
        </div>
      </nav>

      {/* その他ボトムドロワー */}
      <NavMoreDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenSearch={() => handleOpenSearch()}
      />

      {/* カスタマイズ編集モーダル */}
      {isCustomizeOpen && <NavCustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        currentConfig={config}
        onSaved={(newConfig) => {
          setConfig(newConfig);
        }}
      />}
    </>
  );
}
