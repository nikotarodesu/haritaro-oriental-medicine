import { ClinicalCase } from "@/types/clinicalCase";

const CASE_MODELS: ClinicalCase[] = [
  // ==========================================
  // 症例 1: 無料体験 1 (自律神経・頭痛)
  // ==========================================
  {
    id: "case-01-headache-liver-fire",
    caseNumber: 1,
    title: "30代女性：激しい側頭痛とイライラ・目の充血",
    subTitle: "こめかみの拍動する痛みと目の充血から、先に確認することと弁証の候補を考える",
    difficulty: "初級",
    category: "自律神経・メンタル",
    isFreeTrial: true,
    patient: {
      age: "34歳",
      gender: "女性",
      occupation: "IT企業企画職（長時間のPC作業）",
      chiefComplaint: "右のこめかみが強くズキズキして、目も赤くなります。いらいらすることが増えました。",
      historyOfPresentIllness: {
        entries: [
          { when: "半年前", description: "昇進して仕事が増えた。" },
          { when: "約1か月前", description: "強い頭痛を繰り返すようになった。" },
          { when: "現在", description: "腹が立ったときや仕事が立て込むときに痛みが強まるという。市販の鎮痛薬が以前より効きにくい。" },
        ],
        context: "耳鳴りと口の苦さもある。",
      },
      pastHistory: ["特記事項なし"],
      lifestyle: "寝るのは毎日、午前1時を過ぎてからです。夕食は遅く、脂っこいものや辛いものをよく食べます。コーヒーは1日4杯飲みます。",
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
        pulseDetail: "弦を張ったような張りがあり、速い脈として記録された。",
        abdomen: "両側の胸脇苦満が顕著。季肋下に強い抵抗と圧痛がある。",
        acupointReaction: "太衝（LR3）、行間（LR2）、風池（GB20）に顕著な過敏圧痛。",
      },
    },
    reasoningSteps: [
      {
        stepNumber: 1,
        stepTitle: "八綱で熱と実を考える",
        question: "口の苦さや便秘もあり、顔が赤く、舌に黄色い苔が付いています。張りのある速い脈も合わせると、八綱ではどの組み合わせに近いですか。",
        options: [
          { id: "opt-1", label: "裏・熱・実（り・ねつ・じつ）", isCorrect: true, feedback: "口の苦さや便通の変化もあるため、ここでは体の内側の状態を考える「裏」を選びます。顔の赤みと黄苔は「熱」、脈の張りは「実」を考える材料です。" },
          { id: "opt-2", label: "表・寒・虚（ひょう・かん・きょ）", isCorrect: false, feedback: "「寒」を考えるなら、冷えや温めたときの変化を確かめます。この記録では顔の赤み、口の苦さ、黄苔が手がかりです。" },
          { id: "opt-3", label: "裏・寒・実（り・かん・じつ）", isCorrect: false, feedback: "「裏・実」を考える材料はあります。顔と舌の赤み、脈が速いこと、冷やすと少し楽だという話は、ここでは「熱」に結びつけます。" },
        ],
      },
      {
        stepNumber: 2,
        stepTitle: "頭痛と胸脇部の所見を合わせる",
        question: "こめかみの拍動する痛みに、目の充血、口の苦さ、肋骨の下の張りもあります。この組み合わせから考える証はどれですか。",
        options: [
          { id: "opt-1", label: "脾虚湿痰証（ひきょしつたんしょう）", isCorrect: false, feedback: "脾虚湿痰を比べるなら、頭の重さや胃腸の訴えにも注目します。この記録では、こめかみの拍動と目の充血が目立ちます。" },
          { id: "opt-2", label: "肝火上炎証（かんかじょうえんしょう）", isCorrect: true, feedback: "こめかみの痛みだけで決めず、目の充血、口の苦さ、肋骨の下の張りも合わせて肝火上炎を考えます。頭痛の原因は医療機関での評価が必要です。" },
          { id: "opt-3", label: "腎陰虚証（じんいんきょしょう）", isCorrect: false, feedback: "陰虚を考えるなら、寝汗や舌苔の少なさなども確かめます。この症例に書かれているのは、舌の赤みとやや厚い黄苔です。" },
        ],
      },
      {
        stepNumber: 3,
        stepTitle: "肝火上炎を考えたときの治法",
        question: "肝火上炎を候補とし、赤い舌、黄色い舌苔、口の苦さを熱の所見と読んだ場合、どの治法に当たりますか。",
        options: [
          { id: "opt-1", label: "清肝瀉火・降逆熄風（肝の火熱を冷まし、上逆した気を引き下ろす）", isCorrect: true, feedback: "肝の火を抑えるという伝統的な方針が清肝瀉火です。「降逆」は上に向かうとされる気を下ろす考え方で、血流を測った結果を表す言葉ではありません。" },
          { id: "opt-2", label: "健脾補気・温陽利水（胃腸を補い、体を温めて水分を巡らす）", isCorrect: false, feedback: "温陽利水は、冷えや水分に関する所見を手がかりに考える治法です。この問題で挙がっているのは、赤い舌や黄苔など熱を考える所見です。" },
          { id: "opt-3", label: "滋陰潜陽・補益肝腎（潤いを補って陽の高ぶりを沈める）", isCorrect: false, feedback: "滋陰潜陽ではまず陰の不足を考えます。この例では、少ない舌苔よりも、赤い舌にやや厚い黄苔があることを重く見ます。" },
        ],
      },
      {
        stepNumber: 4,
        stepTitle: "清肝瀉火の配穴例",
        question: "清肝瀉火・降逆の方針に沿うツボの組み合わせはどれですか。",
        options: [
          { id: "opt-1", label: "足三里 (ST36) ＋ 陰陵泉 (SP9)", isCorrect: false, feedback: "足三里と陰陵泉は、ここでは脾胃と湿を考えるときの比較例です。" },
          { id: "opt-2", label: "関元 (CV4) ＋ 命門 (GV4)", isCorrect: false, feedback: "関元と命門は温補を考える例です。ツボの名前と一緒に、温める方針か、熱を抑える方針かを比べます。" },
          { id: "opt-3", label: "行間 (LR2) ＋ 太衝 (LR3) ＋ 風池 (GB20)", isCorrect: true, feedback: "行間は肝経の滎火穴、太衝は肝経の原穴です。教材ではこの二穴に、首の後ろにある風池を合わせています。" },
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
      pathomechanism: "目の赤み、口の苦さ、こめかみの拍動する痛みを、肝火上炎の説明と照らします。ここでいう「火」は伝統医学の言葉です。頭痛や目の症状の原因は医療機関で確認します。",
      observations: [
        { target: "complaint", label: "こめかみの痛みの訴え" },
        { target: "inspection", label: "目の充血と顔色" },
        { target: "history", label: "頭痛の経過と口の苦さ" },
      ],
      differentialDiagnosis: "肝陽上亢を比べるなら、長く続く腰のだるさや舌苔の少なさなど、陰虚を考える所見も聞きます。この例では、黄色く乾いた舌苔と便秘があり、熱の強さを考えます。",
      pointRationale: "行間と太衝は同じ肝経で、清肝瀉火を読むときに比べる二穴です。頭や首で位置を調べる例として、風池や太陽も挙げています。",
      clinicalPitfall: "新しく増悪する頭痛と眼の充血を、ストレスや肝火だけで説明しない。突然の激痛、意識・言語・手足の異常があるときは、すぐに119番へ連絡してください。急な強い眼痛や見え方の変化も緊急評価を優先し、遠隔穴への施術の反応を待たない。",
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
    subTitle: "食後の眠気と下痢が続く相談で、疲れ方や便の状態を脾胃気虚の説明と照らし合わせる",
    difficulty: "初級",
    category: "消化器・脾胃",
    isFreeTrial: true,
    patient: {
      age: "42歳",
      gender: "男性",
      occupation: "事務職",
      chiefComplaint: "昼ごはんの後は眠くて起きていられないくらいです。体が重くて、軟らかい便も続いています。",
      historyOfPresentIllness: {
        entries: [
          { when: "半年前から", description: "食後に強い眠気と胃もたれがある。" },
          { when: "ここ3か月", description: "体重が2 kg減った。" },
        ],
        context: "朝から疲れが残り、少し動くと汗が出るという。泥状の便は1日2〜3回。",
      },
      pastHistory: ["胃十二指腸潰瘍（10年前）"],
      lifestyle: "朝食は抜くことが多く、昼食は丼ものや麺類を急いで食べます。冷たい清涼飲料水をよく飲みます。",
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
        pulseDetail: "脈の力が弱い。右手首の関の位置では、押すと脈が弱く触れる。",
        abdomen: "腹力は弱く、中脘・天枢周辺では圧迫したときの抵抗が乏しい。腹証として心下振水音・小腹不仁が記録されている。",
        acupointReaction: "足三里 (ST36)、脾兪 (BL20)、中脘 (CV12) に虚の陥下反応。",
      },
    },
    reasoningSteps: [
      {
        stepNumber: 1,
        stepTitle: "食後の疲れを八綱で読む",
        question: "食後に疲れが強まり、舌の色は淡く歯の跡があり、脈も弱いと記録されています。八綱で考えるとどれに近いですか。",
        options: [
          { id: "opt-1", label: "裏・虚（寒熱は追加確認）", isCorrect: true, feedback: "食後の疲れや便の変化を体の内側の所見と捉え、脈の弱さも合わせて「裏・虚」を考えます。寒熱を分けるには、冷えや温めたときの変化も聞きます。" },
          { id: "opt-2", label: "表・実・熱（ひょう・じつ・ねつ）", isCorrect: false, feedback: "急に始まった悪寒や発熱の例とは経過が違います。食後の疲れが続き、脈も弱い点に注目します。" },
          { id: "opt-3", label: "裏・実・熱（り・じつ・ねつ）", isCorrect: false, feedback: "張りの訴えだけなら候補は絞れません。食後のだるさと、舌の色、脈の弱さまで読んで選び直します。" },
        ],
      },
      {
        stepNumber: 2,
        stepTitle: "脾胃気虚と中気下陥の手がかり",
        question: "食後の疲れや軟便に、おなかが下がるような感覚も加わっています。この組み合わせにはどの説明が合いますか。",
        options: [
          { id: "opt-1", label: "脾胃気虚・中気下陥証（ひいききょ・ちゅうきげかんしょう）", isCorrect: true, feedback: "食後に疲れること、軟便、弱い脈を脾胃気虚の所見と照らします。「下がる感じ」という訴えが、中気下陥も比べる理由です。実際の臓器の位置はこの記録からは分かりません。" },
          { id: "opt-2", label: "大腸湿熱証（だいちょうしつねつしょう）", isCorrect: false, feedback: "大腸湿熱を比べるときは、便のにおいや、便が残った感じがあるかも聞きます。ここでは、続く疲れと脈の弱さが目立ちます。" },
          { id: "opt-3", label: "肝気犯胃証（かんきはんいしょう）", isCorrect: false, feedback: "食後の疲れや軟便に加え、舌の色と脈の弱さまで読むと、脾胃気虚を候補にする理由がそろいます。" },
        ],
      },
      {
        stepNumber: 3,
        stepTitle: "補気・昇提の配穴例",
        question: "伝統医学で、食後の疲れと下がる感じを「補気・昇提」の方針で扱う配穴例はどれですか。",
        options: [
          { id: "opt-1", label: "足三里 (ST36) ＋ 中脘 (CV12) ＋ 百会 (GV20) ＋ 脾兪 (BL20)", isCorrect: true, feedback: "足三里と中脘、脾兪は脾胃の働きに関連づけます。百会を加える理由は「昇提」、つまり下がったとみるものを上げるという伝統的な考え方です。" },
          { id: "opt-2", label: "行間 (LR2) ＋ 侠渓 (GB43)", isCorrect: false, feedback: "行間と侠渓は肝胆の熱を考える選択肢です。ここでは、脾胃と昇提の両方に対応する組を探します。" },
          { id: "opt-3", label: "委中 (BL40) ＋ 委陽 (BL39)", isCorrect: false, feedback: "委中と委陽はひざ裏にあります。この設問では位置ではなく、脾胃と昇提をどう組み合わせるかを問うています。" },
        ],
      },
    ],
    correctDiagnosis: {
      hachiko: "裏・虚（寒熱は未確認）",
      pattern: "脾胃気虚証（中気下陥）",
      treatmentPrinciple: "健脾益気・昇陽挙陥（補法・温灸併用）",
      primaryPoints: ["足三里 (ST36)", "中脘 (CV12)", "百会 (GV20)"],
      secondaryPoints: ["脾兪 (BL20)", "胃兪 (BL21)", "気海 (CV6)"],
      formulaEquivalent: "補中益気湯、六君子湯",
    },
    clinicalExplanation: {
      pathomechanism: "食後に疲れること、軟便、淡い舌や弱い脈から、脾気虚を候補にします。冷えの有無や温めたときの変化は、寒熱を考えるために別に確認します。",
      observations: [
        { target: "history", label: "食後の眠気と便の状態" },
        { target: "tongue", label: "舌の色と歯の跡" },
        { target: "palpation", label: "脈の強さ" },
      ],
      differentialDiagnosis: "冷えで急に胃が痛くなる例と比べると、ここでは何か月も続く食後の眠気、軟便、歯の跡がある舌が手がかりになります。胃の症状だけで証を選びません。",
      pointRationale: "足三里・中脘・脾兪を脾胃の働きと関連づけます。百会を加えるのは、下がるような感覚を「昇提」の考え方と照らした例です。",
      clinicalPitfall: "持続する疲労・軟便の受診状況、発熱・体重減少・出血・脱水などを確認する。脾気虚や舌脈の所見から、病気や免疫機能の低下を確定・除外しない。症状が続く場合は受診につなげる。",
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
    subTitle: "月経時の刺す痛みと手足の冷えを聞き、寒と瘀血を考えた理由を説明する",
    difficulty: "初級",
    category: "婦人科・女性医学",
    isFreeTrial: true,
    patient: {
      age: "26歳",
      gender: "女性",
      occupation: "アパレル販売（立ち仕事・冷房環境）",
      chiefComplaint: "月経が始まって二日くらい、起き上がれないほど下腹部が痛みます。血に大きな塊が混じります。",
      historyOfPresentIllness: {
        entries: [
          { when: "高校生の頃から", description: "月経痛がある。" },
          { when: "今の仕事に就いてから", description: "冷房の効いた職場で立つ仕事になり、痛みが強くなったと話す。" },
        ],
        context: "下腹部を絞られるように痛み、温めると少し楽になる。経血は暗い色で粘りがある。",
      },
      pastHistory: ["子宮内膜症疑い（クリニック受診歴あり）"],
      lifestyle: "スカートをはくことが多く、足首が冷えると感じています。冬は靴下を重ねてはきます。入浴はシャワーで済ませることが多いです。",
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
        pulseDetail: "脈は沈んで遅い。滑らかさの乏しい渋脈の所見もある。",
        abdomen: "下腹部（特に左少腹部、天枢の下方）に索状の硬結と圧痛あり（腹証：小腹急結・瘀血腹証）。",
        acupointReaction: "三陰交 (SP6)、血海 (SP10)、地機 (SP8)、関元 (CV4) に硬結と強圧痛。",
      },
    },
    reasoningSteps: [
      {
        stepNumber: 1,
        stepTitle: "冷えと刺すような月経痛を読む",
        question: "月経中に下腹部が刺すように痛み、経血に塊があります。手足が冷え、温めると少し楽になる場合、どの候補を考えますか。",
        options: [
          { id: "opt-1", label: "寒凝血瘀（かんぎょうけつお：冷えによる血の滞り）", isCorrect: true, feedback: "温めると楽になる点を「寒」、刺すような痛みや暗紫色の舌を「瘀血」の手がかりとします。寒凝血瘀はこの二つを合わせた伝統医学の説明です。" },
          { id: "opt-2", label: "気血両虚（きけつりょうきょ：栄養と気力の不足）", isCorrect: false, feedback: "気血両虚を考えるときは疲れや顔色なども確かめます。この症例で目立つのは、刺すような痛み、経血の塊と冷えです。" },
          { id: "opt-3", label: "湿熱下注（しつねつかちゅう：下焦の炎症・熱）", isCorrect: false, feedback: "熱の所見を探すなら、何で悪化するかも確認します。この記録では温めると楽になり、舌は暗紫色です。" },
        ],
      },
      {
        stepNumber: 2,
        stepTitle: "脾経の郄穴を調べる",
        question: "地機・陰陵泉・足三里のうち、脾経の郄穴（げきけつ）に分類されるのはどれですか。",
        options: [
          { id: "opt-1", label: "地機 (SP8：脾経の郄穴)", isCorrect: true, feedback: "地機（SP8）は脾経の郄穴です。ここで比べているのはツボの分類で、月経痛への効き方ではありません。" },
          { id: "opt-2", label: "陰陵泉 (SP9：脾経の合穴)", isCorrect: false, feedback: "陰陵泉（SP9）は脾経の合穴です。同じ脾経の郄穴には地機（SP8）があります。" },
          { id: "opt-3", label: "足三里 (ST36：胃経の合穴)", isCorrect: false, feedback: "足三里（ST36）は胃経の合穴です。名前と一緒に、それぞれがどの経絡に属するかを確認します。" },
        ],
      },
      {
        stepNumber: 3,
        stepTitle: "寒と瘀血を考えたときの配穴例",
                question: "月経時の痛みと冷えを考える例です。冷えを和らげ、血の滞りに働きかけると考える伝統的な方針「温経散寒・活血化瘀」に沿う三つのツボはどれですか。",
        options: [
          { id: "opt-1", label: "三陰交 (SP6) ＋ 関元 (CV4) ＋ 血海 (SP10)", isCorrect: true, feedback: "関元は温補、血海は活血化瘀の考え方から選び、肝・脾・腎の交会穴である三陰交を合わせます。月経痛に対する効果を読むには、条件のそろった比較試験が必要です。" },
          { id: "opt-2", label: "合谷 (LI4) ＋ 曲池 (LI11)", isCorrect: false, feedback: "合谷と曲池は手の陽明大腸経の組です。この問題では冷えと瘀血の両方を考えた配穴を探します。" },
          { id: "opt-3", label: "崑崙 (BL60) ＋ 後谿 (SI3)", isCorrect: false, feedback: "崑崙と後谿を使う頭や背の例とは、今回選ぶ理由が違います。温補に対応するツボと、瘀血に対応するツボの両方を確認します。" },
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
      pathomechanism: "温めると楽になることを「寒」、刺すような痛みと暗紫色の舌を「瘀血」の手がかりとします。職場の冷房が月経痛の原因だと、この記録だけで決めることはできません。",
      observations: [
        { target: "history", label: "痛みの経過と温めたときの変化" },
        { target: "tongue", label: "舌の暗い紫色" },
      ],
      differentialDiagnosis: "気滞血瘀を比べるなら、月経前に胸や乳房が張るか、緊張する日に痛みが変わるかも聞きます。この症例で寒凝血瘀を挙げる理由は、冷えの訴えと温めた後の変化です。",
      pointRationale: "関元を温補、血海を活血化瘀に関連づけます。地機は脾経の郄穴です。この分類だけから、月経痛への効き方や変化の速さは分かりません。",
      clinicalPitfall: "生活に支障をきたす月経痛と子宮内膜症疑いは婦人科での評価を優先する。妊娠の可能性がある腹痛・出血を月経痛と決めない。多量の出血、激痛、失神があるときは、すぐに119番へ連絡してください。最終月経日の確認だけで妊娠を除外しない。",
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
    subTitle: "ほてりと寝汗に、舌苔の少なさや脈の所見を合わせて、実熱と陰虚による熱を比べる",
    difficulty: "中級",
    category: "婦人科・女性医学",
    isFreeTrial: false,
    patient: {
      age: "52歳",
      gender: "女性",
      occupation: "公務員",
      chiefComplaint: "急に上半身がほてって汗が出ます。寝ている間も汗で起きてしまい、着替えることがあります。",
      historyOfPresentIllness: {
        entries: [
          { when: "1年前の閉経から", description: "顔が赤くなるほどのほてりが1日に十数回ある。" },
          { when: "夜、眠っている間", description: "首から上の汗で目を覚まし、着替えが必要なこともある。" },
        ],
        context: "手のひらと足の裏のほてり、めまい、腰のだるさもある。几帳面で、物事をきちんと終わらせようとすることが多い。",
      },
      pastHistory: ["軽度骨粗鬆症指摘"],
      lifestyle: "カフェインを含む飲み物を好みます。",
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
        pulseDetail: "糸のように細く、速い脈として記録された。",
        abdomen: "腹力中等度以下。臍下不仁（臍の下が力なくへこむ）。",
        acupointReaction: "太谿 (KI3)、照海 (KI6)、復溜 (KI7)、神門 (HT7) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "ほてりと寝汗を所見と合わせる",
                question: "手のひらと足の裏がほてり、寝汗があります。舌は赤く舌苔が少なく、脈が細く速い場合、どの候補に近いですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "陰虚火旺（いんきょかおう：体の潤い不足による虚熱）",
                            isCorrect: true,
                            feedback: "ほてりと寝汗だけで決めず、舌苔の少なさ、脈の細さも合わせます。この記録では「陰虚火旺」を考える材料がそろいます。"
                      },
                      {
                            id: "opt-2",
                            label: "外感風熱（がいかんふうねつ：風邪による熱）",
                            isCorrect: false,
                            feedback: "風熱を比べるなら症状の始まり方も読みます。この例で手がかりになるのは、繰り返す寝汗とほてり、舌苔の少なさです。"
                      },
                      {
                            id: "opt-3",
                            label: "気滞血瘀（きたいけつお：血行不良）",
                            isCorrect: false,
                            feedback: "瘀血を考えるときの紫がかった舌や、同じ場所を刺すように痛むという訴えは、この記録の中心ではありません。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "肝火上炎と陰虚火旺を比べる",
                question: "同じ「のぼせ」でも、実熱と陰虚による熱では見方が変わります。この記録で陰虚を考える手がかりはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "舌苔が薄く剥落した少苔〜無苔（鏡面舌傾向）であり、脈が細数脈である点",
                            isCorrect: true,
                            feedback: "舌苔が少なく、脈にも強さより細さが目立ちます。実熱を考えるときの厚い黄苔などと比べると、陰虚を候補にする理由が分かります。"
                      },
                      {
                            id: "opt-2",
                            label: "激しい頭痛と目の充血が主訴である点",
                            isCorrect: false,
                            feedback: "激しい頭痛や目の充血はこの記録の主訴にありません。寝汗、手足のほてり、舌苔と脈を見直します。"
                      },
                      {
                            id: "opt-3",
                            label: "冷たい水をがぶがぶ大量に飲みたがる点",
                            isCorrect: false,
                            feedback: "飲む量はメモに出ています。この例では、口を潤す程度を欲するという記録です。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "陰を補う治法に対応する配穴例",
                question: "ほてりと寝汗を陰虚火旺の候補として考えた場合、養陰の方針に沿う組み合わせはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "太谿（KI3）・照海（KI6）・神門（HT7）・復溜（KI7）",
                            isCorrect: true,
                            feedback: "太谿と照海は腎の陰を補う目的、神門は安神、復溜は汗の訴えと関連づける例です。下の偽鍼対照試験で実際に比べた方法も確認してください。"
                      },
                      {
                            id: "opt-2",
                            label: "大椎（GV14）・曲池（LI11）",
                            isCorrect: false,
                            feedback: "冷ます方針の例として比べます。この症例では、ほてりに加えて舌苔が少ないことなどから陰の不足も考えています。"
                      },
                      {
                            id: "opt-3",
                            label: "関元（CV4）・命門（GV4）",
                            isCorrect: false,
                            feedback: "関元と命門は温補を考えるときの例です。この設問で問うのは陰を補う考え方です。"
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
      pathomechanism: "のぼせと寝汗だけで決めず、舌苔が少なく、脈が細く速いことから陰虚火旺を考えます。のぼせの原因やホルモンの状態は、舌や脈からは分かりません。",
      observations: [
        { target: "history", label: "ほてりと寝汗" },
        { target: "tongue", label: "舌苔の量" },
        { target: "palpation", label: "脈の細さと速さ" },
      ],
      differentialDiagnosis: "実熱の教材例と比べるときは、舌苔の厚さや色、脈の太さと力、口が渇いたときに飲む量を見ます。この記録には、舌苔の少なさと脈の細さがあります。",
      pointRationale: "太谿と照海は陰を補う考え方、神門は安神、復溜は汗の訴えから挙げています。下の研究で比較した方法が、この配穴例と同じかも確認できます。",
      clinicalPitfall: "のぼせ、寝汗、動悸を年齢や陰虚だけで説明しない。持続する症状の医療機関で何を調べたか確かめ、新しい胸痛・呼吸困難があるときは、すぐに119番へ連絡してください。閉経後の出血があれば少量でも婦人科での評価が必要。",
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
    subTitle: "夜に目が覚めたときの不安や動悸から、心腎不交を候補に挙げる理由を考える",
    difficulty: "中級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "47歳",
      gender: "女性",
      occupation: "看護師（夜勤あり）",
      chiefComplaint: "夜中に何度も目が覚めます。胸がざわざわして、強い不安を感じます。",
      historyOfPresentIllness: {
        entries: [
          { when: "2年前から", description: "ぐっすり眠れた感じがない。不規則な時間帯に夜勤がある。" },
          { when: "最近", description: "午前2〜3時ごろに動悸で目が覚め、その後は朝まで眠れない。" },
        ],
        context: "物忘れ、耳鳴り、手足のほてりも訴える。",
      },
      pastHistory: ["特記事項なし"],
      lifestyle: "夜勤明けになかなか寝付けず、眠るためにお酒を飲むことがあります。",
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
        pulseDetail: "寸では浅いところで速く触れ、尺では深いところで弱く触れた。",
        abdomen: "心下痞および臍上動悸（腹部大動脈の拍動が強く触れる）。",
        acupointReaction: "神門 (HT7)、内関 (PC6)、太谿 (KI3)、心兪 (BL15) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "夜に目が覚めるときの所見を読む",
                question: "夜に目が覚めて動悸があり、舌先は赤く小さな点が見られます。教材ではどの候補と照らし合わせますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "心火偏亢（しんかへんこう）",
                            isCorrect: true,
                            feedback: "舌先の赤みと点、動悸、途中で目が覚めることを合わせて心火を考えます。「火」はこの伝統的な見方で使う表現です。"
                      },
                      {
                            id: "opt-2",
                            label: "脾胃湿熱（ひいしつねつ：中焦の湿熱停滞）",
                            isCorrect: false,
                            feedback: "脾胃湿熱と比べるなら、厚い黄苔や食後の訴えも確かめます。ここでは舌の先の赤みと夜間の動悸に注目します。"
                      },
                      {
                            id: "opt-3",
                            label: "痰迷心竅（たんめいしんきょう：痰濁が心を覆う）",
                            isCorrect: false,
                            feedback: "痰迷心竅は、伝統的に意識の変化などと関連づける言葉です。この症例の訴えは、夜に目が覚めることや動悸です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "心脾両虚と心腎不交を見比べる",
                question: "夜中に目が覚めることに加え、この記録のどの所見から心腎不交を候補に挙げますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "手のひらや足の裏がほてり、舌先が赤く、脈が細く速い",
                            isCorrect: true,
                            feedback: "この例では、夜間の覚醒と動悸に、手足のほてりと細く速い脈が重なります。心脾両虚を比べるときには、食欲や疲れ、舌の色も確認します。"
                      },
                      {
                            id: "opt-2",
                            label: "本症例は日中に食欲不振と泥状下痢を頻発している点",
                            isCorrect: false,
                            feedback: "この症例で示された所見を選ぶ問題です。食欲不振や泥状の便が頻発するという記録はありません。"
                      },
                      {
                            id: "opt-3",
                            label: "本症例は起床時に頭重感と悪心を強く訴えている点",
                            isCorrect: false,
                            feedback: "起床時の頭重感と吐き気は、この症例の記録に挙がっていません。夜間の訴えと舌・脈の項目を読み直します。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "交通心腎の配穴例",
                question: "心と腎の働きを関連づける「交通心腎」の配穴例として、この問題で選ぶ組み合わせはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "神門 (HT7) ＋ 太谿 (KI3) ＋ 内関 (PC6) ＋ 三陰交 (SP6)",
                            isCorrect: true,
                            feedback: "神門と内関は安神、太谿と三陰交は滋陰の考え方に対応します。実際の不眠では、夜に目を覚ます回数や日中の支障、服薬なども確認します。"
                      },
                      {
                            id: "opt-2",
                            label: "合谷 (LI4) ＋ 太衝 (LR3) ＋ 豊隆 (ST40)",
                            isCorrect: false,
                            feedback: "合谷と太衝の組は四関穴です。豊隆を足した例と、安神と滋陰を合わせる今回の例を比べます。"
                      },
                      {
                            id: "opt-3",
                            label: "足三里 (ST36) ＋ 脾兪 (BL20) ＋ 中脘 (CV12)",
                            isCorrect: false,
                            feedback: "足三里・脾兪・中脘は脾胃の働きに着目する組です。設問の「交通心腎」と、脾胃を補う目的を分けて考えます。"
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
      pathomechanism: "夜に目が覚めることや動悸に、手のひら・足の裏のほてり、舌先の赤みを合わせて心腎不交を考えます。いつ目が覚めるか、翌日に何がつらいか、服薬の状況は見立てと別に確認します。",
      observations: [
        { target: "history", label: "動悸で目が覚める時間" },
        { target: "tongue", label: "舌先の赤み" },
      ],
      differentialDiagnosis: "心脾両虚を見比べるなら、食欲の低下や日中の疲れ、舌の色も聞き取ります。ここでは寝つきより、夜中に動悸で目を覚ます訴えが中心です。",
      pointRationale: "神門と内関を安神、太谿と三陰交を滋陰の考え方で挙げます。何時ごろ目が覚めたか、翌日の仕事に支障があったかは、配穴の名前とは別に記録します。",
      clinicalPitfall: "不眠の経過、日中の支障、服薬や他の病気を確認する。睡眠薬は自己判断で中止・減量させず、変更は処方医に相談する。動悸に新しい胸痛・呼吸困難や失神があれば救急評価を優先する。",
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
    subTitle: "胸やけと酸っぱいものが上がる訴えを読み、胃気上逆という伝統的な説明を考える",
    difficulty: "中級",
    category: "消化器・脾胃",
    isFreeTrial: false,
    patient: {
      age: "38歳",
      gender: "男性",
      occupation: "営業職マネージャー",
      chiefComplaint: "食べた後や寝る頃に胸の奥が焼けるように痛みます。酸っぱい液が口まで上がってきます。",
      historyOfPresentIllness: {
        entries: [
          { when: "3か月前から", description: "胸の奥が焼ける感じとげっぷが続いている。" },
          { when: "内視鏡検査で", description: "逆流性食道炎（ロサンゼルス分類Grade B）と診断された。" },
        ],
        context: "仕事のノルマに負担を感じ、帰宅後の夜遅い時間に食事や飲酒をすることが多い。",
      },
      pastHistory: ["特記事項なし"],
      lifestyle: "寝る直前に飲食することが多く、たばこは1日15本吸います。",
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
        pulseDetail: "弦を張ったような張りと、玉が転がるような滑らかさがある。",
        abdomen: "心下痞鞕（みぞおちの硬結）と両側季肋部の胸脇苦満が顕著。",
        acupointReaction: "中脘 (CV12)、期門 (LR14)、内関 (PC6)、足三里 (ST36) に硬結。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "五行の木と土に当てはめる",
                question: "緊張すると胸やけが強まるという相談です。肝を「木」、脾胃を「土」として、木が土に強く影響すると説明する言葉はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "木乗土（もくじょうど：肝気犯胃・肝胃不和）",
                            isCorrect: true,
                            feedback: "木から土へ向かう相剋の関係が過度になったと捉えるのが「木乗土」です。肝と胃の関係を五行の言葉で表した例で、逆流が起きた原因の確定とは別です。"
                      },
                      {
                            id: "opt-2",
                            label: "土剋水（どこくすい：脾が腎を剋する）",
                            isCorrect: false,
                            feedback: "土剋水は土から水へ向かう関係です。この例で比べているのは肝の木と脾胃の土です。"
                      },
                      {
                            id: "opt-3",
                            label: "金克木（きんこくもく：肺が肝を抑制する）",
                            isCorrect: false,
                            feedback: "金剋木は金から木へ向かう関係です。図で矢印の出発点と行き先を確かめます。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "胸やけがあるときに寒熱を比べる",
                question: "胸やけを訴える症例です。脾胃虚寒を考える例と比べたとき、ここで熱を考える材料になるのはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "胸焼け（灼熱痛）・酸っぱいゲップ（呑酸）・黄膩苔・弦滑脈",
                            isCorrect: true,
                            feedback: "胸の焼ける感じや酸っぱいげっぷに、黄色くねばつく舌苔が重なります。熱を考える材料として使い、胸痛の原因は別に確認します。"
                      },
                      {
                            id: "opt-2",
                            label: "手足の冷えと泥状便・腹力軟弱",
                            isCorrect: false,
                            feedback: "手足の冷えと軟らかい便は、冷えを考えるときの例です。ここで尋ねているのは熱を候補にする所見です。"
                      },
                      {
                            id: "opt-3",
                            label: "口渇がなく温かい白湯を好んで飲む",
                            isCorrect: false,
                            feedback: "温かい飲み物を好むかは、寒熱を比べるときに尋ねられます。この記録では、口の苦さや焼ける感じも確認できます。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "公孫・内関の組み合わせと姿勢の確認",
                question: "八脈交会穴の配穴のうち、胃気上逆を考えるときにこの教材が挙げる組はどれですか。胸やけが強まる姿勢も一緒に確認します。",
                options: [
                      {
                            id: "opt-1",
                            label: "内関（PC6）・公孫（SP4）・中脘（CV12）。症状が強まる姿勢を聞く。",
                            isCorrect: true,
                            feedback: "内関は陰維脈、公孫は衝脈に通じるとされます。姿勢の話と、急ぐ胸部症状がないかの確認は、配穴の候補を挙げることとは別に行います。"
                      },
                      {
                            id: "opt-2",
                            label: "列缺（LU7）・照海（KI6）。姿勢は全員同じにする。",
                            isCorrect: false,
                            feedback: "列缺と照海は、任脈と陰蹻脈を組み合わせる別の例です。横になるとつらいかどうかも、本人に聞いてから考えます。"
                      },
                      {
                            id: "opt-3",
                            label: "大敦（LR1）・隠白（SP1）。症状が出る姿勢は聞かない。",
                            isCorrect: false,
                            feedback: "この問題では内関と公孫の組を探します。胸やけがある場合は、食後や横になったときの変化も別に聞きます。"
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
      pathomechanism: "胸やけと酸っぱいげっぷを「胃気上逆」、緊張した日の変化を「肝気犯胃」と照らして読みます。逆流性食道炎の診断は、この伝統的な説明とは別に行われています。",
      observations: [
        { target: "complaint", label: "胸やけと口に上がる酸っぱい液" },
        { target: "inquiry", label: "仕事で緊張したときの変化" },
      ],
      differentialDiagnosis: "脾胃虚寒を考える例では、吐物の様子、温めたときの変化、脈の速さなどを比べます。ここでは焼ける感じと、黄色くねばつく舌苔に注目します。",
      pointRationale: "内関は陰維脈、公孫は衝脈に通じるとされ、胃の訴えを考える組として出てきます。中脘を加える意味を読んだうえで、胸やけが出る時刻や姿勢も別に確認します。",
      clinicalPitfall: "逆流性食道炎の診断歴があっても、新しい胸痛をすべて胸焼けと判断しない。持続する胸の圧迫痛、息切れ、冷汗などがあるときは、すぐに119番へ連絡してください。吐血・黒い便・飲み込みにくさは医療機関で評価し、配穴で受診を遅らせない。",
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
    subTitle: "試験前の腹痛と下痢を読み、痛みの出る時期や排便との関係から肝脾不和の候補を考える",
    difficulty: "中級",
    category: "消化器・脾胃",
    isFreeTrial: false,
    patient: {
      age: "24歳",
      gender: "男性",
      occupation: "大学院生（就職活動中）",
      chiefComplaint: "面接や試験、電車に乗る前に緊張すると、おへその周りが差し込むように痛くなり、トイレに駆け込みます。",
      historyOfPresentIllness: {
        entries: [
          { when: "腹痛が出たあと", description: "軟らかい便や水のような便が出る。" },
          { when: "排便後", description: "腹痛がいったん楽になる。" },
        ],
        context: "就職活動を始めた頃から症状が強くなった。途中で降りやすい各駅停車にしか乗れず、外出に困っている。大腸内視鏡検査では異常を指摘されなかった。",
      },
      pastHistory: ["特記事項なし"],
      lifestyle: "緊張すると食欲が落ちます。冷たいものを避けていますが、症状は続いています。",
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
        { question: "平日と休日で症状に違いはありますか？", answer: "自宅でリラックスしている休日は全く症状が出ません。" },
      ],
      palpation: {
        pulse: "弦細脈（げんさいみゃく）",
        pulseDetail: "細さのある脈に、弦を張ったような張りがある。",
        abdomen: "腹皮拘急。臍の周囲（特に左側）に索状硬結と圧痛。",
        acupointReaction: "太衝 (LR3)、天枢 (ST25)、足三里 (ST36)、肝兪 (BL18) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "緊張時の腹痛と便通を合わせる",
                question: "試験や外出の前におなかが痛み、下痢をすると少し楽になります。この症例ではどの証を候補にしますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "肝旺脾虚・肝脾不和証（痛瀉）",
                            isCorrect: true,
                            feedback: "痛む場面が試験や外出の前に偏り、排便後には痛みが軽くなるという記録です。この二つをそろえて、肝脾不和の説明と比べます。"
                      },
                      {
                            id: "opt-2",
                            label: "腸胃湿熱証（ちょういしつねつしょう）",
                            isCorrect: false,
                            feedback: "腸胃湿熱を考えるときは、便が残った感じや便の状態も聞きます。この症例で目を向けるのは、緊張する日と休みの日の差です。"
                      },
                      {
                            id: "opt-3",
                            label: "脾腎陽虚証（ひじんようきょしょう）",
                            isCorrect: false,
                            feedback: "脾腎陽虚を考える例では、明け方に下痢をするかや冷えなどを聞きます。ここでは試験や外出の前に症状が出ています。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "休日と外出前の違いを比べる",
                question: "試験や外出前におなかが痛む相談です。東洋医学でいう脾虚湿盛と肝脾不和を比べるとき、肝脾不和も考える手がかりはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "休日には下痢がなく、試験や電車での移動の前に腹痛が出る。脈に弦が混じる。",
                            isCorrect: true,
                            feedback: "休みの日と緊張する場面で症状が違うことが、この教材で肝脾不和も考える理由です。脈の所見は、その経過と合わせて読みます。"
                      },
                      {
                            id: "opt-2",
                            label: "常に未消化便が出て、食後すぐに腹が冷える点",
                            isCorrect: false,
                            feedback: "この症例には、いつも未消化便が出るという記録はありません。実際に症状が起きた日の予定や経過に戻ります。"
                      },
                      {
                            id: "opt-3",
                            label: "肛門部に灼熱感があり、膿血便が出る点",
                            isCorrect: false,
                            feedback: "膿や血が混じる便があれば、証の候補を選ぶ前に医療機関で確認します。この症例では報告されていません。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "肝と脾の両方を考える配穴例",
                question: "抑肝・扶脾という伝統的な治法に当たるツボの組み合わせはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "太衝 (LR3) ＋ 足三里 (ST36) ＋ 天枢 (ST25) ＋ 三陰交 (SP6)",
                            isCorrect: true,
                            feedback: "太衝は肝、足三里と三陰交は脾の働き、天枢は腸の訴えを考えるために挙げています。下の試験は、腹痛と下痢の日数を指標に読めます。"
                      },
                      {
                            id: "opt-2",
                            label: "関元（CV4）・命門（GV4）・神闕（CV8）",
                            isCorrect: false,
                            feedback: "こちらは温める考え方の例です。今回の問題では、緊張時の変化と胃腸の訴えを合わせて考えています。"
                      },
                      {
                            id: "opt-3",
                            label: "大椎 (GV14) ＋ 曲池 (LI11) ＋ 合谷 (LI4)",
                            isCorrect: false,
                            feedback: "この組は風熱などを考える例です。肝と脾を合わせて考える組とは選ぶ理由が異なります。"
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
      pathomechanism: "緊張する場面に腹痛と下痢が重なることから肝脾不和を考えます。排便後に痛みがどう変わるかも記録します。これらは発症の仕組みを測った検査結果ではありません。",
      observations: [
        { target: "history", label: "腹痛と排便の順番" },
        { target: "inquiry", label: "休日の症状" },
      ],
      differentialDiagnosis: "五更瀉の例と比べるなら、目を覚ますほど明け方に下痢をするか、冷えると悪くなるかを聞きます。ここでは、試験や外出前と休みの日との差がはっきりしています。",
      pointRationale: "太衝は肝、足三里と三陰交は脾、天枢は腸の訴えに着目する例です。研究結果を読むときは、腹痛だけでなく下痢があった日数も見ます。",
      clinicalPitfall: "ストレスに連動する下痢だけでIBSを確定しない。血便、体重減少、発熱、家族歴などを確認し、診察・必要な検査を受けたか確認する。伝統的な候補の比較で消化器疾患の評価を置き換えない。",
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
    subTitle: "腰から脚の痛み、冷え、雨の日の変化を読み、寒湿痺と考えた理由を挙げる",
    difficulty: "中級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "65歳",
      gender: "男性",
      occupation: "農業・定年退職後",
      chiefComplaint: "右の腰からお尻、太ももの裏、ふくらはぎまで、引きつるように痛み、しびれます。",
      historyOfPresentIllness: {
        entries: [
          { when: "歩き続けると", description: "痛みがつらくなる。" },
          { when: "少し休むと", description: "また歩けるようになる。" },
        ],
        context: "寒い時期や雨の前日に痛みが強まる。腰やお尻を触ると冷たいと感じるという。",
      },
      pastHistory: ["腰椎椎間板ヘルニア"],
      lifestyle: "朝早くから農作業をします。入浴は短時間で済ませます。",
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
        pulseDetail: "深いところで触れ、拍動は遅い。",
        abdomen: "小腹不仁（下腹部が綿のように柔らかく力がない）。",
        acupointReaction: "環跳 (GB30)、委中 (BL40)、腎兪 (BL23)、大腸兪 (BL25) に強圧痛。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "腰から脚の痛みを寒湿と照らす",
                question: "腰から脚に痛みと重だるさがあり、冷えるとつらく、入浴すると少し楽になります。痺証の中ではどれに近いですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "寒湿痺（かんしつひ：痛痺・着痺の混合）",
                            isCorrect: true,
                            feedback: "冷えたときや入浴後の変化を「寒」、重だるさと雨の日の変化を「湿」の手がかりとして読み、寒湿痺を候補にします。"
                      },
                      {
                            id: "opt-2",
                            label: "熱痺（ねつひ：局所の発赤・灼熱腫脹）",
                            isCorrect: false,
                            feedback: "「熱」を考える場合は赤みや熱っぽさなども見ます。この症例では、入浴で楽になるという話が比べる材料です。"
                      },
                      {
                            id: "opt-3",
                            label: "行痺（こうひ：遊走性の関節痛）",
                            isCorrect: false,
                            feedback: "行痺を比べるときは、痛む場所が移るかどうかを聞きます。この例の痛みは腰から同じ脚へと続きます。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "長く続く疲れと今回の痛みを分ける",
                question: "伝統医学の「本」と「標」で読むと、前から続く背景と、今つらい症状の組み合わせはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "本は腎陽虚などの候補。標は冷えと脚の重だるさを伴う寒湿の所見。",
                            isCorrect: true,
                            feedback: "年齢や以前からの疲れを背景の情報に、冷えや重だるさを今の訴えに置きます。新しいしびれや筋力低下は、別に医療機関で確認します。"
                      },
                      {
                            id: "opt-2",
                            label: "胃熱と湿痰（本）が頭部に上衝（標）している",
                            isCorrect: false,
                            feedback: "この記録の主な訴えは、頭の症状ではなく腰から脚への痛みです。以前から続くことと、今回増えた所見を拾い直します。"
                      },
                      {
                            id: "opt-3",
                            label: "肝火上炎（本）により下肢が虚脱（標）している",
                            isCorrect: false,
                            feedback: "ここでは上半身のほてりより、脚の冷えや入浴後の変化がはっきりしています。"
                      }
                ]
          },
          {
  "stepNumber": 3,
  "stepTitle": "新しい神経症状を先に確認する",
  "question": "腰から脚への痛みを扱うとき、配穴例を読む前に何を確認しますか。",
  "options": [
    {
      "id": "opt-1",
      "label": "脚のしびれ、力の入り方、排尿・排便の変化を聞き、必要な受診を優先する。",
      "isCorrect": true,
      "feedback": "脚の症状は、場所や広がりだけでなく、筋力や排尿・排便に新しい変化がないかも確かめます。配穴例はその後に読みます。"
    },
    {
      "id": "opt-2",
      "label": "経穴で強い響きがあれば、神経の状態は確認済みと考える。",
      "isCorrect": false,
      "feedback": "響きがあっても神経の状態は分かりません。いつからしびれるか、どこに広がるかを先に聞きます。"
    },
    {
      "id": "opt-3",
      "label": "排尿に変化があっても、まず施術後の様子を見る。",
      "isCorrect": false,
      "feedback": "腰や脚の痛みに新しい排尿障害が伴う場合は、施術より救急での受診を優先します。"
    }
  ]
}
    ],
    correctDiagnosis: {
      hachiko: "裏・寒・虚実挟雑",
      pattern: "寒湿痺証（腎陽不足・経絡阻痺）",
      treatmentPrinciple: "温経散寒・祛湿通絡・温補腎陽（伝統的な治則の学習例）",
      primaryPoints: ["環跳 (GB30)", "委中 (BL40)", "腎兪 (BL23)"],
      secondaryPoints: ["大腸兪 (BL25)", "承山 (BL57)", "命門 (GV4)", "陽陵泉 (GB34)"],
      formulaEquivalent: "独活寄生湯（どっかつきせいとう）、八味地黄丸",
    },
    clinicalExplanation: {
      pathomechanism: "冷えた日と入浴後の差、脚の重だるさから寒湿痺を考えます。立っているときや歩いたときに症状がどこへ広がるかは、医療機関で神経の状態を調べるためにも伝えます。",
      observations: [
        { target: "history", label: "歩いたときと休んだときの違い" },
        { target: "inquiry", label: "冷えた日と入浴後の違い" },
      ],
      differentialDiagnosis: "気滞血瘀と比べるなら、同じ場所を刺すように痛むか、けががあったかも聞きます。この記録で寒湿を考える理由は、冷えと雨の日に強まり、入浴で少し楽になることです。",
      pointRationale: "環跳と委中は、お尻からひざ裏にかけて図で位置を確認する例です。腎兪や命門は温補を考えるときに挙げています。脚の力や排尿・排便に変化がある場合は、配穴より先に医療機関で診察を受けます。",
      clinicalPitfall: "新しい排尿・排便の異常、会陰部の感覚低下、脚の脱力を確認する。腰痛・脚への放散痛と新しい排尿等の異常は緊急評価を優先する。鍼の響きや痛みの軽減で神経損傷の有無や施術の安全性を判定しない。",
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
    subTitle: "体が浮くようなめまいと吐き気を読み、頭の重さや舌の所見を湿痰の説明と比べる",
    difficulty: "中級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "45歳",
      gender: "女性",
      occupation: "パート事務",
      chiefComplaint: "歩くと体が浮くようにふらつき、頭が重いです。",
      historyOfPresentIllness: "雨の日や台風が近づくとめまいが強くなるという。乗り物に酔いやすく、吐き気と耳が詰まる感じもある。",
      pastHistory: ["メニエール病の既往"],
      lifestyle: "甘いものや乳製品を毎日とります。ふだん運動する習慣はありません。",
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
        pulseDetail: "柔らかく浮いて触れ、滑らかに動く脈として記録された。",
        abdomen: "心下振水音（みぞおちを叩くとポチャポチャ音が鳴る）。",
        acupointReaction: "中脘 (CV12)、豊隆 (ST40)、頭臨泣 (GB15)、陰陵泉 (SP9) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "浮くようなめまいを所見と合わせる",
                question: "体が浮くようなめまいに、頭の重さ、吐き気、ねばつく白い舌苔があります。伝統医学ではどの候補を考えますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "痰濁中阻・水気上衝（たんだくちゅうそ・すいきじょうしょう）",
                            isCorrect: true,
                            feedback: "頭の重さ、吐き気、ねばつく白苔を合わせ、痰湿を考えます。乗り物酔いや天候での変化から、めまいの医学的な原因を決めることはできません。"
                      },
                      {
                            id: "opt-2",
                            label: "肝陽上亢（かんようじょうこう）",
                            isCorrect: false,
                            feedback: "肝陽上亢と比べるときは、顔の赤みや脈の様子も読みます。この例では胃の訴えや白い舌苔が記録されています。"
                      },
                      {
                            id: "opt-3",
                            label: "気血両虚（きけつりょうきょ）",
                            isCorrect: false,
                            feedback: "気血両虚を考えるときは、顔色や脈の弱さなども確認します。問いの所見は白い舌苔や頭の重さです。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "痰濁中阻を考える記録を選ぶ",
                question: "体が浮くようなめまいを訴えた人の記録を読みます。東洋医学で痰濁中阻を考える手がかりになるのは、どの組み合わせですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "重い頭、吐き気、ねばつく白い舌苔",
                            isCorrect: true,
                            feedback: "めまいだけで決めず、吐き気と舌苔まで合わせます。天気による変化は、症状がいつ強まるかの記録として扱います。"
                      },
                      {
                            id: "opt-2",
                            label: "手足のほてり、舌が赤く舌苔が少ない",
                            isCorrect: false,
                            feedback: "この症例の舌苔は少なく赤い所見ではなく、白くねばつくと記載されています。"
                      },
                      {
                            id: "opt-3",
                            label: "急な発熱、喉の痛み、浮いて速い脈",
                            isCorrect: false,
                            feedback: "急な発熱や喉の痛みは、今回示された記録にはありません。めまいの経過と一緒に出た訴えを確認します。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "化痰・利湿の配穴例",
                question: "「化痰」の考え方で選ぶ豊隆を含み、脾胃や水分に関する伝統的な説明も考える組み合わせはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "豊隆 (ST40) ＋ 中脘 (CV12) ＋ 百会 (GV20) ＋ 陰陵泉 (SP9)",
                            isCorrect: true,
                            feedback: "豊隆は化痰、中脘は脾胃、陰陵泉は利湿、百会は昇清と関連づけます。図鑑で、それぞれのツボを挙げた理由を確認できます。"
                      },
                      {
                            id: "opt-2",
                            label: "太衝 (LR3) ＋ 行間 (LR2) ＋ 侠渓 (GB43)",
                            isCorrect: false,
                            feedback: "この組は肝胆の熱を考える場合の例です。設問で示している化痰の豊隆は入っていません。"
                      },
                      {
                            id: "opt-3",
                            label: "関元 (CV4) ＋ 命門 (GV4) ＋ 腎兪 (BL23)",
                            isCorrect: false,
                            feedback: "こちらは温陽を考える場合の例です。この問題では豊隆と、脾胃や湿を考えるためのツボを組み合わせます。"
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
      pathomechanism: "頭の重さ、吐き気、白くねばつく舌苔を合わせて痰湿を候補にします。耳の詰まり方や聞こえ方、歩きにくさは、めまいの原因を医療機関で調べるためにも確認します。",
      observations: [
        { target: "complaint", label: "頭が重いという訴え" },
        { target: "history", label: "吐き気と耳の詰まり" },
        { target: "tongue", label: "白い舌苔" },
      ],
      differentialDiagnosis: "立ち上がったときだけの立ちくらみか、姿勢に関わらず浮く感じが続くかを聞きます。この例では後者の訴えと、白くねばつく舌苔を、痰湿の説明と照らします。",
      pointRationale: "豊隆は化痰、中脘は脾胃、陰陵泉は利湿に関連づけ、百会は昇清を読む際に挙がります。どのツボをどの伝統用語と結びつけているかを確かめます。",
      clinicalPitfall: "新しい急なめまい、神経症状、歩行困難、急な難聴は速やかな受診を優先する。舌苔や雨天悪化だけで内耳疾患を確定しない。水滞の分類を理由に水分制限・発汗を指示しない。",
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
    subTitle: "喉のつかえや咳払いの経過を読み、梅核気と呼ぶ理由と医療機関での確認事項を考える",
    difficulty: "中級",
    category: "呼吸器・感染後",
    isFreeTrial: false,
    patient: {
      age: "36歳",
      gender: "女性",
      occupation: "コールセンター勤務",
      chiefComplaint: "喉に物が挟まった感じがします。咳払いをしても取れませんが、食事は通ります。",
      historyOfPresentIllness: {
        entries: [
          { when: "2か月前", description: "職場の人間関係に悩んでいた頃、喉の違和感に気づいた。" },
          { when: "耳鼻咽喉科を受診", description: "内視鏡検査を受け、当時は異常を指摘されなかった。" },
          { when: "現在", description: "違和感は続いていて、水を飲むと一時的に楽になる。胸が押される感じがあり、ため息も増えた。" },
        ],
      },
      pastHistory: ["特記事項なし"],
      lifestyle: "思ったことを言わずに我慢することがよくあります。",
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
        pulseDetail: "弦を張ったような張りがあると記録された。",
        abdomen: "両側の胸脇苦満、および膻中（CV17）周辺の顕著な圧痛。",
        acupointReaction: "列缺 (LU7)、照海 (KI6)、太衝 (LR3)、天突 (CV22) に反応。",
      },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "喉のつかえを古典の言葉で読む",
                question: "喉に物がある感じがするものの、食事は通るという相談です。古典で「梅核気」と呼ぶ訴えを、どのように説明しますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "気滞痰阻（きたいたんそ）",
                            isCorrect: true,
                            feedback: "『金匱要略』には、喉に肉片があるように感じるという記述があります。ここでは、喉のつかえとため息などを、気滞痰阻の説明と照らします。"
                      },
                      {
                            id: "opt-2",
                            label: "食道腫瘍による器質的狭窄",
                            isCorrect: false,
                            feedback: "食事が通るという話だけで食道の病気を除外できません。この設問は古典の言葉を読む問題です。飲み込みにくさや痛みなどは別に確認します。"
                      },
                      {
                            id: "opt-3",
                            label: "肺熱陰虚（はいねついんきょ）",
                            isCorrect: false,
                            feedback: "この症例の中心は、繰り返す喉のつかえと咳払いです。舌苔の色や、どんな場面でつかえが強まるかも読みます。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "喉のつかえとため息を照らし合わせる",
                question: "伝統医学で気滞痰阻を候補にしたとき、喉のつかえと一緒に読む所見はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "弦脈、胸脇苦満、舌根部の白膩苔、頻繁なため息や咳払い",
                            isCorrect: true,
                            feedback: "ため息や咳払い、肋骨の下の張り、白くねばつく舌苔を合わせます。飲み込みにくさの有無は、証を考えるのとは別の確認です。"
                      },
                      {
                            id: "opt-2",
                            label: "洪大脈、舌質紅、黄燥苔、激しい口渇",
                            isCorrect: false,
                            feedback: "赤い舌と厚い黄色い苔、強い口の渇きは、熱を候補にするときの例です。この記録の苔は白く、ため息の訴えもあります。"
                      },
                      {
                            id: "opt-3",
                            label: "沈遅無力脈、淡白舌、手足の強い冷え",
                            isCorrect: false,
                            feedback: "冷えと淡い舌、弱い脈は、虚寒を比べるときの例です。ここで実際にあるのは喉のつかえと白膩苔などです。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "列缺と照海を含む配穴例",
                question: "任脈・陰蹻脈に対応する二つの八脈交会穴を含み、「理気」も考える組み合わせはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "列缺 (LU7) ＋ 照海 (KI6) ＋ 膻中 (CV17) ＋ 太衝 (LR3)",
                            isCorrect: true,
                            feedback: "列缺は任脈、照海は陰蹻脈に通じるとされます。この二穴に、気会とされる膻中と、疏肝理気を考える太衝を合わせた例です。"
                      },
                      {
                            id: "opt-2",
                            label: "後谿 (SI3) ＋ 申脈 (BL62) ＋ 大椎 (GV14)",
                            isCorrect: false,
                            feedback: "後谿と申脈は、督脈と陽蹻脈を合わせる組です。経脈の名前を手がかりに、任脈と陰蹻脈の組を探します。"
                      },
                      {
                            id: "opt-3",
                            label: "内関 (PC6) ＋ 公孫 (SP4) ＋ 梁丘 (ST34)",
                            isCorrect: false,
                            feedback: "内関と公孫は、陰維脈と衝脈を合わせる別の組です。同じ八脈交会穴でも、対応する脈が違います。"
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
      pathomechanism: "喉のつかえと、ため息や胸の張りが出る場面を合わせ、梅核気や気滞痰阻という古典の説明を読みます。実際に何かが喉に詰まっているかどうかは、診察で確かめます。",
      observations: [
        { target: "history", label: "喉のつかえとため息の経過" },
        { target: "inquiry", label: "つかえを感じる場面" },
      ],
      differentialDiagnosis: "食べ物が通りにくくなったか、声が変わったか、体重が減ったかを別に聞きます。食事が通ることや、緊張する日に強まることだけでは、喉や食道の病気を除外できません。",
      pointRationale: "列缺と照海は任脈と陰蹻脈を扱う組です。膻中は気会、太衝は疏肝理気の例に挙げています。喉に近い部位の図から、刺鍼の向きや深さは決められません。",
      clinicalPitfall: "持続する喉の症状は受診状況を確認し、飲み込みにくさ、体重減少、声の変化などは受診につなげる。ストレスで変わる症状や食事が通ることだけで腫瘍などを除外しない。天突への刺入角度や深度をこの教材から決めない。",
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
    subTitle: "首から腕へのしびれと肩甲骨の内側の痛みを読み、確認すべき所見と気滞・瘀血の候補を考える",
    difficulty: "上級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "54歳",
      gender: "男性",
      occupation: "タクシードライバー",
      chiefComplaint: "右の首から腕を通って親指まで、電気が走るようにしびれます。肩甲骨の内側も刺すように痛みます。",
      historyOfPresentIllness: "同じ姿勢で長く運転すると強まり、夜は痛みで眠りにくい。ジャクソンテストとスパーリングテストは陽性と記録されている。",
      pastHistory: ["頚椎症指摘"],
      lifestyle: "運動する機会が少なく、たばこを吸います。",
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
                stepTitle: "首から親指へ広がる範囲を図で見る",
                question: "首から腕の親指側へ痛みとしびれが広がり、首の後ろにも痛みがあります。経絡図で重なる道筋はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "手太陰肺経・手陽明大腸経の経筋および足太陽膀胱経（頚部）",
                            isCorrect: true,
                            feedback: "前腕の親指側では肺経と大腸経、首の後ろでは膀胱経の図を照らします。経絡図で重なるというだけで、どの神経根が関わるかは判断できません。"
                      },
                      {
                            id: "opt-2",
                            label: "手少陰心経・手太陽小腸経（小指側）",
                            isCorrect: false,
                            feedback: "心経と小腸経は手の小指側を通ります。訴えが親指側か小指側かを分けて、図で確認します。"
                      },
                      {
                            id: "opt-3",
                            label: "足厥陰肝経・足太陰脾経",
                            isCorrect: false,
                            feedback: "肝経と脾経は脚の内側を通ります。ここで図と見比べるのは首と腕の範囲です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "固定した刺す痛みと舌の色を合わせる",
                question: "肩甲骨の内側の同じ場所が刺すように痛み、夜に強まります。舌の暗い紫色や脈の所見まで合わせると、候補はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "気滞血瘀証（経筋阻痺・脈絡不通）",
                            isCorrect: true,
                            feedback: "同じ場所を刺すように痛むことと、舌の暗い紫色を、瘀血を考える手がかりにします。腕のしびれの原因は別に調べます。"
                      },
                      {
                            id: "opt-2",
                            label: "陰虚火旺証",
                            isCorrect: false,
                            feedback: "陰虚火旺を比べるときは、ほてりや舌苔の少なさも確かめます。この症例では痛む場所と舌の色が問いの中心です。"
                      },
                      {
                            id: "opt-3",
                            label: "風寒表証",
                            isCorrect: false,
                            feedback: "風寒表証を考えるなら、急に始まった悪寒などを確認します。今回は首から腕への症状の経過と、固定した痛みを読みます。"
                      }
                ]
          },
          {
  "stepNumber": 3,
  "stepTitle": "首と腕の症状を調べてから考える",
  "question": "首から腕のしびれがある人について、施術を考える前にどう判断しますか。",
  "options": [
    {
      "id": "opt-1",
      "label": "しびれの範囲や力の入り方を確認し、必要な受診を優先する。図鑑から刺鍼の向きや深さは決めない。",
      "isCorrect": true,
      "feedback": "症状の変化を先に確認します。図鑑の模式図は位置を調べるための資料で、その人の首の解剖や安全な刺鍼の向きを示すものではありません。"
    },
    {
      "id": "opt-2",
      "label": "図鑑で示された骨の位置だけで、誰にでも安全な刺鍼ができると判断する。",
      "isCorrect": false,
      "feedback": "図鑑で確認できるのは標準的な位置です。その人の神経症状や、施術の安全性は別に確認します。"
    },
    {
      "id": "opt-3",
      "label": "一つの検査でしびれが再現されたので、ほかの神経症状は聞かない。",
      "isCorrect": false,
      "feedback": "一つの所見で判断せず、しびれの範囲や筋力の変化、以前の受診や検査の結果も確認します。"
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
      pathomechanism: "肩甲骨の内側の固定した痛み、舌の暗い紫色、弦渋脈を瘀血の説明と照らします。首から親指までのしびれは、その分布と力の入り方を別に確かめます。",
      observations: [
        { target: "inquiry", label: "肩甲骨の内側に残る痛み" },
        { target: "tongue", label: "舌の暗い紫色" },
        { target: "palpation", label: "弦渋脈の記録" },
      ],
      differentialDiagnosis: "首を動かしたときの変化、どの指がしびれるか、力が入りにくくなったかを分けて聞きます。一つの検査で症状が出たことだけから、神経が障害された場所や原因は決められません。",
      pointRationale: "天宗は肩甲骨の周囲、曲池・手三里・合谷は腕や手にあります。症状の近くと離れた部位の例を見比べます。首の施術手順を決めるための図ではありません。",
      clinicalPitfall: "新しい・進行する腕や脚の脱力、歩行の変化などは受診を優先する。頚部の安全な深度や方向を一律の寸・cmで決めることはできない。検査一つで原因を確定せず、頚部刺鍼で必ず事故を回避できるとは案内しない。",
      classicCitation: "『素問・調経論』：「病、脈に在るものは血を調え、肉に在るものは衛を調う。」",
    },
  },

  {
    id: "case-12-orthostatic-hypotension",
    caseNumber: 12,
    title: "30代女性：朝起きられない・立ちくらみ・低血圧（起立性調節障害）",
    subTitle: "立ち上がったときの症状と朝の疲れを読み、受診で調べることと気血両虚の説明を区別する",
    difficulty: "中級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "31歳",
      gender: "女性",
      occupation: "在宅勤務プログラマー",
      chiefComplaint: "朝ベッドから起き上がると目の前が暗くなります。午前中は体が重く、動き出すのがつらいです。",
      historyOfPresentIllness: "収縮期血圧は85 mmHg前後と記録されている。朝に動きづらく、午後になると少し動きやすいという。息切れと動悸があり、顔色は白っぽい。以前に貧血を指摘されたことがある。",
      pastHistory: ["貧血の既往"],
      lifestyle: "運動する機会が少なく、食事は少量です。",
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
                stepTitle: "立ちくらみと疲れを所見と合わせる",
                question: "立つと目の前が暗くなり、食後に強く疲れます。顔色や舌の色が淡く、脈の力が弱い場合、伝統医学ではどの候補を考えますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "気血両虚・清陽不昇（きけつりょうきょ・せいようふしょう）",
                            isCorrect: true,
                            feedback: "疲れ、淡い顔色、脈の弱さから「気血両虚」を考えます。貧血などの有無を調べるには、診察や検査が必要です。"
                      },
                      {
                            id: "opt-2",
                            label: "肝火上炎（かんかじょうえん）",
                            isCorrect: false,
                            feedback: "肝火上炎を比べるなら、顔や舌の赤み、口の苦さなどの所見を探します。この記録では顔や舌の色は淡いとされています。"
                      },
                      {
                            id: "opt-3",
                            label: "痰湿中阻",
                            isCorrect: false,
                            feedback: "痰湿を考えるなら、ねばつく舌苔や胃の張りなども確認します。この症例で目立つのは立ちくらみと疲れです。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "朝のつらさと少し動いたときの息切れを読む",
                question: "朝に起きづらく、少し動くと息が切れます。少し食べただけで満腹になり、横になりたいほど疲れるという話も合わせると、どの見立てを比べますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "中気下陥証・心脾両虚証（気血両虚）",
                            isCorrect: true,
                            feedback: "少しの動作での息切れと、食後に横になりたいほど疲れることを合わせ、心脾両虚や中気下陥の説明を比べます。立ちくらみは体位を変えたときの血圧や脈拍、症状なども医療機関で確認します。"
                      },
                      {
                            id: "opt-2",
                            label: "腎陰虚・肝陽上亢証",
                            isCorrect: false,
                            feedback: "腎陰虚・肝陽上亢なら、ほてりなども確認して比べます。血圧だけで証を選ぶのではなく、この症例で訴えている疲れ方を読みます。"
                      },
                      {
                            id: "opt-3",
                            label: "寒邪直中・脾胃実寒証",
                            isCorrect: false,
                            feedback: "急な腹痛や下痢を扱う例とは経過が違います。ここでは朝や食後のつらさと、少し動いたときの息切れを合わせます。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "補気昇陽の配穴例と転倒への配慮",
                question: "補気昇陽の配穴例と、立ち上がるとつらい人への配慮を組み合わせるとどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "百会（GV20）・足三里（ST36）・気海（CV6）。起き上がったときに症状が出るかを確認する。",
                            isCorrect: true,
                            feedback: "三穴は補気昇陽の考え方で挙げています。立ちくらみがある場合は、無理に起立を続けず、失神や転倒を防ぐことと医療機関での評価を優先します。"
                      },
                      {
                            id: "opt-2",
                            label: "ツボの名前を確認して、本人の立ちくらみを聞かずに立ち上がってもらう。",
                            isCorrect: false,
                            feedback: "体位を変えるときは、その前後で立ちくらみや気分の悪さがないかを確認します。"
                      },
                      {
                            id: "opt-3",
                            label: "大椎（GV14）・曲池（LI11）。立ちくらみは以前からあるため、今回の変化は確認しない。",
                            isCorrect: false,
                            feedback: "以前からの症状でも、頻度や強さ、失神したことがあるかは今回改めて確認します。"
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
      pathomechanism: "朝の疲れ、顔や舌の淡い色、弱い脈から気血両虚を考えます。立ちくらみの原因や貧血があるかどうかは、診察や検査で確認します。",
      observations: [
        { target: "history", label: "朝と午後の動きやすさ" },
        { target: "inspection", label: "顔色" },
        { target: "tongue", label: "舌の色" },
        { target: "palpation", label: "脈の強さ" },
      ],
      differentialDiagnosis: "部屋が回る感じか、立った直後に視界が暗くなるのかを聞き分けます。体位を変えたときの血圧、脈拍、症状は、医療機関での評価に必要な情報です。",
      pointRationale: "百会を昇提、足三里と気海を補気の考え方で挙げています。立ち上がったときの症状や転倒したことがあるかは、ツボの候補とは別に確認します。",
      clinicalPitfall: "低血圧と繰り返す立ちくらみ・息切れは医療機関で何を調べたか確かめる。失神に胸痛や呼吸困難が伴う場合などは救急評価を優先する。中気下陥を血液量不足や起立性低血圧の原因と同一視しない。",
      classicCitation: "『霊枢・決気』：「上焦開発し、五穀の味を宣通し、皮膚を薫じ、身を充たし、毛を沢す、これを気と謂う。」",
    },
  },

  {
    id: "case-13-alopecia-areata",
    caseNumber: 13,
    title: "40代男性：急に広がった円形の脱毛斑と頭皮のつっぱり",
    subTitle: "脱毛の広がりや頭皮の所見を読み、皮膚科で確認することと肝鬱化火の候補を分ける",
    difficulty: "上級",
    category: "皮膚・感覚器",
    isFreeTrial: false,
    patient: {
      age: "41歳",
      gender: "男性",
      occupation: "管理職",
      chiefComplaint: "頭のてっぺんと横に、500円玉くらいの丸い脱毛が急に三つできました。",
      historyOfPresentIllness: {
        entries: [
          { when: "部署が統合された頃", description: "仕事の負担が増したと感じていた。" },
          { when: "統合から2週間で", description: "部分的に髪が抜けた箇所（脱毛斑）が現れた。" },
        ],
        context: "頭皮が熱くつっぱる感じがあり、眠りにくさやいら立ちも訴える。",
      },
      pastHistory: ["アトピー性皮膚炎"],
      lifestyle: "深夜まで残業する日があり、睡眠が足りていません。",
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
                stepTitle: "頭皮の熱感と舌・脈の所見を読む",
                question: "円形の脱毛斑が急に増え、頭皮が熱くつっぱります。舌は赤く、脈は張りがあって速い場合、どの伝統的な候補を考えますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "肝鬱化火・血熱生風（かんうつかか・けつねつせいふう）",
                            isCorrect: true,
                            feedback: "頭皮の熱感、舌の赤み、張りのある速い脈を「熱」の手がかりとして合わせます。脱毛のタイプや原因は皮膚科で確認します。"
                      },
                      {
                            id: "opt-2",
                            label: "腎陽虚衰（じんようきょすい）",
                            isCorrect: false,
                            feedback: "腎陽虚を比べるなら冷えなども確かめます。この症例の記録には、頭皮が熱いことと舌の赤みがあります。"
                      },
                      {
                            id: "opt-3",
                            label: "寒湿停滞",
                            isCorrect: false,
                            feedback: "寒湿を考えるときは冷えや重さなども確認します。今回の問いは、頭皮の熱感と舌・脈の所見を合わせる問題です。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "脱毛の広がり方と熱の所見を合わせる",
                question: "血熱生風を候補に入れる理由として、この記録にある所見はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "境目がはっきりした円形の脱毛斑が急に広がり、舌が赤く薄い黄苔があり、脈が弦数であること",
                            isCorrect: true,
                            feedback: "境目のはっきりした脱毛斑が短期間に増えています。頭皮の熱感と赤い舌を合わせて伝統的な候補を考えつつ、脱毛の原因は別に調べます。"
                      },
                      {
                            id: "opt-2",
                            label: "髪が乾燥して枝毛が多く、爪が割れやすい点",
                            isCorrect: false,
                            feedback: "髪の乾燥や爪の変化は血虚を比べるときに聞けます。この症例が述べているのは、円形の脱毛斑が急に広がることです。"
                      },
                      {
                            id: "opt-3",
                            label: "朝起きると枕に抜け毛が数本ついている程度である点",
                            isCorrect: false,
                            feedback: "抜け毛の本数だけで判断せず、場所、形、どのくらいの期間で広がったかを読みます。"
                      }
                ]
          },
          {
  "stepNumber": 3,
  "stepTitle": "急に増えた脱毛斑をどう確認するか",
  "question": "円形の脱毛斑が急に増えたとき、まず確認するのはどれですか。",
  "options": [
    {
      "id": "opt-1",
      "label": "皮膚科で診察を受けたかを確認する。",
      "isCorrect": true,
      "feedback": "脱毛の種類や経過、使っている薬は皮膚科で確認します。配穴例から発毛効果や頭皮に施術する方法は決まりません。"
    },
    {
      "id": "opt-2",
      "label": "皮膚科で原因を確かめる前に、施術で発毛を目指す",
      "isCorrect": false,
      "feedback": "まず脱毛の原因を評価します。発毛を目標に処置を始める前に、皮膚科の受診や診察結果を確認します。"
    },
    {
      "id": "opt-3",
      "label": "ストレスがあるため皮膚科の評価は不要",
      "isCorrect": false,
      "feedback": "仕事などで感じるストレスは経過の情報です。それだけで脱毛の原因を決めず、医療機関で確認します。"
    }
  ]
}
    ],
    correctDiagnosis: {
      hachiko: "裏・実・熱",
      pattern: "血熱生風証（肝火鬱結・毛竅閉塞）",
      treatmentPrinciple: "清熱涼血・祛風通絡・養血生発（局所微細刺鍼）",
      primaryPoints: ["風池 (GB20)", "百会 (GV20)", "太衝 (LR3)"],
      secondaryPoints: ["血海 (SP10)", "合谷 (LI4)"],
      formulaEquivalent: "神応養真丹、防風通聖散",
    },
    clinicalExplanation: {
      pathomechanism: "頭皮の熱感、赤い舌、張りがあり速い脈を合わせ、肝鬱化火や血熱生風を考えます。仕事の変化と脱毛の順序は記録できますが、脱毛の種類や原因は皮膚科で評価します。",
      observations: [
        { target: "history", label: "脱毛斑が現れた時期と頭皮の熱感" },
        { target: "tongue", label: "舌の赤み" },
        { target: "palpation", label: "脈の張りと速さ" },
      ],
      differentialDiagnosis: "髪全体が徐々に薄くなる例と、境目のはっきりした脱毛斑が短期間で増える例を分けて読みます。この記録は後者です。変化の速さと範囲は受診時にも伝えます。",
      pointRationale: "風池や百会は頭と首の位置を読む例、太衝や血海は肝と血の伝統的な説明を調べる例です。頭皮にどう施術するか、発毛するかどうかは、配穴例から判断できません。",
      clinicalPitfall: "急に進行する脱毛は皮膚科等で原因評価を受けたか確認する。血熱という分類で自己免疫反応や原因を確定しない。脱毛斑の境界へ刺鍼すれば毛包を傷つけず治る、とは保証できない。",
      classicCitation: "『諸病源候論』：「人、風邪あり、血気虚祥なれば、腠理開く。風邪血気に乗ずれば、髪落ちて生ぜず。」",
    },
  },

  {
    id: "case-14-knee-osteoarthritis",
    caseNumber: 14,
    title: "70代女性：変形性膝関節症・立ち上がり痛・雨の日の重だるさ",
    subTitle: "立ち上がりでの膝の痛みと雨の日の重だるさを分けて読み、着痺の説明や研究で測った項目を比べる",
    difficulty: "初級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "72歳",
      gender: "女性",
      occupation: "主婦",
      chiefComplaint: "正座ができません。椅子から立つときと階段を下りるときに、膝の内側が強く痛みます。",
      historyOfPresentIllness: "O脚が進んできた。雨の日や梅雨には膝が腫れぼったく、重だるいという。以前に関節穿刺を受けたことがある。",
      pastHistory: ["高血圧"],
      lifestyle: "散歩を控えることが増え、脚の力が落ちています。",
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
                stepTitle: "雨の日の膝の重だるさを読む",
                question: "立ち上がると膝が痛み、雨の日には腫れと重だるさが目立ちます。白くねばつく舌苔もある場合、伝統医学の痺証ではどれに近いですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "着痺（ちゃくひ）",
                            isCorrect: true,
                            feedback: "『素問』では、湿が目立つ場合に着痺という語を使います。この例では膝が重く感じられ、雨の日に強まる点を、着痺の説明と照らします。"
                      },
                      {
                            id: "opt-2",
                            label: "行痺（こうひ：風邪による遊走痛）",
                            isCorrect: false,
                            feedback: "行痺の説明では、痛む場所が移るかに注目します。ここでは膝の重だるさが続いています。"
                      },
                      {
                            id: "opt-3",
                            label: "痛痺（つうひ：寒邪による冷え激痛）",
                            isCorrect: false,
                            feedback: "寒さによる変化は痛痺を比べる手がかりです。この記録で強調されているのは、腫れや、雨の日に増す重だるさです。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "加齢などの背景と今の膝の所見を分ける",
                question: "伝統医学の「本虚・標実」で読むと、長く続く背景と、今の膝の重さはどのように分けられますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "背景を肝腎不足の候補、現在の膝の重さを着痺の所見と読む。",
                            isCorrect: true,
                            feedback: "年齢や以前からの変化と、雨の日に膝が重くなる訴えを別に書きます。軟骨の状態や腫れの原因は、この分類で決まりません。"
                      },
                      {
                            id: "opt-2",
                            label: "膝の重さは、心の熱だけで説明できると考える。",
                            isCorrect: false,
                            feedback: "この問題では、前からの背景と今の膝の訴えを分けます。一つの証名から関節の中の状態は分かりません。"
                      },
                      {
                            id: "opt-3",
                            label: "雨の日の膝の重さだけから、長く続く背景まで決める。",
                            isCorrect: false,
                            feedback: "雨でつらくなるのは現在の経過を記す所見です。以前の歩きやすさや立ち上がりで困るようになった時期は、別に確認します。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "膝の近くにあるツボと要穴を比べる",
                question: "膝の周囲にある二穴と、脾経の合水穴・胆の下合穴を合わせた配穴例はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "犢鼻 (ST35) ＋ 内膝眼 (奇穴) ＋ 陰陵泉 (SP9：脾合水穴) ＋ 陽陵泉 (GB34：筋会・下合穴)",
                            isCorrect: true,
                            feedback: "犢鼻と内膝眼は膝の周囲にあり、陰陵泉は脾経の合水穴、陽陵泉は筋会で胆の下合穴です。ここでは位置と要穴の分類を比べています。"
                      },
                      {
                            id: "opt-2",
                            label: "少沢 (SI1) ＋ 前谷 (SI2) ＋ 後谿 (SI3)",
                            isCorrect: false,
                            feedback: "少沢・前谷・後谿は手にある小腸経の穴です。この設問では膝の周囲と、指定された分類のツボを探します。"
                      },
                      {
                            id: "opt-3",
                            label: "腫れている場所だけでツボを決め、赤みや熱の有無は確認しない。",
                            isCorrect: false,
                            feedback: "腫れが急に出たか、赤みや熱がないかは、ツボ選びの前に確認します。腫れの原因は必要に応じて医療機関で調べます。"
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
      pathomechanism: "膝の重だるさや雨の日の変化を、着痺という伝統的な説明と照らします。膝が腫れる原因や関節の中の状態は、舌の色や舌苔だけからは分かりません。",
      observations: [{ target: "history", label: "膝の重だるさと雨の日の変化" }],
      differentialDiagnosis: "それまでの立ち上がり痛と、突然の腫れ、赤み、熱感を分けて聞きます。急な腫れに熱や強い痛みがあるときは、変形性膝関節症の既往があっても受診を優先します。",
      pointRationale: "犢鼻と内膝眼は膝の周囲にあります。陰陵泉は脾経の合水穴、陽陵泉は筋会・胆の下合穴です。膝の周囲という位置と、要穴として選ぶ理由を分けて読みます。",
      clinicalPitfall: "赤く熱を持つ急な腫れ、発熱、強い安静時痛、体重をかけられない状態は受診を優先する。変形性膝関節症の診断歴だけで感染性関節炎などを除外しない。経穴で関節内の水分を排泄できるとは断定しない。",
      classicCitation: "『素問・痺論』：「湿気多き者は着痺と為す。留まりて去らざるなり。」",
    },
  },

  {
    id: "case-15-peptic-ulcer-pain",
    caseNumber: 15,
    title: "30代男性：夜間の空腹時胃痛・イライラ・口の苦味",
    subTitle: "食事の前後で胃の痛みがどう変わるかを読み、肝胃不和の候補と先に確認する症状を考える",
    difficulty: "中級",
    category: "消化器・脾胃",
    isFreeTrial: false,
    patient: {
      age: "35歳",
      gender: "男性",
      occupation: "金融ディーラー",
      chiefComplaint: "夜中やおなかがすいたときに、みぞおちがきりきり痛みます。何か食べると、いったん楽になります。",
      historyOfPresentIllness: "仕事で相場を追う負担が大きい時期に、空腹時のみぞおちの痛みと胸やけが強くなったという。コーヒーとたばこの習慣がある。",
      pastHistory: ["十二指腸潰瘍歴あり"],
      lifestyle: "食事の時刻が不規則で、刺激の強いものも食べます。",
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
                stepTitle: "空腹時の痛みと口の苦さを読む",
                question: "夜や空腹時にみぞおちが痛み、食べると一時的に落ち着きます。口が苦く、いら立ちもあるとき、候補に挙がる伝統医学の説明はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "肝火犯胃・肝胃鬱熱（伝統医学上の候補。胃酸増加や潰瘍の原因を確定するものではない）",
                            isCorrect: true,
                            feedback: "口の苦さやいら立ちとみぞおちの痛みを、肝胃鬱熱の説明と照らします。食べて楽になったという話は経過の情報で、胃酸の量や潰瘍の有無を示す検査ではありません。"
                      },
                      {
                            id: "opt-2",
                            label: "脾胃虚寒（ひいきょかん）",
                            isCorrect: false,
                            feedback: "脾胃虚寒も比べるなら、冷たいものや温めたときの変化を聞きます。この例は、口の苦さや脈の所見まで合わせて考えます。"
                      },
                      {
                            id: "opt-3",
                            label: "食積（しょくせき）",
                            isCorrect: false,
                            feedback: "食積を比べるときは、食べ過ぎの後に張りや痛みが出たかも聞きます。この記録では空腹時に痛むとされています。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "肝胃鬱熱を考える所見を拾う",
                question: "食事と痛みの関係に加えて、この記録で肝胃鬱熱を候補に入れる理由はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "脈が張って速く、緊張が強い日に悪化する。口が苦く、肋骨の下にも張りがある。",
                            isCorrect: true,
                            feedback: "仕事などで張りつめた日の症状と、口の苦さ、胸脇部の張りを一緒に読みます。緊張したことだけで胃痛の医学的な原因は分かりません。"
                      },
                      {
                            id: "opt-2",
                            label: "舌苔が真っ白で厚く、脈が遅脈である点",
                            isCorrect: false,
                            feedback: "白い厚い苔と遅い脈はこの設問で示された所見と違います。舌苔の色と脈の速さを読み直します。"
                      },
                      {
                            id: "opt-3",
                            label: "下腹部が冷えて下痢が止まらない点",
                            isCorrect: false,
                            feedback: "下腹部の冷えや繰り返す下痢を扱う例ではありません。このケースでは、いつみぞおちが痛むかが手がかりです。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "胃経の郄穴と肝経の原穴を含む配穴例",
                question: "疏肝清熱・和胃止痛の例で、胃経の郄穴、胃の募穴、肝経の原穴を合わせた組はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "梁丘 (ST34：胃経郄穴) ＋ 中脘 (CV12：胃募穴) ＋ 太衝 (LR3：肝経原穴)",
                            isCorrect: true,
                            feedback: "梁丘は胃経の郄穴、中脘は胃の募穴、太衝は肝経の原穴です。吐血や黒い便、急な強い腹痛があれば、この組み合わせを試す前に医療機関で評価を受けます。"
                      },
                      {
                            id: "opt-2",
                            label: "足三里（ST36）・脾兪（BL20）",
                            isCorrect: false,
                            feedback: "脾胃を補う考え方で挙がる組です。この問いでは、胃と肝の両方に対応する指定の分類を探します。"
                      },
                      {
                            id: "opt-3",
                            label: "関元 (CV4) ＋ 気海 (CV6) ＋ 命門 (GV4)",
                            isCorrect: false,
                            feedback: "関元・気海・命門は温補の考え方で挙がる組です。胃の募穴や肝経の原穴の組ではありません。"
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
      pathomechanism: "みぞおちの痛みに、口の苦さや、緊張する日との重なりを合わせて肝胃鬱熱を考えます。潰瘍や胃酸が原因かどうかは、症状の出方だけでは決まりません。",
      observations: [{ target: "history", label: "空腹時の痛みと仕事の状況" }],
      differentialDiagnosis: "温かいものを取ると変わるか、腹部を手で押さえると楽になるかも聞くと、脾胃虚寒の例と比べられます。この例の手がかりは、口の苦さ、赤い舌、張って速い脈です。",
      pointRationale: "梁丘は胃経の郄穴、中脘は胃の募穴、太衝は肝経の原穴です。みぞおちの訴えと、肝と胃の関係を考える治法で、三つの違う分類を組み合わせています。",
      clinicalPitfall: "吐血、黒いタール状便、持続する急激な腹痛、失神などはすぐに医療機関を受診する必要があります。大量の出血・持続する激痛・意識の異常があるときは、すぐに119番へ連絡してください。止血処置の適応は医療機関が判断し、鍼灸の反応を待たない。",
      classicCitation: "『医学正伝』：「胃脘痛、古方多しく温薬を用う…然るに郁熱致す所の者少なからず。」",
    },
  },

  {
    id: "case-16-atopic-dermatitis",
    caseNumber: 16,
    title: "20代女性：アトピー性皮膚炎・皮膚の乾燥と赤み・夜間の激しい痒み",
    subTitle: "皮膚の乾燥、赤み、夜のかゆみの記録を読み、血虚風燥を考えた所見を挙げる",
    difficulty: "上級",
    category: "皮膚・感覚器",
    isFreeTrial: false,
    patient: {
      age: "28歳",
      gender: "女性",
      occupation: "保育士",
      chiefComplaint: "ひじの内側やひざ裏、首が乾いて粉をふきます。夜は我慢できないほどかゆくて掻いてしまいます。",
      historyOfPresentIllness: {
        entries: [
          { when: "子どもの頃から", description: "アトピー性皮膚炎がある。" },
          { when: "大人になってから", description: "再び悪化した。" },
          { when: "現在", description: "ステロイドの塗り薬を使っている。乾燥とかゆみが続き、冷えとのぼせも感じる。" },
        ],
      },
      pastHistory: ["アレルギー性鼻炎"],
      lifestyle: "",
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
                stepTitle: "乾燥と夜のかゆみを読む",
                question: "ひじの内側や首の皮膚が乾いて粉をふき、厚くなっています。布団に入るとかゆみが強くなる場合、伝統医学ではどの候補を比べますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "血虚風燥・表虚生風（けっきょふうそう・ひょうきょせいふう）",
                            isCorrect: true,
                            feedback: "皮膚の乾燥と粉をふく様子、夜のかゆみを合わせて血虚風燥を考えます。かゆくて眠れなかった時間や湿疹の範囲も別に記録します。"
                      },
                      {
                            id: "opt-2",
                            label: "湿熱浸淫（しつねつしんいん）",
                            isCorrect: false,
                            feedback: "湿熱を考える例では、液がにじむかなども見ます。この記録では、乾いて粉をふく様子と、皮膚が厚くなったことが目立ちます。"
                      },
                      {
                            id: "opt-3",
                            label: "風寒外束（ふうかんがいそく）",
                            isCorrect: false,
                            feedback: "寒さに触れた直後の変化を主に扱う例とは、経過が違います。このケースでは、長く続く乾燥と夜のかゆみを読みます。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "血虚と皮膚の乾燥を照らす",
                question: "肌の乾燥とかゆみが続く相談です。東洋医学で「血が肌を養う」と考えるとき、候補になる体の状態（証）はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "血虚風燥証（肺陰不足・表虚生風）",
                            isCorrect: true,
                            feedback: "皮膚の乾燥と夜のかゆみを「血虚風燥」と照らす例です。皮膚の血流量やバリア機能を測った結果は、この記録にはありません。"
                      },
                      {
                            id: "opt-2",
                            label: "肝胆湿熱証",
                            isCorrect: false,
                            feedback: "肝胆湿熱を比べるなら、口の苦さや肋骨の下の痛みなども尋ねます。ここで挙がっている所見は皮膚の乾燥とかゆみです。"
                      },
                      {
                            id: "opt-3",
                            label: "脾腎陽虚証",
                            isCorrect: false,
                            feedback: "脾腎陽虚を考えるときは冷えやむくみ、便の状態なども確認します。乾燥とかゆみだけから、その候補は選べません。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "配穴例を読む前に皮膚の状態を見る",
                question: "養血潤燥に関連する配穴例と、ただれや傷がある皮膚への配慮を合わせるとどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "曲池（LI11）・血海（SP10）・三陰交（SP6）。ただれや傷がある部位への刺激は避ける。",
                            isCorrect: true,
                            feedback: "三穴は治法を読むための例です。現に傷やただれがある部位は避け、湿疹の広がり、皮膚科での治療、その後の経過を先に確認します。"
                      },
                      {
                            id: "opt-2",
                            label: "かゆい場所が分かれば、皮膚に傷があるかを確かめずに刺激する。",
                            isCorrect: false,
                            feedback: "かゆみの場所だけで判断しません。掻き傷やただれの有無も、施術を考える前に確認します。"
                      },
                      {
                            id: "opt-3",
                            label: "直接温めて様子を見てから、皮膚に腫れや赤みがあるかを調べる。",
                            isCorrect: false,
                            feedback: "赤みや腫れの有無は刺激を加える前に確かめます。悪化しているときは、先に皮膚科への相談を検討します。"
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
      pathomechanism: "乾いて粉をふくことや、掻き続けて皮膚が厚くなった所見を、血虚風燥の説明と照らします。皮膚の血流やバリア機能を測った記録はありません。",
      observations: [
        { target: "complaint", label: "乾いて粉をふくという訴え" },
        { target: "inspection", label: "皮膚の乾燥と厚み" },
      ],
      differentialDiagnosis: "乾いて粉をふく場所と、水疱や液がにじむ場所があるかを分けて見ます。この記録では乾燥と、皮膚が厚くなったことが主な所見です。急に赤みが広がる場合は、証を比べる前に皮膚の状態を医療機関で確認します。",
      pointRationale: "曲池は清熱、血海と三陰交は養血・潤燥の考え方を読むために挙げています。傷やただれの有無、皮膚科での治療とその後の経過を先に確認します。",
      clinicalPitfall: "痛み・熱感・腫れ、膿や浸出液、急な拡大、発熱は感染などの受診につなげる。遠隔穴なら必ず施術できると判断せず、皮膚科治療や処方薬を自己判断で中止させない。",
      classicCitation: "『医宗金鑑・外科心法要訣』：「風癬…乾燥して白屑を落とすは、血虚風燥の致す所なり。」",
    },
  },

  {
    id: "case-17-panic-anxiety",
    caseNumber: 17,
    title: "40代女性：急な動悸・呼吸困難感・パニック様発作",
    subTitle: "動悸と息苦しさが急に出たときに優先する対応と、心胆気虚などの伝統的な候補を考える",
    difficulty: "上級",
    category: "自律神経・メンタル",
    isFreeTrial: false,
    patient: {
      age: "43歳",
      gender: "女性",
      occupation: "パート事務",
      chiefComplaint: "電車や人混みにいると急に胸がばくばくして、息が苦しくなります。死ぬのではないかと思うほど怖いです。",
      historyOfPresentIllness: {
        entries: [
          { when: "半年前", description: "満員電車で最初の発作があった。" },
          { when: "救急搬送されたとき", description: "当時の心電図と血液検査では異常を指摘されなかった。" },
          { when: "それ以来", description: "また発作が出るのが怖く、外出しにくい。" },
        ],
      },
      pastHistory: ["特記事項なし"],
      lifestyle: "睡眠が足りず、カフェインを含む飲み物を多くとります。",
    },
    examinations: {
      inspection: "瞳孔散大傾向、呼吸が浅く過換気気味。手指の震え。",
      tongueDiagnosis: { body: "淡白・舌尖紅", coating: "薄白滑", shape: "胖大" },
      auscultationAndOlfaction: "息づかいが速く、浅い呼吸音が聞こえます。",
      inquiry: [{ question: "発作の前兆は？", answer: "下腹部から何かが胃や胸に向かって突き上げてくるような感覚（奔豚気）があります。" }],
      palpation: { pulse: "弦細数脈または結代脈", abdomen: "動悸が臍上からみぞおちにかけて強く拍動。", acupointReaction: "内関 (PC6)、公孫 (SP4)、巨闕 (CV14)、胆兪 (BL19) に反応。" },
    },
    reasoningSteps: [
          {
                stepNumber: 1,
                stepTitle: "下腹部から喉に上る感覚を古典で読む",
                question: "下腹部から何かが胸や喉へ突き上げる感じと、強い動悸や息苦しさがあります。この感じと似た訴えが、古典ではどの名前で記されていますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "奔豚気病（ほんとんきびょう）",
                            isCorrect: true,
                            feedback: "『金匱要略』の奔豚病には、下腹部から喉へ突き上げるような訴えが出てきます。この記述から、今回の動悸や息苦しさの医学的な原因は決まりません。"
                      },
                      {
                            id: "opt-2",
                            label: "結胸証（けっきょうしょう）",
                            isCorrect: false,
                            feedback: "この設問で拾うのは、胸に苦しさがあることに加え、下腹部から上ってくると感じた点です。"
                      },
                      {
                            id: "opt-3",
                            label: "懸飲（けんいん）",
                            isCorrect: false,
                            feedback: "懸飲の説明にある、咳や呼吸で脇が痛むこととは経過が違います。ここでは突き上げる感覚に注目します。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "心胆気虚を考えた所見を拾う",
                question: "心胆気虚・衝気上逆を伝統的な候補にした場合、この記録でその考えを支えるのはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "物音に驚きやすい。へその上からみぞおちへ拍動を感じ、脈にも速さや乱れがある。",
                            isCorrect: true,
                            feedback: "何に驚き、どこで拍動を感じたかを本人の訴えとして書きます。心胆気虚という見立ては、脈の乱れの医学的な評価とは別です。"
                      },
                      {
                            id: "opt-2",
                            label: "舌苔が黄色く厚く乾燥し、脈が洪大で力強く、口臭が激しい",
                            isCorrect: false,
                            feedback: "ここで挙がっているのは、強い脈や厚い黄苔より、驚きやすさと胸へ上ってくる感覚です。"
                      },
                      {
                            id: "opt-3",
                            label: "顔面が青白く、下腹部が石のように硬く冷えている",
                            isCorrect: false,
                            feedback: "下腹部が硬く冷えていたという情報は、この設問の手がかりではありません。拍動をどこで感じたかを読み直します。"
                      }
                ]
          },
          {
  "stepNumber": 3,
  "stepTitle": "今回の動悸と息苦しさを先に評価する",
  "question": "以前にも似た発作があった人に、今回また動悸と息苦しさが出ました。先に行うことはどれですか。",
  "options": [
    {
      "id": "opt-1",
      "label": "胸痛・呼吸困難・失神などの危険兆候を確認し、必要な救急評価を優先する",
      "isCorrect": true,
      "feedback": "過去の検査結果があっても、今回の症状は別に評価します。急な強い息苦しさや胸の圧迫感、失神などでは、施術の反応を待たず救急対応を優先します。"
    },
    {
      "id": "opt-2",
      "label": "落ち着くまで施術して、その結果を見てから受診を考える。",
      "isCorrect": false,
      "feedback": "新しい動悸や息苦しさの原因を先に調べます。症状が少し落ち着いても、救急対応が要らないとは判断できません。"
    },
    {
      "id": "opt-3",
      "label": "以前パニック様発作があったので、今回の胸痛も心肺疾患ではない",
      "isCorrect": false,
      "feedback": "過去にパニック様発作があっても、今回の胸痛は改めて聞き取ります。始まった時刻、どのくらい続いたか、息苦しさや失神の有無を確認します。"
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
      pathomechanism: "下腹部から胸や喉へ突き上げる感覚は、古典の「奔豚気」と比べて読めます。動悸や息苦しさの原因は、古典の記述と似ていることだけでは決まりません。",
      observations: [{ target: "inquiry", label: "下腹部から胸に突き上げる感覚" }],
      differentialDiagnosis: "過去の検査結果を確認したうえで、今回は何時に始まったか、息苦しさや胸の痛みはどのくらい続いたか、失神したかを聞きます。以前と似ていても、今回の心臓や肺の状態は医療機関で評価します。",
      pointRationale: "内関と公孫は八脈交会穴の組で、神門は安神の例です。動悸や息苦しさが新しく出たときは、配穴より先に医療機関で診察を受けます。",
      clinicalPitfall: "過去の心電図・血液検査が正常でも、新しい発作の原因を除外できない。持続する胸痛、急な呼吸困難、失神などがあるときは、すぐに119番へ連絡してください。パニックと決めて鍼や呼吸誘導の反応を待たず、必要な受診を優先する。",
      classicCitation: "『金匱要略・奔豚気病脈証治』：「奔豚病は、少腹より起こり、上りて咽喉を衝き、発作すれば死せんと欲す。」",
    },
  },

  {
    id: "case-18-severe-eyestrain",
    caseNumber: 18,
    title: "30代男性：画面作業の後に強まる目の疲れ、かすみ、首こり",
    subTitle: "画面を見た時間と見え方の変化から、眼科で調べることと肝血不足の候補を考える",
    difficulty: "初級",
    category: "皮膚・感覚器",
    isFreeTrial: false,
    patient: {
      age: "37歳",
      gender: "男性",
      occupation: "グラフィックデザイナー",
      chiefComplaint: "夕方は目の奥が重く痛み、画面の文字がかすんで二重に見えることがあります。後頭部から首の辺りもこわばります。",
      historyOfPresentIllness: "1日に12時間以上、画面を見る。目薬をよく使う。肩がこるときには、こめかみも痛くなるという。",
      pastHistory: ["近視・乱視"],
      lifestyle: "スマートフォンを長時間使います。",
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
                stepTitle: "長く見る習慣を五労の言葉で読む",
                question: "画面作業が続いた日の夕方に、目の疲れと見えにくさが強くなります。長く見る動作を扱う五労の説明はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "久視傷血（きゅうししょうけつ）",
                            isCorrect: true,
                            feedback: "五労の「久視」は長く見ることです。『素問』では「血」と関連づけています。見えにくくなった原因や目の状態は別に確かめます。"
                      },
                      {
                            id: "opt-2",
                            label: "久坐傷肉（きゅうざしょうにく）",
                            isCorrect: false,
                            feedback: "久坐は長く座る動作を指します。この設問で取り上げる動作は、画面を見続けることです。"
                      },
                      {
                            id: "opt-3",
                            label: "久立傷骨（きゅうりゅうしょうこつ）",
                            isCorrect: false,
                            feedback: "久立は長く立つ動作を指します。画面を注視する動作には「久視」が当たります。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "目がかすむ時刻と一緒に出る所見を読む",
                question: "目の疲れとかすみを訴えた人の記録で、画面作業とかすみの変化の関係が分かるのはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "夕方や疲れたときにピントが合いにくい。目やにや強い充血はないと記録されている。",
                            isCorrect: true,
                            feedback: "かすむ時刻と画面作業の長さを聞き、目やにや赤みの有無も別に記録します。その情報だけで結膜炎などを除外することはできません。"
                      },
                      {
                            id: "opt-2",
                            label: "舌苔が真っ黄色で厚く、脈が滑数脈である点",
                            isCorrect: false,
                            feedback: "舌苔や脈だけでは、見え方がいつ変わるかは分かりません。本人が画面作業の後について何と話しているか確認します。"
                      },
                      {
                            id: "opt-3",
                            label: "目を開けると激しい回転性のめまいが起きる点",
                            isCorrect: false,
                            feedback: "目を開けると回転するようなめまいが出る、という訴えはこの記録にありません。"
                      }
                ]
          },
          {
  "stepNumber": 3,
  "stepTitle": "急な見え方の変化を先に調べる",
  "question": "目の周囲のツボを学ぶ際に、急な目の痛みや視力の変化があったら何を優先しますか。",
  "options": [
    {
      "id": "opt-1",
      "label": "急な目の痛みや視力の変化は医療機関で評価し、図鑑だけで刺鍼の安全性を判断しない。",
      "isCorrect": true,
      "feedback": "新しい眼痛や視力の変化は早めに医療機関で確認します。図鑑の位置図から、安全に施術できるかは判断できません。"
    },
    {
      "id": "opt-2",
      "label": "よく知られたツボなら、目の周りでも全員に同じように施術できると考える。",
      "isCorrect": false,
      "feedback": "ツボの名前が分かることと、目の周りに安全に施術できることは別です。急な症状の評価を先に行います。"
    },
    {
      "id": "opt-3",
      "label": "かすみ目は肝血不足なので、眼科の評価は不要",
      "isCorrect": false,
      "feedback": "肝血不足は伝統医学の候補名です。見えにくい原因や急ぎの治療が必要かは、眼科で確認します。"
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
      pathomechanism: "『素問』の「久視」は、長く見る動作を指します。この例では画面を見た時間と、見え方が変わった時刻を別に書き、肝血不足という伝統的な候補も読みます。",
      observations: [
        { target: "history", label: "1日に画面を見る時間" },
        { target: "complaint", label: "目がかすむ時間帯" },
      ],
      differentialDiagnosis: "夕方に繰り返すかすみと、急な眼痛や急に見えにくくなる変化を分けて聞きます。強い目の痛みに吐き気や見え方の変化が伴う場合は、緊急の眼科評価を優先します。",
      pointRationale: "攅竹と太陽は目に近いツボ、風池は後頭部の下にあるツボです。症状に近い位置を図で確認する例で、目の周囲の刺鍼の安全性はこの図から判断できません。",
      clinicalPitfall: "急な強い眼痛、充血、見え方の変化、吐き気などは緊急の眼科評価を優先する。慢性のかすみ目も受診状況を確認する。眼窩の外縁や遠隔穴を「安全な穴」として一律に扱わず、自己刺鍼は行わない。",
      classicCitation: "『素問・五蔵生成篇』：「諸血は皆目に属す…肝は血を得て能く視る。」",
    },
  },

  {
    id: "case-19-chronic-dry-cough",
    caseNumber: 19,
    title: "60代男性：長引く空咳・声がれ・夜間の咽頭乾燥感",
    subTitle: "夜の喉の乾きと長引く空咳を読み、受診で尋ねることと肺陰虚の候補を分ける",
    difficulty: "中級",
    category: "呼吸器・感染後",
    isFreeTrial: false,
    patient: {
      age: "63歳",
      gender: "男性",
      occupation: "大学教授（講義で声を多用）",
      chiefComplaint: "風邪をひいた後、痰の出ない咳が二か月続いています。",
      historyOfPresentIllness: "喉が乾いて声がかれる。夜や話し始めに咳き込み、胸に鈍い痛みが出るという。受診時のレントゲンとCTでは異常を指摘されなかった。",
      pastHistory: ["既往歴なし"],
      lifestyle: "エアコンで部屋を暖めています。水分をとる量は少なめです。",
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
                stepTitle: "二か月続く乾いた咳と声がれを読む",
                question: "風邪の後から痰の少ない咳が二か月続き、声がかれています。赤い舌と少ない舌苔、細く速い脈を合わせると、どの伝統的な候補を比べますか。",
                options: [
                      {
                            id: "opt-1",
                            label: "肺陰虚（はいいんきょ）",
                            isCorrect: true,
                            feedback: "乾いた咳と声がれ、舌苔の少なさを肺陰虚の説明と照らします。風邪の後に始まったことだけで長引く咳の原因は決めず、服薬や喫煙歴なども医療機関に伝えます。"
                      },
                      {
                            id: "opt-2",
                            label: "痰濁阻肺（たんだくそはい）",
                            isCorrect: false,
                            feedback: "痰濁阻肺と比べるなら、痰の量や性状も聞きます。この記録では痰がほとんど出ない点を読みます。"
                      },
                      {
                            id: "opt-3",
                            label: "風寒束肺（ふうかんそくはい）",
                            isCorrect: false,
                            feedback: "風寒束肺の学習例では、急な悪寒などを確認します。この症例では二か月続く乾いた咳の経過を考えます。"
                      }
                ]
          },
          {
                stepNumber: 2,
                stepTitle: "五行で肺と腎の対応を読む",
                question: "乾いた咳や喉の乾きについて、肺を「金」、腎を「水」に置くとき、教材で読み合わせる候補はどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "肺陰虚証（肺腎陰虚・燥咳）",
                            isCorrect: true,
                            feedback: "相生では金から水へ矢印が向かいます。ここでは肺陰虚を候補にし、腎の陰も関わるという説明があることを学びます。喉の乾きだけで腎の状態を決めません。"
                      },
                      {
                            id: "opt-2",
                            label: "脾胃気虚証",
                            isCorrect: false,
                            feedback: "脾胃気虚を比べるなら、食欲や便の変化を尋ねます。この問いでは、肺と腎を金と水に置く説明を読みます。"
                      },
                      {
                            id: "opt-3",
                            label: "肝火犯肺証",
                            isCorrect: false,
                            feedback: "肝火犯肺は肝と肺を扱う候補です。設問の金と水は、それぞれ肺と腎に当たります。"
                      }
                ]
          },
          {
                stepNumber: 3,
                stepTitle: "肺経と腎経を合わせた配穴例",
                question: "滋陰潤肺に関連する配穴のうち、肺経の原穴と合水穴、腎経の八脈交会穴を合わせるのはどれですか。",
                options: [
                      {
                            id: "opt-1",
                            label: "太淵（LU9）・尺沢（LU5）・照海（KI6）",
                            isCorrect: true,
                            feedback: "太淵は肺経の原穴、尺沢は肺経の合水穴です。照海は陰蹻脈につながるとされる八脈交会穴です。この三穴を挙げた理由を図鑑で確認できます。"
                      },
                      {
                            id: "opt-2",
                            label: "大椎（GV14）",
                            isCorrect: false,
                            feedback: "大椎は督脈に属します。ここで探すのは、肺経の二穴と腎経の一穴を合わせた例です。"
                      },
                      {
                            id: "opt-3",
                            label: "豊隆（ST40）と中脘（CV12）",
                            isCorrect: false,
                            feedback: "豊隆と中脘は痰や脾胃の働きに着目する例です。今回指定された要穴の分類と違うことを図鑑で確認します。"
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
      pathomechanism: "乾いた咳と声がれ、喉の乾き、少ない舌苔を肺陰虚の説明と照らします。長引く咳については、以前の検査結果に加え、最近の息苦しさや胸痛の変化も医療機関に伝えます。",
      observations: [
        { target: "history", label: "咳が出る場面と喉の乾き" },
        { target: "tongue", label: "舌苔の量" },
      ],
      differentialDiagnosis: "痰熱の例を比べるときは、痰が出るか、どんな色や粘りかを聞きます。この記録では痰がほとんど出ず、夜や話し始めに咳が出ることが手がかりです。",
      pointRationale: "太淵は肺経の原穴、尺沢は肺経の合水穴、照海は腎経の八脈交会穴です。肺と腎の両方を考える例として、経絡と要穴の分類を読みます。",
      clinicalPitfall: "3週間を超える咳は医療機関で原因の評価を受ける。血痰、体重減少、悪化や胸痛・息苦しさも確認する。急な呼吸困難などがあるときは、すぐに119番へ連絡してください。乾いた咳や舌脈だけで肺陰虚を確定し、受診を遅らせない。",
      classicCitation: "『医門法律』：「燥の勝るや、気管を乾かし、皮膚を燥らし、肺を熏じて咳嗽を為す。」",
    },
  },

  {
    id: "case-20-bells-palsy",
    caseNumber: 20,
    title: "50代女性：顔面神経麻痺初期・口角の下垂・閉眼不全（ベル麻痺）",
    subTitle: "口角が下がり目を閉じにくい相談で、最初に優先する診察や検査と風寒外襲の候補を考える",
    difficulty: "上級",
    category: "疼痛・運動器",
    isFreeTrial: false,
    patient: {
      age: "51歳",
      gender: "女性",
      occupation: "パート勤務",
      chiefComplaint: "朝、水を飲もうとしたら口の右側からこぼれました。右目も閉じ切れません。",
      historyOfPresentIllness: {
        entries: [
          { when: "3日前", description: "風邪気味で窓を開けたまま寝た。" },
          { when: "翌朝", description: "顔の右側が動かしにくいことに気づいた。味も分かりにくくなった。" },
          { when: "耳鼻咽喉科を受診", description: "ベル麻痺と診断され、ステロイドの内服を始めた。" },
        ],
      },
      pastHistory: ["特記事項なし"],
      lifestyle: "寝不足の日が続き、疲れを感じています。",
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
  "stepNumber": 1,
  "stepTitle": "寒い場所にいた話と麻痺の原因を分ける",
  "question": "窓を開けたまま眠り、翌朝に顔の動かしにくさに気づきました。「風寒外襲」をどう扱いますか。",
  "options": [
    {
      "id": "opt-1",
      "label": "伝統的な候補として学び、窓を開けて眠ったことをベル麻痺の医学的原因と確定しない",
      "isCorrect": true,
      "feedback": "窓を開けて眠ったことは、発症前の出来事として記録できます。顔面神経麻痺の原因や必要な治療は、その記録からは決まりません。"
    },
    {
      "id": "opt-2",
      "label": "窓を開けて眠った翌日の麻痺なので、原因は風寒だけと確定する",
      "isCorrect": false,
      "feedback": "前日に寒いと感じたことだけで、麻痺の原因は分かりません。顔に変化が出た時刻や、一緒に出た症状を先に確認します。"
    },
    {
      "id": "opt-3",
      "label": "舌脈が風寒を示せば、医療機関での原因評価を省略できる",
      "isCorrect": false,
      "feedback": "舌や脈の所見では、顔の麻痺の原因を調べる診察に代えられません。新しい症状は医療機関で評価します。"
    }
  ]
},
          {
  "stepNumber": 2,
  "stepTitle": "急な顔のゆがみに対応する",
  "question": "新しく顔に麻痺が出たとき、どのように対応しますか。",
  "options": [
    {
      "id": "opt-1",
      "label": "すぐに医療機関を受診し、額の動きだけで脳卒中を除外しない",
      "isCorrect": true,
      "feedback": "顔のゆがみが急に出たときや、手足の力が入らない、言葉が出にくいときは、すぐに119番へ連絡してください。額を動かせるかだけで、脳卒中の有無は決められません。"
    },
    {
      "id": "opt-2",
      "label": "額にしわを寄せられないので、脳卒中は必ず除外できる",
      "isCorrect": false,
      "feedback": "額の一つの所見だけで脳卒中を除外できません。急な変化に気づいた時刻と、手足・言葉・ほかの症状を確認します。"
    },
    {
      "id": "opt-3",
      "label": "顔だけの症状なら、数週間は鍼灸の反応を見てよい",
      "isCorrect": false,
      "feedback": "新しい麻痺は、顔だけに見えても早めに医療機関で原因を調べます。施術で変わるかを待ってから判断しません。"
    }
  ]
},
          {
  "stepNumber": 3,
  "stepTitle": "診断後は早期治療と目の保護を確認する",
  "question": "医療機関でベル麻痺と診断され、目を閉じにくい場合、優先するのはどれですか。",
  "options": [
    {
      "id": "opt-1",
      "label": "医師の早期治療と閉眼不全への眼の保護を優先し、鍼の効果や予後改善を保証しない",
      "isCorrect": true,
      "feedback": "治療を始める時期と、閉じにくい目をどう保護するかを医師に確認します。どちらも、配穴の候補を決めるより先に扱います。"
    },
    {
      "id": "opt-2",
      "label": "麻痺の原因を調べる前に、鍼で回復を早められると判断する",
      "isCorrect": false,
      "feedback": "回復の見通しを鍼の反応から決めず、医師が確認した原因や治療方針を確かめます。"
    },
    {
      "id": "opt-3",
      "label": "発症からの日数だけで施術内容を決め、全員に同じ方法を選ぶ。",
      "isCorrect": false,
      "feedback": "発症した時刻や症状の経過、目の閉じ方などを個別に確認します。この教材で後遺症を防ぐ施術は決められません。"
    }
  ]
}
    ],
    correctDiagnosis: {
      hachiko: "表・実・虚実挟雑",
      pattern: "風寒外襲・気血鬱滞証（面癱・末梢性顔面神経麻痺）",
      treatmentPrinciple: "祛風通絡・疎調気血（伝統的な治則の学習例）",
      primaryPoints: ["翳風 (TE17)", "地倉 (ST4)", "陽白 (GB14)"],
      secondaryPoints: ["合谷 (LI4：面目口歯の主穴)", "風池 (GB20)", "下関 (ST7)", "頬車 (ST6)"],
      formulaEquivalent: "牽正散（けんせいさん）、葛根湯合補中益気湯",
    },
    clinicalExplanation: {
      pathomechanism: "窓を開けて眠ったことは、発症前にあった出来事として書けます。風寒外襲は伝統的な候補名です。その出来事が顔面麻痺を引き起こしたかは、この記録では分かりません。",
      observations: [{ target: "history", label: "寝る前から受診までの経過" }],
      differentialDiagnosis: "顔のゆがみに気づいた時刻と、手足の力や言葉に変化がないかを確認します。額や目が動くかだけで脳卒中を除外せず、急な顔のゆがみなどがあれば救急評価を優先します。",
      pointRationale: "地倉は口の周り、陽白は額にあり、合谷は手のツボです。顔の近くと離れた位置の例を図で確認します。診断後の治療と閉じにくい目の保護は医師に確認します。",
      clinicalPitfall: "新しい顔の麻痺はすぐに医療機関を受診する。急な顔のゆがみや手足・言語の異常があるときは、すぐに119番へ連絡してください。額の動きだけで脳卒中を除外しない。診断後も医師の早期治療と閉眼不全への眼の保護を優先し、鍼の効果・予後改善を保証しない。",
      classicCitation: "『霊枢・経筋篇』：「足の陽明の筋…その病、卒口僻、目開けば合せず、熱すれば筋縦みて目開かず。」",
    },
  },
];

export const CLINICAL_CASE_SCOPE = "20例とも架空の症例です。まず受診を急ぐ所見がないかを確かめ、その後に伝統医学の候補を比べます。舌や脈、証名だけで病気の有無は判断できません。配穴や方剤は、治法を読むための例です。診断の精度や治療の効果を調べた資料ではなく、専門家による監修は完了していません。";

interface CaseSafetyGuidance { message: string; sources: { title: string; url: string; section: string }[]; }
export const CLINICAL_CASE_SAFETY_GUIDANCE: Record<string, CaseSafetyGuidance> = {
  "case-01-headache-liver-fire": {
    "message": "新しく増悪する頭痛と眼の充血を、ストレスや肝火だけで説明しない。突然の激痛、意識・言語・手足の異常があるときは、すぐに119番へ連絡してください。急な強い眼痛や見え方の変化も緊急評価を優先し、遠隔穴への施術の反応を待たない。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：頭痛",
        "url": "https://www.nhs.uk/symptoms/headaches/",
        "section": "Urgent advice / Immediate action required"
      },
      {
        "title": "NHS：緑内障",
        "url": "https://www.nhs.uk/conditions/glaucoma/",
        "section": "Symptoms / Immediate action required"
      }
    ]
  },
  "case-02-fatigue-spleen-deficiency": {
    "message": "持続する疲労・軟便の受診状況、発熱・体重減少・出血・脱水などを確認する。脾気虚や舌脈の所見から、病気や免疫機能の低下を確定・除外しない。症状が続く場合は受診につなげる。",
    "sources": [
      {
        "title": "NHS：持続する疲労",
        "url": "https://www.nhs.uk/symptoms/tiredness-and-fatigue/",
        "section": "See a GP / Causes"
      }
    ]
  },
  "case-03-dysmenorrhea-cold-stasis": {
    "message": "生活に支障をきたす月経痛と子宮内膜症疑いは婦人科での評価を優先する。妊娠の可能性がある腹痛・出血を月経痛と決めない。多量の出血、激痛、失神があるときは、すぐに119番へ連絡してください。最終月経日の確認だけで妊娠を除外しない。",
    "sources": [
      {
        "title": "NHS：妊娠中の出血",
        "url": "https://www.nhs.uk/pregnancy/common-symptoms/vaginal-bleeding/",
        "section": "Urgent advice / Immediate action required"
      },
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      }
    ]
  },
  "case-04-menopause-yin-deficiency": {
    "message": "のぼせ、寝汗、動悸を年齢や陰虚だけで説明しない。持続する症状の医療機関で何を調べたか確かめ、新しい胸痛・呼吸困難があるときは、すぐに119番へ連絡してください。閉経後の出血があれば少量でも婦人科での評価が必要。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：閉経後の出血",
        "url": "https://www.nhs.uk/symptoms/post-menopausal-bleeding/",
        "section": "When and where to get medical help"
      }
    ]
  },
  "case-05-insomnia-heart-kidney": {
    "message": "不眠の経過、日中の支障、服薬や他の病気を確認する。睡眠薬は自己判断で中止・減量させず、変更は処方医に相談する。動悸に新しい胸痛・呼吸困難や失神があれば救急評価を優先する。",
    "sources": [
      {
        "title": "NHS：不眠",
        "url": "https://www.nhs.uk/conditions/insomnia/",
        "section": "Causes / See a GP / Treatment"
      },
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      }
    ]
  },
  "case-06-gerd-liver-stomach": {
    "message": "逆流性食道炎の診断歴があっても、新しい胸痛をすべて胸焼けと判断しない。持続する胸の圧迫痛、息切れ、冷汗などがあるときは、すぐに119番へ連絡してください。吐血・黒い便・飲み込みにくさは医療機関で評価し、配穴で受診を遅らせない。",
    "sources": [
      {
        "title": "NHS：胸痛",
        "url": "https://www.nhs.uk/symptoms/chest-pain/",
        "section": "Immediate action required / Common causes"
      },
      {
        "title": "NIDDK：消化性潰瘍の症状と原因",
        "url": "https://www.niddk.nih.gov/health-information/digestive-diseases/peptic-ulcers-stomach-ulcers/symptoms-causes",
        "section": "Symptoms of complications / Causes"
      }
    ]
  },
  "case-07-ibs-liver-spleen": {
    "message": "ストレスに連動する下痢だけでIBSを確定しない。血便、体重減少、発熱、家族歴などを確認し、診察・必要な検査を受けたか確認する。伝統的な候補の比較で消化器疾患の評価を置き換えない。",
    "sources": [
      {
        "title": "NIDDK：IBSの診断",
        "url": "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/diagnosis",
        "section": "Medical history / Physical exam / Tests"
      }
    ]
  },
  "case-08-sciatica-cold-dampness": {
    "message": "新しい排尿・排便の異常、会陰部の感覚低下、脚の脱力を確認する。腰痛・脚への放散痛と新しい排尿等の異常は緊急評価を優先する。鍼の響きや痛みの軽減で神経損傷の有無や施術の安全性を判定しない。",
    "sources": [
      {
        "title": "NICE NG127：神経症状の認識と紹介",
        "url": "https://www.nice.org.uk/guidance/ng127/chapter/Recommendations-for-adults-aged-over-16",
        "section": "1.7.3 Severe low back pain together with other symptoms"
      },
      {
        "title": "NCCIH：鍼の研究と安全性",
        "url": "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",
        "section": "Is acupuncture safe? / More To Consider"
      }
    ]
  },
  "case-09-vertigo-phlegm-dampness": {
    "message": "新しい急なめまい、神経症状、歩行困難、急な難聴は速やかな受診を優先する。舌苔や雨天悪化だけで内耳疾患を確定しない。水滞の分類を理由に水分制限・発汗を指示しない。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：水分補給",
        "url": "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/",
        "section": "Daily fluid intake / Tips to help you stay hydrated"
      }
    ]
  },
  "case-10-globus-hystericus": {
    "message": "持続する喉の症状は受診状況を確認し、飲み込みにくさ、体重減少、声の変化などは受診につなげる。ストレスで変わる症状や食事が通ることだけで腫瘍などを除外しない。天突への刺入角度や深度をこの教材から決めない。",
    "sources": [
      {
        "title": "NHS：嚥下障害",
        "url": "https://www.nhs.uk/symptoms/swallowing-problems-dysphagia/",
        "section": "Symptoms / Urgent advice"
      },
      {
        "title": "NCCIH：鍼の研究と安全性",
        "url": "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",
        "section": "Is acupuncture safe? / More To Consider"
      }
    ]
  },
  "case-11-cervicobrachial-syndrome": {
    "message": "新しい・進行する腕や脚の脱力、歩行の変化などは受診を優先する。頚部の安全な深度や方向を一律の寸・cmで決めることはできない。検査一つで原因を確定せず、頚部刺鍼で必ず事故を回避できるとは案内しない。",
    "sources": [
      {
        "title": "NICE NG127：神経症状の認識と紹介",
        "url": "https://www.nice.org.uk/guidance/ng127/chapter/Recommendations-for-adults-aged-over-16",
        "section": "1.7 Limb or facial weakness / 1.10 Sensory symptoms"
      },
      {
        "title": "NCCIH：鍼の研究と安全性",
        "url": "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",
        "section": "Is acupuncture safe? / More To Consider"
      }
    ]
  },
  "case-12-orthostatic-hypotension": {
    "message": "低血圧と繰り返す立ちくらみ・息切れは医療機関で何を調べたか確かめる。失神に胸痛や呼吸困難が伴う場合などは救急評価を優先する。中気下陥を血液量不足や起立性低血圧の原因と同一視しない。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：低血圧",
        "url": "https://www.nhs.uk/conditions/low-blood-pressure-hypotension/",
        "section": "Symptoms / See a GP / Causes"
      }
    ]
  },
  "case-13-alopecia-areata": {
    "message": "急に進行する脱毛は皮膚科等で原因評価を受けたか確認する。血熱という分類で自己免疫反応や原因を確定しない。脱毛斑の境界へ刺鍼すれば毛包を傷つけず治る、とは保証できない。",
    "sources": [
      {
        "title": "NHS：脱毛",
        "url": "https://www.nhs.uk/symptoms/hair-loss/",
        "section": "Causes / See a GP / What happens at your appointment"
      },
      {
        "title": "NCCIH：鍼の研究と安全性",
        "url": "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",
        "section": "Is acupuncture safe? / More To Consider"
      }
    ]
  },
  "case-14-knee-osteoarthritis": {
    "message": "赤く熱を持つ急な腫れ、発熱、強い安静時痛、体重をかけられない状態は受診を優先する。変形性膝関節症の診断歴だけで感染性関節炎などを除外しない。経穴で関節内の水分を排泄できるとは断定しない。",
    "sources": [
      {
        "title": "NHS：膝の痛み",
        "url": "https://www.nhs.uk/symptoms/knee-pain/",
        "section": "Urgent advice / Common causes"
      }
    ]
  },
  "case-15-peptic-ulcer-pain": {
    "message": "吐血、黒いタール状便、持続する急激な腹痛、失神などはすぐに医療機関を受診する必要があります。大量の出血・持続する激痛・意識の異常があるときは、すぐに119番へ連絡してください。止血処置の適応は医療機関が判断し、鍼灸の反応を待たない。",
    "sources": [
      {
        "title": "NIDDK：消化性潰瘍の症状と原因",
        "url": "https://www.niddk.nih.gov/health-information/digestive-diseases/peptic-ulcers-stomach-ulcers/symptoms-causes",
        "section": "Symptoms of complications / Causes"
      },
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      }
    ]
  },
  "case-16-atopic-dermatitis": {
    "message": "痛み・熱感・腫れ、膿や浸出液、急な拡大、発熱は感染などの受診につなげる。遠隔穴なら必ず施術できると判断せず、皮膚科治療や処方薬を自己判断で中止させない。",
    "sources": [
      {
        "title": "NHS：アトピー性湿疹",
        "url": "https://www.nhs.uk/conditions/atopic-eczema/",
        "section": "Urgent advice / Causes"
      },
      {
        "title": "NCCIH：鍼の研究と安全性",
        "url": "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",
        "section": "Is acupuncture safe? / More To Consider"
      }
    ]
  },
  "case-17-panic-anxiety": {
    "message": "過去の心電図・血液検査が正常でも、新しい発作の原因を除外できない。持続する胸痛、急な呼吸困難、失神などがあるときは、すぐに119番へ連絡してください。パニックと決めて鍼や呼吸誘導の反応を待たず、必要な受診を優先する。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：胸痛",
        "url": "https://www.nhs.uk/symptoms/chest-pain/",
        "section": "Immediate action required / Common causes"
      }
    ]
  },
  "case-18-severe-eyestrain": {
    "message": "急な強い眼痛、充血、見え方の変化、吐き気などは緊急の眼科評価を優先する。慢性のかすみ目も受診状況を確認する。眼窩の外縁や遠隔穴を「安全な穴」として一律に扱わず、自己刺鍼は行わない。",
    "sources": [
      {
        "title": "NHS：緑内障",
        "url": "https://www.nhs.uk/conditions/glaucoma/",
        "section": "Symptoms / Immediate action required"
      },
      {
        "title": "NCCIH：鍼の研究と安全性",
        "url": "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",
        "section": "Is acupuncture safe? / More To Consider"
      }
    ]
  },
  "case-19-chronic-dry-cough": {
    "message": "3週間を超える咳は医療機関で原因の評価を受ける。血痰、体重減少、悪化や胸痛・息苦しさも確認する。急な呼吸困難などがあるときは、すぐに119番へ連絡してください。乾いた咳や舌脈だけで肺陰虚を確定し、受診を遅らせない。",
    "sources": [
      {
        "title": "NHS：咳",
        "url": "https://www.nhs.uk/symptoms/cough/",
        "section": "See a GP / Urgent advice"
      },
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      }
    ]
  },
  "case-20-bells-palsy": {
    "message": "新しい顔の麻痺はすぐに医療機関を受診する。急な顔のゆがみや手足・言語の異常があるときは、すぐに119番へ連絡してください。額の動きだけで脳卒中を除外しない。診断後も医師の早期治療と閉眼不全への眼の保護を優先し、鍼の効果・予後改善を保証しない。",
    "sources": [
      {
        "title": "NHS：ベル麻痺",
        "url": "https://www.nhs.uk/conditions/bells-palsy/",
        "section": "Immediate action required / Urgent advice / Treatment"
      },
      {
        "title": "AAO-HNSF：Bell’s Palsy Guideline Summary（2013）",
        "url": "https://www.entnet.org/wp-content/uploads/files/Bulletin_BellsExecSummary_Final_102313.pdf",
        "section": "Statement 9: Acupuncture"
      }
    ]
  }
};

export const CLINICAL_CASES: ClinicalCase[] = CASE_MODELS.map(clinicalCase => ({
  ...clinicalCase,
  reasoningSteps: [{
    stepNumber: 1,
    stepTitle: "最初に行う安全確認",
    question: `「${clinicalCase.patient.chiefComplaint}」という相談です。症状や診察の手がかりから、東洋医学で考える体の状態を「証」と呼びます。証を考える前に、何を確認しますか。`,
    options: [
      { id: "safety-1", label: "症状の始まり方と新しい変化を聞き、受診を急ぐ所見がないかを確かめる。", isCorrect: true, feedback: CLINICAL_CASE_SAFETY_GUIDANCE[clinicalCase.id].message },
      { id: "safety-2", label: "舌や脈から証を選び、その結果で受診が必要かを決める。", isCorrect: false, feedback: "舌や脈から考える伝統医学の候補とは別に、症状が急に出たか、ほかの異常がないかを確かめます。" },
      { id: "safety-3", label: "施術で症状が軽くなるかを見てから受診を考える。", isCorrect: false, feedback: "一時的に楽になっても原因は分かりません。受診を急ぐ所見があれば、施術の反応を待たず医療機関で評価を受けます。" },
    ],
  }, ...clinicalCase.reasoningSteps.map(step => ({ ...step, stepNumber: step.stepNumber + 1 }))],
}));
