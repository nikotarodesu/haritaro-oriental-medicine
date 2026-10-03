"use client";

import { useState, useMemo, useEffect } from "react";
import { matchesSearchText } from '@/utils/search';
import Link from "next/link";
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  Bookmark, 
  Check, 
  GraduationCap, 
  FileText, 
  ChevronRight, 
  Activity, 
  ArrowRight,
  MapPin,
  X,
} from "lucide-react";
import { VERIFIED_PAPERS as PAPERS_DATABASE } from "@/data/references/papersData";
import { CLASSICAL_TEXTS } from "@/data/classicalTextsData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import MedicalSafetyNotice from "@/components/MedicalSafetyNotice";
import { PUBLIC_ARCHIVE_CASES, ARCHIVE_CASES_NOTICE } from "@/data/cases/archiveCases";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import AuthModal from "@/components/auth/AuthModal";
import PrimeStudentCard from "@/components/PrimeStudentCard";

export default function LibraryClient() {
  const { addMemo } = useClinicalMemo();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "papers" | "classics" | "cases" | "archives">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    let frame = 0;
    const revealLinkedItem = () => {
      const id = window.location.hash.slice(1);
      if (!/^(paper|classic|archive)-[a-z0-9-]+$/i.test(id)) return;
      setActiveTab('all');
      setSearchQuery('');
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
      });
    };
    frame = requestAnimationFrame(revealLinkedItem);
    window.addEventListener('hashchange', revealLinkedItem);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', revealLinkedItem); };
  }, []);

  // フィルタリング処理
  const filteredPapers = useMemo(() => PAPERS_DATABASE.filter(p => matchesSearchText(searchQuery, [p.title, p.japaneseTitle, p.targetCondition, ...p.tags, ...(p.interventionProtocol?.acupoints || [])])), [searchQuery]);

  const filteredClassics = useMemo(() => CLASSICAL_TEXTS.filter(c => matchesSearchText(searchQuery, [c.book, c.chapter, c.theme, c.original, c.verifiedQuotation?.text || '', c.verifiedQuotation?.section || '', c.translation, ...c.tags])), [searchQuery]);

  const filteredCases = useMemo(() => CLINICAL_CASES.filter(c => matchesSearchText(searchQuery, [c.title, c.patient.chiefComplaint, c.correctDiagnosis.pattern, ...c.correctDiagnosis.primaryPoints])), [searchQuery]);

  const filteredArchives = useMemo(() => PUBLIC_ARCHIVE_CASES.filter(ac => matchesSearchText(searchQuery, [ac.title, ac.category, ac.location, ac.symptoms, ac.treatmentAndCourse, ...ac.usedAcupoints, ...ac.tags])), [searchQuery]);

  const totalResults = filteredPapers.length + filteredClassics.length + filteredCases.length + filteredArchives.length;
  const visibleResultCount = {
    all: totalResults,
    papers: filteredPapers.length,
    classics: filteredClassics.length,
    cases: filteredCases.length,
    archives: filteredArchives.length,
  }[activeTab];

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
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#10161C] text-base leading-relaxed text-[#232826] dark:text-[#FAF8F5]">
      {/* ヒーローヘッダー */}
      <div className="bg-[#FCFAF6] dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>古典医典・研究資料・症例教材</span>
            </span>
            <span className="text-sm px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]">
              臨床文献ナレッジベース
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5]">
              文献・古典・臨床実例アーカイブ
            </h1>
            <p className="text-base text-[#59615D] dark:text-[#96A6B2] max-w-3xl leading-relaxed">
              古典条文（素問・霊枢・難経）、原典と書誌情報を照合した研究資料、症例教材をまとめています。研究の種類・対象・限界を確認しながら学ぶための資料集です。
            </p>
          </div>

          <p className="text-base leading-relaxed">論文は書誌情報の照合済み資料を掲載しています。治療結果の解釈には照合中の資料があり、全件の専門家監修は未完了です。<Link href="/editorial-policy" className="underline">出典確認・監修の進捗を見る</Link></p>

          {/* 検索バー */}
          <div className="pt-2 max-w-xl">
            <label htmlFor="library-search" className="mb-2 block text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">資料を検索</label>
            <div className="relative">
              <Search className="w-5 h-5 text-[#737C77] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="library-search"
                type="search"
                aria-label="文献・古典・症例を検索"
                aria-describedby="library-search-hint"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="キーワードを入力"
                className="w-full min-h-11 pl-10 pr-14 py-3 rounded-lg text-base bg-[#FFFFFF] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] placeholder-[#737C77] focus:outline-none focus:border-[#1E3D34] focus:ring-2 focus:ring-[#1E3D34]/20"
              />
              {searchQuery.length > 0 && <button type="button" aria-label="検索をクリア" onClick={() => setSearchQuery('')} className="absolute right-1 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#E8EFEA] dark:hover:bg-[#182823]"><X className="h-5 w-5" aria-hidden="true" /></button>}
            </div>
            <p id="library-search-hint" className="mt-2 text-sm text-[#59615D] dark:text-[#A0B0BC]">例：膝痛、足三里、素問</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* カテゴリタブ */}
        <div role="group" aria-label="資料の分類" className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#E5DEC9] dark:border-[#2A3B4A] text-sm">
          {[
            { id: "all", label: "すべて", count: totalResults },
            { id: "papers", label: "論文", count: filteredPapers.length },
            { id: "classics", label: "古典", count: filteredClassics.length },
            { id: "cases", label: "症例", count: filteredCases.length },
            { id: "archives", label: "実例", count: filteredArchives.length },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={activeTab === tab.id}
              style={{ minHeight: 44 }}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-2 rounded-lg border font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-[#1E3D34] border-[#1E3D34] text-white dark:bg-[#2B6958] dark:border-[#2B6958]"
                  : "bg-[#FCFAF6] dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#E8EFEA] dark:hover:bg-[#182823]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-sm opacity-90">({tab.count})</span>
            </button>
          ))}
        </div>

        <p role="status" className="text-sm text-[#59615D] dark:text-[#A0B0BC]">表示中：{visibleResultCount} 件</p>

        {visibleResultCount === 0 && <section aria-labelledby="library-empty-title" className="rounded-xl bg-[#FCFAF6] dark:bg-[#17212A] p-5 sm:p-6 space-y-3">
          <h2 id="library-empty-title" className="font-serif text-xl font-bold">該当する資料がありません</h2>
          <p className="text-base text-[#59615D] dark:text-[#A0B0BC]">{searchQuery.trim() ? 'キーワードを変えるか、検索をクリアして資料を探してください。' : 'この分類に掲載中の資料はありません。ほかの分類もご覧ください。'}</p>
          <div className="flex flex-wrap gap-3">
            {searchQuery.length > 0 && <button type="button" onClick={() => setSearchQuery('')} className="inline-flex min-h-11 items-center rounded-lg bg-[#1E3D34] px-4 py-2 text-sm font-bold text-white dark:bg-[#2B6958]">検索をクリア</button>}
            {activeTab !== 'all' && <button type="button" onClick={() => { setActiveTab('all'); setSearchQuery(''); }} className="inline-flex min-h-11 items-center rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] px-4 py-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">すべての資料を見る</button>}
          </div>
        </section>}

        {activeTab === "archives" && <div className="[&_p]:text-base [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:text-sm"><MedicalSafetyNotice title="症例アーカイブの掲載は保留中です" message={ARCHIVE_CASES_NOTICE} /></div>}

        {/* コンテンツエリア */}
        {visibleResultCount > 0 && <div className="space-y-8">
          
          {/* セクション 1: 現代RCT論文 */}
          {(activeTab === "all" || activeTab === "papers") && filteredPapers.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    現代医学研究・RCT論文エビデンス
                  </h2>
                </div>
                <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  {filteredPapers.length} 件
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPapers.map(paper => {
                  const isSaved = savedIds.includes(paper.id);
                  return (
                    <div
                      key={paper.id}
                      id={`paper-${paper.id}`}
                      className="scroll-mt-28 target:ring-2 target:ring-[#B86924] bg-[#FCFAF6] dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 space-y-4 flex flex-col justify-between hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                            {paper.studyDesign}
                          </span>
                          <span className="text-sm text-[#59615D] dark:text-[#A0B0BC]">
                            {paper.journal} ({paper.year})
                          </span>
                        </div>

                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                            {paper.japaneseTitle}
                          </h3>
                          <details className="mt-2 text-sm text-[#59615D] dark:text-[#A0B0BC]">
                            <summary className="min-h-11 py-2 font-bold cursor-pointer">書誌情報</summary>
                            <p className="break-words leading-relaxed">{paper.title}</p>
                            <p className="mt-2 leading-relaxed">{paper.journal} ({paper.year})</p>
                          </details>
                        </div>

                        <div className="space-y-3 text-base text-[#59615D] dark:text-[#A0B0BC]">
                          <div>
                            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">対象疾患: </span>
                            <span>{paper.targetCondition}</span>
                          </div>
                          {paper.interventionProtocol && (
                            <div>
                              <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">介入プロトコル: </span>
                              <span>{paper.interventionProtocol.name}（使用ツボ: {paper.interventionProtocol.acupoints.join("、")}）</span>
                            </div>
                          )}
                          <p className="break-words text-base leading-relaxed">
                            {paper.primaryOutcomes}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => handleSaveItem({
                            id: paper.id,
                            title: paper.japaneseTitle,
                            summary: paper.primaryOutcomes,
                            points: paper.interventionProtocol?.acupoints
                          })}
                          className={`min-h-11 text-sm font-bold flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                            isSaved
                              ? "bg-emerald-50 dark:bg-[#142820] text-emerald-700 dark:text-emerald-300 border-emerald-300"
                              : "bg-[#FAF8F5] dark:bg-[#1A2632] text-[#59615D] dark:text-[#96A6B2] border-[#E5DEC9] dark:border-[#2A3B4A] hover:text-[#1E3D34]"
                          }`}
                        >
                          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          <span>{isSaved ? "カルテ保存済" : "配穴ストック"}</span>
                        </button>

                        {paper.pmid && (
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-11 text-sm text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline inline-flex items-center gap-1"
                          >
                            <span>PubMed</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* セクション 2: 古典原典条文 */}
          {(activeTab === "all" || activeTab === "classics") && filteredClassics.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    古典条文・伝統的な解釈
                  </h2>
                </div>
                <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  {filteredClassics.length} 件
                </span>
              </div>

              <p className="text-base leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">古典の考え方を学ぶ資料です。{CLASSICAL_TEXTS.filter(classic => classic.verifiedQuotation).length}件に電子本文からの引用と確認範囲を表示しています。底本画像との照合・専門家による確認は未完了です。伝統的な配穴意図と、現代の疾患に対する治療効果は分けて読みます。</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClassics.map(classic => {
                  const isSaved = savedIds.includes(classic.id);
                  return (
                    <div
                      key={classic.id}
                      id={`classic-${classic.id}`}
                      className="scroll-mt-28 target:ring-2 target:ring-[#B86924] bg-[#FCFAF6] dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 space-y-4 flex flex-col justify-between hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex min-w-0 flex-col items-start gap-2">
                          <span className="max-w-full break-words text-sm font-bold text-[#59615D] dark:text-[#A0B0BC]">
                            『{classic.book}』{classic.chapter}
                          </span>
                          <h3 className="min-w-0 max-w-full break-words font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                            {classic.theme}
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-sm font-bold text-[#737C77] dark:text-[#8899A6] block mb-0.5">掲載条文（原典との一致は未確認）：</span>
                            <p className="font-serif text-base text-[#232826] dark:text-[#FAF8F5] leading-relaxed break-words">
                              {classic.originalPublicationStatus === 'withheld_pending_verification' ? '元の掲載文は字句・出典の確認が必要なため、原典の引用としての掲載を保留しています。下の確認事項をご覧ください。' : classic.original}
                            </p>
                          </div>
                          {classic.reading && (
                            <details className="border-t border-[#EFE8D8]/70 dark:border-[#25323E] pt-2">
                              <summary className="min-h-11 py-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] cursor-pointer">訓読・書き下し：</summary>
                              <p className="font-serif text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                                {classic.reading}
                              </p>
                            </details>
                          )}
                          {classic.verifiedQuotation && (
                            <section className="border-t border-[#EFE8D8]/70 dark:border-[#25323E] pt-3 space-y-2" aria-label="電子本文の引用と確認範囲">
                              <h4 className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">電子本文からの引用（底本画像は未確認）</h4>
                              <blockquote className="font-serif text-base leading-relaxed break-words">{classic.verifiedQuotation.text}</blockquote>
                              <details className="text-sm leading-relaxed">
                                <summary className="min-h-11 py-2 font-bold cursor-pointer">資料・版・頁の詳細</summary>
                              <dl className="space-y-2">
                                <div><dt className="inline font-bold">資料・該当箇所：</dt><dd className="inline">{classic.verifiedQuotation.sourceTitle} — {classic.verifiedQuotation.section}</dd></div>
                                <div><dt className="inline font-bold">版情報：</dt><dd className="inline">{classic.verifiedQuotation.edition || '未確認'}</dd></div>
                                <div><dt className="inline font-bold">頁標識：</dt><dd className="inline">{classic.verifiedQuotation.page || '未確認'}</dd></div>
                                <div><dt className="inline font-bold">電子本文の確認日：</dt><dd className="inline">{classic.verifiedQuotation.checkedAt}</dd></div>
                              </dl>
                              </details>
                              <p className="text-base leading-relaxed">{classic.verifiedQuotation.limitation}</p>
                              <a href={classic.verifiedQuotation.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold underline">引用元の電子本文を見る<ExternalLink className="h-3 w-3" aria-hidden="true" /></a>
                            </section>
                          )}
                          <div className="border-t border-[#EFE8D8]/70 dark:border-[#25323E] pt-2">
                            <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">学習用の現代語解説：</span>
                            <p className="text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                              {classic.translation}
                            </p>
                          </div>
                          {classic.verificationNote && <div className="border-t border-[#EFE8D8]/70 dark:border-[#25323E] pt-3 text-base leading-relaxed text-[#A83629] dark:text-[#F2A99F]">
                            <p>{classic.verificationNote}</p>
                            {classic.comparisonSourceUrl && <a href={classic.comparisonSourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center underline">照合に使用した比較資料</a>}
                          </div>}
                        </div>

                        <div className="text-base text-[#59615D] dark:text-[#A0B0BC] border-l-2 border-[#C5DED4] dark:border-[#2A5243] pl-4 space-y-3">
                          <div>
                            <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
                              伝統的な配穴意図・現代医療への適用限界:
                            </span>
                            <span className="leading-relaxed">{classic.clinicalApplication}</span>
                          </div>
                          {classic.relatedPoints && classic.relatedPoints.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-2">
                              <span className="text-sm font-bold text-[#737C77] dark:text-[#8899A6]">連動経穴:</span>
                              <div className="flex flex-wrap gap-1">
                                {classic.relatedPoints.map(pt => (
                                  <Link
                                    key={pt}
                                    href={`/tsubo/${pt.toLowerCase()}`}
                                    className="inline-flex min-h-11 min-w-11 items-center justify-center px-3 py-2 rounded-lg text-sm font-mono font-bold bg-[#E8EFEA] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
                                  >
                                    {pt}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => handleSaveItem({
                            id: classic.id,
                            title: `『${classic.book}』${classic.theme}`,
                            summary: classic.clinicalApplication
                          })}
                          className={`min-h-11 text-sm font-bold flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                            isSaved
                              ? "bg-emerald-50 dark:bg-[#142820] text-emerald-700 dark:text-emerald-300 border-emerald-300"
                              : "bg-[#FAF8F5] dark:bg-[#1A2632] text-[#59615D] dark:text-[#96A6B2] border-[#E5DEC9] dark:border-[#2A3B4A] hover:text-[#1E3D34]"
                          }`}
                        >
                          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          <span>{isSaved ? "カルテ保存済" : "配穴ストック"}</span>
                        </button>

                        <div className="flex flex-wrap gap-1">
                          {classic.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-sm px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* セクション 3: 弁証思考症例演習 (20例) */}
          {(activeTab === "all" || activeTab === "cases") && filteredCases.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    東洋医学 弁証思考症例（全20症例）
                  </h2>
                </div>
                <Link
                  href="/cases"
                  className="text-sm font-bold text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1"
                >
                  <span>症例演習ページへ</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCases.map(c => (
                  <Link
                    key={c.id}
                    href={`/cases/${c.id}`}
                    className="group bg-[#FCFAF6] dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-colors space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
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

                      <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] transition-colors leading-snug">
                        {c.title}
                      </h3>

                      <p className="text-base text-[#59615D] dark:text-[#A0B0BC] break-words leading-relaxed">
                        主訴: {c.patient.chiefComplaint} ({c.patient.gender} {c.patient.age})
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E5DEC9]/40 flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-[#B86924] dark:text-[#E6C387]">
                      <span>確定証: {c.correctDiagnosis.pattern}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* セクション 4: 運動器・自律神経実例アーカイブ (32例) */}
          {(activeTab === "all" || activeTab === "archives") && filteredArchives.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    症例アーカイブ（出典確認待ち）
                  </h2>
                </div>
                <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  {filteredArchives.length} 件
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArchives.map(ac => {
                  const isSaved = savedIds.includes(ac.id);
                  return (
                    <div
                      key={ac.id}
                      id={`archive-${ac.id}`}
                      className="scroll-mt-28 target:ring-2 target:ring-[#B86924] bg-[#FCFAF6] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 space-y-3 flex flex-col justify-between hover:border-emerald-600 dark:hover:border-emerald-500 transition-all"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {ac.category}
                          </span>
                          <span className="text-sm text-[#737C77] flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {ac.location}｜{ac.patient.ageGroup} {ac.patient.gender}
                          </span>
                        </div>

                        <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                          {ac.title}
                        </h3>

                        <div className="space-y-3 text-base text-[#59615D] dark:text-[#A0B0BC]">
                          <p className="break-words">
                            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">症状: </span>
                            {ac.symptoms}
                          </p>
                          <p className="break-words">
                            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">施術経過: </span>
                            {ac.treatmentAndCourse}
                          </p>
                        </div>

                        {ac.usedAcupoints.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                              使用ツボ:
                            </span>
                            {ac.usedAcupoints.map(pt => (
                              <span
                                key={pt}
                                className="text-sm px-1.5 py-0.2 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5]"
                              >
                                {pt}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => handleSaveItem({
                            id: ac.id,
                            title: ac.title,
                            summary: ac.summary,
                            points: ac.usedAcupoints
                          })}
                          className={`min-h-11 text-sm font-bold flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                            isSaved
                              ? "bg-emerald-50 dark:bg-[#142820] text-emerald-700 dark:text-emerald-300 border-emerald-300"
                              : "bg-[#FAF8F5] dark:bg-[#1A2632] text-[#59615D] dark:text-[#96A6B2] border-[#E5DEC9] dark:border-[#2A3B4A] hover:text-[#1E3D34]"
                          }`}
                        >
                          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          <span>{isSaved ? "カルテ保存済" : "配穴ストック"}</span>
                        </button>

                        <div className="flex flex-wrap gap-1">
                          {ac.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-sm px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>}

        {activeTab === "all" && <div className="[&_p]:text-base [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:text-sm"><MedicalSafetyNotice title="症例アーカイブの掲載は保留中です" message={ARCHIVE_CASES_NOTICE} /></div>}

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
