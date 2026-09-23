import { AcupointMaster, BodyPart } from "./types";

/**
 * 禁鍼穴（刺鍼が絶対禁忌・厳禁の経穴）
 */
export function isContraindicatedNeedle(codeLower: string): boolean {
  // 神闕（へそ中央：感染・腹膜炎リスク）、乳中（乳頭中央：刺激禁忌）
  return ["cv8", "st17"].includes(codeLower);
}

/**
 * 禁灸穴（直接灸・施灸が原則禁忌または避けるべき経穴）
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
 * 妊娠中に強い刺激（深刺・強圧・長時間の灸）が禁忌となる経穴（子宮収縮・陣痛誘発リスク）
 */
export function isPregnancyContraindicated(codeLower: string, bodyPart?: BodyPart): boolean {
  // 古典および現代臨床で代表的な妊婦禁忌・慎重穴
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
    // 任脈胸部
    "cv16", "cv17", "cv18", "cv19", "cv20", "cv21", "cv22", // 中庭〜天突
    // 督脈背部
    "gv9", "gv10", "gv11", "gv12", "gv13", "gv14", // 至陽〜大椎
  ];

  if (chestBackCodes.includes(codeLower)) return true;

  // locationDetailに肋間や鎖骨上窩が含まれる場合
  if (locationDetail && (locationDetail.includes("肋間") || locationDetail.includes("鎖骨上窩") || locationDetail.includes("鎖骨下窩"))) {
    return true;
  }

  return false;
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
    "cv22", // 天突
    "gb20", // 風池（内側深刺注意）
    "bl10", // 天柱
  ].includes(codeLower);
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
export function generatePitfalls(master: AcupointMaster): string {
  const code = master.codeLower;

  // 1. 神闕（CV8）
  if (code === "cv8") {
    return "【刺鍼厳禁（禁鍼穴）】臍中央部は皮下組織が極めて薄く、腹膜や腸管に直結するため刺鍼は絶対禁忌です。伝統的・現代的にも温灸（塩灸・箱灸・温熱シート）による温補、または軽度の指圧（軽擦）のみ行います。";
  }

  // 2. 乳中（ST17）
  if (code === "st17") {
    return "【鍼灸絶対禁忌（禁鍼・禁灸穴）】乳頭中心は刺鍼・施灸ともに禁忌です。本穴は胸部および腹部の取穴基準（第4肋間、前正中線の外方4寸）として骨度法・触診の目印にのみ使用し、一切の物理的刺激は行いません。";
  }

  // 3. 延髄リスク（風府・唖門）
  if (isBrainstemRisk(code)) {
    return "【上方深刺厳禁・延髄損傷リスク】針先を上方（頭蓋腔方向）へ向けたり深刺すると、大後頭孔から延髄に達し生命中枢を損傷する重大事故のリスクがあります。取穴時は患者の頚部を前屈させず中間位に保ち、針先は鼻尖または軽度下方へ向けて愛護的に浅刺します。";
  }

  // 4. 眼周囲（禁灸・眼球損傷注意）
  if (["bl1", "st1", "te23", "gb1", "st2"].includes(code)) {
    return "【禁灸・眼球損傷注意】眼球熱傷や火傷痕防止のため施灸は禁忌です。刺鍼時も眼球を傷つけないよう指腹で眼球を優しく上方に押し上げ、眼窩壁に沿って愛護的に直刺〜斜刺します。深刺や強刺激・雀啄術は厳禁です。";
  }

  // 5. 頸部・喉元（頸動脈洞・迷走神経）
  if (isNeckCarotidRisk(code)) {
    if (code === "cv22") {
      return "【直刺厳禁・気管及び大動脈弓注意】胸骨上窩中央にあるため、直刺すると気管前壁を穿刺します。刺針時はまず直刺でわずか2〜3分刺入後、針尖を胸骨柄の背面に沿わせて下方へ愛護的に進めます。深刺は厳禁です。";
    }
    return "【直刺深刺厳禁・頸動脈洞反射注意】総頸動脈の拍動部や迷走神経に近接します。動脈直上への刺入や過度な圧迫は急激な血圧低下・徐脈（頸動脈洞反射）や皮下血腫を招く危険があるため、指先で動脈を外側に除けて拍動を避け、愛護的に浅刺します。";
  }

  // 6. 気胸リスク（胸郭・肩井・背部兪穴など）
  if (isChestBackPneumothoraxRisk(code, master.bodyPart, master.locationDetail)) {
    return "【直刺深刺禁忌・気胸リスク】直刺で深く刺入すると胸膜・肺実質を穿刺して外傷性気胸を引き起こす重大な危険があります。必ず肋骨や鎖骨の骨面を指先で確認し、肋骨に沿って外方へ向けた斜刺または横刺（皮下浅刺）にとどめ、直刺・深刺は厳禁です。セルフケアの指圧時も肋間を強く押し込まないようにしてください。";
  }

  // 7. 動脈拍動部
  if (isMajorArteryRisk(code)) {
    return "【動脈拍動部・皮下血腫注意】太い動脈の拍動部に近接するため、取穴時に必ず指先で血管拍動を確認し、動脈壁の直撃を避けて斜刺または愛護的に刺入します。抜針後は十分な圧迫止血を行ってください。関節屈側への直接有痕灸も禁忌です。";
  }

  // 8. 妊婦禁忌穴（合谷・三陰交・肩井・太衝・至陰・下腹部・腰仙部等）
  if (isPregnancyContraindicated(code, master.bodyPart)) {
    return "【妊娠中強刺激禁忌・位置特定】強い降気・活血作用および骨盤内充血により子宮収縮を促す恐れがあるため、妊娠中の強刺激（深刺・強雀啄・長時間の温灸・強圧迫）は禁忌とされます。隣接する骨縁を正確に捉え、愛護的に刺激量を調節してください。";
  }

  // 9. 部位別デフォルト
  switch (master.bodyPart) {
    case "頭部・顔面":
      return "【頭蓋骨膜・内出血留意】頭蓋骨上にあるため直刺は骨膜痛を誘発します。皮膚に沿った斜刺または横刺（皮下刺）で行います。顔面部は細鍼を用い、皮下出血（内出血）を防ぐため抜針時は局所を軽く圧迫止血します。目の周囲への直接施灸は避けてください。";
    case "背中・腰":
      return "【肋骨・脊椎棘突起指標】直刺による深刺を避け、脊椎棘突起や肋骨の骨性指標を指先で確認した上で、脊柱方向または肋骨に沿って斜刺します。腰部深層の腎臓穿刺を防ぐため、季肋部下縁付近の深刺にも留意します。";
    case "胸・腹":
      return "【臓器穿刺回避・浅刺厳守】腹膜・内臓（肝・脾・充満した膀胱）への穿刺事故を防ぐため、排尿後に取穴し、刺針は腹壁筋層内にとどめ深刺を避けます。胸郭部では肋骨面を確認し気胸を防止します。";
    case "手・腕":
    case "足・脚":
      return "【骨膜直撃回避・腱間隙取穴】骨の際や腱の間隙を正確に指先で触知して取穴します。骨膜への直撃による強い痛みを避け、腱そのものを無理に貫通させず、組織のわずかな陥凹部に愛護的にアプローチします。";
    default:
      return "周囲の動脈拍動および重要神経幹の走向に留意し、直刺・斜刺の角度を適切に保ち、過度な深刺を避けて愛護的に取穴します。";
  }
}

/**
 * 臨床上の禁忌・安全留意事項（caution）を補完
 */
export function generateCaution(master: AcupointMaster): string {
  if (master.caution && master.caution.trim().length > 0) {
    return master.caution;
  }

  const code = master.codeLower;
  if (code === "cv8") {
    return "【禁鍼穴】臍中央への刺鍼は絶対禁忌。温灸（間接灸）または軽擦のみ適応。";
  }
  if (code === "st17") {
    return "【禁鍼・禁灸穴】乳頭中心への刺鍼・施灸はともに絶対禁忌。指標としてのみ使用。";
  }
  if (isBrainstemRisk(code)) {
    return "【上方深刺厳禁】大後頭孔から延髄を損傷する危険があるため、上方への刺針は絶対禁忌。愛護的に浅刺すること。";
  }
  if (isChestBackPneumothoraxRisk(code, master.bodyPart, master.locationDetail)) {
    return "【気胸リスク・深刺禁忌】直刺深刺は胸膜・肺を損傷し気胸を起こす危険があるため厳禁。肋骨に沿った浅刺（斜刺・横刺）を厳守。";
  }
  if (isNeckCarotidRisk(code)) {
    return "【頸動脈洞・迷走神経注意】頸動脈拍動直上への刺入や強圧迫は血圧低下・徐脈の危険があるため避けること。直刺深刺厳禁。";
  }
  if (isPregnancyContraindicated(code, master.bodyPart)) {
    return "【妊娠中注意】子宮収縮を促す作用があるため、妊娠中の強刺激（深刺・強雀啄・長時間の灸）は避けること。";
  }
  if (isContraindicatedMoxa(code)) {
    return "【施灸禁忌・注意】眼球熱傷や火傷痕予防、大血管損傷防止のため、直接灸は避けること。";
  }
  if (master.bodyPart === "胸・腹") {
    return "内臓（腹膜・膀胱等）への深刺穿刺を避けるため、排尿後に取穴し腹壁筋層内にとどめること。";
  }
  return "周囲の動脈拍動部や重要神経の走向を確認し、過度な深刺や強刺激を避けて愛護的に施術すること。";
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
    if (cleanDetail.includes("肋間") || cleanDetail.includes("鎖骨")) {
      step2 = "鎖骨や鎖骨下窩、肋骨を触知して第何肋間かを正確に数え、前正中線（胸骨中心線）からの距離（寸）を定めます。";
    } else if (cleanDetail.includes("臍") || cleanDetail.includes("腹")) {
      step2 = "前正中線、臍（へそ）、胸骨体下端（剣状突起）または恥骨結合上縁を基準線として特定します。";
    } else {
      step2 = "前胸部・腹部の骨性指標（鎖骨・肋骨・胸骨・恥骨結合）と正中線を基準に指標を定めます。";
    }
  } else if (master.bodyPart === "背中・腰") {
    step2 = "脊椎棘突起（大椎・肩甲棘・肩甲骨下角・腸骨稜など）の高さを触診し、後正中線からの寸法を定めます。";
  } else if (master.bodyPart === "首・肩") {
    step2 = "頸椎棘突起、胸鎖乳突筋、肩甲棘、鎖骨などの骨・筋の境界を目印として触診します。";
  } else if (master.bodyPart === "頭部・顔面") {
    step2 = "前後正中線、髪の生え際（前髪際・後髪際）、外眼角、耳介、眉毛などの体表指標を基準線とします。";
  } else if (master.bodyPart === "手・腕") {
    step2 = "手関節横紋、肘窩横紋、橈骨・尺骨の骨縁、または前腕の腱（長掌筋腱・橈側手根屈筋腱など）を触知して基準線を設定します。";
  } else {
    // 足・脚
    step2 = "脛骨・腓骨の骨縁、内果・外果（くるぶし）、アキレス腱、膝蓋骨などの骨性指標を触知し、高さを測ります。";
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

  switch (master.bodyPart) {
    case "胸・腹":
      if (master.locationDetail.includes("肋間")) {
        landmarks.push("鎖骨および鎖骨下窩");
        landmarks.push("肋骨・肋間隙の骨性指標");
        landmarks.push("前正中線（胸骨中心線）");
      } else {
        landmarks.push("前正中線および臍（おへそ）");
        landmarks.push("胸骨剣状突起または恥骨結合上縁");
      }
      break;
    case "背中・腰":
      landmarks.push("脊椎棘突起（後正中線）");
      landmarks.push("肩甲骨（肩甲棘・下角）または腸骨稜");
      landmarks.push("脊柱起立筋の筋膨隆部");
      break;
    case "首・肩":
      landmarks.push("胸鎖乳突筋の前縁・後縁");
      landmarks.push("頸椎棘突起および肩甲骨上角");
      break;
    case "頭部・顔面":
      landmarks.push("前後正中線および髪際（生え際）");
      landmarks.push("眼窩縁・頬骨・下顎骨の骨縁");
      break;
    case "手・腕":
      landmarks.push("橈骨・尺骨の骨縁");
      landmarks.push("手関節背側／掌側横紋または肘窩横紋");
      landmarks.push("前腕屈筋・伸筋腱間隙");
      break;
    case "足・脚":
      landmarks.push("脛骨・腓骨の骨縁");
      landmarks.push("内果・外果（くるぶし）またはアキレス腱");
      landmarks.push("膝蓋骨および膝窩横紋");
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
    locationText = `「${point.name}（${point.code}）」は、WHO（世界保健機関）の国際標準取穴部位において「${cleanDetail}」と定められています。`;
  } else {
    locationText = `「${point.name}（${point.code}）」は、目安として${cleanSimple}に位置します。WHOの標準部位規定では「${cleanDetail}」と定義されています。`;
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
  const code = point.codeLower;
  const sections: string[] = [];

  // 1. 部位・経穴固有の注意・禁忌
  if (code === "cv8") {
    sections.push("【重要：刺鍼厳禁】おへその中心は刺鍼が絶対禁忌です。セルフケアでは温熱シートやお腹用の温灸（間接灸）でじんわり優しく温めるか、手のひらで時計回りに軽くなでる（軽擦）のみにしてください。");
  } else if (code === "st17") {
    sections.push("【重要：鍼灸絶対禁忌】乳頭部は刺鍼・施灸ともに禁忌部位です。指圧や強い刺激も避け、マッサージ等の対象にしないでください。");
  } else if (isContraindicatedMoxa(code)) {
    sections.push("【施灸禁忌・注意】目の周囲や皮膚の薄い部位、血管の直上にあるため、ご家庭での施灸（お灸）は火傷や組織損傷のリスクがあり禁忌（お控えください）です。セルフケアは指圧のみを愛護的に行ってください。");
  } else if (isPregnancyContraindicated(code, point.bodyPart)) {
    sections.push("【妊娠中の方へ】当穴は子宮収縮を促す作用があるため、妊娠中（特に安定期前や臨月前）の強い指圧やお灸は禁忌です（刺激を避けてください）。");
  } else if (isChestBackPneumothoraxRisk(code, point.bodyPart, point.locationDetail)) {
    sections.push("【胸背部の注意】肋骨や深部の胸膜・肺組織に近接するため、強い力で骨を押し込むような圧迫は避けてください。指腹を使って皮膚をやさしく沈める程度に留めます。");
  } else if (isNeckCarotidRisk(code)) {
    sections.push("【頸部・血管の注意】太い動脈（頸動脈）や自律神経（迷走神経）が通る部位です。強く圧迫するとめまいや血圧低下の原因になるため、指先でやさしく触れるソフトな刺激にしてください。");
  } else if (point.caution && point.caution.trim().length > 0) {
    const cleanCaution = point.caution.replace(/。+$/, "").trim();
    sections.push(`【留意事項】${cleanCaution}。`);
  }

  // 2. 指圧の具体的なコツ
  sections.push("【指圧のコツ】息をゆっくり吐きながら3〜5秒かけて「痛気持ちいい」と感じる強さでじんわり押し、吸いながらゆっくり力を抜きます。無理に強い力でゴリゴリ揉むと筋組織を傷めたり揉み返しの原因になります。");

  // 3. お灸の具体的なコツ（禁灸穴でない場合）
  if (!isContraindicatedMoxa(code) && code !== "cv8" && code !== "st17") {
    sections.push("【お灸のコツ】ご家庭でのセルフケアには市販の台座灸（せんねん灸など）が適しています。熱さを我慢すると水ぶくれや低温やけどの原因になりますので、ピリッと熱さを感じたら我慢せずすぐに外すか位置をずらしてください。");
  }

  // 4. 共通の禁止事項
  sections.push("【共通の禁止事項】食後30分以内、飲酒後、発熱時、入浴直前後の強い刺激や、皮膚に傷・湿疹・腫れがある部位への刺激はお控えください。");

  return sections.join("\n\n");
}
