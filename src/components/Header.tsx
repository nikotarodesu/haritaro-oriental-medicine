"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Activity, ArrowRight, BookOpen, ChevronDown, ClipboardPenLine, FileQuestion, GitCompareArrows, GraduationCap, History, Layers3, Library, Mail, Menu, ScanLine, Search, Settings, User as UserIcon, X, type LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import BrandLogo from "@/components/brand/BrandLogo";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";
import { SERIES } from "@/config/series";
import { ALL_NAV_ITEMS, CLINICAL_PRIMARY_ITEMS, CLINICAL_PRACTICE_ITEMS, getNavigationSection, isNavigationItemActive, type NavItemId } from "@/config/navigationItems";
import RecentToolTracker from "./home/RecentTools";
import ThemeSwitch from "./YinYangSwitch";
import FontSizeControl from "./FontSizeControl";
import { SITE_MENU_ID, SITE_MENU_STATE_EVENT, SITE_MENU_TOGGLE_EVENT, NAV_CUSTOMIZE_EVENT, type SiteMenuToggleDetail } from "@/utils/siteMenu";

const GlobalSearchModal = dynamic(() => import("./search/GlobalSearchModal"), { ssr: false });

type Dropdown = "learn" | "clinical" | "settings";
interface HeaderLink { id?: NavItemId; href: string; label: string; description?: string; icon?: LucideIcon; }

const LEARN_LINKS: readonly HeaderLink[] = [
  { href: "/learn", label: SERIES.reading.name, description: "講義を順番に学ぶ" },
  { href: ACUPUNCTURE_GUIDE.href, label: "はじめての鍼灸", description: "はり・お灸・ツボ押しの違い", icon: BookOpen },
  { href: "/learn/essentials", label: "東洋医学の要点", description: "知りたい言葉を1ページで確認", icon: Layers3 },
  { ...ALL_NAV_ITEMS.diagnosis, label: "気血水 体質チェック" },
  { href: "/learn/review#learning-review", label: "今日の復習" },
  { href: "/library", label: "古典・医学論文" },
  { href: "/articles", label: "解説記事" },
];
const OTHER_LINKS: readonly HeaderLink[] = [
  { href: "/glossary", label: "東洋医学の用語集" },
  { href: "/tsubo/practice", label: "経穴の復習" },
  { href: "/kikei", label: "奇経八脈" },
  ALL_NAV_ITEMS.diagnosis,
  ALL_NAV_ITEMS.gorou,
  { href: "/symptoms", label: "症状別ガイド・日常の工夫" },
  { href: "/safety", label: "安全性と受診の目安" },
];
const SITE_LINKS: readonly HeaderLink[] = [

  { href: "/about", label: "運営者情報" },
  { href: "/contact", label: "お問い合わせ" },
];
const NAV_ICONS: Record<string, LucideIcon> = {
  "/learn": GraduationCap, "/learn/review#learning-review": History,
  "/curriculum": Layers3, "/learn/review": FileQuestion, "/library": Library, "/articles": BookOpen,
  "/clinical": ClipboardPenLine, "/simulator": GitCompareArrows,
  "/practice/haiketsu": ScanLine, "/cases": FileQuestion, "/diagnosis": Activity,
  "/tsubo/compare": GitCompareArrows,
  "/about": UserIcon, "/contact": Mail,
};
const FOCUS_STYLE = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-readable)]";
const DESKTOP_LAYOUT = "header-desktop";
const COMPACT_LAYOUT = "header-compact";
const NAV_CONTROL = `inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[var(--accent-soft)] ${FOCUS_STYLE}`;
const HEADER_PANEL = "border-[var(--border-washi)] bg-[var(--bg-card)]";

function HeaderLinks({ links, pathname, onNavigate, plain = false }: { links: readonly HeaderLink[]; pathname: string; onNavigate: () => void; plain?: boolean }) {
  const searchParams = typeof window === "undefined" ? undefined : new URLSearchParams(window.location.search);
  return <ul className="space-y-1">{links.map(link => {
    const Icon = link.icon ?? NAV_ICONS[link.href] ?? BookOpen;
    const [linkPath, query = ""] = link.href.split("?");
    const active = link.id ? isNavigationItemActive(link.id, pathname, searchParams)
      : pathname === linkPath.split("#")[0] && Array.from(new URLSearchParams(query)).every(([key, value]) => searchParams?.get(key) === value);
    return <li key={link.href}>
      <Link href={link.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={[`site-nav-link ${plain ? 'clinical-menu-row' : ''} flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-sm leading-relaxed hover:bg-[var(--accent-soft)]`, FOCUS_STYLE, active ? 'bg-[var(--accent-soft)] font-semibold' : ''].join(' ')}>
        {plain ? null : <span className="site-nav-link-icon"><Icon aria-hidden="true" /></span>}
        <span className="min-w-0 flex-1"><span className="block">{link.label}</span>{link.description && !plain ? <span className="block text-xs font-normal text-[#59615D] dark:text-[#A0B0BC]">{link.description}</span> : null}</span>
        <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 opacity-50" />
      </Link>
    </li>;
  })}</ul>;
}

function ClinicalMenu({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const practiceActive = CLINICAL_PRACTICE_ITEMS.some(item => pathname === item.href || pathname.startsWith(item.href + "/"));
  return <div className="clinical-nav-menu">
    <Link href="/clinical" onClick={onNavigate} aria-current={pathname === "/clinical" ? "page" : undefined} className={`clinical-menu-home ${FOCUS_STYLE}`}>
      <span>{SERIES.practice.name}</span><ArrowRight aria-hidden="true" />
    </Link>
    <HeaderLinks links={CLINICAL_PRIMARY_ITEMS} pathname={pathname} onNavigate={onNavigate} plain />
    <details className="clinical-menu-practice" data-active={practiceActive || undefined}>
      <summary className={FOCUS_STYLE}><span>練習する</span><ChevronDown aria-hidden="true" /></summary>
      <HeaderLinks links={CLINICAL_PRACTICE_ITEMS} pathname={pathname} onNavigate={onNavigate} plain />
    </details>
  </div>;
}

function HeaderSettings({ onOpenInstall }: { onOpenInstall: () => void }) {
  return <section aria-label="文字サイズと外観の設定" className="space-y-3 border-t border-[#E5E8E5] pt-3 dark:border-[#2A3B4A]">
    <button type="button" onClick={onOpenInstall} aria-haspopup="dialog" className="min-h-11 rounded-lg text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">ホーム画面に追加</button>
    <div className="space-y-2"><p className="text-sm font-semibold">文字サイズ</p><FontSizeControl variant="segmented" /></div>
  </section>;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Dropdown | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const compactSearchRef = useRef<HTMLButtonElement>(null);
  const desktopSearchRef = useRef<HTMLButtonElement>(null);
  const dropdownButtons = useRef<Record<Dropdown, HTMLButtonElement | null>>({ learn: null, clinical: null, settings: null });
  const searchReturnFocus = useRef<HTMLElement | null>(null);
  const menuReturnFocus = useRef<HTMLElement | null>(null);
  const id = useId();
  const dropdownId = (dropdown: Dropdown) => `${id}-${dropdown}`;
  const navigationSection = getNavigationSection(pathname);
  const learnActive = navigationSection === "learn";
  const clinicalActive = navigationSection === "clinical";
  const dictionaryActive = navigationSection === "dictionary";

  const syncNavigationLayout = useCallback(() => {
    // The header CSS decides the layout; the lower shortcuts follow the visible control.
    document.documentElement.dataset.navigationLayout = menuButtonRef.current?.getClientRects().length ? "compact" : "wide";
  }, []);
  const closeNavigation = useCallback(() => { setMobileMenuOpen(false); setOpenDropdown(null); }, []);
  const focusNavigationTrigger = useCallback(() => {
    const previous = menuReturnFocus.current;
    const settingsTrigger = dropdownButtons.current.settings;
    const trigger = settingsTrigger?.getClientRects().length ? settingsTrigger
      : previous?.isConnected && previous.getClientRects().length ? previous : menuButtonRef.current;
    trigger?.focus({ preventScroll: true });
  }, []);
  const openInstallGuide = useCallback(() => {
    focusNavigationTrigger();
    closeNavigation();
    window.dispatchEvent(new Event("haritaro:install-app"));
  }, [closeNavigation, focusNavigationTrigger]);
  const toggleMobileMenu = useCallback((trigger: HTMLElement | null) => {
    menuReturnFocus.current = trigger ?? menuButtonRef.current;
    setOpenDropdown(null);
    setMobileMenuOpen(current => !current);
  }, []);
  useEffect(() => {
    const handleToggle = (event: Event) => {
      const triggerId = (event as CustomEvent<SiteMenuToggleDetail>).detail?.triggerId;
      toggleMobileMenu(triggerId ? document.getElementById(triggerId) : menuButtonRef.current);
    };
    window.addEventListener(SITE_MENU_TOGGLE_EVENT, handleToggle);
    return () => window.removeEventListener(SITE_MENU_TOGGLE_EVENT, handleToggle);
  }, [toggleMobileMenu]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(SITE_MENU_STATE_EVENT, { detail: { open: mobileMenuOpen } }));
    if (!mobileMenuOpen) return;
    const frame = requestAnimationFrame(() => document.getElementById(SITE_MENU_ID)?.querySelector<HTMLElement>("button,a,summary")?.focus());
    return () => cancelAnimationFrame(frame);
  }, [mobileMenuOpen]);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => {
      document.documentElement.style.setProperty("--site-header-height", `${header.getBoundingClientRect().height}px`);
      syncNavigationLayout();
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => { observer.disconnect(); delete document.documentElement.dataset.navigationLayout; };
  }, [syncNavigationLayout]);
  const openSearch = useCallback((query = "") => {
    const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    searchReturnFocus.current = focused && document.getElementById(SITE_MENU_ID)?.contains(focused) ? menuReturnFocus.current : focused;
    setSearchInitialQuery(query);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setIsSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchInitialQuery("");
    requestAnimationFrame(() => {
      const previous = searchReturnFocus.current;
      if (previous?.isConnected && previous.getClientRects().length) previous.focus();
      else (compactSearchRef.current?.getClientRects().length ? compactSearchRef.current : desktopSearchRef.current)?.focus();
    });
  }, []);

  // Keep the existing keyboard shortcuts and externally requested initial query.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || event.repeat) return;
      // Let an open menu or record dialog keep its own keyboard interaction.
      if (!isSearchOpen && document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      const target = event.target as HTMLElement | null;
      const isInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT" || target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isSearchOpen) closeSearch(); else openSearch();
      } else if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey && !isInput && !isSearchOpen) {
        event.preventDefault(); openSearch();
      }
    };
    const handleCustomOpenSearch = (event: Event) => {
      const query = (event as CustomEvent<{ query?: string }>).detail?.query;
      openSearch(typeof query === "string" ? query : "");
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("haritaro:open-search", handleCustomOpenSearch);
    return () => { window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("haritaro:open-search", handleCustomOpenSearch); };
  }, [isSearchOpen, openSearch, closeSearch]);

  // Navigation is a disclosure, not a modal: outside focus remains usable.
  useEffect(() => {
    if (!mobileMenuOpen && !openDropdown) return;
    const handleOutside = (event: Event) => {
      if (!(event.target instanceof Node)) return;
      if (openDropdown) {
        const popup = document.getElementById(`${id}-${openDropdown}`);
        const trigger = dropdownButtons.current[openDropdown];
        if (!popup?.contains(event.target) && !trigger?.contains(event.target)) closeNavigation();
      } else if (!headerRef.current?.contains(event.target) && !document.getElementById("mobile-more-trigger")?.contains(event.target)) closeNavigation();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || isSearchOpen) return;
      event.preventDefault();
      const trigger = openDropdown ? dropdownButtons.current[openDropdown] : null;
      closeNavigation();
      if (trigger) trigger.focus(); else focusNavigationTrigger();
    };
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("focusin", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => { document.removeEventListener("pointerdown", handleOutside); document.removeEventListener("focusin", handleOutside); document.removeEventListener("keydown", handleEscape); };
  }, [mobileMenuOpen, openDropdown, isSearchOpen, closeNavigation, focusNavigationTrigger, id]);

  useEffect(() => {
    let frame = 0;
    const checkLayout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        syncNavigationLayout();
        if (!menuButtonRef.current?.getClientRects().length) {
          if (document.getElementById(SITE_MENU_ID)?.contains(document.activeElement)) focusNavigationTrigger();
          setMobileMenuOpen(false);
        }
        if (!desktopSearchRef.current?.getClientRects().length) setOpenDropdown(null);
      });
    };
    const onFontTransitionEnd = (event: TransitionEvent) => {
      // A rem-based container query can switch after the root font transition,
      // while the header's fixed minimum height stays unchanged.
      if (event.target === document.documentElement && event.propertyName === "font-size") checkLayout();
    };
    const observer = new MutationObserver(checkLayout);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-font-size"] });
    window.addEventListener("resize", checkLayout);
    document.addEventListener("transitionend", onFontTransitionEnd);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", checkLayout); document.removeEventListener("transitionend", onFontTransitionEnd); };
  }, [focusNavigationTrigger, syncNavigationLayout]);

  const toggleDropdown = (dropdown: Dropdown, focusFirst = false) => {
    setMobileMenuOpen(false);
    setOpenDropdown(current => current === dropdown && !focusFirst ? null : dropdown);
    if (focusFirst) requestAnimationFrame(() => document.getElementById(dropdownId(dropdown))?.querySelector<HTMLElement>("a,button")?.focus());
  };
  const dropdownButton = (dropdown: Dropdown, label: string, active: boolean) => <button ref={element => { dropdownButtons.current[dropdown] = element; }} type="button" aria-expanded={openDropdown === dropdown} aria-controls={dropdownId(dropdown)} aria-current={active ? "true" : undefined} onClick={() => toggleDropdown(dropdown)} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); toggleDropdown(dropdown, true); } }} className={`${NAV_CONTROL} ${active || openDropdown === dropdown ? "bg-[var(--accent-soft)]" : ""}`}>
    {dropdown === "settings" ? <Settings aria-hidden="true" className="h-5 w-5 shrink-0" /> : null}<span>{label}</span><ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 motion-reduce:transition-none ${openDropdown === dropdown ? "rotate-180" : ""}`} />
  </button>;
  return <>
    <header ref={headerRef} className={`sticky top-0 z-50 border-b text-[var(--text-sumi)] print:hidden ${HEADER_PANEL}`}>
      <div className="site-header-container">
        <div className="flex flex-wrap min-h-[60px] items-center justify-between gap-3 py-1 xl:min-h-[68px]">
          <Link href="/" aria-label="はり太郎 トップへ" onClick={closeNavigation} className={`inline-flex min-h-[44px] shrink-0 items-center rounded-lg ${FOCUS_STYLE}`}>
            <BrandLogo className="gap-2.5" symbolClassName="h-[34px]! w-[34px]! shrink-0" wordmarkClassName="header-wordmark text-xl! font-semibold tracking-[0.025em]!" />
          </Link>
          <nav aria-label="主要ナビゲーション" className={`${DESKTOP_LAYOUT} shrink-0 items-center gap-2 whitespace-nowrap`}>
            <Link href={SERIES.dictionary.href} onClick={closeNavigation} aria-current={dictionaryActive ? pathname === "/tsubo" ? "page" : "true" : undefined} className={`${NAV_CONTROL} ${dictionaryActive ? "bg-[var(--accent-soft)]" : ""}`}>{SERIES.dictionary.shortName}</Link>
            <div className="relative">
              {dropdownButton("learn", SERIES.reading.shortName, learnActive)}
              {openDropdown === "learn" ? <div id={dropdownId("learn")} className={`absolute left-0 top-full mt-2 max-h-[70vh] w-80 overflow-y-auto whitespace-normal rounded-xl border p-2 shadow-lg ${HEADER_PANEL}`}><HeaderLinks links={LEARN_LINKS} pathname={pathname} onNavigate={closeNavigation} /></div> : null}
            </div>
            <div className="relative">
              {dropdownButton("clinical", SERIES.practice.shortName, clinicalActive)}
              {openDropdown === "clinical" ? <div id={dropdownId("clinical")} className={`clinical-header-menu absolute left-0 top-full mt-2 max-h-[75vh] overflow-y-auto whitespace-normal rounded-xl border p-2 shadow-lg ${HEADER_PANEL}`}><ClinicalMenu pathname={pathname} onNavigate={closeNavigation} /></div> : null}
            </div>
            <button ref={desktopSearchRef} type="button" onClick={() => openSearch()} aria-label="サイト内検索を開く" aria-haspopup="dialog" title="サイト内検索（Ctrl+K / ⌘K）" className={`${NAV_CONTROL} border border-[var(--border-washi)]`}><Search aria-hidden="true" className="h-[18px] w-[18px] shrink-0" /><span>検索</span></button>
            <ThemeSwitch />
            <div className="relative">
              {dropdownButton("settings", "サイト設定", false)}
              {openDropdown === "settings" ? <div id={dropdownId("settings")} className={`absolute right-0 top-full mt-2 max-h-[75vh] w-88 space-y-3 overflow-y-auto whitespace-normal rounded-xl border p-3 shadow-lg ${HEADER_PANEL}`}><HeaderLinks links={SITE_LINKS} pathname={pathname} onNavigate={closeNavigation} /><HeaderSettings onOpenInstall={openInstallGuide} /></div> : null}
            </div>
          </nav>
          <div className={`${COMPACT_LAYOUT} ml-auto shrink-0 items-center gap-1.5`}>
            <button ref={compactSearchRef} type="button" onClick={() => openSearch()} aria-label="サイト内検索を開く" aria-haspopup="dialog" title="サイト内検索" className={`inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg hover:bg-[var(--accent-soft)] ${FOCUS_STYLE}`}><Search aria-hidden="true" className="h-5 w-5" /></button>
            <ThemeSwitch compact />
            <button ref={menuButtonRef} type="button" onClick={event => toggleMobileMenu(event.currentTarget)} aria-expanded={mobileMenuOpen} aria-controls={SITE_MENU_ID} aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"} className={`inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg hover:bg-[var(--accent-soft)] ${FOCUS_STYLE}`}>{mobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>
      {mobileMenuOpen ? <nav id={SITE_MENU_ID} aria-label="サイトメニュー" className={`${COMPACT_LAYOUT} site-menu absolute left-0 right-0 top-full flex-col overflow-y-auto border-b px-4 py-4 shadow-lg sm:px-6 ${HEADER_PANEL}`}>
        <div className="mx-auto w-full max-w-3xl space-y-3">
          <div className="flex items-center justify-between gap-3"><h2 className="text-base font-semibold">メニュー</h2><button type="button" onClick={() => { closeNavigation(); focusNavigationTrigger(); }} aria-label="メニューを閉じる" className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg ${FOCUS_STYLE}`}><X aria-hidden="true" className="h-5 w-5" /></button></div>
          <button type="button" onClick={() => openSearch()} aria-haspopup="dialog" className={`site-menu-search ${FOCUS_STYLE}`}><Search aria-hidden="true" className="h-5 w-5" /><span>サイト内検索</span></button>
          <Link href={SERIES.dictionary.href} onClick={closeNavigation} aria-current={dictionaryActive ? pathname === "/tsubo" ? "page" : "true" : undefined} className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE} ${dictionaryActive ? "bg-[var(--accent-soft)]" : ""}`}>{SERIES.dictionary.shortName}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
          <details className="border-b border-[var(--border-subtle)] pb-2"><summary className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE}`}>{SERIES.reading.shortName}{learnActive ? <span className="ml-2 text-sm font-normal">（現在のカテゴリ）</span> : null}</summary><HeaderLinks links={LEARN_LINKS} pathname={pathname} onNavigate={closeNavigation} /></details>
          <details className="border-b border-[var(--border-subtle)] pb-2"><summary className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE}`}>{SERIES.practice.shortName}{clinicalActive ? <span className="ml-2 text-sm font-normal">（現在のカテゴリ）</span> : null}</summary><ClinicalMenu pathname={pathname} onNavigate={closeNavigation} /></details>
          <details className="border-b border-[var(--border-subtle)] pb-2"><summary className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE}`}>その他の教材・ガイド</summary><HeaderLinks links={OTHER_LINKS} pathname={pathname} onNavigate={closeNavigation} /></details>
          <details><summary className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE}`}>メニュー・表示設定</summary><div className="px-3 pb-3"><button type="button" onClick={() => { focusNavigationTrigger(); closeNavigation(); window.dispatchEvent(new Event(NAV_CUSTOMIZE_EVENT)); }} className={`site-menu-customize ${FOCUS_STYLE}`}>下部メニューを編集</button><HeaderLinks links={SITE_LINKS} pathname={pathname} onNavigate={closeNavigation} /><HeaderSettings onOpenInstall={openInstallGuide} /></div></details>
        </div>
      </nav> : null}
      <RecentToolTracker />
    </header>
    {isSearchOpen ? <GlobalSearchModal key={searchInitialQuery} isOpen={isSearchOpen} initialQuery={searchInitialQuery} onClose={closeSearch} /> : null}
  </>;
}
