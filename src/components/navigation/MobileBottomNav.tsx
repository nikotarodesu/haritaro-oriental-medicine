"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { ALL_NAV_ITEMS, loadNavUserConfig, DEFAULT_NAV_CONFIG, NavUserConfig, NavItemId } from "@/config/navigationItems";
import { useViewportLayout } from "@/hooks/useViewportLayout";
import NavCustomizeModal from "./NavCustomizeModal";
import NavMoreDrawer from "./NavMoreDrawer";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [config, setConfig] = useState<NavUserConfig>(DEFAULT_NAV_CONFIG);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useViewportLayout();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => document.documentElement.style.setProperty("--mobile-nav-height", window.matchMedia("(min-width: 1024px)").matches ? "0px" : nav.getBoundingClientRect().height + "px");
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    update();
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeHiddenMenus = () => {
      if (desktop.matches) { setIsMoreOpen(false); setIsCustomizeOpen(false); }
    };
    desktop.addEventListener("change", closeHiddenMenus);
    return () => desktop.removeEventListener("change", closeHiddenMenus);
  }, []);
  const refreshConfig = useCallback(() => setConfig(loadNavUserConfig()), []);
  useEffect(() => {
    const timer = setTimeout(refreshConfig, 0);
    window.addEventListener("haritaro:nav-updated", refreshConfig);
    window.addEventListener("storage", refreshConfig);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("haritaro:nav-updated", refreshConfig);
      window.removeEventListener("storage", refreshConfig);
    };
  }, [refreshConfig]);

  const handleOpenSearch = () => window.dispatchEvent(new CustomEvent("haritaro:open-search"));
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

  return <>
    <nav ref={navRef} aria-label="モバイル下部ナビゲーション"
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-t border-[#E8E1D1] dark:border-[#22303D] lg:hidden print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="mobile-nav-items">
        {config.items.map((itemId, index) => {
          const item = ALL_NAV_ITEMS[itemId] || ALL_NAV_ITEMS.home;
          const Icon = item.icon;
          const active = isItemActive(item.id, item.href);
          return item.isAction
            ? <button key={item.id + index} type="button" onClick={handleOpenSearch} className="mobile-nav-item" aria-label={item.label} aria-haspopup="dialog"><Icon aria-hidden="true" /><span>{item.shortLabel}</span></button>
            : <Link key={item.id + index} href={item.href} className="mobile-nav-item" aria-label={item.label} aria-current={active ? "page" : undefined}><Icon aria-hidden="true" className={active ? "stroke-[2.5]" : "stroke-2"} /><span>{item.shortLabel}</span></Link>;
        })}
        <button id="mobile-more-trigger" type="button" onClick={() => setIsMoreOpen(true)} className="mobile-nav-item" aria-label="その他メニューを展開" aria-haspopup="dialog" aria-expanded={isMoreOpen}>
          <MoreHorizontal aria-hidden="true" /><span>その他</span>
        </button>
      </div>
    </nav>
    <NavMoreDrawer isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} onOpenCustomize={() => setIsCustomizeOpen(true)} onOpenSearch={handleOpenSearch} />
    {isCustomizeOpen && <NavCustomizeModal isOpen={isCustomizeOpen} onClose={() => setIsCustomizeOpen(false)} currentConfig={config} onSaved={setConfig} />}
  </>;
}
