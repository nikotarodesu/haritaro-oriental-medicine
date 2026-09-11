"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { getGogyoColor, GOGYO_COLORS } from "@/utils/gogyoColor";
import ClipButton from "@/components/ClipButton";

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
    modernSub: "1日6時間以上の画面作業・暗所でのスマホ・文字の連続注視",
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
      "東洋医学では「目は肝の竅（あな）」「心は血脈を主る」とされます。視神経の過酷な連続使用は、網膜だけでなく脳と全身を巡る「血（心血・肝血）」を大量に激しく消耗させます。その結果、血虚（血の不足）が生じ、眼精疲労から不眠・焦燥感へと悪化します。",
    chuyoAction: "【遠望法】20分に1回、6メートル先を20秒見つめる",
    chuyoDescription:
      "近距離固定で緊張しきった毛様体筋と肝経の気を解放するため、意識的に視線を遠くの空や窓の外へ逃がします。温めたタオルを目元に当てる「温罨法」も血流を急速回復させます。",
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
    modernSub: "連続2時間以上の着席・運動不足・リモートワークでの歩行激減",
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
      "「脾は肌肉（筋肉・運動）を主る」。下半身の筋肉は「第二の心臓」として静脈血やリンパ液を押し上げるポンプです。座りっぱなしで筋肉が動かないと、消化吸収と水分代謝を統括する「脾」の運化が停止し、体内に余分な水分（湿濁）が停滞して身体が重だるくなります。",
    chuyoAction: "【起立ポンプ】30分ごとに立ち上がり、踵の上下運動を10回",
    chuyoDescription:
      "座りっぱなしの「陰（静）」を打破するには、意識的な「陽（動）」の介入が不可欠。ふくらはぎの腓腹筋・ヒラメ筋を収縮させて下半身の鬱血を中和します。",
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
    modernSub: "1日5時間以上の直立姿勢・硬い床での立ち作業・満員電車",
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
      "「腎は骨を主り、髄を生じ、腰は腎の府（住まい）」。二足歩行の人間が直立し続けると、体重と重力の負荷がすべて骨格系（脊椎・骨盤・下肢骨）に集中します。これを支え続けることで、人体の根源的エネルギーを蓄える「腎気」が急速に消耗・摩耗します。",
    chuyoAction: "【荷重分散＆除圧】片足ずつ足踏み ＆ 休憩時に足を高くして座る",
    chuyoDescription:
      "骨に集中した重力ストレスを解放するため、重心を交互に左右へ移す「揺らぎ」を作り、休憩時には椅子に座って足を台に乗せ、骨への荷重をゼロにします。",
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
    modernSub: "1日1万歩以上の無理な歩行・重い荷物を持っての移動・過度なランニング",
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
      "「肝は筋（腱・靭帯・筋肉の収縮）を主る」。歩行の繰り返しは腱膜や靭帯に絶え間ない引張ストレスをかけます。過度の歩行が続くと、肝が蓄える血液の供給が追いつかなくなり、筋の柔軟性が失われて痙攣や微小断裂（腱鞘炎・足底腱膜炎）を引き起こします。",
    chuyoAction: "【筋膜弛緩】アキレス腱ストレッチ ＆ ぬるめの入浴で筋を緩める",
    chuyoDescription:
      "硬直した筋を無理に伸ばすのではなく、温めて血流を戻しながらじんわり伸張します。酸味のあるクエン酸飲料（レモン水・梅干し）も「酸入肝」により筋を柔らかくほぐします。",
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
    modernTitle: "休日の寝だめ・1日中ゴロゴロ・浅い呼吸",
    modernSub: "布団から出ない週末・日中の過度な横臥・運動ゼロの引きこもり",
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
      "「肺は気（全身の気）を主る」。人間は立って動き、横隔膜をダイナミックに上下させることで新鮮な大気（清気）を取り込み、全身に気を巡らせています。横になり続けると呼吸が浅くなり、胸腔の換気量が低下して「肺気」が虚脱・停滞します。「寝すぎるとかえって疲れる」のはこのためです。",
    chuyoAction: "【胸郭開放】窓を開けて朝の光を浴び、両手を広げて胸式深呼吸",
    chuyoDescription:
      "横たわる「沈降」のベクトルを、背骨を伸ばして天を仰ぐ「上昇・拡散」のベクトルへと転換。太陽光を浴びることで陽気を呼び覚まします。",
    quickTsubo: {
      name: "壇中（だんちゅう）",
      reading: "だんちゅう",
      organ: "任脈（気会）",
      location: "胸の真ん中、左右の乳頭を結んだ線の中央の骨の上",
      technique: "指先でトントンと優しくタッピングするか、手のひらで温めながら深呼吸。",
    },
    officeTip: "休日の寝坊は平日の＋1時間以内に留め、起きたらまずカーテンを開けてコップ1杯の白湯を飲みましょう。",
  },
};

export default function GorouWorkstyleChecker() {
  const [selectedGorou, setSelectedGorou] = useState<GorouId[]>(["kyushi", "kyuza"]);
  const [activeTab, setActiveTab] = useState<"radar" | "action" | "tsubo">("radar");

  // チェックトグル
  const handleToggle = (id: GorouId) => {
    if (selectedGorou.includes(id)) {
      if (selectedGorou.length > 1) {
        setSelectedGorou(selectedGorou.filter((g) => g !== id));
      }
    } else {
      setSelectedGorou([...selectedGorou, id]);
    }
  };

  // 五臓の疲弊度計算 (0 - 100)
  const organScores = useMemo(() => {
    const totals = { liver: 0, heart: 0, spleen: 0, lung: 0, kidney: 0 };
    selectedGorou.forEach((id) => {
      const g = GOROU_DEFS[id];
      totals.liver += g.organImpacts.liver;
      totals.heart += g.organImpacts.heart;
      totals.spleen += g.organImpacts.spleen;
      totals.lung += g.organImpacts.lung;
      totals.kidney += g.organImpacts.kidney;
    });

    // スケーリング（最大100に収まるよう正規化しつつ最小20を担保）
    const count = selectedGorou.length;
    return {
      liver: Math.min(100, Math.round((totals.liver / count) * 1.6 + 15)),
      heart: Math.min(100, Math.round((totals.heart / count) * 1.6 + 15)),
      spleen: Math.min(100, Math.round((totals.spleen / count) * 1.6 + 15)),
      lung: Math.min(100, Math.round((totals.lung / count) * 1.6 + 15)),
      kidney: Math.min(100, Math.round((totals.kidney / count) * 1.6 + 15)),
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
      harmTissue = "血（視神経・脳の血流）";
    }
    if (organScores.spleen > max) {
      max = organScores.spleen;
      name = "脾";
      element = "土";
      kanji = "脾";
      harmTissue = "肉（肌肉・消化器の運化）";
    }
    if (organScores.lung > max) {
      max = organScores.lung;
      name = "肺";
      element = "金";
      kanji = "肺";
      harmTissue = "気（呼吸・全身のエネルギー）";
    }
    if (organScores.kidney > max) {
      max = organScores.kidney;
      name = "腎";
      element = "水";
      kanji = "腎";
      harmTissue = "骨（腰椎・関節の骨格系）";
    }

    return { name, element, kanji, harmTissue, score: max };
  }, [organScores]);

  return (
    <div className="space-y-8">
      {/* 1. チェックリスト */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h3 className="text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              STEP 1: 当てはまるワークスタイル・生活習慣を選択
            </h3>
          </div>
          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
            複数選択可能（タップで切り替え）
          </span>
        </div>

        {/* 五労の5大チェックボックス */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {(Object.keys(GOROU_DEFS) as GorouId[]).map((id) => {
            const def = GOROU_DEFS[id];
            const isChecked = selectedGorou.includes(id);

            return (
              <button
                key={id}
                onClick={() => handleToggle(id)}
                type="button"
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
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

                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-3 pt-2.5 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 leading-relaxed">
                  {def.modernSub}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 動的五臓疲弊度レーダーチャート ＆ 診断サマリー */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* レーダーチャート (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924]" />
              <span>五臓疲弊度レーダー</span>
            </span>
            <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6]">
              選択中：{selectedGorou.length}習慣連動
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
                      {item.score}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-[11px] text-center text-[#737C77] dark:text-[#8899A6] border-t border-[#E5DEC9] dark:border-[#2A3B4A] pt-3">
            💡 <strong>五労所傷の数値化：</strong> 日常の動作の偏りによってどの組織・臓腑へ疲労が集中しているかを可視化しています。
          </div>
        </div>

        {/* 診断サマリー＆中庸の処方箋 (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 最疲弊臓腑の警告カード */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34] dark:border-[#74BA9E] p-5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Stethoscope className="w-4 h-4" />
              <span>五労診断結果・最疲弊ポイント</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
              <div>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">最も過重負荷を受けている五臓：</span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                    【{mostFatiguedOrgan.name}】が疲弊（疲弊度 {mostFatiguedOrgan.score}%）
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <span className="text-xs px-2.5 py-1 rounded bg-[#FEE2E2] text-[#DC2626] font-bold">
                  {mostFatiguedOrgan.harmTissue} が悲鳴
                </span>
                <ClipButton
                  item={{
                    id: `diagnosis-gorou-${mostFatiguedOrgan.name}`,
                    type: "diagnosis",
                    title: `五労診断：【${mostFatiguedOrgan.name}（${mostFatiguedOrgan.element}行）】疲弊（${mostFatiguedOrgan.score}%）`,
                    subTitle: `過重負荷：${selectedGorou.map(id => GOROU_DEFS[id].classicName).join("・")}`,
                    points: selectedGorou.map(id => GOROU_DEFS[id].quickTsubo.name),
                    elements: [mostFatiguedOrgan.element as any],
                    indications: selectedGorou.map(id => GOROU_DEFS[id].modernTitle),
                    summary: `疲弊五臓【${mostFatiguedOrgan.name}】。日常の中庸アクション処方と特効ツボ（${selectedGorou.map(id => GOROU_DEFS[id].quickTsubo.name).join("、")}）による中庸処方箋。`,
                    mechanism: `偏りを正し、五行（相生相剋）を円滑に循環させる日常処方箋。`
                  }}
                  variant="button"
                  size="sm"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs sm:text-sm text-[#404743] dark:text-[#D1D5DB] leading-relaxed">
                現在のワークスタイルでは、<strong>{selectedGorou.map((id) => GOROU_DEFS[id].classicName).join(" と ")}</strong>の負荷が重なり、
                特に<strong>【{mostFatiguedOrgan.name}（{mostFatiguedOrgan.element}行）】</strong>のエネルギーが消耗しています。
                東洋医学の原則は<strong>「偏りを正し、五行を円滑に回す（中庸）」</strong>こと。以下の処方箋を日常に取り入れてください。
              </p>
            </div>
          </div>

          {/* 選択された五労の中庸アクションカード */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
              <Zap className="w-4 h-4 text-[#B86924]" />
              <span>選択中パターンに対する「中庸アクション処方箋」</span>
            </div>

            {selectedGorou.map((id) => {
              const def = GOROU_DEFS[id];
              return (
                <div
                  key={id}
                  className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-2.5"
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
                      🔄 中庸アクション（逆の動作で中和）：
                    </span>
                    <p className="font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
                      {def.chuyoAction}
                    </p>
                    <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                      {def.chuyoDescription}
                    </p>
                  </div>

                  {/* ツボ */}
                  <div className="pt-2 border-t border-[#E5DEC9]/40 dark:border-[#2A3B4A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#B86924]">合間の特効ツボ：</span>
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

      {/* 3. 深掘り解説：『黄帝内経』が教える五労所傷のメカニズム */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#B86924]" />
          <h4 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
            東洋医学の智慧：「同一姿勢・同一動作の継続」こそが病を生む
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          『黄帝内経』では、病は細菌やウイルスだけでなく、<strong>「日常の姿勢や動作の過度な偏り（五労）」</strong>から生じると喝破しています。
          「座るのが悪」でも「立っているのが悪」でもなく、<strong>「久しく（長時間連続して）」同じ状態を維持することが五行の循環を滞らせる根本原因</strong>です。
          疲労を感じたら、その姿勢と「正反対のベクトル（座っていたら立つ、見ていたら遠くを見る、歩いていたら休む）」を1分間差し挟むこと。
          これが東洋医学が2000年間伝え続ける最高の職業病予防法です。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 border-t border-[#E5DEC9] dark:border-[#2A3B4A] text-center text-xs">
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久視傷血</span>
            <span className="text-[10px] text-[#737C77]">目を休め遠くを見る</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久坐傷肉</span>
            <span className="text-[10px] text-[#737C77]">30分に1回立つ</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久立傷骨</span>
            <span className="text-[10px] text-[#737C77]">足踏み＆座って除圧</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久行傷筋</span>
            <span className="text-[10px] text-[#737C77]">アキレス腱ストレッチ</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold block text-[#1E3D34] dark:text-[#74BA9E]">久臥傷気</span>
            <span className="text-[10px] text-[#737C77]">窓を開けて深呼吸</span>
          </div>
        </div>
      </div>
    </div>
  );
}
