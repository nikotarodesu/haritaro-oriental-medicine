import type { FeaturedPair } from "./featuredPairs";

export const featuredAdditionalPairs: readonly FeaturedPair[] = [
  {
    id: "zhongwan-zusanli",
    pointIds: ["cv12", "st36"],
    name: "中脘と足三里",
    kind: "research",
    summary: "糖尿病の影響で胃の内容物が先に進みにくくなる病気で、中脘に足三里を加える意味を調べた組み合わせです。",
    evidenceSummary: "99人の試験で、施術終了時の胃もたれや吐き気などの症状スコアに、二穴を使った群と中脘だけを使った群で明確な差はありませんでした。",
    details: [
      {
        label: "研究で分かったこと",
        text: "糖尿病性胃不全麻痺の成人を、中脘のみ、中脘と足三里、経穴にあたらない場所への鍼の3群に分けました。補助の鍼を介した電気刺激は3群とも行いました。97人が試験を完了し、施術終了時には3群とも症状の点数が下がりました。一般的な胃もたれを調べた試験ではありません。",
        sources: [{ label: "Liu ほか · Journal of Traditional and Complementary Medicine（2024）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11259726/" }],
      },
    ],
  },
  {
    id: "ximen-neiguan",
    pointIds: ["pc4", "pc6"],
    name: "郄門と内関",
    kind: "research",
    summary: "いずれも前腕の手のひら側にある心包経のツボです。食道の切除手術を受けた人の術後の痛みを調べた試験で使われました。",
    evidenceSummary: "60人の試験で、手術時に電気鍼を加えた群では、通電しない鍼の群と鍼を追加しない群より、術後の痛みの点数が低く、鎮痛薬の使用量も少なかったと報告されました。",
    details: [
      {
        label: "研究で分かったこと",
        text: "全身麻酔と術後の鎮痛管理を共通に行い、手術時に郄門と内関へ電気鍼を加える群、同じ場所に鍼をして通電しない群、鍼を加えない群を比べました。手術の前後に限った比較で、別の場所への電気鍼と比べた結果や、各経穴の寄与は分かりません。",
        sources: [{ label: "Xie ほか · Journal of Huazhong University of Science and Technology（2014）", url: "https://pubmed.ncbi.nlm.nih.gov/25135729/" }],
      },
    ],
  },
  {
    id: "neiguan-tongli",
    pointIds: ["pc6", "ht5"],
    name: "内関と通里",
    kind: "research",
    summary: "慢性安定狭心症の標準治療を受ける人に、電気鍼を追加した場合の発作回数を調べた組み合わせです。",
    evidenceSummary: "404人を振り分けた試験の16週時点では、4週間当たりの発作回数の減り幅が、経穴にあたらない位置へ電気鍼をした群より平均5.18回大きくなりました。",
    details: [
      {
        label: "研究で分かったこと",
        text: "標準治療に内関と通里への電気鍼を加えた群を、太淵と孔最への電気鍼、経穴にあたらない場所への電気鍼、鍼の追加なしの3群と比較しました。診断を受けた安定期の人が日誌に記録した発作についての結果です。急な胸痛への対応や心筋梗塞の予防は、この試験の対象外です。",
        sources: [{ label: "Zhao ほか · JAMA Internal Medicine（2019）", url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2739058" }],
      },
    ],
  },
  {
    id: "fushe-shuidao",
    pointIds: ["sp13", "st28"],
    name: "府舎と水道",
    kind: "research",
    summary: "どちらも下腹部にあります。下半身の手術などで使う脊髄くも膜下麻酔の後に、自分で尿を出せるようになるまでを調べた組み合わせです。",
    evidenceSummary: "154人の試験で、電気鍼の群は鍼を追加しない群より、尿を出せなくなる人が少なく、最初に自分で排尿するまでの時間も短かったと報告されました。",
    details: [
      {
        label: "研究で分かったこと",
        text: "脊髄くも膜下麻酔を受けた人を、左右の府舎と水道へ電気鍼を行う群と、術後に鍼を加えない群に分けました。手術前後の管理下での短期比較です。偽鍼を行う群や、府舎と水道を別々に使う群はありませんでした。",
        sources: [{ label: "He ほか · 中国鍼灸（2015）", url: "https://pubmed.ncbi.nlm.nih.gov/26062180/" }],
      },
    ],
  },
];
