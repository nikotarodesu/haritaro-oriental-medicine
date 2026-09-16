export type DepthType = "exterior" | "interior"; // 表 / 裏
export type TemperatureType = "cold" | "heat"; // 寒 / 熱
export type StateType = "deficiency" | "excess"; // 虚 / 実

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

export type DiagnosisStatus = "confirmed" | "conflict" | "suspected";

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
    name: "肝気鬱結証",
    label: "自律神経過緊張・PMS（裏・熱・実）",
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
  { value: "exterior", label: "表（ひょう）", sub: "体表・浅部・急性", description: "病邪が皮膚・筋肉・経絡などの浅い層に侵襲している初期・急性状態。" },
  { value: "interior", label: "裏（り）", sub: "内臓・深部・慢性", description: "病邪が体内深部（臓腑）にあり、機能低下や内因性の不調が生じている状態。" }
];

export const TEMP_OPTIONS: { value: TemperatureType; label: string; sub: string; description: string }[] = [
  { value: "cold", label: "寒（かん）", sub: "代謝低下・冷え・停滞", description: "手足の冷え、血流低下、水様性の分泌物、縮こまるような痛みなどの沈静状態。" },
  { value: "heat", label: "熱（ねつ）", sub: "機能亢進・炎症・赤み", description: "体温上昇、局所の充血、のぼせ、口の渇き、焦燥感などの亢進状態。" }
];

export const STATE_OPTIONS: { value: StateType; label: string; sub: string; description: string }[] = [
  { value: "deficiency", label: "虚（きょ）", sub: "生命力不足・機能衰弱", description: "正気（生命力・免疫・気血）が衰え、エネルギーや栄養が不足した状態。" },
  { value: "excess", label: "実（じつ）", sub: "病邪の鬱滞・過剰・張り", description: "病邪が強く勢いがある、または気血水の滞り・緊張が過剰な状態。" }
];

export const QIXUESHUI_OPTIONS: { value: QixueshuiType; label: string; sub: string; dynamicNature: string }[] = [
  { value: "qizhi", label: "気滞（きたい）", sub: "気の鬱滞・巡り不全", dynamicNature: "エネルギーの運行が滞り、張りとイライラが生じる" },
  { value: "qixu", label: "気虚（ききょ）", sub: "気エネルギーの枯渇", dynamicNature: "推進力と温煦力が衰え、無力感・息切れが生じる" },
  { value: "qini", label: "気逆（きぎゃく）", sub: "気の異常上昇・突き上げ", dynamicNature: "下降すべき気が逆流し、のぼせ・咳・吐き気が生じる" },
  { value: "xuexu", label: "血虚（けっきょ）", sub: "血液・滋養物質の不足", dynamicNature: "組織や脳への滋養が不足し、乾燥・めまい・不眠が生じる" },
  { value: "yuxue", label: "瘀血（おけつ）", sub: "血行の病理的鬱滞", dynamicNature: "微小循環が障害され、局所の固定刺痛や暗紫色変化が生じる" },
  { value: "yinxu", label: "陰虚（いんきょ）", sub: "体内冷却水の不足・乾燥", dynamicNature: "体液が干上がり、相対的に熱が浮き上がってほてりが生じる" },
  { value: "yangxu", label: "陽虚（ようきょ）", sub: "体内温熱エネルギーの衰退", dynamicNature: "生命の火が弱まり、内臓から四肢末梢まで芯から冷え切る" },
  { value: "shuitai", label: "水滞・痰湿（すいたい）", sub: "体液代謝産物の停滞", dynamicNature: "水分の排泄運化が阻害され、重だるさ・むくみ・眩暈が生じる" }
];

export const ZANGFU_OPTIONS: { value: ZangfuType; label: string; sub: string; organRole: string }[] = [
  { value: "liver", label: "肝・胆（かん・たん）", sub: "自律神経・気機・筋", organRole: "全身の気のめぐり（疏泄）と情動、筋腱の緊張を主導" },
  { value: "heart", label: "心・小腸（しん・しょうちょう）", sub: "心血・精神意識", organRole: "脈管循環の駆動と大脳皮質の精神・意識活動（神明）を統括" },
  { value: "spleen", label: "脾・胃（ひ・い）", sub: "消化吸収・後天の気", organRole: "飲食物から気血津液を生み出し全身へ運化するエネルギー工場" },
  { value: "lung", label: "肺・大腸（はい・だいちょう）", sub: "呼吸・皮膚バリア・粛降", organRole: "清気の吸入、水分を全身・膀胱へ散布下降させ体表を守る" },
  { value: "kidney", label: "腎・膀胱（じん・ぼうこう）", sub: "先天の精・骨・水分代謝", organRole: "生命力の根本（精・原気）を蓄え、下行性の水分排泄と骨髄を司る" }
];

// 診断推論エンジン
export function synthesizeComprehensiveDiagnosis(
  depth: DepthType,
  temp: TemperatureType,
  state: StateType,
  qixueshui: QixueshuiType,
  zangfu: ZangfuType
): ComprehensiveDiagnosis {
  const depthLabel = depth === "interior" ? "裏" : "表";
  const tempLabel = temp === "heat" ? "熱" : "寒";
  const stateLabel = state === "excess" ? "実" : "虚";

  const qData = QIXUESHUI_OPTIONS.find((q) => q.value === qixueshui) || QIXUESHUI_OPTIONS[0];
  const zData = ZANGFU_OPTIONS.find((z) => z.value === zangfu) || ZANGFU_OPTIONS[0];
  const zangShort = zData.label.split("（")[0];
  const qShort = qData.label.split("（")[0];

  // -------------------------------------------------------------------------
  // 1. 【判断保留（CONFLICT）の判定】：病理学的に真っ向から矛盾する組み合わせ
  // -------------------------------------------------------------------------

  // 矛盾パターンA: 陰虚 × 寒
  if (qixueshui === "yinxu" && temp === "cold") {
    return {
      status: "conflict",
      statusBadge: {
        label: "【判断保留】寒熱所見の矛盾を検出",
        description: "「陰虚（津液不足による虚熱）」に対して「寒（代謝低下・冷え）」が同時に選択されています。",
        variant: "danger"
      },
      syndromeName: "判断保留（陰虚と寒象の不整合）",
      syndromeReading: "はんだんほりゅう：いんきょとかんしょうのふせいごう",
      oneSentenceFormula: `「${qData.label}」は体液不足による虚熱が本態ですが、「${tempLabel}」が選択されており、病理機序に真っ向から矛盾が生じています。`,
      summary: "東洋医学において「陰虚」とは、体内の冷却水（津液・精血）が消耗した結果、抑えの効かなくなった熱（虚熱・五心煩熱・盗汗）が現れる病態です。一方、現在選択されている「寒」は機能沈静や冷えを示します。この両者が同時に存在することは通常の単一証ではあり得ず、所見の取り違えか、特殊な複合病態が疑われます。",
      pathologyMechanism: "陰液枯渇による相対的交感神経過緊張・熱感と、末梢血管収縮による局所冷感が混在しているか、「手足は冷えるが内側はのぼせる（上熱下寒）」などの偏在所見を『寒』として一括評価した可能性があります。",
      differentialCandidates: [
        "陽虚証（真の冷え・代謝低下であれば陽気の不足が疑われる）",
        "上熱下寒証（自律神経の失調により上半身に熱、下半身に冷えが偏在する病態）",
        "真熱仮寒証（内熱が極まり、四肢末梢の血流がブロックされて手足だけ冷たく感じる重篤病態）"
      ],
      supportingFindings: [
        `臓腑病位として【${zData.label}】が選択されていること`,
        `状態として【${stateLabel}（正気不足）】が一致していること`
      ],
      conflictingFindings: [
        "【最大の矛盾】陰虚は本質的に『熱（虚熱）』を伴う病態であり、『寒』の選択と直接対立します。",
        "もし患者が『冷え』を激しく訴えている場合、陰虚ではなく陽虚、または気滞による血行不良の可能性が高いです。"
      ],
      missingInformation: [
        "口の渇きの有無（冷たい水を好むか、温かい飲み物を欲するか）",
        "舌質の色（紅いか、淡白か）および舌苔の厚さ",
        "脈の拍動数（1分間に75回以上の『数脈』か、60回以下の『遅脈』か）"
      ],
      nextActionQuestions: [
        {
          question: "「喉が渇いて冷たい水をごくごく飲みたくなりますか？ それとも温かいものを好みますか？」",
          target: "問診",
          reason: "真の寒熱を鑑別するため。冷飲を好めば熱証（陰虚火旺）、温飲を好めば寒証（陽虚）と判断できます。"
        },
        {
          question: "「舌を出していただき、舌の地肌（舌質）の赤みを確認する」",
          target: "舌象",
          reason: "舌質が紅く苔が少なければ『陰虚（熱）』、白っぽく湿っていれば『陽虚（寒）』と即座に判別できます。"
        },
        {
          question: "「脈の深さと速さを確認する」",
          target: "脈象",
          reason: "細く速い脈（細数脈）なら陰虚、深く沈んで遅い脈（沈遅脈）なら陽虚の確定証拠となります。"
        }
      ],
      treatmentPrinciple: {
        rule: "診断再評価・寒熱の真偽鑑別を優先",
        strategy: "安易な投薬・刺鍼を避け、四診合参により真の寒熱を特定した上で介入する。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "真熱鑑別ペア：太谿 ＋ 照海",
          primaryAcupoint: { id: "taikei", name: "太谿", meridian: "足少陰腎経", role: "原穴：腎経の真陰を補い、虚熱を鎮静" },
          secondaryAcupoint: { id: "shoukai", name: "照海", meridian: "足少陰腎経", role: "八脈交会穴：陰蹻脈に通じ喉・胸の潤いを回復" },
          intendedEffect: "真の陰虚であった場合に、腎陰を滋養して虚火を速やかに下降させる",
          indicationConditions: "舌質が紅く苔が薄い、夜間にのぼせや口渇が悪化する場合",
          differentialReason: "温熱穴を使わず、滋陰清熱に特化することで熱の悪化を防ぐ",
          reassessmentPoint: "口の渇きや足裏のほてり感が和らぐかどうか",
          evidenceLevel: {
            classical: "『難経』六十八難：原穴は陰陽の根本を調える。『十四経发挥』照海は陰蹻脈の主気。",
            modernResearch: "太谿への刺鍼が視床下部-下垂体-副腎軸（HPA系）の過活動を抑制し自律神経バランスを改善することが報告されている。",
            clinicalPerspective: "もし陽虚であった場合に太谿・照海を刺しても悪化リスクは極めて低く、鑑別初期に安全に用いることができる。"
          }
        },
        {
          isPrimary: false,
          pairName: "真寒鑑別ペア：関元 ＋ 命門",
          primaryAcupoint: { id: "kangen", name: "関元", meridian: "任脈", role: "小腸募穴・丹田：下焦の陽気を温め冷えを救逆" },
          secondaryAcupoint: { id: "meimon", name: "命門", meridian: "督脈", role: "陽気の根源：背部から深部ボイラーを再加熱" },
          intendedEffect: "真の陽虚であった場合に、温灸によって芯からの冷えと倦怠感を回復させる",
          indicationConditions: "手足だけでなく腰や腹が芯から冷え、温めると楽になる場合",
          differentialReason: "滋陰穴とは正反対に、純粋な温陽補気（灸法中心）で生命エネルギーを底上げする",
          reassessmentPoint: "下腹部の温かさと自覚的な倦怠感・頻尿の改善",
          evidenceLevel: {
            classical: "『千金要方』関元・命門は百病の虚損を主り、陽気を回生させる最要穴。",
            modernResearch: "下腹部・腰部への温灸刺激が局所血流量および深部体温を上昇させ、副交感神経機能を促通する。",
            clinicalPerspective: "もし陰虚（隠れ熱）であった場合、灸頭鍼や多壮灸を行うとのぼせや不眠を激化させるため、施灸は弱刺激から慎重に行う。"
          }
        }
      ]
    };
  }

  // 矛盾パターンB: 陽虚 × 熱
  if (qixueshui === "yangxu" && temp === "heat") {
    return {
      status: "conflict",
      statusBadge: {
        label: "【判断保留】寒熱所見の矛盾を検出",
        description: "「陽虚（陽気衰微による虚寒）」に対して「熱（機能亢進・炎症）」が同時に選択されています。",
        variant: "danger"
      },
      syndromeName: "判断保留（陽虚と熱象の不整合）",
      syndromeReading: "はんだんほりゅう：ようきょとねつしょうのふせいごう",
      oneSentenceFormula: `「${qData.label}」は体内温熱エネルギーの枯渇（虚寒）が本態ですが、「${tempLabel}」が選択されており、病態論上の矛盾が生じています。`,
      summary: "陽虚とは生命のボイラーの火が弱まり、全身が芯から冷え切る病態（虚寒）です。そこに『熱』が加わることは通常の単一病態としては成立しません。顔面の赤みやのぼせがあっても、下半身が氷のように冷えている場合は『陰盛格陽（真寒仮熱）』という極期の虚寒病態である可能性を疑う必要があります。",
      pathologyMechanism: "体内の極度の寒邪（陰盛）が、わずかに残った陽気を体表や上部に押し出している（格陽）か、陰虚火旺を誤認している疑いがあります。",
      differentialCandidates: [
        "陰盛格陽証（真寒仮熱：真の病態は重度陽虚だが、顔面だけ紅潮する病態）",
        "陰虚火旺証（真の熱所見であり、津液不足から生じた虚熱）"
      ],
      supportingFindings: [
        `臓腑病位として【${zData.label}】が選択されていること`,
        `状態として【${stateLabel}（虚損）】が一致していること`
      ],
      conflictingFindings: [
        "【最大の矛盾】陽虚は本質的に『寒』を招く病態であり、『熱』の選択と直接対立します。"
      ],
      missingInformation: [
        "足元・腰の冷えと、顔ののぼせの同時存在の有無",
        "口渇の有無（口が渇くのに温かいお茶を少しずつしか飲めない場合は真寒仮熱）",
        "脈の沈微（沈んで今にも消えそうな脈か、力強く速い脈か）"
      ],
      nextActionQuestions: [
        {
          question: "「顔はのぼせて赤くても、膝から下や足先は冷たくありませんか？」",
          target: "問診",
          reason: "上下の寒熱乖離（上熱下寒・真寒仮熱）を確認するため。"
        },
        {
          question: "「下腹部（丹田）を触診して、冷えや力のないフニャフニャ感（腹皮拘急・小腹不仁）があるか確認する」",
          target: "腹証・触診",
          reason: "腎陽の衰弱を直接裏付けるため。"
        }
      ],
      treatmentPrinciple: {
        rule: "真寒仮熱の鑑別と回陽救逆・引火帰元",
        strategy: "熱を冷ます処置（清熱）を行うと陽気が全滅して急変する危険があるため、真偽を見極める。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "引火帰元ペア：太谿 ＋ 湧泉",
          primaryAcupoint: { id: "taikei", name: "太谿", meridian: "足少陰腎経", role: "原穴：腎気を調え上気した熱を下へ誘導" },
          secondaryAcupoint: { id: "yuusen", name: "湧泉", meridian: "足少陰腎経", role: "井穴：足底から浮遊した熱気をグラウンディング" },
          intendedEffect: "頭部に浮遊した熱を下半身の足元へ引き下ろし（引火帰元）、寒熱の乖離を是正する",
          indicationConditions: "顔面がのぼせ赤いが、足先が冷え切っている場合",
          differentialReason: "強刺激の清熱や温補を行わず、気の昇降ベクトルを整える安全設計",
          reassessmentPoint: "顔のほてり感が引き、足元に温かさが戻るか",
          evidenceLevel: {
            classical: "『針灸大成』湧泉・太谿は頭痛・目眩・虚火上炎を引火帰源させる特効穴。",
            modernResearch: "足底刺激が交感神経の過剰興奮を鎮静化させ、圧受容器反射を介して頭蓋内血流を安定化させる。",
            clinicalPerspective: "強い瀉法は避け、温灸または細鍼による軽微刺激で経気を誘導するのが鉄則。"
          }
        }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 2. 【虚実挟雑（SUSPECTED）の判定】：気滞や気逆と「虚」の組み合わせ
  // -------------------------------------------------------------------------
  if (state === "deficiency" && (qixueshui === "qizhi" || qixueshui === "qini" || qixueshui === "yuxue")) {
    const conditionName = qixueshui === "qizhi" ? "気虚気滞（肝鬱脾虚）" : qixueshui === "qini" ? "下虚上実（気逆虚証）" : "気虚血瘀";

    return {
      status: "suspected",
      statusBadge: {
        label: "【注意】虚実挟雑（本虚標実）の疑い",
        description: `実邪の徴候である「${qShort}」と「虚（機能低下）」が同時に選択されています。`,
        variant: "warning"
      },
      syndromeName: `${zangShort}${conditionName}証`,
      syndromeReading: `${zangShort}・${conditionName}の複合病態`,
      oneSentenceFormula: `「${depthLabel}・${stateLabel}・${tempLabel}」の体力虚弱（本虚）を土台として、気の推進力不全から二次的に「${qData.label}（標実）」が併発した虚実挟雑病態。`,
      summary: `「${qData.label}」は本来、気血の鬱滞という「実（有余・邪気）」の現象です。しかし今回「虚」が選択されているため、純粋な実証ではなく、「正気（気エネルギー）が不足しているために気血をスムーズに推動できず、結果として渋滞（滞り）が生じた」という【本虚標実（ほんきょひょうじつ）】の病態と推論されます。`,
      pathologyMechanism: "消化器（脾胃）や自律神経（肝胆）のエネルギー産生（ATP）低下により、組織・血管の自発的蠕動運動が弱まり、局所の筋膜拘縮や気滞が二次発生しています。",
      differentialCandidates: [
        `${zangShort}実証（純粋な気滞・実邪の詰まり）`,
        `脾胃気虚証（滞りよりも疲労・消化不全が主たる病態）`,
        `気滞による二次的な血行障害（気虚瘀血）`
      ],
      supportingFindings: [
        `「${stateLabel}」：疲れやすい、力が入らない、食後の倦怠感などの虚証徴候`,
        `「${qShort}」：イライラ、お腹や胸の張り、ため息などの滞りの自覚`
      ],
      conflictingFindings: [
        `純粋な「${zangShort}気滞実証」であれば、強い瀉法（激しい刺激）に耐えられますが、「虚」が共存するため、強い刺激を与えるとドーゼオーバー（気失・だるさ）を起こす危険があります。`
      ],
      missingInformation: [
        "張る部位（お腹や肩）を押した時、気持ちが良いか（喜按＝虚）、痛がって嫌がるか（拒按＝実）",
        "疲労と張りのどちらが先に発生したか（タイムライン）",
        "便通の状態（コロコロ便の便秘か、軟便・下痢傾向か）"
      ],
      nextActionQuestions: [
        {
          question: "「お腹や肩の張っている場所を手のひらでジワーッと押されると、気持ちいいですか？ それとも触られたくないですか？」",
          target: "腹証・触診",
          reason: "喜按（気持ちいい）なら虚が主体、拒按（嫌がる）なら実が主体と即座に判別できるため。"
        },
        {
          question: "「朝起きた瞬間から疲れていますか？ それとも夕方以降に張りが強くなりますか？」",
          target: "問診",
          reason: "朝からだるければ気虚（本虚）、夕方に悪化するなら気滞（標実）の勢いを測定するため。"
        },
        {
          question: "「舌のフチに歯の跡（歯痕）がついていませんか？」",
          target: "舌象",
          reason: "歯痕舌は脾気虚・水分代謝低下の決定的証拠となり、気虚が根本原因であると確定できるため。"
        }
      ],
      treatmentPrinciple: {
        rule: "健脾補気（本治）を主とし、軽度の理気疏肝（標治）を兼ねる",
        strategy: "いきなり強力に気を巡らせる（瀉法）のではなく、まず土台の気を補いながらやさしく滞りをほどく。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "虚実協調ペア：足三里 ＋ 太衝",
          primaryAcupoint: { id: "ashisanri", name: "足三里", meridian: "足陽明胃経", role: "合穴・胃下合穴：胃腸機能を高め気を補う（本治）" },
          secondaryAcupoint: { id: "taishou", name: "太衝", meridian: "足厥陰肝経", role: "原穴：肝気のめぐりを整え張りを解消（標治）" },
          intendedEffect: "足三里でエネルギーの産生力を底上げし、太衝で滞った自律神経緊張をやさしく解放する",
          indicationConditions: "全身の倦怠感がありながら、胸やお腹の張り・イライラを併発している場合",
          differentialReason: "太衝単独だと「虚」を補えないが、足三里を併用することでドーゼオーバーを防ぐ",
          reassessmentPoint: "胃のつかえ感が取れ、呼吸が深くなり、だるさが出ないか",
          evidenceLevel: {
            classical: "『四総穴歌』肚腹は三里に留む。原合配穴による気血の生化と疏通の統合。",
            modernResearch: "足三里への鍼通電が消化管蠕動運動を促通し、太衝刺激が大脳辺縁系の過緊張を抑制する二重調整作用。",
            clinicalPerspective: "足三里は補法（雀啄または置鍼）、太衝は平補平瀉で行うと最も安定した臨床効果が得られる。"
          }
        },
        {
          isPrimary: false,
          pairName: "中焦開通ペア：中脘 ＋ 内関",
          primaryAcupoint: { id: "chukan", name: "中脘", meridian: "任脈", role: "胃募穴・腑会：みぞおちの痞え（つかえ）を解消" },
          secondaryAcupoint: { id: "naikan", name: "内関", meridian: "手厥陰心包経", role: "絡穴・八脈交会穴：横隔膜を緩め胃気降下を促す" },
          intendedEffect: "みぞおちから胸にかけての詰まり感を即効で通じさせ、消化管の逆流・緊張を解除する",
          indicationConditions: "吐き気・ゲップ・胃もたれなど、上部消化管の逆流徴候が顕著な場合",
          differentialReason: "四肢末梢ではなく体幹中央のアクセスポートを用い、横隔膜の緊張を一撃で解放する",
          reassessmentPoint: "みぞおちの硬結（心下痞鞭）が軟らかくなったかどうか",
          evidenceLevel: {
            classical: "『針灸資生経』中脘・内関は胃脘痛・胸満・悪心を治す神穴。",
            modernResearch: "内関刺激が迷走神経求心路を介して孤束核を興奮させ、制吐作用を発揮することが立証されている。",
            clinicalPerspective: "虚証患者の中脘への深刺は避け、皮内鍼やマイルドな温灸が極めて有効。"
          }
        }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 3. 【整合確定証（CONFIRMED）】：すべての入力が整合する高精度判定
  // -------------------------------------------------------------------------

  // パターン1: 肝気鬱結証（熱・実・気滞・肝胆）
  if (zangfu === "liver" && qixueshui === "qizhi" && temp === "heat" && state === "excess" && depth === "interior") {
    return {
      status: "confirmed",
      statusBadge: {
        label: "証の特定：肝気鬱結証（気鬱化火傾向）",
        description: "入力された八綱・気血水・臓腑のすべての次元が典型的な病態モデルに完全に合致します。",
        variant: "success"
      },
      syndromeName: "肝気鬱結証（気鬱化火）",
      syndromeReading: "かんきうっけつしょう（きうつかか）",
      oneSentenceFormula: "裏・実・熱・気滞が肝胆に鬱結し、疏泄機能の失調により自律神経緊張・胸脇部痛・情動興奮を招いた実熱病態。",
      summary: "精神的ストレスや情動の抑圧によって、肝の「気を全身へ伸びやかに巡らせる働き（疏泄）」が阻害された状態です。「熱」が共存しているため、滞った気が摩擦熱を生じて「化火（かか）」し、イライラ、目の充血、頭痛などの興奮症状が目立ちます。",
      pathologyMechanism: "大脳皮質・扁桃体の過剰興奮が視床下部を介して交感神経を持続的に緊張させ、末梢血管や平滑筋（消化管・胆道系・血管）の攣縮を引き起こしています。",
      differentialCandidates: [
        "肝火上炎証（気逆が激しく、より急性の頭痛・目赤・激怒を伴う重度熱証）",
        "肝鬱脾虚証（気滞が消化器に波及し、下痢や食欲不振を併発している状態）",
        "心火亢盛証（不眠・動悸・口内炎など精神症状がより前面に出る状態）"
      ],
      supportingFindings: [
        "【裏】慢性的な内因・情動ストレスに起因している",
        "【実】触診で張りが強く、ため息をつくと一時的に楽になる",
        "【熱】イライラ、口の苦味、顔のほてり、便秘傾向がある",
        "【気滞】胸脇部（肋骨下部）の張り、喉のつかえ感（梅核気）",
        "【肝胆】自律神経系・情動・筋緊張の過亢進"
      ],
      conflictingFindings: [
        "冷えや疲労衰弱などの「虚寒所見」は見られず、実熱所見で純粋に統一されています。"
      ],
      missingInformation: [
        "月経周期との関連性（女性の場合、月経前に顕著に悪化するか）",
        "睡眠の状態（寝つきが悪い入眠障害か、途中で起きる中途覚醒か）",
        "舌の形状（舌の辺縁が赤く尖っていないか）"
      ],
      nextActionQuestions: [
        {
          question: "「肋骨の下（季肋部）に手を当てて、張るような圧痛（胸脇苦満）があるか触診する」",
          target: "腹証・触診",
          reason: "肝気鬱結の最も確実な客観的身体サインを検証するため。"
        },
        {
          question: "「舌のフチ（肝胆の反射区）が赤くなっていないか確認する」",
          target: "舌象",
          reason: "気滞が熱化（気鬱化火）している客観的証拠を捉えるため。"
        },
        {
          question: "「脈がギターの弦のようにピンと張っているか（弦脈）確認する」",
          target: "脈象",
          reason: "肝経の気機鬱滞・自律神経過緊張を脈診で確定させるため。"
        }
      ],
      treatmentPrinciple: {
        rule: "疏肝理気・清熱瀉火（そかんりき・せいねつしゃか）",
        strategy: "肝経の気の詰まりを解除（瀉法）し、滞留した熱を四肢末梢から発散させて交感神経を鎮静化する。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "王道原合ペア：太衝 ＋ 陽陵泉",
          primaryAcupoint: { id: "taishou", name: "太衝", meridian: "足厥陰肝経", role: "原穴：肝気のめぐりを強力に促し中枢の興奮を鎮静" },
          secondaryAcupoint: { id: "youryouzen", name: "陽陵泉", meridian: "足少陽胆経", role: "合穴・筋会：側腹部・側頭部の筋膜スパズムを解除" },
          intendedEffect: "太衝で情動性・中枢性の自律神経緊張を緩解し、陽陵泉で末梢の筋膜緊張を連動解放する",
          indicationConditions: "イライラ、頭痛、胸脇苦満、肩甲骨間の緊張が強い場合",
          differentialReason: "肝経と胆経の表裏関係を活用し、最も少ない穴数で最大の疏通効果を発揮する",
          reassessmentPoint: "施術直後に深い呼吸（ため息ではない自然な深呼吸）ができるか、脈の弦象が和らぐか",
          evidenceLevel: {
            classical: "『霊枢』九針十二原：五臓に疾ある者は、応に十二原を出すべし。原合配穴の筆頭。",
            modernResearch: "太衝への刺鍼がfMRI上で大脳辺縁系（扁桃体・帯状回）の過剰活動を抑制することが確認されている。",
            clinicalPerspective: "響き（得気）をしっかり感じさせる雀啄瀉法が効果的。強い刺激で気がスーッと通る感覚が生まれる。"
          }
        },
        {
          isPrimary: false,
          pairName: "清熱降火ペア：行間 ＋ 風池",
          primaryAcupoint: { id: "koukan", name: "行間", meridian: "足厥陰肝経", role: "滎火穴：『実すれば其の子を瀉す』の法則で肝熱を消火" },
          secondaryAcupoint: { id: "fuuchi", name: "風池", meridian: "足少陽胆経", role: "交会穴：後頭下筋群を緩め頭部への充血を沈静" },
          intendedEffect: "目の充血、激しい偏頭痛、カッカするのぼせ感を急激にクールダウンさせる",
          indicationConditions: "頭痛・目の奥の痛み・顔面紅潮など、熱の上行が特に激しい場合",
          differentialReason: "理気（気の巡り）よりも清熱（熱の冷却）に比重を置いたシャープな配穴",
          reassessmentPoint: "頭の拍動感・目の熱っぽさが引いたかどうか",
          evidenceLevel: {
            classical: "『難経』六十九難：子穴瀉法。肝（木）の実熱を子である行間（火）から瀉す古代の精密ロジック。",
            modernResearch: "風池刺激が椎骨動脈血流を安定化させ、三叉神経血管系の興奮伝達物質（CGRP）放出を抑制する。",
            clinicalPerspective: "行間への強刺激は痛みを伴いやすいため、細鍼（寸3-1番等）で的確に取穴することが肝要。"
          }
        }
      ]
    };
  }

  // パターン2: 寒凝肝脈証（寒・実・気滞・肝胆）
  if (zangfu === "liver" && qixueshui === "qizhi" && temp === "cold" && state === "excess" && depth === "interior") {
    return {
      status: "confirmed",
      statusBadge: {
        label: "証の特定：寒凝肝脈証（実寒気滞）",
        description: "寒邪が肝経を侵襲し、気のめぐりが冷え固まった典型病態に完全に合致します。",
        variant: "success"
      },
      syndromeName: "寒凝肝脈証（かんぎょうかんみゃくしょう）",
      syndromeReading: "かんぎょうかんみゃくしょう",
      oneSentenceFormula: "裏・実・寒・気滞が肝胆経脈に滞留し、寒邪の収引（収縮）作用により下腹部・陰部・側腹部の激しい冷え痛みを招いた実寒病態。",
      summary: "外から侵入した強い冷え（寒邪）や過度の生冷飲食により、肝経の気血が凍りつくように凝滞した病態です。「熱化」した肝気鬱結とは正反対に、温めると痛みが和らぎ、冷えると激化するのが決定的な鑑別点です。",
      pathologyMechanism: "寒冷刺激による末梢交感神経α受容体の過剰興奮が、腸間膜血管および平滑筋の急性攣縮・虚血性疼痛を引き起こしています。",
      differentialCandidates: [
        "脾腎陽虚証（虚証の冷え。温めるだけでなく根本的な生命エネルギーの補給が必要な病態）",
        "気滞血瘀証（刺すような痛みが固定している血行障害）"
      ],
      supportingFindings: [
        "【寒】冷えると激痛が走り、温めると明らかに痛みが軽快する",
        "【実】局所の収縮拘急（筋のつっぱり・引き攣り）が激しい",
        "【肝胆】下腹部、鼠径部、生殖器周囲、季肋部に痛みが集中する"
      ],
      conflictingFindings: [
        "のぼせ、口渇、目の充血、便秘などの熱証所見は皆無であること。"
      ],
      missingInformation: [
        "痛む部位をカイロや温熱で温めた際の反応時間",
        "舌苔の性状（白く湿った苔が付着しているか）",
        "脈の緊張度（引っ張られたように硬く冷たい『弦緊脈』か）"
      ],
      nextActionQuestions: [
        {
          question: "「お風呂に入ったり、カイロでお腹を温めると痛みは楽になりますか？」",
          target: "問診",
          reason: "実寒証の最大特徴である『得温痛減（温めると減痛）』を証明するため。"
        },
        {
          question: "「舌苔が白く水っぽく湿っていないか確認する」",
          target: "舌象",
          reason: "体内に寒湿が停滞している客観的所見を押さえるため。"
        }
      ],
      treatmentPrinciple: {
        rule: "暖肝散寒・理気止痛（だんかんさんかん・りきしつう）",
        strategy: "冷えて硬直した肝経を温めて緩め（温通）、寒邪を散らして速やかに疼痛を遮断する。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "温通止痛ペア：太衝 ＋ 関元（灸）",
          primaryAcupoint: { id: "taishou", name: "太衝", meridian: "足厥陰肝経", role: "原穴：肝気のめぐりを整え攣縮を解除" },
          secondaryAcupoint: { id: "kangen", name: "関元", meridian: "任脈", role: "小腸募穴：下腹部を温め寒邪を根底から融解" },
          intendedEffect: "太衝で肝経の気道を疎通し、関元への温灸で下腹部の冷え固まった血流を一気に再起動する",
          indicationConditions: "下腹部痛、月経困難症、冷えによる激しい腹痛がある場合",
          differentialReason: "熱証用の陽陵泉ではなく、温熱を注ぎ込める丹田（関元）を組み合わせる",
          reassessmentPoint: "下腹部の冷えが取れ、締め付けられるような刺痛が和らいだか",
          evidenceLevel: {
            classical: "『類経図翼』関元は命門の真火を助け、寒凝の痼冷を破る灸療の要衝。",
            modernResearch: "任脈下腹部への温熱刺激が骨盤内動脈血流量を有意に増加させ、プロスタグランジンによる筋攣縮を抑制する。",
            clinicalPerspective: "関元には透熱灸や箱灸を用い、皮膚がほんのり桜色になるまでしっかりと熱を浸透させるのが極意。"
          }
        },
        {
          isPrimary: false,
          pairName: "局所散寒ペア：帰来 ＋ 中封",
          primaryAcupoint: { id: "kikan", name: "帰来", meridian: "足陽明胃経", role: "下腹部局所穴：少腹部の寒邪を散らし気血を巡らす" },
          secondaryAcupoint: { id: "chuhou", name: "中封", meridian: "足厥陰肝経", role: "経金穴：肝経の冷えによる拘急・引き攣りを緩和" },
          intendedEffect: "鼠径部・生殖器・下腹部に局限した強い刺痛と冷感を局所および遠隔の相乗効果で解除する",
          indicationConditions: "側腹部よりも下腹部正中〜鼠径部に痛みが強く偏在する場合",
          differentialReason: "全身を温める関元に対し、鼠径動脈拍動部近傍の血流改善をよりダイレクトに狙う",
          reassessmentPoint: "下腹部皮膚温の上昇と、鼠径部の硬結・圧痛の消失",
          evidenceLevel: {
            classical: "『鍼灸甲乙経』帰来は奔豚気や少腹の冷え痛みを治し、中封は厥陰経の拘急を緩めるとされる。",
            modernResearch: "中封刺激が伏在神経および大腿神経領域の血流反射を誘発し下腹部筋緊張を緩和することが示唆されている。",
            clinicalPerspective: "帰来は腹壁の緊張度を確認しながら、浅めに刺入し温熱刺激（灸頭鍼など）を併用すると奏効しやすい。"
          }
        }
      ]
    };
  }

  // パターン3: 脾気虚弱証（寒・虚・気虚・脾胃）
  if (zangfu === "spleen" && qixueshui === "qixu" && state === "deficiency" && depth === "interior") {
    return {
      status: "confirmed",
      statusBadge: {
        label: "証の特定：脾気虚弱証（消化器エネルギー枯渇）",
        description: "入力された八綱・気血水・臓腑のすべての次元が消化吸収機能低下の典型に完全に合致します。",
        variant: "success"
      },
      syndromeName: "脾気虚弱証（ひききょじゃくしょう）",
      syndromeReading: "ひききょじゃくしょう",
      oneSentenceFormula: `裏・虚・${tempLabel}・気虚が脾胃に局在し、運化（消化吸収・代謝）の不全により全身のエネルギー産生が衰退した虚証病態。`,
      summary: "飲食物から気・血を作り出す中枢「脾胃」の出力が低下した状態です。食欲不振、食後の強い眠気、軟便、手足のだるさが主徴であり、慢性疲労や機能性ディスペプシア（FD）に相当します。",
      pathologyMechanism: "消化管ホルモン分泌低下、消化管運動不全、およびミトコンドリアでのATP産生低下により、全身組織へのエネルギー供給が滞っています。",
      differentialCandidates: [
        "脾陽虚証（冷えや泥状下痢がさらに進行し、温熱機能まで失われた重篤病態）",
        "心脾両虚証（気虚に加えて血虚が進み、不眠や動悸を併発した状態）"
      ],
      supportingFindings: [
        "【虚】押されると気持ちが良い（喜按）、朝から疲れている",
        "【気虚】息切れ、声に力がない、食後に動けなくなる",
        "【脾胃】胃もたれ、軟便、下痢傾向、筋肉の脱力感"
      ],
      conflictingFindings: [
        "激しい刺痛や張りの拒按、イライラなどの実邪所見は存在しないこと。"
      ],
      missingInformation: [
        "食欲の有無（空腹感はあるのに食べられないのか、空腹感すらないのか）",
        "舌の厚みと歯痕（舌がボテッと肥大して歯型がついているか）",
        "便の性状（泥状便、未消化便の有無）"
      ],
      nextActionQuestions: [
        {
          question: "「食後に異常な眠気や、身体が鉛のように重くなる感覚がありますか？」",
          target: "問診",
          reason: "脾気虚の特異的徴候である『食後昏睡・四肢無力』を確認するため。"
        },
        {
          question: "「舌を出して、舌がぽってり肥大してフチに歯型（歯痕）があるか確認する」",
          target: "舌象",
          reason: "脾の運化不全による水分停滞と組織の浮腫を視覚的に実証するため。"
        }
      ],
      treatmentPrinciple: {
        rule: "健脾益気・温養中焦（けんぴえっき・おんようちゅうしょう）",
        strategy: "消化管の血流を賦活して後天の気（ATP）を増やし、瀉法は一切使わず補法・温灸を中心に介入する。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "健脾基本ペア：足三里 ＋ 太白",
          primaryAcupoint: { id: "ashisanri", name: "足三里", meridian: "足陽明胃経", role: "合穴・胃下合穴：胃腸蠕動を促し気血を生化" },
          secondaryAcupoint: { id: "taihaku", name: "太白", meridian: "足太陰脾経", role: "原穴・兪土穴：脾経の原気を直接補い運化を高める" },
          intendedEffect: "胃の運動能と脾の吸収能を同時に引き上げ、全身のエネルギー産生を最大化する",
          indicationConditions: "慢性疲労、胃もたれ、食欲不振、軟便傾向がある場合",
          differentialReason: "胃（陽）と脾（陰）の表裏原合配穴により、中焦の機能を最も無理なく底上げする",
          reassessmentPoint: "胃部の重苦しさが抜け、手足に温かさと力が入る感覚が戻るか",
          evidenceLevel: {
            classical: "『千金方』足三里・太白は脾胃の虚損を治し、穀気を補益する至高の組み合わせ。",
            modernResearch: "足三里への施鍼が迷走神経活動を促通し、グレリン分泌を刺激して食欲と消化管運動を回復させる。",
            clinicalPerspective: "弱刺激の雀啄（数回軽く上下）または置鍼（10〜15分）。過度の強刺激は逆に疲労を招くため禁物。"
          }
        }
      ]
    };
  }

  // パターン4: 腎陰虚証（熱・虚・陰虚・腎膀胱）
  if (zangfu === "kidney" && qixueshui === "yinxu" && temp === "heat" && state === "deficiency" && depth === "interior") {
    return {
      status: "confirmed",
      statusBadge: {
        label: "証の特定：腎陰虚証（真陰涸渇・虚熱上炎）",
        description: "入力された八綱・気血水・臓腑のすべての次元が腎陰不足の典型病態に完全に合致します。",
        variant: "success"
      },
      syndromeName: "腎陰虚証（じんいんきょしょう）",
      syndromeReading: "じんいんきょしょう",
      oneSentenceFormula: "裏・虚・熱・陰虚が腎系に局在し、生体冷却水（真陰）の涸渇により抑えの効かない虚火が浮上した虚熱病態。",
      summary: "生命の根本貯水池である「腎陰」が加齢や過労、慢性疾患によって消耗し、相対的に熱（虚火）が浮き上がった状態です。手足の裏のほてり（五心煩熱）、夜間の寝汗（盗汗）、腰膝の脱力感、耳鳴りが現れます。",
      pathologyMechanism: "副腎皮質機能の低下、体液量（細胞内液）の減少、視床下部自律神経中枢の過敏化に伴う末梢血管拡張と寝汗が生じています。",
      differentialCandidates: [
        "肝腎陰虚証（腎陰虚が進行し、肝血も消耗して目のかすみやイライラが強まった状態）",
        "心腎不交証（腎水が心を潤せず、激しい不眠や動悸が前面に出る病態）"
      ],
      supportingFindings: [
        "【虚】腰や膝に力が入らない（腰膝酸軟）、慢性の疲労感",
        "【熱】夕方から夜にかけて熱っぽくなる、手足のひらが熱い",
        "【陰虚】喉が渇くが少しずつしか飲まない、皮膚の乾燥、寝汗",
        "【腎】耳鳴り、抜け毛、歯のぐらつき、頻尿または尿量減少"
      ],
      conflictingFindings: [
        "悪寒や水様性の透明な下痢など、陽虚・寒証の所見は見られないこと。"
      ],
      missingInformation: [
        "寝汗（朝起きた時に首元や胸元が汗ばんでいるか）",
        "舌の苔の剥がれ具合（苔が全くない鏡面舌・光剥苔か）",
        "脈の細さ（糸のように細く速い『細数脈』か）"
      ],
      nextActionQuestions: [
        {
          question: "「夜中に寝汗をかいて目が覚めることがありますか？」",
          target: "問診",
          reason: "陰虚の決定打である『盗汗（とうかん）』を特定するため。"
        },
        {
          question: "「舌の苔が剥がれてツルツルになっていないか、地肌が真っ赤でないか確認する」",
          target: "舌象",
          reason: "体内の津液（陰液）が極度に干上がっている証拠を視覚的に押さえるため。"
        }
      ],
      treatmentPrinciple: {
        rule: "滋補腎陰・清降虚熱（じほじんいん・せいきょうきょねつ）",
        strategy: "強い熱を冷ます薬や激しい瀉法は避け、枯れた泉に水を注ぐように腎陰を滋養して虚火を自然鎮火させる。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "滋陰降火ペア：太谿 ＋ 照海",
          primaryAcupoint: { id: "taikei", name: "太谿", meridian: "足少陰腎経", role: "原穴：腎水の源を直接滋養し陰液を補充" },
          secondaryAcupoint: { id: "shoukai", name: "照海", meridian: "足少陰腎経", role: "八脈交会穴：陰蹻脈に通じ喉・目・脳へ潤いを上行" },
          intendedEffect: "太谿で腎陰の絶対量を増やし、照海でその潤いを全身の上部（喉・頭・目）へ循環させてほてりを消去する",
          indicationConditions: "手足のほてり、寝汗、口の渇き、慢性の耳鳴りがある場合",
          differentialReason: "腎経の同経原交配穴により、無駄な刺激を与えず純粋に滋陰作用を最大化する",
          reassessmentPoint: "手足のひらのジリジリした熱感が引き、咽頭部の乾燥が潤うか",
          evidenceLevel: {
            classical: "『十四経发挥』照海は咽喉の乾き・陰虚の虚火を鎮める特効穴。",
            modernResearch: "太谿・照海への刺鍼が唾液分泌量を増加させ、自律神経の交感神経活動（LF/HF）を抑制することが示されている。",
            clinicalPerspective: "お灸は原則禁忌（熱を助長するため）。細鍼による静かな置鍼（無痛刺鍼）が最も効果を奏する。"
          }
        },
        {
          isPrimary: false,
          pairName: "三陰統補ペア：太谿 ＋ 三陰交",
          primaryAcupoint: { id: "taikei", name: "太谿", meridian: "足少陰腎経", role: "原穴：腎水根本を補強" },
          secondaryAcupoint: { id: "saninkou", name: "三陰交", meridian: "足太陰脾経", role: "足三陰交会穴：肝・脾・腎の津液・精血を一挙に回復" },
          intendedEffect: "腎陰のみならず、肝血や脾陰も同時に底上げし、皮膚乾燥や女性ホルモン変動に伴うほてりを改善する",
          indicationConditions: "更年期に伴うホットフラッシュ、不眠、下肢の皮膚乾燥や冷えのぼせを併発する場合",
          differentialReason: "照海が上部（喉・頭）の熱感降下に特化しているのに対し、三陰交は骨盤内・全身の津液充填を広く担う",
          reassessmentPoint: "夜間の熟眠感、肌の乾燥感、足元の冷えと上半身の熱感差（冷えのぼせ）の改善",
          evidenceLevel: {
            classical: "『鍼灸聚英』三陰交は足の三陰（脾・肝・腎）が交わる要穴にして、陰血不足の諸症を治す。",
            modernResearch: "三陰交刺激が内分泌系のエストロゲン様作用や局所血流改善を促すことが報告されている。",
            clinicalPerspective: "内くるぶし上方の骨際に指を沈め、強い圧痛や陥凹がある部位を的確に捉えることがポイント。"
          }
        }
      ]
    };
  }

  // パターン5: 風寒表証（表・寒・実・気滞・肺）
  if (depth === "exterior" && temp === "cold" && state === "excess") {
    return {
      status: "confirmed",
      statusBadge: {
        label: "証の特定：風寒表証（初期急性外感）",
        description: "体表のバリアが寒邪に侵襲された急性外感病態に完全に合致します。",
        variant: "success"
      },
      syndromeName: "風寒表証（ふうかんひょうしょう）",
      syndromeReading: "ふうかんひょうしょう",
      oneSentenceFormula: "表・実・寒が肺皮毛を襲い、体表の衛気閉塞により悪寒・無汗・後頭部痛を呈した急性外感病態。",
      summary: "いわゆる『風邪のひき始め』です。冷たい風（風寒の邪）が皮膚・毛穴（肺の支配領域）を直撃し、毛穴がキュッと閉塞したため体温調整ができず、悪寒・後頭部痛・透明な鼻水が生じています。",
      pathologyMechanism: "急性ウイルス感染に伴う体表皮膚血管の反射性収縮、項背筋群の攣縮、および立毛筋の収縮反応が生じています。",
      differentialCandidates: [
        "風熱表証（のどの激痛、発熱、黄色い痰など熱邪が主体の風邪）",
        "太陽中風証（悪寒はあるが汗がジワジワ漏れ出ている虚証パターンの風邪）"
      ],
      supportingFindings: [
        "【表】発症が急激で、病変が体表・首筋・毛穴に限定されている",
        "【寒】着込んでもブルブル震えるほどの寒気（悪寒）がある",
        "【実】汗が出ない（無汗）、首筋が硬くこわばっている"
      ],
      conflictingFindings: [
        "内臓の衰弱（裏虚）や、咽頭の高度な発赤腫痛（風熱）は見られないこと。"
      ],
      missingInformation: [
        "汗の有無（全く汗が出ない無汗か、汗ばんでいるか）",
        "鼻水の性状（サラサラの透明水様か、粘っこい黄色か）",
        "喉の痛み（痛まないか、唾を飲み込めないほど激痛か）"
      ],
      nextActionQuestions: [
        {
          question: "「現在、汗は出ていますか？ それとも皮膚がカサカサして全く汗が出ませんか？」",
          target: "問診",
          reason: "無汗なら麻黄湯・列缺（実証）、有汗なら桂枝湯（虚証）と処方分岐するため。"
        },
        {
          question: "「首の後ろから肩を触診し、風池・大椎付近が冷たく硬直しているか確認する」",
          target: "腹証・触診",
          reason: "風邪の侵入ゲートを直接特定し、温熱療法の適応を決めるため。"
        }
      ],
      treatmentPrinciple: {
        rule: "辛温解表・宣肺発汗（しんおんげひょう・せんぱいはっかん）",
        strategy: "閉じた体表の毛穴を開き（発汗）、体表にとどまっている寒邪を一気に外へ吹き飛ばす。"
      },
      acupointOptions: [
        {
          isPrimary: true,
          pairName: "解表発汗ペア：列缺 ＋ 風池",
          primaryAcupoint: { id: "rekketsu", name: "列缺", meridian: "手太陰肺経", role: "絡穴・八脈交会穴：肺気を宣発させ体表の毛穴を開く" },
          secondaryAcupoint: { id: "fuuchi", name: "風池", meridian: "足少陽胆経", role: "交会穴：後頭部の血行鬱滞を打破し風邪を散らす" },
          intendedEffect: "列缺で肺のバリアを開放し、風池で首筋を温めることで、悪寒と頭痛を即効で発散・発汗させる",
          indicationConditions: "寒気、後頭部痛、首こり、無汗、サラサラ鼻水がある場合",
          differentialReason: "内臓のツボを使わず、体表開通に特化した外感専用の即効プロトコル",
          reassessmentPoint: "首の後ろから背中にかけてジワッと心地よい汗がにじみ、悪寒が引いたか",
          evidenceLevel: {
            classical: "『四総穴歌』頭項は列缺に尋ねよ。『千金方』風池は首筋の百病・外感風邪を主る。",
            modernResearch: "後頭下筋群への刺激が椎骨動脈循環を改善し、大後頭神経刺激を介して頭痛受容を遮断する。",
            clinicalPerspective: "施術後に温かい生姜湯や白湯を飲ませ、安静に就寝させると劇的に治癒する。"
          }
        },
        {
          isPrimary: false,
          pairName: "温陽解表ペア：大椎（温灸） ＋ 合谷",
          primaryAcupoint: { id: "daitsui", name: "大椎", meridian: "督脈", role: "諸陽の会：すべての陽経が交わる首の根本で体温を急速上昇" },
          secondaryAcupoint: { id: "goukoku", name: "合谷", meridian: "手陽明大腸経", role: "原穴：顔面・頭部の経気を強力に推動し発汗を促進" },
          intendedEffect: "悪寒（ゾクゾクする激しい寒気）が非常に強い場合に、督脈から全身の陽熱を賦活して寒邪を速やかに追い払う",
          indicationConditions: "背中全体が寒くガタガタ震える、初期の悪寒が特に強い場合",
          differentialReason: "列缺が肺気の宣発（呼吸器・体表開口）を重視するのに対し、大椎は全身の熱産生を直接引き上げる",
          reassessmentPoint: "背部全体が温まり、歯の噛み合わせや悪寒の震えが治まったか",
          evidenceLevel: {
            classical: "『素問』気府論：大椎は手足三陽・督脈の会穴。外感熱病・悪寒発熱の要穴。",
            modernResearch: "頸胸移行部への温熱刺激が褐色脂肪組織の熱産生を促し、末梢血管拡張と免疫細胞活性化を誘導する。",
            clinicalPerspective: "大椎には棒灸や温灸器を用い、心地よい温感が背中全体に広がるまでしっかり温めるのがコツ。"
          }
        }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 4. 【その他の動的整合合成（SYNTHESIZED）】：整合するパラメータから精密生成
  // -------------------------------------------------------------------------
  return {
    status: "confirmed",
    statusBadge: {
      label: `証の特定：${zangShort}${qShort}証`,
      description: "選択された八綱・気血水・臓腑のパラメータに基づいて病態を論理合成しました。",
      variant: "success"
    },
    syndromeName: `${zangShort}${qShort}証`,
    syndromeReading: `${zangShort}・${qShort}の病態`,
    oneSentenceFormula: `「${depthLabel}・${stateLabel}・${tempLabel}」の病勢が【${zData.label}】に局在し、生体動態として「${qData.label}」を招いた病態。`,
    summary: `八綱の深浅（${depthLabel}）・冷熱（${tempLabel}）・勢い（${stateLabel}）に対し、実体としての「${qData.label}」が【${zData.label}】に波及している状態です。`,
    pathologyMechanism: `【${zData.organRole}】に関わる機能単位に、${qData.dynamicNature}という病理変化が生じています。`,
    differentialCandidates: [
      `${zangShort}の他病態（虚実・寒熱の異なる証）`,
      `関連する表裏臓腑の機能失調`
    ],
    supportingFindings: [
      `【${depthLabel}】病変の局在深度`,
      `【${tempLabel}】機能の${temp === "heat" ? "亢進・炎症" : "沈静・冷え"}傾向`,
      `【${stateLabel}】正気と邪気のバランス（${state === "excess" ? "有余・滞り" : "不足・衰弱"}）`,
      `【${zangShort}】主たる局所徴候`
    ],
    conflictingFindings: [
      "特段の病理的矛盾は検出されていません。"
    ],
    missingInformation: [
      "四診（問診・望診・聞診・切診）における舌脈の裏付け所見",
      "発症時期と経過（急性か慢性か）"
    ],
    nextActionQuestions: [
      {
        question: `「${zangShort}に関する代表的な症状（痛み・機能失調）の好発時間帯を確認する」`,
        target: "問診",
        reason: "子午流注（臓腑の時間帯リズム）から病位の正しさを検証するため。"
      },
      {
        question: "「舌の苔の色（白か黄か）と厚みを確認する」",
        target: "舌象",
        reason: "寒熱と邪気の深浅を客観的に再裏付けするため。"
      }
    ],
    treatmentPrinciple: {
      rule: `${state === "excess" ? "瀉法（邪気の排除・疏通）" : "補法（正気の補給・滋養）"}を主方針とする`,
      strategy: `${temp === "heat" ? "清熱（熱を冷ます）" : "温熱（芯から温める）"}介入を組み合わせる。`
    },
    acupointOptions: [
      {
        isPrimary: true,
        pairName: `${zangShort}基本ペア：太衝 ＋ 陽陵泉`,
        primaryAcupoint: { id: "taishou", name: "太衝", meridian: `${zangShort}経`, role: "原穴：経絡の原気を調える" },
        secondaryAcupoint: { id: "youryouzen", name: "陽陵泉", meridian: "胆経", role: "合穴・筋会：相乗効果を発揮する要穴" },
        intendedEffect: `局在する${zangShort}の気血を調え、全身のバランスを回復させる`,
        indicationConditions: `${zangShort}の不調が主訴である場合`,
        differentialReason: "過不足のない最小構成で生体の自然治癒力を引き出す",
        reassessmentPoint: "主訴の不快感が和らぎ、脈の調和が得られたか",
        evidenceLevel: {
          classical: "伝統的な臓腑経絡学説に基づく基本配穴配当。",
          modernResearch: "体性-内臓自律神経反射を介した標的臓器の血流・機能調節作用。",
          clinicalPerspective: "患者の体質・体力（虚実）に応じた適切な刺激量（ドーゼ）の選択が重要。"
        }
      }
    ]
  };
}
