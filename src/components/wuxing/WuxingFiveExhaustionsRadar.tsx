"use client";

import React, { useState } from "react";
import { Sparkles, Monitor, Activity, Wind, Flame, CloudRain, SunMedium, Snowflake, AlertCircle } from "lucide-react";

export default function WuxingFiveExhaustionsRadar() {
  const [activeTab, setActiveTab] = useState<"gorous" | "goaku">("gorous");

  const gorousList = [
    {
      habit: "久視（きゅうし）｜ 画面凝視・見すぎ",
      injury: "心・血を傷る（肝血も消耗）",
      element: "火（木）",
      modern: "スマホ・PC長時間のブルーライト凝視。網膜の酷使で血を激しく消耗し、脳疲労・眼精疲労・不眠・動悸へ直結。",
      icon: <Monitor className="w-5 h-5 text-[#C62828]" />,
      color: "#C62828"
    },
    {
      habit: "久坐（きゅうざ）｜ 座りっぱなし",
      injury: "脾・肉を傷る（胃腸と筋肉の弱り）",
      element: "土",
      modern: "1日8時間以上のデスクワーク。腹部が圧迫されて胃腸の運化が停滞し、筋肉が衰え、重だるさや内臓下垂を誘発。",
      icon: <Activity className="w-5 h-5 text-[#F57F17]" />,
      color: "#F57F17"
    },
    {
      habit: "久立（きゅうりつ）｜ 立ちっぱなし",
      injury: "腎・骨を傷る（骨と腰の弱り）",
      element: "水",
      modern: "立ち仕事や長時間の直立。重力負荷が腰椎と下肢の骨格に集中し、腎気が消耗して慢性腰痛・下肢浮腫・足腰の冷えを招く。",
      icon: <Activity className="w-5 h-5 text-[#1A237E]" />,
      color: "#1A237E"
    },
    {
      habit: "久行（きゅうこう）｜ 歩きすぎ・過度の歩行",
      injury: "肝・筋を傷る（腱・靭帯の疲弊）",
      element: "木",
      modern: "過度なウォーキングや休息なき酷使。筋・腱（アキレス腱や足底腱膜）に微小断裂が生じ、こむら返りや関節痛を起こす。",
      icon: <Activity className="w-5 h-5 text-[#2E7D32]" />,
      color: "#2E7D32"
    },
    {
      habit: "久臥（きゅうが）｜ 寝たきり・ゴロゴロ",
      injury: "肺・気を傷る（呼吸と全身の気の減退）",
      element: "金",
      modern: "休日ずっとベッドで寝続ける状態。呼吸が浅小になり、全身の気の巡り（宗気・衛気）が鈍ってかえって強い倦怠感に襲われる。",
      icon: <Activity className="w-5 h-5 text-[#78909C]" />,
      color: "#78909C"
    }
  ];

  const goakuList = [
    {
      evil: "風（ふう）邪 ➜ 肝（木）を侵す",
      nature: "百病の長・動・軽揚・開泄",
      symptoms: "痛む場所がコロコロ変わる（遊走痛）、突発性のめまい、顔面麻痺、皮膚の痒み、筋痙攣",
      therapy: "【疏散（そさん）】風邪を吹き飛ばし、皮膚バリアを開通させる",
      icon: <Wind className="w-5 h-5 text-[#2E7D32]" />,
      color: "#2E7D32"
    },
    {
      evil: "熱（ねつ／火）邪 ➜ 心（火）を侵す",
      nature: "炎上・激動・傷津（体液を焼き尽くす）",
      symptoms: "急激な高熱、顔面紅潮、目の充血、激しい口渇（冷飲欲）、強い便秘、譫語（うわごと）",
      therapy: "【清熱（せいねつ）】火を消し、冷涼な潤いで過熱を冷ます",
      icon: <Flame className="w-5 h-5 text-[#C62828]" />,
      color: "#C62828"
    },
    {
      evil: "湿（しつ）邪 ➜ 脾（土）を侵す",
      nature: "重濁・粘滞・下流（重力に従い下に溜まる）",
      symptoms: "頭に重い濡れタオルを巻かれたような頭重、全身のむくみ、下痢、関節の重だるい痛み、治りにくさ",
      therapy: "【化湿（かしつ）・利水】湿気を乾かし、余分な停滞水分を尿として排出",
      icon: <CloudRain className="w-5 h-5 text-[#F57F17]" />,
      color: "#F57F17"
    },
    {
      evil: "燥（そう）邪 ➜ 肺（金）を侵す",
      nature: "乾渋・傷津（潤いを枯渇させる）",
      symptoms: "喉のイガイガ・激しい空咳、皮膚の亀裂や乾燥・カサつき、口唇の乾燥、コロコロ便秘",
      therapy: "【潤燥（じゅんそう）】白い食材や水分で肺粘膜をしっとりと潤す",
      icon: <SunMedium className="w-5 h-5 text-[#78909C]" />,
      color: "#78909C"
    },
    {
      evil: "寒（かん）邪 ➜ 腎（水）を侵す",
      nature: "陰邪・凝滞・収引（血管と筋を縮める）",
      symptoms: "身体の芯からの激しい悪寒、刺すような固定性の冷え痛み、関節の拘縮、水様下痢",
      therapy: "【温散（おんさん）】お灸や温熱薬で芯から温め、滞った血流を溶かす",
      icon: <Snowflake className="w-5 h-5 text-[#1A237E]" />,
      color: "#1A237E"
    }
  ];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：現代人の五労＆五悪レーダーチャート（Pathological Triggers）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            日々の姿勢と環境が臓器を壊す ──「五労」と「五悪」の病理学
          </h4>
        </div>

        {/* タブ切り替え */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
          <button
            onClick={() => setActiveTab("gorous")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "gorous" ? "bg-[#1E3D34] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>身体の使い方の偏り（五労）</span>
          </button>
          <button
            onClick={() => setActiveTab("goaku")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "goaku" ? "bg-[#1E3D34] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>外邪の運動異常（五悪）</span>
          </button>
        </div>
      </div>

      {/* メイン表示エリア */}
      {activeTab === "gorous" ? (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border-l-4 border-[#C62828] text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            <strong className="text-[#C62828] dark:text-[#EF5350] block mb-0.5">
              【現代人は『久視（PC・スマホ）』と『久坐（座り仕事）』の複合病】
            </strong>
            古代の古典『素問・宣明五気篇』が説く「五労所傷」。同じ姿勢や行動を過度に持続させると、特定の臓腑と運動組織が集中的に摩耗・破壊されます。
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gorousList.map((g, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs space-y-2"
                style={{ borderTopWidth: "3px", borderTopColor: g.color }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                    {g.habit}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#96A6B2]">
                    {g.injury}
                  </span>
                </div>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                  {g.modern}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border-l-4 border-[#1E3D34] dark:border-[#74BA9E] text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
              【五悪：気候・環境の邪気がもたらす運動異常】
            </strong>
            五行のバランスが崩れた環境ストレス（外邪）は、人体の各臓器へ侵入して特有の運動異常を引き起こします。
          </div>

          <div className="space-y-3">
            {goakuList.map((ga, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{ borderLeftWidth: "4px", borderLeftColor: ga.color }}
              >
                <div className="space-y-1 sm:max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {ga.evil}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] text-[#737C77] dark:text-[#8899A6]">
                      {ga.nature}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-tight">
                    <strong>症状：</strong>{ga.symptoms}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-right shrink-0">
                  <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                    治療原則
                  </span>
                  <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387]">
                    {ga.therapy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </figure>
  );
}
