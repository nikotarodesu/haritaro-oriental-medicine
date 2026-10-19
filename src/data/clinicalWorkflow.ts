/** Traditional teaching models, not validated diagnostic rules or efficacy evidence. */
import { resolvedExaminationObservations, type ClinicalExamination } from './clinicalExamination';
import { compareExaminationFindings, type ComparisonFindingId } from './clinicalExaminationComparison';
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

export const CLINICAL_PATTERN_CATEGORIES = ['気血津液', '肝胆', '心', '脾胃', '肺', '腎'] as const;
export interface ClinicalPattern {
  id: string; name: string; category: typeof CLINICAL_PATTERN_CATEGORIES[number]; summary: string;
  aliases?: string[]; additionalChecks?: string[];
  supports: ClinicalSignId[]; conflicts: ClinicalSignId[];
  principle: string; distinguish: string; lectureId: string;
  points: { code: string; purpose: string; condition: string }[];
}
export const CLINICAL_PATTERNS: ClinicalPattern[] = [
  { id: 'spleen-qi', name: '脾気虚', category: "脾胃", summary: "食欲・便通と気の不足", aliases: ["脾気虚証", "ひききょ"], additionalChecks: ["食事量・体重と、食後症状の経過", "活動時の息切れや発汗の有無"], supports: ['fatigue','appetite','loose','paleTongue','weakPulse','weakVoice'], conflicts: ['heat','redTongue'], principle: '補気健脾', distinguish: '冷えと温めによる変化を確認し、脾陽虚・湿の候補と比較する。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'ST36', purpose: '健脾を検討する伝統的な例', condition: '食欲・便・疲労などを合わせて検討' }, { code: 'SP3', purpose: '補気健脾の比較例', condition: '脾の気虚を支持する所見を確認' }] },
  { id: 'spleen-yang', name: '脾陽虚', category: "脾胃", summary: "脾の気虚と寒の所見", aliases: ["脾陽虚証", "ひようきょ"], additionalChecks: ["腹部の冷え・腹痛と温めによる変化", "便の回数・性状、浮腫の有無"], supports: ['fatigue','appetite','loose','cold','paleTongue','weakPulse'], conflicts: ['heat','redTongue'], principle: '温陽健脾', distinguish: '冷えの持続、温めた際の変化を確認。冷え一つで陽虚としない。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'ST36', purpose: '健脾の検討例', condition: '気虚と寒の所見を確認' }, { code: 'CV12', purpose: '和胃の比較例', condition: '胃部の症状と局所の安全性を確認' }] },
  { id: 'liver-qi', name: '肝気鬱結', category: "肝胆", summary: "情志との関連と胸脇の張り", aliases: ["肝気鬱結証", "肝気郁結", "かんきうっけつ"], additionalChecks: ["胸脇・腹部など、張りの部位と変動", "ため息・げっぷ、月経との関連"], supports: ['stress','distension','wiryPulse'], conflicts: [], principle: '疏肝理気', distinguish: '熱の有無、消化器症状、症状の変動を確認。情志との関連だけで確定しない。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'LR3', purpose: '疏肝理気の検討例', condition: '気滞の所見を合わせて確認' }, { code: 'GB34', purpose: '疏肝の比較例', condition: '筋・胸脇部などの所見を確認' }] },
  { id: 'liver-heat', name: '肝鬱化火', category: "肝胆", summary: "肝の気滞に熱を伴う候補", aliases: ["肝鬱化火証", "肝郁化火", "かんうつかか"], additionalChecks: ["口苦・眼の充血などの随伴所見", "舌苔の色と乾湿、熱感の経過"], supports: ['stress','distension','heat','redTongue','rapidPulse'], conflicts: ['cold','paleTongue'], principle: '疏肝理気・清熱', distinguish: '気滞と熱の裏付けを別々に確認し、熱を伴わない肝気鬱結と比較する。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'LR3', purpose: '疏肝の検討例', condition: '気滞の支持所見を確認' }, { code: 'LR2', purpose: '清熱の比較例', condition: '熱の支持所見を確認' }] },
  { id: 'yin', name: '陰虚の候補', category: "気血津液", summary: "潤いの不足と虚熱の有無", aliases: ["陰虚", "陰虚証", "いんきょ"], additionalChecks: ["乾燥の部位、時間帯、舌苔の量", "肺・胃・腎など、臓腑を考える追加所見"], supports: ['dry','nightSweat','heat','redTongue'], conflicts: ['cold','paleTongue'], principle: '滋陰（虚熱の有無も確認）', distinguish: '乾燥・寝汗・虚熱を確認し、臓腑の局在は別に検討する。', lectureId: 'lecture-pathomechanism-6', points: [{ code: 'KI3', purpose: '滋陰の検討例', condition: '伝統医学の腎の証を支持する所見を追加で確認' }, { code: 'SP6', purpose: '陰血を考える比較例', condition: '陰血の所見と個別の注意事項を確認' }] },
  { id: 'stasis', name: '瘀血の候補', category: "気血津液", summary: "固定痛と血の停滞の候補", aliases: ["瘀血", "血瘀", "おけつ"], additionalChecks: ["外傷歴・症状の経過、痛みの変化", "舌の暗紫色・瘀点など、ほかの血の所見"], supports: ['fixedPain'], conflicts: [], principle: '活血・通絡', distinguish: '固定痛は単独で確定材料にしない。外傷・経過・舌などを追加評価する。', lectureId: 'lecture-pathomechanism-5', points: [{ code: 'SP10', purpose: '活血の検討例', condition: '痛みの経過と血の所見を合わせて確認' }, { code: 'BL17', purpose: '血の病態を考える比較例', condition: '局所解剖と刺鍼上の注意を必ず確認' }] },
  { id: 'damp', name: '湿・痰湿の候補', category: "気血津液", summary: "重さ・苔と水湿の停滞", aliases: ["湿", "痰湿", "水滞", "しつ", "たんしつ"], additionalChecks: ["浮腫・痰などの部位、量と変動", "舌苔の色・厚さ、食事や便通との関連"], supports: ['heavy','greasyCoat','appetite'], conflicts: ['dry'], principle: '化湿・健脾', distinguish: '重だるさ、苔、消化器症状を照合し、気虚との併存も検討する。', lectureId: 'lecture-pathomechanism-4', points: [{ code: 'SP9', purpose: '湿を考える検討例', condition: '湿の所見を複数確認' }, { code: 'ST40', purpose: '痰湿の比較例', condition: '痰湿を支持する追加所見を確認' }] },
  {"id": "qi", "name": "気虚", "category": "気血津液", "summary": "気の働きの不足を広く整理", "aliases": ["気虚証", "ききょ"], "additionalChecks": ["活動時の息切れ・自汗などの有無", "主訴の経過と、臓腑を考える追加所見"], "supports": ["fatigue", "weakVoice", "weakPulse"], "conflicts": [], "principle": "補気", "distinguish": "局在を決める前の広い候補。脾・肺・心などの所見を分けて確認する。", "lectureId": "lecture-pathomechanism-3", "points": []},
  {"id": "qi-stagnation", "name": "気滞", "category": "気血津液", "summary": "張りと症状の変動を整理", "aliases": ["気鬱", "気滞証", "きたい"], "additionalChecks": ["胸・腹・喉など、張りやつかえの部位", "ため息・げっぷなどの有無と増悪条件"], "supports": ["stress", "distension"], "conflicts": [], "principle": "理気", "distinguish": "張りの部位・変動を確認。情志との関連だけで肝の証と決めない。", "lectureId": "lecture-pathomechanism-3", "points": []},
  {"id": "qi-counterflow", "name": "気逆", "category": "気血津液", "summary": "咳・悪心など上逆の説明を比較", "aliases": ["気逆証", "きぎゃく"], "additionalChecks": ["咳・悪心・嘔吐・げっぷの有無と経過", "肺・胃など、上逆を考えた部位と根拠"], "supports": [], "conflicts": [], "principle": "降気", "distinguish": "咳は上逆を考える限られた材料。悪心・嘔吐・げっぷ、部位と経過を補足し、咳だけで気逆と確定しない。", "lectureId": "lecture-pathomechanism-3", "points": []},
  {"id": "blood", "name": "血虚", "category": "気血津液", "summary": "養い・潤す働きの不足", "aliases": ["血虚証", "けっきょ"], "additionalChecks": ["顔色・口唇、めまい、目や皮膚の乾き", "月経の量・経過など、血の不足を考えた根拠"], "supports": ["paleTongue"], "conflicts": [], "principle": "養血", "distinguish": "淡白舌だけで血虚と決めず、気虚・陰虚や別の原因と比較する。貧血の診断とは分ける。", "lectureId": "lecture-pathomechanism-5", "points": []},
  {"id": "yang", "name": "陽虚", "category": "気血津液", "summary": "温め動かす働きの不足", "aliases": ["陽虚証", "ようきょ"], "additionalChecks": ["冷えの部位・持続時間、活動や温めによる変化", "脾・腎など、臓腑を考える追加所見"], "supports": ["cold", "fatigue", "weakPulse"], "conflicts": [], "principle": "温陽", "distinguish": "冷えだけで全体を陽虚としない。寒の部位・経過と不足の根拠を分ける。", "lectureId": "lecture-pathomechanism-6", "points": []},
  {"id": "liver-blood", "name": "肝血虚", "category": "肝胆", "summary": "血虚と目・筋・月経の所見", "aliases": ["肝血不足", "肝血虚証", "かんけっきょ"], "additionalChecks": ["目のかすみ・乾き、筋のひきつりなどの経過", "月経の量・経過、ほかの血虚の所見"], "supports": ["paleTongue"], "conflicts": [], "principle": "養血・補肝", "distinguish": "一般的な血虚の所見に加え、目・筋・月経などの情報を合わせる。目の乾きだけで決めない。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "liver-stomach", "name": "肝気犯胃", "category": "肝胆", "summary": "情志と胃部症状の関係", "aliases": ["肝胃不和", "肝気犯胃証", "かんきはんい"], "additionalChecks": ["胃部の張り・痛み、げっぷ・悪心・逆流の経過", "食事と情志変動の前後での症状変化"], "supports": ["stress", "distension", "appetite"], "conflicts": [], "principle": "疏肝理気・和胃降逆", "distinguish": "情志の変動と胃部症状の時期を分けて確認。胃気上逆や食事・服薬など別の説明も残す。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "liver-spleen", "name": "肝脾不和", "category": "肝胆", "summary": "情志・張りと食欲・便の関係", "aliases": ["肝気犯脾", "肝鬱脾虚", "かんぴふわ"], "additionalChecks": ["情志変動と腹痛・便通の前後関係", "食欲・疲労など脾の所見と、張りの変動"], "supports": ["stress", "distension", "appetite", "loose"], "conflicts": [], "principle": "疏肝健脾", "distinguish": "肝の気滞と脾の所見の両方を確認し、同じ時期にあることだけで因果関係を決めない。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-qi", "name": "心気虚", "category": "心", "summary": "動悸などと気の不足の関係", "aliases": ["心気虚証", "しんききょ"], "additionalChecks": ["動悸の性状・時間帯、活動時の息切れ", "自汗・胸部症状、受診や検査の結果"], "supports": ["fatigue", "weakPulse", "weakVoice"], "conflicts": [], "principle": "補益心気", "distinguish": "疲労や弱い脈だけでは心に局在できない。動悸・息切れなどの性状と医学的評価を別に確認する。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-blood", "name": "心血虚", "category": "心", "summary": "睡眠・動悸と血の不足", "aliases": ["心血不足", "心血虚証", "しんけっきょ"], "additionalChecks": ["動悸・多夢・健忘などの有無と経過", "顔色・口唇、めまい、細い脈などの血虚所見"], "supports": ["sleep", "paleTongue"], "conflicts": [], "principle": "養血・養心安神", "distinguish": "睡眠の訴えに加え、動悸など心の所見と血虚の根拠を確認。心陰虚との違いも比較する。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-yin", "name": "心陰虚", "category": "心", "summary": "睡眠の訴えと陰虚・虚熱", "aliases": ["心陰不足", "心陰虚証", "しんいんきょ"], "additionalChecks": ["動悸・心煩などの有無と時間帯", "舌苔の量、細い脈、陰虚と実熱を比べる情報"], "supports": ["sleep", "dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋陰・養心安神", "distinguish": "陰虚を考えた根拠と、心の所見を分ける。不眠とほてりだけで確定しない。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-kidney", "name": "心腎不交", "category": "心", "summary": "心の訴えと腎陰虚の関係", "aliases": ["心腎不交証", "しんじんふこう"], "additionalChecks": ["動悸・心煩など、心の候補を考えた所見", "腰膝のだるさ・耳鳴りなど、腎の候補を考えた所見"], "supports": ["sleep", "nightSweat", "dry", "heat"], "conflicts": [], "principle": "滋陰・交通心腎・安神", "distinguish": "睡眠の訴えと陰虚の所見だけで心腎不交としない。心と腎の根拠をそれぞれ記録する。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "stomach-yin", "name": "胃陰虚", "category": "脾胃", "summary": "胃部症状と潤いの不足", "aliases": ["胃陰不足", "胃陰虚証", "いいんきょ"], "additionalChecks": ["空腹感はあるが食べたくないなど、食欲の具体的な状態", "胃部の不快感、便の乾燥、舌苔の減少"], "supports": ["dry", "appetite", "redTongue"], "conflicts": [], "principle": "養陰益胃・生津", "distinguish": "口の乾きだけで胃陰虚と決めない。食事・胃部症状・舌苔の量などを合わせる。", "lectureId": "lecture-treatment-7", "points": []},
  {"id": "lung-qi", "name": "肺気虚", "category": "肺", "summary": "呼吸・声と気の不足", "aliases": ["肺気虚証", "はいききょ"], "additionalChecks": ["弱い咳、活動時の息切れ、痰の量と性状", "自汗・風への反応、普段との違いと経過"], "supports": ["fatigue", "weakVoice", "weakPulse", "paleTongue"], "conflicts": [], "principle": "補肺益気", "distinguish": "声や疲労だけで肺気虚と決めず、咳・息切れなどの呼吸所見と経過を確認する。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "lung-yin", "name": "肺陰虚", "category": "肺", "summary": "咳・喉の症状と潤いの不足", "aliases": ["肺陰不足", "肺陰虚証", "はいいんきょ"], "additionalChecks": ["乾いた咳・少量の痰・嗄声の有無と経過", "舌苔の量・乾湿、ほかの陰虚の所見"], "supports": ["dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋陰潤肺", "distinguish": "乾燥などの共通所見に加え、咳・痰・嗄声と経過を確認。乾燥だけで肺に局在しない。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "kidney-qi", "name": "腎気虚", "category": "腎", "summary": "腰膝・排尿などと気の不足", "aliases": ["腎気不足", "腎気虚証", "じんききょ"], "additionalChecks": ["腰膝のだるさ・力の入りにくさ、耳鳴りの経過", "排尿の回数・夜間尿など、普段からの変化"], "supports": ["fatigue", "weakPulse"], "conflicts": [], "principle": "補腎益気", "distinguish": "疲労だけでは腎に局在できない。腰膝・排尿などの所見と医学的な原因評価を分ける。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "kidney-yin", "name": "腎陰虚", "category": "腎", "summary": "腰膝などの所見と陰虚", "aliases": ["腎陰不足", "腎陰虚証", "じんいんきょ"], "additionalChecks": ["腰膝のだるさ、耳鳴りなどの経過", "舌苔の量、ほてりや寝汗の時間帯"], "supports": ["dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋補腎陰", "distinguish": "陰虚の共通所見に加え、腎を考えた根拠を確認。腰痛の部位だけで腎陰虚としない。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "kidney-yang", "name": "腎陽虚", "category": "腎", "summary": "腰膝などの所見と寒・陽虚", "aliases": ["腎陽不足", "腎陽虚証", "じんようきょ"], "additionalChecks": ["腰膝の冷え・だるさと温めによる変化", "排尿・浮腫・便通の変化と経過"], "supports": ["cold", "fatigue", "weakPulse", "paleTongue"], "conflicts": [], "principle": "温補腎陽", "distinguish": "寒と不足の根拠に加え、腎の所見を確認。足の冷えや腰痛だけで決めない。", "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "liver-kidney-yin", "name": "肝腎陰虚", "category": "腎", "summary": "肝と腎の所見を伴う陰虚", "aliases": ["肝腎陰虚証", "かんじんいんきょ"], "additionalChecks": ["目・筋・月経など、肝に関連づけた所見", "腰膝のだるさ・耳鳴りなど、腎に関連づけた所見"], "supports": ["dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋補肝腎", "distinguish": "陰虚の共通所見だけで二つの臓腑を決めない。肝と腎それぞれを考えた根拠を補う。", "lectureId": "lecture-diagnosis-9", "points": []},
];

/** Traditional method labels for manual recording; no automatic treatment selection. */
export const CLINICAL_PRINCIPLES: readonly { id: string; label: string; group: string }[] = [
  {"id": "tonify-qi", "label": "補気", "group": "補う"},
  {"id": "strengthen-spleen", "label": "補気健脾", "group": "補う"},
  {"id": "warm-yang", "label": "温陽", "group": "補う"},
  {"id": "warm-spleen", "label": "温陽健脾", "group": "補う"},
  {"id": "nourish-blood", "label": "養血", "group": "補う"},
  {"id": "nourish-yin", "label": "滋陰", "group": "補う"},
  {"id": "nourish-kidney-yin", "label": "滋補腎陰", "group": "補う"},
  {"id": "warm-kidney-yang", "label": "温補腎陽", "group": "補う"},
  {"id": "nourish-liver-kidney", "label": "滋補肝腎", "group": "補う"},
  {"id": "regulate-qi", "label": "理気", "group": "気を調える"},
  {"id": "course-liver", "label": "疏肝理気", "group": "気を調える"},
  {"id": "descend-qi", "label": "降気", "group": "気を調える"},
  {"id": "harmonize-stomach", "label": "和胃降逆", "group": "気を調える"},
  {"id": "harmonize-liver-spleen", "label": "疏肝健脾", "group": "気を調える"},
  {"id": "clear-heat", "label": "清熱", "group": "熱を扱う"},
  {"id": "clear-liver-fire", "label": "清肝瀉火", "group": "熱を扱う"},
  {"id": "nourish-yin-clear-heat", "label": "滋陰清熱", "group": "熱を扱う"},
  {"id": "transform-damp", "label": "化湿", "group": "水湿・痰を扱う"},
  {"id": "promote-water", "label": "利水", "group": "水湿・痰を扱う"},
  {"id": "transform-phlegm", "label": "化痰", "group": "水湿・痰を扱う"},
  {"id": "move-blood", "label": "活血化瘀", "group": "血・経絡を調える"},
  {"id": "unblock-collaterals", "label": "通絡", "group": "血・経絡を調える"},
  {"id": "calm-spirit", "label": "養心安神", "group": "神を安んじる"},
  {"id": "connect-heart-kidney", "label": "交通心腎", "group": "神を安んじる"},
];

export function compareClinicalPattern(pattern: ClinicalPattern, observations: ClinicalObservations, examination?: ClinicalExamination): Record<'supported' | 'missing' | 'unknown' | 'conflicting', ComparisonFindingId[]> {
  observations = resolvedExaminationObservations(observations, examination);
  const details = examination === undefined ? { supported: [], missing: [], unknown: [], conflicting: [] } : compareExaminationFindings(pattern.id, examination, observations);
  return {
    supported: [...pattern.supports.filter(id => observations[id] === 'present'), ...details.supported],
    missing: [...pattern.supports.filter(id => observations[id] === 'absent'), ...details.missing],
    unknown: [...pattern.supports.filter(id => !observations[id] || observations[id] === 'unknown'), ...details.unknown],
    conflicting: [...pattern.conflicts.filter(id => observations[id] === 'present'), ...details.conflicting],
  };
}

export const CLINICAL_SOURCES = {
  tongue: { title: '香港中文大学中医学院：舌体・舌苔の観察', url: 'https://www.scm.cuhk.edu.hk/zh-tw/news-and-literature/articles/articles-skypost-list/1244-2018-11-15/', scope: '舌色、舌体の大きさ、歯痕、苔の厚さ・色・性状と観察条件の伝統的な説明を参照。個々のルールの診断性能を検証する資料ではありません。' },
  deficiency: { title: '香港衞生署：気虚・血虚・陰虚・陽虚の伝統的所見', url: 'https://www.cmro.gov.hk/html/b5/useful_information/public_health/feature_articles/Health_Maintenance_in_Winter.html', scope: '「辨證施補」の所見の記載を参照。食事・生薬・施術の推奨を本ツールの自動指示には使いません。' },
  terminology: { title: 'WHO：中医学の標準用語（2022）', url: 'https://www.who.int/publications/i/item/9789240042322', scope: '用語体系の参照。個別の配穴効果や本サイトの照合ルールを検証する資料ではありません。' },
  classification: { title: '厚生労働省：ICD-11の分類用語（2023年1月版）', url: 'https://www.mhlw.go.jp/content/10701000/001501598.pdf', scope: '伝統医学の証名と日本語表記の参照。名称の掲載は診断の妥当性や治療効果を示すものではありません。' },
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
