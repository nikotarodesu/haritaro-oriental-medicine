"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import ProgressiveCaseTraining from "@/components/learning/ProgressiveCaseTraining";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";
import ClinicalToolBridge from "@/components/clinical/ClinicalToolBridge";
import ClinicalRevisionTraining from "@/components/clinical/ClinicalRevisionTraining";
import ClinicalComparisonExamples from "@/components/learning/ClinicalComparisonExamples";
import type { ArticlePreview } from "@/data/articleData";

const TRAINING_TABS = [
  { id: "case-training", label: "症例演習", description: "症例から順に考える" },
  { id: "condition-training", label: "条件選択", description: "条件を変えて比べる" },
  { id: "revision-training", label: "見立て修正", description: "合わない所見を見直す" },
] as const;
type TrainingTab = typeof TRAINING_TABS[number]["id"];

export default function SimulatorHub({ relatedArticles }: { relatedArticles: ArticlePreview[] }) {
  const [activeTraining, setActiveTraining] = useState<TrainingTab>("case-training");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const comparisonRef = useRef<HTMLDetailsElement | null>(null);
  const scrollFrame = useRef(0);

  useEffect(() => {
    const restoreHash = () => {
      window.cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = 0;
      const target = window.location.hash.slice(1);
      const tab = TRAINING_TABS.find(item => item.id === target);
      const params = new URLSearchParams(window.location.search);
      if (target === "comparison-examples") {
        setActiveTraining("condition-training");
        if (comparisonRef.current) comparisonRef.current.open = true;
      } else if (tab) setActiveTraining(tab.id);
      else if (target === "simulator-result" || target === "simulator-conditions" || ["fromTsubo", "fromCase", "fromDiagnosis"].some(key => params.has(key))) setActiveTraining("condition-training");
      if (tab || target === "simulator-result" || target === "simulator-conditions" || target === "comparison-examples") {
        scrollFrame.current = window.requestAnimationFrame(() => {
          scrollFrame.current = 0;
          document.getElementById(target)?.scrollIntoView({ block: "start" });
        });
      }
    };
    const timer = window.setTimeout(restoreHash, 0);
    window.addEventListener("hashchange", restoreHash);
    return () => { window.clearTimeout(timer); window.cancelAnimationFrame(scrollFrame.current); window.removeEventListener("hashchange", restoreHash); };
  }, []);

  const selectTraining = (index: number, focus = false) => {
    window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = 0;
    const tab = TRAINING_TABS[index];
    setActiveTraining(tab.id);
    window.history.replaceState(null, "", '#' + tab.id);
    if (focus) tabRefs.current[index]?.focus();
  };

  return (
    <div className="clinical-exercises space-y-8 sm:space-y-10">
      <ClinicalToolBridge />
      <PageIntro compact eyebrow="所見から判断する練習" title="弁証の練習" art="practice" description="架空症例を考える、条件を選んで比べる。取り組みたい演習から始められます。" />
      <details className="page-help">
        <summary>演習で確認できること</summary>
        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          八綱、気血水、臓腑経絡の条件を順に選ぶと、
          選んだ条件に応じた<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「一文の証」</strong>と、
          <strong className="text-[#1E3D34] dark:text-[#74BA9E]">「配穴の学習例」</strong>を表示します。確認した所見、候補に合わない所見、足りない情報を比べる教材で、選択結果だけでは診断や施術方針は決まりません。
        </p>

      </details>

      <div className="clinical-training-switcher" role="tablist" aria-label="演習の種類">
        {TRAINING_TABS.map((tab, index) => (
          <button key={tab.id} ref={element => { tabRefs.current[index] = element; }} type="button"
            id={tab.id + "-tab"} role="tab" aria-selected={activeTraining === tab.id}
            aria-controls={tab.id + "-panel"} tabIndex={activeTraining === tab.id ? 0 : -1}
            onClick={() => selectTraining(index)}
            onKeyDown={event => {
              const next = event.key === "ArrowRight" ? (index + 1) % TRAINING_TABS.length
                : event.key === "ArrowLeft" ? (index + TRAINING_TABS.length - 1) % TRAINING_TABS.length
                : event.key === "Home" ? 0 : event.key === "End" ? TRAINING_TABS.length - 1 : null;
              if (next === null) return;
              event.preventDefault();
              selectTraining(next, true);
            }}>
            <span>{tab.label}</span><small>{tab.description}</small>
          </button>
        ))}
      </div>
      <section id="case-training-panel" role="tabpanel" aria-labelledby="case-training-tab" hidden={activeTraining !== "case-training"} tabIndex={0} className="clinical-training-panel">
        <ProgressiveCaseTraining />
      </section>
      <section id="condition-training-panel" role="tabpanel" aria-labelledby="condition-training-tab" hidden={activeTraining !== "condition-training"} tabIndex={0} className="clinical-training-panel">
        <div id="condition-training" className="scroll-mt-28"><ThreeStageSimulator /></div>
        <details ref={comparisonRef} id="comparison-examples" className="clinical-comparison-disclosure">
          <summary>鑑別例を見比べる<span>似た候補の違いを確認する</span></summary>
          <ClinicalComparisonExamples />
        </details>
      </section>
      <section id="revision-training-panel" role="tabpanel" aria-labelledby="revision-training-tab" hidden={activeTraining !== "revision-training"} tabIndex={0} className="clinical-training-panel">
        <ClinicalRevisionTraining />
      </section>

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
