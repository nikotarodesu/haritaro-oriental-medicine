import { DepthType, TemperatureType, StateType, QixueshuiType, ZangfuType } from "@/data/simulatorData";

export interface TsuboSimulatorLinkInfo {
  depth: DepthType;
  temp: TemperatureType;
  state: StateType;
  qixueshui: QixueshuiType;
  zangfu: ZangfuType;
  syndromeName: string;
  syndromeReading: string;
  targetRole: string; // 例: "主治・特効穴"
}

// 主要名穴の固有シミュレーターマッピング
const SPECIAL_POINT_MAP: Record<string, TsuboSimulatorLinkInfo> = {
  lr3: {
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "liver",
    syndromeName: "肝陽上亢・肝気鬱結",
    syndromeReading: "かんようじょうこう・かんきうっけつ",
    targetRole: "疏肝理気・平肝潜陽の第一要穴",
  },
  st36: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "spleen",
    syndromeName: "脾胃気虚・中気下陥",
    syndromeReading: "ひいききょ・ちゅうきげかん",
    targetRole: "健脾和胃・補中益気の天下の名穴",
  },
  li4: {
    depth: "exterior",
    temp: "cold",
    state: "excess",
    qixueshui: "qixu",
    zangfu: "lung",
    syndromeName: "外感風熱・経絡鬱滞",
    syndromeReading: "がいかんふうねつ・けいらくうったい",
    targetRole: "疏風解表・通絡止痛の大穴",
  },
  sp6: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "xuexu",
    zangfu: "spleen",
    syndromeName: "肝脾腎三陰虚損・血虚",
    syndromeReading: "かんぴじんさんいんきょそん・けっきょ",
    targetRole: "滋陰補血・肝脾腎三経調和の要穴",
  },
  ki3: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "xuexu",
    zangfu: "kidney",
    syndromeName: "腎陰虚・腎精不足",
    syndromeReading: "じんいんきょ・じんせいふそく",
    targetRole: "滋腎益精・滋陰降火の原穴",
  },
  ki1: {
    depth: "interior",
    temp: "heat",
    state: "deficiency",
    qixueshui: "xuexu",
    zangfu: "kidney",
    syndromeName: "陰虚火旺・腎陰虚",
    syndromeReading: "いんきょかおう・じんいんきょ",
    targetRole: "滋陰降火・清熱鎮驚の井穴",
  },
  lu9: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "lung",
    syndromeName: "肺気虚・宗気不足",
    syndromeReading: "はいききょ・そうきふそく",
    targetRole: "補肺益気・止咳平喘の原穴・脈会",
  },
  lu7: {
    depth: "exterior",
    temp: "cold",
    state: "excess",
    qixueshui: "qixu",
    zangfu: "lung",
    syndromeName: "外感風寒・肺気不宣",
    syndromeReading: "がいかんふうかん・はいきふせん",
    targetRole: "疏風解表・宣肺理気の四総穴・絡穴",
  },
  pc6: {
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "heart",
    syndromeName: "心気鬱結・胃気上逆",
    syndromeReading: "しんきうっけつ・いきじょうぎゃく",
    targetRole: "寧心安神・和胃降逆の八脈交会穴",
  },
  ht7: {
    depth: "interior",
    temp: "heat",
    state: "deficiency",
    qixueshui: "xuexu",
    zangfu: "heart",
    syndromeName: "心血虚・心神不安",
    syndromeReading: "しんけっきょ・しんしんふあん",
    targetRole: "養心安神・清心寧志の原穴",
  },
  cv12: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "spleen",
    syndromeName: "脾胃虚弱・中焦不運",
    syndromeReading: "ひいきじゃく・ちゅうしょうふうん",
    targetRole: "健脾和胃・降逆理気の胃募穴・腑会",
  },
  cv4: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "kidney",
    syndromeName: "腎陽虚・元気虚損",
    syndromeReading: "じんようきょ・げんききょそん",
    targetRole: "温補腎陽・培補元気の小腸募穴",
  },
  cv6: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "spleen",
    syndromeName: "中気不足・気虚無力",
    syndromeReading: "ちゅうきふそく・ききょむりょく",
    targetRole: "大補元気・昇陽挙陥の生気之海",
  },
  gv20: {
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "liver",
    syndromeName: "肝陽上亢・清陽不昇",
    syndromeReading: "かんようじょうこう・せいようふしょう",
    targetRole: "平肝熄風・升陽固脱の諸陽之会",
  },
  gb20: {
    depth: "exterior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "liver",
    syndromeName: "外感風熱・肝火上擾",
    syndromeReading: "がいかんふうねつ・かんかじょうじょう",
    targetRole: "疏風清熱・清頭明目の要穴",
  },
  gb34: {
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "qizhi",
    zangfu: "liver",
    syndromeName: "肝胆湿熱・筋脈拘急",
    syndromeReading: "かんたんしつねつ・きんみゃくこうきゅう",
    targetRole: "疏肝利胆・舒筋通絡の筋会・合穴",
  },
  bl23: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "kidney",
    syndromeName: "腎陽虚・腎虚腰痛",
    syndromeReading: "じんようきょ・じんきょようつう",
    targetRole: "補腎益精・温陽壮腰の背部兪穴",
  },
  bl13: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "lung",
    syndromeName: "肺気虚・風寒束肺",
    syndromeReading: "はいききょ・ふうかんそくはい",
    targetRole: "調補肺気・宣肺理気の背部兪穴",
  },
  bl20: {
    depth: "interior",
    temp: "cold",
    state: "deficiency",
    qixueshui: "qixu",
    zangfu: "spleen",
    syndromeName: "脾気虚・脾胃虚弱",
    syndromeReading: "ひききょ・ひいきじゃく",
    targetRole: "健脾益気・運化水湿の背部兪穴",
  },
  bl40: {
    depth: "interior",
    temp: "heat",
    state: "excess",
    qixueshui: "yuxue",
    zangfu: "kidney",
    syndromeName: "瘀血阻絡・湿熱下注",
    syndromeReading: "おけつそらく・しつねつげちゅう",
    targetRole: "活血去瘀・通絡止痛の四総穴・合穴",
  },
};

/**
 * 経穴のコードや経脈IDから、臨床弁証シミュレーターに適合する連動パラメータを取得する
 */
export function getSimulatorParamsForAcupoint(
  code: string,
  meridianId: string
): TsuboSimulatorLinkInfo {
  const codeKey = code.toLowerCase().trim();

  // 1. 個別最適マッピングが存在すればそれを優先
  if (SPECIAL_POINT_MAP[codeKey]) {
    return SPECIAL_POINT_MAP[codeKey];
  }

  // 2. 経脈ごとの標準推論
  const mId = meridianId.toUpperCase();

  switch (mId) {
    case "LU": // 肺経
      return {
        depth: "interior",
        temp: "cold",
        state: "deficiency",
        qixueshui: "qixu",
        zangfu: "lung",
        syndromeName: "肺気虚・宣降失常",
        syndromeReading: "はいききょ・せんこうしつじょう",
        targetRole: "手太陰肺経の適応病態",
      };
    case "LI": // 大腸経
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qixu",
        zangfu: "lung",
        syndromeName: "大腸湿熱・経絡実熱",
        syndromeReading: "だいちょうしつねつ・けいらくじつねつ",
        targetRole: "手陽明大腸経の適応病態",
      };
    case "ST": // 胃経
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qixu",
        zangfu: "spleen",
        syndromeName: "胃熱熾盛・胃府実熱",
        syndromeReading: "いねつしせい・いふじつねつ",
        targetRole: "足陽明胃経の適応病態",
      };
    case "SP": // 脾経
      return {
        depth: "interior",
        temp: "cold",
        state: "deficiency",
        qixueshui: "qixu",
        zangfu: "spleen",
        syndromeName: "脾気虚・運化不健",
        syndromeReading: "ひききょ・うんかふけん",
        targetRole: "足太陰脾経の適応病態",
      };
    case "HT": // 心経
      return {
        depth: "interior",
        temp: "heat",
        state: "deficiency",
        qixueshui: "xuexu",
        zangfu: "heart",
        syndromeName: "心血虚・心陰不足",
        syndromeReading: "しんけっきょ・しんいんふそく",
        targetRole: "手少陰心経の適応病態",
      };
    case "SI": // 小腸経
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qizhi",
        zangfu: "heart",
        syndromeName: "心火移熱小腸",
        syndromeReading: "しんかいねつしょうちょう",
        targetRole: "手太陽小腸経の適応病態",
      };
    case "BL": // 膀胱経
      return {
        depth: "exterior",
        temp: "cold",
        state: "excess",
        qixueshui: "shuitai",
        zangfu: "kidney",
        syndromeName: "外感風寒・太陽経病",
        syndromeReading: "がいかんふうかん・たいようけいびょう",
        targetRole: "足太陽膀胱経の適応病態",
      };
    case "KI": // 腎経
      return {
        depth: "interior",
        temp: "cold",
        state: "deficiency",
        qixueshui: "yangxu",
        zangfu: "kidney",
        syndromeName: "腎陽虚・命門火衰",
        syndromeReading: "じんようきょ・めいもんかすい",
        targetRole: "足少陰腎経の適応病態",
      };
    case "PC": // 心包経
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qizhi",
        zangfu: "heart",
        syndromeName: "熱入心包・胸中鬱滞",
        syndromeReading: "ねつにゅうしんぽう・きょうちゅううったい",
        targetRole: "手厥陰心包経の適応病態",
      };
    case "TE": // 三焦経
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "shuitai",
        zangfu: "liver",
        syndromeName: "三焦気滞・少陽病証",
        syndromeReading: "さんしょうきたい・しょうようびょうしょう",
        targetRole: "手少陽三焦経の適応病態",
      };
    case "GB": // 胆経
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qizhi",
        zangfu: "liver",
        syndromeName: "少陽胆熱・肝胆鬱火",
        syndromeReading: "しょうようたんねつ・かんたんうっか",
        targetRole: "足少陽胆経の適応病態",
      };
    case "LR": // 肝経
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qizhi",
        zangfu: "liver",
        syndromeName: "肝気鬱結・疏泄不暢",
        syndromeReading: "かんきうっけつ・そせつふちょう",
        targetRole: "足厥陰肝経の適応病態",
      };
    case "CV": // 任脈
      return {
        depth: "interior",
        temp: "cold",
        state: "deficiency",
        qixueshui: "qixu",
        zangfu: "spleen",
        syndromeName: "任脈虚損・陰気不足",
        syndromeReading: "にんみゃくきょそん・いんきふそく",
        targetRole: "任脈（陰経の海）の適応病態",
      };
    case "GV": // 督脈
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qizhi",
        zangfu: "kidney",
        syndromeName: "督脈阻滞・諸陽不通",
        syndromeReading: "とくみゃくそたい・しょようふつう",
        targetRole: "督脈（陽経の海）の適応病態",
      };
    default:
      return {
        depth: "interior",
        temp: "heat",
        state: "excess",
        qixueshui: "qizhi",
        zangfu: "liver",
        syndromeName: "気機阻滞・経絡不通",
        syndromeReading: "ききそたい・けいらくふつう",
        targetRole: "局所通絡・経絡調整穴",
      };
  }
}
