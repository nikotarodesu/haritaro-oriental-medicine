import type { AcupunctureResearchArticle } from "./types";

export const POSTOPERATIVE_NAUSEA_RESEARCH: AcupunctureResearchArticle = {
  slug: "postoperative-nausea",
  title: "術後の吐き気と内関（PC6）の研究",
  description: "手術後の吐き気や嘔吐を減らせるか、内関（ないかん）を使った研究を読み比べます。バンドで押す試験、薬と組み合わせた試験、妊娠初期の吐き気を調べた試験では、対象と測り方がそれぞれ異なります。",
  sections: [
    {
      id: "wristbands",
      title: "バンドを使った二つの試験",
      paragraphs: [
        "短時間の手術を受けた200人の試験では、術後に吐き気や嘔吐があった人は、バンドの突起が内関に当たる群で108人中25人、前腕の反対側に当たる群で92人中38人でした。",
        "成人の心臓手術を対象にした別の試験では、152人を指圧バンドと模擬バンドの群に分けました。術後24時間の吐き気、嘔吐、吐き気止めの必要性に明確な違いは見られませんでした。二つの試験は、手術の種類とバンドの対照条件が異なります。",
      ],
      sources: ["fan-1997", "klein-2004"],
    },
    {
      id: "review",
      title: "77試験をまとめたレビューで、何を比べたか",
      paragraphs: [
        "2025年のコクランレビューは、手術後の吐き気や嘔吐のリスクがある9,847人を含む77試験をまとめました。内関に鍼を使う方法や、バンドで圧をかける方法を、処置をまねた方法や吐き気止めなどと比べています。",
        "針を使わない方法を吐き気止めに加えた比較では、後から追加の吐き気止めが必要になる人が減ると見込まれました。予防後に追加の薬が必要だったか、吐き気や嘔吐が起きたかは、別々の結果です。手術を受けた人の条件や測定時点には違いがあり、副作用も報告が限られていました。",
      ],
      sources: ["cochrane-2025"],
    },
    {
      id: "pregnancy",
      title: "妊娠初期の吐き気では、何を測ったか",
      paragraphs: [
        "妊娠初期に中等度から重度の吐き気や嘔吐があった352人の試験では、鍼と模擬鍼、薬と偽薬を組み合わせて比較しました。15日目に、鍼を受けた群は模擬鍼を受けた群に比べ、妊娠中の吐き気や嘔吐を測る点数が平均0.7点多く下がりました。著者は、差の大きさが小さく、臨床的な意味ははっきりしないとしています。",
        "この試験は妊娠中の症状を鍼で調べたものです。手術後の試験では、麻酔や手術を受けたあとに吐き気や嘔吐が起きた人を数えています。内関の指圧バンドの試験と合わせて読むときは、参加者、刺激の方法、評価項目を一つずつ照らし合わせます。",
      ],
      sources: ["wu-2023", "cochrane-2025"],
    },
  ],
  sources: [
    {
      id: "fan-1997",
      label: "Fan ほか · Anesthesia & Analgesia（1997）",
      url: "https://doi.org/10.1097/00000539-199704000-00023",
      scope: "原著の抄録。短時間の手術、バンドを付けた部位、両群で吐き気や嘔吐が記録された人数を確認。",
    },
    {
      id: "klein-2004",
      label: "Klein ほか · Journal of Cardiothoracic and Vascular Anesthesia（2004）",
      url: "https://doi.org/10.1053/j.jvca.2003.10.014",
      scope: "原著の抄録。心臓手術を受けた成人、模擬バンド、術後24時間の結果を確認。",
    },
    {
      id: "cochrane-2025",
      label: "Lee ほか · コクランレビュー（2025年更新版）",
      url: "https://www.cochrane.org/evidence/CD003281_what-are-benefits-and-risks-different-wrist-pc6-acupoint-stimulation-techniques-preventing-nausea",
      scope: "2025年6月までの文献を調べた更新版の要約。試験数、追加の吐き気止め、副作用報告の限界を確認。",
    },
    {
      id: "wu-2023",
      label: "Wu ほか · Annals of Internal Medicine（2023）",
      url: "https://doi.org/10.7326/M22-2974",
      scope: "原著の抄録。妊娠初期を対象にした比較の方法、15日目の点数、著者が示した限界を確認。",
    },
  ],
  related: [
    { href: "/tsubo/pc6", label: "内関（PC6）の位置と注意点" },
    { href: "/learn/acupuncture#acupuncture-research", label: "鍼灸入門の「研究の読み方」" },
  ],
  tags: ["内関", "PC6", "術後悪心嘔吐", "術後の吐き気", "術後の嘔吐", "指圧バンド", "コクラン"],
};
