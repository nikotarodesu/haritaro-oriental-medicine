"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Compass, ListOrdered } from "lucide-react";

export interface ReadingHeading {
  id: string;
  text: string;
  level: number;
}

interface ReadingProgressBarProps {
  bodySelector?: string;
  headings?: readonly ReadingHeading[];
}

export default function ReadingProgressBar({ bodySelector, headings: suppliedHeadings }: ReadingProgressBarProps = {}) {
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
    let headingNodes: HTMLElement[] = [];
    let frame = 0;
    let scanNeeded = true;

    const update = () => {
      frame = 0;
      if (scanNeeded) {
        const nextHeadings = suppliedHeadings || Array.from(body.querySelectorAll<HTMLElement>("h2, h3")).map((element, index) => {
          if (!element.id) element.id = `section-heading-${index}`;
          return { id: element.id, text: (element.innerText || element.textContent || "").trim(), level: element.tagName === "H2" ? 2 : 3 };
        });
        headingNodes = nextHeadings.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node && body.contains(node));
        setHeadings(previous => previous.length === nextHeadings.length && previous.every((item, index) => item.id === nextHeadings[index].id && item.text === nextHeadings[index].text && item.level === nextHeadings[index].level) ? previous : nextHeadings);
        scanNeeded = false;
      }
      const height = header?.getBoundingClientRect().height || 0;
      setHeaderHeight(previous => previous === height ? previous : height);
      const barHeight = barRef.current?.getBoundingClientRect().height || 44;
      const threshold = height + barHeight + 16;
      const rect = body.getBoundingClientRect();
      // Articles measure their body only; existing lecture callers retain page-wide progress.
      const distance = bodySelector ? rect.height - (window.innerHeight - height) : document.documentElement.scrollHeight - window.innerHeight;
      const travelled = bodySelector ? height - rect.top : window.scrollY;
      const current = distance > 0 ? Math.min(100, Math.max(0, travelled / distance * 100)) : bodySelector && travelled >= 0 ? 100 : 0;
      setProgress(previous => Math.abs(previous - current) < 0.1 ? previous : current);
      setIsVisible(bodySelector ? rect.top <= threshold : window.scrollY > 180);
      let active = -1;
      for (let index = 0; index < headingNodes.length; index++) {
        if (headingNodes[index].getBoundingClientRect().top <= threshold) active = index;
        else break;
      }
      setActiveHeadingIndex(active);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const mutations = new MutationObserver(() => { scanNeeded = true; schedule(); });
    mutations.observe(body, { childList: true, subtree: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(body);
    if (header) resize.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [bodySelector, suppliedHeadings]);

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
  return (
    <>
      <div aria-hidden="true" className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
        <div className="h-full bg-[#1E3D34] dark:bg-[#74BA9E] transition-[width] duration-150 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
      </div>
      <div ref={barRef} aria-hidden={!visible} inert={!visible} style={{ top: headerHeight === null ? "5rem" : headerHeight }} className={`fixed left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-all duration-200 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 min-h-11 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Compass aria-hidden="true" className="w-4 h-4 shrink-0 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] truncate">{activeHeading?.text || "はじめに"}</span>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-[#59615D] dark:text-[#A0B0BC]" aria-label={`閲覧位置 ${Math.round(progress)}パーセント`}>{Math.round(progress)}%</span>
          <div ref={menuRef} className="relative shrink-0">
            <button ref={menuButtonRef} type="button" aria-expanded={dropdownOpen} aria-controls={menuId} onClick={() => setDropdownOpen(previous => !previous)} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] focus-visible:outline-2 focus-visible:outline-offset-2">
              <ListOrdered aria-hidden="true" className="w-4 h-4" /><span>目次</span><ChevronDown aria-hidden="true" className={`w-3 h-3 transition-transform motion-reduce:transition-none ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && <nav id={menuId} aria-label="本文の目次" className="absolute top-full right-0 mt-1 w-[min(22rem,calc(100vw-1.5rem))] max-h-[65vh] overflow-y-auto rounded-xl border border-[#D5DED8] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#17212A] p-2 shadow-lg">
              <p className="px-3 py-2 text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">知りたいところから読む</p>
              <ol>{headings.map((item, index) => <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => setDropdownOpen(false)} aria-current={index === activeHeadingIndex ? "location" : undefined} className={`flex min-h-[44px] items-start gap-2 rounded-lg px-3 py-3 text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 ${index === activeHeadingIndex ? "bg-[#EBF3EF] dark:bg-[#182823] font-bold text-[#1E3D34] dark:text-[#74BA9E]" : "text-[#404743] dark:text-[#C5D2DB] hover:bg-white dark:hover:bg-[#121920]"} ${item.level === 3 ? "pl-6" : ""}`}>
                  {index < activeHeadingIndex ? <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /> : <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />}<span>{item.text}</span>
                </a>
              </li>)}</ol>
            </nav>}
          </div>
        </div>
      </div>
    </>
  );
}
