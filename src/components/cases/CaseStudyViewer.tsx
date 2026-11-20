"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ChevronRight, 
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
import { ClinicalCase } from "@/types/clinicalCase";
import MedicalSafetyNotice from "@/components/MedicalSafetyNotice";
import { CLINICAL_CASES, CLINICAL_CASE_SCOPE, CLINICAL_CASE_SAFETY_GUIDANCE } from "@/data/clinicalCasesData";
import { CLINICAL_CASE_EVIDENCE } from "@/data/clinicalCaseEvidence";
import { getCaseSimulatorPreset, buildSimulatorUrlFromCase } from "@/data/cases/caseSimulatorMapping";
import { SlidersHorizontal, FlaskConical } from "lucide-react";

export default function CaseStudyViewer({ clinicalCase }: { clinicalCase: ClinicalCase }) {


  // 四診タブ選択
  const [activeExamTab, setActiveExamTab] = useState<"inspection" | "tongue" | "inquiry" | "palpation">("inspection");

  // 推論ステップの回答状態
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);


  const handleSelectOption = (stepNumber: number, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [stepNumber]: optionId,
    }));
  };

  return (
    <div className="case-practice space-y-5 sm:space-y-8">
      <header className="reader-header">
        <p className="text-sm font-semibold text-accent">模擬症例 {String(clinicalCase.caseNumber).padStart(2, "0")} · {clinicalCase.category} · {clinicalCase.difficulty}</p>
        <h1 className="reader-title">{clinicalCase.title}</h1>
        <p className="reader-lead">{clinicalCase.subTitle}</p>
      </header>
      <nav aria-label="症例の進め方" className="reader-navigation">
        <a href="#case-patient" className="page-primary-action">症例の基本情報</a>
        <a href="#case-examination" className="page-secondary-action">四診</a>
        <a href="#case-reasoning" className="page-secondary-action">推論演習</a>
      </nav>

      <MedicalSafetyNotice title="演習を始める前に" message={CLINICAL_CASE_SCOPE} />
      {CLINICAL_CASE_SAFETY_GUIDANCE[clinicalCase.id] && <MedicalSafetyNotice title="この症例の受診・安全上の注意" {...CLINICAL_CASE_SAFETY_GUIDANCE[clinicalCase.id]} />}

      {/* ステップ 1: 患者基本情報 ＆ 主訴・現病歴 */}
      <section id="case-patient" tabIndex={-1} aria-labelledby="case-patient-title" className="case-section">
        <h2 id="case-patient-title" className="reader-section-title flex items-center gap-2">
          <UserIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />症例の基本情報と主訴
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
            <span className="text-muted block">既往歴</span>
            <span className="font-bold text-ink">{clinicalCase.patient.pastHistory.join("、 ")}</span>
          </div>
        </div>

        {/* 主訴 */}
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-accent">主訴（患者の訴え）</h3>
          <p className="rounded-e-lg border-s-2 border-frame bg-page p-3 text-base leading-[1.8]">
            「{clinicalCase.patient.chiefComplaint}」
          </p>
        </div>

        {/* 現病歴 ＆ 生活背景 */}
        <div className="space-y-3 text-base leading-[1.85]">
          <div className="space-y-1">
            <span className="font-bold text-ink">現病歴:</span>
            <p>{clinicalCase.patient.historyOfPresentIllness}</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-ink">仕事や日ごろの習慣</span>
            <p>{clinicalCase.patient.lifestyle}</p>
          </div>
        </div>
      </section>

      {/* ステップ 2: 四診情報（望・聞・問・切） */}
      <section id="case-examination" tabIndex={-1} aria-labelledby="case-examination-title" className="case-section">
        <h2 id="case-examination-title" className="reader-section-title flex items-center gap-2">
          <Stethoscope aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />四診の所見
        </h2>

        {/* 四診タブナビゲーション */}
        <div role="group" aria-label="表示する所見" className="case-examination-options">
          {[
            { id: "inspection", label: "望・聞診" },
            { id: "tongue", label: "舌診" },
            { id: "inquiry", label: "問診" },
            { id: "palpation", label: "切診" },
          ].map(examination => (
            <button
              key={examination.id}
              type="button"
              aria-pressed={activeExamTab === examination.id}
              aria-controls="case-examination-content"
              onClick={() => setActiveExamTab(examination.id as typeof activeExamTab)}
            >
              {examination.label}
            </button>
          ))}
        </div>

        {/* タブコンテンツ */}
        <div id="case-examination-content" className="min-h-[120px] rounded-lg border border-divider bg-page p-3 text-base leading-[1.85] sm:p-4">
          {activeExamTab === "inspection" && (
            <div className="space-y-2">
              <span className="font-bold text-ink block">【望診所見】</span>
              <p className="text-ink leading-relaxed">
                {clinicalCase.examinations.inspection}
              </p>
              <div className="pt-2">
                <span className="font-bold text-ink block">【聞診所見（声・呼吸音）】</span>
                <p className="text-ink leading-relaxed">
                  {clinicalCase.examinations.auscultationAndOlfaction}
                </p>
              </div>
            </div>
          )}

          {activeExamTab === "tongue" && (
            <div className="space-y-3">
              <span className="font-bold text-ink block">【舌診所見】</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-panel border border-divider">
                  <span className="text-muted text-xs block">舌質（色調）</span>
                  <span className="font-bold text-accent">{clinicalCase.examinations.tongueDiagnosis.body}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-panel border border-divider">
                  <span className="text-muted text-xs block">舌苔（厚さ・色・潤燥）</span>
                  <span className="font-bold text-accent">{clinicalCase.examinations.tongueDiagnosis.coating}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-panel border border-divider">
                  <span className="text-muted text-xs block">舌形（形態・歯痕・点刺）</span>
                  <span className="font-bold text-accent">{clinicalCase.examinations.tongueDiagnosis.shape}</span>
                </div>
                {clinicalCase.examinations.tongueDiagnosis.sublingualVeins && (
                  <div className="p-2.5 rounded-xl bg-panel border border-divider">
                    <span className="text-muted text-xs block">舌下静脈（瘀血判定）</span>
                    <span className="font-bold text-warm">{clinicalCase.examinations.tongueDiagnosis.sublingualVeins}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeExamTab === "inquiry" && (
            <div className="space-y-3">
              <span className="font-bold text-ink block">【問診詳細（一問一答）】</span>
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
              <span className="font-bold text-ink block">【切診所見（脈・腹・経穴）】</span>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-panel border border-divider">
                  <div className="font-bold text-accent">脈診: {clinicalCase.examinations.palpation.pulse}</div>
                  {clinicalCase.examinations.palpation.pulseDetail && (
                    <div className="text-muted text-xs mt-0.5">{clinicalCase.examinations.palpation.pulseDetail}</div>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-panel border border-divider">
                  <div className="font-bold text-ink">腹証: {clinicalCase.examinations.palpation.abdomen}</div>
                </div>
                {clinicalCase.examinations.palpation.acupointReaction && (
                  <div className="p-3 rounded-xl bg-panel border border-divider">
                    <div className="font-bold text-warm">経穴反応: {clinicalCase.examinations.palpation.acupointReaction}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ステップ 3: 臨床推論ステップ（演習クイズ） */}
      <section id="case-reasoning" tabIndex={-1} aria-labelledby="case-reasoning-title" className="case-section">
        <h2 id="case-reasoning-title" className="reader-section-title flex items-center gap-2">
          <Activity aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />臨床推論の演習
        </h2>

        <div className="space-y-6">
          {clinicalCase.reasoningSteps.map((step) => {
            const selected = selectedAnswers[step.stepNumber];
            return (
              <div key={step.stepNumber} className="case-question space-y-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-panel-selected text-sm font-semibold text-accent">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-semibold text-ink">
                    {step.stepTitle}
                  </h3>
                </div>

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
                        aria-pressed={isSelected}
                        onClick={() => handleSelectOption(step.stepNumber, opt.id)}
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
              </div>
            );
          })}
        </div>

        {/* 解答と完全解説の表示トグル */}
        <div className="pt-2">
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
        </div>
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

          {/* 処方配穴 */}
          <div className="p-5 rounded-2xl bg-panel border border-divider space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">
              ツボの組み合わせ
            </span>
            <div className="flex flex-wrap gap-2">
              {clinicalCase.correctDiagnosis.primaryPoints.map((pt) => (
                <span key={pt} className="px-3 py-1.5 rounded-xl bg-panel-selected text-accent font-bold text-xs border border-frame">
                  主穴　{pt}
                </span>
              ))}
              {clinicalCase.correctDiagnosis.secondaryPoints.map((pt) => (
                <span key={pt} className="px-3 py-1.5 rounded-xl bg-page text-ink font-semibold text-xs border border-[#E8E1D1] dark:border-[#384C5E]">
                  加えるツボ　{pt}
                </span>
              ))}
            </div>
          </div>

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
                <span>先に確認する症状と受診の目安</span>
              </h4>
              <p className="text-sm sm:text-base text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                {clinicalCase.clinicalExplanation.clinicalPitfall}
              </p>
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

      {/* トピッククラスター連携（関連症状ガイド・関連経穴辞典・体質診断への回遊） */}
      <div className="case-section">
        <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>この症例と一緒に読める教材</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 症状別ガイド */}
          <div className="p-4 rounded-2xl bg-panel border border-divider space-y-2">
            <span className="text-xs font-bold text-warm block">症状別ガイド</span>
            <p className="text-xs text-muted">
              頭痛や腰痛など、症状が出た時刻や困った動作をどう伝えるか、いつ受診を考えるかを読めます。
            </p>
            <Link
              href="/symptoms"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline pt-1"
            >
              <span>症状別ガイドを開く</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 気血水体質セルフ診断 */}
          <div className="p-4 rounded-2xl bg-panel border border-divider space-y-2">
            <span className="text-xs font-bold text-accent block">気血水 体質セルフチェック</span>
            <p className="text-xs text-muted">
              12問から当てはまる項目を選ぶと、たとえば食後の疲れが質問票のどの分類に入るかを確認できます。
            </p>
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline pt-1"
            >
              <span>体質セルフチェックをする</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 症例の処方配穴（ツボ辞典リンク） */}
        <div className="space-y-2.5 pt-2 border-t border-divider">
          <span className="text-xs font-bold text-ink block">
            この症例に出てくるツボの位置と注意点
          </span>
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
      </div>

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
