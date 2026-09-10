"use client";

import React, { useState } from "react";
import { Sparkles, Eye, Volume2, Activity, User, HeartPulse } from "lucide-react";

type FacePart = "forehead" | "leftCheek" | "nose" | "rightCheek" | "chin";

export default function WuxingShishinDashboard() {
  const [selectedPart, setSelectedPart] = useState<FacePart>("nose");

  const partsData = {
    forehead: {
      element: "火",
      zang: "心（火）",
      area: "額（ひたい）",
      colorName: "赤（紅潮・熱感）",
      colorCode: "#C62828",
      colorBg: "bg-[#C62828] text-white",
      on: "徴音（ソ） ／ 笑（過度に笑う・けたたましい）",
      byo: "噫（あつ：げっぷ・呑酸・心火の上逆）",
      do: "憂（精神の不安定・胸騒ぎ・動悸）",
      clinical: "額の赤みや吹き出物は、心火の上炎・大脳興奮・睡眠不足・血熱のサイン。"
    },
    leftCheek: {
      element: "木",
      zang: "肝（木）",
      area: "左頬（ひだりほほ）",
      colorName: "青（青白・くすみ・暗緑）",
      colorCode: "#2E7D32",
      colorBg: "bg-[#2E7D32] text-white",
      on: "角音（ミ） ／ 呼（大声で叫ぶ・怒鳴り声）",
      byo: "語（言葉が止まらない多弁・言動錯乱）",
      do: "握（手のこわばり・筋の痙攣・爪の食い込み）",
      clinical: "左頬の青みやシミは、肝気鬱結・瘀血・ストレス・自律神経緊張の現れ。"
    },
    nose: {
      element: "土",
      zang: "脾（土）",
      area: "鼻（はな・鼻頭）",
      colorName: "黄（黄色っぽい・萎黄・くすみ）",
      colorCode: "#F57F17",
      colorBg: "bg-[#F57F17] text-white",
      on: "宮音（ド） ／ 歌（単調に歌うような独り言・鼻歌）",
      byo: "呑（つかえ感・嚥下障害・呑気症）",
      do: "噦（えつ：しゃっくり・胃気の逆上・嘔吐）",
      clinical: "鼻頭の黄色みやテカリ・赤みは、胃熱・脾虚・水分代謝不全（湿邪停滞）の証候。"
    },
    rightCheek: {
      element: "金",
      zang: "肺（金）",
      area: "右頬（みぎほほ）",
      colorName: "白（蒼白・粉を吹いたような白さ）",
      colorCode: "#78909C",
      colorBg: "bg-[#78909C] text-white",
      on: "商音（レ） ／ 哭（悲しげな泣き声・すすり泣き）",
      byo: "咳（激しい咳嗽・息切れ・呼吸浅小）",
      do: "咳（突発的な咳き込み・皮膚の鳥肌）",
      clinical: "右頬の白さや乾燥・カサつきは、肺気虚・宗気不足・免疫バリア低下のシグナル。"
    },
    chin: {
      element: "水",
      zang: "腎（水）",
      area: "顎（あご・口周り）",
      colorName: "黒（浅黒い・目の下の隈・土色）",
      colorCode: "#1A237E",
      colorBg: "bg-[#1A237E] text-white",
      on: "羽音（ラ） ／ 呻（重苦しいうめき声）",
      byo: "欠（頻繁なあくび・脱力感）",
      do: "慄（りつ：寒戦・膝や足腰のガクガク震え）",
      clinical: "顎や口周りの黒ずみ・吹き出物は、腎精不足・下半身の冷え・生殖器・ホルモン失調。"
    }
  };

  const current = partsData[selectedPart];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：四診統合ダッシュボード</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            顔面五臓配当マップと五色・五音・五病・五動の逆算判定
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          顔の部位をクリックしてサインをスキャン
        </span>
      </div>

      {/* ダッシュボードレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8">
        {/* 左側：顔面配当イラストSVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-[4/5] bg-white dark:bg-[#1A2530] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 shadow-sm">
            <svg viewBox="0 0 200 240" className="w-full h-full">
              {/* 顔の輪郭 */}
              <path
                d="M 50 80 Q 50 30 100 30 Q 150 30 150 80 L 145 160 Q 100 220 55 160 Z"
                fill="#FAF8F5"
                stroke="#232826"
                strokeWidth="2"
                className="dark:fill-[#121920] dark:stroke-[#FAF8F5]"
              />

              {/* 髪型ライン */}
              <path d="M 45 65 Q 100 15 155 65" fill="none" stroke="#232826" strokeWidth="2.5" className="dark:stroke-[#FAF8F5]" />

              {/* 目・鼻・口の目安 */}
              {/* 左目 */}
              <ellipse cx="75" cy="100" rx="10" ry="4" fill="none" stroke="#232826" strokeWidth="1.5" className="dark:stroke-[#FAF8F5]" />
              {/* 右目 */}
              <ellipse cx="125" cy="100" rx="10" ry="4" fill="none" stroke="#232826" strokeWidth="1.5" className="dark:stroke-[#FAF8F5]" />
              {/* 口 */}
              <path d="M 85 165 Q 100 172 115 165" fill="none" stroke="#232826" strokeWidth="1.5" className="dark:stroke-[#FAF8F5]" />

              {/* クリック可能な5つの五臓配当ゾーン */}
              {/* 1. 額（心・火・赤） */}
              <g className="cursor-pointer" onClick={() => setSelectedPart("forehead")}>
                <rect
                  x="70"
                  y="40"
                  width="60"
                  height="30"
                  rx="6"
                  fill="#C62828"
                  opacity={selectedPart === "forehead" ? "0.85" : "0.3"}
                />
                <text x="100" y="60" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">心（額）</text>
              </g>

              {/* 2. 左頬（肝・木・青）※鏡像ではなく患者目線：向かって右が患者の左頬 */}
              <g className="cursor-pointer" onClick={() => setSelectedPart("leftCheek")}>
                <ellipse
                  cx="135"
                  cy="130"
                  rx="16"
                  ry="20"
                  fill="#2E7D32"
                  opacity={selectedPart === "leftCheek" ? "0.85" : "0.3"}
                />
                <text x="135" y="134" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold">肝（左頬）</text>
              </g>

              {/* 3. 鼻（脾・土・黄） */}
              <g className="cursor-pointer" onClick={() => setSelectedPart("nose")}>
                <ellipse
                  cx="100"
                  cy="130"
                  rx="14"
                  ry="18"
                  fill="#F57F17"
                  opacity={selectedPart === "nose" ? "0.85" : "0.3"}
                />
                <text x="100" y="134" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">脾（鼻）</text>
              </g>

              {/* 4. 右頬（肺・金・白）※向かって左が患者の右頬 */}
              <g className="cursor-pointer" onClick={() => setSelectedPart("rightCheek")}>
                <ellipse
                  cx="65"
                  cy="130"
                  rx="16"
                  ry="20"
                  fill="#78909C"
                  opacity={selectedPart === "rightCheek" ? "0.85" : "0.3"}
                />
                <text x="65" y="134" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold">肺（右頬）</text>
              </g>

              {/* 5. 顎（腎・水・黒） */}
              <g className="cursor-pointer" onClick={() => setSelectedPart("chin")}>
                <rect
                  x="75"
                  y="180"
                  width="50"
                  height="25"
                  rx="6"
                  fill="#1A237E"
                  opacity={selectedPart === "chin" ? "0.85" : "0.3"}
                />
                <text x="100" y="196" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">腎（顎）</text>
              </g>
            </svg>
            <p className="mt-1 text-[10px] text-[#737C77] dark:text-[#8899A6] text-center font-mono">
              ※ 患者から見た左右（向かって右＝左頬）
            </p>
          </div>
        </div>

        {/* 右側：選択部位のダッシュボード詳細 */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${current.colorBg}`}>
                {current.element}行：{current.zang}
              </span>
              <span className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                顔面配当：{current.area}
              </span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A]" style={{ color: current.colorCode }}>
              {current.colorName}
            </span>
          </div>

          {/* 臨床示唆ボックス */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 shadow-xs" style={{ borderLeftColor: current.colorCode }}>
            <span className="text-[11px] font-bold text-[#232826] dark:text-[#FAF8F5] block mb-1">
              【望診の臨床的サイン】
            </span>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {current.clinical}
            </p>
          </div>

          {/* 四診項目ダッシュボード */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            {/* 五音・五声 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
              <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase block">
                聞診：五音・五声
              </span>
              <p className="text-[11px] font-semibold text-[#232826] dark:text-[#FAF8F5]">
                {current.on}
              </p>
            </div>

            {/* 五病 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
              <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] uppercase block">
                症状：五病（気逆）
              </span>
              <p className="text-[11px] font-semibold text-[#232826] dark:text-[#FAF8F5]">
                {current.byo}
              </p>
            </div>

            {/* 五動 */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
              <span className="text-[10px] font-bold text-[#C62828] dark:text-[#EF5350] uppercase block">
                身体動作：五動
              </span>
              <p className="text-[11px] font-semibold text-[#232826] dark:text-[#FAF8F5]">
                {current.do}
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
