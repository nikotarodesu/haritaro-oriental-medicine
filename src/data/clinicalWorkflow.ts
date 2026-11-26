/** Traditional teaching models, not validated diagnostic rules or efficacy evidence. */
import { resolvedExaminationObservations, type ClinicalExamination } from './clinicalExamination';
import { compareExaminationFindings, type ComparisonFindingId } from './clinicalExaminationComparison';
export const CLINICAL_SIGNS = [
  { id: 'fatigue', group: '問診', label: '疲労・気力低下', question: 'いつから疲れやすくなりましたか。仕事中や休んだ後で、どう変わりますか。' },
  { id: 'appetite', group: '問診', label: '食欲低下・食後の張り', question: '食べる量や体重は変わりましたか。食後に何が起きますか。' },
  { id: 'loose', group: '問診', label: '軟便', question: '便の硬さや回数は普段と違いますか。便に血が混じったり、腹痛があったりしますか。' },
  { id: 'cold', group: '問診', label: '冷え・温めると軽減', question: 'どこが冷えますか。温めたときに症状は変わりますか。' },
  { id: 'stress', group: '問診', label: '情志変動と症状の関連', question: '緊張したときと落ち着いたときで、張りや痛みは変わりますか。' },
  { id: 'distension', group: '問診', label: '胸脇部の張り', question: '胸や肋骨の下のどこが張り、何分くらい続きますか。姿勢や息の吸い方で変わりますか。' },
  { id: 'heat', group: '問診', label: '熱感・ほてり', question: 'どこが、何時ごろほてりますか。冷えを感じる部位や、測った体温も別に記録します。' },
  { id: 'dry', group: '問診', label: '口・喉の乾燥', question: 'どの時間帯に口や喉が渇きますか。飲む量、薬、部屋の乾燥も確かめます。' },
  { id: 'nightSweat', group: '問診', label: '寝汗', question: '何晩くらい寝汗をかきますか。発熱や体重の変化はありますか。' },
  { id: 'fixedPain', group: '問診', label: '固定した刺すような痛み', question: '刺すような痛みはいつも同じ場所ですか。けがの後や夜、動いたときに変わりますか。' },
  { id: 'heavy', group: '問診', label: '身体の重だるさ', question: 'どの部位が何時ごろ重くなりますか。むくみや、歩くなどの動作への支障はありますか。' },
  { id: 'sleep', group: '問診', label: '入眠困難・中途覚醒', question: '寝付くまで何分かかり、夜に何回起きますか。翌日の支障、いびき、服薬も聞きます。' },
  { id: 'paleTongue', group: '望診', label: '淡白舌', question: '同じ照明で観察し、舌そのものの淡さと、舌苔の白さを別に書きます。' },
  { id: 'redTongue', group: '望診', label: '紅舌', question: '舌先だけ赤いか、全体かを見ます。舌苔の様子と乾きも別に書きます。' },
  { id: 'greasyCoat', group: '望診', label: '膩苔', question: 'ねばついて見える苔の色と厚さ、乾き具合を別々に書きます。' },
  { id: 'weakPulse', group: '切診', label: '弱い脈', question: '脈の速さ、力の強さ、どの深さで触れたかを別々に記録します。' },
  { id: 'wiryPulse', group: '切診', label: '弦脈', question: '張りがあるのは左右どちらですか。脈の強さと速さも別に書きます。' },
  { id: 'rapidPulse', group: '切診', label: '数脈', question: '測った脈拍数と、安静時か動いた直後か、発熱していたかを記録します。' },
  { id: 'weakVoice', group: '聞診', label: '声が弱い', question: '普段より声が小さいですか。話すと息切れがあるかも確かめます。' },
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
  { id: 'spleen-qi', name: '脾気虚', category: "脾胃", summary: '食後の疲れ、食欲の低下、軟便', aliases: ["脾気虚証", "ひききょ"], additionalChecks: ["食事量・体重と、食後症状の経過", "活動時の息切れや発汗の有無"], supports: ['fatigue','appetite','loose','paleTongue','weakPulse','weakVoice'], conflicts: ['heat','redTongue'], principle: '補気健脾', distinguish: '食後の疲れと軟便の時期を聞きます。おなかの冷えや温めたときの変化があれば、脾陽虚とも比べます。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'ST36', purpose: '健脾を検討する伝統的な例', condition: '食欲・便・疲労などを合わせて検討' }, { code: 'SP3', purpose: '補気健脾の比較例', condition: '脾の気虚を支持する所見を確認' }] },
  { id: 'spleen-yang', name: '脾陽虚', category: "脾胃", summary: '食欲や便の変化に、おなかの冷えが重なる', aliases: ["脾陽虚証", "ひようきょ"], additionalChecks: ["腹部の冷え・腹痛と温めによる変化", "便の回数・性状、浮腫の有無"], supports: ['fatigue','appetite','loose','cold','paleTongue','weakPulse'], conflicts: ['heat','redTongue'], principle: '温陽健脾', distinguish: 'おなかが冷える時間と、温めると腹痛や便の様子が変わるかを聞きます。冷えの訴えだけでは候補を決めません。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'ST36', purpose: '健脾の検討例', condition: '気虚と寒の所見を確認' }, { code: 'CV12', purpose: '和胃の比較例', condition: '胃部の症状と局所の安全性を確認' }] },
  { id: 'liver-qi', name: '肝気鬱結', category: "肝胆", summary: '胸や肋骨の下の張りが、緊張する日に変わる', aliases: ["肝気鬱結証", "肝気郁結", "かんきうっけつ"], additionalChecks: ["胸脇・腹部など、張りの部位と変動", "ため息・げっぷ、月経との関連"], supports: ['stress','distension','wiryPulse'], conflicts: [], principle: '疏肝理気', distinguish: '張る場所と、緊張する前後でどう変わるかを聞きます。口の苦さや目の赤みもあれば、肝鬱化火と比べます。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'LR3', purpose: '疏肝理気の検討例', condition: '気滞の所見を合わせて確認' }, { code: 'GB34', purpose: '疏肝の比較例', condition: '筋・胸脇部などの所見を確認' }] },
  { id: 'liver-heat', name: '肝鬱化火', category: "肝胆", summary: '緊張時の張りに、口の苦さや目の赤みが重なる', aliases: ["肝鬱化火証", "肝郁化火", "かんうつかか"], additionalChecks: ["口苦・眼の充血などの随伴所見", "舌苔の色と乾湿、熱感の経過"], supports: ['stress','distension','heat','redTongue','rapidPulse'], conflicts: ['cold','paleTongue'], principle: '疏肝理気・清熱', distinguish: '張りやため息が出たことと、口の苦さや目の赤みがあったことを、別々に書きます。熱の所見がはっきりしない場合は肝気鬱結と比べます。', lectureId: 'lecture-diagnosis-9', points: [{ code: 'LR3', purpose: '疏肝の検討例', condition: '気滞の支持所見を確認' }, { code: 'LR2', purpose: '清熱の比較例', condition: '熱の支持所見を確認' }] },
  { id: 'yin', name: '陰虚の候補', category: "気血津液", summary: '乾き、夜のほてりや寝汗、少ない舌苔', aliases: ["陰虚", "陰虚証", "いんきょ"], additionalChecks: ["乾燥の部位、時間帯、舌苔の量", "肺・胃・腎など、臓腑を考える追加所見"], supports: ['dry','nightSweat','heat','redTongue'], conflicts: ['cold','paleTongue'], principle: '滋陰（虚熱の有無も確認）', distinguish: '口や喉の乾きはどの時間帯か、寝汗で目が覚めたかを聞きます。どの臓腑を候補にするかは、咳や胃の訴えなどを別に確かめます。', lectureId: 'lecture-pathomechanism-6', points: [{ code: 'KI3', purpose: '滋陰の検討例', condition: '伝統医学の腎の証を支持する所見を追加で確認' }, { code: 'SP6', purpose: '陰血を考える比較例', condition: '陰血の所見と個別の注意事項を確認' }] },
  { id: 'stasis', name: '瘀血の候補', category: "気血津液", summary: 'いつも同じ場所を刺すように痛む', aliases: ["瘀血", "血瘀", "おけつ"], additionalChecks: ["外傷歴・症状の経過、痛みの変化", "舌の暗紫色・瘀点など、ほかの血の所見"], supports: ['fixedPain'], conflicts: [], principle: '活血・通絡', distinguish: '痛む場所が毎回同じか、けがの後からかを聞きます。紫がかった舌など、ほかの記録があるかも確かめます。', lectureId: 'lecture-pathomechanism-5', points: [{ code: 'SP10', purpose: '活血の検討例', condition: '痛みの経過と血の所見を合わせて確認' }, { code: 'BL17', purpose: '血の病態を考える比較例', condition: '局所解剖と刺鍼上の注意を必ず確認' }] },
  { id: 'damp', name: '湿・痰湿の候補', category: "気血津液", summary: '重だるさ、ねばつく舌苔、食後の不快感', aliases: ["湿", "痰湿", "水滞", "しつ", "たんしつ"], additionalChecks: ["浮腫・痰などの部位、量と変動", "舌苔の色・厚さ、食事や便通との関連"], supports: ['heavy','greasyCoat','appetite'], conflicts: ['dry'], principle: '化湿・健脾', distinguish: '重いと感じる部位と時間帯、舌苔の厚さを見ます。食後の疲れや食べる量の変化もあれば、気虚と重なる点を読みます。', lectureId: 'lecture-pathomechanism-4', points: [{ code: 'SP9', purpose: '湿を考える検討例', condition: '湿の所見を複数確認' }, { code: 'ST40', purpose: '痰湿の比較例', condition: '痰湿を支持する追加所見を確認' }] },
  {"id": "qi", "name": "気虚", "category": "気血津液", "summary": '動くと疲れ、声や脈に力がない', "aliases": ["気虚証", "ききょ"], "additionalChecks": ["活動時の息切れ・自汗などの有無", "主訴の経過と、臓腑を考える追加所見"], "supports": ["fatigue", "weakVoice", "weakPulse"], "conflicts": [], "principle": "補気", "distinguish": '動くと息が切れるか、食後に疲れるかを分けて聞きます。疲れだけで、脾・肺・心のどれに当たるかは決めません。', "lectureId": "lecture-pathomechanism-3", "points": []},
  {"id": "qi-stagnation", "name": "気滞", "category": "気血津液", "summary": '張りやつかえが、時間帯や場面によって変わる', "aliases": ["気鬱", "気滞証", "きたい"], "additionalChecks": ["胸・腹・喉など、張りやつかえの部位", "ため息・げっぷなどの有無と増悪条件"], "supports": ["stress", "distension"], "conflicts": [], "principle": "理気", "distinguish": '胸・おなか・喉のどこがつかえるか、ため息やげっぷの前後で変わるかを聞きます。緊張との重なりだけで肝の証は決まりません。', "lectureId": "lecture-pathomechanism-3", "points": []},
  {"id": "qi-counterflow", "name": "気逆", "category": "気血津液", "summary": '咳、吐き気、げっぷなど上へ向かう訴え', "aliases": ["気逆証", "きぎゃく"], "additionalChecks": ["咳・悪心・嘔吐・げっぷの有無と経過", "肺・胃など、上逆を考えた部位と根拠"], "supports": [], "conflicts": [], "principle": "降気", "distinguish": '咳だけか、吐き気やげっぷもあるかを聞きます。胸と胃のどちらの訴えが先に出たか、その経過も記録します。', "lectureId": "lecture-pathomechanism-3", "points": []},
  {"id": "blood", "name": "血虚", "category": "気血津液", "summary": '顔色や舌が淡く、立ちくらみや乾きがある', "aliases": ["血虚証", "けっきょ"], "additionalChecks": ["顔色・口唇、めまい、目や皮膚の乾き", "月経の量・経過など、血の不足を考えた根拠"], "supports": ["paleTongue"], "conflicts": [], "principle": "養血", "distinguish": '淡い舌に加え、顔色、立ちくらみ、目や皮膚の乾きも確認します。貧血を調べるには診察や検査が必要です。', "lectureId": "lecture-pathomechanism-5", "points": []},
  {"id": "yang", "name": "陽虚", "category": "気血津液", "summary": '冷えに、活動時の疲れや弱い脈が重なる', "aliases": ["陽虚証", "ようきょ"], "additionalChecks": ["冷えの部位・持続時間、活動や温めによる変化", "脾・腎など、臓腑を考える追加所見"], "supports": ["cold", "fatigue", "weakPulse"], "conflicts": [], "principle": "温陽", "distinguish": 'どこが、いつ冷えるかを聞きます。休んだときや温めたときの変化と、体力が落ちたと考える所見を分けて書きます。', "lectureId": "lecture-pathomechanism-6", "points": []},
  {"id": "liver-blood", "name": "肝血虚", "category": "肝胆", "summary": '目のかすみや筋のひきつりに、血虚の所見が重なる', "aliases": ["肝血不足", "肝血虚証", "かんけっきょ"], "additionalChecks": ["目のかすみ・乾き、筋のひきつりなどの経過", "月経の量・経過、ほかの血虚の所見"], "supports": ["paleTongue"], "conflicts": [], "principle": "養血・補肝", "distinguish": '目の乾きやかすみ、筋のひきつりが出るときを聞きます。顔色や月経の経過も合わせ、目の乾きだけで候補を絞りません。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "liver-stomach", "name": "肝気犯胃", "category": "肝胆", "summary": '緊張する日に、胃の張りやげっぷが増える', "aliases": ["肝胃不和", "肝気犯胃証", "かんきはんい"], "additionalChecks": ["胃部の張り・痛み、げっぷ・悪心・逆流の経過", "食事と情志変動の前後での症状変化"], "supports": ["stress", "distension", "appetite"], "conflicts": [], "principle": "疏肝理気・和胃降逆", "distinguish": '緊張した時刻と胃の症状が始まった時刻を別に書きます。食事や服薬でどう変わるか、げっぷや逆流がないかも聞きます。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "liver-spleen", "name": "肝脾不和", "category": "肝胆", "summary": '緊張と、おなかの張り・腹痛・便通の変化', "aliases": ["肝気犯脾", "肝鬱脾虚", "かんぴふわ"], "additionalChecks": ["情志変動と腹痛・便通の前後関係", "食欲・疲労など脾の所見と、張りの変動"], "supports": ["stress", "distension", "appetite", "loose"], "conflicts": [], "principle": "疏肝健脾", "distinguish": '緊張する日と落ち着いている日で、腹痛や便通がどう違うかを聞きます。食欲と疲れは別に記録し、同じ日に出たことだけで原因は決めません。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-qi", "name": "心気虚", "category": "心", "summary": '動悸と、動いたときの息切れや疲れ', "aliases": ["心気虚証", "しんききょ"], "additionalChecks": ["動悸の性状・時間帯、活動時の息切れ", "自汗・胸部症状、受診や検査の結果"], "supports": ["fatigue", "weakPulse", "weakVoice"], "conflicts": [], "principle": "補益心気", "distinguish": '動悸が始まった時刻、どれくらい続いたか、息切れがあるかを聞きます。疲れや弱い脈だけで心の証は決めず、医療機関での評価も確認します。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-blood", "name": "心血虚", "category": "心", "summary": '動悸や眠りの変化に、淡い顔色や細い脈が重なる', "aliases": ["心血不足", "心血虚証", "しんけっきょ"], "additionalChecks": ["動悸・多夢・健忘などの有無と経過", "顔色・口唇、めまい、細い脈などの血虚所見"], "supports": ["sleep", "paleTongue"], "conflicts": [], "principle": "養血・養心安神", "distinguish": '夜に目が覚めることや動悸に、顔色、めまい、細い脈の所見を合わせます。寝汗やほてりがあれば心陰虚とも比べます。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-yin", "name": "心陰虚", "category": "心", "summary": '眠りの変化や動悸に、ほてりや少ない舌苔が重なる', "aliases": ["心陰不足", "心陰虚証", "しんいんきょ"], "additionalChecks": ["動悸・心煩などの有無と時間帯", "舌苔の量、細い脈、陰虚と実熱を比べる情報"], "supports": ["sleep", "dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋陰・養心安神", "distinguish": '眠れない時刻、動悸が出る時刻と、ほてりや舌苔の少なさを別に書きます。不眠とほてりだけでは、どの証かは決まりません。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "heart-kidney", "name": "心腎不交", "category": "心", "summary": '夜の動悸や不眠と、腰のだるさや耳鳴りを照らす', "aliases": ["心腎不交証", "しんじんふこう"], "additionalChecks": ["動悸・心煩など、心の候補を考えた所見", "腰膝のだるさ・耳鳴りなど、腎の候補を考えた所見"], "supports": ["sleep", "nightSweat", "dry", "heat"], "conflicts": [], "principle": "滋陰・交通心腎・安神", "distinguish": '夜間の動悸など心を考えた点と、腰やひざのだるさ、耳鳴りなど腎を考えた点をそれぞれ記録します。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "stomach-yin", "name": "胃陰虚", "category": "脾胃", "summary": '口の乾き、食べたくない感覚、少ない舌苔', "aliases": ["胃陰不足", "胃陰虚証", "いいんきょ"], "additionalChecks": ["空腹感はあるが食べたくないなど、食欲の具体的な状態", "胃部の不快感、便の乾燥、舌苔の減少"], "supports": ["dry", "appetite", "redTongue"], "conflicts": [], "principle": "養陰益胃・生津", "distinguish": '空腹でも食べたくないのか、食後に胃がつらいのかを聞きます。口の乾きだけで決めず、舌苔や便の乾きも確認します。', "lectureId": "lecture-treatment-7", "points": []},
  {"id": "lung-qi", "name": "肺気虚", "category": "肺", "summary": '弱い声や咳と、動いたときの息切れ', "aliases": ["肺気虚証", "はいききょ"], "additionalChecks": ["弱い咳、活動時の息切れ、痰の量と性状", "自汗・風への反応、普段との違いと経過"], "supports": ["fatigue", "weakVoice", "weakPulse", "paleTongue"], "conflicts": [], "principle": "補肺益気", "distinguish": '普段と声がどう違うか、咳や息切れがいつ出るかを聞きます。声が小さいことや疲れだけで候補は決まりません。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "lung-yin", "name": "肺陰虚", "category": "肺", "summary": '乾いた咳や声がれと、喉の乾き', "aliases": ["肺陰不足", "肺陰虚証", "はいいんきょ"], "additionalChecks": ["乾いた咳・少量の痰・嗄声の有無と経過", "舌苔の量・乾湿、ほかの陰虚の所見"], "supports": ["dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋陰潤肺", "distinguish": '咳が乾いているか、痰がどのくらい出るか、声がれがいつからかを聞きます。口や喉の乾きだけで肺の証とは決めません。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "kidney-qi", "name": "腎気虚", "category": "腎", "summary": '腰やひざのだるさと、排尿の変化', "aliases": ["腎気不足", "腎気虚証", "じんききょ"], "additionalChecks": ["腰膝のだるさ・力の入りにくさ、耳鳴りの経過", "排尿の回数・夜間尿など、普段からの変化"], "supports": ["fatigue", "weakPulse"], "conflicts": [], "principle": "補腎益気", "distinguish": '腰やひざの力の入り方と、夜にトイレに起きる回数を別に聞きます。疲れだけで腎の証とはせず、尿の出方に変化があれば、医療機関で何を確認したかも聞きます。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "kidney-yin", "name": "腎陰虚", "category": "腎", "summary": '腰やひざのだるさに、ほてりや寝汗が重なる', "aliases": ["腎陰不足", "腎陰虚証", "じんいんきょ"], "additionalChecks": ["腰膝のだるさ、耳鳴りなどの経過", "舌苔の量、ほてりや寝汗の時間帯"], "supports": ["dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋補腎陰", "distinguish": '腰のだるさや耳鳴りがいつからか、ほてりや寝汗が何時ごろあるかを聞きます。腰が痛む場所だけで腎陰虚とは決めません。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "kidney-yang", "name": "腎陽虚", "category": "腎", "summary": '腰やひざの冷えと、温めた後の変化', "aliases": ["腎陽不足", "腎陽虚証", "じんようきょ"], "additionalChecks": ["腰膝の冷え・だるさと温めによる変化", "排尿・浮腫・便通の変化と経過"], "supports": ["cold", "fatigue", "weakPulse", "paleTongue"], "conflicts": [], "principle": "温補腎陽", "distinguish": '足の冷えに加え、腰やひざのだるさ、むくみ、排尿や便通の変化を聞きます。冷える部位だけで腎陽虚とは決めません。', "lectureId": "lecture-diagnosis-9", "points": []},
  {"id": "liver-kidney-yin", "name": "肝腎陰虚", "category": "腎", "summary": '目や筋の訴えと、腰やひざのだるさが重なる', "aliases": ["肝腎陰虚証", "かんじんいんきょ"], "additionalChecks": ["目・筋・月経など、肝に関連づけた所見", "腰膝のだるさ・耳鳴りなど、腎に関連づけた所見"], "supports": ["dry", "nightSweat", "heat", "redTongue"], "conflicts": [], "principle": "滋補肝腎", "distinguish": '目のかすみなど肝を考えた点と、腰のだるさや耳鳴りなど腎を考えた点を別々に書きます。ほてりや寝汗だけで二つの臓腑の候補を決めません。', "lectureId": "lecture-diagnosis-9", "points": []},
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
  terminology: { title: 'WHO：中医学の標準用語（2022）', url: 'https://www.who.int/publications/i/item/9789240042322', scope: '証や治法の名前と意味を参照しています。所見の照合や配穴の効果を調べた研究ではありません。' },
  classification: { title: '厚生労働省：ICD-11の分類用語（2023年1月版）', url: 'https://www.mhlw.go.jp/content/10701000/001501598.pdf', scope: '伝統医学の証名と日本語表記の参照。名称の掲載は診断の妥当性や治療効果を示すものではありません。' },
  headache: { title: 'NHS：頭痛の受診目安', url: 'https://www.nhs.uk/symptoms/headaches/', scope: '受診・救急評価の目安。東洋医学の弁証や配穴効果の根拠ではありません。' },
  back: { title: 'NHS：腰背部痛の受診目安', url: 'https://www.nhs.uk/conditions/back-pain/', scope: '神経症状・排尿排便の変化などの受診目安。英国の受診窓口は日本の窓口と異なります。' },
  sleep: { title: 'NHS：不眠の評価と受診', url: 'https://www.nhs.uk/conditions/insomnia/', scope: '睡眠の経過・生活への影響と受診の目安。' },
  fatigue: { title: 'NHS：疲れが長く続くとき', url: 'https://www.nhs.uk/symptoms/tiredness-and-fatigue/', scope: '原因が分からない疲れが続くときの受診の目安。' },
} as const;

export interface ClinicalComplaint {
  slug: string; title: string; summary: string; questions: string[]; recordPrompt: string; review: string[];
  patternIds: string[]; lectureId: string; sourceKeys: (keyof typeof CLINICAL_SOURCES)[];
  patternExamples?: Readonly<Record<string, string>>;
}
export const CLINICAL_COMPLAINTS: ClinicalComplaint[] = [
  {
    slug: 'shoulder', title: '首・肩こり',
    summary: '姿勢や動作による痛みの変化を確かめます。翌日、症状が仕事や睡眠にどう影響したかを確認します。',
    questions: ['いつ始まり、仕事中や姿勢を変えたときにどう変わりますか。', '痛い場所、痛み方、腕や手まで広がるかを聞きます。力の入り方やしびれも確認します。', '頭痛や冷えはありますか。眠れなかった日や緊張した日は、痛みが普段と違いますか。持病や薬も聞きます。'],
    recordPrompt: '肩のどこが痛むか、腕を上げるとどう変わるかを見返します。症状に近いツボと離れたツボを考えた場合は、それぞれ何を手がかりにしたかを書きます。',
    review: ['腕を上げるなど、前と同じ動作での痛みと動く範囲', '翌日以降に仕事や睡眠へどんな影響が出たか'],
    patternIds: ['liver-qi', 'stasis', 'damp'], lectureId: 'lecture-diagnosis-1', sourceKeys: ['terminology'],
    patternExamples: {
      'liver-qi': '首の付け根と肩のどちらが張るかを聞きます。同じ姿勢で作業をするときや、緊張が解けたあとに張りがどう変わるかを比べます。',
      stasis: '肩甲骨の内側など、痛む場所が毎回同じかを聞きます。転倒や腕をひねったことがあれば、いつから痛み始めたかも確かめます。',
      damp: '肩が重だるいと感じる時間帯と、休んだあとの変化を聞きます。しびれや力の入りにくさがあるときは、その経過も別に確かめます。',
    },
  },
  {
    slug: 'back', title: '腰痛',
    summary: '腰から脚へ広がる痛みを記録し、どの動作に支障が出ているかを確認します。',
    questions: ['いつ、何をしていて痛み始めましたか。けがの有無と、動いたときや休んだときの変化を聞きます。', '両脚のしびれ、力の入りにくさ、股の周りの感覚、排尿・排便に新しい変化がないかを確認します。', '発熱や体重の変化、持病や薬はありますか。靴下をはくなど、困った動作も聞きます。'],
    recordPrompt: '腰のどこに痛みがあり、脚のどこまで広がるかを見返します。動作による変化と、それぞれのツボを候補にした理由を書き分けます。',
    review: ['前と同じ動作での痛みと、できるようになった動作', '脚の力やしびれの変化と、医療機関で確認したこと'],
    patternIds: ['stasis', 'damp', 'spleen-yang'], lectureId: 'lecture-diagnosis-2', sourceKeys: ['back', 'terminology'],
    patternExamples: {
      'spleen-yang': '腰痛に加えて、おなかの冷え、食欲や便の変化があるかを聞きます。腰の痛みと胃腸の訴えが同じ時期に出たかも分けて記録します。',
    },
  },
  {
    slug: 'headache', title: '頭痛',
    summary: '急いで受診する必要がないかを先に確かめ、頭痛が出た日数、仕事への影響、薬を使った回数を記録します。',
    questions: ['突然始まりましたか。いつもの痛みと違うか、頭を打ったことや発熱がないかも聞きます。', 'どこがどんなふうに痛み、何分・何時間続きますか。見え方、言葉、手足の動きの変化も確認します。', '睡眠、緊張した日、月経の前後で変わりますか。使った薬と、仕事などで困ったことも聞きます。'],
    recordPrompt: '痛む場所と、頭痛が強まる時間や場面を見返します。場所を手がかりに選んだツボと、一緒に出た症状を手がかりに選んだツボを分けて書きます。',
    review: ['頭痛が出た日数、一回の長さ、痛みの程度', '中断した仕事や家事、薬を使った回数、受診結果'],
    patternIds: ['liver-qi', 'liver-heat', 'stasis', 'yin'], lectureId: 'lecture-diagnosis-2', sourceKeys: ['headache', 'terminology'],
    patternExamples: {
      'liver-qi': '頭が締め付けられる感じが、緊張の前後でどう変わるかを聞きます。口の苦さや目の赤みを伴うときは、肝鬱化火の説明も読み比べます。',
      stasis: 'こめかみや後頭部など、毎回同じところが痛むか、刺すような痛みかを確かめます。頭を打ったあとに始まった頭痛では、証を考える前に受診の状況を確認します。',
    },
  },
  {
    slug: 'sleep', title: '不眠',
    summary: '寝付くまでの時間と、夜に目が覚める回数を聞き取ります。翌日、眠気で困った場面も確かめます。',
    questions: ['何時に床に入り、何時に起きますか。寝付きにくい、夜中や早朝に目が覚めるなど、いつから続いているかも聞きます。', '翌日、眠気で何に困りますか。いびきや睡眠中の呼吸、カフェイン・飲酒・服薬も聞きます。', '痛み、気分の変化、ほてりや口の乾きはありますか。持病や受診状況も確認します。'],
    recordPrompt: '寝付けないときと、夜中に目が覚めたときの記録を見返します。痛み、ほてり、翌日の眠気など、どの訴えを手がかりにツボを考えたかを書きます。',
    review: ['床に入ってから寝るまでの時間と、夜に目が覚めた回数', '昼間の眠気が、仕事や家事にどの程度影響したか'],
    patternIds: ['liver-qi', 'liver-heat', 'yin'], lectureId: 'lecture-diagnosis-1', sourceKeys: ['sleep', 'terminology'],
    patternExamples: {
      'liver-qi': '緊張した日とそうでない日で、寝付くまでの時間を比べます。胸や肋骨の下が張る感じがあったかも別に聞きます。',
      'liver-heat': '寝付きにくさに加え、ほてり、口の苦さ、目の赤みが同じ日に出たかを確認します。眠りの変化だけで候補を決めません。',
      yin: '夜に目が覚めたとき、口が乾いていたか、汗で目が覚めたかを聞きます。眠りの記録と乾きやほてりの記録を照らし合わせます。',
    },
  },
  {
    slug: 'digestion', title: '胃腸の不調',
    summary: '食前と食後の症状、便の状態、体重の変化を分けて聞きます。',
    questions: ['食後に胃が重くなる、痛む、眠くなるといった変化はありますか。何がどのくらい続きますか。便の硬さと回数も聞きます。', '強い腹痛、血の混じる便、発熱、体重の変化はありますか。持病や薬も確認します。', '疲れや冷えがあるか、温めたときや緊張した日で症状が変わるかを聞きます。'],
    recordPrompt: '胃もたれが出る時刻と、便の変化が出る時期を見返します。どちらを主な手がかりにツボを考えたか、その理由を書きます。',
    review: ['以前と比べた食欲、便の硬さと回数', '食後に仕事や家事を中断したか、その時間。体重や体調の変化'],
    patternIds: ['spleen-qi', 'spleen-yang', 'damp', 'liver-qi'], lectureId: 'lecture-diagnosis-8', sourceKeys: ['terminology'],
  },
  {
    slug: 'fatigue', title: '疲労・倦怠感',
    summary: '疲れが出る時間帯、休んだ後の変化、できなくなった日常動作を聞き、受診や検査の結果も確認します。',
    questions: ['いつから疲れが続き、何時ごろ強まりますか。動いたときと休んだ後、どんなことに困るかを聞きます。', '眠り、食欲、便通は変わりましたか。息切れ、動悸、体重の変化も確認します。', 'これまでの病気や服薬、受診や検査の結果を聞きます。冷えやほてりの有無も尋ねます。'],
    recordPrompt: '動いたときの疲れと、食後に強くなる疲れの記録を見返します。どちらの訴えを手がかりに各穴を検討したかを書きます。',
    review: ['同じ買い物や家事での疲れ方と、休み始めてから動作を再開できるまでの時間', '睡眠と食欲の変化、受診の結果、施術後に困った反応'],
    patternIds: ['spleen-qi', 'spleen-yang', 'damp', 'yin'], lectureId: 'lecture-diagnosis-8', sourceKeys: ['fatigue', 'terminology'],
  },
];

export const CLINICAL_INFORMATION_SCOPE = '診察で確かめたことを「所見」、症状や所見から東洋医学で考える体の状態を「証」と呼びます。この教材では、選んだ所見を証の説明と比べます。候補の表示から、病気の有無や治療の効果は分かりません。表示されなかった証も、除外できたことにはなりません。';
