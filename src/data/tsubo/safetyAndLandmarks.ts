import { AcupointMaster, BodyPart } from "./types";

/**
 * 禁鍼穴（刺鍼が絶対禁忌・厳禁の経穴）
 */
export function isContraindicatedNeedle(codeLower: string): boolean {
  // 神闕（へそ中央：感染・腹膜炎リスク）、乳中（乳頭中央：刺激禁忌）
  return ["cv8", "st17"].includes(codeLower);
}

/**
 * 自己判断の施灸を避ける部位の学習用索引。
 * あらゆる施灸法が現代の一律禁忌という判定ではない。
 */
export function isContraindicatedMoxa(codeLower: string): boolean {
  // 乳中、眼球周囲（睛明、承泣、球後、糸竹空、瞳子髎、四白など火傷・眼球熱傷リスク）
  // および関節屈側の大血管上直接灸（委中、尺沢、曲沢など）
  return [
    "st17",
    "bl1", "st1", "te23", "gb1", "st2",
    "bl40", "lu5", "pc3",
  ].includes(codeLower);
}

/**
 * 妊娠中に伝統的な慎重穴として扱われる経穴の索引。
 * この一覧は子宮収縮作用の立証でも、安全な経穴のホワイトリストでもない。
 * JSAM 2025は、妊婦への強刺激を部位を問わず避けるよう求めている。
 */
export function isPregnancyContraindicated(codeLower: string, bodyPart?: BodyPart): boolean {
  // 既存呼び出しとの互換引数。体表部位だけで伝統的慎重穴の分類は決定しない。
  void bodyPart;
  // 伝統的禁忌・慎重穴と、腹部・腰仙部の注意部位を含む既存の学習用索引。
  const strictCodes = [
    "li4",  // 合谷
    "sp6",  // 三陰交
    "gb21", // 肩井
    "bl60", // 昆侖
    "bl67", // 至陰
    "lr3",  // 太衝
    "cv3", "cv4", "cv5", "cv6", "cv7", // 下腹部任脈
    "st25", "st28", "st29", "st30",     // 天枢、水道、帰来、気衝
    "sp12", "sp13", "sp14", "sp15",
    "ki11", "ki12", "ki13", "ki14",
    "bl31", "bl32", "bl33", "bl34",     // 八髎穴（上髎、次髎、中髎、下髎）
    "bl26", "bl27", "bl28", "bl29", "bl30", // 関元兪、白環兪等
    "gv3",  // 腰陽関
  ];
  return strictCodes.includes(codeLower);
}

/**
 * 気胸リスク部位（直刺深刺による胸膜・肺実質穿刺の危険がある経穴）
 */
export function isChestBackPneumothoraxRisk(codeLower: string, bodyPart?: BodyPart, locationDetail?: string): boolean {
  // 肺・胸郭周囲の経穴
  const chestBackCodes = [
    // 肺経
    "lu1", "lu2", // 中府、雲門
    // 胃経（鎖骨上窩〜前胸部）
    "st12", "st13", "st14", "st15", "st16", "st18", // 缺盆、気戸〜乳根
    // 脾経胸部
    "sp17", "sp18", "sp19", "sp20", "sp21", // 食竇〜大包
    // 心経
    "ht1", // 極泉（深刺で胸郭・腋窩動脈）
    // 膀胱経（背部兪穴：第1肋間〜第12肋骨レベル）
    "bl11", "bl12", "bl13", "bl14", "bl15", "bl16", "bl17", "bl18", "bl19", "bl20", "bl21",
    "bl41", "bl42", "bl43", "bl44", "bl45", "bl46", "bl47", "bl48", "bl49", "bl50",
    // 胆経
    "gb21", "gb22", "gb23", "gb24", "gb25", // 肩井、淵腋、輒筋、日月、京門
    // 肝経
    "lr14", "lr13", // 期門、章門
  ];

  if (chestBackCodes.includes(codeLower)) return true;

  // 任脈胸骨上および督脈正中は独立リスク判定するため気胸からは除外
  if (["cv16", "cv17", "cv18", "cv19", "cv20", "cv21", "gv9", "gv10", "gv11", "gv12", "gv13", "gv14"].includes(codeLower)) {
    return false;
  }

  // locationDetailに肋間や鎖骨上窩が含まれる場合
  if (locationDetail && (locationDetail.includes("肋間") || locationDetail.includes("鎖骨上窩") || locationDetail.includes("鎖骨下窩"))) {
    return true;
  }

  return false;
}

/**
 * 胸骨正中穴（胸骨体・胸骨柄骨膜上平刺・胸骨孔変異注意）
 */
export function isSternalRisk(codeLower: string): boolean {
  return ["cv16", "cv17", "cv18", "cv19", "cv20", "cv21"].includes(codeLower);
}

/**
 * 脊椎後正中・棘突起間穴（黄靭帯貫通・硬膜外腔・脊髄損傷注意）
 */
export function isSpinalCordRisk(codeLower: string): boolean {
  return [
    "gv3",  // 腰陽関
    "gv4",  // 命門
    "gv5",  // 懸枢
    "gv6",  // 脊中
    "gv7",  // 中枢
    "gv8",  // 筋縮
    "gv9",  // 至陽
    "gv10", // 霊台
    "gv11", // 神道
    "gv12", // 身柱
    "gv13", // 陶道
    "gv14", // 大椎
  ].includes(codeLower);
}

/**
 * 頸部・喉元（総頸動脈・内頸静脈・迷走神経・頸動脈洞反射リスク）
 */
export function isNeckCarotidRisk(codeLower: string): boolean {
  return [
    "st9",  // 人迎
    "st10", // 水突
    "st11", // 気舎
    "li17", // 天鼎
    "li18", // 扶突
    "si16", // 天窓
    "si17", // 天容
  ].includes(codeLower);
}

/**
 * 後頭下部・風池天柱（内側深刺・椎骨動脈注意）
 */
export function isSuboccipitalRisk(codeLower: string): boolean {
  return ["gb20", "bl10", "gb12"].includes(codeLower);
}

/**
 * 延髄・生命中枢近接部（大後頭孔・上方深刺絶対厳禁）
 */
export function isBrainstemRisk(codeLower: string): boolean {
  return ["gv15", "gv16"].includes(codeLower); // 唖門、風府
}

/**
 * 主要動脈拍動部（四肢の動脈穿刺・血腫注意）
 */
export function isMajorArteryRisk(codeLower: string): boolean {
  return [
    "lu9",  // 太淵（橈骨動脈）
    "lu8",  // 経渠（橈骨動脈）
    "ht1",  // 極泉（腋窩動脈）
    "ht3",  // 少海（上腕動脈近接）
    "lu5",  // 尺沢（上腕動脈近接）
    "pc3",  // 曲沢（上腕動脈近接）
    "ki3",  // 太渓（後脛骨動脈）
    "sp12", // 衝門（大腿動脈）
    "lr10", // 足五里（大腿動脈）
    "lr12", // 急脈（陰部・大腿血管）
    "st42", // 衝陽（足背動脈）
    "bl40", // 委中（膝窩動静脈）
  ].includes(codeLower);
}

/**
 * 位置混同・取穴の注意点（pitfalls）を動的に生成
 */
export const ACUPOINT_PROCEDURE_REVIEW_STATUS = "pending_expert_review" as const;

/** JSAM 2025の注意事項を学習用に要約。個別の刺鍼条件を指定する関数ではない。 */
export function generatePitfalls(master: AcupointMaster): string {
  const code = master.codeLower;
  if (code === "cv8") {
    return "【臍部への刺鍼は禁止】臍中央への刺鍼は行いません。温熱刺激にも熱傷リスクがあり、禁鍼だからお灸は安全とは判断できません。";
  }
  if (code === "st17") {
    return "【乳頭への刺鍼は禁止】乳中は乳頭中央を示す指標です。乳頭への刺鍼や、熱傷・灸痕を残す施灸は行いません。乳頭の位置には個人差があります。";
  }
  if (isBrainstemRisk(code) || isSuboccipitalRisk(code)) {
    return "【後頸部の血管・中枢神経に注意】延髄・脊髄や椎骨動脈を損傷するおそれがあります。鼻尖や対側の眼などの外から見える目印だけでは安全な針路は決まりません。";
  }
  if (["bl1", "st1", "te23", "gb1", "st2"].includes(code)) {
    return "【眼球・眼窩周囲の損傷に注意】眼球への刺鍼は禁止されており、周囲への施術にも特別な注意が必要です。自分で眼球を押したり鍼・お灸を使ったりしないでください。";
  }
  if (code === "cv22" || isNeckCarotidRisk(code)) {
    return "【頸部の血管・神経・気管に注意】気管や重要な血管・神経などが近接します。動脈を指で押しのければ安全に刺鍼できるという説明は適切ではありません。頸部の拍動部を強く圧迫しないでください。";
  }
  if (isSternalRisk(code)) {
    return "【胸骨裂孔に注意】胸骨に孔がある解剖学的変異では、心臓などへの損傷リスクがあります。胸骨があることや骨を触れることを安全の保証にしてはいけません。";
  }
  if (isSpinalCordRisk(code)) {
    return "【脊柱管・神経の損傷に注意】靭帯の抵抗感や模式図の深さだけで、針先の位置・安全限界を確認できるわけではありません。局所解剖、体格、姿勢による違いがあります。";
  }
  if (isChestBackPneumothoraxRisk(code, master.bodyPart, master.locationDetail)) {
    return "【胸郭周囲の気胸・血胸リスク】胸膜・肺や肋間血管の損傷に注意が必要です。斜めに刺すことや特定の寸数に収めることだけでは安全を保証できません。施術後の胸痛・息苦しさは速やかに受診し、強い呼吸困難は119番へ連絡してください。";
  }
  if (isMajorArteryRisk(code)) {
    return "【血管損傷・出血に注意】大血管への刺鍼は禁止されており、周囲の施術にも注意が必要です。出血性疾患や抗凝血薬の使用などを確認し、個別に施術の適否を判断します。薬は自己判断で中止しないでください。";
  }
  if (isPregnancyContraindicated(code, master.bodyPart)) {
    return "【妊娠中の伝統的慎重穴】妊娠中に慎重に扱われてきた経穴ですが、経穴名だけで子宮収縮作用や安全性を断定できません。妊娠中は部位を問わず強刺激を避け、自己施術を始める前に産科の担当者と資格を持つ施術者へ相談してください。";
  }
  return "【個別評価が必要】取穴の寸は体表位置を示すための尺度で、安全な刺入深度を示しません。角度・深度は体格や局所解剖などで変わるため、この教材を実技指示に使用しないでください。";
}

/** 臓器・血管・神経のリスクを、固定した穿刺手順を伴わず表示する。 */
export function generateCaution(master: AcupointMaster): string {
  const general = "妊娠中は部位を問わず強刺激を避けます。妊娠、出血性疾患、抗凝血薬の使用、感染や皮膚の異常などは施術前に担当者へ伝えてください。";
  return [generatePitfalls(master), general].join(" ");
}

/**
 * ステップバイステップ取穴手順（howToLocate）を生成（重複完全排除・3ステップ）
 */
export function generateHowToLocate(master: AcupointMaster): string[] {
  const cleanDetail = master.locationDetail.replace(/。$/, "");

  // Step 1: 体位と経脈の流注
  const step1 = `患者にリラックスした適切な姿勢（仰臥位・伏臥位・座位等）をとらせ、${master.meridian}の流注に沿って該当部位の皮膚や筋緊張を触診します。`;

  // Step 2: 解剖学的ランドマーク（指標）の確認
  let step2 = "";
  if (master.bodyPart === "胸・腹") {
    if (cleanDetail.includes("胸骨") || ["cv16", "cv17", "cv18", "cv19", "cv20", "cv21"].includes(master.codeLower)) {
      step2 = "胸骨柄・胸骨角（第2肋軟骨結合部）および第4肋間（両乳頭間）を目印として、前正中線上の胸骨体を同定します。";
    } else if (cleanDetail.includes("肋間") || cleanDetail.includes("鎖骨")) {
      step2 = "鎖骨や鎖骨下窩、肋骨を触知して第何肋間かを正確に数え、前正中線（胸骨中心線）からの距離（寸）を定めます。";
    } else if (cleanDetail.includes("臍") || cleanDetail.includes("腹")) {
      step2 = "前正中線、臍（へそ）、胸骨体下端（剣状突起）または恥骨結合上縁を基準線として特定します。";
    } else {
      step2 = "前胸部・腹部の骨性指標（鎖骨・肋骨・胸骨・恥骨結合）と正中線を基準に指標を定めます。";
    }
  } else if (master.bodyPart === "背中・腰") {
    if (["gv3", "gv4", "gv5", "gv6", "gv7", "gv8", "gv9", "gv10", "gv11", "gv12", "gv13", "gv14"].includes(master.codeLower)) {
      step2 = "患者に軽度前屈位をとらせ、後正中線上で第7頸椎・肩甲棘（Th3）・肩甲骨下角（Th7）・ヤコビー線（L4）の高さを指標に、該当する棘突起間のくぼみを触知します。";
    } else if (cleanDetail.includes("腰") || cleanDetail.includes("仙") || cleanDetail.includes("腸骨")) {
      step2 = "左右の腸骨稜の最高点を結ぶヤコビー線（第4腰椎棘突起）、または仙骨角・後上腸骨棘を目印に位置を定めます。";
    } else {
      step2 = "脊椎棘突起（大椎・肩甲棘・肩甲骨下角）の高さを触診し、後正中線からの側方寸法（1.5寸または3寸ライン）を定めます。";
    }
  } else if (master.bodyPart === "首・肩") {
    step2 = "頸椎棘突起、胸鎖乳突筋、肩甲棘、鎖骨などの骨・筋の境界を目印として触診します。";
  } else if (master.bodyPart === "頭部・顔面") {
    step2 = "前後正中線、髪の生え際（前髪際・後髪際）、外眼角、耳介、眉毛などの体表指標を基準線とします。";
  } else if (master.bodyPart === "手・腕") {
    if (cleanDetail.includes("中手骨") || cleanDetail.includes("手背") || cleanDetail.includes("手掌") || cleanDetail.includes("指") || cleanDetail.includes("爪甲")) {
      step2 = "中手骨の骨頭・骨底、手根骨、中手骨間隙の陥凹部を指先で丹念に触知して基準点を定めます。";
    } else if (cleanDetail.includes("腋窩") || master.codeLower === "ht1") {
      step2 = "上肢を軽度外転（挙上）させ、大胸筋下縁（腋窩前ヒダ）と広背筋下縁（腋窩後ヒダ）の間の陥凹部中央、腋窩動脈拍動部を触知します。";
    } else if (
      ["lu5", "pc3", "ht3", "li11", "li12", "si8", "te10"].includes(master.codeLower) ||
      (cleanDetail.includes("肘") && !cleanDetail.includes("下方") && !cleanDetail.includes("前腕"))
    ) {
      step2 = "肘関節を軽度屈曲させ、肘窩横紋、上腕二頭筋腱（橈側・尺側縁）、上腕骨内側上顆・外側上顆、または肘頭（ひじの突起骨）を触知して位置を定めます。";
    } else if (cleanDetail.includes("上腕") || cleanDetail.includes("三角筋") || ["lu3", "lu4", "pc2", "ht2", "li13", "li14", "te11", "te12", "te13"].includes(master.codeLower)) {
      if (cleanDetail.includes("後面") || ["te11", "te12", "te13"].includes(master.codeLower)) {
        step2 = "肩峰角と肘頭を結ぶ基準線上で、上腕三頭筋筋腹・腱および三角筋後縁を指標として高さを定めます。";
      } else {
        step2 = "肘を軽く曲げて上腕二頭筋（力こぶ）を緊張させ、筋腹の内側縁・外側縁、または上腕動脈拍動部（内側溝）を触知して高さを定めます。";
      }
    } else {
      step2 = "手関節横紋、前腕の橈骨・尺骨の骨縁、または前腕屈筋・伸筋腱間隙を触知して基準線を設定します。";
    }
  } else {
    // 足・脚
    if (cleanDetail.includes("中足骨") || cleanDetail.includes("足底") || cleanDetail.includes("足背") || cleanDetail.includes("趾")) {
      step2 = "第1〜第5中足骨底の結合部、足背動脈の拍動部、または足底腱膜の緊張部を触知して基準点を定めます。";
    } else if (cleanDetail.includes("臀") || cleanDetail.includes("大転子") || cleanDetail.includes("仙骨裂孔")) {
      step2 = "股関節を軽度屈曲させ、大転子の頂点と仙骨裂孔（または上前腸骨棘・坐骨結節）を結ぶ基準線を触知します。";
    } else if (cleanDetail.includes("大腿") || cleanDetail.includes("股")) {
      step2 = "膝蓋骨底（お皿の上縁）、上前腸骨棘、大腿四頭筋（大腿直筋・外側広筋・内側広筋）の筋腹・腱縁を指標とします。";
    } else if (cleanDetail.includes("膝蓋") || cleanDetail.includes("膝関節") || cleanDetail.includes("膝窩")) {
      step2 = "膝関節裂隙、膝蓋骨下縁（膝蓋靭帯）、または膝窩横紋（半腱様筋腱・大腿二頭筋腱）を触知して高さを定めます。";
    } else {
      step2 = "脛骨前縁・内側面、腓骨骨縁、内果・外果（くるぶし）、アキレス腱などの骨性指標を触知し、高さを測ります。";
    }
  }

  // Step 3: WHO標準位置に基づく決定と反応点の触診
  const step3 = `WHO標準部位（${cleanDetail}）を指標とし、指腹で丁寧に骨際や筋間の陥凹部を探り、圧迫時に特有の響き（酸脹感）や緊張・くぼみを感じる部位に決定します。`;

  return [step1, step2, step3];
}

/**
 * 触診ランドマーク（palpationLandmarks）を自然に生成（重複排除）
 */
export function generatePalpationLandmarks(master: AcupointMaster): string[] {
  const landmarks: string[] = [];
  const detail = master.locationDetail;

  switch (master.bodyPart) {
    case "胸・腹":
      if (detail.includes("胸骨") || ["cv16", "cv17", "cv18", "cv19", "cv20", "cv21"].includes(master.codeLower)) {
        landmarks.push("胸骨体および胸骨角");
        landmarks.push("両側第4肋間（乳頭位）");
        landmarks.push("前正中線");
      } else if (detail.includes("肋間") || detail.includes("鎖骨")) {
        landmarks.push("鎖骨および鎖骨下窩");
        landmarks.push("肋骨・肋間隙の骨性指標");
        landmarks.push("前正中線（胸骨中心線）");
      } else {
        landmarks.push("前正中線および臍（おへそ）");
        landmarks.push("胸骨剣状突起または恥骨結合上縁");
        landmarks.push("腹直筋の内側縁・外側縁");
      }
      break;
    case "背中・腰":
      if (["gv3", "gv4", "gv5", "gv6", "gv7", "gv8", "gv9", "gv10", "gv11", "gv12", "gv13", "gv14"].includes(master.codeLower)) {
        landmarks.push("第7頸椎・胸腰椎の各棘突起");
        landmarks.push("棘突起間隙（棘間靭帯）");
        landmarks.push("後正中線");
      } else if (detail.includes("腰") || detail.includes("仙")) {
        landmarks.push("ヤコビー線（第4腰椎棘突起高位）");
        landmarks.push("腸骨稜最高点および仙骨角");
        landmarks.push("腰部脊柱起立筋群");
      } else {
        landmarks.push("脊椎棘突起（大椎・肩甲棘・下角）");
        landmarks.push("肩甲骨内側縁および肋骨面");
        landmarks.push("脊柱起立筋の筋膨隆部");
      }
      break;
    case "首・肩":
      landmarks.push("胸鎖乳突筋の前縁・後縁");
      landmarks.push("頸椎棘突起および肩甲骨上角");
      landmarks.push("鎖骨上窩および肩井筋結節");
      break;
    case "頭部・顔面":
      landmarks.push("前後正中線および髪際（生え際）");
      landmarks.push("眼窩縁・頬骨・下顎骨の骨縁");
      landmarks.push("耳介前縁・乳様突起");
      break;
    case "手・腕":
      if (detail.includes("中手骨") || detail.includes("手背") || detail.includes("手掌") || detail.includes("指") || detail.includes("爪甲")) {
        landmarks.push("第1〜第5中手骨縁および中手骨底");
        landmarks.push("中手骨間隙（背側骨間筋）");
        landmarks.push("中手指節関節（MP関節）");
      } else if (detail.includes("腋窩") || master.codeLower === "ht1") {
        landmarks.push("腋窩中央の陥凹部および腋窩動脈拍動部");
        landmarks.push("大胸筋下縁（腋窩前ヒダ）");
        landmarks.push("広背筋・大円筋下縁（腋窩後ヒダ）");
      } else if (
        ["lu5", "pc3", "ht3", "li11", "li12", "si8", "te10"].includes(master.codeLower) ||
        (detail.includes("肘") && !detail.includes("下方") && !detail.includes("前腕"))
      ) {
        landmarks.push("肘窩横紋および上腕二頭筋腱（橈側・尺側縁）");
        landmarks.push("上腕骨内側上顆・外側上顆");
        landmarks.push("肘頭（ひじ後面の突起骨）および神経溝");
      } else if (detail.includes("上腕") || detail.includes("三角筋") || ["lu3", "lu4", "pc2", "ht2", "li13", "li14", "te11", "te12", "te13"].includes(master.codeLower)) {
        if (detail.includes("後面") || ["te11", "te12", "te13"].includes(master.codeLower)) {
          landmarks.push("上腕三頭筋筋腹および腱停止部");
          landmarks.push("肩峰角および三角筋後縁");
          landmarks.push("肘頭（ひじの突起骨）の上方指標");
        } else {
          landmarks.push("上腕二頭筋筋腹および内側・外側溝");
          landmarks.push("上腕動脈拍動部（内側溝）");
          landmarks.push("三角筋粗面および肩峰外端");
        }
      } else {
        landmarks.push("前腕の橈骨・尺骨の骨縁および骨間隙");
        landmarks.push("手関節掌側横紋／背側横紋");
        landmarks.push("長掌筋腱・橈側手根屈筋腱の間隙または総指伸筋腱");
      }
      break;
    case "足・脚":
      if (detail.includes("中足骨") || detail.includes("足底") || detail.includes("足背") || detail.includes("趾")) {
        landmarks.push("第1〜第5中足骨底・中足骨頭");
        landmarks.push("足背動脈拍動部または足底腱膜");
        landmarks.push("中足趾節関節（MTP関節）");
      } else if (detail.includes("臀") || detail.includes("大転子") || detail.includes("仙骨裂孔")) {
        landmarks.push("大転子頂点および仙骨裂孔");
        landmarks.push("臀溝（お尻の横じわ）");
        landmarks.push("梨状筋・坐骨結節");
      } else if (detail.includes("大腿")) {
        landmarks.push("膝蓋骨底（お皿の上縁）");
        landmarks.push("上前腸骨棘および大腿直筋");
        landmarks.push("腸脛靭帯後縁または内転筋結節");
      } else {
        landmarks.push("脛骨前縁・内側面および腓骨頭");
        landmarks.push("内果・外果（くるぶし）およびアキレス腱");
        landmarks.push("膝蓋骨下縁・膝蓋靭帯および膝窩横紋");
      }
      break;
    default:
      landmarks.push(`${master.bodyPart}の骨性指標`);
      landmarks.push("局所の筋腱間隙・陥凹部");
  }

  return landmarks;
}

/**
 * FAQ Q1: 「どこにありますか？ 取穴のコツは？」の回答文を生成（重複排除）
 */
export function generateFaqLocationAnswer(point: {
  name: string;
  code: string;
  locationSimple: string;
  locationDetail: string;
  palpationLandmarks?: string[];
}): string {
  const cleanSimple = point.locationSimple.replace(/。+$/, "").trim();
  const cleanDetail = point.locationDetail.replace(/。+$/, "").trim();

  // locationSimple と locationDetail の実質的内容が重複しているか判定
  // 例：「中府（LU1）は、前胸部、第1肋間...」のように locationDetail をほぼ内包している場合
  const isEssentiallySame =
    cleanSimple === cleanDetail ||
    cleanSimple.includes(cleanDetail) ||
    cleanDetail.includes(cleanSimple.replace(/^.*?は、/, ""));

  let locationText = "";
  if (isEssentiallySame) {
    locationText = `「${point.name}（${point.code}）」の体表位置は、標準取穴の学習資料に基づき「${cleanDetail}」と記載しています。個別の原典照合は進行中です。`;
  } else {
    locationText = `「${point.name}（${point.code}）」は、目安として${cleanSimple}に位置します。標準取穴の学習資料では「${cleanDetail}」と記載しています。個別の原典照合は進行中です。`;
  }

  // 触診ランドマーク
  let landmarkPart = "";
  if (point.palpationLandmarks && point.palpationLandmarks.length > 0) {
    // 重複要素を除去
    const uniqueLandmarks = Array.from(new Set(point.palpationLandmarks)).filter(
      (lm) => !lm.includes("の骨性指標・筋腱部") || point.palpationLandmarks!.length === 1
    );
    landmarkPart = `探すコツとしては、基準となる目印（${uniqueLandmarks.join("、")}）から指腹を滑らせ、周囲の皮膚や筋肉と比べてわずかに指先が沈み込む「小さなくぼみ（陥凹）」や、押したときにズーンと奥に心地よく響く場所（酸脹点）を目安に取穴します。`;
  } else {
    landmarkPart = "探すコツとしては、周囲の組織と比べて指先にわずかに感じる陥凹部や、圧迫時に特有のズーンと響く箇所を目安に取穴します。";
  }

  return `${locationText} ${landmarkPart}`;
}

/**
 * FAQ Q3: 「自分で指圧やお灸（セルフケア）をする際の注意点はありますか？」の回答文を生成
 */
export function generateFaqSelfCareAnswer(point: {
  name: string;
  code: string;
  codeLower: string;
  bodyPart: BodyPart;
  locationDetail: string;
  caution?: string;
}): string {
  const sections: string[] = [];
  const code = point.codeLower;
  const sensitiveArea = ["bl1", "st1", "te23", "gb1", "st2", "cv8", "st17", "cv22"].includes(code)
    || isNeckCarotidRisk(code) || isBrainstemRisk(code) || isSuboccipitalRisk(code);
  if (sensitiveArea) {
    sections.push("【重要な構造に近い部位】眼球や頸部の拍動部などを押さず、自己判断でこの部位への鍼・お灸を行わないでください。");
  } else {
    sections.push("【セルフケアの範囲】体表の位置を学ぶための説明です。刺鍼の手順として使用しないでください。指圧で痛み、しびれ、めまいなどが出たら中止します。");
  }
  if (isPregnancyContraindicated(code, point.bodyPart)) {
    sections.push("【妊娠中の伝統的慎重穴】子宮収縮作用が確定しているという意味ではありません。妊娠中はどの部位でも強刺激を避け、産科の担当者と資格を持つ施術者へ相談してください。");
  } else {
    sections.push("【妊娠中】注意穴の一覧にない部位でも、安全が確認されたという意味ではありません。どの部位でも強刺激を避け、刺激を始める前に担当者へ相談してください。");
  }
  sections.push("【熱傷に注意】お灸は台座付き・間接式でも熱傷を起こすことがあります。感覚が低下した皮膚や炎症・傷のある部位では、自己判断で使わないでください。");
  sections.push("【受診を優先する症状】原因不明の発熱、急な強い腹痛、胸痛、息苦しさなどはセルフケアで様子を見ず、医療機関へ相談してください。出血性疾患や抗凝血薬を使用中の方も、担当者に伝えてください。");
  return sections.join("\n\n");
}
