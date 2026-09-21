"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  Stethoscope, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Compass,
  ChevronDown,
  ChevronUp,
  Scale,
  GraduationCap,
  ArrowUp,
  SlidersHorizontal
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
  PALPATION_OPTIONS,
  TEMP_REACTION_OPTIONS,
  DRINKING_OPTIONS,
  TONGUE_OPTIONS,
  ACADEMIC_STANDARDS,
  PreviousSelection,
  DEPTH_OPTIONS,
  TEMP_OPTIONS,
  STATE_OPTIONS,
  QIXUESHUI_OPTIONS,
  ZANGFU_OPTIONS,
  synthesizeComprehensiveDiagnosis,
  ComprehensiveDiagnosis,
  AcupointOption
} from "@/data/simulatorData";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";

const STORAGE_KEY = "haritaro_simulator_state_v1";

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

  // サンプルプリセット追跡
  const [activePresetId, setActivePresetId] = useState<string | null>("preset-ganki");

  // 詳細ツボモーダル用
  const [modalTsubo, setModalTsubo] = useState<Tsubo | null>(null);

  // 結果エリアの4大折りたたみアコーディオン（デフォルト閉）
  const [isReasonOpen, setIsReasonOpen] = useState<boolean>(false);
  const [isDifferentialOpen, setIsDifferentialOpen] = useState<boolean>(false);
  const [isAcupointOpen, setIsAcupointOpen] = useState<boolean>(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);

  // 初回マウント制御 & 条件変更差分通知（1〜2行で簡潔表示）
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [changeNotice, setChangeNotice] = useState<string | null>(null);

  // 診断推論の算出
  const diagnosis: ComprehensiveDiagnosis = useMemo(() => {
    return synthesizeComprehensiveDiagnosis(depth, temp, state, qixueshui, zangfu, complexState);
  }, [depth, temp, state, qixueshui, zangfu, complexState]);

  // sessionStorage からの初期復元
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.depth) setDepth(parsed.depth);
        if (parsed.temp) setTemp(parsed.temp);
        if (parsed.state) setState(parsed.state);
        if (parsed.qixueshui) setQixueshui(parsed.qixueshui);
        if (parsed.zangfu) setZangfu(parsed.zangfu);
        if (parsed.complexState) setComplexState(parsed.complexState);
        if (parsed.fourExams) setFourExams(parsed.fourExams);
        if (parsed.activePresetId !== undefined) setActivePresetId(parsed.activePresetId);
        if (parsed.isComplexAccordionOpen !== undefined) setIsComplexAccordionOpen(parsed.isComplexAccordionOpen);
        if (parsed.isReasonOpen !== undefined) setIsReasonOpen(parsed.isReasonOpen);
        if (parsed.isDifferentialOpen !== undefined) setIsDifferentialOpen(parsed.isDifferentialOpen);
        if (parsed.isAcupointOpen !== undefined) setIsAcupointOpen(parsed.isAcupointOpen);
        if (parsed.isEvidenceOpen !== undefined) setIsEvidenceOpen(parsed.isEvidenceOpen);
        if (parsed.changeNotice) setChangeNotice(parsed.changeNotice);

        if (parsed.scrollY && typeof window !== "undefined") {
          setTimeout(() => {
            window.scrollTo({ top: parsed.scrollY, behavior: "smooth" });
          }, 150);
        }
      }
    } catch (e) {
      console.warn("Failed to read sessionStorage", e);
    } finally {
      setIsMounted(true);
    }
  }, []);

  // 状態変更時の sessionStorage 保存
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;
    try {
      const dataToSave = {
        depth,
        temp,
        state,
        qixueshui,
        zangfu,
        complexState,
        fourExams,
        activePresetId,
        isComplexAccordionOpen,
        isReasonOpen,
        isDifferentialOpen,
        isAcupointOpen,
        isEvidenceOpen,
        changeNotice,
        scrollY: window.scrollY
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      // 保存不可時は無視
    }
  }, [
    depth,
    temp,
    state,
    qixueshui,
    zangfu,
    complexState,
    fourExams,
    activePresetId,
    isComplexAccordionOpen,
    isReasonOpen,
    isDifferentialOpen,
    isAcupointOpen,
    isEvidenceOpen,
    changeNotice,
    isMounted
  ]);

  // パラメータ更新ハンドラ（差分通知生成）
  const handleUpdate = (updates: Partial<PreviousSelection>, newPresetId: string | null = null) => {
    let noticeText: string | null = null;

    if (updates.depth !== undefined && updates.depth !== depth) {
      const fromLabel = depth === "interior" ? "裏（深部・臓腑）" : "表（浅部・体表）";
      const toLabel = updates.depth === "interior" ? "裏（深部・臓腑）" : "表（浅部・体表）";
      noticeText = `病位：『${fromLabel}』➔『${toLabel}』へ変更。病態の深さが切り替わりました。`;
      setDepth(updates.depth);
    }
    if (updates.temp !== undefined && updates.temp !== temp) {
      const fromLabel = temp === "heat" ? "熱（亢進・炎症）" : "寒（代謝低下・冷え）";
      const toLabel = updates.temp === "heat" ? "熱（亢進・炎症）" : "寒（代謝低下・冷え）";
      noticeText = `寒熱：『${fromLabel}』➔『${toLabel}』へ変更。治療方針と配穴の狙いが切り替わりました。`;
      setTemp(updates.temp);
    }
    if (updates.state !== undefined && updates.state !== state) {
      const fromLabel = state === "excess" ? "実（邪気の滞り）" : "虚（正気の不足）";
      const toLabel = updates.state === "excess" ? "実（邪気の滞り）" : "虚（正気の不足）";
      noticeText = `虚実：『${fromLabel}』➔『${toLabel}』へ変更。瀉法（滞り打破）と補法（体力補給）の戦略が転換しました。`;
      setState(updates.state);
    }
    if (updates.qixueshui !== undefined && updates.qixueshui !== qixueshui) {
      const qFrom = QIXUESHUI_OPTIONS.find((q) => q.value === qixueshui)?.label.split("（")[0] || "";
      const qTo = QIXUESHUI_OPTIONS.find((q) => q.value === updates.qixueshui)?.label.split("（")[0] || "";
      noticeText = `気血水：『${qFrom}』➔『${qTo}』へ変更。生体物質の動態推論が更新されました。`;
      setQixueshui(updates.qixueshui);
    }
    if (updates.zangfu !== undefined && updates.zangfu !== zangfu) {
      const zFrom = ZANGFU_OPTIONS.find((z) => z.value === zangfu)?.label.split("（")[0] || "";
      const zTo = ZANGFU_OPTIONS.find((z) => z.value === updates.zangfu)?.label.split("（")[0] || "";
      noticeText = `臓腑：『${zFrom}』➔『${zTo}』へ変更。局在系統と主経絡が切り替わりました。`;
      setZangfu(updates.zangfu);
    }
    if (updates.complexState !== undefined && updates.complexState !== complexState) {
      if (updates.complexState === "none") {
        noticeText = `複雑病態を解除し、標準の二択モードに戻しました。`;
      } else {
        const cOpt = COMPLEX_STATE_OPTIONS.find((c) => c.value === updates.complexState);
        noticeText = `併存病態：『${cOpt?.label || updates.complexState}』を適用しました。`;
      }
      setComplexState(updates.complexState);
    }

    if (noticeText) {
      setChangeNotice(noticeText);
    }
    setActivePresetId(newPresetId);
  };

  // 四診キーサインの切り替え
  const handleFourExamChange = (field: keyof FourExaminationsInput, val: any) => {
    setFourExams((prev) => ({ ...prev, [field]: val }));

    // 四診所見から八綱・複雑状態への自動連動アシスト
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

  // リセット（初期状態へ戻す）
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
    setChangeNotice(null);
    setIsReasonOpen(false);
    setIsDifferentialOpen(false);
    setIsAcupointOpen(false);
    setIsEvidenceOpen(false);

    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* ============================================================ */}
      {/* 1. 条件選択枠（入力エリア）                                    */}
      {/* ============================================================ */}
      <div 
        id="simulator-conditions" 
        className="scroll-mt-24 bg-[#FFFFFF] dark:bg-[#17212A] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-5 sm:space-y-6 transition-colors"
      >
        {/* 上部ヘッダー（タイトル重複排除・状態バッジ・症例選択） */}
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 sm:pb-5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                条件を選ぶ（八綱・気血水・臓腑）
              </h2>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold border border-[#C5DED4] dark:border-[#2A5243]">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>3段階連動推論</span>
            </span>
          </div>

          <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            選択条件に応じて、病態の推論根拠・不足している情報・最適な配穴候補がリアルタイムに更新されます。
          </p>
        </div>

        {/* 3段階セレクターエリア */}
        <div className="space-y-6 sm:space-y-8">
          {/* STEP 1: 八綱弁証 */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  八綱弁証（深浅・冷熱・邪正の勢い）
                </h3>
              </div>
              <Link
                href="/curriculum?lecture=lecture-diagnosis-7"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                title="第6講 診断論：八綱で病態を整理する"
              >
                <span>講義で学ぶ（第6講）</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* ① 深浅: 表 vs 裏 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-xs sm:text-sm font-bold text-[#404743] dark:text-[#C5D2DB] block">
                  ① 病位の深浅（表裏）
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {DEPTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdate({ depth: opt.value })}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        depth === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                      <div className={`text-xs sm:text-sm mt-0.5 leading-normal ${
                        depth === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                      }`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ② 冷熱: 寒 vs 熱 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-xs sm:text-sm font-bold text-[#404743] dark:text-[#C5D2DB] block">
                  ② 病理の性質（寒熱）
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {TEMP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdate({ temp: opt.value })}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        temp === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                      <div className={`text-xs sm:text-sm mt-0.5 leading-normal ${
                        temp === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                      }`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ③ 虚実: 虚 vs 実 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-xs sm:text-sm font-bold text-[#404743] dark:text-[#C5D2DB] block">
                  ③ 邪正の盛衰（虚実）
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {STATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdate({ state: opt.value })}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        state === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                      <div className={`text-xs sm:text-sm mt-0.5 leading-normal ${
                        state === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                      }`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: 気血水弁証 */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  気血水弁証（運動動態・代謝失調）
                </h3>
              </div>
              <Link
                href="/curriculum?lecture=lecture-qiblood-1"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                title="第3講 気血水論：生命を巡る基本三要素"
              >
                <span>講義で学ぶ（第3講）</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {QIXUESHUI_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleUpdate({ qixueshui: opt.value })}
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    qixueshui === opt.value
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                  }`}
                >
                  <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                  <div className={`text-xs sm:text-sm mt-0.5 leading-normal truncate ${
                    qixueshui === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                  }`}>
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: 臓腑経絡弁証 */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  臓腑経絡弁証（局在・病位）
                </h3>
              </div>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                不調がどの臓腑系統に波及しているか
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {ZANGFU_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleUpdate({ zangfu: opt.value })}
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    zangfu === opt.value
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                  }`}
                >
                  <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                  <div className={`text-xs sm:text-sm mt-0.5 leading-normal truncate ${
                    zangfu === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                  }`}>
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
              aria-expanded={isComplexAccordionOpen}
              aria-controls="complex-conditions-panel"
              className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1A2530] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Scale className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                      💡 複雑な状態も試す（寒熱錯雑・虚実夾雑・四診の判断材料）
                    </span>
                    {complexState !== "none" && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#B86924] text-white">
                        併存モード適用中
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6] mt-0.5">
                    二択では割り切れない「上熱下寒」「本虚標実」「四診キーサイン」を試したい方向けの拡張機能
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6] ml-2 shrink-0">
                {isComplexAccordionOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {/* アコーディオン展開部 */}
            {isComplexAccordionOpen && (
              <div id="complex-conditions-panel" className="mt-3 p-4 sm:p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] space-y-5 animate-fadeIn">
                {/* 併存病態の選択 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                      <span>併存病態（八綱の二択を超えた臨床像）:</span>
                    </span>
                    {complexState !== "none" && (
                      <button
                        onClick={() => handleUpdate({ complexState: "none" })}
                        className="text-xs text-[#B86924] dark:text-[#E6C387] font-semibold hover:underline cursor-pointer"
                      >
                        標準（二択モード）に戻す ↺
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {COMPLEX_STATE_OPTIONS.map((cOpt) => (
                      <button
                        key={cOpt.value}
                        onClick={() => handleUpdate({ complexState: cOpt.value })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          complexState === cOpt.value
                            ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] shadow-sm font-bold"
                            : "bg-white dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{cOpt.label}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            complexState === cOpt.value ? "bg-white/20 text-white" : "bg-[#FAF8F5] dark:bg-[#121920] text-[#737C77] dark:text-[#8899A6]"
                          }`}>
                            {cOpt.category}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed ${
                          complexState === cOpt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                        }`}>
                          {cOpt.summary}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 四診の重要キーサイン */}
                <div className="space-y-3 pt-3 border-t border-[#E8E1D1] dark:border-[#263542]">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                      <span>四診の判断材料（症例サンプルの設定・キーサイン）:</span>
                    </span>
                    <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5">
                      所見を切り替えると、虚実・寒熱の判定が連動して切り替わります。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* 按診 */}
                    <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                        ① 押圧反応（按診）
                      </span>
                      <div className="space-y-1">
                        {PALPATION_OPTIONS.map((p) => (
                          <button
                            key={p.value}
                            onClick={() => handleFourExamChange("palpation", p.value)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
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

                    {/* 温冷 */}
                    <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                        ② 温冷反応（問診）
                      </span>
                      <div className="space-y-1">
                        {TEMP_REACTION_OPTIONS.map((t) => (
                          <button
                            key={t.value}
                            onClick={() => handleFourExamChange("tempReaction", t.value)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
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
                    <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                        ③ 飲水傾向（問診）
                      </span>
                      <div className="space-y-1">
                        {DRINKING_OPTIONS.map((d) => (
                          <button
                            key={d.value}
                            onClick={() => handleFourExamChange("drinking", d.value)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
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
                    <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                      <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                        ④ 舌色・舌苔（望診）
                      </span>
                      <div className="space-y-1">
                        {TONGUE_OPTIONS.map((tg) => (
                          <button
                            key={tg.value}
                            onClick={() => handleFourExamChange("tongue", tg.value)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
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

        {/* 選択状態パンくずバー ＆ 結果ジャンプボタン */}
        <div className="bg-[#EBF3EF] dark:bg-[#14231E] p-3 sm:p-4 rounded-xl border border-[#C5DED4] dark:border-[#234237] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">選択中:</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium">
              八綱：{depth === "interior" ? "裏" : "表"}・{temp === "heat" ? "熱" : "寒"}・{state === "excess" ? "実" : "虚"}
            </span>
            <span className="text-[#8899A6]">➜</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium">
              気血水：{QIXUESHUI_OPTIONS.find((q) => q.value === qixueshui)?.label.split("（")[0]}
            </span>
            <span className="text-[#8899A6]">➜</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium">
              臓腑：{ZANGFU_OPTIONS.find((z) => z.value === zangfu)?.label.split("（")[0]}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href="#simulator-result"
              className="inline-flex items-center gap-1 font-bold text-white bg-[#1E3D34] dark:bg-[#2B6958] hover:opacity-90 px-3 py-1.5 rounded-lg shadow-xs transition-all text-xs"
            >
              <span>▼ 結果を見る</span>
            </a>

            <button
              onClick={handleReset}
              className="text-xs text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>リセット</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. 診断推論結果表示エリア（概要 ＋ 4分割折りたたみ）          */}
      {/* ============================================================ */}
      <div 
        id="simulator-result" 
        className={`scroll-mt-24 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border-2 p-4 sm:p-8 shadow-xl space-y-6 sm:space-y-8 animate-fadeIn transition-colors ${
          diagnosis.status === "conflict"
            ? "border-[#A83629] dark:border-[#C47A72]"
            : diagnosis.status === "suspected"
            ? "border-[#B86924] dark:border-[#E6C387]"
            : "border-[#1E3D34] dark:border-[#3A6B5B]"
        }`}
      >
        {/* 条件変更時の差分通知バナー（変更時のみ1〜2行で簡潔表示） */}
        {changeNotice && (
          <div className="p-3 sm:p-4 rounded-xl bg-[#FCF4EB] dark:bg-[#261E16] border border-[#F2D7B3] dark:border-[#4D331F] flex items-start gap-2.5 text-xs sm:text-sm text-[#404743] dark:text-[#E6EFEA] animate-fadeIn">
            <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-[#B86924] dark:text-[#E6C387] mr-1.5 font-bold">今回変わったこと:</strong>
              <span>{changeNotice}</span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 【概要エリア（ファーストビュー）】                              */}
        {/* ------------------------------------------------------------ */}
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                推論結果
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

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                {diagnosis.statusBadge.description}
              </span>
              <a
                href="#simulator-conditions"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>条件を変える</span>
              </a>
            </div>
          </div>

          <div>
            <span className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">{diagnosis.syndromeReading}</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              {diagnosis.syndromeName}
            </h3>
          </div>

          {/* 一文の証（重要ハイライト） */}
          <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-l-4 space-y-1.5 ${
            diagnosis.status === "conflict"
              ? "bg-[#FFF8F7] dark:bg-[#221616] border-[#A83629] dark:border-[#C47A72]"
              : diagnosis.status === "suspected"
              ? "bg-[#FFFAF5] dark:bg-[#221B16] border-[#B86924] dark:border-[#E6C387]"
              : "bg-[#FAF8F5] dark:bg-[#121920] border-[#1E3D34] dark:border-[#4E8C76]"
          }`}>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
              一文の証
            </span>
            <p className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              「{diagnosis.oneSentenceFormula}」
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            {diagnosis.summary}
          </p>

          {/* 治法の要点（ファーストビュー） */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#EBF3EF] dark:bg-[#14231E] border border-[#C5DED4] dark:border-[#234237] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#1E3D34] dark:text-[#74BA9E]">
                  治則・治法
                </h4>
              </div>
              <Link
                href="/curriculum?lecture=lecture-treatment-1"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                title="第7講 治法論：証から治則・治法・配穴設計へ"
              >
                <span>治法論（第7講）で学ぶ</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#C5DED4] dark:border-[#2A3B4A]">
                <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-xs">治則:</span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5] text-sm sm:text-base mt-0.5 block">
                  {diagnosis.treatmentPrinciple.rule}
                </span>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#C5DED4] dark:border-[#2A3B4A]">
                <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-xs">介入戦略:</span>
                <span className="text-[#404743] dark:text-[#C5D2DB] text-xs sm:text-sm mt-0.5 block leading-relaxed">
                  {diagnosis.treatmentPrinciple.strategy}
                </span>
              </div>
            </div>
          </div>

          {/* 代表配穴（ファーストビュー: 王道の主配穴ペア） */}
          {diagnosis.acupointOptions.length > 0 && (() => {
            const primaryOpt = diagnosis.acupointOptions[0];
            const pTsubo = TSUBOS.find((t) => t.id === primaryOpt.primaryAcupoint.id);
            const sTsubo = TSUBOS.find((t) => t.id === primaryOpt.secondaryAcupoint.id);

            return (
              <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border-2 border-[#1E3D34] dark:border-[#4E8C76] p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1E3D34] text-white">
                      代表配穴
                    </span>
                    <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                      {primaryOpt.pairName}
                    </h5>
                  </div>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    適応：{primaryOpt.indicationConditions}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 主穴 */}
                  <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
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
                        {primaryOpt.primaryAcupoint.name}
                      </span>
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        {primaryOpt.primaryAcupoint.meridian}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                      {primaryOpt.primaryAcupoint.role}
                    </p>
                    {pTsubo && (
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => setModalTsubo(pTsubo)}
                          className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>解剖・取穴法を見る</span>
                        </button>
                        <Link
                          href={`/tsubo/${pTsubo.code.toLowerCase()}`}
                          className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] hover:underline flex items-center gap-0.5"
                        >
                          <span>経穴辞典 ➜</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* 配穴 */}
                  <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
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
                        {primaryOpt.secondaryAcupoint.name}
                      </span>
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        {primaryOpt.secondaryAcupoint.meridian}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                      {primaryOpt.secondaryAcupoint.role}
                    </p>
                    {sTsubo && (
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => setModalTsubo(sTsubo)}
                          className="text-xs text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>解剖・取穴法を見る</span>
                        </button>
                        <Link
                          href={`/tsubo/${sTsubo.code.toLowerCase()}`}
                          className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#B86924] dark:hover:text-[#E6C387] hover:underline flex items-center gap-0.5"
                        >
                          <span>経穴辞典 ➜</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs sm:text-sm">
                  <strong className="text-[#1E3D34] dark:text-[#74BA9E] mr-1.5 font-bold">🎯 この配穴で狙うこと:</strong>
                  <span className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">{primaryOpt.intendedEffect}</span>
                </div>

                {/* 配穴設計・臨床演習への導線 */}
                <div className="mt-3 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#F0F7F4] to-[#FAF8F5] dark:from-[#162720] dark:to-[#17212A] border border-[#74BA9E]/40 dark:border-[#2D5A46] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4 text-[#2D5A46] dark:text-[#74BA9E] shrink-0" />
                      <span>配穴設計・臨床演習で実践する</span>
                    </div>
                    <p className="text-xs text-[#525B56] dark:text-[#9AA8A1] mt-0.5 leading-relaxed">
                      この推奨配穴をもとに、自分で主穴・配穴を自由に組み立てて学習ノートに記録できます。
                    </p>
                  </div>
                  <Link
                    href="/practice/haiketsu"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2D5A46] hover:bg-[#1E3D34] text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
                  >
                    <span>配穴練習を始める</span>
                    <span aria-hidden="true">➜</span>
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 【詳しい説明エリア（4つの独立折りたたみアコーディオン）】       */}
        {/* ------------------------------------------------------------ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              臨床推論を深掘りする（詳しい説明）
            </h4>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
              各項目をクリックして展開
            </span>
          </div>

          {/* ① なぜこの候補と考えたか（支持所見 vs 矛盾所見） */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsReasonOpen(!isReasonOpen)}
              aria-expanded={isReasonOpen}
              aria-controls="panel-reason"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ① なぜこの候補と考えたか
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    選択条件と整合する典型所見、および矛盾する注意点
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isReasonOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isReasonOpen && (
              <div id="panel-reason" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 支持する所見 */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>この証で見られる典型的な所見</span>
                    </div>
                    <ul className="space-y-2 text-sm sm:text-base text-[#404743] dark:text-[#C5D2DB]">
                      {diagnosis.supportingFindings.map((finding, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0 mt-0.5">✔</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 合わない所見・矛盾点 */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    diagnosis.status === "conflict"
                      ? "bg-[#FFF8F7] dark:bg-[#201515] border-[#F5C6CB] dark:border-[#52211F]"
                      : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#263542]"
                  }`}>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#A83629] dark:text-[#E07971]">
                      <AlertCircle className="w-4 h-4" />
                      <span>合わない所見・矛盾点</span>
                    </div>
                    <ul className="space-y-2 text-sm sm:text-base text-[#404743] dark:text-[#C5D2DB]">
                      {diagnosis.conflictingFindings.map((conflict, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#A83629] dark:text-[#E07971] font-bold shrink-0 mt-0.5">▲</span>
                          <span>{conflict}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ② ほかの候補・追加で確認したい所見 */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsDifferentialOpen(!isDifferentialOpen)}
              aria-expanded={isDifferentialOpen}
              aria-controls="panel-differential"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                  <Stethoscope className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ② ほかの候補・追加で確認したい所見
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    鑑別候補、確定診断に不足している情報、次に確認したい問診事項
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isDifferentialOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isDifferentialOpen && (
              <div id="panel-differential" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-5 animate-fadeIn">
                {/* 鑑別・考慮すべき候補 */}
                {diagnosis.differentialCandidates.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-[#737C77] dark:text-[#8899A6] block">
                      鑑別を要する他の病態候補：
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {diagnosis.differentialCandidates.map((cand, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB] text-xs sm:text-sm font-medium">
                          {cand}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 不足している情報 */}
                <div className="space-y-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <span className="text-xs sm:text-sm font-bold text-[#737C77] dark:text-[#8899A6] block">
                    確定判断に不足している情報：
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {diagnosis.missingInformation.map((info, i) => (
                      <span key={i} className="text-xs sm:text-sm px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#404743] dark:text-[#C5D2DB]">
                        ？ {info}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 次に確認する臨床質問 */}
                <div className="space-y-3 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <span className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                    患者に確認すべき問診・臨床所見：
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {diagnosis.nextActionQuestions.map((item, i) => (
                      <div key={i} className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] inline-block">
                          {item.target}
                        </span>
                        <p className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                          {item.question}
                        </p>
                        <p className="text-xs text-[#737C77] dark:text-[#8899A6] leading-relaxed">
                          💡 {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ③ 配穴を詳しく見る（主穴・配穴の理由、手技、代替案） */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsAcupointOpen(!isAcupointOpen)}
              aria-expanded={isAcupointOpen}
              aria-controls="panel-acupoints"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ③ 配穴を詳しく見る
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    王道ペアと別案ペアの比較、施術後の再評価ポイント
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isAcupointOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isAcupointOpen && (
              <div id="panel-acupoints" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-6 animate-fadeIn">
                <div className="space-y-4">
                  {diagnosis.acupointOptions.map((opt, idx) => {
                    const pTsubo = TSUBOS.find((t) => t.id === opt.primaryAcupoint.id);
                    const sTsubo = TSUBOS.find((t) => t.id === opt.secondaryAcupoint.id);

                    return (
                      <div
                        key={idx}
                        className={`bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border p-4 sm:p-6 space-y-4 ${
                          opt.isPrimary
                            ? "border-[#1E3D34] dark:border-[#4E8C76]"
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
                              {opt.isPrimary ? "主配穴" : "代替候補"}
                            </span>
                            <h5 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                              {opt.pairName}
                            </h5>
                          </div>

                          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                            適応条件：{opt.indicationConditions}
                          </span>
                        </div>

                        {/* 2つのツボのカード */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* 主穴 */}
                          <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
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
                            <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.primaryAcupoint.role}
                            </p>
                            {pTsubo && (
                              <div className="flex items-center gap-3 pt-1">
                                <button
                                  onClick={() => setModalTsubo(pTsubo)}
                                  className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>解剖・取穴法を見る</span>
                                </button>
                                <Link
                                  href={`/tsubo/${pTsubo.code.toLowerCase()}`}
                                  className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] hover:underline"
                                >
                                  経穴辞典 ➜
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* 配穴 */}
                          <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
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
                            <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.secondaryAcupoint.role}
                            </p>
                            {sTsubo && (
                              <div className="flex items-center gap-3 pt-1">
                                <button
                                  onClick={() => setModalTsubo(sTsubo)}
                                  className="text-xs text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>解剖・取穴法を見る</span>
                                </button>
                                <Link
                                  href={`/tsubo/${sTsubo.code.toLowerCase()}`}
                                  className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#B86924] dark:hover:text-[#E6C387] hover:underline"
                                >
                                  経穴辞典 ➜
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 比較検討の項目 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-xs">
                              🎯 この配穴で狙うこと:
                            </span>
                            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.intendedEffect}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                            <span className="font-bold text-[#B86924] dark:text-[#E6C387] block text-xs">
                              ⚖️ 別の候補との違い:
                            </span>
                            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.differentialReason}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1 sm:col-span-2">
                            <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-xs">
                              🔄 施術後の再評価で確認すること:
                            </span>
                            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.reassessmentPoint}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ④ 出典・研究の説明 */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsEvidenceOpen(!isEvidenceOpen)}
              aria-expanded={isEvidenceOpen}
              aria-controls="panel-evidence"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ④ 出典・研究の説明
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    古典伝統理論、現代医科学研究、WHO標準中医学用語リファレンス
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isEvidenceOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isEvidenceOpen && (
              <div id="panel-evidence" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 animate-fadeIn">
                {/* エビデンス多層区分 */}
                {diagnosis.acupointOptions[0] && (
                  <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2 text-xs sm:text-sm">
                    <span className="font-bold text-[#737C77] dark:text-[#8899A6] block uppercase tracking-wider text-xs">
                      根拠の多層区分:
                    </span>
                    <div className="space-y-2 text-[#404743] dark:text-[#C5D2DB]">
                      <p className="leading-relaxed">
                        <strong className="text-[#1E3D34] dark:text-[#83BEA8]">🏛️ 古典・伝統理論</strong>：{diagnosis.acupointOptions[0].evidenceLevel.classical}
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-[#1E2D3D] dark:text-[#7BAAD8]">🔬 現代研究で確認された範囲</strong>：{diagnosis.acupointOptions[0].evidenceLevel.modernResearch}
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-[#B86924] dark:text-[#E6C387]">💡 著者の臨床的見解・注意事項</strong>：{diagnosis.acupointOptions[0].evidenceLevel.clinicalPerspective}
                      </p>
                    </div>
                  </div>
                )}

                {/* 学術リファレンス ＆ 用語標準化基準 */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#22303D] space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                    <h6 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {ACADEMIC_STANDARDS.title}
                    </h6>
                  </div>
                  <p className="text-[#59615D] dark:text-[#96A6B2] text-xs leading-relaxed">
                    {ACADEMIC_STANDARDS.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-[#737C77] dark:text-[#8899A6]">
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
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. 経穴詳細モーダル（取穴法・解剖・臨床ノート）               */}
      {/* ============================================================ */}
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
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {modalTsubo.name}
                  </h3>
                  <span className="text-sm text-[#59615D] dark:text-[#96A6B2]">（{modalTsubo.kana}）</span>
                </div>
              </div>
              <button
                onClick={() => setModalTsubo(null)}
                className="p-1.5 rounded-lg hover:bg-[#EAE3D4] dark:hover:bg-[#22303D] text-[#59615D] dark:text-[#96A6B2] cursor-pointer"
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
                <p className="text-sm sm:text-base text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                  {modalTsubo.locationSimple}
                </p>
              </div>

              <div className="bg-white dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] uppercase tracking-wider block mb-1">
                  【専門家向け】解剖学・骨度法取穴（WHO標準）
                </span>
                <p className="text-sm sm:text-base text-[#232826] dark:text-[#E6EFEA] leading-relaxed font-mono">
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
              <p className="text-sm sm:text-base text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                {modalTsubo.clinicalNote}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href={`/tsubo/${modalTsubo.code.toLowerCase()}`}
                onClick={() => setModalTsubo(null)}
                className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
              >
                <span>十四経脈・経穴辞典で詳しく見る ➜</span>
              </Link>

              <button
                onClick={() => setModalTsubo(null)}
                className="px-6 py-2 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs sm:text-sm font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all cursor-pointer"
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
