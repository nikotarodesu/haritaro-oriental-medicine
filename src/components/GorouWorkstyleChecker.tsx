"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HeartPulse,
  Compass,
  Zap,
  Info,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  FileText,
} from "lucide-react";
import { getGogyoColor, GOGYO_COLORS } from "@/utils/gogyoColor";
import { saveDraftPatientNote } from "@/utils/draftNote";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

// 五労の定義型
export type GorouId = "kyushi" | "kyuza" | "kyuritsu" | "kyukou" | "kyuga";

export interface GorouDef {
  id: GorouId;
  classicName: string; // 久視、久坐、久立、久行、久臥
  classicHarm: string; // 傷血、傷肉、傷骨、傷筋、傷気
  classicQuote: string;
  modernTitle: string;
  modernSub: string;
  organImpacts: {
    liver: number; // 肝
    heart: number; // 心
    spleen: number; // 脾
    lung: number; // 肺
    kidney: number; // 腎
  };
  symptoms: string[];
  mechanism: string;
  chuyoAction: string; // 中庸アクション（逆の動作）
  chuyoDescription: string;
  quickTsubo: {
    name: string;
    reading: string;
    organ: string;
    location: string;
    technique: string;
  };
  officeTip: string;
}

export const GOROU_DEFS: Record<GorouId, GorouDef> = {
  kyushi: {
    id: "kyushi",
    classicName: "久視（きゅうし）",
    classicHarm: "傷血（血を傷る）",
    classicQuote: "『素問』宣明五気篇：「久視傷血」",
    modernTitle: "PC・スマホ・ディスプレイの長時間凝視",
    modernSub: "画面や文字を休憩なしで見続ける、暗い場所で画面を見る",
    organImpacts: {
      liver: 40,
      heart: 35,
      spleen: 10,
      lung: 5,
      kidney: 10,
    },
    symptoms: [
      "夕方になると目がしょぼしょぼ・かすむ",
      "目の奥がズキズキ痛い、ドライアイ",
      "首の付け根・後頭部が板のように張る",
      "夜ベッドに入っても頭が冴えて眠れない",
    ],
    mechanism:
      "「久視傷血」は、長く見る行動と血を関連づけた伝統的な説明です。画面作業で心血・肝血が大量に消耗することを測定した機序ではありません。現代の説明では、画面を見る際にまばたきが減ることで眼表面が乾きやすくなるなど、視作業と目の負担を考えます。",
    chuyoAction: "【遠望法】20分に1回、6メートル先を20秒見つめる",
    chuyoDescription:
      "米国眼科学会は、画面作業中にまばたきと休憩を意識し、20分ごとに約6メートル先を20秒見る方法などを紹介しています。休憩の目安であり、肝経の気を解放したり血流を急速に回復したりする機序の証明ではありません。",
    quickTsubo: {
      name: "太陽（たいよう）",
      reading: "たいよう",
      organ: "奇穴（肝・胆経連動）",
      location: "眉尻と目尻の中点から、親指1本分後ろの窪み",
      technique: "人差し指の腹で小さな円を描くように、心地よい強さで10秒間プッシュ。",
    },
    officeTip: "画面の輝度を周囲の明るさに合わせ、ブルーライトカットや文字サイズ拡大で目の焦点合わせ負荷を下げましょう。",
  },

  kyuza: {
    id: "kyuza",
    classicName: "久坐（きゅうざ）",
    classicHarm: "傷肉（肉を傷る）",
    classicQuote: "『素問』宣明五気篇：「久坐傷肉」",
    modernTitle: "デスクワークでの終日座りっぱなし",
    modernSub: "休憩なしの着席、日常で立つ・歩く機会が少ない",
    organImpacts: {
      liver: 15,
      heart: 10,
      spleen: 45,
      lung: 10,
      kidney: 20,
    },
    symptoms: [
      "食後に強い眠気や胃もたれが起きやすい",
      "夕方にふくらはぎや足首がパンパンにむくむ",
      "お腹にガスが溜まりやすく軟便傾向",
      "身体全体が鉛のように重だるく、やる気が出ない",
    ],
    mechanism:
      "「久坐傷肉」は、長く座る行動と肉を関連づけた伝統的な説明です。座ったことで消化吸収や水分代謝が停止するとは判断しません。現代の作業管理では、同じ姿勢を続けることや反復作業による筋肉・腱の負担を減らすため、作業環境と休憩を調整します。",
    chuyoAction: "【座り続けたときの休憩例】立つ・歩く・無理のない範囲で足首を動かす",
    chuyoDescription:
      "長い座位の合間に姿勢や作業を変える例です。米国OSHAは短い休憩や歩行などを紹介しています。回数や間隔は体調・作業条件に合わせ、むくみや脚の痛みがあれば原因と安全性を別に評価します。",
    quickTsubo: {
      name: "足三里（あしさんり）",
      reading: "あしさんり",
      organ: "足の陽明胃経（合土穴）",
      location: "膝蓋骨の外側の窪みから指4本分下、すねの骨の外側",
      technique: "親指を当てて骨に向かってぐっと押し込むように5秒キープ×3回。",
    },
    officeTip: "スタンディングデスクの導入や、水分補給・トイレでこまめに立つ動線を作りましょう。",
  },

  kyuritsu: {
    id: "kyuritsu",
    classicName: "久立（きゅうりつ）",
    classicHarm: "傷骨（骨を傷る）",
    classicQuote: "『素問』宣明五気篇：「久立傷骨」",
    modernTitle: "立ちっぱなしの接客・調理・販売・通勤",
    modernSub: "休憩なしの立ち仕事、硬い床での作業、長い立位通勤",
    organImpacts: {
      liver: 10,
      heart: 5,
      spleen: 15,
      lung: 5,
      kidney: 65,
    },
    symptoms: [
      "夕方になると腰椎や仙骨のあたりが重く痛む",
      "膝や踵（かかと）に体重がかかるとズキズキ痛い",
      "足の裏がジンジンと熱を持ってだるい",
      "下半身が冷えるのに、上半身がぼんやり疲弊する",
    ],
    mechanism:
      "「久立傷骨」は、長く立つ行動と骨を関連づけた伝統的な説明です。腰・脚の痛みや疲労には、姿勢、筋活動、作業環境など複数の要因が関わります。立ち仕事から腎気の消耗や腎臓の機能低下を推定することはできません。",
    chuyoAction: "【立ち仕事の休憩例】姿勢を変え、休憩時に座る",
    chuyoDescription:
      "同じ立位を続けず、座れる機会や姿勢を変える機会を作る例です。体調と作業条件に合わせて調整します。座ることで骨への荷重がゼロになるという説明はせず、症状が続く場合は医療者へ相談します。",
    quickTsubo: {
      name: "湧泉（ゆうせん）",
      reading: "ゆうせん",
      organ: "足の少陰腎経（井木穴）",
      location: "足裏の前方中央、足の指を曲げた時にできる人の字型の窪み",
      technique: "ゴルフボールや青竹踏みで踏み込むか、親指で体重を乗せて指圧。",
    },
    officeTip: "クッション性の高いインソールを靴に入れ、硬い床面からの衝撃反力を骨から逃がしましょう。",
  },

  kyukou: {
    id: "kyukou",
    classicName: "久行（きゅうこう）",
    classicHarm: "傷筋（筋を傷る）",
    classicQuote: "『素問』宣明五気篇：「久行傷筋」",
    modernTitle: "外回り営業・過度な歩行・激しい長距離移動",
    modernSub: "普段より急に歩行・運動量を増やす、重い荷物で長く移動する",
    organImpacts: {
      liver: 60,
      heart: 10,
      spleen: 10,
      lung: 5,
      kidney: 15,
    },
    symptoms: [
      "アキレス腱や足首の筋がピンと張って痛い",
      "就寝中に突然ふくらはぎがこむら返りを起こす",
      "股関節や膝の靭帯にギシギシとした違和感",
      "階段を降りるときに太もも前面がプルプル震える",
    ],
    mechanism:
      "「久行傷筋」は、長く歩く行動と筋を関連づけた伝統的な説明です。腱の痛みでは荷重や活動量の変化などを評価します。肝に蓄えた血の供給不足から痙攣や腱の損傷が生じたと、この項目だけで判定することはできません。",
    chuyoAction: "【歩行後の休憩例】歩行量・荷物・靴と症状の関係を振り返る",
    chuyoDescription:
      "痛みがある場合は負荷の調整を考え、持続する症状は医療者に相談します。アキレス腱などの痛みには個別の評価と段階的な運動計画が必要です。酸味のある飲料が「酸入肝」によって筋をほぐすという効果は、この教材の根拠として示していません。",
    quickTsubo: {
      name: "承山（しょうざん）",
      reading: "しょうざん",
      organ: "足の太陽膀胱経",
      location: "ふくらはぎの筋肉（腓腹筋）がアキレス腱へと移行するV字型の窪み",
      technique: "両手でふくらはぎを包み、親指を重ねて深呼吸しながらゆっくり押し込む。",
    },
    officeTip: "歩行速度を少し落とし、靴紐を適切に締めて足底アーチを正しくサポートさせましょう。",
  },

  kyuga: {
    id: "kyuga",
    classicName: "久臥（きゅうが）",
    classicHarm: "傷気（気を傷る）",
    classicQuote: "『素問』宣明五気篇：「久臥傷気」",
    modernTitle: "日中に横になって過ごす時間が長い",
    modernSub: "余暇に体を動かす機会が少ない、日中の眠気や疲れが続く",
    organImpacts: {
      liver: 10,
      heart: 10,
      spleen: 20,
      lung: 50,
      kidney: 10,
    },
    symptoms: [
      "10時間以上寝たのに、起きた時の方がだるく頭が重い",
      "ため息が自然と多くなり、深い呼吸がしづらい",
      "声に力が入らず、人と話すのが億劫になる",
      "少し動いただけで動悸や息切れがする",
    ],
    mechanism:
      "「久臥傷気」は、長く横になる行動と気を関連づけた伝統的な説明です。横になることだけで肺気が虚脱したり、換気量が低下したりしたとは判断しません。日中の眠気や疲れが続く場合は睡眠の機会、薬、他の睡眠・身体の問題を確認します。",
    chuyoAction: "【活動の振り返り】睡眠と日中の状態を記録し、体調に合う活動を考える",
    chuyoDescription:
      "病気や医療者の指示で休息が必要な場合は、その方針を優先します。休息を一律に有害とせず、無理のない活動や睡眠の問題を相談します。朝の光や呼吸法で肺気・陽気を回復できるとは保証しません。",
    quickTsubo: {
      name: "壇中（だんちゅう）",
      reading: "だんちゅう",
      organ: "任脈（気会）",
      location: "胸の真ん中、左右の乳頭を結んだ線の中央の骨の上",
      technique: "指先でトントンと優しくタッピングするか、手のひらで温めながら深呼吸。",
    },
    officeTip: "起床時刻、日中の眠気、生活への支障を記録します。眠気や息切れが続く場合は医療者に相談し、この分類だけで睡眠時間や飲水量を決めません。",
  },
};

export default function GorouWorkstyleChecker() {
  const router = useRouter();
  const { clinicalStorageOwner = 'guest' } = useClinicalMemo();
  const [selectedGorou, setSelectedGorou] = useState<GorouId[]>([]);
  const [activeTab, setActiveTab] = useState<"radar" | "action" | "tsubo">("radar");

  // チェックトグル
  const handleToggle = (id: GorouId) => {
    if (selectedGorou.includes(id)) {
      setSelectedGorou(selectedGorou.filter((g) => g !== id));
    } else {
      setSelectedGorou([...selectedGorou, id]);
    }
  };

  // 五臓の負担傾向スコア (0 - 100)
  const organScores = useMemo(() => {
    if (selectedGorou.length === 0) {
      return { liver: 0, heart: 0, spleen: 0, lung: 0, kidney: 0 };
    }
    const totals = { liver: 0, heart: 0, spleen: 0, lung: 0, kidney: 0 };
    selectedGorou.forEach((id) => {
      const g = GOROU_DEFS[id];
      totals.liver += g.organImpacts.liver;
      totals.heart += g.organImpacts.heart;
      totals.spleen += g.organImpacts.spleen;
      totals.lung += g.organImpacts.lung;
      totals.kidney += g.organImpacts.kidney;
    });

    const count = selectedGorou.length;
    return {
      liver: Math.min(100, Math.round((totals.liver / count) * 1.4 + 10)),
      heart: Math.min(100, Math.round((totals.heart / count) * 1.4 + 10)),
      spleen: Math.min(100, Math.round((totals.spleen / count) * 1.4 + 10)),
      lung: Math.min(100, Math.round((totals.lung / count) * 1.4 + 10)),
      kidney: Math.min(100, Math.round((totals.kidney / count) * 1.4 + 10)),
    };
  }, [selectedGorou]);

  // レーダーチャートの頂点計算（中心: 150, 150, 半径: 100）
  const radarPoints = useMemo(() => {
    const cx = 150;
    const cy = 150;
    const maxR = 105;

    // 5軸の角度 (心=上0°, 脾=右72°, 肺=右下144°, 腎=左下216°, 肝=左72°)
    // 通常の東洋医学配当順：心(火:上)、脾(土:右上)、肺(金:右下)、腎(水:左下)、肝(木:左上)
    const angles = [
      -Math.PI / 2, // 心 (上)
      -Math.PI / 2 + (2 * Math.PI) / 5, // 脾 (右上)
      -Math.PI / 2 + (4 * Math.PI) / 5, // 肺 (右下)
      -Math.PI / 2 + (6 * Math.PI) / 5, // 腎 (左下)
      -Math.PI / 2 + (8 * Math.PI) / 5, // 肝 (左上)
    ];

    const scores = [
      organScores.heart,
      organScores.spleen,
      organScores.lung,
      organScores.kidney,
      organScores.liver,
    ];

    const coords = angles.map((ang, idx) => {
      const r = (scores[idx] / 100) * maxR;
      return {
        x: cx + r * Math.cos(ang),
        y: cy + r * Math.sin(ang),
        labelX: cx + (maxR + 24) * Math.cos(ang),
        labelY: cy + (maxR + 24) * Math.sin(ang),
      };
    });

    const polygonPoints = coords.map((c) => `${c.x},${c.y}`).join(" ");
    return { coords, polygonPoints };
  }, [organScores]);

  // 最も疲弊している臓腑の判定
  const mostFatiguedOrgan = useMemo(() => {
    let max = -1;
    let name = "心";
    let element = "火";
    let kanji = "心";
    let harmTissue = "血";

    if (organScores.liver > max) {
      max = organScores.liver;
      name = "肝";
      element = "木";
      kanji = "肝";
      harmTissue = "筋（筋肉・靭帯の緊張）";
    }
    if (organScores.heart > max) {
      max = organScores.heart;
      name = "心";
      element = "火";
      kanji = "心";
      harmTissue = "血（伝統用語）";
    }
    if (organScores.spleen > max) {
      max = organScores.spleen;
      name = "脾";
      element = "土";
      kanji = "脾";
      harmTissue = "肉（伝統用語）";
    }
    if (organScores.lung > max) {
      max = organScores.lung;
      name = "肺";
      element = "金";
      kanji = "肺";
      harmTissue = "気（伝統用語）";
    }
    if (organScores.kidney > max) {
      max = organScores.kidney;
      name = "腎";
      element = "水";
      kanji = "腎";
      harmTissue = "骨（伝統用語）";
    }

    return { name, element, kanji, harmTissue, score: max };
  }, [organScores]);

  const handleSaveToNoteDraft = () => {
    const retained = clinicalStorageOwner && saveDraftPatientNote({
      sourceTool: "五労チェッカー",
      constitution: `五労の学習分類：${mostFatiguedOrgan.name}（${mostFatiguedOrgan.element}行）`,
      chiefComplaint: `選択した生活習慣（${selectedGorou.map((id) => GOROU_DEFS[id].classicName).join("・")}）※症状や原因を確認した記録ではありません`,
      selectedPointsInput: selectedGorou.map((id) => GOROU_DEFS[id].quickTsubo.name).join(", "),
      treatmentPlan: `【五労チェック結果】\n教材内で最も点数が高い分類: ${mostFatiguedOrgan.name}（${mostFatiguedOrgan.harmTissue} / 学習用点数${mostFatiguedOrgan.score}/100）\n選択パターン: ${selectedGorou.map((id) => `${GOROU_DEFS[id].classicName}（${GOROU_DEFS[id].modernTitle}）`).join("、")}\n休憩・動作の例:\n${selectedGorou.map((id) => `・${GOROU_DEFS[id].classicName}: ${GOROU_DEFS[id].chuyoAction}`).join("\n")}\n※固定値の平均を換算した教材の点数です。臓器負荷・疲労度・疾患リスクを測定した記録ではありません。経穴は学習例で、施術を決めた記録ではありません。症状や医学的な評価は別に確認してください。`,
    }, clinicalStorageOwner);
    if (!retained) { window.alert('下書きを引き継げませんでした。入力は保持しています。保存先とブラウザの保存設定を確認してください。'); return; }
    router.push("/notes");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. チェックリスト */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h3 className="text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              STEP 1: 当てはまるワークスタイル・生活習慣を選択
            </h3>
          </div>
          <span className="text-[11px] sm:text-xs text-[#737C77] dark:text-[#8899A6]">
            複数選択可能（タップで切り替え）
          </span>
        </div>

        {/* 五労の5大チェックボックス */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
          {(Object.keys(GOROU_DEFS) as GorouId[]).map((id) => {
            const def = GOROU_DEFS[id];
            const isChecked = selectedGorou.includes(id);

            return (
              <button
                key={id}
                onClick={() => handleToggle(id)}
                type="button"
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isChecked
                    ? "bg-[#FAF8F5] dark:bg-[#1E2B37] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm ring-1.5 ring-[#1E3D34] dark:ring-[#74BA9E]"
                    : "bg-white dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34]/50 dark:hover:border-[#74BA9E]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                      {def.classicName}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold transition-all ${
                        isChecked
                          ? "bg-[#1E3D34] dark:bg-[#74BA9E] border-[#1E3D34] dark:border-[#74BA9E] text-white dark:text-[#121920]"
                          : "border-[#D5CCBC] dark:border-[#2D3E50] text-transparent"
                      }`}
                    >
                      ✓
                    </div>
                  </div>

                  <div className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF2F2] dark:bg-[#201111] text-[#DC2626] dark:text-[#F87171] border border-[#FECACA] dark:border-[#4C1D1D] mb-2">
                    {def.classicHarm}
                  </div>

                  <p className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] leading-snug">
                    {def.modernTitle}
                  </p>
                </div>

                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 leading-relaxed">
                  {def.modernSub}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 動的五臓負担傾向レーダーチャート ＆ 診断サマリー */}
      {selectedGorou.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center space-y-2">
          <Info className="w-6 h-6 text-[#737C77] mx-auto" />
          <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
            生活習慣・動作の偏りを選択してください
          </h4>
          <p className="text-xs text-[#737C77] dark:text-[#8899A6] max-w-md mx-auto">
            上のリストから当てはまる項目を選択すると、五労の伝統的な分類に沿った学習用の点数と、休憩・動作の例が表示されます。臓器の機能や疲労度を測定するものではありません。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* レーダーチャート (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B86924]" />
                <span>五労の分類に沿った学習用の点数</span>
              </span>
              <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6]">
                選択中：{selectedGorou.length}習慣
              </span>
            </div>

          <div className="relative aspect-square max-w-[300px] mx-auto flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
              {/* 背景の五角形グリッド (20%, 40%, 60%, 80%, 100%) */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, sIdx) => {
                const r = 105 * step;
                const pts = [0, 1, 2, 3, 4]
                  .map((i) => {
                    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
                    return `${150 + r * Math.cos(ang)},${150 + r * Math.sin(ang)}`;
                  })
                  .join(" ");
                return (
                  <polygon
                    key={sIdx}
                    points={pts}
                    fill="none"
                    stroke="#E5DEC9"
                    strokeWidth="1"
                    strokeDasharray={step === 1.0 ? "none" : "2 2"}
                    className="opacity-50 dark:stroke-[#2A3B4A]"
                  />
                );
              })}

              {/* 5本の軸線 */}
              {[0, 1, 2, 3, 4].map((i) => {
                const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
                return (
                  <line
                    key={i}
                    x1="150"
                    y1="150"
                    x2={150 + 105 * Math.cos(ang)}
                    y2={150 + 105 * Math.sin(ang)}
                    stroke="#E5DEC9"
                    strokeWidth="1"
                    className="opacity-60 dark:stroke-[#2A3B4A]"
                  />
                );
              })}

              {/* 疲弊度ポリゴン（動的アニメーション） */}
              <polygon
                points={radarPoints.polygonPoints}
                fill="#DC2626"
                fillOpacity="0.25"
                stroke="#DC2626"
                strokeWidth="2.5"
                className="transition-all duration-500 ease-out"
              />

              {/* 各頂点ノード（五行カラー） */}
              {radarPoints.coords.map((c, idx) => {
                const colors = [
                  GOGYO_COLORS["火"],
                  GOGYO_COLORS["土"],
                  GOGYO_COLORS["金"],
                  GOGYO_COLORS["水"],
                  GOGYO_COLORS["木"]
                ];
                const col = colors[idx];
                return (
                  <circle
                    key={idx}
                    cx={c.x}
                    cy={c.y}
                    r="4.5"
                    fill={col.accent}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="transition-all duration-500 ease-out"
                  />
                );
              })}

              {/* ラベル（五行カラーユニバーサルデザイン連動） */}
              {[
                { name: "心", element: "火", harm: "血", colorName: "朱", score: organScores.heart, col: GOGYO_COLORS["火"] },
                { name: "脾", element: "土", harm: "肉", colorName: "琥珀", score: organScores.spleen, col: GOGYO_COLORS["土"] },
                { name: "肺", element: "金", harm: "気", colorName: "白銀", score: organScores.lung, col: GOGYO_COLORS["金"] },
                { name: "腎", element: "水", harm: "骨", colorName: "藍", score: organScores.kidney, col: GOGYO_COLORS["水"] },
                { name: "肝", element: "木", harm: "筋", colorName: "翠", score: organScores.liver, col: GOGYO_COLORS["木"] },
              ].map((item, idx) => {
                const c = radarPoints.coords[idx];
                return (
                  <g key={idx}>
                    <text
                      x={c.labelX}
                      y={c.labelY - 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[11px] font-bold fill-[#232826] dark:fill-[#FAF8F5]"
                    >
                      {item.name}（{item.harm}）
                    </text>
                    <text
                      x={c.labelX}
                      y={c.labelY + 13}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[10px] font-mono font-bold"
                      fill={item.col.accent}
                    >
                      {item.score}/100
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-[11px] text-center text-[#737C77] dark:text-[#8899A6] border-t border-[#E5DEC9] dark:border-[#2A3B4A] pt-3">
            💡 <strong>選択項目から計算した学習用の点数：</strong> 選んだ項目にあらかじめ割り当てた点数を平均し、0〜100の尺度で表示しています。五労の分類を学ぶための表示であり、臓器や組織の疲労度・病気の確率を測った値ではありません。
          </div>
        </div>

        {/* 診断サマリー＆中庸の処方箋 (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 負担傾向臓腑のサマリーカード */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34] dark:border-[#74BA9E] p-3.5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Stethoscope className="w-4 h-4" />
              <span>五労の学習分類と点数</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
              <div>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">教材内で最も点数が高い分類：</span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                    【{mostFatiguedOrgan.name}】（学習用点数 {mostFatiguedOrgan.score}/100）
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <span className="text-xs px-2.5 py-1 rounded bg-[#FEF3C7] dark:bg-[#2D2415] text-[#92400E] dark:text-[#FCD34D] font-bold border border-[#FDE68A] dark:border-[#78350F]">
                  {mostFatiguedOrgan.harmTissue} に関わる伝統的な分類
                </span>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm text-[#404743] dark:text-[#D1D5DB] leading-relaxed">
                選択した項目は<strong>{selectedGorou.map((id) => GOROU_DEFS[id].classicName).join(" と ")}</strong>です。
                この教材の固定値では<strong>【{mostFatiguedOrgan.name}（{mostFatiguedOrgan.element}行）】</strong>の点数が最も高くなりました。
                症状の原因や臓器の状態を診断した結果ではありません。下の休憩・動作の例を、体調と作業条件に合わせて振り返ってください。
              </p>
            </div>

            {/* 臨床ノートへの連携導線 */}
            <div className="mt-3 pt-3 border-t border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
                <FileText className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>選んだ生活習慣、学習用の点数、休憩の例を臨床ノートの下書きに引き継ぎます</span>
              </div>
              <button
                type="button"
                onClick={handleSaveToNoteDraft}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs font-bold shadow-xs transition-all shrink-0 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>この内容を臨床ノートに残す</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 選択された五労の中庸アクションカード */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
              <Zap className="w-4 h-4 text-[#B86924]" />
              <span>選んだ生活習慣に合わせた休憩や動作の例</span>
            </div>

            {selectedGorou.map((id) => {
              const def = GOROU_DEFS[id];
              return (
                <div
                  key={id}
                  className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-2 sm:space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#1E3D34] dark:text-[#74BA9E]">
                        {def.classicName}（{def.classicHarm}）
                      </span>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                        {def.modernTitle}
                      </span>
                    </div>
                  </div>

                  {/* 中庸アクション */}
                  <div className="text-xs">
                    <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
                      🔄 休憩・動作の例：
                    </span>
                    <p className="font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
                      {def.chuyoAction}
                    </p>
                    <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                      {def.chuyoDescription}
                    </p>
                  </div>

                  {/* ツボ */}
                  <div className="pt-2 border-t border-[#E5DEC9]/40 dark:border-[#2A3B4A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#B86924]">この項目で紹介する経穴：</span>
                      <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                        {def.quickTsubo.name}（{def.quickTsubo.reading}）
                      </span>
                      <span className="text-[#737C77]">― {def.quickTsubo.location}</span>
                    </div>
                    <span className="text-[10px] text-[#59615D] dark:text-[#A0B0BC]">
                      {def.quickTsubo.technique}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* 3. 深掘り解説：『黄帝内経』が教える五労所傷のメカニズム */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-7 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#B86924]" />
          <h4 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
            五労の伝統的な分類と、現代の作業負担への対応
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          五労は、長く見る・座る・立つ・歩く・横になる行動を、血・肉・骨・筋・気と関連づけた伝統的な分類です。細菌・ウイルスによる病態や、特定の臓器の損傷を説明した実測結果ではありません。
          現代の職業性の負担への対応は、休憩・姿勢の変更・作業環境の調整などを組み合わせます。米国OSHAは、コンピューター作業に短い休憩を組み込み、目を画面から離す、立つ、歩くなどを例示しています。WHOは座位時間を減らし、可能な範囲で身体活動へ置き換えることを勧めています。
          五労の分類だけで職業病の予防効果を保証したり、全員に同じ休憩間隔・運動量を指示したりするものではありません。
        </p>

        <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
          出典：<a href="https://www.osha.gov/etools/computer-workstations/work-process" target="_blank" rel="noopener noreferrer" className="underline">OSHA：コンピューター作業と休憩</a>、
          <a href="https://www.who.int/publications/i/item/9789240015128" target="_blank" rel="noopener noreferrer" className="underline">WHO：身体活動と座位行動の指針</a>、
          <a href="https://aao.org/eye-health/tips-prevention/computer-usage" target="_blank" rel="noopener noreferrer" className="underline">米国眼科学会：画面作業と目の負担</a>、
          <a href="https://www.cuh.nhs.uk/patient-information/achilles-tendinopathy-management-advice/" target="_blank" rel="noopener noreferrer" className="underline">英国NHS：アキレス腱の痛みと負荷の調整</a>。
          休憩方法の一般的な参考資料です。五労の臓腑対応や経穴の効果を検証した資料ではありません。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 border-t border-[#E5DEC9] dark:border-[#2A3B4A] text-center text-xs">
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久視傷血</span>
            <span className="text-[10px] text-[#737C77]">目を休め遠くを見る</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久坐傷肉</span>
            <span className="text-[10px] text-[#737C77]">合間に立つ・歩く</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久立傷骨</span>
            <span className="text-[10px] text-[#737C77]">立ち方を変え、座って休む</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久行傷筋</span>
            <span className="text-[10px] text-[#737C77]">運動量と痛みを振り返る</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久臥傷気</span>
            <span className="text-[10px] text-[#737C77]">睡眠と日中の状態を記録</span>
          </div>
        </div>
      </div>
    </div>
  );
}
