"use client";

import { useState, useMemo } from "react";
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
  Sparkles, 
  Activity, 
  Crown, 
  Lock,
  ArrowRight,
  Filter,
  Layers,
  MapPin,
} from "lucide-react";
import { PAPERS_DATABASE, PaperReference } from "@/data/references/papersData";
import { CLASSICAL_TEXTS, ClassicalText } from "@/data/classicalTextsData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { ALL_ARCHIVE_CASES, ArchiveClinicalCase } from "@/data/cases/archiveCases";
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
  const [activeTab, setActiveTab] = useState<"all" | "papers" | "classics" | "cases" | "archives">("all");
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

  const filteredArchives = useMemo(() => {
    if (!searchQuery.trim()) return ALL_ARCHIVE_CASES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_ARCHIVE_CASES.filter(ac => 
      ac.title.includes(q) ||
      ac.category.includes(q) ||
      ac.location.includes(q) ||
      ac.symptoms.includes(q) ||
      ac.treatmentAndCourse.includes(q) ||
      ac.usedAcupoints.some(pt => pt.includes(q)) ||
      ac.tags.some(t => t.includes(q))
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
              <span>古典医典 ✕ 現代RCTエビデンス ✕ 臨床実例</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]">
              臨床文献ナレッジベース
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5]">
              文献・古典・臨床実例アーカイブ
            </h1>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-3xl leading-relaxed">
              数千年の叡智が凝縮された古典条文（素問・霊枢・難経）と、国際学術誌の最新RCT論文、さらに運動器疾患・自律神経実例32例をシームレスに統合。臨床の理論的根拠と実践力を確かなものにします。
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
                placeholder="症状（膝痛、不眠、坐骨神経痛）、ツボ名（太衝、足三里）、古典名で検索..."
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
            { id: "all", label: "すべての資料", count: filteredPapers.length + filteredClassics.length + filteredCases.length + filteredArchives.length },
            { id: "papers", label: "現代RCT・論文エビデンス", count: filteredPapers.length },
            { id: "classics", label: "古典医典条文・解釈", count: filteredClassics.length },
            { id: "cases", label: "弁証思考症例 (20例)", count: filteredCases.length },
            { id: "archives", label: "運動器・局所実例 (32例)", count: filteredArchives.length },
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
                          <p className="text-xs text-[#737C77] dark:text-[#8899A6] italic mt-1 line-clamp-1">
                            {paper.title}
                          </p>
                        </div>

                        <div className="space-y-1.5 text-xs text-[#59615D] dark:text-[#96A6B2]">
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
                          <p className="line-clamp-2 bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-xl border border-[#E5DEC9]/40 dark:border-[#2A3B4A]/40 text-[11px] leading-relaxed">
                            {paper.primaryOutcomes}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleSaveItem({
                            id: paper.id,
                            title: paper.japaneseTitle,
                            summary: paper.primaryOutcomes,
                            points: paper.interventionProtocol?.acupoints
                          })}
                          className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
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
                            className="text-xs text-[#B86924] dark:text-[#E6C387] font-bold hover:underline inline-flex items-center gap-1"
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
          {(activeTab === "all" || activeTab === "classics") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    古典医典条文・現代臨床解釈
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
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            『{classic.book}』{classic.chapter}
                          </span>
                          <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                            {classic.theme}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#FCFBF8] dark:bg-[#141C24] border border-[#EFE8D8] dark:border-[#25323E] space-y-2">
                          <p className="font-serif text-sm text-[#232826] dark:text-[#FAF8F5] leading-relaxed tracking-wide">
                            {classic.original}
                          </p>
                          <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#EFE8D8] dark:border-[#25323E] pt-2">
                            {classic.translation}
                          </p>
                        </div>

                        <div className="text-xs text-[#59615D] dark:text-[#96A6B2] bg-[#EBF3EF]/40 dark:bg-[#182823]/40 p-2.5 rounded-xl border border-[#C5DED4]/40 dark:border-[#2A5243]/40">
                          <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
                            💡 臨床応用:
                          </span>
                          <span>{classic.clinicalApplication}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleSaveItem({
                            id: classic.id,
                            title: `『${classic.book}』${classic.theme}`,
                            summary: classic.clinicalApplication
                          })}
                          className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
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
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
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
          {(activeTab === "all" || activeTab === "cases") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    東洋医学 弁証思考症例（全20症例）
                  </h2>
                </div>
                <Link
                  href="/cases"
                  className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1"
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

          {/* セクション 4: 運動器・自律神経実例アーカイブ (32例) */}
          {(activeTab === "all" || activeTab === "archives") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    運動器疾患・自律神経 臨床実例アーカイブ（全32症例）
                  </h2>
                </div>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  {filteredArchives.length} 件
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArchives.map(ac => {
                  const isSaved = savedIds.includes(ac.id);
                  return (
                    <div
                      key={ac.id}
                      className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:border-emerald-600 dark:hover:border-emerald-500 transition-all"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {ac.category}
                          </span>
                          <span className="text-[10px] text-[#737C77] flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {ac.location}｜{ac.patient.ageGroup} {ac.patient.gender}
                          </span>
                        </div>

                        <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                          {ac.title}
                        </h3>

                        <div className="space-y-1 text-xs text-[#59615D] dark:text-[#96A6B2]">
                          <p className="line-clamp-2">
                            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">症状: </span>
                            {ac.symptoms}
                          </p>
                          <p className="line-clamp-2">
                            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">施術経過: </span>
                            {ac.treatmentAndCourse}
                          </p>
                        </div>

                        {ac.usedAcupoints.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                              使用ツボ:
                            </span>
                            {ac.usedAcupoints.map(pt => (
                              <span
                                key={pt}
                                className="text-[10px] px-1.5 py-0.2 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5]"
                              >
                                {pt}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleSaveItem({
                            id: ac.id,
                            title: ac.title,
                            summary: ac.summary,
                            points: ac.usedAcupoints
                          })}
                          className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
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
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
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
