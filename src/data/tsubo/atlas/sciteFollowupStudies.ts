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

export const SCITE_SYMPTOM_ATLAS_STUDIES: readonly AtlasStudy[] = [
  {
    id: "dry-eye-artificial-tears-kim",
    topic: "中等度から重度のドライアイでの鍼と人工涙液",
    kind: "combination",
    points: ["bl2", "gb14", "te23", "st1", "gb20", "li4", "li11"],
    otherPoints: "論文の施術方法で名称を確認できた経穴を掲載しています。",
    guide: "eye-strain-fatigue",
    result: "治療直後のドライアイの症状の質問票では、鍼と人工涙液の間に明確な差はありませんでした。治療終了8週後には、鍼の群の改善が大きいと報告されました。",
    design: "中等度から重度のドライアイの150人を、目の周囲や合谷など複数の経穴を使う鍼の群と、人工涙液を使う群に分けました。両群とも、追跡期間にはほかのドライアイ治療を受けられました。",
    limits: "模擬鍼を置かない比較です。経穴ごとの効果や、眼精疲労全般への効果は調べていません。",
    sources: [{ label: "Kim ほか · PLOS ONE（2012）、介入方法・結果", url: "https://doi.org/10.1371/journal.pone.0036638" }],
  },
  {
    id: "primary-dysmenorrhea-sham-smith",
    topic: "原発性月経困難症での鍼と模擬鍼",
    kind: "combination",
    points: ["sp4", "st29", "cv3", "bl32", "sp8", "sp6"],
    otherPoints: "論文には見立てに応じた追加候補も載っています。追加候補が選ばれた人数は確認できませんでした。",
    guide: "menstrual-pain-chill",
    result: "3か月時点の月経痛で、鍼と模擬鍼の間に明確な差はありませんでした。6か月時点では痛みの持続時間と追加の鎮痛薬の使用に差が報告され、12か月時点では効果の持続は確認できませんでした。",
    design: "原発性月経困難症の14〜25歳の92人を、地機・三陰交などを主要候補とする鍼と、非刺入の模擬鍼に分けた試験です。鍼の群では見立てに応じて選ぶ経穴が変わりました。",
    limits: "複数の経穴を選ぶ方法全体を比べました。各経穴単独の効果、病気が原因の月経痛、灸の効果は調べていません。",
    sources: [{ label: "Smith ほか · Evidence-Based Complementary and Alternative Medicine（2011）、介入方法・結果", url: "https://doi.org/10.1093/ecam/nep239" }],
  },
];
