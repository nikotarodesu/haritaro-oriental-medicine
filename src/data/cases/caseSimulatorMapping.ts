import { DepthType, TemperatureType, StateType, QixueshuiType, ZangfuType, ComplexStateType } from "@/data/simulatorData";

export interface CaseSimulatorPreset {
  caseId: string;
  caseNumber: number;
  caseTitle: string;
  pattern: string;
  depth: DepthType;
  temp: TemperatureType;
  state: StateType;
  qixueshui: QixueshuiType;
  zangfu: ZangfuType;
  complexState?: ComplexStateType;
  explanation: string;
}

export const CASE_SIMULATOR_PRESETS: Record<string, CaseSimulatorPreset> = {
  "case-01-headache-liver-fire": {
    caseId: "case-01-headache-liver-fire",
    caseNumber: 1,
    caseTitle: "30代女性：激しい側頭痛とイライラ・目の充血",
    pattern: "肝火上炎証（肝陽化火）",
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "liver",
    explanation: "肝の疏泄失調から気滞が長期化して化火し、実熱が肝胆経を通じて頭面に上逆した病態です。",
  },
  "case-02-fatigue-spleen-deficiency": {
    caseId: "case-02-fatigue-spleen-deficiency",
    caseNumber: 2,
    caseTitle: "40代男性：食後の異常な眠気・慢性下痢・全身倦怠感",
    pattern: "脾胃気虚証",
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "spleen",
    explanation: "脾の運化作用減退により、後天の気が生成不足となり、肌肉や脳への栄養供給が滞った病態です。",
  },
  "case-03-dysmenorrhea-cold-stasis": {
    caseId: "case-03-dysmenorrhea-cold-stasis",
    caseNumber: 3,
    caseTitle: "20代女性：激しい下腹部痛と暗紫色のレバー状塊を伴う月経痛",
    pattern: "寒凝血瘀証",
    depth: "interior",
    temp: "cold",
    state: "excess",
    qixueshui: "yuxue",
    zangfu: "liver",
    explanation: "冷え（寒邪）が胞宮に侵入して血脈が凝滞し、不通則痛（通ぜざれば則ち痛む）の激しい刺痛を惹起した病態です。",
  },
  "case-04-acute-lowback-pain-cold-dampness": {
    caseId: "case-04-acute-lowback-pain-cold-dampness",
    caseNumber: 4,
    caseTitle: "50代男性：雨天・冷えで悪化する重だるい腰痛と下肢の重厚感",
    pattern: "寒湿阻絡証（風寒湿痺）",
    depth: "exterior",
    temp: "cold",
    state: "excess",
    qixueshui: "shuitai",
    zangfu: "kidney",
    explanation: "風寒湿の邪が経絡の表層〜筋肉に停滞し、気血の運行を阻害して重着性の痛みを呈する病態です。",
  },
  "case-05-insomnia-heart-kidney": {
    caseId: "case-05-insomnia-heart-kidney",
    caseNumber: 5,
    caseTitle: "40代女性：入眠困難・多夢・手のひらのほてりと動悸",
    pattern: "心腎不交証（陰虚火旺）",
    depth: "interior",
    temp: "heat",
    state: "deficiency",
    qixueshui: "yinxu",
    zangfu: "heart",
    complexState: "shangre_xiahan",
    explanation: "腎陰不足により腎水が心火を制御できず、心火が上亢して神（精神）を乱す陰虚性不眠病態です。",
  },
  "case-06-constipation-dryness-yin-deficiency": {
    caseId: "case-06-constipation-dryness-yin-deficiency",
    caseNumber: 6,
    caseTitle: "60代女性：コロコロした兎糞状の便・喉の渇き・皮膚乾燥",
    pattern: "腸燥津虧証（大腸陰虚）",
    depth: "interior",
    temp: "heat",
    state: "deficiency",
    qixueshui: "yinxu",
    zangfu: "lung",
    explanation: "津液の消耗により大腸を潤す潤滑機能が枯渇し、便の移動が障害された虚熱性便秘です。",
  },
  "case-07-knee-pain-kidney-yang-deficiency": {
    caseId: "case-07-knee-pain-kidney-yang-deficiency",
    caseNumber: 7,
    caseTitle: "70代女性：立ち上がり時の両膝痛・下肢の冷えと腰のだるさ",
    pattern: "腎陽虚・骨痺証",
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "yangxu",
    zangfu: "kidney",
    explanation: "加齢に伴う命門の火の衰えにより、骨と関節を温養・主宰する腎気が衰退した退行性変性病態です。",
  },
  "case-08-chronic-cough-lung-yin-deficiency": {
    caseId: "case-08-chronic-cough-lung-yin-deficiency",
    caseNumber: 8,
    caseTitle: "50代男性：痰の少ない乾いた咳・夕方の微熱・声のかすれ",
    pattern: "肺陰虚証",
    depth: "interior",
    temp: "heat",
    state: "deficiency",
    qixueshui: "yinxu",
    zangfu: "lung",
    explanation: "熱病後や過労により肺の潤いが枯渇し、虚熱が内生して気道粘膜を乾燥刺激する病態です。",
  },
  "case-09-stomachache-cold-liver-qi": {
    caseId: "case-09-stomachache-cold-liver-qi",
    caseNumber: 9,
    caseTitle: "30代男性：冷えやストレスでキリキリ痛む心窩部痛と呑酸",
    pattern: "肝気犯胃・胃寒証",
    depth: "interior",
    temp: "cold",
    state: "excess",
    qixueshui: "qini",
    zangfu: "liver",
    explanation: "肝の鬱気が胃の受納・降濁を阻害し、胃気が逆流して激しい胃痙攣性の痛みを招いた病態です。",
  },
  "case-10-dizziness-phlegm-turbidity": {
    caseId: "case-10-dizziness-phlegm-turbidity",
    caseNumber: 10,
    caseTitle: "40代男性：頭が重い雲に覆われたような回転性めまい・悪心",
    pattern: "痰濁上擾証（痰濁中阻）",
    depth: "interior",
    temp: "cold",
    state: "excess",
    qixueshui: "shuitai",
    zangfu: "spleen",
    explanation: "脾の機能低下により生じた病的代謝産物（痰湿）が清陽の上昇を阻み、頭竅を覆い塞いだ病態です。",
  },
  "case-11-shoulder-stiffness-blood-stasis": {
    caseId: "case-11-shoulder-stiffness-blood-stasis",
    caseNumber: 11,
    caseTitle: "50代男性：夜間に激化する頑固な固定性肩こりと刺痛",
    pattern: "血瘀阻絡証",
    depth: "interior",
    temp: "cold",
    state: "excess",
    qixueshui: "yuxue",
    zangfu: "liver",
    explanation: "長年の局所循環不全により老廃血が経絡内に沈殿・滞留し、刺すような難治性の痛みを固定化させた病態です。",
  },
  "case-12-diarrhea-spleen-kidney-yang-deficiency": {
    caseId: "case-12-diarrhea-spleen-kidney-yang-deficiency",
    caseNumber: 12,
    caseTitle: "60代男性：明け方の腹痛と水様便（五更下痢）・下半身の冷え",
    pattern: "脾腎陽虚証",
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "yangxu",
    zangfu: "kidney",
    explanation: "脾と腎の温煦作用がともに力尽き、陰気配の極まる黎明期に水穀の腐熟が破綻して起こる下痢です。",
  },
  "case-13-palpitation-heart-blood-deficiency": {
    caseId: "case-13-palpitation-heart-blood-deficiency",
    caseNumber: 13,
    caseTitle: "20代女性：疲れや緊張で起こる動悸・顔色蒼白・健忘",
    pattern: "心血虚証",
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "xuexu",
    zangfu: "heart",
    explanation: "血の絶対量が不足し、心神（心拍と意識）を栄養・安定させることができずに動悸・不安感を覚える病態です。",
  },
  "case-14-dysuria-damp-heat-bladder": {
    caseId: "case-14-dysuria-damp-heat-bladder",
    caseNumber: 14,
    caseTitle: "30代女性：排尿時灼熱痛・頻尿・残尿感・尿の混濁",
    pattern: "膀胱湿熱証",
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "shuitai",
    zangfu: "kidney",
    explanation: "湿熱の下注により膀胱の気化作用が障害され、尿道粘膜に炎症性熱邪が鬱滞した急性感染病態です。",
  },
  "case-15-flu-wind-heat-exterior": {
    caseId: "case-15-flu-wind-heat-exterior",
    caseNumber: 15,
    caseTitle: "20代男性：発熱・強い咽頭痛・黄色い鼻汁・微悪風",
    pattern: "風熱表証",
    depth: "exterior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "lung",
    explanation: "外感の風熱邪気が肺衛・体表を襲い、気道の炎症と皮毛の閉塞を急速に引き起こした急性外感病です。",
  },
  "case-16-sciatica-cold-dampness-qi-stagnation": {
    caseId: "case-16-sciatica-cold-dampness-qi-stagnation",
    caseNumber: 16,
    caseTitle: "40代女性：殿部から大腿後面・外側にかけて走る放散痛と冷感",
    pattern: "寒湿痹阻・気滞血瘀証",
    depth: "exterior",
    temp: "cold",
    state: "excess",
    qixueshui: "yuxue",
    zangfu: "kidney",
    explanation: "寒湿邪気が足太陽膀胱経・足少陽胆経の深部に潜り込み、神経走行部の気血を凝固・鬱滞させた病態です。",
  },
  "case-17-anxiety-liver-qi-stagnation": {
    caseId: "case-17-anxiety-liver-qi-stagnation",
    caseNumber: 17,
    caseTitle: "30代女性：喉のつかえ感（梅核気）・胸苦しさ・感情の起伏",
    pattern: "肝気鬱結・気滞痰凝証",
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "liver",
    explanation: "情志の鬱結により気の昇降出入が停滞し、気滞と無形の痰が咽喉部で絡み合って閉塞感を生じた病態です。",
  },
  "case-18-tinnitus-kidney-essence-deficiency": {
    caseId: "case-18-tinnitus-kidney-essence-deficiency",
    caseNumber: 18,
    caseTitle: "60代男性：夜間に目立つ蝉の鳴くような低い耳鳴りと難聴",
    pattern: "腎精不足証（腎虚耳鳴）",
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "yinxu",
    zangfu: "kidney",
    explanation: "腎は耳に開竅するため、加齢による腎精虧虚により髄海が空虚になり、聴覚器官の栄養が途絶えた病態です。",
  },
  "case-19-hypochondriac-pain-liver-stomach": {
    caseId: "case-19-hypochondriac-pain-liver-stomach",
    caseNumber: 19,
    caseTitle: "40代男性：両季肋部の張り痛・ため息・頻繁なゲップ",
    pattern: "肝気犯胃証",
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "qini",
    zangfu: "liver",
    explanation: "肝気の横逆（木乗土）により胃の受納が妨げられ、気機が上逆して吃逆・曖気・季肋痛を反復する病態です。",
  },
  "case-20-post-stroke-hemiplegia-deficiency-stasis": {
    caseId: "case-20-post-stroke-hemiplegia-deficiency-stasis",
    caseNumber: 20,
    caseTitle: "70代男性：脳血管障害回復期の片麻痺・言語障害・自汗",
    pattern: "気虚血瘀・脈絡瘀阻証",
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "yuxue",
    zangfu: "spleen",
    complexState: "benxu_biaoshi",
    explanation: "正気（特に元気・宗気）が著しく不足して血を推動できず、経脈に滞留した瘀血が筋骨への栄養を阻害した病態です。",
  },
};

export function getCaseSimulatorPreset(caseId: string): CaseSimulatorPreset | undefined {
  return CASE_SIMULATOR_PRESETS[caseId];
}

export function buildSimulatorUrlFromCase(preset: CaseSimulatorPreset): string {
  const params = new URLSearchParams();
  params.set("depth", preset.depth);
  params.set("temp", preset.temp);
  params.set("state", preset.state);
  params.set("qixueshui", preset.qixueshui);
  params.set("zangfu", preset.zangfu);
  if (preset.complexState && preset.complexState !== "none") {
    params.set("complexState", preset.complexState);
  }
  params.set("fromCase", String(preset.caseNumber));
  params.set("caseTitle", preset.pattern);
  return `/simulator?${params.toString()}#simulator-conditions`;
}
