import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { ArrowRight } from "lucide-react";
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
  const firstCase = CLINICAL_CASES[0];
  return (
    <div className="page-layout clinical-case-catalog space-y-8 sm:space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        "/cases", title, description, "症例一覧", CLINICAL_CASES.map(({ id, title }) => ({ href: `/cases/${id}`, name: title })),
      ) }} />
      <PageBreadcrumb items={[{ href: SERIES.practice.href, name: SERIES.practice.shortName }, { href: "/cases", name: title }]} />

      <PageIntro eyebrow="鍼灸学生・鍼灸師向け" title={title} description={description} art="practice">
        <div className="page-actions">
          <CaseStudyResume studies={CASE_STUDY_DESCRIPTORS} className="w-full" fallback={firstCase && (
            <Link href={`/cases/${firstCase.id}`} className="page-primary-action">頭痛の模擬症例を読む<ArrowRight size={18} aria-hidden="true" /></Link>
          )} />
          <a href="#case-catalog" className="page-secondary-action">模擬症例を一覧で見る</a>
        </div>
      </PageIntro>

      <aside aria-label="症例演習の注意" className="rounded-xl border border-frame bg-panel px-3 text-sm sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          <p className="py-2 font-medium">すべて学習用の架空症例です。</p>
          <Link href="/safety" className="ui-text-link inline-flex min-h-11 items-center">受診の目安と鍼灸の安全性</Link>
        </div>
        <details className="border-t border-divider">
          <summary className="min-h-11 cursor-pointer content-center py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2">症例演習で扱う範囲</summary>
          <p className="pb-3 leading-relaxed text-muted">
            実際の診断や施術については、担当する医療従事者の指導に従ってください。
          </p>
        </details>
      </aside>

      <section id="case-catalog" tabIndex={-1} className="scroll-mt-28 space-y-4" aria-labelledby="case-catalog-title">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <h2 id="case-catalog-title" className="font-bold text-lg text-ink">
            模擬症例の一覧
          </h2>
          <a href={`#${CASE_COURSE_COMPARISON_ANCHOR}`} className="ui-text-link inline-flex min-h-11 items-center gap-1 text-sm">
            同じ症状の2例を比べる<ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        <CaseCatalog entries={CLINICAL_CASES.map((c) => ({
          caseNumber: c.caseNumber,
          card: (
            <Link
              className="page-link-card page-link-card--stack clinical-case-catalog-card"
              href={`/cases/${c.id}`}
              aria-labelledby={`${c.id}-title`}
            >
              <div className="flex w-full items-start justify-between gap-2">
                <h3 id={`${c.id}-title`} className="text-lg font-bold leading-snug text-ink">
                  {c.title}
                </h3>
                <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
              </div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                <span className="font-semibold">難易度 {c.difficulty}</span>
                <span className="whitespace-nowrap">症例 {String(c.caseNumber).padStart(2, "0")}</span>
                <span>{c.patient.age}・{c.patient.gender}</span>
              </p>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                「{c.patient.chiefComplaint}」
              </p>
            </Link>
          ),
        }))} />

      </section>

      <CaseCourseComparison />

      <div id="revision-training" className="clinical-case-revision-link">
        <p>追加情報で判断を見直す練習もできます。</p>
        <Link href="/simulator#revision-training" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">見立て修正の演習へ<ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <nav aria-label="関連する演習" className="flex flex-wrap gap-x-6 gap-y-1">
        <Link href="/simulator#condition-training" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">条件を変えて弁証を練習する</Link>
        <Link href="/practice/haiketsu" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">配穴を練習する</Link>
        <Link href="/diagnosis" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">気血水の体質チェック（学習用）</Link>
      </nav>
    </div>
  );
}
