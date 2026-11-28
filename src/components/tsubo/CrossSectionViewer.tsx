"use client";

import React, { type ReactNode, useState } from "react";
import { getPublicCrossSectionElements, getPublicAnatomyDescription } from "@/data/medicalSafety";
import { crossSectionCallouts } from "@/data/tsubo/atlas/crossSectionCallouts";
import type { SharedAnatomyLandmark } from "@/data/tsubo/atlas/sharedAnatomyLandmarks";
import type {
  CrossSectionModel,
  ReferenceLedgerItem
} from "@/data/tsubo/types";
import { 
  BookOpen, 
  ExternalLink, 
  X, 
  HelpCircle 
} from "lucide-react";

interface CrossSectionViewerProps {
  model: CrossSectionModel;
  pointName: string;
  pointCode: string;
  individualModel?: boolean;
  regional?: boolean;
  sharedLandmarks?: readonly SharedAnatomyLandmark[];
  surface?: ReactNode;
  locationHref?: string;
}

export default function CrossSectionViewer({
  model,
  pointName,
  pointCode,
  individualModel = false,
  regional = false,
  sharedLandmarks = [],
  surface,
  locationHref = "#acupoint-location",
}: CrossSectionViewerProps) {
  // 選択された組織ID（null時は全体表示）
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null);
  // 資料台帳の開閉
  const [isReferenceLedgerOpen, setIsReferenceLedgerOpen] = useState(false);

  // 選択された構造の特定（通過層・境界・近接警戒構造から検索）
  const selectedLayer = model.layers.find((l) => l.id === selectedStructureId);
  const selectedBoundary = model.boundaries?.find((b) => b.id === selectedStructureId);
  const selectedAdjacent = model.adjacentStructures?.find((a) => a.id === selectedStructureId);

  const activeStructure = selectedLayer || selectedBoundary || selectedAdjacent;
  const publicElements = getPublicCrossSectionElements(model);
  const legacyMarker = publicElements.find(element => element.layerId === "point-marker-layer" && element.shapeType === "circle");
  const surfacePoint = regional ? undefined : model.surfacePoint ?? (
    legacyMarker?.cx !== undefined && legacyMarker.cy !== undefined
      ? { x: legacyMarker.cx, y: legacyMarker.cy, label: `${pointName} ${pointCode}`, description: "", diagramNote: "" }
      : undefined
  );
  const pairedSurface = !surfacePoint && surface;
  const publicStructureIds = new Set([...model.layers, ...model.boundaries ?? [], ...model.adjacentStructures ?? []].map(structure => structure.id));
  const numberedLandmarks = sharedLandmarks.filter(({ layerId, elementId }) =>
    publicElements.some(element => element.layerId === layerId && element.elementId === elementId),
  );
  const landmarkSummaryId = `${pointCode.toLowerCase()}-anatomy-landmark-summary`;
  const surfacePointId = (surfacePoint || pairedSurface) ? `${pointCode.toLowerCase()}-anatomy-surface-description` : undefined;
  const diagramDescriptions = [surfacePointId, !regional && numberedLandmarks.length ? landmarkSummaryId : undefined].filter(Boolean).join(" ");
  const callouts = crossSectionCallouts(model, publicElements, numberedLandmarks, regional);
  const selectStructure = (id: string) => setSelectedStructureId(current => current === id ? null : id);

  // キーボード操作ハンドラー
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectStructure(id);
    } else if (e.key === "Escape") {
      setSelectedStructureId(null);
    }
  };

  return (
    <section 
      aria-label={regional ? `${pointName}周辺の断面解剖` : `${pointName}の局所深浅・断面解剖モデル`}
      className="anatomy-viewer bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-2.5 sm:p-5 shadow-sm space-y-5 transition-colors"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{regional ? model.title : pointName + "の断面図"}</h3>
          <p className="atlas-muted">{model.bodySide && model.bodySide + " · "}{model.level}</p>
        </div>
        {!regional && <button
          type="button"
          onClick={() => setIsReferenceLedgerOpen(!isReferenceLedgerOpen)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E3D34] dark:text-[#74BA9E] hover:text-[#B86924] dark:hover:text-[#E6C387] self-start sm:self-auto py-1.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] transition-colors shrink-0 shadow-xs"
          aria-expanded={isReferenceLedgerOpen}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>参照資料と確認範囲</span>
        </button>}
      </div>

      {/* 資料台帳アコーディオン展開部 */}
      {!regional && isReferenceLedgerOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#D6C8AF] dark:border-[#2A3B4A] space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <h4 className="font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E]">
                根拠解剖資料台帳 ＆ 編集方針
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsReferenceLedgerOpen(false)}
              className="text-[#737C77] hover:text-[#232826] dark:hover:text-white text-xs p-1"
              aria-label="資料台帳を閉じる"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {(model.referencesLedger || model.referenceLedger) ? (
              (model.referencesLedger || model.referenceLedger)!.map((item: ReferenceLedgerItem, idx: number) => (
                <div key={idx} className="p-3 bg-white dark:bg-[#16222C] rounded-xl border border-[#E8DEC9] dark:border-[#263542] text-xs space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                      {item.title}
                    </span>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#1E3D34] underline underline-offset-2 dark:text-[#74BA9E]"
                      >
                        原典を読む
                        <ExternalLink aria-hidden="true" className="h-3 w-3" />
                      </a>
                    ) : item.doi && (
                      <a
                        href={item.doi.startsWith("http") ? item.doi : `https://doi.org/${item.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#B86924] dark:text-[#E6C387] hover:underline font-mono text-[11px]"
                      >
                        <span>DOI: {item.doi.replace("https://doi.org/", "")}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="text-[#59615D] dark:text-[#A0B0BC] text-[11px]">
                    著者: {item.authors || item.author} ({item.year}) — {item.publisherOrJournal || item.journal}
                  </div>
                  {item.confirmedItems && item.confirmedItems.length > 0 && (
                    <div className="pt-1 text-[11px] text-[#404743] dark:text-[#C5D2DB]">
                      <span className="font-semibold text-[#1E3D34] dark:text-[#74BA9E]">台帳に記載された構造：</span>
                      {item.confirmedItems.join("、")}
                    </div>
                  )}
                  {item.unconfirmedOrReserved && (
                    <div className="text-[11px] text-[#A83629] dark:text-[#E57373]">
                      <span className="font-semibold">図に反映していない項目：</span>
                      {item.unconfirmedOrReserved}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <ul className="list-disc list-inside space-y-1 text-xs text-[#59615D] dark:text-[#A0B0BC]">
                {model.references.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            )}

            <div className="p-2.5 rounded-lg bg-[#F2EDE4] dark:bg-[#17232F] text-[11px] text-[#59615D] dark:text-[#9FB1C1] leading-relaxed">
              <strong>【資料の扱い】</strong> 台帳はモデルが参照する資料と記述の範囲を示します。参照資料の存在だけで、この経穴の全層構造や表示位置が個別に検証されたことにはなりません。WHOの位置標準、解剖資料、研究結果の適用範囲を分けて確認してください。
            </div>
          </div>
        </div>
      )}

      {/* 2. メイン図エリア：SVG断面図（主役） */}
      <figure className="anatomy-figure w-full rounded-2xl border border-[#E8E1D1] bg-[#FAF8F5] p-2 sm:rounded-3xl sm:p-4 dark:border-[#22303D] dark:bg-[#10171F]">
        <div className={pairedSurface ? "atlas-anatomy-views" : undefined}>
          {pairedSurface && (
            <div data-anatomy-surface-view="" className="atlas-anatomy-surface">
              <div className="atlas-anatomy-surface-image">{pairedSurface}</div>
              <div className="atlas-anatomy-surface-key">
                <h4>体表での位置</h4>
                <p className="atlas-location-key"><strong data-anatomy-point-name="">{pointName}（{pointCode}）</strong></p>
                <a href={locationHref} className="atlas-source-link inline-flex min-h-11 items-center">詳しい位置図を見る</a>
              </div>
            </div>
          )}
          <div className="min-w-0">
            {pairedSurface && <h4 className="atlas-anatomy-section-title">周辺の組織の断面</h4>}
            <p className="anatomy-axis anatomy-axis--vertical">↑ {model.axes.vertical[0]}</p>

            {/* SVG断面図 */}
            <svg
              viewBox={callouts.viewBox}
              className="mx-auto my-2 block h-auto w-full max-w-[32rem]"
              preserveAspectRatio="xMidYMid meet"
              role="group"
              aria-label={regional ? `${model.title}の断面模式図` : `${pointName}の横断面解剖図`}
              aria-describedby={diagramDescriptions || undefined}
            >
              {/* 断面要素描画 */}
              {publicElements.filter(element => element.layerId !== "point-marker-layer").map((el) => {
                const interactive = publicStructureIds.has(el.layerId);
                const isSelected = selectedStructureId === el.layerId;
                const opacity = interactive && selectedStructureId && !isSelected ? 0.35 : 1;
                const stroke = isSelected ? "#B86924" : el.stroke || "none";
                const strokeWidth = isSelected ? 3.5 : el.strokeWidth || 1;

                const commonProps = {
                  id: el.elementId,
                  fill: el.fill,
                  stroke,
                  strokeWidth,
                  opacity,
                  tabIndex: interactive ? 0 : undefined,
                  role: interactive ? "button" : undefined,
                  "aria-label": interactive ? el.label : undefined,
                  "aria-pressed": interactive ? isSelected : undefined,
                  className: interactive ? "transition-all duration-200 cursor-pointer hover:opacity-90" : "pointer-events-none",
                  onClick: interactive ? () => selectStructure(el.layerId) : undefined,
                  onKeyDown: interactive ? (e: React.KeyboardEvent) => handleKeyDown(e, el.layerId) : undefined,
                };

                return (
                  <g key={`g-${el.elementId}`}>
                    {el.shapeType === "path" && el.d && (
                      <path {...commonProps} d={el.d} />
                    )}
                    {el.shapeType === "circle" && el.cx !== undefined && el.cy !== undefined && (
                      <circle {...commonProps} cx={el.cx} cy={el.cy} r={el.r || 6} />
                    )}
                    {el.shapeType === "ellipse" && el.cx !== undefined && el.cy !== undefined && (
                      <ellipse {...commonProps} cx={el.cx} cy={el.cy} rx={el.rx || 20} ry={el.ry || 15} />
                    )}
                    {el.shapeType === "rect" && el.x !== undefined && el.y !== undefined && (
                      <rect {...commonProps} x={el.x} y={el.y} width={el.width || 40} height={el.height || 20} rx={el.rx || 0} />
                    )}
                    {el.shapeType === "polygon" && el.points && (
                      <polygon {...commonProps} points={el.points} />
                    )}
                  </g>
                );
              })}
              {callouts.labels.map(({ element, name, x, y, edge, origin, lines }) => {
                const path = `M${origin.x} ${origin.y}L${x} ${edge}`;
                const active = selectedStructureId === element.layerId;
                return (
                  <g key={element.elementId} aria-hidden="true" data-anatomy-callout={name} className="text-[var(--text-sumi)]">
                    <g className="pointer-events-none">
                      <path d={path} fill="none" stroke="var(--bg-card)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                      <path d={path} fill="none" stroke={active ? "var(--warm-readable)" : "currentColor"} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <circle cx={origin.x} cy={origin.y} r="4" fill="currentColor" stroke="var(--bg-card)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </g>
                    <text x={x} y={y} fill={active ? "var(--warm-readable)" : "currentColor"} fontSize={callouts.fontSize} fontWeight="700"
                      textAnchor="middle" className="cursor-pointer sm:[font-size:20px]" onClick={() => selectStructure(element.layerId)}>
                      {lines.map((line, index) => <tspan key={index} x={x} dy={index === 0 ? 0 : "1.25em"}>{line}</tspan>)}
                    </text>
                  </g>
                );
              })}
              {surfacePoint && (
                <g aria-hidden="true" className="pointer-events-none">
                  <text data-anatomy-point-name="" x={surfacePoint.x} y={surfacePoint.y - 22} textAnchor="middle" fill="var(--warm-readable)" stroke="var(--bg-card)" strokeWidth="4" strokeLinejoin="round" style={{ paintOrder: "stroke fill" }} fontSize="25" fontWeight="700">
                    {surfacePoint.label}
                  </text>
                  <circle data-anatomy-surface-point="" cx={surfacePoint.x} cy={surfacePoint.y} r="11" fill="#7F3520" stroke="#FFF9F0" strokeWidth="3" />
                </g>
              )}
            </svg>

            <div className="anatomy-axis-pair">
              <p className="anatomy-axis">← {model.axes.horizontal[0]}</p>
              <p className="anatomy-axis">{model.axes.horizontal[1]} →</p>
            </div>
            <p className="anatomy-axis anatomy-axis--vertical">↓ {model.axes.vertical[1]}</p>
          </div>
        </div>
        <figcaption className="mt-2 flex items-start gap-2 border-t border-[#E8E1D1] pt-2.5 text-sm leading-relaxed text-[#59615D] dark:border-[#22303D] dark:text-[#A0B0BC]">
          <HelpCircle aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-[#B86924]" />
          <div className="min-w-0 space-y-1">
            {!regional && <p>{individualModel ? "このツボの教育用模式図です。" : "部位別の共通模式図です。"}組織の配置は専門家による確認前です。刺鍼の安全域や経路の決定には使用できません。</p>}
            {surfacePoint && <p id={surfacePointId}>
              <strong>丸印は{pointName}の体表での位置です。</strong>
              {surfacePoint.description && ` ${surfacePoint.description}`}
              {surfacePoint.diagramNote && ` ${surfacePoint.diagramNote}`}
            </p>}
            {pairedSurface && <p id={surfacePointId}>体表図の丸印が{pointName}です。断面図では、周辺の組織の並びを示しています。</p>}
            {!regional && numberedLandmarks.length > 0 && <p id={landmarkSummaryId}>
              <span className="sr-only">位置図と同じ目印は、{numberedLandmarks.map(({ number, name }) => `${number}番の${name}`).join("と")}です。</span>
              <a href={locationHref} className="atlas-source-link inline-flex min-h-11 items-center">同じ目印を位置図で見る</a>
            </p>}
            <p>図の部位を選ぶと、説明を読めます。</p>
          </div>
        </figcaption>
      </figure>

      <p role="status" className="sr-only">{activeStructure ? `${activeStructure.name}を選択しました。` : ""}</p>
      {activeStructure && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#16222C] border-2 border-[#B86924] dark:border-[#E6C387] shadow-sm space-y-3 animate-in fade-in duration-150">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              {activeStructure.englishName && (
                <span className="text-[10px] font-mono text-[#737C77] dark:text-[#8899A6] block">
                  {activeStructure.englishName}
                </span>
              )}
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                {activeStructure.name}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setSelectedStructureId(null)}
              className="inline-flex items-center gap-1 text-xs text-[#737C77] hover:text-[#232826] dark:hover:text-white py-1 px-2 rounded-lg hover:bg-[#F2EDE4] dark:hover:bg-[#1F2E3B] transition-colors"
              aria-label="選択解除"
            >
              <X className="w-3.5 h-3.5" />
              <span>閉じる</span>
            </button>
          </div>

          {/* バッジ列 */}
          {!regional && <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className={`px-2 py-0.5 rounded-md font-bold ${
              activeStructure.dangerLevel === "hazard"
                ? "bg-[#F87171]/20 text-[#DC2626] border border-[#F87171]/40"
                : activeStructure.dangerLevel === "caution"
                ? "bg-[#FCD34D]/20 text-[#D97706] border border-[#FCD34D]/40"
                : "bg-[#1E3D34]/15 text-[#1E3D34] dark:text-[#74BA9E]"
            }`}>
              {activeStructure.dangerLevel === "hazard" ? "深刺警戒" : activeStructure.dangerLevel === "caution" ? "接触注意" : "通過層/境界目印"}
            </span>

            {"position" in activeStructure && activeStructure.position && (
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] text-[#59615D] dark:text-[#A0B0BC]">
                位置: {activeStructure.position}
              </span>
            )}

            {"relation" in activeStructure && activeStructure.relation && (
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] text-[#59615D] dark:text-[#A0B0BC]">
                関係: {activeStructure.relation}
              </span>
            )}
          </div>}

          {/* 詳細説明 */}
          <p className="text-xs sm:text-sm text-[#404743] dark:text-[#CBD8E2] leading-relaxed">
            {getPublicAnatomyDescription(activeStructure)}
          </p>

          {!regional && <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">実技・刺激の説明は専門家確認待ちです。参照資料の掲載だけで、この模式図の位置や手技が検証されたことにはなりません。</p>}
        </div>
      )}
    </section>
  );
}
