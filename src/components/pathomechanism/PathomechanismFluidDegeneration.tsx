"use client";

import React, { useState } from "react";
import { Sparkles, Droplets, ArrowRight, AlertTriangle, Filter, CheckCircle2 } from "lucide-react";

interface FluidStep {
  step: number;
  name: string;
  kana: string;
  stageBadge: string;
  color: string;
  visualBg: string;
  darkVisualBg: string;
  state: string;
  viscosity: "極低（サラサラ）" | "低（停滞気味）" | "中高（ドロドロ）" | "超高（固形化・沈殿）";
  symptoms: string[];
  mechanism: string;
  action: string;
}

const FLUID_STEPS: FluidStep[] = [
  {
    step: 1,
    name: "正常津液（せいじょうしんえき）",
    kana: "せいじょうしんえき",
    stageBadge: "健全な生体流体",
    color: "#0288D1",
    visualBg: "bg-[#E1F5FE] text-[#0277BD] border-[#B3E5FC]",
    darkVisualBg: "dark:bg-[#0288D1]/20 dark:text-[#81D4FA]",
    state: "澄んだ清らかな水",
    viscosity: "極低（サラサラ）",
    symptoms: ["皮膚のみずみずしさ", "潤滑な関節運動", "快調な排尿（薄い麦わら色）", "快便"],
    mechanism: "脾（抽出・運化）➜ 肺（散布・通降）➜ 腎（温煦・気化排泄）のスムーズな三焦リレーによって、全身の細胞間隙を潤滑に循環している状態。",
    action: "維持：適度な水分補給（常温〜温水）、胃腸を冷やさない食事習慣。",
  },
  {
    step: 2,
    name: "水湿（すいしつ / 機能的停滞）",
    kana: "すいしつ",
    stageBadge: "初期：流れの停滞",
    color: "#00897B",
    visualBg: "bg-[#E0F2F1] text-[#00695C] border-[#80CBC4]",
    darkVisualBg: "dark:bg-[#00897B]/20 dark:text-[#80CBC4]",
    state: "淀んだ水たまり（一過性）",
    viscosity: "低（停滞気味）",
    symptoms: ["夕方の足のむくみ", "雨の日の頭重感", "口の中のネバつき", "軟便・下痢しやすい"],
    mechanism: "冷飲食や運動不足、湿気によって脾胃の運化スピードが鈍化。水が組織間に一過性に溜まるが、まだ物質的な変質（ゴミ化）はしていない段階。",
    action: "利水：ハトムギ茶、小豆、軽く汗をかく運動で水分代謝の蛇口を開ける。",
  },
  {
    step: 3,
    name: "痰湿（たんしつ / 物質的変質）",
    kana: "たんしつ",
    stageBadge: "中期：粘液ヘドロ化",
    color: "#689F38",
    visualBg: "bg-[#F1F8E9] text-[#33691E] border-[#C5E1A5]",
    darkVisualBg: "dark:bg-[#689F38]/20 dark:text-[#AED581]",
    state: "粘り気を帯びたヘドロ",
    viscosity: "中高（ドロドロ）",
    symptoms: ["濡れタオルを巻かれたような激しい頭重", "喉に絡む痰", "めまい（メニエール様）", "内臓脂肪・脂質異常"],
    mechanism: "滞留した水湿に体温（熱）が加わり、水分が煮詰まって粘稠な老廃物（痰）へ変質。自力で流れる力を完全に失い、経絡や血管内皮にこびりつく。",
    action: "化痰：白砂糖・油物・アルコールを完全遮断。二陳湯、半夏白朮天麻湯。",
  },
  {
    step: 4,
    name: "相互固定（器質化 / 痰瘀互結）",
    kana: "たんおごけつ",
    stageBadge: "最終：固形化・結合",
    color: "#4E342E",
    visualBg: "bg-[#EFEBE9] text-[#3E2723] border-[#BCAAA4]",
    darkVisualBg: "dark:bg-[#4E342E]/30 dark:text-[#D7CCC8]",
    state: "コンクリート状の固形沈殿物",
    viscosity: "超高（固形化・沈殿）",
    symptoms: ["頑固な慢性痛・しこり", "血管プラーク・動脈硬化", "子宮筋腫・のう胞", "慢性腎臓病・難治性皮膚疾患"],
    mechanism: "ドロドロの痰湿が血流を堰き止め、停滞した血（瘀血）と合体（痰瘀互結）。膠着したセメントのように組織を線維化させ、病態を恒久的に固定化する。",
    action: "化痰活血：強固な結合を解く長期アプローチ。桂枝茯苓丸加ヨクイニン、刺絡療法。",
  },
];

export default function PathomechanismFluidDegeneration() {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const current = FLUID_STEPS[selectedStepIndex];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：水の変質 4ステップ・グラデーションカード</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            清らかな津液が「濁ったヘドロ」へと固まる ── 流体システムの破綻4段階
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          カードをタップして変質プロセスを追跡
        </span>
      </div>

      {/* 4ステップの横並びカード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {FLUID_STEPS.map((s, idx) => {
          const isSelected = selectedStepIndex === idx;
          return (
            <div
              key={s.step}
              onClick={() => setSelectedStepIndex(idx)}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white dark:bg-[#17212A] shadow-md scale-[1.02]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? s.color : undefined,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${s.visualBg} ${s.darkVisualBg}`}>
                    STEP 0{s.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: s.color }}>
                    粘度: {s.viscosity.split("（")[0]}
                  </span>
                </div>
                <h5 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mb-1">
                  {s.name.split("（")[0]}
                </h5>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] font-medium">
                  {s.state}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-[10px] text-[#8C9691] dark:text-[#64748B]">
                <span>{s.stageBadge}</span>
                {isSelected && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* 選択されたステップの詳細解説 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE4D5] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: current.color }} />
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              STEP {current.step}：{current.name} ── {current.state}
            </h5>
          </div>
          <span className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2]">
            流体粘性：{current.viscosity}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#232826] dark:text-[#D1D5DB] leading-relaxed">
          {current.mechanism}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* 自覚症状 */}
          <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              現れる典型症状：
            </span>
            <ul className="space-y-1 text-[#3E4541] dark:text-[#CBD5E1]">
              {current.symptoms.map((sym, i) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 臨床アプローチ */}
          <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              攻略アクション・処方：
            </span>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
              {current.action}
            </p>
          </div>
        </div>

        {/* 攻略の順序解説 */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">
          <strong className="text-[#1E3D34] dark:text-[#74BA9E]">水毒攻略の3ステップ順序：</strong>
          ゴミ溜めに栄養（補法）を注いではなりません。
          <strong>「① 水を動かす（利水） ➜ ② 気を巡らす（理気） ➜ ③ 陽気を起こす（温陽）」</strong>
          という順序を守ることで、頑固な痰湿と瘀血の結託を安全に解体できます。
        </div>
      </div>
    </figure>
  );
}
