import type { AtlasStudy } from "./types";

export const RARE_POINT_REHAB_STUDIES: readonly AtlasStudy[] = [
  {
    id: "peripheral-nerve-injury-electroacupuncture",
    topic: "末梢神経損傷で、損傷部位の鍼に督脈の経穴を加える試験",
    kind: "combination",
    points: [],
    additionalPointGroups: [
      { label: "尺骨神経の損傷に応じて選ぶ配穴", points: ["ht2", "si8", "si7", "si4", "si3"], candidate: true },
      { label: "脛骨神経の損傷に応じて選ぶ配穴", points: ["sp9", "sp6", "sp8", "sp7"], candidate: true },
    ],
    otherPoints: "試験では損傷した神経ごとに局所の配穴を決め、一方の群では上肢・下肢に応じて異なる督脈の経穴も加えました。",
    result: "6週間後に運動や感覚などの臨床所見から良好以上と判定された人は、督脈の経穴を加えた群で15人中12人、加えなかった群で13人中5人でした。",
    design: "末梢神経を損傷した30人を、損傷部位に応じた電気鍼と、その配穴に督脈の経穴を加える電気鍼の2群に割り付けました。局所のみの群では2人が途中で参加をやめました。支正は尺骨神経、漏谷は脛骨神経の損傷に応じて選ぶ経穴として記載されています。",
    limits: "複数の経穴を組み合わせた小規模の試験です。両群が電気鍼を受けており、支正や漏谷を単独で使った場合の効果は分かりません。論文にはさらに20人で行った神経伝導の前後測定もありますが、こちらの測定には比較群がありません。",
    sources: [{ label: "He ほか · Neural Regeneration Research（2015）方法と第1段階の結果", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4357096/" }],
  },
  {
    id: "stroke-integrative-rehabilitation-medical-records",
    topic: "脳卒中の入院リハビリと鍼を組み合わせた診療記録",
    kind: "combination",
    points: ["li11", "te5", "li4", "li9", "gb34", "st36", "sp6", "gb41", "gv24", "bl3", "bl4", "st8", "gb7", "sp3", "lu9", "ht8", "lu10"],
    result: "鍼などを併用した人では、通常のリハビリを受けた人より、日常生活動作の指標（K-MBI）と認知・生活機能の指標（CDR-SB）の変化が大きくなりました。必要な介助量などをみる別の指標（FIM）では、変化の幅に明確な群間差は見られませんでした。",
    design: "韓国の1施設で脳卒中の入院患者106人の診療記録をさかのぼり、通常のリハビリを受けた人と、リハビリに鍼や磁場刺激などを併用した人を比較しました。上廉と眉衝は、併用した鍼に用いられた経穴です。",
    limits: "無作為に治療を割り付けた試験ではありません。発症してからリハビリを始めるまでの期間や、どの治療を併用したかも結果に影響し得ます。上廉・眉衝や鍼だけの効果は分かりません。",
    sources: [{ label: "Moon・Keum · Journal of Korean Medicine Rehabilitation（2020）方法と表II（PDF）", url: "https://www.e-jkmr.org/journal/download_pdf.php?doi=10.18325%2Fjkmr.2020.30.2.105" }],
  },
];
