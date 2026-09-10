"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Activity,
  Compass,
  AlertTriangle,
  Info,
  Layers,
  Hand,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface PulseDimension {
  id: string;
  name: string;
  en: string;
  metric: string;
  leftState: {
    label: string;
    condition: string;
    clinical: string;
    pathology: string;
    tag: string;
  };
  rightState: {
    label: string;
    condition: string;
    clinical: string;
    pathology: string;
    tag: string;
  };
}

const PULSE_DIMENSIONS: PulseDimension[] = [
  {
    id: "depth",
    name: "浮沈（深さ）",
    en: "Depth Level",
    metric: "触知する圧力レベル（浅層 ⇄ 深部）",
    leftState: {
      label: "浮脈",
      condition: "指を軽く皮膚に乗せるだけで拍動を触知",
      clinical: "病位が体表にある。外邪と衛気が体表で激突している",
      pathology: "表証（風寒・風熱の初期、急性感染症）",
      tag: "表（浅層）",
    },
    rightState: {
      label: "沈脈",
      condition: "筋骨の深部まで強く押し込んで初めて触知",
      clinical: "病位が臓腑深部にある。気血が内攻しているか深部が冷衰",
      pathology: "裏証（臓腑病変、慢性疾患、陽気内伏）",
      tag: "裏（深部）",
    },
  },
  {
    id: "speed",
    name: "遅数（速さ）",
    en: "Rate & Rhythm",
    metric: "1分間の心拍リズム（遅 ⇄ 数）",
    leftState: {
      label: "遅脈",
      condition: "1呼吸（吸＋呼）に3拍以下（約60回/分未満）",
      clinical: "熱量が不足し、血流の推進エネルギー（心陽）が減衰",
      pathology: "寒証（実寒：冷えの侵入 / 虚寒：陽気不足）",
      tag: "寒（代謝低下）",
    },
    rightState: {
      label: "数脈",
      condition: "1呼吸に5拍以上（約90回/分以上）",
      clinical: "熱邪が血流を狂奔させている、または冷却水（陰液）枯渇",
      pathology: "熱証（実熱：急性炎症 / 虚熱：陰虚火旺）",
      tag: "熱（代謝亢進）",
    },
  },
  {
    id: "strength",
    name: "虚実（充実度）",
    en: "Volume & Strength",
    metric: "指で圧迫した際の弾発力（消える ⇄ 跳ね返す）",
    leftState: {
      label: "虚脈",
      condition: "軽く触れるとあるが、強く押すとフッと消える",
      clinical: "血管内の気血の充填量が不足し、器の張力がない",
      pathology: "虚証（気虚・血虚・正気衰退）➜ 治療は「補法」",
      tag: "虚（正気不足）",
    },
    rightState: {
      label: "実脈",
      condition: "強く押し込んでも指を力強く跳ね返す、幅が広い",
      clinical: "正気と邪気が激しくぶつかり合って鬱積している",
      pathology: "実証（気滞・瘀血・熱邪・食積）➜ 治療は「瀉法」",
      tag: "実（邪気旺盛）",
    },
  },
  {
    id: "tension",
    name: "緊緩（張力・弾性）",
    en: "Vessel Elasticity",
    metric: "血管壁の緊張感（ピンと張る ⇄ 柔らかくしなやか）",
    leftState: {
      label: "弦・緊脈",
      condition: "ギターの太い弦を弾くような硬い緊張感",
      clinical: "自律神経（交感神経）の過緊張、激しい疼痛、冷えの凝固",
      pathology: "肝気鬱結・激痛・寒邪・瘀血",
      tag: "緊（緊張・痙攣）",
    },
    rightState: {
      label: "緩脈・有神脈",
      condition: "適度な弾性と落ち着いた拍動、柔らかい",
      clinical: "胃気（脾胃の後天の精）が保たれ、生命力に余裕がある",
      pathology: "平脈（健康・予後良好）または湿邪（重だるさ）",
      tag: "和（正常弾性）",
    },
  },
];

interface AbdomenRegion {
  id: string;
  name: string;
  reading: string;
  anatomy: string;
  organs: string;
  findingEmpty: {
    title: string;
    desc: string;
    pathology: string;
  };
  findingFull: {
    title: string;
    desc: string;
    pathology: string;
  };
}

const ABDOMEN_REGIONS: AbdomenRegion[] = [
  {
    id: "epigastrium",
    name: "心下（みぞおち）",
    reading: "しんか",
    anatomy: "剣状突起直下〜上腹部中央（中脘付近）",
    organs: "心・脾胃（胃気の関門）",
    findingEmpty: {
      title: "心下軟弱・振水音",
      desc: "押すとペコペコと底なし沼のように力がない。ポチャポチャと胃内停水音が鳴る。",
      pathology: "脾胃気虚・水湿停滞（消化吸収能力の低下・易疲労）",
    },
    findingFull: {
      title: "心下痞硬（ひこう）",
      desc: "みぞおちに石が詰まったような自覚的つかえ感と、他覚的な硬い抵抗・圧痛。",
      pathology: "気滞・痰熱（胃気不降・自律神経緊張・過食ストレス）",
    },
  },
  {
    id: "hypochondrium",
    name: "胸脇（肋骨弓下縁）",
    reading: "きょうきょう",
    anatomy: "左右の季肋部（肋骨の下縁・期門・章門付近）",
    organs: "肝胆（疏泄と感情ストレスの鏡）",
    findingEmpty: {
      title: "季肋部虚脱（力なし）",
      desc: "肋骨弓の下に指がすんなり入り、筋肉のハリや弾性が極端に薄い。",
      pathology: "肝血虚（全身の筋膜を養う滋潤不足、眼精疲労・筋痙攣）",
    },
    findingFull: {
      title: "胸脇苦満（きょうきょうくまん）",
      desc: "肋骨下縁に指を滑り込ませると強い抵抗・張りがあり、患者が圧痛を嫌がる。",
      pathology: "肝気鬱結・少陽病（ストレス・自律神経失調・情緒不安定）",
    },
  },
  {
    id: "paraumbilical",
    name: "腹直筋・天枢周辺",
    reading: "てんすう・ふくちょくきん",
    anatomy: "臍の左右外側2寸（天枢・外陵付近）",
    organs: "大腸・脾・小腹（気血の循環路）",
    findingEmpty: {
      title: "腹壁菲薄・無力",
      desc: "腹壁全体が紙のように薄く、筋緊張が全くない。",
      pathology: "中気下陥・気血両虚（内臓下垂・慢性脱力）",
    },
    findingFull: {
      title: "小腹硬満・局所抵抗（回盲部/S状結腸）",
      desc: "左下腹部や右下腹部に索状の硬結・圧痛（桃核承気湯・桂枝茯苓丸の適応）。",
      pathology: "瘀血・腸内宿便（血行不全・骨盤内うっ血・生理痛）",
    },
  },
  {
    id: "hypogastrium",
    name: "臍下丹田（下腹部）",
    reading: "さいかたんでん",
    anatomy: "臍から恥骨結合の上縁まで（気海・関元付近）",
    organs: "腎・命門（先天の精・生命バッテリー）",
    findingEmpty: {
      title: "小腹不仁（しょうふくふじん）",
      desc: "臍下が綿のようにフニャフニャで底に力がない。指を置いても押し返す力ゼロ。",
      pathology: "腎陽虚・先天の精の衰亡（極度の下半身冷え・頻尿・老化衰弱）",
    },
    findingFull: {
      title: "小腹急結 / 臍下動気",
      desc: "下腹の筋が突っ張る（急結）、または臍の直下で強いドクドクという拍動を触知する。",
      pathology: "腎陰虚・心腎不交・気の上逆（衝気・焦燥感・不安神経症）",
    },
  },
];

export default function DiagnosisPulseAbdomenMap() {
  const [activeTab, setActiveTab] = useState<"pulse" | "abdomen">("pulse");
  const [selectedPulse, setSelectedPulse] = useState<string>("depth");
  const [pulseState, setPulseState] = useState<"left" | "right">("left");
  const [selectedRegion, setSelectedRegion] = useState<string>("epigastrium");
  const [abdomenFinding, setAbdomenFinding] = useState<"empty" | "full">("full");

  const currentPulse = PULSE_DIMENSIONS.find((p) => p.id === selectedPulse) || PULSE_DIMENSIONS[0];
  const activePulseSide = pulseState === "left" ? currentPulse.leftState : currentPulse.rightState;

  const currentRegion = ABDOMEN_REGIONS.find((r) => r.id === selectedRegion) || ABDOMEN_REGIONS[0];
  const activeFinding = abdomenFinding === "empty" ? currentRegion.findingEmpty : currentRegion.findingFull;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：切診の客観物理化</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            脈診4層物理ゲージ ＆ 腹診トポロジーマップ
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-[#F5F2EB] dark:bg-[#1C2630] p-1 rounded-xl self-start sm:self-auto border border-[#E8E1D1] dark:border-[#2A3B4A]">
          <button
            onClick={() => setActiveTab("pulse")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "pulse"
                ? "bg-white dark:bg-[#22303D] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>脈診4層ゲージ</span>
          </button>
          <button
            onClick={() => setActiveTab("abdomen")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "abdomen"
                ? "bg-white dark:bg-[#22303D] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>腹診トポロジー</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        切診（脈診・腹診）は神秘的な直感ではなく、<strong>「触覚情報を客観的な物理パラメータ（深さ・速度・弾発力・張力・組織抵抗）として定量化する工学的な答え合わせ」</strong>です。問診で立てた仮説の裏付けを取り、病変の深さと虚実の強度を最終確定します。
      </p>

      {/* タブ①：脈診4層物理ゲージ */}
      {activeTab === "pulse" && (
        <div className="space-y-6">
          {/* 4軸選択ボタン */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PULSE_DIMENSIONS.map((dim) => (
              <button
                key={dim.id}
                onClick={() => setSelectedPulse(dim.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedPulse === dim.id
                    ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
                }`}
              >
                <div className="text-xs font-bold">{dim.name}</div>
              </button>
            ))}
          </div>

          {/* 物理ゲージ操作インターフェース */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div>
                <span className="text-[10px] font-bold text-[#8C9691] dark:text-[#64748B]">
                  脈象の物理測定パラメータ
                </span>
                <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentPulse.name} ── {currentPulse.metric}
                </h5>
              </div>
              <span className="text-xs text-[#1E3D34] dark:text-[#74BA9E] font-medium">
                左右の極をタップして物理変化を切り替え
              </span>
            </div>

            {/* 左右切り替えトグルバー */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setPulseState("left")}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  pulseState === "left"
                    ? "bg-white dark:bg-[#1A2632] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm ring-2 ring-[#1E3D34]/20"
                    : "bg-white/60 dark:bg-[#151F28] border-[#E5DEC9] dark:border-[#22303D] opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#E8F5E9] dark:bg-[#1B382B] px-2 py-0.5 rounded">
                    {currentPulse.leftState.tag}
                  </span>
                  {pulseState === "left" && (
                    <span className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E] animate-ping" />
                  )}
                </div>
                <div className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentPulse.leftState.label}
                </div>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-1 leading-relaxed">
                  {currentPulse.leftState.condition}
                </p>
              </button>

              <button
                onClick={() => setPulseState("right")}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  pulseState === "right"
                    ? "bg-white dark:bg-[#1A2632] border-[#B86924] dark:border-[#E6C387] shadow-sm ring-2 ring-[#B86924]/20"
                    : "bg-white/60 dark:bg-[#151F28] border-[#E5DEC9] dark:border-[#22303D] opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FFF3E0] dark:bg-[#3D2817] px-2 py-0.5 rounded">
                    {currentPulse.rightState.tag}
                  </span>
                  {pulseState === "right" && (
                    <span className="w-2 h-2 rounded-full bg-[#B86924] dark:bg-[#E6C387] animate-ping" />
                  )}
                </div>
                <div className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentPulse.rightState.label}
                </div>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-1 leading-relaxed">
                  {currentPulse.rightState.condition}
                </p>
              </button>
            </div>

            {/* 解析結果パネル */}
            <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 sm:p-5 border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
                <Compass className="w-4 h-4" />
                <span>臨床デコード結果：{activePulseSide.label}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-lg border border-[#E8E1D1] dark:border-[#22303D]">
                  <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
                    PHYSIOLOGICAL MECHANISM
                  </span>
                  <div className="font-medium text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                    {activePulseSide.clinical}
                  </div>
                </div>
                <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-lg border border-[#E8E1D1] dark:border-[#22303D]">
                  <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
                    PATHOLOGY & PRINCIPLE
                  </span>
                  <div className="font-bold text-[#B86924] dark:text-[#E6C387]">
                    {activePulseSide.pathology}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タブ②：腹診トポロジーマップ */}
      {activeTab === "abdomen" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* 左側：腹部領域選択 */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[11px] font-bold text-[#8C9691] dark:text-[#64748B] uppercase tracking-wider block mb-1">
                腹部診断トポロジー（部位を選択）
              </span>
              {ABDOMEN_REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                    selectedRegion === reg.id
                      ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-medium opacity-70">
                      {reg.reading} / {reg.organs}
                    </div>
                    <div className="text-xs sm:text-sm font-bold mt-0.5">{reg.name}</div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      selectedRegion === reg.id ? "rotate-90 text-[#E6C387]" : "opacity-40"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* 右側：選択部位の虚実比較 */}
            <div className="lg:col-span-7 bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block">
                      REGION DETAILS
                    </span>
                    <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                      {currentRegion.name}（{currentRegion.anatomy}）
                    </h5>
                  </div>
                  <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#E8F5E9] dark:bg-[#1B382B] px-2.5 py-1 rounded-lg">
                    {currentRegion.organs}
                  </span>
                </div>

                {/* 虚（軟弱） vs 実（抵抗・硬結） トグル */}
                <div className="flex gap-2 p-1 bg-[#E8E1D1]/50 dark:bg-[#1A2632] rounded-xl mb-4">
                  <button
                    onClick={() => setAbdomenFinding("empty")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      abdomenFinding === "empty"
                        ? "bg-white dark:bg-[#22303D] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                        : "text-[#59615D] dark:text-[#96A6B2]"
                    }`}
                  >
                    虚証所見（軟弱無力・陥没）
                  </button>
                  <button
                    onClick={() => setAbdomenFinding("full")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      abdomenFinding === "full"
                        ? "bg-white dark:bg-[#22303D] text-[#B86924] dark:text-[#E6C387] shadow-xs"
                        : "text-[#59615D] dark:text-[#96A6B2]"
                    }`}
                  >
                    実証所見（硬結・圧痛・拒按）
                  </button>
                </div>

                {/* 所見内容 */}
                <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        abdomenFinding === "empty" ? "bg-[#0288D1]" : "bg-[#D32F2F]"
                      }`}
                    />
                    <h6 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {activeFinding.title}
                    </h6>
                  </div>
                  <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                    {activeFinding.desc}
                  </p>
                  <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                    <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-0.5">
                      病機と適応証
                    </span>
                    <p className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      {activeFinding.pathology}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2 text-[11px] text-[#59615D] dark:text-[#96A6B2]">
                <Info className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387] shrink-0" />
                <span>腹診時は膝を軽く曲げさせ、患者の腹直筋の緊張を緩めてから呼気に合わせて押圧します。</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 臨床レッドフラッグ（⚠️重大な警告・即時紹介基準） */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#FFF3E0] dark:bg-[#2C1F15] border-2 border-[#FFA000] dark:border-[#FFB300]/80">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#D32F2F] dark:text-[#EF5350] shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <strong className="text-sm font-bold text-[#B86924] dark:text-[#FFB300]">
                切診における臨床レッドフラッグ（直ちに施術中止・救急/専門医紹介）
              </strong>
              <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                生命危機サイン
              </span>
            </div>
            <ul className="space-y-1.5 text-[#59615D] dark:text-[#E0D5C1] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-[#D32F2F] font-bold">1. 拍動を伴うボール状硬結（臍周辺〜上腹部）：</span>
                <span>
                  <strong>腹部大動脈瘤（AAA: Abdominal Aortic Aneurysm）</strong>の疑い。絶対に強く押圧してはならず、直ちに触診を中断し血管外科・救急外来へ救急搬送・紹介する。
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#D32F2F] font-bold">2. 板状硬（筋性防御）＋ 反跳痛（Blumberg徴候）：</span>
                <span>
                  腹膜炎、消化管穿孔、急性虫垂炎穿孔などの急性腹症。お腹全体が板のように硬直し、押した手を急に離した際に激痛が走る場合は即時救急対応。
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </figure>
  );
}
