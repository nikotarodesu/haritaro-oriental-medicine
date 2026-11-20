"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { useSearchParams } from "next/navigation";
import { 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown,
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
    setRationaleText("ツボを選んだ理由は、「臨床記録の練習」で確認・編集できます。");
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
    <div className="clinical-exercises clinical-haiketsu min-h-screen">
      <Suspense fallback={null}><IncomingAcupoint onSelect={selectIncomingPoint} /></Suspense>
      <ClinicalToolBridge selectedCodes={selectedPointIds.map(id => ACUPOINT_ROLES[id]?.code).filter(Boolean)} editableCodes={Object.values(ACUPOINT_ROLES).map(point => point.code)} onRestore={restoreClinicalPoints} />
      <div className="page-layout page-layout--intro">
        <PageIntro compact eyebrow="基本32穴の配穴演習" title="配穴の練習" art="points" description="経穴を選び、組み合わせと選んだ理由を確かめます。教材例からも始められます。">
          <nav className="reader-navigation mt-4" aria-label="配穴演習の進め方">
            <a href="#haiketsu-palette" className="page-primary-action">経穴を選ぶ</a>
            <a href="#haiketsu-review" className="page-secondary-action">配穴を確認する</a>
          </nav>
        </PageIntro>
      </div>

      <div className="page-layout page-layout--continuation space-y-5">
        <details className="reader-contents">
          <summary>教材例から始める<ChevronDown aria-hidden="true" /></summary>
          <div className="grid gap-2 px-3 pb-3 sm:grid-cols-2">
            {OVERDOSE_PRESETS.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset.id)}
                className="min-h-11 cursor-pointer rounded-lg border border-frame bg-panel px-3 py-2 text-left text-sm text-accent hover:border-accent"
              >
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </details>

        <div className="clinical-haiketsu-grid">
          <section id="haiketsu-palette" tabIndex={-1} aria-labelledby="haiketsu-palette-title" className="clinical-exercise-surface clinical-haiketsu-palette min-w-0 space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h2 id="haiketsu-palette-title" className="reader-section-title">経穴を選ぶ</h2>
              <p role="status" className="text-sm text-muted">選択中 {selectedPointIds.length} / 8穴</p>
            </div>
            <div role="region" aria-label="経穴一覧" tabIndex={0} className="clinical-haiketsu-point-list grid gap-1.5 pe-1">
              {allPoints.map(point => {
                const isSelected = selectedPointIds.includes(point.id);
                return (
                  <button
                    key={point.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => togglePoint(point.id)}
                    className={`clinical-haiketsu-point flex min-h-11 w-full cursor-pointer flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border px-3 py-2 text-left ${
                      isSelected ? "border-accent bg-panel-selected" : "border-divider hover:bg-page"
                    }`}
                  >
                    <span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                      <strong className="font-semibold">{point.name}</strong>
                      <span className="text-sm text-muted">{point.code} · {point.meridianShort}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-muted">
                      {point.energyLabel}
                      {isSelected && <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />}
                    </span>
                  </button>
                );
              })}
            </div>
            <a href="#haiketsu-review" className="ui-text-link">選んだ配穴を確認する</a>
          </section>

          <section id="haiketsu-review" tabIndex={-1} aria-labelledby="haiketsu-review-title" className="min-w-0 space-y-5">
            <h2 id="haiketsu-review-title" className="reader-section-title">配穴を確認する</h2>
            
            {/* スコア・ステータスカード（点数による断定を排し、構成バランスの可視化へ） */}
            <div className="clinical-exercise-surface space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <span className="text-sm text-muted block font-medium">
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
                    <span className="text-sm leading-relaxed text-muted">
                      ※臨床効果の断定ではなく教材例との対比指標
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-left text-sm text-muted sm:text-right">
                  <p>選択中: <strong className="text-ink text-base">{selectedPointIds.length}</strong> 穴</p>
                  <p className="text-sm mt-0.5">（基本32穴パレット）</p>
                  <p className="mt-1 text-sm">{getPrescriptionCountLabel(selectedPointIds.length)}</p>
                </div>
              </div>

              <PrescriptionScoringGuide />
              {/* 本治 vs 標治 比率バー */}
              <div className="space-y-1.5 pt-2 border-t border-frame">
                <div className="flex justify-between text-sm">
                  <span className="text-accent font-bold">
                    本治（伝統理論上の全身・背景の病態を検討）: {analysis.rootCount}穴
                  </span>
                  <span className="text-warm font-bold">
                    標治（局所対症）: {analysis.branchCount}穴
                  </span>
                </div>
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-panel-muted">
                  <div 
                    className="h-full bg-accent"
                    style={{ width: `${selectedPointIds.length > 0 ? analysis.rootRatio : 50}%` }}
                  />
                  <div 
                    className="h-full bg-[var(--warm-readable)]"
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
              <span className="text-sm font-bold text-muted block">
                選択中の経穴
              </span>
              <p className="text-sm leading-relaxed text-muted">本治・標治は教材上の分類です。今回の治法と所見に照らして検討してください。</p>
              {selectedPointIds.length === 0 ? (
                <div className="p-8 text-center bg-panel rounded-2xl border border-dashed border-frame text-sm text-muted">
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
                            <span className="font-serif font-bold text-sm text-ink">
                              {role.name}
                            </span>
                            <span className="text-sm text-muted">
                              {role.code}
                            </span>
                            <span className="text-sm text-muted">
                              {role.tierLabel}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
                            <p className="text-sm text-muted leading-tight">
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
                              className="text-sm text-accent hover:underline inline-flex items-center gap-0.5 font-semibold shrink-0"
                              title={`${role.name}（${role.code}）の取穴と解剖安全を別タブで確認`}
                            >
                              <span>取穴詳細</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>

                        <button
                          onClick={() => togglePoint(id)}
                          className="min-h-11 min-w-11 shrink-0 inline-flex items-center justify-center rounded text-muted hover:text-red-600 transition-colors"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-divider">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText aria-hidden="true" className="h-4 w-4 text-accent" />
                    <h3 className="font-serif text-base font-semibold text-ink">
                      配穴を選んだ理由
                    </h3>
                  </div>
                  <p className="text-sm text-muted">
                    このページを開いている間、教材例と自分の考えを比べられます。
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <label htmlFor="haiketsu-title" className="font-bold text-muted block mb-1">
                    処方名・タイトル
                  </label>
                  <input
                    id="haiketsu-title"
                    type="text"
                    value={prescriptionTitle}
                    onChange={event => setPrescriptionTitle(event.target.value)}
                    placeholder="例: 頑固な自律神経失調・昇降調和処方"
                    className="min-h-11 w-full rounded-lg border border-field bg-page px-3 py-2 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="haiketsu-rationale" className="font-bold text-muted block mb-1">
                    この配穴を検討する理由・伝統的な目的
                  </label>
                  <textarea
                    id="haiketsu-rationale"
                    value={rationaleText}
                    onChange={event => setRationaleText(event.target.value)}
                    placeholder="なぜ主穴を太衝にしたのか、なぜ合谷と組み合わせたのか、患者のどのような病態にアプローチするのかを記述..."
                    rows={4}
                    className="w-full rounded-lg border border-field bg-page px-3 py-2 text-base leading-[1.8]"
                  />
                </div>
              </div>
            </div>

          </section>

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
  if (requested && !point) return <p role="status" className="mx-auto max-w-6xl px-4 pt-5 text-sm leading-relaxed text-muted">配穴演習は基本32穴を対象にしています。指定された経穴はこの教材に含まれないため、表示中の基本配穴から練習できます。</p>;
  return null;
}
