import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
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
const description = "模擬症例の訴え・経過・四診の所見を読み、何を根拠に見立て、どのツボを選ぶか考えます。回答すると解答例と理由を読めます。";

export default function CasesIndexPage() {
  const totalCaseCount = CLINICAL_CASES.length;
  const firstCase = CLINICAL_CASES[0];
  return (
    <div className="page-layout clinical-case-catalog space-y-8 sm:space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        "/cases", title, description, "症例一覧", CLINICAL_CASES.map(({ id, title }) => ({ href: `/cases/${id}`, name: title })),
      ) }} />
      <PageBreadcrumb items={[{ href: SERIES.practice.href, name: SERIES.practice.shortName }, { href: "/cases", name: title }]} />

      <PageIntro eyebrow="鍼灸学生・鍼灸師向け" title={title} description={description} art="practice">
        <div className="page-actions">
          {firstCase && <Link href={`/cases/${firstCase.id}`} className="page-primary-action">頭痛の模擬症例を読む<ArrowRight size={18} aria-hidden="true" /></Link>}
          <a href="#case-catalog" className="page-secondary-action">模擬症例を一覧で見る</a>
        </div>
      </PageIntro>

      <CaseStudyResume studies={CASE_STUDY_DESCRIPTORS} />

      <section id="case-catalog" tabIndex={-1} className="scroll-mt-28 space-y-4" aria-labelledby="case-catalog-title">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <h2 id="case-catalog-title" className="font-bold text-lg text-ink">
            模擬症例の一覧（全{totalCaseCount}例）
          </h2>
          <a href={`#${CASE_COURSE_COMPARISON_ANCHOR}`} className="ui-text-link inline-flex min-h-11 items-center gap-1 text-sm">
            同じ症状の2例を比べる<ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        <CaseCatalog entries={CLINICAL_CASES.map((c) => ({
          caseNumber: c.caseNumber,
          card: (
            <Link
              className="page-link-card page-link-card--stack group justify-between border-frame"
              href={`/cases/${c.id}`}
              aria-labelledby={`${c.id}-title ${c.id}-action`}
            >
              <div className="space-y-3">
                <h3 id={`${c.id}-title`} className="text-lg font-bold leading-snug text-ink">
                  {c.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span className="font-semibold">難易度 {c.difficulty}</span>
                  <span className="whitespace-nowrap">症例 {String(c.caseNumber).padStart(2, "0")}</span>
                </div>
                <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                  「{c.patient.chiefComplaint}」
                </p>
              </div>

              {/* フッター情報 ＆ 導線CTA */}
              <div className="border-t border-divider pt-3.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-muted">
                  {c.patient.age}・{c.patient.gender}
                </span>
                
                <span id={`${c.id}-action`} className="font-bold text-accent flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  症例を読む <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
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
              全{totalCaseCount}例は東洋医学の考え方を学ぶための架空症例です。実際の診断や施術については、担当する医療従事者の指導に従ってください。
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
        <Link href="/simulator" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">弁証（所見から見立てる）</Link>
        <Link href="/practice/haiketsu" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">配穴を練習する</Link>
        <Link href="/diagnosis" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">気血水の体質チェック（学習用）</Link>
      </nav>
    </div>
  );
}
