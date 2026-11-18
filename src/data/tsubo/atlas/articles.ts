import type { AcupointAtlasArticle } from "./types";

const WHO_URL = "https://iris.who.int/bitstream/handle/10665/353407/9789290613831-eng.pdf?sequence=1";
const whoLocation = (scope: string) => ({
  name: "WHO西太平洋地域事務局『WHO標準経穴部位』2008年、2009年改訂再版（PDF）",
  url: WHO_URL,
  scope,
});

const emergency = {
  name: "厚生労働省「こんな時は迷わず119へ」",
  url: "https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html",
  scope: "救急車を呼ぶ目安を参照。",
};

const warming = {
  name: "製品評価技術基盤機構（NITE）「温活グッズの事故」",
  url: "https://www.nite.go.jp/jiko/chuikanki/mailmagazin/2024fy/vol468_250114.html",
  scope: "カイロによる低温やけどを防ぐための注意を参照。",
};

const pressure = {
  name: "臺北榮民總醫院 看護部の手足のケアガイド（中国語）",
  url: "https://ihealth.vghtpe.gov.tw/media/1221",
  scope: "痛みを起こさない力加減と、皮膚に異常があるときに押さないという一般的な注意を参照。",
};

export const ATLAS_ARTICLES: Readonly<Record<string, AcupointAtlasArticle>> = {
  pc6: {
    description: "内関（PC6）の場所を、手首のしわと2本の腱を目印に図解。指で押すときの注意、胸の症状で受診を優先する目安、WHO標準の位置を紹介します。",
    meridianReading: "てのけついんしんぽうけい",
    regionLabel: "手のひら側の前腕、手首のしわから少し肘寄り",
    lead: "内関は、手のひら側の腕にあるツボです。手首のしわと、筋肉の力を伝える2本のすじ（腱）が目印です。左右の腕で同じように探せます。",
    safetyWarning: "胸の痛み、動悸、脈が乱れる感じがあるときは、ツボ押しより先に医療機関に相談してください。急な激しい胸の痛みや息苦しさがあるとき、動悸に胸痛や気が遠くなる感じを伴うときは、すぐに119番へ。",
    location: [
      "手のひらを上に向け、手首にできる横じわを見つけます。反対の手の人差し指・中指・薬指をそろえ、薬指の縁をしわに合わせます。人差し指の肘側の縁までが、手首からの距離のおおよその目安です。",
      "握りこぶしを軽く作ると、拡大図の①長掌筋の腱と②橈側手根屈筋の腱が浮き出ることがあります。肘寄りに測ったところで、その2本の間を見ます。腱がはっきり分からなければ、強く押して探す必要はありません。",
    ],
    traditional: [
      "内関は、吐き気や胸のつかえと伝統的に関連づけられてきました。胸の症状は先に受診を。吐き気が長引く、繰り返す場合も、原因を確認するため医療機関に相談してください。",
    ],
    selfCare: [
      "肘を机などで支え、腕を楽にします。反対の手の親指の腹を当て、痛みを感じない強さでゆっくり押し、力を抜きます。冷えるときは袖や手袋などで保温できます。カイロの肌への直当てや長時間の使用は避けましょう。",
    ],
    cautions: [
      "傷、発疹、赤い腫れのある場所は押さないでください。指先へ電気が走るような痛みやしびれが出たら、すぐに手を離してください。",
    ],
    expert: [
      "WHO標準では手関節掌側横紋（手のひら側の手首のしわ）から肘側へ2寸。骨度法の寸は、自分の体の長さを基準にした単位です。位置は長掌筋腱（ちょうしょうきんけん）と橈側手根屈筋腱（とうそくしゅこんくっきんけん）の間。長掌筋腱がない場合、後者の小指側に取ります。",
    ],
    symptomLinks: [{ href: "/symptoms/stress-insomnia", label: "ストレス・不安・寝付きの悪さの症状ガイド" }],
    relatedPoints: [
      { code: "PC7", text: "同じ2本の腱の間で、手首のしわの上にあります。" },
      { code: "PC5", text: "同じ経絡で、内関より少し肘寄りにあります。" },
    ],
    sources: [
      whoLocation("内関の位置と、周辺の経絡上の順序を参照（pp.153–156、内関は p.154）。"),
      {
        name: "『黄帝内経 霊枢』経脈篇（原文）",
        url: "https://www.cntcm.org/shu/101-3-10.html",
        scope: "内関が胸の症状と関連づけられてきた背景を参照。",
      },
      {
        name: "Memorial Sloan Kettering Cancer Center の患者向け内関ガイド",
        url: "https://www.mskcc.org/cancer-care/patient-education/acupressure-nausea-and-vomiting",
        scope: "吐き気との関連が紹介される文脈、指幅による探し方、指で押すときの注意を参照。",
      },
      emergency,
      {
        name: "英国国民保健サービス（NHS）「Heart palpitations」",
        url: "https://www.nhs.uk/symptoms/heart-palpitations/",
        scope: "動悸と一緒に起こる症状から受診を急ぐ目安を参照。",
      },
      warming,
    ],
    illustration: {
      region: "volarForearm",
      bodyLabel: "左右の手のひら側の前腕（手首寄り）",
      closeUpAlt: "手のひら側の手首と前腕。手首のしわから肘寄りに測り、①長掌筋の腱と②橈側手根屈筋の腱の間に内関（PC6）を示す。",
      closeUpCaption: "手首のしわから肘側へ進み、①と②の腱の間にある印を見ます。指3本の幅は距離のおおよその目安です。",
      meridianStart: 4,
      meridianEnd: 9,
      meridianCaption: "前腕から中指にかけての心包経（PC4〜PC9）。内関（PC6）は間使（PC5）と大陵（PC7）の間です。",
    },
  },
  st36: {
    description: "足三里（ST36）の場所を、膝のお皿とすねの骨を目印に図解。自宅で押すときの注意、胃もたれの症状ガイド、WHO標準の位置を紹介します。",
    meridianReading: "あしのようめいいけい",
    regionLabel: "膝の下、すねの骨の前縁より外側",
    lead: "足三里は、膝の下にあるツボです。膝のお皿の下のくぼみと、すねの前に触れる硬い骨の縁が目印です。左右の脚で同じように探せます。",
    location: [
      "椅子に座って膝を曲げ、足の裏を床につけます。①膝蓋骨（しつがいこつ、膝のお皿）のすぐ下で、外側にある小さなくぼみを見つけます。左右の脚とも、体の中心から離れる側が外側です。",
      "くぼみから足首へ向かい、自分の人差し指から小指まで4本をそろえた幅を、おおよその目安に下がります。その高さで、②脛骨（けいこつ、すねの骨）の前の縁より少し外側にある筋肉の上が足三里です。つま先を少し持ち上げると、その筋肉の位置を確かめやすくなります。",
    ],
    traditional: [
      "足三里は胃もたれや食欲の低下など、胃腸の不調と伝統的に関連づけられてきました。食欲が戻らない、症状が繰り返す場合は医療機関へ。突然の激しい腹痛があるときは、すぐに119番へ連絡してください。",
    ],
    selfCare: [
      "脚の力を抜き、親指の腹を筋肉の上にそっと当てます。痛くない強さでゆっくり押して離し、骨の縁を強く押し込まないようにします。すねが冷えるときは衣類やひざ掛けで保温し、カイロを肌に直接当てたり、同じ場所に長く当てたりしないでください。",
    ],
    cautions: [
      "傷や赤い腫れ、熱を持った場所は押さないでください。けがをした直後や膝に強い痛みがあるときは、ツボを探すより受診を優先しましょう。",
    ],
    expert: [
      "WHO標準では、犢鼻（とくび・ST35、膝のお皿の下の外側のくぼみ）と解渓（かいけい・ST41、足首の前の中央）を結ぶ線上で、犢鼻から足首側へ3寸。骨度法の寸は体の長さを基準にした単位です。点は前脛骨筋（ぜんけいこつきん、つま先を持ち上げる筋肉）の上にあります。",
    ],
    symptomLinks: [{ href: "/symptoms/stomach-fatigue", label: "胃もたれ・食欲不振・軟便の症状ガイド" }],
    relatedPoints: [
      { code: "ST35", text: "足三里を探す出発点になる、膝の下のくぼみにあります。" },
      { code: "ST37", text: "同じ経絡で、足三里より足首寄りにあります。" },
    ],
    sources: [
      whoLocation("足三里の位置と経絡上の順序、解渓の位置を参照（pp.63–66、足三里は p.64）。"),
      {
        name: "国立障害者リハビリテーションセンター「東洋の経験と知恵を活かして健やかな毎日を」",
        url: "https://www.rehab.go.jp/rehanews/japanese/No276/10_story.html",
        scope: "足三里が胃腸の調子と関連づけられてきた文脈を参照。",
      },
      {
        name: "松江市立病院「ツボ刺激・足湯」",
        url: "https://www.matsue-cityhospital.jp/nurse/osan/osannonagare.data/leaflet2025.pdf",
        scope: "おおよその距離を指4本分で測る案内を参照。",
      },
      pressure,
      emergency,
      warming,
    ],
    illustration: {
      region: "anterolateralLowerLeg",
      bodyLabel: "左右の膝の下、すねの前外側",
      closeUpAlt: "膝からすねの前面。①膝蓋骨の下の外側のくぼみを起点に足首側へ測り、②脛骨の前縁より外側の前脛骨筋に足三里（ST36）を示す。",
      closeUpCaption: "①膝のお皿のすぐ下にある外側のくぼみから足首側へ。足三里は②すねの骨のすぐ外側で、つま先を持ち上げる筋肉の上です。",
      meridianStart: 34,
      meridianEnd: 39,
      meridianCaption: "膝の周りからすねにかけての胃経（ST34〜ST39）。足三里（ST36）は犢鼻（ST35）と上巨虚（ST37）の間です。",
    },
  },
  lr3: {
    description: "太衝（LR3）の場所を、足の親指と第2趾につながる骨を目印に図解。自宅で押すときの注意、関連するツボ、WHO標準の位置を紹介します。",
    meridianReading: "あしのけついんかんけい",
    regionLabel: "足の甲、親指とその隣の指につながる骨の間",
    lead: "太衝は、足の甲にあるツボです。親指と、その隣の指につながる2本の骨が、足首側で近づくところを目印にします。左右の足で同じように探せます。",
    location: [
      "椅子に座り、足を床に置いて、つま先の力を抜きます。親指とその隣の指の間から、足の甲を足首へ向かってそっとなぞります。拡大図の①は親指につながる骨、②はその隣の指につながる骨です。",
      "2本の骨の間が狭まるところまでたどり、そこからほんの少し指先側に戻ったくぼみが太衝です。指のまたに近い場所とは区別し、指何本分と測るよりも、骨の並びを目印にしましょう。",
    ],
    traditional: [
      "太衝は、気の巡りという伝統医学の考え方の中で、いらだちや目の疲れに関連づけられてきました。目の痛みや見え方の変化が続くときは眼科に相談してください。突然、見える範囲が狭くなったり、物が二重に見えたりしたときは、すぐに119番へ連絡してください。",
    ],
    selfCare: [
      "足を無理なく支え、親指の腹で痛くない程度にゆっくり押し、力を抜きます。くぼみに指を強く押し込む必要はありません。足が冷えるときは靴下で保温し、カイロを肌に直接当てたり、つけたまま眠ったりしないでください。",
    ],
    cautions: [
      "傷、赤い腫れ、熱を持ったところは押さないでください。押して痛みやしびれが出たらすぐに手を離し、足の痛みや腫れが続くときは医療機関へ相談してください。",
      "妊娠中は体のどの場所も強く押さず、ツボ押しを始める前に産科の担当者に相談してください。",
    ],
    expert: [
      "WHO標準では、第1・第2中足骨（ちゅうそくこつ、足の甲で指につながる骨）の根元が接する部位のすぐ指先側で、骨の間のくぼみにあります。足の甲に血液を送る足背動脈（そくはいどうみゃく）の上にあたります。足の指のまたに近い行間（LR2）よりも、足首寄りです。",
    ],
    symptomLinks: [{ href: "/symptoms/eye-strain-fatigue", label: "眼精疲労・ドライアイ・目のかすみの症状ガイド" }],
    relatedPoints: [
      { code: "LR2", text: "同じ経絡で、親指と隣の指のまたに近いツボです。" },
      { code: "LI4", text: "手の甲にあり、太衝との組み合わせは伝統的に「四関（しかん）」と呼ばれます。" },
    ],
    sources: [
      whoLocation("太衝の位置と周辺の経絡上の順序を参照（pp.196–198、太衝は p.197）。"),
      {
        name: "東京女子医科大学附属東洋医学研究所「東洋医学研究所便り Vol.2」（PDF）",
        url: "https://www.twmu.ac.jp/hospital/IOM/wp-content/uploads/2023/04/tayori02.pdf",
        scope: "親指と隣の指の間から、足首へ向かって探す方法を参照。",
      },
      {
        name: "森ノ宮医療大学「ここから」第31号（PDF）",
        url: "https://www.morinomiya.ac.jp/wp-content/themes/morinomiya/common/pdf/schoolguide/cocokara/backnumber31.pdf",
        scope: "太衝が気の巡りや目の症状と関連づけられてきた文脈を参照。",
      },
      {
        name: "臺北市立聯合醫院 院内広報誌 第171号（中国語）",
        url: "https://websrv01.tpech.gov.tw/eBook/171/29/",
        scope: "太衝をいらだちと関連づける伝統医学の考え方を参照（p.29）。",
      },
      {
        name: "楊継洲『針灸大成』楊氏注解（原文）",
        url: "https://www.shidianguji.com/zh/book/NCM011X411999030508/chapter/1ly7mxdmylpv2",
        scope: "太衝と合谷の組み合わせを「四関」と呼ぶ背景を参照。",
      },
      {
        name: "全日本鍼灸学会『鍼灸安全対策ガイドライン』2025年版（PDF）",
        url: "https://safety.jsam.jp/img/file1.pdf#page=20",
        scope: "妊娠中に強い刺激を避けるという、鍼灸施術時の安全上の一般的な注意を参照（p.11）。",
      },
      pressure,
      emergency,
      warming,
    ],
    illustration: {
      region: "footDorsum",
      bodyLabel: "左右の足の甲（親指寄り）",
      closeUpAlt: "足の甲。①親指につながる第1中足骨と②隣の指につながる第2中足骨が近づく場所のすぐ指先側、2本の骨の間に太衝（LR3）を示す。",
      closeUpCaption: "①親指につながる骨と②隣の指につながる骨を足首に向けてたどり、2本が近づくところのすぐ指先側のくぼみを見ます。",
      meridianStart: 1,
      meridianEnd: 6,
      meridianCaption: "足の親指からすねの内側にかけての肝経（LR1〜LR6）。太衝（LR3）は行間（LR2）と中封（LR4）の間です。",
    },
  },
};
