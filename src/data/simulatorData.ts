export type DepthType = "exterior" | "interior"; // 表 / 裏
export type TemperatureType = "cold" | "heat"; // 寒 / 熱
export type StateType = "deficiency" | "excess"; // 虚 / 実

// 複雑な状態（併存・未確定）
export type ComplexStateType = 
  | "none"                // 通常モード（八綱二択）
  | "shangre_xiahan"      // 寒熱錯雑：上熱下寒（のぼせ冷え）
  | "time_fluctuation"    // 寒熱錯雑：時間帯での変動
  | "benxu_biaoshi"       // 虚実夾雑：本虚標実（体力基盤は虚だが局所コリ・滞りが強い）
  | "biaoli_tongbing"     // 表裏同病：慢性の内因性臓腑病変＋急性の外感風邪
  | "undetermined";       // 所見矛盾・情報不足による判断保留

// 四診の判断材料（キーサイン）
export type PalpationType = "an_ki" | "an_kyo" | "unconfirmed"; // 喜按（虚） / 拒按（実） / 未確認
export type TempReactionType = "warm_relief" | "cool_relief" | "unconfirmed"; // 得温痛減（寒） / 得涼痛減（熱） / 未確認
export type DrinkingType = "warm_drink" | "cold_drink" | "unconfirmed"; // 温飲・口渇なし（寒） / 冷飲多飲・口苦（熱） / 未確認
export type TongueType = "pale_white" | "red_yellow" | "unconfirmed"; // 淡白舌・白湿苔（虚寒） / 舌紅・黄燥苔（実熱） / 未確認

export interface FourExaminationsInput {
  palpation: PalpationType;
  tempReaction: TempReactionType;
  drinking: DrinkingType;
  tongue: TongueType;
}

// 差分解説（今回変わったこと）
export interface DeltaInsight {
  changedItem: string; // 例: "寒熱：『熱』から『寒』へ変更"
  pathologyChange: string; // 判断のどこが変わったか（病理の転換）
  treatmentStrategyChange: string; // そのため治法をどう考え直すか（治療戦略の転換）
  acupointImpact: string; // 配穴の狙いの違い
}

export type QixueshuiType = 
  | "qixu" // 気虚
  | "qizhi" // 気滞
  | "qini" // 気逆
  | "xuexu" // 血虚
  | "yuxue" // 瘀血
  | "yinxu" // 陰虚
  | "yangxu" // 陽虚
  | "shuitai"; // 水滞・痰湿

export type ZangfuType = 
  | "liver" // 肝・胆
  | "heart" // 心・小腸
  | "spleen" // 脾・胃
  | "lung" // 肺・大腸
  | "kidney"; // 腎・膀胱

export type DiagnosisStatus = "conflict" | "suspected";

export interface AcupointOption {
  isPrimary: boolean;
  pairName: string;
  primaryAcupoint: { id: string; name: string; meridian: string; role: string };
  secondaryAcupoint: { id: string; name: string; meridian: string; role: string };
  intendedEffect: string; // この配穴で狙うこと
  indicationConditions: string; // 採用を検討する条件
  differentialReason: string; // 別の配穴候補との違い
  reassessmentPoint: string; // 再評価で確認すること
  evidenceLevel: {
    classical: string; // 伝統理論・古典の根拠
    modernResearch: string; // 現代研究で確認された範囲（神経生理・筋膜）
    clinicalPerspective: string; // 著者の臨床的見解・注意事項
  };
}

export interface NextActionQuestion {
  question: string;
  target: "問診" | "舌象" | "脈象" | "腹証・触診";
  reason: string;
}

export interface ComprehensiveDiagnosis {
  status: DiagnosisStatus;
  statusBadge: {
    label: string;
    description: string;
    variant: "success" | "warning" | "danger";
  };
  syndromeName: string;
  syndromeReading: string;
  oneSentenceFormula: string; // 入力値と完全に連動した動的一文の証
  summary: string;
  pathologyMechanism: string; // 病理メカニズム
  differentialCandidates: string[]; // 考えられる証の候補（現時点で何を考えるか）
  supportingFindings: string[]; // 支持する所見（なぜ候補になるか）
  conflictingFindings: string[]; // 合わない所見（どこに矛盾があるか）
  missingInformation: string[]; // 未確認の情報（何が足りないか）
  nextActionQuestions: NextActionQuestion[]; // 次に確認する質問・所見（どう判断を進めるか）
  treatmentPrinciple: {
    rule: string; // 治則（何を目指して介入するか）
    strategy: string; // 標本・補瀉・刺激量の介入ベクトル
  };
  acupointOptions: AcupointOption[]; // 理由を比較できる複数の配穴候補
}

// 代表プリセット（学習用サンプル症例）
export interface PresetCase {
  id: string;
  name: string;
  label: string;
  description: string;
  values: {
    depth: DepthType;
    temp: TemperatureType;
    state: StateType;
    qixueshui: QixueshuiType;
    zangfu: ZangfuType;
  };
}

export const PRESET_CASES: PresetCase[] = [
  {
    id: "preset-ganki",
    name: "肝鬱化火の学習例",
    label: "胸脇部の張りと熱の所見（裏・熱・実）",
    description: "ストレスによるイライラ、胸脇部の張り、ため息が目立つ典型的な実熱気滞パターン。",
    values: { depth: "interior", temp: "heat", state: "excess", qixueshui: "qizhi", zangfu: "liver" }
  },
  {
    id: "preset-kannou",
    name: "寒凝肝脈証",
    label: "冷え性・下腹部痛（裏・寒・実）",
    description: "寒邪が肝経に侵入し、冷えによって下腹部や側腹部が締め付けられるように痛む実寒パターン。",
    values: { depth: "interior", temp: "cold", state: "excess", qixueshui: "qizhi", zangfu: "liver" }
  },
  {
    id: "preset-hiki",
    name: "脾気虚弱証",
    label: "胃腸虚弱・食後倦怠（裏・寒・虚）",
    description: "食欲不振、軟便、食後の強い眠気があり、消化吸収と全身エネルギーが枯渇した虚寒パターン。",
    values: { depth: "interior", temp: "cold", state: "deficiency", qixueshui: "qixu", zangfu: "spleen" }
  },
  {
    id: "preset-jinyin",
    name: "腎陰虚証",
    label: "更年期ほてり・寝汗（裏・熱・虚）",
    description: "加齢や過労で陰液が消耗し、手足のほてりや夜間の寝汗が起きる虚熱パターン。",
    values: { depth: "interior", temp: "heat", state: "deficiency", qixueshui: "yinxu", zangfu: "kidney" }
  },
  {
    id: "preset-fukan",
    name: "風寒表証",
    label: "かぜ初期・悪寒無汗（表・寒・実）",
    description: "冷え込みによる悪寒、後頭部痛、首筋のこわばりが出現した体表の急性外感パターン。",
    values: { depth: "exterior", temp: "cold", state: "excess", qixueshui: "qizhi", zangfu: "lung" }
  }
];

// 選択肢のメタデータ
export const DEPTH_OPTIONS: { value: DepthType; label: string; sub: string; description: string }[] = [
  { value: "exterior", label: "表（ひょう）", sub: "外感の表証を検討", description: "外感初期の悪寒・発熱などをまとめて検討する伝統的な分類です。急性症状だけで表証と決めません。" },
  { value: "interior", label: "裏（り）", sub: "臓腑などの裏証を検討", description: "表証に対して体内の病態を整理する伝統的な分類です。慢性症状だけで裏証と決めません。" }
];

export const TEMP_OPTIONS: { value: TemperatureType; label: string; sub: string; description: string }[] = [
  { value: "cold", label: "寒（かん）", sub: "冷え・温めると軽減など", description: "手足の冷え、血流低下、水様性の分泌物、縮こまるような痛みなどの沈静状態。" },
  { value: "heat", label: "熱（ねつ）", sub: "熱感・赤み・口渇など", description: "体温上昇、局所の充血、のぼせ、口の渇き、焦燥感などの亢進状態。" }
];

export const STATE_OPTIONS: { value: StateType; label: string; sub: string; description: string }[] = [
  { value: "deficiency", label: "虚（きょ）", sub: "生命力不足・機能衰弱", description: "伝統医学では正気の不足を整理する分類です。免疫検査や栄養状態と同一視しません。" },
  { value: "excess", label: "実（じつ）", sub: "病邪の鬱滞・過剰・張り", description: "病邪が強く勢いがある、または気血水の滞り・緊張が過剰な状態。" }
];

export const QIXUESHUI_OPTIONS: { value: QixueshuiType; label: string; sub: string; dynamicNature: string }[] = [
  { value: "qizhi", label: "気滞（きたい）", sub: "気の鬱滞・巡り不全", dynamicNature: "エネルギーの運行が滞り、張りとイライラが生じる" },
  { value: "qixu", label: "気虚（ききょ）", sub: "気エネルギーの枯渇", dynamicNature: "推進力と温煦力が衰え、無力感・息切れが生じる" },
  { value: "qini", label: "気逆（きぎゃく）", sub: "気の異常上昇・突き上げ", dynamicNature: "下降すべき気が逆流し、のぼせ・咳・吐き気が生じる" },
  { value: "xuexu", label: "血虚（けっきょ）", sub: "伝統的な滋養機能の不足", dynamicNature: "組織や脳への滋養が不足し、乾燥・めまい・不眠が生じる" },
  { value: "yuxue", label: "瘀血（おけつ）", sub: "血行の病理的鬱滞", dynamicNature: "伝統医学では血の運行の滞りとして整理し、固定痛・暗紫色などを検討する" },
  { value: "yinxu", label: "陰虚（いんきょ）", sub: "伝統的な滋潤機能の不足", dynamicNature: "伝統医学では滋潤の不足と虚熱を整理し、乾燥やほてりなどを検討する" },
  { value: "yangxu", label: "陽虚（ようきょ）", sub: "体内温熱エネルギーの衰退", dynamicNature: "生命の火が弱まり、内臓から四肢末梢まで芯から冷え切る" },
  { value: "shuitai", label: "水滞・痰湿（すいたい）", sub: "体液代謝産物の停滞", dynamicNature: "水分の排泄運化が阻害され、重だるさ・むくみ・眩暈が生じる" }
];

export const ZANGFU_OPTIONS: { value: ZangfuType; label: string; sub: string; organRole: string }[] = [
  { value: "liver", label: "肝・胆（かん・たん）", sub: "疏泄・蔵血・筋", organRole: "全身の気のめぐり（疏泄）と情動、筋腱の緊張を主導" },
  { value: "heart", label: "心・小腸（しん・しょうちょう）", sub: "心血・精神意識", organRole: "伝統医学では血脈と神明に関わる働きとして整理する" },
  { value: "spleen", label: "脾・胃（ひ・い）", sub: "消化吸収・後天の気", organRole: "飲食物から気血津液を生み出し全身へ運化するエネルギー工場" },
  { value: "lung", label: "肺・大腸（はい・だいちょう）", sub: "呼吸・皮膚バリア・粛降", organRole: "清気の吸入、水分を全身・膀胱へ散布下降させ体表を守る" },
  { value: "kidney", label: "腎・膀胱（じん・ぼうこう）", sub: "先天の精・骨・水分代謝", organRole: "生命力の根本（精・原気）を蓄え、下行性の水分排泄と骨髄を司る" }
];

// 複雑な状態の選択肢メタデータ
export interface ComplexStateOption {
  value: ComplexStateType;
  label: string;
  category: "寒熱" | "虚実" | "表裏" | "判断保留";
  summary: string;
  explanation: string;
}

export const COMPLEX_STATE_OPTIONS: ComplexStateOption[] = [
  {
    value: "shangre_xiahan",
    label: "上熱下寒（じょうねつげかん）",
    category: "寒熱",
    summary: "部位による寒熱の錯雑：顔はのぼせるが足先は氷のように冷える",
    explanation: "上半身の熱感と下半身の冷えを、部位別に整理する伝統的な分類です。原因は四診と医療評価から検討します。"
  },
  {
    value: "time_fluctuation",
    label: "寒熱の時間帯変動",
    category: "寒熱",
    summary: "時間帯による寒熱の錯雑：日中はほてり、夜間・朝方に強い冷えを感じる",
    explanation: "陽気の消長（昼間の陽気亢進と夜間の陽気衰退）に伴い寒熱の主徴が入れ替わる動的錯雑病態。"
  },
  {
    value: "benxu_biaoshi",
    label: "本虚標実（ほんきょひょうじつ）",
    category: "虚実",
    summary: "虚実の夾雑：体力や臓腑の自活力が不足（本虚）し、局所に頑固なコリ・気滞・瘀血が滞留（標実）",
    explanation: "何が虚で何が実かを峻別することが最重要。不足と滞りそれぞれの所見を確認し、優先順位と刺激量を個別に検討します。"
  },
  {
    value: "biaoli_tongbing",
    label: "表裏同病（ひょうりどうびょう）",
    category: "表裏",
    summary: "病位の重複：慢性の胃腸虚弱や内臓疾患（裏証）を抱えた人が、急性の風邪（表証）を併発",
    explanation: "表邪を追い払う解表と、裏の体力を支える補益のどちらを優先するか（急則治其標／緩則治其本）の判断が問われる病態。"
  },
  {
    value: "undetermined",
    label: "所見不一致による判断保留",
    category: "判断保留",
    summary: "自覚症状と他覚所見（舌・脈・腹）が食い違い、確定診断に必要な情報が不足している状態",
    explanation: "安易にひとつの証に決めつけず、追加の四診（特に按診・舌象・飲水傾向）を行って矛盾を解消すべき段階。"
  }
];

// 四診判断材料の選択肢
export const PALPATION_OPTIONS = [
  { value: "unconfirmed", label: "按診：未確認", hint: "押圧への反応が不明" },
  { value: "an_ki", label: "喜按（押すと楽）", hint: "手で温めたり軽く押すと痛みが緩解 ➔ 【虚証】" },
  { value: "an_kyo", label: "拒按（押すと嫌）", hint: "手を触れられるのを嫌がり圧痛が強い ➔ 【実証】" }
] as const;

export const TEMP_REACTION_OPTIONS = [
  { value: "unconfirmed", label: "温冷反応：未確認", hint: "温冷への反応が不明" },
  { value: "warm_relief", label: "得温痛減（温めると楽）", hint: "入浴やカイロで痛みが軽快 ➔ 【寒証】" },
  { value: "cool_relief", label: "得涼痛減（冷やすと楽）", hint: "冷湿布や氷冷で痛みが軽快 ➔ 【熱証】" }
] as const;

export const DRINKING_OPTIONS = [
  { value: "unconfirmed", label: "飲水：未確認", hint: "口渇・飲水傾向が不明" },
  { value: "warm_drink", label: "温飲を好む・口渇なし", hint: "温かいお茶を少量すする程度 ➔ 【寒証・陽虚】" },
  { value: "cold_drink", label: "冷飲を多飲・口が苦い", hint: "氷水や冷たい飲み物をがぶ飲み ➔ 【熱証・実熱】" }
] as const;

export const TONGUE_OPTIONS = [
  { value: "unconfirmed", label: "舌診：未確認", hint: "舌色・舌苔が未確認" },
  { value: "pale_white", label: "淡白舌・白湿苔", hint: "舌色が白っぽく湿った白苔 ➔ 【虚寒・水湿】" },
  { value: "red_yellow", label: "舌紅・黄燥苔", hint: "地肌が赤く黄色く乾燥した苔 ➔ 【実熱・熱盛】" }
] as const;

// 学術基準・WHO標準リファレンス
export const ACADEMIC_STANDARDS = {
  title: "学術リファレンス ＆ 用語標準化方針",
  whoReference: "WHO International Standard Terminologies on Traditional Medicine in the Western Pacific Region (WHO-IST)",
  textbookReference: "関連学習資料：東洋療法学校協会編『東洋医学概論』『経絡経穴概論』（本文と公式問題を照合して学習）",
  classics: "『黄帝内経 素問・霊枢』『難経』『傷寒論』『金匱要略』",
  description: "伝統医学の用語と学習上の分類を参考にした教育モデルです。WHOの用語・経穴位置標準は、個々の証の診断精度や配穴の有効性を保証するものではありません。四診の所見、候補、反証、不足情報を区別して学びます。"
};

export interface PreviousSelection {
  depth: DepthType;
  temp: TemperatureType;
  state: StateType;
  qixueshui: QixueshuiType;
  zangfu: ZangfuType;
  complexState: ComplexStateType;
}

// 差分解説（⚡ 今回変わったこと）自動生成関数
export { generateDeltaInsight, synthesizeComprehensiveDiagnosis, assessFourExaminations } from './simulatorReasoning';
