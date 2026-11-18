"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { useSearchParams } from "next/navigation";
import { 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  FileText,
  ExternalLink
} from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { 
  ACUPOINT_ROLES, 
  analyzePrescription, 
  OVERDOSE_PRESETS,
} from "@/data/haiketsuData";
import ClinicalToolBridge from "@/components/clinical/ClinicalToolBridge";
import PrescriptionScoringGuide from "@/components/learning/PrescriptionScoringGuide";
import { getPrescriptionCountLabel } from "@/utils/prescriptionScorePresentation";

export default function HaiketsuPracticePage() {

  const [selectedPointIds, setSelectedPointIds] = useState<string[]>(["taishou", "gokoku"]); // 初期: 四関穴
  const [prescriptionTitle, setPrescriptionTitle] = useState("合谷と太衝の配穴例");
  const [rationaleText, setRationaleText] = useState("合谷と太衝を組み合わせた教材例です。伝統的な分類と、各穴を選ぶ理由を確認します。");
  const restoreClinicalPoints = useCallback((codes: string[]) => {
    const roles = Object.values(ACUPOINT_ROLES).filter(point => codes.includes(point.code));
    setSelectedPointIds(roles.map(point => point.id));
    setPrescriptionTitle("作業中の配穴を検討");
    setRationaleText("各経穴の採用理由は臨床ワークスペースで確認・編集してください。");
  }, []);

  const selectIncomingPoint = useCallback((id: string) => {
    const point = ACUPOINT_ROLES[id];
    if (!point) return;
    setSelectedPointIds([point.id]);
    setPrescriptionTitle(`${point.name}から配穴を考える`);
    setRationaleText(`【教材の経穴説明】${point.name}：${point.specificRole} / ${point.energyLabel}`);
  }, []);

  // 選択中ツボの分析結果
  const analysis = useMemo(() => {
    return analyzePrescription(selectedPointIds);
  }, [selectedPointIds]);

  // 全ツボ一覧リスト
  const allPoints = useMemo(() => {
    return Object.values(ACUPOINT_ROLES);
  }, []);

  // ツボの追加・削除
  const togglePoint = (id: string) => {
    if (selectedPointIds.includes(id)) {
      setSelectedPointIds(selectedPointIds.filter(p => p !== id));
    } else {
      if (selectedPointIds.length >= 8) {
        alert("演習で選択できる経穴は最大8穴までです。");
        return;
      }
      setSelectedPointIds([...selectedPointIds, id]);
    }
  };

  // 教材例の読み込み
  const handleLoadPreset = (presetId: string) => {
    const p = OVERDOSE_PRESETS.find(caseItem => caseItem.id === presetId);
    if (p) {
      setSelectedPointIds(p.initialPointIds);
      setPrescriptionTitle(p.name);
      setRationaleText(`【症候】${p.symptomSummary}\n【課題】${p.mistakePattern}`);
    }
  };

  return (
    <div className="clinical-exercises clinical-haiketsu min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      <Suspense fallback={null}><IncomingAcupoint onSelect={selectIncomingPoint} /></Suspense>
      <ClinicalToolBridge selectedCodes={selectedPointIds.map(id => ACUPOINT_ROLES[id]?.code).filter(Boolean)} editableCodes={Object.values(ACUPOINT_ROLES).map(point => point.code)} onRestore={restoreClinicalPoints} />
      <div className="page-layout page-layout--intro">
        <PageIntro compact eyebrow="基本32穴の配穴演習" title="配穴の練習" art="points" description="経穴を選び、構成を確かめ、選んだ選んだ理由を書く。教材例と比べながら練習できます。" />
        <details className="page-help mt-4">
          <summary>演習の内容</summary>
          <p>基本32穴から経穴を選び、本治・標治の内訳や、昇降・寒熱の方向を示す教材上の分類を確認します。経穴は8穴まで選べます。教材例と比べて、選んだ理由を考えます。</p>
        </details>
      </div>

      <div className="page-layout page-layout--continuation space-y-8">
        
        {/* 比較検討用ケース */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#737C77] dark:text-[#8899A6] block">
              比較検討用ケース（多穴構成・複合所見の整理例）:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {OVERDOSE_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset.id)}
                className="min-h-11 text-sm px-3 py-1.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-[#59615D] dark:text-[#96A6B2] transition-colors flex items-center gap-1.5"
              >
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* メイングリッド：左＝配穴分析・処方入力、右＝ツボ選択パレット */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 左カラム：現在の処方・リアルタイム分析（7カラム） */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* スコア・ステータスカード（点数による断定を排し、構成バランスの可視化へ） */}
            <div className="clinical-exercise-surface space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <span className="text-sm text-[#737C77] dark:text-[#8899A6] block font-medium">
                    配穴の構成バランス（教材モデル分析）
                  </span>
                  <div className="mt-2 flex flex-col items-start gap-2">
                    <span className={`text-sm sm:text-base font-bold px-3 py-1 rounded-full ${
                      analysis.status === "optimal" 
                        ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300" 
                        : analysis.status === "acceptable"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    }`}>
                      {analysis.statusText}
                    </span>
                    <span className="text-sm leading-relaxed text-[#737C77] dark:text-[#8899A6]">
                      ※臨床効果の断定ではなく教材例との対比指標
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-left text-sm text-[#737C77] dark:text-[#8899A6] sm:text-right">
                  <p>選択中: <strong className="text-[#232826] dark:text-[#FAF8F5] text-base">{selectedPointIds.length}</strong> 穴</p>
                  <p className="text-sm mt-0.5">（基本32穴パレット）</p>
                  <p className="mt-1 text-sm">{getPrescriptionCountLabel(selectedPointIds.length)}</p>
                </div>
              </div>

              <PrescriptionScoringGuide />
              {/* 本治 vs 標治 比率バー */}
              <div className="space-y-1.5 pt-2 border-t border-[#E5DEC9] dark:border-[#2A3B4A]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                    本治（伝統理論上の全身・背景の病態を検討）: {analysis.rootCount}穴
                  </span>
                  <span className="text-[#B86924] dark:text-[#E6C387] font-bold">
                    標治（局所対症）: {analysis.branchCount}穴
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E5DEC9] dark:bg-[#2A3B4A] overflow-hidden flex">
                  <div 
                    className="h-full bg-[#1E3D34] dark:bg-[#74BA9E]"
                    style={{ width: `${selectedPointIds.length > 0 ? analysis.rootRatio : 50}%` }}
                  />
                  <div 
                    className="h-full bg-[#B86924] dark:bg-[#E6C387]"
                    style={{ width: `${selectedPointIds.length > 0 ? 100 - analysis.rootRatio : 50}%` }}
                  />
                </div>
              </div>

              {/* 警告・相殺アラート */}
              {analysis.alerts.length > 0 && (
                <div className="space-y-2 pt-2">
                  {analysis.alerts.map(alert => (
                    <div 
                      key={alert.id}
                      className={`p-3.5 rounded-xl border text-sm space-y-1 ${
                        alert.severity === "high"
                          ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200"
                          : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{alert.title}</span>
                      </div>
                      <p className="leading-relaxed opacity-90">{alert.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 選択されたツボのカードリスト */}
            <div className="space-y-3">
              <span className="text-sm font-bold text-[#737C77] dark:text-[#8899A6] block">
                選択中の経穴
              </span>
              <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">本治・標治は教材上の分類です。今回の治法と所見に照らして検討してください。</p>
              {selectedPointIds.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-[#17212A] rounded-2xl border border-dashed border-[#E5DEC9] dark:border-[#2A3B4A] text-sm text-[#737C77]">
                  右側のパレットからツボをクリックして配穴を構成してください
                </div>
              ) : (
                <div className="clinical-haiketsu-selected-list">
                  {selectedPointIds.map(id => {
                    const role = ACUPOINT_ROLES[id];
                    if (!role) return null;
                    return (
                      <div
                        key={id}
                        className="clinical-haiketsu-selected flex items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                              {role.name}
                            </span>
                            <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                              {role.code}
                            </span>
                            <span className="text-sm text-[#59615D] dark:text-[#B7C5CF]">
                              {role.tierLabel}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
                            <p className="text-sm text-[#59615D] dark:text-[#96A6B2] leading-tight">
                              {role.specificRole} / {role.energyLabel}
                            </p>
                            <Link
                              href={`/tsubo/${role.code.toLowerCase()}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                trackEvent("context_link_click", {
                                  context_pair: "haiketsu_tsubo",
                                  destination_type: "tool",
                                  placement: "haiketsu_card",
                                });
                              }}
                              className="text-sm text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-0.5 font-semibold shrink-0"
                              title={`${role.name}（${role.code}）の取穴と解剖安全を別タブで確認`}
                            >
                              <span>取穴詳細</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>

                        <button
                          onClick={() => togglePoint(id)}
                          className="min-h-11 min-w-11 shrink-0 inline-flex items-center justify-center rounded text-[#737C77] hover:text-red-600 transition-colors"
                          aria-label={`${role.name}を配穴から外す`}
                          title="このツボを処方から外す"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 処方名 ＆ 選定理由入力フォーム */}
            <div className="clinical-exercise-surface clinical-haiketsu-save space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F2ECE0] dark:border-[#22303D]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#B86924]" />
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                      理由を残す
                    </h3>
                  </div>
                  <p className="text-sm text-[#59615D] dark:text-[#96A6B2]">
                    この画面で教材例と自分の考えを比べられます。
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <label htmlFor="haiketsu-title" className="font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
                    処方名・タイトル
                  </label>
                  <input
                    id="haiketsu-title"
                    type="text"
                    value={prescriptionTitle}
                    onChange={event => setPrescriptionTitle(event.target.value)}
                    placeholder="例: 頑固な自律神経失調・昇降調和処方"
                    className="min-h-11 w-full px-3 py-2 rounded-xl border text-[#232826] dark:text-[#FAF8F5] bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A]"
                  />
                </div>

                <div>
                  <label htmlFor="haiketsu-rationale" className="font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
                    この配穴を検討する理由・伝統的な目的
                  </label>
                  <textarea
                    id="haiketsu-rationale"
                    value={rationaleText}
                    onChange={event => setRationaleText(event.target.value)}
                    placeholder="なぜ主穴を太衝にしたのか、なぜ合谷と組み合わせたのか、患者のどのような病態にアプローチするのかを記述..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-xl border text-[#232826] dark:text-[#FAF8F5] leading-relaxed bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* 右カラム：ツボ選択パレット（5カラム） */}
          <div className="lg:col-span-5 space-y-4">
            <div className="clinical-exercise-surface clinical-haiketsu-palette space-y-4 lg:sticky lg:top-20">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  経穴を選ぶ
                </span>
                <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  8穴まで追加・解除
                </span>
              </div>

              {/* 検索・絞り込み */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {allPoints.map(point => {
                  const isSelected = selectedPointIds.includes(point.id);
                  return (
                    <button
                      key={point.id}
                      aria-pressed={isSelected}
                      onClick={() => togglePoint(point.id)}
                      className={`clinical-haiketsu-point min-h-11 w-full text-left p-3 rounded-lg border text-sm transition-colors flex flex-wrap items-center justify-between gap-x-3 gap-y-2 ${
                        isSelected
                          ? "bg-[#EBF3EF] dark:bg-[#182823] border-[#709B87] text-[#1E3D34] dark:text-[#83BEA8] font-bold"
                          : "bg-transparent border-transparent text-[#59615D] dark:text-[#B7C5CF] hover:bg-[#F2F5EF] dark:hover:bg-[#182823]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                          {point.name}
                        </span>
                        <span className="text-sm text-[#737C77]">
                          {point.code}
                        </span>
                        <span className="text-sm text-[#737C77]">
                          {point.meridianShort}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-sm text-[#59615D] dark:text-[#B7C5CF]">
                          {point.energyLabel}
                        </span>
                        {isSelected && <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#1E3D34] dark:text-[#83BEA8]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

function IncomingAcupoint({ onSelect }: { onSelect: (id: string) => void }) {
  const params = useSearchParams();
  const requested = params.get("acupoint") || params.get("add");
  // Resolve public names/codes only. Keep the tool's content in the initial HTML.
  const point = Object.values(ACUPOINT_ROLES).find(item => item.name === requested || item.code.toLowerCase() === requested?.toLowerCase());
  useEffect(() => {
    if (!point) return;
    const timer = setTimeout(() => onSelect(point.id), 0);
    return () => clearTimeout(timer);
  }, [point, onSelect]);
  if (requested && !point) return <p role="status" className="mx-auto max-w-6xl px-4 pt-5 text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">配穴演習は基本32穴を対象にしています。指定された経穴はこの教材に含まれないため、表示中の基本配穴から練習できます。</p>;
  return null;
}
