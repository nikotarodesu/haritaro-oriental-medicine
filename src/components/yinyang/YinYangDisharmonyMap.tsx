"use client";

import React, { useState } from "react";
import { Sparkles, Flame, Droplets, ChevronDown, ChevronUp, AlertCircle, Compass, Utensils } from "lucide-react";

interface DisharmonyPattern {
  id: string;
  name: string;
  typeBadge: string;
  typeColor: string;
  yangLevel: number; // 0〜100 (基準50)
  yinLevel: number;  // 0〜100 (基準50)
  formula: string;
  metaphor: string;
  symptoms: string[];
  tonguePulse: string;
  tsubo: string[];
  lifestyle: string;
}

export default function YinYangDisharmonyMap() {
  const [expandedId, setExpandedId] = useState<string>("yang-sheng");

  const patterns: DisharmonyPattern[] = [
    {
      id: "yang-sheng",
      name: "① 陽盛（実熱：じつねつ）",
      typeBadge: "実証（過剰）",
      typeColor: "bg-[#C45A4A] text-white",
      yangLevel: 90,
      yinLevel: 50,
      formula: "陽 ↑↑ ／ 陰 ──（水は普通だが、火が猛烈に燃え盛る）",
      metaphor: "真夏の日照りと山火事。外邪（熱邪）の侵入や暴飲暴食・強い怒りによる過剰興奮。",
      symptoms: ["激しい高熱", "顔面紅潮", "激しい口渇（冷水をがぶ飲み）", "強い便秘・口臭", "イライラ・不穏"],
      tonguePulse: "舌質紅、舌苔黄燥（黄色く乾いた苔） / 脈洪数（力強く速い脈）",
      tsubo: ["大椎（GV14：熱を散らす特効穴）", "曲池（LI11：大腸経の熱を清解）", "合谷（LI4：頭面の熱を瀉す）"],
      lifestyle: "辛いもの、揚げ物、アルコールを絶ち、キュウリ、トマト、緑茶など清熱作用のある食材を摂る。無理な運動を避け熱を冷ます。"
    },
    {
      id: "yin-sheng",
      name: "② 陰盛（実寒：じつかん）",
      typeBadge: "実証（過剰）",
      typeColor: "bg-[#1E3A5F] text-white",
      yangLevel: 50,
      yinLevel: 90,
      formula: "陽 ── ／ 陰 ↑↑（火は普通だが、冷水が溢れて冷え切る）",
      metaphor: "凍てつく厳冬の氷水。寒邪の直接侵入や、冷たい飲食の過剰摂取で生体が急激に冷却。",
      symptoms: ["体内の激しい冷え・悪寒", "温めても温まりにくい寒気", "水様性の透明な下痢", "尿量が多く色が透明", "全身の浮腫"],
      tonguePulse: "舌質淡・胖大（白っぽくポテッと太い）、白滑苔（水っぽい白い苔） / 脈沈遅（深く遅い脈）",
      tsubo: ["関元（CV4：丹田を温め寒邪を散らすお灸）", "命門（GV4：陽気の根本を加熱）", "足三里（ST36：胃腸の冷えを除去）"],
      lifestyle: "生水・生野菜・冷飲食を即座に中止。生姜湯、シナモン、ネギなど体を芯から温める温熱性食材を摂り、足首やお腹を徹底保温。"
    },
    {
      id: "yin-kyo",
      name: "③ 陰虚（虚熱：きょねつ）",
      typeBadge: "虚証（不足）",
      typeColor: "bg-[#D97706] text-white",
      yangLevel: 50,
      yinLevel: 20,
      formula: "陽 ── ／ 陰 ↓↓（火は普通だが、水が枯渇して空焚きになる）",
      metaphor: "水が蒸発して空焚き状態になったヤカン。過労、加齢、慢性消耗性疾患で体液・潤いが尽きた状態。",
      symptoms: ["手足のひらのほてり（五心煩熱）", "午後・夕方の微熱やのぼせ", "就寝中の激しい寝汗（盗汗）", "喉の渇き（少量ずつ飲みたい）", "皮膚や粘膜の強い乾燥"],
      tonguePulse: "舌質紅・痩小（赤く薄っぺらい）、舌苔少または無苔（剥離苔） / 脈細数（細く速い脈）",
      tsubo: ["三陰交（SP6：肝脾腎の陰液を強力に補給）", "太渓（KI3：腎陰を潤す名穴）", "照海（KI6：咽喉の乾燥・寝汗を止める）"],
      lifestyle: "夜更かし（陰を削る最大の原因）を厳禁とし日付が変わる前に就寝。クコの実、白きくらげ、山芋、梨など潤いを補う「滋陰食材」を意識。"
    },
    {
      id: "yang-kyo",
      name: "④ 陽虚（虚寒：きょかん）",
      typeBadge: "虚証（不足）",
      typeColor: "bg-[#4B6B94] text-white",
      yangLevel: 20,
      yinLevel: 50,
      formula: "陽 ↓↓ ／ 陰 ──（水は普通だが、火が小さく消え入りそう）",
      metaphor: "火力が弱く暖まらないストーブ。基礎代謝と活動熱が衰弱し、自家発電ができなくなった状態。",
      symptoms: ["極度の寒がり・手足の冷え", "常にだるく気力・活力が湧かない", "腰や膝の脱力感と冷え痛む", "朝方の下痢（五更瀉）", "顔色が青白い・透明"],
      tonguePulse: "舌質淡白・胖嫩（白っぽく歯型がつく）、舌苔薄白 / 脈沈微弱（極めて沈んで弱い脈）",
      tsubo: ["気海（CV6：元気の源を補い温める）", "腎兪（BL23：背部の火を温める灸頭鍼）", "湧泉（KI1：足底のお灸で陽気を呼び覚ます）"],
      lifestyle: "日光浴や適度なストレッチで陽気を奮い立たせる。羊肉、ニラ、黒ごま、温かいスープを常用し、エネルギーを底上げする。"
    },
    {
      id: "yin-kyo-yang-kou",
      name: "⑤ 陰虚陽亢（上熱下冷：じょうねつげれい）",
      typeBadge: "複合型（虚実錯雑）",
      typeColor: "bg-[#7C3AED] text-white",
      yangLevel: 75,
      yinLevel: 25,
      formula: "陰が陽を繋ぎ止められず、陽気が上部に脱走浮揚",
      metaphor: "根の張っていない大木が風に揺れ、上部だけが燃え上がる。下半身は氷のように冷たいのに顔や頭だけが激しくのぼせる。",
      symptoms: ["頭痛・眩暈（目の回るようなめまい）", "顔の激しいのぼせと足先の氷のような冷え", "イライラ・耳鳴り・不眠", "血圧の急激な変動"],
      tonguePulse: "舌尖が真っ赤で乾いている / 脈弦細数（硬く突っ張って細く速い）",
      tsubo: ["太衝（LR3：上に突き上がった肝陽を引き下げる）", "湧泉（KI1：上部の熱を足底へ引火帰元させる）", "風池（GB20：頭頸部の鬱血を解除）"],
      lifestyle: "足湯で下半身を温めながら、頭部を冷やす「頭寒足熱」の徹底。PCやスマホの夜間凝視（目を酷使すると肝血・陰を削る）を避ける。"
    }
  ];

  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：陰陽失調の4象限バランスマップ</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            コップの「火（陽）」と「水（陰）」で見る 5大失調病態
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          各カードをタップして「症状・ツボ・養生法」を展開
        </span>
      </div>

      {/* 基準説明バー */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E3D34] shrink-0" />
          <strong className="text-[#232826] dark:text-[#FAF8F5]">健康（動的平衝）の基準：</strong>
          <span className="text-[#59615D] dark:text-[#96A6B2]">「火50%」と「水50%」が調和</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-[#C45A4A] dark:text-[#F87171] font-bold">
            <Flame className="w-3.5 h-3.5" /> 陽気（火）
          </span>
          <span className="flex items-center gap-1 text-[#1E3A5F] dark:text-[#60A5FA] font-bold">
            <Droplets className="w-3.5 h-3.5" /> 陰液（水）
          </span>
        </div>
      </div>

      {/* 失調パターン リスト（アコーディオン） */}
      <div className="space-y-3">
        {patterns.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-xl sm:rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? "bg-[#FFFFFF] dark:bg-[#1C2834] border-[#1E3D34] dark:border-[#74BA9E] shadow-md ring-1 ring-[#1E3D34]/15"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
              }`}
            >
              {/* カードヘッダー（クリックでトグル） */}
              <button
                onClick={() => setExpandedId(isExpanded ? "" : item.id)}
                className="w-full p-3 sm:p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-colors"
              >
                {/* パターン名とバッジ */}
                <div className="space-y-1 sm:max-w-[40%]">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.typeColor}`}>
                      {item.typeBadge}
                    </span>
                    <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                      {item.name}
                    </h5>
                  </div>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    {item.formula}
                  </p>
                </div>

                {/* 火と水の液面ゲージビジュアル */}
                <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 bg-white dark:bg-[#15202B] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] w-full sm:w-auto">
                  {/* 火（陽）ゲージ */}
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#C45A4A]" />
                    <div className="w-16 sm:w-20 bg-[#F2ECE0] dark:bg-[#22303D] h-3.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E26A5A] to-[#C45A4A] transition-all duration-500"
                        style={{ width: `${item.yangLevel}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#C45A4A] w-6">
                      {item.yangLevel}%
                    </span>
                  </div>

                  {/* 水（陰）ゲージ */}
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-[#1E3A5F] dark:text-[#60A5FA]" />
                    <div className="w-16 sm:w-20 bg-[#F2ECE0] dark:bg-[#22303D] h-3.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E3A5F] transition-all duration-500"
                        style={{ width: `${item.yinLevel}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#1E3A5F] dark:text-[#60A5FA] w-6">
                      {item.yinLevel}%
                    </span>
                  </div>
                </div>

                {/* 開閉アイコン */}
                <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#22303D] text-[#59615D] dark:text-[#96A6B2]">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* アコーディオン展開部分 */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-4 animate-in fade-in duration-200">
                  {/* 比喩・メカニズム */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#15202B] border-l-4 border-[#1E3D34] dark:border-[#74BA9E] text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                    <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">【病態のメカニズムと比喩】</strong>
                    {item.metaphor}
                  </div>

                  {/* 3分割詳細グリッド */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                    {/* 主症状と舌脈 */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                      <span className="font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#C45A4A]" />
                        <span>主なサイン・症状</span>
                      </span>
                      <ul className="space-y-1 text-[11px] text-[#59615D] dark:text-[#96A6B2]">
                        {item.symptoms.map((s, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] text-[11px]">
                        <span className="font-semibold text-[#232826] dark:text-[#D5E0DC] block">舌・脈：</span>
                        <span className="text-[#737C77] dark:text-[#8899A6]">{item.tonguePulse}</span>
                      </div>
                    </div>

                    {/* おすすめのツボ */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                        <span>臨床で用いる代表ツボ</span>
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-[#404743] dark:text-[#C5D2DB]">
                        {item.tsubo.map((t, tIdx) => (
                          <li key={tIdx} className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] border border-[#E8E1D1]/60 dark:border-[#2A3B4A]">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 養生法・食事 */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                      <span className="font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                        <span>食養生と生活の整え方</span>
                      </span>
                      <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                        {item.lifestyle}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </figure>
  );
}
