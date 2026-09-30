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
    locationSimple: "手の甲側で、親指と人差し指の骨が合わさる付け根のくぼみ。",
    locationDetail: "手背、第2中手骨中点の橈側（親指側）の陥凹部。第1・第2中手骨底の交点から前方に取穴する。",
    locationSource: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    howToLocate: [
      "患者に手掌を下にしてリラックスした姿勢をとらせる。",
      "検者は反対側の母指の第1関節の横紋を、患者の第1・第2中手骨間（水かきの縁）に当てる。",
      "母指の先端を折り曲げた位置が、おおむね合谷の位置となる（簡易取穴法）。",
      "精確な標準取穴法では、第2中手骨（示指の骨）を指先から手首に向かってなぞり、骨の長さのちょうど真ん中（中点）の橈側骨縁の陥凹部を圧迫し、特有の響き（酸脹感）があるところにとる。",
    ],
    palpationLandmarks: [
      "第2中手骨の骨幹部中点（最も確実な骨性指標）",
      "第1背側骨間筋の筋膨隆部（母指と示指を閉じたときに最も盛り上がる頂点）",
      "第1・第2中手骨底の関節結合部",
    ],
    pitfalls: "第1中手骨（親指側）に寄りすぎたり、第2中手骨の頭部（指の付け根）に近すぎると効果が減弱します。必ず「第2中手骨の骨際（橈側縁）中点」を意識して指を潜り込ませるように取穴してください。",
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
    clinicalNote: "「面目は合谷に収む」と古来より伝わる頭部・顔面症状の特効穴。気の滞りを劇的に散らし、鎮痛・消炎作用に優れる。臨床では太衝と組み合わせて「四関」として開通させる手技が極めて有効。",
    caution: "強力な降気・子宮収縮促進作用があるため、妊娠中の強い刺激は禁忌。",
    status: "published",
    hasDetailedAnatomy: true,
    crossSection: CROSS_SECTIONS.li4,
    researchEvidence: {
      focus: "fMRIによる大脳辺縁系・下行性疼痛抑制系の賦活メカニズム",
      findings: "合谷（LI4）への手技鍼刺激により、前帯状回（ACC）、扁桃体、島皮質の過剰活動が沈静化し、延髄縫線核（RVM）を介した内因性オピオイド（β-エンドルフィン）の分泌が促進されることが確認されている。",
      mechanisms: [
        "広域受容野鎮痛（DNIC / 下行性疼痛抑制系）の起動",
        "顔面・三叉神経核への求心性抑制性反射",
        "交感神経過緊張の抑制と末梢微小循環の改善",
      ],
      sources: [
        {
          title: "Acupuncture at LI4 (Hegu) modulates the default mode network in healthy subjects: an fMRI study",
          pmid: "23758253",
          year: "2013",
        },
        {
          title: "Neural substrates of acupuncture point LI4: a systematic review and meta-analysis of neuroimaging studies",
          doi: "10.1136/acupmed-2017-011409",
          year: "2018",
        },
      ],
      limitations: "個別症例における感受性の差や、単一穴刺激と多穴併用処方（太衝との四関配穴）の相乗効果については更なる比較検証が必要。",
    },
    classicalReferences: [
      {
        book: "四総穴歌（針灸大成）",
        quote: "肚腹三里に留め、腰背委中に求む。頭項列缺に尋ね、面目合谷に収む。",
        meaning: "顔面部・頭部のあらゆる病変（目、鼻、口、歯、皮膚）は合谷穴が総統して治癒に導く。",
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
    clinicalNote: "「心胸は内関に尋ねよ」。自律神経の中枢や迷走神経と深く関わり、精神的緊張に伴う動悸や消化器の逆流（悪心・嘔吐）を鎮める。WHOでも乗り物酔い・つわりへの有効性が認められている。",
    caution: "直下に正中神経が走行するため、手指への電撃様放散痛が生じた場合は速やかに針を後退させること。",
    status: "published",
    hasDetailedAnatomy: true,
    crossSection: CROSS_SECTIONS.pc6,
    researchEvidence: {
      focus: "迷走神経背側運動核の調整による胃運動能改善および悪心抑制",
      findings: "コクラン共同計画（Cochrane Review）のメタ解析をはじめとする多数のRCTにおいて、内関（PC6）刺激は術後悪心嘔吐（PONV）および化学療法誘発性悪心嘔吐（CINV）に対して制吐薬と同等以上の有効性が確立されている。",
      mechanisms: [
        "延髄孤束核（NTS）および最後野（CTZ）の化学受容体トリガー抑制",
        "心拍変動（HRV）の高周波成分（HF / 迷走神経活動）の亢進",
        "胃筋電図（EGG）における胃前庭部徐波の正常化（胃運動律動回復）",
      ],
      sources: [
        {
          title: "Acupuncture-point stimulation for chemotherapy-induced nausea or vomiting",
          pmid: "16437524",
          year: "2006",
        },
        {
          title: "PC6 acupressure for prevention of postoperative nausea and vomiting: a systematic review and meta-analysis",
          pmid: "26385317",
          year: "2015",
        },
      ],
      limitations: "指圧バンドと鍼治療による持続時間の差、心臓疾患における薬物療法代替としての過信は禁忌。",
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
        meaning: "内関と足の公孫をペアで用いることで、心胸・横隔膜・胃腸の全疾患を平定する。",
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
    clinicalNote: "古来より「三里に灸せざる者とは旅をするな」と言われる無病息災・長寿の代表穴。脾胃（消化吸収機能）の働きを底上げし、後天の気（エネルギー）を補給する万能穴。",
    caution: "特に重篤な禁忌はないが、極度の虚弱者には強刺激を避け、温灸または軽微な補法が適す。",
    status: "published",
    hasDetailedAnatomy: true,
    crossSection: CROSS_SECTIONS.st36,
    researchEvidence: {
      focus: "神経免疫連関（Neuro-Immune Axis）および迷走神経-副腎抗炎症経路の解読",
      findings: "ハーバード大学マ・チュアンファン教授らによるネイチャー（Nature）掲載研究（2021年）により、足三里への鍼刺激がPROKR2発現感覚神経を選択的に活性化し、迷走神経-副腎反射を介して全身性致死性炎症（サイトカインストーム）を抑制する分子神経解剖学的経路が実証された。",
      mechanisms: [
        "PROKR2陽性知覚神経を介する迷走神経-副腎抗炎症軸の活性化",
        "消化管運動の双方向性調整（胃前庭部運動亢進と幽門痙攣解除）",
        "マクロファージTNF-α、IL-6等の炎症性サイトカイン放出抑制",
      ],
      sources: [
        {
          title: "A neuroanatomical basis for electroacupuncture to drive the vagal-adrenal axis",
          pmid: "34646018",
          doi: "10.1038/s41586-021-04001-4",
          year: "2021",
        },
        {
          title: "Electroacupuncture at ST36 activates the cholinergic anti-inflammatory pathway in animal models of sepsis",
          pmid: "24562388",
          year: "2014",
        },
      ],
      limitations: "刺激強度や周波数パラメータに依存し、過剰な刺激強度は交感神経反射を惹起するため至適刺激量の個別設計が必要。",
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
        meaning: "胃経の合穴・胃の下合穴として、嘔気・下痢・消化管の逆流気運を速やかに平定する。",
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
    clinicalNote: "「肝は将軍の官、謀慮を出だす」。全身の気機を円滑に巡らせる（疏泄作用）最重要原穴。手の合谷と組み合わせた「四関穴」は、自律神経の極度の興奮や全身の気血の滞りを一瞬で解き放つ名配穴。",
    caution: "強力な疏通・降圧作用があるため、妊娠中の強刺激・深刺は注意。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "LI4", partnerName: "合谷", prescriptionName: "四関穴", effect: "気血を全身へ開通させ、激しい頭痛・めまい・精神抑鬱・痙攣を鎮める" },
      { partnerCode: "GB34", partnerName: "陽陵泉", prescriptionName: "肝胆相照配穴", effect: "肝胆の気機を疏通し、脇肋痛、こむら返り、筋緊張を劇的に緩める" }
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
        meaning: "合谷と太衝を四関として同時に取穴することで、全身の陰陽を通導し百病を散らす。"
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
    pitfalls: "脛骨の骨面上に刺すと骨膜痛を与えるため、必ず骨の後ろ側（骨際）に指を滑り込ませて取穴します。妊婦への強刺激は子宮収縮を誘発するため禁忌です。",
    indications: [
      "月経不順・生理痛・無月経・機能性出血",
      "更年期障害・ホットフラッシュ・冷えのぼせ",
      "足腰の冷え・下肢浮腫（むくみ）",
      "不眠症・自律神経失調症・抑鬱",
      "消化不良・食欲不振・慢性下痢",
      "頻尿・夜間多尿・排尿困難"
    ],
    categories: ["三陰交", "足の三陰の交会穴"],
    clinicalNote: "足の太陰脾経・足の少陰腎経・足の厥陰肝経の三つの陰経が合流する女性医学・婦人科の至宝穴。脾（気血の生成）・腎（先天の本・生殖）・肝（血の貯蔵と疏泄）を同時に補導する。",
    caution: "子宮収縮作用が極めて強力なため、妊娠中の強刺激・深刺・強圧は厳禁。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "KI3", partnerName: "太渓", prescriptionName: "滋陰補腎配穴", effect: "腎陰・肝血を潤し、更年期障害のホットフラッシュ・腰痛・不眠を改善する" },
      { partnerCode: "CV4", partnerName: "関元", prescriptionName: "培元固本配穴", effect: "下焦の元気を補益し、月経不順・不妊・慢性冷え性を根本から温める" }
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
    clinicalNote: "「百脉の朝宗、諸陽の会」。手足の三陽経と督脈がすべて頭頂で交会する万能の調整穴。自律神経を鎮静（安神）させると同時に、陽気の下陥を引き上げる（昇提陽気）という相反する病態を調整できる奇穴。",
    caution: "乳幼児の大泉門未閉鎖時には刺鍼禁忌。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "KI1", partnerName: "湧泉", prescriptionName: "上下相応・引火帰元", effect: "頭部に逆上した虚火・のぼせ・高血圧を足底へ引き下ろして安神する" },
      { partnerCode: "EX-HN3", partnerName: "印堂", prescriptionName: "通脳開竅配穴", effect: "大脳の疲労・不眠・不安・前頭部緊張を解消する" }
    ],
    punctureMethod: "骨膜に沿って平刺（横刺）0.3〜0.5寸。昇揚には前方、鎮静には後方へ向けて刺入。",
    moxibustion: "米粒大灸3〜5壮、または温灸5〜10分。気虚・低血圧・内臓下垂に灸が著効。",
    classicalReferences: [
      {
        book: "鍼灸甲乙経",
        quote: "前頂の後一寸五分、頂の中央陥なる中に在り…督脈と手足三陽の会。百病皆主どる。",
        meaning: "督脈とすべての陽経が交会し、中枢神経系・心身のあらゆる疾患を統括する最重要穴。"
      },
      {
        book: "針灸大成",
        quote: "百会穴は諸陽の会、百脈の朝宗なり。気虚下陥を昇挙し、中風脱証を救う。",
        meaning: "陽気の脱落や意識混濁を覚醒させ、全身の気運を引き上げる作用を明記。"
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
    clinicalNote: "「六腑の気、皆中脘に会す」。六腑（胃・胆・小腸・大腸・膀胱・三焦）の疾患すべての中枢であり、消化吸収器管の司令塔。足三里と組み合わせることで後天の気（生命エネルギー）を最大化する。",
    caution: "極度の腹満・腹膜刺激徴候がある急性腹症時は深刺を避ける。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "ST36", partnerName: "足三里", prescriptionName: "健脾和胃配穴", effect: "消化管運動能を正常化し、胃もたれ・胃炎・逆流を抑制する" },
      { partnerCode: "PC6", partnerName: "内関", prescriptionName: "降逆止嘔配穴", effect: "上逆する胃気とストレスを鎮め、悪心・嘔吐・胃痛を即効改善する" }
    ],
    punctureMethod: "直刺 0.8〜1.2寸。腹壁筋層を捉えて鈍い響きを得る。腹膜内穿刺は避ける。",
    moxibustion: "灸5〜7壮、温筒灸・箱灸15〜20分。胃寒・冷えによる腹痛に温灸が著効。",
    classicalReferences: [
      {
        book: "難経・四十五難",
        quote: "腑は中脘に会す。腑病の熱する者は、皆その会を治すべし。",
        meaning: "六腑の病変や消化管の炎症・熱証はすべて中脘を主治として治療することを規定。"
      },
      {
        book: "鍼灸甲乙経",
        quote: "胃の募なり、手太陽少陽足陽明所生、任脈の会。胃脹、心下痛、食下らず、嘔吐を主どる。",
        meaning: "胃の募穴として、食欲不振・心窩部痛・嘔吐への即効性を明記。"
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
    clinicalNote: "「元気を関（とざ）して漏らさず」。人体の根本エネルギー（先天の原気）が宿る下丹田の中枢。生命力の枯渇、下焦の極度の冷え、生殖器・泌尿器系の慢性虚弱を補益する最高の温補穴。",
    caution: "膀胱緊満時の深刺禁忌。妊娠中の強刺激禁忌。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "CV6", partnerName: "気海", prescriptionName: "下丹田補気配穴", effect: "真元の下虚を補い、冷え症・下痢・夜間頻尿・極度の倦怠を好転させる" },
      { partnerCode: "SP6", partnerName: "三陰交", prescriptionName: "培元固本配穴", effect: "下焦の元気を補益し、月経不順・不妊・慢性冷え性を根本から温める" }
    ],
    punctureMethod: "直刺 0.8〜1.5寸。排尿後に刺鍼。下腹部全体に温熱感・酸脹感を得る。",
    moxibustion: "灸7〜15壮、箱灸・温灸20分。下焦の虚寒・冷え・不妊・頻尿には温灸が最善。",
    classicalReferences: [
      {
        book: "千金翼方",
        quote: "人三十以上、灸すること関元・気海にすべし。若し常灸すれば、百病生ぜず、長生延寿す。",
        meaning: "三十歳を過ぎたら関元や気海に灸を据えることで、免疫力を高め百病を防ぎ健康寿命を延ばす。"
      },
      {
        book: "鍼灸甲乙経",
        quote: "小腸の募なり、足の三陰任脈の会。臍下三寸に在り。遺尿、小便難、婦人胞門冷を主どる。",
        meaning: "泌尿器の脱力、不妊、下腹の冷えに対する絶対的な治療穴と定義。"
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
      "針先を対側の眼球方向、または鼻尖方向へ向けて刺入する。"
    ],
    palpationLandmarks: [
      "僧帽筋外側縁",
      "胸鎖乳突筋後縁",
      "後頭骨下縁の陥凹"
    ],
    pitfalls: "上方（頭蓋腔・大後頭孔方向）へ深刺すると延髄を損傷する生命危機があります。必ず「対側眼球または鼻尖」に向けて下方〜前方に刺入し、深度1.2寸を超えないこと。",
    indications: [
      "偏頭痛・緊張型頭痛・後頭部痛",
      "高血圧・めまい・耳鳴り・メニエール病",
      "首こり・項部硬直・頚椎症・寝違え",
      "眼精疲労・かすみ目・視力低下・結膜炎",
      "感冒初期（悪寒発熱・鼻閉・くしゃみ）"
    ],
    categories: ["手足少陽・陽維脈の会"],
    clinicalNote: "「風の邪気、池のごとく溜まる所」。外邪（風邪）の侵入門戸であり、頭部への血流（椎骨動脈循環）を解放する最重要頭頚部穴。後頭下筋群の過緊張を緩め、頭痛や眼精疲労を即座に消失させる。",
    caution: "延髄方向（頭蓋内）への上方深刺は絶対厳禁。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "BL10", partnerName: "天柱", prescriptionName: "項背解筋配穴", effect: "後頭下筋群の過緊張を解放し、緊張型頭痛・眼精疲労・頚部痛を即効改善する" },
      { partnerCode: "LI4", partnerName: "合谷", prescriptionName: "疏風清頭配穴", effect: "感冒初期の頭痛・発熱・悪寒・鼻閉を速やかに発汗解表する" }
    ],
    punctureMethod: "対側眼球または鼻尖方向へ向けて斜刺 0.8〜1.2寸。上方への刺入・深刺は絶対厳禁。",
    moxibustion: "灸3〜5壮、温灸5〜10分。",
    classicalReferences: [
      {
        book: "鍼灸甲乙経",
        quote: "耳の後、側頸、大筋の外、発際陥なる中に在り…足少陽陽維の会。風眩、頭痛を主どる。",
        meaning: "頭部の風邪、めまい、激しい頭痛に対する特効穴として位置づけ。"
      },
      {
        book: "針灸大成",
        quote: "頭痛、めまい、項強、目赤痛、鼻淵、風邪中風を主どる。",
        meaning: "五官器（目・鼻・耳）と脳循環の障害を広く治癒に導く。"
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
    clinicalNote: "手の陽明大腸経の合穴であり、全身の熱邪を強力に清解する「解熱・消炎・抗アレルギー」の第一選択穴。自律神経の過緊張を鎮め血圧を安定させるとともに、皮膚疾患の痒みを速やかに抑える。",
    caution: "特に重篤な禁忌はないが、局所感染部位への刺鍼は避ける。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "SP10", partnerName: "血海", prescriptionName: "祛風清血配穴", effect: "皮膚炎・蕁麻疹・アトピーの激しい痒みと炎症を鎮める" },
      { partnerCode: "LI4", partnerName: "合谷", prescriptionName: "陽明大清熱配穴", effect: "高熱・扁桃腫痛・歯痛・顔面浮腫・急性便秘を速やかに解消する" }
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
    clinicalNote: "「天枢の上は天気が司り、天枢の下は地気が司る」。上下の気運の転換点（枢紐）に位置し、大腸の募穴として腸内環境と蠕動運動を双方向性に正常化する（下痢を止め、便秘を通じる）。",
    caution: "急性虫垂炎や腹膜炎が疑われる場合は強刺激を避ける。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "ST36", partnerName: "足三里", prescriptionName: "大腸通導配穴", effect: "腸管運動を正常化し、便秘・下痢・過敏性腸症候群を根本改善する" },
      { partnerCode: "SP6", partnerName: "三陰交", prescriptionName: "調経止痛配穴", effect: "下腹部の瘀血を散らし、生理痛・腹満・月経前緊張を緩和する" }
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
        meaning: "大腸の気が集まる募穴として、腸のあらゆる病変を統括することを明記。"
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
    clinicalNote: "「腎の精気、泉の湧き出づるが如し」。足底の最深部に位置し、天頂の百会と呼応する「最下極」のツボ。頭部に昇りすぎた虚火や高血圧を足元へ引き下ろす（引火帰元）作用と、意識混濁からの覚醒救急に著効を示す。",
    caution: "足底痛覚過敏者への強刺入は避ける。",
    status: "published",
    hasDetailedAnatomy: false,
    goldenPairs: [
      { partnerCode: "GV20", partnerName: "百会", prescriptionName: "上下相応・引火帰元", effect: "頭部に逆上した虚火・のぼせ・高血圧を足底へ引き下ろして安神する" },
      { partnerCode: "KI3", partnerName: "太渓", prescriptionName: "少陰温補配穴", effect: "腎の陰陽を同時に補益し、下半身の冷えと腰膝倦怠を解消する" }
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
        meaning: "逆上する熱や喘息、意識障害を足元へ引き下げて鎮静する作用を明記。"
      }
    ]
  },
};
