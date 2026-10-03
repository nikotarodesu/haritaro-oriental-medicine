"use client";

import React, { useId, useState } from "react";
import { Sparkles, Flame, Droplets, ChevronDown, ChevronUp, AlertCircle, Compass } from "lucide-react";

interface DisharmonyPattern {
  id: string;
  name: string;
  typeBadge: string;
  typeColor: string;
  yangLevel: number; // 描画用の相対値。身体の測定値ではない。
  yinLevel: number;
  formula: string;
  metaphor: string;
  symptoms: string[];
  tonguePulse: string;
  tsubo: string[];
  clinicalBoundary: string;
}

const patterns: DisharmonyPattern[] = [
    {
      id: "yang-sheng",
      name: "① 陽盛（実熱：じつねつ）",
      typeBadge: "実証（過剰）",
      typeColor: "bg-[#C45A4A] text-white",
      yangLevel: 90,
      yinLevel: 50,
      formula: "陽 ↑ ／ 陰 ──（陽の偏勝を表す例）",
      metaphor: "火の側が大きくなる比喩で、陽の偏勝を整理します。火の大きさは、体温や炎症の程度を表す測定値ではありません。",
      symptoms: ["熱感・顔の赤み", "口渇", "便秘など"],
      tonguePulse: "舌質紅、舌苔黄燥（黄色く乾いた苔） / 脈洪数（力強く速い脈）",
      tsubo: ["大椎（GV14）", "曲池（LI11）", "合谷（LI4）"],
      clinicalBoundary: "発熱や口渇の原因、冷却・薬・水分補給の要否は、この分類から決められません。体温などの測定と医学的な評価が必要です。"
    },
    {
      id: "yin-sheng",
      name: "② 陰盛（実寒：じつかん）",
      typeBadge: "実証（過剰）",
      typeColor: "bg-[#1E3A5F] text-white",
      yangLevel: 50,
      yinLevel: 90,
      formula: "陽 ── ／ 陰 ↑（陰の偏勝を表す例）",
      metaphor: "水の側が大きくなる比喩で、陰の偏勝を整理します。実際の体液量が多いことや、低体温の原因を示す図ではありません。",
      symptoms: ["冷え・悪寒", "腹痛や下痢など"],
      tonguePulse: "舌質淡・胖大（白っぽくポテッと太い）、白滑苔（水っぽい白い苔） / 脈沈遅（深く遅い脈）",
      tsubo: ["関元（CV4）", "命門（GV4）", "足三里（ST36）"],
      clinicalBoundary: "悪寒や下痢を、冷たい飲食物だけが原因と決めつけないでください。水分摂取の中止や加熱・灸の判断に、この図を使うことはできません。"
    },
    {
      id: "yin-kyo",
      name: "③ 陰虚（虚熱：きょねつ）",
      typeBadge: "虚証（不足）",
      typeColor: "bg-[#D97706] text-white",
      yangLevel: 50,
      yinLevel: 20,
      formula: "陽 ── ／ 陰 ↓（陰の不足を表す例）",
      metaphor: "水の側が小さくなる比喩で、陰の不足と相対的な熱の表れを整理します。陰虚と、脱水や体液量の減少は同じ意味ではありません。",
      symptoms: ["手足のひらのほてり（五心煩熱）", "寝汗（盗汗）", "口や喉の乾きなど"],
      tonguePulse: "舌質紅・痩小（赤く薄っぺらい）、舌苔少または無苔（剥離苔） / 脈細数（細く速い脈）",
      tsubo: ["三陰交（SP6）", "太渓（KI3）", "照海（KI6）"],
      clinicalBoundary: "寝汗・乾燥・ほてりには複数の原因があります。睡眠時刻や食材だけで陰虚を確定したり、症状が続くときの受診を置き換えたりすることはできません。"
    },
    {
      id: "yang-kyo",
      name: "④ 陽虚（虚寒：きょかん）",
      typeBadge: "虚証（不足）",
      typeColor: "bg-[#4B6B94] text-white",
      yangLevel: 20,
      yinLevel: 50,
      formula: "陽 ↓ ／ 陰 ──（陽の不足を表す例）",
      metaphor: "火の側が小さくなる比喩で、陽の不足と相対的な寒の表れを整理します。基礎代謝の低下や甲状腺疾患を意味する診断名ではありません。",
      symptoms: ["冷え・寒がり", "疲れやすさ", "軟便・下痢など"],
      tonguePulse: "舌質淡白・胖嫩（白っぽく歯型がつく）、舌苔薄白 / 脈沈微弱（極めて沈んで弱い脈）",
      tsubo: ["気海（CV6）", "腎兪（BL23）", "湧泉（KI1）"],
      clinicalBoundary: "冷えや疲労だけでは内分泌・循環などの異常を区別できません。症状が続く場合は医療機関に相談し、加熱や自己刺激で原因の確認を先延ばしにしないでください。"
    },
    {
      id: "yin-kyo-yang-kou",
      name: "⑤ 陰虚陽亢（いんきょようこう）",
      typeBadge: "複合型（虚実錯雑）",
      typeColor: "bg-[#7C3AED] text-white",
      yangLevel: 75,
      yinLevel: 25,
      formula: "陰 ↓ ／ 陽の亢り（複合した分類の例）",
      metaphor: "陰の不足と陽の亢りを合わせて考える伝統的な分類です。上熱下寒は上下の寒熱を表す別の観点で、陰虚陽亢と同義ではありません。",
      symptoms: ["のぼせ", "頭痛・めまい", "耳鳴り・不眠など"],
      tonguePulse: "舌尖が真っ赤で乾いている / 脈弦細数（硬く突っ張って細く速い）",
      tsubo: ["太衝（LR3）", "湧泉（KI1）", "風池（GB20）"],
      clinicalBoundary: "頭痛・めまいなどの原因や血圧の異常は、この分類で確定できません。図を根拠に頭を冷やす・足を温めるといった処置や、薬の変更を決めないでください。"
    }
];

function describeLevel(level: number) {
  return level > 50 ? "増" : level < 50 ? "減" : "基準";
}

export default function YinYangDisharmonyMap() {
  const [expandedId, setExpandedId] = useState<string>("yang-sheng");
  const diagramId = useId();

  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：陰陽失調の分類を比べる模式図</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            「火（陽）」と「水（陰）」の比喩で学ぶ陰陽失調
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          各カードをタップして「所見の例・関連経穴・判断の注意点」を展開
        </span>
      </div>

      {/* 基準説明バー */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E3D34] shrink-0" />
          <strong className="text-[#232826] dark:text-[#FAF8F5]">学習用の比喩：</strong>
          <span className="text-[#59615D] dark:text-[#96A6B2]">陰陽の偏り・不足を相対的に比較</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-[#C45A4A] dark:text-[#F87171] font-bold">
            <Flame className="w-3.5 h-3.5" /> 陽の比喩（火）
          </span>
          <span className="flex items-center gap-1 text-[#1E3A5F] dark:text-[#60A5FA] font-bold">
            <Droplets className="w-3.5 h-3.5" /> 陰の比喩（水）
          </span>
        </div>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
        バーの長さは概念の模式図で、体温・体液量・検査値を示しません。所見だけで分類や病気を確定することはできず、経穴名は教材内の例示です。治療効果、選穴や自己刺激の可否、薬・冷却・加熱の判断には使えません。
        <a href="/safety" className="ml-1 inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-2 dark:text-[#74BA9E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924]">受診の目安</a>
        を確認してください。
      </p>

      {/* 失調パターン リスト（アコーディオン） */}
      <div className="space-y-3">
        {patterns.map((item) => {
          const isExpanded = expandedId === item.id;
          const panelId = `${diagramId}-${item.id}-details`;
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
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setExpandedId((current) => current === item.id ? "" : item.id)}
                className="min-h-11 w-full p-3 sm:p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#B86924]"
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
                <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-8 bg-white dark:bg-[#15202B] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] w-full sm:w-auto">
                  {/* 火（陽）ゲージ */}
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#C45A4A]" />
                    <div className="w-16 sm:w-20 bg-[#F2ECE0] dark:bg-[#22303D] h-3.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E26A5A] to-[#C45A4A] transition-all duration-500"
                        style={{ width: `${item.yangLevel}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold whitespace-nowrap text-[#C45A4A] w-9">
                      陽{describeLevel(item.yangLevel)}
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
                    <span className="text-[11px] font-bold whitespace-nowrap text-[#1E3A5F] dark:text-[#60A5FA] w-9">
                      陰{describeLevel(item.yinLevel)}
                    </span>
                  </div>
                </div>

                {/* 開閉アイコン */}
                <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#22303D] text-[#59615D] dark:text-[#96A6B2]">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* アコーディオン展開部分 */}
                <div id={panelId} hidden={!isExpanded} className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-4 animate-in fade-in duration-200">
                  {/* 分類を理解するための比喩 */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#15202B] border-l-4 border-[#1E3D34] dark:border-[#74BA9E] text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                    <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">【伝統的な分類を理解する比喩】</strong>
                    {item.metaphor}
                  </div>

                  {/* 3分割詳細グリッド */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                    {/* 主症状と舌脈 */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                      <span className="font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#C45A4A]" />
                        <span>伝統的に関連づける所見の例</span>
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
                        <span className="font-semibold text-[#232826] dark:text-[#D5E0DC] block">舌・脈の伝統的な観察語：</span>
                        <span className="text-[#737C77] dark:text-[#8899A6]">{item.tonguePulse}</span>
                      </div>
                    </div>

                    {/* 教材内の関連経穴名 */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                        <span>教材の関連経穴</span>
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-[#404743] dark:text-[#C5D2DB]">
                        {item.tsubo.map((t, tIdx) => (
                          <li key={tIdx} className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] border border-[#E8E1D1]/60 dark:border-[#2A3B4A]">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 分類から治療を判断しないための注意 */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                      <span className="font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                        <span>判断の注意点</span>
                      </span>
                      <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                        {item.clinicalBoundary}
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
