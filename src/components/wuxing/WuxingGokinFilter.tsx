"use client";

import React, { useState } from "react";
import { Sparkles, Ban, AlertOctagon, Utensils, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function WuxingGokinFilter() {
  const [selectedElement, setSelectedElement] = useState<string>("liver");

  const gokinData = [
    {
      id: "liver",
      element: "木",
      disease: "肝病（自律神経・眼精疲労・筋痙攣）",
      bannedFlavor: "辛味（しんみ：トウガラシ・スパイス・過度のネギ類）",
      bannedElement: "金（辛は金に属す）",
      mechanism: "金剋木（過剰制約）＆ 耗気傷血",
      reason: "辛味の強力な発散・発汗作用は、弱っている肝血（栄養と潤い）をさらに吹き飛ばして消耗させ、筋の引き攣りや目の乾燥、めまいを急激に悪化させます。",
      recommend: "酸味（ほのかなレモン・梅干し・黒酢）を適量用いて、肝気を収斂・滋養する。"
    },
    {
      id: "heart",
      element: "火",
      disease: "心病（動悸・不眠・不整脈・高血圧）",
      bannedFlavor: "鹹味（かんみ：過度の塩辛い味・塩分過多）",
      bannedElement: "水（鹹は水に属す）",
      mechanism: "水剋火（過剰冷却・血管負荷）",
      reason: "過剰な塩分は体液を血管内に引き留め血圧を急上昇させ、心臓のポンプ負荷を増大。また腎水が心火の陽気循環を冷え込ませて動悸を助長します。",
      recommend: "苦味（緑茶、ゴーヤ、春菊）を適度に摂り、上昇した心火の熱を冷ます。"
    },
    {
      id: "spleen",
      element: "土",
      disease: "脾病（胃もたれ・食欲不振・軟便・下痢）",
      bannedFlavor: "甘味（かんみ：白砂糖・菓子類・人工甘味料）",
      bannedElement: "土（同質過剰・湿邪生成）",
      mechanism: "同質過剰 ➜ 助湿停滞",
      reason: "「甘味は気を緩め、湿を生む」。弱った胃腸に白砂糖や濃厚な甘味を入れると、ネバネバした湿邪（余分な体液）が生じ、胃腸の動きを完全にストップさせます。",
      recommend: "甘味は「米・イモ・カボチャ」などの淡白な自然の甘みに留め、温かい汁物で運化を助ける。"
    },
    {
      id: "lung",
      element: "金",
      disease: "肺病（咳嗽・喘息・アレルギー鼻炎・皮膚炎）",
      bannedFlavor: "酸味（さんみ：過度に強い柑橘類・お酢）",
      bannedElement: "木（木侮金 ＆ 収斂過度）",
      mechanism: "木侮金 ＆ 肺気閉塞",
      reason: "酸味には強力な「収斂（引き締めて閉じ込める）」作用があります。咳や痰がある初期に強い酸味を摂ると、外へ追い出すべき邪気を体内に閉じ込めてしまい治癒を妨げます。",
      recommend: "辛味（大根、ショウガ、長ネギの白い部分）を軽く効かせて、肺気の宣発（発散・通気）を促す。"
    },
    {
      id: "kidney",
      element: "水",
      disease: "腎病（慢性腰痛・冷え・浮腫・頻尿）",
      bannedFlavor: "苦味（くみ：極端な苦味・冷涼苦寒薬）",
      bannedElement: "火（燥湿傷陰）",
      mechanism: "苦燥傷腎（陰液の枯渇）",
      reason: "苦味には「熱を下げ、湿気を乾かす（燥湿）」作用があります。これを腎虚の患者に摂りすぎると、腎が生命維持のために大切に温存している「精液・津液（潤い）」を干上がらせます。",
      recommend: "鹹味（海藻類、味噌、黒ごま）の自然なミネラルと温熱料理で、腎の陽気と陰液を底上げする。"
    }
  ];

  const active = gokinData.find((g) => g.id === selectedElement) || gokinData[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑦：食養生の安全装置「五禁」の相剋フィルター</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            弱った五臓に「入れてはいけない味」 ── 食養生のブレーキ機能
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          五行相剋による食事禁忌
        </span>
      </div>

      {/* 5大臓腑セレクター */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        {gokinData.map((g) => {
          const isSelected = selectedElement === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedElement(g.id)}
              className={`p-3 rounded-2xl text-center transition-all border ${
                isSelected
                  ? "bg-white dark:bg-[#1C2834] border-[#C62828] shadow-sm ring-2 ring-[#C62828]/20"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
                <span>{g.disease.split("（")[0]}</span>
              </div>
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                禁ず：{g.bannedFlavor.split("（")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 選択された臓の禁忌フィルター詳細 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4">
        {/* 警告バナー */}
        <div className="p-4 rounded-xl bg-[#FDECEC] dark:bg-[#2B1516] border-2 border-[#C62828]/50 flex items-start gap-3">
          <div className="p-1 rounded-full bg-[#C62828] text-white shrink-0 mt-0.5">
            <Ban className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#C62828] dark:text-[#EF5350] uppercase tracking-wider block">
              【進入禁止】{active.disease} に対する禁忌
            </span>
            <p className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
              🚫 {active.bannedFlavor} を厳禁とする
            </p>
            <span className="text-[10px] font-mono text-[#737C77] dark:text-[#8899A6]">
              理由の力学：{active.mechanism}（{active.bannedElement}）
            </span>
          </div>
        </div>

        {/* メカニズム詳細 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <span className="font-bold text-[#C62828] dark:text-[#EF5350] flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              <span>なぜ悪化するのか？（病理機序）</span>
            </span>
            <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {active.reason}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <span className="font-bold text-[#2E7D32] dark:text-[#81C784] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>代わりに何を摂るべきか？（推奨食養生）</span>
            </span>
            <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {active.recommend}
            </p>
          </div>
        </div>

        {/* 生数と成数の解説ミニボックス */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs text-[#59615D] dark:text-[#96A6B2]">
          <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
            💡 【生数と成数の成熟度モデル】
          </strong>
          生数（1:水、2:火、3:木、4:金、5:土）はエネルギーの胎動期（不足なら補益）。
          成数（6:水、7:火、8:木、9:金、10:土）は土（5）が加わって成熟した完成期（過剰なら清熱・瀉法）。
        </div>
      </div>
    </figure>
  );
}
