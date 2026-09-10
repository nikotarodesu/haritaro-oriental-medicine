"use client";

import React, { useState } from "react";
import {
  Sparkles,
  GitFork,
  Stethoscope,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface ClinicalCase {
  id: string;
  title: string;
  patient: string;
  chiefComplaint: string;
  symptoms: string[];
  pulse: string;
  tongue: string;
  abdomen: string;
  step1Material: {
    title: string;
    detail: string;
    type: "気虚" | "気滞" | "血虚" | "瘀血" | "陰虚" | "水滞";
  };
  step2Organ: {
    root: { organ: string; reason: string };
    branch: { organ: string; reason: string };
  };
  conclusion: {
    patternType: "本虚標実" | "純実証" | "本虚証";
    mainDiagnosis: string;
    treatmentRule: string;
    prescribedAcupoints: string;
    clinicalNote: string;
  };
}

const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: "case-1",
    title: "症例①：慢性疲労 ＋ ストレス性頭痛（教科書的モデル）",
    patient: "34歳 女性（デスクワーク・残業多め）",
    chiefComplaint: "半年続く全身の重だるさと、夕方の側頭部痛・イライラ",
    symptoms: [
      "朝起きられず、食後に強い眠気と胃もたれ",
      "軟便傾向（1日2回・泥状）",
      "仕事が詰まるとため息が増え、こめかみが張るように痛む",
      "生理前に乳房の張りと情緒不安",
    ],
    pulse: "右関部（脾胃）が虚弱・沈細、左関部（肝胆）が弦脈",
    tongue: "舌質淡白・胖大（歯痕あり）、舌苔薄白",
    abdomen: "心下軟弱・振水音（胃虚）、両季肋部に軽度の抵抗（胸脇苦満）",
    step1Material: {
      title: "【気虚】 ＋ 二次的な 【気滞】",
      detail: "消化吸収エネルギーの枯渇（脾気虚）をベースに、精神ストレスで気の流れが鬱滞。",
      type: "気虚",
    },
    step2Organ: {
      root: { organ: "脾胃（中焦）", reason: "後天の気を作れずエネルギー切れを起こしている根本原因（本）" },
      branch: { organ: "肝胆（疏泄失調）", reason: "気の巡りが滞って頭部へ上逆し頭痛・張りを生む表面症状（標）" },
    },
    conclusion: {
      patternType: "本虚標実",
      mainDiagnosis: "脾気虚弱 兼 肝気鬱結（ひききょじゃく けん かんきうっけつ）",
      treatmentRule: "健脾益気（本を補う）を主軸とし、疏肝理気（標を巡らす）を併用",
      prescribedAcupoints: "足三里・中脘（健脾）、太衝・内関（疏肝理気）",
      clinicalNote: "標の実（頭痛・イライラ）ばかりを強い瀉法で叩くと、根本の脾気虚が悪化して再発します。必ず7割補・3割瀉の配分で設計します。",
    },
  },
  {
    id: "case-2",
    title: "症例②：激しい月経困難症 ＆ 肩こり（実証・循環不全）",
    patient: "29歳 女性（冷え性・立ち仕事）",
    chiefComplaint: "生理初日〜2日目の刺すような下腹部痛とレバー状経血塊",
    symptoms: [
      "針で刺されるような局所の固定痛（温めると少し和らぐ）",
      "目の下に濃いクマ、下肢の静脈瘤",
      "唇の色が暗紫色、肌が鮫肌のように乾燥",
    ],
    pulse: "沈渋脈（ざらざらと滞るような渋い拍動）",
    tongue: "舌質紫暗、舌下静脈の怒張・蛇行、側面に紫色の瘀斑",
    abdomen: "左下腹部（回盲部・小腹）に索状硬結と明確な圧痛・拒按",
    step1Material: {
      title: "【瘀血】 ＋ 【局所気滞】",
      detail: "微小循環が完全に目詰まりを起こし、新鮮な血液の灌流が途絶えている。",
      type: "瘀血",
    },
    step2Organ: {
      root: { organ: "肝・衝任脈（蔵血障害）", reason: "血の貯蔵と分配が乱れ、骨盤内および脈絡に血が滞留" },
      branch: { organ: "胞宮（子宮）局所", reason: "目詰まりした瘀血が経血排出を妨げ激痛を発する" },
    },
    conclusion: {
      patternType: "純実証",
      mainDiagnosis: "気滞血瘀・胞宮寒凝（きたいけつお・ほうきゅうかんぎょう）",
      treatmentRule: "活血化瘀・温経通絡（詰まりを激しく散らし、血流を再開させる）",
      prescribedAcupoints: "三陰交・血海（活血）、次髎・太衝（通経止痛）",
      clinicalNote: "押して痛がる「拒按」と紫舌・渋脈が揃う純実証です。躊躇せず活血・通脈の瀉法（雀啄術や置鍼）を用いて循環の堰を切ります。",
    },
  },
  {
    id: "case-3",
    title: "症例③：更年期の夜間ほてり ＆ 不眠（陰液枯渇）",
    patient: "52歳 女性（管理職・多忙）",
    chiefComplaint: "就寝時の手足のほてり、夜間中途覚醒、寝汗（盗汗）",
    symptoms: [
      "夕方から頬がポッポと紅潮する（微熱感）",
      "喉が渇いて冷たい水を一口ずつ飲みたがる",
      "腰や膝がだるく力が入らない、便が硬くコロコロ",
    ],
    pulse: "細数脈（細い糸のようでピッチが速い）",
    tongue: "舌質紅（赤みが強い）、舌苔が剥がれて全くない（鏡面舌・無苔）",
    abdomen: "腹壁菲薄、臍下丹田が無力軟弱（小腹不仁）",
    step1Material: {
      title: "【陰虚】 ➜ 【虚熱（空焚き）】",
      detail: "生体を冷やす冷却水（陰液）が底をつき、熱を抑えられず虚火が暴走。",
      type: "陰虚",
    },
    step2Organ: {
      root: { organ: "腎・心（腎水不足・心腎不交）", reason: "先天の精・腎陰が枯渇し、心の火を冷やせなくなっている" },
      branch: { organ: "脳・体表（虚火上炎）", reason: "冷却されない熱が上へ昇り、不眠・寝汗・動悸を引き起こす" },
    },
    conclusion: {
      patternType: "本虚証",
      mainDiagnosis: "肝腎陰虚・虚火上炎（かんじんいんきょ・きょかじょうえん）",
      treatmentRule: "滋陰降火・育陰潜陽（冷却水を深く補給し、浮いた火を鎮める）",
      prescribedAcupoints: "太渓・照海（滋陰）、復溜（補腎）、神門（安神）",
      clinicalNote: "熱感があるからといって氷冷や強烈な抗炎症を行うと、残された微弱な陽気まで全滅します。絶対に必要なのは「水（滋陰）の補給」です。",
    },
  },
];

export default function DiagnosisDecisionTreeSimulator() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-1");
  const [simStep, setSimStep] = useState<number>(1);

  const activeCase = CLINICAL_CASES.find((c) => c.id === selectedCaseId) || CLINICAL_CASES[0];

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    setSimStep(1);
  };

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑦：機能特定ディシジョンツリー ＆ 症例シミュレーターUI</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            素材（気血水）から拠点（五臓）へ ── 破綻ストーリーの再構成
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-[#F5F2EB] dark:bg-[#1C2630] px-3 py-1.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs font-mono text-[#59615D] dark:text-[#96A6B2]">
          <GitFork className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>2-STEP DECISION ENGINE</span>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        八綱で大枠の座標が定まったら、次の2段階で病態を言語化します。
        <strong>「Step 1：乱れている素材は何か（気・血・水の虚実）」</strong> ➜
        <strong>「Step 2：どの臓腑ネットワークが関与しているか（肝・心・脾・肺・腎）」</strong>。
        以下の臨床シミュレーターで、患者の四診情報から確定証が導かれる演繹プロセスを体験できます。
      </p>

      {/* 症例選択セレクター */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
        {CLINICAL_CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => handleSelectCase(c.id)}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              selectedCaseId === c.id
                ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20"
                : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/40"
            }`}
          >
            <div className="text-[10px] font-mono uppercase opacity-75">
              {c.id.toUpperCase()}
            </div>
            <div className="text-xs font-bold mt-1 line-clamp-1">{c.title}</div>
            <div className="text-[11px] opacity-80 mt-1 line-clamp-1">{c.patient}</div>
          </button>
        ))}
      </div>

      {/* シミュレーションワークスペース */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-6">
        {/* 患者プロファイルカード */}
        <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 sm:p-5 border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F2ECE0] dark:border-[#22303D] mb-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                {activeCase.title}
              </h5>
            </div>
            <span className="text-xs text-[#B86924] dark:text-[#E6C387] font-bold">
              {activeCase.patient}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
                CHIEF COMPLAINT（主訴と自覚症状）
              </span>
              <div className="font-bold text-[#D32F2F] dark:text-[#EF5350] mb-2">
                主訴：{activeCase.chiefComplaint}
              </div>
              <ul className="space-y-1 text-[#59615D] dark:text-[#CBD5E1]">
                {activeCase.symptoms.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
                OBJECTIVE DATA（他覚的四診サイン）
              </span>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-lg border border-[#E8E1D1] dark:border-[#22303D]">
                <strong className="text-[11px] text-[#232826] dark:text-[#FAF8F5] block">
                  【脈診】 {activeCase.pulse}
                </strong>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-lg border border-[#E8E1D1] dark:border-[#22303D]">
                <strong className="text-[11px] text-[#232826] dark:text-[#FAF8F5] block">
                  【舌診】 {activeCase.tongue}
                </strong>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-lg border border-[#E8E1D1] dark:border-[#22303D]">
                <strong className="text-[11px] text-[#232826] dark:text-[#FAF8F5] block">
                  【腹診】 {activeCase.abdomen}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* ディシジョン進行ステップバー */}
        <div className="flex items-center justify-between gap-2 border-t border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-3">
          <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
            思考シミュレーション進行度：
          </span>
          <div className="flex gap-2">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setSimStep(step)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  simStep === step
                    ? "bg-[#1E3D34] text-white shadow-xs"
                    : simStep > step
                    ? "bg-[#E8F5E9] dark:bg-[#1B382B] text-[#1E3D34] dark:text-[#74BA9E]"
                    : "bg-[#E8E1D1]/60 dark:bg-[#1C2630] text-[#8C9691] dark:text-[#64748B]"
                }`}
              >
                {step === 1 && "Step 1: 気血水特定"}
                {step === 2 && "Step 2: 臓腑連係"}
                {step === 3 && "Step 3: 確定証と治則"}
              </button>
            ))}
          </div>
        </div>

        {/* 思考推論ステップ表示 */}
        <div className="bg-white dark:bg-[#17212A] rounded-xl p-5 border border-[#E5DEC9] dark:border-[#2A3B4A]">
          {simStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1E3D34] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h6 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    Step 1：乱れている生体材料（気血水）の特定
                  </h6>
                </div>
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FFF3E0] dark:bg-[#3D2817] px-2.5 py-0.5 rounded">
                  動態材料の判定
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                <div className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-1">
                  検出された病理実体：{activeCase.step1Material.title}
                </div>
                <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                  {activeCase.step1Material.detail}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSimStep(2)}
                  className="px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2A5448] transition-all"
                >
                  <span>Step 2（臓腑特定）へ進む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {simStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1E3D34] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h6 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    Step 2：五臓の機能破綻ネットワーク（本と標）の同定
                  </h6>
                </div>
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#E8F5E9] dark:bg-[#1B382B] px-2.5 py-0.5 rounded">
                  システム拠点の特定
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 根幹（本） */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border-2 border-[#1E3D34] dark:border-[#74BA9E]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      ROOT CAUSE（本：根本原因）
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                      {activeCase.step2Organ.root.organ}
                    </span>
                  </div>
                  <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                    {activeCase.step2Organ.root.reason}
                  </p>
                </div>

                {/* 表層（標） */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#B86924] dark:border-[#E6C387]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#B86924] dark:text-[#E6C387]">
                      BRANCH PHENOMENON（標：表面症状）
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#B86924] text-white">
                      {activeCase.step2Organ.branch.organ}
                    </span>
                  </div>
                  <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                    {activeCase.step2Organ.branch.reason}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setSimStep(1)}
                  className="text-xs font-medium text-[#59615D] dark:text-[#96A6B2] hover:underline"
                >
                  ← Step 1 に戻る
                </button>
                <button
                  onClick={() => setSimStep(3)}
                  className="px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2A5448] transition-all"
                >
                  <span>Step 3（証の確定と治則）へ進む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {simStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#B86924] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h6 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    Step 3：確定診断（証）の一文化 ＆ 治療介入の宣言
                  </h6>
                </div>
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FFF3E0] dark:bg-[#3D2817] px-2.5 py-0.5 rounded">
                  {activeCase.conclusion.patternType}
                </span>
              </div>

              {/* 確定証カード */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] text-white space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5D6A7]">
                  DEFINITIVE SYNDROME DIAGNOSIS
                </span>
                <div className="text-base sm:text-lg font-serif font-bold">
                  証名：{activeCase.conclusion.mainDiagnosis}
                </div>
                <div className="text-xs text-[#E8F5E9] pt-2 border-t border-[#A5D6A7]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>
                    <strong>基本治則：</strong> {activeCase.conclusion.treatmentRule}
                  </span>
                  <span>
                    <strong>主配穴：</strong> {activeCase.conclusion.prescribedAcupoints}
                  </span>
                </div>
              </div>

              {/* 臨床的注意メモ */}
              <div className="p-3.5 rounded-xl bg-[#FFF3E0] dark:bg-[#2C1F15] border border-[#FFE0B2] dark:border-[#3D2817] text-xs flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B86924] dark:text-[#E6C387]">臨床設計の重要ポイント：</strong>{" "}
                  <span className="text-[#59615D] dark:text-[#E0D5C1]">
                    {activeCase.conclusion.clinicalNote}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setSimStep(2)}
                  className="text-xs font-medium text-[#59615D] dark:text-[#96A6B2] hover:underline"
                >
                  ← Step 2 に戻る
                </button>
                <button
                  onClick={() => setSimStep(1)}
                  className="px-3 py-1.5 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs font-bold text-[#59615D] dark:text-[#96A6B2] flex items-center gap-1.5 hover:bg-[#FAF8F5]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>最初からやり直す</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
