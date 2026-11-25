"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ChevronRight, 
  Eye,
  Hand,
  MessageCircle,
  ScanFace,
  Sparkles, 
  BookOpen, 
  AlertTriangle, 
  HelpCircle, 
  Stethoscope, 
  Activity, 
  User as UserIcon,
  Layers,
  RotateCcw
} from "lucide-react";
import type { CaseObservationTarget, CaseReasoningStep, ClinicalCase } from "@/types/clinicalCase";
import MedicalSafetyNotice from "@/components/MedicalSafetyNotice";
import { CLINICAL_CASES, CLINICAL_CASE_SCOPE, CLINICAL_CASE_SAFETY_GUIDANCE } from "@/data/clinicalCasesData";
import { CLINICAL_CASE_EVIDENCE } from "@/data/clinicalCaseEvidence";
import { getCaseSimulatorPreset, buildSimulatorUrlFromCase } from "@/data/cases/caseSimulatorMapping";
import { SlidersHorizontal, FlaskConical } from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { useLearningSync } from "@/contexts/LearningSyncContext";
import { getLearningStorageAdapter } from "@/utils/learningStorageBridge";
import { CASE_REASONING_ANCHOR, CASE_REVIEW_ANCHOR, caseQuestionAnchor } from "@/utils/caseStudyNavigation";
import { casePracticeReviewQuestion } from "@/utils/casePracticeReview";
import { caseStudyAnswerKey, caseStudyAttemptKey, getCaseStudyProgress } from "@/utils/caseStudyProgress";
import { CASE_RETRY_PARAM, PRACTICE_REVIEW_HREF, recordPracticeReviewAnswer } from "@/utils/practiceReview";
import CaseQuestionReferences, { CaseHistoryContent } from "./CaseQuestionReferences";
import CaseStudyReview, { type CaseStudyReviewResources } from "./CaseStudyReview";

const examinationOptions = [
  { id: "inspection", label: "望・聞診", cue: "顔色や声", icon: Eye },
  { id: "tongue", label: "舌診", cue: "舌の色や形", icon: ScanFace },
  { id: "inquiry", label: "問診", cue: "本人の話", icon: MessageCircle },
  { id: "palpation", label: "切診", cue: "脈やお腹", icon: Hand },
] as const;

function observationHref(target: CaseObservationTarget) {
  switch (target) {
    case "complaint":
      return "#case-complaint";
    case "history":
      return "#case-history";
    default:
      return "#case-examination-content";
  }
}

function focusCaseAnchor(anchor: string) {
  const target = document.getElementById(anchor);
  target?.scrollIntoView({ block: "start" });
  target?.focus({ preventScroll: true });
}

export default function CaseStudyViewer({ clinicalCase, reviewResources }: { clinicalCase: ClinicalCase; reviewResources: CaseStudyReviewResources }) {


  // 四診タブ選択
  const [activeExamTab, setActiveExamTab] = useState<typeof examinationOptions[number]["id"]>("inspection");

  // 推論ステップの回答状態
  const { ready, values, status, setEntry } = useLearningSync();
  const progress = getCaseStudyProgress(values, clinicalCase);
  const [showExplanation, setShowExplanation] = useState(false);
  const [retry, setRetry] = useState<{ stepNumber: number; optionId?: string } | null>(null);
  const [activeAnchor, setActiveAnchor] = useState("");
  const retryStep = retry?.stepNumber;
  const history = clinicalCase.patient.historyOfPresentIllness;
  const observations = clinicalCase.clinicalExplanation.observations;

  useEffect(() => {
    if (!ready) return;
    let frame = 0;
    function syncCaseAnchor() {
      cancelAnimationFrame(frame);
      const anchor = window.location.hash.slice(1);
      frame = requestAnimationFrame(() => {
        setActiveAnchor(anchor);
        if (anchor === CASE_REVIEW_ANCHOR) {
          focusCaseAnchor(progress.complete ? CASE_REVIEW_ANCHOR : CASE_REASONING_ANCHOR);
        }
      });
    }
    syncCaseAnchor();
    window.addEventListener("hashchange", syncCaseAnchor);
    window.addEventListener("popstate", syncCaseAnchor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncCaseAnchor);
      window.removeEventListener("popstate", syncCaseAnchor);
    };
  }, [ready, progress.complete, clinicalCase.id]);

  useEffect(() => {
    if (!ready) return;
    const anchor = window.location.hash.slice(1);
    const question = clinicalCase.reasoningSteps.find(step => caseQuestionAnchor(step.stepNumber) === anchor);
    if (anchor !== CASE_REASONING_ANCHOR && !question) return;
    const retrying = question && new URLSearchParams(window.location.search).get(CASE_RETRY_PARAM) === "1";
    const frame = requestAnimationFrame(() => {
      if (retrying) setRetry({ stepNumber: question.stepNumber });
      else focusCaseAnchor(anchor);
    });
    return () => cancelAnimationFrame(frame);
  }, [ready, clinicalCase.reasoningSteps]);

  useEffect(() => {
    if (retryStep === undefined) return;
    const frame = requestAnimationFrame(() => focusCaseAnchor(caseQuestionAnchor(retryStep)));
    return () => cancelAnimationFrame(frame);
  }, [retryStep]);

  const handleSelectOption = (step: CaseReasoningStep, optionId: string, answeredAt: number) => {
    if (!ready) return;
    const { stepNumber } = step;
    const choice = step.options.find(option => option.id === optionId);
    if (!choice) return;
    const reviewQuestion = casePracticeReviewQuestion(clinicalCase, step);

    if (retry?.stepNumber === stepNumber) {
      if (retry.optionId === optionId) return;
      recordPracticeReviewAnswer(reviewQuestion, choice.isCorrect, answeredAt);
      setRetry({ stepNumber, optionId });
      return;
    }
    const adapter = getLearningStorageAdapter();
    const before = getCaseStudyProgress(adapter?.values() ?? values, clinicalCase);
    if (before.answers[stepNumber] === optionId) return;

    recordPracticeReviewAnswer(reviewQuestion, choice.isCorrect, answeredAt);
    const key = caseStudyAnswerKey(clinicalCase.id, stepNumber);
    const answer = { attempt: before.attempt, optionId, answeredAt };
    setEntry(key, answer);
    const after = getCaseStudyProgress(adapter?.values() ?? { ...values, [key]: answer }, clinicalCase);
    if (after.attempt !== before.attempt) return;
    if (before.answered === 0 && after.answered > 0) trackEvent("case_study_start", { placement: "case_study" });
    if (!before.complete && after.complete) trackEvent("case_study_complete", { placement: "case_study" });
  };

  function restartStudy() {
    setEntry(caseStudyAttemptKey(clinicalCase.id), crypto.randomUUID());
    setShowExplanation(false);
    document.getElementById(CASE_REASONING_ANCHOR)?.focus({ preventScroll: true });
  }

  return (
    <div className="case-practice space-y-5 sm:space-y-8">
      <header className="reader-header">
        <p className="text-sm font-semibold text-accent">模擬症例 {String(clinicalCase.caseNumber).padStart(2, "0")} · {clinicalCase.category} · {clinicalCase.difficulty}</p>
        <h1 className="reader-title">{clinicalCase.title}</h1>
        <p className="reader-lead">{clinicalCase.subTitle}</p>
      </header>
      <nav aria-label="症例の進め方">
        <ol className="case-reading-path">
          <li><a href="#case-patient"><UserIcon aria-hidden="true" /><span>基本情報を読む</span></a></li>
          <li><a href="#case-examination"><Stethoscope aria-hidden="true" /><span>診察の記録を読む</span></a></li>
          <li><a href={`#${CASE_REASONING_ANCHOR}`}><Activity aria-hidden="true" /><span>問題に答える</span></a></li>
        </ol>
      </nav>

      <details className="page-help text-sm leading-relaxed">
        <summary>この演習で扱う範囲</summary>
        <p>{CLINICAL_CASE_SCOPE}</p>
      </details>
      <div id="case-safety" className="scroll-mt-28">
        <MedicalSafetyNotice title="この症例の受診・安全上の注意" {...CLINICAL_CASE_SAFETY_GUIDANCE[clinicalCase.id]} />
      </div>

      {/* ステップ 1: 患者基本情報 ＆ 主訴・現病歴 */}
      <section id="case-patient" tabIndex={-1} aria-labelledby="case-patient-title" className="case-section">
        <h2 id="case-patient-title" className="reader-section-title flex items-center gap-2">
          <UserIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />基本情報と本人の訴え
        </h2>

        {/* 患者属性テーブル */}
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-divider bg-page p-3 text-sm sm:grid-cols-4">
          <div>
            <span className="text-muted block">年齢・性別</span>
            <span className="font-bold text-ink">{clinicalCase.patient.age}・{clinicalCase.patient.gender}</span>
          </div>
          <div>
            <span className="text-muted block">職業</span>
            <span className="font-bold text-ink">{clinicalCase.patient.occupation}</span>
          </div>
          <div className="col-span-2">
            <span className="text-muted block">これまでの病気やけが（既往歴）</span>
            <span className="font-bold text-ink">{clinicalCase.patient.pastHistory.join("、")}</span>
          </div>
        </div>

        {/* 主訴 */}
        <div id="case-complaint" tabIndex={-1} className="space-y-1.5">
          <h3 className="text-base font-semibold text-accent">主訴（患者の訴え）</h3>
          <p className="rounded-e-lg border-s-2 border-frame bg-page p-3 text-base leading-[1.8]">
            「{clinicalCase.patient.chiefComplaint}」
          </p>
        </div>

        {/* 現病歴 ＆ 生活背景 */}
        <div className="space-y-3 text-base leading-[1.85]">
          <section id="case-history" tabIndex={-1} aria-labelledby="case-history-title" className="space-y-2">
            <h3 id="case-history-title" className="font-bold text-ink">症状の経過と背景</h3>
            <CaseHistoryContent history={history} labelledBy="case-history-title" />
          </section>
          {clinicalCase.patient.lifestyle && <div className="space-y-1">
            <span className="font-bold text-ink">仕事や日ごろの習慣</span>
            <p>{clinicalCase.patient.lifestyle}</p>
          </div>}
        </div>
      </section>

      {/* ステップ 2: 四診情報（望・聞・問・切） */}
      <section id="case-examination" tabIndex={-1} aria-labelledby="case-examination-title" className="case-section">
        <h2 id="case-examination-title" className="reader-section-title flex items-center gap-2">
          <Stethoscope aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />診察の記録（四診）
        </h2>
        <p className="text-sm ui-muted">四診は、見た様子、声やにおい、本人から聞いた話、脈やお腹に触れて分かったことを整理する方法です。</p>

        {/* 四診タブナビゲーション */}
        <div role="group" aria-label="表示する所見" className="case-examination-options">
          {examinationOptions.map(({ id, label, cue, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={activeExamTab === id}
              aria-controls="case-examination-content"
              onClick={() => setActiveExamTab(id)}
            >
              <Icon aria-hidden="true" />
              <span>
                <strong>{label}</strong>
                <span>{cue}</span>
              </span>
            </button>
          ))}
        </div>

        {/* タブコンテンツ */}
        <div id="case-examination-content" tabIndex={-1} className="min-h-[120px] rounded-lg border border-divider bg-page p-3 text-base leading-[1.85] sm:p-4">
          {activeExamTab === "inspection" && (
            <div className="space-y-2">
              <h3 className="font-bold text-ink">見て確認したこと（望診）</h3>
              <p className="text-ink leading-relaxed">
                {clinicalCase.examinations.inspection}
              </p>
              <div className="pt-2">
                <h3 className="font-bold text-ink">声や呼吸音など（聞診）</h3>
                <p className="text-ink leading-relaxed">
                  {clinicalCase.examinations.auscultationAndOlfaction}
                </p>
              </div>
            </div>
          )}

          {activeExamTab === "tongue" && (
            <div className="space-y-3">
              <h3 className="font-bold text-ink">舌の色・表面・形を見比べる</h3>
              <dl className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-panel border border-divider">
                  <dt className="text-muted text-sm">舌そのものの色</dt>
                  <dd className="font-bold text-accent">{clinicalCase.examinations.tongueDiagnosis.body}</dd>
                </div>
                <div className="p-2.5 rounded-xl bg-panel border border-divider">
                  <dt className="text-muted text-sm">表面の付着物（舌苔）</dt>
                  <dd className="font-bold text-accent">{clinicalCase.examinations.tongueDiagnosis.coating}</dd>
                </div>
                <div className="p-2.5 rounded-xl bg-panel border border-divider">
                  <dt className="text-muted text-sm">形や歯の跡</dt>
                  <dd className="font-bold text-accent">{clinicalCase.examinations.tongueDiagnosis.shape}</dd>
                </div>
                {clinicalCase.examinations.tongueDiagnosis.sublingualVeins && (
                  <div className="p-2.5 rounded-xl bg-panel border border-divider">
                    <dt className="text-muted text-sm">舌の裏の静脈</dt>
                    <dd className="font-bold text-warm">{clinicalCase.examinations.tongueDiagnosis.sublingualVeins}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {activeExamTab === "inquiry" && (
            <div className="space-y-3">
              <h3 className="font-bold text-ink">質問と本人の答え</h3>
              <div className="space-y-2">
                {clinicalCase.examinations.inquiry.map((inq, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-panel border border-divider space-y-1">
                    <div className="font-bold text-accent">Q. {inq.question}</div>
                    <div className="text-ink">A. {inq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeExamTab === "palpation" && (
            <div className="space-y-3">
              <h3 className="font-bold text-ink">触れて確認したこと</h3>
              <dl className="space-y-2">
                <div className="p-3 rounded-xl bg-panel border border-divider">
                  <dt className="font-bold text-accent">脈</dt>
                  <dd>{clinicalCase.examinations.palpation.pulse}</dd>
                  {clinicalCase.examinations.palpation.pulseDetail && <dd className="text-muted text-sm">{clinicalCase.examinations.palpation.pulseDetail}</dd>}
                </div>
                <div className="p-3 rounded-xl bg-panel border border-divider">
                  <dt className="font-bold text-accent">お腹</dt>
                  <dd>{clinicalCase.examinations.palpation.abdomen}</dd>
                </div>
                {clinicalCase.examinations.palpation.acupointReaction && (
                  <div className="p-3 rounded-xl bg-panel border border-divider">
                    <dt className="font-bold text-accent">経穴の反応</dt>
                    <dd>{clinicalCase.examinations.palpation.acupointReaction}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* ステップ 3: 臨床推論ステップ（演習クイズ） */}
      <section id={CASE_REASONING_ANCHOR} tabIndex={-1} aria-labelledby="case-reasoning-title" className="case-section">
        <h2 id="case-reasoning-title" className="reader-section-title flex items-center gap-2">
          <Activity aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />{retry ? "症例の復習" : "症例を読んで判断する"}
        </h2>

        {ready && !retry && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <p role="status">{progress.answered} / {progress.total}問 回答済み{progress.complete && "・演習完了"}</p>
            {status === "memory" && <p className="ui-muted">このブラウザーでは進捗を保存できません。</p>}
            {progress.complete && (
              <>
                <a href={`#${CASE_REVIEW_ANCHOR}`} className="ui-text-link inline-flex min-h-11 items-center">振り返りへ</a>
                <button type="button" className="ui-text-link min-h-11" onClick={restartStudy}>もう一度解く</button>
              </>
            )}
          </div>
        )}

        <div className="space-y-6">
          {clinicalCase.reasoningSteps.filter(step => !retry || step.stepNumber === retry.stepNumber).map((step) => {
            const selected = retry ? retry.optionId : progress.answers[step.stepNumber];
            const anchor = caseQuestionAnchor(step.stepNumber);
            return (
              <div key={step.stepNumber} id={anchor} tabIndex={-1} className="case-question scroll-mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-panel-selected text-sm font-semibold text-accent">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-semibold text-ink">
                    {step.stepTitle}
                  </h3>
                </div>

                <CaseQuestionReferences patient={clinicalCase.patient} examinations={clinicalCase.examinations} />
                {step.studyLink && (
                  <Link href={step.studyLink.href} className="ui-text-link inline-flex min-h-11 items-center text-sm">
                    {step.studyLink.label}
                  </Link>
                )}
                {step.termNote && <p className="text-sm leading-relaxed text-muted">{step.termNote}</p>}
                <p className="text-base leading-[1.8] text-ink">
                  {step.question}
                </p>

                <div className="space-y-2 pt-1">
                  {step.options.map((opt) => {
                    const isSelected = selected === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={!ready}
                        aria-pressed={isSelected}
                        onClick={() => handleSelectOption(step, opt.id, Date.now())}
                        className={`flex min-h-11 w-full cursor-pointer items-start gap-2.5 rounded-lg border p-3 text-left text-base leading-[1.65] ${
                          isSelected
                            ? opt.isCorrect
                              ? "bg-green-50 dark:bg-green-950/40 border-green-500 text-green-900 dark:text-green-200 font-bold"
                              : "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200"
                            : "border-field bg-panel text-ink hover:border-accent"
                        }`}
                      >
                        <span aria-hidden="true" className="mt-1 shrink-0">
                          {isSelected ? (
                            opt.isCorrect ? <CheckCircle2 className="h-4 w-4 text-green-700 dark:text-green-300" /> : <XCircle className="h-4 w-4 text-red-700 dark:text-red-300" />
                          ) : (
                            <span className="inline-block h-4 w-4 rounded-full border border-field" />
                          )}
                        </span>
                        <span className="min-w-0 space-y-1">
                          <span>{opt.label}</span>
                          {isSelected && (
                            <span className="block text-sm font-normal leading-[1.75]">
                              <strong>{opt.isCorrect ? "正解" : "解説"}</strong>　{opt.feedback}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {step.stepNumber === 1 && selected && (
                  <a href="#case-safety" className="ui-text-link inline-flex min-h-11 items-center text-sm">この症例の受診・安全上の注意を読む</a>
                )}
                {retry && <Link href={PRACTICE_REVIEW_HREF} className="ui-text-link inline-flex min-h-11 items-center">復習一覧に戻る</Link>}
              </div>
            );
          })}
        </div>

        {!retry && progress.complete && <CaseStudyReview steps={clinicalCase.reasoningSteps} answers={progress.answers} resources={reviewResources} />}

        {/* 解答と完全解説の表示トグル */}
        {!retry && <div className="pt-2">
          <button
            type="button"
            aria-expanded={showExplanation}
            aria-controls="case-explanation"
            onClick={() => setShowExplanation(!showExplanation)}
            className="page-primary-action w-full cursor-pointer sm:w-auto"
          >
            <BookOpen aria-hidden="true" className="h-4 w-4" />
            <span>{showExplanation ? "解説を閉じる" : "解答と配穴例を見る"}</span>
          </button>
        </div>}
      </section>

      {/* ステップ 4 & 5: 確定弁証・治法・処方配穴 ＆ 専門解説 */}
      {showExplanation && (
        <section id="case-explanation" aria-labelledby="case-explanation-title" className="case-section">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-divider pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-warm" />
              <h2 id="case-explanation-title" className="reader-section-title">
                教材上の証と配穴例
              </h2>
            </div>

            {/* シミュレーターで動的検証ボタン */}
            {(() => {
              const simPreset = getCaseSimulatorPreset(clinicalCase.id);
              if (!simPreset) return null;
              return (
                <Link
                  href={buildSimulatorUrlFromCase(simPreset)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-panel-selected hover:bg-panel-muted text-accent border border-frame transition-all shadow-xs group"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-warm" />
                  <span>この症例の条件で弁証を練習する</span>
                </Link>
              );
            })()}
          </div>

          {/* 確定診断要約テーブル */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-2xl bg-panel border border-divider space-y-1">
              <span className="text-muted text-xs font-semibold">教材上の証</span>
              <div className="text-base font-bold text-accent">
                {clinicalCase.correctDiagnosis.pattern}
              </div>
              <div className="text-xs text-muted">
                八綱では「{clinicalCase.correctDiagnosis.hachiko}」
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-panel border border-divider space-y-1">
              <span className="text-muted text-xs font-semibold">治法（治療原則）</span>
              <div className="text-base font-bold text-warm">
                {clinicalCase.correctDiagnosis.treatmentPrinciple}
              </div>
              {clinicalCase.correctDiagnosis.formulaEquivalent && (
                <div className="text-xs text-muted">
                  参考に挙がる方剤は「{clinicalCase.correctDiagnosis.formulaEquivalent}」
                </div>
              )}
            </div>
          </div>

          <figure className="clinical-role-figure">
            <figcaption className="font-bold">配穴例でのツボの役割</figcaption>
            <dl className="clinical-role-groups">
              <div>
                <dt className="clinical-role-heading">中心に選ぶツボ</dt>
                <dd className="clinical-role-description">主穴</dd>
                <dd><ul className="clinical-role-points">{clinicalCase.correctDiagnosis.primaryPoints.map(point => <li key={point}>{point}</li>)}</ul></dd>
              </div>
              <div data-role="branch">
                <dt className="clinical-role-heading">追加するツボ</dt>
                <dd className="clinical-role-description">配穴・佐使穴</dd>
                <dd>{clinicalCase.correctDiagnosis.secondaryPoints.length > 0 ? (
                  <ul className="clinical-role-points">{clinicalCase.correctDiagnosis.secondaryPoints.map(point => <li key={point}>{point}</li>)}</ul>
                ) : <p className="clinical-role-description">この例では追加しません</p>}</dd>
              </div>
            </dl>
          </figure>

          {/* 詳細解説ブロック */}
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-panel border border-divider space-y-2">
              <h4 className="font-bold text-sm text-ink flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>この候補を考えた所見</span>
              </h4>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {clinicalCase.clinicalExplanation.pathomechanism}
              </p>
              {observations?.length ? (
                <ul role="list" className="case-observation-links" aria-label="この説明で使った所見">
                  {observations.map(({ target, label }) => (
                    <li key={target}>
                      <a
                        href={observationHref(target)}
                        onClick={() => {
                          if (target !== "complaint" && target !== "history") setActiveExamTab(target);
                        }}
                      >
                        {label}を見る
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="p-5 rounded-2xl bg-panel border border-divider space-y-2">
              <h4 className="font-bold text-sm text-ink flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-warm" />
                <span>ほかの候補と比べるときに聞くこと</span>
              </h4>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {clinicalCase.clinicalExplanation.differentialDiagnosis}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-panel border border-divider space-y-2">
              <h4 className="font-bold text-sm text-ink flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-accent" />
                <span>経穴を選ぶ理由</span>
              </h4>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {clinicalCase.clinicalExplanation.pointRationale}
              </p>
            </div>

            {CLINICAL_CASE_EVIDENCE[clinicalCase.id] && (
              <section aria-label="この症状に関する臨床研究" className="p-5 rounded-2xl bg-panel border border-divider space-y-3">
                <h4 className="font-bold text-sm text-ink">臨床研究で確認された結果</h4>
                <dl className="space-y-3 text-sm sm:text-base text-ink leading-relaxed">
                  <div><dt className="font-semibold">対象</dt><dd>{CLINICAL_CASE_EVIDENCE[clinicalCase.id].population}</dd></div>
                  <div><dt className="font-semibold">研究で比べた方法と測った項目</dt><dd>{CLINICAL_CASE_EVIDENCE[clinicalCase.id].comparison}</dd></div>
                  <div><dt className="font-semibold">結果</dt><dd>{CLINICAL_CASE_EVIDENCE[clinicalCase.id].result}</dd></div>
                  <div><dt className="font-semibold">症例と研究を見比べる点</dt><dd>{CLINICAL_CASE_EVIDENCE[clinicalCase.id].interpretation}</dd></div>
                </dl>
                <ul className="space-y-1 text-sm sm:text-base">
                  {CLINICAL_CASE_EVIDENCE[clinicalCase.id].sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent underline">{source.title}（外部資料）</a></li>)}
                </ul>
              </section>
            )}

            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
              <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>次に聞くときの安全確認</span>
              </h4>
              <p className="text-sm sm:text-base text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                前回の記録と比べ、症状の続き方や新しく出た変化を確かめます。読んだ注意を、次に聞くことに結びつけてください。
              </p>
              <a href="#case-safety" className="ui-text-link inline-flex min-h-11 items-center text-sm">この症例の受診・安全上の注意を見返す</a>
            </div>

            {clinicalCase.clinicalExplanation.classicCitation && (
              <div className="p-4 rounded-2xl bg-page border border-divider text-xs space-y-1">
                <span className="font-serif font-bold text-accent">古典根拠:</span>
                <p className="font-serif italic text-muted">
                  {clinicalCase.clinicalExplanation.classicCitation}
                </p>
              </div>
            )}

            {/* 次の学習へのステップ（導線改善） */}
            <div className="space-y-4 rounded-xl border border-frame bg-page p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-warm" />
                <h4 className="font-bold text-sm text-ink">
                  条件を変えて比べる・別の教材を読む
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(() => {
                  const simPreset = getCaseSimulatorPreset(clinicalCase.id);
                  if (!simPreset) return null;
                  return (
                    <Link
                      href={buildSimulatorUrlFromCase(simPreset)}
                      className="group block space-y-1 rounded-lg border border-frame bg-panel-selected p-3.5 text-left hover:border-accent"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-accent">
                        <span className="flex items-center gap-1">
                          <FlaskConical className="w-3.5 h-3.5 text-warm" />
                          <span>症例の条件を入れて候補を比べる</span>
                        </span>
                        <SlidersHorizontal className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-xs text-muted">
                        寒熱や虚実などの条件を変え、候補と配穴の例がどう変わるかを見ます。
                      </p>
                    </Link>
                  );
                })()}

                <Link
                  href="/cases"
                  className="p-3.5 rounded-xl bg-panel border border-frame hover:border-accent text-left space-y-1 group transition-all block"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-accent">
                    <span>別の模擬症例を選ぶ</span>
                    <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                  </div>
                  <p className="text-xs text-muted">
                    主訴別に20症例を掲載しています。
                  </p>
                </Link>

                <Link
                  href="/curriculum"
                  className="p-3.5 rounded-xl bg-panel border border-frame hover:border-accent text-left space-y-1 group transition-all block"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-accent">
                    <span>講義の目次を開く</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-muted">
                    病因・病機、四診、弁証などの講義を探せます。
                  </p>
                </Link>

              </div>
            </div>
          </div>
        </section>
      )}

      {showExplanation && <div className="case-section">
        <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>この症例に出てくるツボの位置と注意点</span>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-divider">
          <div className="flex flex-wrap gap-2">
            {clinicalCase.correctDiagnosis.primaryPoints.map((pt) => {
              const codeMatch = pt.match(/\(([A-Za-z0-9]+)\)/);
              const code = codeMatch ? codeMatch[1].toLowerCase() : null;
              if (!code) return <span key={pt} className="text-xs px-2.5 py-1 rounded-lg bg-page text-muted">{pt}</span>;
              return (
                <Link
                  key={pt}
                  href={`/tsubo/${code}`}
                  className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-frame bg-panel px-3 py-1.5 text-sm font-semibold text-accent hover:border-accent"
                >
                  <span>{pt}</span>
                  <ChevronRight className="w-3 h-3 text-[#8C9690]" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>}

      {/* フッターナビゲーション */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-divider pt-4">
        <Link
          href="/cases"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-[#1E3D34]"
        >
          <span>← 症例演習一覧へ</span>
        </Link>
        {(() => {
          const currentIdx = CLINICAL_CASES.findIndex((c) => c.id === clinicalCase.id);
          const nextC = currentIdx >= 0 && currentIdx < CLINICAL_CASES.length - 1 ? CLINICAL_CASES[currentIdx + 1] : null;
          if (!nextC) return null;
          return (
            <Link
              href={`/cases/${nextC.id}`}
              className="page-primary-action group"
            >
              <span>次の症例へ（症例{nextC.caseNumber}）</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          );
        })()}
      </div>

    </div>
  );
}
