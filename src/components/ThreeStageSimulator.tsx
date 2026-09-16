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
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Zap,
  Scale,
  GraduationCap,
  HelpCircle
} from "lucide-react";
import { 
  DepthType, 
  TemperatureType, 
  StateType, 
  QixueshuiType, 
  ZangfuType,
  ComplexStateType,
  COMPLEX_STATE_OPTIONS,
  FourExaminationsInput,
  PalpationType,
  TempReactionType,
  DrinkingType,
  TongueType,
  PALPATION_OPTIONS,
  TEMP_REACTION_OPTIONS,
  DRINKING_OPTIONS,
  TONGUE_OPTIONS,
  DeltaInsight,
  generateDeltaInsight,
  ACADEMIC_STANDARDS,
  PreviousSelection,
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

  // 複雑な状態（折りたたみアコーディオン内）
  const [complexState, setComplexState] = useState<ComplexStateType>("none");
  const [isComplexAccordionOpen, setIsComplexAccordionOpen] = useState<boolean>(false);

  // 四診の判断材料（キーサイン）
  const [fourExams, setFourExams] = useState<FourExaminationsInput>({
    palpation: "unconfirmed",
    tempReaction: "unconfirmed",
    drinking: "unconfirmed",
    tongue: "unconfirmed"
  });

  // 「⚡ 今回変わったこと」差分インサイト
  const [deltaInsight, setDeltaInsight] = useState<DeltaInsight | null>(null);

  // サンプルプリセット追跡
  const [activePresetId, setActivePresetId] = useState<string | null>("preset-ganki");

  // 詳細ツボモーダル用
  const [modalTsubo, setModalTsubo] = useState<Tsubo | null>(null);

  // 診断推論の算出
  const diagnosis: ComprehensiveDiagnosis = useMemo(() => {
    return synthesizeComprehensiveDiagnosis(depth, temp, state, qixueshui, zangfu, complexState);
  }, [depth, temp, state, qixueshui, zangfu, complexState]);

  // 現在の全選択値の取得
  const getCurrentSelection = (): PreviousSelection => ({
    depth,
    temp,
    state,
    qixueshui,
    zangfu,
    complexState
  });

  // パラメータ更新ハンドラ（差分インサイトを自動生成）
  const handleUpdate = (updates: Partial<PreviousSelection>, newPresetId: string | null = null) => {
    const prev = getCurrentSelection();
    const next: PreviousSelection = { ...prev, ...updates };

    if (updates.depth !== undefined) setDepth(updates.depth);
    if (updates.temp !== undefined) setTemp(updates.temp);
    if (updates.state !== undefined) setState(updates.state);
    if (updates.qixueshui !== undefined) setQixueshui(updates.qixueshui);
    if (updates.zangfu !== undefined) setZangfu(updates.zangfu);
    if (updates.complexState !== undefined) setComplexState(updates.complexState);

    setActivePresetId(newPresetId);

    const insight = generateDeltaInsight(prev, next);
    if (insight) {
      setDeltaInsight(insight);
    }
  };

  // プリセットの適用
  const handleApplyPreset = (preset: PresetCase) => {
    const prev = getCurrentSelection();
    setDepth(preset.values.depth);
    setTemp(preset.values.temp);
    setState(preset.values.state);
    setQixueshui(preset.values.qixueshui);
    setZangfu(preset.values.zangfu);
    setComplexState("none");
    setActivePresetId(preset.id);

    setDeltaInsight({
      changedItem: `代表症例読込：『${preset.name}』`,
      pathologyChange: preset.description,
      treatmentStrategyChange: "入力された八綱・気血水・臓腑の組み合わせに合致する臨床推論モデルを展開します。",
      acupointImpact: "王道配穴（主配穴）と代替配穴の多層エビデンス比較を表示します。"
    });
  };

  // 四診キーサインの切り替え
  const handleFourExamChange = (field: keyof FourExaminationsInput, val: any) => {
    setFourExams((prev) => ({ ...prev, [field]: val }));

    // 四診所見から八綱・複雑状態への自動推奨アシスト
    if (field === "palpation") {
      if (val === "an_ki") handleUpdate({ state: "deficiency" });
      if (val === "an_kyo") handleUpdate({ state: "excess" });
    }
    if (field === "tempReaction") {
      if (val === "warm_relief") handleUpdate({ temp: "cold" });
      if (val === "cool_relief") handleUpdate({ temp: "heat" });
    }
    if (field === "drinking") {
      if (val === "warm_drink") handleUpdate({ temp: "cold" });
      if (val === "cold_drink") handleUpdate({ temp: "heat" });
    }
    if (field === "tongue") {
      if (val === "pale_white") handleUpdate({ temp: "cold", state: "deficiency" });
      if (val === "red_yellow") handleUpdate({ temp: "heat", state: "excess" });
    }
  };

  // リセット
  const handleReset = () => {
    setDepth("interior");
    setTemp("heat");
    setState("excess");
    setQixueshui("qizhi");
    setZangfu("liver");
    setComplexState("none");
    setFourExams({
      palpation: "unconfirmed",
      tempReaction: "unconfirmed",
      drinking: "unconfirmed",
      tongue: "unconfirmed"
    });
    setActivePresetId("preset-ganki");
    setDeltaInsight(null);
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
                      onClick={() => handleUpdate({ depth: opt.value })}
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
                      onClick={() => handleUpdate({ temp: opt.value })}
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
                      onClick={() => handleUpdate({ state: opt.value })}
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
                  onClick={() => handleUpdate({ qixueshui: opt.value })}
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
                  onClick={() => handleUpdate({ zangfu: opt.value })}
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

          {/* オプション：複雑な状態も試す（アコーディオン） */}
          <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
            <button
              type="button"
              onClick={() => setIsComplexAccordionOpen(!isComplexAccordionOpen)}
              className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1A2530] transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Scale className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                      💡 複雑な状態も試す（寒熱錯雑・虚実夾雑・四診の判断材料）
                    </span>
                    {complexState !== "none" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B86924] text-white">
                        併存モード適用中
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6]">
                    二択では割り切れない「上熱下寒」「本虚標実」「四診キーサイン」を試したい方向けの拡張機能
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isComplexAccordionOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {/* アコーディオン展開部 */}
            {isComplexAccordionOpen && (
              <div className="mt-3 p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] space-y-5 animate-fadeIn">
                {/* 併存病態の選択 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                      <span>併存病態（八綱の二択を超えた臨床像）:</span>
                    </span>
                    {complexState !== "none" && (
                      <button
                        onClick={() => handleUpdate({ complexState: "none" })}
                        className="text-[11px] text-[#B86924] dark:text-[#E6C387] font-semibold hover:underline"
                      >
                        標準（二択モード）に戻す ↺
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {COMPLEX_STATE_OPTIONS.map((cOpt) => (
                      <button
                        key={cOpt.value}
                        onClick={() => handleUpdate({ complexState: cOpt.value })}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          complexState === cOpt.value
                            ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] shadow-sm font-bold"
                            : "bg-white dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{cOpt.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                            complexState === cOpt.value ? "bg-white/20 text-white" : "bg-[#FAF8F5] dark:bg-[#121920] text-[#737C77] dark:text-[#8899A6]"
                          }`}>
                            {cOpt.category}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-1 leading-snug line-clamp-2 ${
                          complexState === cOpt.value ? "text-white/80" : "text-[#737C77] dark:text-[#8899A6]"
                        }`}>
                          {cOpt.summary}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 四診の4大キーサイン（按診・温冷・飲水・舌診） */}
                <div className="space-y-2.5 pt-3 border-t border-[#E8E1D1] dark:border-[#22303D]">
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                    <span>四診の判断材料（タップすると八綱へ自動連動します）:</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    {/* 按診 */}
                    <div className="bg-white dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">
                        ① 圧迫への反応（按診）
                      </span>
                      <div className="space-y-1">
                        {PALPATION_OPTIONS.map((p) => (
                          <button
                            key={p.value}
                            onClick={() => handleFourExamChange("palpation", p.value)}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] transition-all ${
                              fourExams.palpation === p.value
                                ? "bg-[#1E3D34] text-white font-bold"
                                : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 温冷反応 */}
                    <div className="bg-white dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">
                        ② 温冷への反応（問診）
                      </span>
                      <div className="space-y-1">
                        {TEMP_REACTION_OPTIONS.map((t) => (
                          <button
                            key={t.value}
                            onClick={() => handleFourExamChange("tempReaction", t.value)}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] transition-all ${
                              fourExams.tempReaction === t.value
                                ? "bg-[#1E3D34] text-white font-bold"
                                : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 飲水 */}
                    <div className="bg-white dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">
                        ③ 飲水傾向（問診）
                      </span>
                      <div className="space-y-1">
                        {DRINKING_OPTIONS.map((d) => (
                          <button
                            key={d.value}
                            onClick={() => handleFourExamChange("drinking", d.value)}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] transition-all ${
                              fourExams.drinking === d.value
                                ? "bg-[#1E3D34] text-white font-bold"
                                : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 舌診 */}
                    <div className="bg-white dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">
                        ④ 舌色・舌苔（望診）
                      </span>
                      <div className="space-y-1">
                        {TONGUE_OPTIONS.map((tg) => (
                          <button
                            key={tg.value}
                            onClick={() => handleFourExamChange("tongue", tg.value)}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] transition-all ${
                              fourExams.tongue === tg.value
                                ? "bg-[#1E3D34] text-white font-bold"
                                : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                            }`}
                          >
                            {tg.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
        {/* ⚡ 今回変わったこと（条件変更による臨床判断の転換点） */}
        {deltaInsight && (
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFDF5] dark:bg-[#1F1C16] border-2 border-[#D4A373] dark:border-[#9C6D3B] space-y-3 animate-fadeIn shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EADCC8] dark:border-[#382F24] pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-[#B86924] text-white">
                  <Zap className="w-3.5 h-3.5" />
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                  ⚡ 今回変わったこと（一つ変えると、何が変わる？）
                </h4>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] dark:bg-[#332517] text-[#B86924] dark:text-[#E6C387] border border-[#E8D0BA] dark:border-[#4D351F]">
                {deltaInsight.changedItem}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E8DFC8] dark:border-[#2D2A24] space-y-1">
                <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block">
                  ① 判断のどこが変わったか（病理の転換）:
                </span>
                <p className="text-[#333835] dark:text-[#C5D2DB] leading-relaxed text-[11px]">
                  {deltaInsight.pathologyChange}
                </p>
              </div>

              <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E8DFC8] dark:border-[#2D2A24] space-y-1">
                <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                  ② 治法・介入戦略をどう考え直すか:
                </span>
                <p className="text-[#333835] dark:text-[#C5D2DB] leading-relaxed text-[11px]">
                  {deltaInsight.treatmentStrategyChange}
                </p>
              </div>

              <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E8DFC8] dark:border-[#2D2A24] space-y-1">
                <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] block">
                  ③ 配穴の狙いの違い:
                </span>
                <p className="text-[#333835] dark:text-[#C5D2DB] leading-relaxed text-[11px]">
                  {deltaInsight.acupointImpact}
                </p>
              </div>
            </div>
          </div>
        )}

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

        {/* 学術リファレンス ＆ 用語標準化基準 */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F8F6F0] dark:bg-[#141B22] border border-[#E5DEC9] dark:border-[#22303D] space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h5 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
              {ACADEMIC_STANDARDS.title}
            </h5>
          </div>
          <p className="text-[#59615D] dark:text-[#96A6B2] text-[11px] leading-relaxed">
            {ACADEMIC_STANDARDS.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[10px] text-[#737C77] dark:text-[#8899A6]">
            <div>
              <strong className="block text-[#404743] dark:text-[#C5D2DB]">国際標準用語基準:</strong>
              <span>{ACADEMIC_STANDARDS.whoReference}</span>
            </div>
            <div>
              <strong className="block text-[#404743] dark:text-[#C5D2DB]">日本標準教科書・古典:</strong>
              <span>{ACADEMIC_STANDARDS.textbookReference} / {ACADEMIC_STANDARDS.classics}</span>
            </div>
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
