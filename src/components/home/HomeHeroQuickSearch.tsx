"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

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
        <input
          aria-label="サイト内の経穴・用語・講義を検索"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="経穴・用語・講義を検索（例：合谷、LI4）"
          className="home-search-input"
        />
        <button
          type="submit"
          aria-label="サイト内を検索"
          className="home-search-submit"
        >
          <Search aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
