import type { FeaturedPair } from "./featuredPairs";

export const featuredResearchPairs: readonly FeaturedPair[] = [
  {
    id: "zhongliao-huiyang",
    pointIds: ["bl33", "bl35"],
    name: "中髎と会陽",
    kind: "research",
    summary: "咳や運動などで尿が漏れる腹圧性尿失禁の試験で、左右の中髎と会陽に電気鍼を行いました。",
    evidenceSummary: "6週間後の1時間パッド試験では、尿漏れ量の減少が電気鍼の群で平均9.9 g、偽電気鍼の群で2.6 gでした。",
    limits: "中髎・会陽それぞれの効果や、ほかのタイプの尿失禁への効果は調べていません。",
    details: [
      {
        label: "尿漏れ量をどう比べたか",
        text: "女性504人を無作為に分け、電気鍼と、近くの別の場所で皮膚を刺さず電気も流さない方法を比べました。尿漏れ量の減少幅の群間差は平均7.4 gでした。",
        sources: [
          { label: "Liu ほか · JAMA（2017）", url: "https://jamanetwork.com/journals/jama/fullarticle/2633916" },
        ],
      },
    ],
  },
  {
    id: "tianshu-shangjuxu",
    pointIds: ["st25", "st37"],
    name: "天枢と上巨虚",
    kind: "research",
    summary: "重い便秘が長く続く人を対象にした試験で、天枢と上巨虚は腹結と一緒に使われました。",
    evidenceSummary: "8週間の治療中、自然な排便で残便感がなかった回数は、治療前より電気鍼の群で週平均1.76回、偽電気鍼の群で0.87回増えました。",
    limits: "腹結を加えた試験なので、天枢と上巨虚だけを使った場合の効果は分かりません。",
    details: [
      {
        label: "便秘の試験で比べたこと",
        text: "1,075人を無作為に分け、電気鍼と、経穴から外れた場所に浅く鍼をして電気を流さない方法を比べました。過去24時間に薬などの助けを使わずに排便でき、残便感がなかった回数を数えました。",
        sources: [
          { label: "Liu ほか · Annals of Internal Medicine（2016）", url: "https://pubmed.ncbi.nlm.nih.gov/27618593/" },
          { label: "試験で使ったツボと比較方法（研究計画書）", url: "https://link.springer.com/article/10.1186/1745-6215-14-176" },
        ],
      },
    ],
  },
  {
    id: "zusanli-sanyinjiao",
    pointIds: ["st36", "sp6"],
    name: "足三里と三陰交",
    kind: "research",
    summary: "帝王切開後の腸の回復を調べた試験で、左右の足三里と三陰交を皮膚の上から電気で刺激しました。",
    evidenceSummary: "手術後に初めておならが出るまでの時間は、二穴を刺激した群で平均19.3時間、経穴から外れた場所を刺激した群で26.4時間でした。",
    limits: "針を使わない電気刺激の結果です。各ツボ単独の効果や、ほかの手術で同じ結果になるかは分かりません。",
    details: [
      {
        label: "手術後の回復をどう比べたか",
        text: "1施設で146人を無作為に3群に分け、132人を解析しました。電極を貼るだけの群では、最初のおならまで平均26.2時間でした。",
        sources: [
          { label: "Zhou ほか · Evidence-Based Complementary and Alternative Medicine（2018）", url: "https://onlinelibrary.wiley.com/doi/10.1155/2018/7341920" },
        ],
      },
    ],
  },
  {
    id: "zusanli-shangjuxu",
    pointIds: ["st36", "st37"],
    name: "足三里と上巨虚",
    kind: "research",
    summary: "大腸がんの腹腔鏡手術後に腸の回復を調べた試験で、足三里と上巨虚は中脘・天枢と一緒に使われました。",
    evidenceSummary: "手術後の最初の排便までの時間の中央値は、電気鍼の群で76.4時間、偽電気鍼の群で90.0時間でした。",
    limits: "中脘と天枢も使った試験なので、足三里と上巨虚だけを使った場合の効果は分かりません。",
    details: [
      {
        label: "手術後の排便をどう比べたか",
        text: "術後の回復を支えるケアを全員に行い、試験の鍼と、別の場所に浅く鍼をして電気を流さない方法を比べました。249人を無作為に分け、248人を解析しました。電気を流したツボは足三里です。",
        sources: [
          { label: "Wang ほか · JAMA Surgery（2023）", url: "https://jamanetwork.com/journals/jamasurgery/fullarticle/2797968" },
        ],
      },
    ],
  },
  {
    id: "hegu-zusanli",
    pointIds: ["li4", "st36"],
    name: "合谷と足三里",
    kind: "observational",
    summary: "韓国の7つの診療所で、痛みを訴えた外来患者423人の診療録のうち、56例で合谷と足三里が一緒に選ばれていました。",
    evidenceSummary: "ほかのツボを使った場合も、合谷と足三里の両方が選ばれていれば集計に含まれます。",
    limits: "この組み合わせで痛みがどのくらい変わるかは調べていません。",
    details: [
      {
        label: "診療録で確認した使われ方",
        text: "腰痛、片頭痛、ひざの痛みなど、異なる症状を含む診療録から、同じ症例で使われたツボを集計しました。",
        sources: [
          { label: "Yoon ほか · Medicine（2026）本文3.2節・図2", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13593149/" },
        ],
      },
    ],
  },
  {
    id: "neiguan-zusanli",
    pointIds: ["pc6", "st36"],
    name: "内関と足三里",
    kind: "research",
    summary: "腹腔鏡手術後の吐き気や嘔吐を調べた試験で、左右の内関と足三里を皮膚の上から電気で刺激しました。",
    evidenceSummary: "術後24時間以内に吐き気・えずき・嘔吐のいずれかが出た人は、電気刺激を受けた群で29.4％、同じ場所に電極を貼って電気を流さなかった群で34.2％でした。",
    limits: "両群とも吐き気を予防する薬を使用しました。内関だけ、足三里だけを使った場合は調べていません。",
    details: [
      {
        label: "手術後の吐き気と嘔吐をどう比べたか",
        text: "術後に吐き気や嘔吐が起きやすい1,655人を12の病院で無作為に分け、全員のデータを解析しました。参加者の約97％は女性です。",
        sources: [
          { label: "Gao ほか · Frontiers in Medicine（2022）", url: "https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2022.766244/full" },
        ],
      },
    ],
  },
  {
    id: "tianshu-zusanli",
    pointIds: ["st25", "st36"],
    name: "天枢と足三里",
    kind: "research",
    summary: "下痢型の過敏性腸症候群を対象にした試験で、左右の天枢と足三里に灸を行いました。",
    evidenceSummary: "6週間のうち半分を超える週で腹痛などが十分に和らいだと答えた人は、灸の群で76.9％、同じ場所を弱く温めた群で42.3％でした。",
    limits: "温め方の違いを比べた試験です。標準治療や一穴だけを使う方法との比較はありません。",
    details: [
      {
        label: "腹痛などの改善をどう確かめたか",
        text: "104人を無作為に分け、腹痛や腹部の不快感が十分に和らいだかを毎週たずねました。",
        sources: [
          { label: "Bao ほか · Therapeutic Advances in Gastroenterology（2022）", url: "https://journals.sagepub.com/doi/10.1177/17562848221075131" },
        ],
      },
    ],
  },
  {
    id: "fengchi-baihui",
    pointIds: ["gb20", "gv20"],
    name: "風池と百会",
    kind: "research",
    summary: "前兆のない片頭痛を調べた試験で、左右の風池と頭頂の百会を、風府・太陽・合谷とあわせて使いました。",
    evidenceSummary: "4週間で、片頭痛があった日数は、鍼の群で偽鍼の群より推定で1日多く減りました。",
    limits: "推定した群間差の95％信頼区間は0〜2日でした。風池と百会だけの効果は分かりません。",
    details: [
      {
        label: "片頭痛があった日数をどう比べたか",
        text: "120人を無作為に分け、風池と百会を含む8か所への鍼と、経穴から外れた8か所への浅い鍼を比べました。減った日数の中央値は両群とも3日でした。",
        sources: [
          { label: "Zhang ほか · JAMA Network Open（2026）", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2844379" },
        ],
      },
    ],
  },
  {
    id: "zusanli-yanglingquan",
    pointIds: ["st36", "gb34"],
    name: "足三里と陽陵泉",
    kind: "research",
    summary: "変形性膝関節症の痛みや動きにくさを調べた試験で、足三里と陽陵泉を含む8種類の経穴を使いました。",
    evidenceSummary: "6週後、膝の痛み・こわばり・動作を合わせた0〜240点の指標は、電気鍼の群で約65点、皮膚を刺さない偽鍼の群で約25点改善しました。",
    limits: "足三里と陽陵泉だけの効果や、軟骨の変化を長期に抑えられるかは分かりません。",
    details: [
      {
        label: "膝の痛みや動きにくさをどう比べたか",
        text: "6施設で480人を無作為に分け、両群とも同じ経穴を使いました。偽鍼の群でも機器は同じ設定で作動させました。膝の症状を表す指標（WOMAC）の改善幅は、調整後の群間差で40.56点でした。",
        sources: [
          { label: "Hang ほか · eClinicalMedicine（2026）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13223986/" },
        ],
      },
    ],
  },
];
