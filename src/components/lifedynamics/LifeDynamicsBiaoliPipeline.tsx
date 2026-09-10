"use client";

import React, { useState } from "react";
import { Sparkles, ArrowLeftRight, CheckCircle2, ChevronRight, Activity, Zap } from "lucide-react";

interface Pair {
  id: string;
  yin: string;
  yang: string;
  yinRole: string;
  yangRole: string;
  themeColor: string;
  bgLight: string;
  darkBg: string;
  relationTitle: string;
  clinicalPipeline: string;
  exampleClinical: {
    symptom: string;
    action: string;
    meridianPair: string;
  };
}

const PAIRS: Pair[] = [
  {
    id: "lung-large-intestine",
    yin: "肺（はい・陰臓）",
    yang: "大腸（だいちょう・陽腑）",
    yinRole: "気の宣発・粛降と呼吸",
    yangRole: "水分の吸収と便の伝導排泄",
    themeColor: "#546E7A",
    bgLight: "bg-[#ECEFF1] text-[#37474F] border-[#B0BEC5]",
    darkBg: "dark:bg-[#263238]/30 dark:text-[#CFD8DC]",
    relationTitle: "呼吸と排泄の同調パイプライン",
    clinicalPipeline: "肺の「粛降（気を下へ降ろす力）」が大腸の蠕動運動を上から押し進めます。肺が乾燥すると便秘になり、腸が詰まると肺の気が昇降できず喘息や咳が悪化します。",
    exampleClinical: {
      symptom: "頑固な便秘や喘息発作の連動",
      action: "「咳や喉の痛みに合谷（大腸経）」「頑固な便秘に列欠（肺経）」",
      meridianPair: "手太陰肺経 ⇄ 手陽明大腸経",
    },
  },
  {
    id: "heart-small-intestine",
    yin: "心（しん・陰臓）",
    yang: "小腸（しょうちょう・陽腑）",
    yinRole: "血脈の拍出と精神（神）の統括",
    yangRole: "飲食物の受盛化物と清濁泌別",
    themeColor: "#D32F2F",
    bgLight: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]",
    darkBg: "dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A]",
    relationTitle: "精神と清濁選別の循環パイプライン",
    clinicalPipeline: "激しいストレスや不眠で心に火（心火）が燃え盛ると、その熱が表裏関係にある小腸へと流れ込み、尿道灼熱痛や口内炎、血尿を引き起こします（心熱移小腸）。",
    exampleClinical: {
      symptom: "ストレス性口内炎・排尿痛（残尿感）",
      action: "心火を冷ます「神門（心経）」と「後渓（小腸経）」の連動配穴",
      meridianPair: "手少陰心経 ⇄ 手太陽小腸経",
    },
  },
  {
    id: "liver-gallbladder",
    yin: "肝（かん・陰臓）",
    yang: "胆（たん・陽腑）",
    yinRole: "気の疎泄と血の貯蔵",
    yangRole: "胆汁の貯蔵排泄と決断・勇気",
    themeColor: "#2E7D32",
    bgLight: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]",
    darkBg: "dark:bg-[#1B5E20]/20 dark:text-[#A5D6A7]",
    relationTitle: "気の巡りと決断力の直結パイプライン",
    clinicalPipeline: "肝の気の巡り（疎泄）が円滑であって初めて胆汁がスムーズに十二指腸へ分泌されます。肝気が鬱滞すると胆の機能も狂い、「優柔不断」「夜間にビクビクして眠れない」といった胆怯が生じます。",
    exampleClinical: {
      symptom: "優柔不断・偏頭痛・ため息・脇腹の張り",
      action: "肝気を解放する「太衝（肝経）」と決断を促す「陽陵泉（胆経）」",
      meridianPair: "足厥陰肝経 ⇄ 足少陽胆経",
    },
  },
  {
    id: "spleen-stomach",
    yin: "脾（ひ・陰臓）",
    yang: "胃（い・陽腑）",
    yinRole: "運化（精微抽出）と昇清（上へ運ぶ）",
    yangRole: "受納腐熟（分解）と降濁（下へ送る）",
    themeColor: "#FFA000",
    bgLight: "bg-[#FFF8E1] text-[#E65100] border-[#FFE082]",
    darkBg: "dark:bg-[#FFA000]/20 dark:text-[#FFE082]",
    relationTitle: "昇清・降濁の消化共同戦線",
    clinicalPipeline: "胃は「降ろす（降濁）」性質を持ち、脾は「持ち上げる（昇清）」性質を持ちます。この二つの逆方向の力が中焦で歯車のように噛み合うことで、飲食物の消化と栄養の全身散布が成立します。",
    exampleClinical: {
      symptom: "胃もたれ・吐き気・食後強い眠気・泥状便",
      action: "脾を補う「足三里（胃経）」と清気を昇らせる「太白（脾経）」",
      meridianPair: "足太陰脾経 ⇄ 足陽明胃経",
    },
  },
  {
    id: "kidney-bladder",
    yin: "腎（じん・陰臓）",
    yang: "膀胱（ぼうこう・陽腑）",
    yinRole: "先天の精を蔵し、水液を司る",
    yangRole: "尿の貯蔵と排泄の開閉制御",
    themeColor: "#0288D1",
    bgLight: "bg-[#E1F5FE] text-[#0277BD] border-[#B3E5FC]",
    darkBg: "dark:bg-[#0288D1]/20 dark:text-[#81D4FA]",
    relationTitle: "水液代謝と気化開閉の生命インフラ",
    clinicalPipeline: "膀胱が尿を貯めて正しく排出できるのは、腎の温める力（腎陽）による「気化作用」の後押しがあるからです。腎が冷えると膀胱の蛇口が緩み、頻尿・失禁・夜間尿となります。",
    exampleClinical: {
      symptom: "夜間頻尿・足腰の冷え・下肢浮腫",
      action: "腎陽を焚きつける「太渓（腎経）」と排尿を整える「委中・申脈（膀胱経）」",
      meridianPair: "足少陰腎経 ⇄ 足太陽膀胱経",
    },
  },
  {
    id: "pericardium-sanjiao",
    yin: "心包（しんぽう・陰臓）",
    yang: "三焦（さんしょう・陽腑）",
    yinRole: "心の護衛・感情のクッション",
    yangRole: "全身の水液水道・気化ネットワーク",
    themeColor: "#7B1FA2",
    bgLight: "bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]",
    darkBg: "dark:bg-[#7B1FA2]/20 dark:text-[#CE93D8]",
    relationTitle: "心身防御と全身空間統治のパイプライン",
    clinicalPipeline: "心包は心（君主）を外邪や激しい精神的ショックから守る防波堤。三焦はその心包の命を受け、全身の体液ハイウェイ（気と水）を開通させます。動悸と全身の重だるさが同時に消える関係性です。",
    exampleClinical: {
      symptom: "動悸・自律神経パニック・車酔い・胸のつかえ",
      action: "胸部を開く「内関（心包経）」と空間を通気させる「外関（三焦経）」の八脈交会穴ペア",
      meridianPair: "手厥陰心包経 ⇄ 手少陽三焦経",
    },
  },
];

export default function LifeDynamicsBiaoliPipeline() {
  const [selectedPairId, setSelectedPairId] = useState<string>("lung-large-intestine");
  const currentPair = PAIRS.find((p) => p.id === selectedPairId)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：臓腑表裏の6大ペア・パイプラインカード</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰の「蔵（貯蔵）」と陽の「写（流動）」── 内外を直結する6本の機能ライン
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          ペアを選択して臨床作用線を確認
        </span>
      </div>

      {/* 6ペアのセレクターピル */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {PAIRS.map((pair) => {
          const isSelected = selectedPairId === pair.id;
          return (
            <button
              key={pair.id}
              onClick={() => setSelectedPairId(pair.id)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#121920] shadow-sm border-2 ring-1 scale-[1.02]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? pair.themeColor : undefined,
              }}
            >
              <div className="text-[10px] font-bold text-[#8C9691] dark:text-[#64748B] mb-0.5">
                表裏ペア
              </div>
              <div className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5]">
                {pair.yin.split("（")[0]} ⇄ {pair.yang.split("（")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択されたペアのパイプライン詳細カード */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7">
        {/* パイプライン対向ビジュアル */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
          {/* 陰の臓（内側・貯蔵） */}
          <div className="w-full md:w-5/12 p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                陰の臓（蔵して写さず）
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: currentPair.themeColor }}>
                深部統括
              </span>
            </div>
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5] mt-1">
              {currentPair.yin}
            </h5>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-1">
              {currentPair.yinRole}
            </p>
          </div>

          {/* 双方向接続パイプライン */}
          <div className="flex flex-col items-center justify-center shrink-0 my-2 md:my-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: currentPair.themeColor }}
            >
              <ArrowLeftRight className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-[10px] font-bold text-[#8C9691] dark:text-[#64748B] mt-1">
              経絡表裏連動
            </span>
          </div>

          {/* 陽の腑（外側・流動排泄） */}
          <div className="w-full md:w-5/12 p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B86924] text-white">
                陽の腑（写して蔵さず）
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: currentPair.themeColor }}>
                流動排泄
              </span>
            </div>
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5] mt-1">
              {currentPair.yang}
            </h5>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-1">
              {currentPair.yangRole}
            </p>
          </div>
        </div>

        {/* 連係メカニズム解説 */}
        <div className="mb-5">
          <h5 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mb-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>連携メカニズム：{currentPair.relationTitle}</span>
          </h5>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#D1D5DB] leading-relaxed">
            {currentPair.clinicalPipeline}
          </p>
        </div>

        {/* 臨床応用カード */}
        <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div className="flex items-center gap-1.5 font-bold text-xs text-[#B86924] dark:text-[#E6C387] mb-2">
            <Zap className="w-4 h-4" />
            <span>臨床での表裏活用（遠隔配穴の妙技）</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#8C9691] dark:text-[#64748B] block text-[11px]">
                狙う症状・病態：
              </span>
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                {currentPair.exampleClinical.symptom}
              </span>
            </div>
            <div>
              <span className="text-[#8C9691] dark:text-[#64748B] block text-[11px]">
                表裏ツボの処方例：
              </span>
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                {currentPair.exampleClinical.action}
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] text-[11px] text-[#59615D] dark:text-[#96A6B2]">
            走行ルート：{currentPair.exampleClinical.meridianPair}（内外を繋ぐ回線）
          </div>
        </div>
      </div>
    </figure>
  );
}
