"use client";

import React, { useState, useMemo, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Plus,
  AlertTriangle,
  ArrowRight,
  Pencil,
  Printer,
} from "lucide-react";
import { normalizeSearchText } from "@/utils/search";
import { getAtlasLearningPair } from "@/data/tsubo/atlas/learningPairs";
import { atlasPairPracticeReview } from "@/data/tsubo/atlas/practiceReviews";
import AtlasLocationCheck from "@/components/tsubo/atlas/AtlasLocationCheck";
import type { Tsubo } from "@/types/oriental";
import { PRESET_TSUBO_COMPARISONS } from "./presets";
import { comparisonSelectionHref, type ComparisonPairOrigin } from "./selection";

export type ComparisonChoice = Pick<Tsubo, "id" | "code" | "name" | "kana" | "romaji" | "meridian" | "meridianShort">;
export type ComparisonPoint = ComparisonChoice & Pick<Tsubo, "bodyPart" | "locationSimple"> & {
  figureRegion?: string;
  category: readonly string[];
  traditional?: string;
  caution: string;
  symptomWarning?: string;
  hasResearch: boolean;
  locationFigure: React.ReactNode;
};

type CompareProps = {
  choices: readonly ComparisonChoice[];
  selectedTsubos: readonly ComparisonPoint[];
  origin?: ComparisonPairOrigin;
  unavailableCount?: number;
};

const COMPARISON_FIELDS = [
  {
    label: "ツボごとの注意",
    emphasis: "caution",
    content: (point: ComparisonPoint) => (
      <>
        <p className="tsubo-compare-caution"><AlertTriangle aria-hidden="true" size={15} /><span>{point.caution}</span></p>
        <Link href={`/tsubo/${point.code.toLowerCase()}#acupoint-cautions`} className="tsubo-compare-detail-link" data-analytics-action="compare_atlas">詳しい注意点</Link>
      </>
    ),
  },
  {
    label: "症状がある場合の受診目安",
    emphasis: "caution",
    content: (point: ComparisonPoint) => (
      <>
        {point.symptomWarning && <p>{point.symptomWarning}</p>}
        <Link href="/safety" className="tsubo-compare-detail-link">受診の目安を読む</Link>
      </>
    ),
  },
  {
    label: "所属経絡",
    content: (point: ComparisonPoint) => (
      <>
        <strong>{point.meridian}</strong>
        <span className="tsubo-compare-secondary">部位：{point.bodyPart}</span>
      </>
    ),
  },
  {
    label: "要穴の分類",
    content: (point: ComparisonPoint) => point.category.length > 0 ? (
      <ul className="tsubo-compare-tags">
        {point.category.map(category => <li key={category}>{category}</li>)}
      </ul>
    ) : "特記なし",
  },
  {
    label: "伝統的な使われ方と研究の出典",
    content: (point: ComparisonPoint) => (
      <>
        {point.traditional && <p>古典に記された例　{point.traditional}</p>}
        {point.hasResearch && (
          <Link href={`/tsubo/${point.code.toLowerCase()}#acupoint-research`} className="tsubo-compare-detail-link" data-analytics-action="compare_atlas">研究の範囲と出典</Link>
        )}
        {!point.traditional && !point.hasResearch && "図鑑に掲載資料なし"}
      </>
    ),
  },
];

export default function CompareClient({ choices, selectedTsubos, origin, unavailableCount = 0 }: CompareProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const focusResultsAfterNavigation = useRef(false);
  const picker = useRef<HTMLDetailsElement>(null);
  const swapDialog = useRef<HTMLDialogElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSwapTsubo, setPendingSwapTsubo] = useState<ComparisonChoice | null>(null);
  const [targetReplaceIndex, setTargetReplaceIndex] = useState<number | null>(null);

  useEffect(() => {
    const dialog = swapDialog.current;
    if (pendingSwapTsubo && dialog && !dialog.open) dialog.showModal();
  }, [pendingSwapTsubo]);

  useEffect(() => {
    if (isPending || !focusResultsAfterNavigation.current) return;
    focusResultsAfterNavigation.current = false;
    if (picker.current) picker.current.open = false;
    document.getElementById("tsubo-compare-result-title")?.focus();
  }, [isPending, selectedTsubos]);

  const selectedCodes = selectedTsubos.map(point => point.code);
  const learningPair = getAtlasLearningPair(selectedCodes);
  const pickerLabel = selectedCodes.length === 0 ? "比べるツボを選ぶ"
    : selectedCodes.length === 1 ? "比べるツボを追加・変更"
    : "比べるツボを変更";

  // 検索ヒットツボ一覧
  const searchResults = useMemo(() => {
    const query = normalizeSearchText(searchQuery);
    if (!query) return [];
    return choices.filter(t =>
      [t.name, t.kana, t.romaji, t.code, t.meridian].some(field => normalizeSearchText(field).includes(query)),
    ).slice(0, 10);
  }, [searchQuery, choices]);

  const changeSelection = (codes: readonly string[], focusResults = false) => {
    setTargetReplaceIndex(null);
    setPendingSwapTsubo(null);
    setSearchQuery("");
    focusResultsAfterNavigation.current = focusResults;
    startTransition(() => router.replace(comparisonSelectionHref(codes, origin), { scroll: false }));
  };

  // ツボの追加・入れ替えハンドラー
  const handleSelectTsubo = (tsubo: ComparisonChoice, trigger: HTMLButtonElement) => {
    if (selectedCodes.includes(tsubo.code)) return;

    // 特定の列の「変更」から指定された場合
    if (targetReplaceIndex !== null && targetReplaceIndex < selectedCodes.length) {
      const updated = [...selectedCodes];
      updated[targetReplaceIndex] = tsubo.code;
      changeSelection(updated, true);
      return;
    }

    if (selectedCodes.length >= 3) {
      trigger.focus({ preventScroll: true });
      setPendingSwapTsubo(tsubo);
      return;
    }

    // 空き枠がある場合はそのまま追加
    changeSelection([...selectedCodes, tsubo.code], selectedCodes.length > 0);
  };

  const beginReplacement = (index: number) => {
    setTargetReplaceIndex(index);
    setSearchQuery("");
    document.getElementById("compare-search-input")?.focus();
  };

  return (
    <>
      <div className="page-layout page-layout--continuation tsubo-compare-workspace">
        {unavailableCount > 0 && (
          <p className="tsubo-compare-empty" role="status">URLで指定されたツボのうち{unavailableCount}穴が見つかりませんでした。名前や経穴コードで探し直せます。</p>
        )}
        <details className="tsubo-compare-controls atlas-disclosure print:hidden" ref={picker} open={selectedTsubos.length < 2}>
          <summary>{pickerLabel}</summary>
          <section className="tsubo-compare-picker" aria-labelledby="tsubo-compare-picker-title">
            <div className="tsubo-compare-picker-heading">
              <h2 id="tsubo-compare-picker-title">比較するツボ</h2>
              <p role="status">{isPending ? "比較を更新しています。" : `${selectedTsubos.length} / 3穴`}</p>
            </div>

            {targetReplaceIndex !== null && selectedTsubos[targetReplaceIndex] && (
              <div className="tsubo-compare-replacement">
                <p id="tsubo-compare-replacement-hint">{selectedTsubos[targetReplaceIndex].name}と入れ替えるツボを検索してください。</p>
                <button type="button" onClick={() => setTargetReplaceIndex(null)}>キャンセル</button>
              </div>
            )}

            <div className="tsubo-compare-search">
              <Search aria-hidden="true" size={18} />
              <input
                id="compare-search-input"
                type="search"
                autoComplete="off"
                aria-label="比較するツボを検索"
                aria-describedby={targetReplaceIndex === null ? undefined : "tsubo-compare-replacement-hint"}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="例：合谷、ごうこく、LI4"
              />
            </div>
            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="text-sm">
                <p role="status">比較に追加できるツボの中に、一致するものがありません。名前、読み、経穴コードを変えて検索できます。</p>
                <a href={`/tsubo?q=${encodeURIComponent(searchQuery.trim())}`} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
                  全361穴の図鑑で探す
                </a>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="tsubo-compare-suggestions">
                {searchResults.map(t => {
                  const isAlreadySelected = selectedCodes.includes(t.code);
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={event => handleSelectTsubo(t, event.currentTarget)}
                      disabled={isPending || isAlreadySelected}
                    >
                      <span>
                        <strong>{t.name}</strong>
                        <span className="tsubo-compare-secondary">{t.code} / {t.meridianShort}</span>
                      </span>
                      {!isAlreadySelected && <Plus aria-hidden="true" size={16} />}
                    </button>
                  );
                })}
              </div>
            )}

            {selectedTsubos.length > 0 && (
              <ul className="tsubo-compare-selection" aria-label="選んだツボ">
                {selectedTsubos.map((point, index) => (
                  <li key={point.id} data-editing={targetReplaceIndex === index || undefined}>
                    <button type="button" disabled={isPending} onClick={() => beginReplacement(index)} aria-label={`${point.name}を変更`} title={`${point.name}を変更`}>
                      <strong>{point.name}</strong>
                      <span>{point.code}</span>
                      <Pencil aria-hidden="true" size={14} />
                    </button>
                    <button type="button" disabled={isPending} onClick={() => changeSelection(selectedCodes.filter(code => code !== point.code))} aria-label={`${point.name}を比較から外す`} title="比較から外す">
                      <X aria-hidden="true" size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <details className="tsubo-compare-presets atlas-disclosure">
            <summary>比較例から選ぶ</summary>
            <div className="tsubo-compare-preset-grid">
              {PRESET_TSUBO_COMPARISONS.map(preset => (
                <button type="button" key={preset.name} disabled={isPending} onClick={() => changeSelection(preset.tsuboCodes, true)}>
                  <strong>{preset.name}</strong>
                  <span>{preset.desc}</span>
                </button>
              ))}
            </div>
          </details>
        </details>

        {selectedTsubos.length === 0 ? (
          unavailableCount === 0 && <p className="tsubo-compare-empty">比較するツボが選ばれていません。検索欄や比較例から追加できます。</p>
        ) : (
          <section aria-labelledby="tsubo-compare-result-title" aria-busy={isPending}>
            <div className="tsubo-compare-result-heading">
              <h2 id="tsubo-compare-result-title" className="atlas-target" tabIndex={-1}>場所と目印</h2>
            </div>
            <p className="tsubo-compare-position-key">図の丸印がツボの位置です。</p>
            {learningPair && <p className="tsubo-compare-position-key">{learningPair.comparisonPrompt}</p>}
            <ul className="tsubo-compare-position-grid" data-points={selectedTsubos.length} role="list" aria-label="ツボの位置を見比べる">
              {selectedTsubos.map(point => (
                <li className="tsubo-compare-position" key={point.id}>
                  <Link
                    href={`/tsubo/${point.code.toLowerCase()}#acupoint-location`}
                    prefetch={false}
                    className="tsubo-compare-position-link"
                    aria-label={`${point.name}の場所を見る`}
                    data-analytics-action="compare_atlas"
                  >
                    <div className="tsubo-compare-position-title">
                      <h3>{point.name} <small>（{point.figureRegion ?? point.bodyPart}）</small></h3>
                      <span>{point.code}</span>
                    </div>
                    {point.locationFigure && <div className="tsubo-compare-location-figure">{point.locationFigure}</div>}
                    <p>{point.locationSimple}</p>
                    <span className="tsubo-compare-detail-link">場所を見る<ArrowRight aria-hidden="true" size={15} /></span>
                  </Link>
                </li>
              ))}
            </ul>
            <details className="tsubo-compare-facts atlas-disclosure">
              <summary id="tsubo-compare-facts-title">注意点・経絡・出典を比べる</summary>
              <p id="tsubo-compare-scroll-hint" className="tsubo-compare-scroll-hint">ツボごとの注意、症状がある場合の受診目安、所属経絡、要穴の分類、研究の出典をまとめています。</p>
              <div className="tsubo-compare-scroll" tabIndex={0} role="region" aria-labelledby="tsubo-compare-facts-title" aria-describedby="tsubo-compare-scroll-hint">
                <table className="tsubo-compare-table" role="table" data-points={selectedTsubos.length}>
                  <caption className="sr-only">ツボごとの注意・受診目安・経絡・要穴・出典の比較</caption>
                  <thead role="rowgroup">
                    <tr role="row">
                      <th scope="col" role="columnheader">比較項目</th>
                      {selectedTsubos.map(point => (
                        <th scope="col" role="columnheader" key={point.id}>
                          <strong className="tsubo-compare-column-point">{point.name}</strong>
                          <span className="tsubo-compare-secondary">{point.code} · {point.kana}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {COMPARISON_FIELDS.map(field => (
                      <tr role="row" key={field.label} data-emphasis={field.emphasis}>
                        <th scope="row" role="rowheader">{field.label}</th>
                        {selectedTsubos.map(point => (
                          <td role="cell" key={point.id}>
                            <strong className="tsubo-compare-row-point" aria-hidden="true">{point.name}</strong>
                            <div>{field.content(point)}</div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
            {learningPair && (
              <div className="mt-4 print:hidden">
                <AtlasLocationCheck
                  key={learningPair.codes[0]}
                  question={learningPair.question}
                  reviewQuestion={atlasPairPracticeReview(learningPair)}
                  options={selectedTsubos}
                  placement="atlas_comparison"
                />
                <details className="tsubo-compare-case atlas-disclosure">
                  <summary>この組み合わせを模擬症例で学ぶ</summary>
                  <p>{learningPair.casePrompt}</p>
                  <Link href={`/cases/${learningPair.caseId}`} prefetch={false} className="tsubo-compare-detail-link" data-analytics-action="compare_case">
                    {learningPair.caseLabel}
                  </Link>
                </details>
              </div>
            )}
            <ComparePrintButton />
          </section>
        )}
      </div>

      <dialog ref={swapDialog} className="tsubo-compare-swap print:hidden" aria-labelledby="tsubo-compare-swap-title" aria-describedby="tsubo-compare-swap-point" onClose={() => setPendingSwapTsubo(null)}>
        {pendingSwapTsubo && (
          <div className="tsubo-compare-swap-content">
            <div className="tsubo-compare-swap-header">
              <h2 id="tsubo-compare-swap-title">どのツボと入れ替えますか？</h2>
              <button type="button" aria-label="入れ替えを閉じる" onClick={() => swapDialog.current?.close()}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <p id="tsubo-compare-swap-point">追加するツボは<strong>{pendingSwapTsubo.name}（{pendingSwapTsubo.code}）</strong>です。</p>
            <ul className="tsubo-compare-swap-options" role="list">
              {selectedTsubos.map((current, idx) => (
                <li key={current.id}>
                  <button type="button" onClick={() => {
                    const updated = [...selectedCodes];
                    updated[idx] = pendingSwapTsubo.code;
                    swapDialog.current?.close();
                    changeSelection(updated, true);
                  }}>
                    {current.name}（{current.code}）と入れ替える<ArrowRight size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="tsubo-compare-swap-cancel" onClick={() => swapDialog.current?.close()}>キャンセル</button>
          </div>
        )}
      </dialog>

    </>
  );
}

function ComparePrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="tsubo-compare-print print:hidden">
      <Printer aria-hidden="true" size={16} />
      比較表を印刷
    </button>
  );
}
