export interface ArticleLearningGuide {
  lectureId: string;
  caseId: string;
  focus: string;
  limitation: string;
  summary: string;
}
export const ARTICLE_LEARNING_GUIDES: Record<string, ArticleLearningGuide> = {
  'science-of-oriental-medicine-history': {
    lectureId: 'lecture-yinyang-1', caseId: 'fatigue-reasoning',
    focus: '古典の成立と日本での展開を、現代の臨床研究と分けて読む。',
    limitation: '長い使用歴や歴史的説明だけでは、現在の治療効果を証明できません。',
    summary: '東洋医学の成立、日本での展開、経験的な知識と現代の研究方法の違いを整理します。システム科学との比較は、歴史を理解するための筆者の解釈として扱います。',
  },
  'science-of-yinyang-gogyo': {
    lectureId: 'lecture-yinyang-3', caseId: 'mixed-temperature',
    focus: '陰陽の比較基準と、五行の相生・相剋を区別する。',
    limitation: '制御工学との対比は理解のための比喩であり、生理学的な同一性を示しません。',
    summary: '陰陽の相対性・対立・互根・消長・転化と、五行の相生・相剋を学びます。システム制御との対比を、伝統理論そのものや検証済みの生理学と区別して解説します。',
  },
  'science-of-qi-blood-fluid': {
    lectureId: 'lecture-qiblood-1', caseId: 'fatigue-reasoning',
    focus: '気・血・津液の伝統的な機能と、所見を組み合わせる考え方を学ぶ。',
    limitation: '気虚・血虚などの分類は、現代医学の検査値や病名に一対一で対応しません。',
    summary: '気・血・津液の伝統的な役割、不足や滞りの分類、相互関係を整理します。代謝・循環・体液との比較は理解の補助であり、伝統概念を特定の物質や病名と同一視しません。',
  },
  'science-of-meridians-network': {
    lectureId: 'lecture-diagnosis-9', caseId: 'back-pain-referral',
    focus: '伝統的な経絡の記述と、神経・筋膜などを調べる研究を分ける。',
    limitation: '神経や筋膜との類似だけで、経絡の走行や機能が実証されたとは言えません。',
    summary: '経絡の伝統的な役割を整理し、神経・筋膜・画像研究との接点と限界を紹介します。「生体情報ネットワーク」という説明は筆者の理解モデルであり、経絡の実体を確定した結論ではありません。',
  },
  'science-of-acupoints-mechanotransduction': {
    lectureId: 'lecture-treatment-8', caseId: 'back-pain-referral',
    focus: '経穴の位置、局所解剖、刺激に関する研究を別々の根拠として読む。',
    limitation: '細胞・動物・画像研究の結果を、特定の経穴の臨床効果へ直接置き換えません。',
    summary: '経穴の位置と解剖、機械刺激に関する研究、伝統的な選穴を整理します。研究の対象や方法を確認し、局所の反応と患者の症状改善を区別して読み進めます。',
  },
  'science-of-pulse-diagnosis': {
    lectureId: 'lecture-diagnosis-6', caseId: 'mixed-temperature',
    focus: '脈の触知情報と、四診全体から判断する過程を区別する。',
    limitation: '脈の特徴だけでは個人の疾患や証を確定できません。',
    summary: '脈診の伝統的な分類と、血管・圧力波に関する生理学的な説明を比較します。触知所見は問診などと組み合わせ、分類と現代医学的診断の違いを確認します。',
  },
  'science-of-abdominal-diagnosis': {
    lectureId: 'lecture-diagnosis-6', caseId: 'fatigue-reasoning',
    focus: '腹証の記述、触診で得た所見、現代医学の評価を分ける。',
    limitation: '腹証を器質的疾患の診断・除外や、処方の自動決定に使いません。',
    summary: '腹診で用いられる代表的な腹証と、触診・反射・筋膜などの説明を整理します。伝統的な見立て、研究に基づく知見、筆者の対比モデルを分けて読みます。',
  },
  'science-of-tongue-diagnosis': {
    lectureId: 'lecture-diagnosis-5', caseId: 'mixed-temperature',
    focus: '観察した舌色・舌苔・舌形と、それを解釈する分類を分ける。',
    limitation: '舌の見た目だけで全身状態や病名を確定しません。時間尺度の説明は筆者のモデルです。',
    summary: '舌色・舌苔・舌形の観察と伝統的な解釈を、現代の研究と比較します。舌が一定期間の全身状態を映すという説明は筆者の理解モデルであり、検証済みの診断指標と区別します。',
  },
  'science-of-acupuncture-neuroscience': {
    lectureId: 'lecture-treatment-9', caseId: 'back-pain-referral',
    focus: '作用機序を調べる研究と、臨床効果を調べる試験を区別する。',
    limitation: '効果は対象疾患・比較条件・介入方法によって異なり、機序研究だけでは決まりません。',
    summary: '鍼刺激と組織・神経の反応に関する研究、臨床効果の評価、安全性を整理します。提案されている作用機序と患者の転帰を区別し、対象疾患や比較条件を確認します。',
  },
  'science-of-kampo-network-pharmacology': {
    lectureId: 'lecture-treatment-1', caseId: 'fatigue-reasoning',
    focus: '伝統的な方剤構成、薬理学の仮説、製剤ごとの臨床研究を分ける。',
    limitation: 'ネットワーク薬理学のモデルだけで、有効性や個人への処方適応を確定しません。',
    summary: '漢方の方剤構成と証に基づく考え方を、薬理学・臨床研究と比較します。多成分の作用モデル、製剤ごとのエビデンス、副作用の確認を分けて扱います。',
  },
  'east-west-integrative-unified-theory': {
    lectureId: 'lecture-diagnosis-10', caseId: 'mixed-temperature',
    focus: '観察・仮説・介入・再評価をつなぐ筆者の理解モデルを検討する。',
    limitation: '統一的に説明できることと、理論が臨床的に検証されたことは別です。',
    summary: '東洋医学と現代医学を比較する筆者のモデルを紹介し、伝統的な記述、研究知見、未検証の仮説を分けます。統一的な説明を治療効果や診断精度の証明として扱いません。',
  },
  'east-west-integrative-gerd-gastric': {
    lectureId: 'lecture-diagnosis-2', caseId: 'fatigue-reasoning',
    focus: '標準的な医療評価と、胃気上逆・心下痞という伝統的な整理を分ける。',
    limitation: '伝統的な見立てでGERDの診断・標準治療を置き換えません。',
    summary: '胸やけ・呑酸と胃痛・胃もたれは同じ病態とは限りません。医療機関での評価と標準治療を軸に、「胃気上逆」「心下痞」を伝統的な見立てとして整理し、鍼灸・漢方を併用するときの限界を解説します。',
  },
};
