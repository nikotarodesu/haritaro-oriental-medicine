"use client";

import React, { useState } from "react";
import { 
  HeartPulse, 
  ShieldAlert, 
  Sparkles, 
  Stethoscope, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  HelpCircle,
  Pill,
  Workflow
} from "lucide-react";

export interface IntegrativeCase {
  id: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  western: {
    title: string;
    anatomyMechanism: string;
    diagnosticTools: string[];
    medications: string[];
    redFlags: string[];
    limitations: string;
  };
  oriental: {
    title: string;
    pathologyMechanism: string;
    patterns: {
      name: string;
      features: string;
      formula: string;
    }[];
    tsubos: {
      name: string;
      code: string;
      meridian: string;
      pointRole: string;
    }[];
    lifestyle: string;
  };
  matrix: {
    coreConcept: string;
    steps: {
      step: string;
      role: "西洋医学（陽）" | "東洋医学（陰）" | "東西統合（相補）";
      action: string;
      detail: string;
    }[];
    synergyEffect: string;
  };
}

export const INTEGRATIVE_CASES: IntegrativeCase[] = [
  {
    id: "gerd-gastric",
    shortTitle: "逆流性食道炎・胃痛",
    title: "逆流性食道炎・胃痛・機能性ディスペプシア",
    subtitle: "西洋の除外診断・制酸治療 × 東洋の中焦気機昇降論・辛開苦降",
    western: {
      title: "西洋医学の視点（陽：構造・病名・除外診断）",
      anatomyMechanism: "下部食道括約筋（LES）の一過性弛緩や腹圧上昇により、胃酸および十二指腸液が食道へ逆流。食道粘膜の化学的炎症（ロサンゼルス分類 Grade A-D）や知覚過敏が生じる病態。",
      diagnosticTools: [
        "上部消化管内視鏡検査（胃カメラ）：粘膜びらん、潰瘍、食道癌・胃癌の直接視認",
        "24時間pHモニタリング・食道インピーダンス検査：胃酸逆流時間率の客観的測定",
        "ピロリ菌（H. pylori）抗体・呼気検査：胃炎・潰瘍リスクの同定"
      ],
      medications: [
        "プロトンポンプ阻害薬（PPI）：胃酸分泌の最終段階を強力遮断",
        "カリウムイオン競合型アシッドブロッカー（P-CAB）：速やかで持続的な酸抑制",
        "消化管運動機能改善薬（モサプリド等）：胃排出能の促進"
      ],
      redFlags: [
        "吐血または黒色便（タール便：消化管出血の兆候）",
        "進行性の嚥下困難・つかえ感・嚥下痛",
        "意図しない急激な体重減少（悪性腫瘍の警戒）",
        "持続する激しい嘔吐や発熱",
        "50歳以上での初めての激しい胃痛・心窩部痛"
      ],
      limitations: "内視鏡検査で「粘膜に異常なし」と判定される非びらん性胃食道逆流症（NERD）や機能性ディスペプシア（FD）では、PPIの著効割合が約50〜60%にとどまり、原因不明の灼熱感やもたれが持続しやすい。"
    },
    oriental: {
      title: "東洋医学の視点（陰：機能・証・中焦気機）",
      pathologyMechanism: "中焦（ちゅうしょう：脾胃）の気機昇降失調。正常であれば「胃気は下行（降濁）」し、「脾気は上昇（昇清）」して飲食物を運化する。ストレスや冷飲食により胃気が上逆（胃気上逆）することで呑酸・胸焼け・嘔気が生じる。",
      patterns: [
        {
          name: "寒熱錯雑（かんねつさくざつ）・心下痞",
          features: "みぞおちのつかえ感、胃酸逆流（熱）と腹の冷え・軟便（寒）が混在する病態。",
          formula: "半夏瀉心湯（はんげしゃしんとう）：半夏・乾姜の辛温で痞えを開き、黄連・黄芩の苦寒で胃熱を冷ます「辛開苦降」の典型方剤。"
        },
        {
          name: "肝気犯胃（かんきはんい）",
          features: "精神的ストレス・怒り・緊張により肝の疏泄が乱れ、胃を攻撃して起こる発作性の胃痛・頻繁なゲップ。",
          formula: "四逆散（しぎゃくさん）合 安中散、柴胡疎肝散（さいこそかんさん）。"
        },
        {
          name: "脾胃虚寒（ひいきょかん）",
          features: "胃の冷え、食後の強いもたれ、温かい飲食で胃痛が和らぎ、疲労で悪化する虚弱タイプ。",
          formula: "六君子湯（りっくんしとう）、人参湯（にんじんとう）。"
        }
      ],
      tsubos: [
        { name: "中脘", code: "CV12", meridian: "任脈", pointRole: "胃の募穴・八会穴の腑会。胃気の昇降バランスを整える最重要穴。" },
        { name: "内関", code: "PC6", meridian: "手厥陰心包経", pointRole: "絡穴・八脈交会穴。迷走神経を介して嘔気・胃気上逆を強力に鎮める。" },
        { name: "足三里", code: "ST36", meridian: "足の陽明胃経", pointRole: "合穴・下合穴。消化管運動を正常化し、胃気を下行へと導く。" },
        { name: "太衝", code: "LR3", meridian: "足の厥陰肝経", pointRole: "原穴。ストレス性の肝気横逆（自律神経の過興奮）を鎮静。" }
      ],
      lifestyle: "食後2時間は横にならず上体を起こす。就寝前3時間の飲食禁止。白砂糖・脂っこい食事・炭酸・強烈な柑橘類を控え、みぞおちから腹部を冷やさない。"
    },
    matrix: {
      coreConcept: "構造的破壊を西洋医学で即時防ぎ、機能的滞りを東洋医学で根本治癒する協働モデル",
      steps: [
        {
          step: "第1段階",
          role: "西洋医学（陽）",
          action: "レッドフラッグ鑑別 ＆ 上部消化管内視鏡検査",
          detail: "まず胃癌・食道癌・急性胃潰瘍・心筋梗塞関連痛を画像と生検で完全に除外。生命の安全を最優先で確立。"
        },
        {
          step: "第2段階",
          role: "西洋医学（陽）",
          action: "急性期の強力な酸抑制（PPI / P-CAB投与）",
          detail: "びらん・潰瘍がある急性期は、粘膜損傷を食い止めるために速やかに胃酸分泌を遮断。"
        },
        {
          step: "第3段階",
          role: "東洋医学（陰）",
          action: "中焦気機の昇降回復 ＆ NERD・自律神経機能調整",
          detail: "PPI抵抗性の胸焼けや機能性ディスペプシアに対し、内関・足三里への刺鍼と半夏瀉心湯等で、胃の適応性弛緩と自律神経リズムを正常化。"
        },
        {
          step: "第4段階",
          role: "東西統合（相補）",
          action: "薬物減量 ＆ 食養生による再発ゼロ体制の維持",
          detail: "症状安定後はPPIを休薬・頓用化へ導き、東洋医学的な体質改善と生活養生で長期的な中庸状態を保つ。"
        }
      ],
      synergyEffect: "西洋医学の「急性期粘膜防御」と東洋医学の「気機昇降・自律神経回復」が噛み合うことで、難治性胃痛の寛解率が飛躍的に向上します。"
    }
  },
  {
    id: "headache-migraine",
    shortTitle: "片頭痛・緊張型頭痛",
    title: "慢性頭痛（片頭痛・緊張型頭痛・後頭神経痛）",
    subtitle: "西洋の脳血管性病態・除外診断 × 東洋の頭為諸陽之会・気血瘀滞論",
    western: {
      title: "西洋医学の視点（陽：構造・病名・除外診断）",
      anatomyMechanism: "片頭痛は三叉神経血管説（三叉神経末端からのCGRP放出による無菌性血管炎症と拡張）、緊張型頭痛は僧帽筋・頸部筋群の持続収縮と中枢感作が主因。",
      diagnosticTools: [
        "頭部MRI/CT：クモ膜下出血、脳動脈瘤、脳腫瘍、慢性硬膜下血腫の除外",
        "国際頭痛分類（ICHD-3）診断基準に基づく鑑別",
        "頭痛ダイアリーによる服薬過多・薬剤乱用頭痛（MOH）の識別"
      ],
      medications: [
        "急性期頓服薬：セロトニン1B/1D作動薬（トリプタン製剤）、NSAIDs",
        "新規予防薬：抗CGRP抗体製剤（エムガルティ等）",
        "筋弛緩薬・抗不安薬（緊張型頭痛における筋緊張緩和）"
      ],
      redFlags: [
        "「バットで殴られたような」突然の激しい頭痛（クモ膜下出血の疑い）",
        "発熱、項部硬直、意識障害を伴う頭痛（髄膜炎・脳炎）",
        "手足の麻痺、しびれ、言語障害を伴う頭痛（脳卒中）",
        "50歳以降に初めて発症した頭痛（側頭動脈炎など）",
        "がん患者や免疫不全者における新規の頭痛"
      ],
      limitations: "慢性連日性頭痛や鎮痛薬の常用による「薬剤乱用頭痛（MOH）」に陥った際、西洋薬の単独調整だけでは離脱期の苦痛を制御しにくい。"
    },
    oriental: {
      title: "東洋医学の視点（陰：機能・証・経絡気血）",
      pathologyMechanism: "「頭為諸陽之会（頭は諸陽の会す所）」「不通則痛・不栄則痛」。頭部はすべての陽経が集まる場所。肝火の上昇（肝陽上亢）や、冷え・ストレスによる血流鬱滞（瘀血）、気血不足による栄養失調で発症。",
      patterns: [
        {
          name: "肝陽上亢（かんようじょうこう）",
          features: "イライラや緊張で血圧上昇、こめかみがズキズキ拍動、目の充血や眩暈を伴う。",
          formula: "釣藤散（ちょうとうさん）、天麻鉤藤飲（てんまこうとういん）。"
        },
        {
          name: "気滞血瘀（きたいけつお）",
          features: "刺すような局所痛、夜間に悪化、頑固で慢性の首肩こりを伴う頭痛。",
          formula: "冠元顆粒（かんげんかりゅう）、桃紅四物湯（とうこうしもつとう）。"
        },
        {
          name: "風寒外襲・太陽頭痛",
          features: "風邪のひきはじめや冷えによる後頭部・首筋のこわばり痛。",
          formula: "川芎茶調散（せんきゅうちょうちょうさん）、葛根湯。"
        }
      ],
      tsubos: [
        { name: "風池", code: "GB20", meridian: "足の少陽胆経", pointRole: "後頭動脈と大後頭神経の交点。頭部の血流を一気に解放する要穴。" },
        { name: "合谷", code: "LI4", meridian: "手の陽明大腸経", pointRole: "四総穴（面目は合谷に収む）。頭面部全般の鎮痛と陽気降下。" },
        { name: "太衝", code: "LR3", meridian: "足の厥陰肝経", pointRole: "肝陽上亢を抑え、こめかみの血管拍動痛を速やかに鎮静。" },
        { name: "百会", code: "GV20", meridian: "督脈", pointRole: "頭頂部で諸陽を統括し、自律神経の交感神経過緊張を解除。" }
      ],
      lifestyle: "首の後ろを冷やさない。片頭痛の拍動時は暗く静かな部屋で安静にし局所を軽く冷やす。緊張型は肩甲骨の可動域拡大と入浴での温熱が著効。"
    },
    matrix: {
      coreConcept: "重大脳血管障害を西洋医学で即座に除外後、東洋医学で体質と血流の根本改善を行う統合体制",
      steps: [
        {
          step: "第1段階",
          role: "西洋医学（陽）",
          action: "MRI等による危険な器質性頭痛（二次性頭痛）の除外",
          detail: "くも膜下出血や脳血管奇形がないことを確定させ、安心して機能的アプローチを選択できる土台を確保。"
        },
        {
          step: "第2段階",
          role: "西洋医学（陽）",
          action: "重症片頭痛発作時のトリプタンによるシャットアウト",
          detail: "耐え難い急性拍動痛は我慢させず、トリプタンで速やかに日常生活への復帰を果たす。"
        },
        {
          step: "第3段階",
          role: "東洋医学（陰）",
          action: "鍼灸による筋緊張遮断 ＆ 釣藤散・瘀血治療",
          detail: "風池・天柱への刺鍼と漢方で後頭部・側頭部の慢性虚血を解消し、頭痛の発生頻度そのものを激減させる。"
        },
        {
          step: "第4段階",
          role: "東西統合（相補）",
          action: "薬剤乱用頭痛（MOH）の予防と自立的コンディショニング",
          detail: "毎日の鎮痛薬依存から脱却させ、天候変化やストレスに揺るがない自律神経基盤を再構築。"
        }
      ],
      synergyEffect: "西洋医学の急性発作コントロール力と東洋医学の予防的体質改善が組み合わさり、頭痛難民をゼロにします。"
    }
  },
  {
    id: "insomnia-autonomic",
    shortTitle: "不眠症・自律神経失調",
    title: "不眠症・不安障害・自律神経失調症",
    subtitle: "西洋の神経伝達物質・睡眠衛生論 × 東洋の心腎不交・神明失調論",
    western: {
      title: "西洋医学の視点（陽：構造・病名・除外診断）",
      anatomyMechanism: "視床下部の視交叉上核（体内時計）の同調不全、オレキシン系の過剰覚醒、GABA作動性抑制系の減退による中枢神経系の過覚醒状態。",
      diagnosticTools: [
        "終夜睡眠ポリグラフ検査（PSG）：睡眠時無呼吸症候群（SAS）の確定診断",
        "血液検査：甲状腺機能亢進症、貧血、副腎皮質ホルモン異常の除外",
        "アテネ不眠尺度・PHQ-9：うつ病や全般性不安症のスクリーニング"
      ],
      medications: [
        "オレキシン受容体拮抗薬（スボレキサント、レンボレキサント）：覚醒シグナル遮断",
        "メラトニン受容体作動薬（ラメルテオン）：生体リズム同調",
        "※従来のベンゾジアゼピン系薬は依存性・耐性リスクのため短期最小限使用が推奨"
      ],
      redFlags: [
        "激しいいびきと夜間の呼吸停止（重症睡眠時無呼吸症候群：心血管リスク大）",
        "重篤な抑うつ気分、希死念慮、強い焦燥感",
        "夜間の激しい動悸・胸痛・呼吸困難（心不全や不整脈の可能性）",
        "突然の日中睡眠発作（ナルコレプシー等の中枢性過眠症）"
      ],
      limitations: "睡眠薬を服用して入眠できても、「朝起きた時の深い熟睡感」や「日中のすっきりした気力」が戻らないケースが多い。"
    },
    oriental: {
      title: "東洋医学の視点（陰：機能・証・心腎陰陽）",
      pathologyMechanism: "「心腎不交（しんじんふこう）」「陽不入陰（ようふにゅういん）」。昼は陽気が体表を巡って活動し、夜は陽気が体内の陰に入って潜蔵することで睡眠が訪れる。過労やストレスで腎水が衰え心火を制御できなくなると、神（しん：精神意識）が休まらず不眠となる。",
      patterns: [
        {
          name: "心腎不交・陰虚火旺",
          features: "寝付きが悪い、寝汗、手のひらや足裏のほてり、夢が多く眠りが浅い。",
          formula: "黄連阿膠湯（おうれんあきょうとう）、知柏地黄丸（ちばくじおうがん）。"
        },
        {
          name: "心脾両虚（しんぴりょうきょ）",
          features: "思い悩みが多く、食欲不振、疲労倦怠、途中で何度も目が覚める虚弱タイプ。",
          formula: "帰脾湯（きひとう）、加味帰脾湯（かみきひとう）。"
        },
        {
          name: "肝気鬱結・肝火上炎",
          features: "仕事のプレッシャー、怒り、イライラで頭が冴え渡って全く眠れない。",
          formula: "酸棗仁湯（さんそうにんとう）、抑肝散（よくかんさん）。"
        }
      ],
      tsubos: [
        { name: "神門", code: "HT7", meridian: "手の少陰心経", pointRole: "原穴。心を養い精神不安を鎮める安神の代表穴。" },
        { name: "湧泉", code: "KI1", meridian: "足の少陰腎経", pointRole: "井木穴。頭部に昇り詰めた気と血を足元へ引き下ろし陰陽を調和。" },
        { name: "内関", code: "PC6", meridian: "手厥陰心包経", pointRole: "胸部の圧迫感や動悸を解除し、副交感神経を優位に導く。" },
        { name: "安眠", code: "EX-HN16", meridian: "奇穴", pointRole: "耳の後ろ（翳風と風池の中間）。睡眠中枢を直接穏やかにリラックス。" }
      ],
      lifestyle: "就寝前の足湯で湧泉を温める。夕方以降のカフェイン・激しい運動の禁止。寝床でのスマホ閲覧を絶ち、腹式呼吸で吐く息に意識を集中。"
    },
    matrix: {
      coreConcept: "睡眠薬への依存を避けながら、自然なサーカディアンリズムと五臓の陰陽潜蔵を取り戻す",
      steps: [
        {
          step: "第1段階",
          role: "西洋医学（陽）",
          action: "睡眠時無呼吸（SAS）やうつ病など重大疾患のスクリーニング",
          detail: "身体的・器質的な睡眠障害を特定し、心筋梗塞や重度精神疾患の併発リスクを排除。"
        },
        {
          step: "第2段階",
          role: "西洋医学（陽）",
          action: "安全性の高いオレキシン拮抗薬等で睡眠負債を一時リセット",
          detail: "極度の睡眠不足による中枢疲労を食い止めるため、依存性の極めて低い薬剤でまずは睡眠時間を確保。"
        },
        {
          step: "第3段階",
          role: "東洋医学（陰）",
          action: "鍼灸による自律神経調律 ＆ 酸棗仁湯・帰脾湯による心神安寧",
          detail: "神門・湧泉・安眠穴への刺鍼や温灸で、交感神経緊張を解き、体が自ら「夜に陰へ潜る」機能を回復。"
        },
        {
          step: "第4段階",
          role: "東西統合（相補）",
          action: "薬剤漸減・休薬と「ぐっすり眠れる体質」への定着",
          detail: "入眠薬をスムーズに手放し、自然な目覚めと日中の活力に満ちた生活へ軟着陸。"
        }
      ],
      synergyEffect: "薬で無理やり眠らせるのではなく、「自ら眠り、爽快に目覚める力」を身体に再学習させます。"
    }
  }
];

interface Props {
  initialCaseId?: string;
  defaultViewMode?: "western" | "oriental" | "matrix";
  className?: string;
}

export default function EastWestIntegrativeSwitch({
  initialCaseId = "gerd-gastric",
  defaultViewMode = "western",
  className = ""
}: Props) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCaseId);
  const [viewMode, setViewMode] = useState<"western" | "oriental" | "matrix">(defaultViewMode);

  const currentCase = INTEGRATIVE_CASES.find((c) => c.id === selectedCaseId) || INTEGRATIVE_CASES[0];

  return (
    <div className={`bg-white dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm overflow-hidden transition-all duration-300 ${className}`}>
      {/* 統合ヘッダー帯 */}
      <div className="bg-gradient-to-r from-[#1E2D3D] via-[#1E3D34] to-[#B86924] p-5 sm:p-7 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[11px] font-bold tracking-wider backdrop-blur-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E6C387]" />
              陰陽論第8節 相補マトリクス
            </span>
            <span className="text-xs text-white/80 hidden sm:inline">
              西洋医学（陽）× 東洋医学（陰）
            </span>
          </div>

          {/* 症例プリセットセレクター */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl backdrop-blur-sm">
            {INTEGRATIVE_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCaseId === c.id
                    ? "bg-white text-[#1E3D34] shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {c.shortTitle}
              </button>
            ))}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
          {currentCase.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/85 mt-1 leading-relaxed">
          {currentCase.subtitle}
        </p>
      </div>

      {/* モード切り替えスイッチ（トグル） */}
      <div className="p-4 sm:p-6 bg-[#FAF8F5] dark:bg-[#121920] border-b border-[#E8E1D1] dark:border-[#22303D]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] flex items-center gap-1.5">
            <Workflow className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>医学視点切り替えスイッチ：</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 bg-white dark:bg-[#1A2530] p-1.5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-inner max-w-lg w-full sm:w-auto">
            {/* 西洋医学（陽） */}
            <button
              onClick={() => setViewMode("western")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === "western"
                  ? "bg-[#C45A4A] text-white shadow-md"
                  : "text-[#C45A4A] dark:text-[#F87171] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 shrink-0" />
              <span>西洋医学（陽）</span>
            </button>

            {/* 東洋医学（陰） */}
            <button
              onClick={() => setViewMode("oriental")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === "oriental"
                  ? "bg-[#1E3D34] text-white shadow-md"
                  : "text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#182823]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>東洋医学（陰）</span>
            </button>

            {/* 相補マトリクス（統合） */}
            <button
              onClick={() => setViewMode("matrix")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === "matrix"
                  ? "bg-[#B86924] text-white shadow-md"
                  : "text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>相補マトリクス</span>
            </button>
          </div>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div className="p-6 sm:p-8">
        {/* ================= 1. 西洋医学ビュー（陽） ================= */}
        {viewMode === "western" && (
          <div className="space-y-6 animate-fadeIn">
            {/* バナー標語 */}
            <div className="p-4 rounded-2xl bg-[#FCF4EB] dark:bg-[#221814] border border-[#F3E1CB] dark:border-[#422C22] flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C45A4A] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#C45A4A] dark:text-[#F87171] uppercase tracking-wider">
                  陽の役割：構造特定・病名確定・急性期遮断・レッドフラッグ除外
                </span>
                <h4 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentCase.western.title}
                </h4>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  局所解剖学と要素還元論に基づき、患部の器質的異常を客観的検査で同定。標準的ガイドラインに準拠した薬物治療を実施します。
                </p>
              </div>
            </div>

            {/* 病態機序 */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="text-xs font-bold text-[#C45A4A] dark:text-[#F87171] flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5" />
                解剖生理・構造的メカニズム
              </span>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                {currentCase.western.anatomyMechanism}
              </p>
            </div>

            {/* 診断武器と標準薬物 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 診断機器 */}
              <div className="bg-white dark:bg-[#1A2530] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
                <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  客観的診断ツール・検査項目
                </span>
                <ul className="space-y-2 text-xs text-[#404743] dark:text-[#C5D2DB]">
                  {currentCase.western.diagnosticTools.map((tool, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 薬物 */}
              <div className="bg-white dark:bg-[#1A2530] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5" />
                  第一選択となる標準薬物群
                </span>
                <ul className="space-y-2 text-xs text-[#404743] dark:text-[#C5D2DB]">
                  {currentCase.western.medications.map((med, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{med}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* レッドフラッグ（除外診断アラート） */}
            <div className="p-5 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-900/50 space-y-3">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-serif font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>【最重要】医療従事者が厳守すべき除外診断（レッドフラッグ）</span>
              </div>
              <p className="text-xs text-red-900/80 dark:text-red-300/80 leading-relaxed">
                以下のサインが1つでもある場合、東洋医学的アプローチ（鍼灸・漢方）に固執せず、直ちに消化器内科・高次救急医療機関での精密検査を最優先してください。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-800 dark:text-red-300">
                {currentCase.western.redFlags.map((flag, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-white/70 dark:bg-black/30 p-2 rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="font-medium">{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 西洋医学の限界・死角 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs text-[#59615D] dark:text-[#96A6B2] space-y-1">
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">
                西洋医学単独での臨床的限界・死角：
              </span>
              <p className="leading-relaxed">
                {currentCase.western.limitations}
              </p>
            </div>
          </div>
        )}

        {/* ================= 2. 東洋医学ビュー（陰） ================= */}
        {viewMode === "oriental" && (
          <div className="space-y-6 animate-fadeIn">
            {/* バナー標語 */}
            <div className="p-4 rounded-2xl bg-[#EBF3EF] dark:bg-[#15231E] border border-[#D1E3D9] dark:border-[#253D34] flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1E3D34] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
                  陰の役割：機能調整・証の鑑別・気機昇降回復・根本体質改善
                </span>
                <h4 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentCase.oriental.title}
                </h4>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  人体を不可分の生命ネットワークと捉え、「気・血・水」と「臓腑の昇降機能」の乱れを弁証論治。未病治と動的平衡の回復を図ります。
                </p>
              </div>
            </div>

            {/* 病態機序 */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                東洋医学的病理・気機昇降メカニズム
              </span>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                {currentCase.oriental.pathologyMechanism}
              </p>
            </div>

            {/* 弁証と証・方剤の鑑別 */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
                代表的な「証」の鑑別と漢方方剤
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentCase.oriental.patterns.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-2"
                  >
                    <div className="font-serif font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-1.5">
                      {pat.name}
                    </div>
                    <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                      {pat.features}
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-0.5">
                        推奨方剤：
                      </span>
                      <p className="text-xs font-medium text-[#232826] dark:text-[#FAF8F5]">
                        {pat.formula}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 特効ツボ（経穴） */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
                臨床で著効を示す4大特効ツボ（配穴の妙）
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {currentCase.oriental.tsubos.map((tsubo, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                        {tsubo.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                        {tsubo.code}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8A948F] dark:text-[#6A7C8B] block">
                      {tsubo.meridian}
                    </span>
                    <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed pt-1">
                      {tsubo.pointRole}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 養生指導 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs text-[#59615D] dark:text-[#96A6B2] space-y-1">
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">
                生活養生・食養生の急所：
              </span>
              <p className="leading-relaxed">
                {currentCase.oriental.lifestyle}
              </p>
            </div>
          </div>
        )}

        {/* ================= 3. 相補マトリクスビュー（統合） ================= */}
        {viewMode === "matrix" && (
          <div className="space-y-6 animate-fadeIn">
            {/* バナー標語 */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FCF4EB] to-[#EBF3EF] dark:from-[#221814] dark:to-[#15231E] border border-[#E8E1D1] dark:border-[#22303D] flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#B86924] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                  統合医療の真髄：対立ではなく「歯車が噛み合う役割分担」
                </span>
                <h4 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentCase.matrix.coreConcept}
                </h4>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  急性期や構造的危険は西洋医学が主導し、慢性期の機能失調や体質改善は東洋医学が主導。患者にとって最も安全で再発のない治療ロードマップを構築します。
                </p>
              </div>
            </div>

            {/* 4段階の統合治療ステップ */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] uppercase tracking-wider block">
                東西医学が連動するシームレス治療プロトコル
              </span>
              <div className="grid grid-cols-1 gap-3">
                {currentCase.matrix.steps.map((st, idx) => {
                  const isWestern = st.role.includes("西洋");
                  const isOriental = st.role.includes("東洋");
                  const badgeColor = isWestern 
                    ? "bg-[#FCF4EB] text-[#C45A4A] border-[#F3E1CB]"
                    : isOriental 
                    ? "bg-[#EBF3EF] text-[#1E3D34] dark:text-[#74BA9E] border-[#D1E3D9]"
                    : "bg-[#FCF4EB] text-[#B86924] border-[#F3E1CB]";

                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-center font-mono font-bold text-xs text-[#232826] dark:text-[#FAF8F5]">
                          {idx + 1}
                        </span>
                        <div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                            {st.role}
                          </span>
                          <h5 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mt-1">
                            {st.action}
                          </h5>
                        </div>
                      </div>

                      <div className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed md:max-w-md border-t md:border-t-0 md:border-l border-[#F2ECE0] dark:border-[#22303D] pt-3 md:pt-0 md:pl-4">
                        {st.detail}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 相乗効果総括 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex items-center gap-3">
              <Check className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] leading-relaxed">
                相乗効果：{currentCase.matrix.synergyEffect}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* フッターナビゲート */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] px-6 py-4 border-t border-[#E8E1D1] dark:border-[#22303D] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#59615D] dark:text-[#96A6B2]">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
          <span>『黄帝内経素問』陰陽応象大論 ＆ 現代消化器病学会ガイドライン準拠</span>
        </div>
        <div className="flex items-center gap-1 text-[#1E3D34] dark:text-[#74BA9E] font-medium">
          <span>医療連携モデル：除外診断優先 × 証治根本改善</span>
        </div>
      </div>
    </div>
  );
}
