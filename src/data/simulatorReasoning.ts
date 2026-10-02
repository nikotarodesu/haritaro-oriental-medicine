import type { AcupointOption, ComprehensiveDiagnosis, ComplexStateType, DeltaInsight, DepthType, FourExaminationsInput, PreviousSelection, QixueshuiType, StateType, TemperatureType, ZangfuType } from './simulatorData';
import { ACUPOINTS_MASTER } from './tsubo/acupointsMaster';

export type SafetyReview = 'unconfirmed' | 'no_flags' | 'red_flags';
const pointMap = new Map(ACUPOINTS_MASTER.map(p => [p.code, p]));
const qiLabels: Record<QixueshuiType, string> = { qixu: '気虚', qizhi: '気滞', qini: '気逆', xuexu: '血虚', yuxue: '瘀血', shuitai: '水滞・痰湿', yinxu: '陰虚', yangxu: '陽虚' };
const organLabels: Record<ZangfuType, string> = { liver: '肝・胆', heart: '心・小腸', spleen: '脾・胃', lung: '肺・大腸', kidney: '腎・膀胱' };

interface PatternModel {
  name: string; rule: string; explanation: string; signs: string[]; alternatives: string[];
  pairs: { codes: [string, string]; purpose: string; condition: string }[];
}
const models: Record<string, PatternModel> = {
  liverHeat: { name: '肝鬱化火', rule: '疏肝理気・清熱を検討', explanation: '伝統医学では、気滞に熱の徴候が伴う場合に肝鬱化火などを候補にします。肝気鬱結だけで必ず熱証になるわけではありません。', signs: ['胸脇部の張りと情志変動との関連', '口苦・紅舌・熱感など、熱の裏付け'], alternatives: ['熱の所見を伴わない肝気鬱結', '肝火上炎', '肝鬱脾虚'], pairs: [{ codes: ['LR3','GB34'], purpose: '疏肝理気', condition: '気滞の所見が主であることを確認' }, { codes: ['LR3','LR2'], purpose: '疏肝・清熱', condition: '熱の所見が明らかで、清熱を検討する場合' }] },
  liverCold: { name: '寒凝肝脈', rule: '温経散寒・理気を検討', explanation: '寒の徴候と肝経の走行に沿う症状を合わせて検討する伝統的な病態モデルです。冷えだけでは特定できません。', signs: ['少腹部などの痛みの部位・性状', '温めによる軽減と冷えによる増悪'], alternatives: ['寒湿による経絡の阻滞', '陽虚を基盤とする冷え'], pairs: [{ codes: ['LR3','CV4'], purpose: '理気・温経', condition: '寒と気滞の所見を確認し、局所の安全性を評価' }] },
  spleenQi: { name: '脾気虚', rule: '補気健脾を検討', explanation: '食欲低下、軟便、疲労などをまとめて考える伝統的な候補です。気虚と陽虚は区別し、寒の徴候があるか追加確認します。', signs: ['食欲、便の性状、食後の症状', '疲労・息切れ・声の弱さなどの気虚所見'], alternatives: ['脾陽虚', '湿困脾胃', '食滞'], pairs: [{ codes: ['ST36','SP3'], purpose: '補気健脾', condition: '消化器症状と気虚所見がそろう場合' }, { codes: ['ST36','CV12'], purpose: '健脾和胃', condition: '胃部の症状を伴う場合' }] },
  kidneyYin: { name: '腎陰虚', rule: '滋陰を中心に、虚熱の有無を確認', explanation: '腰膝の症状と乾燥・ほてりなどを合わせて検討します。陰虚を血液検査上の脱水やホルモン異常と同一視しません。', signs: ['腰膝の症状、夜間のほてり・盗汗の有無', '舌苔の減少、乾燥、脈の所見'], alternatives: ['腎陽虚', '肝腎陰虚', '実熱の病態'], pairs: [{ codes: ['KI3','KI6'], purpose: '滋陰', condition: '陰虚の所見があり、実熱との違いを検討' }] },
  exteriorCold: { name: '風寒束表', rule: '解表・散寒を検討', explanation: '悪寒、発熱、汗の有無、経過などを合わせて検討する表証の学習モデルです。急性の症状という理由だけで表証とはしません。', signs: ['発症時期、悪寒と発熱の関係', '汗の有無・頭身痛・脈の所見'], alternatives: ['風熱表証', '表虚の病態', '医療機関での評価が必要な感染症'], pairs: [{ codes: ['LU7','LI4'], purpose: '解表', condition: '表証の所見を確認し、発熱などの医療評価を検討' }] },
  shangre_xiahan: { name: '上熱下寒', rule: '上下の寒熱を分け、原因と治療の優先順位を検討', explanation: '上部の熱感と下部の冷えが併存するという伝統的な整理です。自律神経や脳血流の特定の異常を、この入力だけから断定できません。', signs: ['熱感・冷えの部位と実測・自覚の区別', '発症時期と服薬、月経などとの関連'], alternatives: ['陰虚の虚熱', '陽虚と熱感の併存', '別の原因による温度感覚の変化'], pairs: [{ codes: ['LR3','KI1'], purpose: '上下の気機を調える伝統的な配穴例', condition: '寒熱の部位と虚実を追加確認' }, { codes: ['CV4','KI3'], purpose: '下焦を重視する伝統的な配穴例', condition: '下焦の虚の所見が確認できる場合' }] },
  benxu_biaoshi: { name: '本虚標実', rule: '本と標を分け、緊急性・体力・主訴から優先順位を検討', explanation: '不足を背景に滞りなどが併存する伝統的な分類です。本と標の治療割合を固定の数値で決めるものではありません。', signs: ['何が不足し、何が滞っているかを分けた記録', '主訴の緊急性と生活機能への影響'], alternatives: ['単一の虚証', '単一の実証', '別々の病態の併存'], pairs: [{ codes: ['ST36','LR3'], purpose: '補気と理気の組合せ例', condition: '気虚と気滞の両方が確認できる場合' }] },
  biaoli_tongbing: { name: '表裏同病', rule: '表と裏の根拠を分け、対応順序を検討', explanation: '表証と裏証が併存する可能性を整理します。急性・慢性という時間軸だけで表裏を決めないことが学習上の要点です。', signs: ['新しい症状と従来の症状の経過', '表証・裏証それぞれの四診所見'], alternatives: ['表証のみ', '裏証のみ', '複数疾患の併存'], pairs: [{ codes: ['LU7','ST36'], purpose: '解表と補気の組合せ例', condition: '表証に気虚が併存することを確認' }] },
  time_fluctuation: { name: '寒熱の時間帯変動', rule: '時間帯・持続時間・誘因を記録し、判断を保留', explanation: '寒熱が時間により変わるという情報を整理します。この情報だけで少陽病や自律神経失調を特定することはできません。', signs: ['変動の時刻と測定した体温', '飲食・活動・服薬との関係'], alternatives: ['寒熱の併存', '発熱や生活条件による変動'], pairs: [] },
};

export function assessFourExaminations(input: FourExaminationsInput) {
  const heat: string[] = [], cold: string[] = [], excess: string[] = [], deficiency: string[] = [], observed: string[] = [];
  if (input.palpation === 'an_ki') { deficiency.push('喜按'); observed.push('按診：喜按'); }
  if (input.palpation === 'an_kyo') { excess.push('拒按'); observed.push('按診：拒按'); }
  if (input.tempReaction === 'warm_relief') { cold.push('温めると軽減'); observed.push('温冷反応：温めると軽減'); }
  if (input.tempReaction === 'cool_relief') { heat.push('冷やすと軽減'); observed.push('温冷反応：冷やすと軽減'); }
  if (input.drinking === 'warm_drink') { cold.push('温飲を好む'); observed.push('飲水：温飲を好む'); }
  if (input.drinking === 'cold_drink') { heat.push('冷飲多飲'); observed.push('飲水：冷飲多飲'); }
  if (input.tongue === 'pale_white') { cold.push('淡白舌・白湿苔'); deficiency.push('淡白舌'); observed.push('舌診：淡白舌・白湿苔'); }
  if (input.tongue === 'red_yellow') { heat.push('紅舌・黄燥苔'); observed.push('舌診：紅舌・黄燥苔'); }
  return { heat, cold, excess, deficiency, observed };
}

function pairOption(pair: PatternModel['pairs'][number], primary: boolean): AcupointOption {
  const [first, second] = pair.codes.map(code => pointMap.get(code)!);
  const point = (p: typeof first) => ({ id: p.legacyId || p.id, name: p.name, meridian: p.meridian, role: [...new Set(p.categories)].join('・') || '所属経脈・部位を辞典で確認' });
  return {
    isPrimary: primary, pairName: `${pair.purpose}：${first.name} ＋ ${second.name}`,
    primaryAcupoint: point(first), secondaryAcupoint: point(second),
    intendedEffect: `伝統的な治則として「${pair.purpose}」を学ぶための例です。個人への効果を予測するものではありません。`,
    indicationConditions: pair.condition,
    differentialReason: `${first.name}と${second.name}の所属経脈・要穴分類を、主訴と選択した治則に照らして説明してください。`,
    reassessmentPoint: '主訴の程度、生活動作、持続時間、有害な反応の有無を施術前後・次回に同じ指標で比較する。',
    evidenceLevel: {
      classical: '伝統的な治則と要穴分類を基にした学習用の配穴例です。古典の原文引用・公式推奨処方ではありません。',
      modernResearch: '鍼の研究結果は対象疾患・手法・比較条件によって異なります。このペアと証の組合せに対する有効性や特定の作用機序を、ここでは確認していません。',
      clinicalPerspective: '採用前に問診・観察・触診を統合し、局所解剖、禁忌、体格、患者の希望を確認します。深度・刺激量・施術回数は一律に決めません。',
    },
  };
}

export function synthesizeComprehensiveDiagnosis(
  depth: DepthType, temp: TemperatureType, state: StateType, qi: QixueshuiType, organ: ZangfuType,
  complex: ComplexStateType = 'none',
  input: FourExaminationsInput = { palpation: 'unconfirmed', tempReaction: 'unconfirmed', drinking: 'unconfirmed', tongue: 'unconfirmed' },
  safety: SafetyReview = 'unconfirmed',
): ComprehensiveDiagnosis {
  const findings = assessFourExaminations(input);
  const conflicts: string[] = [];
  if (findings.heat.length && findings.cold.length) conflicts.push(`寒を示唆：${findings.cold.join('・')}／熱を示唆：${findings.heat.join('・')}。部位・時間帯・条件を確認してください。`);
  if (findings.excess.length && findings.deficiency.length) conflicts.push('喜按・淡白舌などの虚の所見と、拒按の実の所見が併存しています。');
  if (temp === 'heat' && findings.cold.length) conflicts.push('選択した熱と、寒を示唆する所見が一致していません。');
  if (temp === 'cold' && findings.heat.length) conflicts.push('選択した寒と、熱を示唆する所見が一致していません。');
  if (state === 'excess' && findings.deficiency.length) conflicts.push('選択した実と、虚を示唆する所見が一致していません。');
  if (state === 'deficiency' && findings.excess.length) conflicts.push('選択した虚と、実を示唆する所見が一致していません。');
  if (complex === 'none') {
    if (qi === 'yinxu' && temp === 'cold') conflicts.push('陰虚の選択と寒の関係を再確認してください。併存病態や別の候補を検討します。');
    if (qi === 'yangxu' && temp === 'heat') conflicts.push('陽虚の選択と熱の関係を再確認してください。仮熱や別の候補を検討します。');
    if (state === 'excess' && ['qixu','xuexu','yinxu','yangxu'].includes(qi)) conflicts.push('不足を表す気血水の選択と実の関係を確認してください。本虚標実の可能性も検討します。');
    if (state === 'deficiency' && ['qizhi','qini','yuxue'].includes(qi)) conflicts.push('虚と滞りの関係を確認してください。本虚標実などの併存を検討します。');
  }
  let model = complex !== 'none' ? models[complex] : undefined;
  if (complex === 'none') {
    if (depth === 'interior' && state === 'excess' && organ === 'liver' && qi === 'qizhi') model = models[temp === 'heat' ? 'liverHeat' : 'liverCold'];
    if (depth === 'interior' && state === 'deficiency' && organ === 'spleen' && qi === 'qixu') model = models.spleenQi;
    if (depth === 'interior' && temp === 'heat' && state === 'deficiency' && organ === 'kidney' && qi === 'yinxu') model = models.kidneyYin;
    if (depth === 'exterior' && temp === 'cold' && state === 'excess' && organ === 'lung') model = models.exteriorCold;
  }
  const flags = safety === 'red_flags';
  const name = flags ? '施術候補の提示を保留' : complex === 'undetermined' ? '判断保留' : model ? `${model.name}の候補` : '追加情報が必要な組合せ';
  const missing: string[] = [];
  if (safety === 'unconfirmed') missing.push('危険兆候と医療機関への紹介の必要性');
  if (input.palpation === 'unconfirmed') missing.push('按診：痛みの部位、喜按・拒按の有無');
  if (input.tempReaction === 'unconfirmed') missing.push('温冷による症状の変化');
  if (input.drinking === 'unconfirmed') missing.push('口渇・飲水の好みと量');
  if (input.tongue === 'unconfirmed') missing.push('舌質と舌苔の所見・観察条件');
  missing.push('発症時期・経過・服薬・既往歴・脈など、主訴に必要な情報');
  const hold = flags || conflicts.length > 0 || complex === 'undetermined';
  return {
    status: flags || conflicts.length ? 'conflict' : 'suspected',
    statusBadge: { label: flags ? '医療評価を優先' : conflicts.length ? '所見の不一致・判断保留' : '学習用の候補・追加確認が必要', description: '選択条件に基づく学習モデルです。確定診断や確率の推定ではありません。', variant: flags || conflicts.length ? 'danger' : 'warning' },
    syndromeName: name, syndromeReading: '所見を追加して候補を比較します',
    oneSentenceFormula: `選択条件：${depth === 'interior' ? '裏' : '表'}・${temp === 'heat' ? '熱' : '寒'}・${state === 'excess' ? '実' : '虚'}／${qiLabels[qi]}／${organLabels[organ]}。${name}として検討し、未確認情報を補う。`,
    summary: flags ? '危険兆候がある設定では、弁証や配穴より医療機関での評価を優先します。緊急性に応じた紹介・救急対応を学んでください。' : model?.explanation || 'この組合せから妥当な証名を自動で作ることはできません。主訴と四診の根拠を整理し、候補を比較してください。',
    pathologyMechanism: model?.explanation || '伝統医学の病態分類として整理する段階です。特定の神経・血管・臓器の異常をこの入力から推定しません。',
    differentialCandidates: model?.alternatives || ['寒熱・虚実の選択を再検討', '併存病態と、医療機関で評価する原因の検討'],
    supportingFindings: findings.observed.length ? findings.observed.map(s => `入力された所見：${s}`) : ['四診は未確認です。選択した分類は仮の条件であり、患者から確認した所見ではありません。'],
    conflictingFindings: conflicts.length ? conflicts : ['入力された範囲では不一致を検出していません。情報不足のため、矛盾がないことを保証するものではありません。'],
    missingInformation: [...missing, ...(model?.signs || [])],
    nextActionQuestions: [
      { question: 'いつ始まり、どのように変化しましたか。既往歴・服薬・医療機関での評価はありますか。', target: '問診', reason: '主訴と経過を整理し、別の原因や紹介の必要性を検討するため。' },
      { question: model?.signs[0] || '候補に合わない症状や所見はありますか。', target: '問診', reason: '最初の仮説に合う情報だけを集めることを避けるため。' },
      { question: '舌質・舌苔と脈を、問診・触診で得た所見と照合してください。', target: '舌象', reason: '単独所見で決めず、支持・反証・未確認を区別するため。' },
    ],
    treatmentPrinciple: { rule: hold ? '判断を保留し、必要な確認・紹介を優先' : model?.rule || '情報収集と候補の比較を優先', strategy: '主訴、緊急性、体力、禁忌、本人の希望から優先順位を検討します。本治・随証の比率や刺激量を固定しません。' },
    acupointOptions: hold ? [] : (model?.pairs || []).map((pair, i) => pairOption(pair, i === 0)),
  };
}

export function generateDeltaInsight(prev: PreviousSelection, curr: PreviousSelection): DeltaInsight | null {
  const changed = (Object.keys(curr) as (keyof PreviousSelection)[]).filter(key => prev[key] !== curr[key]);
  if (!changed.length) return null;
  return { changedItem: '選択条件を変更しました', pathologyChange: '変更した分類に対応する候補と不足情報を再確認してください。', treatmentStrategyChange: '選択条件の変更だけで治療方針は確定しません。支持所見と反証所見を照合します。', acupointImpact: '配穴例を採用する条件と、候補を保留する理由を比較してください。' };
}
