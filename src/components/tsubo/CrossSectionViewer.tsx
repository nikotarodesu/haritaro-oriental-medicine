"use client";

import React, { useState } from "react";
import { 
  CrossSectionModel, 
  AnatomicalLayer, 
  AdjacentStructure, 
  BoundaryLandmark,
  ReferenceLedgerItem 
} from "@/data/tsubo/types";
import { 
  Layers, 
  ShieldAlert, 
  Compass, 
  Info, 
  AlertTriangle,
  BookOpen,
  ExternalLink,
  X,
  HelpCircle
} from "lucide-react";

interface CrossSectionViewerProps {
  model: CrossSectionModel;
  pointName: string;
  pointCode: string;
}

export default function CrossSectionViewer({
  model,
  pointName,
  pointCode,
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

  // キーボード操作ハンドラー
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedStructureId(selectedStructureId === id ? null : id);
    } else if (e.key === "Escape") {
      setSelectedStructureId(null);
    }
  };

  const summaryText = model.summary || model.summaryTakeaway;

  return (
    <section 
      aria-label={`${pointName}の局所深浅・断面解剖モデル`}
      className="bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-7 shadow-sm space-y-5 transition-colors"
    >
      {/* 1. ヘッダー部：タイトル、1文要約、資料台帳ボタン */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E]">
            <Layers className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>局所深浅・断面解剖モデル</span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#1C2833] border border-[#E8E1D1] dark:border-[#2B3C4E] text-[#737C77] dark:text-[#9FB1C1]">
              {pointCode}
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
            {model.title}
          </h3>

          {/* 1文要約 */}
          {summaryText && (
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed pt-1">
              {summaryText}
            </p>
          )}
        </div>

        {/* 根拠資料台帳ボタン */}
        <button
          type="button"
          onClick={() => setIsReferenceLedgerOpen(!isReferenceLedgerOpen)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E3D34] dark:text-[#74BA9E] hover:text-[#B86924] dark:hover:text-[#E6C387] self-start sm:self-auto py-1.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] transition-colors shrink-0 shadow-xs"
          aria-expanded={isReferenceLedgerOpen}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>根拠資料台帳（Casey 2022等）</span>
        </button>
      </div>

      {/* 資料台帳アコーディオン展開部 */}
      {isReferenceLedgerOpen && (
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
                    {item.doi && (
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
                      <span className="font-semibold text-[#1E3D34] dark:text-[#74BA9E]">確認済構造：</span>
                      {item.confirmedItems.join("、")}
                    </div>
                  )}
                  {item.unconfirmedOrReserved && (
                    <div className="text-[11px] text-[#A83629] dark:text-[#E57373]">
                      <span className="font-semibold">保留・未補間項目：</span>
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
              <strong>【編集方針】</strong> 医学的エビデンスおよびWHO標準規格・査読論文に基づき、確認が取れた層構造と境界指標のみを採用しています。個人差の大きい詳細深度ミリ数値は排し、教育用標準目安（寸）として提示しています。
            </div>
          </div>
        </div>
      )}

      {/* 2. メイン図エリア：SVG断面図（主役） */}
      <div className="relative w-full bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl sm:rounded-3xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-6 overflow-hidden shadow-inner select-none">
        
        {/* 方位インジケーター（上下左右） */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-white/95 dark:bg-[#1C2833]/95 px-2.5 py-0.5 rounded-full border border-[#D6C8AF] dark:border-[#2B3C4E] shadow-xs z-10 pointer-events-none">
          ↑ {model.axes.vertical[0]}
        </div>
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-white/95 dark:bg-[#1C2833]/95 px-2.5 py-0.5 rounded-full border border-[#D6C8AF] dark:border-[#2B3C4E] shadow-xs z-10 pointer-events-none">
          ↓ {model.axes.vertical[1]}
        </div>
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-white/95 dark:bg-[#1C2833]/95 px-2 py-1 rounded-lg border border-[#D6C8AF] dark:border-[#2B3C4E] shadow-xs z-10 pointer-events-none">
          ← {model.axes.horizontal[0]}
        </div>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-white/95 dark:bg-[#1C2833]/95 px-2 py-1 rounded-lg border border-[#D6C8AF] dark:border-[#2B3C4E] shadow-xs z-10 pointer-events-none">
          {model.axes.horizontal[1]} →
        </div>

        {/* SVG断面図 */}
        <svg
          viewBox="0 0 500 270"
          className="w-full h-auto max-h-[380px] my-2"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${pointName}の横断面解剖図`}
        >
          {/* 断面要素描画 */}
          {model.svgElements.map((el) => {
            const isSelected = selectedStructureId === el.layerId;
            const opacity = selectedStructureId && !isSelected ? 0.35 : 1;
            const stroke = isSelected ? "#B86924" : el.stroke || "none";
            const strokeWidth = isSelected ? 3.5 : el.strokeWidth || 1;

            const commonProps = {
              key: el.elementId,
              id: el.elementId,
              fill: el.fill,
              stroke,
              strokeWidth,
              opacity,
              tabIndex: el.layerId !== "needle-indicator" ? 0 : -1,
              role: el.layerId !== "needle-indicator" ? "button" : undefined,
              "aria-label": el.label,
              className: "transition-all duration-200 cursor-pointer outline-none focus:stroke-[#B86924] focus:stroke-[3.5] hover:opacity-90",
              onClick: () => {
                if (el.layerId !== "needle-indicator") {
                  setSelectedStructureId(isSelected ? null : el.layerId);
                }
              },
              onKeyDown: (e: React.KeyboardEvent) => {
                if (el.layerId !== "needle-indicator") {
                  handleKeyDown(e, el.layerId);
                }
              },
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
                {el.labelPos && (
                  <text
                    x={el.labelPos.x}
                    y={el.labelPos.y}
                    textAnchor={el.labelPos.anchor || "middle"}
                    fill={isSelected ? "#9C5417" : "#111827"}
                    stroke="#FFFFFF"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                    style={{ paintOrder: "stroke fill" }}
                    className={`text-[11px] sm:text-xs font-sans font-extrabold pointer-events-none select-none transition-colors ${
                      isSelected ? "fill-[#9C5417] font-black" : "fill-[#111827]"
                    }`}
                  >
                    {el.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 図の下部ガイド */}
        <div className="pt-2.5 border-t border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#B86924]" />
            <span>図の組織をタップすると、その構造の解説と臨床上の注意点が表示されます</span>
          </span>
          <span className="font-mono hidden sm:inline">※教材用模式図</span>
        </div>
      </div>

      {/* 3. タップされた組織のインスペクターカード（選択時に図の直下にスマートに表示） */}
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
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className={`px-2 py-0.5 rounded-md font-bold ${
              activeStructure.dangerLevel === "hazard"
                ? "bg-[#F87171]/20 text-[#DC2626] border border-[#F87171]/40"
                : activeStructure.dangerLevel === "caution"
                ? "bg-[#FCD34D]/20 text-[#D97706] border border-[#FCD34D]/40"
                : "bg-[#1E3D34]/15 text-[#1E3D34] dark:text-[#74BA9E]"
            }`}>
              {activeStructure.dangerLevel === "hazard" ? "深刺警戒" : activeStructure.dangerLevel === "caution" ? "接触注意" : "通過層/境界目印"}
            </span>

            {"depthDescription" in activeStructure && activeStructure.depthDescription && (
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] text-[#59615D] dark:text-[#A0B0BC]">
                深度: {activeStructure.depthDescription}
              </span>
            )}

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
          </div>

          {/* 詳細説明 */}
          <p className="text-xs sm:text-sm text-[#404743] dark:text-[#CBD8E2] leading-relaxed">
            {activeStructure.description}
          </p>

          {/* 臨床要点・響き */}
          {"clinicalSignificance" in activeStructure && Boolean(activeStructure.clinicalSignificance) && (
            <div className="p-2.5 rounded-xl bg-[#FCF4EB] dark:bg-[#231C14] border border-[#E5DEC9] dark:border-[#382E25] text-xs">
              <strong className="text-[#B86924] dark:text-[#E6C387]">臨床的意義・響き：</strong>
              <span className="text-[#333835] dark:text-[#D5E0EA]">{activeStructure.clinicalSignificance}</span>
            </div>
          )}

          {/* 鑑別・触診のコツ */}
          {"differentiationTip" in activeStructure && Boolean(activeStructure.differentiationTip) && (
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8DEC9] dark:border-[#263542] text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <strong className="text-[#1E3D34] dark:text-[#74BA9E]">鑑別・手技のコツ：</strong>
              <span>{activeStructure.differentiationTip}</span>
            </div>
          )}

          {"palpationTip" in activeStructure && Boolean(activeStructure.palpationTip) && (
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8DEC9] dark:border-[#263542] text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <strong className="text-[#1E3D34] dark:text-[#74BA9E]">触診指標：</strong>
              <span>{activeStructure.palpationTip}</span>
            </div>
          )}
        </div>
      )}

      {/* 4. 標準刺入角・深度の目安バー */}
      <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
          <Compass className="w-4 h-4" />
          <span>標準刺入角・深度の目安（教育用）</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs text-[#404743] dark:text-[#C5D2DB]">
          <div>
            <span className="text-[#737C77] dark:text-[#8899A6]">刺入方向：</span>
            <span className="font-medium">{model.needleTrack.angle}</span>
          </div>
          <div>
            <span className="text-[#737C77] dark:text-[#8899A6]">深度の目安：</span>
            <span className="font-medium">{model.needleTrack.safeDepth}</span>
          </div>
        </div>

        {model.needleTrack.warning && (
          <div className="p-2.5 rounded-xl bg-[#FDEDEC] dark:bg-[#231816] border border-[#FADBD8] dark:border-[#3D2220] text-xs text-[#A83629] dark:text-[#C47A72] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{model.needleTrack.warning}</span>
          </div>
        )}
      </div>
    </section>
  );
}
