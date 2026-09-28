"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  FileText, 
  Search, 
  Bookmark, 
  Sparkles, 
  ExternalLink, 
  Layers, 
  GraduationCap, 
  ChevronRight, 
  Crown, 
  Lock,
  ArrowRight,
  Filter
} from "lucide-react";
import { PAPERS_DATABASE, PaperReference } from "@/data/references/papersData";
import { CLASSICAL_TEXTS, ClassicalText } from "@/data/classicalTextsData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { ClinicalCase } from "@/types/clinicalCase";
import { KIKEI_VESSELS } from "@/data/kikeiData";
import { useAuth } from "@/contexts/AuthContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import AuthModal from "@/components/auth/AuthModal";
import PrimeStudentCard from "@/components/PrimeStudentCard";

export default function LibraryPage() {
  const { isPremium } = useAuth();
  const { addMemo } = useClinicalMemo();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "papers" | "classics" | "cases">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // フィルタリング処理
  const filteredPapers = useMemo(() => {
    if (!searchQuery.trim()) return PAPERS_DATABASE;
    const q = searchQuery.toLowerCase().trim();
    return PAPERS_DATABASE.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.japaneseTitle.includes(q) ||
      p.targetCondition.includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.interventionProtocol?.acupoints.some(pt => pt.includes(q))
    );
  }, [searchQuery]);

  const filteredClassics = useMemo(() => {
    if (!searchQuery.trim()) return CLASSICAL_TEXTS;
    const q = searchQuery.toLowerCase().trim();
    return CLASSICAL_TEXTS.filter(c => 
      c.book.includes(q) ||
      c.chapter.includes(q) ||
      c.theme.includes(q) ||
      c.original.includes(q) ||
      c.translation.includes(q) ||
      c.tags.some(t => t.includes(q))
    );
  }, [searchQuery]);

  const filteredCases = useMemo(() => {
    if (!searchQuery.trim()) return CLINICAL_CASES;
    const q = searchQuery.toLowerCase().trim();
    return CLINICAL_CASES.filter(c => 
      c.title.includes(q) || 
      c.patient.chiefComplaint.includes(q) || 
      c.correctDiagnosis.pattern.includes(q) || 
      c.correctDiagnosis.primaryPoints.some((pt: string) => pt.includes(q))
    );
  }, [searchQuery]);

  // マイカルテへ保存
  const handleSaveItem = (item: { id: string; title: string; summary: string; points?: string[] }) => {
    addMemo({
      id: `lib-${item.id}`,
      type: "diagnosis",
      title: item.title,
      subTitle: "資料集・エビデンス文献",
      points: item.points || [],
      elements: ["木"],
      indications: [],
      summary: item.summary,
      personalNotes: `資料集よりクリップ保存 (${new Date().toLocaleDateString("ja-JP")})`
    });
    setSavedIds(prev => [...prev, item.id]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ヒーローヘッダー */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>古典医典 ✕ 現代RCTエビデンス</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]">
              臨床文献ナレッジベース
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5]">
              文献・臨床エビデンス資料集
            </h1>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-3xl leading-relaxed">
              数千年の叡智が凝縮された古典（素問・霊枢・難経・甲乙経）の条文と、国際学術誌（Nature, PubMed掲載）の最新ランダム化比較試験（RCT）データをシームレスに統合。臨床の理論的根拠を確かなものにします。
            </p>
          </div>

          {/* 検索バー */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8A948F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="症状（不眠、自律神経）、ツボ名（太衝、神門）、古典名で検索..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] placeholder-[#8A948F] focus:outline-none focus:border-[#B86924]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* カテゴリタブ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A] text-xs sm:text-sm">
          {[
            { id: "all", label: "すべての資料", count: filteredPapers.length + filteredClassics.length + filteredCases.length },
            { id: "papers", label: "現代RCT・論文エビデンス", count: filteredPapers.length },
            { id: "classics", label: "古典医典条文・解釈", count: filteredClassics.length },
            { id: "cases", label: "全20臨床症例アーカイブ", count: filteredCases.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-[#B86924] text-white shadow-sm"
                  : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[11px] opacity-80">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* コンテンツエリア */}
        <div className="space-y-10">
          
          {/* セクション 1: 現代RCT論文 */}
          {(activeTab === "all" || activeTab === "papers") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    現代医学研究・RCT論文エビデンス
                  </h2>
                </div>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  {filteredPapers.length} 件
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPapers.map(paper => {
                  const isSaved = savedIds.includes(paper.id);
                  return (
                    <div
                      key={paper.id}
                      className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#B86924] transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                            {paper.studyDesign}
                          </span>
                          <span className="text-[10px] text-[#737C77]">
                            {paper.journal} ({paper.year})
                          </span>
                        </div>

                        <div>
                          <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                            {paper.japaneseTitle}
                          </h3>
                          <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-0.5 italic">
                            {paper.title}
                          </p>
                        </div>

                        {paper.interventionProtocol && (
                          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5 text-xs">
                            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                              🔬 検証された配穴プロトコル
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {paper.interventionProtocol.acupoints.map((pt, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] font-medium">
                                  {pt}
                                </span>
                              ))}
                            </div>
                            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-tight">
                              {paper.interventionProtocol.description}
                            </p>
                          </div>
                        )}

                        <div className="space-y-1 text-xs">
                          <span className="font-bold text-[#737C77] dark:text-[#8899A6]">臨床主要知見:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#404743] dark:text-[#C5D2DB]">
                            {paper.keyFindings.slice(0, 2).map((kf, i) => (
                              <li key={i}>{kf}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex items-center justify-between gap-2">
                        {paper.pmid ? (
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-bold"
                          >
                            <span>PubMedで論文確認</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span />
                        )}

                        <button
                          onClick={() => handleSaveItem({
                            id: paper.id,
                            title: paper.japaneseTitle,
                            summary: paper.keyFindings.join("\n"),
                            points: paper.interventionProtocol?.acupoints
                          })}
                          disabled={isSaved}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#1A2530] text-[#737C77] dark:text-[#8899A6] hover:text-[#B86924] transition-colors"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current text-[#B86924]" : ""}`} />
                          <span>{isSaved ? "保存済" : "カルテ保存"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* セクション 2: 古典医典条文 */}
          {(activeTab === "all" || activeTab === "classics") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#B86924]" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    古典医典 条文・臨床解釈
                  </h2>
                </div>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  {filteredClassics.length} 件
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClassics.map(classic => {
                  const isSaved = savedIds.includes(classic.id);
                  return (
                    <div
                      key={classic.id}
                      className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#B86924] transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387]">
                            『{classic.book}』{classic.chapter}
                          </span>
                          <div className="flex gap-1">
                            {classic.tags.map((t, i) => (
                              <span key={i} className="text-[10px] text-[#737C77] bg-[#FAF8F5] dark:bg-[#121920] px-1.5 py-0.5 rounded">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                          {classic.theme}
                        </h3>

                        {/* 原文 */}
                        <div className="bg-[#FAF8F5] dark:bg-[#11171E] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                          <p className="font-serif text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                            {classic.original}
                          </p>
                        </div>

                        {/* 現代語訳 */}
                        <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                          <strong>訳:</strong> {classic.translation}
                        </p>

                        {/* 臨床応用 */}
                        <div className="text-xs text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] p-2.5 rounded-xl leading-relaxed">
                          <strong>💡 臨床への活かし方:</strong> {classic.clinicalApplication}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex justify-end">
                        <button
                          onClick={() => handleSaveItem({
                            id: classic.id,
                            title: `『${classic.book}』${classic.chapter} - ${classic.theme}`,
                            summary: `${classic.original}\n${classic.translation}\n臨床応用: ${classic.clinicalApplication}`
                          })}
                          disabled={isSaved}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#1A2530] text-[#737C77] dark:text-[#8899A6] hover:text-[#B86924] transition-colors"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current text-[#B86924]" : ""}`} />
                          <span>{isSaved ? "保存済" : "条文をカルテ保存"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* セクション 3: 臨床症例アーカイブ */}
          {(activeTab === "all" || activeTab === "cases") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    全20臨床症例アーカイブ
                  </h2>
                </div>
                <Link
                  href="/cases"
                  className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1"
                >
                  <span>症例一覧へ</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCases.map(c => (
                  <Link
                    key={c.id}
                    href={`/cases/${c.id}`}
                    className="group bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 shadow-2xs hover:border-[#B86924] transition-all space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#737C77]">
                          症例 {c.id} / {c.category}
                        </span>
                        {c.isFreeTrial ? (
                          <span className="font-bold px-1.5 py-0.2 rounded bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                            無料体験
                          </span>
                        ) : (
                          <span className="font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">
                            PREMIUM
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] transition-colors leading-snug">
                        {c.title}
                      </h3>

                      <p className="text-xs text-[#59615D] dark:text-[#96A6B2] line-clamp-2 leading-relaxed">
                        主訴: {c.patient.chiefComplaint} ({c.patient.gender} {c.patient.age})
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E5DEC9]/40 flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                      <span>確定証: {c.correctDiagnosis.pattern}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* 学生向け専門書・教科書サポート（Prime Student） */}
        <PrimeStudentCard variant="banner" className="mt-12" />

      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="臨床文献・古典アーカイブ"
        description="最新のRCT論文詳細や古典医典の全文解説はプレミアム会員限定です。"
      />
    </div>
  );
}
