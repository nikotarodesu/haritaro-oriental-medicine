import type { AtlasStudy } from "./types";

export const RECHECKED_POINT_STUDIES: readonly AtlasStudy[] = [
  {
    id: "vascular-cognitive-impairment-acupuncture",
    topic: "血管性認知障害のある人で鍼と薬を比較した試験",
    kind: "combination",
    points: ["st36", "sp10", "cv17", "cv12", "cv6", "gv20", "gv16", "bl15", "bl45", "ht5", "ki6", "ki3", "gb39", "st40", "pc6", "bl17"],
    result: "3か月後の認知機能の得点（ADAS-cog、低いほど良い）は、鍼の群で薬の群より調整後で0.95点低く、6か月後の差は1.36点でした。主解析では時計描画や日常生活動作の指標に明確な群間差はありませんでした。",
    design: "認知症の診断に至っていない血管性認知障害のある216人を、複数の経穴を使う鍼と、薬（シチコリン）に無作為に割り付けました。譩譆は、実施した鍼の配穴に含まれます。",
    limits: "参加者はどちらの治療を受けたか分かる試験です。認知機能の得点差が日常生活でどの程度の違いになるか、譩譆を単独で使った効果、認知症への進行を防ぐ効果は分かりません。",
    sources: [
      { label: "Yang ほか · Clinical Rehabilitation（2019）試験結果", url: "https://pubmed.ncbi.nlm.nih.gov/30672317/" },
      { label: "同じ登録番号の試験計画書（ISRCTN82980206）", url: "https://doi.org/10.1186/1745-6215-15-442" },
    ],
  },
  {
    id: "lumbar-spinal-stenosis-pharmacopuncture-acupotomy",
    topic: "腰部脊柱管狭窄症で薬鍼と鍼刀を追加した試験",
    kind: "combination",
    points: [],
    additionalPointGroups: [
      { label: "薬鍼で選択できた候補", points: ["gv3", "gv4", "gv5", "bl22", "bl23", "bl24", "bl25", "bl26", "bl53", "bl54", "gb30", "gb31", "gb34", "st36", "st40", "lr3"], candidate: true },
    ],
    otherPoints: "経穴コードが付いた候補のほか、腰部の夾脊や圧痛のある箇所も候補に挙げられています。",
    result: "6週間後、腰・臀部・脚の痛みや不快感の指標（0〜100 mm）は、薬鍼と鍼刀を追加した群で調整後に20.26 mm低くなりました（95%信頼区間13.79〜26.72 mm）。",
    design: "変性による腰部脊柱管狭窄症の104人を、両群に共通の韓医学の治療に薬鍼と鍼刀を加える群と、共通治療のみの群に無作為に割り付けました。胞肓は症状や画像所見に応じて薬鍼で選べる候補です。",
    limits: "1施設の試験で、患者と施術者は割り付けを把握していました。胞肓が使われた人数や、薬鍼・鍼刀のそれぞれの寄与は分かりません。",
    sources: [{ label: "Integrative Medicine Research（オンライン公開2025年）介入方法と表2", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12410340/" }],
  },
  {
    id: "childhood-myopia-plum-blossom-point-sets",
    topic: "近視のある子どもで、梅花鍼の2種類の配穴を比較した試験",
    kind: "combination",
    points: ["gv14", "gv20", "gb16", "gb20", "li4", "pc6"],
    comparisonPoints: ["te23", "st2", "gb14"],
    additionalPointGroups: [{ label: "両群で共通して使った経穴", points: ["bl2"], shared: true }],
    otherPoints: "魚腰と太陽も両群で使い、正光1・2は目の周りを中心とする群で使いました。",
    result: "12週間後の裸眼視力は目窓を含む配穴の群が良好でした。近視の度数や角膜の曲率には明確な群間差がなく、眼軸の長さは両群で治療前より伸びました。",
    design: "軽度から中等度の近視がある6〜12歳の80人を、目窓を含む配穴の群と、目の周りを中心とする配穴の群に無作為に割り付け、いずれの群も梅花鍼を受けました。",
    limits: "両群とも施術を受け、配穴は複数の点が異なります。近視の進行を抑えられるか、目窓だけで裸眼視力が変わるかは、この試験からは分かりません。",
    sources: [{ label: "Beijing Journal of Traditional Chinese Medicine（2025）抄録の方法と結果", url: "https://www.bjtcm.net/en/article/doi/10.16025/j.1674-1307.2025.10.008/" }],
  },
  {
    id: "postprostatectomy-pad-use",
    topic: "前立腺がんの手術後の尿もれとパッド使用枚数",
    kind: "combination",
    points: ["bl32", "bl33", "bl34"],
    result: "施術開始から6週後、パッドの使用が1日0〜1枚になった人は、電気鍼群の55人中24人、模擬刺激群の55人中12人でした。",
    design: "前立腺がんの手術から4〜6週が経ち、毎日パッドを2枚以上使っていた男性110人を、次髎・中髎・下髎を使う電気鍼と、皮膚を刺さない模擬刺激に無作為に割り付けました。",
    limits: "パッドを1枚使う場合も回復の基準に含みます。20週までにこの基準に達した人の割合に明確な群間差はなく、各経穴を単独で使った場合の効果も分かりません。",
    sources: [{ label: "Niu ほか · JAMA Network Open（2025）方法と表2", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2839485" }],
  },
];
