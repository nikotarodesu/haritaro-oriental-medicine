import type { AtlasLocationQuestion } from "./types";

type AtlasLearningPair = {
  codes: readonly [string, string];
  comparisonLabel: string;
  comparisonPrompt: string;
  question: AtlasLocationQuestion;
  caseId: string;
  caseLabel: string;
  casePrompt: string;
};

export const ATLAS_LEARNING_PAIRS: readonly AtlasLearningPair[] = [
  {
    codes: ["LI4", "LR3"],
    comparisonLabel: "太衝と比べる",
    comparisonPrompt: "手の甲と足の甲で、目印になる骨を見比べます。",
    question: {
      prompt: "手の甲で、人差し指につながる骨が目印になるのはどちらですか？",
      answerCode: "LI4",
      explanation: "合谷は手の甲、太衝は足の甲にあります。",
    },
    caseId: "case-01-headache-liver-fire",
    caseLabel: "頭痛の模擬症例を解く",
    casePrompt: "太衝が登場します。頭痛の経過と四診の所見を読み、見立ての根拠を選びます。",
  },
  {
    codes: ["ST36", "SP6"],
    comparisonLabel: "三陰交と比べる",
    comparisonPrompt: "ひざの下と内くるぶしの上で、位置を探すときの目印を比べます。",
    question: {
      prompt: "内くるぶしを起点に探すツボはどちらですか？",
      answerCode: "SP6",
      explanation: "三陰交は内くるぶし、足三里はひざ下のくぼみが起点です。",
    },
    caseId: "case-07-ibs-liver-spleen",
    caseLabel: "緊張時の腹痛の模擬症例を解く",
    casePrompt: "足三里と三陰交が登場します。外出前と休日で、症状がどう違うかを読み取ります。",
  },
  {
    codes: ["GV20", "GB20"],
    comparisonLabel: "風池と比べる",
    comparisonPrompt: "頭頂の中央と後頭部の骨の下で、位置の目印を見比べます。",
    question: {
      prompt: "後頭部の骨の下で、うなじが目印になるのはどちらですか？",
      answerCode: "GB20",
      explanation: "風池は後頭部の骨の下、百会は頭頂の中央線上にあります。",
    },
    caseId: "case-18-severe-eyestrain",
    caseLabel: "目の疲れの模擬症例を解く",
    casePrompt: "百会と風池が登場します。目がかすむ時刻や、一緒に出る所見を確かめます。",
  },
];
