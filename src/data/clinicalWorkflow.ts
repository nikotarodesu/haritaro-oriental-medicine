/** Traditional teaching models, not validated diagnostic rules or efficacy evidence. */
export const CLINICAL_SIGNS = [
  { id: 'fatigue', group: '問診', label: '疲労・気力低下', question: '発症時期、日内変動、休息と活動での変化は？' },
  { id: 'appetite', group: '問診', label: '食欲低下・食後の張り', question: '食事量、食後症状、体重の推移は？' },
  { id: 'loose', group: '問診', label: '軟便', question: '便の性状・回数、血便や腹痛の有無は？' },
  { id: 'cold', group: '問診', label: '冷え・温めると軽減', question: '全身か局所か、温めた際の変化は？' },
  { id: 'stress', group: '問診', label: '情志変動と症状の関連', question: 'ストレスの前後で張りや痛みが変わるか？' },
  { id: 'distension', group: '問診', label: '胸脇部の張り', question: '部位、持続時間、呼吸や姿勢との関連は？' },
  { id: 'heat', group: '問診', label: '熱感・ほてり', question: '発熱の有無、時間帯、冷えとの併存は？' },
  { id: 'dry', group: '問診', label: '口・喉の乾燥', question: '飲水量、時刻、服薬や環境との関連は？' },
  { id: 'nightSweat', group: '問診', label: '寝汗', question: '頻度、発熱・体重変化の併存は？' },
  { id: 'fixedPain', group: '問診', label: '固定した刺すような痛み', question: '部位、外傷歴、夜間・動作での変化は？' },
  { id: 'heavy', group: '問診', label: '身体の重だるさ', question: '浮腫、生活への影響、日内変動は？' },
  { id: 'sleep', group: '問診', label: '入眠困難・中途覚醒', question: '睡眠時刻、日中の支障、いびき・服薬は？' },
  { id: 'paleTongue', group: '望診', label: '淡白舌', question: '照明と観察条件をそろえ、舌体と苔を分けて確認。' },
  { id: 'redTongue', group: '望診', label: '紅舌', question: '舌体・苔・乾湿の組み合わせを確認。' },
  { id: 'greasyCoat', group: '望診', label: '膩苔', question: '苔の色・厚さ・乾湿を別々に記録。' },
  { id: 'weakPulse', group: '切診', label: '弱い脈', question: '速さ・強さ・深さを分け、条件と再現性を確認。' },
  { id: 'wiryPulse', group: '切診', label: '弦脈', question: '強さ・速さ・左右差、他の所見との整合性は？' },
  { id: 'rapidPulse', group: '切診', label: '数脈', question: '実測した脈拍、安静・活動・発熱との関連は？' },
  { id: 'weakVoice', group: '聞診', label: '声が弱い', question: '普段との違い、息切れ・呼吸状態を確認。' },
] as const;

export type ClinicalSignId = typeof CLINICAL_SIGNS[number]['id'];
export type ObservationStatus = 'unknown' | 'present' | 'absent';
export type ClinicalObservations = Partial<Record<ClinicalSignId, ObservationStatus>>;
export const OBSERVATION_LABELS: Record<ObservationStatus, string> = { unknown: '未確認', present: 'あり', absent: 'なし' };

export interface ClinicalPattern {
  id: string; name: string; supports: ClinicalSignId[]; conflicts: ClinicalSignId[];
  principle: string; distinguish: string; lectureId: string;
  points: { code: string; purpose: string; condition: string }[];
}
export const CLINICAL_PATTERNS: ClinicalPattern[] = [
  { id: 'spleen-qi', name: '脾気虚', supports: ['fatigue','appetite','loose','paleTongue','weakPulse','weakVoice'], conflicts: ['heat','redTongue'], principle: '補気健脾', distinguish: '冷えと温めによる変化を確認し、脾陽虚・湿の候補と比較する。', lectureId: 'lecture-qiblood-1', points: [{ code: 'ST36', purpose: '健脾を検討する伝統的な例', condition: '食欲・便・疲労などを合わせて検討' }, { code: 'SP3', purpose: '補気健脾の比較例', condition: '脾の気虚を支持する所見を確認' }] },
  { id: 'spleen-yang', name: '脾陽虚', supports: ['fatigue','appetite','loose','cold','paleTongue','weakPulse'], conflicts: ['heat','redTongue'], principle: '温陽健脾', distinguish: '冷えの持続、温めた際の変化を確認。冷え一つで陽虚としない。', lectureId: 'lecture-yinyang-1', points: [{ code: 'ST36', purpose: '健脾の検討例', condition: '気虚と寒の所見を確認' }, { code: 'CV12', purpose: '和胃の比較例', condition: '胃部の症状と局所の安全性を確認' }] },
  { id: 'liver-qi', name: '肝気鬱結', supports: ['stress','distension','wiryPulse'], conflicts: [], principle: '疏肝理気', distinguish: '熱の有無、消化器症状、症状の変動を確認。情志との関連だけで確定しない。', lectureId: 'lecture-qiblood-1', points: [{ code: 'LR3', purpose: '疏肝理気の検討例', condition: '気滞の所見を合わせて確認' }, { code: 'GB34', purpose: '疏肝の比較例', condition: '筋・胸脇部などの所見を確認' }] },
  { id: 'liver-heat', name: '肝鬱化火', supports: ['stress','distension','heat','redTongue','rapidPulse'], conflicts: ['cold','paleTongue'], principle: '疏肝理気・清熱', distinguish: '気滞と熱の裏付けを別々に確認し、熱を伴わない肝気鬱結と比較する。', lectureId: 'lecture-yinyang-1', points: [{ code: 'LR3', purpose: '疏肝の検討例', condition: '気滞の支持所見を確認' }, { code: 'LR2', purpose: '清熱の比較例', condition: '熱の支持所見を確認' }] },
  { id: 'yin', name: '陰虚の候補', supports: ['dry','nightSweat','heat','redTongue'], conflicts: ['cold','paleTongue'], principle: '滋陰（虚熱の有無も確認）', distinguish: '乾燥・寝汗・虚熱を確認し、臓腑の局在は別に検討する。', lectureId: 'lecture-qiblood-1', points: [{ code: 'KI3', purpose: '滋陰の検討例', condition: '腎の局在を支持する追加所見を確認' }, { code: 'SP6', purpose: '陰血を考える比較例', condition: '陰血の所見と個別の注意事項を確認' }] },
  { id: 'stasis', name: '瘀血の候補', supports: ['fixedPain'], conflicts: [], principle: '活血・通絡', distinguish: '固定痛は単独で確定材料にしない。外傷・経過・舌などを追加評価する。', lectureId: 'lecture-qiblood-1', points: [{ code: 'SP10', purpose: '活血の検討例', condition: '痛みの経過と血の所見を合わせて確認' }, { code: 'BL17', purpose: '血の病態を考える比較例', condition: '局所解剖と刺鍼上の注意を必ず確認' }] },
  { id: 'damp', name: '湿・痰湿の候補', supports: ['heavy','greasyCoat','appetite'], conflicts: ['dry'], principle: '化湿・健脾', distinguish: '重だるさ、苔、消化器症状を照合し、気虚との併存も検討する。', lectureId: 'lecture-qiblood-1', points: [{ code: 'SP9', purpose: '湿を考える検討例', condition: '湿の所見を複数確認' }, { code: 'ST40', purpose: '痰湿の比較例', condition: '痰湿を支持する追加所見を確認' }] },
];

export function compareClinicalPattern(pattern: ClinicalPattern, observations: ClinicalObservations) {
  return {
    supported: pattern.supports.filter(id => observations[id] === 'present'),
    missing: pattern.supports.filter(id => observations[id] === 'absent'),
    unknown: pattern.supports.filter(id => !observations[id] || observations[id] === 'unknown'),
    conflicting: pattern.conflicts.filter(id => observations[id] === 'present'),
  };
}

export const CLINICAL_SOURCES = {
  terminology: { title: 'WHO：中医学の標準用語（2022）', url: 'https://www.who.int/publications/i/item/9789240042322', scope: '用語体系の参照。個別の配穴効果や本サイトの照合ルールを検証する資料ではありません。' },
  headache: { title: 'NHS：頭痛の受診目安', url: 'https://www.nhs.uk/symptoms/headaches/', scope: '受診・救急評価の目安。東洋医学の弁証や配穴効果の根拠ではありません。' },
  back: { title: 'NHS：腰背部痛の受診目安', url: 'https://www.nhs.uk/conditions/back-pain/', scope: '神経症状・排尿排便の変化などの受診目安。英国の受診窓口は日本の窓口と異なります。' },
  sleep: { title: 'NHS：不眠の評価と受診', url: 'https://www.nhs.uk/conditions/insomnia/', scope: '睡眠の経過・生活への影響と受診の目安。' },
  fatigue: { title: 'NHS：持続する疲労の評価', url: 'https://www.nhs.uk/symptoms/tiredness-and-fatigue/', scope: '原因不明で持続する疲労の医療評価。' },
} as const;

export interface ClinicalComplaint {
  slug: string; title: string; summary: string; questions: string[]; review: string[];
  patternIds: string[]; lectureId: string; sourceKeys: (keyof typeof CLINICAL_SOURCES)[];
}
export const CLINICAL_COMPLAINTS: ClinicalComplaint[] = [
  { slug: 'shoulder', title: '首・肩こり', summary: '局所の負担と全身の所見を分けて整理する。', questions: ['発症・経過、仕事や姿勢との関連、動作による変化','痛みの部位・性状・範囲、しびれや筋力の変化','頭痛・睡眠・情志・冷えとの関連、既往と服薬'], review: ['同じ動作での痛みと可動域','仕事・睡眠への影響、翌日以降の変化'], patternIds: ['liver-qi','stasis','damp'], lectureId: 'lecture-diagnosis-1', sourceKeys: ['terminology'] },
  { slug: 'back', title: '腰痛', summary: '経過と神経症状の確認から始め、部位だけで腎虚と決めない。', questions: ['発症時刻、外傷歴、痛みの範囲と動作・安静での変化','両脚のしびれ・筋力低下、会陰部感覚、排尿・排便の変化','発熱・体重変化・既往・服薬、生活動作への影響'], review: ['同じ動作での痛みと生活動作','神経症状の変化と医療評価の結果'], patternIds: ['stasis','damp','spleen-yang'], lectureId: 'lecture-diagnosis-2', sourceKeys: ['back','terminology'] },
  { slug: 'headache', title: '頭痛', summary: '頭痛の経過と安全確認を先に行い、熱・気滞などの材料を照合する。', questions: ['突然の発症か、過去と違う痛みか、外傷や発熱の有無','部位・性状・頻度・持続時間、神経症状や視覚の変化','睡眠・情志・月経・服薬、日常生活への影響'], review: ['頭痛の日数・持続時間・程度','日常生活への影響、服薬状況、受診結果'], patternIds: ['liver-qi','liver-heat','stasis','yin'], lectureId: 'lecture-diagnosis-2', sourceKeys: ['headache','terminology'] },
  { slug: 'sleep', title: '不眠', summary: '睡眠と日中の機能を記録し、情志・熱・乾燥などの所見を比較する。', questions: ['入眠・中途覚醒・早朝覚醒、睡眠時刻と持続期間','日中の支障、いびき・呼吸、カフェイン・飲酒・服薬','痛み、情志変動、熱感・乾燥、既往と受診状況'], review: ['入眠までの時間・覚醒回数','日中の眠気と生活への影響'], patternIds: ['liver-qi','liver-heat','yin'], lectureId: 'lecture-diagnosis-1', sourceKeys: ['sleep','terminology'] },
  { slug: 'digestion', title: '胃腸の不調', summary: '食欲・食後症状・便と全身状態を合わせ、寒の有無も確認する。', questions: ['食事と症状の関係、便の性状・回数、発症と経過','強い腹痛・血便・発熱・体重変化、既往と服薬','疲労・冷え・温めた際の変化、情志との関連'], review: ['食欲、便の性状・回数','食後の支障と体重・全身状態の変化'], patternIds: ['spleen-qi','spleen-yang','damp','liver-qi'], lectureId: 'lecture-diagnosis-8', sourceKeys: ['terminology'] },
  { slug: 'fatigue', title: '疲労・倦怠感', summary: '生活への影響と原因評価を確認し、気虚だけで説明しない。', questions: ['期間・日内変動、活動と休息、生活への影響','睡眠・食欲・便通、息切れ・動悸・体重変化','既往・服薬・受診や検査の結果、冷えや熱感'], review: ['同じ生活動作での疲労と回復','睡眠、食欲、受診結果と有害な反応'], patternIds: ['spleen-qi','spleen-yang','damp','yin'], lectureId: 'lecture-diagnosis-8', sourceKeys: ['fatigue','terminology'] },
];

export const CLINICAL_INFORMATION_SCOPE = '所見の照合は、本サイトが整理した伝統医学の学習モデルです。診断確率・治療効果を計算するものではありません。候補は限定的で、表示されない証や現代医学的な原因を除外できません。';
