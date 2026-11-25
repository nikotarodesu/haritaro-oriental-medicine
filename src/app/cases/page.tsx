import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { PageSymbol } from "@/components/design/PageArtwork";
import { AlertCircle, ArrowRight } from "lucide-react";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { CASE_STUDY_DESCRIPTORS } from "@/data/cases/caseStudyCatalog";
import { collectionPageJsonLd } from "@/config/seo";
import { SERIES } from "@/config/series";
import CaseCatalog from "@/components/cases/CaseCatalog";
import CaseCourseComparison from "@/components/cases/CaseCourseComparison";
import CaseStudyResume from "@/components/cases/CaseStudyResume";
import { CASE_COURSE_COMPARISON_ANCHOR } from "@/utils/caseStudyNavigation";

const title = "症例演習";
const description = "模擬症例の主訴と経過、四診の所見を読み、どの記述を根拠に見立てやツボを選ぶか考えます。選んだ後に、解答例と理由を読めます。";

export default function CasesIndexPage() {
  const totalCaseCount = CLINICAL_CASES.length;
  const firstCase = CLINICAL_CASES[0];
  return (
    <div className="page-layout clinical-case-catalog space-y-8 sm:space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        "/cases", title, description, "症例一覧", CLINICAL_CASES.map(({ id, title }) => ({ href: `/cases/${id}`, name: title })),
      ) }} />
      <PageBreadcrumb items={[{ href: SERIES.practice.href, name: SERIES.practice.shortName }, { href: "/cases", name: title }]} />

      <PageIntro eyebrow={`全${totalCaseCount}症例・所見から考える練習`} title={title} description={description} art="practice">
        <div className="page-actions">
          {firstCase && <Link href={`/cases/${firstCase.id}`} className="page-primary-action">最初の症例から始める<ArrowRight size={18} aria-hidden="true" /></Link>}
          <a href="#case-catalog" className="page-secondary-action">症状から症例を探す</a>
        </div>
      </PageIntro>

      <CaseStudyResume studies={CASE_STUDY_DESCRIPTORS} />

      <section id="case-catalog" tabIndex={-1} className="scroll-mt-28 space-y-4" aria-labelledby="case-catalog-title">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <h2 id="case-catalog-title" className="font-bold text-lg text-ink">
            全{totalCaseCount}症例一覧
          </h2>
          <a href={`#${CASE_COURSE_COMPARISON_ANCHOR}`} className="ui-text-link inline-flex min-h-11 items-center gap-1 text-sm">
            同じ症状の2例を比べる<ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        <CaseCatalog entries={CLINICAL_CASES.map((c) => ({
          caseNumber: c.caseNumber,
          card: (
            <Link
              className="page-link-card page-link-card--stack group justify-between"
              href={`/cases/${c.id}`}
            >
              <div className="space-y-3">
                {/* ヘッダーバッジ */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-muted">
                      症例 {c.caseNumber < 10 ? `0${c.caseNumber}` : c.caseNumber}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      c.difficulty === "初級" 
                        ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300"
                        : c.difficulty === "中級"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300"
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>

                </div>

                <div className="flex items-center gap-3">
                  <span className="page-link-icon"><PageSymbol kind="practice" /></span>
                  <span className="text-sm font-semibold text-warm">{c.category}</span>
                </div>

                {/* タイトル */}
                <h3 className="font-serif text-lg font-bold text-ink group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  {c.title}
                </h3>

                {/* 主訴プレビュー */}
                <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                  「{c.patient.chiefComplaint}」
                </p>
              </div>

              {/* フッター情報 ＆ 導線CTA */}
              <div className="border-t border-divider pt-3.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-muted">
                  {c.patient.age}・{c.patient.gender}
                </span>
                
                <span className="font-bold text-accent flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  演習を始める <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ),
        }))} />

        {/* 症例演習に関する留意事項・免責 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-panel border border-frame flex items-start gap-3 text-xs text-muted">
          <AlertCircle className="w-4 h-4 text-warm shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-ink">
              症例演習で扱う範囲
            </p>
            <p className="leading-relaxed">
              全20例は東洋医学の考え方を学ぶための架空症例です。実際の診断や施術については、担当する医療従事者の指導に従ってください。
            </p>
          </div>
        </div>
      </section>

      <CaseCourseComparison />

      <div id="revision-training" className="clinical-case-revision-link">
        <p>追加情報で判断を見直す練習もできます。</p>
        <Link href="/simulator#revision-training" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">見立て修正の演習へ<ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <nav aria-label="関連する演習" className="flex flex-wrap gap-x-6 gap-y-1">
        <Link href="/simulator" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">弁証演習へ</Link>
        <Link href="/practice/haiketsu" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">配穴演習へ</Link>
        <Link href="/diagnosis" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">気血水 体質チェックへ</Link>
      </nav>
    </div>
  );
}
