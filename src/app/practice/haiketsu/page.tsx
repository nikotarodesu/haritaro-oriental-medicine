"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { useSearchParams } from "next/navigation";
import { 
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
import PrescriptionScoringGuide from "@/components/learning/PrescriptionScoringGuide";

const allPoints = Object.values(ACUPOINT_ROLES);
const INITIAL_EXAMPLE_POINT_IDS = ["taishou", "gokoku"];
const INITIAL_EXAMPLE_TITLE = "合谷と太衝の配穴例";
const INITIAL_EXAMPLE_REASON = "合谷と太衝を組み合わせた教材例です。伝統的な分類と、各穴を選ぶ理由を確認します。";

export default function HaiketsuPracticePage() {

  const [selectedPointIds, setSelectedPointIds] = useState(INITIAL_EXAMPLE_POINT_IDS);
  const [initialExample, setInitialExample] = useState(true);
  const [prescriptionTitle, setPrescriptionTitle] = useState(INITIAL_EXAMPLE_TITLE);
  const [rationaleText, setRationaleText] = useState(INITIAL_EXAMPLE_REASON);
  const selectIncomingPoint = useCallback((id: string) => {
    const point = ACUPOINT_ROLES[id];
    if (!point) return;
    setInitialExample(false);
    setSelectedPointIds([point.id]);
    setPrescriptionTitle(`${point.name}から配穴を考える`);
    setRationaleText(`【教材の経穴説明】${point.name}：${point.specificRole} / ${point.energyLabel}`);
  }, []);

  // 選択中ツボの分析結果
  const analysis = useMemo(() => {
    return analyzePrescription(selectedPointIds);
  }, [selectedPointIds]);

  const selectedPoints = selectedPointIds.map(id => ACUPOINT_ROLES[id]).filter(Boolean);
  const pointGroups = [
    { tier: "root", label: "本治", description: "症状の背景を考える穴", count: analysis.rootCount },
    { tier: "branch", label: "標治", description: "現れている症状を考える穴", count: analysis.branchCount },
  ] as const;

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
    setInitialExample(false);
  };

  function startFromScratch() {
    setSelectedPointIds([]);
    setInitialExample(false);
    setPrescriptionTitle(previous => previous === INITIAL_EXAMPLE_TITLE ? "" : previous);
    setRationaleText(previous => previous === INITIAL_EXAMPLE_REASON ? "" : previous);
  }

  // 教材例の読み込み
  const handleLoadPreset = (presetId: string) => {
    const p = OVERDOSE_PRESETS.find(caseItem => caseItem.id === presetId);
    if (p) {
      setInitialExample(false);
      setSelectedPointIds(p.initialPointIds);
      setPrescriptionTitle(p.name);
      setRationaleText(`【症候】${p.symptomSummary}\n【課題】${p.mistakePattern}`);
    }
  };

  return (
    <div className="clinical-exercises clinical-haiketsu min-h-screen">
      <Suspense fallback={null}><IncomingAcupoint onSelect={selectIncomingPoint} /></Suspense>
      <div className="page-layout page-layout--intro">
        <PageIntro compact eyebrow="基本の32穴から選ぶ" title="配穴を練習する" art="points" description="ツボを組み合わせ、教材上の役割を見比べます。組み合わせた理由も自分の言葉で書けます。">
          <p className="mb-3 text-sm leading-relaxed text-muted">鍼灸学生・鍼灸師向けの学習用教材です。選んだツボや分類は、病気の診断や治療・施術の判断には使えません。</p>
          <a href="#haiketsu-palette" className="page-primary-action">経穴を選ぶ</a>
        </PageIntro>
      </div>

      <div className="page-layout page-layout--continuation space-y-5">
        <details className="reader-contents">
          <summary>教材の例から始める<ChevronDown aria-hidden="true" /></summary>
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
              <p id="haiketsu-selection-status" role="status" className="text-sm text-muted">
                {initialExample ? `例として${selectedPointIds.length}穴を選択済み（合谷・太衝）` : `選択中 ${selectedPointIds.length} / 8穴`}
              </p>
            </div>
            <button type="button" className="ui-text-link min-h-11 text-sm" onClick={startFromScratch} aria-describedby="haiketsu-selection-status">最初から選ぶ</button>
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
            <a href="#haiketsu-review" className="ui-text-link inline-flex min-h-11 items-center">選んだ配穴を確認する</a>
          </section>

          <section id="haiketsu-review" tabIndex={-1} aria-labelledby="haiketsu-review-title" className="min-w-0 space-y-5">
            <h2 id="haiketsu-review-title" className="reader-section-title">配穴を確認する</h2>
            
            <div className="clinical-exercise-surface space-y-5">
              <figure className="clinical-role-figure">
                <figcaption className="font-bold">教材上の役割別の穴数</figcaption>
                {analysis.totalCount > 0 && (
                  <div className="clinical-role-bar" aria-hidden="true">
                    <span data-role="root" style={{ flexGrow: analysis.rootCount }} />
                    <span data-role="branch" style={{ flexGrow: analysis.branchCount }} />
                  </div>
                )}
                <dl className="clinical-role-groups">
                  {pointGroups.map(({ tier, label, description, count }) => (
                    <div key={tier} data-role={tier}>
                      <dt className="clinical-role-heading"><span>{label}</span><span>{count}穴</span></dt>
                      <dd className="clinical-role-description">{description}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-sm leading-relaxed text-muted">本治・標治は教材上の分類です。今回の治法と所見に照らして検討してください。</p>
              </figure>

              {analysis.totalCount > 0 && <div className="space-y-2">
                <h3 className="font-semibold text-ink">選んだツボを見直すポイント</h3>
                {analysis.alerts.length === 0 && (
                  <p className="text-sm text-muted">各穴を選んだ理由を、主訴や治法と結びつけて書いてみましょう。</p>
                )}
                {analysis.alerts.length > 0 && <ul className="space-y-2 pt-2">
                  {analysis.alerts.map(alert => (
                    <li
                      key={alert.id}
                      className="space-y-1 rounded-xl border border-frame bg-page p-3.5 text-sm"
                    >
                      <p className="font-bold">{alert.title}</p>
                      <p className="leading-relaxed text-muted">{alert.description}</p>
                    </li>
                  ))}
                </ul>}
              </div>}

              <PrescriptionScoringGuide />
            </div>

            {/* 選択されたツボのカードリスト */}
            <div className="space-y-3">
              {selectedPointIds.length > 0 && <h3 className="font-semibold text-ink">選択中の経穴</h3>}
              {selectedPointIds.length === 0 ? (
                <div className="p-8 text-center bg-panel rounded-2xl border border-dashed border-frame text-sm text-muted">
                  「経穴を選ぶ」欄から、組み合わせたいツボを選んでください。
                </div>
              ) : (
                <div className="clinical-haiketsu-selected-list">
                  {selectedPoints.map(role => (
                      <div
                        key={role.id}
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
                                  title={`${role.name}（${role.code}）の位置と注意事項を別タブで確認`}
                            >
                              <span>図鑑で位置を見る</span>
                              <ExternalLink aria-hidden="true" className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>

                        <button
                          onClick={() => togglePoint(role.id)}
                          className="min-h-11 min-w-11 shrink-0 inline-flex items-center justify-center rounded text-muted hover:text-red-600 transition-colors"
                          aria-label={`${role.name}を配穴から外す`}
                          title="このツボを処方から外す"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                  ))}
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
                    この組み合わせの名前
                  </label>
                  <input
                    id="haiketsu-title"
                    type="text"
                    value={prescriptionTitle}
                    onChange={event => setPrescriptionTitle(event.target.value)}
                    placeholder="例　合谷と太衝の組み合わせ"
                    className="min-h-11 w-full rounded-lg border border-field bg-page px-3 py-2 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="haiketsu-rationale" className="font-bold text-muted block mb-1">
                    どの所見をもとに、このツボを選びましたか？
                  </label>
                  <textarea
                    id="haiketsu-rationale"
                    value={rationaleText}
                    onChange={event => setRationaleText(event.target.value)}
                    placeholder="主穴にしたツボと、ほかのツボを加えた理由を書きます。"
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
