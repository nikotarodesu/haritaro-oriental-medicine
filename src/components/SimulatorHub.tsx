"use client";

import React from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { Layers, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import ProgressiveCaseTraining from "@/components/learning/ProgressiveCaseTraining";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";
import ClinicalToolBridge from "@/components/clinical/ClinicalToolBridge";
import ClinicalRevisionTraining from "@/components/clinical/ClinicalRevisionTraining";
import type { ArticlePreview } from "@/data/articleData";

export default function SimulatorHub({ relatedArticles }: { relatedArticles: ArticlePreview[] }) {
  return (
    <div className="space-y-8 sm:space-y-12">
      <ClinicalToolBridge />
      <PageIntro compact eyebrow="所見から判断する練習" title="臨床弁証シミュレーター" art="practice" description="架空症例を考える、条件を選んで比べる。取り組みたい演習から始められます。">
        <div className="page-actions">
          <a href="#case-training" className="page-primary-action"><BookOpen aria-hidden="true" className="h-4 w-4" />症例から練習する<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
          <a href="#condition-training" className="page-secondary-action"><Layers aria-hidden="true" className="h-4 w-4" />条件を選んで考える</a>
        </div>
      </PageIntro>
      <details className="page-help">
        <summary>演習で確認できること</summary>
        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          八綱、気血水、臓腑経絡の条件を順に選ぶと、
          選んだ条件に応じた<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「一文の証」</strong>と、
          <strong className="text-[#1E3D34] dark:text-[#74BA9E]">「配穴の学習例」</strong>を表示します。確認した所見、候補に合わない所見、足りない情報を比べる教材で、選択結果だけでは診断や施術方針は決まりません。
        </p>

      </details>

      <section id="case-training" className="scroll-mt-28"><ProgressiveCaseTraining /></section>

      {/* 臨床弁証シミュレーター本体 */}
      <section id="condition-training" className="scroll-mt-28"><ThreeStageSimulator /></section>

      <section aria-labelledby="simulator-research-heading" className="border-t border-[var(--border-washi)] pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 id="simulator-research-heading" className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              八綱・気血水・臓腑経絡の学習と現代研究
            </h2>
            <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#96A6B2] max-w-2xl">
              伝統医学の分類と現代科学の概念を比較する解説です。対応関係は教育上の整理であり、生理学的な同一性の証明ではありません。
            </p>
          </div>

          <nav aria-label="伝統理論と研究の関連記事" className="flex flex-wrap items-center gap-x-5 gap-y-1 shrink-0 sm:max-w-sm">
            {relatedArticles.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="inline-flex min-h-11 max-w-full items-center gap-1.5 text-left text-sm text-[#1E3D34] dark:text-[#74BA9E] underline underline-offset-4"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>{article.title}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <ClinicalRevisionTraining />
      {/* 臨床学習・医師法に関する免責事項 */}
      <aside aria-labelledby="simulator-scope-heading" className="border-t border-[var(--border-washi)] pt-5 flex items-start gap-3 text-sm text-[#59615D] dark:text-[#96A6B2]">
        <AlertCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 id="simulator-scope-heading" className="font-semibold text-[#232826] dark:text-[#FAF8F5]">演習を利用するときの注意</h2>
          <p className="leading-relaxed">
            本シミュレーターは鍼灸師・臨床家および学生の弁証推論（八綱・気血水・臓腑経絡の体系的理解）学習を支援するための教育ツールです。個別の患者に対する確定診断や医療行為（医行為）を提供するものではありません。実際の臨床・施術にあたっては、施術者自身の専門的判断および関係法規（医師法、あはき法等）を遵守してください。
          </p>
        </div>
      </aside>
    </div>
  );
}
