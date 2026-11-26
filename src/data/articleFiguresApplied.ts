import type { ReadingInsert } from "@/types/reading";

export const APPLIED_ARTICLE_FIGURES: Record<string, ReadingInsert[]> = {
  "science-of-tongue-diagnosis": [
    {
      afterHeading: "4. 写真・デジタル解析をどう読むか",
      afterParagraph: 1,
      figure: {
        id: "tongue-photo-agreement",
        title: "同じ写真を見た評価者どうしの一致度",
        layout: "compare",
        graphic: { kind: "bars", maximum: 1, unit: "AC2", values: [0.49, 0.55, 0.34] },
        items: [
          { label: "舌苔の色", description: "", icon: "eye" },
          { label: "苔の性状", description: "", icon: "eye" },
          { label: "舌そのものの色", description: "", icon: "eye" },
        ],
        caption: "GwetのAC2で、同じ写真の特徴を評価者どうしがどの程度同じように分類したかを示します。棒の表示範囲は0〜1です。病気を判定する精度は別の比較で調べます。",
      },
    },
  ],
  "science-of-acupuncture-neuroscience": [
    {
      afterHeading: "5. 臨床効果と偽鍼対照",
      afterParagraph: 1,
      figure: {
        id: "acupuncture-trial-controls",
        title: "鍼と何を比べた試験か",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "偽鍼", description: "どんな刺激を行った対照かを確かめ、鍼群との差を読む。", icon: "flask" },
          { label: "通常治療", description: "通常行われる治療を受けた群と、症状や生活動作を比べる。", icon: "book" },
          { label: "無治療", description: "試験の治療を受けない群と、症状や生活動作の変化を比べる。", icon: "balance" },
        ],
        caption: "偽鍼でも皮膚に触れた感覚が生じる場合があります。ほかに受けた治療、観察期間、何を評価したかも確かめます。",
      },
    },
  ],
  "science-of-kampo-network-pharmacology": [
    {
      afterHeading: "5. 処方・製剤ごとのエビデンスを確認する",
      afterParagraph: 3,
      figure: {
        id: "kampo-rikkunshito-study-comparison",
        title: "六君子湯の二試験で、誰に何を聞いたか",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "Suzukiら（2014年）", description: "ピロリ菌感染のある人も含むFD患者。全体として改善したと答えた人の割合を比べた。", icon: "book" },
          { label: "DREAM試験（2018年）", description: "ピロリ菌感染がなく、割り付け前のプラセボ期間も症状が続いたFD患者。症状全体の変化を段階で比べた。", icon: "book" },
        ],
        caption: "どちらも8週後の評価です。対象を絞る条件と、何を改善と数えたかが異なるため、結果は各試験の条件に沿って読みます。",
      },
    },
  ],
  "east-west-integrative-unified-theory": [
    {
      afterHeading: "6. 再現性・診断精度・治療効果を区別する",
      afterParagraph: 2,
      figure: {
        id: "integration-three-research-questions",
        title: "記録の一致、病気の判別、患者の利益",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "再現性", description: "同じ所見を、同じ分類として記録できるか。", icon: "eye" },
          { label: "診断精度", description: "調べたい病気や状態を正しく判別できるか。", icon: "compass" },
          { label: "臨床での有用性", description: "その分類に従って治療すると、患者に利益があるか。", icon: "check" },
        ],
        caption: "三つは別々の問いです。研究がどの問いを調べたか、対象・評価の基準・比較相手とともに確認します。",
      },
    },
  ],
  "east-west-integrative-gerd-gastric": [
    {
      afterHeading: "1. 胸やけと胃痛を分けて考える",
      afterParagraph: 2,
      figure: {
        id: "gerd-fd-symptoms-and-findings",
        title: "胸やけ・もたれと、内視鏡で見る所見",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "胃食道逆流症（GERD）", description: "胃の内容物の逆流で症状や合併症が起きる。胸やけや呑酸が代表的。", icon: "pulse" },
          { label: "機能性ディスペプシア（FD）", description: "食後のもたれ、すぐに満腹になる感じ、みぞおちの痛みなどが中心。", icon: "pulse" },
        ],
        caption: "GERDのうち、内視鏡で食道粘膜に傷害が見られる場合を逆流性食道炎と呼びます。GERDとFDの症状は重なる場合があります。",
      },
    },
  ],
};
