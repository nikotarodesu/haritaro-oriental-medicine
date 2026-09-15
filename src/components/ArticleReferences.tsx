"use client";

import React, { useState } from "react";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, FileText, CheckCircle2, ShoppingBag } from "lucide-react";
import { ResolvedReference } from "@/types/references";

interface ArticleReferencesProps {
  references: ResolvedReference[];
  title?: string;
  defaultExpanded?: boolean;
}

export default function ArticleReferences({
  references,
  title = "参考文献・学術エビデンス",
  defaultExpanded = true,
}: ArticleReferencesProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!references || references.length === 0) {
    return null;
  }

  return (
    <section
      id="article-references-section"
      className="mt-12 pt-8 border-t-2 border-[#E5DEC9] dark:border-[#263542] transition-colors"
      aria-labelledby="references-heading"
    >
      <div className="bg-[#FFFFFF] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs overflow-hidden">
        {/* ヘッダー */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-[#FAF8F5] dark:bg-[#19242E] hover:bg-[#F2ECE0] dark:hover:bg-[#1E2B38] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="references-heading"
                  className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]"
                >
                  {title}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] font-mono font-bold">
                  {references.length}
                </span>
              </div>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-0.5">
                PubMed掲載査読論文・原典古典・各種ガイドライン等の学術的根拠
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC]">
            <span className="hidden sm:inline">{isExpanded ? "閉じる" : "一覧を表示"}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            )}
          </div>
        </div>

        {/* 参考文献カード一覧 */}
        {isExpanded && (
          <div className="p-4 sm:p-6 space-y-4 divide-y divide-[#EBE4D5] dark:divide-[#22303D]">
            {references.map((ref) => {
              const authorsText = Array.isArray(ref.authors)
                ? ref.authors.length > 3
                  ? `${ref.authors[0]} et al.`
                  : ref.authors.join(", ")
                : ref.authors;

              return (
                <article
                  key={ref.id}
                  id={ref.anchorId}
                  className={`pt-4 first:pt-0 scroll-mt-28 transition-all duration-300 rounded-xl p-3 -m-3 hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530]`}
                >
                  <div className="flex items-start gap-3">
                    {/* 番号バッジ */}
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] font-mono font-bold text-xs border border-[#1E3D34]/20 dark:border-[#83BEA8]/30">
                        {ref.index}
                      </span>
                    </div>

                    {/* 文献詳細情報 */}
                    <div className="flex-1 space-y-2 text-xs">
                      {/* タグと種別 */}
                      <div className="flex flex-wrap items-center gap-2">
                        {ref.type && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#10161C] border border-[#E5DEC9] dark:border-[#2D3E50] text-[#59615D] dark:text-[#A0B0BC] font-medium">
                            {ref.type === "paper"
                              ? "査読論文 (Peer-Reviewed)"
                              : ref.type === "classic"
                              ? "東洋医学古典原典"
                              : ref.type === "guideline"
                              ? "診療ガイドライン"
                              : ref.type === "book"
                              ? "東洋医学推薦図書・成書"
                              : ref.type}
                          </span>
                        )}

                        {ref.studyDesign && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] font-medium">
                            {ref.studyDesign}
                          </span>
                        )}

                        {ref.sampleSize && (
                          <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                            n={ref.sampleSize.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* タイトル */}
                      <div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                          {ref.title}
                        </h4>
                        {ref.originalTitle && ref.originalTitle !== ref.title && (
                          <p className="font-sans text-xs text-[#59615D] dark:text-[#A0B0BC] italic mt-0.5">
                            {ref.originalTitle}
                          </p>
                        )}
                      </div>

                      {/* 著者・ジャーナル・出版社・年 */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#59615D] dark:text-[#96A6B2] text-[11px]">
                        {authorsText && <span>著者: {authorsText}</span>}
                        <span className="font-semibold text-[#232826] dark:text-[#E6EFEA]">
                          {ref.source}
                        </span>
                        {ref.year && <span>({ref.year}年)</span>}
                        {ref.pmid && (
                          <span className="font-mono text-[#1E3D34] dark:text-[#74BA9E]">
                            PMID: {ref.pmid}
                          </span>
                        )}
                        {ref.doi && (
                          <span className="font-mono text-[#737C77] dark:text-[#8899A6]">
                            DOI: {ref.doi}
                          </span>
                        )}
                        {ref.isbn && (
                          <span className="font-mono text-[#737C77] dark:text-[#8899A6]">
                            ISBN: {ref.isbn}
                          </span>
                        )}
                      </div>

                      {/* 臨床知見・エビデンス要約 */}
                      {ref.note && (
                        <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[11px] text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                          <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] inline-flex items-center gap-1 mr-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>臨床的意義・エビデンス要約:</span>
                          </span>
                          <span>{ref.note}</span>
                        </div>
                      )}

                      {/* 外部リンク＆Amazonアソシエイトボタン */}
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        {ref.amazonUrl && (
                          <a
                            href={ref.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow sponsored"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] hover:border-[#B86924] dark:hover:border-[#E6C387] text-[#B86924] dark:text-[#E6C387] hover:bg-[#FBE8D6] dark:hover:bg-[#382618] text-[11px] font-bold transition-all shadow-2xs group"
                            title="Amazonで詳細・在庫を確認（アソシエイトリンク）"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                            <span>Amazonで書籍詳細を見る</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        )}

                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1C2834] border border-[#D8CFC0] dark:border-[#2E4254] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#15232F] text-[11px] font-bold transition-all shadow-2xs group"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>
                              {ref.pmid
                                ? "PubMed で論文詳細を見る"
                                : ref.doi
                                ? "DOI 論文原著を開く"
                                : "出典文献を開く"}
                            </span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Amazonアソシエイト・ステマ規制遵守表記（アソシエイトリンクが含まれる場合） */}
        {references.some((r) => r.amazonUrl) && (
          <div className="px-4 py-2.5 bg-[#FAF8F5]/80 dark:bg-[#121920]/80 border-t border-[#EBE4D5] dark:border-[#22303D] text-[10px] text-[#737C77] dark:text-[#8899A6] flex items-center justify-between">
            <span>※ 当サイトはAmazonアソシエイト・プログラムの参加者であり、適格販売により収入を得ています。</span>
            <span className="hidden sm:inline text-[#A0B0BC]">PR / スポンサーリンク</span>
          </div>
        )}
      </div>
    </section>
  );
}
