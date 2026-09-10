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
  SYNDROME_DATABASE,
  synthesizeDiagnosis,
  DiagnosisSyndrome
} from "@/data/simulatorData";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";

// 臨床クイックプリセット
const PRESETS = [
  {
    label: "イライラ・胸脇痛",
    sub: "肝気鬱結",
    depth: "interior" as DepthType,
    temp: "heat" as TemperatureType,
    state: "excess" as StateType,
    q: "qizhi" as QixueshuiType,
    z: "liver" as ZangfuType
  },
  {
    label: "食後もたれ・慢性疲労",
    sub: "脾気虚弱",
    depth: "interior" as DepthType,
    temp: "cold" as TemperatureType,
    state: "deficiency" as StateType,
    q: "qixu" as QixueshuiType,
    z: "spleen" as ZangfuType
  },
  {
    label: "のぼせ・寝汗・腰痛",
    sub: "腎陰虚",
    depth: "interior" as DepthType,
    temp: "heat" as TemperatureType,
    state: "deficiency" as StateType,
    q: "yinxu" as QixueshuiType,
    z: "kidney" as ZangfuType
  },
  {
    label: "動悸・胸の刺痛",
    sub: "心血瘀阻",
    depth: "interior" as DepthType,
    temp: "cold" as TemperatureType,
    state: "excess" as StateType,
    q: "yuxue" as QixueshuiType,
    z: "heart" as ZangfuType
  },
  {
    label: "頭重・むくみ・痰咳",
    sub: "痰湿阻肺",
    depth: "interior" as DepthType,
    temp: "cold" as TemperatureType,
    state: "excess" as StateType,
    q: "shuitai" as QixueshuiType,
    z: "lung" as ZangfuType
  },
  {
    label: "芯の冷え・朝の下痢",
    sub: "脾腎陽虚",
    depth: "interior" as DepthType,
    temp: "cold" as TemperatureType,
    state: "deficiency" as StateType,
    q: "yangxu" as QixueshuiType,
    z: "kidney" as ZangfuType
  },
  {
    label: "初期風邪・首すじ悪寒",
    sub: "風寒表証",
    depth: "exterior" as DepthType,
    temp: "cold" as TemperatureType,
    state: "excess" as StateType,
    q: "qizhi" as QixueshuiType,
    z: "lung" as ZangfuType
  }
];

export default function ThreeStageSimulator() {
  // ステップ1: 八綱
  const [depth, setDepth] = useState<DepthType>("interior");
  const [temp, setTemp] = useState<TemperatureType>("heat");
  const [state, setState] = useState<StateType>("excess");

  // ステップ2: 気血水
  const [qixueshui, setQixueshui] = useState<QixueshuiType>("qizhi");

  // ステップ3: 臓腑経絡
  const [zangfu, setZangfu] = useState<ZangfuType>("liver");

  // 詳細ツボモーダル用
  const [modalTsubo, setModalTsubo] = useState<Tsubo | null>(null);

  // 診断結果の算出
  const diagnosis: DiagnosisSyndrome = useMemo(() => {
    return synthesizeDiagnosis(depth, temp, state, qixueshui, zangfu);
  }, [depth, temp, state, qixueshui, zangfu]);

  // 主穴と配穴のデータ取得
  const primaryTsubo = TSUBOS.find((t) => t.id === diagnosis.minimalAcupoints.primaryId);
  const secondaryTsubo = TSUBOS.find((t) => t.id === diagnosis.minimalAcupoints.secondaryId);

  // プリセット適用
  const applyPreset = (preset: typeof PRESETS[0]) => {
    setDepth(preset.depth);
    setTemp(preset.temp);
    setState(preset.state);
    setQixueshui(preset.q);
    setZangfu(preset.z);
  };

  // リセット
  const handleReset = () => {
    setDepth("interior");
    setTemp("heat");
    setState("excess");
    setQixueshui("qizhi");
    setZangfu("liver");
  };

  return (
    <div className="space-y-10">
      {/* ツール見出し */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-6 sm:p-9 rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-6 transition-colors">
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-2">
            <Stethoscope className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <span>Clinical Diagnosis Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            三段階フィルタリング 臨床弁証シミュレーター
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-3xl">
            「八綱（深浅・勢い） ➜ 気血水（運動） ➜ 臓腑経絡（局在）」の3ステップを選択することで、診断アルゴリズムが自動で「一文の証」を組み上げ、臨床上最も切れ味を発揮する「最小構成のツボ（特効ペア）」を導き出します。
          </p>
        </div>

        {/* クイック臨床プリセット */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>臨床代表症例クイックセット:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-xs transition-all text-left group"
              >
                <span className="font-semibold text-[#232826] dark:text-[#E6EFEA] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                  {preset.label}
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] ml-1.5 font-normal">
                  （{preset.sub}）
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3段階セレクターエリア */}
        <div className="space-y-8 pt-4 border-t border-[#F2ECE0] dark:border-[#22303D]">
          {/* STEP 1: 八綱弁証 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  八綱弁証（深浅・冷熱・邪正の勢い）
                </h3>
              </div>
              <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                病気の深さ・性質・体力を判定
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 深浅: 表 vs 裏 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">① 病位の深浅（表裏）</span>
                <div className="grid grid-cols-2 gap-2">
                  {DEPTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setDepth(opt.value)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
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
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">② 病性の冷熱（寒熱）</span>
                <div className="grid grid-cols-2 gap-2">
                  {TEMP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTemp(opt.value)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        temp === opt.value
                          ? opt.value === "heat"
                            ? "bg-[#A83629] dark:bg-[#B8675E] text-white border-[#A83629] dark:border-[#B8675E] shadow-sm font-bold"
                            : "bg-[#1E2D3D] dark:bg-[#375573] text-white border-[#1E2D3D] dark:border-[#375573] shadow-sm font-bold"
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
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">③ 邪正の勢い（虚実）</span>
                <div className="grid grid-cols-2 gap-2">
                  {STATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setState(opt.value)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        state === opt.value
                          ? "bg-[#B86924] dark:bg-[#C98A44] text-white border-[#B86924] dark:border-[#C98A44] shadow-sm font-bold"
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  気血水弁証（運動性・生体エネルギーの動態）
                </h3>
              </div>
              <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                生命活動の燃料（気・血・水）の異常形態
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {QIXUESHUI_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setQixueshui(opt.value)}
                  className={`p-3 rounded-xl border text-left transition-all ${
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  臓腑経絡弁証（局在・病位）
                </h3>
              </div>
              <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                不調がどの臓腑系統に波及しているか
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {ZANGFU_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setZangfu(opt.value)}
                  className={`p-3 rounded-xl border text-left transition-all ${
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
        <div className="bg-[#EBF3EF] dark:bg-[#14231E] p-3.5 rounded-xl border border-[#C5DED4] dark:border-[#234237] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">現在の選択フィルター:</span>
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

          <button
            onClick={handleReset}
            className="text-[11px] text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>初期状態に戻す</span>
          </button>
        </div>
      </div>

      {/* 診断結果表示エリア */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border-2 border-[#1E3D34] dark:border-[#3A6B5B] p-6 sm:p-10 shadow-xl space-y-8 animate-fadeIn transition-colors">
        {/* 結果ヘッダー & 「一文の証」 */}
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-widest">
              Diagnosis Result
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold">
              臨床弁証結果
            </span>
          </div>

          <div>
            <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">{diagnosis.reading}</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              {diagnosis.name}
            </h3>
          </div>

          {/* 一文の証（重要ハイライト） */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 sm:p-5 rounded-2xl border-l-4 border-[#1E3D34] dark:border-[#4E8C76] space-y-1">
            <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
              【一文の証】（総合診断定義）
            </span>
            <p className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              「{diagnosis.oneSentenceFormula}」
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            {diagnosis.summary}
          </p>
        </div>

        {/* 最小構成のツボ（特効ペア配穴） */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
              <h4 className="font-serif font-bold text-lg text-[#232826] dark:text-[#FAF8F5]">
                推奨される最小構成のツボ（特効ペア配穴）
              </h4>
            </div>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
              主穴 ＋ 配穴の最小単位
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 主穴カード */}
            {primaryTsubo && (
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#263542] flex flex-col justify-between space-y-4 hover:border-[#1E3D34] dark:hover:border-[#4E8C76] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                      主穴
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                      {primaryTsubo.code}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h5 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                      {primaryTsubo.name}
                    </h5>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      {primaryTsubo.meridianShort}（{primaryTsubo.kana}）
                    </span>
                  </div>

                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-2 leading-relaxed">
                    {primaryTsubo.locationSimple}
                  </p>

                  <div className="mt-3 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] bg-white dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#22303D]">
                    {diagnosis.minimalAcupoints.primaryRole}
                  </div>
                </div>

                <button
                  onClick={() => setModalTsubo(primaryTsubo)}
                  className="w-full py-2 rounded-xl bg-white dark:bg-[#17212A] border border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>骨度法・取穴詳細を見る</span>
                </button>
              </div>
            )}

            {/* 配穴カード */}
            {secondaryTsubo && (
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#263542] flex flex-col justify-between space-y-4 hover:border-[#1E3D34] dark:hover:border-[#4E8C76] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                      配穴
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                      {secondaryTsubo.code}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h5 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                      {secondaryTsubo.name}
                    </h5>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      {secondaryTsubo.meridianShort}（{secondaryTsubo.kana}）
                    </span>
                  </div>

                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-2 leading-relaxed">
                    {secondaryTsubo.locationSimple}
                  </p>

                  <div className="mt-3 text-xs font-semibold text-[#B86924] dark:text-[#E6C387] bg-white dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#22303D]">
                    {diagnosis.minimalAcupoints.secondaryRole}
                  </div>
                </div>

                <button
                  onClick={() => setModalTsubo(secondaryTsubo)}
                  className="w-full py-2 rounded-xl bg-white dark:bg-[#17212A] border border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117] text-xs font-semibold text-[#B86924] dark:text-[#E6C387] transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>骨度法・取穴詳細を見る</span>
                </button>
              </div>
            )}
          </div>

          {/* 配穴の切れ味（なぜこの2穴なのか？） */}
          <div className="bg-[#EBF3EF] dark:bg-[#14231E] p-5 rounded-2xl border border-[#C5DED4] dark:border-[#234237] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Lightbulb className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>【配穴の切れ味】なぜこの2穴の組み合わせなのか？</span>
            </div>
            <p className="text-xs sm:text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
              {diagnosis.minimalAcupoints.synergyPrinciple}
            </p>
          </div>
        </div>

        {/* 症状・病態機序・生活養生 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          {/* 典型症状 */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <span className="font-bold text-[#59615D] dark:text-[#96A6B2] block">現れやすい症状:</span>
            <div className="flex flex-wrap gap-1.5">
              {diagnosis.typicalSymptoms.map((sym, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#C5D2DB]">
                  • {sym}
                </span>
              ))}
            </div>
          </div>

          {/* 現代生理学的機序 */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5">
            <span className="font-bold text-[#59615D] dark:text-[#96A6B2] block">現代科学・神経生理機序:</span>
            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
              {diagnosis.pathology}
            </p>
          </div>

          {/* 食養生・生活処方 */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5">
            <span className="font-bold text-[#59615D] dark:text-[#96A6B2] block">食養生と生活のアドバイス:</span>
            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
              {diagnosis.dietAdvice} {diagnosis.lifestyleAdvice}
            </p>
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
