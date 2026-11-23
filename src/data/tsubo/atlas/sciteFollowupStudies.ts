import type { AtlasStudy } from "./types";

export const SCITE_FOLLOWUP_ATLAS_STUDIES: readonly AtlasStudy[] = [
  {
    id: "incomplete-spinal-cord-injury-rehabilitation",
    topic: "不完全脊髄損傷の入院リハビリと鍼の併用",
    kind: "combination",
    points: ["gv20", "li4", "si4", "si3", "te2", "te6", "ht8", "li11", "li15", "li10"],
    otherPoints: "損傷部位に応じて経穴を追加しました。",
    result: "リハビリに週5回の鍼を加えた群では、4週後の運動機能の点数が、リハビリのみの群より平均10.52点多く上がりました。感覚の点数では、群間に明確な差は見つかりませんでした。",
    design: "不完全脊髄損傷で入院していた72人を、通常のリハビリのみ、リハビリに週3回の鍼を加える群、週5回の鍼を加える群に振り分けた試験です。液門など複数の経穴を鍼の2群で共通に使い、63人が試験を終えました。",
    limits: "一つの病院で行われ、模擬鍼の群はありません。各経穴の効果や、4週間より先の経過は、この試験では判断できません。",
    sources: [{ label: "Xiong ほか · Evidence-Based Complementary and Alternative Medicine（2021）", url: "https://doi.org/10.1155/2021/5671998" }],
  },
  {
    id: "antiretroviral-gastrointestinal-relaxation",
    topic: "抗HIV薬を使用中の人の軟便と、鍼・リラクセーションの組み合わせ",
    kind: "combination",
    points: ["pc6", "cv12", "st37"],
    comparisonPoints: ["te4", "cv21", "bl59"],
    otherPoints: "両方の施術で耳の部位も使いました。璇璣・陽池・跗陽は模擬鍼の2群で、通電しないパッドを置いた場所です。",
    result: "鍼とリラクセーションを組み合わせた群では、他の3群より、本人が記録した軟便のつらさが小さくなりました。治療機会1回当たりの差は、0〜10点の尺度で約0.14〜0.15点でした。",
    design: "抗HIV薬を使用し消化器症状が続いていた130人を募集し、115人が介入を始めました。鍼と模擬鍼を、リラクセーションの練習や健康教育と組み合わせた4群を8週間比較し、89人が最後まで参加しました。",
    limits: "特定の薬で治療中の人が対象で、症状は本人の記録です。各経穴の効果や、原因の異なる軟便への効果は調べていません。",
    sources: [{ label: "Chang・Sommers · Acupuncture in Medicine（2011）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3232178/" }],
  },
];
