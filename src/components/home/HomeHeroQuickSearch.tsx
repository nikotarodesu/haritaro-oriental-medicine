"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const QUICK_TAGS = [
  { label: "合谷 (LI4)", href: "/tsubo/li4" },
  { label: "足三里 (ST36)", href: "/tsubo/st36" },
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
    <div className="home-search">
      {/* 検索入力フォーム */}
      <form onSubmit={handleSearch} className="home-search-form">
        <Search aria-hidden="true" className="home-search-icon" />
        <input
          aria-label="サイト内の経穴・用語・講義を検索"
          aria-describedby="hero-search-examples"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="経穴・用語・講義を検索"
          className="home-search-input"
        />
        <button
          type="submit"
          className="ui-button ui-button-primary home-search-submit"
        >
          <span>検索</span>
          <ArrowRight aria-hidden="true" />
        </button>
      </form>
      <p id="hero-search-examples" className="ui-muted text-sm">
        例：合谷・LI4・陰陽五行
      </p>

      {/* 人気クイックタグ（枠線を控えめにして視覚ノイズを削減） */}
      <nav aria-label="経穴へのショートカット" className="home-search-shortcuts">
          {QUICK_TAGS.map((tag) => (
            <Link
              key={tag.label}
              href={tag.href}
              className="ui-text-link text-sm"
            >
              {tag.label}
            </Link>
          ))}
      </nav>
    </div>
  );
}
