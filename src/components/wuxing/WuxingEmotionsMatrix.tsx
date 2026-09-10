"use client";

import React, { useState } from "react";
import { Sparkles, ArrowUp, ArrowDown, Expand, Shrink, Lock, RotateCcw, HeartHandshake } from "lucide-react";

export default function WuxingEmotionsMatrix() {
  const [selectedEmotion, setSelectedEmotion] = useState<string>("anger");

  const emotions = [
    {
      id: "anger",
      element: "木",
      color: "#2E7D32",
      badgeColor: "bg-[#2E7D32] text-white",
      kanji: "怒",
      name: "怒（ど）｜ 上昇・発散の気",
      shen: "魂（こん：潜在意識・直感）",
      zang: "肝（木）",
      vector: "気上（気が一気に頭頂へ突き上がる）",
      icon: <ArrowUp className="w-5 h-5 text-[#2E7D32]" />,
      normal: "決断力、現状を打破する推進力、行動力",
      excess: "激しいイライラ、怒声、側頭痛、目の充血、高血圧、卒中リスク",
      cure: "【悲・憂（金）で制す】（金剋木）",
      cureDesc: "怒りで我を忘れたときは、現実の厳しさや失うものの悲しみを冷静に直視（悲勝怒）することで頭の血を下げる。"
    },
    {
      id: "joy",
      element: "火",
      color: "#C62828",
      badgeColor: "bg-[#C62828] text-white",
      kanji: "喜",
      name: "喜（き）｜ 弛緩・拡散の気",
      shen: "神（しん：意識・思考・精神統括）",
      zang: "心（火）",
      vector: "気緩（気が緩み四方へ拡散する）",
      icon: <Expand className="w-5 h-5 text-[#C62828]" />,
      normal: "親和性、コミュニケーション、血流の温和な循環、笑顔",
      excess: "気が緩みすぎて散乱。集中力欠如、躁状態、動悸、不眠、多夢",
      cure: "【恐・驚（水）で制す】（水剋火）",
      cureDesc: "浮かれて気が緩みすぎたときは、リスクへの健全な畏怖やルールへの緊張感（恐勝喜）で心を引き締める。"
    },
    {
      id: "worry",
      element: "土",
      color: "#F57F17",
      badgeColor: "bg-[#F57F17] text-white",
      kanji: "思",
      name: "思（し）｜ 集中・凝結の気",
      shen: "意（い：記憶・思考・情報統合）",
      zang: "脾（土）",
      vector: "気結（気がみぞおちに滞り固まる）",
      icon: <Lock className="w-5 h-5 text-[#F57F17]" />,
      normal: "深い熟慮、論理的分析、学習能力、記憶の定着",
      excess: "思い悩み、取り越し苦労、胃痛、食欲不振、胃もたれ、不眠",
      cure: "【怒（木）で制す】（木剋土）",
      cureDesc: "クヨクヨ同じことを考え続ける堂々巡りは、思い切って決断し怒りのエネルギーで現状を打破（怒勝思）する。"
    },
    {
      id: "grief",
      element: "金",
      color: "#78909C",
      badgeColor: "bg-[#78909C] text-white",
      kanji: "憂",
      name: "憂・悲（ゆう・ひ）｜ 収斂・内向の気",
      shen: "魄（はく：本能・触覚・身体感覚）",
      zang: "肺（金）",
      vector: "気消（気が内側に縮こまり消耗・枯渇する）",
      icon: <Shrink className="w-5 h-5 text-[#78909C]" />,
      normal: "危機への慎重さ、他者の痛みに共感する慈悲深さ",
      excess: "エネルギーの枯渇、声が出ない、呼吸が浅小、抑うつ、免疫低下",
      cure: "【喜（火）で制す】（火剋金）",
      cureDesc: "深い悲嘆や憂鬱で呼吸が沈んだときは、ユーモア、温かい団欒、楽しい音楽（喜勝憂）で心の冷えた気を温め散らす。"
    },
    {
      id: "fear",
      element: "水",
      color: "#1A237E",
      badgeColor: "bg-[#1A237E] text-white",
      kanji: "恐",
      name: "恐・驚（きょう・けい）｜ 下降・沈降の気",
      shen: "志（し：不屈の意志・生命の記憶）",
      zang: "腎（水）",
      vector: "気下（気が下半身・下へと脱落する）",
      icon: <ArrowDown className="w-5 h-5 text-[#1A237E]" />,
      normal: "危険を回避する自己防衛本能、慎み深さ",
      excess: "腰が抜ける、失禁、パニック発作、足腰の重だるい脱力、慢性疲労",
      cure: "【思（土）で制す】（土剋水）",
      cureDesc: "漠然とした不安や恐怖・パニックに襲われたときは、事実を紙に書き出し冷静に論理的分析（思勝恐）して認知を正す。"
    }
  ];

  const active = emotions.find((e) => e.id === selectedEmotion) || emotions[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：感情の昇降出入・情志相勝マトリクス（Emotions & Mental Dynamics）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            感情は気の「運動ベクトル」 ── 相剋で心を調律する情志相勝法
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          五神（精神）× 五志（感情）の力学
        </span>
      </div>

      {/* 5大感情アイコンボタン */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-6">
        {emotions.map((e) => {
          const isSelected = selectedEmotion === e.id;
          return (
            <button
              key={e.id}
              onClick={() => setSelectedEmotion(e.id)}
              className={`p-3 rounded-2xl text-center transition-all flex flex-col items-center justify-center border ${
                isSelected
                  ? "bg-white dark:bg-[#1C2834] shadow-md ring-2 ring-offset-1"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] hover:bg-white"
              }`}
              style={{
                borderColor: isSelected ? e.color : undefined
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white font-serif font-bold text-lg shadow-xs"
                style={{ backgroundColor: e.color }}
              >
                {e.kanji}
              </div>
              <span className="font-serif font-bold text-xs text-[#232826] dark:text-[#FAF8F5]">
                {e.name.split("｜")[0]}
              </span>
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] hidden sm:block">
                {e.zang.split("（")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 選択された感情の運動ベクトルと相剋リセット法 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs">
              {active.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${active.badgeColor}`}>
                  {active.element}行
                </span>
                <h5 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  {active.name}
                </h5>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                対応する臓と神：<strong>{active.zang}</strong> ／ <strong>{active.shen}</strong>
              </p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs font-mono text-[#1E3D34] dark:text-[#74BA9E] self-start sm:self-auto">
            気のベクトル：{active.vector}
          </div>
        </div>

        {/* 生理と病理の対比 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
              【適度な場合：生命力】
            </span>
            <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {active.normal}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
            <span className="font-bold text-[#C62828] dark:text-[#EF5350] block mb-1">
              【過剰・暴走した場合：病理】
            </span>
            <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {active.excess}
            </p>
          </div>
        </div>

        {/* 相剋リセット法（情志相勝） */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/40 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            <HeartHandshake className="w-4 h-4 text-[#B86924]" />
            <span>古代の心理認知療法：情志相勝（じょうしそうしょう）によるリセット</span>
          </div>
          <p className="font-serif font-bold text-sm text-[#B86924] dark:text-[#E6C387]">
            {active.cure}
          </p>
          <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            {active.cureDesc}
          </p>
        </div>
      </div>
    </figure>
  );
}
