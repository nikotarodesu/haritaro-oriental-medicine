"use client";

import React, { useState } from "react";
import { CrossSectionModel, AnatomicalLayer } from "@/data/tsubo/types";
import { 
  Layers, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  Info, 
  Eye, 
  Activity, 
  AlertTriangle 
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
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"all" | "neurovascular" | "musculoskeletal">("all");

  const selectedLayer = model.layers.find((l) => l.id === selectedLayerId);

  // フィルター判定
  const isElementVisible = (layerId: string) => {
    if (filterMode === "all") return true;
    const layer = model.layers.find((l) => l.id === layerId);
    if (!layer) return true;
    if (filterMode === "neurovascular") {
      return layer.category === "nerve" || layer.category === "vessel" || layer.dangerLevel === "hazard" || layer.dangerLevel === "caution";
    }
    if (filterMode === "musculoskeletal") {
      return layer.category === "muscle" || layer.category === "bone" || layer.category === "fascia";
    }
    return true;
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-7 shadow-sm space-y-6 transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] mb-1">
            <Layers className="w-4 h-4" />
            <span>解剖学的深浅連動モデル（浅層 ➜ 深層）</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
            {model.title}
          </h3>
          <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5 font-mono">
            切断高位：{model.level}
          </p>
        </div>

        {/* モード切替タブ */}
        <div className="inline-flex rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] p-1 border border-[#E5DEC9] dark:border-[#263542] text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterMode === "all"
                ? "bg-[#1E3D34] text-white dark:bg-[#2B6958] shadow-xs"
                : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E]"
            }`}
          >
            全層表示
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("neurovascular")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
              filterMode === "neurovascular"
                ? "bg-[#B86924] text-white dark:bg-[#9C5417] shadow-xs"
                : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#B86924] dark:hover:text-[#E6C387]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>神経・血管安全</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("musculoskeletal")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterMode === "musculoskeletal"
                ? "bg-[#1E2D3D] text-white dark:bg-[#344D66] shadow-xs"
                : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E2D3D]"
            }`}
          >
            筋骨格
          </button>
        </div>
      </div>

      {/* メインエリア：SVG図 ＆ 階層リスト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SVG図コンテナ（7カラム） */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-5 overflow-hidden shadow-inner select-none">
            
            {/* 方向インジケーター（上下左右） */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/80 dark:bg-black/40 px-2 py-0.5 rounded-full border border-[#E5DEC9] dark:border-[#2A3B4A]">
              ↑ {model.axes.vertical[0]}
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/80 dark:bg-black/40 px-2 py-0.5 rounded-full border border-[#E5DEC9] dark:border-[#2A3B4A]">
              ↓ {model.axes.vertical[1]}
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/80 dark:bg-black/40 px-1.5 py-1 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] writing-vertical">
              ← {model.axes.horizontal[0]}
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] bg-white/80 dark:bg-black/40 px-1.5 py-1 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] writing-vertical">
              {model.axes.horizontal[1]} →
            </div>

            {/* SVG断面図 */}
            <svg
              viewBox="0 0 500 270"
              className="w-full h-auto max-h-[340px] my-2"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* 刺入針マーカー */}
                <marker
                  id="needle-arrow"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E3D34" />
                </marker>
              </defs>

              {/* レイヤー要素描画 */}
              {model.svgElements.map((el) => {
                const isSelected = selectedLayerId === el.layerId;
                const isVisible = isElementVisible(el.layerId);
                const opacity = isVisible ? (selectedLayerId && !isSelected ? 0.35 : 1) : 0.08;

                const commonProps = {
                  key: el.elementId,
                  id: el.elementId,
                  fill: el.fill,
                  stroke: isSelected ? "#B86924" : el.stroke || "none",
                  strokeWidth: isSelected ? 3.5 : el.strokeWidth || 1,
                  opacity,
                  className: "transition-all duration-200 cursor-pointer hover:opacity-90",
                  onClick: () => {
                    if (el.layerId !== "needle-indicator") {
                      setSelectedLayerId(isSelected ? null : el.layerId);
                    }
                  },
                };

                return (
                  <g key={`g-${el.elementId}`}>
                    {el.shapeType === "path" && el.d && (
                      <path
                        {...commonProps}
                        d={el.d}
                        markerEnd={el.elementId.includes("needle") ? "url(#needle-arrow)" : undefined}
                      />
                    )}
                    {el.shapeType === "circle" && el.cx !== undefined && el.cy !== undefined && (
                      <circle
                        {...commonProps}
                        cx={el.cx}
                        cy={el.cy}
                        r={el.r || 6}
                      />
                    )}
                    {el.shapeType === "ellipse" && el.cx !== undefined && el.cy !== undefined && (
                      <ellipse
                        {...commonProps}
                        cx={el.cx}
                        cy={el.cy}
                        rx={el.rx || 20}
                        ry={el.ry || 15}
                      />
                    )}
                    {el.labelPos && isVisible && (
                      <text
                        x={el.labelPos.x}
                        y={el.labelPos.y}
                        textAnchor={el.labelPos.anchor || "middle"}
                        className="text-[10px] font-sans font-bold fill-[#232826] dark:fill-[#FAF8F5] pointer-events-none select-none drop-shadow-xs"
                      >
                        {el.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* 図の下部ガイド */}
            <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
              <span>💡 図内の組織をクリックすると深浅解説と連動します</span>
              <span className="font-mono">縮尺：模式図（比率強調）</span>
            </div>
          </div>

          {/* 針路・刺入情報バー */}
          <div className="w-full mt-3 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Compass className="w-4 h-4" />
              <span>標準刺入角・安全深度ガイド</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-[#404743] dark:text-[#C5D2DB]">
              <div>
                <span className="text-[#737C77] dark:text-[#8899A6]">刺入方向：</span>
                <span className="font-medium">{model.needleTrack.angle}</span>
              </div>
              <div>
                <span className="text-[#737C77] dark:text-[#8899A6]">有効安全深度：</span>
                <span className="font-medium">{model.needleTrack.safeDepth}</span>
              </div>
            </div>
            {model.needleTrack.warning && (
              <div className="p-2 rounded-lg bg-[#FDEDEC] dark:bg-[#231816] border border-[#FADBD8] dark:border-[#3D2220] text-[11px] text-[#A83629] dark:text-[#C47A72] flex items-start gap-1.5 mt-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{model.needleTrack.warning}</span>
              </div>
            )}
          </div>
        </div>

        {/* 階層リスト ＆ 構造インスペクター（5カラム） */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
              <span>浅層から深層への通過構造</span>
            </h4>
            {selectedLayerId && (
              <button
                type="button"
                onClick={() => setSelectedLayerId(null)}
                className="text-xs text-[#B86924] dark:text-[#E6C387] hover:underline"
              >
                選択解除
              </button>
            )}
          </div>

          {/* 階層アコーディオン/カード一覧 */}
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {model.layers.map((layer) => {
              const isSelected = selectedLayerId === layer.id;
              const isVisible = isElementVisible(layer.id);

              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerId(isSelected ? null : layer.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#FCF4EB] dark:bg-[#281E15] border-[#B86924] dark:border-[#E6C387] shadow-xs"
                      : isVisible
                      ? "bg-[#FAF8F5] dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B38]"
                      : "opacity-40 bg-[#FAF8F5] dark:bg-[#121920] border-dashed border-[#E0D8C8]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-[11px] font-bold flex items-center justify-center shrink-0">
                        {layer.depthIndex}
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                        {layer.name}
                      </span>
                    </div>

                    {/* 危険度バッジ */}
                    {layer.dangerLevel === "hazard" ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F87171]/20 text-[#DC2626] font-bold border border-[#F87171]/40">
                        深刺注意
                      </span>
                    ) : layer.dangerLevel === "caution" ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FCD34D]/20 text-[#D97706] font-bold border border-[#FCD34D]/40">
                        神経接触
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] font-mono">
                        {layer.depthDescription.split("（")[0]}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                    {layer.description}
                  </p>

                  {/* 選択時の詳細情報展開 */}
                  {isSelected && (
                    <div className="mt-2.5 pt-2.5 border-t border-[#E8DEC9] dark:border-[#382E25] text-[11px] space-y-1.5">
                      <div>
                        <strong className="text-[#1E3D34] dark:text-[#74BA9E]">深度目安：</strong>
                        <span className="text-[#333835] dark:text-[#D5E0EA]">{layer.depthDescription}</span>
                      </div>
                      {layer.clinicalSignificance && (
                        <div>
                          <strong className="text-[#B86924] dark:text-[#E6C387]">臨床的意義・響き：</strong>
                          <span className="text-[#333835] dark:text-[#D5E0EA]">{layer.clinicalSignificance}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 典拠・確認日 */}
          <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] text-[10px] text-[#737C77] dark:text-[#8899A6] space-y-1">
            <div className="flex items-center gap-1 font-semibold text-[#59615D] dark:text-[#A0B0BC]">
              <Info className="w-3 h-3" />
              <span>参照解剖資料（確認済）</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[10px]">
              {model.references.map((ref, idx) => (
                <li key={idx} className="truncate">{ref}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
