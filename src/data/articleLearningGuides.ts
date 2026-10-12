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
    focus: '古典の成立と日本での展開をたどり、経験の蓄積と比較研究の違いを説明する。',
    limitation: '長い使用歴や歴史的説明だけでは、現在の治療効果を証明できません。',
    summary: '『黄帝内経』の成立と、日本の古方派・管鍼法・腹診の展開をたどります。経験の蓄積と現代の比較研究の違いを学び、システム科学との比較は筆者の解釈として読みます。',
  },
  'science-of-yinyang-gogyo': {
    lectureId: 'lecture-yinyang-3', caseId: 'mixed-temperature',
    focus: '陰陽では何を比べるか、五行ではどの分類が支え合い、抑え合うかを確かめる。',
    limitation: '制御工学との対比は理解のための比喩であり、生理学的な同一性を示しません。',
    summary: '陰陽の比較基準と、対立・互根・消長・転化、五行の相生・相剋を学びます。制御工学の例えが何を説明するためのものかを確認し、身体の仕組みや治療効果を証明した研究とは区別して読みます。',
  },
  'science-of-qi-blood-fluid': {
    lectureId: 'lecture-qiblood-1', caseId: 'fatigue-reasoning',
    focus: '気・血・津液がどんな働きを表すかを読み、症状や所見を組み合わせて考える。',
    limitation: '気虚・血虚などの分類は、現代医学の検査値や病名に一対一で対応しません。',
    summary: '気・血・津液の働きと、気虚・血虚・瘀血・水滞などに関連づける所見を学びます。貧血・脱水・むくみの原因を調べることとは分けて考え、証だけで受診や服薬・水分摂取を決められない理由を確認します。',
  },
  'science-of-meridians-network': {
    lectureId: 'lecture-diagnosis-9', caseId: 'back-pain-referral',
    focus: '経絡図の名称・走行と、神経や筋膜の研究で実際に調べた部位・反応を読み比べる。',
    limitation: '神経や筋膜との類似だけで、経絡の走行や機能が実証されたとは言えません。',
    summary: '十二正経・奇経八脈・絡脈の名称と伝統的な働きを学び、結合組織や神経経路の研究で何を調べたかを確認します。ネットワークの例えは理解の補助です。限られた部位や動物の反応だけでは、患者の症状が改善するかは判断できません。',
  },
  'science-of-acupoints-mechanotransduction': {
    lectureId: 'lecture-treatment-8', caseId: 'back-pain-referral',
    focus: '経穴の位置の標準、周囲の解剖、刺激への反応について、資料ごとに調べたことを確認する。',
    limitation: '細胞・動物・画像研究の結果を、特定の経穴の臨床効果へ直接置き換えません。',
    summary: '経穴の位置を共有する標準と、結合組織や鍼の引き抜き抵抗を調べた研究を読み比べます。特定の部位や動物で反応があっても、すべての経穴の働きや患者の症状改善が証明されたことにはならないと確認します。',
  },
  'science-of-pulse-diagnosis': {
    lectureId: 'lecture-diagnosis-6', caseId: 'mixed-temperature',
    focus: '触れた脈の特徴を記録し、検者の記録が一致することと、病気を正しく判別できることを比べる。',
    limitation: '脈の特徴だけでは個人の疾患や証を確定できません。',
    summary: '脈に触れた特徴を表す伝統用語と、姿勢や押す強さなどの観察条件を学びます。検者の記録が一致しても、病気を正しく診断できるとは限らないことを原著で確認し、不整脈や動悸で受診が必要な症状も読みます。',
  },
  'science-of-abdominal-diagnosis': {
    lectureId: 'lecture-diagnosis-6', caseId: 'fatigue-reasoning',
    focus: '触診で感じた抵抗と本人が訴えた痛みを記録し、腹証の解釈と病気の診断を混同しない。',
    limitation: '腹証を器質的疾患の診断・除外や、処方の自動決定に使いません。',
    summary: '腹証の用語がどんな所見を表すかを学び、触診時の条件を確認します。模型で感触を教える研究と、病気を正しく診断できるかを調べる研究の違いを読み、受診すべき腹痛や、腹証だけで処方を決められない理由を学びます。',
  },
  'science-of-tongue-diagnosis': {
    lectureId: 'lecture-diagnosis-5', caseId: 'mixed-temperature',
    focus: '見た舌色・舌苔・舌形と、そこから考えた伝統的な分類を別々に記録する。',
    limitation: '舌の見た目だけで全身状態や病名を確定しません。持続する症状は口腔の医学的評価につなぎます。',
    summary: '舌色・舌苔・舌形について見た特徴と、伝統的な分類の候補を分けて記録します。公的な医療情報を読み、口腔乾燥や白い斑点の原因を確認する理由と、見た目だけで判断できないことを学びます。',
  },
  'science-of-acupuncture-neuroscience': {
    lectureId: 'lecture-treatment-9', caseId: 'back-pain-referral',
    focus: '鍼で起こる組織や神経の反応と、患者の症状や生活機能の改善を、別々の研究で確かめる。',
    limitation: '効果は対象疾患・比較条件・介入方法によって異なり、機序研究だけでは決まりません。',
    summary: '鍼刺激と組織・神経の反応に関する研究、臨床効果の評価、安全性を整理します。組織や動物で測定した反応と、患者の症状・機能の変化を分けて読み、対象疾患や比較条件を確認します。',
  },
  'science-of-kampo-network-pharmacology': {
    lectureId: 'lecture-treatment-1', caseId: 'fatigue-reasoning',
    focus: '生薬の伝統的な役割を読み、作用の予測、製剤の臨床研究、添付文書をそれぞれ確認する。',
    limitation: 'ネットワーク薬理学のモデルだけで、有効性や個人への処方適応を確定しません。',
    summary: '証と生薬の役割を学び、成分の作用を予測する研究と、製剤の臨床試験で確かめたことを読み比べます。現行の添付文書と公的な副作用資料で、重複する生薬や受診が必要な症状を確認します。',
  },
  'east-west-integrative-unified-theory': {
    lectureId: 'lecture-diagnosis-10', caseId: 'mixed-temperature',
    focus: '観察したことから仮説や対応を考え、結果を見直す筆者のモデルで、何を確かめるかを学ぶ。',
    limitation: '統一的に説明できることと、理論が臨床的に検証されたことは別です。',
    summary: '筆者のモデルを使い、東洋医学と現代医学で何を観察し、どう分類し、どこまで研究で確かめたかを比べます。説明が一つにつながっても、治療効果や診断の正確さが証明されたことにはならないと確認します。',
  },
  'east-west-integrative-gerd-gastric': {
    lectureId: 'lecture-diagnosis-2', caseId: 'fatigue-reasoning',
    focus: '胸やけや胃痛を医学的に調べることと、胃気上逆・心下痞という伝統用語で説明することを比べる。',
    limitation: '伝統的な見立てでGERDの診断・標準治療を置き換えません。',
    summary: '胸やけ・呑酸と胃痛・胃もたれは同じ病態とは限りません。医学的な診断と標準治療を先に考え、胃気上逆・心下痞を伝統用語として読みます。鍼灸・漢方の併用で何を確かめ、どんな効果を保証できないかを解説します。',
  },
};
