import type { AcupunctureResearchArticle } from "./types";

export const URINARY_INCONTINENCE_RESEARCH: AcupunctureResearchArticle = {
  slug: "urinary-incontinence",
  title: "尿もれに対する鍼の研究｜量と回数をどう測ったか",
  description: "咳や運動で漏れる腹圧性尿失禁、急な尿意に伴う尿もれ、前立腺がんの手術後の試験を比較します。パッドの重さ、日誌に書いた回数、使ったパッドの枚数で、何が分かるかを確かめます。",
  comparison: {
    caption: "4つの試験で測ったもの",
    note: "尿もれの量、回数、パッドの枚数は、それぞれ異なる指標です。",
    rows: [
      { sectionId: "pad-test", sourceId: "liu-2017", participants: "腹圧性尿失禁の女性", measure: "1時間で漏れた尿の重さ", time: "6週後" },
      { sectionId: "pelvic-floor-training", sourceId: "tang-2023", participants: "骨盤底筋訓練を受けた腹圧性尿失禁の女性", measure: "1時間で漏れた尿の重さ", time: "8週後" },
      { sectionId: "bladder-diary", sourceId: "lin-2020", participants: "過活動膀胱のある人", measure: "3日間の日誌に記録した尿もれの回数", time: "8週の施術終了時" },
      { sectionId: "after-prostatectomy", sourceId: "niu-2025", participants: "前立腺がんの手術後に尿もれがある男性", measure: "1日に使うパッドの枚数", time: "施術開始6週後" },
    ],
  },
  sections: [
    {
      id: "pad-test",
      title: "咳や運動で漏れる人を対象に、パッドの重さを測る",
      paragraphs: [
        "Liuらは、咳や運動などで尿が漏れる腹圧性尿失禁の女性504人を、電気鍼と模擬電気鍼の2群に分けました。主な指標は、1時間のパッド試験で測った尿もれの量です。",
        "6週後、尿もれの量は開始時から電気鍼群で平均9.9グラム、模擬電気鍼群で2.6グラム減りました。報告された群間差は7.4グラム（95％信頼区間4.8〜10.0グラム）でした。ふだんの尿もれの回数は、パッド試験と別に排尿日誌で数えています。",
      ],
      sources: ["liu-2017"],
    },
    {
      id: "pelvic-floor-training",
      title: "両群が骨盤底筋訓練を受けた試験",
      paragraphs: [
        "Tangらは腹圧性尿失禁の女性304人を対象に、両群で骨盤底筋訓練を行い、電気鍼を加える群と模擬電気鍼を加える群を比べました。8週後の1時間パッド試験では、開始時よりそれぞれ9.8グラム、5.8グラム減り、群間差は4.0グラム（95％信頼区間0.8〜7.2グラム）でした。",
        "この試験は骨盤底筋訓練を共通にした条件での比較です。追跡期間にはパッドで尿もれの量を測っていないため、量の差がその後も続いたかは、この試験からは分かりません。",
      ],
      sources: ["tang-2023"],
    },
    {
      id: "bladder-diary",
      title: "急な尿意に伴う尿もれを、日誌で数えた試験",
      paragraphs: [
        "Linらは香港で過活動膀胱のある60〜90歳の100人を対象に、鍼と皮膚を刺さない模擬鍼を比べました。主な指標は、3日間の排尿日誌に書かれた、急な尿意に伴う尿もれの回数の変化です。8週の施術を終えた時点で、この主な指標に明確な群間差は認められませんでした。",
      ],
      exercise: {
        question: "パッドの重さが減ったと書かれていたら、ふだん漏れる回数も減ったと言えるでしょうか？",
        answer: "パッド試験で測ったのは一定の条件と時間で漏れた量です。ふだんどんな場面で何回漏れたかを知るには、排尿日誌などで回数を数えた結果を確かめます。調べた人が、咳などで漏れる人か、急な尿意に伴って漏れる人かも確認します。",
      },
      sources: ["lin-2020", "liu-2017"],
    },
    {
      id: "after-prostatectomy",
      title: "前立腺がんの手術後に、パッドの枚数で回復を調べた試験",
      paragraphs: [
        "Niuらは、前立腺がんの手術から4〜6週が経ち、1日にパッドを2枚以上使っていた男性110人を、電気鍼と模擬刺激の2群に分けました。施術開始から6週後、パッドの使用が1日0〜1枚になった人は、電気鍼群の55人中24人（43.6％）、模擬刺激群の55人中12人（21.8％）でした。",
        "20週までにこの基準に達した割合は両群で上がり、群間に明確な差はありませんでした。1枚の使用も回復の基準に含めた試験で、尿もれが完全になくなった人の割合はこの数字からは分かりません。",
      ],
      sources: ["niu-2025"],
    },
  ],
  sources: [
    { id: "liu-2017", label: "Liu ほか · JAMA（2017）", url: "https://jamanetwork.com/journals/jama/fullarticle/2633916", scope: "本文の対象・主要評価項目・結果。6週時点のパッド試験と副次評価の排尿日誌。" },
    { id: "tang-2023", label: "Tang ほか · European Urology Focus（2023）", url: "https://pubmed.ncbi.nlm.nih.gov/36420937/", scope: "抄録の比較群・8週時点の結果・追跡期間に関する限界。" },
    { id: "lin-2020", label: "Lin ほか · Chinese Medicine（2020）", url: "https://link.springer.com/article/10.1186/s13020-020-00388-w", scope: "本文の対象、排尿日誌を使った主要評価項目と結果。" },
    { id: "niu-2025", label: "Niu ほか · JAMA Network Open（2025）", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2839485", scope: "回復の定義、表2の6週時点の割合、20週までの追跡結果。" },
  ],
  related: [
    { href: "/tsubo/bl33#stress-urinary-incontinence", label: "中髎の図鑑で腹圧性尿失禁の研究を読む" },
    { href: "/tsubo/bl39#overactive-bladder-voiding-diary", label: "委陽の図鑑で過活動膀胱の研究を読む" },
    { href: "/tsubo/bl33#postprostatectomy-pad-use", label: "中髎の図鑑で前立腺がんの手術後の研究を読む" },
    { href: "/learn/lectures/reading-evidence", label: "講義で研究の読み方を練習する" },
  ],
  tags: ["尿もれ", "尿失禁", "腹圧性尿失禁", "過活動膀胱", "切迫性尿失禁", "前立腺がん術後", "排尿日誌", "骨盤底筋訓練", "電気鍼"],
};
