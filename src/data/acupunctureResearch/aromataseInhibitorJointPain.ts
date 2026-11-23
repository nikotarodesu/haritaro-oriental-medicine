import type { AcupunctureResearchArticle } from "./types";

export const AROMATASE_INHIBITOR_JOINT_PAIN_RESEARCH: AcupunctureResearchArticle = {
  slug: "aromatase-inhibitor-joint-pain",
  title: "乳がん治療のアロマターゼ阻害薬と関節痛｜鍼の比較試験",
  description: "乳がん治療でアロマターゼ阻害薬を服用する人の関節痛について、鍼・模擬鍼・待機を比べた米国の試験を読みます。6週と52週の結果、あざの頻度、診療ガイドラインの対象を確かめます。",
  sections: [
    {
      id: "pain-at-six-weeks",
      title: "6週後の痛みを、模擬鍼・待機と比べる",
      paragraphs: [
        "Hershmanらは米国の11施設で、早期乳がんの治療でアロマターゼ阻害薬を服用し、関節痛がある閉経後の女性226人を、鍼、模擬鍼、鍼の施術を待つ群に分けました。本人が答えた最も強い痛みを0〜10点で評価し、6週時点の点数を主な評価項目にしました。",
        "6週までに痛みは、鍼群で平均2.05点、模擬鍼群で1.07点、待機群で0.99点下がりました。開始時の痛みなどを調整した群間差は、鍼群の点数が模擬鍼群より0.92点低く（95％信頼区間0.20〜1.65点）、待機群より0.96点低い（0.24〜1.67点）という結果でした。",
      ],
      exercise: {
        question: "鍼群の痛みは開始時から平均2点以上下がりました。模擬鍼と比べた差も、試験であらかじめ目安にした2点に届いたでしょうか。",
        answer: "模擬鍼群との調整後の差は0.92点でした。待機群との差も0.96点です。いずれも、試験で臨床的に重要な群間差の目安とした2点を下回りました。鍼群の開始時からの変化と、比較した群との差をそれぞれ確認します。",
      },
      sources: ["hershman-2018", "s1200"],
    },
    {
      id: "follow-up-at-fifty-two-weeks",
      title: "同じ参加者を52週まで追跡した結果",
      paragraphs: [
        "2022年の報告では、同じ試験の226人を追跡し、191人が52週まで完了しました。52週時点の痛みの点数は、開始時の痛みなどを調整すると、鍼群で模擬鍼群より1.08点低く（95％信頼区間0.24〜1.91点）、待機群より0.99点低い（0.12〜1.86点）という結果でした。",
        "24週から52週までの間は、どの群の参加者にも鍼を受ける機会があり、実際に受けたと報告した人もいました。追跡結果を読むときは、当初の割り付けと、その後に受けた施術の両方を確かめます。アロマターゼ阻害薬を中止した割合に、群による明確な差は見つかりませんでした。",
      ],
      sources: ["hershman-2022", "s1200"],
    },
    {
      id: "bruising-and-participants",
      title: "あざの報告と、参加者の背景",
      paragraphs: [
        "最初の報告では、軽いあざが鍼群の47％、模擬鍼群の25％に報告されました。痛みの点数と同じように、どんな望ましくない変化を数えたかも確認します。",
        "この試験の参加者の大半は白人で、アジア系と記録されたのは15人でした。日本の患者でも同じ大きさの差が出るかは、この試験だけでは分かりません。",
      ],
      sources: ["hershman-2018", "hershman-2022"],
    },
    {
      id: "guideline-scope",
      title: "診療ガイドラインは、どの痛みを対象にしているか",
      paragraphs: [
        "米国臨床腫瘍学会（ASCO）と国際統合腫瘍学会（SIO）の2022年の共同ガイドラインは、乳がん治療のアロマターゼ阻害薬に関連する関節痛への対応として鍼を勧めています。根拠の確かさと推奨の強さは、いずれも中等度です。",
        "ここで紹介した試験が調べたのは関節痛です。乳がん治療中に関節が痛む場合は、痛む場所や始まった時期を処方した医師に伝え、薬の使い方はその指示に従います。",
      ],
      sources: ["sio-asco", "hershman-2018"],
    },
  ],
  sources: [
    { id: "hershman-2018", label: "Hershmanほか（2018年）", url: "https://jamanetwork.com/journals/jama/fullarticle/2687355", scope: "JAMA。対象、事前に定めた差の目安、6週評価、あざの報告と表1。" },
    { id: "hershman-2022", label: "Hershmanほか（2022年）", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2798317", scope: "JAMA Network Open。同じ試験の52週時点の結果、途中で受けた施術、参加者の背景と薬の中止割合。" },
    { id: "s1200", label: "SWOG S1200 試験登録（NCT01535066）", url: "https://clinicaltrials.gov/study/NCT01535066", scope: "6週評価と、その後の追跡時点。両報告の試験登録番号。" },
    { id: "sio-asco", label: "SIO・ASCOのがんの痛みに関する共同ガイドライン（2022年）", url: "https://doi.org/10.1200/JCO.22.01357", scope: "乳がんのアロマターゼ阻害薬に関連する関節痛の項目と、根拠の確かさ・推奨の強さ。" },
  ],
  related: [
    { href: "/learn/acupuncture/research", label: "鍼灸の研究解説を一覧で見る" },
    { href: "/learn/acupuncture/research/adverse-events", label: "鍼灸の有害事象を数字で読む" },
    { href: "/safety", label: "受診の目安と鍼灸の安全性を確認する" },
    { href: "/library#paper-cancer-pain-electroacupuncture-auricular-peace-trial-mao-2021", label: "がん治療後の別の痛みを扱った研究を読む" },
  ],
  tags: ["乳がん", "アロマターゼ阻害薬", "関節痛", "鍼", "模擬鍼", "がん支持療法", "SWOG S1200"],
};
