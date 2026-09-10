"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { BookOpen, ChevronDown, Check, Compass, ListOrdered } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState<number>(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ページ内の見出し（article h2, article h3）を自動検出
  const scanHeadings = useCallback(() => {
    const headingElements = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLElement[];

    if (headingElements.length === 0) {
      setHeadings([]);
      return;
    }

    const items: HeadingItem[] = headingElements.map((el, idx) => {
      // IDが存在しない場合は自動付与
      if (!el.id) {
        el.id = `section-heading-${idx}`;
      }
      const level = el.tagName.toLowerCase() === "h2" ? 2 : 3;
      // GlossaryRenderer内のクリーンなテキストを取得
      const text = el.innerText || el.textContent || "";
      return {
        id: el.id,
        text: text.trim(),
        level
      };
    });

    setHeadings(items);
  }, []);

  // スクロール時の進捗率と現在地見出しの更新
  useEffect(() => {
    scanHeadings();

    // DOMの動的変化（記事切替やダイアグラム描画）に対応
    const observer = new MutationObserver(() => {
      scanHeadings();
    });

    const articleElement = document.querySelector("article");
    if (articleElement) {
      observer.observe(articleElement, { childList: true, subtree: true });
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = documentHeight - windowHeight;

      // 読了進捗率の計算
      if (scrollableHeight <= 0) {
        setProgress(0);
      } else {
        const currentProgress = Math.min(
          100,
          Math.max(0, (scrollY / scrollableHeight) * 100)
        );
        setProgress(currentProgress);
      }

      // ヘッダー（80px）を通過したあたりで追従バーを表示
      setIsVisible(scrollY > 180);

      // 現在閲覧中の見出しの判定
      const headingElements = Array.from(
        document.querySelectorAll("article h2, article h3")
      ) as HTMLElement[];

      if (headingElements.length === 0) {
        setActiveHeadingIndex(-1);
        return;
      }

      // 上部ヘッダー（80px）＋追従バー（44px）＋余白（20px）＝ 約144px
      const threshold = 144;
      let currentIndex = -1;

      for (let i = 0; i < headingElements.length; i++) {
        const rect = headingElements[i].getBoundingClientRect();
        if (rect.top <= threshold) {
          currentIndex = i;
        } else {
          break;
        }
      }

      setActiveHeadingIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [scanHeadings]);

  // 見出しへのスムーズスクロール
  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // 80px(メインヘッダー) + 48px(追従バー) + 16px(余白) = 144px
      const rect = el.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY - 140;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      setDropdownOpen(false);
    }
  };

  // ホバー管理（マウスが離れた時に少しディレイを設けて操作しやすく）
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const activeHeading = activeHeadingIndex >= 0 ? headings[activeHeadingIndex] : null;

  return (
    <>
      {/* 1. 最上部の極細プログレスライン（常時表示・読了率） */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#1E3D34] via-[#74BA9E] to-[#E6C387] 
                     dark:from-[#4E8C76] dark:via-[#74BA9E] dark:to-[#E6C387] 
                     shadow-[0_0_6px_rgba(30,61,52,0.4)] dark:shadow-none
                     transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. スクロール時にヘッダー直下へ追従する「現在地見出しバー」 */}
      <div
        className={`fixed top-20 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-all duration-300 transform ${
          isVisible && headings.length > 0
            ? "translate-y-0 opacity-100 shadow-xs"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-3 relative">
          {/* 左側：現在閲覧中の見出しインジケーター */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-[10px] font-bold shrink-0">
              <Compass className="w-3 h-3 animate-spin-slow" />
              <span>現在地</span>
            </span>

            <span className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] truncate leading-tight">
              {activeHeading ? activeHeading.text : "はじめに"}
            </span>
          </div>

          {/* 右側：読了進捗率 ＆ 見出し一覧ホバードロップダウン */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-mono text-[#737C77] dark:text-[#8899A6] hidden xs:inline">
              {Math.round(progress)}%
            </span>

            {/* 目次（ホバー ＆ クリック対応） */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  dropdownOpen
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]"
                    : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EAE3D4] dark:hover:bg-[#1B2936]"
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">目次</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ホバー展開ドロップダウン（見出し一覧・ジャンプメニュー） */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-72 sm:w-80 p-2.5 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1 max-h-[65vh] overflow-y-auto">
                  <div className="px-2.5 py-1 border-b border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
                    <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                      記事の構成・目次
                    </span>
                    <span>全 {headings.length} セクション</span>
                  </div>

                  <div className="pt-1 space-y-0.5">
                    {headings.map((item, idx) => {
                      const isActive = idx === activeHeadingIndex;
                      const isPast = activeHeadingIndex > idx;

                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2 text-xs ${
                            isActive
                              ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold shadow-xs"
                              : "text-[#404743] dark:text-[#C5D2DB] hover:bg-white dark:hover:bg-[#121920]"
                          } ${item.level === 3 ? "pl-5 text-[11px]" : ""}`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isActive ? (
                              <span className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E] inline-block ring-2 ring-[#74BA9E]/40 animate-pulse" />
                            ) : isPast ? (
                              <Check className="w-3 h-3 text-[#737C77] dark:text-[#8899A6]" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B0BAC2] dark:bg-[#4A5D6E] inline-block" />
                            )}
                          </div>
                          <span className="line-clamp-1 leading-snug flex-1">
                            {item.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 追従バー下端のインラインプログレスライン */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
            <div
              className="h-full bg-gradient-to-r from-[#1E3D34] via-[#74BA9E] to-[#E6C387] dark:from-[#4E8C76] dark:via-[#74BA9E] dark:to-[#E6C387] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
