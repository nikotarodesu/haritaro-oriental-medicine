"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  Activity, 
  Stethoscope, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Compass,
  Utensils,
  Lightbulb
} from "lucide-react";
import { 
  DepthType, 
  TemperatureType, 
  StateType, 
  QixueshuiType, 
  ZangfuType,
  DEPTH_OPTIONS,
  TEMP_OPTIONS,
  STATE_OPTIONS,
  QIXUESHUI_OPTIONS,
  ZANGFU_OPTIONS,
  PRESET_CASES,
  PresetCase,
  synthesizeComprehensiveDiagnosis,
  ComprehensiveDiagnosis,
  AcupointOption
} from "@/data/simulatorData";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";

export default function ThreeStageSimulator() {
  // ステップ1: 八綱
  const [depth, setDepth] = useState<DepthType>("interior");
  const [temp, setTemp] = useState<TemperatureType>("heat");
  const [state, setState] = useState<StateType>("excess");

  // ステップ2: 気血水
  const [qixueshui, setQixueshui] = useState<QixueshuiType>("qizhi");

  // ステップ3: 臓腑経絡
  const [zangfu, setZangfu] = useState<ZangfuType>("liver");

  // サンプルプリセット追跡
  const [activePresetId, setActivePresetId] = useState<string | null>("preset-ganki");

  // 詳細ツボモーダル用
  const [modalTsubo, setModalTsubo] = useState<Tsubo | null>(null);

  // 診断推論の算出
  const diagnosis: ComprehensiveDiagnosis = useMemo(() => {
    return synthesizeComprehensiveDiagnosis(depth, temp, state, qixueshui, zangfu);
  }, [depth, temp, state, qixueshui, zangfu]);

  // プリセットの適用
  const handleApplyPreset = (preset: PresetCase) => {
    setDepth(preset.values.depth);
    setTemp(preset.values.temp);
    setState(preset.values.state);
    setQixueshui(preset.values.qixueshui);
    setZangfu(preset.values.zangfu);
    setActivePresetId(preset.id);
  };

  // 手動変更時のプリセット解除
  const updateOption = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, val: T) => {
    setter(val);
    setActivePresetId(null);
  };

  // リセット
  const handleReset = () => {
    setDepth("interior");
    setTemp("heat");
    setState("excess");
    setQixueshui("qizhi");
    setZangfu("liver");
    setActivePresetId("preset-ganki");
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* ツール見出し */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-5 sm:space-y-6 transition-colors">
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 sm:pb-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
              <Stethoscope className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>Clinical Diagnosis Simulator</span>
            </div>
            {activePresetId ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-[11px] font-bold border border-[#C5DED4] dark:border-[#2A5243]">
                <Sparkles className="w-3 h-3 text-[#B86924] dark:text-[#E6C387]" />
                <span>臨床例サンプル読込中</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] text-[11px] font-bold border border-[#F2D7B3] dark:border-[#4D331F]">
                <span>カスタム条件選択中</span>
              </span>
            )}
          </div>

          <div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              臨床弁証シミュレーター
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-3xl">
              単に答え（証名）を出すだけでなく、「なぜその証を考え、何が足りず、次に何を確認するか」まで学べる臨床推論エンジンです。条件を変更して推論の変化や所見の矛盾を体得しましょう。
            </p>
          </div>

          {/* 代表症例プリセットクイック選択 */}
          <div className="pt-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-[#E6C387]" />
                <span>代表的な症例パターンで試す（プリセット呼出）：</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {PRESET_CASES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border text-left ${
                    activePresetId === preset.id
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] shadow-xs font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#404743] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                  }`}
                >
                  <span className="font-bold block">{preset.name}</span>
                  <span className={`text-[10px] block opacity-80 ${activePresetId === preset.id ? "text-white" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3段階セレクターエリア */}
        <div className="space-y-6 sm:space-y-8">
          {/* STEP 1: 八綱弁証 */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                  八綱弁証（深浅・冷熱・邪正の勢い）
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6]">
                病気の深さ・性質・体力を判定
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
              {/* 深浅: 表 vs 裏 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">① 病位の深浅（表裏）</span>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {DEPTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateOption(setDepth, opt.value)}
                      className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border text-left transition-all ${
                        depth === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#404743] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-xs">{opt.label}</div>
                      <div className={`text-[10px] mt-0.5 ${depth === opt.value ? "text-white/80" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 冷熱: 寒 vs 熱 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">② 病理の性質（寒熱）</span>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {TEMP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateOption(setTemp, opt.value)}
                      className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border text-left transition-all ${
                        temp === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#404743] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-xs">{opt.label}</div>
                      <div className={`text-[10px] mt-0.5 ${temp === opt.value ? "text-white/80" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 虚実: 虚 vs 実 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">③ 邪正の盛衰（虚実）</span>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {STATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateOption(setState, opt.value)}
                      className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border text-left transition-all ${
                        state === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#404743] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-xs">{opt.label}</div>
                      <div className={`text-[10px] mt-0.5 ${state === opt.value ? "text-white/80" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: 気血水弁証 */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                  気血水弁証（運動動態・代謝失調）
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6]">
                生体物質の巡り・不足・滞りを判定
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {QIXUESHUI_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateOption(setQixueshui, opt.value)}
                  className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl border text-left transition-all ${
                    qixueshui === opt.value
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${qixueshui === opt.value ? "text-white/80" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: 臓腑経絡弁証 */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                  臓腑経絡弁証（局在・病位）
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6]">
                不調がどの臓腑系統に波及しているか
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {ZANGFU_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateOption(setZangfu, opt.value)}
                  className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl border text-left transition-all ${
                    zangfu === opt.value
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${zangfu === opt.value ? "text-white/80" : "text-[#737C77] dark:text-[#8899A6]"}`}>
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 選択状態パンくずバー */}
        <div className="bg-[#EBF3EF] dark:bg-[#14231E] p-2.5 sm:p-3.5 rounded-xl border border-[#C5DED4] dark:border-[#234237] flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">選択中:</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium text-[11px] sm:text-xs">
              八綱：{depth === "interior" ? "裏" : "表"}・{temp === "heat" ? "熱" : "寒"}・{state === "excess" ? "実" : "虚"}
            </span>
            <span className="text-[#8899A6]">➜</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium text-[11px] sm:text-xs">
              気血水：{QIXUESHUI_OPTIONS.find((q) => q.value === qixueshui)?.label.split("（")[0]}
            </span>
            <span className="text-[#8899A6]">➜</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium text-[11px] sm:text-xs">
              臓腑：{ZANGFU_OPTIONS.find((z) => z.value === zangfu)?.label.split("（")[0]}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="text-[11px] text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] flex items-center gap-1 ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>リセット</span>
          </button>
        </div>
      </div>

      {/* 診断結果表示エリア */}
      <div className={`bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border-2 p-3.5 sm:p-8 shadow-xl space-y-6 sm:space-y-8 animate-fadeIn transition-colors ${
        diagnosis.status === "conflict"
          ? "border-[#A83629] dark:border-[#C47A72]"
          : diagnosis.status === "suspected"
          ? "border-[#B86924] dark:border-[#E6C387]"
          : "border-[#1E3D34] dark:border-[#3A6B5B]"
      }`}>
        {/* 結果ヘッダー & 「一文の証」 */}
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-widest">
                Clinical Reasoning
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                diagnosis.status === "conflict"
                  ? "bg-[#FDEDEC] dark:bg-[#2A1615] text-[#A83629] dark:text-[#E07971] border border-[#F5C6CB] dark:border-[#52211F]"
                  : diagnosis.status === "suspected"
                  ? "bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F2D7B3] dark:border-[#4D331F]"
                  : "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243]"
              }`}>
                {diagnosis.statusBadge.label}
              </span>
            </div>

            <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
              {diagnosis.statusBadge.description}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">{diagnosis.syndromeReading}</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              {diagnosis.syndromeName}
            </h3>
          </div>

          {/* 一文の証（重要ハイライト） */}
          <div className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-l-4 space-y-1.5 ${
            diagnosis.status === "conflict"
              ? "bg-[#FFF8F7] dark:bg-[#221616] border-[#A83629] dark:border-[#C47A72]"
              : diagnosis.status === "suspected"
              ? "bg-[#FFFAF5] dark:bg-[#221B16] border-[#B86924] dark:border-[#E6C387]"
              : "bg-[#FAF8F5] dark:bg-[#121920] border-[#1E3D34] dark:border-[#4E8C76]"
          }`}>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
              【一文の証】（臨床推論の言語化）
            </span>
            <p className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              「{diagnosis.oneSentenceFormula}」
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            {diagnosis.summary}
          </p>

          {/* 考えられる証の候補（現時点で何を考えるか） */}
          {diagnosis.differentialCandidates.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#737C77] dark:text-[#8899A6]">鑑別・考慮すべき候補：</span>
              {diagnosis.differentialCandidates.map((cand, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB] text-[11px]">
                  {cand}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 1. 推論の検証カード（支持する所見 vs 合わない所見） */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h4 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              ① 診断根拠の検証（支持所見 vs 矛盾所見）
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* 支持する所見 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <span>支持する所見（なぜ候補になるか）</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#404743] dark:text-[#C5D2DB]">
                {diagnosis.supportingFindings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0">✔</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 合わない所見・矛盾点 */}
            <div className={`p-3.5 sm:p-4 rounded-xl border space-y-2 ${
              diagnosis.status === "conflict"
                ? "bg-[#FFF8F7] dark:bg-[#201515] border-[#F5C6CB] dark:border-[#52211F]"
                : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#263542]"
            }`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#A83629] dark:text-[#E07971]">
                <AlertCircle className="w-4 h-4 text-[#A83629] dark:text-[#E07971]" />
                <span>合わない所見・矛盾点（どこに齟齬があるか）</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#404743] dark:text-[#C5D2DB]">
                {diagnosis.conflictingFindings.map((conflict, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-[#A83629] dark:text-[#E07971] font-bold shrink-0">▲</span>
                    <span>{conflict}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. 未確認の情報 ＆ 次に確認する質問・所見 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <h4 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              ② 未確認の情報 ＆ 次に確認する臨床アクション
            </h4>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E5DEC9] dark:border-[#263542] space-y-3.5">
            {/* 未確認情報 */}
            <div>
              <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
                【何が足りないか】確定診断・鑑別に不足している情報：
              </span>
              <div className="flex flex-wrap gap-1.5">
                {diagnosis.missingInformation.map((info, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#404743] dark:text-[#C5D2DB]">
                    ？ {info}
                  </span>
                ))}
              </div>
            </div>

            {/* 次に確認する質問・所見 */}
            <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-2">
              <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                【どう判断を進めるか】次に患者に確認すべき問診・所見：
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {diagnosis.nextActionQuestions.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                        {item.target}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                      {item.question}
                    </p>
                    <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] leading-relaxed">
                      💡 {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. 治則・治法（何を目指して介入するか） */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#EBF3EF] dark:bg-[#14231E] border border-[#C5DED4] dark:border-[#234237] space-y-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#1E3D34] dark:text-[#74BA9E]">
              ③ 治則・治法（治療戦略と介入ベクトル）
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-white dark:bg-[#17212A] p-2.5 rounded-lg border border-[#C5DED4] dark:border-[#2A3B4A]">
              <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-[10px]">治則（目指す方向性）:</span>
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm mt-0.5 block">
                {diagnosis.treatmentPrinciple.rule}
              </span>
            </div>
            <div className="bg-white dark:bg-[#17212A] p-2.5 rounded-lg border border-[#C5DED4] dark:border-[#2A3B4A]">
              <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-[10px]">介入戦略（標本・補瀉・刺激量）:</span>
              <span className="text-[#404743] dark:text-[#C5D2DB] text-xs mt-0.5 block leading-relaxed">
                {diagnosis.treatmentPrinciple.strategy}
              </span>
            </div>
          </div>
        </div>

        {/* 4. 理由を比較できる複数の配穴候補 */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B86924] dark:text-[#E6C387]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                ④ 配穴候補と採用理由の比較検討
              </h4>
            </div>
            <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
              単一の正解ではなく、臨床状況に応じた選択肢を提示
            </span>
          </div>

          <div className="space-y-4">
            {diagnosis.acupointOptions.map((opt, idx) => {
              const pTsubo = TSUBOS.find((t) => t.id === opt.primaryAcupoint.id);
              const sTsubo = TSUBOS.find((t) => t.id === opt.secondaryAcupoint.id);

              return (
                <div
                  key={idx}
                  className={`bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border p-4 sm:p-6 space-y-4 transition-all ${
                    opt.isPrimary
                      ? "border-[#1E3D34] dark:border-[#4E8C76] shadow-sm"
                      : "border-[#E5DEC9] dark:border-[#2A3B4A]"
                  }`}
                >
                  {/* ペアヘッダー */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        opt.isPrimary
                          ? "bg-[#1E3D34] text-white"
                          : "bg-[#FAF8F5] dark:bg-[#17212A] text-[#B86924] dark:text-[#E6C387] border border-[#B86924]/30"
                      }`}>
                        {opt.isPrimary ? "主配穴（王道）" : "代替候補（別案）"}
                      </span>
                      <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                        {opt.pairName}
                      </h5>
                    </div>

                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      適応条件：{opt.indicationConditions}
                    </span>
                  </div>

                  {/* 2つのツボのカード */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 主穴 */}
                    <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                          主穴
                        </span>
                        {pTsubo && (
                          <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                            {pTsubo.code}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                          {opt.primaryAcupoint.name}
                        </span>
                        <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                          {opt.primaryAcupoint.meridian}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                        {opt.primaryAcupoint.role}
                      </p>
                      {pTsubo && (
                        <button
                          onClick={() => setModalTsubo(pTsubo)}
                          className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 font-semibold pt-1 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>解剖・取穴法を見る</span>
                        </button>
                      )}
                    </div>

                    {/* 配穴 */}
                    <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                          配穴
                        </span>
                        {sTsubo && (
                          <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                            {sTsubo.code}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                          {opt.secondaryAcupoint.name}
                        </span>
                        <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                          {opt.secondaryAcupoint.meridian}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                        {opt.secondaryAcupoint.role}
                      </p>
                      {sTsubo && (
                        <button
                          onClick={() => setModalTsubo(sTsubo)}
                          className="text-[11px] text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-semibold pt-1 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>解剖・取穴法を見る</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 比較検討の4大項目 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-[11px]">
                        🎯 この配穴で狙うこと:
                      </span>
                      <p className="text-[#404743] dark:text-[#C5D2DB] text-[11px] leading-relaxed">
                        {opt.intendedEffect}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                      <span className="font-bold text-[#B86924] dark:text-[#E6C387] block text-[11px]">
                        ⚖️ 別の候補との違い:
                      </span>
                      <p className="text-[#404743] dark:text-[#C5D2DB] text-[11px] leading-relaxed">
                        {opt.differentialReason}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1 sm:col-span-2">
                      <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-[11px]">
                        🔄 施術後の再評価で確認すること:
                      </span>
                      <p className="text-[#404743] dark:text-[#C5D2DB] text-[11px] leading-relaxed">
                        {opt.reassessmentPoint}
                      </p>
                    </div>
                  </div>

                  {/* エビデンス区分表示（古典 / 現代研究 / 臨床的見解） */}
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-[#17212A]/70 border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 text-[11px]">
                    <span className="font-bold text-[#737C77] dark:text-[#8899A6] block uppercase tracking-wider text-[10px]">
                      根拠の多層区分（エビデンスレベル）:
                    </span>
                    <div className="space-y-1 text-[#404743] dark:text-[#C5D2DB]">
                      <p className="leading-relaxed">
                        <strong className="text-[#1E3D34] dark:text-[#83BEA8]">🏛️ 【古典・伝統理論】</strong>：{opt.evidenceLevel.classical}
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-[#1E2D3D] dark:text-[#7BAAD8]">🔬 【現代研究で確認された範囲】</strong>：{opt.evidenceLevel.modernResearch}
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-[#B86924] dark:text-[#E6C387]">💡 【著者の臨床的見解・注意事項】</strong>：{opt.evidenceLevel.clinicalPerspective}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 経穴詳細モーダル */}
      {modalTsubo && (
        <div
          onClick={() => setModalTsubo(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] dark:bg-[#17212A] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn"
          >
            {/* モーダルヘッダー */}
            <div className="flex items-start justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                    {modalTsubo.code}
                  </span>
                  <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                    {modalTsubo.meridian}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="font-serif text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {modalTsubo.name}
                  </h3>
                  <span className="text-sm text-[#59615D] dark:text-[#96A6B2]">（{modalTsubo.kana}）</span>
                </div>
              </div>
              <button
                onClick={() => setModalTsubo(null)}
                className="p-1.5 rounded-lg hover:bg-[#EAE3D4] dark:hover:bg-[#22303D] text-[#59615D] dark:text-[#96A6B2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 取穴法（一般 ＆ 骨度法） */}
            <div className="space-y-3">
              <div className="bg-white dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block mb-1">
                  【一般向け】わかりやすい取穴法
                </span>
                <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                  {modalTsubo.locationSimple}
                </p>
              </div>

              <div className="bg-white dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] uppercase tracking-wider block mb-1">
                  【専門家向け】解剖学・骨度法取穴（WHO標準）
                </span>
                <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed font-mono">
                  {modalTsubo.locationDetail}
                </p>
              </div>
            </div>

            {/* 臨床知見 */}
            <div className="bg-[#EBF3EF] dark:bg-[#162A24] p-4 rounded-xl border border-[#C5DED4] dark:border-[#2A5243]">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>臨床知見・配穴の極意</span>
              </span>
              <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                {modalTsubo.clinicalNote}
              </p>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setModalTsubo(null)}
                className="px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
