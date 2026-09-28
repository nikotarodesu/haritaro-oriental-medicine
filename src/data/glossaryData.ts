export interface GlossaryTerm {
  term: string;
  reading: string;
  category: "気血水・病態" | "経絡・経穴" | "陰陽五行・理論" | "神経生理・科学" | "診断・診察";
  oneLiner: string; // 一言での意味（中学生でもわかる平易な説明）
  analogy?: string; // 身近な例・アナロジー
  summary: string; // 詳細解説
  relatedLectureId?: string; // 関連講義ID (例: "lecture-yinyang-1")
  relatedLectureTitle?: string;
  relatedToolUrl?: string; // 関連ツールURL
  relatedToolTitle?: string;
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  疏泄: {
    term: "疏泄",
    reading: "そせつ",
    category: "陰陽五行・理論",
    oneLiner: "全身の気・血・津液の巡りをスムーズに保ち、感情や自律神経を伸びやかに調節する肝の働き。",
    analogy: "「高速道路の交通管制センター」や「空気清浄機のフィルター」。滞りなくスムーズに流す役割。",
    summary: "肝の最重要機能の一つ。気の運行を円滑にし、精神情動の安定、消化吸収の促進、胆汁分泌、女性の月経周期などを広くコントロールする。",
    relatedLectureId: "lecture-wuxing-2",
    relatedLectureTitle: "五行論 レッスン2：五臓の機能と配当",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター（肝気鬱結）"
  },
  固摂: {
    term: "固摂",
    reading: "こせつ",
    category: "気血水・病態",
    oneLiner: "血液や汗・尿などの体液、内臓が体外へ漏れ出たり下垂したりしないよう、しっかりと留め保持する気の働き。",
    analogy: "「蛇口のパッキン」や「巾着袋の口をキュッと締める紐」。大切なものがこぼれ出ないようにする力。",
    summary: "気の五大機能（推動・温煦・防御・固摂・気化）の一つ。低下すると不正出血、皮下出血、多汗、尿失禁、下痢、胃下垂などが生じる。",
    relatedLectureId: "lecture-qiblood-1",
    relatedLectureTitle: "気血水理論 レッスン1：気の概念と五大作用",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフ診断"
  },
  相侮: {
    term: "相侮",
    reading: "そうぶ",
    category: "陰陽五行・理論",
    oneLiner: "本来は抑制される側が強くなりすぎて、逆に抑制する側を攻撃・圧倒してしまう異常な力関係（逆剋・いじめ返し）。",
    analogy: "「下剋上」や「猫を追い詰めたネズミが猫を噛む」状態。序列が逆転してバランスが崩れること。",
    summary: "五行の異常関係の一つ。例えば本来は金が木を剋する（金属が木を切る）が、木が強大すぎると逆に刃（金）が欠けてしまう病理。",
    relatedLectureId: "lecture-wuxing-4",
    relatedLectureTitle: "五行論 レッスン4：相乗と相侮の病理",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  相乗: {
    term: "相乗",
    reading: "そうじょう",
    category: "陰陽五行・理論",
    oneLiner: "本来の抑制関係（相克）が過剰になりすぎて、相手を徹底的にいじめ打ちのめしてしまう病的な過剰抑制。",
    analogy: "「ブレーキを踏みすぎて車が完全停止しエンジンが壊れる」ような、過剰な制動・攻撃。",
    summary: "五行の異常関係の一つ。強い側が弱い側をさらに過剰に攻撃する。例えばストレスで肝気が昂ぶり、胃腸（脾土）を攻撃して胃痛や下痢を起こす（木乗土）。",
    relatedLectureId: "lecture-wuxing-4",
    relatedLectureTitle: "五行論 レッスン4：相乗と相侮の病理",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  気虚: {
    term: "気虚",
    reading: "ききょ",
    category: "気血水・病態",
    oneLiner: "生命エネルギー（気）が不足し、心身のバッテリー切れを起こした状態。",
    analogy: "「スマホの充電が10%しかない状態」や「燃費の悪いエンジン」。",
    summary: "気の産生不足や過労・消耗による病態。倦怠感、無気力、胃腸虚弱、息切れ、声の力なさ、易疲労感などが特徴。",
    relatedLectureId: "lecture-qiblood-2",
    relatedLectureTitle: "気血水理論 レッスン2：気の病態（気虚・気滞・気逆）",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフ診断"
  },
  気滞: {
    term: "気滞",
    reading: "きたい",
    category: "気血水・病態",
    oneLiner: "ストレスや緊張によって「気」の巡りが滞り、渋滞を起こした状態。",
    analogy: "「夕方の高速道路の自然渋滞」。車はあるのに動かずイライラクラクションが鳴る状態。",
    summary: "情志の抑圧や運動不足などで気の運行が停滞する病態。喉のつかえ（梅核気）、胸脇部の張り、イライラ、腹部膨満感、ため息などが現れる。",
    relatedLectureId: "lecture-qiblood-2",
    relatedLectureTitle: "気血水理論 レッスン2：気の病態（気虚・気滞・気逆）",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフ診断"
  },
  気逆: {
    term: "気逆",
    reading: "きぎゃく",
    category: "気血水・病態",
    oneLiner: "本来は下へ降りるべき気（肺や胃の気）が、上に向かって激しく突き上げて逆流する状態。",
    analogy: "「火山の噴火」や「排水管の逆流」。下に行くべき水や熱が上に吹き上がる現象。",
    summary: "咳、しゃっくり、吐き気、嘔吐、げっぷ、激しい頭痛、のぼせなど、上半身や頭部へ気が上衝する病態。",
    relatedLectureId: "lecture-qiblood-2",
    relatedLectureTitle: "気血水理論 レッスン2：気の病態（気虚・気滞・気逆）",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  血虚: {
    term: "血虚",
    reading: "けっきょ",
    category: "気血水・病態",
    oneLiner: "全身の細胞や組織に栄養と潤いを届ける「血」が不足し、栄養失調や乾燥を起こした状態。",
    analogy: "「植物の土壌の肥料や水分が干からびている状態」。葉が枯れて色あせる。",
    summary: "造血不足や出血過多で血が不足。顔色の蒼白、皮膚の乾燥・かゆみ、髪のパサつき、目の疲れ、立ちくらみ、不眠や不安が生じる。",
    relatedLectureId: "lecture-qiblood-3",
    relatedLectureTitle: "気血水理論 レッスン3：血の病態（血虚・瘀血）",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフ診断"
  },
  瘀血: {
    term: "瘀血",
    reading: "おけつ",
    category: "気血水・病態",
    oneLiner: "血液の粘度が高まり、毛細血管や静脈の血流がドロドロに停滞した血行不良状態。",
    analogy: "「ドブ川のヘドロ詰まり」や「冷えて固まりかけた油」。",
    summary: "局所の刺すような固定性の激痛、肩こり、唇や舌の暗紫色、舌下静脈の怒張、月経痛（レバー状の血塊）、シミやくすみの原因となる。",
    relatedLectureId: "lecture-qiblood-3",
    relatedLectureTitle: "気血水理論 レッスン3：血の病態（血虚・瘀血）",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフ診断"
  },
  水滞: {
    term: "水滞",
    reading: "すいたい",
    category: "気血水・病態",
    oneLiner: "体内の水分代謝がうまくいかず、余分な湿気や汚れた水が体内に溜まった状態（痰湿）。",
    analogy: "「湿気を含んで重くなった布団」や「床下に溜まった雨水」。",
    summary: "全身の重だるさ、むくみ、めまい、車酔い、雨の日の頭痛、軟便、ぽっこりお腹などを引き起こす。",
    relatedLectureId: "lecture-qiblood-4",
    relatedLectureTitle: "気血水理論 レッスン4：津液の病態（津液不足・水滞・痰湿）",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフ診断"
  },
  陰虚: {
    term: "陰虚",
    reading: "いんきょ",
    category: "気血水・病態",
    oneLiner: "身体を冷まし潤す冷却水（陰液・潤い）が干上がり、エンジンの空焚き（虚熱）が起きている状態。",
    analogy: "「車のラジエーターの冷却水切れ」。オイルがなくなってエンジンが過熱する。",
    summary: "手足のほてり、寝汗（盗汗）、喉の渇き、痩せ、頬の紅潮、舌が赤く苔が剥がれる（剥落苔）などが特徴。",
    relatedLectureId: "lecture-yinyang-3",
    relatedLectureTitle: "陰陽論 レッスン3：陰陽失調の病理（陽虚・陰虚）",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  陽虚: {
    term: "陽虚",
    reading: "ようきょ",
    category: "気血水・病態",
    oneLiner: "身体を温め代謝を動かす暖房機能（陽気）が衰え、芯から冷え切った状態（虚寒）。",
    analogy: "「ヒーターの火力が消えかかった部屋」。室温が上がらずすべてが冷え冷えとする。",
    summary: "手足や腰の激しい冷え、温めると楽になる痛み、顔色蒼白、透明で多量の尿、下痢、むくみなどが現れる。",
    relatedLectureId: "lecture-yinyang-3",
    relatedLectureTitle: "陰陽論 レッスン3：陰陽失調の病理（陽虚・陰虚）",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  陰陽: {
    term: "陰陽",
    reading: "いんよう",
    category: "陰陽五行・理論",
    oneLiner: "自然界や人体のあらゆる現象を、対立しつつ互いに支え合う2つの極（明と暗、動と静、熱と寒など）で捉える動的思考モデル。",
    analogy: "「コインの表と裏」や「振り子の往復運動」。どちらか片方だけでは存在できない関係。",
    summary: "東洋医学の根幹理論。身体のバランスを動的平衡として捉え、偏り（陰陽の盛衰）を整えることが治療の目標となる。",
    relatedLectureId: "lecture-yinyang-1",
    relatedLectureTitle: "陰陽論 レッスン1：陰陽とは何か",
    relatedToolUrl: "/curriculum",
    relatedToolTitle: "体系学習カリキュラム第1章"
  },
  相生: {
    term: "相生",
    reading: "そうせい",
    category: "陰陽五行・理論",
    oneLiner: "五行説で「木→火→土→金→水」の順に、親が子を生み育てるように互いを助け合い促進する促進サイクル。",
    analogy: "「木が燃えて火を生み、灰が土になり、土から金属が採れ、金属の表面に水滴が付き、水が木を育てる」という自然の育み。",
    summary: "内臓同士がエネルギーや栄養をバトンタッチして循環させる調和の仕組み。治療では「虚すればその母を補う」原則に応用される。",
    relatedLectureId: "lecture-wuxing-3",
    relatedLectureTitle: "五行論 レッスン3：相生と相剋の生理的循環",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  相克: {
    term: "相克",
    reading: "そうこく",
    category: "陰陽五行・理論",
    oneLiner: "五行説で「木→土→水→火→金」の順に、相手が暴走しないよう適度に手綱を引き抑制する制御サイクル。",
    analogy: "「木が土の養分を締め、土が水を堰き止め、水が火を消し、火が金属を溶かし、金属が木を切る」というブレーキの仕組み。",
    summary: "過剰な亢進を防ぐ恒常性維持（フィードバック制御）。相生と相克が両立して初めて人体の動的平衡が保たれる。",
    relatedLectureId: "lecture-wuxing-3",
    relatedLectureTitle: "五行論 レッスン3：相生と相剋の生理的循環",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  原穴: {
    term: "原穴",
    reading: "げんけつ",
    category: "経絡・経穴",
    oneLiner: "各経絡の根源となる「元気（内臓の根本エネルギー）」が最も濃く注ぎ出る、診断と治療の中心ツボ。",
    analogy: "「高速道路のメインインターチェンジ」や「家電のメイン電源スイッチ」。",
    summary: "十二経脈に各1穴（計12穴）存在。対応する臓腑の異常が最も反応として現れやすく、虚実どちらの調整にも使える万能の要穴。",
    relatedLectureId: "lecture-treatment-2",
    relatedLectureTitle: "治法論 レッスン2：五輸穴・原穴・要穴の臨床選穴",
    relatedToolUrl: "/tsubo",
    relatedToolTitle: "経穴辞典（原穴フィルター）"
  },
  四関: {
    term: "四関",
    reading: "しかん",
    category: "経絡・経穴",
    oneLiner: "両手の「合谷」と両足の「太衝」の計4ツボの組み合わせ。全身の気血の渋滞を一気に吹き飛ばす黄金処方。",
    analogy: "「東西南北の主要ゲートを一斉に開放する」ような、全身リセットのマスターキー。",
    summary: "陽明経（気）の合谷と厥陰経（血）の太衝を同時に使い、『四関を開けば百病通ず』と称される東洋医学随一の強力な通暢配穴。",
    relatedLectureId: "lecture-treatment-3",
    relatedLectureTitle: "治法論 レッスン3：伝統的名配穴の臨床応用",
    relatedToolUrl: "/practice/haiketsu",
    relatedToolTitle: "臨床配穴オプティマイザー"
  },
  四総穴: {
    term: "四総穴",
    reading: "しそうけつ",
    category: "経絡・経穴",
    oneLiner: "身体の主要4大部位（顔面、お腹、胸、背中）の不調を治す基本の4ツボ。",
    analogy: "「四天王」のように、それぞれの担当エリアのトラブルを一手に引き受ける代表ツボ。",
    summary: "「肚腹は三里に留め、腰背は委中に求む、頭項は列欠に尋ね、面目は合谷に収む」。足三里・委中・列欠・合谷の4穴。",
    relatedLectureId: "lecture-treatment-2",
    relatedLectureTitle: "治法論 レッスン2：五輸穴・原穴・要穴の臨床選穴",
    relatedToolUrl: "/tsubo",
    relatedToolTitle: "経穴辞典"
  },
  得気: {
    term: "得気",
    reading: "とっき",
    category: "経絡・経穴",
    oneLiner: "鍼が適切な深さに達したとき、患者が感じる「ズーンと重だるい響き」や施術者の指に伝わる吸い付き感。",
    analogy: "「魚釣りのアタリ（ヒット）」のように、狙った組織や神経に刺激がジャストミートした手応え。",
    summary: "神経生理学的には筋膜や神経周囲のポリモーダル受容器やAδ線維の刺激に相当し、内因性鎮痛物質の分泌や血流改善の契機となる。",
    relatedLectureId: "lecture-treatment-1",
    relatedLectureTitle: "治法論 レッスン1：補瀉と刺鍼手技の基礎",
    relatedToolUrl: "/articles/science-of-acupuncture-neuroscience",
    relatedToolTitle: "鍼灸の科学（神経生理学）"
  },
  五労: {
    term: "五労",
    reading: "ごろう",
    category: "診断・診察",
    oneLiner: "日常の偏った動作の継続によって五臓を痛めてしまう、古典『素問』が説く東洋医学版「職業病」。",
    analogy: "「使いすぎによる偏摩耗」。同じ姿勢ばかり続けると特定のパーツだけが消耗する現象。",
    summary: "「久視は血を傷り（心）、久臥は気を傷り（肺）、久坐は肉を傷り（脾）、久立は骨を傷り（腎）、久行は筋を傷る（肝）」。",
    relatedLectureId: "lecture-diagnosis-1",
    relatedLectureTitle: "臨床診断論 レッスン1：問診の基礎と病因分析",
    relatedToolUrl: "/diagnosis?tab=gorou",
    relatedToolTitle: "五労チェッカー"
  },
  弁証論治: {
    term: "弁証論治",
    reading: "べんしょうろんち",
    category: "診断・診察",
    oneLiner: "患者の全身所見を観察して根本の病態パターン（証）を見極め（弁証）、その原因に応じたオーダーメイド治療法を決める（論治）思考法。",
    analogy: "「探偵が散らばった証拠を集めて真犯人を突き止め、的確な解決策を打つ」一連の推理と実行プロセス。",
    summary: "東洋医学の臨床思考の真髄。同一の病気でも体質により異なる治療をし（同病異治）、異なる病気でも同じ体質なら共通の治療をする（異病同治）。",
    relatedLectureId: "lecture-diagnosis-4",
    relatedLectureTitle: "臨床診断論 レッスン4：八綱弁証と臓腑弁証の統合",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  }
};
