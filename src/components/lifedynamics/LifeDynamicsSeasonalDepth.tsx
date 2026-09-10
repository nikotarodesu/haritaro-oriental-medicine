"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Compass, ShieldAlert, Heart, Activity, ArrowUpRight, Thermometer } from "lucide-react";

type SeasonKey = "spring" | "summer" | "doyo" | "autumn" | "winter";

interface SeasonData {
  key: SeasonKey;
  name: string;
  kana: string;
  nature: string;
  vector: string;
  depthLayer: string;
  depthDepth: number; // 1(最表層)〜5(最深部)
  sanjiaoFocus: string;
  mismatchDisease: string;
  keyAcupoints: string;
  careArea: string;
  color: string;
  bgLight: string;
  darkBg: string;
  desc: string;
}

const SEASONS: SeasonData[] = [
  {
    key: "spring",
    name: "春",
    kana: "はる",
    nature: "木・風邪",
    vector: "昇発（立ち上がり・上昇）",
    depthLayer: "経脈（中層・気血の幹線道路）",
    depthDepth: 3,
    sanjiaoFocus: "中焦 ➜ 上焦へぐんぐん上昇",
    mismatchDisease: "肝気鬱結、激しい頭痛、イライラ、めまい、血圧上昇",
    keyAcupoints: "風池（ふうち）、天柱、太衝（たいしょう）",
    careArea: "頭項部（頭・首の後ろ）",
    color: "#2E7D32",
    bgLight: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]",
    darkBg: "dark:bg-[#1B5E20]/20 dark:text-[#A5D6A7]",
    desc: "冬に骨髄へ溜めていたエネルギーが芽吹き、中層の経脈を駆け上がって頭頂へ向かう季節。発散が滞ると気が頭部に詰まり、頭痛や精神的不安定を起こします。",
  },
  {
    key: "summer",
    name: "夏",
    kana: "なつ",
    nature: "火・熱暑邪",
    vector: "発散（全開放・拡張）",
    depthLayer: "孫絡（最表層・微細毛細血管）",
    depthDepth: 1,
    sanjiaoFocus: "上焦・体表へフルオープン",
    mismatchDisease: "熱のこもり、動悸、息苦しさ、不眠、激しい脱力（夏バテ）",
    keyAcupoints: "壇中（だんちゅう）、極泉、期門（きもん）",
    careArea: "胸脇部（胸やわき腹）",
    color: "#D32F2F",
    bgLight: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]",
    darkBg: "dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A]",
    desc: "気血が最表層の孫絡（毛細血管）まで溢れ出し、発汗によって体温を外へ逃がす季節。冷房や冷たいものの摂りすぎで毛穴が閉じると、胸郭内に熱がこもり心肺を圧迫します。",
  },
  {
    key: "doyo",
    name: "土用",
    kana: "どよう",
    nature: "土・湿邪",
    vector: "調和（中和・季節の転換）",
    depthLayer: "肌肉（筋肉・皮下組織）",
    depthDepth: 2.5,
    sanjiaoFocus: "中焦（脾胃）がすべての軸",
    mismatchDisease: "胃腸機能低下、身体の重だるさ、食欲不振、下痢・軟便",
    keyAcupoints: "足三里（あしさんり）、中脘（ちゅうかん）、陰陵泉",
    careArea: "腹部・下肢（胃腸・中焦）",
    color: "#FFA000",
    bgLight: "bg-[#FFF8E1] text-[#E65100] border-[#FFE082]",
    darkBg: "dark:bg-[#FFA000]/20 dark:text-[#FFE082]",
    desc: "四季の変わり目ごとに巡る18日間。気が肌肉（筋肉・胃腸）に留まり、次の季節へ受け渡す緩衝地帯。湿度が高まりやすく、胃腸の消化運化機能が最も試されます。",
  },
  {
    key: "autumn",
    name: "秋",
    kana: "あき",
    nature: "金・燥邪",
    vector: "収斂（引き締め・下降収縮）",
    depthLayer: "皮膚・腠理（毛穴・表皮バリア）",
    depthDepth: 2,
    sanjiaoFocus: "上焦から内側・下焦へ収束",
    mismatchDisease: "皮膚乾燥、空咳、呼吸器疾患、肩甲骨・背中の強張り痛",
    keyAcupoints: "肺兪（はいゆ）、風門、尺沢（しゃくたく）",
    careArea: "肩背部（背中・肩甲骨間）",
    color: "#546E7A",
    bgLight: "bg-[#ECEFF1] text-[#37474F] border-[#B0BEC5]",
    darkBg: "dark:bg-[#263238]/30 dark:text-[#CFD8DC]",
    desc: "夏に開ききった体表の毛穴（腠理）をキュッと引き締め、熱と潤いを体内へ逃がさないよう閉じ込める季節。乾燥（燥邪）が肺を直撃すると呼吸器と背部の筋肉が緊張します。",
  },
  {
    key: "winter",
    name: "冬",
    kana: "ふゆ",
    nature: "水・寒邪",
    vector: "閉蔵（蓄積・深部充電）",
    depthLayer: "骨髄（骨・最深部）",
    depthDepth: 5,
    sanjiaoFocus: "下焦深部（腎・丹田）に完全集積",
    mismatchDisease: "芯からの深部冷え、精の枯渇、夜間頻尿、ぎっくり腰、重度の慢性疲労",
    keyAcupoints: "腎兪（じんゆ）、命門（めいもん）、関元（丹田）",
    careArea: "腰股部（腰・骨盤周り）",
    color: "#1565C0",
    bgLight: "bg-[#E3F2FD] text-[#0D47A1] border-[#90CAF9]",
    darkBg: "dark:bg-[#0D47A1]/20 dark:text-[#90CAF9]",
    desc: "気血が身体の最深部（骨髄・腎）に完全に潜伏し、春に向けてバッテリーを急速充電する季節。冬に過労や夜更かしで精を散らすと、翌春の重大な体調不良の原因になります。",
  },
];

export default function LifeDynamicsSeasonalDepth() {
  const [activeSeasonKey, setActiveSeasonKey] = useState<SeasonKey>("spring");
  const season = SEASONS.find((s) => s.key === activeSeasonKey)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：四季の気の重心移動・身体深度マップ</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            病は「外界とのズレ」から生じる ── 五季の気の深度ヒートマップ
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          季節タブを切り替えて深度を確認
        </span>
      </div>

      {/* 季節セレクタースライダー風タブ */}
      <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A] mb-6">
        {SEASONS.map((s) => {
          const isSelected = activeSeasonKey === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActiveSeasonKey(s.key)}
              className={`py-2.5 px-2 rounded-xl text-center transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#17212A] shadow-xs scale-[1.02] border-2 font-bold"
                  : "opacity-75 hover:opacity-100 font-medium"
              }`}
              style={{
                borderColor: isSelected ? s.color : "transparent",
                color: isSelected ? s.color : undefined,
              }}
            >
              <div className="text-sm sm:text-base">{s.name}</div>
              <div className="text-[10px] text-[#8C9691] dark:text-[#64748B] hidden sm:block">
                {s.vector.split("（")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* インフォグラフィック本体 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7">
        {/* 左側：身体深度ヒートマップSVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-[1/1.2]">
            <svg viewBox="0 0 260 300" className="w-full h-full">
              {/* 同心円/層構造（最外層：孫絡 ➜ 皮膚 ➜ 肌肉 ➜ 経脈 ➜ 骨髄） */}
              {/* 層5（最表層：孫絡・夏） */}
              <circle
                cx="130"
                cy="150"
                r="120"
                fill={activeSeasonKey === "summer" ? "#FFCDD2" : "#ECEFF1"}
                stroke="#D32F2F"
                strokeWidth={activeSeasonKey === "summer" ? "3" : "1"}
                opacity={activeSeasonKey === "summer" ? 0.8 : 0.25}
                className="dark:fill-[#D32F2F]/20"
              />
              {/* 層4（皮膚・秋） */}
              <circle
                cx="130"
                cy="150"
                r="95"
                fill={activeSeasonKey === "autumn" ? "#CFD8DC" : "#ECEFF1"}
                stroke="#546E7A"
                strokeWidth={activeSeasonKey === "autumn" ? "3" : "1"}
                opacity={activeSeasonKey === "autumn" ? 0.85 : 0.25}
                className="dark:fill-[#546E7A]/20"
              />
              {/* 層3（肌肉・土用） */}
              <circle
                cx="130"
                cy="150"
                r="72"
                fill={activeSeasonKey === "doyo" ? "#FFE082" : "#ECEFF1"}
                stroke="#FFA000"
                strokeWidth={activeSeasonKey === "doyo" ? "3" : "1"}
                opacity={activeSeasonKey === "doyo" ? 0.9 : 0.25}
                className="dark:fill-[#FFA000]/20"
              />
              {/* 層2（経脈・春） */}
              <circle
                cx="130"
                cy="150"
                r="48"
                fill={activeSeasonKey === "spring" ? "#A5D6A7" : "#ECEFF1"}
                stroke="#2E7D32"
                strokeWidth={activeSeasonKey === "spring" ? "3" : "1"}
                opacity={activeSeasonKey === "spring" ? 0.9 : 0.25}
                className="dark:fill-[#2E7D32]/20"
              />
              {/* 層1（骨髄・冬） */}
              <circle
                cx="130"
                cy="150"
                r="25"
                fill={activeSeasonKey === "winter" ? "#1565C0" : "#90CAF9"}
                stroke="#0D47A1"
                strokeWidth={activeSeasonKey === "winter" ? "3" : "1"}
                className="transition-colors"
              />
              <circle cx="130" cy="150" r="6" fill="#FFFFFF" />

              {/* 階層ラベル */}
              <text x="130" y="45" textAnchor="middle" fontSize="9" fill="#C62828" fontWeight="bold">
                最表層：孫絡（夏）
              </text>
              <text x="130" y="70" textAnchor="middle" fontSize="9" fill="#37474F">
                皮膚（秋）
              </text>
              <text x="130" y="93" textAnchor="middle" fontSize="9" fill="#E65100">
                肌肉（土用）
              </text>
              <text x="130" y="117" textAnchor="middle" fontSize="9" fill="#1B5E20">
                経脈（春）
              </text>
              <text x="130" y="153" textAnchor="middle" fontSize="8" fill="#FFFFFF" fontWeight="bold">
                骨髄（冬）
              </text>
            </svg>
          </div>
          <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
            身体断面の同心円：現在【{season.depthLayer}】に気が集積
          </span>
        </div>

        {/* 右側：選択季節の臨床詳細 */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-base text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: season.color }}
                />
                {season.name}の気の運動：{season.vector}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${season.bgLight} ${season.darkBg}`}>
                {season.nature}
              </span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#D1D5DB] leading-relaxed">
              {season.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* 三焦と集中深度 */}
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                気の集中深度と空間重心：
              </span>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                <strong>深度：</strong>{season.depthLayer}<br />
                <strong>三焦：</strong>{season.sanjiaoFocus}
              </p>
            </div>

            {/* 同調失敗による疾患 */}
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                同調失敗による季節病：
              </span>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                {season.mismatchDisease}
              </p>
            </div>
          </div>

          {/* 治療・養生ポイント */}
          <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#8C9691] dark:text-[#64748B] block text-[10px]">
                  臨床ケアの最重要部位：
                </span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {season.careArea}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#8C9691] dark:text-[#64748B] block text-[10px]">
                  特効配穴：
                </span>
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  {season.keyAcupoints}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
