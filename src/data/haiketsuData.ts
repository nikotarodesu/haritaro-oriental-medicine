import { TSUBOS } from "./tsuboData";

export type TreatmentTier = "root" | "branch"; // 本治（根本） vs 標治（対症・通絡）

export type EnergyDynamic = 
  | "ascending"    // 昇提（引き上げる・陽気を高める）
  | "descending"   // 降気（引き下ろす・気逆を鎮める）
  | "warming"      // 温陽（温める・冷えを散らす）
  | "cooling"      // 清熱・瀉火（冷ます・熱を抜く）
  | "harmonizing"  // 和解・疏通（巡らせる・自律神経調整）
  | "tonifying"    // 補気血（エネルギーや栄養を補う）
  | "draining";    // 利水・化痰（水分や老廃物を排出する）

export interface AcupointRoleMetadata {
  id: string;
  name: string;
  code: string;
  meridianShort: string;
  tier: TreatmentTier;
  tierLabel: "本治穴（根本）" | "標治穴（対症）";
  specificRole: string; // 例: "原穴（臓腑元気）", "合穴（気逆腑病）"
  energy: EnergyDynamic;
  energyLabel: string;
  system: string; // 肝胆、心、脾胃、肺、腎など
  clinicalRoleSummary: string;
}

export interface PrescriptionAlert {
  id: string;
  type: "conflict_energy" | "redundancy" | "overdose" | "imbalance";
  severity: "high" | "medium" | "info";
  title: string;
  description: string;
  involvedPointIds: string[];
}

export interface PruningProposal {
  prunedPointIds: string[];
  removedPointIds: string[];
  projectedScore: number;
  clinicalRationale: string;
  corePrinciple: string;
}

export interface PrescriptionAnalysis {
  purityScore: number; // 0〜100
  status: "optimal" | "acceptable" | "warning" | "danger";
  statusText: string;
  totalCount: number;
  rootCount: number;
  branchCount: number;
  rootRatio: number; // 0〜100%
  alerts: PrescriptionAlert[];
  pruningProposal: PruningProposal | null;
}

// 各ツボの臨床役割メタデータ定義（32穴全対応）
export const ACUPOINT_ROLES: Record<string, AcupointRoleMetadata> = {
  gokoku: {
    id: "gokoku",
    name: "合谷",
    code: "LI4",
    meridianShort: "大腸経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "原穴・四総穴（面目）・四関穴",
    energy: "harmonizing",
    energyLabel: "疏通・止痛",
    system: "large_intestine",
    clinicalRoleSummary: "頭部・顔面の気血を強烈に開通させ鎮痛。上肢の気の滞りを散らす。"
  },
  ashisanri: {
    id: "ashisanri",
    name: "足三里",
    code: "ST36",
    meridianShort: "胃経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "合土穴・胃下合穴・四総穴（腹）",
    energy: "tonifying",
    energyLabel: "健脾補気",
    system: "stomach",
    clinicalRoleSummary: "後天の気を補給し消化器を底上げ。全身の免疫・体力を根本回復。"
  },
  taishou: {
    id: "taishou",
    name: "太衝",
    code: "LR3",
    meridianShort: "肝経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "原穴・輸土穴・四関穴",
    energy: "descending",
    energyLabel: "疏肝降気",
    system: "liver",
    clinicalRoleSummary: "肝気の鬱結を解きほぐし、のぼせやイライラの上昇気流を鎮静・降気。"
  },
  sanyinkou: {
    id: "sanyinkou",
    name: "三陰交",
    code: "SP6",
    meridianShort: "脾経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "三陰交会穴（脾・肝・腎）",
    energy: "harmonizing",
    energyLabel: "養血調経",
    system: "spleen",
    clinicalRoleSummary: "下半身の3つの陰経を統括し、血虚・瘀血・ホルモンバランスを根本調整。"
  },
  neikan: {
    id: "neikan",
    name: "内関",
    code: "PC6",
    meridianShort: "心包経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "絡穴・八脈交会穴（陰維脈）",
    energy: "harmonizing",
    energyLabel: "寛胸安神",
    system: "pericardium",
    clinicalRoleSummary: "胸中の気鬱・嘔気・動悸を即座に緩解し、自律神経の過興奮を鎮痛鎮静。"
  },
  hyakue: {
    id: "hyakue",
    name: "百会",
    code: "GV20",
    meridianShort: "督脈",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "督脈要穴・諸陽の会",
    energy: "ascending",
    energyLabel: "昇陽提気",
    system: "vessel",
    clinicalRoleSummary: "全身の陽気を頭頂へ引き上げ、気虚の下陥（倦怠・胃下垂・抑鬱）を昇提。"
  },
  chuukan: {
    id: "chuukan",
    name: "中脘",
    code: "CV12",
    meridianShort: "任脈",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "胃の募穴・八会穴（腑会）",
    energy: "harmonizing",
    energyLabel: "和胃降逆",
    system: "stomach",
    clinicalRoleSummary: "全六腑の気会。胃内停水や食滞を和解させ、中焦の循環を立て直す。"
  },
  jinyu: {
    id: "jinyu",
    name: "腎兪",
    code: "BL23",
    meridianShort: "膀胱経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "腎の背部兪穴",
    energy: "tonifying",
    energyLabel: "補腎益精",
    system: "kidney",
    clinicalRoleSummary: "先天の精（生命エネルギー）を直接注ぎ込み、慢性腰痛や全身衰弱を改善。"
  },
  kyokuchi: {
    id: "kyokuchi",
    name: "曲池",
    code: "LI11",
    meridianShort: "大腸経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "合土穴",
    energy: "cooling",
    energyLabel: "清熱解毒",
    system: "large_intestine",
    clinicalRoleSummary: "大腸経の熱を強力に体外へ放散。皮膚炎症・高血圧・肩関節痛を鎮静。"
  },
  yuusen: {
    id: "yuusen",
    name: "湧泉",
    code: "KI1",
    meridianShort: "腎経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "井木穴",
    energy: "descending",
    energyLabel: "引火帰元",
    system: "kidney",
    clinicalRoleSummary: "足底から腎気を湧き出させ、頭部に上がった虚火（のぼせ）を足元へ引き下ろす。"
  },
  youryousen: {
    id: "youryousen",
    name: "陽陵泉",
    code: "GB34",
    meridianShort: "胆経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "合土穴・八会穴（筋会）・胆下合穴",
    energy: "harmonizing",
    energyLabel: "舒筋利胆",
    system: "gallbladder",
    clinicalRoleSummary: "全身の筋緊張・痙攣を解き放つ特効穴。太衝と連携して気滞の痛みを即効緩解。"
  },
  taihaku: {
    id: "taihaku",
    name: "太白",
    code: "SP3",
    meridianShort: "脾経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "原穴・輸土穴",
    energy: "tonifying",
    energyLabel: "健脾化湿",
    system: "spleen",
    clinicalRoleSummary: "脾経の原穴として消化吸収と水分運化の根幹を賦活。足三里と相乗効果を発揮。"
  },
  taikei: {
    id: "taikei",
    name: "太谿",
    code: "KI3",
    meridianShort: "腎経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "原穴・輸土穴",
    energy: "tonifying",
    energyLabel: "滋陰補腎",
    system: "kidney",
    clinicalRoleSummary: "腎水（体内冷却液・ホルモン基礎）を湧出させ、陰虚の乾きとほてりを根本沈静。"
  },
  shoukai: {
    id: "shoukai",
    name: "照海",
    code: "KI6",
    meridianShort: "腎経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "八脈交会穴（陰蹻脈）",
    energy: "cooling",
    energyLabel: "滋陰清熱",
    system: "kidney",
    clinicalRoleSummary: "咽喉を潤し陰蹻脈を通じて夜間の安眠と虚熱を調整。太谿とのペアで腎陰を完璧補給。"
  },
  houryuu: {
    id: "houryuu",
    name: "豊隆",
    code: "ST40",
    meridianShort: "胃経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "絡穴（化痰名穴）",
    energy: "descending",
    energyLabel: "和胃化痰",
    system: "stomach",
    clinicalRoleSummary: "体内に溜まった「痰湿（病的な老廃物・水毒）」を強力に溶かして下行させる。"
  },
  kakuyu: {
    id: "kakuyu",
    name: "膈兪",
    code: "BL17",
    meridianShort: "膀胱経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "八会穴（血会）",
    energy: "harmonizing",
    energyLabel: "活血化瘀",
    system: "vessel",
    clinicalRoleSummary: "全身の血行鬱滞（瘀血）を解除し新血を生み出す。内関とペアで心血瘀阻を解消。"
  },
  koukan: {
    id: "koukan",
    name: "行間",
    code: "LR2",
    meridianShort: "肝経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "滎火穴（清肝瀉火）",
    energy: "cooling",
    energyLabel: "清肝瀉火",
    system: "liver",
    clinicalRoleSummary: "肝火の上炎（激しい頭痛・目の充血・激怒）を「実すればその子を瀉す」で急速鎮火。"
  },
  rekketu: {
    id: "rekketu",
    name: "列缺",
    code: "LU7",
    meridianShort: "肺経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "絡穴・四総穴（頭項）・八脈交会穴",
    energy: "ascending",
    energyLabel: "宣肺解表",
    system: "lung",
    clinicalRoleSummary: "頭部・首すじの風邪・悪寒を体表から発散。肺気をめぐらせ咽頭痛と頭痛を止める。"
  },
  fuuchi: {
    id: "fuuchi",
    name: "風池",
    code: "GB20",
    meridianShort: "胆経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "交会穴（胆・三焦・陽維・陽蹻）",
    energy: "harmonizing",
    energyLabel: "祛風清頭",
    system: "gallbladder",
    clinicalRoleSummary: "後頭下筋群の過緊張を解除し脳循環を促進。列缺との併用で風寒表証を根治。"
  },
  kangen: {
    id: "kangen",
    name: "関元",
    code: "CV4",
    meridianShort: "任脈",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "小腸募穴・丹田",
    energy: "warming",
    energyLabel: "温陽培元",
    system: "vessel",
    clinicalRoleSummary: "生命の根源エネルギー「原気」を蓄積。命門とともに下焦の冷えと陽虚を温補。"
  },
  meimon: {
    id: "meimon",
    name: "命門",
    code: "GV4",
    meridianShort: "督脈",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "督脈要穴・命門火",
    energy: "warming",
    energyLabel: "補腎回陽",
    system: "vessel",
    clinicalRoleSummary: "全身の熱代謝・基礎体温のマスターキー。関元との併用で極度の陽虚を蘇生。"
  },
  tensu: {
    id: "tensu",
    name: "天枢",
    code: "ST25",
    meridianShort: "胃経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "大腸募穴",
    energy: "harmonizing",
    energyLabel: "理気通便",
    system: "large_intestine",
    clinicalRoleSummary: "腸管蠕動と腹部膨満を調整。便秘・下痢の自律神経症状を局所から解除。"
  },
  shinmon: {
    id: "shinmon",
    name: "神門",
    code: "HT7",
    meridianShort: "心経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "原穴・輸土穴",
    energy: "cooling",
    energyLabel: "清心安神",
    system: "heart",
    clinicalRoleSummary: "大脳辺縁系の過興奮を鎮め、不安や重度不眠を副交感神経優位へと誘導。"
  },
  inryousen: {
    id: "inryousen",
    name: "陰陵泉",
    code: "SP9",
    meridianShort: "脾経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "合水穴",
    energy: "draining",
    energyLabel: "健脾利水",
    system: "spleen",
    clinicalRoleSummary: "下半身のむくみ・水毒を利尿によって強力排泄。水滞・重だるさの特効穴。"
  },
  koukei: {
    id: "koukei",
    name: "後谿",
    code: "SI3",
    meridianShort: "小腸経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "輸木穴・八脈交会穴（督脈）",
    energy: "harmonizing",
    energyLabel: "通督舒筋",
    system: "small_intestine",
    clinicalRoleSummary: "督脈を通じて背骨沿いの急性筋スパズム・ギックリ腰・寝違えを遠隔緩解。"
  },
  ichuu: {
    id: "ichuu",
    name: "委中",
    code: "BL40",
    meridianShort: "膀胱経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "合土穴・四総穴（腰背）",
    energy: "descending",
    energyLabel: "通絡止痛",
    system: "bladder",
    clinicalRoleSummary: "腰背部の血行うっ滞・急性疼痛を膝裏から解放する腰背痛の王様穴。"
  },
  shakutaku: {
    id: "shakutaku",
    name: "尺沢",
    code: "LU5",
    meridianShort: "肺経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "合水穴",
    energy: "cooling",
    energyLabel: "清肺降逆",
    system: "lung",
    clinicalRoleSummary: "気管支や肺熱の激しい咳・炎症を「実すればその子を瀉す」で急速に冷却沈静。"
  },
  fukuryuu: {
    id: "fukuryuu",
    name: "復溜",
    code: "KI7",
    meridianShort: "腎経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "経金穴（母穴）",
    energy: "tonifying",
    energyLabel: "補腎滋陰",
    system: "kidney",
    clinicalRoleSummary: "腎水を力強く生み出し、異常発汗や寝汗を止め、津液を全身に巡らせる。"
  },
  tesanri: {
    id: "tesanri",
    name: "手三里",
    code: "LI10",
    meridianShort: "大腸経",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "陽明経要穴",
    energy: "harmonizing",
    energyLabel: "通絡消腫",
    system: "large_intestine",
    clinicalRoleSummary: "上肢筋膜の硬結を局所から緩める。合谷や曲池と多穴で選ばれやすい過密代表穴。"
  },
  danchuu: {
    id: "danchuu",
    name: "膻中",
    code: "CV17",
    meridianShort: "任脈",
    tier: "branch",
    tierLabel: "標治穴（対症）",
    specificRole: "気会・心包募穴",
    energy: "harmonizing",
    energyLabel: "理気寛胸",
    system: "pericardium",
    clinicalRoleSummary: "胸中に鬱滞した情動（ストレス・悲哀）を散じ、横隔膜緊張を解放。"
  },
  kanyu: {
    id: "kanyu",
    name: "肝兪",
    code: "BL18",
    meridianShort: "膀胱経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "肝の背部兪穴",
    energy: "harmonizing",
    energyLabel: "平肝熄風",
    system: "liver",
    clinicalRoleSummary: "肝の慢性的機能失調を背部から調整。太衝と兪募・前後配穴を形成。"
  },
  hiyu: {
    id: "hiyu",
    name: "脾兪",
    code: "BL20",
    meridianShort: "膀胱経",
    tier: "root",
    tierLabel: "本治穴（根本）",
    specificRole: "脾の背部兪穴",
    energy: "tonifying",
    energyLabel: "健脾和胃",
    system: "spleen",
    clinicalRoleSummary: "消化吸収力の衰退を背部から底上げ。足三里と前後併用で後天の気を増幅。"
  }
};

// 典型的な「選びすぎ（過密・相殺）」プリセット例
export interface OverdosePreset {
  id: string;
  name: string;
  symptomSummary: string;
  initialPointIds: string[];
  mistakePattern: string;
}

export const OVERDOSE_PRESETS: OverdosePreset[] = [
  {
    id: "headache_excess",
    name: "頭痛・首肩こりで7穴選んでしまった例",
    symptomSummary: "こめかみ頭痛・肩甲骨こり・イライラ",
    initialPointIds: ["gokoku", "taishou", "fuuchi", "kyokuchi", "hyakue", "rekketu", "tesanri"],
    mistakePattern: "上肢要穴（合谷・曲池・手三里）の重複と、百会（昇提）と太衝（降気）のベクトル衝突。"
  },
  {
    id: "digestive_excess",
    name: "胃もたれ・慢性疲労で6穴選んでしまった例",
    symptomSummary: "食後もたれ・軟便・無気力",
    initialPointIds: ["ashisanri", "chuukan", "taihaku", "tensu", "houryuu", "hiyu"],
    mistakePattern: "胃経・脾経への介入が5穴重複。中焦へのシグナルが過密になり、気の運化が停滞。"
  },
  {
    id: "autonomic_excess",
    name: "自律神経失調・不眠で7穴選んでしまった例",
    symptomSummary: "動悸・胸苦しさ・不眠・のぼせ",
    initialPointIds: ["neikan", "taishou", "shinmon", "sanyinkou", "hyakue", "koukan", "shoukai"],
    mistakePattern: "安神穴（内関・神門）の重複と、百会（昇）と行間（瀉火下降）の激しい気機混乱。"
  },
  {
    id: "lumbago_excess",
    name: "急性腰痛・坐骨神経痛で6穴選んでしまった例",
    symptomSummary: "前屈制限・臀部から下肢への放散痛",
    initialPointIds: ["ichuu", "jinyu", "youryousen", "meimon", "koukei", "kangen"],
    mistakePattern: "腰部・下肢・背部の穴を散発的に選びすぎ、急性期の鎮痛シグナルが散乱。"
  }
];

// 配穴分析エンジン
export function analyzePrescription(selectedIds: string[]): PrescriptionAnalysis {
  const count = selectedIds.length;
  if (count === 0) {
    return {
      purityScore: 100,
      status: "optimal",
      statusText: "ツボ未選択",
      totalCount: 0,
      rootCount: 0,
      branchCount: 0,
      rootRatio: 0,
      alerts: [],
      pruningProposal: null
    };
  }

  const selectedRoles = selectedIds
    .map(id => ACUPOINT_ROLES[id])
    .filter(Boolean);

  const rootRoles = selectedRoles.filter(r => r.tier === "root");
  const branchRoles = selectedRoles.filter(r => r.tier === "branch");
  const rootCount = rootRoles.length;
  const branchCount = branchRoles.length;
  const rootRatio = Math.round((rootCount / count) * 100);

  const alerts: PrescriptionAlert[] = [];
  let scoreDeduction = 0;

  // 1. 穴数判定
  if (count >= 6) {
    const penalty = (count - 5) * 15;
    scoreDeduction += penalty;
    alerts.push({
      id: "overdose-severe",
      type: "overdose",
      severity: "high",
      title: `穴数過多による相殺警報（現在${count}穴）`,
      description: "ツボが多すぎるため生体へのシグナルが干渉し、生体の自己治癒反応が散乱しています。「刺せば刺すほど効く」は錯覚であり、相殺効果により全体の切れ味が著しく低下しています。",
      involvedPointIds: selectedIds
    });
  } else if (count === 5) {
    scoreDeduction += 15;
    alerts.push({
      id: "overdose-moderate",
      type: "overdose",
      severity: "medium",
      title: "配穴がやや過密（5穴）",
      description: "許容範囲内ですが、1〜2穴削ぎ落として本治1＋標治2などの最小構成に絞り込むことで、刺激のフォーカスが格段に鋭くなります。",
      involvedPointIds: selectedIds
    });
  }

  // 2. 昇降相殺（ベクトル衝突）
  const hasAscending = selectedRoles.some(r => r.energy === "ascending");
  const hasDescending = selectedRoles.some(r => r.energy === "descending");
  const ascendingPoints = selectedRoles.filter(r => r.energy === "ascending").map(r => r.name);
  const descendingPoints = selectedRoles.filter(r => r.energy === "descending").map(r => r.name);

  if (hasAscending && hasDescending && count >= 4) {
    scoreDeduction += 20;
    alerts.push({
      id: "conflict-ascending-descending",
      type: "conflict_energy",
      severity: "high",
      title: "昇降ベクトルの衝突（相殺効果発生）",
      description: `気を頭頂へ引き上げる昇提穴（${ascendingPoints.join("・")}）と、気を足元へ引き下ろす降気穴（${descendingPoints.join("・")}）が拮抗しています。気機の方向性が定まらず、効果が相殺されます。病態が「気虚下陥」か「気逆上衝」かいずれか一方に主軸を定めて剪定すべきです。`,
      involvedPointIds: selectedRoles.filter(r => r.energy === "ascending" || r.energy === "descending").map(r => r.id)
    });
  }

  // 3. 補瀉拮抗（温補と激しい瀉火の衝突）
  const hasWarming = selectedRoles.some(r => r.energy === "warming");
  const hasCooling = selectedRoles.some(r => r.energy === "cooling");
  if (hasWarming && hasCooling && count >= 4) {
    scoreDeduction += 20;
    const warmPoints = selectedRoles.filter(r => r.energy === "warming").map(r => r.name);
    const coolPoints = selectedRoles.filter(r => r.energy === "cooling").map(r => r.name);
    alerts.push({
      id: "conflict-warm-cool",
      type: "conflict_energy",
      severity: "high",
      title: "温補と清熱瀉火の干渉（シグナルの矛盾）",
      description: `深部を温熱補益する穴（${warmPoints.join("・")}）と、熱邪を冷ます瀉火穴（${coolPoints.join("・")}）が同時に選ばれています。生体への刺激指令が正反対となり、自律神経反射が干渉します。`,
      involvedPointIds: selectedRoles.filter(r => r.energy === "warming" || r.energy === "cooling").map(r => r.id)
    });
  }

  // 4. 同一臓腑・同一経絡への過密介入（重複）
  const systemCounts: Record<string, string[]> = {};
  selectedRoles.forEach(r => {
    if (!systemCounts[r.system]) systemCounts[r.system] = [];
    systemCounts[r.system].push(r.name);
  });

  Object.entries(systemCounts).forEach(([system, names]) => {
    if (names.length >= 3) {
      scoreDeduction += 15;
      const systemNameMap: Record<string, string> = {
        stomach: "胃・消化器系",
        spleen: "脾系",
        liver: "肝胆系",
        large_intestine: "大腸・上肢陽明経",
        kidney: "腎系",
        heart: "心・心包系",
        lung: "肺系",
        bladder: "膀胱経",
        vessel: "奇経（任督脈）"
      };
      alerts.push({
        id: `redundancy-${system}`,
        type: "redundancy",
        severity: "medium",
        title: `${systemNameMap[system] || system}への重複刺激（${names.join("・")}）`,
        description: `同一系統に対して${names.length}穴が密集しています。同効穴をいくつも重ねるより、原穴または合穴の1穴に絞り込む方が、気の感受性が高まり刺激の純度が保たれます。`,
        involvedPointIds: selectedRoles.filter(r => r.system === system).map(r => r.id)
      });
    }
  });

  // 5. 本治・標治のバランス
  if (count >= 3 && rootCount === 0) {
    scoreDeduction += 15;
    alerts.push({
      id: "imbalance-no-root",
      type: "imbalance",
      severity: "medium",
      title: "本治穴（根本調整）の欠如",
      description: "選択されたツボがすべて標治穴（対症療法）に偏っています。局所症状を鎮めるだけでなく、五臓の原穴や合穴など【本治穴】を1穴加えることで再発を防ぐ持続的な効果が生まれます。",
      involvedPointIds: []
    });
  } else if (count >= 5 && branchCount === 0) {
    scoreDeduction += 10;
    alerts.push({
      id: "imbalance-no-branch",
      type: "imbalance",
      severity: "info",
      title: "本治穴の過多（即効性の不足）",
      description: "本治穴ばかりが5穴以上重複しています。根本調整は1〜2穴に厳選し、主訴に対する標治穴（阿是穴や四総穴）を適正に配置してください。",
      involvedPointIds: []
    });
  }

  // 純度スコア計算
  const calculatedScore = Math.max(15, Math.min(100, 100 - scoreDeduction));

  let status: "optimal" | "acceptable" | "warning" | "danger" = "optimal";
  let statusText = "秀逸な最小構成（至適シグナル）";

  if (calculatedScore < 50) {
    status = "danger";
    statusText = "相殺警報：刺激の散乱・過密";
  } else if (calculatedScore < 75) {
    status = "warning";
    statusText = "注意：重複または干渉リスクあり";
  } else if (calculatedScore < 90) {
    status = "acceptable";
    statusText = "許容範囲（剪定の余地あり）";
  }

  // 削ぎ落とし提案の生成
  const pruningProposal = generatePruningProposal(selectedIds, calculatedScore);

  return {
    purityScore: calculatedScore,
    status,
    statusText,
    totalCount: count,
    rootCount,
    branchCount,
    rootRatio,
    alerts,
    pruningProposal
  };
}

// 削ぎ落とし提案（最小構成ペア/トリオへの最適化ロジック）
function generatePruningProposal(selectedIds: string[], currentScore: number): PruningProposal | null {
  if (selectedIds.length <= 3 && currentScore >= 90) {
    return null; // 既に最小構成
  }

  const selectedSet = new Set(selectedIds);

  // パターン1: 頭痛・頸肩こり・自律神経系過多
  if (selectedSet.has("gokoku") && selectedSet.has("taishou")) {
    const pruned = ["gokoku", "taishou"]; // 開四関（合谷＋太衝）
    return {
      prunedPointIds: pruned,
      removedPointIds: selectedIds.filter(id => !pruned.includes(id)),
      projectedScore: 98,
      corePrinciple: "気機開通の極致『開四関（合谷＋太衝）』",
      clinicalRationale: "上肢の合谷（気血開通・顔面頭部痛）と下肢の太衝（肝気疏通・下降）の2穴のみに剪定。全身の気滞を一撃で通じさせ、余計なツボによる気の散乱をゼロにします。"
    };
  }

  // パターン2: 胃腸・消化器・疲労系過多
  if (selectedSet.has("ashisanri") && (selectedSet.has("taihaku") || selectedSet.has("chuukan"))) {
    const pruned = selectedSet.has("taihaku") ? ["ashisanri", "taihaku"] : ["ashisanri", "chuukan"];
    return {
      prunedPointIds: pruned,
      removedPointIds: selectedIds.filter(id => !pruned.includes(id)),
      projectedScore: 96,
      corePrinciple: "健脾和胃の黄金ペア（足三里＋太白/中脘）",
      clinicalRationale: "胃の合土穴（足三里）と脾の原穴（太白）による『原合配穴』に絞り込み。重複していた天枢や豊隆を削ぎ落とすことで、脾胃の運化（消化吸収）に刺激が一点集中します。"
    };
  }

  // パターン3: 肝気鬱結・筋緊張系
  if (selectedSet.has("taishou") && selectedSet.has("youryousen")) {
    const pruned = ["taishou", "youryousen"];
    return {
      prunedPointIds: pruned,
      removedPointIds: selectedIds.filter(id => !pruned.includes(id)),
      projectedScore: 100,
      corePrinciple: "疏肝舒筋の最小ペア（太衝＋陽陵泉）",
      clinicalRationale: "肝原穴（太衝）で気の鬱結を解き、筋会（陽陵泉）で筋膜の過緊張を解除。他の頭部穴や局所穴を外すことで自律神経の過興奮を最も速やかに鎮めます。"
    };
  }

  // パターン4: 腎陰虚・のぼせ不眠系
  if (selectedSet.has("taikei") && (selectedSet.has("shoukai") || selectedSet.has("shinmon"))) {
    const pruned = selectedSet.has("shoukai") ? ["taikei", "shoukai"] : ["taikei", "shinmon"];
    return {
      prunedPointIds: pruned,
      removedPointIds: selectedIds.filter(id => !pruned.includes(id)),
      projectedScore: 98,
      corePrinciple: "滋陰降火の真髄（太谿＋照海/神門）",
      clinicalRationale: "腎原穴（太谿）と陰蹻脈（照海）のペアに純化。虚熱と不眠の根源である腎水の枯渇を一点突破で補給し、昇降の衝突を完全に防ぎます。"
    };
  }

  // パターン5: 腰痛・坐骨神経痛系
  if (selectedSet.has("ichuu") && (selectedSet.has("jinyu") || selectedSet.has("youryousen"))) {
    const pruned = selectedSet.has("youryousen") ? ["ichuu", "youryousen"] : ["ichuu", "jinyu"];
    return {
      prunedPointIds: pruned,
      removedPointIds: selectedIds.filter(id => !pruned.includes(id)),
      projectedScore: 96,
      corePrinciple: "腰背痛の特効標本配穴（委中＋陽陵泉/腎兪）",
      clinicalRationale: "四総穴（委中）による遠隔通絡と、筋会（陽陵泉）による脊柱起立筋の緊張緩和に集約。散らばっていた腰部の多刺を省き、即効性を最大化します。"
    };
  }

  // 一般汎用剪定ロジック（本治の最重要1穴 ＋ 標治の最重要1穴の計2〜3穴を抽出）
  const roles = selectedIds.map(id => ACUPOINT_ROLES[id]).filter(Boolean);
  const rootPoint = roles.find(r => r.tier === "root");
  const branchPoint = roles.find(r => r.tier === "branch");

  const fallbackPruned: string[] = [];
  if (rootPoint) fallbackPruned.push(rootPoint.id);
  if (branchPoint && branchPoint.id !== rootPoint?.id) fallbackPruned.push(branchPoint.id);

  if (fallbackPruned.length === 0 && selectedIds.length > 0) {
    fallbackPruned.push(selectedIds[0]);
    if (selectedIds[1]) fallbackPruned.push(selectedIds[1]);
  }

  return {
    prunedPointIds: fallbackPruned,
    removedPointIds: selectedIds.filter(id => !fallbackPruned.includes(id)),
    projectedScore: 95,
    corePrinciple: "本治1穴 ＋ 標治1穴の黄金最小構成",
    clinicalRationale: "根本を整える【本治穴】と、痛みを止める【標治穴】の各1穴に厳選。余剰なツボを削ぎ落とすことで、生体が受け取る刺激シグナルが純化され、相殺が解消されます。"
  };
}
