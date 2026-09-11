"use client";

import React, { useState } from "react";
import { Sparkles, Sun, Snowflake, Leaf, Wind, Utensils, Compass } from "lucide-react";

type SeasonId = "spring" | "summer" | "autumn" | "winter";

export default function YinYangSeasonsCalendar() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonId>("spring");

  const seasonsData = {
    spring: {
      name: "春（木・発陳）",
      yangWave: "陽気の立ち上がり（少陽）",
      waveLevel: "35% ➜ 70% 急上昇",
      color: "text-[#1E3D34] dark:text-[#74BA9E]",
      badgeBg: "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]",
      icon: <Leaf className="w-5 h-5 text-[#2E7D32]" />,
      summary: "冬に潜んでいた万物が芽吹き、陽気が上へ外へと伸びやかに立ち上がる季節。",
      habit: "「夜臥早起、広歩於庭」── 少し夜更かししても朝は早起きし、ゆったりと庭や公園を散歩。髪をほどいて体を締め付けず、心をのびのびと解放する。",
      diet: "菜の花、ふきのとう、春菊、せりなどの「ほのかな苦味と香り」で上昇しすぎた熱を逃がし、肝の疏泄（気の巡り）を促進する。",
      caution: "春は「肝気」が高ぶりやすく、イライラ・目の充血・偏頭痛・花粉症が好発。怒りを溜め込まず気を巡らせる。"
    },
    summer: {
      name: "夏（火・蕃秀）",
      yangWave: "陽気の極大・ピーク（太陽）",
      waveLevel: "100%（極陽）",
      color: "text-[#C45A4A] dark:text-[#F87171]",
      badgeBg: "bg-[#FCF4EB] dark:bg-[#2C1814] text-[#C45A4A] dark:text-[#F87171]",
      icon: <Sun className="w-5 h-5 text-[#C45A4A]" />,
      summary: "天地の陽気が最高潮に達し、草木が生い茂り花開く、一年で最も活力に満ちた季節。",
      habit: "「夜臥早起、無厭於日」── 日光を恐れず適度に活動。日中に心地よい汗をかいて体内の熱を外へ発散させる。ただし現代はエアコン冷房による「内冷え（陰盛）」に厳重警戒。",
      diet: "スイカ、キュウリ、トマト、苦瓜（ゴーヤ）、麦茶、緑豆など、熱を冷まし津液（潤い）を補給する夏野菜を適量摂取。冷たい氷水の一気飲みは脾胃を痛める。",
      caution: "発汗過多は「気随汗脱（汗とともにエネルギーが漏れ出る）」を起こし夏バテの原因に。激しい消耗を避け適度な塩分と水分補給を。"
    },
    autumn: {
      name: "秋（金・容平）",
      yangWave: "陰気の上昇・陽気の収斂（少陰）",
      waveLevel: "70% ➜ 35% 急下降",
      color: "text-[#B86924] dark:text-[#E6C387]",
      badgeBg: "bg-[#FCF4EB] dark:bg-[#251D14] text-[#B86924] dark:text-[#E6C387]",
      icon: <Wind className="w-5 h-5 text-[#B86924]" />,
      summary: "万物が実を結び、天地の気が引き締まる季節。陽気が体内深部へと戻り始める。",
      habit: "「早臥早起、与鶏倶興」── 鶏とともに早寝早起き。秋の涼気（燥邪）から肺を守り、心を穏やかに保って物悲しさ（悲憂の感情）を和らげる。",
      diet: "蓮根、大根、白きくらげ、梨、百合根、豆乳、山芋など「白い潤い食材（滋陰潤肺）」を積極的に摂り、呼吸器粘膜と皮膚の乾燥を防ぐ。",
      caution: "「燥邪（乾燥）」が肺を直撃すると、空咳・皮膚掻痒・便秘が悪化。加湿とスキンケア、温かい汁物を意識。"
    },
    winter: {
      name: "冬（水・閉蔵）",
      yangWave: "陰気の極大・陽気の潜伏（太陰）",
      waveLevel: "0%〜15%（極陰・陽気は地下深層に潜伏）",
      color: "text-[#1E3A5F] dark:text-[#60A5FA]",
      badgeBg: "bg-[#EBF1F6] dark:bg-[#12202E] text-[#1E3A5F] dark:text-[#60A5FA]",
      icon: <Snowflake className="w-5 h-5 text-[#1E3A5F] dark:text-[#60A5FA]" />,
      summary: "草木は枯れ水は凍り、万物が活動を休止して春に備える「エネルギー温存と貯蔵」の季節。",
      habit: "「早臥晩起、必待日光」── 早く寝て、太陽が昇って暖かくなってからゆっくり起きる。過度な運動で大汗をかくと貴重な陽気が漏洩するため、保温を徹底し静かに過ごす。",
      diet: "生姜、ネギ、羊肉、ニラ、黒豆、黒ごま、根菜類（ゴボウ、人参）など、腎を養い下半身・丹田を芯から温める温補食材を鍋や煮物で摂る。",
      caution: "寒さは血管を収縮させ心血管疾患・脳卒中・ぎっくり腰を誘発。首・手首・足首の「三首」を徹底的に温める。"
    }
  };

  const active = seasonsData[selectedSeason];

  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑦：四季の陰陽消長サークルカレンダー</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            自然界の陽気の波に呼吸を合わせる「四季の養生サークル」
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          季節をクリックして「過ごし方・おすすめ食材」を切り替え
        </span>
      </div>

      {/* 四季サークルと陽気の波 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-6 md:p-8">
        {/* 左側：円環サークルナビゲーション */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* サークルリング */}
            <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
              <circle cx="100" cy="100" r="75" fill="none" stroke="#E5DEC9" strokeWidth="6" className="dark:stroke-[#2A3B4A]" />
              {/* 四季の円弧ハイライト */}
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke={
                  selectedSeason === "spring"
                    ? "#2E7D32"
                    : selectedSeason === "summer"
                    ? "#C45A4A"
                    : selectedSeason === "autumn"
                    ? "#B86924"
                    : "#1E3A5F"
                }
                strokeWidth="8"
                strokeDasharray="118 354"
                strokeDashoffset={
                  selectedSeason === "spring"
                    ? "-236"
                    : selectedSeason === "summer"
                    ? "-354"
                    : selectedSeason === "autumn"
                    ? "0"
                    : "-118"
                }
                className="transition-all duration-500"
              />
            </svg>

            {/* 中央の現在季節サマリー */}
            <div className="text-center p-4 rounded-full bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm w-36 h-36 flex flex-col items-center justify-center">
              {active.icon}
              <span className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] mt-1">
                {active.name.split("（")[0]}
              </span>
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-0.5 font-mono">
                {active.waveLevel}
              </span>
            </div>

            {/* 四方の季節選択ボタン */}
            {/* 上：夏（南・火・太陽） */}
            <button
              onClick={() => setSelectedSeason("summer")}
              className={`absolute top-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1 ${
                selectedSeason === "summer"
                  ? "bg-[#C45A4A] text-white scale-110 ring-2 ring-[#C45A4A]/30"
                  : "bg-white dark:bg-[#1A2530] text-[#C45A4A] border border-[#C45A4A]/40 hover:bg-[#FCF4EB]"
              }`}
            >
              <Sun className="w-3 h-3" />
              <span>夏（極陽）</span>
            </button>

            {/* 右：秋（西・金・少陰） */}
            <button
              onClick={() => setSelectedSeason("autumn")}
              className={`absolute right-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1 ${
                selectedSeason === "autumn"
                  ? "bg-[#B86924] text-white scale-110 ring-2 ring-[#B86924]/30"
                  : "bg-white dark:bg-[#1A2530] text-[#B86924] border border-[#B86924]/40 hover:bg-[#FCF4EB]"
              }`}
            >
              <Wind className="w-3 h-3" />
              <span>秋（収斂）</span>
            </button>

            {/* 下：冬（北・水・太陰） */}
            <button
              onClick={() => setSelectedSeason("winter")}
              className={`absolute bottom-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1 ${
                selectedSeason === "winter"
                  ? "bg-[#1E3A5F] text-white scale-110 ring-2 ring-[#1E3A5F]/30"
                  : "bg-white dark:bg-[#1A2530] text-[#1E3A5F] dark:text-[#60A5FA] border border-[#1E3A5F]/40 hover:bg-[#EBF1F6]"
              }`}
            >
              <Snowflake className="w-3 h-3" />
              <span>冬（極陰）</span>
            </button>

            {/* 左：春（東・木・少陽） */}
            <button
              onClick={() => setSelectedSeason("spring")}
              className={`absolute left-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1 ${
                selectedSeason === "spring"
                  ? "bg-[#1E3D34] text-white scale-110 ring-2 ring-[#1E3D34]/30"
                  : "bg-white dark:bg-[#1A2530] text-[#1E3D34] dark:text-[#74BA9E] border border-[#1E3D34]/40 hover:bg-[#EBF3EF]"
              }`}
            >
              <Leaf className="w-3 h-3" />
              <span>春（発散）</span>
            </button>
          </div>

          <p className="mt-4 text-[11px] text-[#737C77] dark:text-[#8899A6] text-center">
            ※ 春生・夏長・秋収・冬蔵（天人合一のリズム）
          </p>
        </div>

        {/* 右側：季節別養生の詳細カード */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${active.badgeBg}`}>
                {active.name}
              </span>
              <span className="text-xs font-semibold text-[#737C77] dark:text-[#8899A6]">
                波の状態：{active.yangWave}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#404743] dark:text-[#D1C6BA] leading-relaxed">
            {active.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            {/* 生活習慣 */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#B86924]" />
                <span>起居・生活習慣の極意</span>
              </span>
              <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                {active.habit}
              </p>
            </div>

            {/* 食養生 */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#B86924]" />
                <span>おすすめの食養生</span>
              </span>
              <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                {active.diet}
              </p>
            </div>
          </div>

          {/* 季節の注意点 */}
          <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#15202B] border-l-4 border-[#B86924] text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            <strong className="text-[#B86924] dark:text-[#E6C387] block mb-0.5">【この季節に気をつけたい病理サイン】</strong>
            {active.caution}
          </div>
        </div>
      </div>
    </figure>
  );
}
