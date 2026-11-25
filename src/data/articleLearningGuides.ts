import { FOUR_COMMAND_REVIEW_ARTICLE } from "./articles/fourCommandReviewArticle";

export interface ArticleLearningGuide {
  lectureId: string;
  caseId: string;
  focus: string;
  limitation: string;
  summary: string;
}
export const ARTICLE_LEARNING_GUIDES: Record<string, ArticleLearningGuide> = {
  [FOUR_COMMAND_REVIEW_ARTICLE.id]: {
    lectureId: 'lecture-treatment-8', caseId: 'back-pain-referral',
    focus: '四総穴の早見表で体の部位とツボの対応を見て、図鑑でツボの位置を確かめます。',
    limitation: '四総穴歌は、体の部位とツボの対応を覚えるための短い詩です。治療効果は、対象の病気や施術の条件ごとに研究で確かめます。',
    summary: FOUR_COMMAND_REVIEW_ARTICLE.summary,
  },
  'science-of-oriental-medicine-history': {
    lectureId: 'lecture-yinyang-1', caseId: 'fatigue-reasoning',
    focus: '古典に書かれた脈や顔色の観察と、現代の比較試験で測る痛み・生活機能を比べる。',
    limitation: '長い使用歴や歴史的説明だけでは、現在の治療効果を証明できません。',
    summary: '『黄帝内経』に残る観察や古代の九鍼、日本の古方派・管鍼法・腹診を紹介します。慢性痛の研究を例に、鍼を偽鍼と比べた場合と、鍼を受けない群と比べた場合の結果を読みます。',
  },
  'science-of-yinyang-gogyo': {
    lectureId: 'lecture-yinyang-3', caseId: 'mixed-temperature',
    focus: '陰陽では何を比べるか、五行ではどの分類が支え合い、抑え合うかを確かめる。',
    limitation: '制御工学との対比は理解のための比喩であり、生理学的な同一性を示しません。',
    summary: '陰陽は何を比べて決めるのか、五行ではどの要素が支え合い、抑え合うと考えるのかを、寒熱や相生・相剋の例で説明します。臓器の働きに関する現代医学の説明も区別して掲載しています。',
  },
  'science-of-qi-blood-fluid': {
    lectureId: 'lecture-qiblood-1', caseId: 'fatigue-reasoning',
    focus: '疲れ、張り、乾き、むくみなどの訴えを、気・血・津液の用語でどう説明するか読む。',
    limitation: '気虚・血虚などの分類は、現代医学の検査値や病名に一対一で対応しません。',
    summary: '気虚・血虚・瘀血・水滞という言葉が、どんな訴えや所見に使われるかを説明します。同じ疲れやむくみにもさまざまな原因があり、貧血や脱水の評価では経過や検査が必要です。',
  },
  'science-of-meridians-network': {
    lectureId: 'lecture-diagnosis-9', caseId: 'back-pain-referral',
    focus: '経絡図の名称・走行と、神経や筋膜の研究で実際に調べた部位・反応を読み比べる。',
    limitation: '神経や筋膜との類似だけで、経絡の走行や機能が実証されたとは言えません。',
    summary: '十二正経・奇経八脈・絡脈の違いを図で確認します。腕などの上肢で、ツボと結合組織の境目が重なるかを調べた研究を読み、実際に観察した範囲と著者が立てた仮説を比べます。',
  },
  'science-of-acupoints-mechanotransduction': {
    lectureId: 'lecture-treatment-8', caseId: 'back-pain-referral',
    focus: '骨や腱を目印に経穴を探し、鍼を引き抜くときの抵抗を測った研究で、何を比べたかを読む。',
    limitation: '細胞・動物・画像研究の結果を、特定の経穴の臨床効果へ直接置き換えません。',
    summary: '骨や腱、関節を目印にツボの位置を探します。鍼を抜くときの抵抗を測った研究を読み、刺激する場所によって症状の変化が違うかを確かめるには、どんな比較が必要かを考えます。',
  },
  'science-of-pulse-diagnosis': {
    lectureId: 'lecture-diagnosis-6', caseId: 'mixed-temperature',
    focus: '触れた脈の特徴を記録し、検者の記録が一致することと、病気を正しく判別できることを比べる。',
    limitation: '脈の特徴だけでは個人の疾患や証を確定できません。',
    summary: '脈の速さ、規則性、指を当てる強さなど、触れたときの条件と特徴をどう記録するか説明します。2人の評価者の記録を比べた原著を例に、記録の一致と診断の正確さを分けて考えます。',
  },
  'science-of-abdominal-diagnosis': {
    lectureId: 'lecture-diagnosis-6', caseId: 'fatigue-reasoning',
    focus: '触診で感じた抵抗と本人が訴えた痛みを記録し、腹証の解釈と病気の診断を混同しない。',
    limitation: '腹証を器質的疾患の診断・除外や、処方の自動決定に使いません。',
    summary: '腹診で感じる硬さと、本人が痛いと感じる圧はどう調べるのでしょうか。模型で腹診を学ぶ研究と、人の腹部を機器で測った研究を読みます。腹痛で受診を急ぐ目安も確認できます。',
  },
  'science-of-tongue-diagnosis': {
    lectureId: 'lecture-diagnosis-5', caseId: 'mixed-temperature',
    focus: '見た舌色・舌苔・舌形と、そこから考えた伝統的な分類を別々に記録する。',
    limitation: '舌の見た目だけで全身状態や病名を確定しません。持続する症状は口腔の医学的評価につなぎます。',
    summary: '同じ舌の写真を見ても、舌苔の色と舌そのものの色では、評価の一致度が異なりました。写真の研究を読みながら、舌の観察条件をどう残すかと、口の乾燥や白い斑点で受診を考える目安を確認します。',
  },
  'science-of-acupuncture-neuroscience': {
    lectureId: 'lecture-treatment-9', caseId: 'back-pain-referral',
    focus: '鍼で起こる組織や神経の反応と、患者の症状や生活機能の改善を、別々の研究で確かめる。',
    limitation: '効果は対象疾患・比較条件・介入方法によって異なり、機序研究だけでは決まりません。',
    summary: '人で鍼の引き抜き抵抗を測った研究、マウスで痛みへの反応を測った実験、慢性痛の比較試験では、測っているものが違います。各研究の対象、比べた方法、安全性の報告を読みます。',
  },
  'science-of-kampo-network-pharmacology': {
    lectureId: 'lecture-treatment-1', caseId: 'fatigue-reasoning',
    focus: '生薬の伝統的な役割を読み、作用の予測、製剤の臨床研究、添付文書をそれぞれ確認する。',
    limitation: 'ネットワーク薬理学のモデルだけで、有効性や個人への処方適応を確定しません。',
    summary: '漢方でいう証と、甘草などの生薬が処方の中でどう扱われるかを読みます。成分の作用を予測した研究、製剤を使った試験、添付文書で分かることを分け、同じ生薬の重複や副作用の確認につなげます。',
  },
  'east-west-integrative-unified-theory': {
    lectureId: 'lecture-diagnosis-10', caseId: 'mixed-temperature',
    focus: '「夕方に首が重い」という訴えから、観察したこと、考えた原因、あとで比べる項目を書き分ける。',
    limitation: '原因を説明できそうでも、診断の正確さや治療の効果を知るには、それぞれを確かめる研究が必要です。',
    summary: '症状や所見を記録すること、病名や証を考えること、治療後の変化を測ることを分けて説明します。同じ結果が得られるか、病気を見分けられるか、治療に役立つかを比べるための筆者の学習例です。',
  },
  'east-west-integrative-gerd-gastric': {
    lectureId: 'lecture-diagnosis-2', caseId: 'fatigue-reasoning',
    focus: '胸やけや胃痛を医学的に調べることと、胃気上逆・心下痞という伝統用語で説明することを比べる。',
    limitation: '伝統的な見立てでGERDの診断・標準治療を置き換えません。',
    summary: '胸やけ、酸っぱい液が上がる感じ、胃痛、胃もたれをどう伝えるか説明します。受診を急ぐ症状、標準治療で見る変化、鍼灸や漢方を併用する前に医療者と確認する点も掲載しています。',
  },
};
