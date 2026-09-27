"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES } from "@/data/articleData";
import { BookOpen, Clock, ArrowRight, Search } from "lucide-react";

export default function ArticlesListClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "すべて",
    "古典深読み",
    "経穴・経絡学",
    "論文・文献抄読",
    "臨床・実践知見"
  ];

  // フィルタリング（カテゴリ + 検索ワード）
  const filteredArticles = ARTICLES.filter((a) => {
    const matchCat = selectedCategory === "すべて" || a.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchSearch =
      !query ||
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.tags.some((t) => t.toLowerCase().includes(query)) ||
      a.category.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-16 space-y-8 sm:space-y-10">
      {/* ページヘッダー */}
      <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-6 sm:pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1E2D3D] dark:text-[#7BAAD8] tracking-widest uppercase mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge & Research Archive</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          知見・臨床録・学術論文抄読
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-3xl leading-relaxed">
          経絡・経穴の物理的・生物学的機序から、脈診・腹診・舌診の生体シグナル解析、東西統合医学の実践臨床録までを網羅した学術アーカイブです。古典の英知と現代自然科学の接点を体系的に探究します。
        </p>
      </div>

      {/* 検索・絞り込みバー */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
        {/* カテゴリタブ */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1E2D3D] dark:bg-[#375573] text-[#FAF8F5] shadow-xs"
                  : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] dark:hover:bg-[#1E2B36]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 検索入力 */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-[#8A948F] dark:text-[#6A7C8B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="知見・キーワード検索（経絡、脈診、逆流など）..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#D5CCBC] dark:border-[#2D3E50] bg-[#FFFFFF] dark:bg-[#17212A] text-[#232826] dark:text-[#E6EFEA] focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#4E8C76]"
          />
        </div>
      </div>

      {/* 記事カード一覧 */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 sm:py-24 px-4 sm:px-6 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h2 className="font-serif text-base sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
            該当する記事が見つかりませんでした
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            検索キーワードまたはカテゴリの選択を変更してお試しください。
          </p>
          <button
            onClick={() => {
              setSelectedCategory("すべて");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
          >
            すべての記事を表示する
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-6 hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[#1E3D34] dark:text-[#83BEA8] font-medium text-[11px]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>約 {article.readTime}</span>
                  </span>
                </div>

                <h2 className="font-sans text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug tracking-normal mb-1.5">
                  {article.title}
                </h2>

                {article.subtitle && (
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6] font-medium leading-relaxed line-clamp-2 mb-3">
                    {article.subtitle}
                  </p>
                )}

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3 mb-4">
                  {article.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] text-xs">
                <span className="text-[#737C77] dark:text-[#8899A6] text-[10px] sm:text-[11px]">執筆・監修：はり太郎</span>
                <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>記事を読む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
