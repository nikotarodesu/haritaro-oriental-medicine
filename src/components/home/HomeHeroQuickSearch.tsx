"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const QUICK_TAGS = [
  { label: "合谷 (LI4)", href: "/tsubo/li4" },
  { label: "足三里 (ST36)", href: "/tsubo/st36" },
  { label: "太衝 (LR3)", href: "/tsubo/lr3" },
  { label: "三陰交 (SP6)", href: "/tsubo/sp6" },
  { label: "気血水問診", href: "/diagnosis" },
  { label: "弁証推論", href: "/simulator" },
  { label: "カリキュラム", href: "/curriculum" },
];

export default function HomeHeroQuickSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    trackEvent("search_submit", {
      placement: "hero_quick_search",
    });

    window.dispatchEvent(new CustomEvent('haritaro:open-search', { detail: { query: trimmed } }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2.5 pt-2">
      {/* 検索入力フォーム */}
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="absolute left-3.5 sm:left-4 text-[#737C77] dark:text-[#8899A6] pointer-events-none">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
        </div>
        <input
          aria-label="経穴・記事・講義を検索"
          aria-describedby="hero-search-examples"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="経穴・講義・記事"
          className="w-full min-h-[56px] pl-10 sm:pl-12 pr-24 sm:pr-28 py-3 sm:py-3.5 text-base rounded-2xl bg-white dark:bg-[#17212A] border-2 border-[#D8CFC0] dark:border-[#2A3B4A] focus:border-[#1E3D34] dark:focus:border-[#74BA9E] focus:outline-none shadow-sm text-[#232826] dark:text-[#FAF8F5] placeholder-[#8A9590] dark:placeholder-[#6C7D8A] transition-all"
        />
        <button
          type="submit"
          className="absolute right-1.5 sm:right-2 min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] text-sm font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span>検索</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
      <p id="hero-search-examples" className="px-1 text-sm text-[#59615D] dark:text-[#A8B8C4]">
        例：合谷、LI4、陰陽五行
      </p>

      {/* 人気クイックタグ（枠線を控えめにして視覚ノイズを削減） */}
      <div className="space-y-1.5 pt-1">
        <span className="text-sm text-[#59615D] dark:text-[#A8B8C4] flex items-center justify-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>人気のツボ・機能:</span>
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_TAGS.map((tag, index) => (
            <Link
              key={tag.label}
              href={tag.href}
              className={`${index > 1 ? "hidden sm:inline-flex" : "inline-flex"} min-h-[44px] items-center justify-center px-3 py-2 rounded-full bg-[#EFE9DD]/80 dark:bg-[#1E2B36] hover:bg-[#E5DEC9] dark:hover:bg-[#283847] text-sm font-medium text-[#2E3632] dark:text-[#E6EFEA] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
