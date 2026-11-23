import type { AcupunctureResearchArticle } from "./types";

export const RADIATION_DRY_MOUTH_RESEARCH: AcupunctureResearchArticle = {
  slug: "radiation-dry-mouth",
  title: "放射線治療による口の乾きと鍼の研究",
  description: "頭頸部がんの放射線治療中に鍼を始めて口の乾きを予防する試験と、治療から1年以上経った人に残る口の乾きを調べた試験を読み比べます。本人が感じる乾き、唾液の量、比較相手ごとの結果を確認します。",
  comparison: {
    caption: "放射線治療中の予防と、治療後の症状を調べた試験",
    note: "両試験の主な結果は、本人が感じる口の乾きの点数です。唾液量の群間比較は、ここで紹介した論文の本文にはありません。",
    rows: [
      { sectionId: "prevention-during-radiotherapy", sourceId: "garcia-2019", participants: "放射線治療を受ける中咽頭がん・上咽頭がんの人", measure: "口の乾きの質問票の点数", time: "放射線治療終了1年後" },
      { sectionId: "persistent-dry-mouth-after-radiotherapy", sourceId: "cohen-2024", participants: "放射線治療から1年以上経ち、口の乾きが続く人", measure: "口の乾きの質問票の点数", time: "研究開始4週後" },
    ],
  },
  sections: [
    {
      id: "prevention-during-radiotherapy",
      title: "放射線治療中に鍼を始めた予防試験",
      paragraphs: [
        "Garciaらの試験は、放射線治療を受ける中咽頭がん・上咽頭がんの患者399人を、鍼、模擬鍼、標準ケアの3群に分けました。鍼と模擬鍼は放射線治療と並行して行い、339人が治療終了1年後の評価を受けました。",
        "1年後の口の乾きの質問票（0〜100点）は、点数が低いほど症状が軽い尺度です。試験開始時の点数と施設を考慮した平均は、鍼群26.6点、模擬鍼群31.3点、標準ケア群34.8点でした。鍼群の点数は標準ケア群より低く、模擬鍼群との差は統計上明確ではありませんでした。米国と中国の施設では模擬鍼群の結果に違いがあり、施設ごとの比較は探索的な解析です。",
      ],
      sources: ["garcia-2019", "registration-prevention"],
    },
    {
      id: "persistent-dry-mouth-after-radiotherapy",
      title: "放射線治療から1年以上経った人の口の乾きを調べた試験",
      paragraphs: [
        "Cohenらは、頭頸部がんの放射線治療から1年以上経ち、口の乾きが続く258人を、鍼、模擬鍼、標準的な口腔ケアの3群に分けました。主な評価は、研究開始4週後に本人が答えた口の乾きの点数でした。",
        "4週後、鍼群の点数は標準的な口腔ケア群より調整後の平均で6.67点低くなりました（95%信頼区間2.27〜11.08点）。模擬鍼群との差は4.41点で、3通りの比較を考慮した統計上の基準を満たしませんでした。試験は、臨床上の目安とした10点の差を検出できるように計画されており、標準的な口腔ケアとの差の推定値はその目安を下回りました。",
        "論文ページの読者コメントに対する著者の回答でも、4週後の主な比較のうち、統計上の基準を満たしたのは鍼と標準的な口腔ケアの比較だったと説明しています。",
      ],
      sources: ["cohen-2024", "registration-treatment"],
    },
    {
      id: "symptoms-and-saliva",
      title: "口の乾きの点数と唾液量を分けて読む",
      paragraphs: [
        "両試験の主な結果は、食事中やそれ以外の場面でどの程度口が乾くかを聞く質問票の点数です。研究では唾液量も測りましたが、ここで紹介した論文の本文では唾液量の群間比較を報告していません。質問票の点数からは、唾液の量や唾液腺の働きがどれだけ回復したかは分かりません。",
      ],
      sources: ["garcia-2019", "cohen-2024"],
      exercise: {
        question: "口の乾きの点数が下がったと聞いたとき、唾液の量については何を確認しますか。",
        answer: "唾液の量を測った結果を確認します。質問票は人が感じる乾きや食事中の困りごとを記録するもので、唾液の量の変化は別の測定項目です。",
      },
    },
    {
      id: "guideline-context",
      title: "ガイドラインで、予防と症状への対応を確認する",
      paragraphs: [
        "ISOO・MASCC・ASCOの2021年ガイドラインは、頭頸部がんの放射線治療中に口の乾きのリスクを下げる目的で鍼を選択肢に含めています。根拠の質と推奨の強さは、いずれも中等度です。治療後の口の乾きへの鍼も選択肢に含め、根拠の質は低く、推奨は弱いと評価しています。2024年の試験は、このガイドラインの公表後に報告されました。",
        "放射線治療中や治療後に口の乾きが続くときは、食事や飲み込み、歯や口の状態も含めて治療を担当する医療者に伝えます。",
      ],
      sources: ["isoo-mascc-asco-2021", "cohen-2024"],
    },
  ],
  sources: [
    { id: "garcia-2019", label: "Garciaほか（2019年）", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2757250", scope: "JAMA Network Open。放射線治療中に鍼を始め、治療終了1年後の口の乾きを調べた予防試験。" },
    { id: "registration-prevention", label: "予防試験の登録（NCT01266044）", url: "https://clinicaltrials.gov/study/NCT01266044", scope: "放射線治療中に始めた鍼の試験計画と評価項目。" },
    { id: "cohen-2024", label: "Cohenほか（2024年）", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2818644", scope: "JAMA Network Open。放射線治療後の口の乾きを調べた試験。ページ末尾に比較の解釈に関する著者回答も掲載。" },
    { id: "registration-treatment", label: "治療後の試験の登録（NCT02589938）", url: "https://clinicaltrials.gov/study/NCT02589938", scope: "放射線治療後に続く口の乾きを対象とした試験計画と評価項目。" },
    { id: "isoo-mascc-asco-2021", label: "ISOO・MASCC・ASCOガイドライン（2021年）", url: "https://ascopubs.org/doi/10.1200/JCO.21.01208", scope: "推奨1.3と2.4。頭頸部がんの放射線治療中の口の乾きの予防と、治療後の口の乾きへの対応。" },
  ],
  related: [
    { href: "/tsubo/cv24#radiation-induced-dry-mouth", label: "承漿を使った口の乾きの研究" },
    { href: "/learn/acupuncture#combinations", label: "鍼の試験で何と比べるか" },
    { href: "/articles/science-of-tongue-diagnosis", label: "口の乾きや舌の状態を観察する" },
  ],
  tags: ["頭頸部がん", "放射線治療", "口腔乾燥", "口の乾き", "唾液", "鍼", "模擬鍼"],
};
