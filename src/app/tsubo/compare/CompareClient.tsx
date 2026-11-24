"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  X, 
  Plus, 
  AlertTriangle,
  Pencil,
  Printer,
} from "lucide-react";
import { normalizeSearchText } from "@/utils/search";
import { ATLAS_LEARNING_PAIRS } from "@/data/tsubo/atlas/learningPairs";
import AtlasLocationCheck from "@/components/tsubo/atlas/AtlasLocationCheck";
import type { Tsubo } from "@/types/oriental";
import { PRESET_TSUBO_COMPARISONS } from "./presets";

export type ComparisonPoint = Pick<Tsubo, "id" | "code" | "name" | "kana" | "romaji" | "meridian" | "meridianShort" | "bodyPart" | "locationSimple" | "clinicalNote"> & {
  category: readonly string[];
  traditional: string;
  caution: string;
  hasResearch: boolean;
  locationFigure?: React.ReactNode;
};

type CompareProps = { points: readonly ComparisonPoint[] };

const COMPARISON_FIELDS = [
  {
    label: "場所と目印",
    emphasis: "location",
    content: (point: ComparisonPoint) => (
      <>
        {point.locationFigure && <div className="tsubo-compare-location-figure">{point.locationFigure}</div>}
        <p>{point.locationSimple}</p>
        <Link href={`/tsubo/${point.code.toLowerCase()}#acupoint-location`} className="tsubo-compare-detail-link" data-analytics-action="compare_atlas">図で場所を確認</Link>
      </>
    ),
  },
  {
    label: "注意事項",
    emphasis: "caution",
    content: (point: ComparisonPoint) => (
      <>
        <p className="tsubo-compare-caution"><AlertTriangle aria-hidden="true" size={15} /><span>{point.caution}</span></p>
        <Link href={`/tsubo/${point.code.toLowerCase()}#acupoint-cautions`} className="tsubo-compare-detail-link" data-analytics-action="compare_atlas">詳しい注意点</Link>
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
    label: "伝統的な背景",
    content: (point: ComparisonPoint) => <p>{point.traditional}</p>,
  },
  {
    label: "学習上の補足",
    content: (point: ComparisonPoint) => (
      <>
        <p>{point.clinicalNote}</p>
        {point.hasResearch && (
          <Link href={`/tsubo/${point.code.toLowerCase()}#acupoint-research`} className="tsubo-compare-detail-link" data-analytics-action="compare_atlas">研究の範囲と出典</Link>
        )}
      </>
    ),
  },
];

function getRequestedComparisonCodes(params: Pick<URLSearchParams, "get">, points: CompareProps["points"]): string[] {
  const requested = [params.get("a") || params.get("code"), params.get("b"), params.get("c")];
  const resolved = new Set<string>();
  for (const value of requested) {
    if (!value) continue;
    const query = normalizeSearchText(value);
    const point = points.find(t => normalizeSearchText(t.code) === query || normalizeSearchText(t.id) === query);
    if (point) resolved.add(point.code);
  }
  return [...resolved];
}

function TsuboCompareContent({ points }: CompareProps) {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSwapTsubo, setPendingSwapTsubo] = useState<ComparisonPoint | null>(null);
  const [targetReplaceIndex, setTargetReplaceIndex] = useState<number | null>(null);

  // 初期値：URLクエリパラメータ（?a=lu1&b=li4 など）を優先
  const [selectedCodes, setSelectedCodes] = useState<string[]>(() => {
    const requested = getRequestedComparisonCodes(searchParams, points);
    return requested.length ? requested : ["LI4", "LR3"];
  });

  // URLパラメータが動的に変化した際にも追従
  useEffect(() => {
    const resolved = getRequestedComparisonCodes(searchParams, points);
    if (resolved.length > 0) {
      const frame = requestAnimationFrame(() => setSelectedCodes(current => current.length === resolved.length && current.every((code, index) => code === resolved[index]) ? current : resolved));
      return () => cancelAnimationFrame(frame);
    }
  }, [searchParams, points]);

  // 選択されているツボの配列
  const selectedTsubos = useMemo(() => {
    return selectedCodes
      .map(code => points.find(t => t.code === code))
      .filter((t): t is ComparisonPoint => Boolean(t));
  }, [selectedCodes, points]);
  const learningPair = selectedTsubos.length === 2
    ? ATLAS_LEARNING_PAIRS.find(({ codes }) => codes.every(code => selectedCodes.includes(code)))
    : undefined;

  // 検索ヒットツボ一覧
  const searchResults = useMemo(() => {
    const query = normalizeSearchText(searchQuery);
    if (!query) return [];
    return points.filter(t =>
      [t.name, t.kana, t.romaji, t.code, t.meridian].some(field => normalizeSearchText(field).includes(query)),
    ).slice(0, 10);
  }, [searchQuery, points]);

  // ツボの追加・入れ替えハンドラー
  const handleSelectTsubo = (tsubo: ComparisonPoint) => {
    if (selectedCodes.includes(tsubo.code)) return;

    // 特定の列の「変更」から指定された場合
    if (targetReplaceIndex !== null && targetReplaceIndex < selectedCodes.length) {
      const updated = [...selectedCodes];
      updated[targetReplaceIndex] = tsubo.code;
      setSelectedCodes(updated);
      setTargetReplaceIndex(null);
      setSearchQuery("");
      return;
    }

    if (selectedCodes.length >= 3) {
      setPendingSwapTsubo(tsubo);
      return;
    }

    // 空き枠がある場合はそのまま追加
    setSelectedCodes([...selectedCodes, tsubo.code]);
    setSearchQuery("");
  };

  // ツボの削除
  const handleRemoveTsubo = (code: string) => {
    setSelectedCodes(selectedCodes.filter(c => c !== code));
    setTargetReplaceIndex(null);
  };

  // プリセット適用
  const handleApplyPreset = (codes: readonly string[]) => {
    setSelectedCodes([...codes]);
    setTargetReplaceIndex(null);
    setSearchQuery("");
    requestAnimationFrame(() => document.getElementById("tsubo-compare-result-title")?.focus());
  };

  const beginReplacement = (index: number) => {
    setTargetReplaceIndex(index);
    setSearchQuery("");
    document.getElementById("compare-search-input")?.focus();
  };

  return (
    <>
      <div className="page-layout page-layout--continuation tsubo-compare-workspace">
        <section className="tsubo-compare-picker print:hidden" aria-labelledby="tsubo-compare-picker-title">
          <div className="tsubo-compare-picker-heading">
            <h2 id="tsubo-compare-picker-title">比較するツボ</h2>
            <p role="status">{selectedTsubos.length} / 3穴</p>
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
                    onClick={() => handleSelectTsubo(t)}
                    disabled={isAlreadySelected}
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
                  <button type="button" onClick={() => beginReplacement(index)} aria-label={`${point.name}を変更`} title={`${point.name}を変更`}>
                    <strong>{point.name}</strong>
                    <span>{point.code}</span>
                    <Pencil aria-hidden="true" size={14} />
                  </button>
                  <button type="button" onClick={() => handleRemoveTsubo(point.code)} aria-label={`${point.name}を比較から外す`} title="比較から外す">
                    <X aria-hidden="true" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <details className="tsubo-compare-presets print:hidden">
          <summary>比較例から選ぶ</summary>
          <div className="tsubo-compare-preset-grid">
            {PRESET_TSUBO_COMPARISONS.map(preset => (
              <button type="button" key={preset.name} onClick={() => handleApplyPreset(preset.tsuboCodes)}>
                <strong>{preset.name}</strong>
                <span>{preset.desc}</span>
              </button>
            ))}
          </div>
        </details>

        {selectedTsubos.length === 0 ? (
          <p className="tsubo-compare-empty">比較するツボが選ばれていません。検索欄や比較例から追加できます。</p>
        ) : (
          <section aria-labelledby="tsubo-compare-result-title">
            <div className="tsubo-compare-result-heading">
              <h2 id="tsubo-compare-result-title" className="atlas-target" tabIndex={-1}>選んだツボの比較</h2>
              <ComparePrintButton />
            </div>
            <p id="tsubo-compare-scroll-hint" className="tsubo-compare-scroll-hint">
              {selectedTsubos.some(point => Boolean(point.locationFigure)) ? "図の丸印がツボの位置です。「図で場所を確認」で、目印を示した拡大図が開きます。" : "「図で場所を確認」で、目印を示した図が開きます。"}
            </p>
            <div className="tsubo-compare-scroll" tabIndex={0} role="region" aria-labelledby="tsubo-compare-result-title" aria-describedby="tsubo-compare-scroll-hint">
              <table className="tsubo-compare-table" role="table" data-points={selectedTsubos.length}>
                <caption className="sr-only">場所と目印・注意事項・所属経絡・要穴・伝統的な背景・学習上の補足の比較</caption>
                <thead role="rowgroup">
                  <tr role="row">
                    <th scope="col" role="columnheader">比較項目</th>
                    {selectedTsubos.map(point => (
                      <th scope="col" role="columnheader" key={point.id}>
                        <strong className="tsubo-compare-column-point">{point.name}</strong>
                        <span className="tsubo-compare-secondary">{point.code} · {point.kana}</span>
                        <Link href={`/tsubo/${point.code.toLowerCase()}`} target="_blank" className="tsubo-compare-column-link" aria-label={`${point.name}の詳細を見る（新しいタブ）`} data-analytics-action="compare_atlas">詳細を見る ↗</Link>
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
            {learningPair && (
              <div className="mt-4 space-y-3 print:hidden">
                <AtlasLocationCheck
                  key={learningPair.codes[0]}
                  question={learningPair.question}
                  options={selectedTsubos}
                  placement="atlas_comparison"
                />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-frame bg-panel p-3">
                  <p className="min-w-0 flex-1 basis-48 text-sm leading-relaxed">{learningPair.casePrompt}</p>
                  <Link
                    href={`/cases/${learningPair.caseId}`}
                    prefetch={false}
                    className="page-secondary-action"
                    data-analytics-action="compare_case"
                  >
                    {learningPair.caseLabel}
                  </Link>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      {/* 経穴入れ替え選択モーダル（2穴選択済み時に新しい経穴を追加しようとした場合） */}
      {pendingSwapTsubo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#17212A] rounded-3xl max-w-md w-full p-6 border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                比較する経穴の入れ替え
              </h3>
              <button
                type="button"
                onClick={() => setPendingSwapTsubo(null)}
                className="p-1.5 rounded-lg text-[#737C77] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              新しく「<strong className="text-[#1E3D34] dark:text-[#74BA9E]">{pendingSwapTsubo.name}（{pendingSwapTsubo.code}）</strong>」を追加します。どちらの経穴と入れ替えますか？
            </p>

            <div className="space-y-2 pt-1">
              {selectedTsubos.map((current, idx) => (
                <button
                  key={current.id}
                  type="button"
                  onClick={() => {
                    const updated = [...selectedCodes];
                    updated[idx] = pendingSwapTsubo.code;
                    setSelectedCodes(updated);
                    setPendingSwapTsubo(null);
                    setSearchQuery("");
                  }}
                  className="w-full p-3.5 rounded-2xl border border-[#D8CFC0] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:bg-[#FAF8F5] dark:hover:bg-[#1f2c38] text-left flex items-center justify-between transition-all group"
                >
                  <div>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6] block">
                      {idx === 0 ? "左の経穴" : idx === 1 ? "右の経穴" : `第${idx + 1}の経穴`}と入れ替え
                    </span>
                    <strong className="font-serif text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {current.name}（{current.code}）
                    </strong>
                  </div>
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] group-hover:underline">
                    入れ替える ➜
                  </span>
                </button>
              ))}

            </div>

            <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex justify-end">
              <button
                type="button"
                onClick={() => setPendingSwapTsubo(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#737C77] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

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

export default function CompareClient({ points }: CompareProps) {
  return (
    <Suspense fallback={<div className="page-layout page-layout--continuation"><p className="tsubo-compare-empty" role="status">経穴比較を読み込んでいます。</p></div>}>
      <TsuboCompareContent points={points} />
    </Suspense>
  );
}
