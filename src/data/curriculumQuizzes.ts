export interface QuizQuestion {
  id: string;
  lectureId: string;
  chapterId: string;
  chapterTitle: string;
  lectureTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const CURRICULUM_QUIZZES: Record<string, QuizQuestion> = {
  // 第1講: 陰陽論
  'lecture-yin-yang-1': {
    id: 'quiz-yin-yang-1',
    lectureId: 'lecture-yin-yang-1',
    chapterId: 'yin-yang',
    chapterTitle: '第1講 陰陽論',
    lectureTitle: '第1章 陰陽とは何か',
    question: '東洋医学における「陰陽」の捉え方として、最も適切なものはどれですか？',
    options: [
      '陰が悪で陽が善であり、陽を常に最大化することが目的である',
      '世界を絶対的に固定された二つの物質に分割する分類法である',
      '対立する二つの属性が互いに制約・依存し合いながら、動的に調和を保つ関係性を示す概念である',
      '西洋医学の解剖学的な臓器と1対1で対応する物理的な実体である',
    ],
    correctIndex: 2,
    explanation: '陰陽論は絶対的な善悪や固定された物質ではなく、相対的で動的なバランス（対立・制約・互根・消長・転化）によって森羅万象や人体の生命現象を捉える思想・理論です。',
  },
  'lecture-yin-yang-2': {
    id: 'quiz-yin-yang-2',
    lectureId: 'lecture-yin-yang-2',
    chapterId: 'yin-yang',
    chapterTitle: '第1講 陰陽論',
    lectureTitle: '第2章 陰陽は比較によって決まる',
    question: '陰陽の「相対性」に関する説明として正しいものはどれですか？',
    options: [
      '一度「陰」と決まった事象は、どのような基準で比較しても常に陰のままである',
      '「温かい」に対して「熱い」を比較した場合、「温かい」は陰の属性を帯びるように、基準によって陰陽は変化する',
      '陰陽は人間が主観的に決めるものであり、自然界の法則性とは一切関係がない',
      '昼と夜の比較において、昼が陰で夜が陽となるのが原則である',
    ],
    correctIndex: 1,
    explanation: '陰陽は絶対的な属性ではなく比較基準によって決まる相対的なものです。氷（陰）に対する水（陽）であっても、熱湯（陽）と比較した場合は水は「陰」の側になります。',
  },
  'lecture-yin-yang-5': {
    id: 'quiz-yin-yang-5',
    lectureId: 'lecture-yin-yang-5',
    chapterId: 'yin-yang',
    chapterTitle: '第1講 陰陽論',
    lectureTitle: '第5章 身体を陰陽で分ける',
    question: '人体の構造における陰陽の区分として、伝統的な東洋医学の原則に合致するものはどれですか？',
    options: [
      '背側は陰、腹側は陽である',
      '身体の上部は陰、下部は陽である',
      '体表（皮膚・筋肉）は陽、体内深部（臓腑）は陰である',
      '六腑は陰、五臓は陽である',
    ],
    correctIndex: 2,
    explanation: '人体の陰陽区分では「上部＝陽・下部＝陰」「背部＝陽・腹部＝陰」「体表（表）＝陽・体内（裏）＝陰」「六腑＝陽・五臓＝陰」と整理されます。',
  },

  // 第2講: 五行論
  'lecture-five-elements-1': {
    id: 'quiz-five-elements-1',
    lectureId: 'lecture-five-elements-1',
    chapterId: 'five-elements',
    chapterTitle: '第2講 五行論',
    lectureTitle: '第1章 五行論とは何か',
    question: '陰陽論と五行論の役割の違いとして、最も的確な表現はどれですか？',
    options: [
      '陰陽論は病気のみを扱い、五行論は健康増進のみを扱う',
      '陰陽論が「二極の動的バランス」を捉えるのに対し、五行論は「五つの機能的性質と相互循環ネットワーク」を捉える',
      '五行論は陰陽論よりも新しいため、陰陽論を完全に置き換えて不要にした',
      '五行論は木・火・土・金・水という五つの元素を原子レベルで分析する物理学である',
    ],
    correctIndex: 1,
    explanation: '陰陽論が動的バランスや寒熱・活動性の基本軸を説明するのに対し、五行論は事象を五つの機能的カテゴリに分類し、相生・相剋という複雑なシステム的連関を解き明かします。',
  },
  'lecture-five-elements-3': {
    id: 'quiz-five-elements-3',
    lectureId: 'lecture-five-elements-3',
    chapterId: 'five-elements',
    chapterTitle: '第2講 五行論',
    lectureTitle: '第3章 相生を理解する',
    question: '五行の「相生関係（母子関係）」において、「土」が生み出す行（子）はどれですか？',
    options: ['木', '火', '金', '水'],
    correctIndex: 2,
    explanation: '相生の順序は「木生火（木は火を生じ）➜ 火生土（火は灰となり土を生じ）➜ 土生金（土は鉱物を生じ）➜ 金生水（金属に水滴が生じ）➜ 水生木（水は木を育てる）」です。したがって土の子は「金」です。',
  },
  'lecture-five-elements-4': {
    id: 'quiz-five-elements-4',
    lectureId: 'lecture-five-elements-4',
    chapterId: 'five-elements',
    chapterTitle: '第2講 五行論',
    lectureTitle: '第4章 相剋を理解する',
    question: '五行の「相剋（制約関係）」における本来の意義として正しいものはどれですか？',
    options: [
      '相手の行を完全に破壊して消滅させるための攻撃的関係である',
      '相生だけでは一方的な過剰・暴走が起きるため、適度なブレーキをかけて全体の恒常性を維持する関係である',
      '病気になった時だけに異常発生する病理的な破壊作用である',
      '木が火を抑え、火が土を抑えるという順序で働く',
    ],
    correctIndex: 1,
    explanation: '相剋は破壊ではなく「健全な抑制・ブレーキ」です。相生による成長と相剋による制約が揃って初めて、全体が生長化収蔵の健全なバランスを保ちます（相制相生）。',
  },

  // 第3講: 気血水論
  'lecture-qi-blood-water-1': {
    id: 'quiz-qi-blood-water-1',
    lectureId: 'lecture-qi-blood-water-1',
    chapterId: 'qi-blood-water',
    chapterTitle: '第3講 気血水論',
    lectureTitle: '第1章 気血水とは何か',
    question: '気・血・水（津液）の三要素の役割に関する記述として、最も適切なものはどれですか？',
    options: [
      '気は実体を持たない幻想であり、人体は血と水だけで生命を維持している',
      '気はエネルギーや運動性（無形・陽）、血と水は身体を滋養・滋潤する液体（有形・陰）として協調している',
      '血と水は全く同じものであり、東洋医学では区別されない',
      '水（津液）は関節の動きだけに関与し、他の臓腑とは関わりがない',
    ],
    correctIndex: 1,
    explanation: '気は生命の活力・温煦・推動を司る陽の機能、血と水（津液）は全身を滋養し潤す陰の物質的基盤であり、両者が一体となって生命活動を維持しています。',
  },
  'lecture-qi-blood-water-2': {
    id: 'quiz-qi-blood-water-2',
    lectureId: 'lecture-qi-blood-water-2',
    chapterId: 'qi-blood-water',
    chapterTitle: '第3講 気血水論',
    lectureTitle: '第2章 気の働きを理解する',
    question: '「汗や尿が漏れ出ないように留め、内臓が下垂しないように支える」気の作用はどれですか？',
    options: ['推動作用', '温煦作用', '防御作用', '固摂作用'],
    correctIndex: 3,
    explanation: '気の五大作用のうち、体液（血液・汗・尿）の過度な漏出を防ぎ、内臓を正常な位置に維持・持ち上げる働きを「固摂（こせつ）作用」と呼びます。',
  },
  'lecture-qi-blood-water-6': {
    id: 'quiz-qi-blood-water-6',
    lectureId: 'lecture-qi-blood-water-6',
    chapterId: 'qi-blood-water',
    chapterTitle: '第3講 気血水論',
    lectureTitle: '第6章 血の異常を整理する',
    question: '血液の運行が停滞し、局所に滞って刺すような痛みや暗紫色の舌所見を呈する病態はどれですか？',
    options: ['血虚', '瘀血（おけつ）', '気滞', '気陥'],
    correctIndex: 1,
    explanation: '血の不足は「血虚」、血の流れが滞り鬱滞した状態を「瘀血（おけつ）」と呼びます。瘀血の特徴は固定性の刺痛、肌のくすみ、唇や舌の暗紫斑などです。',
  },

  // 第4講: 生命機能論
  'lecture-vital-function-2': {
    id: 'quiz-vital-function-2',
    lectureId: 'lecture-vital-function-2',
    chapterId: 'vital-function',
    chapterTitle: '第4講 生命機能論',
    lectureTitle: '第2章 精・気・血・津液・神の関係',
    question: '生命の根本物質である「精」に関する記述として正しいものはどれですか？',
    options: [
      '両親から受け継ぐ「先天の精」と、飲食物から脾胃で作られる「後天の精」が合わさって腎に蓄えられる',
      '精は生まれた時の量で完全に固定され、日々の食事や生活習慣で補うことは不可能である',
      '精は精神活動だけを司り、生殖や成長・発育には関与しない',
      '精が消耗しても気の生成には一切影響を与えない',
    ],
    correctIndex: 0,
    explanation: '精には生まれつきの「先天の精」と、飲食や呼吸を通じて補充される「後天の精」があり、双方が腎において合流・充填され、生命力や成長・生殖の源となります。',
  },
  'lecture-vital-function-4': {
    id: 'quiz-vital-function-4',
    lectureId: 'lecture-vital-function-4',
    chapterId: 'vital-function',
    chapterTitle: '第4講 生命機能論',
    lectureTitle: '第4章 営気と衛気の役割',
    question: '「体表を巡り、外邪の侵入を防ぎ、腠理（毛穴）を開閉して体温を調節する」気はどれですか？',
    options: ['営気（えいき）', '衛気（えき）', '宗気（そうき）', '元気（げんき）'],
    correctIndex: 1,
    explanation: '血管内を流れて全身に栄養を与えるのが「営気」、脈外・体表部を高速に巡りバリア機能と体温調節を担うのが「衛気（えき）」です。',
  },

  // 第5講: 病機論
  'lecture-pathology-1': {
    id: 'quiz-pathology-1',
    lectureId: 'lecture-pathology-1',
    chapterId: 'pathology',
    chapterTitle: '第5講 病機論',
    lectureTitle: '第1章 病機とは何か',
    question: '「病因」「病機」「症状」「証」の違いとして適切な組み合わせはどれですか？',
    options: [
      '病因＝病気になった結果、病機＝病名、症状＝治療法、証＝西洋医学的診断',
      '病因＝病気のきっかけ・原因、病機＝発症・変化のメカニズム、症状＝患者の自覚・他覚所見、証＝現時点の病態構造の総合判断',
      '病機とは原因菌の学名のことであり、東洋医学では使用しない用語である',
      '証とは脈拍数の数値そのものを指す言葉である',
    ],
    correctIndex: 1,
    explanation: '病因（外的・内的要因などのきっかけ）➜ 病機（体内での変化の仕組み）➜ 症状（表面に現れた現象）➜ 証（それらを総合して導き出した治療のための病態判断）という論理構造を持ちます。',
  },
  'lecture-pathology-6': {
    id: 'quiz-pathology-6',
    lectureId: 'lecture-pathology-6',
    chapterId: 'pathology',
    chapterTitle: '第5講 病機論',
    lectureTitle: '第6章 寒熱と陰陽の失調',
    question: '「陰液が不足したために、相対的に陽気が高ぶって手足のほてりや盗汗（寝汗）が生じる」病態はどれですか？',
    options: ['実熱（陽盛）', '虚熱（陰虚）', '実寒（陰盛）', '虚寒（陽虚）'],
    correctIndex: 1,
    explanation: '陰液（身体を冷まし潤す力）が不足して生じる熱を「虚熱（陰虚発熱）」と呼びます。外邪による熱亢進（実熱）とは異なり、微熱や五心煩熱・寝汗などが特徴です。',
  },

  // 第6講: 診断論
  'lecture-diagnosis-2': {
    id: 'quiz-diagnosis-2',
    lectureId: 'lecture-diagnosis-2',
    chapterId: 'diagnosis',
    chapterTitle: '第6講 診断論',
    lectureTitle: '第2章 安全性と対応範囲を先に確認する',
    question: '東洋医学的な診察や施術を行う前に、最優先で確認すべき事項はどれですか？',
    options: [
      '患者の五行の生年月日分類',
      '緊急受診を要するレッドフラッグ（重篤な器質的疾患の兆候）の有無と安全性の担保',
      'どの漢方薬が最も高価であるか',
      '舌の色が完全なピンク色であるかどうか',
    ],
    correctIndex: 1,
    explanation: '現代の臨床では、施術や弁証の前に「医療機関への救急搬送や精密検査が必要なレッドフラッグ兆候」がないかを確認し、安全圏の中で施術を行うことが最重要です。',
  },
  'lecture-diagnosis-5': {
    id: 'quiz-diagnosis-5',
    lectureId: 'lecture-diagnosis-5',
    chapterId: 'diagnosis',
    chapterTitle: '第6講 診断論',
    lectureTitle: '第5章 望診・聞診で観察する',
    question: '望診における「舌診」の基本事項として正しいものはどれですか？',
    options: [
      '舌質（舌本体の筋肉・色）は気血や臓腑の虚実を反映し、舌苔（表面の苔）は胃気や邪気の深浅・寒熱を反映する',
      '舌苔は汚れに過ぎないため、診察前に強くブラッシングしてすべて落とさせるべきである',
      '舌先（舌尖）は腎を反映し、舌根部は心・肺を反映する',
      '舌が白く乾いている状態は、極度の実熱を表す',
    ],
    correctIndex: 0,
    explanation: '舌質は人体の気血・津液の充実度（虚実）を、舌苔は病邪の性質（寒熱）や胃気の盛衰をよく表します。舌尖は心肺、舌根は腎を反映します。',
  },

  // 第7講: 治法論
  'lecture-treatment-3': {
    id: 'quiz-treatment-3',
    lectureId: 'lecture-treatment-3',
    chapterId: 'treatment',
    chapterTitle: '第7講 治法論',
    lectureTitle: '第3章 補瀉・寒熱の原則を理解する',
    question: '東洋医学の根本原則「虚すればこれを補い、実すればこれを瀉す」「熱すればこれを清（寒）にし、寒すればこれを温む」に合致する治則はどれですか？',
    options: ['正治（逆治）', '反治（従治）', '標治優先', '因地制宜'],
    correctIndex: 0,
    explanation: '病態の性質と正反対の性質を持つ治療手段を用いてバランスを回復させる標準的な原則を「正治（または逆治）」と呼びます。',
  },
  'lecture-treatment-4': {
    id: 'quiz-treatment-4',
    lectureId: 'lecture-treatment-4',
    chapterId: 'treatment',
    chapterTitle: '第7講 治法論',
    lectureTitle: '第4章 本治・標治と優先順位',
    question: '本治（根本治療）と標治（対症・緊急治療）の選択において、「急な激痛や激しい呼吸困難など、急迫した標病」がある場合の原則はどれですか？',
    options: [
      'いかなる場合も本治（体質改善）を優先し、激痛は我慢させる',
      '「急なれば則ちその標を治し、緩なれば則ちその本を治す」に従い、まず標病を救急緩和する',
      '標治は邪道であるため、東洋医学では一切標治を行わない',
      '本治と標治の区別は現代の鍼灸・漢方では完全に廃止された',
    ],
    correctIndex: 1,
    explanation: '原則は「急なれば則ちその標を治し、緩なれば則ちその本を治す」です。急性症状や激痛で生活が破綻する危険がある時は、まず標治で急場をしのぎ、状態が落ち着いてから本治を行います。',
  },

  // 第8講: 実践論
  'lecture-practice-1': {
    id: 'quiz-practice-1',
    lectureId: 'lecture-practice-1',
    chapterId: 'practice',
    chapterTitle: '第8講 実践論',
    lectureTitle: '第1章 臨床の全体プロセスを確認する',
    question: '臨床現場における実践プロセスの順序として、最も論理的で安全な流れはどれですか？',
    options: [
      '施術の実行 ➜ 診断 ➜ 評価 ➜ 安全確認',
      '安全確認・情報収集 ➜ 弁証（仮説構築・検証）➜ 治療方針・配穴決定 ➜ 施術・セルフケア提案 ➜ 再評価',
      '主訴を聞いた瞬間に特定のツボを決め、問診や安全確認は省略する',
      '患者が希望するツボにだけ鍼を打ち、施術後の変化確認は行わない',
    ],
    correctIndex: 1,
    explanation: '安全確認と丁寧な情報収集から始まり、弁証で病態を捉え、治則に沿ったアプローチを選定し、最後に結果を評価して次回に繋げるサイクルが臨床実践の標準プロセスです。',
  },
  'lecture-practice-11': {
    id: 'quiz-practice-11',
    lectureId: 'lecture-practice-11',
    chapterId: 'practice',
    chapterTitle: '第8講 実践論',
    lectureTitle: '第11章 セルフケアと養生を指導する',
    question: '患者へのセルフケア提案において、治療効果を持続させるために最も重要な視点はどれですか？',
    options: [
      '1日2時間以上かかる過酷な運動メニューを義務付ける',
      '患者の生活習慣・負荷要因に寄り添い、無理なく日常に組み込める小さな養生法を共創する',
      '民間療法をできる限り多く同時に実践させる',
      'セルフケアをすると治療院に来なくなるため、養生指導は一切行わない',
    ],
    correctIndex: 1,
    explanation: '東洋医学の極意は「治未病」と「養生」にあります。患者の生活実態に合致した持続可能なセルフケアを提案することが、根本的な体質改善と再発防止の鍵となります。',
  },
};
