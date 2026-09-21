"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Crown, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Bookmark, 
  BookOpen, 
  AlertTriangle, 
  HelpCircle, 
  Stethoscope, 
  Activity, 
  User as UserIcon,
  Layers,
  Lock,
  RotateCcw
} from "lucide-react";
import { ClinicalCase } from "@/types/clinicalCase";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { useAuth } from "@/contexts/AuthContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import AuthModal from "@/components/auth/AuthModal";
import { SUBSCRIPTION_CONFIG, isSubscriptionSalesEnabled } from "@/config/subscription";

export default function CaseStudyViewer({ clinicalCase }: { clinicalCase: ClinicalCase }) {
  const { isPremium } = useAuth();
  const { addMemo, isClipped } = useClinicalMemo();

  const isLocked = !clinicalCase.isFreeTrial && !isPremium;
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // 四診タブ選択
  const [activeExamTab, setActiveExamTab] = useState<"inspection" | "tongue" | "inquiry" | "palpation">("inspection");

  // 推論ステップの回答状態
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const isAlreadySaved = isClipped(`case-${clinicalCase.id}`);

  const handleSelectOption = (stepNumber: number, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [stepNumber]: optionId,
    }));
  };

  const handleSaveToMemo = () => {
    addMemo({
      id: `case-${clinicalCase.id}`,
      type: "diagnosis",
      title: `${clinicalCase.title}（症例 ${clinicalCase.caseNumber}）`,
      subTitle: `証: ${clinicalCase.correctDiagnosis.pattern} / 治法: ${clinicalCase.correctDiagnosis.treatmentPrinciple}`,
      points: [...clinicalCase.correctDiagnosis.primaryPoints, ...clinicalCase.correctDiagnosis.secondaryPoints],
      elements: ["木", "火", "土", "金", "水"],
      indications: [clinicalCase.patient.chiefComplaint],
      summary: clinicalCase.clinicalExplanation.pathomechanism,
      mechanism: clinicalCase.clinicalExplanation.pointRationale,
      caution: clinicalCase.clinicalExplanation.clinicalPitfall,
      personalNotes: `【主穴】${clinicalCase.correctDiagnosis.primaryPoints.join("、 ")}\n【参考方剤】${clinicalCase.correctDiagnosis.formulaEquivalent || "なし"}`,
    });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 症例ヘッダー */}
      <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#737C77] dark:text-[#8899A6]">
              症例 {clinicalCase.caseNumber < 10 ? `0${clinicalCase.caseNumber}` : clinicalCase.caseNumber}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBE4D5] dark:bg-[#1E2C38] text-[#404743] dark:text-[#C5D2DB]">
              {clinicalCase.category}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300">
              難易度: {clinicalCase.difficulty}
            </span>
          </div>

          {clinicalCase.isFreeTrial ? (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>無料体験症例</span>
            </span>
          ) : (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A2016] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4D331F] flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" />
              <span>プレミアム限定</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
          {clinicalCase.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
          {clinicalCase.subTitle}
        </p>
      </div>

      {/* ステップ 1: 患者基本情報 ＆ 主訴・現病歴 */}
      <div className="rounded-3xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
          <UserIcon className="w-4 h-4" />
          <span>ステップ 1: 患者基本情報 ＆ 主訴・現病歴</span>
        </div>

        {/* 患者属性テーブル */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#FAF8F5] dark:bg-[#18232D] p-4 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D]">
          <div>
            <span className="text-[#737C77] dark:text-[#8899A6] block">年齢・性別</span>
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">{clinicalCase.patient.age}・{clinicalCase.patient.gender}</span>
          </div>
          <div>
            <span className="text-[#737C77] dark:text-[#8899A6] block">職業</span>
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">{clinicalCase.patient.occupation}</span>
          </div>
          <div className="col-span-2">
            <span className="text-[#737C77] dark:text-[#8899A6] block">既往歴</span>
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">{clinicalCase.patient.pastHistory.join("、 ")}</span>
          </div>
        </div>

        {/* 主訴 */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>主訴（患者の訴え）</span>
          </span>
          <div className="p-4 rounded-2xl bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
            「{clinicalCase.patient.chiefComplaint}」
          </div>
        </div>

        {/* 現病歴 ＆ 生活背景 */}
        <div className="space-y-3 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
          <div className="space-y-1">
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">現病歴:</span>
            <p>{clinicalCase.patient.historyOfPresentIllness}</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">生活背景・習慣:</span>
            <p>{clinicalCase.patient.lifestyle}</p>
          </div>
        </div>
      </div>

      {/* プレミアムロック時のプレビュー遮断 */}
      {isLocked ? (
        <div className="relative rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#B86924] dark:border-[#E6C387] p-8 sm:p-12 text-center space-y-6 shadow-xl overflow-hidden">
          <div className="w-16 h-16 rounded-3xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] text-xs font-bold border border-[#F3DEC5] dark:border-[#4D331F] mb-1">
              <span>{isSubscriptionSalesEnabled() ? "プレミアム限定症例" : SUBSCRIPTION_CONFIG.statusMessages.comingSoonBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              {isSubscriptionSalesEnabled() ? "この症例はプレミアム会員限定です" : "症例04以降は有料プラン公開に合わせて開放されます"}
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              {isSubscriptionSalesEnabled() 
                ? "望聞問切の四診データ、臨床推論ステップ演習、専門解説、マイカルテ保存機能をご利用いただけます。"
                : "有料プランの受付開始に向けて準備を進めております。現在は無料体験症例（症例01〜03）を全編ご利用いただけます。"}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isSubscriptionSalesEnabled() ? (
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1E3D34] to-[#2B6958] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>プレミアムプランで全症例を解放する</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/cases/case-01-headache-liver-fire"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1E3D34] to-[#2B6958] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>無料体験：症例01に挑戦する</span>
              </Link>
            )}
            <Link
              href="/cases"
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-xs font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#F2EDE2]"
            >
              症例一覧に戻る
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* ステップ 2: 四診情報（望・聞・問・切） */}
          <div className="rounded-3xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>ステップ 2: 四診情報（四診合参）</span>
            </div>

            {/* 四診タブナビゲーション */}
            <div className="flex items-center gap-2 border-b border-[#E8E1D1] dark:border-[#263542] pb-2 overflow-x-auto">
              {[
                { id: "inspection", label: "望診（顔面・姿勢）" },
                { id: "tongue", label: "舌診（舌質・舌苔・舌下）" },
                { id: "inquiry", label: "問診（自覚症状詳細）" },
                { id: "palpation", label: "切診（脈診・腹診・穴反応）" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveExamTab(t.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeExamTab === t.id
                      ? "bg-[#1E3D34] text-white"
                      : "text-[#59615D] dark:text-[#8899A6] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* タブコンテンツ */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#18232D] border border-[#E8E1D1] dark:border-[#22303D] min-h-[120px] text-xs sm:text-sm">
              {activeExamTab === "inspection" && (
                <div className="space-y-2">
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">【望診所見】</span>
                  <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                    {clinicalCase.examinations.inspection}
                  </p>
                  <div className="pt-2">
                    <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">【聞診所見（声・呼吸音）】</span>
                    <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                      {clinicalCase.examinations.auscultationAndOlfaction}
                    </p>
                  </div>
                </div>
              )}

              {activeExamTab === "tongue" && (
                <div className="space-y-3">
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">【舌診所見】</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
                      <span className="text-[#737C77] text-xs block">舌質（色調）</span>
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{clinicalCase.examinations.tongueDiagnosis.body}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
                      <span className="text-[#737C77] text-xs block">舌苔（厚さ・色・潤燥）</span>
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{clinicalCase.examinations.tongueDiagnosis.coating}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
                      <span className="text-[#737C77] text-xs block">舌形（形態・歯痕・点刺）</span>
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{clinicalCase.examinations.tongueDiagnosis.shape}</span>
                    </div>
                    {clinicalCase.examinations.tongueDiagnosis.sublingualVeins && (
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
                        <span className="text-[#737C77] text-xs block">舌下静脈（瘀血判定）</span>
                        <span className="font-bold text-[#B86924] dark:text-[#E6C387]">{clinicalCase.examinations.tongueDiagnosis.sublingualVeins}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeExamTab === "inquiry" && (
                <div className="space-y-3">
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">【問診詳細（一問一答）】</span>
                  <div className="space-y-2">
                    {clinicalCase.examinations.inquiry.map((inq, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                        <div className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">Q. {inq.question}</div>
                        <div className="text-[#404743] dark:text-[#C5D2DB]">A. {inq.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeExamTab === "palpation" && (
                <div className="space-y-3">
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">【切診所見（脈・腹・経穴）】</span>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
                      <div className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">脈診: {clinicalCase.examinations.palpation.pulse}</div>
                      {clinicalCase.examinations.palpation.pulseDetail && (
                        <div className="text-[#737C77] text-xs mt-0.5">{clinicalCase.examinations.palpation.pulseDetail}</div>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
                      <div className="font-bold text-[#232826] dark:text-[#FAF8F5]">腹証: {clinicalCase.examinations.palpation.abdomen}</div>
                    </div>
                    {clinicalCase.examinations.palpation.acupointReaction && (
                      <div className="p-3 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
                        <div className="font-bold text-[#B86924] dark:text-[#E6C387]">経穴反応: {clinicalCase.examinations.palpation.acupointReaction}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ステップ 3: 臨床推論ステップ（演習クイズ） */}
          <div className="rounded-3xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>ステップ 3: 臨床推論ステップ演習</span>
            </div>

            <div className="space-y-6">
              {clinicalCase.reasoningSteps.map((step) => {
                const selected = selectedAnswers[step.stepNumber];
                return (
                  <div key={step.stepNumber} className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#18232D] border border-[#E8E1D1] dark:border-[#22303D] space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#B86924] text-white text-xs font-bold flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                        {step.stepTitle}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
                      {step.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {step.options.map((opt) => {
                        const isSelected = selected === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(step.stepNumber, opt.id)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${
                              isSelected
                                ? opt.isCorrect
                                  ? "bg-green-50 dark:bg-green-950/40 border-green-500 text-green-900 dark:text-green-200 font-bold"
                                  : "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200"
                                : "bg-white dark:bg-[#10171F] border-[#D8CFC0] dark:border-[#384C5E] hover:border-[#1E3D34] text-[#232826] dark:text-[#FAF8F5]"
                            }`}
                          >
                            <span className="shrink-0 mt-0.5">
                              {isSelected ? (
                                opt.isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-gray-400 inline-block" />
                              )}
                            </span>
                            <div className="space-y-1">
                              <span>{opt.label}</span>
                              {isSelected && (
                                <p className="text-xs font-normal opacity-90 block">
                                  {opt.feedback}
                                </p>
                              )}
                            </div>
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
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#F3DEC5]" />
                <span>{showExplanation ? "解説を閉じる" : "確定診断・治法・配穴処方と専門解説を開く"}</span>
              </button>
            </div>
          </div>

          {/* ステップ 4 & 5: 確定弁証・治法・処方配穴 ＆ 専門解説 */}
          {showExplanation && (
            <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#1E3D34] dark:border-[#74BA9E] p-6 sm:p-8 space-y-6 shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
                  <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    確定診断と処方配穴
                  </h3>
                </div>

                {/* マイカルテ登録ボタン */}
                <button
                  type="button"
                  onClick={handleSaveToMemo}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    isAlreadySaved
                      ? "bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]"
                      : "bg-[#B86924] text-white hover:opacity-90"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{isAlreadySaved ? "マイカルテ保存済み" : "マイカルテに登録"}</span>
                </button>
              </div>

              {/* 確定診断要約テーブル */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                  <span className="text-[#737C77] text-xs font-semibold">八綱弁証 / 確定証名</span>
                  <div className="text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    {clinicalCase.correctDiagnosis.pattern}
                  </div>
                  <div className="text-xs text-[#59615D]">
                    （八綱: {clinicalCase.correctDiagnosis.hachiko}）
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                  <span className="text-[#737C77] text-xs font-semibold">治法（治療原則）</span>
                  <div className="text-base font-bold text-[#B86924] dark:text-[#E6C387]">
                    {clinicalCase.correctDiagnosis.treatmentPrinciple}
                  </div>
                  {clinicalCase.correctDiagnosis.formulaEquivalent && (
                    <div className="text-xs text-[#59615D]">
                      （参考方剤: {clinicalCase.correctDiagnosis.formulaEquivalent}）
                    </div>
                  )}
                </div>
              </div>

              {/* 処方配穴 */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-3">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
                  処方配穴（主穴 ＋ 配穴）
                </span>
                <div className="flex flex-wrap gap-2">
                  {clinicalCase.correctDiagnosis.primaryPoints.map((pt) => (
                    <span key={pt} className="px-3 py-1.5 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold text-xs border border-[#C5DED4] dark:border-[#2A5243]">
                      ★主穴: {pt}
                    </span>
                  ))}
                  {clinicalCase.correctDiagnosis.secondaryPoints.map((pt) => (
                    <span key={pt} className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A2530] text-[#404743] dark:text-[#C5D2DB] font-semibold text-xs border border-[#E8E1D1] dark:border-[#384C5E]">
                      配穴: {pt}
                    </span>
                  ))}
                </div>
              </div>

              {/* 詳細解説ブロック */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                  <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                    <span>病態機序の詳細</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                    {clinicalCase.clinicalExplanation.pathomechanism}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                  <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                    <span>鑑別診断（間違えやすい他証との対比）</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                    {clinicalCase.clinicalExplanation.differentialDiagnosis}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                  <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                    <span>経穴選定の理由（作用機序）</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                    {clinicalCase.clinicalExplanation.pointRationale}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>臨床の落とし穴・注意点</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                    {clinicalCase.clinicalExplanation.clinicalPitfall}
                  </p>
                </div>

                {clinicalCase.clinicalExplanation.classicCitation && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121A22] border border-[#E8E1D1] dark:border-[#22303D] text-xs space-y-1">
                    <span className="font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">古典根拠:</span>
                    <p className="font-serif italic text-[#59615D] dark:text-[#96A6B2]">
                      {clinicalCase.clinicalExplanation.classicCitation}
                    </p>
                  </div>
                )}

                {/* 次の学習へのステップ（導線改善） */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#F3EDE2] dark:from-[#17212A] dark:to-[#121920] border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                    <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                      この症例の学びを次につなぐ
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={handleSaveToMemo}
                      disabled={isAlreadySaved}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-left space-y-1 group transition-all"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                        <span>要点を保存</span>
                        <Bookmark className={`w-3.5 h-3.5 ${isAlreadySaved ? "fill-current" : ""}`} />
                      </div>
                      <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
                        {isAlreadySaved ? "マイノートに保存済み" : "この症例の弁証・配穴をノートへ"}
                      </p>
                    </button>

                    <Link
                      href="/cases"
                      className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-left space-y-1 group transition-all block"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                        <span>他の症例に挑戦する</span>
                        <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                      </div>
                      <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
                        全20の臨床症例一覧へ
                      </p>
                    </Link>

                    <Link
                      href="/curriculum"
                      className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-left space-y-1 group transition-all block"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                        <span>関連理論を学ぶ</span>
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
                        8体系カリキュラムで病因病機を深掘り
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* フッターナビゲーション */}
      <div className="flex items-center justify-between pt-6 border-t border-[#E8E1D1] dark:border-[#263542]">
        <Link
          href="/cases"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737C77] dark:text-[#8899A6] hover:text-[#1E3D34]"
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shadow-xs group"
            >
              <span>次の症例へ（症例{nextC.caseNumber}）</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          );
        })()}
      </div>

      {/* プレミアム誘導モーダル */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="プレミアム会員限定コンテンツです"
        description="この症例の完全な四診開示、推論ステップ、解説・古典根拠はプレミアム会員限定です。"
      />
    </div>
  );
}
