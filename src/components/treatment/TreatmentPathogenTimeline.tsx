"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CloudLightning,
  HeartCrack,
  Hourglass,
  Layers,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from "lucide-react";

interface PathogenStrategy {
  id: string;
  title: string;
  en: string;
  cause: string;
  timeline: {
    phase: string;
    action: string;
    points: string;
    danger: string;
  }[];
  goldenRule: string;
}

const PATHOGEN_STRATEGIES: PathogenStrategy[] = [
  {
    id: "external",
    title: "① 外邪（六淫：風・寒・暑・湿・燥・火）",
    en: "Exogenous Pathogens",
    cause: "外部環境の急激な気候変化・病原体が体表（皮毛・経絡）から侵入した急性病理",
    timeline: [
      {
        phase: "【初期】急性侵入期",
        action: "辛温解表・辛涼解表（毛穴を開き、発汗させて体表から邪気を追い出す）",
        points: "風池・列缺・合谷・大椎",
        danger: "この段階で補薬・補法を行うと邪気を体内に閉じ込める「引邪入裏（いんじゃにゅうり）」の逆治になる。",
      },
      {
        phase: "【中期】熱化・停滞期",
        action: "清熱瀉火・化湿降気（臓腑に侵入した熱を冷まし、老廃物を排出する）",
        points: "曲池・内庭・陰陵泉",
        danger: "過剰に冷やしすぎると陽気を痛めるため、熱が引いたら直ちに清熱をストップ。",
      },
      {
        phase: "【後期】消耗回復期",
        action: "扶正培本（戦いによって消耗した気血・津液を優しく補給する）",
        points: "足三里・三陰交・太谿",
        danger: "回復期に脂っこい食事や激しい運動をすると熱が再燃する（食復・労復）。",
      },
    ],
    goldenRule: "「初期は発散に専念し、絶対に補うな。邪気が去ってから初めて補え。」",
  },
  {
    id: "emotion",
    title: "② 情志（ストレス・内傷七情）",
    en: "Emotional Stress & Autonomic Tension",
    cause: "怒り・思慮・悲しみ・恐怖など過度の情動が中枢神経を緊張させ気機を乱した病理",
    timeline: [
      {
        phase: "【初期】急性の情緒緊張",
        action: "疏肝理気・降気平肝（交感神経の過剰興奮を鎮め、上逆した気を下げる）",
        points: "太衝・膻中・内関・湧泉",
        danger: "精神論のカウンセリングだけで解決しようとせず、まず身体の筋膜緊張を抜く。",
      },
      {
        phase: "【中期】横隔膜・呼吸介入",
        action: "胸郭拡張・横隔膜解放（浅くなった呼吸を深くし、迷走神経を刺激）",
        points: "中脘・期門・膈兪・肺兪",
        danger: "頭部ばかりを触ると気がさらに上逆するため、必ず腹部・足底へ意識を誘導。",
      },
      {
        phase: "【長期】情志安定・安神",
        action: "養心安神・補脾培土（脳のセロトニン・GABA系を支える栄養基盤を確立）",
        points: "神門・足三里・百会（微弱刺激）",
        danger: "刺激を強めすぎると好転反応で情緒が不安定になるため、極めて心地よい刺激を遵守。",
      },
    ],
    goldenRule: "「情志の乱れは肉体の緊張（横隔膜・胸郭）として固定される。身体から心を解体せよ。」",
  },
  {
    id: "chronic",
    title: "③ 慢性化病態（生活習慣・疲労蓄積）",
    en: "Chronic Metabolic Degeneration",
    cause: "数ヶ月〜数年に及ぶ過労、睡眠不足、不摂生により気血水が複合的に破綻した病態",
    timeline: [
      {
        phase: "【第1期】渋滞解除（標の処理）",
        action: "頑固な気滞・瘀血・痰湿の結節を緩め、最低限の流通を再開させる",
        points: "阿是穴、三陰交、陽陵泉",
        danger: "初診からいきなり強い補法を入れると、老廃物のゴミ溜めに火を注ぐことになる。",
      },
      {
        phase: "【第2期】代謝基盤回復（本の補修）",
        action: "脾胃の消化吸収機能と腎のバッテリーをじっくり底上げする",
        points: "足三里、脾兪、関元、太谿",
        danger: "数回の治療で症状が軽くなっても完治ではない。土台の回復には最低3ヶ月を要する。",
      },
      {
        phase: "【第3期】ホメオスタシス耐性強化",
        action: "気候変化や過労に負けない自然治癒力（正気）の防壁を完成させる",
        points: "大椎（温灸）、足三里（養生灸）",
        danger: "治療間隔を急に空けすぎず、月1〜2回のメンテナンス期へ滑らかに移行する。",
      },
    ],
    goldenRule: "「慢性病は時間をかけて作られた。直す時も『標の解除 ➜ 本の再建 ➜ 予防』の時間軸を守れ。」",
  },
  {
    id: "complex",
    title: "④ 複合病因（多要因が絡み合う重層病態）",
    en: "Complex Multi-etiological Disorders",
    cause: "「外邪 ＋ ストレス ＋ 体質虚弱 ＋ 加齢」が複雑に重なり合い、一見手が付けられない状態",
    timeline: [
      {
        phase: "優先度 1位：緊急性",
        action: "激痛、呼吸苦、高熱、大小便不通など、生命・日常生活を脅かす標実を即時解除",
        points: "郄穴、刺絡、特効穴",
        danger: "緊急症状を放置して根本原因ばかり議論するのは机上の空論であり誤り。",
      },
      {
        phase: "優先度 2位：可逆的要因",
        action: "冷え、急性の自律神経緊張、筋肉のロックなど、短期間で動かせる要因をクリア",
        points: "太衝、合谷、局所置鍼",
        danger: "一度にすべてを変えようとしてドーゼオーバー（過剰刺激）を起こさない。",
      },
      {
        phase: "優先度 3位：慢性的基盤",
        action: "長期的な体質（腎虚・瘀血体質）の是正へ移り、再発しない構造へ導く",
        points: "関元、太谿、三陰交",
        danger: "優先順位のロードマップを患者と共有し、焦らずステップを踏む。",
      },
    ],
    goldenRule: "「緊急性 ➜ 可逆性 ➜ 慢性基盤の順にドミノを逆から1つずつ倒せ。」",
  },
];

export default function TreatmentPathogenTimeline() {
  const [selectedPathogenId, setSelectedPathogenId] = useState<string>("external");
  const activePathogen =
    PATHOGEN_STRATEGIES.find((p) => p.id === selectedPathogenId) || PATHOGEN_STRATEGIES[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑦：4大病因別の攻略タイムライン</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            入力（病因）の性質を逆算し、時間軸に沿って病態を解体する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          外邪・情志・慢性・複合要因の攻略ロードマップ
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        身体の歪みが<strong>「どのような入力（病因）」</strong>によってもたらされたかによって、治療のタイムライン（時間的展開）は根本から変わります。
        外邪なら初期発散、情志なら身体からの解体、慢性なら標本時間差攻撃というように、病因の特性に応じた攻略手順を固定します。
      </p>

      {/* 4大病因タブ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {PATHOGEN_STRATEGIES.map((item) => {
          const isSelected = item.id === selectedPathogenId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedPathogenId(item.id)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                isSelected
                  ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20"
                  : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
              }`}
            >
              <div className="text-xs sm:text-sm font-bold line-clamp-1">{item.title}</div>
            </button>
          );
        })}
      </div>

      {/* 選択した病因のタイムライン展開 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-5">
        <div className="pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
            {activePathogen.title}
          </h5>
          <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] mt-1 leading-relaxed">
            【病態メカニズム】{activePathogen.cause}
          </p>
        </div>

        {/* タイムライン3ステップ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activePathogen.timeline.map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] inline-block">
                  {step.phase}
                </span>
                <p className="text-xs font-medium text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                  {step.action}
                </p>
                <div className="pt-1.5 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block">
                    主要経穴コード：
                  </span>
                  <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                    {step.points}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#FFEBEE] dark:border-[#3D1A1E]">
                <span className="text-[10px] font-bold text-[#D32F2F] dark:text-[#EF5350] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>厳禁事項：</span>
                </span>
                <p className="text-[11px] text-[#59615D] dark:text-[#E0D5C1] mt-0.5 leading-tight">
                  {step.danger}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 鉄則バナー */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
          <div>
            <strong className="text-[#1E3D34] dark:text-[#74BA9E]">病因攻略のゴールデンルール：</strong>{" "}
            <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">{activePathogen.goldenRule}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
