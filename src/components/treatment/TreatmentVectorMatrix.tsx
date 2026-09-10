"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BatteryCharging,
  Gauge,
  Workflow,
  Undo2,
  ArrowDown,
  Activity,
  Sliders,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface VectorItem {
  id: string;
  name: string;
  en: string;
  symbol: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
  metaphor: string;
  targetMaterial: string;
  technique: {
    needle: string;
    moxa: string;
    timing: string;
  };
  samplePoints: string;
  dangerIfMistaken: string;
}

const VECTOR_ITEMS: VectorItem[] = [
  {
    id: "bu",
    name: "補法（Bu）― 不足を補う",
    en: "Tonification / Supplementation",
    symbol: "充電・集中・保持",
    themeColor: {
      bg: "bg-[#FFF8E1] dark:bg-[#2D2415]",
      border: "border-[#FFA000] dark:border-[#FFB300]",
      text: "text-[#B86924] dark:text-[#FFB300]",
      badge: "bg-[#FFA000] text-white",
    },
    metaphor: "放電しきった生体バッテリーへの低圧急速充電。エネルギーの漏出を防ぐ。",
    targetMaterial: "気虚・血虚・陰虚・陽虚（正気の枯渇）",
    technique: {
      needle: "経絡の流注方向に沿って刺入（随）。呼吸の呼気で刺入・吸気で抜鍼。抜鍼後ただちに穴を指で押さえ気漏れを防ぐ（疾按）。",
      moxa: "透熱灸（小さく温かい艾炷）、知熱灸、温灸で穏やかに温熱エネルギーを浸透させる。",
      timing: "細鍼を用い、低刺激でじっくり時間をかけて置鍼（または無痛浅刺）。",
    },
    samplePoints: "足三里（脾胃）、太谿・関元（補腎）、気海（補気）、百会（昇提）",
    dangerIfMistaken: "邪気（痰湿・瘀血）が詰まっている部位に補法を行うと、ゴミに栄養を注ぎ込むことになり病勢が激化する。",
  },
  {
    id: "xie",
    name: "瀉法（Xie）― 過剰を削ぐ",
    en: "Drainage / Elimination",
    symbol: "排出・減圧・排熱",
    themeColor: {
      bg: "bg-[#E0F2FE] dark:bg-[#0C2436]",
      border: "border-[#0288D1] dark:border-[#38BDF8]",
      text: "text-[#0288D1] dark:text-[#38BDF8]",
      badge: "bg-[#0288D1] text-white",
    },
    metaphor: "高圧ボイラーの安全減圧バルブ開放。局所に充満した熱毒・過密エネルギーの放散。",
    targetMaterial: "実熱・火毒・邪気過盛・外感急性期",
    technique: {
      needle: "経絡の流れに逆らって刺入（迎）。呼吸の吸気で刺入・呼気で抜鍼。抜鍼後に穴を開けたままにして邪気の抜け道を確保する（不按）。",
      moxa: "原則施灸は控えるか、強刺激の多壮灸で毒を外へ引き出す（清熱瀉火法）。",
      timing: "やや太い鍼、強めの提挿・捻転手技（雀啄術）、速刺速抜で刺激量を短時間で最大化。",
    },
    samplePoints: "曲池・合谷（清熱瀉火）、行間（清肝火）、大椎（解熱）、委中（瀉血・清熱）",
    dangerIfMistaken: "正気が弱り切っている虚証患者に瀉法を行うと、残された生命エネルギーまで削ぎ落とし虚脱・失神を招く。",
  },
  {
    id: "tong",
    name: "通法（Tong）― 停滞を動かす",
    en: "Clearing Obstruction",
    symbol: "渋滞解除・血行促進",
    themeColor: {
      bg: "bg-[#E8F5E9] dark:bg-[#132A1C]",
      border: "border-[#2E7D32] dark:border-[#74BA9E]",
      text: "text-[#1E3D34] dark:text-[#74BA9E]",
      badge: "bg-[#2E7D32] text-white",
    },
    metaphor: "高速道路の大渋滞を誘導して解除する交通管制。固着したダムの放流。",
    targetMaterial: "気滞・瘀血・痰飲・経絡気血阻滞（固定痛・しびれ）",
    technique: {
      needle: "平補平瀉（均等な捻転）、孫絡（毛細血管のうっ血）に対する三稜鍼刺絡（瀉血）、筋膜間隙を貫通する回旋手技。",
      moxa: "温通（温めて動かす）：温針灸や棒灸で血流の凝固を溶かしながら流す。",
      timing: "得気（響き）を患部や経絡走行に沿って遠隔へ波及させる導気法。",
    },
    samplePoints: "太衝（疏肝理気）、三陰交・血海（活血化瘀）、陰陵泉（利湿通絡）、外関（通経）",
    dangerIfMistaken: "出血傾向や重度貧血の患者に激しい通法・刺絡を行うと、血虚が急速に進行する。",
  },
  {
    id: "tiao",
    name: "調気（Tiao）― 逆流を正す",
    en: "Harmonizing & Directing",
    symbol: "軌道修正・下降誘導",
    themeColor: {
      bg: "bg-[#FFEBEE] dark:bg-[#2D1618]",
      border: "border-[#D32F2F] dark:border-[#EF5350]",
      text: "text-[#D32F2F] dark:text-[#EF5350]",
      badge: "bg-[#D32F2F] text-white",
    },
    metaphor: "頭部へ突き上げた逆流津波を大地へ吸い込ませるグラウンディング（避雷針）。",
    targetMaterial: "気逆・胃気上逆・肝火上炎・心腎不交（のぼせ・嘔吐・めまい・不眠）",
    technique: {
      needle: "上実下虚の是正：頭部・胸部は軽微な接触鍼や散気にとどめ、足部の遠隔穴を深く取穴して気を下方へ引き下げる（引火帰元）。",
      moxa: "足底の湧泉穴にお灸を据えて、頭頂に登った熱気を足元へ誘引する。",
      timing: "呼吸法と同期させ、患者に深い呼気（吐く息）を促しながら操作。",
    },
    samplePoints: "湧泉（引火帰元）、太衝（降肝火）、内関（降逆止嘔）、中脘（胃気和降）",
    dangerIfMistaken: "気逆している患者の頭部や肩口ばかりを強刺激すると、さらに気の上逆を助長し頭痛や嘔気・血圧急上昇を招く。",
  },
];

export default function TreatmentVectorMatrix() {
  const [selectedVector, setSelectedVector] = useState<string>("bu");
  const current = VECTOR_ITEMS.find((v) => v.id === selectedVector) || VECTOR_ITEMS[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：機能ベクトルの4大操作マトリクス（Vector Matrix）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            「バランスを整える」を技術へ昇華させる4つの力学方向
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          補（足す）× 瀉（除く）× 通（流す）× 調（降ろす）
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        鍼灸刺激は単なる「気持ちいい刺激」ではありません。
        <strong>「どの素材を（対象）」「どの方向へ（ベクトル）」「どの強度で（ドーゼ）」「どの時間軸で（頻度）」</strong>操作するかという厳密な力学入力です。4つの基本ベクトルを理解することで、再現性のある治療設計が可能になります。
      </p>

      {/* 4大ベクトル選択カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {VECTOR_ITEMS.map((item) => {
          const isSelected = item.id === selectedVector;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedVector(item.id)}
              className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? `${item.themeColor.bg} ${item.themeColor.border} border-2 shadow-sm scale-[1.02]`
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.themeColor.badge}`}>
                    {item.symbol}
                  </span>
                  {isSelected && <CheckCircle2 className={`w-4 h-4 ${item.themeColor.text}`} />}
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                  {item.name}
                </h5>
                <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block mt-0.5">
                  {item.en}
                </span>
              </div>
              <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] mt-3 leading-relaxed">
                {item.metaphor}
              </p>
            </button>
          );
        })}
      </div>

      {/* 選択ベクトルの詳細操作プロトコル */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
              OPERATIONAL PROTOCOL SPECIFICATION
            </span>
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              {current.name} の手技パラメータ ＆ 臨床適用
            </h5>
          </div>
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            対象病態：{current.targetMaterial}
          </span>
        </div>

        {/* 刺鍼・施灸・タイミングの3大技術 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
              【刺鍼手技（Needle Technique）】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {current.technique.needle}
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] block">
              【施灸手技（Moxibustion）】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {current.technique.moxa}
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[11px] font-bold text-[#0288D1] dark:text-[#38BDF8] block">
              【刺激時間・ドーゼ（Dose & Timing）】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {current.technique.timing}
            </p>
          </div>
        </div>

        {/* 代表穴 ＆ 誤治リスク警告 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
              代表的な経穴配当（Primary Acupoints）
            </span>
            <p className="font-bold text-[#232826] dark:text-[#FAF8F5]">
              {current.samplePoints}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFF3E0] dark:bg-[#2C1F15] border border-[#FFE0B2] dark:border-[#3D2817]">
            <span className="text-[10px] font-bold text-[#D32F2F] dark:text-[#EF5350] flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>誤治（ベクトル誤判定時）の重大リスク</span>
            </span>
            <p className="text-[#59615D] dark:text-[#E0D5C1] leading-relaxed">
              {current.dangerIfMistaken}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
