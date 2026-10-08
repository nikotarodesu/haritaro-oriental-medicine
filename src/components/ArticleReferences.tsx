"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, FileText, ShoppingBag } from "lucide-react";
import { ResolvedReference } from "@/types/references";

interface ArticleReferencesProps {
  references: ResolvedReference[];
  title?: string;
  defaultExpanded?: boolean;
  scopeNote?: string;
}

export default function ArticleReferences({
  references,
  title = "参考文献・出典と確認範囲",
  defaultExpanded = true,
  scopeNote,
}: ArticleReferencesProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!references || references.length === 0) {
    return null;
  }

  return (
    <section
      id="article-references-section"
      className="scroll-mt-28 mt-12 pt-8 border-t-2 border-[#E5DEC9] dark:border-[#263542] transition-colors"
      aria-labelledby="references-heading"
    >
      <div className="bg-[#FFFFFF] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] overflow-hidden">
        {/* ヘッダー */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setIsExpanded(!isExpanded); } }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3.5 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-[#FAF8F5] dark:bg-[#19242E] hover:bg-[#F2ECE0] dark:hover:bg-[#1E2B38] transition-colors"
        >
          <div className="min-w-0 flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  id="references-heading"
                  className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]"
                >
                  {title}
                </h3>
                <span className="shrink-0 text-sm px-2 py-0.5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] font-mono font-bold">
                  {references.length}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC] mt-1">
                論文・古典・診療指針では根拠の種類と適用範囲が異なります
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-sm font-semibold text-[#59615D] dark:text-[#A0B0BC]">
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
          <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 divide-y divide-[#EBE4D5] dark:divide-[#22303D]">
            {scopeNote && <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]" data-reference-scope>{scopeNote}</p>}
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
                  className="pt-4 sm:pt-5 first:pt-0 scroll-mt-28"
                >
                  <div className="flex items-start gap-3">
                    {/* 番号バッジ */}
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] font-mono font-bold text-sm">
                        {ref.index}
                      </span>
                    </div>

                    {/* 文献詳細情報 */}
                    <div className="min-w-0 flex-1 space-y-3 text-sm [overflow-wrap:anywhere]">
                      {/* タグと種別 */}
                      <div className="flex flex-wrap items-center gap-2">
                        {ref.type && (
                          <span className="text-sm px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#10161C] text-[#59615D] dark:text-[#A0B0BC] font-medium">
                            {ref.type === "paper"
                              ? "研究論文"
                              : ref.type === "classic"
                              ? "古典・伝統資料"
                              : ref.type === "guideline"
                              ? "公的資料・ガイドライン"
                              : ref.type === "book"
                              ? "書籍・成書"
                              : ref.type}
                          </span>
                        )}

                        {ref.studyDesign && (
                          <span className="text-sm px-2.5 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] font-medium">
                            {ref.studyDesign}
                          </span>
                        )}

                        {ref.sampleSize && (
                          <span className="text-sm text-[#59615D] dark:text-[#A0B0BC]">
                            n={ref.sampleSize.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* タイトル */}
                      {ref.bibliographyStatus && <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
                        {ref.bibliographyStatus === 'matched' ? '書誌情報：照合済み' : ref.bibliographyStatus === 'retracted' ? '撤回論文：治療の根拠として使用しません' : '書誌情報：照合未完了。根拠としての利用は保留'}
                        {ref.bibliographyStatus === 'matched' && (ref.claimsStatus === 'source-checked' ? ' ／ 要約の対象・限界を照合済み（専門家監修とは別）' : ' ／ 結果の解釈は照合中')}
                      </p>}
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                          {ref.title}
                        </h4>
                        {ref.originalTitle && ref.originalTitle !== ref.title && (
                          <p className="font-sans text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC] italic mt-1">
                            {ref.originalTitle}
                          </p>
                        )}
                      </div>

                      {/* 著者・ジャーナル・出版社・年 */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#59615D] dark:text-[#96A6B2] text-sm leading-relaxed">
                        {authorsText && <span>著者: {authorsText}</span>}
                        <span className="font-semibold text-[#232826] dark:text-[#E6EFEA]">
                          {ref.source}
                        </span>
                        {ref.year && <span>({ref.year}{typeof ref.year === "number" ? "年" : ""})</span>}
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
                        <div className="pl-3 border-l-2 border-[#C5DED4] dark:border-[#2A5243] text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                          <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] inline-flex items-center gap-1 mr-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>参照した内容・適用範囲:</span>
                          </span>
                          <span>{ref.note}</span>
                        </div>
                      )}

                      {/* 外部リンク・古典ライブラリ・Amazonアソシエイトボタン */}
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        {ref.libraryUrl && (
                          <Link
                            href={ref.libraryUrl}
                            style={{ minHeight: 44 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#DCECE5] dark:hover:bg-[#1E362D] text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 group"
                            title="古典ライブラリで掲載条文・解説と確認状況を読む"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                            <span>古典の掲載文・確認状況を見る</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        )}

                        {ref.amazonUrl && (
                          <a
                            href={ref.amazonUrl}
                            style={{ minHeight: 44 }}
                            target="_blank"
                            rel="noopener noreferrer nofollow sponsored"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] hover:border-[#B86924] dark:hover:border-[#E6C387] text-[#B86924] dark:text-[#E6C387] hover:bg-[#FBE8D6] dark:hover:bg-[#382618] text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 group"
                            title="Amazonで探す・在庫と詳細を確認（リンク切れ防止・アソシエイトリンク）"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                            <span>
                              {ref.type === "classic"
                                ? "Amazonで解説書・訳注書を探す"
                                : "Amazonで探す（在庫・詳細）"}
                            </span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        )}

                        {ref.url && (
                          <a
                            href={ref.url}
                            style={{ minHeight: 44 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1C2834] border border-[#D8CFC0] dark:border-[#2E4254] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#15232F] text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 group"
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

      </div>
    </section>
  );
}
