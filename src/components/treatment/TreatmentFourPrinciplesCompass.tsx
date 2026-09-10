"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Compass,
  Flame,
  Snowflake,
  Shield,
  Layers,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Sliders,
} from "lucide-react";

interface PrincipleAxis {
  id: string;
  name: string;
  en: string;
  reading: string;
  axisDesc: string;
  leftPolar: {
    label: string;
    vector: string;
    target: string;
    method: string;
    clinicalRule: string;
  };
  rightPolar: {
    label: string;
    vector: string;
    target: string;
    method: string;
    clinicalRule: string;
  };
  coreInsight: string;
}

const PRINCIPLE_AXES: PrincipleAxis[] = [
  {
    id: "buxie",
    name: "補瀉（ほしゃ）の原理",
    en: "Tonification vs Drainage",
    reading: "ほしゃ",
    axisDesc: "生命エネルギーの量的過不足（虚実）を是正する絶対軸",
    leftPolar: {
      label: "虚証（不足）",
      vector: "補法（足す・補う）",
      target: "気虚・血虚・臓腑機能衰退",
      method: "細鍼、緩刺、随刺、抜鍼後疾按、温灸",
      clinicalRule: "「疲労」を訴えても、気虚なら補気。枯渇したバッテリーに電力を充填する。",
    },
    rightPolar: {
      label: "実証（過密）",
      vector: "瀉法（削ぐ・出す）",
      target: "邪気旺盛・気滞・瘀血・熱毒",
      method: "太鍼、速刺、迎刺、抜鍼後不按、刺絡",
      clinicalRule: "ストレス性気滞の「疲労感」なら理気瀉法。渋滞の詰まりを吹き飛ばす。",
    },
    coreInsight: "同じ「だるい」という主訴でも、補瀉のベクトルを逆転させると致命的な医療事故（誤治）になる。",
  },
  {
    id: "hanre",
    name: "寒熱（かんねつ）の原理",
    en: "Warming vs Cooling",
    reading: "かんねつ",
    axisDesc: "体温・代謝活性の熱力学的平衡（温度勾配）を再設定する軸",
    leftPolar: {
      label: "寒証（代謝低下）",
      vector: "温法（温める・陽気鼓舞）",
      target: "裏寒・脾腎陽虚・冷え・寒湿凝滞",
      method: "透熱灸、棒灸、温針灸、深部温熱",
      clinicalRule: "「寒者熱之（寒ければこれを熱す）」。ボイラーの火を焚きつけ、凍結した血流を融解させる。",
    },
    rightPolar: {
      label: "熱証（代謝亢進）",
      vector: "清法（冷ます・熱毒放散）",
      target: "実熱・肝火・胃火・急性炎症",
      method: "浅刺速抜、井穴刺絡、清熱穴（曲池・大椎）",
      clinicalRule: "「熱者寒之（熱ければこれを冷ます）」。熱がこもったエンジンのラジエーターを開放し冷却する。",
    },
    coreInsight: "「温めれば治る」という民間療法の罠を排し、熱証・炎症に対しては刺鍼による的確な清熱・消炎を行う。",
  },
  {
    id: "biaoben",
    name: "標本（ひょうほん）の原理",
    en: "Root vs Manifestation",
    reading: "ひょうほん",
    axisDesc: "病根（本）と表面症状（標）の時間的優先順位を決める軸",
    leftPolar: {
      label: "本治優先（根本治療）",
      vector: "緩則治其本（緩なればその本を治す）",
      target: "慢性期、寛解期、体質脆弱性（腎虚・脾虚）",
      method: "五兪穴による経絡調整、根本補益",
      clinicalRule: "緊急性のない慢性疾患は、表面の痛みに惑わされず根本の体質土台（本）を徹底して底上げする。",
    },
    rightPolar: {
      label: "標先治（対症先行）",
      vector: "急則治其標（急なればその標を治す）",
      target: "急性激痛、大小便不通、激烈な腹満・発熱",
      method: "局所阿是穴、郄穴、刺絡、瀉法",
      clinicalRule: "患者が激痛で眠れない、または排泄が止まっている緊急時は、本治を後回しにして標の苦痛を直ちに解除する。",
    },
    coreInsight: "「根本治療至上主義」に陥らず、患者の緊急度と苦痛強度に応じた柔軟なタイムライン切り替えが必須。",
  },
  {
    id: "zhengfan",
    name: "正治・反治（せいちはんち）",
    en: "Direct vs Paradoxical Treatment",
    reading: "せいちはんち",
    axisDesc: "病態の見かけ（仮象）と本質の一致度を見抜く最高峰の臨床軸",
    leftPolar: {
      label: "正治（逆治・原則）",
      vector: "見かけの病態と逆のベクトルで攻める",
      target: "通常病態（熱には冷、寒には温、虚には補、実には瀉）",
      method: "標準的な弁証論治プロトコル",
      clinicalRule: "「見かけ＝本質」の通常ケース。熱があれば冷まし、冷えがあれば温めるストレートな介入。",
    },
    rightPolar: {
      label: "反治（従治・高度技法）",
      vector: "見かけの症状と同じベクトルであえて攻める",
      target: "真寒仮熱（熱因熱用）、真熱仮寒（寒因寒用）",
      method: "陰盛格陽に対する熱薬・温灸、熱極生寒への清熱",
      clinicalRule: "極限の冷えが熱を体表へ押し出している「真寒仮熱」では、顔が赤くてもあえて足腰を温める（熱因熱用）。",
    },
    coreInsight: "表層の現象に騙されず、深層の生命システムの本質を見抜くことで、劇的な逆転回復をもたらす。",
  },
];

export default function TreatmentFourPrinciplesCompass() {
  const [selectedAxisId, setSelectedAxisId] = useState<string>("buxie");
  const activeAxis =
    PRINCIPLE_AXES.find((a) => a.id === selectedAxisId) || PRINCIPLE_AXES[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：治則の4次元コンパス（Four Principles Compass）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            座標（診断） ＋ ベクトル（治則） ＝ 再現性のある治療
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#59615D] dark:text-[#96A6B2]">
          <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>4D NAVIGATION</span>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        診断によって病態の座標が固定されたら、次は<strong>「どの方向に生命を押し戻すか（ベクトル）」</strong>を4つの軸で決定します。補瀉・寒熱・標本・正治反治の4大治則が確立されて初めて、勘や経験に頼らない再現性のある治療プロトコルが成立します。
      </p>

      {/* 4つの軸タブ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {PRINCIPLE_AXES.map((axis) => {
          const isSelected = axis.id === selectedAxisId;
          return (
            <button
              key={axis.id}
              onClick={() => setSelectedAxisId(axis.id)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isSelected
                  ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20"
                  : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
              }`}
            >
              <div className="text-[10px] font-mono opacity-75">{axis.en}</div>
              <div className="text-xs sm:text-sm font-bold mt-0.5">{axis.name}</div>
            </button>
          );
        })}
      </div>

      {/* 選択した軸の双極対比コンパスUI */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
              PRINCIPLE AXIS OVERVIEW
            </span>
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              {activeAxis.name} ── {activeAxis.axisDesc}
            </h5>
          </div>
          <span className="text-xs text-[#B86924] dark:text-[#E6C387] font-bold">
            双極バランス制御
          </span>
        </div>

        {/* 左右の極（Left vs Right） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 左極 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                {activeAxis.leftPolar.label}
              </span>
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                {activeAxis.leftPolar.vector}
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <strong className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block">
                  対象病態：
                </strong>
                <span className="text-[#232826] dark:text-[#FAF8F5] font-medium">
                  {activeAxis.leftPolar.target}
                </span>
              </div>
              <div>
                <strong className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block">
                  手技・介入アプローチ：
                </strong>
                <span className="text-[#59615D] dark:text-[#CBD5E1]">
                  {activeAxis.leftPolar.method}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <strong className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
                  臨床判断のポイント：
                </strong>
                <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                  {activeAxis.leftPolar.clinicalRule}
                </p>
              </div>
            </div>
          </div>

          {/* 右極 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#FFF3E0] dark:bg-[#3D2817] text-[#B86924] dark:text-[#E6C387]">
                {activeAxis.rightPolar.label}
              </span>
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                {activeAxis.rightPolar.vector}
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <strong className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block">
                  対象病態：
                </strong>
                <span className="text-[#232826] dark:text-[#FAF8F5] font-medium">
                  {activeAxis.rightPolar.target}
                </span>
              </div>
              <div>
                <strong className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block">
                  手技・介入アプローチ：
                </strong>
                <span className="text-[#59615D] dark:text-[#CBD5E1]">
                  {activeAxis.rightPolar.method}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <strong className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-0.5">
                  臨床判断のポイント：
                </strong>
                <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                  {activeAxis.rightPolar.clinicalRule}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 軸の核心インサイト */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#232826] dark:text-[#FAF8F5]">治則適用の最重要原則：</strong>{" "}
            <span className="text-[#59615D] dark:text-[#CBD5E1]">{activeAxis.coreInsight}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
