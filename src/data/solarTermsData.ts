export interface SolarTermInfo {
  id: string;
  name: string;
  kana: string;
  month: number;
  approxDay: number; // おおよその開始日（平年）
  periodStr: string;
  fiveSeason: "春（木）" | "夏（火）" | "秋（金）" | "冬（水）" | "土用（土）";
  organ: string; // 関連臓腑（例: "肝・胆", "肺・大腸", "脾・胃"）
  catchphrase: string; // 今日の養生キャッチコピー
  classicQuote: string; // 『黄帝内経・素問』四気調神大論などの金言
  dietAdvice: string; // 🌿 食養生
  lifestyleAdvice: string; // 🚶 生活習慣・心の養生
  tsuboName: string; // 🎯 おすすめツボ名
  tsuboId: string; // 経穴ID（リンク用）
  tsuboTip: string; // ツボの押し方・作用
  themeTag: string; // 和の装飾タグ
}

// 二十四節気（24件）の通年マスターデータ
export const SOLAR_TERMS: SolarTermInfo[] = [
  // --- 春（木・肝・昇発期） ---
  {
    id: "risshun",
    name: "立春",
    kana: "りっしゅん",
    month: 2,
    approxDay: 4,
    periodStr: "2月4日頃〜2月18日頃",
    fiveSeason: "春（木）",
    organ: "肝・胆",
    catchphrase: "今の季節は【春・肝の昇発期】です。冬の縮こまりを解き、のびやかに気を巡らせましょう。",
    classicQuote: "『素問・四気調神大論』「春三月、此謂発陳。天地倶生、万物以栄。夜臥早起、広歩於庭」",
    dietAdvice: "セリ、フキノトウ、菜の花など「ほのかな苦味と香り」で冬の老廃物を解毒し、肝気を巡らせます。",
    lifestyleAdvice: "髪をゆるやかにほどき、朝の散歩でのびのびと体を動かし、怒りやストレスを抑えて心を伸びやかに。",
    tsuboName: "太衝",
    tsuboId: "taishou",
    tsuboTip: "足の甲の「太衝」を息を吐きながら指圧し、上昇しがちな肝気をなだめます。",
    themeTag: "春の始まり・発陳"
  },
  {
    id: "usui",
    name: "雨水",
    kana: "うすい",
    month: 2,
    approxDay: 19,
    periodStr: "2月19日頃〜3月5日頃",
    fiveSeason: "春（木）",
    organ: "肝・胆",
    catchphrase: "今の季節は【春・雪解けと気の始動期】です。三寒四温の寒暖差に備え、下半身を冷やさない養生を。",
    classicQuote: "『千金月令』「春気微陽、上行而散、下寒猶在、宜温下凍上」",
    dietAdvice: "ニラ、新玉ねぎ、生姜など温性の辛味食材で陽気を補い、春先の冷えから胃腸を守ります。",
    lifestyleAdvice: "「上薄下厚」の原則に従い、上半身は軽やかに、足元や腰回りは保温して自律神経の乱れを防ぎます。",
    tsuboName: "三陰交",
    tsuboId: "sanyinkou",
    tsuboTip: "足首の「三陰交」にお灸や温熱刺激を与え、下半身の冷えと肝血の滞りを改善。",
    themeTag: "草木萌動・三寒四温"
  },
  {
    id: "keichitsu",
    name: "啓蟄",
    kana: "けいちつ",
    month: 3,
    approxDay: 6,
    periodStr: "3月6日頃〜3月20日頃",
    fiveSeason: "春（木）",
    organ: "肝・胆",
    catchphrase: "今の季節は【春・陽気高揚期】です。虫たちが目覚めるように代謝が活発化。自律神経のたかぶりに注意。",
    classicQuote: "『素問』「生而勿殺、予而勿奪、賞而勿罰、此春気之応、養生之道也」",
    dietAdvice: "春キャベツ、アスパラガス、レモンなど酸味と甘味をバランスよく摂り、肝気の過熱（イライラ）を鎮めます。",
    lifestyleAdvice: "冬の運動不足を徐々に解消。激しい運動は避け、心地よいストレッチで筋膜の緊張をほぐします。",
    tsuboName: "陽陵泉",
    tsuboId: "youryousen",
    tsuboTip: "膝外下の「陽陵泉」をほぐし、全身の筋膜のこわばりと気の滞りを解消します。",
    themeTag: "蟄虫啓戸・陽気上昇"
  },
  {
    id: "shunbun",
    name: "春分",
    kana: "しゅんぶん",
    month: 3,
    approxDay: 21,
    periodStr: "3月21日頃〜4月4日頃",
    fiveSeason: "春（木）",
    organ: "肝・胆",
    catchphrase: "今の季節は【春・陰陽平分期】です。昼夜の長さが均等になり、自律神経（交感・副交感）のバランスを整える好機。",
    classicQuote: "『春秋繁露』「春分者、陰陽相半也、故昼夜均而寒暑平」",
    dietAdvice: "たけのこ、わかめ、ハーブティーなど、香りと軽やかな滋味で体内の余分な熱と湿気をデトックス。",
    lifestyleAdvice: "交感神経優位になりやすい季節。夜はぬるめのお湯に浸かり、就寝前のスクリーンタイムを控えます。",
    tsuboName: "太衝",
    tsuboId: "taishou",
    tsuboTip: "足の「太衝」と手の「合谷」を併用する四関穴で、全身の気の偏りをリセット。",
    themeTag: "陰陽調和・自律神経"
  },
  {
    id: "seimei",
    name: "清明",
    kana: "せいめい",
    month: 4,
    approxDay: 5,
    periodStr: "4月5日頃〜4月19日頃",
    fiveSeason: "春（木）",
    organ: "肝・胆",
    catchphrase: "今の季節は【春・万物清朗期】です。天地が清らかに明るく満ちる時。外に出て春の気を吸い込みましょう。",
    classicQuote: "『暦便覧』「万物発して清浄明潔なれば、此芽は何の草と知れる也」",
    dietAdvice: "新じゃがいも、いちご、菊花茶など、肝を助け目の疲れや頭ののぼせを和らげる食材が最適。",
    lifestyleAdvice: "公園や自然豊かな場所を歩き、深呼吸。春風に当たりすぎると風邪（ふうじゃ）を引くため薄着に注意。",
    tsuboName: "風池",
    tsuboId: "fuuchi",
    tsuboTip: "首の後ろの「風池」を親指で押し上げ、春風による頭痛や眼精疲労を解消。",
    themeTag: "清浄明潔・春風発散"
  },
  {
    id: "kokuu",
    name: "穀雨",
    kana: "こくう",
    month: 4,
    approxDay: 20,
    periodStr: "4月20日頃〜5月4日頃",
    fiveSeason: "春（木）",
    organ: "肝・脾",
    catchphrase: "今の季節は【春の結び・湿雨期】です。春雨が百穀を潤す季節。湿気に備え脾胃（胃腸）を整えましょう。",
    classicQuote: "『素問』「春応在肝、夏応在心、長夏応在脾…」",
    dietAdvice: "小豆、そら豆、ハトムギなど、体内の余分な水分を排泄し胃腸を元気にする食材を積極的に。",
    lifestyleAdvice: "雨の日の湿気で体が重だるくなりやすい時期。適度に入浴で汗をかき、湿邪を体表から追い出します。",
    tsuboName: "足三里",
    tsuboId: "ashisanri",
    tsuboTip: "すねの「足三里」を指圧し、湿気に負けない健やかな消化吸収力を維持します。",
    themeTag: "百穀春雨・脾胃準備"
  },

  // --- 夏（火・心・蕃秀期） ---
  {
    id: "rikka",
    name: "立夏",
    kana: "りっか",
    month: 5,
    approxDay: 5,
    periodStr: "5月5日頃〜5月20日頃",
    fiveSeason: "夏（火）",
    organ: "心・小腸",
    catchphrase: "今の季節は【夏・心火の成長期】です。新緑が眩しく陽気が旺盛に。適度に汗をかき心神を健やかに。",
    classicQuote: "『素問・四気調神大論』「夏三月、此謂蕃秀。天地気交、万物華実。夜臥早起、無厭於日」",
    dietAdvice: "トマト、きゅうり、緑茶など清熱・生津作用のある食材で、夏の熱を体にこもらせない工夫を。",
    lifestyleAdvice: "日差しを恐れず適度に活動し、気分の鬱屈を発散。ただし激しい運動での過度な発汗は心気を消耗します。",
    tsuboName: "曲池",
    tsuboId: "kyokuchi",
    tsuboTip: "肘の「曲池」を優しく指圧し、体内にこもり始める熱を外へ発散させます。",
    themeTag: "新緑初夏・心火養生"
  },
  {
    id: "shouman",
    name: "小満",
    kana: "しょうまん",
    month: 5,
    approxDay: 21,
    periodStr: "5月21日頃〜6月5日頃",
    fiveSeason: "夏（火）",
    organ: "心・脾",
    catchphrase: "今の季節は【夏・陽気充実期】です。万物が満ち始める季節。湿熱（蒸し暑さ）による皮膚トラブルや倦怠感に注意。",
    classicQuote: "『月令七十二候集解』「四月中、小満者、物致於此小得盈満」",
    dietAdvice: "冬瓜、緑豆、苦瓜（ゴーヤ）など、余分な熱と湿気を利尿で流す苦味・寒涼食材を取り入れます。",
    lifestyleAdvice: "冷たい飲食物を摂りすぎると脾胃の陽気を傷めます。常温以上の水分補給を心がけましょう。",
    tsuboName: "陰陵泉",
    tsuboId: "inryousen",
    tsuboTip: "すね内側の「陰陵泉」を指圧し、体内の湿熱と水分滞留を排出します。",
    themeTag: "万物盈満・湿熱対策"
  },
  {
    id: "boushu",
    name: "芒種",
    kana: "ぼうしゅ",
    month: 6,
    approxDay: 6,
    periodStr: "6月6日頃〜6月20日頃",
    fiveSeason: "夏（火）",
    organ: "心・脾",
    catchphrase: "今の季節は【梅雨・湿邪侵入期】です。田植えと雨の季節。重だるい疲労や胃腸機能の低下をケアしましょう。",
    classicQuote: "『素問』「地之湿気、感則害人皮肉筋脈」",
    dietAdvice: "梅干し、紫蘇、生姜など「酸味と辛味」で胃液分泌を助け、食欲不振と食中毒を予防します。",
    lifestyleAdvice: "除湿器を活用して住環境の湿気をコントロール。ウォーキングで軽く汗を流し、巡りを促します。",
    tsuboName: "豊隆",
    tsuboId: "houryuu",
    tsuboTip: "すね外側の「豊隆」を押し揉み、梅雨特有の重だるい痰湿（老廃物）を溶かします。",
    themeTag: "入梅梅雨・水毒排泄"
  },
  {
    id: "geshi",
    name: "夏至",
    kana: "げし",
    month: 6,
    approxDay: 21,
    periodStr: "6月21日頃〜7月6日頃",
    fiveSeason: "夏（火）",
    organ: "心・小腸",
    catchphrase: "今の季節は【夏・陽極陰生期】です。一年で昼が最も長く陽気が極まる時。心神（メンタル）を穏やかに。",
    classicQuote: "『周易』「夏至一陰生、冬至一陽生」",
    dietAdvice: "すいか、桃、麦茶など、失われやすい水分とカリウムを補い、心臓への負担を和らげます。",
    lifestyleAdvice: "陽気が極まるため精神が高ぶりやすい時期。昼寝（15〜20分）で心身の熱を鎮め、夕涼みでリラックス。",
    tsuboName: "神門",
    tsuboId: "shinmon",
    tsuboTip: "手首の「神門」を静かに押さえ、興奮した神経を静めて心地よい入眠を促します。",
    themeTag: "陽極一陰・心神安寧"
  },
  {
    id: "shousho",
    name: "小暑",
    kana: "しょうしょ",
    month: 7,
    approxDay: 7,
    periodStr: "7月7日頃〜7月22日頃",
    fiveSeason: "夏（火）",
    organ: "心・脾",
    catchphrase: "今の季節は【夏・暑気到来期】です。梅雨明けとともに本格的な暑さへ。冷房病（クーラー冷え）に注意。",
    classicQuote: "『養生訓』「夏月は陰気伏在す。腹中冷えやすし、冷物過食すべからず」",
    dietAdvice: "うなぎ、枝豆、大葉など、暑さに負けないスタミナと胃腸を温める薬味を上手に組み合わせます。",
    lifestyleAdvice: "エアコンの冷風が首や足首に直接当たらないよう工夫。首元に薄手のストールを常備しましょう。",
    tsuboName: "内関",
    tsuboId: "neikan",
    tsuboTip: "手首内側の「内関」を指圧し、暑気あたりによる吐き気や胃もたれを鎮めます。",
    themeTag: "温風至・暑気順応"
  },
  {
    id: "taisho",
    name: "大暑",
    kana: "たいしょ",
    month: 7,
    approxDay: 23,
    periodStr: "7月23日頃〜8月6日頃",
    fiveSeason: "夏（火）",
    organ: "心・肺",
    catchphrase: "今の季節は【盛夏・酷暑期】です。一年で最も暑い季節。清熱解暑（熱を逃がし潤いを補う）を徹底しましょう。",
    classicQuote: "『素問』「使気得洩、若所愛在外、此夏気之応、養長之道也」",
    dietAdvice: "ゴーヤ、ナス、ところてんなど、熱を冷まし水分を保持する食材。冷たいものの摂りすぎはNG。",
    lifestyleAdvice: "日中の激しい直射日光を避け、早朝や夕方の涼しい時間帯に活動。こまめな水分・塩分補給を。",
    tsuboName: "湧泉",
    tsuboId: "yuusen",
    tsuboTip: "足の裏の「湧泉」を揉みほぐし、上半身に昇った熱を足底へ引き下ろします。",
    themeTag: "大暑酷暑・生津止渇"
  },

  // --- 秋（金・肺・容平期） ---
  {
    id: "risshuu",
    name: "立秋",
    kana: "りっしゅう",
    month: 8,
    approxDay: 7,
    periodStr: "8月7日頃〜8月22日頃",
    fiveSeason: "秋（金）",
    organ: "肺・大腸",
    catchphrase: "今の季節は【秋・肺気収斂の兆し期】です。暦の上では秋の始まり。夏の疲労（秋バテ）を解消し乾燥に備えます。",
    classicQuote: "『素問・四気調神大論』「秋三月、此謂容平。天気以急、地気以明。早臥早起、與雞倶興」",
    dietAdvice: "梨、蜂蜜、白ごまなど「白い食材」で肺を潤し、夏の暑さで乾いた喉と皮膚をケアします。",
    lifestyleAdvice: "暑さは残るものの朝夕の風に秋の気配。早寝早起きに切り替え、精神をゆったりと安定させましょう。",
    tsuboName: "尺沢",
    tsuboId: "shakutaku",
    tsuboTip: "肘内側の「尺沢」を指圧し、肺に残った夏の余熱を冷まして咳や喉の痛みを防ぎます。",
    themeTag: "涼風至・秋気兆候"
  },
  {
    id: "shosho",
    name: "処暑",
    kana: "しょしょ",
    month: 8,
    approxDay: 23,
    periodStr: "8月23日頃〜9月6日頃",
    fiveSeason: "秋（金）",
    organ: "肺・脾",
    catchphrase: "今の季節は【秋・暑気退行期】です。厳しい暑さが和らぎ始めます。夏の消化器疲れを回復させましょう。",
    classicQuote: "『暦便覧』「陽気とどまりて、初めて退きやまむとすれば也」",
    dietAdvice: "かぼちゃ、山芋、れんこんなど、脾胃を補いながら呼吸器を潤す根菜類をスープで温かく摂ります。",
    lifestyleAdvice: "夏の疲れ（だるさ・食欲不振）が出やすい時期。睡眠時間を増やし、無理な夜更かしを避けます。",
    tsuboName: "中脘",
    tsuboId: "chuukan",
    tsuboTip: "みぞおちとおへその中間「中脘」を手で温め、夏の冷房と冷水で冷えた胃腸を蘇生。",
    themeTag: "暑気退行・秋バテ回復"
  },
  {
    id: "hakuro",
    name: "白露",
    kana: "はくろ",
    month: 9,
    approxDay: 7,
    periodStr: "9月7日頃〜9月22日頃",
    fiveSeason: "秋（金）",
    organ: "肺・大腸",
    catchphrase: "今の季節は【秋・朝露と燥邪（乾燥）期】です。朝晩の冷え込みが深まります。肺を潤し深呼吸で免疫維持を。",
    classicQuote: "『素問・四気調神大論』「使志安寧、以緩秋刑、收斂神気、使秋気平、無外其志、使肺気清」",
    dietAdvice: "白きくらげ、大根、豆腐、銀杏など、乾燥した気道と肌を潤す食材を積極的に選びましょう。",
    lifestyleAdvice: "朝夕の急な冷えで風邪を引きやすい時期。薄手の羽織ものを持ち歩き、背中や首元を冷やさないこと。",
    tsuboName: "列缺",
    tsuboId: "rekketu",
    tsuboTip: "手首の「列缺」を親指で優しく揉み、肺気を巡らせて咳や喉の乾燥を防ぎます。",
    themeTag: "白露降・滋陰潤肺"
  },
  {
    id: "shuubun",
    name: "秋分",
    kana: "しゅうぶん",
    month: 9,
    approxDay: 23,
    periodStr: "9月23日頃〜10月7日頃",
    fiveSeason: "秋（金）",
    organ: "肺・大腸",
    catchphrase: "今の季節は【秋・陰陽平分期】です。秋の夜長に向かい、心の平安と肺の潤いを深める季節。",
    classicQuote: "『春秋繁露』「秋分者、陰陽相半也、故昼夜均而寒暑平」",
    dietAdvice: "栗、きのこ類、さつまいもなど、秋の実りで気を補い、便秘や肌荒れを食物繊維で防ぎます。",
    lifestyleAdvice: "秋の深まりとともにセンチメンタルになりやすい時期（秋悲）。読書や瞑想で心を穏やかに。",
    tsuboName: "合谷",
    tsuboId: "gokoku",
    tsuboTip: "手の甲の「合谷」を痛気持ちいい強さで押し、肺と表裏関係にある大腸経を通じさせます。",
    themeTag: "秋分陰陽・心神安定"
  },
  {
    id: "kanro",
    name: "寒露",
    kana: "かんろ",
    month: 10,
    approxDay: 8,
    periodStr: "10月8日頃〜10月22日頃",
    fiveSeason: "秋（金）",
    organ: "肺・腎",
    catchphrase: "今の季節は【晩秋・冷気露結期】です。朝露が冷たくなり冬の足音。首・手首・足首の「三首」を保温。",
    classicQuote: "『月令七十二候集解』「九月節、露気寒冷、将凝結也」",
    dietAdvice: "ごぼう、人参、黒ごまなど、血行を促進し体を内側から温める根菜や種実類がおすすめ。",
    lifestyleAdvice: "素足で過ごすのをやめ、靴下やレッグウォーマーを着用。下半身からの冷え込みを遮断します。",
    tsuboName: "太谿",
    tsuboId: "taikei",
    tsuboTip: "内くるぶしの後ろ「太谿」を温め、冬に向けて腎水を蓄え下半身の冷えを予防。",
    themeTag: "寒露凝結・三首保温"
  },
  {
    id: "soukou",
    name: "霜降",
    kana: "そうこう",
    month: 10,
    approxDay: 23,
    periodStr: "10月23日頃〜11月6日頃",
    fiveSeason: "秋（金）",
    organ: "肺・腎",
    catchphrase: "今の季節は【晩秋・霜降る冬支度期】です。初霜が降りる頃。陽気を体内にしっかりと潜蔵させましょう。",
    classicQuote: "『素問』「秋傷於湿、冬生咳嗽。秋傷於燥、上逆而咳」",
    dietAdvice: "りんご、柿、温かい葛湯などで喉を保護し、冷たい外気にさらされた呼吸器粘膜を修復します。",
    lifestyleAdvice: "朝起きるのが辛くなり始める時期。無理に飛び起きず、布団の中で手足を動かしてから起床を。",
    tsuboName: "風池",
    tsuboId: "fuuchi",
    tsuboTip: "後頭部の「風池」に蒸しタオルを当てて温め、初冬の寒風による肩こり・首こりを解除。",
    themeTag: "初霜降・陽気潜蔵"
  },

  // --- 冬（水・腎・閉蔵期） ---
  {
    id: "rittou",
    name: "立冬",
    kana: "りっとう",
    month: 11,
    approxDay: 7,
    periodStr: "11月7日頃〜11月21日頃",
    fiveSeason: "冬（水）",
    organ: "腎・膀胱",
    catchphrase: "今の季節は【冬・腎気封蔵期】です。冬の訪れ。エネルギー（精）を漏らさず体内に蓄える養生を。",
    classicQuote: "『素問・四気調神大論』「冬三月、此謂閉蔵。水冰地坼、無擾乎陽。早臥晩起、必待日光」",
    dietAdvice: "黒豆、黒ごま、ひじき、キクラゲなど「黒い食材」と根菜鍋で、先天の気（腎精）を強力に補給。",
    lifestyleAdvice: "「早寝遅起き」を心がけ、太陽が昇ってから活動開始。過度の発汗や夜更かしは陽気を消耗します。",
    tsuboName: "腎兪",
    tsuboId: "jinyu",
    tsuboTip: "腰の「腎兪」にカイロやお灸を施し、生命エネルギーの根源である腎を温めます。",
    themeTag: "立冬閉蔵・補腎温陽"
  },
  {
    id: "shousetsu",
    name: "小雪",
    kana: "しょうせつ",
    month: 11,
    approxDay: 22,
    periodStr: "11月22日頃〜12月6日頃",
    fiveSeason: "冬（水）",
    organ: "腎・膀胱",
    catchphrase: "今の季節は【冬・寒気深まり期】です。雪がちらつき始める頃。気血を滞らせないよう体を温め巡らせます。",
    classicQuote: "『養生四要』「冬月天地気閉、血気亦凝滞、当温養以防涸疾」",
    dietAdvice: "羊肉、鶏肉、長ネギ、生姜など温熱性の食材でスープを作り、冷えた手足を芯から温めましょう。",
    lifestyleAdvice: "入浴は湯船にしっかり浸かり、芯まで温まること。足湯や湯たんぽの活用が効果的です。",
    tsuboName: "復溜",
    tsuboId: "fukuryuu",
    tsuboTip: "足首の「復溜」を指圧し、腎の水分代謝を高めて冬のむくみと冷えを解消。",
    themeTag: "小雪寒気・温陽通脈"
  },
  {
    id: "taisetsu",
    name: "大雪",
    kana: "たいせつ",
    month: 12,
    approxDay: 7,
    periodStr: "12月7日頃〜12月21日頃",
    fiveSeason: "冬（水）",
    organ: "腎・膀胱",
    catchphrase: "今の季節は【冬・真冬の寒冷期】です。本格的な降雪の季節。心身を静かに保ち「命門の火」を守りましょう。",
    classicQuote: "『素問』「去寒就温、無泄皮膚、使気亟奪、此冬気之応、養蔵之道也」",
    dietAdvice: "くるみ、栗、長芋、豚肉など、滋養強壮に優れた食材で冬の寒さに耐える基礎体力を養います。",
    lifestyleAdvice: "感情の起伏を抑え、穏やかな心（静謐）を維持。激しい筋トレより、静かなヨガや気功が適します。",
    tsuboName: "命門",
    tsuboId: "meimon",
    tsuboTip: "腰の背骨上「命門」を温め、全身の基礎体温と代謝の熱源を活性化させます。",
    themeTag: "大雪静謐・命門火養"
  },
  {
    id: "touji",
    name: "冬至",
    kana: "とうじ",
    month: 12,
    approxDay: 22,
    periodStr: "12月22日頃〜1月4日頃",
    fiveSeason: "冬（水）",
    organ: "腎・膀胱",
    catchphrase: "今の季節は【冬・一陽来復期】です。夜が最も長く陰が極まる日。柚子湯や温熱養生で新しい春の芽生えを育みます。",
    classicQuote: "『周易』「冬至子之半、天心無改移、一陽初動処、万物未生時」",
    dietAdvice: "かぼちゃ（冬至南京）、小豆粥、柚子など伝統の冬至食で、ビタミン補給と無病息災を祈ります。",
    lifestyleAdvice: "一年で最も無理をしてはいけない転換点。十分な睡眠をとり、過労や暴飲暴食を厳に慎みましょう。",
    tsuboName: "関元",
    tsuboId: "kangen",
    tsuboTip: "下腹部の「関元（丹田）」を温灸や手のひらで温め、原気（生命の根本）を蓄積します。",
    themeTag: "陰極一陽・一陽来復"
  },
  {
    id: "shoukan",
    name: "小寒",
    kana: "しょうかん",
    month: 1,
    approxDay: 5,
    periodStr: "1月5日頃〜1月19日頃",
    fiveSeason: "冬（水）",
    organ: "腎・脾",
    catchphrase: "今の季節は【厳冬・寒の入り期】です。寒さが本格化する極寒期。年末年始の暴飲暴食から胃腸をリセット。",
    classicQuote: "『暦便覧』「冬至より一陽起るが故に、陰気に逆らひて、故に益々寒し」",
    dietAdvice: "七草粥、大根おろし、温かい葛湯などで、荒れた胃腸粘膜をいたわり消化力を復活させます。",
    lifestyleAdvice: "朝の冷気による血圧急上昇に注意。起床時は布団の中で手足を動かし、室内を暖めてから行動を。",
    tsuboName: "足三里",
    tsuboId: "ashisanri",
    tsuboTip: "すねの「足三里」にお灸をすえ、お正月疲れの胃腸と免疫力を底上げします。",
    themeTag: "寒の入り・脾胃休養"
  },
  {
    id: "daikan",
    name: "大寒",
    kana: "だいかん",
    month: 1,
    approxDay: 20,
    periodStr: "1月20日頃〜2月3日頃",
    fiveSeason: "冬（水）",
    organ: "腎・肝",
    catchphrase: "今の季節は【厳冬・極寒の結び期】です。一年で最も寒い時期。春を迎えるためのエネルギーを蓄えましょう。",
    classicQuote: "『素問』「冬不蔵精、春必病温」",
    dietAdvice: "甘酒、粕汁、生姜湯など、発酵食品と温熱スパイスで血行不良やしもやけ・冷えを撃退します。",
    lifestyleAdvice: "寒さの底ですが、自然界では地下で春の準備が始まっています。春の計画を立てながら静かに養生。",
    tsuboName: "太谿",
    tsuboId: "taikei",
    tsuboTip: "足首の「太谿」を指圧し、春の芽吹きに備えて腎のエネルギーを極限まで充填します。",
    themeTag: "大寒極寒・春待養生"
  }
];

// 土用（年4回・各約18日間）の特別養生データ
export interface DoyoPeriodInfo {
  seasonName: "春土用" | "夏土用" | "秋土用" | "冬土用";
  monthRange: string;
  fiveSeason: "土用（土）";
  organ: "脾・胃";
  catchphrase: string;
  classicQuote: string;
  dietAdvice: string;
  lifestyleAdvice: string;
  tsuboName: string;
  tsuboId: string;
  tsuboTip: string;
}

export const DOYO_PERIODS: Record<string, DoyoPeriodInfo> = {
  spring: {
    seasonName: "春土用",
    monthRange: "4月17日頃〜5月4日頃（立夏前）",
    fiveSeason: "土用（土）",
    organ: "脾・胃",
    catchphrase: "今は【春土用・季節の変わり目】です。立夏前の脾胃休養期。春の湿気による胃もたれ・だるさをケア。",
    classicQuote: "『素問』「脾者土也、治中央、常以四時長四蔵、各十八日寄治」",
    dietAdvice: "キャベツ、山芋、大根、おかゆなど消化のよい甘味食材で、夏の暑さに耐える胃腸の基礎を作ります。",
    lifestyleAdvice: "土用期間中は無理な暴飲暴食や過密スケジュールを避け、生活リズムを一定に保ちましょう。",
    tsuboName: "中脘",
    tsuboId: "chuukan",
    tsuboTip: "みぞおちとおへその中間「中脘」を手で温め、胃腸の消化吸収力を助けます。"
  },
  summer: {
    seasonName: "夏土用",
    monthRange: "7月19日頃〜8月6日頃（立秋前）",
    fiveSeason: "土用（土）",
    organ: "脾・胃",
    catchphrase: "今は【夏土用・胃腸の保護期】です。冷たいものの摂りすぎで胃腸が弱りやすい時期。温熱と水分代謝を。",
    classicQuote: "『養生訓』「土用中は脾胃偏して病みやすし、冷物と飲食の過多を厳禁すべし」",
    dietAdvice: "うなぎ、しじみ、黒豆、梅干しなど滋養と解毒に富む食材。冷たいビールや氷水のがぶ飲みは自重を。",
    lifestyleAdvice: "エアコン冷えと内臓冷えに警戒。湯船に浸かってお腹を温め、就寝時の腹巻きが効果的です。",
    tsuboName: "足三里",
    tsuboId: "ashisanri",
    tsuboTip: "すねの「足三里」を刺激し、夏バテで低下した食欲と胃腸機能を賦活させます。"
  },
  autumn: {
    seasonName: "秋土用",
    monthRange: "10月20日頃〜11月6日頃（立冬前）",
    fiveSeason: "土用（土）",
    organ: "脾・胃",
    catchphrase: "今は【秋土用・冬支度の胃腸ケア期】です。立冬前の寒暖差に注意。冬に備えて栄養を蓄える消化力を整えます。",
    classicQuote: "『素問』「脾主運化、後天之本。四季之交、当調其脾胃」",
    dietAdvice: "さつまいも、かぼちゃ、きのこ、根菜の味噌汁など、温かい煮込み料理で内臓を芯から温めます。",
    lifestyleAdvice: "秋の食欲に任せて食べすぎないよう腹八分目を遵守。夜更かしを避け、胃腸を休める睡眠時間を確保。",
    tsuboName: "太白",
    tsuboId: "taihaku",
    tsuboTip: "足の親指付け根「太白」を指圧し、脾の運化（消化吸収と気血産生）を底上げします。"
  },
  winter: {
    seasonName: "冬土用",
    monthRange: "1月17日頃〜2月3日頃（立春前）",
    fiveSeason: "土用（土）",
    organ: "脾・胃",
    catchphrase: "今は【冬土用・春を迎える解毒準備期】です。年末年始の過労と寒さで疲弊した脾胃をじっくり休養。",
    classicQuote: "『千金要方』「冬日脾胃虚冷、宜食温熱、勿食生冷」",
    dietAdvice: "お粥、蒸し野菜、甘酒、生姜湯など、極力胃腸に負担をかけない温和な滋養食でリセット。",
    lifestyleAdvice: "春の芽吹きに向けて心身の大掃除。激しい活動は控え、ゆったりと温かい湯船に浸かりましょう。",
    tsuboName: "天枢",
    tsuboId: "tensu",
    tsuboTip: "おへその両脇「天枢」を手のひらで温めながら押し、腸内環境と排便リズムを正常化。"
  }
};

export interface SeasonalAdviceResult {
  currentDateFormatted: string;
  isDoyo: boolean;
  doyoInfo?: DoyoPeriodInfo;
  term: SolarTermInfo;
}

// 日付から二十四節気・土用養生を自動計算する関数
export function getSeasonalAdvice(dateInput?: Date): SeasonalAdviceResult {
  const date = dateInput || new Date();
  const m = date.getMonth() + 1; // 1〜12
  const d = date.getDate();      // 1〜31
  const md = m * 100 + d;        // 例: 9月10日 => 910

  // 1. 土用期間の判定（立春・立夏・立秋・立冬の直前約18日間）
  // 春土用: 4/17 〜 5/4
  // 夏土用: 7/19 〜 8/6
  // 秋土用: 10/20 〜 11/6
  // 冬土用: 1/17 〜 2/3
  let isDoyo = false;
  let doyoInfo: DoyoPeriodInfo | undefined;

  if (md >= 417 && md <= 504) {
    isDoyo = true;
    doyoInfo = DOYO_PERIODS.spring;
  } else if (md >= 719 && md <= 806) {
    isDoyo = true;
    doyoInfo = DOYO_PERIODS.summer;
  } else if (md >= 1020 && md <= 1106) {
    isDoyo = true;
    doyoInfo = DOYO_PERIODS.autumn;
  } else if ((md >= 117 && md <= 203)) {
    isDoyo = true;
    doyoInfo = DOYO_PERIODS.winter;
  }

  // 2. 二十四節気の判定（日付から直近過去の節気を選択）
  // ソート用配列（1/5小寒 〜 12/22冬至）
  const termsSorted = [
    { md: 105, id: "shoukan" },
    { md: 120, id: "daikan" },
    { md: 204, id: "risshun" },
    { md: 219, id: "usui" },
    { md: 306, id: "keichitsu" },
    { md: 321, id: "shunbun" },
    { md: 405, id: "seimei" },
    { md: 420, id: "kokuu" },
    { md: 505, id: "rikka" },
    { md: 521, id: "shouman" },
    { md: 606, id: "boushu" },
    { md: 621, id: "geshi" },
    { md: 707, id: "shousho" },
    { md: 723, id: "taisho" },
    { md: 807, id: "risshuu" },
    { md: 823, id: "shosho" },
    { md: 907, id: "hakuro" },
    { md: 923, id: "shuubun" },
    { md: 1008, id: "kanro" },
    { md: 1023, id: "soukou" },
    { md: 1107, id: "rittou" },
    { md: 1122, id: "shousetsu" },
    { md: 1207, id: "taisetsu" },
    { md: 1222, id: "touji" }
  ];

  let currentTermId = "touji"; // 1月1日〜1月4日は冬至の継続
  for (let i = termsSorted.length - 1; i >= 0; i--) {
    if (md >= termsSorted[i].md) {
      currentTermId = termsSorted[i].id;
      break;
    }
  }

  const term = SOLAR_TERMS.find(t => t.id === currentTermId) || SOLAR_TERMS[0];

  const year = date.getFullYear();
  const currentDateFormatted = `${year}年${m}月${d}日`;

  return {
    currentDateFormatted,
    isDoyo,
    doyoInfo,
    term
  };
}
