import { ClinicalCase } from "@/types/clinicalCase";

export const CLINICAL_CASES: ClinicalCase[] = [
  // ==========================================
  // 症例 1: 無料体験 1 (自律神経・頭痛)
  // ==========================================
  {
    id: "case-01-headache-liver-fire",
    caseNumber: 1,
    title: "30代女性：激しい側頭痛とイライラ・目の充血",
    subTitle: "デスクワークとストレス過多に伴う発作性拍動性頭痛の弁証と配穴",
    difficulty: "初級",
    category: "自律神経・メンタル",
    isFreeTrial: true,
    patient: {
      age: "34歳",
      gender: "女性",
      occupation: "IT企業企画職（長時間のPC作業）",
      chiefComplaint: "右側頭部がズキズキと激しく拍動し、目が充血してイライラが止まらない",
      historyOfPresentIllness: "半年前の昇進以来、業務負担が増大。1ヶ月前から側頭部に激しい頭痛が頻発するようになった。怒ったりストレスがかかると痛みが増悪し、耳鳴り（キーンという高音）と口の苦味を伴う。市販の鎮痛薬が効きにくくなってきた。",
      pastHistory: ["特記事項なし"],
      lifestyle: "就寝は連日25時過ぎ。夕食は夜遅くに脂っこいものや辛いものを好む。コーヒーを1日4杯摂取。",
    },
    examinations: {
      inspection: "顔面紅潮、結膜充血あり。動作がせわしなく、話し方に焦燥感が窺える。",
      tongueDiagnosis: {
        body: "紅（特に舌辺部が鮮紅）",
        coating: "黄燥苔（やや厚い）",
        shape: "点刺あり（舌尖および舌辺）",
        sublingualVeins: "軽度の怒張",
      },
      auscultationAndOlfaction: "声は大きく甲高い。ため息が多く、呼吸が浅く速い。",
      inquiry: [
        { question: "頭痛の痛む場所と性状は？", answer: "右の側頭部からこめかみ、目の奥にかけてズキズキ拍動します。温めると悪化し、冷やすと少し楽になります。" },
        { question: "睡眠や気分の状態は？", answer: "イライラして些細なことで怒りっぽくなっています。夜は頭が冴えて寝付けず、夢を多く見ます。" },
        { question: "口渇や便通はどうですか？", answer: "口の中が苦く、冷たい水をよく欲します。便は数日出ないことがあり、硬めです。" },
      ],
      palpation: {
        pulse: "弦数脈（げんさくみゃく）",
        pulseDetail: "硬く張った弦脈に速い数脈が重なり、肝経の過剰な熱と気の高ぶりを示す。",
        abdomen: "両側の胸脇苦満が顕著。季肋下に強い抵抗と圧痛がある。",
        acupointReaction: "太衝（LR3）、行間（LR2）、風池（GB20）に顕著な過敏圧痛。",
      },
    },
    reasoningSteps: [
      {
        stepNumber: 1,
        stepTitle: "八綱弁証（病位・病性・勢い）の特定",
        question: "四診情報（顔面紅潮、口苦、便秘、舌紅黄苔、弦数脈）から導かれる八綱弁証はどれか？",
        options: [
          { id: "opt-1", label: "裏・熱・実（り・ねつ・じつ）", isCorrect: true, feedback: "正解です。臓腑（裏）における過剰な火熱（熱・実）が頭面部に上衝しています。" },
          { id: "opt-2", label: "表・寒・虚（ひょう・かん・きょ）", isCorrect: false, feedback: "冷えや虚弱ではなく、明らかな実熱の上逆病態です。" },
          { id: "opt-3", label: "裏・寒・実（り・かん・じつ）", isCorrect: false, feedback: "舌紅黄苔や弦数脈、冷やすと楽になる点から熱証です。" },
        ],
      },
      {
        stepNumber: 2,
        stepTitle: "臓腑・気血水弁証の特定",
        question: "側頭部痛・胸脇苦満・イライラ・目の充血・口苦から導かれる代表的な病態候補（証）はどれか？",
        options: [
          { id: "opt-1", label: "脾虚湿痰証（ひきょしつたんしょう）", isCorrect: false, feedback: "湿痰による頭重感ではなく、拍動性の激しい熱性疼痛です。" },
          { id: "opt-2", label: "肝火上炎証（かんかじょうえんしょう）", isCorrect: true, feedback: "正解です。肝気鬱結が化火し、肝胆経の経脈を通じて頭部に火熱が燃え上がっている状態を示します。" },
          { id: "opt-3", label: "腎陰虚証（じんいんきょしょう）", isCorrect: false, feedback: "陰虚による虚火ではなく、精神刺激で激発する実火・実熱の病態です。" },
        ],
      },
      {
        stepNumber: 3,
        stepTitle: "治療方針（治法）の決定",
        question: "本症例の病態モデルに対する最も適切な治法（治療原則）はどれか？",
        options: [
          { id: "opt-1", label: "清肝瀉火・降逆熄風（肝の火熱を冷まし、上逆した気を引き下ろす）", isCorrect: true, feedback: "正解です。激しい実火を瀉法で冷まし、頭部の鬱血を下方へ導きます。" },
          { id: "opt-2", label: "健脾補気・温陽利水（胃腸を補い、体を温めて水分を巡らす）", isCorrect: false, feedback: "温補法を行うと火に油を注ぎ、頭痛や充血が悪化します。" },
          { id: "opt-3", label: "滋陰潜陽・補益肝腎（潤いを補って陽の高ぶりを沈める）", isCorrect: false, feedback: "慢性期の陰虚には適しますが、急性激発の実火には瀉火が最優先です。" },
        ],
      },
      {
        stepNumber: 4,
        stepTitle: "処方配穴の決定",
        question: "清肝瀉火・降逆を達成するための代表的な経穴の組み合わせはどれか？",
        options: [
          { id: "opt-1", label: "足三里 (ST36) ＋ 陰陵泉 (SP9)", isCorrect: false, feedback: "脾胃の湿痰に対する配穴であり、肝火の直撃には力不足です。" },
          { id: "opt-2", label: "関元 (CV4) ＋ 命門 (GV4)", isCorrect: false, feedback: "下焦の陽気を温補する穴であり、本病態には禁忌に近いです。" },
          { id: "opt-3", label: "行間 (LR2) ＋ 太衝 (LR3) ＋ 風池 (GB20)", isCorrect: true, feedback: "正解です。行間（肝経滎火穴）で火熱を清解し、太衝で降気、風池で頭頚部の熱を散らす代表的な組み合わせです。" },
        ],
      },
    ],
    correctDiagnosis: {
      hachiko: "裏・熱・実",
      pattern: "肝火上炎証（肝陽化火）",
      treatmentPrinciple: "清肝瀉火・降逆通絡",
      primaryPoints: ["行間 (LR2)", "太衝 (LR3)", "風池 (GB20)"],
      secondaryPoints: ["侠渓 (GB43)", "太陽 (奇穴)", "百会 (GV20)"],
      formulaEquivalent: "竜胆瀉肝湯、釣藤散",
    },
    clinicalExplanation: {
      pathomechanism: "長期間の精神的ストレスや過労により肝の疏泄機能が失調（気滞）。気鬱が長期化して化火し、肝胆経の経絡を通じて炎上した。肝胆経は頭部側面（側頭部・こめかみ）および眼球に連絡するため、側頭拍動痛・目の充血・耳鳴り・口苦として爆発する。",
      differentialDiagnosis: "「肝陽上亢証」との鑑別：肝陽上亢は基底に『肝腎陰虚（加齢や消耗による潤い不足）』が存在し、下虚上実を呈する。本例は便秘・黄燥苔・激しい実脈を呈し、純粋な実火である「肝火上炎」に該当する。",
      pointRationale: "行間（滎火穴）は「実すれば其の子を瀉す」の原則に従い、木（肝）の火熱を直接漏らし去る最強の瀉火穴。太衝（原穴）と併用することで気の上逆を足元へ引き下ろす。風池・太陽への刺鍼により頭頚部の交感神経性血管収縮を解放する。",
      clinicalPitfall: "強い拍動痛がある急性期に患部（側頭部）へ強刺激のマッサージや温熱刺激を加えると、血管拡張と充血を招き激痛を誘発する。必ず遠道刺法（足元の行間・太衝）を先に行い、気を下方へ誘導してから局所を微弱刺激すること。",
      classicCitation: "『素問・至真要大論』：「諸風掉眩、皆肝に属す。諸逆衝上、皆火に属す。」",
    },
  },

  // ==========================================
  // 症例 2: 無料体験 2 (消化器・胃腸虚弱)
  // ==========================================
  {
    id: "case-02-fatigue-spleen-deficiency",
    caseNumber: 2,
    title: "40代男性：食後の異常な眠気・慢性下痢・全身倦怠感",
    subTitle: "後天の気生成不全に伴う脾胃気虚・中気下陥の臨床推論",
    difficulty: "初級",
    category: "消化器・脾胃",
    isFreeTrial: true,
    patient: {
      age: "42歳",
      gender: "男性",
      occupation: "事務職",
      chiefComplaint: "昼食後に耐え難い眠気に襲われ、体が鉛のように重い。常に便が緩い。",
      historyOfPresentIllness: "半年前から食後に意識が朦朧とするほどの眠気と胃もたれを自覚。朝起きても疲労感が抜けず、少し動くだけで汗が出る。便は泥状で1日2〜3回。体重が直近3ヶ月で2kg減少した。",
      pastHistory: ["胃十二指腸潰瘍（10年前）"],
      lifestyle: "朝食を抜きがち。昼食は早食いで丼ものや麺類が多い。冷たい清涼飲料水を常用。",
    },
    examinations: {
      inspection: "顔色は萎黄（艶のない黄色）。筋肉が軟弱で姿勢が猫背がち。",
      tongueDiagnosis: {
        body: "淡白（全体に色が薄い）",
        coating: "白滑苔（水分過多で潤っている）",
        shape: "胖大舌・歯痕舌（舌の縁に歯型がくっきり付いている）",
        sublingualVeins: "淡薄（怒張なし）",
      },
      auscultationAndOlfaction: "声が小さく低音で、息切れしやすい。腹鳴（グルグル鳴る）あり。",
      inquiry: [
        { question: "食事の後のお腹の感覚は？", answer: "食べた直後からお腹が張って重苦しく、下腹部が垂れ下がるような不快感があります。" },
        { question: "手足や全身の温冷感は？", answer: "特に手足の末端がだるく冷えます。温かいスープを飲むとお腹が落ち着きます。" },
      ],
      palpation: {
        pulse: "緩弱脈（かんじゃくみゃく）または細弱脈",
        pulseDetail: "脈の力が弱く、特に右関位（脾胃の部）を押すと頼りなく沈み込む。",
        abdomen: "腹力軟弱。中脘・天枢周辺を押すと抵抗なく底まで沈む（腹証：心下振水音・小腹不仁）。",
        acupointReaction: "足三里 (ST36)、脾兪 (BL20)、中脘 (CV12) に虚の陥下反応。",
      },
    },
    reasoningSteps: [
      {
        stepNumber: 1,
        stepTitle: "八綱弁証の判断",
        question: "淡白歯痕舌・緩弱脈・食後倦怠・腹力軟弱から判定される八綱はどれか？",
        options: [
          { id: "opt-1", label: "裏・虚・寒（り・きょ・かん）", isCorrect: true, feedback: "正解です。体内臓腑（脾胃）の機能衰退（虚）と温煦不足（寒）を示します。" },
          { id: "opt-2", label: "表・実・熱（ひょう・じつ・ねつ）", isCorrect: false, feedback: "外邪侵入による急性熱証の所見は一切ありません。" },
          { id: "opt-3", label: "裏・実・熱（り・じつ・ねつ）", isCorrect: false, feedback: "食後の膨満でも、本例は押して気持ちが良い「虚満」であり実熱ではありません。" },
        ],
      },
      {
        stepNumber: 2,
        stepTitle: "確定証の特定",
        question: "脾の運化失調と気の昇挙不能が重なった本病態の確定証はどれか？",
        options: [
          { id: "opt-1", label: "脾胃気虚・中気下陥証（ひいききょ・ちゅうきげかんしょう）", isCorrect: true, feedback: "正解です。脾気虚により飲食物からエネルギーを作れず、内臓を持ち上げる気が落ち込んでいます。" },
          { id: "opt-2", label: "大腸湿熱証（だいちょうしつねつしょう）", isCorrect: false, feedback: "下痢でも悪臭や渋り腹（裏急後重）はなく、冷えと疲労を伴う虚寒下痢です。" },
          { id: "opt-3", label: "肝気犯胃証（かんきはんいしょう）", isCorrect: false, feedback: "ストレスによる攻撃ではなく、脾胃自身のエネルギー枯渇が主因です。" },
        ],
      },
      {
        stepNumber: 3,
        stepTitle: "処方配穴の決定",
        question: "中気を昇挙し、脾胃の運化機能を底上げする最適な黄金処方はどれか？",
        options: [
          { id: "opt-1", label: "足三里 (ST36) ＋ 中脘 (CV12) ＋ 百会 (GV20) ＋ 脾兪 (BL20)", isCorrect: true, feedback: "正解です。中脘・足三里で脾胃を補気運化し、百会で陥下した中気を引き上げ、脾兪で臓腑を賦活します。" },
          { id: "opt-2", label: "行間 (LR2) ＋ 侠渓 (GB43)", isCorrect: false, feedback: "肝胆の火を瀉す穴であり、虚弱な脾胃をさらに消耗させます。" },
          { id: "opt-3", label: "委中 (BL40) ＋ 委陽 (BL39)", isCorrect: false, feedback: "腰痛や膀胱疾患に用いる配穴です。" },
        ],
      },
    ],
    correctDiagnosis: {
      hachiko: "裏・虚・寒",
      pattern: "脾胃気虚証（中気下陥）",
      treatmentPrinciple: "健脾益気・昇陽挙陥（補法・温灸併用）",
      primaryPoints: ["足三里 (ST36)", "中脘 (CV12)", "百会 (GV20)"],
      secondaryPoints: ["脾兪 (BL20)", "胃兪 (BL21)", "気海 (CV6)"],
      formulaEquivalent: "補中益気湯、六君子湯",
    },
    clinicalExplanation: {
      pathomechanism: "不規則な食習慣や冷飲食の常用により『後天の本』である脾胃の陽気が減退。脾は運化（消化吸収と水液代謝）および昇清（清陽の気を頭部へ届ける）を司るが、これが破綻したため、食後脳に気血が回らず異常な眠気と重だるさが発生。内臓を支える気が失調し中気下陥（胃下垂傾向、下腹部膨満）に陥っている。",
      differentialDiagnosis: "「胃寒証」との鑑別：胃寒は急性の冷えによる胃痛が中心。本例は慢性的な全身倦怠・食後眠気・軟便・歯痕舌を伴っており、消化器全体の広範な気虚（脾気虚）である。",
      pointRationale: "足三里（胃合穴）とお灸の組み合わせは免疫・消化管運動を劇的に高める。中脘（胃募穴・腑会）で気機を調律。百会（督脈）への置鍼または施灸は「昇提の要穴」として陥下した陽気を脳頂部へ引き上げる特効作用を持つ。",
      clinicalPitfall: "本症例のような虚証患者に対し、強刺激の雀啄刺鍼や瀉法を行うと、いわゆる「ドーシャ（鍼あたり・脱力感）」を起こし寝込んでしまう。細い鍼（1番鍼程度）で無痛刺鍼し、温灸を併用して気熱を補うこと。",
      classicCitation: "『霊枢・口問』：「脾気虚せばすなわち四肢用いられず、五臓六腑安からず。」",
    },
  },

  // ==========================================
  // 症例 3: 無料体験 3 (婦人科・生理痛)
  // ==========================================
  {
    id: "case-03-dysmenorrhea-cold-stasis",
    caseNumber: 3,
    title: "20代女性：激しい月経痛・下腹部刺痛・手足の冷え",
    subTitle: "寒邪侵入による寒凝血瘀と衝任不調の配穴アプローチ",
    difficulty: "初級",
    category: "婦人科・女性医学",
    isFreeTrial: true,
    patient: {
      age: "26歳",
      gender: "女性",
      occupation: "アパレル販売（立ち仕事・冷房環境）",
      chiefComplaint: "月経初日〜2日目に起き上がれないほどの激しい下腹部痛。経血に大きなレバー状の塊が混じる。",
      historyOfPresentIllness: "高校時代から生理痛はあったが、社会人になり冷房の効いた職場で立ち仕事をするようになってから激化。下腹部がギューッと絞られるように痛み、温めると幾分和らぐ。経血の色が暗い紫色で粘度が高い。",
      pastHistory: ["子宮内膜症疑い（クリニック受診歴あり）"],
      lifestyle: "スカート着用が多く、足首が冷えている。冷え性で冬場は靴下を重ね履き。湯船に浸からずシャワーで済ませることが多い。",
    },
    examinations: {
      inspection: "口唇の色が暗紫色。目の下に青暗いクマがある。",
      tongueDiagnosis: {
        body: "暗紫（全体に紫色がかり、特に舌縁に瘀斑あり）",
        coating: "薄白苔",
        shape: "やや引き締まっている",
        sublingualVeins: "暗紫色に太く屈曲・怒張（顕著な瘀血所見）",
      },
      auscultationAndOlfaction: "特記所見なし。月経前になると気分がふさぎがちになる。",
      inquiry: [
        { question: "痛みの性質と和らぐ条件は？", answer: "刺すような鋭い痛み（刺痛）です。カイロでお腹や腰を温めたり手で押さえると少し楽になります。塊が出た後は痛みが一瞬軽くなります。" },
        { question: "月経周期や量は？", answer: "周期は35〜40日と遅れがち（月経後期）。前半に暗いレバー状塊が多く出ます。" },
      ],
      palpation: {
        pulse: "沈遅弦脈（ちんちげんみゃく）または細渋脈",
        pulseDetail: "沈んで遅い（冷え）脈に、ざらざらとした渋脈（血行不良）が混じる。",
        abdomen: "下腹部（特に左少腹部、天枢の下方）に索状の硬結と圧痛あり（腹証：小腹急結・瘀血腹証）。",
        acupointReaction: "三陰交 (SP6)、血海 (SP10)、地機 (SP8)、関元 (CV4) に硬結と強圧痛。",
      },
    },
    reasoningSteps: [
      {
        stepNumber: 1,
        stepTitle: "主訴・舌脈からの病因分析",
        question: "暗紫舌・舌下静脈怒張・経血のレバー状塊・刺痛から推測される根本病態はどれか？",
        options: [
          { id: "opt-1", label: "寒凝血瘀（かんぎょうけつお：冷えによる血の滞り）", isCorrect: true, feedback: "正解です。『血は温を得れば行り、寒を得れば凝る』の原則通り、寒邪が骨盤内に停滞して血瘀を形成しています。" },
          { id: "opt-2", label: "気血両虚（きけつりょうきょ：栄養と気力の不足）", isCorrect: false, feedback: "痛みが激しい刺痛で塊を伴う点は、虚痛ではなく実証の瘀血痛です。" },
          { id: "opt-3", label: "湿熱下注（しつねつかちゅう：下焦の炎症・熱）", isCorrect: false, feedback: "温めると緩和する点や遅脈・暗紫色から熱証ではありません。" },
        ],
      },
      {
        stepNumber: 2,
        stepTitle: "月経痛の即効鎮痛穴の選定",
        question: "月経時の激しい急痛（発作時）に対し、郄穴（げきけつ：急性の激痛を止めるツボ）として選ぶべき経穴はどれか？",
        options: [
          { id: "opt-1", label: "地機 (SP8：脾経の郄穴)", isCorrect: true, feedback: "正解です。脾経の郄穴である地機は、急性期の月経痙攣痛に対する特効穴です。" },
          { id: "opt-2", label: "陰陵泉 (SP9：脾経の合穴)", isCorrect: false, feedback: "陰陵泉は水滞の利水穴であり、急性痛への即効性は地機が勝ります。" },
          { id: "opt-3", label: "足三里 (ST36：胃経の合穴)", isCorrect: false, feedback: "胃腸症状の基本穴ですが、婦人科急痛の郄穴ではありません。" },
        ],
      },
      {
        stepNumber: 3,
        stepTitle: "根本治法と総合処方",
        question: "下焦を温補し、瘀血を排泄して衝任脈を整える最適な配穴トリオはどれか？",
        options: [
          { id: "opt-1", label: "三陰交 (SP6) ＋ 関元 (CV4) ＋ 血海 (SP10)", isCorrect: true, feedback: "正解です。関元（温補下焦・丹田）にお灸をし、三陰交（肝脾腎の三陰交会）と血海（活血化瘀）で血行を刷新します。" },
          { id: "opt-2", label: "合谷 (LI4) ＋ 曲池 (LI11)", isCorrect: false, feedback: "清熱・上肢疾患の配穴です。" },
          { id: "opt-3", label: "崑崙 (BL60) ＋ 後谿 (SI3)", isCorrect: false, feedback: "後頭部・項背部痛の配穴です。" },
        ],
      },
    ],
    correctDiagnosis: {
      hachiko: "裏・寒・実（本虚標実）",
      pattern: "寒凝血瘀証（衝任虚寒・瘀血阻絡）",
      treatmentPrinciple: "温経散寒・活血化瘀・調経止痛（温灸多用）",
      primaryPoints: ["三陰交 (SP6)", "地機 (SP8)", "関元 (CV4)"],
      secondaryPoints: ["血海 (SP10)", "帰来 (ST29)", "次髎 (BL32)"],
      formulaEquivalent: "温経湯、桂枝茯苓丸、当帰四逆加呉茱萸生姜湯",
    },
    clinicalExplanation: {
      pathomechanism: "長時間の冷房環境および露出による冷え（外寒）が下半身から侵入し、任脈・衝脈・足の三陰経を直撃。寒邪の収引・凝滞の性質により、骨盤内動脈の攣縮と微小循環障害（血瘀）が発生。子宮筋層の虚血とプロスタグランジン過剰産生が重なり激痛を誘発する。",
      differentialDiagnosis: "「気滞血瘀証」との鑑別：気滞血瘀は精神的ストレスにより胸脇部や乳房の張りを伴い、月経前に痛みがピークに達する。本例は下半身の冷えが主因で、温めると痛みが寛解することから寒邪優位の「寒凝血瘀」と判断する。",
      pointRationale: "地機（脾経郄穴）への深刺・雀啄手技は子宮動脈の攣縮を急速に解除する即効性を持つ。関元への多壮灸（箱灸・温灸）は下焦の陽気を直接補充し骨盤内血流を回復。三陰交は骨盤神経叢への求心性抑制を介して子宮収縮を鎮静化する。",
      clinicalPitfall: "月経直前の活血化瘀手技は過多月経を招く恐れがあるため刺激量に配慮する。また、妊娠の可能性がある患者には三陰交・合谷等の強刺激は禁忌であるため、最終月経日の確認が必須。",
      classicCitation: "『金匱要略・婦人雑病脈証并治』：「婦人宿りて病あり、経水断絶せず…瘀血便ち下りて相槌す。」",
    },
  },

  // ==========================================
  // 症例 4: プレミアム限定 1 (更年期・ホットフラッシュ)
  // ==========================================
  {
    id: "case-04-menopause-yin-deficiency",
    caseNumber: 4,
    title: "50代女性：更年期のホットフラッシュ・のぼせ・激しい寝汗",
    subTitle: "天癸枯渇に伴う肝腎陰虚と虚火上炎の統合制御アプローチ",
    difficulty: "中級",
    category: "婦人科・女性医学",
    isFreeTrial: false,
    patient: {
      age: "52歳",
      gender: "女性",
      occupation: "公務員",
      chiefComplaint: "急激な上半身ののぼせ・発汗（ホットフラッシュ）と、夜間の激しい寝汗・不眠。",
      historyOfPresentIllness: "閉経を迎えた1年前から、1日に十数回もの急なのぼせと顔面紅潮が発生。特に就寝中に首から上が滝のような汗で目覚め、着替えが必要なほど。手足のひらが火照り、めまいと腰のだるさを伴う。",
      pastHistory: ["軽度骨粗鬆症指摘"],
      lifestyle: "生真面目な性格で完璧主義。カフェインを好む。",
    },
    examinations: {
      inspection: "両頬部に赤み（潮紅）。皮膚や毛髪に乾燥感がある。",
      tongueDiagnosis: {
        body: "紅・痩薄（舌が赤く細い）",
        coating: "少苔〜無苔（鏡面舌傾向）",
        shape: "細かい裂紋あり",
      },
      auscultationAndOlfaction: "呼吸は静かだがため息が混じる。",
      inquiry: [
        { question: "発汗のタイミングは？", answer: "昼間も急にカッと熱くなりますが、特に夜寝ている間にぐっしょり寝汗（盗汗）をかきます。" },
        { question: "腰や足の感覚は？", answer: "腰や膝に力が入らず、だるくて重い鈍痛があります。" },
      ],
      palpation: {
        pulse: "細数脈（さいさくみゃく）",
        pulseDetail: "糸のように細く速い脈。腎陰不足による虚熱を示す。",
        abdomen: "腹力中等度以下。臍下不仁（臍の下が力なくへこむ）。",
        acupointReaction: "太谿 (KI3)、照海 (KI6)、復溜 (KI7)、神門 (HT7) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "病態の根本虚実の鑑別",
                question: "紅舌少苔・細数脈・手足心熱・寝汗から判断される病理の本質はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "陰虚火旺（いんきょかおう：体の潤い不足による虚熱）",
                            isCorrect: true,
                            feedback: "正解です。体液やホルモン（陰液）の枯渇により、陽気を制約できなくなって相対的な虚熱が暴走しています。"
                      },
                      {
                            id: "opt-2",
                            label: "外感風熱（がいかんふうねつ：風邪による熱）",
                            isCorrect: false,
                            feedback: "急性外邪侵入ではなく、内傷性の慢性消耗性病態です。"
                      },
                      {
                            id: "opt-3",
                            label: "気滞血瘀（きたいけつお：血行不良）",
                            isCorrect: false,
                            feedback: "局所の刺痛や紫舌・瘀斑などの瘀血所見は認められません。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "実火（肝火上炎）との鑑別診断",
                question: "本症例の上半身ののぼせを、実熱である「肝火上炎」ではなく「肝腎陰虚・陰虚火旺」と診断する最大の四診根拠はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "舌苔が薄く剥落した少苔〜無苔（鏡面舌傾向）であり、脈が細数脈である点",
                            isCorrect: true,
                            feedback: "正解です。実熱であれば厚い黄燥苔や洪大・弦数脈を呈しますが、本例は潤い不足を示す少苔・細数脈を呈しており虚熱と判断されます。"
                      },
                      {
                            id: "opt-2",
                            label: "激しい頭痛と目の充血が主訴である点",
                            isCorrect: false,
                            feedback: "これは肝火上炎の実熱所見であり、本例の主訴ではありません。"
                      },
                      {
                            id: "opt-3",
                            label: "冷たい水をがぶがぶ大量に飲みたがる点",
                            isCorrect: false,
                            feedback: "実熱による大渇の特徴です。本例は口を潤す程度しか欲しません。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "確定証と配穴処方・手技の選定",
                question: "腎水（潤い）を滋養し、心火（のぼせ）を鎮めて盗汗を止める最適な配穴と刺鍼手技はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "太谿 (KI3) ＋ 照海 (KI6) ＋ 神門 (HT7) ＋ 復溜 (KI7) への補法刺鍼",
                            isCorrect: true,
                            feedback: "正解です。太谿・照海で腎陰を補充し、復溜（経金穴・母穴補法）で生水・止汗を促し、神門で心神を鎮静させます。強刺激やお灸の多用は陰液を消耗するため禁忌です。"
                      },
                      {
                            id: "opt-2",
                            label: "大椎 (GV14) ＋ 曲池 (LI11) への強刺激瀉血",
                            isCorrect: false,
                            feedback: "実熱を瀉す手法であり、陰虚の患者に行うと津液がさらに損耗して脱水を招く危険があります。"
                      },
                      {
                            id: "opt-3",
                            label: "関元 (CV4) ＋ 命門 (GV4) への多壮灸",
                            isCorrect: false,
                            feedback: "下焦の陽気を温める手法であり、虚熱をさらに煽ってしまうため適しません。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・虚・熱",
      pattern: "肝腎陰虚証（陰虚火旺・心腎不交）",
      treatmentPrinciple: "滋補肝腎・養陰清熱・安神止汗",
      primaryPoints: ["太谿 (KI3)", "照海 (KI6)", "神門 (HT7)"],
      secondaryPoints: ["三陰交 (SP6)", "復溜 (KI7)", "百会 (GV20)"],
      formulaEquivalent: "知柏地黄丸、杞菊地黄丸、加味逍遙散",
    },
    clinicalExplanation: {
      pathomechanism: "更年期に伴い腎気・天癸が衰微。腎水が心火を制御できなくなる「水火不済（心腎不交）」に陥り、自律神経中枢（視床下部）の体温調節機能が破綻。虚火が夜間に上衝して盗汗（寝汗）・のぼせ・動悸を招く。",
      differentialDiagnosis: "「実熱による熱感」との鑑別：実熱は厚い黄苔や洪大脈を伴い、水をがぶ飲みする。本例は無苔に近い剥落苔、細数脈、口渇があっても口を湿らす程度（飲めない）という典型的な陰虚の所見を示す。",
      pointRationale: "太谿（腎原穴）は体液と腎精を滋養する根本穴。照海は八脈交会穴（陰蹻脈に通ず）であり、咽喉や頭部の虚熱を鎮め睡眠を回復する。復溜（腎経経金穴）は母子相生の原理で水を生み、盗汗を止める特効穴。",
      clinicalPitfall: "強い温熱刺激やお灸の多用は、貴重な陰液をさらに乾燥・蒸発させてしまう。低周波置鍼や微弱な接触鍼、刺鍼後の軽い雀啄など、補法を中心とした手技を選択すること。",
      classicCitation: "『景岳全書』：「盗汗者、寝即汗出、覚即収、陰虚也。」",
    },
  },

  // ==========================================
  // 症例 5: プレミアム限定 2 (不眠・パニック不安)
  // ==========================================
  {
    id: "case-05-insomnia-heart-kidney",
    caseNumber: 5,
    title: "40代女性：中途覚醒・不安感・焦燥感・動悸（不眠症）",
    subTitle: "水火既済の破綻による心腎不交証と安神配穴の設計",
    difficulty: "中級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "47歳",
      gender: "女性",
      occupation: "看護師（夜勤あり）",
      chiefComplaint: "夜中に何度も目が覚め（中途覚醒）、胸がザワザワして激しい不安に襲われる。",
      historyOfPresentIllness: "夜勤シフトが不規則で、2年前から熟睡感が喪失。最近は午前2時〜3時に突然動悸とともに目覚め、二度と眠れなくなる。健忘（物忘れ）、耳鳴り、手足のほてりを伴う。",
      pastHistory: ["特記事項なし"],
      lifestyle: "夜勤明けに寝られず、アルコールを飲んで無理に就寝する習慣がある。",
    },
    examinations: {
      inspection: "表情に疲労感と強い緊張感。目の周囲が乾燥。",
      tongueDiagnosis: {
        body: "紅（特に舌尖部が鮮紅）",
        coating: "少苔・微黄",
        shape: "舌尖に点刺（赤いつぶつぶ）が密生",
      },
      auscultationAndOlfaction: "早口で不安を訴える。ため息が多い。",
      inquiry: [
        { question: "夢の内容や眠りの質は？", answer: "怖い夢や追われる夢ばかり見て、朝起きた時に首や肩がガチガチにこわばっています。" },
        { question: "動悸の起きる時間帯は？", answer: "夕方から夜、ベッドに入った瞬間に心臓の音が耳元で聞こえるように激しくなります。" },
      ],
      palpation: {
        pulse: "細数脈（細く速い）",
        pulseDetail: "寸位（心）が浮いて数、尺位（腎）が沈んで無力。",
        abdomen: "心下痞および臍上動悸（腹部大動脈の拍動が強く触れる）。",
        acupointReaction: "神門 (HT7)、内関 (PC6)、太谿 (KI3)、心兪 (BL15) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "舌診・脈診と気血病態の分析",
                question: "舌尖部（心の部）の鮮紅点刺、寸浮尺沈の細数脈、動悸・中途覚醒から導かれる病態はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "心火偏亢（しんかへんこう：精神的ストレスと陰液不足による心神の過熱）",
                            isCorrect: true,
                            feedback: "正解です。舌尖は心に対応し、鮮紅点刺は心神（大脳中枢）の過熱・興奮を明瞭に示しています。"
                      },
                      {
                            id: "opt-2",
                            label: "脾胃湿熱（ひいしつねつ：中焦の湿熱停滞）",
                            isCorrect: false,
                            feedback: "黄色い厚い苔や口臭、心下痞痛などが主体となる病態であり、本例とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "痰迷心竅（たんめいしんきょう：痰濁が心を覆う）",
                            isCorrect: false,
                            feedback: "意識混濁や錯乱などが現れる病態であり、自律神経過熱・不眠の本例とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "鑑別診断と確定証の特定",
                question: "「心脾両虚による不眠」と本症例の「心腎不交による不眠」を鑑別する決定的な所見はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "心脾両虚は入眠困難と倦怠感・淡白舌が主であり、本症例は「中途覚醒・五心煩熱・舌尖紅・細数脈」が顕著である点",
                            isCorrect: true,
                            feedback: "正解です。心脾両虚は血虚による入眠障害が主ですが、本症例は腎水枯渇による虚火が上衝し、夜間に覚醒・動悸をきたす心腎不交証です。"
                      },
                      {
                            id: "opt-2",
                            label: "本症例は日中に食欲不振と泥状下痢を頻発している点",
                            isCorrect: false,
                            feedback: "これは心脾両虚・脾気虚の所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "本症例は起床時に頭重感と悪心を強く訴えている点",
                            isCorrect: false,
                            feedback: "これは痰濁阻滞による症状です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "交通心腎のための配穴設計",
                question: "上で過熱した心火を鎮め、下で枯渇した腎水を汲み上げて「水火既済」を取り戻す最適な配穴はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "神門 (HT7) ＋ 太谿 (KI3) ＋ 内関 (PC6) ＋ 三陰交 (SP6)",
                            isCorrect: true,
                            feedback: "正解です。神門で心火を降下させ、太谿で腎水を補い、内関で胸部気機と心包を整え、三陰交で三陰の潤いを調律する黄金配穴です。"
                      },
                      {
                            id: "opt-2",
                            label: "合谷 (LI4) ＋ 太衝 (LR3) ＋ 豊隆 (ST40)",
                            isCorrect: false,
                            feedback: "四関穴と化痰穴の配合で、気滞や痰熱の開通に適しますが、陰虚の心腎不交には滋陰作用が不足します。"
                      },
                      {
                            id: "opt-3",
                            label: "足三里 (ST36) ＋ 脾兪 (BL20) ＋ 中脘 (CV12)",
                            isCorrect: false,
                            feedback: "脾胃の気を温補する配穴であり、心火亢進・陰虚の病態を直接鎮めるには至りません。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・虚熱（上熱下虚）",
      pattern: "心腎不交証（陰虚火旺）",
      treatmentPrinciple: "滋陰降火・交通心腎・寧心安神",
      primaryPoints: ["神門 (HT7)", "太谿 (KI3)", "内関 (PC6)"],
      secondaryPoints: ["三陰交 (SP6)", "心兪 (BL15)", "腎兪 (BL23)", "百会 (GV20)"],
      formulaEquivalent: "天王補心丹、酸棗仁湯、黄連阿膠湯",
    },
    clinicalExplanation: {
      pathomechanism: "不規則な生活や加齢により腎水（生体の冷却水）が損耗。腎水が上騰して心を潤せなくなり、心火（精神活動）が単独で暴走。大脳皮質が持続的な興奮状態に置かれ、覚醒系神経（オレキシン等）が沈静化できず激しい中途覚醒とパニック不安を生じる。",
      differentialDiagnosis: "「心脾両虚による不眠」との鑑別：心脾両虚は『入眠困難』と日中の倦怠感・食欲不振が前面に出る（舌淡白）。本例は『中途覚醒・夢多・舌尖紅・五心煩熱』であり、陰虚火旺型の心腎不交である。",
      pointRationale: "神門（心原穴）への静かな置鍼は迷走神経反射を優位にし副交感神経を賦活。太谿（腎原穴）は水液代謝を活性化し火熱を降下させる。内関（心包絡経絡穴・八脈交会穴）は胸腔の絞扼感と自律神経発作を遮断する。",
      clinicalPitfall: "睡眠薬を服用している患者に対し急激な断薬を指示しないこと。鍼灸治療によって中途覚醒回数が減少するのを確認しながら、主治医と連携して減薬プロセスを進める。",
      classicCitation: "『慎斎遺書』：「心腎不交の証、夜臥すれば則ち魂散りて夢多く、神不安なり。」",
    },
  },

  // ==========================================
  // 症例 6: プレミアム限定 3 (消化器・逆流性食道炎)
  // ==========================================
  {
    id: "case-06-gerd-liver-stomach",
    caseNumber: 6,
    title: "30代男性：逆流性食道炎・胸焼け・呑酸（酸っぱいゲップ）",
    subTitle: "木乗土（肝気犯胃）による胃気上逆と降濁配穴の臨床",
    difficulty: "中級",
    category: "消化器・脾胃",
    isFreeTrial: false,
    patient: {
      age: "38歳",
      gender: "男性",
      occupation: "営業職マネージャー",
      chiefComplaint: "食後や就寝時に胸の奥が焼けつくように痛み、酸っぱい液体が口まで上がってくる。",
      historyOfPresentIllness: "ノルマのプレッシャーが強く、毎晩帰宅後にドカ食いと飲酒。3ヶ月前から胸骨後部の灼熱感とゲップが止まらない。胃カメラで逆流性食道炎（ロサンゼルス分類Grade B）と診断。",
      pastHistory: ["特記事項なし"],
      lifestyle: "就寝直前の飲食習慣。喫煙1日15本。",
    },
    examinations: {
      inspection: "体格は肥満傾向。首回りの緊張が強い。",
      tongueDiagnosis: {
        body: "紅（特に舌中〜舌辺）",
        coating: "黄膩苔（黄色くねっとりとした苔）",
        shape: "歯痕あり",
      },
      auscultationAndOlfaction: "頻回に乾いたゲップ（噦）をする。口臭（酸っぱい臭気）あり。",
      inquiry: [
        { question: "症状が悪化するタイミングは？", answer: "仕事で強いストレスを感じた時や、食後横になった時です。胸が締め付けられます。" },
        { question: "便通やお腹の張りは？", answer: "お腹が張って苦しく、便は粘り気があってすっきり出ません（裏急後重傾向）。" },
      ],
      palpation: {
        pulse: "弦滑脈（げんかつみゃく）",
        pulseDetail: "硬く張った弦脈に、コロコロと玉が転がるような滑脈（湿熱・痰飲）が加わる。",
        abdomen: "心下痞鞭（みぞおちの硬結）と両側季肋部の胸脇苦満が顕著。",
        acupointReaction: "中脘 (CV12)、期門 (LR14)、内関 (PC6)、足三里 (ST36) に硬結。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "五行生剋・相乗病態の分析",
                question: "ストレス（肝）が消化管（胃）を攻撃し、本来下るべき胃気を逆上させている五行病態はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "木乗土（もくじょうど：肝気犯胃・肝胃不和）",
                            isCorrect: true,
                            feedback: "正解です。情志の抑圧により肝気が鬱結して横逆し、脾胃の正常な受納・降濁機能を攻撃しています。"
                      },
                      {
                            id: "opt-2",
                            label: "土剋水（どこくすい：脾が腎を剋する）",
                            isCorrect: false,
                            feedback: "消化器から水分代謝を害する病理ではありません。"
                      },
                      {
                            id: "opt-3",
                            label: "金克木（きんこくもく：肺が肝を抑制する）",
                            isCorrect: false,
                            feedback: "正常な五行相剋関係であり、逆流性食道炎の病態とは一致しません。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "寒熱錯雑病態の四診鑑別",
                question: "本症例の胃気上逆を「脾胃虚寒による嘔吐・逆流」と明確に鑑別できる四診所見はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "胸焼け（灼熱痛）・酸っぱいゲップ（呑酸）・黄膩苔・弦滑脈",
                            isCorrect: true,
                            feedback: "正解です。虚寒であれば冷たい水様液の嘔吐、白滑苔、遅脈、温めると軽減する喜温喜按を呈します。灼熱痛や呑酸、黄膩苔は明らかな実熱・痰熱の徴候です。"
                      },
                      {
                            id: "opt-2",
                            label: "手足の冷えと泥状便・腹力軟弱",
                            isCorrect: false,
                            feedback: "これは脾胃虚寒・中気下陥の特徴です。"
                      },
                      {
                            id: "opt-3",
                            label: "口渇がなく温かい白湯を好んで飲む",
                            isCorrect: false,
                            feedback: "寒証の特徴です。本例は口苦があり冷飲食を好みます。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "胃気降逆のための特効処方と体位管理",
                question: "上逆する胃気と食道の灼熱感を速やかに引き下ろす八脈交会配穴と、施術時の臨床安全管理の組み合わせはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "内関 (PC6) ＋ 公孫 (SP4) ＋ 中脘 (CV12) を用い、上半身を少し起こした体位で施術する",
                            isCorrect: true,
                            feedback: "正解です。陰維脈（内関）と衝脈（公孫）のペアは心・胸・胃の気逆を治す第一選択です。食後直後の完全腹臥位は腹圧を上げて逆流を悪化させるため、座位やセミファーラー位が推奨されます。"
                      },
                      {
                            id: "opt-2",
                            label: "列缺 (LU7) ＋ 照海 (KI6) を用い、食後すぐに腹臥位で強圧する",
                            isCorrect: false,
                            feedback: "列缺・照海は咽喉・肺の配穴であり、胃気降逆の主配穴ではありません。また食後腹臥位強圧は逆流を誘発します。"
                      },
                      {
                            id: "opt-3",
                            label: "大敦 (LR1) ＋ 隠白 (SP1) への強刺激お灸",
                            isCorrect: false,
                            feedback: "出血や失神等の救急穴であり、逆流性食道炎の実熱降逆には適しません。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・実・熱（痰熱互結）",
      pattern: "肝気犯胃証（胃気上逆・痰熱内阻）",
      treatmentPrinciple: "疏肝理気・和胃降逆・清熱化痰",
      primaryPoints: ["内関 (PC6)", "公孫 (SP4)", "中脘 (CV12)"],
      secondaryPoints: ["太衝 (LR3)", "足三里 (ST36)", "豊隆 (ST40)", "期門 (LR14)"],
      formulaEquivalent: "半夏瀉心湯、柴胡疏肝湯、左金丸",
    },
    clinicalExplanation: {
      pathomechanism: "ストレスによる肝気鬱結が横逆して胃を犯す（木乗土）。胃は『降を以て順と為す』腑であるが、肝気に突き上げられて降濁機能を失い、胃酸と食塊が食道へ逆流（胃気上逆）。さらに脂っこい飲食により湿熱・痰飲が生じ、食道粘膜の炎症（胸焼け）を助長している。",
      differentialDiagnosis: "「脾胃虚寒による嘔吐」との鑑別：虚寒は透明な水様液を吐き、温めると楽になる。本例は酸味・苦味のある焼けるような胃液逆流、黄膩苔、弦滑脈を伴う明らかな「実熱・痰熱」である。",
      pointRationale: "内関（心包経絡穴）と公孫（脾経絡穴）の配合は迷走神経の異常興奮を抑え下部食道括約筋（LES）のトーヌスを正常化する。中脘（胃募穴）で胃の昇降を是正し、豊隆（胃経絡穴）で痰熱を除去する。",
      clinicalPitfall: "食後すぐにうつ伏せで施術を行うと腹圧が上昇して逆流を悪化させる。必ず上半身を30度ほど起こしたセミファーラー位で施術するか、側臥位・仰臥位で行うこと。",
      classicCitation: "『血証論』：「木条達せざれば、土因りて病む。故に肝の気を調うるは、即ち胃の土を調うる所以なり。」",
    },
  },

  // ==========================================
  // 症例 7: プレミアム限定 4 (IBS・過敏性腸症候群)
  // ==========================================
  {
    id: "case-07-ibs-liver-spleen",
    caseNumber: 7,
    title: "20代男性：過敏性腸症候群（試験や外出前の腹痛・下痢）",
    subTitle: "情志失調に伴う肝脾不和・痛瀉（つうしゃ）の臨床アプローチ",
    difficulty: "中級",
    category: "消化器・脾胃",
    isFreeTrial: false,
    patient: {
      age: "24歳",
      gender: "男性",
      occupation: "大学院生（就職活動中）",
      chiefComplaint: "面接や試験、電車に乗る前など緊張が高まると、へその周りが激しく差し込み、トイレに駆け込む。",
      historyOfPresentIllness: "就活開始後から症状が悪化。痛みの後に軟便・水様便が出ると腹痛は一時的に楽になる。各駅停車の電車しか乗れず日常生活に支障をきたしている。大腸内視鏡検査では器質的異常なし。",
      pastHistory: ["特記事項なし"],
      lifestyle: "緊張すると食欲が低下。冷たいものを避けているが改善しない。",
    },
    examinations: {
      inspection: "やや痩せ型、神経質そうな面持ち。手掌に冷や汗をかいている。",
      tongueDiagnosis: {
        body: "淡紅〜辺紅",
        coating: "薄白苔",
        shape: "歯痕あり",
      },
      auscultationAndOlfaction: "お腹からグルグル・キュルキュルと大きな腸鳴音が聞こえる。",
      inquiry: [
        { question: "腹痛と排便の関係は？", answer: "お腹が痛くなって下痢が出ると、痛みがすーっと引きます（痛んで下痢し、下痢して痛む）。" },
        { question: "平日の休日での症状の違いは？", answer: "自宅でリラックスしている休日は全く症状が出ません。" },
      ],
      palpation: {
        pulse: "弦細脈（げんさいみゃく）",
        pulseDetail: "肝の緊張を示す弦脈と、脾の虚弱を示す細脈が同居。",
        abdomen: "腹皮拘急。臍の周囲（特に左側）に索状硬結と圧痛。",
        acupointReaction: "太衝 (LR3)、天枢 (ST25)、足三里 (ST36)、肝兪 (BL18) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "特徴的症状「痛瀉」の病理判断",
                question: "「緊張や外出前に激しい腹痛が起き、排便（軟便・下痢）すると痛みが一時的に和らぐ」病態の東洋医学的機序はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "肝旺脾虚・肝脾不和証（痛瀉）",
                            isCorrect: true,
                            feedback: "正解です。精神緊張により肝木が昂ぶり、脾土を克圧（木乗土）することで大腸の蠕動が急激に失調・痙攣しています。"
                      },
                      {
                            id: "opt-2",
                            label: "腸胃湿熱証（ちょういしつねつしょう）",
                            isCorrect: false,
                            feedback: "悪臭を放つ灼熱便や裏急後重が持続する急性腸炎病態であり、休日に完全に寛解する本例とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "脾腎陽虚証（ひじんようきょしょう）",
                            isCorrect: false,
                            feedback: "明け方の冷え込みで起きる五更瀉であり、精神緊張とは無関係です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "類似下痢疾患との鑑別理由",
                question: "本症例を「脾虚湿盛（単純な胃腸虚弱による下痢）」ではなく「肝脾不和（過敏性腸症候群型）」と確定診断できる最大の理由はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "自宅でリラックスしている休日は全く下痢をせず、情志（試験や電車）のストレスに直結して発作が起き、脈に弦脈が混じる点",
                            isCorrect: true,
                            feedback: "正解です。純粋な脾虚であれば休日でも常時軟便・消化不良が続きますが、本例は肝気鬱結が引き金となる機能性病態です。"
                      },
                      {
                            id: "opt-2",
                            label: "常に未消化便が出て、食後すぐに腹が冷える点",
                            isCorrect: false,
                            feedback: "脾虚の特徴です。"
                      },
                      {
                            id: "opt-3",
                            label: "肛門部に灼熱感があり、膿血便が出る点",
                            isCorrect: false,
                            feedback: "湿熱痢や潰瘍性大腸炎の特徴です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "治療原則と配穴選定",
                question: "肝を抑え（抑肝）、脾を助けて（扶脾）腸管の異常痙攣を鎮静化させる最適な経穴処方はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "太衝 (LR3) ＋ 足三里 (ST36) ＋ 天枢 (ST25) ＋ 三陰交 (SP6)",
                            isCorrect: true,
                            feedback: "正解です。肝経原穴の太衝で肝気の昂ぶりを緩め、足三里・大腸募穴の天枢で腸管運動を正常化し、三陰交で気血を調律する「痛瀉要方」に匹敵する名配穴です。"
                      },
                      {
                            id: "opt-2",
                            label: "関元 (CV4) ＋ 命門 (GV4) ＋ 神闕 (CV8：生姜灸)",
                            isCorrect: false,
                            feedback: "陽虚寒証の下痢を温める配穴であり、情志緊張による痛瀉の第一選択ではありません。"
                      },
                      {
                            id: "opt-3",
                            label: "大椎 (GV14) ＋ 曲池 (LI11) ＋ 合谷 (LI4)",
                            isCorrect: false,
                            feedback: "外感風熱や表熱実証の解熱穴であり、肝脾不和の腸痙攣には適しません。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "半表半裏・虚実挟雑",
      pattern: "肝脾不和証（肝旺脾虚・痛瀉）",
      treatmentPrinciple: "抑肝扶脾・調気止瀉・緩急止痛",
      primaryPoints: ["太衝 (LR3)", "足三里 (ST36)", "天枢 (ST25)"],
      secondaryPoints: ["三陰交 (SP6)", "肝兪 (BL18)", "脾兪 (BL20)", "中脘 (CV12)"],
      formulaEquivalent: "痛瀉要方（とうしゃようほう）、四逆散、半夏厚朴湯",
    },
    clinicalExplanation: {
      pathomechanism: "自律神経（脳・肝）と腸管神経叢（脾胃）の相関破綻（脳腸相関）。精神的緊張により肝気が鬱結して過剰に昂ぶり、脾土を攻撃。脾の運化が瞬時に破綻して大腸の蠕動運動が暴走し、激しい痙攣痛とともに水分を吸収できないまま泥状便として排出される。",
      differentialDiagnosis: "「脾腎陽虚による五更瀉（早朝下痢）」との鑑別：五更瀉は明け方の冷え込みで下痢し、高齢者に多い。本例は情志（ストレス・緊張）に連動して日中に発生するため肝脾不和である。",
      pointRationale: "太衝への刺鍼は脳内の扁桃体・交感神経過活動を抑制。天枢（大腸募穴）は腸管の過敏運動を双向性に正常化する。足三里は迷走神経を介して腸粘膜バリアとセロトニン代謝を改善する。",
      clinicalPitfall: "腹部の触診時に冷たい手で触れたり強圧すると、それ自体がトリガーとなって腸痙攣を起こす。手を十分に温め、呼吸に合わせて優しく撫でるように接触すること。",
      classicCitation: "『丹渓心法』：「痛瀉あり、此れ肝木が脾土を侮るなり。」",
    },
  },

  // ==========================================
  // 症例 8: プレミアム限定 5 (運動器・坐骨神経痛・腰痛)
  // ==========================================
  {
    id: "case-08-sciatica-cold-dampness",
    caseNumber: 8,
    title: "60代男性：頑固な坐骨神経痛・下肢冷感・雨の日の増悪",
    subTitle: "腎陽虚を基底とする寒湿痺証（腰痛下肢痛）の温通配穴",
    difficulty: "中級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "65歳",
      gender: "男性",
      occupation: "農業・定年退職後",
      chiefComplaint: "右腰から臀部、大腿後面、ふくらはぎにかけて引きつるような激痛としびれ。",
      historyOfPresentIllness: "冬場の寒い時期や雨の降る前日に痛みが激化。歩行すると痛みが強くなり、少し休むと歩ける（間歇性跛行傾向）。腰やお尻に触れると氷のように冷えている。",
      pastHistory: ["腰椎椎間板ヘルニア"],
      lifestyle: "早朝の農作業。入浴は短め。",
    },
    examinations: {
      inspection: "歩行時に右下肢をかばう跛行。腰椎前弯の消失。",
      tongueDiagnosis: {
        body: "淡白・胖大",
        coating: "白滑苔（水っぽく白い苔）",
        shape: "辺縁に歯痕",
      },
      auscultationAndOlfaction: "特記所見なし。",
      inquiry: [
        { question: "温めると痛みはどう変化しますか？", answer: "お風呂に浸かって芯まで温まると痛みが嘘のように軽くなります。冷えると激痛になります。" },
        { question: "夜間のおしっこは？", answer: "夜中に2〜3回起きてトイレに行きます。尿の勢いが弱いです。" },
      ],
      palpation: {
        pulse: "沈遅弦脈（ちんちげんみゃく）",
        pulseDetail: "沈んで遅い陽虚・寒湿脈。",
        abdomen: "小腹不仁（下腹部が綿のように柔らかく力がない）。",
        acupointReaction: "環跳 (GB30)、委中 (BL40)、腎兪 (BL23)、大腸兪 (BL25) に強圧痛。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "痺証（ひしょう）の臨床分類",
                question: "「冷えと雨の日の湿気で激痛・重だるさが増悪し、入浴や温熱で軽減する」坐骨神経痛から判定される痺証の分類はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "寒湿痺（かんしつひ：痛痺・着痺の混合）",
                            isCorrect: true,
                            feedback: "正解です。寒邪の凝滞（強い痛み・冷感）と湿邪の重着（重だるさ・雨天増悪）が下焦の膀胱経・胆経を閉塞しています。"
                      },
                      {
                            id: "opt-2",
                            label: "熱痺（ねつひ：局所の発赤・灼熱腫脹）",
                            isCorrect: false,
                            feedback: "温めると悪化し冷やすと楽になる病態であり、本例とは逆です。"
                      },
                      {
                            id: "opt-3",
                            label: "行痺（こうひ：遊走性の関節痛）",
                            isCorrect: false,
                            feedback: "風邪が優位で痛む場所が定まらない病態であり、坐骨神経ラインに固定した激痛の本例とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "標本・本虚標実の病態分析",
                question: "本症例における「本（根本の原因）」と「標（現れている症状）」の東洋医学的関係はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "加齢による「腎陽虚衰・気血不足」（本）に乗じて、外邪である「風寒湿の邪」（標）が経絡に侵入・停滞している",
                            isCorrect: true,
                            feedback: "正解です。「腰は腎の府」であり、腎陽の衰微による下焦の陽気不足が基底にあるため、外来の寒湿邪が滞留して頑固な坐骨神経痛を形成しています。"
                      },
                      {
                            id: "opt-2",
                            label: "胃熱と湿痰（本）が頭部に上衝（標）している",
                            isCorrect: false,
                            feedback: "消化器の熱性病態であり、腰下肢の寒湿痺とは無関係です。"
                      },
                      {
                            id: "opt-3",
                            label: "肝火上炎（本）により下肢が虚脱（標）している",
                            isCorrect: false,
                            feedback: "上熱下虚の病態であり、寒湿による激痛とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "配穴と刺鍼手技・安全管理",
                question: "坐骨神経ラインを解剖学的に開通させ、腎陽を温める配穴と、神経損傷を防ぐ手技の組み合わせはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "環跳 (GB30) ＋ 委中 (BL40) ＋ 腎兪 (BL23・灸頭鍼) を用い、環跳で得気（響き）を得たら深追いの煽動手技を避ける",
                            isCorrect: true,
                            feedback: "正解です。環跳は坐骨神経近傍に刺入し得気を得たら静置します。故意に強い電撃痛を何度も誘発すると神経線維を痛める危険があります。委中で膀胱経を通じ、腎兪温灸で深部を温めます。"
                      },
                      {
                            id: "opt-2",
                            label: "風池 (GB20) ＋ 天柱 (BL10) ＋ 曲池 (LI11) への深刺パルス通電",
                            isCorrect: false,
                            feedback: "上肢・頚部の配穴であり、坐骨神経領域に直接アプローチできません。"
                      },
                      {
                            id: "opt-3",
                            label: "環跳 (GB30) への3寸鍼による激しい雀啄手技と高頻度強通電",
                            isCorrect: false,
                            feedback: "坐骨神経幹に機械的微小外傷を与え、神経炎を悪化させるリスクが高いため禁忌です。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・寒・虚実挟雑",
      pattern: "寒湿痺証（腎陽不足・経絡阻痺）",
      treatmentPrinciple: "温経散寒・祛湿通絡・温補腎陽（深刺鍼・灸頭鍼推奨）",
      primaryPoints: ["環跳 (GB30)", "委中 (BL40)", "腎兪 (BL23)"],
      secondaryPoints: ["大腸兪 (BL25)", "承山 (BL57)", "命門 (GV4)", "陽陵泉 (GB34)"],
      formulaEquivalent: "独活寄生湯（どっかつきせいとう）、八味地黄丸",
    },
    clinicalExplanation: {
      pathomechanism: "加齢により『腰は腎の府』である腎陽が衰退。下焦の温煦機能が低下した間隙に、外気からの風寒湿邪が侵入。足の太陽膀胱経および足の少陽胆経の気血が凝固・阻滞し、坐骨神経走行に沿った絞扼性神経痛と虚血性冷感を引き起こしている。",
      differentialDiagnosis: "「気滞血瘀型腰痛」との鑑別：血瘀型は打撲や急性捻挫（ぎっくり腰）に多く、昼夜問わず針で刺すような局所痛がある。本例は天候・温度に左右され、夜間頻尿等の腎虚を基底に持つ寒湿痺である。",
      pointRationale: "環跳（胆経・膀胱経交会穴）は坐骨神経直上に位置し、深刺（寸6〜2寸）により神経幹周囲の浮腫と筋膜緊張を解放する。委中は「腰背は委中に求む」の四総穴。命門・腎兪への灸頭鍼は深部の冷えを根絶する。",
      clinicalPitfall: "環跳刺鍼時に強い電撃痛（放散痛）を故意に何度も誘発すると、神経線維を損傷する恐れがある。得気（重だるい響き）が得られたら直ちに手技を止め、静かに置鍼すること。",
      classicCitation: "『素問・痺論』：「風寒湿三気雑わり至りて合して痺と為す。その寒気多き者は痛痺と為す。」",
    },
  },

  // ==========================================
  // 症例 9: プレミアム限定 6 (メニエール・めまい)
  // ==========================================
  {
    id: "case-09-vertigo-phlegm-dampness",
    caseNumber: 9,
    title: "40代女性：フワフワ浮動性めまい・頭重感・悪心（湿痰）",
    subTitle: "脾虚生痰に伴う清陽不昇と利湿化痰配穴の臨床推論",
    difficulty: "中級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "45歳",
      gender: "女性",
      occupation: "パート事務",
      chiefComplaint: "雲の上を歩いているようなフワフワしためまい（浮動感）と、頭に重いヘルメットをかぶったような頭重感。",
      historyOfPresentIllness: "雨の日や台風接近時にめまいが悪化。乗り物酔いしやすく、悪心（吐き気）を伴う。耳の閉塞感（耳がつまる感じ）がある。",
      pastHistory: ["メニエール病の既往"],
      lifestyle: "甘いスイーツや乳製品を毎日摂取。運動習慣なし。",
    },
    examinations: {
      inspection: "顔色は白く、まぶたや下肢に浮腫（むくみ）傾向がある。",
      tongueDiagnosis: {
        body: "淡胖（全体にぽってり肥大）",
        coating: "白膩苔（白くねっとり厚い苔）",
        shape: "辺縁に顕著な歯痕",
      },
      auscultationAndOlfaction: "特記所見なし。",
      inquiry: [
        { question: "喉の渇きや味覚は？", answer: "口の中が粘っこく、喉は乾きません。水分を飲むと胃にポチャポチャ溜まります。" },
        { question: "便通やおしっこは？", answer: "おしっこの回数が少なく、便は軟らかくすっきり出ません。" },
      ],
      palpation: {
        pulse: "濡滑脈（じゅかつみゃく）",
        pulseDetail: "柔らかく浮き、指の下で滑らかに転がる湿痰脈。",
        abdomen: "心下振水音（みぞおちを叩くとポチャポチャ音が鳴る）。",
        acupointReaction: "中脘 (CV12)、豊隆 (ST40)、頭臨泣 (GB15)、陰陵泉 (SP9) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "四診所見からの病因病理の特定",
                question: "白膩苔・濡滑脈・心下振水音・雨天悪化・乗り物酔いから導かれる浮動性めまいの本態はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "痰濁中阻・水気上衝（脾虚により生じた湿痰が中焦を塞ぎ、清陽の上昇を阻害している）",
                            isCorrect: true,
                            feedback: "正解です。過剰な甘味・乳製品摂取で脾の運化が落ち、体内に停滞した痰飲（水毒）が内耳・脳循環の清陽を妨げています。"
                      },
                      {
                            id: "opt-2",
                            label: "肝陽上亢（かんようじょうこう：怒りやストレスで生じた肝風が吹き上がる）",
                            isCorrect: false,
                            feedback: "急激な回転性めまい、顔面紅潮、弦脈を呈する病態であり、本例の白膩苔や浮動感とは一致しません。"
                      },
                      {
                            id: "opt-3",
                            label: "気血両虚（きけつりょうきょ：脳の栄養不足）",
                            isCorrect: false,
                            feedback: "立ちくらみと淡白舌・細弱脈が主体であり、厚い白膩苔や振水音はみられません。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "「無痰作眩なし」に基づく確定証の鑑別",
                question: "古典の格言「無痰則不作眩（痰が無ければ眩暈を作さず）」に該当する本症例の確定証と、類似病態との鑑別点はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "痰濁中阻証（頭重感・悪心・白膩苔があり、天候や気圧低下で悪化する点が特徴）",
                            isCorrect: true,
                            feedback: "正解です。メニエール病の内リンパ水腫に酷似する病態で、胃内停水（心下振水音）を伴う典型的な痰濁中阻証です。"
                      },
                      {
                            id: "opt-2",
                            label: "腎陰虚証（腰膝酸軟と手足のほてり、耳鳴り、舌紅少苔が特徴）",
                            isCorrect: false,
                            feedback: "陰虚火旺によるめまいで、湿痰の所見とは正反対です。"
                      },
                      {
                            id: "opt-3",
                            label: "風熱外襲証（発熱・咽頭痛・浮数脈が特徴）",
                            isCorrect: false,
                            feedback: "外感性の急性熱病であり、慢性浮動性めまいではありません。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "化痰利水と昇清降濁の処方配穴",
                question: "全身の痰飲を除去する最強の「化痰要穴」を含み、清陽を頭部に昇らせる最適な組み合わせはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "豊隆 (ST40) ＋ 中脘 (CV12) ＋ 百会 (GV20) ＋ 陰陵泉 (SP9)",
                            isCorrect: true,
                            feedback: "正解です。豊隆（胃経絡穴）は古来「去痰の神穴」とされ、中脘（胃募穴）・陰陵泉（脾合穴）で湿痰を捌き、百会で清陽の気を昇提させる完璧な配穴です。"
                      },
                      {
                            id: "opt-2",
                            label: "太衝 (LR3) ＋ 行間 (LR2) ＋ 侠渓 (GB43)",
                            isCorrect: false,
                            feedback: "肝胆の火熱を瀉す配穴であり、湿痰の除去や水液代謝の改善には力不足です。"
                      },
                      {
                            id: "opt-3",
                            label: "関元 (CV4) ＋ 命門 (GV4) ＋ 腎兪 (BL23)",
                            isCorrect: false,
                            feedback: "下焦の温陽補腎配穴であり、中焦の湿痰停滞を直接化痰・排泄する作用は弱いです。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・虚実挟雑（本虚標実）",
      pattern: "痰濁中阻証（脾虚湿痰・水気上衝）",
      treatmentPrinciple: "燥湿化痰・健脾和胃・昇清降濁",
      primaryPoints: ["豊隆 (ST40)", "中脘 (CV12)", "百会 (GV20)"],
      secondaryPoints: ["陰陵泉 (SP9)", "頭臨泣 (GB15)", "内関 (PC6)", "足三里 (ST36)"],
      formulaEquivalent: "半夏白朮天麻湯（はんげびゃくじゅつてんまとう）、苓桂朮甘湯",
    },
    clinicalExplanation: {
      pathomechanism: "過剰な甘味・乳製品摂取により脾胃が運化不全を起こし、「脾は生痰の源、肺は貯痰の器」の通り体内に病的代謝産物（水毒・湿痰）が蓄積。これが胃内停水となり、頭部に必要な清陽の気を阻害。内耳リンパ浮腫を形成して浮動性めまいと頭重感を発症する。",
      differentialDiagnosis: "「気血両虚によるめまい」との鑑別：気血両虚は立ちくらみ（起立性）が主で舌質淡・薄白苔。本例は持続的な浮動感と「白膩苔（ねっとり厚い苔）」を呈し、明らかな湿痰の存在を示す。",
      pointRationale: "豊隆（胃経絡穴）は胃の降濁を促し全身の痰飲を尿へ排泄させる最強の化痰穴。中脘で水液の停滞を解消し、百会に軽く刺鍼して清陽の気を昇提させる。頭臨泣は胆経の経穴として頭部の湿痰鬱滞を散らす。",
      clinicalPitfall: "めまい発作直後は起立・歩行時に転倒の危険が高いため、施術後はしばらくベッド上で安静を保たせること。また、水分補給を盲信して大量の水を一気飲みする指導は絶対に避ける（水滞の増悪を招く）。",
      classicCitation: "『金匱要略・痰飲咳嗽病脈証并治』：「心下に支飲あり、其の人苦眩冒するは、澤瀉湯これをつかさどる。」",
    },
  },

  // ==========================================
  // 症例 10: プレミアム限定 7 (呼吸器・梅核気)
  // ==========================================
  {
    id: "case-10-globus-hystericus",
    caseNumber: 10,
    title: "30代女性：喉の異物感・つかえ感・咳払い（梅核気・咽喉頭異常感症）",
    subTitle: "気滞痰阻による梅核気の病態機序と八脈交会配穴",
    difficulty: "中級",
    category: "呼吸器・感染後",
    isFreeTrial: false,
    patient: {
      age: "36歳",
      gender: "女性",
      occupation: "コールセンター勤務",
      chiefComplaint: "喉に梅の種が挟まったような異物感があり、吐き出そうとしても出ず、飲み込もうとしても下りない。",
      historyOfPresentIllness: "職場の人間関係のストレスが深刻化した2ヶ月前から自覚。耳鼻咽喉科のカメラ検査で「異常なし」と言われたが症状は改善せず。胸の圧迫感（胸悶）とため息が多い。",
      pastHistory: ["特記事項なし"],
      lifestyle: "言いたいことを我慢する性格。水分を摂ると一時的に楽になる。",
    },
    examinations: {
      inspection: "表情は沈みがち。頻繁に喉元を気にしたり咳払いをする。",
      tongueDiagnosis: {
        body: "淡紅",
        coating: "白膩苔（舌根部に厚い）",
        shape: "正常",
      },
      auscultationAndOlfaction: "「エヘン」という乾いた咳払いが会話中に頻出する。",
      inquiry: [
        { question: "食事をする時の喉の通りはどうですか？", answer: "不思議なことに、ご飯を食べる時は全く引っかからずスムーズに飲み込めます。何もない時に異物感が強くなります。" },
        { question: "気分による症状の変化は？", answer: "休日に楽しいことをしている時や何かに集中している時は完全に忘れています。仕事前になると猛烈に詰まります。" },
      ],
      palpation: {
        pulse: "弦脈（げんみゃく）",
        pulseDetail: "気の滞り（気滞）を明瞭に示す弦脈。",
        abdomen: "両側の胸脇苦満、および膻中（CV17）周辺の顕著な圧痛。",
        acupointReaction: "列缺 (LU7)、照海 (KI6)、太衝 (LR3)、天突 (CV22) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "気鬱・痰凝の病理機序の特定",
                question: "「喉に物が詰まっているようで、吐き出そうとしても出ず、飲み込もうとしても下りないが、食事は普通に通過する」古典的病態の成因はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "気滞痰阻（きたいたんそ：ストレスで停滞した気と水分代謝不全の痰が咽喉部で絡み合った梅核気）",
                            isCorrect: true,
                            feedback: "正解です。『金匱要略』に「婦人、咽中に炙臠あるが如し」と記された梅核気（ヒステリー球）であり、七情内傷による気機鬱滞が本質です。"
                      },
                      {
                            id: "opt-2",
                            label: "食道腫瘍による器質的狭窄",
                            isCorrect: false,
                            feedback: "飲食通過時に固形物が引っかかるのが特徴であり、食事時に引っかかりが消失する本例とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "肺熱陰虚（はいねついんきょ）",
                            isCorrect: false,
                            feedback: "激しい乾咳や喀血、口渇を伴う病態であり、本例の情志連動の異物感とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "梅核気（気滞痰阻証）の確定証と四診所見",
                question: "本症例が単なる局所咽頭炎ではなく「肝気鬱結・気滞痰阻証」であることを証明する四診所見の組み合わせはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "弦脈、胸脇苦満、舌根部の白膩苔、頻繁なため息や咳払い",
                            isCorrect: true,
                            feedback: "正解です。気の鬱滞を示す弦脈・胸脇苦満と、湿痰を示す白膩苔が揃っており、無形の気と有形の痰が咽喉に結聚した証拠です。"
                      },
                      {
                            id: "opt-2",
                            label: "洪大脈、舌質紅、黄燥苔、激しい口渇",
                            isCorrect: false,
                            feedback: "実熱証の所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "沈遅無力脈、淡白舌、手足の強い冷え",
                            isCorrect: false,
                            feedback: "虚寒証の所見です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "八脈交会穴ペアと気会穴の選定",
                question: "任脈と陰蹻脈を通じ、胸喉の気機を開通させて梅核気を速やかに散結させる特効配穴はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "列缺 (LU7) ＋ 照海 (KI6) ＋ 膻中 (CV17) ＋ 太衝 (LR3)",
                            isCorrect: true,
                            feedback: "正解です。列缺（任脈に通ず）と照海（陰蹻脈に通ず）は胸・喉・肺の病変を統括する黄金ペアです。気会である膻中で胸中の気滞を四散させ、太衝で肝気を疏泄します。"
                      },
                      {
                            id: "opt-2",
                            label: "後谿 (SI3) ＋ 申脈 (BL62) ＋ 大椎 (GV14)",
                            isCorrect: false,
                            feedback: "督脈・陽蹻脈に通じる腰背・後頭部の配穴です。"
                      },
                      {
                            id: "opt-3",
                            label: "内関 (PC6) ＋ 公孫 (SP4) ＋ 梁丘 (ST34)",
                            isCorrect: false,
                            feedback: "心・胸・胃の胃気上逆や急性胃痛に適した配穴です。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "半表半裏・気実",
      pattern: "肝気鬱結・気滞痰阻証（梅核気）",
      treatmentPrinciple: "行気開鬱・化痰散結・利咽降逆",
      primaryPoints: ["列缺 (LU7)", "照海 (KI6)", "膻中 (CV17)"],
      secondaryPoints: ["太衝 (LR3)", "天突 (CV22)", "豊隆 (ST40)", "内関 (PC6)"],
      formulaEquivalent: "半夏厚朴湯（はんげこうぼくとう）",
    },
    clinicalExplanation: {
      pathomechanism: "情志の抑圧により肝の疏泄機能が失調。鬱結した気が胸中に滞留し、気滞によって水液が停滞して痰を生じる。無形の気と有形の痰が咽喉部で絡み合い結聚（気痰互結）するため、「梅の種が挟まったような異物感」として自覚される。",
      differentialDiagnosis: "「食道腫瘍や逆流性食道炎」との鑑別：食道炎は胸焼けや呑酸を伴い、腫瘍は固形物が喉を通らなくなる。梅核気は飲食時には通過障害がなく、ストレスで増悪するのが鑑別の鍵。",
      pointRationale: "列缺（肺経絡穴・八脈交会穴）は任脈を通じ、喉のバリア機能を整える。照海（腎経）は陰蹻脈に通じ喉を潤す。膻中（気会・心包募穴）は「上気海」として胸中の気滞を四散させ、太衝で肝気を解鬱する。",
      clinicalPitfall: "天突（胸骨切痕の上）への刺鍼は、角度を誤ると気管や縦隔大血管を損傷する危険がある。必ず胸骨柄の後面に向けて極めて慎重に沿わせるか、初心者は円皮鍼や接触鍼にとどめること。",
      classicCitation: "『金匱要略・婦人雑病脈証并治』：「婦人、咽中に炙臠（しゃらん：焼いた肉片）あるが如きは、半夏厚朴湯これをつかさどる。」",
    },
  },

  // ==========================================
  // 症例 11〜20: プレミアム限定 8〜17
  // ==========================================
  {
    id: "case-11-cervicobrachial-syndrome",
    caseNumber: 11,
    title: "50代男性：首肩腕のしびれ・肩甲骨内側の頑固な刺痛",
    subTitle: "頚肩腕症候群における気滞血瘀と経筋病変の解剖学的刺鍼",
    difficulty: "上級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "54歳",
      gender: "男性",
      occupation: "タクシードライバー",
      chiefComplaint: "右の首から肩甲骨内縁、母指にかけて電撃のようなしびれと刺痛。",
      historyOfPresentIllness: "長時間の同一姿勢運転で増悪。夜間痛で睡眠が阻害される。ジャクソン・スパーリングテスト陽性。",
      pastHistory: ["頚椎症指摘"],
      lifestyle: "運動不足、喫煙。",
    },
    examinations: {
      inspection: "右肩の拳上障害。頚部可動域の制限（後屈時にしびれ激化）。",
      tongueDiagnosis: { body: "暗紫（瘀斑あり）", coating: "薄白", shape: "硬直" },
      auscultationAndOlfaction: "特記所見なし。",
      inquiry: [{ question: "痛みのある部位は？", answer: "肩甲骨のキワがナイフで刺されるように痛み、腕の外側から親指にしびれが走ります。" }],
      palpation: { pulse: "弦渋脈", abdomen: "腹力中等度。", acupointReaction: "頚部夾脊穴 (EX-B2)、天宗 (SI11)、曲池 (LI11)、合谷 (LI4) に強圧痛。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "症状・所見の経絡経筋同定",
                question: "C6神経根障害による「首肩から母指にかけての放散痛・しびれ」と「後屈時のスパーリングテスト陽性」に一致する東洋医学の経絡・経筋はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "手太陰肺経・手陽明大腸経の経筋および足太陽膀胱経（頚部）",
                            isCorrect: true,
                            feedback: "正解です。頚部から前腕橈側・母指へと走るラインは手太陰肺経および手陽明大腸経に一致し、頚部後面の支持筋は膀胱経・督脈に属します。"
                      },
                      {
                            id: "opt-2",
                            label: "手少陰心経・手太陽小腸経（小指側）",
                            isCorrect: false,
                            feedback: "C8/Th1神経根障害領域であり、母指側のC6障害とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "足厥陰肝経・足太陰脾経",
                            isCorrect: false,
                            feedback: "下肢内側の経絡であり、頚肩腕症候群の走行とは無関係です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "病態の虚実・病性弁証",
                question: "ナイフで刺されるような固定性の激痛、夜間増悪、暗紫舌（瘀斑）、弦渋脈から導かれる確定証名はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "気滞血瘀証（経筋阻痺・脈絡不通）",
                            isCorrect: true,
                            feedback: "正解です。長時間の同一姿勢運転による筋肉の虚血・攣縮が局所の血流不全（血瘀）を生じさせ、「不通則痛（通ぜざれば則ち痛む）」の刺痛を形成しています。"
                      },
                      {
                            id: "opt-2",
                            label: "陰虚火旺証",
                            isCorrect: false,
                            feedback: "潤い不足によるほてりや虚熱が主体であり、局所の固定性刺痛や暗紫舌の瘀血病態とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "風寒表証",
                            isCorrect: false,
                            feedback: "発熱や悪寒を伴う感冒初期の病態です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "頚部夾脊穴の解剖学的刺鍼手技と医療安全管理",
                question: "神経根周囲の浮腫を消退させ、かつ重大な医療事故（脊髄・椎骨動脈損傷）を絶対に回避するための正しい刺鍼手技はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "頚部夾脊穴 (EX-B2) にて、棘突起外方0.5寸から内側（脊柱管方向）へ向けず、直刺またはやや外下方へ深度1寸（約2.5cm）以内にとどめる",
                            isCorrect: true,
                            feedback: "正解です。頚部深部刺鍼で内側に角度をつけると脊髄腔や椎骨動脈に達する危険があります。解剖指標を守り外下方へ向けて適度な深度で刺入し、天宗・曲池を併用します。"
                      },
                      {
                            id: "opt-2",
                            label: "2寸5分の長鍼を用い、脊柱管の中心に向けて深く刺入して強い電撃痛を反復誘発する",
                            isCorrect: false,
                            feedback: "脊髄損傷・くも膜下出血の極めて高いリスクがあり絶対禁忌です。"
                      },
                      {
                            id: "opt-3",
                            label: "頚部には一切刺鍼せず、足の湧泉にお灸だけをすえる",
                            isCorrect: false,
                            feedback: "遠隔穴も有用ですが、頚椎症性神経根症の局所神経浮腫解除には夾脊穴の安全な手技が極めて有効です。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "表裏挟雑・実証",
      pattern: "気滞血瘀証（経筋阻痺・頚椎症性神経根症）",
      treatmentPrinciple: "活血化瘀・疏通経絡・理気止痛",
      primaryPoints: ["頚部夾脊穴 (EX-B2)", "天宗 (SI11)", "曲池 (LI11)"],
      secondaryPoints: ["合谷 (LI4)", "手三里 (LI10)", "風池 (GB20)"],
      formulaEquivalent: "身痛逐瘀湯、葛根加朮附湯",
    },
    clinicalExplanation: {
      pathomechanism: "長時間の同一姿勢による頚部深層筋（斜角筋・肩甲挙筋・頚板状筋）の持続的筋緊張から微小循環不全と虚血性炎症が発生。椎間孔周囲の神経根浮腫が手陽明大腸経・手太陽小腸経の経筋を侵襲している。",
      differentialDiagnosis: "「胸郭出口症候群」との鑑別：モーリーテストやライトテストでの鑑別が必要。本例はスパーリングテスト陽性であり頚椎高位（C5/C6）病変が主体。",
      pointRationale: "頚部夾脊穴（棘突起外方0.5寸）への刺鍼は脊髄後枝内側枝を直接刺激し神経根周囲の浮腫を引かせる。天宗は肩甲下神経領域のトリガーポイントとして腕神経叢の緊張を緩解する。",
      clinicalPitfall: "頚椎への深刺（2寸以上）は椎骨動脈や脊髄を損傷する重大な医療事故につながる。刺鍼角度を内側（脊柱管方向）に向けず、やや外下方に向け深度1寸以内にとどめること。",
      classicCitation: "『素問・調経論』：「病、脈に在るものは血を調え、肉に在るものは衛を調う。」",
    },
  },

  {
    id: "case-12-orthostatic-hypotension",
    caseNumber: 12,
    title: "30代女性：朝起きられない・立ちくらみ・低血圧（起立性調節障害）",
    subTitle: "気血両虚による脳循環不全と清陽昇提の臨床戦略",
    difficulty: "中級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "31歳",
      gender: "女性",
      occupation: "在宅勤務プログラマー",
      chiefComplaint: "朝ベッドから起き上がると目の前が真っ暗になる（眼前暗黒感）。午前中は体が全く動かない。",
      historyOfPresentIllness: "収縮期血圧が85mmHg前後。午後になると徐々に元気が出る。息切れ・動悸を伴い、顔色が蒼白。",
      pastHistory: ["貧血の既往"],
      lifestyle: "運動不足、小食。",
    },
    examinations: {
      inspection: "顔色蒼白、爪の色が白っぽい。",
      tongueDiagnosis: { body: "淡白・痩小", coating: "薄白苔", shape: "正常" },
      auscultationAndOlfaction: "小声、言葉に力がない。",
      inquiry: [{ question: "食欲や体力は？", answer: "少し食べただけですぐお腹がいっぱいになり、疲れ果てて横になりたくなります。" }],
      palpation: { pulse: "虚細無力脈", abdomen: "腹力軟弱、心下動悸。", acupointReaction: "百会 (GV20)、足三里 (ST36)、気海 (CV6) に虚の陥下。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "四診所見の精査と病理判定",
                question: "蒼白面色・淡白舌・細弱無力脈・眼前暗黒感・食後極度の倦怠感から判定される病態機序はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "気血両虚・清陽不昇（生体のエネルギーと血液が枯渇し、頭部に清陽の気を昇挙できない）",
                            isCorrect: true,
                            feedback: "正解です。脾胃の運化不全により気血生化の源が絶たれ、脳血流および自律神経の血圧調整能（交感神経トーヌス）が維持できなくなっています。"
                      },
                      {
                            id: "opt-2",
                            label: "肝火上炎（激しい怒りによる脳充血）",
                            isCorrect: false,
                            feedback: "実熱の病態であり、本例の極度の虚弱・低血圧とは正反対です。"
                      },
                      {
                            id: "opt-3",
                            label: "痰湿中阻",
                            isCorrect: false,
                            feedback: "白膩苔や胃内停水を伴う実証のめまいであり、気血両虚とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "中気下陥と心脾両虚の統合確定証",
                question: "朝の起床困難・低血圧・胃下垂傾向・軽微な動作での息切れから導かれる確定証名はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "中気下陥証・心脾両虚証（気血両虚）",
                            isCorrect: true,
                            feedback: "正解です。中気（脾胃の気）が落ち込んで内臓や血圧を持ち上げられず（中気下陥）、心血と脾気の両方が消耗して脳循環不全を招いています。"
                      },
                      {
                            id: "opt-2",
                            label: "腎陰虚・肝陽上亢証",
                            isCorrect: false,
                            feedback: "ほてりや高血圧傾向を呈する病態です。"
                      },
                      {
                            id: "opt-3",
                            label: "寒邪直中・脾胃実寒証",
                            isCorrect: false,
                            feedback: "急激な冷えによる激しい腹痛・下痢の急性実証です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "補気昇陽の配穴設計と起立性低血圧の安全管理",
                question: "清陽を頭部に昇提させ、全身の気血を底上げする最適な経穴処方と施術後の配慮はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "百会 (GV20) への温灸（昇提中気） ＋ 足三里 (ST36) ＋ 気海 (CV6) への補法を行い、施術後はベッド上で足の屈伸を行わせてからゆっくり起立させる",
                            isCorrect: true,
                            feedback: "正解です。百会のお灸は落ち込んだ気を引き上げる特効穴で、足三里・気海で全身の気血を底上げします。また施術直後の急な起立は脳貧血（血管迷走神経反射）を起こしやすいため段階的起立を促します。"
                      },
                      {
                            id: "opt-2",
                            label: "十宣穴（十指尖端）から点刺瀉血し、施術後すぐに勢いよく立ち上がらせる",
                            isCorrect: false,
                            feedback: "瀉血は気血をさらに消耗させ、急な起立は失神・転倒を招くため禁忌です。"
                      },
                      {
                            id: "opt-3",
                            label: "大椎 (GV14) と曲池 (LI11) に強刺激電気パルスを通電する",
                            isCorrect: false,
                            feedback: "実熱を散らす瀉法の手技であり、虚弱患者には過刺激となります。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・虚・寒",
      pattern: "気血両虚証（中気下陥・心脾両虚）",
      treatmentPrinciple: "補気養血・健脾昇陽（多壮灸・補法）",
      primaryPoints: ["百会 (GV20)", "足三里 (ST36)", "気海 (CV6)"],
      secondaryPoints: ["脾兪 (BL20)", "膈兪 (BL17)", "関元 (CV4)"],
      formulaEquivalent: "十全大補湯、人参養栄湯、補中益気湯",
    },
    clinicalExplanation: {
      pathomechanism: "脾胃の運化不全により『気血生化の源』が断たれ、全身の循環血液量と交感神経緊張能が低下。起立時に下肢へ血液が鬱滞し、脳血流が急速に低下して立ちくらみ・失神感を起こす。",
      differentialDiagnosis: "「内耳性めまい」との鑑別：回転性眼振がなく、体位変換（起立）に特異的に連動する血圧降下が決め手。",
      pointRationale: "百会への温灸（督脈）は「昇陽挙陥」の最高穴であり起立時の圧受容器反射を賦活する。気海（気の海）と足三里でお腹の血液循環量を底上げする。",
      clinicalPitfall: "施術後に急に起き上がらせると血管迷走神経反射で脳貧血を起こす危険がある。治療後はベッド上で足を曲げ伸ばしさせ、ゆっくり段階的に起き上がらせること。",
      classicCitation: "『霊枢・決気』：「上焦開発し、五穀の味を宣通し、皮膚を薫じ、身を充たし、毛を沢す、これを気と謂う。」",
    },
  },

  {
    id: "case-13-alopecia-areata",
    caseNumber: 13,
    title: "40代男性：ストレスによる多発性円形脱毛症・頭皮緊張",
    subTitle: "肝鬱化火と血熱生風による脱毛症の梅花針・刺絡臨床",
    difficulty: "上級",
    category: "皮膚・感覚器",
    isFreeTrial: false,
    patient: {
      age: "41歳",
      gender: "男性",
      occupation: "管理職",
      chiefComplaint: "頭頂部および側頭部に500円玉大の脱毛斑が3箇所急速に出現。",
      historyOfPresentIllness: "部署統合の過重ストレスから2週間で発症。頭皮が熱く突っ張り、不眠とイライラを伴う。",
      pastHistory: ["アトピー性皮膚炎"],
      lifestyle: "深夜残業、睡眠不足。",
    },
    examinations: {
      inspection: "頭頂部・側頭部に境界鮮明な円形脱毛斑。周囲の毛髪が容易に抜ける（感嘆符毛あり）。",
      tongueDiagnosis: { body: "紅", coating: "薄黄苔", shape: "舌辺に点刺" },
      auscultationAndOlfaction: "特記所見なし。",
      inquiry: [{ question: "頭皮の感覚は？", answer: "頭がヘルメットで締め付けられているように熱く硬いです。" }],
      palpation: { pulse: "弦数脈", abdomen: "胸脇苦満あり。", acupointReaction: "風池 (GB20)、百会 (GV20)、太衝 (LR3) に過敏圧痛。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "「髪は血の余り、腎の華」の病理把握",
                question: "急激な多発性円形脱毛症、頭皮の熱感・緊縛感、舌紅、弦数脈から読み解く病態発症の機序はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "肝鬱化火・血熱生風（激しいストレスで肝気が鬱結して化火し、血熱が毛根の血流を遮断して内風を生じさせた）",
                            isCorrect: true,
                            feedback: "正解です。「髪は血の余り」であり、急激な精神的打撃により生じた血熱が頭頂の微小血管に波及し、毛包組織の自己免疫性炎症と急性脱落を引き起こしています。"
                      },
                      {
                            id: "opt-2",
                            label: "腎陽虚衰（加齢による毛根の萎縮）",
                            isCorrect: false,
                            feedback: "何年もかけて徐々に頭頂部や生え際が後退する病態であり、数週間で多発する円形脱毛とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "寒湿停滞",
                            isCorrect: false,
                            feedback: "冷えとむくみによる病態であり、頭皮の灼熱感や舌紅・数脈とは合いません。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "脱毛症の鑑別診断",
                question: "本症例を「気血両虚による慢性薄毛」と鑑別し、「血熱生風証」と判定する最大の四診所見はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "脱毛斑の境界が極めて鮮明で進行が急速であり、舌質紅・薄黄苔・弦数脈という実熱の徴候を伴う点",
                            isCorrect: true,
                            feedback: "正解です。気血両虚は頭髪全体が細く疎らになり舌質は淡白・脈細弱ですが、本例は境界明瞭な円形斑が急速に出現し、局所熱感と実熱脈を呈しています。"
                      },
                      {
                            id: "opt-2",
                            label: "髪が乾燥して枝毛が多く、爪が割れやすい点",
                            isCorrect: false,
                            feedback: "血虚の一般的所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "朝起きると枕に抜け毛が数本ついている程度である点",
                            isCorrect: false,
                            feedback: "生理的脱毛の範囲です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "治法・配穴と局所刺鍼の臨床的注意点",
                question: "清熱涼血・祛風通絡を達成する配穴と、脱毛斑局所に対する正しい刺鍼手技はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "風池 (GB20) ＋ 百会 (GV20) ＋ 太衝 (LR3) で熱を瀉し、脱毛斑の「周囲境界部」に浅く散刺（梅花針様）を施す",
                            isCorrect: true,
                            feedback: "正解です。風池・太衝で頭部の熱を散らし、脱毛斑の中央ではなく「境界部・健常部との境」に微細な浅刺を行うことで、毛包を傷つけずに微小循環を再開通させます。"
                      },
                      {
                            id: "opt-2",
                            label: "脱毛斑の中央部に2寸の太い鍼を骨膜まで深く刺入して強い刺激を与える",
                            isCorrect: false,
                            feedback: "毛包組織を直接破壊して瘢痕化させ、永久脱毛を招く危険があるため絶対禁忌です。"
                      },
                      {
                            id: "opt-3",
                            label: "局所を直接もぐさで強く焼灼する",
                            isCorrect: false,
                            feedback: "強い熱傷を起こして毛根を全滅させる恐れがあります。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・実・熱",
      pattern: "血熱生風証（肝火鬱結・毛竅閉塞）",
      treatmentPrinciple: "清熱涼血・祛風通絡・養血生発（局所微細刺鍼）",
      primaryPoints: ["風池 (GB20)", "百会 (GV20)", "太衝 (LR3)"],
      secondaryPoints: ["血海 (SP10)", "合谷 (LI4)", "脱毛斑周囲の散刺（梅花針）"],
      formulaEquivalent: "神応養真丹、防風通聖散",
    },
    clinicalExplanation: {
      pathomechanism: "激しい精神刺激により肝気鬱結が化火し、「血熱」を形成。血熱が頭頂に上騰して毛包周囲の微小血管炎と自己免疫反応（T細胞浸潤）を励起し、毛根への栄養供給を遮断して急激に毛髪が脱落する。",
      differentialDiagnosis: "「気血両虚型脱毛」との鑑別：気血両虚は徐々に髪全体が細く薄くなる。本例は境界明瞭な円形斑が急速に多発する実熱・血熱型である。",
      pointRationale: "脱毛斑周囲への極細鍼による浅刺・散刺（梅花針様刺激）は局所の微小循環を急速に再開通させ、毛母細胞を活性化する。風池・太衝で頭部の熱を瀉す。",
      clinicalPitfall: "脱毛斑の中央部に強い深刺を行うと毛包組織を瘢痕化させ再生を妨げる恐れがある。必ず脱毛部境界部および周囲の健常部に浅く低刺激で行うこと。",
      classicCitation: "『諸病源候論』：「人、風邪あり、血気虚祥なれば、腠理開く。風邪血気に乗ずれば、髪落ちて生ぜず。」",
    },
  },

  {
    id: "case-14-knee-osteoarthritis",
    caseNumber: 14,
    title: "70代女性：変形性膝関節症・立ち上がり痛・雨の日の重だるさ",
    subTitle: "着痺（湿痺）と筋膜経筋調律による運動機能回復",
    difficulty: "初級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "72歳",
      gender: "女性",
      occupation: "主婦",
      chiefComplaint: "正座が不能で、椅子からの立ち上がりや階段の降りで膝の内側が激痛。",
      historyOfPresentIllness: "O脚変形が進行。雨の日や梅雨時に膝が重だるく腫れぼったくなる。関節穿刺歴あり。",
      pastHistory: ["高血圧"],
      lifestyle: "散歩を控えがちになり筋力低下。",
    },
    examinations: {
      inspection: "膝内側裂隙の狭小化・骨棘。内反変形。",
      tongueDiagnosis: { body: "淡胖", coating: "白膩苔", shape: "歯痕あり" },
      auscultationAndOlfaction: "関節運動時にクリックス音（ギシギシ鳴る）。",
      inquiry: [{ question: "痛みの場所は？", answer: "お皿の下と、特に内側の骨のキワ（脛骨内側顆）が痛みます。" }],
      palpation: { pulse: "沈緩脈", abdomen: "腹力中等度以下。", acupointReaction: "犢鼻 (ST35)、内膝眼 (奇穴)、陰陵泉 (SP9)、陽陵泉 (GB34)、曲泉 (LR8) に反応。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "変形性膝関節症の痺証鑑別",
                question: "膝関節の重だるい激痛、腫脹・関節水腫、雨天や梅雨時の増悪、白膩苔から導かれる東洋医学的痺証はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "着痺（ちゃくひ：湿邪が優位となり関節に重着・停滞する痺証）",
                            isCorrect: true,
                            feedback: "正解です。『素問』に「湿気多き者は着痺と為す」とある通り、湿邪の粘滞性により関節腔内に水滞が停滞し、屈伸困難と重だるい痛みを引き起こしています。"
                      },
                      {
                            id: "opt-2",
                            label: "行痺（こうひ：風邪による遊走痛）",
                            isCorrect: false,
                            feedback: "関節から関節へと痛む場所が移動する特徴があり、膝に固定する本例とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "痛痺（つうひ：寒邪による冷え激痛）",
                            isCorrect: false,
                            feedback: "冷えが主因で激痛が走る病態ですが、水腫や重だるさ・白膩苔が前面に出る本例は着痺が主体です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "本虚標実（加齢と湿邪）の統合弁証",
                question: "本症例における「肝腎不足（本虚）」と「経絡阻滞（標実）」の関係として最も適切な説明はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "加齢による「肝主筋・腎主骨」の衰退により関節軟骨・筋膜が変性（本虚）した基底に、湿邪が侵入して関節水腫と経筋拘急（標実）を生じている",
                            isCorrect: true,
                            feedback: "正解です。膝の変形や軟骨減少は肝血・腎精の不足（本）によるものであり、その脆弱な関節に外邪（湿邪）が停滞して急性滑膜炎・運動痛（標）を発症しています。"
                      },
                      {
                            id: "opt-2",
                            label: "心火の亢進が膝関節の潤滑油を蒸発させている",
                            isCorrect: false,
                            feedback: "心と膝関節の直接の病理連動ではありません。"
                      },
                      {
                            id: "opt-3",
                            label: "肺気虚により皮膚から汗が漏れ出して膝に溜まっている",
                            isCorrect: false,
                            feedback: "自汗の病理であり、変形性膝関節症の病態ではありません。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "膝周囲の局所配穴と合穴・下合穴の活用",
                question: "膝関節周囲の循環を改善し、関節内の余分な水滞を排泄させて筋膜を緩める最適な経穴処方はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "犢鼻 (ST35) ＋ 内膝眼 (奇穴) ＋ 陰陵泉 (SP9：脾合水穴) ＋ 陽陵泉 (GB34：筋会・下合穴)",
                            isCorrect: true,
                            feedback: "正解です。内外膝眼で局所の関節包周囲血流を促進し、陰陵泉で関節内の湿痰・水腫を強力に利水排泄させ、陽陵泉で膝を支える大腿四頭筋等の経筋緊張を弛緩させる完璧な構成です。"
                      },
                      {
                            id: "opt-2",
                            label: "少沢 (SI1) ＋ 前谷 (SI2) ＋ 後谿 (SI3)",
                            isCorrect: false,
                            feedback: "上肢の小腸経井滎兪穴であり、膝関節の変形性関節症には直接適合しません。"
                      },
                      {
                            id: "opt-3",
                            label: "関節包の腫脹中央部に太い鍼を深く穿刺して故意に関節液を吸引する",
                            isCorrect: false,
                            feedback: "無菌環境でない刺鍼での関節腔穿刺は化膿性関節炎を誘発する重大リスクがあるため禁忌です。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "表裏挟雑・虚実挟雑",
      pattern: "着痺・湿勝痺証（肝腎不足・経絡阻滞）",
      treatmentPrinciple: "祛湿通絡・温経止痛・補益肝腎（局所温灸・刺鍼）",
      primaryPoints: ["陰陵泉 (SP9)", "陽陵泉 (GB34)", "犢鼻 (ST35)", "内膝眼 (奇穴)"],
      secondaryPoints: ["曲泉 (LR8)", "血海 (SP10)", "足三里 (ST36)"],
      formulaEquivalent: "防已黄耆湯、蠲痺湯",
    },
    clinicalExplanation: {
      pathomechanism: "加齢による肝血・腎精の減退（骨・軟骨・筋膜の退行変性）に、重だるい湿邪が関節内に滞留（関節水腫・滑膜炎）。膝周囲の足太陰脾経・足厥陰肝経の経筋が拘急し、運動痛を惹起する。",
      differentialDiagnosis: "「偽痛風や化膿性関節炎」との鑑別：発赤・熱感・安静時拍動痛を伴う場合は急性化膿症や痛風を疑い即座に整形外科へ対診する。",
      pointRationale: "鶴頂・内外膝眼への刺鍼は関節包周囲の血流を賦活。陰陵泉（脾合穴）は膝関節内の水滞を強力に排泄し、陽陵泉（筋会）で拘急した大腿四頭筋・膝窩筋の筋膜を弛緩させる。",
      clinicalPitfall: "関節包内への無菌操作を欠いた刺入は感染性関節炎のリスクとなるため、解剖学的構造を把握し滑膜炎の極期には過度な深刺を避けること。",
      classicCitation: "『素問・痺論』：「湿気多き者は着痺と為す。留まりて去らざるなり。」",
    },
  },

  {
    id: "case-15-peptic-ulcer-pain",
    caseNumber: 15,
    title: "30代男性：夜間の空腹時胃痛・イライラ・口の苦味",
    subTitle: "肝胃不和から化火した胃脘痛の瀉火和胃アプローチ",
    difficulty: "中級",
    category: "消化器・脾胃",
    isFreeTrial: false,
    patient: {
      age: "35歳",
      gender: "男性",
      occupation: "金融ディーラー",
      chiefComplaint: "夜中や空腹時にみぞおちがキリキリ痛み、何か食べると一時的に治まる。",
      historyOfPresentIllness: "相場のストレスが激しく、空腹時の胃痛と胸焼けが悪化。コーヒーとタバコが手放せない。",
      pastHistory: ["十二指腸潰瘍歴あり"],
      lifestyle: "不規則な飲食、刺激物摂取。",
    },
    examinations: {
      inspection: "痩せ型、神経質。目つきが鋭い。",
      tongueDiagnosis: { body: "紅", coating: "薄黄苔", shape: "中央にわずかな裂紋" },
      auscultationAndOlfaction: "特記所見なし。",
      inquiry: [{ question: "痛みの時間帯は？", answer: "お腹が空いた夕方や夜間2時頃に激痛が走り、牛乳やビスケットを食べると楽になります。" }],
      palpation: { pulse: "弦数脈", abdomen: "中脘・巨闕に圧痛。", acupointReaction: "中脘 (CV12)、梁丘 (ST34)、太衝 (LR3) に顕著な硬結。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "胃痛の性状と好発時間からの病態推論",
                question: "「夜間や空腹時にみぞおちがキリキリ痛み、何か食べると一時的に治まる」「口が苦く、イライラする」病態の東洋医学的機序はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "肝火犯胃・肝胃鬱熱（ストレスによる肝火が胃を攻撃し、胃酸分泌を過剰に昂らせて粘膜を灼傷している）",
                            isCorrect: true,
                            feedback: "正解です。夜間や空腹時は胃が空虚になるため、過剰な胃酸（胃熱・肝火）が潰瘍面を直接刺激してキリキリ痛み、飲食で胃酸が中和されると一時的に痛みが和らぎます。"
                      },
                      {
                            id: "opt-2",
                            label: "脾胃虚寒（胃が冷えて動かない）",
                            isCorrect: false,
                            feedback: "温めると楽になり、空腹時だけでなく冷飲食で悪化する病態です。"
                      },
                      {
                            id: "opt-3",
                            label: "食積（食べ過ぎによる消化不良）",
                            isCorrect: false,
                            feedback: "食後にお腹が張って激痛となり、嘔吐すると楽になる病態であり、本例とは正反対です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "鑑別診断と確定証の特定",
                question: "本症例を「単純な飲食不節による胃熱」ではなく「肝気化火による肝胃鬱熱証」と診断する四診上の根拠はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "脈が弦数脈（肝の緊張と熱）であり、情志のストレスで悪化し、口苦・イライラ・胸脇部緊張を併発している点",
                            isCorrect: true,
                            feedback: "正解です。弦脈や口苦、精神ストレスとの強い連動性は、病変の根本が肝胆の疏泄失調から化火したものであることを示しています。"
                      },
                      {
                            id: "opt-2",
                            label: "舌苔が真っ白で厚く、脈が遅脈である点",
                            isCorrect: false,
                            feedback: "寒証の所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "下腹部が冷えて下痢が止まらない点",
                            isCorrect: false,
                            feedback: "下焦虚寒の所見です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "郄穴・募穴・原穴を組み合わせた処方設計",
                question: "急性の激しい胃痛発作を即座に鎮痙・鎮痛し、肝火を鎮める最適な経穴処方はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "梁丘 (ST34：胃経郄穴) ＋ 中脘 (CV12：胃募穴) ＋ 太衝 (LR3：肝経原穴)",
                            isCorrect: true,
                            feedback: "正解です。梁丘は胃経の「郄穴（急痛・急性炎症を止める要穴）」であり、中脘で胃気昇降を調え、太衝で肝の熱暴走を断ち切る劇的な鎮痛配穴です。"
                      },
                      {
                            id: "opt-2",
                            label: "足三里 (ST36) ＋ 脾兪 (BL20) への温灸",
                            isCorrect: false,
                            feedback: "慢性期の消化吸収改善には良いですが、急性期の激しい胃酸過多・胃痙攣痛には郄穴の梁丘が最優先です。"
                      },
                      {
                            id: "opt-3",
                            label: "関元 (CV4) ＋ 気海 (CV6) ＋ 命門 (GV4)",
                            isCorrect: false,
                            feedback: "下焦の陽気を補う配穴であり、胃脘の灼熱痛には適しません。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・実・熱",
      pattern: "肝胃鬱熱証（肝火犯胃・胃脘痛）",
      treatmentPrinciple: "疏肝清熱・和胃止痛",
      primaryPoints: ["梁丘 (ST34)", "中脘 (CV12)", "太衝 (LR3)"],
      secondaryPoints: ["内関 (PC6)", "足三里 (ST36)", "期門 (LR14)"],
      formulaEquivalent: "化肝煎、四逆散合左金丸",
    },
    clinicalExplanation: {
      pathomechanism: "肝気鬱結が長期化して化火し、胃の陰液を灼熱。胃酸分泌が亢進し粘膜を自己消化して十二指腸球部潰瘍を形成。胃が空虚になると胃酸が潰瘍面を直接刺激して激痛となる。",
      differentialDiagnosis: "「脾胃虚寒胃痛」との鑑別：虚寒型は痛む部位を手で押さえると楽になり（喜按）、温かいものを欲する。本例は痛みが鋭く、口苦・舌紅・弦数脈を伴う熱痛である。",
      pointRationale: "梁丘（胃郄穴）への強刺激刺鍼は胃壁筋の過緊張と胃酸過多を迅速に抑制する。中脘で気機を調整し、太衝で肝の熱暴走を断ち切る。",
      clinicalPitfall: "黒色便（タール便）や吐血がみられる場合は活動性消化管出血の兆候であるため、直ちに救急搬送・内視鏡止血術へ回すこと。",
      classicCitation: "『医学正伝』：「胃脘痛、古方多しく温薬を用う…然るに郁熱致す所の者少なからず。」",
    },
  },

  {
    id: "case-16-atopic-dermatitis",
    caseNumber: 16,
    title: "20代女性：アトピー性皮膚炎・皮膚の乾燥と赤み・夜間の激しい痒み",
    subTitle: "血虚風燥と肺熱の体表防衛破綻に対する調営衛アプローチ",
    difficulty: "上級",
    category: "皮膚・感覚器",
    isFreeTrial: false,
    patient: {
      age: "28歳",
      gender: "女性",
      occupation: "保育士",
      chiefComplaint: "肘の内側、膝裏、首回りの皮膚が乾燥して粉を吹き、夜間に耐えがたい痒みで掻きむしる。",
      historyOfPresentIllness: "幼少期からのアトピーが成人後に再燃。ステロイド軟膏を使用中だが乾燥と痒みが治まらない。",
      pastHistory: ["アレルギー性鼻炎"],
      lifestyle: "乾燥肌、冷えのぼせ。",
    },
    examinations: {
      inspection: "首・肘窩に苔癬化（皮膚肥厚）、引っかき傷（抓傷）と落屑。",
      tongueDiagnosis: { body: "淡紅〜紅", coating: "少苔", shape: "やや乾燥" },
      auscultationAndOlfaction: "特記所見なし。",
      inquiry: [{ question: "痒みが増す条件は？", answer: "お風呂上がりや布団に入って体が温まった瞬間に激しく痒くなります。" }],
      palpation: { pulse: "細数脈または弦細脈", abdomen: "腹力中等度。", acupointReaction: "曲池 (LI11)、血海 (SP10)、三陰交 (SP6)、肺兪 (BL13) に反応。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "皮膚所見（望診）と病理機序の特定",
                question: "「肘の内側や首が乾燥して粉を吹き、皮膚が肥厚（苔癬化）して、夜間布団に入ると激しく痒い」病態の東洋医学的機序はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "血虚風燥・表虚生風（血の不足により皮膚組織が滋養されず乾燥し、陰虚内熱から虚風が生じて痒みを引き起こしている）",
                            isCorrect: true,
                            feedback: "正解です。「治風先治血、血行けば風自ずから滅す」の通り、慢性アトピーで営血が枯渇し、体表バリア（衛気）が破綻して耐え難い掻痒を招いています。"
                      },
                      {
                            id: "opt-2",
                            label: "湿熱浸淫（ジュクジュクした黄色い浸出液と水疱が主体の病態）",
                            isCorrect: false,
                            feedback: "急性湿疹や化膿病態であり、本例のような乾燥・落屑・苔癬化とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "風寒外束（寒気による蕁麻疹）",
                            isCorrect: false,
                            feedback: "寒冷刺激で膨疹が出る病態であり、慢性の苔癬化病変とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "「肺主皮毛」と「治風先治血」に基づく確定証",
                question: "本症例のアトピー性皮膚炎に対する東洋医学的確定証名として最も適切なものはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "血虚風燥証（肺陰不足・表虚生風）",
                            isCorrect: true,
                            feedback: "正解です。肺の宣発・粛降機能低下により皮膚（皮毛）へ津液が配分されず、肝血不足による血虚生風が皮膚表面で激しい痒みとなっています。"
                      },
                      {
                            id: "opt-2",
                            label: "肝胆湿熱証",
                            isCorrect: false,
                            feedback: "黄疸や右季肋部痛、口苦などを伴う内臓実熱病態です。"
                      },
                      {
                            id: "opt-3",
                            label: "脾腎陽虚証",
                            isCorrect: false,
                            feedback: "全身浮腫や激しい下痢、手足の氷のような冷えが主体の病態です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "清熱祛風・養血潤燥の配穴と臨床禁忌",
                question: "体表の風熱を清解し、皮膚に潤いを取り戻す要穴処方と、施術時の注意事項の組み合わせはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "曲池 (LI11：清熱祛風) ＋ 血海 (SP10：活血養血) ＋ 三陰交 (SP6：滋陰潤燥) を選び、赤くびらんした局所への直接深刺は避ける",
                            isCorrect: true,
                            feedback: "正解です。曲池は大腸経合水穴で皮膚の風熱を冷まし、血海・三陰交で血を養って風を止めます。急性炎症部への直接刺鍼は二次感染（蜂窩織炎）の恐れがあるため手足の遠隔穴を用います。"
                      },
                      {
                            id: "opt-2",
                            label: "激しく痒い皮膚の苔癬化部分に直接太い鍼を何十本も深刺して強通電する",
                            isCorrect: false,
                            feedback: "皮膚組織をさらに傷つけ、感染やケロイド化を招くため禁忌です。"
                      },
                      {
                            id: "opt-3",
                            label: "熱いお灸を痒い部位に直接多壮すえ続ける",
                            isCorrect: false,
                            feedback: "熱刺激はヒスタミン遊離を促し、直後に猛烈なリバウンド掻痒を引き起こすため不適です。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "表裏挟雑・虚熱",
      pattern: "血虚風燥証（肺陰不足・表虚生風）",
      treatmentPrinciple: "養血潤燥・祛風止痒・調和営衛",
      primaryPoints: ["曲池 (LI11)", "血海 (SP10)", "三陰交 (SP6)"],
      secondaryPoints: ["肺兪 (BL13)", "合谷 (LI4)", "膈兪 (BL17)"],
      formulaEquivalent: "当帰飲子（とうきいんし）、温清飲",
    },
    clinicalExplanation: {
      pathomechanism: "「肺は皮毛を司る」「肝は血を蔵す」。血虚により皮膚への栄養と水分補給が絶たれ、角質バリアが崩壊。「治風先治血、血行けば風自ずから滅す」の格言通り、血虚によって内風が生じ、猛烈な痒みを誘発する。",
      differentialDiagnosis: "「湿熱型皮膚炎」との鑑別：湿熱型はびらん・水疱・黄色浸出液を伴う。本例は乾燥・落屑・苔癬化が主体であるため血虚風燥である。",
      pointRationale: "曲池（大腸合穴）は体表の風熱を清解する止痒の要穴。血海（脾経）は活血養血により皮膚に潤いを取り戻す。三陰交で下焦の血を養う。",
      clinicalPitfall: "激しい炎症・びらんがある局所への直接刺鍼は二次感染（蜂窩織炎等）を招く恐れがあるため厳禁。必ず遠隔穴（手足）からアプローチすること。",
      classicCitation: "『医宗金鑑・外科心法要訣』：「風癬…乾燥して白屑を落とすは、血虚風燥の致す所なり。」",
    },
  },

  {
    id: "case-17-panic-anxiety",
    caseNumber: 17,
    title: "40代女性：急な動悸・呼吸困難感・パニック様発作",
    subTitle: "心胆気虚と奔豚気病（ほんとんきびょう）の安神・降逆処方",
    difficulty: "上級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "43歳",
      gender: "女性",
      occupation: "パート事務",
      chiefComplaint: "電車内や人混みで突然心臓が激しくバクバクし、息ができなくなって死ぬかと思うほどの恐怖に襲われる。",
      historyOfPresentIllness: "半年前に満員電車で初発。救急搬送されたが心電図・血液検査ともに完全正常。以降、予期不安で外出困難。",
      pastHistory: ["特記事項なし"],
      lifestyle: "睡眠不足、カフェイン過多。",
    },
    examinations: {
      inspection: "瞳孔散大傾向、呼吸が浅く過換気気味。手指の震え。",
      tongueDiagnosis: { body: "淡白・舌尖紅", coating: "薄白滑", shape: "胖大" },
      auscultationAndOlfaction: "浅い促迫呼吸。",
      inquiry: [{ question: "発作の前兆は？", answer: "下腹部から何かが胃や胸に向かって突き上げてくるような感覚（奔豚気）があります。" }],
      palpation: { pulse: "弦細数脈または結代脈", abdomen: "動悸が臍上からみぞおちにかけて強く拍動。", acupointReaction: "内関 (PC6)、公孫 (SP4)、巨闕 (CV14)、胆兪 (BL19) に反応。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "発作性動悸と気の上衝の古典病理",
                question: "「急激に下腹部から何かが胸や喉へ突き上げてきて、激しい動悸・呼吸困難・死の恐怖に襲われる」発作の東洋医学的古典病態名はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "奔豚気病（ほんとんきびょう：衝脈を通じて下焦の衝気が心胸に上逆する病態）",
                            isCorrect: true,
                            feedback: "正解です。『金匱要略』に「奔豚病は少腹より起こり、上りて咽喉を衝き、発作すれば死せんと欲す」と記されるパニック発作の典型病態です。"
                      },
                      {
                            id: "opt-2",
                            label: "結胸証（けっきょうしょう：邪熱と水飲が胸中で結聚した実熱病態）",
                            isCorrect: false,
                            feedback: "胸腹部の強い板状硬結と高熱を伴う病態です。"
                      },
                      {
                            id: "opt-3",
                            label: "懸飲（けんいん：胸膜炎による側胸部痛）",
                            isCorrect: false,
                            feedback: "呼吸や咳で脇腹が引きつれて痛む病態です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "臓腑病変と確定証の特定",
                question: "本症例が「心胆気虚・衝気上逆証」であることを裏付ける四診所見の組み合わせはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "驚きやすく些細な物音で怯える（胆気虚）、臍上からみぞおちへの拍動（奔豚気・衝気）、細数脈または結代脈",
                            isCorrect: true,
                            feedback: "正解です。「胆は決断を司り、心は神明を司る」。驚愕や過労で心胆の気が弱ると恐怖に過敏になり、衝脈の気が制禦を失って心胸へ爆発的に上逆します。"
                      },
                      {
                            id: "opt-2",
                            label: "舌苔が黄色く厚く乾燥し、脈が洪大で力強く、口臭が激しい",
                            isCorrect: false,
                            feedback: "陽明腑実熱証の所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "顔面が青白く、下腹部が石のように硬く冷えている",
                            isCorrect: false,
                            feedback: "純粋な寒積証です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "八脈交会配穴と発作時の臨床手技",
                question: "衝気の上逆を足元へ引き下ろし、心神を急速に鎮静化させる最適な経穴処方と発作時の対応はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "内関 (PC6：陰維脈に通ず) ＋ 公孫 (SP4：衝脈に通ず) ＋ 巨闕 (CV14：心募穴) を用い、発作時は深刺を避けて静かな接触鍼と呼気誘導を行う",
                            isCorrect: true,
                            feedback: "正解です。内関と公孫は八脈交会穴の黄金ペアで、胸腹の気逆・衝気を鎮める第一選択です。発作中に強い刺激を加えると過換気を悪化させるため、静かに触れる接触鍼と呼吸誘導が鉄則です。"
                      },
                      {
                            id: "opt-2",
                            label: "百会 (GV20) に強刺激温灸を何十壮もすえて気を頭部に引き上げる",
                            isCorrect: false,
                            feedback: "気をさらに上衝させてパニック発作を悪化させるため禁忌です。"
                      },
                      {
                            id: "opt-3",
                            label: "十宣穴への乱刺瀉血",
                            isCorrect: false,
                            feedback: "激しい瀉血刺激は患者のパニックと恐怖心をさらに煽るため適しません。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・虚実挟雑（本虚標実）",
      pattern: "心胆気虚・衝気上逆証（奔豚気）",
      treatmentPrinciple: "鎮驚安神・降逆平衝・温陽化気",
      primaryPoints: ["内関 (PC6)", "公孫 (SP4)", "巨闕 (CV14)"],
      secondaryPoints: ["神門 (HT7)", "太衝 (LR3)", "気海 (CV6)", "膻中 (CV17)"],
      formulaEquivalent: "奔豚湯、桂枝加桂湯、苓桂朮甘湯",
    },
    clinicalExplanation: {
      pathomechanism: "「胆は決断を司り、心は神明を司る」。驚愕や過労により心胆の気が損傷し恐怖に過敏になる。下焦の寒水・腎気が衝脈を伝って胸中に暴走上逆し（奔豚気）、急激な自律神経嵐（交感神経発作・頻脈・過換気）を引き起こす。",
      differentialDiagnosis: "「器質的心疾患（狭心症・不整脈）」との鑑別：循環器内科での除外診断が前提。発作時に息苦しさ・死の恐怖・手足のしびれ（過換気）を伴うのがパニック障害の特徴。",
      pointRationale: "内関と公孫の八脈交会穴は、衝脈の衝逆を足元へ引き下ろす至宝の配穴。巨闕（心募穴）で心気を安定させ、神門で自律神経過反射を鎮める。",
      clinicalPitfall: "発作中に激しい刺激を加えると過換気が悪化することがある。背中をさすりながら長い呼気を促し、静かに内関へ接触鍼を施すこと。",
      classicCitation: "『金匱要略・奔豚気病脈証治』：「奔豚病は、少腹より起こり、上りて咽喉を衝き、発作すれば死せんと欲す。」",
    },
  },

  {
    id: "case-18-severe-eyestrain",
    caseNumber: 18,
    title: "30代男性：デスクワークによる激しい眼精疲労・かすみ目・首こり",
    subTitle: "肝血不足に伴う目疾と太陽経筋・眼窩周囲配穴",
    difficulty: "初級",
    category: "皮膚・感覚器",
    isFreeTrial: false,
    patient: {
      age: "37歳",
      gender: "男性",
      occupation: "グラフィックデザイナー",
      chiefComplaint: "夕方になると目の奥が重く痛み、画面の文字が二重にかすむ。後頭部から首が岩のように硬い。",
      historyOfPresentIllness: "毎日12時間以上ディスプレイを凝視。目薬が手放せない。肩こりから側頭痛を伴う。",
      pastHistory: ["近視・乱視"],
      lifestyle: "スマートフォンの長時間使用。",
    },
    examinations: {
      inspection: "瞬目（まばたき）が多く、眼裂が狭い。結膜充血。",
      tongueDiagnosis: { body: "淡紅", coating: "薄白苔", shape: "正常" },
      auscultationAndOlfaction: "特記所見なし。",
      inquiry: [{ question: "目の見え方は？", answer: "ピントが合わず、ドライアイで目がショボショボして開けていられなくなります。" }],
      palpation: { pulse: "細弦脈", abdomen: "正常。", acupointReaction: "攅竹 (BL2)、風池 (GB20)、太陽 (奇穴)、太衝 (LR3) に顕著な圧痛。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "「久視傷血」の生理病理の把握",
                question: "長時間のディスプレイ注視による激しい眼精疲労・かすみ目・後頭部痛の東洋医学的機序として正しいものはどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "「久しく視れば血を傷る」の通り、目の酷使により肝血が枯渇し、毛様体筋や経筋に栄養が行き届かなくなっている",
                            isCorrect: true,
                            feedback: "正解です。「肝は目に開竅し、爪を華とし、筋を主る」。目を酷使し続けると肝血が奪われ、目のかすみや乾燥とともに後頚部の筋膜拘急（首こり）が連動して発症します。"
                      },
                      {
                            id: "opt-2",
                            label: "脾の陽気が頭部に過剰に昇りすぎて目を焼いている",
                            isCorrect: false,
                            feedback: "脾の運化とは直接関係しません。"
                      },
                      {
                            id: "opt-3",
                            label: "肺の宣発不全により目に空気が送り込めなくなっている",
                            isCorrect: false,
                            feedback: "肺気と眼精疲労の主病理ではありません。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "鑑別診断と確定証の特定",
                question: "本症例を「風熱による急性結膜炎」と明確に鑑別し、「肝血不足・経筋拘急証」と判定できる四診の鍵はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "眼脂（目やに）や激しい熱感・充血はなく、夕方や疲労時にかすみ目・ピント調節不全が悪化し、脈が細弦脈である点",
                            isCorrect: true,
                            feedback: "正解です。外感風熱であれば急性の充血・目やに・灼熱痛を伴いますが、本例は慢性疲労性の肝血不足であり、夕方に悪化するかすみ目が主体です。"
                      },
                      {
                            id: "opt-2",
                            label: "舌苔が真っ黄色で厚く、脈が滑数脈である点",
                            isCorrect: false,
                            feedback: "湿熱実証の所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "目を開けると激しい回転性のめまいが起きる点",
                            isCorrect: false,
                            feedback: "内耳性前庭障害の所見です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "配穴設計と眼窩周囲刺鍼の安全管理",
                question: "目と頭部への血流を回復させる要穴処方と、内出血（青あざ）を防ぐための安全管理はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "攅竹 (BL2) ＋ 太陽 (奇穴) ＋ 風池 (GB20) ＋ 太衝 (LR3) ＋ 光明 (GB37：胆経絡穴・眼の特効穴) を選び、眼窩内への無理な深刺は避ける",
                            isCorrect: true,
                            feedback: "正解です。攅竹・太陽で眼窩外縁から循環を促し、風池で後頭下筋群を緩め、光明（下肢）から目へ経気を通じます。晴明・球後等の眼窩内刺鍼は球後出血リスクが高いため、安全な外縁穴が推奨されます。"
                      },
                      {
                            id: "opt-2",
                            label: "晴明 (BL1) に太い鍼を用いて眼球の裏側まで深く刺入し激しく回旋させる",
                            isCorrect: false,
                            feedback: "球後出血や視神経損傷の危険が極めて高いため絶対禁忌です。"
                      },
                      {
                            id: "opt-3",
                            label: "足の指先（厲兌など）だけにお灸をして眼窩周囲には一切触れない",
                            isCorrect: false,
                            feedback: "局所の筋緊張解放と遠隔穴の併用が最も効果的です。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "表裏挟雑・虚証（局所鬱熱）",
      pattern: "肝血不足・経筋拘急証（眼精疲労）",
      treatmentPrinciple: "滋補肝血・疏通経絡・清利頭目",
      primaryPoints: ["攅竹 (BL2)", "風池 (GB20)", "太衝 (LR3)"],
      secondaryPoints: ["太陽 (奇穴)", "光明 (GB37)", "三陰交 (SP6)", "百会 (GV20)"],
      formulaEquivalent: "杞菊地黄丸、四物湯",
    },
    clinicalExplanation: {
      pathomechanism: "「肝は目に開竅し、爪を華とし、筋を主る」。長時間の視覚酷使（久視）により肝血が枯渇。毛様体筋の調節疲労と後頭下筋群の攣縮が連動し、頭部への椎骨動脈循環不全を招いて目疾・首こりを慢性化させる。",
      differentialDiagnosis: "「緑内障発作」との鑑別：激しい眼痛・頭痛に加えて嘔吐・視力急低下がある場合は急性緑内障発作を疑い即眼科紹介が必要。",
      pointRationale: "攅竹（膀胱経）は眼窩上切痕に位置し網膜動脈血流を改善。光明（胆経絡穴）は下肢から目へ経気を通じる特効穴。風池で後頭下筋群を解放する。",
      clinicalPitfall: "眼窩内刺鍼（晴明・球後等）は球後出血・青あざ（内出血）を起こしやすい。攅竹・太陽などの安全な眼窩外縁穴を中心に施術すること。",
      classicCitation: "『素問・五蔵生成篇』：「諸血は皆目に属す…肝は血を得て能く視る。」",
    },
  },

  {
    id: "case-19-chronic-dry-cough",
    caseNumber: 19,
    title: "60代男性：長引く空咳・声がれ・夜間の咽頭乾燥感",
    subTitle: "肺陰虚・燥咳に対する滋陰潤肺配穴と古典治法",
    difficulty: "中級",
    category: "呼吸器・感染後",
    isFreeTrial: false,
    patient: {
      age: "63歳",
      gender: "男性",
      occupation: "大学教授（講義で声を多用）",
      chiefComplaint: "風邪をひいた後、痰の出ない乾いた咳（空咳）が2ヶ月間止まらない。",
      historyOfPresentIllness: "喉がカサカサに乾燥し、声がかすれる。夜間や話そうとした時に咳き込み、胸に鈍痛が走る。レントゲン・CT異常なし。",
      pastHistory: ["既往歴なし"],
      lifestyle: "エアコン暖房の使用、水分不足。",
    },
    examinations: {
      inspection: "皮膚乾燥、唇の乾燥。",
      tongueDiagnosis: { body: "紅（乾いている）", coating: "無苔〜剥落苔", shape: "細かい亀裂" },
      auscultationAndOlfaction: "かすれ声（嗄声）、コンコンという乾いた咳音。",
      inquiry: [{ question: "痰は出ますか？", answer: "痰はほとんど出ず、出てもごく少量で粘り気が強く出しにくいです。" }],
      palpation: { pulse: "細数脈", abdomen: "腹力中等度。", acupointReaction: "尺沢 (LU5)、太淵 (LU9)、照海 (KI6)、肺兪 (BL13) に反応。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "咳の性状と四診所見からの病態推論",
                question: "「風邪をひいた後、痰が出ない乾いた咳（空咳）が2ヶ月続く」「声がかれる」「舌質紅・無苔・細数脈」から読み解く病理はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "肺陰虚（はいいんきょ：感冒の余熱や発声過多で肺の津液が消耗し、燥熱が気道粘膜を刺激している）",
                            isCorrect: true,
                            feedback: "正解です。肺は「喜潤悪燥（潤いを好み乾燥を嫌う）」の臓です。陰液（水分）が枯渇して気道粘膜が乾き切っているため、わずかな刺激で激しい空咳が誘発されます。"
                      },
                      {
                            id: "opt-2",
                            label: "痰濁阻肺（湿痰が気道に溢れ出ている病態）",
                            isCorrect: false,
                            feedback: "ゴボゴボと大量の痰が出る病態であり、無痰の空咳である本例とは正反対です。"
                      },
                      {
                            id: "opt-3",
                            label: "風寒束肺（寒気により肺気が塞がれている急性期病態）",
                            isCorrect: false,
                            feedback: "悪寒や水様鼻汁、薄白苔を呈する感冒初期であり、2ヶ月続く無苔の乾咳とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "「金水相生」に基づく確定証の特定",
                question: "慢性咳嗽において、肺の陰液不足が下焦の腎に波及している（または腎陰虚から肺が潤されない）病態を指す確定証名はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "肺陰虚証（肺腎陰虚・燥咳）",
                            isCorrect: true,
                            feedback: "正解です。五行において肺（金）と腎（水）は母子の関係（金水相生）にあり、長引く空咳や声がれ、夜間の喉の乾燥は肺腎両方の陰液枯渇を示しています。"
                      },
                      {
                            id: "opt-2",
                            label: "脾胃気虚証",
                            isCorrect: false,
                            feedback: "食欲不振や泥状便が主体の消化器虚弱病態です。"
                      },
                      {
                            id: "opt-3",
                            label: "肝火犯肺証",
                            isCorrect: false,
                            feedback: "激しい怒りとともに咳き込み、胸脇部痛や喀血を伴う実火病態です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "滋陰潤肺の要穴処方と臨床注意点",
                question: "肺を潤して咳を鎮め、「金水相生」によって体液を回復させる最適な配穴と手技はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "太淵 (LU9：肺原穴) ＋ 尺沢 (LU5：肺合水穴) ＋ 照海 (KI6：八脈交会穴・陰蹻脈) への細鍼による微弱な補法刺鍼",
                            isCorrect: true,
                            feedback: "正解です。太淵で肺気を養い、尺沢（合水穴）で肺熱を冷まして下行させ、照海で腎水を汲み上げて喉を潤します。温灸の多用や強い発汗手技は陰液をさらに蒸発させるため避けます。"
                      },
                      {
                            id: "opt-2",
                            label: "大椎 (GV14) への強刺激刺絡瀉血とお灸の多壮",
                            isCorrect: false,
                            feedback: "津液をさらに焼き尽くし、乾燥と空咳を悪化させるため不適です。"
                      },
                      {
                            id: "opt-3",
                            label: "豊隆 (ST40) と中脘 (CV12) への強い瀉法",
                            isCorrect: false,
                            feedback: "湿痰を排泄する処方であり、潤いが不足している肺陰虚には乾燥を助長します。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "裏・虚・熱",
      pattern: "肺陰虚証（肺腎陰虚・燥咳）",
      treatmentPrinciple: "滋陰潤肺・止咳利咽・金水相生",
      primaryPoints: ["太淵 (LU9)", "尺沢 (LU5)", "照海 (KI6)"],
      secondaryPoints: ["肺兪 (BL13)", "膏肓 (BL43)", "列缺 (LU7)"],
      formulaEquivalent: "麦門冬湯、百合固金湯",
    },
    clinicalExplanation: {
      pathomechanism: "感冒後の余熱や発声過多により「嬌臓（デリケートな臓）」である肺の陰液が消耗。気道粘膜の線毛運動が乾燥により麻痺し、吸気刺激だけで咳反射が誘発される。",
      differentialDiagnosis: "「痰熱による咳嗽」との鑑別：痰熱は黄色い粘稠痰が大量に出る。本例は無痰であり「陰虚燥咳」である。",
      pointRationale: "太淵（肺原穴・脈会）は肺気を補い潤す。尺沢（肺合水穴）は「子を実すれば母を瀉す」および潤下作用で肺熱を冷ます。照海（腎経）と併用し「金水相生」で潤いを供給する。",
      clinicalPitfall: "強い発汗手技や温熱刺激は肺陰をさらに焼灼する。刺鍼は浅く細い鍼を用い、喉の乾燥感を和らげる手技に徹すること。",
      classicCitation: "『医門法律』：「燥の勝るや、気管を乾かし、皮膚を燥らし、肺を熏じて咳嗽を為す。」",
    },
  },

  {
    id: "case-20-bells-palsy",
    caseNumber: 20,
    title: "50代女性：顔面神経麻痺初期・口角の下垂・閉眼不全（ベル麻痺）",
    subTitle: "風邪外襲と気血不足による面癱（めんたん）の早期神経賦活",
    difficulty: "上級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "51歳",
      gender: "女性",
      occupation: "パート勤務",
      chiefComplaint: "朝起きたら右の口から水がこぼれ、右目が完全に閉じない（閉眼不全）。",
      historyOfPresentIllness: "3日前に風邪気味で窓を開けて就寝。翌朝、右側の顔面筋肉が麻痺。味覚低下あり。耳鼻科でベル麻痺と診断されステロイド内服開始と同時に来院。",
      pastHistory: ["特記事項なし"],
      lifestyle: "疲労蓄積、寝不足。",
    },
    examinations: {
      inspection: "右前額部の皺寄せ不能、右兎眼（Bell現象陽性）、右口角下垂、ほうれい線の消失。",
      tongueDiagnosis: { body: "淡紅", coating: "薄白苔", shape: "やや胖大" },
      auscultationAndOlfaction: "発音（パ行・マ行）の息漏れあり。",
      inquiry: [{ question: "耳の後ろの痛みは？", answer: "麻痺が出る前日から、右耳の後ろ（乳様突起周辺）がズキズキ痛んでいました。" }],
      palpation: { pulse: "浮緩脈または弦脈", abdomen: "正常。", acupointReaction: "翳風 (TE17)、風池 (GB20)、陽白 (GB14)、地倉 (ST4) に反応。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "面癱（顔面神経麻痺）の病因病機の特定",
                question: "「風邪気味で窓を開けて寝た翌朝、口から水がこぼれ、目が閉じなくなった」ベル麻痺の東洋医学的発症機序はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "風寒外襲・気血阻滞（過労による気血の虚に乗じて外来の風寒邪が顔面の経絡に侵入し、経筋が麻痺・拘急した面癱）",
                            isCorrect: true,
                            feedback: "正解です。正気が弱まった隙に風寒の邪が手足陽明経・少陽経を襲い、茎乳突孔周囲での顔面神経浮腫と虚血をもたらして弛緩性麻痺を引き起こしています。"
                      },
                      {
                            id: "opt-2",
                            label: "肝陽上亢による中風中臓腑（脳出血）",
                            isCorrect: false,
                            feedback: "意識障害や片麻痺を伴う中枢性病態であり、単なる末梢の表情筋麻痺とは異なります。"
                      },
                      {
                            id: "opt-3",
                            label: "脾気虚による肌肉萎縮",
                            isCorrect: false,
                            feedback: "全身の筋力が徐々に衰える慢性病態であり、一晩で急性発症する面癱とは異なります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "中枢性麻痺との鑑別と確定証の特定",
                question: "本症例を「脳卒中（中枢性顔面麻痺）」と鑑別し、「末梢性顔面神経麻痺（ベル麻痺・面癱）」と確定できる臨床的所見はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "「前額部の皺寄せ不能」および「完全な閉眼不全（兎眼・Bell現象）」がみられる点",
                            isCorrect: true,
                            feedback: "正解です。中枢性麻痺では前額部の筋肉（前頭筋）の神経支配が両側性であるため額の皺寄せが保たれますが、末梢性麻痺では前額部も含めた顔面半側全体が完全に麻痺します。"
                      },
                      {
                            id: "opt-2",
                            label: "半身の運動麻痺としびれ、言語障害（失語）を伴う点",
                            isCorrect: false,
                            feedback: "中枢性脳卒中の所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "口角は下がるが、目は完全に閉じることができる点",
                            isCorrect: false,
                            feedback: "中枢性麻痺の典型的な特徴です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "経絡選定と急性期の刺鍼禁忌・臨床安全管理",
                question: "麻痺側の神経浮腫を改善するための要穴処方と、発症初期（2週間以内）に絶対に避けるべき手技はどれか？",
                options: [
                      {
                            id: "opt-1",
                            label: "翳風 (TE17：顔面神経幹部) ＋ 地倉 (ST4) ＋ 陽白 (GB14) ＋ 合谷 (LI4：面目の主穴) を用い、急性期局所への強刺激低周波パルス通電を回避する",
                            isCorrect: true,
                            feedback: "正解です。翳風で神経幹の血流を回復し、合谷（四総穴）で顔面の気血を巡らせます。ただし発症初期の急性炎症期に局所へ強い電気パルスを行うと、神経変性を助長し「病的共同運動」や「病的拘縮」などの重篤な後遺症を誘発するため厳禁です。"
                      },
                      {
                            id: "opt-2",
                            label: "発症直後から顔面の麻痺筋に太い針を刺し、最強強度の低周波パルスで筋肉を大きく痙攣させ続ける",
                            isCorrect: false,
                            feedback: "病的共同運動（口を動かすと目が閉じる等）の後遺症を不可逆的に引き起こすリスクが高いため絶対禁忌です。"
                      },
                      {
                            id: "opt-3",
                            label: "顔面には一切アプローチせず、足三里だけにお灸をすえる",
                            isCorrect: false,
                            feedback: "合谷や翳風への適切な微弱刺激による早期の神経虚血改善が予後を大きく左右します。"
                      }
                ]
          }
    ],
    correctDiagnosis: {
      hachiko: "表・実・虚実挟雑",
      pattern: "風寒外襲・気血鬱滞証（面癱・末梢性顔面神経麻痺）",
      treatmentPrinciple: "祛風通絡・疎調気血・温経活血（早期浅刺・パルス併用注意）",
      primaryPoints: ["翳風 (TE17)", "地倉 (ST4)", "陽白 (GB14)"],
      secondaryPoints: ["合谷 (LI4：面目口歯の主穴)", "風池 (GB20)", "下関 (ST7)", "頬車 (ST6)"],
      formulaEquivalent: "牽正散（けんせいさん）、葛根湯合補中益気湯",
    },
    clinicalExplanation: {
      pathomechanism: "過労により生体の防衛力（衛気・気血）が低下した間隙に、風寒の邪気が顔面の手足陽明経・少陽経に直撃。茎乳突孔内での顔面神経浮腫と虚血が生じ、軸索変性をきたして顔面表情筋が弛緩性麻痺に陥る。",
      differentialDiagnosis: "「中枢性顔面麻痺（脳梗塞等）」との鑑別：中枢性は前額筋が保たれ（額の皺寄せが可能）、下垂体症状を伴う。本例は前額筋も麻痺しており典型的な末梢性麻痺。",
      pointRationale: "翳風（顔面神経幹が頭蓋から出る茎乳突孔直上）への刺鍼は神経幹の血流を回復させる最重要穴。合谷は「面目合谷に収む」の四総穴として顔面の気血を強力に開通させる。",
      clinicalPitfall: "発症初期（2週間以内）の急性炎症期に顔面局所へ強刺激の低周波通電（パルス）を行うと、神経の異常共同運動や病的拘縮（病的後遺症）を誘発するリスクがある。初期は微弱な無通電刺鍼や温罨法にとどめること。",
      classicCitation: "『霊枢・経筋篇』：「足の陽明の筋…その病、卒口僻、目開けば合せず、熱すれば筋縦みて目開かず。」",
    },
  },
];
