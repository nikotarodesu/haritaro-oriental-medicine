"use client";

import { useState, useMemo, useEffect } from "react";
import { matchesSearchText } from '@/utils/search';
import Link from "next/link";
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  GraduationCap, 
  FileText, 
  ChevronRight, 
  Activity, 
  ArrowRight,
  ArrowUp,
  MapPin,
  Focus,
  FlaskConical,
  ScanText,
  X,
} from "lucide-react";
import { VERIFIED_PAPERS as PAPERS_DATABASE } from "@/data/references/papersData";
import { PAPER_STUDY_DESIGNS } from "@/data/references/paperStudyDesigns";
import { CLASSICAL_TEXTS } from "@/data/classicalTextsData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import MedicalSafetyNotice from "@/components/MedicalSafetyNotice";
import { PUBLIC_ARCHIVE_CASES, ARCHIVE_CASES_NOTICE } from "@/data/cases/archiveCases";
import PageIntro from "@/components/design/PageIntro";
import { ACUPUNCTURE_RESEARCH, AROMATASE_JOINT_PAIN_RESEARCH_HREF, NINE_NEEDLES_GUIDE } from "@/config/acupunctureLearning";
import PaperStudyFlow from "./PaperStudyFlow";

const abstractCount = PAPERS_DATABASE.filter(paper => paper.verificationScope === 'abstract').length;
const fullTextCount = PAPERS_DATABASE.filter(paper => paper.verificationScope === 'selected_full_text').length;
const bibliographyOnlyCount = PAPERS_DATABASE.length - abstractCount - fullTextCount;
const itemAnchors = new Set([
  ...PAPERS_DATABASE.map(({ id }) => `paper-${id}`),
  ...CLASSICAL_TEXTS.map(({ id }) => `classic-${id}`),
  ...PUBLIC_ARCHIVE_CASES.map(({ id }) => `archive-${id}`),
]);

export default function LibraryClient() {

  const [activeTab, setActiveTab] = useState<"all" | "papers" | "classics" | "cases" | "archives">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [linkedItem, setLinkedItem] = useState<string>();

  useEffect(() => {
    let frame = 0;
    const revealLinkedItem = () => {
      cancelAnimationFrame(frame);
      const id = window.location.hash.slice(1);
      const found = itemAnchors.has(id);
      setLinkedItem(found ? id : undefined);
      if (!found) return;
      setActiveTab('all');
      setSearchQuery('');
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          const entry = document.getElementById(id);
          const disclosure = entry?.querySelector<HTMLDetailsElement>('details.library-results')
            ?? entry?.querySelector<HTMLDetailsElement>('details[data-library-source]');
          if (disclosure) disclosure.open = true;
          entry?.scrollIntoView({ block: 'start' });
          entry?.querySelector('h3')?.focus({ preventScroll: true });
        });
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
  const searchAgain = <a href="#library-search-panel" className="ui-text-link text-sm"><ArrowUp size={16} aria-hidden="true" />資料の検索に戻る</a>;

  return (
    <div className="page-layout text-base leading-relaxed">
      <PageIntro title="文献・古典・症例教材" description="研究の方法や結果、古典の引用箇所、学習用の症例を探せます。" art="reading" compact>
        <Link href={ACUPUNCTURE_RESEARCH.href} className="page-secondary-action mt-4"><FlaskConical aria-hidden="true" />{ACUPUNCTURE_RESEARCH.title}</Link>
      </PageIntro>
      <section id="library-search-panel" tabIndex={-1} aria-label="資料を探す" className="library-discovery scroll-mt-28 rounded-2xl border border-[#E5DEC9] bg-[#FCFAF6] p-4 dark:border-[#2A3B4A] dark:bg-[#17212A] sm:p-6">
          <div className="library-search">
            <div className="library-search-label">
              <label htmlFor="library-search" className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">資料を検索</label>
              <p id="library-search-hint" className="text-sm text-[#59615D] dark:text-[#A0B0BC]">例：膝痛、足三里、素問</p>
            </div>
            <div className="relative">
              <Search className="w-5 h-5 text-[#737C77] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="library-search"
                type="search"
                aria-describedby="library-search-hint"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="キーワードを入力"
                className="w-full min-h-11 pl-10 pr-14 py-3 rounded-lg text-base bg-[#FFFFFF] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] placeholder-[#737C77] focus:outline-none focus:border-[#1E3D34] focus:ring-2 focus:ring-[#1E3D34]/20"
              />
              {searchQuery.length > 0 && <button type="button" aria-label="検索をクリア" onClick={() => setSearchQuery('')} className="absolute right-1 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#E8EFEA] dark:hover:bg-[#182823]"><X className="h-5 w-5" aria-hidden="true" /></button>}
            </div>
          </div>
        <div role="group" aria-label="資料の分類" className="library-category-filters text-sm">
          {[
            { id: "all", label: "すべて", count: totalResults },
            { id: "papers", label: "論文", count: filteredPapers.length },
            { id: "classics", label: "古典", count: filteredClassics.length },
            { id: "cases", label: "症例", count: filteredCases.length },
            ...(PUBLIC_ARCHIVE_CASES.length > 0 ? [{ id: "archives", label: "症例記録", count: filteredArchives.length }] : []),
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={activeTab === tab.id}
              style={{ minHeight: 44 }}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`library-category-button rounded-xl border font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-[#1E3D34] border-[#1E3D34] text-white dark:bg-[#2B6958] dark:border-[#2B6958]"
                  : "bg-[#FCFAF6] dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#E8EFEA] dark:hover:bg-[#182823]"
              }`}
            >
              {tab.id === "papers" ? <GraduationCap aria-hidden="true" className="h-5 w-5" /> : tab.id === "classics" ? <BookOpen aria-hidden="true" className="h-5 w-5" /> : tab.id === "cases" || tab.id === "archives" ? <FileText aria-hidden="true" className="h-5 w-5" /> : <Search aria-hidden="true" className="h-5 w-5" />}<span>{tab.label}</span>
              <span className="text-sm opacity-90">({tab.count})</span>
            </button>
          ))}
        </div>

        <div className="library-result-summary">
          <h2 aria-live="polite" aria-atomic="true" className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">検索結果：{visibleResultCount}件</h2>
          <details className="reference-disclosure library-source-disclosure">
            <summary>引用元と確認した箇所</summary>
            <div className="reference-disclosure-body">
              <p>論文は、著者名・題名・掲載誌が出典と合っているかを確かめています。古典は『素問』『霊枢』『難経』などのどこを参照したかを記載しています。</p>
              <p>
                掲載論文のうち、{abstractCount}件は抄録、{fullTextCount}件は本文の一部まで確認しています。
                {bibliographyOnlyCount > 0 && `${bibliographyOnlyCount}件は書誌情報を確認しています。`}
              </p>
              <p>専門家による監修は完了していません。<Link href="/editorial-policy" className="underline">出典の確認方法と監修の状況</Link></p>
            </div>
          </details>
        </div>
      </section>

      <div className="py-4 sm:py-6 space-y-6">

        {visibleResultCount === 0 && <section aria-labelledby="library-empty-title" className="rounded-xl bg-[#FCFAF6] dark:bg-[#17212A] p-5 sm:p-6 space-y-3">
          <h2 id="library-empty-title" className="font-serif text-xl font-bold">該当する資料がありません</h2>
          <p className="text-base text-[#59615D] dark:text-[#A0B0BC]">{searchQuery.trim() ? 'キーワードを変えるか、検索をクリアして資料を探してください。' : 'この分類に掲載中の資料はありません。ほかの分類もご覧ください。'}</p>
          <div className="flex flex-wrap gap-3">
            {searchQuery.length > 0 && <button type="button" onClick={() => setSearchQuery('')} className="inline-flex min-h-11 items-center rounded-lg bg-[#1E3D34] px-4 py-2 text-sm font-bold text-white dark:bg-[#2B6958]">検索をクリア</button>}
            {activeTab !== 'all' && <button type="button" onClick={() => { setActiveTab('all'); setSearchQuery(''); }} className="inline-flex min-h-11 items-center rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] px-4 py-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">すべての資料を見る</button>}
          </div>
        </section>}

        {activeTab === "archives" && <div className="[&_p]:text-base [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:text-sm"><MedicalSafetyNotice title="症例演習の教材について" message={ARCHIVE_CASES_NOTICE} /></div>}

        {/* コンテンツエリア */}
        {visibleResultCount > 0 && <div className="space-y-8">
          
          {/* セクション 1: 現代RCT論文 */}
          {(activeTab === "all" || activeTab === "papers") && filteredPapers.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    研究論文
                  </h2>
                </div>
                <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  {filteredPapers.length} 件
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredPapers.map(paper => {
                  const design = PAPER_STUDY_DESIGNS[paper.id];
                  const outline = (
                    <dl className="library-study-outline">
                      <div className="library-study-part">
                        <dt><Focus aria-hidden="true" /><span>対象</span></dt>
                        <dd>{paper.targetCondition}</dd>
                      </div>
                      {paper.studyDesign && <div className="library-study-part">
                        <dt><FlaskConical aria-hidden="true" /><span>方法</span></dt>
                        <dd>
                          {paper.studyDesign}
                          {paper.interventionProtocol && <p className="mt-2">{paper.interventionProtocol.name}（使用したツボは{paper.interventionProtocol.acupoints.join("、")}）</p>}
                        </dd>
                      </div>}
                      <div className="library-study-part">
                        <dt><ScanText aria-hidden="true" /><span>概要</span></dt>
                        <dd>{paper.primaryOutcomes}</dd>
                      </div>
                    </dl>
                  );
                  return (
                    <div
                      key={paper.id}
                      id={`paper-${paper.id}`}
                      className="library-paper-card scroll-mt-28 target:ring-2 target:ring-[#B86924] bg-[#FCFAF6] dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 space-y-4 flex flex-col justify-between hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="library-confirmation-scope">
                            {paper.verificationScope === 'abstract' ? '抄録を参照' : paper.verificationScope === 'selected_full_text' ? '本文の一部を参照' : '書誌情報のみ'}
                          </span>
                          <span className="text-sm text-[#59615D] dark:text-[#A0B0BC]">
                            {paper.journal} ({paper.year})
                          </span>
                        </div>

                        <div>
                          <h3 tabIndex={-1} className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                            {paper.japaneseTitle}
                          </h3>
                          {linkedItem === `paper-${paper.id}` && searchAgain}
                        </div>

                        {design ? (
                          <>
                            <PaperStudyFlow paperId={paper.id} design={design} />
                            <details className="reference-disclosure library-bibliography">
                              <summary>試験方法の補足</summary>
                              <div className="reference-disclosure-body">{outline}</div>
                            </details>
                          </>
                        ) : outline}

                        {paper.claimsStatus === 'source-checked' && <details className="reference-disclosure library-results">
                          <summary>結果と限界</summary>
                          <div className="reference-disclosure-body">
                            {paper.keyFindings.length > 0 && <div>
                              <h4 className="font-bold">報告された結果</h4>
                              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                {paper.keyFindings.map(finding => <li key={finding}>{finding}</li>)}
                              </ul>
                            </div>}
                            <div className="library-study-limitations">
                              <h4 className="font-bold">この研究で分かる範囲</h4>
                              {paper.clinicalTakeaways.map(limitation => <p key={limitation}>{limitation}</p>)}
                            </div>
                          </div>
                        </details>}

                        <details className="reference-disclosure library-bibliography" data-library-source>
                          <summary>著者・掲載誌と、確認した箇所</summary>
                          <div className="reference-disclosure-body">
                            <p>{paper.title}</p>
                            {paper.authors.length > 0 && <p>{paper.authors.join(", ")}</p>}
                            <p>{paper.journal} ({paper.year})</p>
                            {paper.sourceLocator && <p>
                              <strong>確認した箇所 </strong>
                              {paper.sourceLocator}（確認日 {paper.claimsCheckedAt}）
                            </p>}
                            {paper.sourceCheckedAt && <p>書誌確認日：<time dateTime={paper.sourceCheckedAt}>{paper.sourceCheckedAt}</time></p>}
                            {!!paper.relatedSources?.length && <ul className="space-y-1">
                              {paper.relatedSources.map(source => <li key={source.url}>
                                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 underline">
                                  {source.title}<ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                                </a>
                              </li>)}
                            </ul>}
                            {paper.id === "cancer-pain-electroacupuncture-auricular-peace-trial-mao-2021" && (
                              <p><Link href={AROMATASE_JOINT_PAIN_RESEARCH_HREF} className="ui-text-link">対象を乳がん治療中の関節痛に絞った別の試験</Link></p>
                            )}
                          </div>
                        </details>
                      </div>

                      <div className="pt-3 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex flex-wrap items-center justify-between gap-3">

                        {(paper.sourceUrl || paper.pmid || paper.doi) && (
                          <a
                            href={paper.sourceUrl || (paper.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/` : `https://doi.org/${paper.doi}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-11 text-sm text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline inline-flex items-center gap-1"
                          >
                            <span>{paper.sourceUrl ? '確認に使った論文を開く' : '論文の掲載情報を開く'}</span>
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

              <p className="text-base leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">古典の考え方を学ぶ資料です。{CLASSICAL_TEXTS.filter(classic => classic.verifiedQuotation).length}件に、引用と照合に使った資料を掲載しています。伝統的な配穴意図と、現代の疾患に対する治療効果は分けて読みます。</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClassics.map(classic => {
                  const quotation = classic.verifiedQuotation;
                  const imageChecked = quotation?.verificationScope === 'facsimile';
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
                          <h3 tabIndex={-1} className="min-w-0 max-w-full break-words font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                            {classic.theme}
                          </h3>
                          {linkedItem === `classic-${classic.id}` && searchAgain}
                        </div>

                        {classic.id === 'classic-reisu-01' && <Link href={NINE_NEEDLES_GUIDE.href} className="ui-text-link">古代の九鍼を図で見る <ArrowRight size={16} aria-hidden="true" /></Link>}

                        <div className="space-y-4">
                          {!imageChecked && (
                            <div>
                              <span className="text-sm font-bold text-[#737C77] dark:text-[#8899A6] block mb-0.5">掲載条文（原典との一致は未確認）：</span>
                              <p className="font-serif text-base text-[#232826] dark:text-[#FAF8F5] leading-relaxed break-words">
                                {classic.originalPublicationStatus === 'withheld_pending_verification' ? '原文を読みたいときは、下の参照先から確認できます。' : classic.original}
                              </p>
                            </div>
                          )}
                          {classic.reading && (
                            <details className="border-t border-[#EFE8D8]/70 dark:border-[#25323E] pt-2">
                              <summary className="min-h-11 py-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] cursor-pointer">訓読・書き下し：</summary>
                              <p className="font-serif text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                                {classic.reading}
                              </p>
                            </details>
                          )}
                          {quotation && (
                            <section className="border-t border-[#EFE8D8]/70 dark:border-[#25323E] pt-3 space-y-2" aria-label="引用と出典">
                              <h4 className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">{imageChecked ? '刊本画像で照合した引用' : '電子本文からの引用（底本画像は未確認）'}</h4>
                              <blockquote className="font-serif text-base leading-relaxed break-words">{quotation.text}</blockquote>
                              <details className="text-sm leading-relaxed">
                                <summary className="min-h-11 py-2 font-bold cursor-pointer">資料・版・頁の詳細</summary>
                                <dl className="space-y-2">
                                  <div><dt className="inline font-bold">資料・該当箇所：</dt><dd className="inline">{quotation.sourceTitle} — {quotation.section}</dd></div>
                                  <div><dt className="inline font-bold">版情報：</dt><dd className="inline">{quotation.edition || '未確認'}</dd></div>
                                  <div><dt className="inline font-bold">頁標識：</dt><dd className="inline">{quotation.page || '未確認'}</dd></div>
                                  <div><dt className="inline font-bold">{imageChecked ? '刊本画像の確認日：' : '電子本文の確認日：'}</dt><dd className="inline">{quotation.checkedAt}</dd></div>
                                </dl>
                              </details>
                              <p className="text-base leading-relaxed">{quotation.limitation}</p>
                              <a href={quotation.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold underline">
                                {imageChecked ? '引用元の刊本画像を見る' : '引用元の電子本文を見る'}<ExternalLink className="h-3 w-3" aria-hidden="true" />
                              </a>
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
                          症例演習 · {c.category}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] transition-colors leading-snug">
                        {c.title}
                      </h3>

                      <p className="text-base text-[#59615D] dark:text-[#A0B0BC] break-words leading-relaxed">
                        主訴: {c.patient.chiefComplaint} ({c.patient.gender} {c.patient.age})
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E5DEC9]/40 flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-[#B86924] dark:text-[#E6C387]">
                      <span>症例を読む</span>
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

                        <h3 tabIndex={-1} className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                          {ac.title}
                        </h3>
                        {linkedItem === `archive-${ac.id}` && searchAgain}

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

        {activeTab === "all" && <div className="[&_p]:text-base [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:text-sm"><MedicalSafetyNotice title="症例演習の教材について" message={ARCHIVE_CASES_NOTICE} /></div>}


      </div>

    </div>
  );
}
