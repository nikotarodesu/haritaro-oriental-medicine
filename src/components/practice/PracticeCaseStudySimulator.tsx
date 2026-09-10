"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Zap,
  Activity,
  Layers,
} from "lucide-react";

interface CaseStudy {
  id: string;
  typeLabel: string;
  patient: string;
  chiefComplaint: string;
  findings: {
    pulse: string;
    tongue: string;
    abdomen: string;
  };
  options: {
    biaoLi: string[];
    correctBiaoLi: string;
    treatmentRule: string[];
    correctTreatmentRule: string;
    acupoints: string[];
    correctAcupoints: string;
  };
  solution: {
    diagnosis: string;
    ratio: string;
    primaryAcupoints: string;
    evaluationMetric: string;
    clinicalPearl: string;
  };
}

const CASES_DATA: CaseStudy[] = [
  {
    id: "case-acute",
    typeLabel: "① 急性疾患モデル",
    patient: "32歳 男性（デスクワーク）",
    chiefComplaint: "重い荷物を持ち上げた瞬間の激しい腰痛（ぎっくり腰・体動困難）",
    findings: {
      pulse: "浮緊脈（強く張り詰める）",
      tongue: "舌質暗赤、舌苔薄白",
      abdomen: "腹直筋緊張、下腹部自発痛なし",
    },
    options: {
      biaoLi: ["表実証（急性・邪気旺盛）", "裏虚寒証（慢性・エネルギー不足）", "本虚標実（上実下虚）"],
      correctBiaoLi: "表実証（急性・邪気旺盛）",
      treatmentRule: ["活血化瘀・理気通絡（瀉法）", "温補脾腎（補法）", "滋陰降火（潤い補給）"],
      correctTreatmentRule: "活血化瘀・理気通絡（瀉法）",
      acupoints: ["委中（合穴） ＋ 承山", "足三里 ＋ 中脘", "太谿 ＋ 照海"],
      correctAcupoints: "委中（合穴） ＋ 承山",
    },
    solution: {
      diagnosis: "表実証（足太陽膀胱経の気滞・瘀血）",
      ratio: "標治 7 ： 本治 3（痛みの解除が最優先）",
      primaryAcupoints: "委中（吸気刺入・開孔瀉法） ＋ 承山（経脈の拘攣緩解）",
      evaluationMetric: "術直後の前屈可動域改善、歩行痛の激減",
      clinicalPearl: "急性腰痛の患部（腰）をいきなり強く揉んだり深刺しすると炎症が悪化します。遠隔の合穴（委中）で膀胱経の気血の堰を切るのが定石です。",
    },
  },
  {
    id: "case-chronic",
    typeLabel: "② 慢性疾患モデル",
    patient: "44歳 女性（主婦・事務）",
    chiefComplaint: "半年以上続く全身の倦怠感、朝起きられない、食後の強い眠気と軟便",
    findings: {
      pulse: "沈緩無力脈（押すと消える）",
      tongue: "舌質淡白・胖大（歯痕あり）、白苔",
      abdomen: "心下軟弱・振水音（ポチャポチャ鳴る）",
    },
    options: {
      biaoLi: ["表熱実証（急性炎症）", "裏虚寒証（脾気虚弱・水滞）", "肝陽上亢（実熱）"],
      correctBiaoLi: "裏虚寒証（脾気虚弱・水滞）",
      treatmentRule: ["補気健脾・利水化湿（補法）", "清熱瀉火（強烈に冷やす）", "活血化瘀（刺絡瀉血）"],
      correctTreatmentRule: "補気健脾・利水化湿（補法）",
      acupoints: ["足三里 ＋ 中脘 ＋ 陰陵泉", "委中 ＋ 承山", "曲池 ＋ 合谷"],
      correctAcupoints: "足三里 ＋ 中脘 ＋ 陰陵泉",
    },
    solution: {
      diagnosis: "裏虚寒証（足太陰脾経の脾気虚 兼 水湿停滞）",
      ratio: "本治 8 ： 標治 2（エネルギー産生基盤の再建が主軸）",
      primaryAcupoints: "足三里（補法・温灸） ＋ 中脘（募穴） ＋ 陰陵泉（合穴・利水）",
      evaluationMetric: "食後眠気の消失、便通の有形化、持続的スタミナ回復",
      clinicalPearl: "慢性疲労患者には刺激を与えすぎてはなりません。細鍼で優しく刺入し、施灸の温熱で中焦の胃気を温め起こすことが長期寛解の鍵です。",
    },
  },
  {
    id: "case-complex",
    typeLabel: "③ 複合病態モデル",
    patient: "55歳 女性（管理職）",
    chiefComplaint: "夕方からの回転性めまい、頭ののぼせ、夜間の動悸と激しい不安感",
    findings: {
      pulse: "左関部（肝）が弦数脈、右尺部（腎）が極細沈脈",
      tongue: "舌質紅、舌先赤、無苔（剥苔）",
      abdomen: "胸脇苦満 ＋ 臍下不仁（下腹部無力）",
    },
    options: {
      biaoLi: ["純実証（外邪侵入）", "本虚標実（上実下虚・肝陽上亢＋腎陰虚）", "純虚証（無力）"],
      correctBiaoLi: "本虚標実（上実下虚・肝陽上亢＋腎陰虚）",
      treatmentRule: ["標治（降気平肝） ➜ 本治（滋陰補腎）", "強烈な発汗解表法", "単なる補気昇提法"],
      correctTreatmentRule: "標治（降気平肝） ➜ 本治（滋陰補腎）",
      acupoints: ["太衝・風池（降気） ＋ 太谿・神門（滋陰安神）", "合谷 ＋ 委中", "足三里単独"],
      correctAcupoints: "太衝・風池（降気） ＋ 太谿・神門（滋陰安神）",
    },
    solution: {
      diagnosis: "本虚標実・上実下虚（腎陰虚を根本とし、肝陽が頭部へ吹き上がった状態）",
      ratio: "標治（降気）を先に行い、落ち着いたら本治（滋陰）で固める二段構え",
      primaryAcupoints: "太衝・風池（気逆を足元へ引き下げる） ＋ 太谿・神門（冷却水補給と安神）",
      evaluationMetric: "心拍変動（HRV）の安定、のぼせ・動悸の消失、熟睡感の獲得",
      clinicalPearl: "頭部の熱感（標）だけを見て冷やすと、根本の腎陰虚（本）が破壊されます。必ず『上を降ろして下を養う（水火既済）』ツインアンカー構造を取ります。",
    },
  },
];

export default function PracticeCaseStudySimulator() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedBiaoLi, setSelectedBiaoLi] = useState<string>("");
  const [selectedRule, setSelectedRule] = useState<string>("");
  const [selectedPoints, setSelectedPoints] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const activeCase = CASES_DATA[selectedCaseIndex];

  const handleSelectCase = (index: number) => {
    setSelectedCaseIndex(index);
    setSelectedBiaoLi("");
    setSelectedRule("");
    setSelectedPoints("");
    setShowResult(false);
  };

  const isComplete = selectedBiaoLi && selectedRule && selectedPoints;
  const isCorrect =
    selectedBiaoLi === activeCase.options.correctBiaoLi &&
    selectedRule === activeCase.options.correctTreatmentRule &&
    selectedPoints === activeCase.options.correctAcupoints;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑧：3大病態の臨床推論カード ＆ シミュレーションUI</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            急性・慢性・複合病態におけるアルゴリズムの実証
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          インタラクティブ臨床判定
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        優れた臨床アルゴリズムは、ぎっくり腰のような「急性病態」から、長年の慢性疲労、さらには更年期の「複合病態」に至るまで、同一の論理ルールで作動します。
        以下の症例を選択し、<strong>「八綱の判定 ➜ 治則の選定 ➜ 配穴の決定」</strong>を選んで推論シミュレーションを実行してください。
      </p>

      {/* 症例タブ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
        {CASES_DATA.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => handleSelectCase(idx)}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              selectedCaseIndex === idx
                ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20"
                : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
            }`}
          >
            <span className="text-[10px] font-mono font-bold opacity-80">{c.typeLabel}</span>
            <div className="text-xs font-bold mt-1 line-clamp-1">{c.patient}</div>
          </button>
        ))}
      </div>

      {/* カルテカード */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-6 mb-6">
        <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE0] dark:border-[#22303D] mb-3">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              【患者情報】{activeCase.patient}
            </span>
            <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B]">
              CHIEF COMPLAINT
            </span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#D32F2F] dark:text-[#EF5350] mb-3">
            主訴：{activeCase.chiefComplaint}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#121920]">
              <strong className="text-[10px] text-[#8C9691] dark:text-[#64748B] block">脈診：</strong>
              <span className="text-[#232826] dark:text-[#FAF8F5]">{activeCase.findings.pulse}</span>
            </div>
            <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#121920]">
              <strong className="text-[10px] text-[#8C9691] dark:text-[#64748B] block">舌診：</strong>
              <span className="text-[#232826] dark:text-[#FAF8F5]">{activeCase.findings.tongue}</span>
            </div>
            <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#121920]">
              <strong className="text-[10px] text-[#8C9691] dark:text-[#64748B] block">腹診：</strong>
              <span className="text-[#232826] dark:text-[#FAF8F5]">{activeCase.findings.abdomen}</span>
            </div>
          </div>
        </div>

        {/* 3問の選択クイズ */}
        <div className="space-y-4 text-xs">
          {/* 問1：八綱座標 */}
          <div>
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block mb-2">
              Q1. 八綱弁証の座標はどれか？
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeCase.options.biaoLi.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedBiaoLi(opt)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedBiaoLi === opt
                      ? "bg-[#1E3D34] text-white border-[#1E3D34]"
                      : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#CBD5E1]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 問2：治則 */}
          <div>
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block mb-2">
              Q2. 選択すべき主治則（ベクトル）はどれか？
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeCase.options.treatmentRule.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedRule(opt)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedRule === opt
                      ? "bg-[#1E3D34] text-white border-[#1E3D34]"
                      : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#CBD5E1]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 問3：配穴 */}
          <div>
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block mb-2">
              Q3. 最も適切な配穴コンビネーションはどれか？
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeCase.options.acupoints.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedPoints(opt)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedPoints === opt
                      ? "bg-[#1E3D34] text-white border-[#1E3D34]"
                      : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#CBD5E1]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 判定ボタン */}
        <div className="flex justify-end pt-2">
          <button
            disabled={!isComplete}
            onClick={() => setShowResult(true)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isComplete
                ? "bg-[#FFA000] text-[#1E3D34] shadow-md hover:bg-[#FF8F00]"
                : "bg-[#E8E1D1] dark:bg-[#2A3B4A] text-[#8C9691] cursor-not-allowed"
            }`}
          >
            <span>臨床推論を実行する</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 結果展開 */}
        {showResult && (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE0] dark:border-[#22303D]">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <div className="flex items-center gap-1.5 text-[#2E7D32] dark:text-[#74BA9E] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>推論正解！完璧な臨床設計です</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[#D32F2F] dark:text-[#EF5350] font-bold text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>一部にズレがあります。正解ルートを確認しましょう</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B]">
                EXPERT SOLUTION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-[#FAF8F5] dark:bg-[#121920] rounded-xl">
                <strong className="text-[10px] font-mono text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
                  確定診断 ＆ 本標比率
                </strong>
                <div className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {activeCase.solution.diagnosis}
                </div>
                <div className="text-[11px] text-[#B86924] dark:text-[#E6C387] mt-0.5">
                  配分：{activeCase.solution.ratio}
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] dark:bg-[#121920] rounded-xl">
                <strong className="text-[10px] font-mono text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
                  配穴と手技・評価指標
                </strong>
                <div className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {activeCase.solution.primaryAcupoints}
                </div>
                <div className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] mt-0.5">
                  指標：{activeCase.solution.evaluationMetric}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#FFF3E0] dark:bg-[#2C1F15] rounded-xl border border-[#FFE0B2] dark:border-[#3D2817]">
              <strong className="text-[#B86924] dark:text-[#E6C387] block mb-1">
                【臨床の極意】
              </strong>
              <p className="text-[#59615D] dark:text-[#E0D5C1] leading-relaxed">
                {activeCase.solution.clinicalPearl}
              </p>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
