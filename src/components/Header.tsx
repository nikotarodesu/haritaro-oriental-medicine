"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Crown, Menu, Search, User as UserIcon, X } from "lucide-react";
import dynamic from "next/dynamic";
import BrandLogo from "@/components/brand/BrandLogo";
import { TOOL_CATALOG } from "@/config/toolCatalog";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";
import RecentToolTracker from "./home/RecentTools";
import YinYangSwitch from "./YinYangSwitch";
import FontSizeControl from "./FontSizeControl";
import { LEARNING_COURSES } from "@/data/learningCourses";

const GlobalSearchModal = dynamic(() => import("./search/GlobalSearchModal"), { ssr: false });

type Dropdown = "learn" | "clinical" | "account";
interface HeaderLink { href: string; label: string; description?: string; }

const LEARN_LINKS: readonly HeaderLink[] = [
  { href: "/learn", label: "学びの総合案内", description: "目的に合う学び方から始める" },
  ...LEARNING_COURSES.map(course => ({ href: `/learn/courses/${course.slug}`, label: course.title, description: `${course.steps.length}ステップの入門コース` })),
  { href: "/kokushi#learning-review", label: "今日の復習", description: "回答履歴と復習予定から取り組む" },
  { href: "/curriculum", label: "東洋医学カリキュラム" },
  { href: TOOL_CATALOG.kokushi.href, label: "国家試験対策・演習", description: TOOL_CATALOG.kokushi.short },
  { href: "/library", label: "古典・医学論文ライブラリ" },
  { href: "/articles", label: "コラム・文献解説" },
];
const CLINICAL_LINKS: readonly HeaderLink[] = [
  { href: "/clinical", label: "臨床ツールの総合案内" },
  { href: TOOL_CATALOG.simulator.href, label: TOOL_CATALOG.simulator.title, description: TOOL_CATALOG.simulator.short },
  { href: TOOL_CATALOG.haiketsu.href, label: TOOL_CATALOG.haiketsu.title, description: TOOL_CATALOG.haiketsu.short },
  { href: "/cases", label: "臨床症例演習" },
  { href: "/diagnosis", label: "気血水体質チェック" },
  { href: "/diagnosis?tab=gorou", label: "五労チェッカー" },
  { href: "/tsubo/compare", label: "経穴比較" },
  { href: "/kikei", label: "奇経八脈" },
];
const ACCOUNT_LINKS: readonly HeaderLink[] = [
  { href: "/notes", label: "マイノート" },
  { href: "/pricing", label: "料金プラン" },
  { href: "/about", label: "運営者情報" },
  { href: "/contact", label: "お問い合わせ" },
];
const FOCUS_STYLE = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)] dark:focus-visible:outline-white";
const DESKTOP_LAYOUT = "hidden xl:flex [html[data-font-size=xlarge]_&]:hidden 2xl:[html[data-font-size=xlarge]_&]:flex";
const COMPACT_LAYOUT = "flex xl:hidden [html[data-font-size=xlarge]_&]:flex 2xl:[html[data-font-size=xlarge]_&]:hidden";
const NAV_CONTROL = `inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[var(--brand-paper)] dark:hover:bg-[#22303D] ${FOCUS_STYLE}`;

function HeaderLinks({ links, pathname, onNavigate, clipCount = 0 }: { links: readonly HeaderLink[]; pathname: string; onNavigate: () => void; clipCount?: number }) {
  return <ul className="space-y-1">{links.map(link => <li key={link.href}>
    <Link href={link.href} onClick={onNavigate} aria-current={pathname === link.href ? "page" : undefined} className={`flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm leading-relaxed hover:bg-[var(--brand-paper)] dark:hover:bg-[#22303D] ${FOCUS_STYLE} ${pathname === link.href ? "bg-[var(--brand-paper)] font-semibold dark:bg-[#22303D]" : ""}`}>
      <span><span className="block">{link.label}</span>{link.description ? <span className="block text-sm font-normal text-[#59615D] dark:text-[#A0B0BC]">{link.description}</span> : null}</span>
      {link.href === "/notes" && clipCount > 0 ? <span className="shrink-0 rounded-full bg-[var(--brand-paper)] px-2 text-xs dark:bg-[#22303D]">{clipCount}件</span> : <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 opacity-50" />}
    </Link>
  </li>)}</ul>;
}

function HeaderSettings() {
  return <section aria-label="文字サイズと外観の設定" className="space-y-3 border-t border-[#E5E8E5] pt-3 dark:border-[#2A3B4A]">
    <div className="space-y-2"><p className="text-sm font-semibold">文字サイズ</p><FontSizeControl variant="segmented" /></div>
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold">外観（陽・陰）</p><div className="[&_button]:min-h-[44px] [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2"><YinYangSwitch /></div></div>
  </section>;
}

export default function Header() {
  const pathname = usePathname();
  const { clipCount } = useClinicalMemo();
  const { user, isPremium, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Dropdown | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const compactSearchRef = useRef<HTMLButtonElement>(null);
  const desktopSearchRef = useRef<HTMLButtonElement>(null);
  const dropdownButtons = useRef<Record<Dropdown, HTMLButtonElement | null>>({ learn: null, clinical: null, account: null });
  const searchReturnFocus = useRef<HTMLElement | null>(null);
  const id = useId();
  const mobileMenuId = `${id}-navigation`;
  const dropdownId = (dropdown: Dropdown) => `${id}-${dropdown}`;
  const accountHref = user ? "/account/subscription" : "/auth/login";
  const accountLabel = isPremium ? user?.role === "admin" ? "管理者マイページ" : "プレミアム会員 マイページ" : user ? "マイページ・プラン管理" : "会員ログイン / Google連携";
  const learnActive = ["/learn", "/curriculum", "/kokushi", "/library", "/articles"].some(path => pathname === path || pathname.startsWith(`${path}/`));
  const clinicalActive = ["/clinical", "/simulator", "/practice", "/cases", "/diagnosis", "/kikei"].some(path => pathname === path || pathname.startsWith(`${path}/`));
  const dictionaryActive = pathname === "/tsubo" || pathname.startsWith("/tsubo/");
  const accountActive = ["/account", "/auth", "/notes", "/pricing"].some(path => pathname === path || pathname.startsWith(`${path}/`));

  const closeNavigation = useCallback(() => { setMobileMenuOpen(false); setOpenDropdown(null); }, []);
  const openSearch = useCallback((query = "") => {
    const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    searchReturnFocus.current = focused;
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
      if (event.isComposing) return;
      // Let an open menu or record dialog keep its own keyboard interaction.
      if (!isSearchOpen && document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      const target = event.target as HTMLElement | null;
      const isInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT" || target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isSearchOpen) closeSearch(); else openSearch();
      } else if (event.key === "/" && !isInput && !isSearchOpen) {
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
      } else if (!headerRef.current?.contains(event.target)) closeNavigation();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || isSearchOpen) return;
      event.preventDefault();
      const trigger = openDropdown ? dropdownButtons.current[openDropdown] : menuButtonRef.current;
      closeNavigation();
      trigger?.focus();
    };
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("focusin", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => { document.removeEventListener("pointerdown", handleOutside); document.removeEventListener("focusin", handleOutside); document.removeEventListener("keydown", handleEscape); };
  }, [mobileMenuOpen, openDropdown, isSearchOpen, closeNavigation, id]);

  useEffect(() => {
    let frame = 0;
    const checkLayout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!menuButtonRef.current?.getClientRects().length) setMobileMenuOpen(false);
        if (!desktopSearchRef.current?.getClientRects().length) setOpenDropdown(null);
      });
    };
    const observer = new MutationObserver(checkLayout);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-font-size"] });
    window.addEventListener("resize", checkLayout);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", checkLayout); };
  }, []);

  const toggleDropdown = (dropdown: Dropdown, focusFirst = false) => {
    setMobileMenuOpen(false);
    setOpenDropdown(current => current === dropdown && !focusFirst ? null : dropdown);
    if (focusFirst) requestAnimationFrame(() => document.getElementById(dropdownId(dropdown))?.querySelector<HTMLElement>("a,button")?.focus());
  };
  const dropdownButton = (dropdown: Dropdown, label: string, active: boolean) => <button ref={element => { dropdownButtons.current[dropdown] = element; }} type="button" aria-expanded={openDropdown === dropdown} aria-controls={dropdownId(dropdown)} aria-current={active ? "true" : undefined} onClick={() => toggleDropdown(dropdown)} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); toggleDropdown(dropdown, true); } }} className={`${NAV_CONTROL} ${active || openDropdown === dropdown ? "bg-[var(--brand-paper)] dark:bg-[#22303D]" : ""}`}>
    {dropdown === "account" ? <UserIcon aria-hidden="true" className="h-5 w-5 shrink-0" /> : null}<span>{label}</span>{dropdown === "account" && isPremium ? <Crown aria-hidden="true" className="h-4 w-4 shrink-0" /> : null}<ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 motion-reduce:transition-none ${openDropdown === dropdown ? "rotate-180" : ""}`} />
  </button>;
  const accountInformation = <div className="space-y-2" aria-busy={isLoading}>
    <p className="min-w-0 whitespace-normal text-sm [overflow-wrap:anywhere] text-[#59615D] dark:text-[#A0B0BC]">{isLoading ? "アカウントを確認しています" : user ? `${user.name || "会員"} さん` : "学習の記録やプランを管理する"}</p>
    {!isLoading ? <Link href={accountHref} onClick={closeNavigation} aria-current={pathname === accountHref ? "page" : undefined} className={`flex min-h-[44px] items-center justify-between gap-3 rounded-lg bg-[var(--brand-paper)] px-3 py-2 text-sm font-semibold dark:bg-[#22303D] ${FOCUS_STYLE}`}><span>{accountLabel}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link> : null}
  </div>;

  return <>
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#E5E8E5] bg-[#fff] text-[var(--brand-ink)] dark:border-[#22303D] dark:bg-[#10161C] dark:text-[#FAF8F5] print:hidden">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-[60px] items-center justify-between gap-4 xl:h-[68px]">
          <Link href="/" aria-label="はり太郎の東洋医学 トップへ" onClick={closeNavigation} className={`inline-flex min-h-[44px] shrink-0 items-center rounded-lg ${FOCUS_STYLE}`}>
            <BrandLogo className="gap-2.5" symbolClassName="h-[34px]! w-[34px]! shrink-0" wordmarkClassName="text-xl! font-semibold tracking-[0.025em]!" />
          </Link>
          <nav aria-label="主要ナビゲーション" className={`${DESKTOP_LAYOUT} shrink-0 items-center gap-3 whitespace-nowrap`}>
            <div className="relative">
              {dropdownButton("learn", "学ぶ", learnActive)}
              {openDropdown === "learn" ? <div id={dropdownId("learn")} className="absolute left-0 top-full mt-2 max-h-[70vh] w-80 overflow-y-auto whitespace-normal rounded-xl border border-[#E5E8E5] bg-[#fff] p-2 shadow-lg dark:border-[#2A3B4A] dark:bg-[#17212A]"><HeaderLinks links={LEARN_LINKS} pathname={pathname} onNavigate={closeNavigation} /></div> : null}
            </div>
            <div className="relative">
              {dropdownButton("clinical", "臨床ツール", clinicalActive)}
              {openDropdown === "clinical" ? <div id={dropdownId("clinical")} className="absolute left-0 top-full mt-2 max-h-[70vh] w-80 overflow-y-auto whitespace-normal rounded-xl border border-[#E5E8E5] bg-[#fff] p-2 shadow-lg dark:border-[#2A3B4A] dark:bg-[#17212A]"><HeaderLinks links={CLINICAL_LINKS} pathname={pathname} onNavigate={closeNavigation} /></div> : null}
            </div>
            <Link href="/tsubo" onClick={closeNavigation} aria-current={dictionaryActive ? pathname === "/tsubo" ? "page" : "true" : undefined} className={`${NAV_CONTROL} ${dictionaryActive ? "bg-[var(--brand-paper)] dark:bg-[#22303D]" : ""}`}>経穴辞典</Link>
            <button ref={desktopSearchRef} type="button" onClick={() => openSearch()} aria-label="サイト内検索を開く" aria-haspopup="dialog" title="サイト内検索（Ctrl+K / ⌘K）" className={NAV_CONTROL}><Search aria-hidden="true" className="h-5 w-5 shrink-0" /><span>検索</span></button>
            <div className="relative">
              {dropdownButton("account", "アカウント", accountActive)}
              {openDropdown === "account" ? <div id={dropdownId("account")} className="absolute right-0 top-full mt-2 max-h-[75vh] w-88 space-y-3 overflow-y-auto whitespace-normal rounded-xl border border-[#E5E8E5] bg-[#fff] p-3 shadow-lg dark:border-[#2A3B4A] dark:bg-[#17212A]">{accountInformation}<HeaderLinks links={ACCOUNT_LINKS} pathname={pathname} onNavigate={closeNavigation} clipCount={clipCount} /><HeaderSettings /></div> : null}
            </div>
          </nav>
          <div className={`${COMPACT_LAYOUT} shrink-0 items-center gap-1.5`}>
            <button ref={compactSearchRef} type="button" onClick={() => openSearch()} aria-label="サイト内検索を開く" aria-haspopup="dialog" title="サイト内検索" className={`inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg hover:bg-[var(--brand-paper)] dark:hover:bg-[#22303D] ${FOCUS_STYLE}`}><Search aria-hidden="true" className="h-5 w-5" /></button>
            <button ref={menuButtonRef} type="button" onClick={() => { setOpenDropdown(null); setMobileMenuOpen(current => !current); }} aria-expanded={mobileMenuOpen} aria-controls={mobileMenuId} aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"} className={`inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg hover:bg-[var(--brand-paper)] dark:hover:bg-[#22303D] ${FOCUS_STYLE}`}>{mobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>
      {mobileMenuOpen ? <nav id={mobileMenuId} aria-label="サイトメニュー" className={`${COMPACT_LAYOUT} absolute left-0 right-0 top-full max-h-[calc(100dvh-72px)] flex-col overflow-y-auto border-b border-[#E5E8E5] bg-[#fff] px-3 py-4 shadow-lg dark:border-[#2A3B4A] dark:bg-[#17212A] sm:px-6`}>
        <div className="mx-auto w-full max-w-3xl space-y-3">
          <div className="flex items-center justify-between gap-3"><h2 className="text-base font-semibold">メニュー</h2><button type="button" onClick={() => { closeNavigation(); menuButtonRef.current?.focus(); }} aria-label="メニューを閉じる" className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg ${FOCUS_STYLE}`}><X aria-hidden="true" className="h-5 w-5" /></button></div>
          <details className="border-b border-[#E5E8E5] pb-2 dark:border-[#2A3B4A]"><summary className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE}`}>学ぶ{learnActive ? <span className="ml-2 text-sm font-normal">（現在のカテゴリ）</span> : null}</summary><HeaderLinks links={LEARN_LINKS} pathname={pathname} onNavigate={closeNavigation} /></details>
          <details className="border-b border-[#E5E8E5] pb-2 dark:border-[#2A3B4A]"><summary className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE}`}>臨床ツール{clinicalActive ? <span className="ml-2 text-sm font-normal">（現在のカテゴリ）</span> : null}</summary><HeaderLinks links={CLINICAL_LINKS} pathname={pathname} onNavigate={closeNavigation} /></details>
          <Link href="/tsubo" onClick={closeNavigation} aria-current={dictionaryActive ? pathname === "/tsubo" ? "page" : "true" : undefined} className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE} ${dictionaryActive ? "bg-[var(--brand-paper)] dark:bg-[#22303D]" : ""}`}>経穴辞典<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
          <section aria-label="アカウント" className="space-y-3 border-t border-[#E5E8E5] pt-4 dark:border-[#2A3B4A]"><h3 className="px-3 text-base font-semibold">アカウント</h3>{accountInformation}<HeaderLinks links={ACCOUNT_LINKS} pathname={pathname} onNavigate={closeNavigation} clipCount={clipCount} /></section>
          <details className="border-t border-[#E5E8E5] pt-2 dark:border-[#2A3B4A]"><summary className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold ${FOCUS_STYLE}`}>表示設定</summary><div className="px-3 pb-3"><HeaderSettings /></div></details>
        </div>
      </nav> : null}
      <RecentToolTracker />
    </header>
    {isSearchOpen ? <GlobalSearchModal key={searchInitialQuery} isOpen={isSearchOpen} initialQuery={searchInitialQuery} onClose={closeSearch} /> : null}
  </>;
}
