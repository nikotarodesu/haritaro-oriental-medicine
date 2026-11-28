import type { FeaturedPair } from "./featuredPairs";

export const featuredAdditionalPairs: readonly FeaturedPair[] = [
  {
    id: "zhongwan-zusanli",
    pointIds: ["cv12", "st36"],
    name: "中脘と足三里",
    kind: "research",
    summary: "糖尿病の影響で胃の内容物が先に進みにくくなる人を対象に、中脘に足三里を加えた場合を調べました。",
    evidenceSummary: "99人の試験で、施術終了時の胃もたれや吐き気などの症状スコアに、二穴を使った群と中脘だけを使った群で明確な差はありませんでした。",
    limits: "糖尿病性胃不全麻痺の試験で、一般的な胃もたれは調べていません。",
    details: [
      {
        label: "試験の方法",
        text: "中脘のみ、中脘と足三里、経穴にあたらない場所への鍼の3群に分け、どの群にも補助の鍼で電気刺激を行いました。97人が試験を完了し、施術終了時には3群とも症状の点数が下がりました。",
        sources: [{ label: "Liu ほか · Journal of Traditional and Complementary Medicine（2024）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11259726/" }],
      },
    ],
  },
  {
    id: "ximen-neiguan",
    pointIds: ["pc4", "pc6"],
    name: "郄門と内関",
    kind: "research",
    summary: "食道の切除手術を受けた人の術後の痛みを調べた試験で使われました。",
    evidenceSummary: "60人の試験で、手術時に電気鍼を加えた群では、通電しない鍼の群と鍼を追加しない群より、術後の痛みの点数が低く、鎮痛薬の使用量も少なかったと報告されました。",
    limits: "手術前後の比較です。別の場所への電気鍼と比べた結果や、各ツボ単独の効果は分かりません。",
    details: [
      {
        label: "試験の方法",
        text: "全身麻酔と術後の鎮痛管理は3群で共通です。鍼を行う2群はどちらも郄門と内関を使い、通電の有無を変えました。",
        sources: [{ label: "Xie ほか · Journal of Huazhong University of Science and Technology（2014）", url: "https://pubmed.ncbi.nlm.nih.gov/25135729/" }],
      },
    ],
  },
  {
    id: "neiguan-tongli",
    pointIds: ["pc6", "ht5"],
    name: "内関と通里",
    kind: "research",
    summary: "慢性安定狭心症の標準治療に電気鍼を加えたときの発作回数を調べました。",
    evidenceSummary: "404人を振り分けた試験の16週時点では、4週間当たりの発作回数の減り幅が、経穴にあたらない位置へ電気鍼をした群より平均5.18回大きくなりました。",
    limits: "診断を受けた安定期の人を対象とした試験です。急な胸痛への対応や心筋梗塞の予防は調べていません。",
    details: [
      {
        label: "試験の方法",
        text: "標準治療に内関と通里への電気鍼を加えた群を、太淵と孔最への電気鍼、経穴にあたらない場所への電気鍼、鍼の追加なしの3群と比べました。発作回数は参加者が日誌に記録しました。",
        sources: [{ label: "Zhao ほか · JAMA Internal Medicine（2019）", url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2739058" }],
      },
    ],
  },
  {
    id: "fushe-shuidao",
    pointIds: ["sp13", "st28"],
    name: "府舎と水道",
    kind: "research",
    summary: "脊髄くも膜下麻酔の後、自分で尿を出せるようになるまでを調べた試験です。",
    evidenceSummary: "154人の試験で、電気鍼の群は鍼を追加しない群より、尿を出せなくなる人が少なく、最初に自分で排尿するまでの時間も短かったと報告されました。",
    limits: "手術前後の短期比較です。偽鍼の群や、府舎と水道を別々に使う群はありませんでした。",
    details: [
      {
        label: "試験で使ったツボ",
        text: "電気鍼を行う群は、左右の府舎と水道を使いました。",
        sources: [{ label: "He ほか · 中国鍼灸（2015）", url: "https://pubmed.ncbi.nlm.nih.gov/26062180/" }],
      },
    ],
  },
  {
    id: "shenshu-qihaishu",
    pointIds: ["bl23", "bl24"],
    name: "腎兪と気海兪",
    kind: "observational",
    summary: "韓国7施設の痛みの初診記録423件のうち、83件で一緒に選ばれました。主に腰痛の診療で使われていました。",
    evidenceSummary: "同じ受診で選ばれた件数で、ほかのツボも使われた可能性があります。",
    limits: "腰痛がどの程度改善したかは、この調査では分かりません。",
    details: [
      {
        label: "診療での使われ方",
        text: "2022年9月から2023年5月までに、腰痛やひざの痛みなどで受診した人の初診記録を調べています。",
        sources: [{ label: "Yoon ほか · Medicine（2026）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13593149/" }],
      },
    ],
  },
  {
    id: "hegu-zhongwan",
    pointIds: ["li4", "cv12"],
    name: "合谷と中脘",
    kind: "observational",
    summary: "韓国7施設の痛みの初診記録423件のうち、71件で一緒に選ばれました。",
    evidenceSummary: "片頭痛、腰痛、過敏性腸症候群など、複数の症状を含む記録全体での件数です。",
    limits: "この二穴だけを使った人数や、痛みの変化は分かりません。",
    details: [
      {
        label: "調査で使った記録",
        text: "2022年9月から2023年5月までの診療録を振り返って集計しました。",
        sources: [{ label: "Yoon ほか · Medicine（2026）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13593149/" }],
      },
    ],
  },
  {
    id: "hegu-neiguan",
    pointIds: ["li4", "pc6"],
    name: "合谷と内関",
    kind: "research",
    summary: "婦人科の腹腔鏡手術後の吐き気を調べた試験で、合谷と内関に皮膚の上から電気刺激を加えました。",
    evidenceSummary: "120人を解析した試験で、手術前後に複数回刺激を加えた群は、通電しない群より術後0〜2時間と4〜12時間の吐き気が少なくなりました。",
    limits: "術後12〜48時間の吐き気や嘔吐には明確な差がなく、日常の吐き気や指圧は調べていません。",
    details: [
      {
        label: "試験の方法",
        text: "吐き気を抑える薬を全群に使い、刺激を複数回加えた群、1回加えた群、電極を貼るだけの群を比べました。",
        sources: [{ label: "Jin ほか · BMC Complementary Medicine and Therapies（2025）", url: "https://link.springer.com/article/10.1186/s12906-025-04847-5" }],
      },
    ],
  },
  {
    id: "quchi-shangjuxu",
    pointIds: ["li11", "st37"],
    name: "曲池と上巨虚",
    kind: "research",
    summary: "機能性便秘の人を対象に、曲池と上巨虚への電気鍼と内服薬を比べました。",
    evidenceSummary: "190人の試験で、自然に排便できた回数が試験の改善基準に達した割合に、電気鍼と内服薬で明確な差はありませんでした。",
    limits: "偽鍼の群はなく、電気鍼と内服薬の効果が同等かどうかも調べていません。",
    details: [
      {
        label: "試験の方法",
        text: "電気鍼は刺激の強さが異なる2群に分け、内服薬にはモサプリドを使いました。主に評価したのは、自然な排便が週3回以上あり、試験前より週1回以上増えた週が、4週間中3週間以上あった人の割合です。",
        sources: [{ label: "Wu ほか · Evidence-Based Complementary and Alternative Medicine（2017）", url: "https://onlinelibrary.wiley.com/doi/10.1155/2017/1428943" }],
      },
    ],
  },
  {
    id: "hegu-quchi",
    pointIds: ["li4", "li11"],
    name: "合谷と曲池",
    kind: "research",
    summary: "骨髄検査を受ける人の痛みを調べた試験で使われました。",
    evidenceSummary: "50人の試験で、局所麻酔に皮膚の上からの電気刺激を加えた群は、通電しない群より検査時の痛みの点数が低くなりました。",
    limits: "検査時の痛みを比べた結果です。慢性痛や、鍼を刺す施術の効果は調べていません。",
    details: [
      {
        label: "骨髄検査の痛みを調べた試験",
        text: "骨髄穿刺や骨髄生検を受ける人が対象です。どちらの群も合谷と曲池に電極を貼り、局所麻酔を受けました。",
        sources: [{ label: "Shokrani ほか · Advanced Biomedical Research（2014）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4063102/" }],
      },
      {
        label: "二穴を使う場合と単独で使う場合の比較",
        text: "22人が参加した別の鍼の研究では、押されたときに痛みを感じ始める強さを施術の前後で測りました。合谷に曲池を加えたときに、この指標の変化がより大きくなるとは確認できませんでした。",
        sources: [{ label: "Li ほか · Complementary Therapies in Medicine（2008）", url: "https://pubmed.ncbi.nlm.nih.gov/19186343/" }],
      },
    ],
  },
];
