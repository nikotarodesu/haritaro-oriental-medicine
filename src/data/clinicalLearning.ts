export interface ClinicalLearningGuide { situation: string; check: string; pitfall: string; complaintSlug: string; }
export const CLINICAL_LEARNING_GUIDES: Record<string, ClinicalLearningGuide> = {
  intro: { situation: '学習用の相談例から、本人の報告・解釈・不明点を分けるとき', check: '何が書かれているか、どの説明が仮説か、次に何を確認するかを三つに分けて記録する。', pitfall: '伝統用語を知ったことだけで原因や施術方法が分かったとしない。', complaintSlug: 'fatigue' },
  zangfu: { situation: '食後のもたれや疲労を、臓腑の伝統的な役割と関連づけて学ぶとき', check: '本人が話した症状と、運化・疏泄などの役割の説明を分け、経過や他の情報で未確認の点を残す。', pitfall: '脾・肝・腎という分類名を、同じ名前の臓器の病気に置き換えない。', complaintSlug: 'digestion' },
  meridians: { situation: '首や肩の学習例で、経絡の名称・経穴番号・所見の場所を区別するとき', check: '左右と部位、名称と番号の対応、本人の報告と観察条件を分けて記録する。', pitfall: '経絡の走行や圧痛の場所だけで原因を確定せず、体表の位置を刺入の指示に使わない。', complaintSlug: 'shoulder' },
  yinyang: { situation: '冷えとほてり、虚と実の所見が混在して迷ったとき', check: '部位・時刻・経過・温めた際の変化を分け、分類の根拠と不一致を記録する。', pitfall: '一つの症状や自律神経の名称を、そのまま陰陽の判定に置き換えない。', complaintSlug: 'fatigue' },
  wuxing: { situation: '情志・消化・睡眠など、複数の訴えの関係を整理するとき', check: '症状が現れた順序と生活背景を確認し、相生・相剋は伝統的な説明モデルとして扱う。', pitfall: '五行の関係だけで原因や臓器の疾患を断定しない。', complaintSlug: 'sleep' },
  qiblood: { situation: '疲労、張り、固定痛、重だるさの材料を比較するとき', check: '症状の性状・変動、食欲・便、舌脈を照合し、気血津液の候補と不足情報を分ける。', pitfall: '気虚を貧血、瘀血を血栓などの医学的診断と同一視しない。', complaintSlug: 'digestion' },
  lifedynamics: { situation: '全身の状態と局所症状の関係を考えるとき', check: '生活動作・睡眠・食事・症状の経過を確認し、どの伝統的な臓腑分類に関連づけるかは、追加所見と経過を確認して検討する。', pitfall: '伝統医学の臓腑を、解剖学的な臓器と一対一に対応させない。', complaintSlug: 'fatigue' },
  pathomechanism: { situation: '発症から現在までの変化を整理し、仮説を見直すとき', check: '増悪・軽減条件、既往・服薬・受診結果を整理し、仮説と観察事実を分ける。', pitfall: '伝統的な病因だけで、現代医学的な原因評価を済ませたとしない。', complaintSlug: 'headache' },
  diagnosis: { situation: '主訴から、次に聞く・観察する項目を決めるとき', check: '安全確認を先に行い、四診の未確認と陰性所見を区別し、矛盾も記録する。', pitfall: '証名を先に決めて、それに合う所見だけを集めない。', complaintSlug: 'back' },
  treatment: { situation: '治法と各経穴を選んだ理由を説明するとき', check: '支持所見、各穴の役割、局所の注意事項、変更条件と再評価指標を記録する。', pitfall: '穴数・構成スコアだけで、個別の処方の適否や効果を決めない。', complaintSlug: 'shoulder' },
  practice: { situation: '共通の頭痛症例で、情報収集から計画・再評価までをつなぐとき', check: '本人の報告・観察所見・候補・不足情報を分け、目標と評価指標、判断を見直す条件を次の段階へ渡す。', pitfall: '候補名や直後の変化だけで結論を決めず、新しい危険徴候や生活上の支障も確認する。', complaintSlug: 'headache' },
};
export const CLINICAL_REVISION_CASES = [
  { id: 'mixed-cold-heat', title: '足が冷え、夕方に顔がほてる', observations: [
    { label: '足の冷え', text: '足が冷える。冷えを感じる時刻はまだ聞いていない。' },
    { label: '顔のほてり', text: '夕方に顔がほてる。' },
  ], note: '舌と脈の所見は、まだ確認していません。', question: '次は何を確認しますか？', choices: [
    { text: '冷えとほてりが出る時刻や続く長さを聞き、舌と脈も確認する', appropriate: true, feedback: '冷える場所とほてる場所、それぞれを感じた時刻を分けて書くと、二つが同じ時間帯に出るかを確かめられます。' },
    { text: '足が冷えるので、全体を陽虚と確定する', appropriate: false, feedback: '冷え一つで全体像を確定できません。熱の所見と未確認項目も残します。' },
    { text: 'ほてりがあるので、全体を実熱と確定する', appropriate: false, feedback: 'ほてりの背景と冷えの材料を両方確認します。' },
  ], review: '候補に合う所見、合わない所見、まだ調べていないことを分けて書く。', lectureId: 'lecture-yinyang-1', complaintSlug: 'fatigue' },
  { id: 'no-lasting-change', title: '首の痛みが次回来院時に戻った', observations: [
    { label: '施術前', score: 6 },
    { label: '施術直後', score: 3 },
    { label: '次回来院', score: 6 },
  ], note: '仕事中に首の痛みで困る場面は変わっていません。', question: '次回に向けて何を確かめ、どう方針を見直しますか？', choices: [
    { text: '痛みが戻った時期と仕事中に困る動作を確認し、見立てや施術方針を見直す', appropriate: true, feedback: '施術直後と次回来院時の痛みは分けて記録します。仕事中の支障も同じ場面で比べ、方針を見直した理由を書きます。' },
    { text: '直後に半減したので、治療成功と確定する', appropriate: false, feedback: '直後の一つの指標では、継続的な改善や施術の因果効果を確定できません。' },
    { text: '所見を再確認せず、穴数だけ増やす', appropriate: false, feedback: '新しい所見、生活への影響、別の原因、受診の必要性を先に検討します。' },
  ], review: '今回の所見、見立てを変えた理由、次回の評価指標を残す。', lectureId: 'lecture-practice-1', complaintSlug: 'shoulder' },
  { id: 'changed-safety', title: '腰痛のある人に、新しい症状が出た', observations: [
    { label: 'これまで', text: '腰痛で通院していた。' },
    { label: '今回の訴え', text: '尿が出にくい。会陰部（股の間）の感覚が鈍い。' },
  ], note: null, question: '今回、何を優先しますか？', choices: [
    { text: '施術を保留し、救急での受診を優先して、症状と発症時刻を記録する', appropriate: true, feedback: '新しい排尿異常と会陰部の感覚変化は緊急評価が必要な兆候です。過去の見立てで打ち消しません。' },
    { text: '前回と同じ証なので、同じ配穴を続ける', appropriate: false, feedback: '再来時も安全確認を更新します。前回の記録は今回の状態を保証しません。' },
    { text: '遠隔穴での反応を見てから紹介する', appropriate: false, feedback: '救急での受診を遅らせません。' },
  ], review: '発症時刻、本人の訴え、確認した変化と紹介判断を記録する。', lectureId: 'lecture-diagnosis-2', complaintSlug: 'back' },
] as const;
