import { AcupointDetail } from "./types";
import { CROSS_SECTIONS } from "./crossSectionsData";

export const DETAILED_ACUPOINTS: Record<string, AcupointDetail> = {
  li4: {
    id: "li4",
    legacyId: "gokoku",
    code: "LI4",
    codeLower: "li4",
    name: "合谷",
    kana: "ごうこく",
    romaji: "Hegu",
    aliases: ["虎口", "含口"],
    meridianId: "large-intestine",
    meridian: "手の陽明大腸経",
    meridianShort: "大腸経",
    meridianOrder: 4,
    bodyPart: "手・腕",
    bodyRegionDetail: "手背・第1第2中手骨間",
    locationSimple: "手の甲側で、人差し指につながる骨の長さの中央付近、その親指側にあります。",
    locationDetail: "手背、第2中手骨中点の橈側（親指側）。骨の付け根ではなく、骨の長さの中央を目印にする。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に手掌を下にしてリラックスした姿勢をとらせる。",
      "検者は反対側の母指の第1関節の横紋を、患者の第1・第2中手骨間（水かきの縁）に当てる。",
      "母指の先端を折り曲げた位置が、おおむね合谷の位置となる（簡易取穴法）。",
      "標準位置は第2中手骨（示指につながる骨）の長さの中央、その親指側。圧痛や響きの有無だけで位置を判断しない。",
    ],
    palpationLandmarks: [
      "第2中手骨の骨幹部中点（最も確実な骨性指標）",
      "第1背側骨間筋の筋膨隆部（母指と示指を閉じたときに最も盛り上がる頂点）",
      "第2中手骨の頭部と底部を区別して中点を確認",
    ],
    pitfalls: "本教材はWHO標準の第2中手骨中点の橈側を採用しています。日本・韓国の旧来の教材には中手骨底付近の記載もありますが、標準位置と混同しないでください。位置の違いだけから効果の強弱は断定できません。位置表記の相違についてはUmemotoら（2021、doi:10.1155/2021/9857079）の著者による補足を参照しています。",
    indications: [
      "頭痛・片頭痛・筋緊張性頭痛",
      "歯痛・抜歯後疼痛・三叉神経痛",
      "眼精疲労・目の充血・かすみ目",
      "肩こり・頚部緊張・寝違え",
      "顔面神経麻痺・口眼歪斜",
      "便秘・腹痛・消化器不全",
      "自律神経失調・精神緊張・不眠",
    ],
    categories: ["原穴", "四総穴（面目を治す）", "四関穴"],
    clinicalNote: "伝統的には頭部・顔面の症状などとの関連を学ぶ経穴です。太衝との組み合わせは「四関」として扱われますが、配穴名だけで臨床効果や個人への適応は決まりません。",
    caution: "伝統的に妊娠中の慎重穴とされますが、子宮収縮作用を経穴名だけで断定できません。妊娠中はどの部位でも強刺激を避け、産科の担当者へ相談してください。",
    status: "published",
    hasDetailedAnatomy: true,
    crossSection: CROSS_SECTIONS.li4,
    researchEvidence: {
      "focus": "健常者への合谷刺激とfMRI信号の変化",
      "findings": "健常者13人を対象とした2000年の予備的fMRI研究で、合谷への鍼操作に伴う脳信号の変化が報告されています。画像信号の変化は、患者への鎮痛効果やオピオイド分泌を直接証明したものではありません。",
      "mechanisms": [
        "感覚刺激と脳の画像信号との関連を調べた研究",
        "得気と痛みを感じた参加者で反応が異なったという観察"
      ],
      "sources": [
        {
          "title": "Acupuncture modulates the limbic system and subcortical gray structures of the human brain: evidence from fMRI studies in normal subjects",
          "pmid": "10643726",
          "year": "2000"
        }
      ],
      "limitations": "少人数の健常者での画像研究です。対象疾患の治療効果、合谷単独の特異的効果、患者ごとの反応を確定する研究ではありません。"
    },
    classicalReferences: [
      {
        book: "四総穴歌（針灸大成）",
        quote: "肚腹三里に留め、腰背委中に求む。頭項列缺に尋ね、面目合谷に収む。",
        meaning: "顔面・目の領域と合谷を関連づけた伝統的な記述。あらゆる疾患の治癒や、個々の患者への効果を示す臨床的な根拠ではありません。",
      },
      {
        book: "霊枢・本輸篇",
        quote: "大腸上りて手の大指次指の爪甲の端に出づ…過ぐること合谷にす、合谷は両骨の間なり、原と為す。",
        meaning: "手の陽明大腸経の元気が出納する原穴として、両骨（第1・第2中手骨）の間に位置することを定義。",
      },
    ],
    nearbyPoints: [
      { code: "LI3", name: "三間", relation: "前腕寄り・同経穴", distance: "第2中手指節関節の近位橈側（合谷の前方約1寸）" },
      { code: "LI5", name: "陽渓", relation: "手関節部・同経穴", distance: "手関節背側横紋の橈側、解剖学的嗅ぎタバコ入れ（合谷の後方約1.5寸）" },
      { code: "LR3", name: "太衝", relation: "足部相対応配穴（四関穴）", distance: "第1・第2中足骨底結合部前方の陥凹部（足の合谷に相当）" },
    ],
  },

  pc6: {
    id: "pc6",
    legacyId: "naikan",
    code: "PC6",
    codeLower: "pc6",
    name: "内関",
    kana: "ないかん",
    romaji: "Neiguan",
    aliases: ["陰維穴"],
    meridianId: "pericardium",
    meridian: "手の厥陰心包経",
    meridianShort: "心包経",
    meridianOrder: 6,
    bodyPart: "手・腕",
    bodyRegionDetail: "前腕掌側遠位部・手関節上2寸",
    locationSimple: "手首の内側のしわから、肘に向かって指3本分上がったところ（2本の腱の間）。",
    locationDetail: "前腕前側、長掌筋腱と橈側手根屈筋腱の間、手関節掌側横紋の上方2寸。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に手掌を上（仰臥位・座位）にして手関節を軽く屈曲させ、握りこぶしを作らせる。",
      "手関節の掌側中央に浮き出る「長掌筋腱（内側）」と「橈側手根屈筋腱（外側）」を触知する（※長掌筋腱が先天的に欠如している場合は、橈側手根屈筋腱の内縁をとる）。",
      "手関節掌側横紋（手首の最遠位のしわ）から、肘に向かって患者自身の同身寸で2寸（指3本分の幅）を計測する。",
      "2本の腱の間の中央、陥凹部にとる。",
    ],
    palpationLandmarks: [
      "橈側手根屈筋腱（手首を橈屈した際に強く触知）",
      "長掌筋腱（手関節を屈曲し母指と小指を対向させた際に浮き出る細い腱）",
      "手関節掌側横紋（屈曲ジワの最も明瞭なライン）",
    ],
    pitfalls: "長掌筋腱が存在しない患者（日本人の約5〜10%に欠如）では位置を迷いやすいですが、その場合は橈側手根屈筋腱の内側（尺側）約5mmのラインを目安に取穴します。深部の正中神経への直撃を避けるため、腱を直穿刺せず間隙に愛護的に刺入します。",
    indications: [
      "吐き気・乗り物酔い・抗がん剤副作用の悪心",
      "妊娠悪阻（つわり）",
      "逆流性食道炎・胃痛・胸焼け",
      "動悸・不整脈・胸部絞扼感・息切れ",
      "不安神経症・不眠症・パニック障害",
      "自律神経失調症・更年期障害",
      "手根管症候群・前腕掌側痛",
    ],
    categories: ["絡穴", "八脈交会穴（陰維脈に通ず）", "四総穴（心胸を治す）"],
    clinicalNote: "内関には術後悪心・嘔吐の予防を対象とした臨床研究があります。2025年Cochraneレビューでは、指圧バンドなどの非侵襲的なPC6刺激は、偽刺激等に比べて術後の吐き気・嘔吐を減らす可能性を示しましたが、確信度は低い評価です。公孫との配穴、つわり、化学療法による悪心、心疾患への効果とは分けて読みます。研究で確認された範囲と出典を下記に示します。",
    caution: "正中神経に近接します。電撃様の痛みを得気の目安にせず、刺激を中止して症状を評価する必要があります。",
    status: "published",
    hasDetailedAnatomy: true,
    crossSection: CROSS_SECTIONS.pc6,
    researchEvidence: {
      "focus": "術後悪心・嘔吐の予防に関するPC6刺激の臨床研究",
      "findings": "2025年Cochraneレビューは77試験・9,847人を対象に、手術後の悪心・嘔吐の予防を評価しました。ネットワークメタ解析では、指圧バンドなどの非侵襲的PC6刺激は、偽刺激等に対する吐き気のリスク比が0.67（95%信頼区間0.58〜0.76）、嘔吐が0.58（0.49〜0.70）でした。どちらもエビデンスへの確信度は低く、薬より優れた方法と一律に結論づける結果ではありません。",
      "mechanisms": [
        "対象は手術後の症状。鍼、電気刺激、指圧バンドなどの刺激方法や制吐薬併用を分けて比較した研究",
        "リスク比は群間の相対的な差で、吐き気が出なくなる人の割合や個人の効果をそのまま表す値ではない",
        "痛み・皮膚刺激などの有害事象報告は不十分で、安全性の確信度にも限界がある"
      ],
      "sources": [
        {
          "title": "Stimulation of the wrist acupuncture point PC6 for preventing postoperative nausea and vomiting: a network meta-analysis",
          "doi": "10.1002/14651858.CD003281.pub5",
          "pmid": "40938065",
          "year": "2025"
        }
      ],
      "limitations": "他の経穴を併用する試験は対象外で、公孫との組み合わせの効果は示しません。つわり・化学療法など別の原因の悪心、胃痛、胸痛へ一般化しません。作用機序や個人への最適な刺激条件を確定した研究ではありません。"
    },
    classicalReferences: [
      {
        book: "霊枢・経脈篇",
        quote: "手心主の別、名づけて内関と曰ふ。腕を去ること二寸、両筋の間に別れて外走り、心包に循りて心系を絡す。",
        meaning: "心包経の絡穴として手首から2寸の兩筋（2腱）の間にあり、内に入って心系を絡うと規定。",
      },
      {
        book: "八脈八法歌（針灸聚英）",
        quote: "内関は陰維に通りて心胸に達し、公孫は衝脈に合して脾胃を調ふ。",
        meaning: "内関は陰維脈を通じて心胸に、公孫は衝脈を通じて脾胃に関わる、と説明する条文です。二穴の伝統的な組み合わせを学ぶもので、すべての疾患への効果を示すものではありません。",
      },
    ],
    nearbyPoints: [
      { code: "PC7", name: "大陵", relation: "遠位・同経原穴", distance: "手関節掌側横紋上、長掌筋腱と橈側手根屈筋腱の間（内関の下方2寸）" },
      { code: "TE5", name: "外関", relation: "前腕後面・表裏相応穴", distance: "前腕後側、橈骨と尺骨の骨間部、手関節背側横紋の上方2寸（内関の真裏）" },
      { code: "LU7", name: "列缺", relation: "橈側近傍・肺経絡穴", distance: "前腕橈側、茎状突起の上方、長母指外転筋腱と短母指伸筋腱の間" },
    ],
  },

  st36: {
    id: "st36",
    legacyId: "ashisanri",
    code: "ST36",
    codeLower: "st36",
    name: "足三里",
    kana: "あしさんり",
    romaji: "Zusanli",
    aliases: ["下陵", "鬼邪"],
    meridianId: "stomach",
    meridian: "足の陽明胃経",
    meridianShort: "胃経",
    meridianOrder: 36,
    bodyPart: "足・脚",
    bodyRegionDetail: "下腿前外側部・犢鼻下3寸",
    locationSimple: "膝のお皿のすぐ下、外側のくぼみから指4本分下がった、すねの骨の外側。",
    locationDetail: "下腿前外側、犢鼻（膝蓋靭帯外側の陥凹部）の下方3寸、前脛骨筋上。脛骨前縁の外側約1横指（中指幅）。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に膝を直角に曲げた座位、または膝の下に枕を入れた仰臥位をとらせる。",
      "膝蓋骨の下縁、膝蓋靭帯の外側のくぼみ（犢鼻穴）を確認する。",
      "犢鼻から下方に患者の同身寸で3寸（指4本分の幅）を測る。",
      "脛骨の前縁（すねの鋭い骨の稜線）から、外方へ親指または中指の幅1本分（約1寸）スライドさせ、前脛骨筋の筋腹上で指が自然に落ち着く陥凹部にとる。",
    ],
    palpationLandmarks: [
      "犢鼻（外側膝蓋眼：膝蓋靭帯外側の深い窪み）",
      "脛骨前縁（皮下に触れる鋭利な骨縁）",
      "前脛骨筋の筋腹（足関節を背屈させると盛り上がる筋）",
      "脛骨粗面（膝蓋靭帯が付着する骨の隆起）",
    ],
    pitfalls: "脛骨前縁に近すぎると骨膜に直撃して強い骨膜痛を与え、外側に寄りすぎると長腓骨筋側に外れてしまいます。足関節を背屈させて前脛骨筋が隆起する「筋腹の真上」を触知するのが最大のコツです。",
    indications: [
      "胃痛・胃もたれ・急性および慢性胃炎",
      "食欲不振・消化不良・腹部膨満",
      "下痢・便秘・過敏性腸症候群（IBS）",
      "慢性疲労・倦怠感・全身脱力感",
      "膝関節痛・下肢のしびれ・片麻痺",
      "免疫力低下・アレルギー体質・自律神経失調",
      "高血圧・動脈硬化予防（無病息災の灸）",
    ],
    categories: ["合土穴", "胃の下合穴", "四総穴（腹を治す）"],
    clinicalNote: "足の陽明胃経の合穴として、伝統的には胃腸の症状や全身状態との関連を学びます。動物の電気刺激研究と、人への治療効果を区別します。",
    caution: "経穴名だけで禁忌がないとは判断できません。体調・既往歴・服薬・妊娠などを確認し、資格を持つ施術者が個別に評価します。",
    status: "published",
    hasDetailedAnatomy: true,
    crossSection: CROSS_SECTIONS.st36,
    researchEvidence: {
      "focus": "マウスの電気鍼刺激と迷走神経―副腎経路の基礎研究",
      "findings": "2021年のマウス研究では、足三里相当部位への低強度の電気刺激と、PROKR2標識感覚神経を介した迷走神経―副腎経路との関係が示されました。2014年の研究も、マウスの炎症モデルで神経・副腎・ドーパミンとの関係を検討しています。",
      "mechanisms": [
        "マウスでの電気刺激条件と神経経路の関係",
        "動物の炎症モデルでの反応を評価した基礎研究"
      ],
      "sources": [
        {
          "title": "A neuroanatomical basis for electroacupuncture to drive the vagal-adrenal axis",
          "pmid": "34646018",
          "doi": "10.1038/s41586-021-04001-4",
          "year": "2021"
        },
        {
          "title": "Dopamine mediates vagal modulation of the immune system by electroacupuncture",
          "pmid": "24562381",
          "doi": "10.1038/nm.3479",
          "year": "2014"
        }
      ],
      "limitations": "動物の実験条件での知見です。人の敗血症・炎症性疾患への効果や、通常の手技鍼・指圧への適用を確立したものではありません。"
    },
    classicalReferences: [
      {
        book: "千金方（孫思邈）",
        quote: "若し旅行の労を免れんと欲せば、三里に灸すべし。",
        meaning: "旅の長道や足腰の疲労を防ぎ、歩行能力と胃腸の活力を維持するために足三里への施灸を推奨。",
      },
      {
        book: "霊枢・邪気臓腑病形篇",
        quote: "胃病は三里を取る…合は逆気して泄するを主どる。",
        meaning: "胃経の合穴・胃の下合穴である足三里を、胃の病証や逆気、下痢と関連づける記述です。",
      },
    ],
    nearbyPoints: [
      { code: "ST35", name: "犢鼻", relation: "膝関節部・直上", distance: "膝蓋靭帯外側の陥凹部（足三里の上方3寸）" },
      { code: "ST37", name: "上巨虚", relation: "遠位・大腸の下合穴", distance: "下腿前外側、犢鼻の下方6寸、足三里の下方3寸" },
      { code: "SP9", name: "陰陵泉", relation: "下腿内側相対応穴", distance: "下腿内側、脛骨内側顆下縁と脛骨内側面後縁の間の陥凹部" },
    ],
  },

  lr3: {
    id: "lr3",
    legacyId: "taisho",
    code: "LR3",
    codeLower: "lr3",
    name: "太衝",
    kana: "たいしょう",
    romaji: "Taichong",
    aliases: ["大衝"],
    meridianId: "liver",
    meridian: "足の厥陰肝経",
    meridianShort: "肝経",
    meridianOrder: 3,
    bodyPart: "足・脚",
    bodyRegionDetail: "足背・第1第2中足骨間",
    locationSimple: "足の甲で、親指と人差し指の骨が合わさる付け根の手前にあるくぼみ（脈が触れるところ）。",
    locationDetail: "足背、第1・第2中足骨底接合部の遠位陥凹部、足背動脈拍動部。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に仰臥位または座位をとらせ、足背をリラックスさせる。",
      "母指と第2指の指間から足首に向かって骨間隙を指でなぞり上げる。",
      "第1・第2中足骨の底（合流部）に指が突き当たって止まる直前の陥凹部を触知する。",
      "拍動する足背動脈の外側、特有の重だるい響きがあるところにとる。"
    ],
    palpationLandmarks: [
      "第1・第2中足骨底の骨結合部（指が止まる骨の角）",
      "足背動脈の拍動部",
      "長母指伸筋腱の外側縁"
    ],
    pitfalls: "指先に近すぎると行間穴（滎火穴）に近くなり、骨底に寄りすぎると刺入深度が取れなくなります。動脈を直穿刺しないよう、拍動部の外側または内側の間隙に愛護的に刺入します。",
    indications: [
      "高血圧・めまい・緊張型頭痛・偏頭痛",
      "自律神経失調症・情緒不安定・イライラ・抑鬱",
      "眼精疲労・目のかすみ・目の充血",
      "月経不順・生理痛・月経前症候群（PMS）",
      "こむら返り・下肢筋痙攣・足背痛"
    ],
    categories: ["兪土穴・原穴", "四関穴"],
    clinicalNote: "肝経の原穴・兪土穴です。伝統的には気の巡りなどとの関連を整理し、合谷との「四関」を学びます。「一瞬で改善する」などの効果を保証するものではありません。",
    caution: "伝統的な慎重穴としての扱いと、降圧作用などの現代的な臨床効果は分けて考えます。妊娠中は部位を問わず強刺激を避け、担当者へ相談してください。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "LI4", partnerName: "合谷", prescriptionName: "四関穴", effect: "気血の巡りを整えるという伝統的な考え方による配穴例です。頭痛やめまいなどへの効果を一律に保証するものではありません。" },
      { partnerCode: "GB34", partnerName: "陽陵泉", prescriptionName: "肝胆相照配穴", effect: "肝・胆の気の巡りを整えるという伝統的な考え方から、脇や肋骨周辺の痛み、こむら返りなどと関連づける配穴例です。" }
    ],
    punctureMethod: "直刺 0.5〜0.8寸。酸脹感を感じるまで刺入。足背動脈の穿刺を避ける。",
    moxibustion: "灸3〜5壮、または温灸5〜10分。",
    classicalReferences: [
      {
        book: "霊枢・本輸篇",
        quote: "肝は太衝に出づ、太衝は大指の本節の後二寸、あるいは一寸五分にして、陥者の中に在りて動ずるなり、原と為す。",
        meaning: "肝経の気が出納する原穴として、第1・第2中足骨の間で動脈が拍動する陥凹部に位置することを定義。"
      },
      {
        book: "針灸大成",
        quote: "太衝穴は足の厥陰の脈の行く所なり…四関の穴として合谷と相須い、気血を平定す。",
        meaning: "合谷と太衝を「四関」として組み合わせ、気血を整えると説明する伝統的な記述です。あらゆる病気への効果を示すものではありません。"
      }
    ]
  },

  sp6: {
    id: "sp6",
    legacyId: "sanyinko",
    code: "SP6",
    codeLower: "sp6",
    name: "三陰交",
    kana: "さんいんこう",
    romaji: "Sanyinjiao",
    aliases: ["承命", "太陰爪"],
    meridianId: "spleen",
    meridian: "足の太陰脾経",
    meridianShort: "脾経",
    meridianOrder: 6,
    bodyPart: "足・脚",
    bodyRegionDetail: "下腿内側・内果上3寸",
    locationSimple: "足の内くるぶしの最も高いところから、指4本分上がったすねの骨（脛骨）の後ろのキワ。",
    locationDetail: "下腿内側、脛骨内側面後縁、内果尖の上方3寸。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に仰臥位をとらせ、下肢をリラックスさせる。",
      "内くるぶしの最も突出した頂点（内果尖）を確認する。",
      "内果尖から上方に患者自身の指幅4本分（同身寸3寸）を測る。",
      "脛骨（すねの骨）の内側縁の骨際、指を押し込むと特有の圧痛・酸脹感がある陥凹部にとる。"
    ],
    palpationLandmarks: [
      "内果尖（内くるぶしの頂点）",
      "脛骨内側縁（骨のシャープな後縁）",
      "ヒラメ筋・長指屈筋の筋腱境界"
    ],
    pitfalls: "脛骨の骨面上に刺すと骨膜痛を与えるため、必ず骨の後ろ側（骨際）に指を滑り込ませて取穴します。妊娠中は部位を問わず強刺激を避けます。経穴名だけで子宮収縮作用が確定しているという意味ではありません。",
    indications: [
      "月経不順・生理痛・無月経・機能性出血",
      "更年期障害・ホットフラッシュ・冷えのぼせ",
      "足腰の冷え・下肢浮腫（むくみ）",
      "不眠症・自律神経失調症・抑鬱",
      "消化不良・食欲不振・慢性下痢",
      "頻尿・夜間多尿・排尿困難"
    ],
    categories: ["三陰交", "足の三陰の交会穴"],
    clinicalNote: "伝統的に足の太陰脾経・足の少陰腎経・足の厥陰肝経が交わるとされる経穴です。月経や下腹部などの症状に関連づけて学びますが、分類や配穴名だけで婦人科疾患への効果は判断できません。",
    caution: "伝統的に妊娠中の慎重穴とされます。子宮収縮作用の強さは断定できません。妊娠中は部位を問わず強刺激を避け、産科の担当者へ相談してください。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "KI3", partnerName: "太渓", prescriptionName: "滋陰補腎配穴", effect: "腎陰・肝血に関連づける伝統的な配穴意図。更年期症状・腰痛・不眠への二穴の効果は、この説明からは確定できません。" },
      { partnerCode: "CV4", partnerName: "関元", prescriptionName: "培元固本配穴", effect: "下焦の元気を補うとされる伝統的な配穴意図。月経症状や不妊への治療効果を保証するものではありません。" }
    ],
    punctureMethod: "直刺 0.5〜1.0寸。針先をやや上方へ向けて刺入し、下腿内側を上行する重だるい響きを得る。",
    moxibustion: "灸5〜7壮、温灸10〜15分。婦人科冷え症・下腹痛に温灸が著効。",
    classicalReferences: [
      {
        book: "鍼灸甲乙経",
        quote: "足の太陰・厥陰・少陰の会。足の内踝の上三寸、骨下に在り。月水不調、漏下赤白、腹脹腸鳴を主どる。",
        meaning: "足の三陰経の合流穴として、婦人科疾患・月経異常・腹部消化不良の主治を網羅。"
      },
      {
        book: "千金方",
        quote: "産難・児下らざる時、合谷を補い三陰交を瀉せば、児即ち出づ。",
        meaning: "合谷と三陰交の補瀉手技により、陣痛微弱や難産の分娩を促進する伝統的配穴法。"
      }
    ]
  },

  gv20: {
    id: "gv20",
    legacyId: "hyakue",
    code: "GV20",
    codeLower: "gv20",
    name: "百会",
    kana: "ひゃくえ",
    romaji: "Baihui",
    aliases: ["三陽五会", "顛上", "泥丸宮"],
    meridianId: "governor",
    meridian: "督脈",
    meridianShort: "督脈",
    meridianOrder: 20,
    bodyPart: "頭部・顔面",
    bodyRegionDetail: "頭頂部・正中線",
    locationSimple: "頭のてっぺん、左右の耳の先端を結んだ線と、顔の中心を通る線が交差する小さなくぼみ。",
    locationDetail: "頭頂部、前正中線上、前髪際の上方5寸（左右耳尖を結ぶ線の頭頂交点）。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に正座または端座位をとらせ、顔面を正面に向けさせる。",
      "左右の耳介を前方へ折り曲げ、耳の最も高い頂点（耳尖）を触知する。",
      "両耳尖を結ぶラインが頭頂部の正中線（前後の中央ライン）と交差する点を探す。",
      "指先で触れるとわずかに骨のくぼみ（陥凹部）があり、押すとズーンと心地よい響きがあるところにとる。"
    ],
    palpationLandmarks: [
      "正中矢状縫合と冠状縫合・人字縫合の中間陥凹",
      "左右耳尖（耳の頂点）を結ぶ頂線"
    ],
    pitfalls: "頭皮と帽状腱膜の薄い部位であるため直刺はできません。必ず針柄を寝かせて骨膜に沿って前後または左右へ平刺（横刺）します。",
    indications: [
      "頭痛・片頭痛・緊張型頭痛・頭重感",
      "めまい・メニエール病・立ちくらみ",
      "不眠症・自律神経失調症・うつ病・不安障害",
      "脳卒中後遺症（片麻痺・言語障害）",
      "脱肛・胃下垂・子宮脱（気虚下陥証）",
      "高血圧・低血圧（自律神経双方向調整）"
    ],
    categories: ["百会", "諸陽の会"],
    clinicalNote: "百会は頭頂部の督脈上にあり、伝統資料では「諸陽の会」として、頭部の病証や気虚下陥と関連づけます。「安神」「昇提陽気」は伝統的な治法の用語です。自律神経活動、意識障害、臓器脱への効果を同じ機序で説明することはできず、百会単独の特異的な効果は疾患ごとの臨床研究で評価する必要があります。",
    caution: "乳幼児の大泉門未閉鎖時には刺鍼禁忌。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "KI1", partnerName: "湧泉", prescriptionName: "上下相応・引火帰元", effect: "百会と湧泉を「虚火を下方へ導き、心神を落ち着かせる」という伝統的な治法から組み合わせる例です。虚火は血圧の数値ではなく、血圧や熱を頭から足へ物理的に移すという意味ではありません。この2穴の降圧効果を示す根拠としては扱いません。" },
      { partnerCode: "EX-HN3", partnerName: "印堂", prescriptionName: "通脳開竅配穴", effect: "不眠、不安、頭部の緊張感などと関連づける配穴例です。「大脳の疲労」を診断したり、症状の解消を保証したりするものではありません。" }
    ],
    punctureMethod: "骨膜に沿って平刺（横刺）0.3〜0.5寸。昇揚には前方、鎮静には後方へ向けて刺入。",
    moxibustion: "米粒大灸3〜5壮、または温灸5〜10分。気虚・低血圧・内臓下垂に灸が著効。",
    classicalReferences: [
      {
        book: "鍼灸甲乙経",
        quote: "前頂の後一寸五分、頂の中央陥なる中に在り…督脈と手足三陽の会。百病皆主どる。",
        meaning: "百会を督脈と手足の三陽経が交わる経穴として説明し、幅広い主治を挙げる記述です。現代の中枢神経疾患を含む、あらゆる疾患への効果を示すものではありません。"
      },
      {
        book: "針灸大成",
        quote: "百会穴は諸陽の会、百脈の朝宗なり。気虚下陥を昇挙し、中風脱証を救う。",
        meaning: "気虚下陥や中風脱証との関連から、百会を「陽気を引き上げる」経穴として説明する伝統的な記述です。意識障害への現代の救急対応を代替するものではありません。"
      }
    ]
  },

  cv12: {
    id: "cv12",
    legacyId: "chukan",
    code: "CV12",
    codeLower: "cv12",
    name: "中脘",
    kana: "ちゅうかん",
    romaji: "Zhongwan",
    aliases: ["上紀", "胃募", "太倉"],
    meridianId: "conception",
    meridian: "任脈",
    meridianShort: "任脈",
    meridianOrder: 12,
    bodyPart: "胸・腹",
    bodyRegionDetail: "上腹部・前正中線・臍上4寸",
    locationSimple: "みぞおち（胸骨の下端）とおへそのちょうど真ん中にあるツボ。",
    locationDetail: "上腹部、前正中線上、臍中央の上方4寸（胸骨体下端と臍中央の中点）。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に仰臥位をとらせ、膝を軽く立てて腹壁をリラックスさせる。",
      "胸骨体下端（剣状突起接合部）と、臍の中央部をそれぞれ触知する。",
      "この2点間は骨度法で8寸と規定される。",
      "そのちょうど中間（上方4寸）の点にとる。"
    ],
    palpationLandmarks: [
      "胸骨体下端（胸骨下角・剣状突起結合部）",
      "臍中央",
      "白線（腹直筋間の結合組織）"
    ],
    pitfalls: "腹壁の厚みには個人差が大きいため、過度の深刺は腹膜炎や内臓（胃後壁・膵臓・大動脈）刺激のリスクがあります。触診で拍動や筋緊張を確認しながら慎重に刺入します。",
    indications: [
      "胃痛・胃もたれ・急性および慢性胃炎",
      "食欲不振・消化不良・胃下垂",
      "悪心・嘔吐・逆流性食道炎・呑酸",
      "腹部膨満・腹痛・下痢・便秘",
      "不眠症・不安神経症（痰火擾心）"
    ],
    categories: ["胃の募穴", "八会穴（腑会）"],
    clinicalNote: "中脘は伝統的に胃の募穴・腑会に分類され、食欲不振、みぞおちの痛み、嘔吐などの病証と関連づけます。足三里との配穴は、胃腸の病証を整理する学習例です。「後天の気」は伝統医学の概念で、消化吸収量や代謝エネルギーの増加を測った値ではありません。胃炎、逆流、胃もたれは区別して原因と治療効果を評価します。",
    caution: "急な強い腹痛や腹膜刺激徴候が疑われる場合は、深度を変えて施術を続けず、医療機関での評価を優先します。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "ST36", partnerName: "足三里", prescriptionName: "健脾和胃配穴", effect: "胃腸の働きを整えるという伝統的な考え方による配穴例です。消化管運動の正常化や胃炎・逆流への効果は、別に臨床研究で確認する必要があります。" },
      { partnerCode: "PC6", partnerName: "内関", prescriptionName: "降逆止嘔配穴", effect: "胃気の上逆を抑えるという伝統的な考え方から、吐き気・嘔吐・胃痛と関連づける配穴例です。即効性を保証するものではありません。" }
    ],
    punctureMethod: "直刺 0.8〜1.2寸。腹壁筋層を捉えて鈍い響きを得る。腹膜内穿刺は避ける。",
    moxibustion: "灸5〜7壮、温筒灸・箱灸15〜20分。胃寒・冷えによる腹痛に温灸が著効。",
    classicalReferences: [
      {
        book: "難経・四十五難",
        quote: "腑は中脘に会す。腑病の熱する者は、皆その会を治すべし。",
        meaning: "中脘を「腑会」と位置づけ、腑の熱証との関連を説明する伝統的な記述です。現代の消化管の炎症すべてに対する適応を示すものではありません。"
      },
      {
        book: "鍼灸甲乙経",
        quote: "胃の募なり、手太陽少陽足陽明所生、任脈の会。胃脹、心下痛、食下らず、嘔吐を主どる。",
        meaning: "中脘を胃の募穴として位置づけ、胃の張り、みぞおちの痛み、食べ物が下らない状態、嘔吐を主治として挙げています。"
      }
    ]
  },

  cv4: {
    id: "cv4",
    legacyId: "kangen",
    code: "CV4",
    codeLower: "cv4",
    name: "関元",
    kana: "かんげん",
    romaji: "Guanyuan",
    aliases: ["下丹田", "大中極", "玄関"],
    meridianId: "conception",
    meridian: "任脈",
    meridianShort: "任脈",
    meridianOrder: 4,
    bodyPart: "胸・腹",
    bodyRegionDetail: "下腹部・前正中線・臍下3寸",
    locationSimple: "おへそから指4本分真下に下がったところ（下丹田）。",
    locationDetail: "下腹部、前正中線上、臍中央の下方3寸（恥骨結合上縁の上方2寸）。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に仰臥位をとらせ、腹壁を緩める（排尿後が望ましい）。",
      "臍中央と恥骨結合上縁を結ぶ線（骨度法で5寸）を確認する。",
      "臍から下方に患者の同身寸で3寸（指4本幅）、または恥骨結合から上方に2寸の点にとる。"
    ],
    palpationLandmarks: [
      "臍中央",
      "恥骨結合上縁",
      "腹白線（腹直筋間の正中裂隙）"
    ],
    pitfalls: "尿意がある状態で刺鍼すると膀胱を穿刺する危険があります。必ず事前に排尿を済ませてから取穴・刺入します。妊婦の下腹部深刺は厳禁です。",
    indications: [
      "全身の極度の疲労・虚弱体質・冷え性",
      "月経不順・生理痛・無月経・不妊症",
      "夜間頻尿・尿もれ・前立腺肥大症",
      "慢性下痢・過敏性腸症候群・下腹部冷痛",
      "インポテンツ・更年期障害・自律神経失調"
    ],
    categories: ["小腸の募穴", "下丹田", "足の三陰と任脈の交会穴"],
    clinicalNote: "関元は伝統的に小腸の募穴・任脈と足の三陰経の交会穴に分類され、下腹部の冷え、排尿や月経の病証と関連づけます。「原気を補う」「下焦を温める」は伝統的な治法の表現で、免疫機能、ホルモン、寿命への効果を示す測定値ではありません。頻尿や不妊の原因・治療適応を経穴名だけで決めることはできません。",
    caution: "深部の膀胱などの損傷に注意が必要です。WHOの安全指針では妊婦の下腹部・腰仙部への刺鍼を避けるとしています。妊娠中は自己施術せず産科の担当者へ相談してください。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "CV6", partnerName: "気海", prescriptionName: "下丹田補気配穴", effect: "下焦の気を補うという伝統的な考え方から、冷えや下痢、夜間の頻尿、だるさなどと関連づける配穴例です。" },
      { partnerCode: "SP6", partnerName: "三陰交", prescriptionName: "培元固本配穴", effect: "下焦の元気を補うという伝統的な考え方による配穴例です。月経症状や不妊への治療効果を保証するものではありません。" }
    ],
    punctureMethod: "直刺 0.8〜1.5寸。排尿後に刺鍼。下腹部全体に温熱感・酸脹感を得る。",
    moxibustion: "灸7〜15壮、箱灸・温灸20分。下焦の虚寒・冷え・不妊・頻尿には温灸が最善。",
    classicalReferences: [
      {
        book: "千金翼方",
        quote: "人三十以上、灸すること関元・気海にすべし。若し常灸すれば、百病生ぜず、長生延寿す。",
        meaning: "三十歳を過ぎてから関元・気海への灸を続ける養生を勧め、病を防ぎ長寿につながると説く記述です。現代医学で免疫機能や寿命への効果が確認されたという意味ではありません。"
      },
      {
        book: "鍼灸甲乙経",
        quote: "小腸の募なり、足の三陰任脈の会。臍下三寸に在り。遺尿、小便難、婦人胞門冷を主どる。",
        meaning: "関元を小腸の募穴、足の三陰経と任脈の交会穴とし、遺尿や排尿困難、婦人の下腹部の冷えなどを主治として挙げています。"
      }
    ]
  },

  gb20: {
    id: "gb20",
    legacyId: "fuchi",
    code: "GB20",
    codeLower: "gb20",
    name: "風池",
    kana: "ふうち",
    romaji: "Fengchi",
    aliases: [],
    meridianId: "gallbladder",
    meridian: "足の少陽胆経",
    meridianShort: "胆経",
    meridianOrder: 20,
    bodyPart: "首・肩",
    bodyRegionDetail: "後頭部・項部",
    locationSimple: "首の後ろ、髪の生え際で、僧帽筋と胸鎖乳突筋の間にある深いくぼみ。",
    locationDetail: "前頸部〜項部、後頭骨の下方、胸鎖乳突筋と僧帽筋の起止部の間の陥凹部。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に座位をとらせ、頭部をわずかに前屈させる。",
      "後頭骨の下縁を親指でなぞり、太い筋肉（僧帽筋）の外側縁を触知する。",
      "耳の後ろの骨（乳様突起）から後頭部へ向かう胸鎖乳突筋との間にある陥凹部をとる。",
      "風池は後頭骨の下、胸鎖乳突筋と僧帽筋の起始部の間に位置します。取穴位置と刺入方向は別の情報です。体位、局所解剖、刺入経路を個別に評価する必要があり、眼球や鼻先を指標にした一定の方向を、安全な刺入手順として一律に示すことはできません。"
    ],
    palpationLandmarks: [
      "僧帽筋外側縁",
      "胸鎖乳突筋後縁",
      "後頭骨下縁の陥凹"
    ],
    pitfalls: "風池付近の深部には脊柱管や重要な神経・血管があります。深い刺入は重篤な損傷を起こすおそれがあり、「対側眼球または鼻尖へ向ける」「1.2寸以下にする」だけでは安全を判断できません。骨度分寸は体表の位置を示す尺度で、個人の安全な刺入深度を示す値ではありません。具体的な方向・深度は局所解剖と体位を確認して専門家が判断します。",
    indications: [
      "偏頭痛・緊張型頭痛・後頭部痛",
      "高血圧・めまい・耳鳴り・メニエール病",
      "首こり・項部硬直・頚椎症・寝違え",
      "眼精疲労・かすみ目・視力低下・結膜炎",
      "感冒初期（悪寒発熱・鼻閉・くしゃみ）"
    ],
    categories: ["手足少陽・陽維脈の会"],
    clinicalNote: "風池は後頭骨の下に位置し、伝統資料では頭痛、めまい、頸部のこわばりなどと関連づけます。慢性頭痛や頸部痛を含む鍼治療の研究はありますが、風池単独の効果や即効性、椎骨動脈の血流を「解放する」作用を示すものではありません。頭痛の原因と神経症状の有無を分けて評価します。",
    caution: "延髄方向（頭蓋内）への上方深刺は絶対厳禁。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "BL10", partnerName: "天柱", prescriptionName: "項背解筋配穴", effect: "風池と天柱を、後頭部・頸部の痛みに関連づける伝統的な配穴です。慢性疼痛に対する鍼治療の研究はありますが、この2穴で後頭下筋群の緊張が必ず解けることや、眼精疲労・緊張型頭痛が即座に改善することを証明したものではありません。" },
      { partnerCode: "LI4", partnerName: "合谷", prescriptionName: "疏風清頭配穴", effect: "発汗解表という伝統的な治法と、頭痛・発熱・悪寒・鼻づまりなどの病証との関連で学ぶ配穴例です。" }
    ],
    punctureMethod: "対側眼球または鼻尖方向へ向けて斜刺 0.8〜1.2寸。上方への刺入・深刺は絶対厳禁。",
    moxibustion: "灸3〜5壮、温灸5〜10分。",
    classicalReferences: [
      {
        book: "鍼灸甲乙経",
        quote: "耳の後、側頸、大筋の外、発際陥なる中に在り…足少陽陽維の会。風眩、頭痛を主どる。",
        meaning: "風池の位置と交会する経脈を示し、めまいや頭痛を主治として挙げる記述です。"
      },
      {
        book: "針灸大成",
        quote: "頭痛、めまい、項強、目赤痛、鼻淵、風邪中風を主どる。",
        meaning: "頭痛、めまい、首のこわばり、目の充血と痛み、鼻の症状などを主治として挙げる記述です。現代の脳循環障害への効果を示すものではありません。"
      }
    ]
  },

  li11: {
    id: "li11",
    legacyId: "kyokuchi",
    code: "LI11",
    codeLower: "li11",
    name: "曲池",
    kana: "きょくち",
    romaji: "Quchi",
    aliases: ["陽沢"],
    meridianId: "large-intestine",
    meridian: "手の陽明大腸経",
    meridianShort: "大腸経",
    meridianOrder: 11,
    bodyPart: "手・腕",
    bodyRegionDetail: "肘前外側・肘窩横紋外端",
    locationSimple: "肘を直角に曲げたときにできる外側のしわの先端（親指側のキワ）。",
    locationDetail: "肘前外側、尺沢と上腕骨外側上顆を結ぶ線の中点、肘窩横紋の外側端。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者の肘関節を90度に屈曲させる。",
      "肘の内側のしわ（肘窩横紋）の外側端を確認する。",
      "上腕骨外側上顆（肘の外側の出っ張った骨）と、肺経の尺沢穴を結ぶラインの中点にとる。"
    ],
    palpationLandmarks: [
      "上腕骨外側上顆",
      "肘窩横紋の外端",
      "腕橈骨筋の筋膨隆"
    ],
    pitfalls: "肘を伸ばした状態ではしわの位置がずれるため、必ず肘を90度曲げた状態で取穴します。外側上顆炎（テニス肘）の治療点としても重要です。",
    indications: [
      "高熱・急性炎症・咽頭炎・扁桃炎",
      "アトピー性皮膚炎・蕁麻疹・皮膚掻痒症",
      "高血圧・自律神経興奮・のぼせ",
      "テニス肘（上腕骨外側上顆炎）・肘関節痛",
      "五十肩・肩関節痛・上肢麻痺",
      "便秘・腹痛・消化器熱証"
    ],
    categories: ["合土穴"],
    clinicalNote: "曲池は手の陽明大腸経の合穴・土穴です。伝統的な「清熱」は、熱感、皮膚のかゆみ、喉の痛みなどの病証との関連を表す治法です。解熱剤・抗炎症薬・抗アレルギー薬と同じ作用を実証したという意味ではありません。皮膚疾患、発熱、高血圧は別々の対象として、効果と安全性を評価する必要があります。",
    caution: "局所の感染・炎症や、体調・既往歴・服薬などを確認し、資格を持つ施術者が個別に施術の適否を評価します。経穴名だけで禁忌がないとは判断できません。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "SP10", partnerName: "血海", prescriptionName: "祛風清血配穴", effect: "皮膚のかゆみや熱の病証と関連づける伝統的な配穴例です。皮膚炎・蕁麻疹・アトピー性皮膚炎への効果は、別に臨床研究で確認する必要があります。" },
      { partnerCode: "LI4", partnerName: "合谷", prescriptionName: "陽明大清熱配穴", effect: "熱の病証、喉や歯の痛み、顔のむくみ、便秘などと関連づける伝統的な配穴例です。症状をすぐに解消することを保証するものではありません。" }
    ],
    punctureMethod: "直刺 0.8〜1.2寸。前腕橈骨側へ向けて刺入し、特有の重だるい響きを得る。",
    moxibustion: "灸3〜5壮、温灸5〜10分。",
    classicalReferences: [
      {
        book: "霊枢・本輸篇",
        quote: "肘の外の輔骨の屈する所の曲肉の端に取りて、合と為す。",
        meaning: "大腸経の気が合流する合穴としての解剖指標を規定。"
      },
      {
        book: "千金方",
        quote: "曲池は清熱解表、風熱の皮膚掻痒、半身不随を主どる。",
        meaning: "皮膚のかゆみ、熱病、脳卒中後の片麻痺改善における重要性を明記。"
      }
    ]
  },

  st25: {
    id: "st25",
    legacyId: "tensu",
    code: "ST25",
    codeLower: "st25",
    name: "天枢",
    kana: "てんすう",
    romaji: "Tianshu",
    aliases: ["長渓", "谷門"],
    meridianId: "stomach",
    meridian: "足の陽明胃経",
    meridianShort: "胃経",
    meridianOrder: 25,
    bodyPart: "胸・腹",
    bodyRegionDetail: "上腹部・臍外方2寸",
    locationSimple: "おへその中心から、左右へ指3本分（約2寸）離れたところ。",
    locationDetail: "上腹部、臍中央の外方2寸（腹直筋上）。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に仰臥位をとらせ、膝を軽く立てて腹筋を緩める。",
      "臍（へそ）の中心を確認する。",
      "臍から水平外方へ、患者自身の同身寸で2寸（示指・中指・薬指の3本幅）を測る。",
      "腹直筋の筋腹上で、圧迫すると腸の蠕動感や特有の酸脹感があるところにとる。"
    ],
    palpationLandmarks: [
      "臍中央の水平線",
      "腹直筋の内側縁〜筋腹"
    ],
    pitfalls: "直刺深刺しすぎると腹膜を越えて大腸・小腸壁を刺激する危険があります。腹壁の厚さに応じて0.8〜1.2寸に留めます。",
    indications: [
      "便秘・宿便・過敏性腸症候群（IBS）",
      "下痢・慢性軟便・赤痢様腹痛",
      "急性および慢性腸炎・腹部膨満",
      "月経痛・月経不順・子宮筋腫による下腹痛",
      "食欲不振・むくみ・胃下垂"
    ],
    categories: ["大腸の募穴"],
    clinicalNote: "天枢は伝統医学では大腸の募穴とされ、腹部の張り、便秘、下痢と関連づけます。現代の臨床研究には、天枢・腹結・上巨虚を用いる電気鍼が重度の機能性便秘で排便回数を増やした試験があります。ただし、天枢単独の作用、下痢の改善、腸内細菌や腸管運動の正常化を示した結果ではありません。研究の対象と数値を下記に示します。",
    caution: "急性虫垂炎や腹膜炎が疑われる場合は、刺激を弱めて施術を続けず、医療機関での評価・治療を優先します。",
    status: "published",
    hasDetailedAnatomy: false,
    researchEvidence: {
      focus: "重度の慢性機能性便秘に対する複数経穴の電気鍼",
      findings: "2016年、中国の15施設で1,075人を無作為化した試験では、8週間・28回の電気鍼と偽電気鍼を比較しました。完全自発排便（残便感がなく、排便補助薬などを使わずに起きた排便）の1週間当たりの増加量は、電気鍼群1.76回、偽電気鍼群0.87回、群間差0.90回（95%信頼区間0.74〜1.10）でした。",
      mechanisms: [
        "対象は重度の慢性機能性便秘で、重い基礎疾患が原因の便秘は除外",
        "両側の天枢（ST25）・腹結（SP14）・上巨虚（ST37）を含む治療。天枢と足三里の2穴の試験ではない",
        "主な評価項目は1〜8週の完全自発排便の回数で、腸内細菌や腸管運動の正常化を測ったものではない"
      ],
      sources: [
        { title: "Acupuncture for Chronic Severe Functional Constipation: A Randomized Trial", pmid: "27618593", doi: "10.7326/M15-3118", year: "2016" },
        { title: "Electroacupuncture for Women with Chronic Severe Functional Constipation: Subgroup Analysis of a Randomized Controlled Trial", pmid: "30733966", doi: "10.1155/2019/7491281", year: "2019" }
      ],
      limitations: "天枢単独の効果や、下痢・過敏性腸症候群への効果は判断できません。施術者を盲検化できず、20週を超える長期転帰は評価していません。研究で使われた刺入条件を個人の安全な施術手順としてそのまま利用することはできません。"
    },
    goldenPairs: [
      { partnerCode: "ST36", partnerName: "足三里", prescriptionName: "大腸通導配穴", effect: "天枢と足三里は、便秘・下痢などを関連づける伝統的な配穴です。重度の機能性便秘で報告された電気鍼の臨床試験は、天枢・腹結・上巨虚の3穴を含む治療で、天枢と足三里の2穴や下痢・過敏性腸症候群の根本改善を検証したものではありません。" },
      { partnerCode: "SP6", partnerName: "三陰交", prescriptionName: "調経止痛配穴", effect: "下腹部の瘀血という伝統的な考え方から、月経痛や腹部の張りなどと関連づける配穴例です。個人への適応や効果は別に評価する必要があります。" }
    ],
    punctureMethod: "直刺 0.8〜1.2寸。腹壁筋層を捉えて酸脹感を下腹部へ放散させる。",
    moxibustion: "灸5〜7壮、箱灸・温灸15〜20分。慢性の下痢や冷え便秘に温灸が極めて有効。",
    classicalReferences: [
      {
        book: "素問・至真要大論",
        quote: "天枢の上は天気これを主どり、天枢の下は地気これを主どる。気交の分、人氣これに従ふ。",
        meaning: "人体の上半身（陽気）と下半身（陰気）が交差する要衝としての位置づけを規定。"
      },
      {
        book: "鍼灸甲乙経",
        quote: "大腸の募なり、臍を去ること各二寸に在り。腹脹、腸鳴、下痢、便秘を主どる。",
        meaning: "天枢を大腸の募穴として位置づけ、腹部の張り、腸鳴、下痢、便秘を主治として挙げています。"
      }
    ]
  },

  ki1: {
    id: "ki1",
    legacyId: "yusen",
    code: "KI1",
    codeLower: "ki1",
    name: "湧泉",
    kana: "ゆうせん",
    romaji: "Yongquan",
    aliases: ["地衝", "蹶心"],
    meridianId: "kidney",
    meridian: "足の少陰腎経",
    meridianShort: "腎経",
    meridianOrder: 1,
    bodyPart: "足・脚",
    bodyRegionDetail: "足底・足底前部中央",
    locationSimple: "足の指をぎゅっと曲げたときに、足の裏の前側中央にできる「人」の字のくぼみ。",
    locationDetail: "足底、足指を屈曲したときに最も陥凹する部（足底中央前1/3、第2・第3中足骨間）。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に仰臥位または腹臥位をとらせ、足底を露出させる。",
      "足の指を軽く足底側へ曲げさせる（屈曲）。",
      "足底の前のほうに「人」の字のようなくぼみ（陥凹部）が現れる。",
      "足指の付け根から踵までの長さの、前方およそ1/3の深いくぼみにとる。"
    ],
    palpationLandmarks: [
      "足指屈曲時に生じる足底腱膜の陥凹",
      "第2・第3中足骨間隙",
      "足底中央の前1/3ライン"
    ],
    pitfalls: "足底の皮膚・腱膜は厚く痛覚受容体が密であるため、刺鍼時は素早い刺入と愛護的な手技が求められます。施灸や指圧に最適なツボです。",
    indications: [
      "失神・ショック・熱中症・意識障害救急",
      "高血圧・激しいのぼせ・頭痛・めまい",
      "不眠症・不安感・精神焦燥・ヒステリー",
      "足底筋膜炎・足底のほてり・冷え",
      "小児のひきつけ・嘔吐下痢症"
    ],
    categories: ["井木穴"],
    clinicalNote: "湧泉は足底の腎経の井穴・木穴です。伝統的な「引火帰元」は虚火を下方へ導くという治法の表現で、血圧を頭から足へ移す現象を意味しません。百会との配穴も伝統理論の学習例です。降圧や意識回復の効果を確定する根拠としては扱わず、意識障害には救急の医学的評価を優先します。",
    caution: "足底痛覚過敏者への強刺入は避ける。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "GV20", partnerName: "百会", prescriptionName: "上下相応・引火帰元", effect: "百会と湧泉を「虚火を下方へ導き、心神を落ち着かせる」という伝統的な治法から組み合わせる例です。虚火は血圧の数値ではなく、血圧や熱を頭から足へ物理的に移すという意味ではありません。この2穴の降圧効果を示す根拠としては扱いません。" },
      { partnerCode: "KI3", partnerName: "太渓", prescriptionName: "少陰温補配穴", effect: "腎の陰陽を補うという伝統的な考え方から、下半身の冷えや腰・膝のだるさと関連づける配穴例です。" }
    ],
    punctureMethod: "直刺 0.5〜1.0寸。強い酸脹感を得る。",
    moxibustion: "灸3〜5壮、温灸10〜15分。高血圧・不眠症・冷え症に施灸が卓効。",
    classicalReferences: [
      {
        book: "霊枢・本輸篇",
        quote: "足の少陰、湧泉に出づ、湧泉は足底の心なり、井と為す。",
        meaning: "腎の経気が湧き出る井穴として、足底の中心部に位置することを定義。"
      },
      {
        book: "鍼灸大成",
        quote: "湧泉穴は腎の原出づる所、諸陽の虚熱を下引し、奔豚・気喘・昏迷を治す。",
        meaning: "湧泉を、虚熱を下方へ導くという考え方から、奔豚・気喘・昏迷と関連づける伝統的な記述です。これらの古典用語を現代の診断名と同一視しないでください。"
      }
    ]
  },
};
