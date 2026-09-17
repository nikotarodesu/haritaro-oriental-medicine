"use client";

import React, { useState, useId } from "react";
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
  CheckCircle2, 
  Info, 
  Eye, 
  Activity, 
  AlertTriangle,
  BookOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  Crosshair,
  MapPin,
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
  // 表示モード：crossSection (断面図), surface (体表と切断線), exploded (層の分解)
  const [viewMode, setViewMode] = useState<"crossSection" | "surface" | "exploded">("crossSection");
  // 選択された構造ID
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null);
  // カテゴリフィルター
  const [categoryFilter, setCategoryFilter] = useState<"all" | "muscle" | "neurovascular" | "bone">("all");
  // ステッパーインデックス（通過層を浅い順に辿る: -1は全体）
  const [stepperIndex, setStepperIndex] = useState<number>(-1);
  // 資料台帳の開閉
  const [isReferenceLedgerOpen, setIsReferenceLedgerOpen] = useState(false);
  // 断面図モード時のミニ体表マップ展開フラグ（スマホやPCでのクイック確認）
  const [showMiniSurfaceMap, setShowMiniSurfaceMap] = useState(false);

  // 選択された構造の特定（3群から検索）
  const selectedLayer = model.layers.find((l) => l.id === selectedStructureId);
  const selectedBoundary = model.boundaries?.find((b) => b.id === selectedStructureId);
  const selectedAdjacent = model.adjacentStructures?.find((a) => a.id === selectedStructureId);

  const activeStructure = selectedLayer || selectedBoundary || selectedAdjacent;

  // カテゴリフィルターによる構造可視性判定
  const isCategoryMatch = (id: string, cat?: string, danger?: string) => {
    if (categoryFilter === "all") return true;
    if (categoryFilter === "muscle") {
      return cat === "muscle" || cat === "tendon" || cat === "fascia";
    }
    if (categoryFilter === "neurovascular") {
      return cat === "nerve" || cat === "vessel" || danger === "hazard" || danger === "caution";
    }
    if (categoryFilter === "bone") {
      return cat === "bone" || cat === "joint";
    }
    return true;
  };

  // ステッパー操作：浅い順に見る
  const handleStepPrev = () => {
    if (stepperIndex <= 0) {
      setStepperIndex(-1);
      setSelectedStructureId(null);
    } else {
      const nextIdx = stepperIndex - 1;
      setStepperIndex(nextIdx);
      setSelectedStructureId(model.layers[nextIdx].id);
    }
  };

  const handleStepNext = () => {
    if (stepperIndex < model.layers.length - 1) {
      const nextIdx = stepperIndex + 1;
      setStepperIndex(nextIdx);
      setSelectedStructureId(model.layers[nextIdx].id);
    }
  };

  const handleStepReset = () => {
    setStepperIndex(-1);
    setSelectedStructureId(null);
  };

  // キーボード操作ハンドラー
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedStructureId(selectedStructureId === id ? null : id);
    } else if (e.key === "Escape") {
      setSelectedStructureId(null);
    }
  };

  return (
    <section 
      aria-label={`${pointName}の局所深浅・断面解剖モデル`}
      className="bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-7 shadow-sm space-y-6 transition-colors"
    >
      {/* 1. 上部ヘッダー部：コンテキストと解剖条件の明示 */}
      <div className="space-y-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E]">
            <Layers className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>局所深浅・断面解剖モデル</span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#1C2833] border border-[#E8E1D1] dark:border-[#2B3C4E] text-[#737C77] dark:text-[#9FB1C1]">
              {pointCode}
            </span>
          </div>

          {/* 資料台帳展開ボタン */}
          <button
            type="button"
            onClick={() => setIsReferenceLedgerOpen(!isReferenceLedgerOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E3D34] dark:text-[#74BA9E] hover:text-[#B86924] dark:hover:text-[#E6C387] self-start sm:self-auto py-1 px-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] transition-colors"
            aria-expanded={isReferenceLedgerOpen}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>根拠資料台帳（Casey 2022等）</span>
          </button>
        </div>

        <div>
          <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
            {model.title}
          </h3>
          {/* 1文要約 */}
          {(model.summary || model.summaryTakeaway) && (
            <p className="mt-2 text-xs sm:text-sm text-[#4A5450] dark:text-[#CBD8E2] leading-relaxed bg-[#FAF8F5] dark:bg-[#10171F] p-3 rounded-xl border border-[#E8E1D1] dark:border-[#22303D]">
              {model.summary || model.summaryTakeaway}
            </p>
          )}
        </div>

        {/* 観察条件・肢位メタデータバッジ列 */}
        <div className="flex flex-wrap gap-2 text-xs pt-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#B1C3D2]">
            <span className="text-[#8C9690] dark:text-[#7D8F9E]">肢位:</span>
            <span className="font-medium text-[#232826] dark:text-[#E8F0F6]">{model.posture || "解剖学的標準位"}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#B1C3D2]">
            <span className="text-[#8C9690] dark:text-[#7D8F9E]">切断高位:</span>
            <span className="font-medium text-[#232826] dark:text-[#E8F0F6]">{model.level}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#B1C3D2]">
            <span className="text-[#8C9690] dark:text-[#7D8F9E]">切断面:</span>
            <span className="font-medium text-[#232826] dark:text-[#E8F0F6]">
              {(model.cuttingPlaneInfo?.planeType || model.cuttingPlane?.planeType || "横断面")}（{(model.cuttingPlaneInfo?.viewDirection || model.cuttingPlane?.viewDirection || "近位視")}）
            </span>
          </div>
          {model.bodySide && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#B1C3D2]">
              <span className="text-[#8C9690] dark:text-[#7D8F9E]">側別:</span>
              <span className="font-medium text-[#232826] dark:text-[#E8F0F6]">{model.bodySide}</span>
            </div>
          )}
        </div>
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
              <strong>【編集方針】</strong> 医学的エビデンスおよびWHO標準規格・査読論文に基づき、確認が取れた層構造と境界指標のみを採用しています。被験者ごとの個人差が大きい詳細深度（ミリメートル値）は安易に単一数値化せず、教育用標準目安（寸）として提示しています。
            </div>
          </div>
        </div>
      )}

      {/* 2. 表示モード切替 ＆ 操作バー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#FAF8F5] dark:bg-[#10171F] p-2 sm:p-2.5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D]">
        
        {/* 3つの表示モード切替タブ */}
        <div className="inline-flex rounded-xl bg-white dark:bg-[#18232D] p-1 border border-[#E5DEC9] dark:border-[#263542] text-xs">
          <button
            type="button"
            onClick={() => {
              setViewMode("crossSection");
              setSelectedStructureId(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              viewMode === "crossSection"
                ? "bg-[#1E3D34] text-white dark:bg-[#2B6958] shadow-xs"
                : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E]"
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>断面解剖</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("surface");
              setSelectedStructureId(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              viewMode === "surface"
                ? "bg-[#1E3D34] text-white dark:bg-[#2B6958] shadow-xs"
                : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E]"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>体表と切断線</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("exploded");
              setSelectedStructureId(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              viewMode === "exploded"
                ? "bg-[#1E3D34] text-white dark:bg-[#2B6958] shadow-xs"
                : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>層の重なり・分解</span>
          </button>
        </div>

        {/* カテゴリ切替ボタン */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] mr-1 hidden sm:inline">強調：</span>
          <button
            type="button"
            onClick={() => setCategoryFilter("all")}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all ${
              categoryFilter === "all"
                ? "bg-[#1E3D34] text-white dark:bg-[#2B6958]"
                : "bg-white dark:bg-[#18232D] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#263542]"
            }`}
          >
            全体
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter("muscle")}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all ${
              categoryFilter === "muscle"
                ? "bg-[#1E2D3D] text-white dark:bg-[#344D66]"
                : "bg-white dark:bg-[#18232D] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#263542]"
            }`}
          >
            筋・腱
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter("neurovascular")}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all flex items-center gap-1 ${
              categoryFilter === "neurovascular"
                ? "bg-[#B86924] text-white dark:bg-[#9C5417]"
                : "bg-white dark:bg-[#18232D] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#263542]"
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>神経・血管</span>
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter("bone")}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all ${
              categoryFilter === "bone"
                ? "bg-[#59615D] text-white dark:bg-[#687570]"
                : "bg-white dark:bg-[#18232D] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#263542]"
            }`}
          >
            骨格・境界
          </button>
        </div>
      </div>

      {/* ステッパー：浅い順に見る */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1 text-[11px]">
            <Compass className="w-3.5 h-3.5" />
            <span>浅い順に見る：</span>
          </span>
          <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] font-medium">
            {stepperIndex >= 0 ? (
              <>第{model.layers[stepperIndex].depthIndex}層：{model.layers[stepperIndex].name}</>
            ) : (
              "全体表示中（選択なし）"
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={handleStepPrev}
            disabled={stepperIndex <= -1}
            className="px-2 py-1 rounded-lg bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] disabled:opacity-30 text-[11px] font-medium flex items-center gap-1 hover:bg-[#F2EDE4]"
            aria-label="前の浅い層へ"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>浅層へ</span>
          </button>
          <button
            type="button"
            onClick={handleStepNext}
            disabled={stepperIndex >= model.layers.length - 1}
            className="px-2 py-1 rounded-lg bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] disabled:opacity-30 text-[11px] font-medium flex items-center gap-1 hover:bg-[#F2EDE4]"
            aria-label="次の深い層へ"
          >
            <span>深層へ</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          {stepperIndex >= 0 && (
            <button
              type="button"
              onClick={handleStepReset}
              className="p-1 rounded-lg bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] text-[#737C77] hover:text-[#232826] text-[11px]"
              title="リセットして全体表示"
              aria-label="全体表示に戻す"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. メインエリア：SVG図 ＆ 階層・境界・危険構造インスペクター */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 左側：SVG図コンテナ（7〜8カラム） */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-3">
          <div className="relative w-full bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-5 overflow-hidden shadow-inner select-none">
            
            {/* 方位インジケーター（断面図モード時のみ表示） */}
            {viewMode === "crossSection" && (
              <>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/90 dark:bg-black/70 px-2.5 py-0.5 rounded-full border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs z-10">
                  ↑ {model.axes.vertical[0]}
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/90 dark:bg-black/70 px-2.5 py-0.5 rounded-full border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs z-10">
                  ↓ {model.axes.vertical[1]}
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/90 dark:bg-black/70 px-2 py-1 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs z-10">
                  ← {model.axes.horizontal[0]}
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/90 dark:bg-black/70 px-2 py-1 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs z-10">
                  {model.axes.horizontal[1]} →
                </div>
              </>
            )}

            {/* ① 断面解剖モードのSVG */}
            {viewMode === "crossSection" && (
              <svg
                viewBox="0 0 500 270"
                className="w-full h-auto max-h-[340px] my-2"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={`${pointName}の横断面解剖図`}
              >
                {/* 断面要素描画 */}
                {model.svgElements.map((el) => {
                  const isSelected = selectedStructureId === el.layerId;
                  
                  // カテゴリマッチ判定
                  const matchedLayer = model.layers.find((l) => l.id === el.layerId);
                  const matchedBoundary = model.boundaries?.find((b) => b.id === el.layerId);
                  const matchedAdj = model.adjacentStructures?.find((a) => a.id === el.layerId);
                  const itemCat = matchedLayer?.category || matchedBoundary?.category || matchedAdj?.category;
                  const itemDanger = matchedLayer?.dangerLevel || matchedBoundary?.dangerLevel || matchedAdj?.dangerLevel;

                  const isCatVisible = isCategoryMatch(el.layerId, itemCat, itemDanger);

                  // 選択状態とカテゴリによる装飾計算
                  let opacity = 1;
                  let fill = el.fill;
                  let stroke = isSelected ? "#B86924" : el.stroke || "none";
                  let strokeWidth = isSelected ? 3.5 : el.strokeWidth || 1;

                  if (!isCatVisible) {
                    opacity = 0.12;
                    fill = "none";
                    stroke = "#9CA3AF";
                    strokeWidth = 1;
                  } else if (selectedStructureId && !isSelected) {
                    opacity = 0.35;
                  }

                  const commonProps = {
                    key: el.elementId,
                    id: el.elementId,
                    fill,
                    stroke,
                    strokeWidth,
                    opacity,
                    tabIndex: el.layerId !== "needle-indicator" ? 0 : -1,
                    role: el.layerId !== "needle-indicator" ? "button" : undefined,
                    "aria-label": el.label,
                    className: "transition-all duration-200 cursor-pointer outline-none focus:stroke-[#B86924] focus:stroke-[3.5]",
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
                      {el.labelPos && isCatVisible && (
                        <text
                          x={el.labelPos.x}
                          y={el.labelPos.y}
                          textAnchor={el.labelPos.anchor || "middle"}
                          className={`text-[10px] font-sans font-bold pointer-events-none select-none drop-shadow-xs transition-opacity ${
                            isSelected 
                              ? "fill-[#B86924] dark:fill-[#E6C387] font-extrabold" 
                              : "fill-[#232826] dark:fill-[#FAF8F5]"
                          }`}
                        >
                          {el.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            )}

            {/* ② 体表と切断線モードのSVG */}
            {viewMode === "surface" && model.surfaceMap && (
              <div className="space-y-2">
                <div className="text-center text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-1">
                  {model.surfaceMap.bodyPartLabel}
                </div>
                <svg
                  viewBox={model.surfaceMap.viewBox || "0 0 420 280"}
                  className="w-full h-auto max-h-[340px] my-1"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label={`${pointName}の体表切断線マップ`}
                >
                  {/* 体表輪郭および骨格指標 */}
                  {model.surfaceMap.elements.map((el) => (
                    <g key={el.elementId}>
                      {el.shapeType === "path" && el.d && (
                        <path
                          d={el.d}
                          fill={el.fill}
                          stroke={el.stroke}
                          strokeWidth={el.strokeWidth || 1.5}
                          strokeDasharray={el.strokeDasharray}
                        />
                      )}
                      {el.shapeType === "circle" && (
                        <circle
                          cx={el.cx}
                          cy={el.cy}
                          r={el.r || 6}
                          fill={el.fill}
                          stroke={el.stroke}
                          strokeWidth={el.strokeWidth || 1}
                        />
                      )}
                      {el.labelPos && (
                        <text
                          x={el.labelPos.x}
                          y={el.labelPos.y}
                          textAnchor={el.labelPos.anchor || "middle"}
                          className="text-[10px] font-sans fill-[#737C77] dark:fill-[#8899A6] select-none"
                        >
                          {el.label}
                        </text>
                      )}
                    </g>
                  ))}

                  {/* 切断線（太い点線 ＆ 観察矢印） */}
                  {model.surfaceMap.cutLine && (
                    <g>
                      <line
                        x1={model.surfaceMap.cutLine.x1}
                        y1={model.surfaceMap.cutLine.y1}
                        x2={model.surfaceMap.cutLine.x2}
                        y2={model.surfaceMap.cutLine.y2}
                        stroke="#B86924"
                        strokeWidth="2.5"
                        strokeDasharray="5 3"
                      />
                      <circle
                        cx={model.surfaceMap.cutLine.arrowX}
                        cy={model.surfaceMap.cutLine.arrowY}
                        r="3"
                        fill="#B86924"
                      />
                      {/* 切断線ラベル */}
                      <text
                        x={(model.surfaceMap.cutLine.x1 + model.surfaceMap.cutLine.x2) / 2}
                        y={Math.min(model.surfaceMap.cutLine.y1, model.surfaceMap.cutLine.y2) - 8}
                        textAnchor="middle"
                        className="text-[11px] font-bold fill-[#B86924] dark:fill-[#E6C387]"
                      >
                        切断面高位（{model.level}）
                      </text>
                    </g>
                  )}

                  {/* 経穴取穴点（ピン） */}
                  {model.surfaceMap.pointCoords && (
                    <g>
                      <circle
                        cx={model.surfaceMap.pointCoords.x}
                        cy={model.surfaceMap.pointCoords.y}
                        r="12"
                        fill="#1E3D34"
                        fillOpacity="0.2"
                      />
                      <circle
                        cx={model.surfaceMap.pointCoords.x}
                        cy={model.surfaceMap.pointCoords.y}
                        r="6"
                        fill="#1E3D34"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        x={model.surfaceMap.pointCoords.x}
                        y={model.surfaceMap.pointCoords.y - 12}
                        textAnchor="middle"
                        className="text-xs font-bold fill-[#1E3D34] dark:fill-[#74BA9E] drop-shadow-xs"
                      >
                        ★ {model.surfaceMap.pointCoords.label}
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            )}

            {/* ③ 層の重なり・分解モードのSVG */}
            {viewMode === "exploded" && (
              <div className="space-y-2">
                <div className="text-center text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-1">
                  浅層（上）から深層（下）への積層・通過順序展開モデル
                </div>
                <svg
                  viewBox="0 0 500 270"
                  className="w-full h-auto max-h-[340px] my-2"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label={`${pointName}の層分解・積層モデル`}
                >
                  {(model.explodedSvgElements || model.svgElements).map((el) => {
                    const isSelected = selectedStructureId === el.layerId;
                    return (
                      <g
                        key={el.elementId}
                        className="cursor-pointer transition-opacity outline-none"
                        onClick={() => setSelectedStructureId(isSelected ? null : el.layerId)}
                        tabIndex={0}
                        role="button"
                        aria-label={el.label}
                        onKeyDown={(e) => handleKeyDown(e, el.layerId)}
                      >
                        {el.shapeType === "path" && el.d && (
                          <path
                            d={el.d}
                            fill={el.fill}
                            stroke={isSelected ? "#B86924" : el.stroke}
                            strokeWidth={isSelected ? 3 : el.strokeWidth || 1}
                            strokeDasharray={el.strokeDasharray}
                          />
                        )}
                        {el.shapeType === "rect" && (
                          <rect
                            x={el.x}
                            y={el.y}
                            width={el.width || 40}
                            height={el.height || 20}
                            rx={el.rx || 0}
                            fill={el.fill}
                            stroke={isSelected ? "#B86924" : el.stroke}
                            strokeWidth={isSelected ? 3 : el.strokeWidth || 1}
                          />
                        )}
                        {el.labelPos && (
                          <text
                            x={el.labelPos.x}
                            y={el.labelPos.y}
                            textAnchor={el.labelPos.anchor || "middle"}
                            className={`text-[10px] font-sans font-bold select-none ${
                              isSelected ? "fill-[#B86924] dark:fill-[#E6C387]" : "fill-[#232826] dark:fill-[#FAF8F5]"
                            }`}
                          >
                            {el.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* 下部キャプション */}
            <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-[#B86924]" />
                <span>図の組織をタップまたはキーボード（Enter）で詳細連動</span>
              </span>
              <span className="font-mono">※教材用模式図</span>
            </div>
          </div>

          {/* 4. スマホ専用：図の直下に配置される即時要約インスペクター（360〜430pxで下にスクロール不要） */}
          {activeStructure && (
            <div className="lg:hidden w-full p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#16222C] border border-[#B86924] dark:border-[#E6C387] shadow-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeStructure.dangerLevel === "hazard"
                      ? "bg-[#F87171]/20 text-[#DC2626] border border-[#F87171]/40"
                      : activeStructure.dangerLevel === "caution"
                      ? "bg-[#FCD34D]/20 text-[#D97706] border border-[#FCD34D]/40"
                      : "bg-[#1E3D34]/15 text-[#1E3D34] dark:text-[#74BA9E]"
                  }`}>
                    {activeStructure.dangerLevel === "hazard" ? "深刺警戒" : activeStructure.dangerLevel === "caution" ? "接触注意" : "通過層/境界"}
                  </span>
                  <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                    {activeStructure.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStructureId(null)}
                  className="text-xs text-[#737C77] hover:text-[#232826] p-1"
                  aria-label="選択解除"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                {activeStructure.description}
              </p>

              {"clinicalSignificance" in activeStructure && Boolean(activeStructure.clinicalSignificance) && (
                <div className="pt-2 border-t border-[#E8DEC9] dark:border-[#263542] text-xs">
                  <strong className="text-[#B86924] dark:text-[#E6C387]">臨床要点：</strong>
                  <span className="text-[#333835] dark:text-[#D5E0EA]">{activeStructure.clinicalSignificance}</span>
                </div>
              )}
            </div>
          )}

          {/* 針路・刺入情報バー（太いシミュレーション矢印ではなく確実な臨床指標） */}
          <div className="w-full p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Compass className="w-4 h-4" />
                <span>標準刺入角・深度の目安（教育用）</span>
              </div>
              {/* ミニ体表マップ切替トグル（断面図表示時） */}
              {viewMode === "crossSection" && model.surfaceMap && (
                <button
                  type="button"
                  onClick={() => setShowMiniSurfaceMap(!showMiniSurfaceMap)}
                  className="text-[11px] text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{showMiniSurfaceMap ? "ミニ体表図を閉じる" : "体表の切断位置を見る"}</span>
                </button>
              )}
            </div>

            {/* ミニ体表マップインライン表示 */}
            {showMiniSurfaceMap && viewMode === "crossSection" && model.surfaceMap && (
              <div className="p-2 bg-white dark:bg-[#16222C] rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1 animate-in fade-in">
                <div className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] text-center">
                  体表上の切断位置（{model.surfaceMap.bodyPartLabel}）
                </div>
                <svg viewBox={model.surfaceMap.viewBox || "0 0 420 280"} className="w-full h-28 max-w-[280px] mx-auto">
                  {model.surfaceMap.elements.map((el) => el.shapeType === "path" && el.d && (
                    <path key={el.elementId} d={el.d} fill={el.fill} stroke={el.stroke} strokeWidth={el.strokeWidth || 1} />
                  ))}
                  {model.surfaceMap.cutLine && (
                    <line
                      x1={model.surfaceMap.cutLine.x1}
                      y1={model.surfaceMap.cutLine.y1}
                      x2={model.surfaceMap.cutLine.x2}
                      y2={model.surfaceMap.cutLine.y2}
                      stroke="#B86924"
                      strokeWidth="3"
                      strokeDasharray="4 2"
                    />
                  )}
                  {model.surfaceMap.pointCoords && (
                    <circle cx={model.surfaceMap.pointCoords.x} cy={model.surfaceMap.pointCoords.y} r="5" fill="#1E3D34" />
                  )}
                </svg>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#404743] dark:text-[#C5D2DB]">
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
              <div className="p-2 rounded-lg bg-[#FDEDEC] dark:bg-[#231816] border border-[#FADBD8] dark:border-[#3D2220] text-[11px] text-[#A83629] dark:text-[#C47A72] flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{model.needleTrack.warning}</span>
              </div>
            )}
          </div>
        </div>

        {/* 右側：3群分類リスト ＆ 詳細インスペクター（PC：5カラム / スマホ：自然な縦スクロール） */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* PC向け：選択中構造の詳細インスペクターカード */}
          <div className="hidden lg:block">
            {activeStructure ? (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#16222C] border-2 border-[#B86924] dark:border-[#E6C387] shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#737C77] dark:text-[#8899A6]">
                      {activeStructure.englishName}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                      {activeStructure.name}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedStructureId(null)}
                    className="text-xs text-[#B86924] dark:text-[#E6C387] hover:underline"
                  >
                    解除
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <span className={`px-2 py-0.5 rounded-md font-bold ${
                    activeStructure.dangerLevel === "hazard"
                      ? "bg-[#F87171]/20 text-[#DC2626] border border-[#F87171]/40"
                      : activeStructure.dangerLevel === "caution"
                      ? "bg-[#FCD34D]/20 text-[#D97706] border border-[#FCD34D]/40"
                      : "bg-[#1E3D34]/15 text-[#1E3D34] dark:text-[#74BA9E]"
                  }`}>
                    {activeStructure.dangerLevel === "hazard" ? "深刺警戒" : activeStructure.dangerLevel === "caution" ? "接触注意" : "安全構造"}
                  </span>
                  {"depthDescription" in activeStructure && (
                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] text-[#59615D] dark:text-[#A0B0BC]">
                      深度: {activeStructure.depthDescription}
                    </span>
                  )}
                  {"position" in activeStructure && (
                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] text-[#59615D] dark:text-[#A0B0BC]">
                      位置: {activeStructure.position}
                    </span>
                  )}
                  {"relation" in activeStructure && (
                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1C2833] border border-[#E5DEC9] dark:border-[#2B3C4E] text-[#59615D] dark:text-[#A0B0BC]">
                      走行: {activeStructure.relation}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#404743] dark:text-[#CBD8E2] leading-relaxed">
                  {activeStructure.description}
                </p>

                {"differentiationTip" in activeStructure && Boolean(activeStructure.differentiationTip) && (
                  <div className="p-2 rounded-lg bg-white dark:bg-[#121920] border border-[#E8DEC9] dark:border-[#263542] text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                    <strong className="text-[#1E3D34] dark:text-[#74BA9E]">鑑別・手技のコツ：</strong>
                    <span>{activeStructure.differentiationTip}</span>
                  </div>
                )}

                {"palpationTip" in activeStructure && Boolean(activeStructure.palpationTip) && (
                  <div className="p-2 rounded-lg bg-white dark:bg-[#121920] border border-[#E8DEC9] dark:border-[#263542] text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                    <strong className="text-[#1E3D34] dark:text-[#74BA9E]">触診指標：</strong>
                    <span>{activeStructure.palpationTip}</span>
                  </div>
                )}

                {"clinicalSignificance" in activeStructure && Boolean(activeStructure.clinicalSignificance) && (
                  <div className="p-2 rounded-lg bg-[#FCF4EB] dark:bg-[#231C14] border border-[#E5DEC9] dark:border-[#382E25] text-[11px]">
                    <strong className="text-[#B86924] dark:text-[#E6C387]">臨床的意義・響き：</strong>
                    <span className="text-[#333835] dark:text-[#D5E0EA]">{activeStructure.clinicalSignificance}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-dashed border-[#D6C8AF] dark:border-[#263542] text-center text-xs text-[#737C77] dark:text-[#8899A6] space-y-1">
                <p className="font-semibold">構造未選択</p>
                <p className="text-[11px]">左の図または下のリストから組織をタップすると詳細が表示されます</p>
              </div>
            )}
          </div>

          {/* 3群分類リスト：内部スクロールなし、自然な縦並び */}

          {/* 第1群：通過層（浅層から深層への通過順序） */}
          <div className="space-y-2">
            <h4 className="font-serif text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center justify-between">
              <span>① 浅層から深層への通過層（積層順）</span>
              <span className="text-[10px] font-normal text-[#737C77] dark:text-[#8899A6]">
                全{model.layers.length}層
              </span>
            </h4>

            <div className="space-y-1.5">
              {model.layers.map((layer) => {
                const isSelected = selectedStructureId === layer.id;
                const isVisible = isCategoryMatch(layer.id, layer.category, layer.dangerLevel);

                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedStructureId(isSelected ? null : layer.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`通過層${layer.depthIndex}: ${layer.name}`}
                    onKeyDown={(e) => handleKeyDown(e, layer.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#1E3D34] ${
                      isSelected
                        ? "bg-[#FCF4EB] dark:bg-[#281E15] border-[#B86924] dark:border-[#E6C387] shadow-xs ring-1 ring-[#B86924]/30"
                        : isVisible
                        ? "bg-[#FAF8F5] dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B38]"
                        : "opacity-40 bg-[#FAF8F5] dark:bg-[#121920] border-dashed border-[#E0D8C8]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {layer.depthIndex}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                          {layer.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] font-mono">
                        {layer.depthDescription}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                      {layer.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 第2群：境界・骨腱の目印（不動の触診基準） */}
          {model.boundaries && model.boundaries.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <h4 className="font-serif text-xs font-bold text-[#59615D] dark:text-[#A0B0BC] uppercase tracking-wider flex items-center justify-between">
                <span>② 境界・骨腱の目印（不動の触診基準）</span>
                <span className="text-[10px] font-normal text-[#737C77] dark:text-[#8899A6]">
                  {model.boundaries.length}構造
                </span>
              </h4>

              <div className="space-y-1.5">
                {model.boundaries.map((boundary) => {
                  const isSelected = selectedStructureId === boundary.id;
                  const isVisible = isCategoryMatch(boundary.id, boundary.category, boundary.dangerLevel);

                  return (
                    <div
                      key={boundary.id}
                      onClick={() => setSelectedStructureId(isSelected ? null : boundary.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`境界構造: ${boundary.name}`}
                      onKeyDown={(e) => handleKeyDown(e, boundary.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#59615D] ${
                        isSelected
                          ? "bg-[#EBF2F0] dark:bg-[#1C2C28] border-[#1E3D34] dark:border-[#74BA9E] shadow-xs"
                          : isVisible
                          ? "bg-[#FAF8F5] dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34]/40"
                          : "opacity-40 bg-[#FAF8F5] dark:bg-[#121920] border-dashed border-[#E0D8C8]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-[#FAF8F5] dark:bg-[#10171F] border border-[#D6C8AF] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC]">
                            目印
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                            {boundary.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                          {boundary.position}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                        {boundary.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 第3群：神経・血管の走行（注意・警戒構造） */}
          {model.adjacentStructures && model.adjacentStructures.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <h4 className="font-serif text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>③ 神経・血管の走行（周囲の注意・警戒構造）</span>
                </span>
                <span className="text-[10px] font-normal text-[#737C77] dark:text-[#8899A6]">
                  {model.adjacentStructures.length}構造
                </span>
              </h4>

              <div className="space-y-1.5">
                {model.adjacentStructures.map((adj) => {
                  const isSelected = selectedStructureId === adj.id;
                  const isVisible = isCategoryMatch(adj.id, adj.category, adj.dangerLevel);

                  return (
                    <div
                      key={adj.id}
                      onClick={() => setSelectedStructureId(isSelected ? null : adj.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`危険構造: ${adj.name}`}
                      onKeyDown={(e) => handleKeyDown(e, adj.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#B86924] ${
                        isSelected
                          ? "bg-[#FDEDEC] dark:bg-[#2A1715] border-[#E53E3E] shadow-xs ring-1 ring-[#E53E3E]/30"
                          : isVisible
                          ? "bg-[#FAF8F5] dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#263542] hover:border-[#E53E3E]/50"
                          : "opacity-40 bg-[#FAF8F5] dark:bg-[#121920] border-dashed border-[#E0D8C8]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            adj.dangerLevel === "hazard"
                              ? "bg-[#F87171]/20 text-[#DC2626] border border-[#F87171]/40"
                              : "bg-[#FCD34D]/20 text-[#D97706] border border-[#FCD34D]/40"
                          }`}>
                            {adj.dangerLevel === "hazard" ? "深刺警戒" : "接触注意"}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                            {adj.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                          {adj.relation}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                        {adj.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
