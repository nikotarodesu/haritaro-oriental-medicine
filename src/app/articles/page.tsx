"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ARTICLES } from "@/data/articleData";
import { Article } from "@/types/oriental";
import { BookOpen, Clock, ArrowLeft, ArrowRight, Sparkles, Search, Share2, Check, Bookmark } from "lucide-react";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import EastWestTermSwitch from "@/components/EastWestTermSwitch";

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    "すべて",
    "論文・文献抄読",
    "経穴・経絡学",
    "一般向けセルフケア"
  ];

  // URLクエリ（?article=id）の同期とブラウザ履歴（戻る・進む）のハンドリング
  useEffect(() => {
    const handleUrlSync = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const articleId = params.get("article");
        if (articleId) {
          const found = ARTICLES.find((a) => a.id === articleId);
          if (found) {
            setActiveArticle(found);
            return;
          }
        }
        setActiveArticle(null);
      }
    };

    handleUrlSync();
    window.addEventListener("popstate", handleUrlSync);
    return () => window.removeEventListener("popstate", handleUrlSync);
  }, []);

  const handleSelectArticle = (article: Article | null) => {
    setActiveArticle(article);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (article) {
        url.searchParams.set("article", article.id);
        window.history.pushState({}, "", url.toString());
      } else {
        url.searchParams.delete("article");
        window.history.pushState({}, "", url.toString());
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

  // 記事詳細ビュー
  if (activeArticle) {
    // 記事内の専門用語の初出管理（各単語の初回のみワンクリック解説を有効化）
    const seenTerms = new Set<string>();

    // 現在の記事以外の他講義・関連知見記事（最大3件）
    const otherArticles = ARTICLES.filter((a) => a.id !== activeArticle.id).slice(0, 3);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        {/* 論文・長文記事読書時限定のプログレスバー */}
        <ReadingProgressBar />

        {/* ナビゲーションバー */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => handleSelectArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline bg-[#EBF3EF] dark:bg-[#182823] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>記事一覧へ戻る</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="記事リンクをコピー"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">URLコピー完了</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>共有</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 text-xs text-[#59615D] dark:text-[#96A6B2]">
              <Clock className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>読了目安: 約 {activeArticle.readTime}</span>
            </div>
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
                <Clock className="w-3.5 h-3.5" />
                <span>読了約 {activeArticle.readTime}</span>
              </span>
              <span className="text-[#8A948F] dark:text-[#6A7C8B]">
                公開日: {activeArticle.publishedAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-tight">
              {activeArticle.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#59615D] dark:text-[#96A6B2] pt-2">
              <div className="flex items-center gap-2">
                <img
                  src="/icon.png"
                  alt="はり太郎"
                  className="w-7 h-7 rounded-full object-cover border border-[#E5DEC9] dark:border-[#2A3B4A] shrink-0"
                />
                <div>
                  <span className="font-semibold text-[#232826] dark:text-[#E6EFEA]">{activeArticle.author.name}</span>
                  <span className="text-[#8A948F] dark:text-[#6A7C8B] ml-1.5">（{activeArticle.author.role}）</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {activeArticle.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#404743] dark:text-[#C5D2DB]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 要約ボックス */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border-l-4 border-[#1E3D34] dark:border-[#4E8C76] text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            <strong className="block font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">【本稿の要旨】</strong>
            <GlossaryRenderer text={activeArticle.summary} seenTerms={seenTerms} />
          </div>

          {/* 本文 */}
          <div className="prose max-w-none text-[#232826] dark:text-[#D5E0DC] leading-relaxed space-y-6 text-sm sm:text-base">
            {activeArticle.contentMarkdown.split("\n\n").map((block, index) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    id={`article-heading-${index}`}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#E8E1D1] dark:border-[#22303D] pb-2 mt-10 scroll-mt-36"
                  >
                    <GlossaryRenderer text={trimmed.replace(/^##\s+/, "")} seenTerms={seenTerms} />
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    id={`article-heading-h3-${index}`}
                    className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-8 scroll-mt-36"
                  >
                    <GlossaryRenderer text={trimmed.replace(/^###\s+/, "")} seenTerms={seenTerms} />
                  </h3>
                );
              }
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="bg-[#EBF3EF] dark:bg-[#162A24] border-l-4 border-[#1E3D34] dark:border-[#4E8C76] p-4 rounded-r-xl text-xs sm:text-sm italic text-[#232826] dark:text-[#E6EFEA]"
                  >
                    <GlossaryRenderer text={trimmed.replace(/^>\s*/, "")} seenTerms={seenTerms} />
                  </blockquote>
                );
              }
              if (trimmed === ":::east-west-switch:::" || trimmed.startsWith(":::eastwest") || trimmed.startsWith(":::east-west")) {
                const termMatch = trimmed.match(/term=["']([^"']+)["']/);
                const termIdMatch = trimmed.match(/termId=["']([^"']+)["']/);
                const term = termMatch ? termMatch[1] : (termIdMatch ? termIdMatch[1] : "肝気犯胃");
                return (
                  <div key={index} className="not-prose my-6">
                    <EastWestTermSwitch termId={term} />
                  </div>
                );
              }
              if (trimmed.startsWith("---")) {
                return <hr key={index} className="border-[#E8E1D1] dark:border-[#22303D] my-8" />;
              }

              // リスト（箇条書き・番号付き）
              const lines = trimmed.split("\n");
              const isAllListItems = lines.length > 0 && lines.every((l) => /^[-*]\s+|\d+\.\s+|・\s*/.test(l.trim()));
              if (isAllListItems) {
                const isOrdered = /^\d+\.\s+/.test(lines[0].trim());
                const ListTag = isOrdered ? "ol" : "ul";
                return (
                  <ListTag
                    key={index}
                    className={`space-y-2 my-4 pl-5 ${isOrdered ? "list-decimal" : "list-disc"} text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB]`}
                  >
                    {lines.map((l, lIdx) => {
                      const itemText = l.trim().replace(/^[-*]\s+|\d+\.\s+|・\s*/, "");
                      return (
                        <li key={lIdx} className="leading-relaxed">
                          <GlossaryRenderer text={itemText} seenTerms={seenTerms} />
                        </li>
                      );
                    })}
                  </ListTag>
                );
              }

              return (
                <p key={index} className="leading-relaxed whitespace-pre-line text-[#333835] dark:text-[#C5D2DB]">
                  <GlossaryRenderer text={trimmed.replace(/^#{1,6}\s+/gm, "")} seenTerms={seenTerms} />
                </p>
              );
            })}
          </div>

          {/* 著者紹介フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-6 bg-[#FAF8F5] dark:bg-[#121920] p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] flex items-start gap-4">
            <img
              src="/icon.png"
              alt="はり太郎"
              className="w-12 h-12 rounded-xl object-cover shadow-xs border border-[#E5DEC9] dark:border-[#2A3B4A] shrink-0"
            />
            <div className="space-y-1 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">執筆・監修：{activeArticle.author.name}</h4>
              <p className="text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                東洋医学臨床家・古典研究者。古典の弁証論治体系と、現代の神経科学・筋膜解剖学・生体情報制御学を融合した統合的臨床と研究を発信。「はり太郎の東洋医学」主宰。
              </p>
            </div>
          </div>
        </article>

        {/* 関連・他の学術講義案内 */}
        {otherArticles.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>あわせて読みたい学術講義・知見録</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => handleSelectArticle(art)}
                  className="bg-[#FFFFFF] dark:bg-[#17212A] p-4 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] text-[#1E3D34] dark:text-[#83BEA8] border border-[#E8E1D1] dark:border-[#22303D]">
                      {art.category}
                    </span>
                    <h4 className="font-serif text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] line-clamp-2 leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-[11px] text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
                    <span>講義を読む</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ページ下部戻るボタン */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => handleSelectArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline bg-[#EBF3EF] dark:bg-[#182823] px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>記事一覧へ戻る</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs font-medium text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#74BA9E]"
          >
            ページの先頭へ ▲
          </button>
        </div>
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
          経絡・経穴の物理的・生物学的機序から、脈診・腹診・舌診の生体シグナル解析、東西統合医学の実践臨床録までを網羅した学術アーカイブです。古典の英知と現代自然科学の接点を体系的に探究します。
        </p>
      </div>

      {/* 検索・絞り込みバー */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* カテゴリタブ */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
        <div className="text-center py-16 sm:py-24 px-6 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleSelectArticle(article)}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
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

                <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug mb-3">
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
                <span className="text-[#737C77] dark:text-[#8899A6] text-[11px]">公開日: {article.publishedAt}</span>
                <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>記事を読む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
