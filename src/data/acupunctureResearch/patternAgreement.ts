import type { AcupunctureResearchArticle } from "./types";

export const PATTERN_AGREEMENT_RESEARCH: AcupunctureResearchArticle = {
  slug: "pattern-diagnosis-agreement",
  title: "同じ症例でも弁証が分かれるのはなぜ？ 所見の読み比べ",
  description: "慢性腰痛のある6人を、6人の鍼灸師が同じ日に評価した研究を読みます。架空の症例で、見立てを支える所見と次に聞きたいことを比べます。",
  sections: [
    {
      id: "same-patients",
      title: "同じ6人を評価して、どこまで一致したか",
      paragraphs: [
        "Hogeboomらは、慢性腰痛のある同じ6人を、6人の鍼灸師が同じ日に評価する研究を行いました。多くの鍼灸師が、気や血の滞りに腎虚を伴うと見立て、腎兪を配穴案に挙げました。見立ての細かな内容や、ほかの経穴の選び方にはばらつきがありました。",
        "この研究で比べたのは、評価した人同士の見立てです。施術は行っていないので、どの見立てや配穴で腰痛が改善したかは分かりません。患者6人の結果を、ほかの症状や流派にもそのまま当てはめることはできません。",
      ],
      sources: ["hogeboom"],
    },
    {
      id: "case-notes",
      title: "架空症例で、二人が注目した所見を比べる",
      paragraphs: [
        "48歳の人が「3か月ほど腰が重い。寒い場所で長く立ち仕事をした日はつらく、座って休むと少し楽」と話しました。暖かい場所で立ち仕事をした日や、立ち時間が短い日の経過は、まだ聞いていません。",
        "一人目は「寒い場所」に注目し、寒さとの関係を候補に挙げました。二人目は「長く立ち仕事をした日」と「座って休むと少し楽」に注目し、立ち続ける負担や休息との関係を考えました。寒さと立ち時間が重なる日の話なので、今の情報だけではその影響を分けられません。",
      ],
      exercise: {
        question: "次に何を聞くと、二人の見立てを比べやすくなる？",
        answer: "「暖かい場所で同じくらい長く立った日も重くなりましたか」「冷えを感じても、立ち時間が短かった日はどうでしたか」と聞きます。どの日の話か、どこがつらかったかも一緒に記録します。強い症状や新しいしびれなどがあれば、受診を急ぐ所見の確認を先に行います。",
      },
      sources: [],
    },
    {
      id: "agreement-and-accuracy",
      title: "一致したか、正しかったか、役に立ったか",
      paragraphs: [
        "同じ症例記録を8人に読んでもらったBirkefletらの研究でも、弁証の一致は低く、判断に使う症状や所見に違いがありました。Jacobsonらの系統的レビューでは、評価者間の一致を調べた研究を集め、症例、分類の選択肢、調べ方が研究ごとに異なることを確認しています。",
        "二人が同じ証を選べば、その条件では判断が一致したと言えます。病気を正しく判定できるかを知るには、病気を判定する別の基準と比べます。弁証を使って施術を選ぶと結果が良くなるかを知るには、選び方を変えて患者の経過を比べる研究が必要です。",
      ],
      sources: ["birkeflet", "jacobson"],
    },
    {
      id: "kampo-study",
      title: "日本の漢方外来で、寒熱と気血水の一致を調べた研究",
      paragraphs: [
        "Maeda-Minamiらは、国内の一つの漢方外来で64人分の資料を使い、3人の専門医の判断を比べました。寒熱の分類は64.6％、気・血・水の分類は35.9％が一致したと報告しています。医師はこの比較のために対面で診察する代わりに、問診票をもとに判断しました。",
        "寒熱と気血水では、選べる分類の数や内容も違います。この研究はその条件で専門医同士の判断を比べたものです。気虚などを選ぶサイトの体質チェックについて、病気を見つけられるかを調べた研究ではありません。",
      ],
      sources: ["maeda-minami"],
    },
  ],
  sources: [
    { id: "hogeboom", label: "Hogeboom ほか · Complementary Therapies in Medicine（2001）", url: "https://pubmed.ncbi.nlm.nih.gov/11926429/", scope: "抄録の対象、評価方法、結果。慢性腰痛の6人を対象とした評価者間の比較。" },
    { id: "birkeflet", label: "Birkeflet ほか · Acupuncture in Medicine（2014）", url: "https://pubmed.ncbi.nlm.nih.gov/24809366/", scope: "抄録の対象、方法、結果。8人の鍼灸師が25件の症例記録を読んだ比較。" },
    { id: "jacobson", label: "Jacobson ほか · Journal of Alternative and Complementary Medicine（2019）", url: "https://pubmed.ncbi.nlm.nih.gov/31730402/", scope: "系統的レビューの抄録。収載した研究の条件と、評価者間の一致に関する結果。" },
    { id: "maeda-minami", label: "Maeda-Minami ほか · Journal of Alternative and Complementary Medicine（2021）", url: "https://pubmed.ncbi.nlm.nih.gov/33861620/", scope: "抄録と本文の対象・方法・限界。64人分の資料を3人の専門医が評価した単施設研究。" },
  ],
  related: [
    { href: "/simulator", label: "所見から弁証の候補を比べる" },
    { href: "/clinical/symptoms/back", label: "腰痛の主訴別ガイドを読む" },
    { href: "/learn/acupuncture/research/low-back-pain-sciatica", label: "腰痛と坐骨神経痛の施術試験を読む" },
    { href: "/articles/science-of-tongue-diagnosis", label: "同じ舌の写真で評価が一致するかを読む" },
    { href: "/articles/science-of-pulse-diagnosis", label: "脈の所見の一致と病気の判別を分けて読む" },
  ],
  tags: ["弁証", "見立て", "四診", "評価者間一致", "再現性", "診断精度", "慢性腰痛"],
};
