export type DepthType = "exterior" | "interior"; // 表 / 裏
export type TemperatureType = "cold" | "heat"; // 寒 / 熱
export type StateType = "deficiency" | "excess"; // 虚 / 実

export type QixueshuiType = 
  | "qixu" // 気虚
  | "qizhi" // 気滞
  | "qini" // 気逆
  | "xuexu" // 血虚
  | "yuxue" // 瘀血
  | "yinxu" // 陰虚
  | "yangxu" // 陽虚
  | "shuitai"; // 水滞・痰湿

export type ZangfuType = 
  | "liver" // 肝・胆
  | "heart" // 心・小腸
  | "spleen" // 脾・胃
  | "lung" // 肺・大腸
  | "kidney"; // 腎・膀胱

export interface MinimalAcupointPair {
  primaryId: string;
  primaryRole: string;
  secondaryId: string;
  secondaryRole: string;
  synergyPrinciple: string;
}

export interface DiagnosisSyndrome {
  id: string;
  name: string;
  reading: string;
  oneSentenceFormula: string; // 一文の証
  summary: string;
  pathology: string; // 現代医学・神経生理学的機序
  minimalAcupoints: MinimalAcupointPair;
  typicalSymptoms: string[];
  dietAdvice: string;
  lifestyleAdvice: string;
  // マッチング条件
  match: {
    depth?: DepthType;
    temperature?: TemperatureType;
    state?: StateType;
    qixueshui: QixueshuiType;
    zangfu: ZangfuType;
  };
}

// 選択肢のメタデータ
export const DEPTH_OPTIONS: { value: DepthType; label: string; sub: string; description: string }[] = [
  { value: "exterior", label: "表（ひょう）", sub: "体表・浅部・急性", description: "病邪が皮膚・筋肉・経絡などの浅い層に侵襲している初期・急性状態。" },
  { value: "interior", label: "裏（り）", sub: "内臓・深部・慢性", description: "病邪が体内深部（臓腑）にあり、機能低下や内因性の不調が生じている状態。" }
];

export const TEMP_OPTIONS: { value: TemperatureType; label: string; sub: string; description: string }[] = [
  { value: "cold", label: "寒（かん）", sub: "代謝低下・冷え・停滞", description: "手足の冷え、血流低下、水様性の分泌物、縮こまるような痛みなどの沈静状態。" },
  { value: "heat", label: "熱（ねつ）", sub: "機能亢進・炎症・赤み", description: "体温上昇、局所の充血、のぼせ、口の渇き、焦燥感などの亢進状態。" }
];

export const STATE_OPTIONS: { value: StateType; label: string; sub: string; description: string }[] = [
  { value: "deficiency", label: "虚（きょ）", sub: "生命力不足・機能衰弱", description: "正気（生命力・免疫・気血）が衰え、エネルギーや栄養が不足した状態。" },
  { value: "excess", label: "実（じつ）", sub: "病邪の鬱滞・過剰・張り", description: "病邪が強く勢いがある、または気血水の滞り・緊張が過剰な状態。" }
];

export const QIXUESHUI_OPTIONS: { value: QixueshuiType; label: string; sub: string; dynamicNature: string }[] = [
  { value: "qizhi", label: "気滞（きたい）", sub: "気の鬱滞・巡り不全", dynamicNature: "エネルギーの運行が滞り、張りとイライラが生じる" },
  { value: "qixu", label: "気虚（ききょ）", sub: "気エネルギーの枯渇", dynamicNature: "推進力と温煦力が衰え、無力感・息切れが生じる" },
  { value: "qini", label: "気逆（きぎゃく）", sub: "気の異常上昇・突き上げ", dynamicNature: "下降すべき気が逆流し、のぼせ・咳・吐き気が生じる" },
  { value: "xuexu", label: "血虚（けっきょ）", sub: "血液・滋養物質の不足", dynamicNature: "組織や脳への滋養が不足し、乾燥・めまい・不眠が生じる" },
  { value: "yuxue", label: "瘀血（おけつ）", sub: "血行の病理的鬱滞", dynamicNature: "微小循環が障害され、局所の固定刺痛や暗紫色変化が生じる" },
  { value: "yinxu", label: "陰虚（いんきょ）", sub: "体内冷却水の不足・乾燥", dynamicNature: "体液が干上がり、相対的に熱が浮き上がってほてりが生じる" },
  { value: "yangxu", label: "陽虚（ようきょ）", sub: "体内温熱エネルギーの衰退", dynamicNature: "生命の火が弱まり、内臓から四肢末梢まで芯から冷え切る" },
  { value: "shuitai", label: "水滞・痰湿（すいたい）", sub: "体液代謝産物の停滞", dynamicNature: "水分の排泄運化が阻害され、重だるさ・むくみ・眩暈が生じる" }
];

export const ZANGFU_OPTIONS: { value: ZangfuType; label: string; sub: string; organRole: string }[] = [
  { value: "liver", label: "肝・胆（かん・たん）", sub: "自律神経・気機・筋", organRole: "全身の気のめぐり（疏泄）と情動、筋腱の緊張を主導" },
  { value: "heart", label: "心・小腸（しん・しょうちょう）", sub: "心血・精神意識", organRole: "脈管循環の駆動と大脳皮質の精神・意識活動（神明）を統括" },
  { value: "spleen", label: "脾・胃（ひ・い）", sub: "消化吸収・後天の気", organRole: "飲食物から気血津液を生み出し全身へ運化するエネルギー工場" },
  { value: "lung", label: "肺・大腸（はい・だいちょう）", sub: "呼吸・皮膚バリア・粛降", organRole: "清気の吸入、水分を全身・膀胱へ散布下降させ体表を守る" },
  { value: "kidney", label: "腎・膀胱（じん・ぼうこう）", sub: "先天の精・骨・水分代謝", organRole: "生命力の根本（精・原気）を蓄え、下行性の水分排泄と骨髄を司る" }
];

// 定義済み臨床代表症例マトリクス
export const SYNDROME_DATABASE: DiagnosisSyndrome[] = [
  {
    id: "ganki-ukketu",
    name: "肝気鬱結証",
    reading: "かんきうっけつしょう",
    oneSentenceFormula: "裏・実・気滞が肝胆に鬱結し、疏泄機能の失調により自律神経緊張と側腹部痛を招いた病態。",
    summary: "精神的ストレスや情動の抑圧によって、肝の「気を全身へ伸びやかにめぐらせる働き（疏泄）」がブロックされた状態です。現代医学における自律神経失調症や緊張型頭痛、月経前症候群（PMS）の中核病態に相当します。",
    pathology: "大脳皮質・扁桃体の過剰興奮が視床下部を介して交感神経を持続的に緊張させ、末梢血管や平滑筋（消化管・胆道系・子宮）のスパズム（攣縮）を引き起こします。",
    minimalAcupoints: {
      primaryId: "taishou",
      primaryRole: "主穴（肝経原穴）：自律神経中枢の過緊張を緩解し、肝気を強力に疏通させる。",
      secondaryId: "youryouzen",
      secondaryRole: "配穴（胆経合穴・筋会）：表裏関係にある胆経を通じ、側頭部・側腹部の筋膜緊張を解除する。",
      synergyPrinciple: "「原合配穴（肝原穴＋胆合穴）」による表裏協調作用。太衝で中枢性の気滞（情動興奮）を沈静化し、陽陵泉で末梢の筋膜性拘縮を一挙に解纜（かいらん）する黄金ペア。"
    },
    typicalSymptoms: ["イライラ・怒りっぽい", "胸脇部の張り・ため息", "喉のつかえ感（梅核気）", "月経前の乳房痛・下腹部痛", "偏頭痛"],
    dietAdvice: "香りの良い食材（紫蘇、春菊、柑橘類、ジャスミン茶、ミント）で気を巡らせましょう。",
    lifestyleAdvice: "軽いウォーキングや深呼吸、感情を溜め込まず声に出す発散法が有効です。",
    match: { depth: "interior", state: "excess", qixueshui: "qizhi", zangfu: "liver" }
  },
  {
    id: "hiki-kyojaku",
    name: "脾気虚弱証",
    reading: "ひききょじゃくしょう",
    oneSentenceFormula: "裏・虚・気虚が脾胃に局在し、運化（消化吸収）不全により全身のエネルギー産生が衰退した病態。",
    summary: "飲食物からエネルギー（気・血）を作り出す中枢である「脾胃」の働きが低下した状態です。現代医学での慢性胃炎、機能性ディスペプシア（FD）、慢性疲労症候群に深く合致します。",
    pathology: "消化管運動の低下、消化酵素・胃酸の分泌不全、およびミトコンドリアでのATP産生低下により、全身の骨格筋や脳へのエネルギー供給が枯渇しています。",
    minimalAcupoints: {
      primaryId: "ashisanri",
      primaryRole: "主穴（胃経合穴・胃下合穴）：迷走神経を介して胃腸運動を賦活し、後天の気を増生する。",
      secondaryId: "taihaku",
      secondaryRole: "配穴（脾経原穴）：脾経の本穴として消化吸収・運化機能を根底から高める。",
      synergyPrinciple: "「原合配穴（胃合穴＋脾原穴）」。消化管の蠕動運動を促す足三里と、粘膜・吸収力を強める太白が共鳴し、中焦のエネルギー工場の出力を最大化します。"
    },
    typicalSymptoms: ["食欲不振・食後の強い眠気", "食後の胃もたれ・腹部膨満", "軟便・下痢傾向", "手足のだるさ・無気力", "朝起きられない"],
    dietAdvice: "温かく消化の良い根菜類（かぼちゃ、山芋、じゃがいも、米粥、大棗）をよく噛んで摂取してください。",
    lifestyleAdvice: "冷たい飲食や生ものを避け、腹八分目を徹底。食後30分は激しい運動を控えて横になりましょう。",
    match: { depth: "interior", state: "deficiency", qixueshui: "qixu", zangfu: "spleen" }
  },
  {
    id: "jin-yinxu",
    name: "腎陰虚証",
    reading: "じんいんきょしょう",
    oneSentenceFormula: "裏・虚・熱・陰虚が腎に局在し、生体冷却水（真陰）の涸渇により虚火が浮上した病態。",
    summary: "生命の根本的な貯水池である「腎の陰液」が加齢や過労、夜更かしによって干上がり、ブレーキが効かなくなった虚熱（のぼせ・ほてり）が全身に現れる状態です。更年期障害や自律神経失調に典型です。",
    pathology: "副腎皮質ホルモンや性ホルモンの低下に伴う視床下部温熱中枢の不安定化、末梢血管の拡張不全、交感神経系の過度な相対的興奮が生じています。",
    minimalAcupoints: {
      primaryId: "taikei",
      primaryRole: "主穴（腎経原穴）：腎経の原気を直接補給し、深部の陰液（髄・ホルモンバランス）を滋養する。",
      secondaryId: "shoukai",
      secondaryRole: "配穴（腎経・八脈交会穴）：陰蹻脈に通じ、下腹部から胸・咽喉への潤いを引き上げて虚熱を鎮静化する。",
      synergyPrinciple: "「同経原交配穴（腎原穴＋陰蹻脈会穴）」。太谿で腎水の本源を満たし、照海でその潤いを全身の上部（目・喉・頭部）へ循環させてほてりを速やかに冷ます絶妙なコンビネーション。"
    },
    typicalSymptoms: ["手足のひらや足裏のほてり（五心煩熱）", "夜間の寝汗（盗汗）", "腰や膝の脱力感・酸痛", "耳鳴り・かすみ目", "口や喉の乾き（夜間に増悪）"],
    dietAdvice: "黒色食材や滋陰食材（黒ごま、黒豆、クコの実、山芋、豚肉、牡蠣）が陰液を回復させます。",
    lifestyleAdvice: "夜更かしは陰液を激しく消耗します。日付が変わる前に就寝し、過度な発汗サウナは控えましょう。",
    match: { depth: "interior", temperature: "heat", state: "deficiency", qixueshui: "yinxu", zangfu: "kidney" }
  },
  {
    id: "hishin-yangxu",
    name: "脾腎陽虚証",
    reading: "ひしんようきょしょう",
    oneSentenceFormula: "裏・虚・寒・陽虚が脾腎に及び、体内ボイラーの火が衰微して芯から冷え切った重度病態。",
    summary: "脾（消化吸収）と腎（生命の根源）の温熱エネルギー（陽気）が共に衰退し、全身を温める力と水分を気化させる力が失われた状態です。高齢者の慢性冷え症や難治性下痢に見られます。",
    pathology: "甲状腺ホルモンや副腎髄質の代謝促進作用が低下し、基礎代謝率が著しく低下。熱産生不能と末梢循環不全が併発しています。",
    minimalAcupoints: {
      primaryId: "meimon",
      primaryRole: "主穴（督脈）：生命の温熱の根源である「命門の火」を直接点火し、腎陽を鼓舞する。",
      secondaryId: "kangen",
      secondaryRole: "配穴（任脈・丹田）：原気の集まる関所。温灸により中焦〜下焦を温め、脾胃と腎気を底上げする。",
      synergyPrinciple: "「陰陽前背配穴（背部の命門＋腹部の関元）」。人体の前（任脈・陰）と後（督脈・陽）を貫通して温熱エネルギーを注ぎ込み、全身の代謝ボイラーを再起動する回陽救逆の極意。"
    },
    typicalSymptoms: ["腰から下肢にかけての激しい冷え", "早朝の腹痛・泥状下痢（五更下痢）", "下半身の著しい浮腫", "頻尿・透明で多量の尿", "全身の強い倦怠感"],
    dietAdvice: "身体を芯から温める陽気食材（生姜、シナモン、羊肉、ニラ、くるみ、山椒）を温食してください。",
    lifestyleAdvice: "おへそとお尻周りを絶対に冷やさないこと。足湯や温灸器を活用し、冷房の直風を避けましょう。",
    match: { depth: "interior", temperature: "cold", state: "deficiency", qixueshui: "yangxu", zangfu: "kidney" }
  },
  {
    id: "shinketsu-oso",
    name: "心血瘀阻証",
    reading: "しんけつおそしょう",
    oneSentenceFormula: "裏・実・瘀血が心脈に鬱滞し、血行循環の阻害により胸背部の刺痛と脈結代を生じた病態。",
    summary: "心臓を取り巻く血脈（冠動脈など）の流れがドロドロの血液や気滞によって阻まれ、刺すような胸痛や動悸が現れる状態です。狭心症や冠動脈疾患、強い首肩の凝りに関連します。",
    pathology: "血管内皮障害、血小板凝集能の亢進、局所微小循環障害により、心筋への酸素・基質供給が一時的に滞っています。",
    minimalAcupoints: {
      primaryId: "naikan",
      primaryRole: "主穴（心包経絡穴・八脈交会穴）：迷走神経反射を介して心胸部の緊張を解き、狭心感を寛解する。",
      secondaryId: "kakuyu",
      secondaryRole: "配穴（膀胱経・八会穴血会）：全身の瘀血を強力に排除し、血液循環を促進（活血化瘀）する。",
      synergyPrinciple: "「遠道絡穴＋背部血会穴」。四肢末梢の内関で心胸部の中枢性緊張と自律神経を安定化させ、背部の膈兪で全身の血行鬱滞を物理的に打破する活血化瘀の決定版。"
    },
    typicalSymptoms: ["胸が締め付けられる・針で刺すような胸痛", "左肩や背中への放散痛", "動悸・不整脈感（結代脈）", "唇や爪が暗紫色（チアノーゼ傾向）", "舌下静脈の怒張・怒張"],
    dietAdvice: "血流をサラサラにする活血食材（玉ねぎ、青魚、黒酢、黒きくらげ、納豆、ウコン茶）が適します。",
    lifestyleAdvice: "急激な寒冷刺激を避け、水分補給を怠らないこと。重篤な胸痛がある場合は直ちに循環器内科を受診してください。",
    match: { depth: "interior", state: "excess", qixueshui: "yuxue", zangfu: "heart" }
  },
  {
    id: "tanshitsuso-hai",
    name: "痰湿阻肺証",
    reading: "たんしつそはいしょう",
    oneSentenceFormula: "裏・実・水滞（痰湿）が肺系に滞留し、気道の狭窄と肺気粛降不全を招いた病態。",
    summary: "体液代謝の停滞によって生じた病理的産物「痰湿」が気道や呼吸器を塞ぎ、ゼーゼーする咳や大量の痰、頭の重重しさを生じる状態です。気管支炎や気管支喘息、副鼻腔炎に該当します。",
    pathology: "気道分泌物の粘稠度亢進、線毛運動の低下、気道過敏性と局所浮腫が生じています。",
    minimalAcupoints: {
      primaryId: "houryu",
      primaryRole: "主穴（胃経絡穴）：全身の病理的体液産物（痰飲）を消化管・尿路へ導いて排泄する化痰の至宝穴。",
      secondaryId: "chukan",
      secondaryRole: "配穴（任脈・胃募穴・腑会）：脾胃の運化を活性化し、痰湿の発生源（生痰之源）を根絶する。",
      synergyPrinciple: "「治痰標本兼治（標治の豊隆＋本治の中脘）」。東洋医学では『脾は生痰の源、肺は貯痰の器』と言われます。豊隆で肺の痰を排泄し、中脘で脾胃の痰の生成を元から断つ完璧な配穴。"
    },
    typicalSymptoms: ["白い粘り気のある痰が大量に出る", "咳・息苦しさ・喘鳴", "胸苦しさ・胃の重だるさ", "頭が重くスッキリしない（頭重感）", "白く厚い舌苔"],
    dietAdvice: "水分代謝を促す利水食材（はと麦、小豆、冬瓜、大根、生姜）を摂り、乳製品・甘味・脂っこいものを制限します。",
    lifestyleAdvice: "湿気の多い環境を避け、適度な運動でじんわりと発汗して余分な湿気を逃がしましょう。",
    match: { depth: "interior", state: "excess", qixueshui: "shuitai", zangfu: "lung" }
  },
  {
    id: "kanka-joen",
    name: "肝火上炎証",
    reading: "かんかじょうえんしょう",
    oneSentenceFormula: "裏・実・熱・気逆が肝胆の経脈を暴走し、激しい頭痛・目の充血・のぼせを噴き上げた病態。",
    summary: "強いストレスや怒り、過度の飲酒によって肝の熱が激しく燃え上がり（火）、頭部や顔面へと直登した状態です。激しい片頭痛、突発性難聴、高血圧クリーゼの前兆に相当します。",
    pathology: "急激な血圧上昇、頭蓋内血管の拡張、交感神経の過剰暴走によるアドレナリンサージが発生しています。",
    minimalAcupoints: {
      primaryId: "koukan",
      primaryRole: "主穴（肝経滎火穴・子穴）：『実すれば其の子を瀉す』の法則に従い、肝経の燃え盛る火を直接冷却する。",
      secondaryId: "taishou",
      secondaryRole: "配穴（肝経原穴）：肝気のめぐりを整え、頭部に昇り詰めた熱気を足元へと強制誘導する。",
      synergyPrinciple: "「同経滎原同用（肝滎穴＋肝原穴）」。行間による強力な消火（清熱瀉火）と、太衝による降気作用が連動し、頭部の血管拍動痛と血圧上昇を急激にクールダウンさせます。"
    },
    typicalSymptoms: ["ズキズキと拍動する激しい頭痛", "目の充血・灼熱感", "激しい怒り・感情の爆発", "顔面の紅潮・のぼせ", "苦い味の口渇・便秘"],
    dietAdvice: "熱を冷ます苦味・寒性食材（ゴーヤ、セロリ、トマト、緑茶、菊花茶、きゅうり）を積極的に。",
    lifestyleAdvice: "アルコール、辛い香辛料、激しい議論を厳禁とし、静かな暗い部屋で深呼吸して休息します。",
    match: { depth: "interior", temperature: "heat", state: "excess", qixueshui: "qini", zangfu: "liver" }
  },
  {
    id: "fukan-hyoushou",
    name: "風寒表証",
    reading: "ふうかんひょうしょう",
    oneSentenceFormula: "表・実・寒が肺皮毛を襲い、体表の衛気閉塞により悪寒・無汗・後頭部痛を呈した急性病態。",
    summary: "風邪のひき始め。冷たい風や寒さ（風寒の邪）が体表のバリア（衛気・皮膚毛穴）を直撃し、毛穴がキュッと閉じて熱が逃げられず、ゾクゾクする悪寒や後頭部痛が出ている状態です。",
    pathology: "ウイルス感染初期の体表皮膚血管の反射性収縮、骨格筋のふるえ熱産生、後頭部・項背筋群の急性緊張。",
    minimalAcupoints: {
      primaryId: "rekketsu",
      primaryRole: "主穴（肺経絡穴・八脈交会穴）：『頭項は列缺に収む』。肺気を宣発させ、体表の毛穴を開いて邪を発散する。",
      secondaryId: "fuuchi",
      secondaryRole: "配穴（胆経・風邪の門）：後頭部の血流を急激に回復させ、風邪を吹き飛ばす特効穴。",
      synergyPrinciple: "「経絡交会発汗配穴（肺経絡穴＋胆経交会穴）」。列缺で肺のバリアを開放し、風池で後頭部の血行鬱滞を温めることで、初期の悪寒・頭痛・首筋の張りを即効で解表（発汗発散）させます。"
    },
    typicalSymptoms: ["ゾクゾクする寒気（着込んでも寒い）", "首の後ろから肩にかけてのこわばり", "後頭部痛", "汗が出ない（無汗）", "透明でサラサラした鼻水"],
    dietAdvice: "発汗を促す辛温食材（生姜湯、長ネギの白い部分の味噌汁、葛湯）を熱々で飲みましょう。",
    lifestyleAdvice: "首の後ろ（風門・大椎・風池）をドライヤーやマフラーで徹底的に温め、早く就寝してください。",
    match: { depth: "exterior", temperature: "cold", state: "excess", qixueshui: "qizhi", zangfu: "lung" }
  },
  {
    id: "shin-ketsuxu",
    name: "心血虚証",
    reading: "しんけっきょしょう",
    oneSentenceFormula: "裏・虚・血虚が心系に局在し、心神（大脳意識）の滋養不足により不眠・多夢・動悸を生じた病態。",
    summary: "心臓と大脳を養う「血」が不足し、心が落ち着きを失って夜に眠れなくなったり、小さな物音にビクビク驚いて動悸がする状態です。貧血傾向や過度な精神疲労に伴います。",
    pathology: "セロトニンやGABAなどの抑制性神経伝達物質の合成不全、脳血流および酸素運搬能の低下による大脳辺縁系の過敏化。",
    minimalAcupoints: {
      primaryId: "sanyinkou",
      primaryRole: "主穴（脾経・三陰交会穴）：肝・脾・腎を同時に養い、全身の新血生成（造血能）を強力に促進する。",
      secondaryId: "naikan",
      secondaryRole: "配穴（心包経絡穴）：心神を安寧させ（安神寧心）、乱れた自律神経と動悸を穏やかに整える。",
      synergyPrinciple: "「造血安神配穴（三陰交＋内関）」。三陰交で血液の絶対量を滋養し、内関で心の動悸・焦燥感を直接落ち着かせる、不眠・不安神経症の基幹配穴。"
    },
    typicalSymptoms: ["寝付きが悪い・途中で目が覚める・夢が多い", "ふとした瞬間の動悸・息切れ", "健忘・物忘れ", "立ちくらみ・めまい", "顔色が青白い"],
    dietAdvice: "血を補う補血食材（レバー、ほうれん草、人参、なつめ、龍眼肉、プルーン）を意識して摂取しましょう。",
    lifestyleAdvice: "寝る前のスマートフォン操作は心血を酷使します。温かいハーブティーを飲み、照明を暗めにしてリラックスを。",
    match: { depth: "interior", state: "deficiency", qixueshui: "xuexu", zangfu: "heart" }
  }
];

// 動的フォールバック合成関数（マトリクス外の組み合わせでも正確な「一文の証」と「最小ツボ」を合成）
export function synthesizeDiagnosis(
  depth: DepthType,
  temp: TemperatureType,
  state: StateType,
  qixueshui: QixueshuiType,
  zangfu: ZangfuType
): DiagnosisSyndrome {
  // 1. 完全一致または部分一致を探索
  const exact = SYNDROME_DATABASE.find(
    (s) =>
      s.match.qixueshui === qixueshui &&
      s.match.zangfu === zangfu &&
      (s.match.depth === undefined || s.match.depth === depth) &&
      (s.match.temperature === undefined || s.match.temperature === temp) &&
      (s.match.state === undefined || s.match.state === state)
  );

  if (exact) return exact;

  // 2. 臓腑と気血水によるベストマッチ
  const semi = SYNDROME_DATABASE.find(
    (s) => s.match.qixueshui === qixueshui && s.match.zangfu === zangfu
  );
  if (semi) return semi;

  // 3. 論理的動的合成（一文の証とツボを自動生成）
  const depthLabel = depth === "interior" ? "裏" : "表";
  const tempLabel = temp === "heat" ? "熱" : "寒";
  const stateLabel = state === "excess" ? "実" : "虚";

  const qData = QIXUESHUI_OPTIONS.find((q) => q.value === qixueshui)!;
  const zData = ZANGFU_OPTIONS.find((z) => z.value === zangfu)!;

  const zangName = zData.label.split("（")[0];
  const qName = qData.label.split("（")[0];

  // 臓腑ごとの代表原穴・代表配穴マッピング
  const DEFAULT_PAIRS: Record<ZangfuType, { primaryId: string; primaryRole: string; secondaryId: string; secondaryRole: string }> = {
    liver: {
      primaryId: "taishou",
      primaryRole: "肝原穴：気機の疏通と筋緊張の緩和",
      secondaryId: "youryouzen",
      secondaryRole: "胆合穴・筋会：側腹部・側頭部筋膜の弛緩"
    },
    heart: {
      primaryId: "naikan",
      primaryRole: "心包絡穴：心胸部の緊張緩和と精神安寧",
      secondaryId: "sanyinkou",
      secondaryRole: "三陰交会穴：血流滋養と下肢循環改善"
    },
    spleen: {
      primaryId: "ashisanri",
      primaryRole: "胃合穴：中焦運化と後天の気の産生",
      secondaryId: "taihaku",
      secondaryRole: "脾原穴：消化吸収能の底上げ"
    },
    lung: {
      primaryId: "rekketsu",
      primaryRole: "肺絡穴：宣肺解表と気道バリア強化",
      secondaryId: "gokoku",
      secondaryRole: "大腸原穴：清熱解表と気血の巡り促進"
    },
    kidney: {
      primaryId: "taikei",
      primaryRole: "腎原穴：先天の原気滋養と体液ホメオスタシス",
      secondaryId: "shoukai",
      secondaryRole: "陰蹻脈交会穴：下焦から胸部への潤いの滋養"
    }
  };

  const pair = DEFAULT_PAIRS[zangfu];

  return {
    id: `synth-${depth}-${temp}-${state}-${qixueshui}-${zangfu}`,
    name: `${zangName}${qName}証`,
    reading: `${zangName}・${qName}の病態`,
    oneSentenceFormula: `${depthLabel}・${stateLabel}・${tempLabel}の病態が【${zData.label}】に局在し、${qData.sub}を引き起こした複合病態。`,
    summary: `八綱の「${depthLabel}・${tempLabel}・${stateLabel}」という生体の深浅・冷熱・勢いに対し、病態力学としての「${qData.label}」が【${zData.label}】に波及している状態です。`,
    pathology: `【${zData.organRole}】に関わる機能単位に${qData.dynamicNature}という病理変化が生じています。`,
    minimalAcupoints: {
      primaryId: pair.primaryId,
      primaryRole: `主穴：${pair.primaryRole}`,
      secondaryId: pair.secondaryId,
      secondaryRole: `配穴：${pair.secondaryRole}`,
      synergyPrinciple: `局在する${zangName}の原気・絡脈を主穴で調え、相表裏関係にある配穴で末梢循環と自律神経反射をサポートする最小構成配穴。`
    },
    typicalSymptoms: [
      `${zangName}の機能低下・過緊張`,
      `${qData.sub}に伴う全身の違和感`,
      `${tempLabel === "熱" ? "熱感・のぼせ・赤み" : "冷え・機能低下・沈静"}`,
      `${stateLabel === "実" ? "張るような違和感・固定痛" : "力が入らない・疲労倦怠感"}`
    ],
    dietAdvice: `${tempLabel === "熱" ? "身体の熱を穏やかに冷ます清熱食材" : "胃腸を芯から温める温熱食材"}と、${qData.label}を調える食養生を意識してください。`,
    lifestyleAdvice: "まずは過度な心身の疲労を取り除き、ツボへのやさしい押圧やお灸で経絡の通りを回復させましょう。",
    match: { depth, temperature: temp, state, qixueshui, zangfu }
  };
}
