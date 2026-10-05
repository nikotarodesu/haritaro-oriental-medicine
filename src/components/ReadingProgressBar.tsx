"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Compass, ListOrdered } from "lucide-react";
import { getBodyReadingPosition, jumpToReadingHeading } from "@/utils/readingProgress";

export interface ReadingHeading {
  id: string;
  text: string;
  level: number;
}

interface ReadingProgressBarProps {
  bodySelector?: string;
  headings?: readonly ReadingHeading[];
  onPositionChange?: (position: { headingId: string; progress: number; immediate?: boolean }) => void;
}

export default function ReadingProgressBar({ bodySelector, headings: suppliedHeadings, onPositionChange }: ReadingProgressBarProps = {}) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [headings, setHeadings] = useState<readonly ReadingHeading[]>(suppliedHeadings || []);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const body = document.querySelector<HTMLElement>(bodySelector || "article");
    if (!body) return;
    const header = document.querySelector<HTMLElement>("header");
    let headingNodes: { node: HTMLElement; index: number }[] = [];
    const originalOffsets = new Map<HTMLElement, string>();
    let frame = 0;
    let scanNeeded = true;
    let reportedPosition = '';

    const update = () => {
      frame = 0;
      if (scanNeeded) {
        const nextHeadings = suppliedHeadings || Array.from(body.querySelectorAll<HTMLElement>("h2, h3")).map((element, index) => {
          if (!element.id) element.id = `section-heading-${index}`;
          return { id: element.id, text: (element.innerText || element.textContent || "").trim(), level: element.tagName === "H2" ? 2 : 3 };
        });
        headingNodes = nextHeadings.flatMap((item, index) => {
          const node = document.getElementById(item.id);
          return node && body.contains(node) ? [{ node, index }] : [];
        });
        setHeadings(previous => previous.length === nextHeadings.length && previous.every((item, index) => item.id === nextHeadings[index].id && item.text === nextHeadings[index].text && item.level === nextHeadings[index].level) ? previous : nextHeadings);
        scanNeeded = false;
      }
      const height = header?.getBoundingClientRect().height || 0;
      setHeaderHeight(previous => previous === height ? previous : height);
      const barHeight = barRef.current?.getBoundingClientRect().height || 44;
      const rect = body.getBoundingClientRect();
      const position = getBodyReadingPosition({ top: rect.top, height: rect.height, viewportHeight: window.innerHeight, headerHeight: height, toolbarHeight: barHeight });
      const threshold = position.threshold;
      const bodyAnchor = body.id ? body : body.parentElement?.id ? body.parentElement : null;
      if (bodyAnchor) {
        if (!originalOffsets.has(bodyAnchor)) originalOffsets.set(bodyAnchor, bodyAnchor.style.scrollMarginTop);
        bodyAnchor.style.scrollMarginTop = `${threshold}px`;
      }
      const pageDistance = document.documentElement.scrollHeight - window.innerHeight;
      const current = bodySelector ? position.progress : pageDistance > 0 ? Math.min(100, Math.max(0, window.scrollY / pageDistance * 100)) : 0;
      setProgress(previous => Math.abs(previous - current) < 0.1 ? previous : current);
      setIsVisible(bodySelector ? position.visible : window.scrollY > 180);
      if (bodySelector && !position.visible) setDropdownOpen(false);
      let active = -1;
      for (const { node, index } of headingNodes) {
        if (!originalOffsets.has(node)) originalOffsets.set(node, node.style.scrollMarginTop);
        node.style.scrollMarginTop = `${threshold}px`;
        if (node.getBoundingClientRect().top <= threshold) active = index;
      }
      // Native fragment alignment can differ by a subpixel; keep the explicitly chosen section active.
      const fragmentHeading = headingNodes.find(({ node }) => `#${encodeURIComponent(node.id)}` === window.location.hash);
      if (fragmentHeading) {
        const top = fragmentHeading.node.getBoundingClientRect().top;
        const atPageEnd = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 1;
        if (Math.abs(top - threshold) <= 2 || (atPageEnd && top >= threshold && top < window.innerHeight)) active = fragmentHeading.index;
      }
      setActiveHeadingIndex(active);
      const headingId = headingNodes.find(item => item.index === active)?.node.id;
      const location = headingId ? `${headingId}:${Math.round(current)}` : '';
      if (bodySelector && position.visible && current > 0 && headingId && location !== reportedPosition) {
        reportedPosition = location;
        onPositionChange?.({ headingId, progress: current });
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const mutations = new MutationObserver(() => { scanNeeded = true; schedule(); });
    mutations.observe(body, { childList: true, subtree: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(body);
    if (header) resize.observe(header);
    if (barRef.current) resize.observe(barRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const [node, offset] of originalOffsets) node.style.scrollMarginTop = offset;
    };
  }, [bodySelector, suppliedHeadings, onPositionChange]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setDropdownOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDropdownOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [dropdownOpen]);

  const activeHeading = activeHeadingIndex >= 0 ? headings[activeHeadingIndex] : null;
  const visible = isVisible && headings.length > 0;
  function goToHeading(id: string, event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const position = jumpToReadingHeading(id, bodySelector || "article");
    if (!position) return;
    event.preventDefault();
    onPositionChange?.({ ...position, immediate: true });
    setActiveHeadingIndex(headings.findIndex(item => item.id === id));
    setDropdownOpen(false);
  }
  return (
    <>
      <div aria-hidden="true" className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
        <div className="h-full bg-[#1E3D34] dark:bg-[#74BA9E] transition-[width] duration-150 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
      </div>
      <div ref={barRef} data-reading-toolbar aria-hidden={!visible} inert={!visible} style={{ top: headerHeight === null ? "5rem" : headerHeight }} className={`fixed left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-all duration-200 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
        <div className="reading-toolbar-row max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 min-h-11 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Compass aria-hidden="true" className="w-4 h-4 shrink-0 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span title={activeHeading?.text || "はじめに"} className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] truncate">{activeHeading?.text || "はじめに"}</span>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-[#59615D] dark:text-[#A0B0BC]" aria-label={`閲覧位置 ${Math.round(progress)}パーセント`}>{Math.round(progress)}%</span>
          <div ref={menuRef} className="relative shrink-0">
            <button ref={menuButtonRef} type="button" aria-expanded={dropdownOpen} aria-controls={menuId} onClick={() => setDropdownOpen(previous => !previous)} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] focus-visible:outline-2 focus-visible:outline-offset-2">
              <ListOrdered aria-hidden="true" className="w-4 h-4" /><span>目次</span><ChevronDown aria-hidden="true" className={`w-3 h-3 transition-transform motion-reduce:transition-none ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && <nav id={menuId} aria-label="本文の目次" className="absolute top-full right-0 mt-1 w-[min(22rem,calc(100vw-1.5rem))] max-h-[65vh] overflow-y-auto rounded-xl border border-[#D5DED8] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#17212A] p-2 shadow-lg">
              <p className="px-3 py-2 text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">知りたいところから読む</p>
              <ol>{headings.map((item, index) => <li key={item.id}>
                <a href={`#${item.id}`} onClick={event => goToHeading(item.id, event)} aria-current={index === activeHeadingIndex ? "location" : undefined} className={`flex min-h-[44px] items-start gap-2 rounded-lg px-3 py-3 text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 ${index === activeHeadingIndex ? "bg-[#EBF3EF] dark:bg-[#182823] font-bold text-[#1E3D34] dark:text-[#74BA9E]" : "text-[#404743] dark:text-[#C5D2DB] hover:bg-white dark:hover:bg-[#121920]"} ${item.level === 3 ? "pl-6" : ""}`}>
                  <span aria-hidden="true" className="shrink-0 tabular-nums">{index + 1}.</span><span className="min-w-0 [overflow-wrap:anywhere]">{item.text}</span>
                </a>
              </li>)}</ol>
            </nav>}
          </div>
        </div>
      </div>
    </>
  );
}
