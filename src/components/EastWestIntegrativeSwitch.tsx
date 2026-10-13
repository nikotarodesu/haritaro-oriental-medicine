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
  Workflow,
  X,
  BookOpen,
  Compass
} from "lucide-react";
import Link from "next/link";
import ClipButton from "@/components/ClipButton";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";

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
    redFlagAdvice: string;
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
  evidenceSources: { title: string; url: string; scope: string }[];
  matrix: {
    coreConcept: string;
    steps: {
      step: string;
      role: "西洋医学" | "東洋医学" | "東西統合（相補）";
      action: string;
      detail: string;
    }[];
    synergyEffect: string;
  };
}

export const INTEGRATIVE_CASES: IntegrativeCase[] = [
  {
    "id": "gerd-gastric",
    "shortTitle": "逆流性食道炎・胃痛",
    "title": "逆流性食道炎・胃痛・機能性ディスペプシア",
    "subtitle": "GERDと機能性ディスペプシアの評価・治療と、伝統的な脾胃の説明を比較する",
    "western": {
      "title": "医学的な評価：逆流症状と食後の上腹部症状",
      "anatomyMechanism": "胃食道逆流症（GERD）は胃内容物の食道への逆流によって症状や粘膜傷害が生じる病態です。機能性ディスペプシア（FD）は、食後のもたれ・早期満腹感・心窩部痛などを生じる別の病態で、胃の適応性弛緩や知覚、腸と脳の相互作用などの関与が研究されています。胃痛を一律に胃酸の過剰や自律神経の異常とは判断しません。",
      "diagnosticTools": [
        "問診・診察：胸焼け、食後症状、発症・悪化の経過、服薬と危険徴候を確認します。",
        "上部消化管内視鏡：嚥下困難、出血、体重減少などの警告症状や、経過に応じて医師が適応を判断します。",
        "必要に応じた逆流モニタリング・H. pylori検査：正常な内視鏡だけでは症状の原因を確定できません。胸部症状では心疾患の評価も先に考えます。"
      ],
      "medications": [
        "GERDの酸抑制治療：PPIなどを用い、症状と粘膜傷害の改善を評価します。薬剤・量・期間は病態に応じて医師が決めます。",
        "FDの治療：原因・H. pylori感染・これまでの反応などを評価し、GERDと同じ処方を自動的に当てはめません。"
      ],
      "redFlags": [
        "吐血・黒色便、強く続く腹痛、繰り返す嘔吐",
        "進行する飲み込みにくさ、飲み込むときの痛み",
        "意図しない体重減少や食欲低下",
        "胸の圧迫感・冷汗・急な息苦しさを伴う痛み"
      ],
      "limitations": "症状が続く場合は、服薬の状況、逆流の有無、FDやその他の原因を再評価します。有効性を比べる際は、対象となる病態と評価指標をそろえます。PPIに反応しないことだけで、鍼灸や漢方の適応と判断しません。",
      "redFlagAdvice": "吐血、強い腹痛、胸の圧迫感や急な息苦しさなどは119番への連絡を優先します。進行する嚥下困難や体重減少も速やかに受診してください。内視鏡・画像・生検ですべての危険な原因を完全に除外できるわけではありません。"
    },
    "oriental": {
      "title": "伝統理論の学習：脾胃・肝と気機の関係",
      "pathologyMechanism": "伝統理論では、飲食物の受納・運化と、胃気の下降・脾気の上昇を関連づけます。「胃気上逆」「肝気犯胃」などは症状を整理する伝統用語で、酸逆流の検査結果や自律神経活動の測定値と同じものではありません。",
      "patterns": [
        {
          "name": "寒熱錯雑（かんねつさくざつ）・心下痞",
          "features": "みぞおちのつかえ感、胸焼け、腹部の冷え、軟便などを寒・熱の両面から比較する伝統的な説明。症状だけで寒熱錯雑や病名を確定しません。",
          "formula": "半夏瀉心湯（はんげしゃしんとう）：半夏・乾姜の辛温で痞えを開き、黄連・黄芩の苦寒で胃熱を冷ます「辛開苦降」の典型方剤。"
        },
        {
          "name": "肝気犯胃（かんきはんい）",
          "features": "ストレスを感じる時期と胃痛・げっぷの経過を関連づけて検討する伝統的な候補。肝臓が胃を攻撃するという解剖学的な機序ではありません。",
          "formula": "四逆散（しぎゃくさん）合 安中散、柴胡疎肝散（さいこそかんさん）。"
        },
        {
          "name": "脾胃虚寒（ひいきょかん）",
          "features": "冷え、食後のもたれ、疲れやすさなどを不足・寒の観点で比較する伝統的な候補。症状の医学的原因は別に評価します。",
          "formula": "六君子湯（りっくんしとう）、人参湯（にんじんとう）。"
        }
      ],
      "tsubos": [
        {
          "name": "中脘",
          "code": "CV12",
          "meridian": "任脈",
          "pointRole": "胃の募穴・八会穴の腑会として学びます。胃疾患への効果をこの経穴単独で保証する資料ではありません。"
        },
        {
          "name": "内関",
          "code": "PC6",
          "meridian": "手厥陰心包経",
          "pointRole": "絡穴・八脈交会穴として学びます。この胃痛教材から、迷走神経を介した効果や酸逆流の抑制を確定しません。"
        },
        {
          "name": "足三里",
          "code": "ST36",
          "meridian": "足の陽明胃経",
          "pointRole": "合穴・下合穴として学びます。FDの研究に用いられる配穴と、単独の経穴の効果は区別します。"
        },
        {
          "name": "太衝",
          "code": "LR3",
          "meridian": "足の厥陰肝経",
          "pointRole": "原穴として学びます。「肝気」を自律神経の過興奮の同義語とは扱いません。"
        }
      ],
      "lifestyle": "GERDでは就寝の2〜3時間前の食事を避け、夜間症状がある場合は寝床の頭側を高くする方法などを検討します。食品を一律に禁止せず、本人の症状との関係を記録します。FDの食事調整も、栄養状態や症状に応じて医療者と相談します。"
    },
    "matrix": {
      "coreConcept": "胃痛・胸焼けの原因と危険徴候を評価し、GERD・FDの治療と、併用する方法の研究根拠を区別する",
      "steps": [
        {
          "step": "第1段階",
          "role": "西洋医学",
          "action": "危険徴候と原因を、症状に合う診察・検査で評価する",
          "detail": "吐血・黒色便、嚥下困難、体重減少などを評価します。胸の圧迫感や急な息苦しさでは心疾患も考え、119番への連絡を優先します。内視鏡や生検の適応は医師が判断し、一つの検査で全疾患の除外を保証しません。"
        },
        {
          "step": "第2段階",
          "role": "西洋医学",
          "action": "診断と症状に応じた治療の反応を評価する",
          "detail": "GERDではPPIなどによる酸抑制が治療の選択肢です。FDは食後症状などを評価する別の病態で、酸抑制に反応しないことだけから伝統的な証や鍼灸の適応を決めません。"
        },
        {
          "step": "第3段階",
          "role": "東洋医学",
          "action": "FDの鍼治療研究を、対象・比較・期間から読む",
          "detail": "Yangら（2020）は中国の18〜65歳の食後愁訴症候群278人で、4週間・12回の鍼治療と偽鍼を比較しました。4週時の全体的な症状改善の推定反応率は83.0%対51.6%でした。GERD全般、特定の経穴単独、半夏瀉心湯との併用効果を調べた試験ではありません。"
        },
        {
          "step": "第4段階",
          "role": "東西統合（相補）",
          "action": "症状・生活への影響と、薬の継続条件を再評価する",
          "detail": "PPIの継続・減量・頓用化は処方医が病態を踏まえて判断します。重い逆流性食道炎などでは維持治療が必要な場合があります。症状が安定したことや併用療法だけを理由に、薬を自己判断で中止しません。"
        }
      ],
      "synergyEffect": "FDの鍼治療には偽鍼と比べた症状改善を示した試験がありますが、研究の反応率は治癒率ではありません。施術者の盲検化不能や脱落などの限界もあり、この画面の配穴と漢方の併用による相乗効果・根本治癒・再発ゼロを示した結果ではありません。"
    },
    "evidenceSources": [
      {
        "title": "ACG：GERD診療ガイドライン（2022）",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/8754510/",
        "scope": "検査・酸抑制・生活調整・維持治療の条件。"
      },
      {
        "title": "NIH NIDDK：ディスペプシアの症状と原因",
        "url": "https://www.niddk.nih.gov/health-information/digestive-diseases/indigestion-dyspepsia/symptoms-causes",
        "scope": "GERDとFDの区別、病態と警告症状。"
      },
      {
        "title": "Yangら：食後愁訴症候群の鍼治療RCT（2020）",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32422066/",
        "scope": "成人278人、4週間12回、偽鍼比較。反応率は症状の全体評価で、治癒率ではない。"
      }
    ]
  },
  {
    "id": "headache-migraine",
    "shortTitle": "片頭痛・緊張型頭痛",
    "title": "慢性頭痛（片頭痛・緊張型頭痛・後頭神経痛）",
    "subtitle": "頭痛の医学的な評価・急性期治療・予防と、伝統的な分類を比較する",
    "western": {
      "title": "医学的な評価：頭痛の特徴と二次性頭痛",
      "anatomyMechanism": "成人の片頭痛は典型的には4〜72時間続く中等度〜重度の頭痛で、拍動性、日常動作による悪化、吐き気や光・音への過敏などが判断材料になります。緊張型頭痛は両側性の締め付ける痛みが典型で、日常動作では悪化しにくい特徴があります。症状の経過と診察から分類し、血流不足や首肩の筋収縮だけで原因を説明しません。",
      "diagnosticTools": [
        "発症の速さ、随伴症状、神経学的所見などを診察し、危険な二次性頭痛を評価します。",
        "頭痛の特徴・持続時間・頻度と国際頭痛分類などを照合します。必要な画像検査は症状・所見に応じて医師が判断します。",
        "頭痛日記：頭痛の日数、日常生活への影響、急性期薬の使用日数を記録します。"
      ],
      "medications": [
        "片頭痛の急性期治療：トリプタンやNSAIDsなどを、持病・服薬・禁忌に応じて医師が選びます。",
        "予防治療：頭痛頻度、生活への支障、本人の希望に応じて検討します。必要性と反応は継続して見直します。",
        "鎮痛薬を頻回に使う場合は、薬剤の使用過多による頭痛を評価します。使用日数と期間、薬剤の種類を確認します。"
      ],
      "redFlags": [
        "「バットで殴られたような」突然の激しい頭痛（クモ膜下出血の疑い）",
        "発熱、項部硬直、意識障害を伴う頭痛（髄膜炎・脳炎）",
        "手足の麻痺、しびれ、言語障害を伴う頭痛（脳卒中）",
        "50歳以降に初めて発症した頭痛（側頭動脈炎など）",
        "がん患者や免疫不全者における新規の頭痛"
      ],
      "limitations": "急性期薬で痛みが軽くなっても、頭痛頻度や生活への影響が改善したとは限りません。薬剤使用過多による頭痛では、使用薬の調整と元の頭痛の予防、短期的な悪化への支援を医師と計画します。「依存」と一括して扱いません。",
      "redFlagAdvice": "突然始まった激しい頭痛、急な麻痺・話しにくさ・意識の変化などは119番への連絡を優先します。発熱を伴う頭痛や、新しく進行する普段と異なる頭痛も速やかに医療評価を受けてください。過去の正常な画像だけで、今回の安全性を保証しません。"
    },
    "oriental": {
      "title": "伝統理論の学習：頭痛の部位・気血・臓腑の関係",
      "pathologyMechanism": "「頭為諸陽之会」「不通則痛・不栄則痛」は、頭部と経絡、巡りや養いの関係を説明する伝統的な表現です。肝陽上亢や瘀血などは分類候補であり、脳血流の異常、血栓、栄養失調を確認した医学的診断ではありません。",
      "patterns": [
        {
          "name": "肝陽上亢（かんようじょうこう）",
          "features": "頭痛とめまい、目の赤み、情緒との関係などを比較する伝統的な候補。血圧上昇の有無や原因は実際の測定と医学的評価で確認します。",
          "formula": "釣藤散（ちょうとうさん）、天麻鉤藤飲（てんまこうとういん）。"
        },
        {
          "name": "気滞血瘀（きたいけつお）",
          "features": "固定した痛み、夜間の変化、首肩の症状などを比較する伝統的な候補。瘀血は血栓や慢性虚血の同義語ではありません。",
          "formula": "冠元顆粒（かんげんかりゅう）、桃紅四物湯（とうこうしもつとう）。"
        },
        {
          "name": "風寒外襲・太陽頭痛",
          "features": "悪寒、後頭部や首筋の痛みなどを比較する伝統的な候補。発熱・項部硬直・意識の変化などの医療評価を遅らせません。",
          "formula": "川芎茶調散（せんきゅうちょうちょうさん）、葛根湯。"
        }
      ],
      "tsubos": [
        {
          "name": "風池",
          "code": "GB20",
          "meridian": "足の少陽胆経",
          "pointRole": "後頭部の経穴として学びます。頭部の血流を解放することや、後頭神経痛の治療効果をこの説明から保証しません。"
        },
        {
          "name": "合谷",
          "code": "LI4",
          "meridian": "手の陽明大腸経",
          "pointRole": "四総穴の「面目は合谷に収む」という伝統的な選定理由を学びます。顔・頭のすべての痛みへの効果の保証ではありません。"
        },
        {
          "name": "太衝",
          "code": "LR3",
          "meridian": "足の厥陰肝経",
          "pointRole": "原穴として学び、肝陽上亢などの伝統的な候補との関係を比較します。経穴単独で発作を速やかに止める根拠としては扱いません。"
        },
        {
          "name": "百会",
          "code": "GV20",
          "meridian": "督脈",
          "pointRole": "督脈の経穴として学びます。交感神経の過緊張を測定・解除したことを、この分類から判断しません。"
        }
      ],
      "lifestyle": "頭痛日記で睡眠・生活・服薬と症状の関係を記録します。発作時に光や音がつらければ静かな環境で休むなど、本人に合う対応を医療者と相談します。入浴や温める方法を、すべての頭痛に著効する対処とは説明しません。"
    },
    "matrix": {
      "coreConcept": "二次性頭痛の評価を優先し、片頭痛・緊張型頭痛の急性期治療と予防の選択肢を検討する",
      "steps": [
        {
          "step": "第1段階",
          "role": "西洋医学",
          "action": "新しい危険徴候と、今回の症状を評価する",
          "detail": "突然の激しい頭痛、麻痺、意識の変化などでは救急対応を優先します。画像検査は必要性に応じて医師が選び、正常なMRI一回だけで全疾患を完全に除外したとは判断しません。"
        },
        {
          "step": "第2段階",
          "role": "西洋医学",
          "action": "片頭痛発作に対する薬剤の適否と反応を確認する",
          "detail": "トリプタンやNSAIDsなどの急性期薬を、持病・他の薬・これまでの反応から選びます。使用後の痛みと生活への影響を確認し、全員が速やかに日常生活へ復帰できるとは保証しません。"
        },
        {
          "step": "第3段階",
          "role": "東洋医学",
          "action": "鍼治療の予防研究を、対象と施術条件から読む",
          "detail": "Xuら（2020）は中国の15〜65歳の、鍼治療経験がない前兆のない反復性片頭痛150人で、8週間・20回の手技鍼と非刺入偽鍼などを比較しました。17〜20週の4週間当たりの片頭痛日数減少は3.9日対2.2日、調整後の群間差は2.1日でした。頭痛全般、単独の経穴、漢方との相乗効果を検証した結果ではありません。"
        },
        {
          "step": "第4段階",
          "role": "東西統合（相補）",
          "action": "薬剤乱用頭痛（MOH）の予防と自立的コンディショニング",
          "detail": "頭痛日数と急性期薬の使用日数を記録し、薬剤使用過多による頭痛の可能性と予防治療を医師と検討します。減薬が必要な場合も、薬剤の種類や本人の状態に合わせた計画と経過確認が必要です。"
        }
      ],
      "synergyEffect": "片頭痛の鍼治療は発作予防の選択肢として研究されています。英国NICEでは一定の予防薬が無効・不耐容・不適切な場合に鍼治療を検討します。薬との併用による効果の上乗せや再発ゼロは、この研究と図からは示せません。"
    },
    "evidenceSources": [
      {
        "title": "NICE CG150：頭痛の診断と治療（2025年更新）",
        "url": "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations",
        "scope": "危険徴候、急性期・予防治療、薬剤使用過多による頭痛。英国の推奨であり国内の処方指示ではない。"
      },
      {
        "title": "Xuら：片頭痛予防の手技鍼RCT（2020）",
        "url": "https://www.bmj.com/content/368/bmj.m697",
        "scope": "150人、8週間20回。17〜20週の4週間当たりの日数の群間差は調整後−2.1日、95%信頼区間−2.9〜−1.2日。"
      }
    ]
  },
  {
    "id": "insomnia-autonomic",
    "shortTitle": "不眠と日中の支障",
    "title": "慢性不眠の評価と治療、伝統的な不眠の説明",
    "subtitle": "不眠の評価・CBT-I・薬物療法と、心腎などの伝統用語を比較する",
    "western": {
      "title": "医学的な評価：睡眠の機会・経過と日中の支障",
      "anatomyMechanism": "慢性不眠では、十分な睡眠の機会があるのに寝つけない・途中や早朝に目が覚めるなどの問題があり、日中の生活に支障が生じます。週3晩以上・3か月以上は診断で確認する条件です。過覚醒や体内時計、行動・心理要因などが関わりますが、全員をオレキシン過剰やGABA低下と判断するものではありません。",
      "diagnosticTools": [
        "問診・睡眠日誌：寝床にいる時間、入眠、覚醒、日中の眠気・支障、薬・飲酒などを確認します。",
        "質問票：不眠の程度や併存する症状を整理します。質問票だけで病名や自律神経活動を確定しません。",
        "いびき・無呼吸、むずむず脚、うつ症状などを評価し、疑いに応じて睡眠検査・採血を検討します。全員にPSGやホルモン検査を一律に行うものではありません。"
      ],
      "medications": [
        "慢性不眠の治療では、不眠の認知行動療法（CBT-I）をまず検討します。睡眠衛生の説明だけを単独治療とすることとは異なります。",
        "薬が必要な場合は、オレキシン受容体拮抗薬などの選択肢について、効果・翌日の眠気・持病・併用薬を医師と確認します。",
        "薬の量や中止方法は処方医と相談し、特に継続服用中の薬を自己判断で急に中止しません。"
      ],
      "redFlags": [
        "激しいいびきと夜間の呼吸停止（重症睡眠時無呼吸症候群：心血管リスク大）",
        "重篤な抑うつ気分、希死念慮、強い焦燥感",
        "夜間の激しい動悸・胸痛・呼吸困難（心不全や不整脈の可能性）",
        "突然の日中睡眠発作（ナルコレプシー等の中枢性過眠症）"
      ],
      "limitations": "入眠時間や途中覚醒の改善と、翌日の眠気・集中力・生活機能は分けて評価します。睡眠薬で全員が熟睡感を得られるとは限らず、薬の作用、睡眠機会、他の睡眠障害などを見直します。",
      "redFlagAdvice": "胸痛・急な呼吸困難・意識の変化などが今ある場合は119番への連絡を優先します。自分を傷つけるおそれが切迫している場合も直ちに救急へつなぎます。いびきと呼吸停止、強い日中の眠気、持続する抑うつなどは速やかに医療機関へ相談してください。"
    },
    "oriental": {
      "title": "伝統理論の学習：心腎不交・陰陽と神の関係",
      "pathologyMechanism": "「心腎不交」「陽不入陰」は、睡眠と臓腑・陰陽の関係を説明する伝統用語です。心火・腎水・神を、オレキシン、GABA、交感・副交感神経などの測定値へ一対一に対応させません。不眠の医学的な原因や治療は、睡眠の経過と必要な診察で検討します。",
      "patterns": [
        {
          "name": "心腎不交・陰虚火旺",
          "features": "寝付きが悪い、寝汗、手のひらや足裏のほてり、夢が多く眠りが浅い。",
          "formula": "黄連阿膠湯（おうれんあきょうとう）、知柏地黄丸（ちばくじおうがん）。"
        },
        {
          "name": "心脾両虚（しんぴりょうきょ）",
          "features": "思い悩みが多く、食欲不振、疲労倦怠、途中で何度も目が覚める虚弱タイプ。",
          "formula": "帰脾湯（きひとう）、加味帰脾湯（かみきひとう）。"
        },
        {
          "name": "肝気鬱結・肝火上炎",
          "features": "仕事のプレッシャー、怒り、イライラで頭が冴え渡って全く眠れない。",
          "formula": "酸棗仁湯（さんそうにんとう）、抑肝散（よくかんさん）。"
        }
      ],
      "tsubos": [
        {
          "name": "神門",
          "code": "HT7",
          "meridian": "手の少陰心経",
          "pointRole": "原穴で、安神という伝統的な目的と関連づけて学びます。不眠の原因や睡眠中枢への作用を確定した説明ではありません。"
        },
        {
          "name": "湧泉",
          "code": "KI1",
          "meridian": "足の少陰腎経",
          "pointRole": "井木穴で、陰陽の関係を学ぶ経穴例です。気血を足元へ物理的に移動させることを測定した資料ではありません。"
        },
        {
          "name": "内関",
          "code": "PC6",
          "meridian": "手厥陰心包経",
          "pointRole": "絡穴・八脈交会穴として学びます。動悸や胸部症状を経穴で先に処置し、必要な医療評価を遅らせません。"
        },
        {
          "name": "安眠",
          "code": "EX-HN16",
          "meridian": "奇穴",
          "pointRole": "耳の後ろにある奇穴として紹介します。睡眠中枢への直接作用や不眠治療の効果を、この位置説明から保証しません。"
        }
      ],
      "lifestyle": "起床時刻や睡眠・日中の活動を記録し、就寝直前のカフェイン、飲酒、強い光などとの関係を確認します。慢性不眠ではこれらの工夫だけで十分とは限らず、CBT-Iなどの治療を相談します。足湯や呼吸法で治癒・減薬できるとは保証しません。"
    },
    "matrix": {
      "coreConcept": "不眠と日中の支障、併存する睡眠・身体・精神の問題を評価し、CBT-Iを中心に治療の選択肢を検討する",
      "steps": [
        {
          "step": "第1段階",
          "role": "西洋医学",
          "action": "睡眠の経過と、併存する病態・安全性を確認する",
          "detail": "睡眠の機会、いびき・呼吸停止、日中の眠気、抑うつ、薬・飲酒などを確認します。診察や必要な検査へつなぎ、一度のスクリーニングで重大疾患や将来のリスクを排除したとは扱いません。"
        },
        {
          "step": "第2段階",
          "role": "西洋医学",
          "action": "CBT-Iを検討し、必要なら薬の利益と不利益を相談する",
          "detail": "CBT-Iは睡眠に関する考え方、刺激制御、睡眠時間の調整などを組み合わせた治療です。薬が必要な場合も、他の睡眠障害や翌日の眠気、併用薬を評価します。「睡眠負債をリセット」「一律に安全」とは説明しません。"
        },
        {
          "step": "第3段階",
          "role": "東洋医学",
          "action": "鍼灸などの併用は、研究の質と評価項目を確認する",
          "detail": "NCCIHが紹介する不眠の鍼治療研究では、施術回数・経穴選択などが異なり、研究の質にも限界があります。この画面の神門・湧泉・安眠の配穴で、睡眠中枢や自律神経の機能が回復するとは確定できません。"
        },
        {
          "step": "第4段階",
          "role": "東西統合（相補）",
          "action": "睡眠と日中の状態を比べ、継続・変更を相談する",
          "detail": "入眠までの時間、途中覚醒、睡眠の満足度、翌日の眠気や生活への支障を比較します。薬の変更・中止は処方医と相談し、鍼灸を受ければ睡眠薬をやめられるとは保証しません。"
        }
      ],
      "synergyEffect": "慢性不眠ではCBT-Iが推奨され、睡眠衛生の助言だけとは区別します。鍼灸と漢方の併用によってCBT-Iや薬物療法を上回ること、この画面の配穴で減薬できることを示す根拠は掲載していません。"
    },
    "evidenceSources": [
      {
        "title": "AASM：慢性不眠の行動・心理治療ガイドライン（2021）",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7853203/",
        "scope": "複数の要素を組み合わせたCBT-Iを強く推奨。睡眠衛生だけの単独治療とは異なる。"
      },
      {
        "title": "VA/DoD：慢性不眠・睡眠時無呼吸ガイドライン（2025）",
        "url": "https://healthquality.va.gov/HEALTHQUALITY/guidelines/CD/insomnia/I-OSA-CPG_2025-Guideline_final_20250915.pdf",
        "scope": "診断で確認する条件、併存病態と薬物療法前の評価。"
      },
      {
        "title": "NIH NCCIH：睡眠障害と補完療法",
        "url": "https://www.nccih.nih.gov/health/sleep-disorders-and-complementary-health-approaches",
        "scope": "不眠の鍼治療は研究間の違い・質に限界がある。特定配穴の治癒や減薬を保証しない。"
      }
    ]
  }
];

const getMeridianElement = (meridian: string): ("木" | "火" | "土" | "金" | "水")[] => {
  if (meridian.includes("肝") || meridian.includes("胆")) return ["木"];
  if (meridian.includes("心") || meridian.includes("小腸") || meridian.includes("三焦")) return ["火"];
  if (meridian.includes("脾") || meridian.includes("胃")) return ["土"];
  if (meridian.includes("肺") || meridian.includes("大腸")) return ["金"];
  if (meridian.includes("腎") || meridian.includes("膀胱")) return ["水"];
  return [];
};

interface Props {
  initialCaseId?: string;
  defaultViewMode?: "western" | "oriental" | "matrix";
  className?: string;
}

export default function EastWestIntegrativeSwitch({
  initialCaseId = "headache-migraine",
  defaultViewMode = "oriental",
  className = ""
}: Props) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCaseId);
  const [viewMode, setViewMode] = useState<"western" | "oriental" | "matrix">(defaultViewMode);
  const [selectedTsuboDetail, setSelectedTsuboDetail] = useState<Tsubo | null>(null);

  React.useEffect(() => {
    setSelectedCaseId(initialCaseId);
  }, [initialCaseId]);

  const currentCase = INTEGRATIVE_CASES.find((c) => c.id === selectedCaseId) || INTEGRATIVE_CASES[1] || INTEGRATIVE_CASES[0];

  return (
    <div className={`bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm overflow-hidden transition-all duration-300 ${className}`}>
      {/* 統合ヘッダー帯 */}
      <div className="bg-gradient-to-r from-[#1E2D3D] via-[#1E3D34] to-[#B86924] p-3.5 sm:p-7 text-white">
        <div className="text-lg sm:text-2xl font-serif font-bold tracking-tight">
          {currentCase.title}
        </div>
      </div>

      {/* モード切り替えスイッチ（トグル） */}
      <div className="p-3 sm:p-6 bg-[#FAF8F5] dark:bg-[#121920] border-b border-[#E8E1D1] dark:border-[#22303D]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] flex items-center gap-1.5">
            <Workflow className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>医学視点切り替えスイッチ：</span>
          </div>

          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 bg-white dark:bg-[#1A2530] p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-inner max-w-lg w-full sm:w-auto">
            {/* 西洋医学 */}
            <button
              onClick={() => setViewMode("western")}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                viewMode === "western"
                  ? "bg-[#C45A4A] text-white shadow-md"
                  : "text-[#C45A4A] dark:text-[#F87171] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 shrink-0" />
              <span>西洋医学</span>
            </button>

            {/* 東洋医学 */}
            <button
              onClick={() => setViewMode("oriental")}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                viewMode === "oriental"
                  ? "bg-[#1E3D34] text-white shadow-md"
                  : "text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#182823]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>東洋医学</span>
            </button>

            {/* 相補マトリクス（統合） */}
            <button
              onClick={() => setViewMode("matrix")}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
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
      <div className="p-3.5 sm:p-8">
        {/* ================= 1. 西洋医学ビュー（陽） ================= */}
        {viewMode === "western" && (
          <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* 病態機序 */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="text-xs font-bold text-[#C45A4A] dark:text-[#F87171] flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5" />
                医学的な病態と、確認する症状
              </span>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                {currentCase.western.anatomyMechanism}
              </p>
            </div>

            {/* 診断武器と標準薬物 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
              {/* 診断機器 */}
              <div className="bg-white dark:bg-[#1A2530] p-3 sm:p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 sm:space-y-3">
                <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  診察と、必要に応じて行う検査
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
              <div className="bg-white dark:bg-[#1A2530] p-3 sm:p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 sm:space-y-3">
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5" />
                  医学的な治療の選択肢
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
            <div className="p-3 sm:p-5 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-900/50 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-serif font-bold text-xs sm:text-sm">
                <ShieldAlert className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 shrink-0" />
                <span>医療評価を優先する症状（レッドフラッグ）</span>
              </div>
              <p className="text-xs text-red-900/80 dark:text-red-300/80 leading-relaxed">
                {currentCase.western.redFlagAdvice}
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
            <div className="p-3 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs text-[#59615D] dark:text-[#96A6B2] space-y-1">
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block">
                治療の反応を評価するときの注意：
              </span>
              <p className="leading-relaxed">
                {currentCase.western.limitations}
              </p>
            </div>
          </div>
        )}

        {/* ================= 2. 東洋医学ビュー（陰） ================= */}
        {viewMode === "oriental" && (
          <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* 病態機序 */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                症状を整理する伝統的な用語
              </span>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                {currentCase.oriental.pathologyMechanism}
              </p>
            </div>

            {/* 弁証と証・方剤の鑑別 */}
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
                伝統的な分類候補と方剤の学習例
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {currentCase.oriental.patterns.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-2"
                  >
                    <div className="font-serif font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-1.5">
                      {pat.name}
                    </div>
                    <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                      {pat.features}
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-0.5">
                        伝統的な方剤例：
                      </span>
                      <p className="text-xs font-medium text-[#232826] dark:text-[#FAF8F5]">
                        {pat.formula}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">方剤名は伝統理論を学ぶための例です。症状だけで服薬を決めず、製剤の適応・副作用・併用薬を医師・薬剤師と確認してください。経穴単独の効果や個別の施術条件も、この画面からは決められません。</p>

            {/* 経穴の学習例 */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
                  この学習例で比較する経穴と、伝統的な選定理由
                </span>
                <span className="text-[11px] text-[#8A948F] dark:text-[#6A7C8B] flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#1E3D34] dark:text-[#74BA9E]" />
                  タップで事典詳細を表示
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {currentCase.oriental.tsubos.map((tsubo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const matched = TSUBOS.find(
                        (t) => t.name === tsubo.name || t.code === tsubo.code
                      );
                      if (matched) {
                        setSelectedTsuboDetail(matched);
                      } else {
                        setSelectedTsuboDetail({
                          id: tsubo.code.toLowerCase(),
                          name: tsubo.name,
                          kana: "",
                          romaji: "",
                          code: tsubo.code,
                          meridian: tsubo.meridian,
                          meridianShort: tsubo.meridian.replace(/^(手の|足の)/, "").replace(/経$/, ""),
                          bodyPart: "頭部・顔面",
                          locationSimple: tsubo.pointRole,
                          locationDetail: tsubo.pointRole,
                          indications: [currentCase.title],
                          clinicalNote: tsubo.pointRole,
                        });
                      }
                    }}
                    className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-md transition-all duration-200 text-left group cursor-pointer space-y-1.5 flex flex-col justify-between"
                  >
                    <div className="w-full space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                          {tsubo.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
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

                    <div className="pt-2 flex items-center justify-end text-[11px] font-medium text-[#1E3D34] dark:text-[#74BA9E] opacity-75 group-hover:opacity-100 group-hover:underline transition-opacity">
                      <span>事典を見る →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 養生指導 */}
            <div className="p-3 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs text-[#59615D] dark:text-[#96A6B2] space-y-1">
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
          <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            {/* バナー標語 */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FCF4EB] to-[#EBF3EF] dark:from-[#221814] dark:to-[#15231E] border border-[#E8E1D1] dark:border-[#22303D] flex items-start gap-2.5 sm:gap-3">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-[#B86924] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                  統合医療の真髄：対立ではなく「歯車が噛み合う役割分担」
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentCase.matrix.coreConcept}
                </h4>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  急性・慢性という区分だけで方法を決めず、診断、危険徴候、治療の根拠、本人の目標と有害事象を確認します。伝統的な分類の学習と、特定の方法の臨床効果を分けて考えます。
                </p>
              </div>
            </div>

            {/* 4段階の統合治療ステップ */}
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] uppercase tracking-wider block">
                医療上の評価と、併用を検討するときの確認事項
              </span>
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
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
                      className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                        <span className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-center font-mono font-bold text-xs text-[#232826] dark:text-[#FAF8F5]">
                          {idx + 1}
                        </span>
                        <div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                            {st.role}
                          </span>
                          <h5 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] mt-1">
                            {st.action}
                          </h5>
                        </div>
                      </div>

                      <div className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed md:max-w-md border-t md:border-t-0 md:border-l border-[#F2ECE0] dark:border-[#22303D] pt-2.5 md:pt-0 md:pl-4">
                        {st.detail}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 相乗効果総括 */}
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex items-center gap-2.5 sm:gap-3">
              <Check className="w-4 sm:w-5 h-4 sm:h-5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] leading-relaxed">
                研究から分かること：{currentCase.matrix.synergyEffect}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="px-3.5 py-4 sm:px-8 border-t border-[#E8E1D1] dark:border-[#22303D] space-y-2" aria-label="出典と根拠の範囲">
        <h4 className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">出典と、確認した根拠の範囲</h4>
        <ul className="space-y-2 text-xs text-[#59615D] dark:text-[#96A6B2]">
          {currentCase.evidenceSources.map(source => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline text-[#1E3D34] dark:text-[#74BA9E]">{source.title}</a>
              <p className="mt-1 leading-relaxed">{source.scope}</p>
            </li>
          ))}
          <li><a href="https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html" target="_blank" rel="noopener noreferrer" className="underline text-[#1E3D34] dark:text-[#74BA9E]">厚生労働省：こんな時は迷わず119へ</a></li>
        </ul>
      </section>

      {/* フッターナビゲート */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] px-3.5 py-3 sm:px-6 sm:py-4 border-t border-[#E8E1D1] dark:border-[#22303D] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#59615D] dark:text-[#96A6B2]">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
          <span>伝統理論の学習と、疾患・介入ごとの医学的な根拠を区別する</span>
        </div>
        <div className="flex items-center gap-1 text-[#1E3D34] dark:text-[#74BA9E] font-medium">
          <span>症状・生活機能・安全性を継続して評価する</span>
        </div>
      </div>

      {/* ツボ事典ポップアップモーダル（ふわっと表示） */}
      {selectedTsuboDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedTsuboDetail(null)}
        >
          <div
            className="bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] max-w-lg w-full p-4 sm:p-7 shadow-2xl space-y-4 sm:space-y-5 transform transition-all duration-300 animate-in fade-in zoom-in-95 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* クローズボタン */}
            <button
              onClick={() => setSelectedTsuboDetail(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] flex items-center justify-center transition-colors"
              aria-label="閉じる"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ヘッダー情報 */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                  {selectedTsuboDetail.code}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-[#59615D] dark:text-[#96A6B2]">
                  {selectedTsuboDetail.bodyPart}
                </span>
                <span className="text-xs font-medium text-[#1E2D3D] dark:text-[#7BAAD8]">
                  {selectedTsuboDetail.meridian}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {selectedTsuboDetail.name}
                  </span>
                  {selectedTsuboDetail.kana && (
                    <span className="text-sm text-[#59615D] dark:text-[#A0B0BC]">
                      {selectedTsuboDetail.kana}
                    </span>
                  )}
                  {selectedTsuboDetail.romaji && (
                    <span className="text-xs font-mono text-[#8A948F] dark:text-[#6A7C8B]">
                      ({selectedTsuboDetail.romaji})
                    </span>
                  )}
                </div>

                <ClipButton
                  item={{
                    id: `tsubo-${selectedTsuboDetail.id}`,
                    type: "tsubo",
                    title: `${selectedTsuboDetail.name}（${selectedTsuboDetail.code}）`,
                    subTitle: `${selectedTsuboDetail.meridian} | ${selectedTsuboDetail.bodyPart}`,
                    points: [selectedTsuboDetail.name],
                    elements: getMeridianElement(selectedTsuboDetail.meridian),
                    indications: selectedTsuboDetail.indications,
                    summary: selectedTsuboDetail.clinicalNote,
                    caution: selectedTsuboDetail.caution,
                  }}
                  variant="icon"
                  size="sm"
                />
              </div>
            </div>

            {/* 要穴カテゴリ */}
            {selectedTsuboDetail.category && selectedTsuboDetail.category.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedTsuboDetail.category.map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] font-medium border border-[#F3E1CB] dark:border-[#423321]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* 取穴法（場所の目安） */}
            <div className="space-y-3">
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-xl border border-[#EDE7DB] dark:border-[#22303D] space-y-1">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  【一般向け】わかりやすい取穴法
                </span>
                <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                  {selectedTsuboDetail.locationSimple}
                </p>
              </div>

              {selectedTsuboDetail.locationDetail && (
                <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-xl border border-[#EDE7DB] dark:border-[#22303D] space-y-1">
                  <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    【専門家向け】解剖学・骨度法取穴
                  </span>
                  <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed font-mono">
                    {selectedTsuboDetail.locationDetail}
                  </p>
                </div>
              )}
            </div>

            {/* 臨床知見 */}
            <div className="bg-[#EBF3EF] dark:bg-[#162A24] p-4 sm:p-5 rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] space-y-1.5">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                はり太郎の臨床知見・配穴の真髄
              </span>
              <p className="text-xs sm:text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                {selectedTsuboDetail.clinicalNote}
              </p>
            </div>

            {/* 主治・適応症 */}
            {selectedTsuboDetail.indications && selectedTsuboDetail.indications.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] block">
                  主治・適応症：
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTsuboDetail.indications.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] text-[#232826] dark:text-[#E6EFEA] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 注意事項 */}
            {selectedTsuboDetail.caution && (
              <div className="bg-[#FDEDEC] dark:bg-[#231816] p-3.5 rounded-xl border border-[#FADBD8] dark:border-[#3D2220] text-[#A83629] dark:text-[#C47A72] text-xs leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">臨床上の禁忌・注意：</span>
                  <p className="mt-0.5">{selectedTsuboDetail.caution}</p>
                </div>
              </div>
            )}

            {/* フッターボタン */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#EDE7DB] dark:border-[#22303D]">
              <Link
                href="/tsubo"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                ツボ事典で全361穴を検索
              </Link>
              <button
                type="button"
                onClick={() => setSelectedTsuboDetail(null)}
                className="px-5 py-2 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
