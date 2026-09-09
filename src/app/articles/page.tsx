"use client";

import { useState } from "react";
import { ARTICLES } from "@/data/articleData";
import { Article } from "@/types/oriental";
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import ReadingProgressBar from "@/components/ReadingProgressBar";

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = [
    "すべて",
    "論文・文献抄読",
    "経穴・経絡学",
    "一般向けセルフケア"
  ];

  const filteredArticles = selectedCategory === "すべて"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCategory);

  // 記事詳細ビュー
  if (activeArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        {/* 論文・長文記事読書時限定のプログレスバー */}
        <ReadingProgressBar />

        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D34] dark:text-[#3CD0A0] hover:underline bg-[#EBF3EF] dark:bg-[#182823] px-3.5 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>記事一覧へ戻る</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#59615D] dark:text-[#96A6B2]">
            <Clock className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#3CD0A0]" />
            <span>読了目安: 約 {activeArticle.readTime}</span>
          </div>
        </div>

        <article className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-12 shadow-sm space-y-8 transition-colors">
          {/* ヘッダー情報 */}
          <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#59615D] dark:text-[#96A6B2]">
              <span className="px-2.5 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] font-medium border border-[#F3E1CB] dark:border-[#423321]">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeArticle.publishedAt}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>読了約 {activeArticle.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-tight">
              {activeArticle.title}
            </h1>

            <div className="flex items-center justify-between text-xs text-[#59615D] dark:text-[#96A6B2] pt-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white flex items-center justify-center font-serif text-xs font-bold">
                  針
                </div>
                <div>
                  <span className="font-semibold text-[#232826] dark:text-[#E6EFEA]">{activeArticle.author.name}</span>
                  <span className="text-[#8A948F] dark:text-[#6A7C8B] ml-1.5">（{activeArticle.author.role}）</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {activeArticle.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#404743] dark:text-[#C5D2DB]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 要約ボックス */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border-l-4 border-[#1E3D34] dark:border-[#3CD0A0] text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            <strong className="block font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">【本稿の要旨】</strong>
            {activeArticle.summary}
          </div>

          {/* 本文 */}
          <div className="prose max-w-none text-[#232826] dark:text-[#D5E0DC] leading-relaxed space-y-6 text-sm sm:text-base">
            {activeArticle.contentMarkdown.split("\n\n").map((block, index) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#1E3D34] dark:text-[#3CD0A0] border-b border-[#E8E1D1] dark:border-[#22303D] pb-2 mt-8"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="bg-[#EBF3EF] dark:bg-[#162A24] border-l-4 border-[#1E3D34] dark:border-[#3CD0A0] p-4 rounded-r-xl text-xs sm:text-sm italic text-[#232826] dark:text-[#E6EFEA]"
                  >
                    {block.replace("> ", "")}
                  </blockquote>
                );
              }
              if (block.startsWith("---")) {
                return <hr key={index} className="border-[#E8E1D1] dark:border-[#22303D] my-8" />;
              }
              return (
                <p key={index} className="leading-relaxed whitespace-pre-line text-[#333835] dark:text-[#C5D2DB]">
                  {block}
                </p>
              );
            })}
          </div>

          {/* 著者紹介フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-6 bg-[#FAF8F5] dark:bg-[#121920] p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
              針
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">執筆・監修：{activeArticle.author.name}</h4>
              <p className="text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                長年の東洋医学臨床と古典研究、国内外の医学論文の知見をもとに、本質的な健康への道筋を探究。「はり太郎の東洋医学」主宰。
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // 記事一覧ビュー
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* ページヘッダー */}
      <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1E2D3D] dark:text-[#7BAAD8] tracking-widest uppercase mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge & Research Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          知見・臨床録・学術論文抄読
        </h1>
        <p className="mt-2 text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-3xl leading-relaxed">
          書き溜めてきた臨床の智慧、配穴の秘訣、そして世界最前線の神経生理学論文を精読・解釈したアーカイブです。テキスト、ブログ記事、論文データが蓄積され、東洋医学の最高峰の知の宝庫を形成します。
        </p>
      </div>

      {/* カテゴリタブ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-[#1E2D3D] dark:bg-[#375573] text-[#FAF8F5] shadow-sm"
                : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] dark:hover:bg-[#1E2B36]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 記事カード一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 hover:border-[#1E3D34] dark:hover:border-[#3CD0A0] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-3">
                <span className="px-2.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[#1E3D34] dark:text-[#65D4B2] font-medium">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h2 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] transition-colors leading-snug mb-3">
                {article.title}
              </h2>

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
              <span className="text-[#737C77] dark:text-[#8899A6]">{article.publishedAt}</span>
              <span className="text-[#1E3D34] dark:text-[#3CD0A0] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>記事を読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
