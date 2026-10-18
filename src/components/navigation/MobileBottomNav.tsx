"use client";

import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { ALL_NAV_ITEMS, loadNavUserConfig, DEFAULT_NAV_CONFIG, NavUserConfig, isNavigationItemActive } from "@/config/navigationItems";
import { useViewportLayout } from "@/hooks/useViewportLayout";
import NavCustomizeModal from "./NavCustomizeModal";
import { SITE_MENU_ID, SITE_MENU_STATE_EVENT, SITE_MENU_TOGGLE_EVENT, NAV_CUSTOMIZE_EVENT } from "@/utils/siteMenu";

export default function MobileBottomNav() {
  return <Suspense fallback={null}><MobileBottomNavContent /></Suspense>;
}

function MobileBottomNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<NavUserConfig>(DEFAULT_NAV_CONFIG);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useViewportLayout();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const root = document.documentElement;
    const measure = () => root.style.setProperty("--mobile-nav-height", root.dataset.navigationLayout === "wide" ? "0px" : nav.getBoundingClientRect().height + "px");
    const update = () => {
      measure();
      if (root.dataset.navigationLayout === "wide") setIsCustomizeOpen(false);
    };
    const sizeObserver = new ResizeObserver(measure);
    const layoutObserver = new MutationObserver(update);
    sizeObserver.observe(nav);
    layoutObserver.observe(root, { attributes: true, attributeFilter: ["data-navigation-layout"] });
    measure();
    window.addEventListener("resize", update);
    return () => { sizeObserver.disconnect(); layoutObserver.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    const handleState = (event: Event) => setIsMenuOpen((event as CustomEvent<{ open: boolean }>).detail?.open === true);
    const handleCustomize = () => setIsCustomizeOpen(true);
    window.addEventListener(SITE_MENU_STATE_EVENT, handleState);
    window.addEventListener(NAV_CUSTOMIZE_EVENT, handleCustomize);
    // This Suspense boundary may hydrate after the Header has already opened its menu.
    const frame = requestAnimationFrame(() => setIsMenuOpen(Boolean(document.getElementById(SITE_MENU_ID))));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(SITE_MENU_STATE_EVENT, handleState);
      window.removeEventListener(NAV_CUSTOMIZE_EVENT, handleCustomize);
    };
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
  return <>
    <nav ref={navRef} aria-label="モバイル下部ナビゲーション"
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-t border-[#E8E1D1] dark:border-[#22303D] lg:hidden print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="mobile-nav-items">
        {config.items.map((itemId, index) => {
          const item = ALL_NAV_ITEMS[itemId] || ALL_NAV_ITEMS.home;
          const Icon = item.icon;
          const active = isNavigationItemActive(item.id, pathname, searchParams);
          return item.isAction
            ? <button key={item.id + index} type="button" onClick={handleOpenSearch} className="mobile-nav-item" aria-label={item.label} aria-haspopup="dialog"><Icon aria-hidden="true" /><span>{item.shortLabel}</span></button>
            : <Link key={item.id + index} href={item.href} className="mobile-nav-item" aria-label={item.label} aria-current={active ? "page" : undefined}><Icon aria-hidden="true" className={active ? "stroke-[2.5]" : "stroke-2"} /><span>{item.shortLabel}</span></Link>;
        })}
        <button id="mobile-more-trigger" type="button" onClick={() => window.dispatchEvent(new CustomEvent(SITE_MENU_TOGGLE_EVENT, { detail: { triggerId: "mobile-more-trigger" } }))} className="mobile-nav-item" aria-label={isMenuOpen ? "メニューを閉じる" : "その他メニューを開く"} aria-controls={SITE_MENU_ID} aria-expanded={isMenuOpen}>
          <MoreHorizontal aria-hidden="true" /><span>その他</span>
        </button>
      </div>
    </nav>
    {isCustomizeOpen && <NavCustomizeModal isOpen={isCustomizeOpen} onClose={() => setIsCustomizeOpen(false)} currentConfig={config} onSaved={setConfig} />}
  </>;
}
