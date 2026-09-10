"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Wind,
  Droplet,
  Waves,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Flame,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface MaterialOperation {
  id: string;
  material: "気（Qi）" | "血（Blood）" | "水（Fluid）";
  state: string;
  actionName: string;
  en: string;
  color: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
  goal: string;
  needleDetail: string;
  moxaDetail: string;
  acupoints: string;
  precaution: string;
}

const MATERIAL_OPERATIONS: MaterialOperation[] = [
  {
    id: "qi-xu",
    material: "気（Qi）",
    state: "気虚（エネルギー不足・動力低下）",
    actionName: "補気（ほき）",
    en: "Tonify Qi",
    color: {
      bg: "bg-[#FFF8E1] dark:bg-[#2D2415]",
      border: "border-[#FFA000] dark:border-[#FFB300]",
      text: "text-[#B86924] dark:text-[#FFB300]",
      accent: "#FFA000",
    },
    goal: "中焦（脾胃）の後天の気・肺気の出力を底上げし、自律神経・体温の基礎推進力を回復する。",
    needleDetail:
      "細鍼（1番〜3番）を用い、経絡走行に沿って刺入（随刺）。時計回りに優しく微細に旋撚。抜鍼直後に術者の指腹で素早く穴を圧迫し、気の霧散を防ぐ（疾按）。",
    moxaDetail: "米粒大の透熱灸（3〜5壮）または台座灸。心地よい温感が深部に到達するまで施灸。",
    acupoints: "足三里、気海、関元、中脘、百会",
    precaution: "強刺激を入れると逆に気を消耗するため、痛覚を与えない極めてソフトな操作を徹底。",
  },
  {
    id: "qi-zhi",
    material: "気（Qi）",
    state: "気滞（気の鬱滞・機能的緊張）",
    actionName: "理気・疏気（りき・そき）",
    en: "Regulate & Disperse Qi",
    color: {
      bg: "bg-[#FFF8E1] dark:bg-[#2D2415]",
      border: "border-[#FFA000] dark:border-[#FFB300]",
      text: "text-[#B86924] dark:text-[#FFB300]",
      accent: "#FFA000",
    },
    goal: "交感神経の持続的緊張を解除し、横隔膜や平滑筋の攣縮を解いて気の循環を再開させる。",
    needleDetail:
      "やや太めの鍼（3番〜5番）を用い、反時計回りに弾力を持って旋撚。軽度の得気（響き）を誘導した後に速刺速抜、または短時間の置鍼。抜鍼後は穴を塞がない（不按）。",
    moxaDetail: "原則施灸は不要。局所の冷えを伴う場合のみ温筒灸で軽度に巡らす。",
    acupoints: "太衝、期門、内関、膻中、支溝",
    precaution: "気滞患者に補気剤や温補灸を行うと、内圧がさらに高まり頭痛・胸部膨満が悪化する。",
  },
  {
    id: "qi-ni",
    material: "気（Qi）",
    state: "気逆（気の異常上逆・のぼせ）",
    actionName: "降気・引火帰元（こうき）",
    en: "Descend Qi",
    color: {
      bg: "bg-[#FFF8E1] dark:bg-[#2D2415]",
      border: "border-[#FFA000] dark:border-[#FFB300]",
      text: "text-[#B86924] dark:text-[#FFB300]",
      accent: "#FFA000",
    },
    goal: "頭部・胸部へ異常に突き上げた気血を足元へ引き下ろし、脳虚血および上実下虚を正す。",
    needleDetail:
      "頭部・頸部はごく浅い散鍼（接触鍼）のみ。下肢・足底の遠隔穴を深く取穴し、呼気に合わせて深く静置して気を下方へ誘導。",
    moxaDetail: "足底の湧泉穴に多壮灸（7〜15壮）を据え、強烈な温熱刺激で頭部の熱を下へ誘引する。",
    acupoints: "湧泉、太衝、照海、足三里、内関",
    precaution: "上逆している時に頭頂（百会）や肩井を強刺激すると、さらに気逆を煽り嘔吐や血圧上昇を起こす。",
  },
  {
    id: "xue-xu",
    material: "血（Blood）",
    state: "血虚（栄養物質・液体の枯渇）",
    actionName: "補血・養血（ほけつ・ようけつ）",
    en: "Nourish Blood",
    color: {
      bg: "bg-[#FFEBEE] dark:bg-[#2D1618]",
      border: "border-[#D32F2F] dark:border-[#EF5350]",
      text: "text-[#D32F2F] dark:text-[#EF5350]",
      accent: "#D32F2F",
    },
    goal: "筋膜・皮膚・中枢神経を潤す材料を補い、造血機能と血管内皮の栄養状態を向上させる。",
    needleDetail:
      "細鍼で浅く刺入し、気至（鍼先の微細な手応え）を得たら動かさず10〜15分ほど静かに置鍼。",
    moxaDetail: "脾兪・膈兪・三陰交への温灸。温熱によって脾の運化（消化吸収）と造血を促進。",
    acupoints: "三陰交、膈兪、血海、脾兪、足三里",
    precaution: "血虚単独のことは稀で、必ず気虚を伴う。「気は血の帥」であるため、補気とセットで処方する。",
  },
  {
    id: "xue-yu",
    material: "血（Blood）",
    state: "瘀血（微小循環不全・血行凝滞）",
    actionName: "活血・化瘀（かっけつ・かお）",
    en: "Invigorate Blood Circulation",
    color: {
      bg: "bg-[#FFEBEE] dark:bg-[#2D1618]",
      border: "border-[#D32F2F] dark:border-[#EF5350]",
      text: "text-[#D32F2F] dark:text-[#EF5350]",
      accent: "#D32F2F",
    },
    goal: "微小血管・毛細血管網の目詰まり（微小血栓・組織うっ血）を解除し、組織の灌流を再開させる。",
    needleDetail:
      "患部周囲の阿是穴への刺入、雀啄術。青く浮き出た皮下細絡（孫絡）に対する三稜鍼を用いた「微小刺絡（瀉血）」。",
    moxaDetail: "冷えによる血行障害（寒凝血瘀）に対しては温針灸で凝固を溶かす。",
    acupoints: "三陰交、血海、次髎、委中（刺絡）、膈兪",
    precaution: "重度の貧血や易出血性（抗凝固薬服用中）の患者には刺絡・過剰な瀉法を厳禁とする。",
  },
  {
    id: "shui-zhi",
    material: "水（Fluid）",
    state: "水滞・痰湿（組織液の停滞・余剰水分）",
    actionName: "利水・化湿（りすい・かしつ）",
    en: "Promote Diuresis & Resolve Dampness",
    color: {
      bg: "bg-[#E0F2FE] dark:bg-[#0C2436]",
      border: "border-[#0288D1] dark:border-[#38BDF8]",
      text: "text-[#0288D1] dark:text-[#38BDF8]",
      accent: "#0288D1",
    },
    goal: "三焦の水分代謝ネットワーク（肺・脾・腎）を再同期し、間質液の循環を促進してむくみを解消。",
    needleDetail:
      "脾経・腎経の合穴・原穴にやや深めに刺入。組織の間質圧を解放し、リンパ・静脈環流を誘導。",
    moxaDetail: "温熱による「気化作用（余剰な水分を熱エネルギーで蒸散・排泄させる）」が最も得意。水分穴・関元・陰陵泉への施灸。",
    acupoints: "陰陵泉、水分、復溜、脾兪、三陰交",
    precaution: "水滞（老廃物のゴミ溜め）がある状態で栄養価の高い補剤（甘味・滋陰薬）を投与すると痰湿が悪化する。",
  },
];

export default function TreatmentQiBloodManual() {
  const [expandedId, setExpandedId] = useState<string>("qi-xu");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "気（Qi）" | "血（Blood）" | "水（Fluid）">("ALL");

  const filtered = activeFilter === "ALL"
    ? MATERIAL_OPERATIONS
    : MATERIAL_OPERATIONS.filter((o) => o.material === activeFilter);

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：気血水の手技・入力マニュアル（Material Engineering）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            素材（気・血・水）の運動異常に応じた鍼灸物理コントロール
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          アコーディオン展開で手技パラメータを表示
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        気血水は「生命を駆動させる実体素材」です。素材ごとに最適な物理刺激のパラメータ（刺入速度・深度・旋撚方向・抜鍼時の圧迫有無・温熱エネルギーの要否）が完全に異なります。
        <strong>「まず通し、然る後に補う」</strong>という連鎖の鉄則を守ることで、治療効果を最大化します。
      </p>

      {/* フィルタータブ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["ALL", "気（Qi）", "血（Blood）", "水（Fluid）"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === filter
                ? "bg-[#1E3D34] text-white shadow-xs"
                : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border border-[#E8E1D1] dark:border-[#22303D]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* アコーディオン・カードリスト */}
      <div className="space-y-3 mb-6">
        {filtered.map((op) => {
          const isExpanded = expandedId === op.id;
          return (
            <div
              key={op.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? "bg-white dark:bg-[#17212A] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-90 hover:opacity-100"
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? "" : op.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${op.color.bg} ${op.color.text}`}>
                    {op.material}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                    {op.state}
                  </span>
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    ➜ {op.actionName}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] hidden sm:inline">
                    {op.en}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  )}
                </div>
              </button>

              {/* 開いた際の手技プロトコル */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                    <strong className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
                      THERAPEUTIC GOAL（介入の狙い）
                    </strong>
                    <p className="text-[#232826] dark:text-[#FAF8F5] font-medium leading-relaxed">
                      {op.goal}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                      <strong className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                        【刺鍼手技パラメータ】
                      </strong>
                      <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                        {op.needleDetail}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                      <strong className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] block">
                        【施灸・熱量コントロール】
                      </strong>
                      <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                        {op.moxaDetail}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block">
                        代表経穴配穴
                      </span>
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                        {op.acupoints}
                      </span>
                    </div>
                    <div className="text-right sm:max-w-md">
                      <span className="text-[10px] font-bold text-[#D32F2F] dark:text-[#EF5350] block">
                        ⚠️ 臨床禁忌・注意点
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#E0D5C1]">
                        {op.precaution}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 連鎖の鉄則ボックス */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF3E0] dark:bg-[#2C1F15] border-2 border-[#FFA000] dark:border-[#FFB300]/80">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#B86924] dark:text-[#FFA000] shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs">
            <strong className="text-sm font-bold text-[#B86924] dark:text-[#FFA000] block">
              素材操作における連鎖の鉄則：『まず通し、然る後に補う』
            </strong>
            <p className="text-[#59615D] dark:text-[#E0D5C1] leading-relaxed">
              水滞（ゴミ溜め）に補血（栄養投入）を行ってはならない（老廃物が増殖する）。気滞（渋滞）に補気（エネルギー注入）を行ってはならない（渋滞が激化し破裂する）。
              <strong>必ず「渋滞（気滞・水滞・瘀血）を解通」してから、しかる後に不足したエネルギーや血液を補給する</strong>のが生体工学的な絶対原則です。
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
