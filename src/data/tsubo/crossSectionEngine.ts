import {
  CrossSectionModel,
  AnatomicalLayer,
  BoundaryLandmark,
  AdjacentStructure,
  SvgAnatomicalElement,
  AcupointMaster,
} from "./types";
import {
  isChestBackPneumothoraxRisk,
  isNeckCarotidRisk,
  isBrainstemRisk,
  isSuboccipitalRisk,
  isSternalRisk,
  isSpinalCordRisk,
  isContraindicatedNeedle,
  isContraindicatedMoxa,
  isPregnancyContraindicated,
} from "./safetyAndLandmarks";

/**
 * 人体解剖断面スライスの体系的識別子（26大スライス）
 */
export type SliceType =
  | "face_anterior"              // 1. 顔面部（四白・地倉・迎香・承泣）
  | "jaw_temporal"               // 2. 側頭・顎関節部（下関・頬車・聴宮・翳風）
  | "head_vertex"                // 3. 頭頂部（百会・四神聡・上星）
  | "neck_posterior"             // 4. 後頭下部・うなじ（風池・天柱・完骨・風府・唖門）
  | "neck_anterior"              // 5. 前頸部・側頸部（人迎・水突・扶突・天容）
  | "neck_suprasternal"          // 6. 胸骨上窩（天突）
  | "shoulder_scapular"          // 7. 肩上部・肩甲部（肩井・天宗・秉風）
  | "shoulder_joint"             // 8. 肩関節部（肩髃・肩髎・臑兪）
  | "arm_brachial"               // 9. 上腕部（天府・侠白・極泉・臂臑・消濼）
  | "forearm_anterior"           // 10. 前腕掌側（内関・郄門・列缺・太淵・神門）
  | "forearm_posterior"          // 11. 前腕背側（外関・支溝・手三里・曲池）
  | "hand_metacarpal"            // 12. 手背・手掌部（合谷・三間・中渚・労宮）
  | "chest_intercostal"          // 13. 前胸部・肋間（中府・雲門・気戸・乳根・期門）
  | "chest_sternal"              // 14. 胸骨体部（膻中・中庭・華蓋）
  | "abdomen_anterior"           // 15. 前腹部（天枢・中脘・関元・気海・神闕）
  | "spine_posterior_median"     // 16. 脊椎後正中・棘突起間（大椎・陶道・身柱・至陽・命門・腰陽関）
  | "back_paravertebral"         // 17. 背部兪穴（肺兪・心兪・膈兪・肝兪・大杼）
  | "lumbar_paravertebral"       // 18. 腰背部・仙骨部（腎兪・大腸兪・八髎穴）
  | "buttock_gluteal"            // 19. 臀部（環跳・秩辺・承扶・胞肓）
  | "thigh_anterior"             // 20. 大腿前外側（伏兎・梁丘・風市・中瀆）
  | "thigh_medial"               // 21. 大腿内側（血海・箕門・陰包・足五里・衝門）
  | "knee_joint"                 // 22. 膝関節部（犢鼻・膝眼・曲泉・陰谷）
  | "lower_leg_anterior"         // 23. 下腿前外側（足三里・上巨虚・豊隆・陽陵泉）
  | "lower_leg_medial"           // 24. 下腿内側（三陰交・陰陵泉・地機・太渓）
  | "lower_leg_posterior"        // 25. 下腿後側・膝窩（委中・承山・合陽・昆侖）
  | "foot_dorsal";               // 26. 足背・足底（太衝・行間・太白・湧泉）

/**
 * 経穴のマスターデータから解剖断面スライスを高精度に分類
 */
export function classifyAcupointSlice(point: AcupointMaster): SliceType {
  const code = point.codeLower;
  const detail = point.locationDetail;
  const bodyPart = point.bodyPart;

  // 1. 特殊・個別穴
  if (code === "cv22") return "neck_suprasternal";
  if (["cv16", "cv17", "cv18", "cv19", "cv20", "cv21"].includes(code)) return "chest_sternal";
  // 督脈脊椎後正中穴（棘突起間）
  if (["gv3", "gv4", "gv5", "gv6", "gv7", "gv8", "gv9", "gv10", "gv11", "gv12", "gv13", "gv14"].includes(code)) {
    return "spine_posterior_median";
  }
  if (["gb21", "si11", "si12", "si13", "si14", "si15", "li16"].includes(code)) return "shoulder_scapular";
  if (["li15", "te14", "si10"].includes(code)) return "shoulder_joint";
  if (["gb30", "bl54", "bl53", "bl36"].includes(code)) return "buttock_gluteal";
  if (["st35", "lr8", "ki10", "gb33"].includes(code)) return "knee_joint";

  // 2. 頭部・顔面
  if (bodyPart === "頭部・顔面") {
    // 側頭・顎・耳前
    if (detail.includes("耳") || detail.includes("下顎") || detail.includes("頬") || ["st6", "st7", "te17", "te21", "si19", "gb2", "st8"].includes(code)) {
      return "jaw_temporal";
    }
    // 後頭部・うなじ
    if (detail.includes("項") || detail.includes("後頭") || ["gb20", "bl10", "gv16", "gv15", "bl9"].includes(code)) {
      return "neck_posterior";
    }
    // 顔面部
    if (detail.includes("眼") || detail.includes("鼻") || detail.includes("口") || detail.includes("面") || ["st1", "st2", "st3", "st4", "li20", "bl1", "bl2", "gb1", "te23", "gv26"].includes(code)) {
      return "face_anterior";
    }
    // 頭頂部
    return "head_vertex";
  }

  // 3. 首・肩
  if (bodyPart === "首・肩") {
    if (code === "gv14") return "spine_posterior_median";
    if (detail.includes("項") || detail.includes("後頭") || ["gb20", "bl10", "gv15", "gv16"].includes(code)) {
      return "neck_posterior";
    }
    if (detail.includes("肩甲") || detail.includes("肩井") || ["gb21"].includes(code)) {
      return "shoulder_scapular";
    }
    if (detail.includes("肩関節") || ["li15", "te14", "si9", "si10"].includes(code)) {
      return "shoulder_joint";
    }
    return "neck_anterior";
  }

  // 4. 手・腕
  if (bodyPart === "手・腕") {
    // 手部
    if (detail.includes("中手骨") || detail.includes("手背") || detail.includes("手掌") || detail.includes("指") || detail.includes("爪甲") || ["li4", "li3", "li2", "li1", "te3", "te2", "te1", "si3", "si2", "si1", "pc8", "lu10", "lu11", "ht8", "ht9"].includes(code)) {
      return "hand_metacarpal";
    }
    // 上腕部・肘部（二頭筋・三頭筋・腋窩・上顆・肘頭上方など）
    if (
      ["lu3", "lu4", "lu5", "pc2", "pc3", "ht1", "ht2", "ht3", "li11", "li12", "li13", "li14", "si8", "te10", "te11", "te12", "te13"].includes(code) ||
      ((detail.includes("上腕") || detail.includes("腋窩") || (detail.includes("肘頭") && !detail.includes("下方"))) && !detail.includes("前腕"))
    ) {
      return "arm_brachial";
    }
    // 前腕背側
    if (detail.includes("背側") || detail.includes("伸筋") || detail.includes("後面") || ["te5", "te6", "te7", "te8", "te9", "li10", "li5", "li6", "li7", "li8", "li9", "si6", "si7"].includes(code)) {
      return "forearm_posterior";
    }
    // 前腕掌側
    return "forearm_anterior";
  }

  // 5. 足・脚
  if (bodyPart === "足・脚") {
    // 足部
    if (detail.includes("中足骨") || detail.includes("足背") || detail.includes("足底") || detail.includes("趾") || detail.includes("踵") || ["lr3", "lr2", "lr1", "sp3", "sp4", "sp2", "sp1", "st41", "st42", "st43", "st44", "st45", "gb41", "gb42", "gb43", "gb44", "ki1", "ki2", "bl65", "bl66", "bl67"].includes(code)) {
      return "foot_dorsal";
    }
    // 臀部
    if (detail.includes("臀") || detail.includes("大転子") || detail.includes("仙骨裂孔") || ["gb30", "bl54", "bl53", "bl36"].includes(code)) {
      return "buttock_gluteal";
    }
    // 大腿部（※膝蓋骨指標の誤判定防止のため膝関節より先に判定）
    if (["sp10", "sp11", "sp12", "lr9", "lr10", "lr11"].includes(code) || (detail.includes("大腿") && detail.includes("内側"))) {
      return "thigh_medial";
    }
    if (["st31", "st32", "st33", "st34", "gb31", "gb32", "bl37"].includes(code) || detail.includes("大腿") || detail.includes("腸脛靭帯")) {
      return "thigh_anterior";
    }
    // 膝関節（犢鼻、膝眼、関節裂隙）
    if (["st35", "lr8", "ki10", "gb33"].includes(code) || detail.includes("膝蓋骨底と") || detail.includes("膝関節") || detail.includes("膝眼")) {
      return "knee_joint";
    }
    // 下腿後側・膝窩
    if (detail.includes("後面") || detail.includes("膝窩") || detail.includes("アキレス腱") || detail.includes("腓腹筋") || ["bl40", "bl38", "bl39", "bl55", "bl56", "bl57", "bl58", "bl59", "bl60"].includes(code)) {
      return "lower_leg_posterior";
    }
    // 下腿内側
    if (detail.includes("内側") || detail.includes("内果") || detail.includes("脛骨内側面") || ["sp6", "sp7", "sp8", "sp9", "lr5", "lr6", "lr7", "ki3", "ki6", "ki7", "ki8", "ki9"].includes(code)) {
      return "lower_leg_medial";
    }
    // 下腿前外側
    return "lower_leg_anterior";
  }

  // 6. 胸・腹
  if (bodyPart === "胸・腹") {
    if (["cv16", "cv17", "cv18", "cv19", "cv20", "cv21"].includes(code)) {
      return "chest_sternal";
    }
    if (detail.includes("肋間") || detail.includes("鎖骨") || detail.includes("前胸部") || detail.includes("胸部")) {
      return "chest_intercostal";
    }
    return "abdomen_anterior";
  }

  // 7. 背中・腰
  if (bodyPart === "背中・腰") {
    if (["gv3", "gv4", "gv5", "gv6", "gv7", "gv8", "gv9", "gv10", "gv11", "gv12", "gv13", "gv14"].includes(code)) {
      return "spine_posterior_median";
    }
    if (detail.includes("腰") || detail.includes("仙") || detail.includes("腸骨") || ["bl23", "bl24", "bl25", "bl26", "bl27", "bl28", "bl29", "bl30", "bl31", "bl32", "bl33", "bl34", "bl52"].includes(code)) {
      return "lumbar_paravertebral";
    }
    return "back_paravertebral";
  }

  return "abdomen_anterior";
}

/**
 * スライステンプレート型
 */
interface BaseSliceTemplate {
  titleTemplate: string;
  level: string;
  bodySide: string;
  posture: string;
  axes: { horizontal: [string, string]; vertical: [string, string] };
  summaryTakeaway: string;
  layers: AnatomicalLayer[];
  boundaries: BoundaryLandmark[];
  adjacentStructures: AdjacentStructure[];
  svgElements: SvgAnatomicalElement[];
  references: string[];
}

/**
 * 25スライステンプレート定義
 */
const SLICE_TEMPLATES: Record<SliceType, BaseSliceTemplate> = {
  // 1. 顔面部（四白・迎香・地倉・承泣）
  face_anterior: {
    titleTemplate: "顔面部・表情筋・上顎骨局所深浅断面モデル",
    level: "眼窩下孔〜鼻唇溝レベル水平横断",
    bodySide: "顔面部",
    posture: "仰臥位または座位（頭部中間位）",
    axes: { horizontal: ["内側 (鼻梁側)", "外側 (頬骨側)"], vertical: ["顔面体表 (皮膚)", "深部 (上顎骨・骨膜)"] },
    summaryTakeaway: "薄い表情筋群（眼輪筋・上唇挙筋）と上顎骨面の重なり、および顔面動静脈・眼窩下神経の走行を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "顔面皮膚", category: "skin", depthDescription: "表面層", description: "毛細血管と皮脂腺が豊富な非常に薄い皮膚。", dangerLevel: "safe", clinicalSignificance: "細鍼による無痛切皮と内出血防止" },
      { depthIndex: 2, id: "mimic-muscles", name: "表情筋群（眼輪筋・大頬骨筋・上唇挙筋）", category: "muscle", depthDescription: "浅層筋", description: "皮筋として骨膜または皮膚に付着する筋肉。美容・顔面神経麻痺の主目標。", dangerLevel: "safe", clinicalSignificance: "顔面筋緊張緩和・リフトアップの座" },
      { depthIndex: 3, id: "maxilla-pericranium", name: "上顎骨骨膜", category: "bone", depthDescription: "深部骨面", description: "上顎骨の表面を覆う骨膜。直刺深刺による骨膜痛を回避。", dangerLevel: "caution", clinicalSignificance: "骨膜直撃を避け斜刺・横刺とする" },
    ],
    boundaries: [
      { id: "infraorbital-margin", name: "眼窩下縁 / 頬骨", category: "bone", position: "上方・外側骨性境界", relation: "四白・承泣の触診指標", description: "目の下の骨のふち。", palpationTip: "眼窩下縁の骨縁を指先で触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "facial-vessels", name: "顔面動静脈", category: "vessel", relation: "口角から鼻翼外側（迎香）を走行", dangerLevel: "caution", description: "顔面を縦走する動静脈。誤穿刺による皮下出血（青あざ）に留意。", clinicalSignificance: "抜針後は必ず局所を優しく圧迫止血する" },
      { id: "infraorbital-nerve", name: "眼窩下神経（三叉神経第2枝）", category: "nerve", relation: "眼窩下孔から出現（四白直下）", dangerLevel: "caution", description: "上唇や頬の知覚を司る神経。刺激で特有のピリッとしたひびき。", clinicalSignificance: "強雀啄を避け愛護的に刺激" },
    ],
    svgElements: [
      { layerId: "maxilla-pericranium", elementId: "face-maxilla", label: "上顎骨（骨皮質）", shapeType: "path", d: "M 40,170 Q 250,180 460,170 L 460,240 Q 250,250 40,240 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 250, y: 205, anchor: "middle" } },
      { layerId: "facial-vessels", elementId: "face-vessels", label: "顔面動脈（内出血注意）", shapeType: "circle", cx: 160, cy: 135, r: 8, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "infraorbital-nerve", elementId: "face-nerve", label: "眼窩下神経", shapeType: "circle", cx: 280, cy: 155, r: 6, fill: "#F1C40F", stroke: "#B7950B", strokeWidth: 1.5 },
      { layerId: "mimic-muscles", elementId: "face-muscles", label: "表情筋群（眼輪筋・上唇挙筋）", shapeType: "path", d: "M 40,110 Q 250,115 460,110 L 460,170 Q 250,180 40,170 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 140, anchor: "middle" } },
      { layerId: "skin", elementId: "face-skin", label: "顔面皮膚表面", shapeType: "path", d: "M 40,65 Q 250,75 460,65 L 460,110 Q 250,115 40,110 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 88, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "face-needle-path", label: "斜刺針路（0.2〜0.5寸）", shapeType: "path", d: "M 230,25 L 260,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "face-needle-point", label: "刺鍼到達点（表情筋筋腹）", shapeType: "circle", cx: 260, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床顔面解剖アトラス"],
  },

  // 2. 側頭・顎関節部（下関・頬車・聴宮・翳風）
  jaw_temporal: {
    titleTemplate: "側頭・顎関節・咬筋局所深浅断面モデル",
    level: "耳前・下顎切痕レベル水平横断",
    bodySide: "側頭・顎部",
    posture: "座位または側臥位（口を軽く半開きにした肢位）",
    axes: { horizontal: ["前側 (顔面側)", "後側 (耳介側)"], vertical: ["体表面 (皮膚)", "深部 (下顎骨・翼突筋)"] },
    summaryTakeaway: "下顎切痕・頬骨弓と咬筋・耳下腺の立体配置、および顔面神経・三叉神経第3枝（下顎神経）の位置関係を把握します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "耳前部の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "parotid-masseter", name: "耳下腺被膜・咬筋", category: "muscle", depthDescription: "咀嚼筋層", description: "下顎を強力に引き上げる咀嚼筋。下関・頬車の主たる得気筋組織。", dangerLevel: "safe", clinicalSignificance: "顎関節症・歯ぎしりの治療点" },
      { depthIndex: 3, id: "mandible-bone", name: "下顎骨（下顎切痕・下顎枝）", category: "bone", depthDescription: "深部骨格", description: "口を開閉すると動く骨のくぼみ。", dangerLevel: "safe", clinicalSignificance: "開口時取穴の目印" },
    ],
    boundaries: [
      { id: "zygomatic-arch", name: "頬骨弓下縁", category: "bone", position: "上方境界指標", relation: "下関の直上骨格", description: "耳の前から鼻へ延びる骨のアーチ。", palpationTip: "頬骨弓の下縁のくぼみを触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "superficial-temporal-artery", name: "浅側頭動静脈", category: "vessel", relation: "耳の前を直上走行", dangerLevel: "caution", description: "耳珠の前で脈拍を触知する動脈。穿刺による血腫に留意。", clinicalSignificance: "拍動を指先で確認し避けて刺入" },
      { id: "facial-nerve-trunk", name: "顔面神経分枝", category: "nerve", relation: "耳下腺内を通過し放散", dangerLevel: "caution", description: "表情筋を支配する神経。強い深刺雀啄は避ける。", clinicalSignificance: "愛護的刺入" },
    ],
    svgElements: [
      { layerId: "mandible-bone", elementId: "jaw-mandible", label: "下顎骨（骨皮質）", shapeType: "ellipse", cx: 210, cy: 180, rx: 50, ry: 35, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 210, y: 183, anchor: "middle" } },
      { layerId: "parotid-masseter", elementId: "jaw-masseter", label: "咬筋（目標筋腹）", shapeType: "path", d: "M 60,110 Q 250,120 440,110 L 440,175 Q 250,185 60,175 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 340, y: 145, anchor: "middle" } },
      { layerId: "superficial-temporal-artery", elementId: "jaw-artery", label: "浅側頭動脈", shapeType: "circle", cx: 380, cy: 125, r: 8, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "skin", elementId: "jaw-skin", label: "皮膚・浅筋膜", shapeType: "path", d: "M 50,65 Q 250,75 450,65 L 450,110 Q 250,120 50,110 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 88, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "jaw-needle-path", label: "直刺針路（0.5〜1.0寸）", shapeType: "path", d: "M 250,20 L 250,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "jaw-needle-point", label: "刺鍼到達点（咬筋・関節間隙）", shapeType: "circle", cx: 250, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "顎関節症と咀嚼筋刺鍼ガイドライン"],
  },

  // 3. 頭頂部（百会・四神聡・上星）
  head_vertex: {
    titleTemplate: "頭頂部・頭蓋冠局所深浅断面モデル",
    level: "頭頂骨・矢状縫合レベル水平横断",
    bodySide: "頭頂部",
    posture: "座位または仰臥位",
    axes: { horizontal: ["左側 (Left)", "右側 (Right)"], vertical: ["頭皮表面", "深部 (頭蓋骨膜・硬膜側)"] },
    summaryTakeaway: "帽状腱膜から腱膜下疎松組織に至る層構造を理解し、骨膜痛を避けて頭皮に沿わせる横刺（平刺）の手技を把握します。",
    layers: [
      { depthIndex: 1, id: "skin-scalp", name: "頭皮（皮膚）", category: "skin", depthDescription: "表面層", description: "毛根が存在する厚く密な皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "galea-aponeurotica", name: "帽状腱膜", category: "fascia", depthDescription: "腱膜層", description: "前頭筋と後頭筋を結ぶ強靭な腱膜。刺入時に独特の手ごたえ。", dangerLevel: "safe", clinicalSignificance: "横刺（平刺）の針尖進入層" },
      { depthIndex: 3, id: "subaponeurotic-space", name: "腱膜下結合組織", category: "subcutaneous", depthDescription: "滑動層", description: "帽状腱膜と骨膜の間にある疎松な層。針が滑らかに進む。", dangerLevel: "safe", clinicalSignificance: "百会の針尖留置目標層" },
      { depthIndex: 4, id: "pericranium", name: "頭蓋骨骨膜", category: "bone", depthDescription: "骨膜層", description: "頭蓋骨表面を覆う骨膜。直刺で直撃すると強い痛覚を生じる。", dangerLevel: "caution", clinicalSignificance: "骨膜直撃を避け平刺とする" },
    ],
    boundaries: [
      { id: "calvaria-bone", name: "頭蓋骨（頭頂骨）", category: "bone", position: "深部不動境界", relation: "脳を保護する強固な骨壁", description: "大人の刺鍼で貫通することはない。", palpationTip: "硬い骨面を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "superior-sagittal-sinus", name: "上矢状静脈洞（頭蓋内）", category: "vessel", relation: "頭蓋冠直下の硬膜内（骨により保護）", dangerLevel: "safe", description: "頭蓋骨内を走る静脈洞。", clinicalSignificance: "頭蓋骨があるため刺鍼による穿刺リスクなし" },
    ],
    svgElements: [
      { layerId: "calvaria-bone", elementId: "hv-skull", label: "頭蓋骨（頭頂骨）", shapeType: "path", d: "M 40,165 Q 250,175 460,165 L 460,235 Q 250,245 40,235 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 250, y: 200, anchor: "middle" } },
      { layerId: "subaponeurotic-space", elementId: "hv-subapo", label: "腱膜下層（針尖進退層）", shapeType: "path", d: "M 40,135 Q 250,145 460,135 L 460,165 Q 250,175 40,165 Z", fill: "#FAF1DF", stroke: "#D6C7AC", strokeWidth: 1.5 },
      { layerId: "galea-aponeurotica", elementId: "hv-galea", label: "帽状腱膜（百会の得気層）", shapeType: "path", d: "M 40,105 Q 250,115 460,105 L 460,135 Q 250,145 40,135 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 2, labelPos: { x: 250, y: 122, anchor: "middle" } },
      { layerId: "skin-scalp", elementId: "hv-scalp", label: "頭皮表面", shapeType: "path", d: "M 40,65 Q 250,75 460,65 L 460,105 Q 250,115 40,105 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 85, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "hv-needle-path", label: "横刺（平刺）針路（頭皮に沿わせる）", shapeType: "path", d: "M 130,55 L 290,125", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "hv-needle-point", label: "刺鍼到達点（腱膜下層）", shapeType: "circle", cx: 290, cy: 125, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床頭鍼解剖アトラス"],
  },

  // 4. 後頭下部・うなじ（風池・天柱・風府・唖門）
  neck_posterior: {
    titleTemplate: "後頭下部・うなじ局所深浅断面モデル",
    level: "後頭骨下縁・環椎（C1）レベル水平横断",
    bodySide: "後頭部・項部",
    posture: "座位または腹臥位（頭部中間位・軽度前屈）",
    axes: { horizontal: ["後正中線 (項靭帯側)", "外側 (乳様突起側)"], vertical: ["項部体表 (皮膚)", "深部 (後頭下筋・大後頭孔)"] },
    summaryTakeaway: "僧帽筋・頭板状筋・頭半棘筋の層状配列と、深部の大後頭神経・椎骨動脈、および大後頭孔への上方深刺厳禁ルールを理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "頭髪が生える項部の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・項筋膜", category: "subcutaneous", depthDescription: "浅層", description: "大後頭神経の皮枝が貫通する結合組織。", dangerLevel: "safe", clinicalSignificance: "大後頭神経痛の刺激点" },
      { depthIndex: 3, id: "trapezius-splenius", name: "僧帽筋 / 頭板状筋", category: "muscle", depthDescription: "中層筋群", description: "首を支え回旋させる筋肉。風池・天柱の主要得気筋腹。", dangerLevel: "safe", clinicalSignificance: "筋緊張性頭痛の主たるコリの座" },
      { depthIndex: 4, id: "semispinalis-capitis", name: "頭半棘筋 / 後頭下筋群", category: "muscle", depthDescription: "深層筋群", description: "後頭骨直下に張る深部筋群。自律神経調整の重要ポイント。", dangerLevel: "caution", clinicalSignificance: "過度の深刺は厳禁" },
    ],
    boundaries: [
      { id: "nuchal-ligament", name: "項靭帯（後正中線）", category: "tendon", position: "内側基準指標", relation: "風府・唖門が位置する正中線", description: "後頭骨から頸椎棘突起をつなぐ腱組織。", palpationTip: "うなじ中央の縦の溝", dangerLevel: "safe" },
      { id: "mastoid-process", name: "乳様突起", category: "bone", position: "外側基準指標", relation: "風池の外側境界骨", description: "耳の後ろの丸い骨。", palpationTip: "耳の後ろの硬い骨を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "foramen-magnum-brainstem", name: "大後頭孔・延髄（生命中枢）", category: "organ", relation: "正中深部（上方へ深刺した時）", dangerLevel: "hazard", description: "針先を上方へ深刺すると延髄を損傷する重大事故のリスク。", clinicalSignificance: "上方への刺入は絶対厳禁。鼻尖または対側眼球へ向けて浅刺" },
      { id: "vertebral-artery", name: "椎骨動脈（環椎後頭膜上）", category: "vessel", relation: "後頭下三角内を走行", dangerLevel: "hazard", description: "脳底動脈へ向かう主要動脈。内側深部への激しい雀啄・回旋は避ける。", clinicalSignificance: "深刺を避け筋層内にとどめる" },
    ],
    svgElements: [
      { layerId: "foramen-magnum-brainstem", elementId: "np-danger", label: "大後頭孔・延髄領域（上方深刺厳禁）", shapeType: "path", d: "M 40,205 Q 180,215 260,205 L 260,260 L 40,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      { layerId: "nuchal-ligament", elementId: "np-lig", label: "項靭帯（後正中線）", shapeType: "path", d: "M 40,65 L 90,65 L 90,230 L 40,230 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 65, y: 150, anchor: "middle" } },
      { layerId: "semispinalis-capitis", elementId: "np-semi", label: "頭半棘筋・後頭下筋群", shapeType: "path", d: "M 90,135 Q 260,140 440,150 L 440,205 Q 260,210 90,200 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "vertebral-artery", elementId: "np-art", label: "椎骨動脈", shapeType: "circle", cx: 280, cy: 175, r: 8, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "trapezius-splenius", elementId: "np-splenius", label: "頭板状筋・僧帽筋（風池・天柱の座）", shapeType: "path", d: "M 90,85 Q 260,90 450,105 L 440,150 Q 260,140 90,135 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 270, y: 118, anchor: "middle" } },
      { layerId: "skin", elementId: "np-skin", label: "項部皮膚・皮下組織", shapeType: "path", d: "M 40,45 Q 250,50 460,60 L 450,105 Q 260,90 90,85 L 40,65 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 68, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "np-needle-path", label: "安全刺入角度（鼻尖方向へ斜刺）", shapeType: "path", d: "M 320,15 L 290,125", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "np-needle-point", label: "刺鍼到達点（板状筋筋膜）", shapeType: "circle", cx: 290, cy: 125, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床神経解剖学"],
  },

  // 5. 前頸部・側頸部（人迎・水突・扶突・天容）
  neck_anterior: {
    titleTemplate: "側頸部・頸動脈三角局所深浅断面モデル",
    level: "甲状軟骨高位水平横断",
    bodySide: "前頸部・側頸部",
    posture: "仰臥位（頸部軽度伸展位）",
    axes: { horizontal: ["前内側 (気管側)", "後外側 (胸鎖乳突筋側)"], vertical: ["頸部体表 (皮膚)", "深部 (頸動脈鞘・椎体)"] },
    summaryTakeaway: "胸鎖乳突筋の前縁・後縁と総頸動脈・内頸静脈・迷走神経の解剖学的位置関係を把握し、動脈直撃と迷走神経反射を避ける愛護的刺入を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "薄く進展性に富む頸部皮膚。", dangerLevel: "safe", clinicalSignificance: "愛護的切皮" },
      { depthIndex: 2, id: "platysma", name: "浅頸筋膜・広頸筋", category: "muscle", depthDescription: "皮下筋層", description: "顔面神経支配の薄い皮筋。", dangerLevel: "safe", clinicalSignificance: "浅層刺入部" },
      { depthIndex: 3, id: "sternocleidomastoid", name: "胸鎖乳突筋（SCM）", category: "muscle", depthDescription: "主筋層", description: "側頸部で最も太い筋肉。前縁と後縁が重要経穴の触診境界線。", dangerLevel: "safe", clinicalSignificance: "前縁または後縁の陥凹部を狙う" },
    ],
    boundaries: [
      { id: "thyroid-cartilage", name: "甲状軟骨（喉頭隆起）", category: "bone", position: "前正中境界", relation: "人迎・扶突高位の目印", description: "いわゆる「のどぼとけ」。", palpationTip: "喉頭隆起の尖端を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "common-carotid-artery", name: "総頸動脈（頸動脈洞）", category: "vessel", relation: "胸鎖乳突筋前縁の直下深部", dangerLevel: "hazard", description: "動脈直上への刺入や過度な圧迫は徐脈・血圧低下（頸動脈洞反射）の危険あり。", clinicalSignificance: "指先で拍動を外側に除けて刺入。直刺深刺は厳禁" },
    ],
    svgElements: [
      { layerId: "common-carotid-artery", elementId: "na-sheath", label: "頸動脈鞘（危険領域）", shapeType: "ellipse", cx: 210, cy: 175, rx: 40, ry: 30, fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      { layerId: "common-carotid-artery", elementId: "na-art", label: "総頸動脈（拍動部）", shapeType: "circle", cx: 200, cy: 175, r: 14, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 2 },
      { layerId: "thyroid-cartilage", elementId: "na-thyroid", label: "甲状軟骨（喉頭）", shapeType: "path", d: "M 40,80 L 110,80 L 120,230 L 40,230 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 75, y: 155, anchor: "middle" } },
      { layerId: "sternocleidomastoid", elementId: "na-scm", label: "胸鎖乳突筋（SCM）", shapeType: "ellipse", cx: 330, cy: 145, rx: 70, ry: 45, fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 330, y: 148, anchor: "middle" } },
      { layerId: "skin", elementId: "na-skin", label: "皮膚表面", shapeType: "path", d: "M 40,40 Q 250,45 460,55 L 460,75 Q 250,65 40,60 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 52, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "na-needle-path", label: "安全刺入ライン（動脈を避けて浅刺）", shapeType: "path", d: "M 270,15 L 260,115", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "na-needle-point", label: "刺鍼到達点（SCM前縁筋膜）", shapeType: "circle", cx: 260, cy: 115, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "ネッター解剖学アトラス 頭頸部"],
  },

  // 6. 胸骨上窩（天突 CV22）
  neck_suprasternal: {
    titleTemplate: "胸骨上窩・頸切痕局所深浅断面モデル",
    level: "頸切痕（胸骨上切痕）矢状〜水平断面",
    bodySide: "前頸部・正中",
    posture: "仰臥位（頸部軽度後屈位）",
    axes: { horizontal: ["前正中線", "深部 (気管側)"], vertical: ["胸骨上端 (表面)", "胸骨柄後面 (胸腔内方向)"] },
    summaryTakeaway: "直下の気管前壁および深部の大動脈弓・腕頭動脈を回避するため、直刺2分後に針尖を胸骨柄の背面に沿わせて下方へ斜刺する特殊手技を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "胸骨上切痕の薄いくぼんだ皮膚。", dangerLevel: "safe", clinicalSignificance: "愛護的切皮" },
      { depthIndex: 2, id: "sternohyoid", name: "舌骨下筋群（胸骨舌骨筋・胸骨甲状筋）", category: "muscle", depthDescription: "薄い筋層", description: "気管の前面を覆う薄い筋帯。", dangerLevel: "safe", clinicalSignificance: "針尖の通過層" },
      { depthIndex: 3, id: "trachea-anterior", name: "気管前壁結合組織", category: "fascia", depthDescription: "気管前結合組織", description: "胸骨柄と気管の間にある疎松組織。", dangerLevel: "caution", clinicalSignificance: "胸骨柄の背面に沿わせる安全進針路" },
    ],
    boundaries: [
      { id: "sternal-notch", name: "胸骨頸切痕（胸骨柄上縁）", category: "bone", position: "前下方骨性指標", relation: "針尖を沿わせる不動の骨膜面", description: "左右の鎖骨の間にある半月状の骨のくぼみ。", palpationTip: "胸骨上縁の硬い骨のくぼみを触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "trachea", name: "気管（気管軟骨・気管腔）", category: "organ", relation: "天突の直下深部（直刺で直撃）", dangerLevel: "hazard", description: "空気の通り道。直刺すると激しい咳嗽や気管穿刺事故を引き起こす。", clinicalSignificance: "直刺深刺は絶対厳禁。必ず下方に針を寝かせる" },
      { id: "brachiocephalic-artery", name: "腕頭動脈・大動脈弓", category: "vessel", relation: "胸骨柄後面の深部胸腔内", dangerLevel: "hazard", description: "心臓から出る大血管。深刺（1寸以上）は致死的大出血の恐れ。", clinicalSignificance: "胸骨柄背面の浅層（0.5〜0.8寸）にとどめる" },
    ],
    svgElements: [
      { layerId: "trachea", elementId: "ns-trachea", label: "気管（直刺厳禁！）", shapeType: "ellipse", cx: 250, cy: 190, rx: 45, ry: 35, fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 2, strokeDasharray: "4 2" },
      { layerId: "sternal-notch", elementId: "ns-bone", label: "胸骨柄（骨皮質）", shapeType: "path", d: "M 80,120 L 160,120 L 160,240 L 80,240 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 120, y: 180, anchor: "middle" } },
      { layerId: "sternohyoid", elementId: "ns-muscle", label: "胸骨舌骨筋・気管前組織", shapeType: "path", d: "M 160,110 Q 250,115 360,110 L 360,150 Q 250,155 160,150 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2 },
      { layerId: "skin", elementId: "ns-skin", label: "胸骨上切痕皮膚", shapeType: "path", d: "M 60,65 Q 250,85 440,65 L 440,95 Q 250,110 60,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      // 特殊針路：直刺2分後、下方へ胸骨背面に沿わせて斜刺
      { layerId: "needle-indicator", elementId: "ns-needle-path", label: "天突特殊針路（胸骨柄後面に沿って下方斜刺）", shapeType: "path", d: "M 250,30 L 250,65 L 205,155", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "ns-needle-point", label: "刺鍼到達点（胸骨柄後面）", shapeType: "circle", cx: 205, cy: 155, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床鍼灸手技安全マニュアル（天突刺鍼法）"],
  },

  // 7. 肩上部・肩甲部（肩井・大椎・天宗）
  shoulder_scapular: {
    titleTemplate: "肩上部・肩甲骨局所深浅断面モデル",
    level: "第7頸椎〜第1胸椎・肩井高位冠状・水平断面",
    bodySide: "肩部・背部",
    posture: "座位（両腕を下垂しリラックスさせた肢位）",
    axes: { horizontal: ["内側 (頸椎・大椎側)", "外側 (肩峰側)"], vertical: ["肩上部表面 (皮膚)", "深部 (第1肋骨・肺尖側)"] },
    summaryTakeaway: "僧帽筋・肩甲挙筋の筋腹と、直下に位置する第1肋骨および肺尖（胸膜）の近接関係を理解し、肩井での気胸事故防止の刺入角度を厳守します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "肩上部の皮膚。", dangerLevel: "safe", clinicalSignificance: "切皮" },
      { depthIndex: 2, id: "trapezius-upper", name: "僧帽筋（上部線維）", category: "muscle", depthDescription: "浅層強大筋", description: "首から肩を覆う筋腹。肩こりの最主要座。肩井の第1得気層。", dangerLevel: "safe", clinicalSignificance: "肩こり・頭痛緩和の主目標" },
      { depthIndex: 3, id: "levator-scapulae-supraspinatus", name: "肩甲挙筋 / 棘上筋", category: "muscle", depthDescription: "中層筋", description: "僧帽筋の深面にある筋肉。", dangerLevel: "safe", clinicalSignificance: "深部筋硬結の解消" },
    ],
    boundaries: [
      { id: "first-rib", name: "第1肋骨（骨面）", category: "bone", position: "深部安全壁", relation: "針先を受け止める骨膜", description: "鎖骨と肺尖の間にある最初の肋骨。", palpationTip: "深部で骨面に触れると安全ストッパーとなる", dangerLevel: "safe" },
      { id: "c7-spinous", name: "第7頸椎棘突起（大椎）", category: "bone", position: "内側基準指標", relation: "肩井寸法の内側起点", description: "首を曲げたときに最も飛び出る骨。", palpationTip: "大椎の突起を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "pleural-cupula-lung-apex", name: "肺尖・胸膜頂（気胸最大危険領域）", category: "organ", relation: "第1肋骨の内側深部（鎖骨上窩・肩井直下）", dangerLevel: "hazard", description: "肺の最上部は鎖骨より2〜3cm上に突出。肩井直刺による深刺は気胸事故の代表例。", clinicalSignificance: "直刺深刺は絶対厳禁！必ず前後に向けた浅い斜刺（0.5寸）とする" },
    ],
    svgElements: [
      { layerId: "pleural-cupula-lung-apex", elementId: "ss-lung-apex", label: "肺尖・胸膜頂（気胸危険領域！）", shapeType: "path", d: "M 60,195 Q 250,210 440,195 L 440,255 L 60,255 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 2, strokeDasharray: "4 2" },
      { layerId: "first-rib", elementId: "ss-rib1", label: "第1肋骨（骨面）", shapeType: "ellipse", cx: 180, cy: 180, rx: 45, ry: 18, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 180, y: 183, anchor: "middle" } },
      { layerId: "levator-scapulae-supraspinatus", elementId: "ss-levator", label: "肩甲挙筋・棘上筋", shapeType: "path", d: "M 60,135 Q 250,145 440,135 L 440,185 Q 250,195 60,185 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "trapezius-upper", elementId: "ss-trapezius", label: "僧帽筋（肩井の主座）", shapeType: "path", d: "M 60,85 Q 250,95 440,85 L 440,135 Q 250,145 60,135 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 112, anchor: "middle" } },
      { layerId: "skin", elementId: "ss-skin", label: "肩上部皮膚・浅筋膜", shapeType: "path", d: "M 50,45 Q 250,60 450,45 L 450,85 Q 250,95 50,85 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 68, anchor: "middle" } },
      // 安全な斜刺針路（直刺厳禁！）
      { layerId: "needle-indicator", elementId: "ss-needle-path", label: "安全斜刺針路（浅刺0.5寸・直刺厳禁）", shapeType: "path", d: "M 320,15 L 260,110", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "ss-needle-point", label: "刺鍼到達点（僧帽筋筋腹内）", shapeType: "circle", cx: 260, cy: 110, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "肩井刺鍼と外傷性気胸の予防ガイドライン"],
  },

  // 8. 肩関節部（肩髃・肩髎）
  shoulder_joint: {
    titleTemplate: "肩関節・肩峰・三角筋局所深浅断面モデル",
    level: "肩峰・上腕骨頭レベル水平横断",
    bodySide: "右肩関節",
    posture: "座位（腕を水平に外転挙上した肢位）",
    axes: { horizontal: ["前側 (胸側)", "後側 (背側)"], vertical: ["外側表面 (皮膚)", "内側深部 (関節腔・上腕骨頭)"] },
    summaryTakeaway: "肩峰の前後に生じる陥凹部から三角筋を通り、肩峰下滑液包および腱板筋群に至る刺入角度を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "肩外側の皮膚。", dangerLevel: "safe", clinicalSignificance: "切皮" },
      { depthIndex: 2, id: "deltoid-muscle", name: "三角筋（中部線維・前部線維）", category: "muscle", depthDescription: "強大筋層", description: "肩を丸く覆う筋肉。肩髃・肩髎の主たる得気の座。", dangerLevel: "safe", clinicalSignificance: "五十肩・肩関節痛の治療点" },
      { depthIndex: 3, id: "subacromial-bursa", name: "肩峰下滑液包", category: "fascia", depthDescription: "滑液包", description: "肩峰と腱板の間にある摩擦軽減組織。五十肩で炎症を起こしやすい。", dangerLevel: "safe", clinicalSignificance: "滑液包周囲炎の消炎" },
    ],
    boundaries: [
      { id: "acromion-border", name: "肩峰（外側縁）", category: "bone", position: "上方基準骨", relation: "肩髃・肩髎の触診目印", description: "肩の骨のてっぺんの屋根。", palpationTip: "腕を挙げたときに骨の縁の前後にできるくぼみを触知", dangerLevel: "safe" },
      { id: "humeral-head", name: "上腕骨頭（大結節）", category: "bone", position: "深部骨格", relation: "腕の骨の頭", description: "肩関節を構成する球状の骨頭。", palpationTip: "腕を回旋させると動く骨頭を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "axillary-nerve", name: "腋窩神経・後上腕回旋動脈", category: "nerve", relation: "外科頸を後ろから外側へ回る", dangerLevel: "caution", description: "三角筋を支配する主要神経。", clinicalSignificance: "過度の深刺を避け筋腹内にとどめる" },
    ],
    svgElements: [
      { layerId: "humeral-head", elementId: "sj-humerus", label: "上腕骨頭", shapeType: "ellipse", cx: 220, cy: 175, rx: 55, ry: 40, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 220, y: 178, anchor: "middle" } },
      { layerId: "acromion-border", elementId: "sj-acromion", label: "肩峰（屋根の骨）", shapeType: "path", d: "M 60,70 L 140,70 L 130,120 L 70,120 Z", fill: "#DDD5C7", stroke: "#9E9484", strokeWidth: 2 },
      { layerId: "deltoid-muscle", elementId: "sj-deltoid", label: "三角筋（肩髃の主座）", shapeType: "path", d: "M 140,70 Q 280,85 440,90 L 430,150 Q 280,145 140,120 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 280, y: 115, anchor: "middle" } },
      { layerId: "skin", elementId: "sj-skin", label: "肩外側皮膚", shapeType: "path", d: "M 50,40 Q 250,55 450,60 L 450,85 Q 250,80 50,65 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 62, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "sj-needle-path", label: "肩髃直刺〜斜刺針路（0.8〜1.2寸）", shapeType: "path", d: "M 250,15 L 250,125", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "sj-needle-point", label: "刺鍼到達点（三角筋深層）", shapeType: "circle", cx: 250, cy: 125, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "肩関節鏡視下解剖アトラス"],
  },

  // 9. 上腕部（天府・侠白・極泉・臂臑）
  arm_brachial: {
    titleTemplate: "上腕部・上腕二頭筋・上腕骨局所深浅断面モデル",
    level: "上腕中央（上腕二頭筋筋腹）水平横断",
    bodySide: "右上腕",
    posture: "座位または仰臥位（肘関節軽度屈曲位）",
    axes: { horizontal: ["前内側 (内側側)", "後外側 (外側側)"], vertical: ["前面体表 (力こぶ表面)", "後面深部 (上腕骨・三頭筋側)"] },
    summaryTakeaway: "上腕二頭筋外側縁・内側縁と上腕骨、および内側溝を走る上腕動静脈・正中神経の解剖配置を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "上腕の皮膚。", dangerLevel: "safe", clinicalSignificance: "切皮" },
      { depthIndex: 2, id: "biceps-brachii", name: "上腕二頭筋（力こぶの筋肉）", category: "muscle", depthDescription: "前区画主筋", description: "肘を屈曲する筋肉。天府・侠白の主座。", dangerLevel: "safe", clinicalSignificance: "呼吸器疾患・局所痛の刺激点" },
      { depthIndex: 3, id: "brachialis-muscle", name: "上腕筋 / 上腕骨骨膜", category: "muscle", depthDescription: "深層筋・骨格", description: "上腕二頭筋の深面にある筋肉。", dangerLevel: "safe", clinicalSignificance: "深部到達層" },
    ],
    boundaries: [
      { id: "biceps-border", name: "上腕二頭筋外側縁／内側縁", category: "tendon", position: "前面触診基準線", relation: "肺経（天府・侠白）・心経（青霊）の走向線", description: "力こぶの境界の溝。", palpationTip: "肘を曲げて力こぶを作り筋縁を触知", dangerLevel: "safe" },
      { id: "humerus-shaft", name: "上腕骨骨幹部・上顆", category: "bone", position: "中心骨格", relation: "深部支持骨・内外側上顆", description: "二の腕の芯となる骨格および肘上顆部。", palpationTip: "深部の硬い骨感を意識", dangerLevel: "safe" },
      { id: "olecranon-triceps", name: "肘頭・上腕三頭筋腱", category: "tendon", position: "後面基準指標", relation: "三焦経（天井・清冷淵・消濼）の走向線", description: "肘後面の突起骨と二の腕裏側の腱。", palpationTip: "肘を屈曲させ肘頭と三頭筋停止部を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "brachial-artery-median-nerve", name: "上腕動静脈・正中神経", category: "vessel", relation: "上腕二頭筋内側溝（青霊・極泉ライン）を走行", dangerLevel: "hazard", description: "上腕の主幹動脈と神経。内側溝への刺入時は必ず拍動を確認。", clinicalSignificance: "血管穿刺による皮下血腫の防止" },
      { id: "radial-nerve-posterior", name: "橈骨神経（橈骨神経溝）", category: "nerve", relation: "上腕骨後面中央の溝を外側下方へ旋回走行", dangerLevel: "caution", description: "消濼・手五里深層を走行する神経幹。", clinicalSignificance: "深刺による電撃痛・神経刺激の回避" },
    ],
    svgElements: [
      { layerId: "humerus-shaft", elementId: "ab-humerus", label: "上腕骨", shapeType: "ellipse", cx: 250, cy: 175, rx: 40, ry: 30, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 250, y: 178, anchor: "middle" } },
      { layerId: "brachial-artery-median-nerve", elementId: "ab-artery", label: "上腕動脈・正中神経（内側溝）", shapeType: "circle", cx: 150, cy: 145, r: 9, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "biceps-brachii", elementId: "ab-biceps", label: "上腕二頭筋（力こぶ）", shapeType: "ellipse", cx: 280, cy: 125, rx: 75, ry: 35, fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 280, y: 128, anchor: "middle" } },
      { layerId: "skin", elementId: "ab-skin", label: "上腕前面皮膚", shapeType: "path", d: "M 60,55 Q 250,70 440,55 L 440,85 Q 250,100 60,85 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 72, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "ab-needle-path", label: "天府・侠白直刺針路（0.5〜1.0寸）", shapeType: "path", d: "M 320,15 L 320,115", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "ab-needle-point", label: "刺鍼到達点（二頭筋外側縁）", shapeType: "circle", cx: 320, cy: 115, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "上肢臨床解剖学"],
  },

  // 10. 前腕掌側（内関・郄門・列缺・太淵・神門）
  forearm_anterior: {
    titleTemplate: "前腕掌側・手根部局所深浅断面モデル",
    level: "手関節掌側横紋上方2〜3寸水平横断",
    bodySide: "右前腕",
    posture: "手掌を上（回外位）にして前腕をリラックスさせた肢位",
    axes: { horizontal: ["橈側 (Radial / 親指側)", "尺側 (Ulnar / 小指側)"], vertical: ["掌側面 (表面)", "背側面 (深面)"] },
    summaryTakeaway: "橈側手根屈筋腱と長掌筋腱の間隙から浅指屈筋・深指屈筋に至る層構造と、深部を直走する正中神経の愛護的回避を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "手首掌側の薄く柔軟な皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・前腕浅筋膜", category: "subcutaneous", depthDescription: "浅層", description: "皮下静脈網と前腕皮神経が走る結合組織層。", dangerLevel: "safe", clinicalSignificance: "静脈回避" },
      { depthIndex: 3, id: "flexor-digitorum-superficialis", name: "浅指屈筋", category: "muscle", depthDescription: "中層筋腹", description: "2本の腱（橈側手根屈筋・長掌筋）の直下に広がる筋組織。内関の主座。", dangerLevel: "safe", clinicalSignificance: "心地よい酸脹感を得る目標層" },
      { depthIndex: 4, id: "flexor-digitorum-profundus", name: "深指屈筋 / 長母指屈筋", category: "muscle", depthDescription: "深層屈筋群", description: "前腕骨間膜の前面に位置する深部筋群。", dangerLevel: "safe", clinicalSignificance: "深部刺激の終点" },
    ],
    boundaries: [
      { id: "flexor-carpi-radialis-tendon", name: "橈側手根屈筋腱", category: "tendon", position: "橈側境界線", relation: "触診の第1指標", description: "手首を曲げたときに親指側に強く浮き出る腱。", palpationTip: "手首を軽く屈曲させて触知", dangerLevel: "safe" },
      { id: "palmaris-longus-tendon", name: "長掌筋腱", category: "tendon", position: "尺側境界線", relation: "内関の取穴間隙を挟む腱", description: "母指と小指をつまみ合わせると中央に浮き出る細い腱。", palpationTip: "母指球と小指球をすぼめて触知", dangerLevel: "safe" },
      { id: "radius-bone", name: "橈骨（骨幹部）", category: "bone", position: "橈側骨性境界", relation: "前腕の外側骨格", description: "親指側の骨。", palpationTip: "前腕外側縁として触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "median-nerve", name: "正中神経", category: "nerve", relation: "2腱の間隙・浅指屈筋の深面を直走", dangerLevel: "caution", description: "手掌の知覚と母指球筋を支配。針先が接触すると指先へ電撃痛が走る。", clinicalSignificance: "電撃痛時は針先を少し引き微調整する" },
      { id: "radial-artery", name: "橈骨動脈", category: "vessel", relation: "橈側手根屈筋腱の外側（太淵・経渠ライン）", dangerLevel: "caution", description: "脈拍を触知する動脈。", clinicalSignificance: "太淵・経渠取穴時は拍動直撃を回避" },
    ],
    svgElements: [
      { layerId: "radius-bone", elementId: "fa-radius", label: "橈骨", shapeType: "ellipse", cx: 100, cy: 155, rx: 32, ry: 25, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 100, y: 158, anchor: "middle" } },
      { layerId: "radius-bone", elementId: "fa-ulna", label: "尺骨", shapeType: "ellipse", cx: 400, cy: 155, rx: 28, ry: 24, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 400, y: 158, anchor: "middle" } },
      { layerId: "flexor-digitorum-profundus", elementId: "fa-fdp", label: "深指屈筋群", shapeType: "path", d: "M 135,160 Q 250,170 370,160 L 370,215 Q 250,225 135,215 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "flexor-digitorum-superficialis", elementId: "fa-fds", label: "浅指屈筋（目標組織）", shapeType: "path", d: "M 135,115 Q 250,120 370,115 L 370,160 Q 250,170 135,160 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 140, anchor: "middle" } },
      { layerId: "median-nerve", elementId: "fa-median-n", label: "正中神経（注意構造）", shapeType: "circle", cx: 250, cy: 160, r: 7, fill: "#F1C40F", stroke: "#B7950B", strokeWidth: 1.5 },
      { layerId: "flexor-carpi-radialis-tendon", elementId: "fa-fcr-tendon", label: "橈側手根屈筋腱", shapeType: "circle", cx: 195, cy: 105, r: 12, fill: "#EDE6DA", stroke: "#8C8275", strokeWidth: 2 },
      { layerId: "palmaris-longus-tendon", elementId: "fa-pl-tendon", label: "長掌筋腱", shapeType: "circle", cx: 295, cy: 105, r: 10, fill: "#EDE6DA", stroke: "#8C8275", strokeWidth: 2 },
      { layerId: "radial-artery", elementId: "fa-radial-art", label: "橈骨動脈（脈拍部）", shapeType: "circle", cx: 145, cy: 105, r: 7, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "skin", elementId: "fa-skin", label: "掌側皮膚・浅筋膜", shapeType: "path", d: "M 60,65 Q 250,75 440,65 L 440,95 Q 250,105 60,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "fa-needle-path", label: "標準直刺針路（0.5〜0.8寸）", shapeType: "path", d: "M 245,25 L 245,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "fa-needle-point", label: "刺鍼到達点（浅指屈筋内）", shapeType: "circle", cx: 245, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "Casey GP (2022) 前腕部解剖断面研究"],
  },

  // 11. 前腕背側（外関・支溝・手三里・曲池）
  forearm_posterior: {
    titleTemplate: "前腕背側・伸筋区画局所深浅断面モデル",
    level: "前腕伸側水平横断",
    bodySide: "右前腕",
    posture: "手背を上（回内位）にして軽く前腕を置いた肢位",
    axes: { horizontal: ["橈側 (親指側)", "尺側 (小指側)"], vertical: ["背側面 (表面)", "掌側面 (深面)"] },
    summaryTakeaway: "橈骨と尺骨の間の前腕骨間膜と、総指伸筋・長母指伸筋等の伸筋群の走行、および後骨間神経の位置関係を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "手背側からの連続する皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・手背静脈網", category: "subcutaneous", depthDescription: "浅層", description: "表在静脈が発達した層。", dangerLevel: "safe", clinicalSignificance: "皮下出血予防" },
      { depthIndex: 3, id: "extensor-digitorum", name: "総指伸筋 / 腕橈骨筋", category: "muscle", depthDescription: "浅層伸筋群", description: "外関・手三里・曲池の主要な得気組織。", dangerLevel: "safe", clinicalSignificance: "酸脹感の主座" },
      { depthIndex: 4, id: "interosseous-membrane", name: "前腕骨間膜 / 深層伸筋", category: "fascia", depthDescription: "骨間深層", description: "橈骨と尺骨をつなぐ強靭な線維膜。", dangerLevel: "safe", clinicalSignificance: "貫通透刺（外関から内関へ）の手技目標" },
    ],
    boundaries: [
      { id: "radius-post", name: "橈骨（骨間縁）", category: "bone", position: "橈側骨性境界", relation: "取穴の基準骨", description: "前腕骨の橈側骨幹部。", palpationTip: "橈骨の骨縁を触知", dangerLevel: "safe" },
      { id: "ulna-post", name: "尺骨（骨間縁）", category: "bone", position: "尺側骨性境界", relation: "尺骨頭から肘頭へのライン", description: "前腕小指側の骨。", palpationTip: "尺骨の背側縁を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "posterior-interosseous-nv", name: "後骨間神経・動脈", category: "nerve", relation: "伸筋群の深層・骨間膜上を走行", dangerLevel: "caution", description: "橈骨神経深枝の延長。針先の接触で前腕深部に強い重だるい響きが生じる。", clinicalSignificance: "強い響きを得るポイント" },
    ],
    svgElements: [
      { layerId: "radius-post", elementId: "fap-radius", label: "橈骨", shapeType: "ellipse", cx: 110, cy: 155, rx: 30, ry: 25, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 110, y: 158, anchor: "middle" } },
      { layerId: "ulna-post", elementId: "fap-ulna", label: "尺骨", shapeType: "ellipse", cx: 390, cy: 155, rx: 28, ry: 24, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 390, y: 158, anchor: "middle" } },
      { layerId: "interosseous-membrane", elementId: "fap-membrane", label: "前腕骨間膜", shapeType: "path", d: "M 140,160 L 362,160", fill: "none", stroke: "#7F8C8D", strokeWidth: 3, strokeDasharray: "4 2" },
      { layerId: "extensor-digitorum", elementId: "fap-extensor", label: "総指伸筋（目標組織）", shapeType: "path", d: "M 140,110 Q 250,115 360,110 L 360,158 Q 250,165 140,158 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 135, anchor: "middle" } },
      { layerId: "skin", elementId: "fap-skin", label: "背側皮膚・浅筋膜", shapeType: "path", d: "M 60,65 Q 250,75 440,65 L 440,95 Q 250,105 60,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "fap-needle-path", label: "直刺針路（0.5〜1.0寸）", shapeType: "path", d: "M 250,25 L 250,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "fap-needle-point", label: "刺鍼到達点（伸筋群内）", shapeType: "circle", cx: 250, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "プロメテウス解剖学アトラス 上肢"],
  },

  // 12. 手背・手掌部（合谷・三間・中渚・労宮）
  hand_metacarpal: {
    titleTemplate: "手背・中手骨間局所深浅断面モデル",
    level: "中手骨幹部レベル水平横断",
    bodySide: "右手",
    posture: "手背を上に向けて軽く握った肢位",
    axes: { horizontal: ["橈側 (親指側)", "尺側 (小指側)"], vertical: ["手背側 (表面)", "手掌側 (深面)"] },
    summaryTakeaway: "第2中手骨の橈側骨縁を目印に、第1背側骨間筋から母指内転筋への重なりと、橈骨神経浅枝・深掌動脈弓の近接関係を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "手背皮膚", category: "skin", depthDescription: "表面層", description: "薄く可動性のある皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・手背静脈網", category: "subcutaneous", depthDescription: "浅層", description: "手背静脈と皮神経が走る層。", dangerLevel: "safe", clinicalSignificance: "皮下出血予防" },
      { depthIndex: 3, id: "first-dorsal-interosseous", name: "第1背側骨間筋", category: "muscle", depthDescription: "主筋層", description: "母指と示指の間で最も盛り上がる羽状筋。合谷の主座。", dangerLevel: "safe", clinicalSignificance: "得気の主座" },
      { depthIndex: 4, id: "adductor-pollicis", name: "母指内転筋", category: "muscle", depthDescription: "深層", description: "掌側深層の筋肉。深刺時に針先が到達。", dangerLevel: "safe", clinicalSignificance: "遠隔鎮痛の賦活点" },
    ],
    boundaries: [
      { id: "second-metacarpal", name: "第2中手骨骨縁", category: "bone", position: "尺側境界", relation: "不動の触診基準線", description: "示指の骨幹部中点。", palpationTip: "第2中手骨の骨際で止まるくぼみ", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "radial-nerve-superficial", name: "橈骨神経浅枝", category: "nerve", relation: "皮下組織内を走行", dangerLevel: "caution", description: "電撃痛を生じやすい皮神経。", clinicalSignificance: "強い放散痛時は針先を微調整" },
      { id: "deep-palmar-arch", name: "深掌動脈弓", category: "vessel", relation: "母指内転筋の深面", dangerLevel: "hazard", description: "手掌深部の動脈弓。過度の深刺は避ける。", clinicalSignificance: "貫通深刺の防止" },
    ],
    svgElements: [
      { layerId: "second-metacarpal", elementId: "hm-mc2", label: "第2中手骨", shapeType: "ellipse", cx: 370, cy: 155, rx: 32, ry: 25, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 370, y: 158, anchor: "middle" } },
      { layerId: "second-metacarpal", elementId: "hm-mc1", label: "第1中手骨", shapeType: "ellipse", cx: 120, cy: 155, rx: 32, ry: 25, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 120, y: 158, anchor: "middle" } },
      { layerId: "adductor-pollicis", elementId: "hm-adductor", label: "母指内転筋", shapeType: "path", d: "M 152,165 Q 260,185 340,165 L 340,215 Q 260,225 152,215 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "first-dorsal-interosseous", elementId: "hm-fdi", label: "第1背側骨間筋（合谷の主座）", shapeType: "path", d: "M 152,115 Q 260,120 340,115 L 340,165 Q 260,185 152,165 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 140, anchor: "middle" } },
      { layerId: "skin", elementId: "hm-skin", label: "手背皮膚・浅筋膜", shapeType: "path", d: "M 80,65 Q 250,75 420,65 L 420,95 Q 250,105 80,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "hm-needle-path", label: "第2中手骨際への直刺", shapeType: "path", d: "M 290,20 L 315,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "hm-needle-point", label: "刺鍼到達点（骨間筋深面）", shapeType: "circle", cx: 315, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "Casey GP (2022) LI4断面解剖研究"],
  },

  // 13. 前胸部・肋間（中府・雲門・気戸・乳根・期門）
  chest_intercostal: {
    titleTemplate: "前胸部・肋間局所深浅断面モデル",
    level: "肋間隙レベル水平横断（前胸壁）",
    bodySide: "前胸部",
    posture: "仰臥位（リラックスして両腕を体側に置いた自然肢位）",
    axes: { horizontal: ["内側 (Medial / 胸骨側)", "外側 (Lateral / 腋窩側)"], vertical: ["体表面 (胸壁前面)", "深部 (胸膜・肺側)"] },
    summaryTakeaway: "大胸筋から小胸筋・肋間筋への層構造を把握し、深部の胸膜・肺実質を回避する斜刺・横刺の角度を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚（表皮・真皮）", category: "skin", depthDescription: "表面層", description: "胸壁表面の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮で無痛刺入" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下脂肪組織・胸部浅筋膜", category: "subcutaneous", depthDescription: "浅層", description: "皮下脂肪と浅筋膜。", dangerLevel: "safe", clinicalSignificance: "表層皮下出血の予防" },
      { depthIndex: 3, id: "pectoralis-major", name: "大胸筋", category: "muscle", depthDescription: "浅層筋（厚い筋腹）", description: "得気（酸脹感）の主座。", dangerLevel: "safe", clinicalSignificance: "刺鍼の第1標的組織" },
      { depthIndex: 4, id: "pectoralis-minor", name: "小胸筋 / 外肋間筋", category: "muscle", depthDescription: "中深層筋", description: "肋骨間を埋める筋群。", dangerLevel: "caution", clinicalSignificance: "これより深部への直刺刺入は厳禁" },
    ],
    boundaries: [
      { id: "rib-cortex", name: "肋骨（骨皮質）", category: "bone", position: "深部骨性境界", relation: "針先が胸膜へ侵入するのを防ぐ安全ストッパー", description: "あばら骨の骨面。", palpationTip: "肋骨の硬い骨面を指腹で触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "pleura-lung", name: "壁側胸膜・肺実質", category: "organ", relation: "肋間筋の直下深層（深刺で直撃）", dangerLevel: "hazard", description: "肺を包む胸膜腔。直刺深刺により胸膜を穿刺すると外傷性気胸を招く重大リスク。", clinicalSignificance: "直刺深刺は絶対厳禁。必ず肋骨に沿った浅い斜刺・横刺とする" },
      { id: "intercostal-nv", name: "肋間動静脈・肋間神経", category: "vessel", relation: "各肋骨の下縁を走行", dangerLevel: "caution", description: "肋骨下縁に沿う血管神経束。", clinicalSignificance: "肋骨下縁を避け、肋骨上縁または肋間中央を狙う" },
    ],
    svgElements: [
      { layerId: "pleura-lung", elementId: "chest-lung-bg", label: "肺実質・胸膜腔（気胸危険領域！）", shapeType: "path", d: "M 40,210 Q 250,225 460,210 L 460,260 L 40,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      { layerId: "pectoralis-minor", elementId: "chest-intercostal-m", label: "小胸筋・肋間筋層", shapeType: "path", d: "M 40,165 Q 250,175 460,165 L 460,210 Q 250,225 40,210 Z", fill: "#FADBD8", stroke: "#E59866", strokeWidth: 1 },
      { layerId: "rib-cortex", elementId: "chest-rib-1", label: "上位肋骨（骨断面）", shapeType: "ellipse", cx: 120, cy: 185, rx: 35, ry: 18, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 120, y: 188, anchor: "middle" } },
      { layerId: "rib-cortex", elementId: "chest-rib-2", label: "下位肋骨（骨断面）", shapeType: "ellipse", cx: 380, cy: 185, rx: 35, ry: 18, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 380, y: 188, anchor: "middle" } },
      { layerId: "pectoralis-major", elementId: "chest-pec-major", label: "大胸筋（主要得気層）", shapeType: "path", d: "M 40,110 Q 250,115 460,110 L 460,165 Q 250,175 40,165 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 1.5, labelPos: { x: 250, y: 142, anchor: "middle" } },
      { layerId: "skin", elementId: "chest-skin", label: "皮膚（胸郭表面）", shapeType: "path", d: "M 40,55 Q 250,58 460,55 L 460,75 Q 250,78 40,75 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 68, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "chest-needle-path", label: "安全斜刺角度（外方斜刺0.3〜0.5寸）", shapeType: "path", d: "M 230,20 L 265,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "chest-needle-point", label: "刺鍼到達点（大胸筋深面）", shapeType: "circle", cx: 265, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "プロメテウス解剖学アトラス 胸部", "鍼灸気胸事故防止ガイドライン"],
  },

  // 14. 胸骨体部（膻中・中庭・華蓋）
  chest_sternal: {
    titleTemplate: "胸骨体・前正中局所深浅断面モデル",
    level: "第4肋間胸骨体レベル水平横断",
    bodySide: "前胸部・正中",
    posture: "仰臥位",
    axes: { horizontal: ["左側 (Left)", "右側 (Right)"], vertical: ["胸骨前面 (皮膚)", "深部 (胸骨骨皮質・縦隔側)"] },
    summaryTakeaway: "胸骨体直上の薄い軟部組織と胸骨骨膜の構造を理解し、骨膜痛を避けつつ縦隔を保護する平刺（横刺）手技を把握します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "胸骨直上の薄い皮膚。", dangerLevel: "safe", clinicalSignificance: "切皮" },
      { depthIndex: 2, id: "sternal-fascia", name: "胸骨骨膜・大胸筋起始腱膜", category: "fascia", depthDescription: "腱膜層", description: "胸骨表面を覆う硬い線維膜。膻中の得気の主座。", dangerLevel: "safe", clinicalSignificance: "心気・気の巡りの調節点" },
    ],
    boundaries: [
      { id: "sternum-body", name: "胸骨体（強固な骨板）", category: "bone", position: "深部不動境界", relation: "胸腔内臓器（心臓・縦隔）を保護する骨壁", description: "大人の胸骨は強固な骨板。", palpationTip: "胸骨の硬い骨面を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "mediastinum-heart", name: "前縦隔・心膜（胸骨孔に留意）", category: "organ", relation: "胸骨の直下深部", dangerLevel: "caution", description: "先天的に胸骨孔が存在する症例があるため、直刺強圧迫は避ける。", clinicalSignificance: "必ず骨膜に沿った平刺（横刺）とする" },
    ],
    svgElements: [
      { layerId: "sternum-body", elementId: "cs-sternum", label: "胸骨体（骨皮質）", shapeType: "path", d: "M 80,145 Q 250,155 420,145 L 420,225 Q 250,235 80,225 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 250, y: 190, anchor: "middle" } },
      { layerId: "sternal-fascia", elementId: "cs-fascia", label: "胸骨膜・腱膜（膻中の座）", shapeType: "path", d: "M 80,110 Q 250,120 420,110 L 420,145 Q 250,155 80,145 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 2, labelPos: { x: 250, y: 130, anchor: "middle" } },
      { layerId: "skin", elementId: "cs-skin", label: "皮膚・浅筋膜", shapeType: "path", d: "M 60,65 Q 250,75 440,65 L 440,110 Q 250,120 60,110 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 88, anchor: "middle" } },
      // 平刺針路
      { layerId: "needle-indicator", elementId: "cs-needle-path", label: "平刺（横刺）針路（胸骨に沿って進める）", shapeType: "path", d: "M 140,55 L 290,130", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "cs-needle-point", label: "刺鍼到達点（胸骨膜上）", shapeType: "circle", cx: 290, cy: 130, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床鍼灸胸部解剖学"],
  },

  // 15. 前腹部（天枢・中脘・関元・気海・神闕）
  abdomen_anterior: {
    titleTemplate: "前腹部・腹壁局所深浅断面モデル",
    level: "腹壁水平横断面（正中・側腹部）",
    bodySide: "前腹部",
    posture: "仰臥位（腹部を脱力させた自然肢位）",
    axes: { horizontal: ["前正中線 (白線側)", "外側 (側腹壁側)"], vertical: ["腹壁表面 (皮膚)", "深部 (腹膜・大網)"] },
    summaryTakeaway: "腹直筋前葉・後葉の鞘構造と筋腹の位置関係を把握し、腹膜腔へ達しない腹壁筋層内での愛護的刺針を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "柔軟な腹壁皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下脂肪組織", category: "subcutaneous", depthDescription: "浅層", description: "体格に応じた脂肪層。", dangerLevel: "safe", clinicalSignificance: "体格による深度補正" },
      { depthIndex: 3, id: "rectus-sheath-ant", name: "腹直筋鞘前葉", category: "fascia", depthDescription: "筋膜層", description: "腱膜が癒合した強靭な被膜。独特の抵抗感。", dangerLevel: "safe", clinicalSignificance: "第1抵抗感" },
      { depthIndex: 4, id: "rectus-abdominis", name: "腹直筋", category: "muscle", depthDescription: "主筋層", description: "縦走する帯状筋。経気（酸脹感）の主座。", dangerLevel: "safe", clinicalSignificance: "心地よい響きを得る目標層" },
      { depthIndex: 5, id: "rectus-sheath-post", name: "腹直筋鞘後葉・腹横筋膜", category: "fascia", depthDescription: "深部境界", description: "腹直筋深面を裏打ちする薄い膜。", dangerLevel: "caution", clinicalSignificance: "これより深刺は腹膜穿孔の危険" },
    ],
    boundaries: [
      { id: "linea-alba", name: "白線（前正中線）", category: "tendon", position: "内側境界", relation: "任脈の基準線", description: "中脘・関元の位置する線。", palpationTip: "剣状突起と臍を結ぶ線", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "peritoneum-bowel", name: "壁側腹膜・腸管", category: "organ", relation: "腹横筋膜の直下深部", dangerLevel: "hazard", description: "過度の深刺は腹膜炎や腸管穿刺を招く。", clinicalSignificance: "排尿後取穴・筋層内ストップ" },
    ],
    svgElements: [
      { layerId: "peritoneum-bowel", elementId: "abd-danger", label: "腹膜腔・腸管領域（深刺厳禁！）", shapeType: "path", d: "M 40,210 Q 250,220 460,210 L 460,260 L 40,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      { layerId: "rectus-sheath-post", elementId: "abd-sheath-post", label: "腹直筋鞘後葉", shapeType: "path", d: "M 110,185 Q 280,190 440,185 L 440,205 Q 280,210 110,205 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 1.5 },
      { layerId: "rectus-abdominis", elementId: "abd-rectus", label: "腹直筋（目標組織）", shapeType: "path", d: "M 110,115 Q 280,120 440,115 L 440,185 Q 280,190 110,185 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 275, y: 152, anchor: "middle" } },
      { layerId: "rectus-sheath-ant", elementId: "abd-sheath-ant", label: "腹直筋鞘前葉", shapeType: "path", d: "M 110,95 Q 280,100 440,95 L 440,115 Q 280,120 110,115 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 1.5 },
      { layerId: "linea-alba", elementId: "abd-linea", label: "白線（正中線）", shapeType: "path", d: "M 40,80 L 110,80 L 110,210 L 40,210 Z", fill: "#EDE6DA", stroke: "#8C8275", strokeWidth: 2, labelPos: { x: 75, y: 145, anchor: "middle" } },
      { layerId: "skin", elementId: "abd-skin", label: "皮膚表面", shapeType: "path", d: "M 40,45 Q 250,50 460,45 L 460,65 Q 250,70 40,65 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 58, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "abd-needle-path", label: "安全直刺深度（腹直筋層内）", shapeType: "path", d: "M 275,15 L 275,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "abd-needle-point", label: "刺鍼到達点（腹直筋腹）", shapeType: "circle", cx: 275, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "解剖学カラーアトラス 第8版"],
  },

  // 16. 脊椎後正中・棘突起間（大椎・陶道・身柱・神道・至陽・命門・腰陽関）
  spine_posterior_median: {
    titleTemplate: "脊椎後正中・棘突起間局所深浅断面モデル",
    level: "椎骨棘突起間レベル（項胸腰部後正中）矢状断〜水平横断",
    bodySide: "後正中線上（左右対称中心）",
    posture: "座位または伏臥位（軽度脊柱前屈位にて棘突起間隙を開大）",
    axes: { horizontal: ["前側 (椎体・脊柱管)", "後側 (棘突起先端・皮膚)"], vertical: ["上位椎骨棘突起", "下位椎骨棘突起"] },
    summaryTakeaway: "棘上靭帯・棘間靭帯の抵抗感を指先で確かめながら、針先をやや上方へ向けて刺入します。深部の黄靭帯を貫通して硬膜外腔・脊髄腔へ進入しないよう直刺深刺は絶対厳禁です。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層 (0〜2mm)", description: "後背部の厚く緻密な皮膚。", dangerLevel: "safe", clinicalSignificance: "愛護的切皮" },
      { depthIndex: 2, id: "supraspinal-ligament", name: "棘上靭帯（または項靭帯）", category: "fascia", depthDescription: "浅部靭帯層 (2〜6mm)", description: "棘突起先端を結ぶ強靭な膠原線維束。", dangerLevel: "safe", clinicalSignificance: "ずっしりとした重い得気の主座" },
      { depthIndex: 3, id: "interspinal-ligament", name: "棘間靭帯（目標組織）", category: "fascia", depthDescription: "中間靭帯層 (6〜15mm)", description: "上下の棘突起間に張る強固な線維膜。", dangerLevel: "safe", clinicalSignificance: "安全刺入目標層（深刺厳禁）" },
      { depthIndex: 4, id: "ligamentum-flavum", name: "黄靭帯・硬膜外腔（危険限界）", category: "fascia", depthDescription: "最深部境界 (15〜20mm以上)", description: "弾性線維に富む黄靭帯と硬膜外腔静脈叢。", dangerLevel: "hazard", clinicalSignificance: "【危険域】貫通厳禁（脊柱管・脊髄保護）" },
    ],
    boundaries: [
      { id: "upper-spinous", name: "上位棘突起（下縁）", category: "bone", position: "上方指標", relation: "針先の触知骨面", description: "上位椎骨の棘突起。", palpationTip: "棘突起先端を触知", dangerLevel: "safe" },
      { id: "lower-spinous", name: "下位棘突起（上縁）", category: "bone", position: "下方指標", relation: "針先の触知骨面", description: "下位椎骨の棘突起。", palpationTip: "棘突起間隙を確認", dangerLevel: "safe" },
      { id: "interspinal-space", name: "棘突起間隙", category: "membrane", position: "刺入ルート", relation: "鍼を進める安全間隙", description: "靭帯組織が充実する間隙。", palpationTip: "圧痛・硬結を捉える", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "spinal-cord", name: "硬膜外腔・脊髄腔", category: "organ", relation: "黄靭帯直下深部", dangerLevel: "hazard", description: "深刺直刺による脊髄損傷・硬膜外血腫を絶対に避ける。", clinicalSignificance: "直刺深刺は絶対厳禁。必ずやや上方へ斜刺する" },
      { id: "erector-spinae-lateral", name: "脊柱起立筋（内側部）", category: "organ", relation: "左右両外側", dangerLevel: "caution", description: "正中から外れると筋腹に進入する。", clinicalSignificance: "正中線を外さない" },
    ],
    svgElements: [
      { layerId: "spinal-cord", elementId: "spm-danger", label: "脊柱管・脊髄（直刺深刺危険領域！）", shapeType: "path", d: "M 120,210 Q 280,220 440,210 L 440,260 L 120,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      { layerId: "ligamentum-flavum", elementId: "spm-flavum", label: "黄靭帯（安全限界バリア）", shapeType: "path", d: "M 120,185 Q 280,190 440,185 L 440,205 Q 280,210 120,205 Z", fill: "#FDE68A", stroke: "#D97706", strokeWidth: 1.5 },
      { layerId: "upper-spinous", elementId: "spm-spin-up", label: "上位棘突起", shapeType: "path", d: "M 40,65 L 140,65 L 160,140 L 80,170 L 40,170 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 90, y: 110, anchor: "middle" } },
      { layerId: "lower-spinous", elementId: "spm-spin-down", label: "下位棘突起", shapeType: "path", d: "M 340,65 L 440,65 L 440,170 L 320,170 L 340,140 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 390, y: 110, anchor: "middle" } },
      { layerId: "interspinal-ligament", elementId: "spm-interspinal", label: "棘間靭帯（刺鍼目標層）", shapeType: "path", d: "M 140,95 Q 280,100 340,95 L 340,185 Q 280,190 140,185 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 2, labelPos: { x: 240, y: 140, anchor: "middle" } },
      { layerId: "supraspinal-ligament", elementId: "spm-supraspinal", label: "棘上靭帯", shapeType: "path", d: "M 40,65 Q 240,70 440,65 L 440,95 Q 240,100 40,95 Z", fill: "#CBD5E1", stroke: "#64748B", strokeWidth: 1.5, labelPos: { x: 240, y: 80, anchor: "middle" } },
      { layerId: "skin", elementId: "spm-skin", label: "皮膚表面", shapeType: "path", d: "M 40,40 Q 240,45 440,40 L 440,65 Q 240,70 40,65 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 240, y: 52, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "spm-needle-path", label: "安全斜刺針路（上方斜刺・棘間靭帯内）", shapeType: "path", d: "M 270,15 L 230,140", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "spm-needle-point", label: "刺鍼到達点（棘間靭帯）", shapeType: "circle", cx: 230, cy: 140, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "鍼灸安全ガイドライン（脊椎棘突起間刺鍼の解剖）"],
  },

  // 17. 背部兪穴（肺兪・心兪・膈兪・肝兪・大杼）
  back_paravertebral: {
    titleTemplate: "背部・肩甲間部局所深浅断面モデル",
    level: "胸椎棘突起・肋骨角レベル水平横断",
    bodySide: "背部",
    posture: "腹臥位または座位（背中を丸めた肢位）",
    axes: { horizontal: ["後正中線 (棘突起側)", "外側 (肩甲骨・肋骨側)"], vertical: ["背部体表 (皮膚)", "深部 (肋骨・胸膜側)"] },
    summaryTakeaway: "僧帽筋・菱形筋から脊柱起立筋への重なりと、直下を走る肋骨面を指標とした気胸予防の刺針角度を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "厚く緻密な背部皮膚。", dangerLevel: "safe", clinicalSignificance: "しっかりした切皮" },
      { depthIndex: 2, id: "trapezius-rhomboid", name: "僧帽筋 / 菱形筋", category: "muscle", depthDescription: "浅背筋群", description: "背部のコリの主座。", dangerLevel: "safe", clinicalSignificance: "筋緊張緩和" },
      { depthIndex: 3, id: "erector-spinae", name: "脊柱起立筋（最長筋・腸肋筋）", category: "muscle", depthDescription: "深背筋群", description: "背部兪穴の最重要得気組織。", dangerLevel: "safe", clinicalSignificance: "内臓反射・自律神経調整" },
    ],
    boundaries: [
      { id: "spinous-process", name: "胸椎棘突起（後正中線）", category: "bone", position: "内側基準指標", relation: "高さを数える不動の指標", description: "背骨の中心の突起。", palpationTip: "背骨の中心を触知", dangerLevel: "safe" },
      { id: "rib-angle", name: "肋骨（骨面）", category: "bone", position: "深部安全壁", relation: "針先を受け止める骨面", description: "脊柱起立筋の底面を支える肋骨。", palpationTip: "深部で骨面に触れると安全", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "pleura-lung-back", name: "壁側胸膜・肺実質（背側）", category: "organ", relation: "肋骨間隙の直下深層", dangerLevel: "hazard", description: "外側への直刺深刺は気胸を引き起こす重大リスク。", clinicalSignificance: "必ず脊柱方向に向けた斜刺とする" },
    ],
    svgElements: [
      { layerId: "pleura-lung-back", elementId: "bp-danger", label: "肺実質・胸膜腔（気胸危険領域！）", shapeType: "path", d: "M 150,210 Q 300,225 460,210 L 460,260 L 150,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      { layerId: "spinous-process", elementId: "bp-vert", label: "胸椎棘突起", shapeType: "path", d: "M 40,60 L 110,60 L 140,160 L 90,240 L 40,240 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 75, y: 150, anchor: "middle" } },
      { layerId: "rib-angle", elementId: "bp-rib", label: "肋骨（安全ストッパー）", shapeType: "ellipse", cx: 320, cy: 195, rx: 45, ry: 18, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 320, y: 198, anchor: "middle" } },
      { layerId: "erector-spinae", elementId: "bp-erector", label: "脊柱起立筋（主目標組織）", shapeType: "path", d: "M 130,115 Q 280,120 440,125 L 440,185 Q 280,195 130,175 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 260, y: 152, anchor: "middle" } },
      { layerId: "skin", elementId: "bp-skin", label: "皮膚・皮下組織", shapeType: "path", d: "M 40,40 Q 250,45 460,55 L 460,95 Q 280,85 110,80 L 40,60 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 65, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "bp-needle-path", label: "安全斜刺針路（脊柱方向へ内側斜刺）", shapeType: "path", d: "M 310,15 L 240,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "bp-needle-point", label: "刺鍼到達点（起立筋深層）", shapeType: "circle", cx: 240, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床鍼灸マニュアル（背部兪穴気胸防止）"],
  },

  // 17. 腰背部・仙骨部（腎兪・大腸兪・命門・八髎穴）
  lumbar_paravertebral: {
    titleTemplate: "腰仙部・腰背局所深浅断面モデル",
    level: "第2〜第4腰椎・仙骨部水平横断",
    bodySide: "腰部",
    posture: "腹臥位（腰椎前弯を減じたフラット肢位）",
    axes: { horizontal: ["後正中線 (棘突起側)", "外側 (腸骨稜側)"], vertical: ["腰部体表 (皮膚)", "深部 (多裂筋・椎体)"] },
    summaryTakeaway: "胸腰筋膜を通り多裂筋・最長筋へ至る深浅構造と、深部腰神経根・腎臓下極への解剖学的距離を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "腰部の厚い皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "thoracolumbar-fascia", name: "胸腰筋膜（後葉）", category: "fascia", depthDescription: "腱膜層", description: "強靭で硬い線維膜。", dangerLevel: "safe", clinicalSignificance: "筋膜リリース" },
      { depthIndex: 3, id: "erector-spinae-lumbar", name: "脊柱起立筋（腰最長筋）", category: "muscle", depthDescription: "主筋層", description: "腰痛治療の主目標組織。", dangerLevel: "safe", clinicalSignificance: "腰痛治療の座" },
      { depthIndex: 4, id: "multifidus-muscle", name: "多裂筋", category: "muscle", depthDescription: "深層インナーマッスル", description: "腰椎椎弓板に接する最深層筋。", dangerLevel: "safe", clinicalSignificance: "深部安定化筋" },
    ],
    boundaries: [
      { id: "lumbar-spinous", name: "腰椎棘突起", category: "bone", position: "内側基準指標", relation: "ヤコビー線などの骨度指標", description: "腰椎の中心骨。", palpationTip: "棘突起を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "kidney-lower-pole", name: "腎臓下極（上腰部のみ）", category: "organ", relation: "第1〜第2腰椎レベル外側深部", dangerLevel: "hazard", description: "肋骨下縁付近の過度な外側深刺は腎臓穿刺の危険あり。", clinicalSignificance: "深刺を避ける" },
    ],
    svgElements: [
      { layerId: "lumbar-spinous", elementId: "lp-vert", label: "腰椎棘突起・椎弓", shapeType: "path", d: "M 40,50 L 110,50 L 135,140 L 180,180 L 140,230 L 40,230 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 75, y: 140, anchor: "middle" } },
      { layerId: "erector-spinae-lumbar", elementId: "lp-erector", label: "脊柱起立筋（主得気層）", shapeType: "path", d: "M 120,90 Q 280,95 440,110 L 440,185 Q 260,165 135,140 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 280, y: 135, anchor: "middle" } },
      { layerId: "skin", elementId: "lp-skin", label: "皮膚・皮下脂肪", shapeType: "path", d: "M 40,35 Q 250,40 460,50 L 450,95 Q 280,80 110,75 L 40,50 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 58, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "lp-needle-path", label: "標準直刺針路（1.0〜1.5寸）", shapeType: "path", d: "M 270,10 L 270,155", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "lp-needle-point", label: "刺鍼到達点（起立筋深層）", shapeType: "circle", cx: 270, cy: 155, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "クリニカルマッサージ 第2版"],
  },

  // 18. 臀部（環跳・秩辺・承扶・胞肓）
  buttock_gluteal: {
    titleTemplate: "臀部・坐骨神経・梨状筋局所深浅断面モデル",
    level: "大転子〜仙骨裂孔（環跳高位）水平横断",
    bodySide: "右臀部",
    posture: "側臥位（下側の下肢を伸ばし上側を屈曲させた肢位）または腹臥位",
    axes: { horizontal: ["内側 (仙骨側)", "外側 (大転子側)"], vertical: ["臀部表面 (皮膚)", "深部 (梨状筋・坐骨神経側)"] },
    summaryTakeaway: "大臀筋・中臀筋の厚い筋層と、その深面を通る梨状筋および坐骨神経の立体位置関係を把握し、坐骨神経痛治療の深浅深度を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "臀部の厚い皮膚。", dangerLevel: "safe", clinicalSignificance: "しっかりした切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下脂肪組織（臀部脂肪体）", category: "subcutaneous", depthDescription: "厚い脂肪層", description: "体格により厚みが非常に大きい脂肪層。長針選定の基準。", dangerLevel: "safe", clinicalSignificance: "2.5〜3.0寸の長針を選定" },
      { depthIndex: 3, id: "gluteus-maximus", name: "大臀筋 / 中臀筋", category: "muscle", depthDescription: "浅層強大筋", description: "骨盤を覆う最大の筋肉。環跳の第1通過筋層。", dangerLevel: "safe", clinicalSignificance: "重だるい得気の座" },
      { depthIndex: 4, id: "piriformis-muscle", name: "梨状筋 / 内閉鎖筋", category: "muscle", depthDescription: "深層外旋筋群", description: "仙骨から大転子へ走る筋。坐骨神経を絞扼しやすい（梨状筋症候群）。", dangerLevel: "safe", clinicalSignificance: "坐骨神経痛の根本治療点" },
    ],
    boundaries: [
      { id: "greater-trochanter", name: "大転子（股関節の骨）", category: "bone", position: "外側基準骨", relation: "環跳の触診指標", description: "大腿骨の外側の一番高い出っ張り。", palpationTip: "大腿外側の硬い骨頭を触知", dangerLevel: "safe" },
      { id: "sacral-hiatus", name: "仙骨裂孔（仙骨下端）", category: "bone", position: "内側基準指標", relation: "環跳のラインの内側端", description: "お尻の割れ目の上端。", palpationTip: "仙骨下端のV字のくぼみを触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "sciatic-nerve", name: "坐骨神経（人体最大の神経幹）", category: "nerve", relation: "梨状筋下孔を通過し大腿後面へ下行", dangerLevel: "hazard", description: "直撃すると足先へ強烈な電撃痛が走る。激しい雀啄・回旋は避ける。", clinicalSignificance: "電撃痛時はわずかに針を引き、神経近傍で留針する" },
    ],
    svgElements: [
      { layerId: "greater-trochanter", elementId: "bg-trochanter", label: "大転子（大腿骨）", shapeType: "ellipse", cx: 400, cy: 165, rx: 35, ry: 30, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 400, y: 168, anchor: "middle" } },
      { layerId: "piriformis-muscle", elementId: "bg-piriformis", label: "梨状筋（深層筋）", shapeType: "path", d: "M 80,145 Q 240,165 370,165 L 360,205 Q 240,210 80,185 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "sciatic-nerve", elementId: "bg-sciatic-n", label: "坐骨神経（注意構造）", shapeType: "circle", cx: 270, cy: 185, r: 10, fill: "#F1C40F", stroke: "#B7950B", strokeWidth: 2 },
      { layerId: "gluteus-maximus", elementId: "bg-maximus", label: "大臀筋（強大筋層）", shapeType: "path", d: "M 60,95 Q 250,110 440,105 L 430,165 Q 250,155 60,145 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 130, anchor: "middle" } },
      { layerId: "skin", elementId: "bg-skin", label: "臀部皮膚・厚い脂肪層", shapeType: "path", d: "M 50,40 Q 250,55 450,50 L 450,95 Q 250,105 50,90 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 72, anchor: "middle" } },
      // 長針直刺針路（1.5〜2.5寸）
      { layerId: "needle-indicator", elementId: "bg-needle-path", label: "環跳長針直刺針路（1.5〜2.5寸）", shapeType: "path", d: "M 290,15 L 290,170", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "bg-needle-point", label: "刺鍼到達点（梨状筋・坐骨神経近傍）", shapeType: "circle", cx: 290, cy: 170, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "坐骨神経刺鍼の解剖学的安全深度研究"],
  },

  // 19. 大腿前外側（伏兎・梁丘・風市・中瀆）
  thigh_anterior: {
    titleTemplate: "大腿前外側・大腿四頭筋局所深浅断面モデル",
    level: "大腿骨中央〜遠位1/3水平横断",
    bodySide: "右大腿",
    posture: "仰臥位（膝関節伸展位）",
    axes: { horizontal: ["内側 (大腿直筋側)", "外側 (腸脛靭帯側)"], vertical: ["前面体表 (皮膚)", "深部 (大腿骨・骨膜側)"] },
    summaryTakeaway: "大腿直筋・外側広筋・中間広筋の大腿四頭筋群と腸脛靭帯、および中心を貫く大腿骨の深浅関係を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "大腿前面の皮膚。", dangerLevel: "safe", clinicalSignificance: "切皮" },
      { depthIndex: 2, id: "iliotibial-tract-fascia", name: "大腿筋膜・腸脛靭帯", category: "fascia", depthDescription: "腱膜層", description: "大腿外側を強力に補強する強靭な帯（風市・中瀆の座）。", dangerLevel: "safe", clinicalSignificance: "外側筋膜リリース" },
      { depthIndex: 3, id: "quadriceps-femoris", name: "大腿四頭筋（外側広筋・大腿直筋）", category: "muscle", depthDescription: "強大筋層", description: "膝を伸ばす最大の筋肉群。伏兎・梁丘の主座。", dangerLevel: "safe", clinicalSignificance: "膝痛・大腿神経痛の治療点" },
    ],
    boundaries: [
      { id: "femur-shaft", name: "大腿骨（骨幹部）", category: "bone", position: "中心骨格", relation: "深部安全ストッパー", description: "大腿の中心を通る太い骨。", palpationTip: "深部の骨感を意識", dangerLevel: "safe" },
      { id: "patella-superior", name: "膝蓋骨（お皿）", category: "bone", position: "下方基準指標", relation: "梁丘・伏兎寸法の起点", description: "膝のお皿の上縁。", palpationTip: "膝蓋骨底（上縁）を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "femoral-nerve-muscular-branches", name: "大腿神経筋枝", category: "nerve", relation: "大腿直筋と中間広筋の間を走行", dangerLevel: "safe", description: "大腿四頭筋を動かす神経。適度な刺激で膝伸展の筋収縮反射。", clinicalSignificance: "筋力低下・膝折れの改善" },
    ],
    svgElements: [
      { layerId: "femur-shaft", elementId: "ta-femur", label: "大腿骨（骨皮質）", shapeType: "ellipse", cx: 250, cy: 175, rx: 42, ry: 32, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 250, y: 178, anchor: "middle" } },
      { layerId: "quadriceps-femoris", elementId: "ta-quads", label: "大腿四頭筋（外側広筋・直筋）", shapeType: "path", d: "M 80,95 Q 250,110 420,95 L 410,165 Q 250,175 80,165 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 135, anchor: "middle" } },
      { layerId: "skin", elementId: "ta-skin", label: "大腿前面皮膚・浅筋膜", shapeType: "path", d: "M 60,45 Q 250,60 440,50 L 440,85 Q 250,100 60,85 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 68, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "ta-needle-path", label: "直刺針路（1.0〜1.5寸）", shapeType: "path", d: "M 250,15 L 250,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "ta-needle-point", label: "刺鍼到達点（四頭筋筋腹内）", shapeType: "circle", cx: 250, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "大腿部解剖アトラス"],
  },

  // 20. 大腿内側（血海・箕門・陰包・足五里・衝門）
  thigh_medial: {
    titleTemplate: "大腿内側・内転筋管・大腿動脈局所深浅断面モデル",
    level: "大腿内側中央水平横断",
    bodySide: "右大腿内側",
    posture: "仰臥位（股関節外旋・膝関節軽度屈曲位）",
    axes: { horizontal: ["前内側 (内側広筋側)", "後内側 (薄筋・内転筋側)"], vertical: ["内側表面 (皮膚)", "深部 (内転筋管・大腿骨側)"] },
    summaryTakeaway: "内側広筋と大内転筋・薄筋の層構造、および内転筋管を走行する大腿動静脈・伏在神経の拍動確認と回避を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "大腿内側の皮膚。", dangerLevel: "safe", clinicalSignificance: "切皮" },
      { depthIndex: 2, id: "vastus-medialis", name: "内側広筋 / 縫工筋", category: "muscle", depthDescription: "前内側筋腹", description: "膝のお皿の内側上方に盛り上がる筋肉。血海の主座。", dangerLevel: "safe", clinicalSignificance: "血行障害・月経不順の要穴" },
      { depthIndex: 3, id: "adductor-magnus", name: "長内転筋 / 大内転筋 / 薄筋", category: "muscle", depthDescription: "内転筋群", description: "太ももを内側に閉じる筋肉群。", dangerLevel: "safe", clinicalSignificance: "骨盤底筋・内転筋緊張の緩和" },
    ],
    boundaries: [
      { id: "patella-medial", name: "膝蓋骨内側縁", category: "bone", position: "下方基準指標", relation: "血海の取穴起点", description: "膝のお皿の内側の角。", palpationTip: "膝蓋骨の内側上角から上方2寸", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "femoral-vessels-adductor-canal", name: "大腿動静脈・伏在神経", category: "vessel", relation: "縫工筋深面の内転筋管内を走行", dangerLevel: "hazard", description: "太い主幹動脈。箕門・衝門等では必ず指先で拍動を確認し直撃を避ける。", clinicalSignificance: "動脈壁直撃による血腫を防止" },
    ],
    svgElements: [
      { layerId: "femoral-vessels-adductor-canal", elementId: "tm-artery", label: "大腿動静脈（内転筋管・注意構造）", shapeType: "circle", cx: 210, cy: 165, r: 11, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 2 },
      { layerId: "adductor-magnus", elementId: "tm-adductor", label: "内転筋群（長内転筋・薄筋）", shapeType: "path", d: "M 230,120 Q 340,130 420,125 L 410,185 Q 340,195 230,180 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "vastus-medialis", elementId: "tm-vastus", label: "内側広筋（血海の主座）", shapeType: "path", d: "M 60,110 Q 150,115 230,120 L 220,175 Q 150,180 60,165 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 140, y: 145, anchor: "middle" } },
      { layerId: "skin", elementId: "tm-skin", label: "大腿内側皮膚", shapeType: "path", d: "M 50,55 Q 250,70 440,60 L 440,95 Q 250,105 50,90 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 78, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "tm-needle-path", label: "血海直刺針路（1.0〜1.5寸）", shapeType: "path", d: "M 140,25 L 140,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "tm-needle-point", label: "刺鍼到達点（内側広筋筋腹）", shapeType: "circle", cx: 140, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "大腿三角・内転筋管の解剖学"],
  },

  // 21. 膝関節部（犢鼻・膝眼・曲泉・陰谷）
  knee_joint: {
    titleTemplate: "膝関節・膝蓋靭帯・関節腔局所深浅断面モデル",
    level: "膝蓋靭帯・大腿骨顆部レベル水平横断",
    bodySide: "右膝関節",
    posture: "座位（膝関節90度屈曲位）",
    axes: { horizontal: ["内側 (内側膝眼側)", "外側 (外側膝眼・犢鼻側)"], vertical: ["膝前面 (皮膚)", "深部 (膝蓋下脂肪体・関節腔)"] },
    summaryTakeaway: "膝蓋靭帯の両側のくぼみ（外側膝眼・内側膝眼）から膝蓋下脂肪体を通り、膝関節腔内へ斜めに進める針路を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "膝前面の皮膚。", dangerLevel: "safe", clinicalSignificance: "切皮" },
      { depthIndex: 2, id: "infrapatellar-fat-pad", name: "膝蓋下脂肪体（ホッファ脂肪体）", category: "subcutaneous", depthDescription: "関節前クッション", description: "膝蓋靭帯の深面を満たす豊富な神経終末を持つ脂肪組織。変形性膝関節症で痛みの発生源になりやすい。", dangerLevel: "safe", clinicalSignificance: "膝痛・炎症消退の主目標" },
      { depthIndex: 3, id: "joint-cavity", name: "膝関節腔 / 滑膜", category: "fascia", depthDescription: "深部関節腔", description: "関節軟骨・半月板が存在する関節包内。", dangerLevel: "caution", clinicalSignificance: "感染予防のため厳重な局所消毒" },
    ],
    boundaries: [
      { id: "patellar-ligament", name: "膝蓋靭帯（中央腱）", category: "tendon", position: "中央指標", relation: "犢鼻（外側）と内膝眼を分ける腱", description: "膝蓋骨から脛骨粗面をつなぐ太い靭帯。", palpationTip: "膝のお皿の下の中央の太いスジを触知", dangerLevel: "safe" },
      { id: "patella-inferior", name: "膝蓋骨下端", category: "bone", position: "上方基準骨", relation: "犢鼻の高さの目印", description: "膝のお皿の一番下の尖端。", palpationTip: "膝蓋骨の尖端を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "meniscus", name: "内外側半月板・軟骨面", category: "organ", relation: "関節腔の深部隙間", dangerLevel: "safe", description: "大腿骨と脛骨の間の線維軟骨。", clinicalSignificance: "針先で軟骨を過度に擦らない愛護的操作" },
    ],
    svgElements: [
      { layerId: "patellar-ligament", elementId: "kj-ligament", label: "膝蓋靭帯（中央）", shapeType: "ellipse", cx: 250, cy: 110, rx: 35, ry: 25, fill: "#EDE6DA", stroke: "#8C8275", strokeWidth: 2, labelPos: { x: 250, y: 113, anchor: "middle" } },
      { layerId: "infrapatellar-fat-pad", elementId: "kj-fat-pad", label: "膝蓋下脂肪体（ホッファ脂肪体・目標）", shapeType: "path", d: "M 80,105 Q 250,115 420,105 L 420,175 Q 250,185 80,175 Z", fill: "#FAF1DF", stroke: "#D6C7AC", strokeWidth: 1.5, labelPos: { x: 340, y: 145, anchor: "middle" } },
      { layerId: "skin", elementId: "kj-skin", label: "膝前面皮膚", shapeType: "path", d: "M 60,60 Q 250,75 440,60 L 440,95 Q 250,110 60,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 80, anchor: "middle" } },
      // 犢鼻斜刺針路（外側くぼみから中央深部関節腔へ）
      { layerId: "needle-indicator", elementId: "kj-needle-path", label: "犢鼻斜刺針路（膝蓋靭帯外縁から中央深部へ）", shapeType: "path", d: "M 370,35 L 270,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "kj-needle-point", label: "刺鍼到達点（膝蓋下脂肪体深部）", shapeType: "circle", cx: 270, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "変形性膝関節症と膝蓋下脂肪体の解剖研究"],
  },

  // 22. 下腿前外側（足三里・上巨虚・豊隆・陽陵泉）
  lower_leg_anterior: {
    titleTemplate: "下腿前外側・前区画局所深浅断面モデル",
    level: "脛骨粗面下方3寸（下腿上・中1/3）水平横断",
    bodySide: "右下腿",
    posture: "仰臥位または座位（膝関節を軽く屈曲させた肢位）",
    axes: { horizontal: ["内側 (Medial / 脛骨側)", "外側 (Lateral / 腓骨側)"], vertical: ["下腿前面 (皮膚)", "後方深面 (骨間膜側)"] },
    summaryTakeaway: "脛骨前縁と前脛骨筋の筋腹、および深部を走る前脛骨動静脈・深腓骨神経の位置関係を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "すね前面の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・下腿浅筋膜", category: "subcutaneous", depthDescription: "浅層", description: "下腿前面の結合組織。", dangerLevel: "safe", clinicalSignificance: "表層滑動" },
      { depthIndex: 3, id: "tibialis-anterior", name: "前脛骨筋（TA）", category: "muscle", depthDescription: "主筋腹", description: "足関節を背屈させる筋肉。足三里の最大得気座。", dangerLevel: "safe", clinicalSignificance: "強い酸脹感を生む主座" },
      { depthIndex: 4, id: "extensor-digitorum-longus", name: "長趾伸筋 / 前筋間中隔", category: "muscle", depthDescription: "外側筋群", description: "前脛骨筋の外側に位置する筋肉。", dangerLevel: "safe", clinicalSignificance: "外側区画との筋間取穴" },
    ],
    boundaries: [
      { id: "tibia-anterior-border", name: "脛骨前縁（すねの骨）", category: "bone", position: "内側不動指標", relation: "足三里（外方1横指）の基準線", description: "触知される硬いすねの骨縁。", palpationTip: "脛骨前縁の硬い骨稜を触知", dangerLevel: "safe" },
      { id: "fibula-shaft", name: "腓骨", category: "bone", position: "外側骨性境界", relation: "下腿外側区画の支持骨", description: "下腿外側深部の骨。", palpationTip: "腓骨頭から下行するライン", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "anterior-tibial-artery-deep-peroneal-n", name: "前脛骨動静脈・深腓骨神経", category: "nerve", relation: "前脛骨筋と長趾伸筋の筋間深部", dangerLevel: "caution", description: "足背動脈へ連なる動脈と神経。", clinicalSignificance: "骨間膜直上の過度の深刺は控える" },
    ],
    svgElements: [
      { layerId: "tibia-anterior-border", elementId: "lla-tibia", label: "脛骨（すねの骨）", shapeType: "path", d: "M 70,110 L 140,110 L 160,200 L 90,220 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 115, y: 155, anchor: "middle" } },
      { layerId: "fibula-shaft", elementId: "lla-fibula", label: "腓骨", shapeType: "ellipse", cx: 410, cy: 165, rx: 25, ry: 20, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 410, y: 168, anchor: "middle" } },
      { layerId: "tibialis-anterior", elementId: "lla-ta-muscle", label: "前脛骨筋（足三里の主座）", shapeType: "path", d: "M 140,110 Q 250,115 320,120 L 300,185 Q 230,195 160,200 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 230, y: 145, anchor: "middle" } },
      { layerId: "extensor-digitorum-longus", elementId: "lla-edl-muscle", label: "長趾伸筋", shapeType: "path", d: "M 320,120 Q 360,125 390,135 L 385,180 L 300,185 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "skin", elementId: "lla-skin", label: "下腿前面皮膚・浅筋膜", shapeType: "path", d: "M 50,65 Q 250,75 440,80 L 435,115 Q 250,105 50,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "lla-needle-path", label: "標準直刺針路（1.0〜1.5寸）", shapeType: "path", d: "M 220,20 L 220,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "lla-needle-point", label: "刺鍼到達点（前脛骨筋腹）", shapeType: "circle", cx: 220, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "Casey GP (2022) 足三里解剖モデル"],
  },

  // 23. 下腿内側（三陰交・陰陵泉・地機・太渓）
  lower_leg_medial: {
    titleTemplate: "下腿内側・後脛骨筋区画局所深浅断面モデル",
    level: "内果上方3寸（三陰交高位）水平横断",
    bodySide: "右下腿内側",
    posture: "仰臥位（股関節外旋・膝関節軽度屈曲位）",
    axes: { horizontal: ["前内側 (脛骨内側面)", "後外側 (ヒラメ筋側)"], vertical: ["内側体表 (皮膚)", "深部 (後脛骨筋・骨間膜)"] },
    summaryTakeaway: "脛骨内側縁の骨際からヒラメ筋・長趾屈筋・後脛骨筋へ至る層構造と、後脛骨動脈・脛骨神経の走向を把握します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "下腿内側の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "soleus-flexor-digitorum", name: "ヒラメ筋 / 長趾屈筋", category: "muscle", depthDescription: "中層筋腹", description: "脛骨内側縁のすぐ後ろにある筋肉。三陰交の主座。", dangerLevel: "safe", clinicalSignificance: "婦人科・血行促進の刺激点" },
      { depthIndex: 3, id: "tibialis-posterior", name: "後脛骨筋", category: "muscle", depthDescription: "深層筋", description: "下腿深部に位置する筋。", dangerLevel: "safe", clinicalSignificance: "深部刺激到達層" },
    ],
    boundaries: [
      { id: "tibia-medial-border", name: "脛骨内側縁（骨際）", category: "bone", position: "前側境界指標", relation: "三陰交・陰陵泉の不動の取穴線", description: "すねの内側の硬い骨の縁。", palpationTip: "脛骨内側面の後ろの角を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "posterior-tibial-artery-tibial-n", name: "後脛骨動脈・脛骨神経", category: "vessel", relation: "ヒラメ筋深面・後脛骨筋の間を走行", dangerLevel: "caution", description: "足底へ血液と知覚を送る主要血管・神経幹。", clinicalSignificance: "太渓・三陰交深刺時の過度な雀啄を避ける" },
    ],
    svgElements: [
      { layerId: "tibia-medial-border", elementId: "llm-tibia", label: "脛骨（内側面・後縁）", shapeType: "path", d: "M 70,80 L 160,80 L 170,190 L 80,180 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 120, y: 135, anchor: "middle" } },
      { layerId: "tibialis-posterior", elementId: "llm-tp-muscle", label: "後脛骨筋（深層）", shapeType: "path", d: "M 170,140 Q 260,150 360,155 L 350,215 L 170,190 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "posterior-tibial-artery-tibial-n", elementId: "llm-nv", label: "後脛骨動脈・脛骨神経", shapeType: "circle", cx: 270, cy: 165, r: 8, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "soleus-flexor-digitorum", elementId: "llm-soleus", label: "ヒラメ筋・長趾屈筋（三陰交主座）", shapeType: "path", d: "M 160,80 Q 270,90 420,95 L 410,150 Q 270,145 170,140 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 285, y: 115, anchor: "middle" } },
      { layerId: "skin", elementId: "llm-skin", label: "内側皮膚・浅筋膜", shapeType: "path", d: "M 50,45 Q 250,55 440,60 L 440,85 Q 250,80 50,70 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 62, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "llm-needle-path", label: "脛骨後縁への直刺針路（0.8〜1.2寸）", shapeType: "path", d: "M 195,15 L 195,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "llm-needle-point", label: "刺鍼到達点（屈筋群筋膜）", shapeType: "circle", cx: 195, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "三陰交刺鍼の安全性と深度研究"],
  },

  // 24. 下腿後側・膝窩（委中・承山・合陽・昆侖）
  lower_leg_posterior: {
    titleTemplate: "下腿後側・膝窩ふくらはぎ局所深浅断面モデル",
    level: "膝窩横紋〜ふくらはぎ中央水平横断",
    bodySide: "右下腿後側",
    posture: "腹臥位（下腿をリラックスさせた自然肢位）",
    axes: { horizontal: ["内側 (内側頭側)", "外側 (外側頭側)"], vertical: ["後表面 (皮膚)", "深部 (骨・膝窩動静脈側)"] },
    summaryTakeaway: "腓腹筋内側頭・外側頭とヒラメ筋の二層構造、および膝窩中央を縦走する脛骨神経・膝窩動静脈の深浅関係を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "ふくらはぎ後面の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "gastrocnemius", name: "腓腹筋（内側頭・外側頭）", category: "muscle", depthDescription: "浅層筋腹", description: "アキレス腱へ連なる力強い筋肉。委中・承山の主座。", dangerLevel: "safe", clinicalSignificance: "腰背部痛・足の疲れの治療点" },
      { depthIndex: 3, id: "soleus-post", name: "ヒラメ筋", category: "muscle", depthDescription: "深層筋", description: "腓腹筋の深面にある幅広い筋肉。", dangerLevel: "safe", clinicalSignificance: "持続的筋緊張の緩和" },
    ],
    boundaries: [
      { id: "popliteal-crease", name: "膝窩横紋", category: "tendon", position: "上下指標", relation: "委中の基準線", description: "膝の裏のしわ。", palpationTip: "膝裏中央のしわを触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "tibial-nerve-popliteal-vessels", name: "脛骨神経・膝窩動静脈", category: "vessel", relation: "膝窩中央の深部を直走", dangerLevel: "hazard", description: "下肢の主要大動脈と神経幹。直接有痕灸や過度な直刺深刺は禁忌。", clinicalSignificance: "膝窩大血管への直撃回避" },
    ],
    svgElements: [
      { layerId: "tibial-nerve-popliteal-vessels", elementId: "llp-nerve-vessel", label: "脛骨神経・膝窩動静脈（危険領域）", shapeType: "ellipse", cx: 250, cy: 190, rx: 35, ry: 25, fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      { layerId: "tibial-nerve-popliteal-vessels", elementId: "llp-popliteal-art", label: "膝窩動脈", shapeType: "circle", cx: 245, cy: 185, r: 10, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "tibial-nerve-popliteal-vessels", elementId: "llp-tibial-n", label: "脛骨神経", shapeType: "circle", cx: 260, cy: 175, r: 6, fill: "#F1C40F", stroke: "#B7950B", strokeWidth: 1.5 },
      { layerId: "soleus-post", elementId: "llp-soleus-m", label: "ヒラメ筋（深層）", shapeType: "path", d: "M 80,150 Q 250,165 420,150 L 410,215 Q 250,225 80,215 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "gastrocnemius", elementId: "llp-gastroc-med", label: "腓腹筋内側頭", shapeType: "ellipse", cx: 170, cy: 130, rx: 75, ry: 35, fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 170, y: 133, anchor: "middle" } },
      { layerId: "gastrocnemius", elementId: "llp-gastroc-lat", label: "腓腹筋外側頭", shapeType: "ellipse", cx: 330, cy: 130, rx: 75, ry: 35, fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 330, y: 133, anchor: "middle" } },
      { layerId: "skin", elementId: "llp-skin", label: "膝窩・後面の皮膚", shapeType: "path", d: "M 60,60 Q 250,70 440,60 L 440,85 Q 250,95 60,85 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 72, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "llp-needle-path", label: "膝窩中央への直刺針路（0.5〜1.0寸）", shapeType: "path", d: "M 250,20 L 250,130", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "llp-needle-point", label: "刺鍼到達点（腓腹筋間隙）", shapeType: "circle", cx: 250, cy: 130, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "下肢後区画解剖アトラス"],
  },

  // 25. 足背・足底（太衝・行間・太白・湧泉）
  foot_dorsal: {
    titleTemplate: "足部（足背・足底）局所深浅断面モデル",
    level: "中足骨間隙・足底腱膜レベル水平横断",
    bodySide: "右足",
    posture: "仰臥位（足関節中間位）",
    axes: { horizontal: ["内側 (第1中足骨側)", "外側 (第2中足骨側)"], vertical: ["足背側 (表面)", "足底側 (深面)"] },
    summaryTakeaway: "第1・第2中足骨底の結合部前方の陥凹と、足背動脈の拍動、および骨間筋への刺入角度を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "足背皮膚", category: "skin", depthDescription: "表面層", description: "薄く腱が透見できる皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・足背静脈弓", category: "subcutaneous", depthDescription: "浅層", description: "静脈弓が走行する層。", dangerLevel: "safe", clinicalSignificance: "血管回避" },
      { depthIndex: 3, id: "dorsal-interosseous-foot", name: "第1背側骨間筋 / 長母指伸筋腱", category: "muscle", depthDescription: "主筋層", description: "太衝の主座となる筋肉・腱組織。", dangerLevel: "safe", clinicalSignificance: "肝経の原穴・強い得気の座" },
    ],
    boundaries: [
      { id: "metatarsal-1-2", name: "第1・第2中足骨底", category: "bone", position: "内外側骨性境界", relation: "太衝の不動の取穴指標", description: "足の甲の2本の骨が合流するV字の底。", palpationTip: "指先で2本の骨の合わせ目を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "dorsalis-pedis-artery", name: "足背動脈", category: "vessel", relation: "第1・第2中足骨間を走行（太衝の外側）", dangerLevel: "caution", description: "足背でドクドクと拍動を触れる動脈。動脈壁への直撃を避ける。", clinicalSignificance: "指先で拍動を確認し、わずかに避けて刺入" },
    ],
    svgElements: [
      { layerId: "metatarsal-1-2", elementId: "fd-mt1", label: "第1中足骨", shapeType: "ellipse", cx: 120, cy: 155, rx: 35, ry: 25, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 120, y: 158, anchor: "middle" } },
      { layerId: "metatarsal-1-2", elementId: "fd-mt2", label: "第2中足骨", shapeType: "ellipse", cx: 370, cy: 155, rx: 30, ry: 24, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 370, y: 158, anchor: "middle" } },
      { layerId: "dorsalis-pedis-artery", elementId: "fd-artery", label: "足背動脈（脈拍部）", shapeType: "circle", cx: 290, cy: 125, r: 8, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "dorsal-interosseous-foot", elementId: "fd-interosseous", label: "背側骨間筋（太衝の主座）", shapeType: "path", d: "M 155,120 Q 250,130 340,120 L 340,185 Q 250,195 155,185 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 245, y: 152, anchor: "middle" } },
      { layerId: "skin", elementId: "fd-skin", label: "足背皮膚・浅筋膜", shapeType: "path", d: "M 70,65 Q 250,75 420,65 L 420,95 Q 250,105 70,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "fd-needle-path", label: "太衝直刺針路（0.5〜0.8寸）", shapeType: "path", d: "M 230,20 L 230,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "fd-needle-point", label: "刺鍼到達点（骨間筋内）", shapeType: "circle", cx: 230, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "足部解剖アトラス"],
  },
};

/**
 * 経穴固有の刺針深度・針路を精確に生成
 */
function generateNeedleTrackForPoint(point: AcupointMaster, sliceType: SliceType): {
  angle: string;
  safeDepth: string;
  targetStructure: string;
  warning?: string;
} {
  const code = point.codeLower;

  // 1. 神闕（CV8）
  if (code === "cv8") {
    return {
      angle: "刺鍼絶対厳禁（禁鍼穴・温灸のみ適応）",
      safeDepth: "0寸（刺鍼不可）",
      targetStructure: "皮膚表面（温熱刺激のみ適応）",
      warning: "臍中央への刺鍼は腹膜炎リスクのため絶対禁忌。温灸（塩灸・間接灸）のみ適応。",
    };
  }

  // 2. 乳中（ST17）
  if (code === "st17") {
    return {
      angle: "鍼灸絶対禁忌（禁鍼・禁灸穴）",
      safeDepth: "0寸（刺激不可・触診指標のみ）",
      targetStructure: "骨度法・触診の目印のみ",
      warning: "乳頭中心への刺鍼・施灸は絶対禁忌。第4肋間・鎖骨中線の指標としてのみ使用。",
    };
  }

  // 3. 延髄リスク（風府・唖門）
  if (isBrainstemRisk(code)) {
    return {
      angle: "下顎方向へ向けた直刺またはわずかに下方へ斜刺 0.5〜0.8寸（上方深刺絶対厳禁）",
      safeDepth: "0.5〜0.8寸（項筋群・項靭帯深層にとどめる）",
      targetStructure: "頭板状筋・頭半棘筋筋膜",
      warning: "上方（大後頭孔・頭蓋腔方向）への刺入は延髄（呼吸・循環中枢）損傷の危険があるため絶対禁忌。",
    };
  }

  // 4. 胸骨正中穴（CV16〜CV21：膻中・中庭・玉堂・紫宮・華蓋・璇璣）
  if (isSternalRisk(code) || sliceType === "chest_sternal") {
    return {
      angle: "胸骨骨膜上に沿わせた平刺（横刺）0.3〜0.5寸",
      safeDepth: "0.3〜0.5寸（胸骨骨膜上・皮下組織）",
      targetStructure: "胸骨体骨膜および胸骨筋膜",
      warning: "直刺は胸骨骨膜痛を招き、稀な胸骨孔変異による胸腔内臓器穿刺を防ぐため、針を寝かせて骨膜上を平刺する。",
    };
  }

  // 5. 脊椎後正中穴（督脈：大椎・陶道・身柱・神道・至陽・命門・腰陽関など）
  if (isSpinalCordRisk(code) || sliceType === "spine_posterior_median") {
    return {
      angle: "棘突起間をわずかに上方へ向けた斜刺 0.5〜1.0寸",
      safeDepth: "0.5〜1.0寸（棘間靭帯内にとどめる）",
      targetStructure: "棘間靭帯および棘上靭帯",
      warning: "直刺深刺は黄靭帯を貫通し硬膜外腔・脊柱管（脊髄）を穿刺する危険があるため、棘突起間をわずかに上方へ斜刺し深刺を避ける。",
    };
  }

  // 6. 天突（CV22）
  if (code === "cv22") {
    return {
      angle: "直刺0.2寸後、胸骨柄後面に沿わせて下方へ斜刺 0.5〜1.0寸",
      safeDepth: "0.5〜1.0寸（胸骨柄後面浅層）",
      targetStructure: "胸骨舌骨筋および気管前結合組織",
      warning: "直刺すると直下の気管前壁を穿刺するため厳禁。胸骨背面に密着させて下行させる。",
    };
  }

  // 7. 側頸部・頸動脈洞リスク（人迎・水突など）
  if (isNeckCarotidRisk(code)) {
    return {
      angle: "動脈拍動を指先で外側に避けて直刺 0.3〜0.5寸",
      safeDepth: "0.3〜0.5寸（SCM筋膜・表層筋層）",
      targetStructure: "胸鎖乳突筋前縁筋膜",
      warning: "総頸動脈直上への刺入や過度な圧迫は頸動脈洞反射（血圧低下・失神）の危険あり。",
    };
  }

  // 8. 後頭下部（風池・天柱）
  if (isSuboccipitalRisk(code)) {
    return {
      angle: "鼻尖または対側眼球へ向けた斜刺 0.8〜1.2寸",
      safeDepth: "0.8〜1.2寸（頭板状筋筋膜）",
      targetStructure: "頭板状筋・大後頭神経近接部",
      warning: "内側深部への深刺は椎骨動脈や大後頭孔に近接するため、刺入角度を厳守する。",
    };
  }

  // 9. 肩井（GB21）
  if (code === "gb21") {
    return {
      angle: "前後に向けた浅い斜刺 0.5寸（直刺深刺は絶対厳禁）",
      safeDepth: "0.5寸（僧帽筋筋腹内にとどめる）",
      targetStructure: "僧帽筋上部線維（肩こりの主座）",
      warning: "直刺深刺は直下の肺尖・胸膜を穿刺し外傷性気胸を引き起こす危険が極めて高いため絶対禁忌。",
    };
  }

  // 10. 気胸リスク胸背部穴
  if (isChestBackPneumothoraxRisk(code, point.bodyPart, point.locationDetail)) {
    return {
      angle: "肋骨に沿った浅い斜刺または横刺 0.3〜0.5寸",
      safeDepth: "0.3〜0.5寸（肋骨・胸壁/背筋層内）",
      targetStructure: "大胸筋深面または脊柱起立筋筋腹",
      warning: "直刺による深刺は胸膜・肺実質を穿刺し外傷性気胸を引き起こす危険があるため絶対禁忌。",
    };
  }

  // 11. 環跳・臀部穴
  if (sliceType === "buttock_gluteal") {
    return {
      angle: "大転子方向へ向けた直刺 1.5〜2.5寸",
      safeDepth: "1.5〜2.5寸（梨状筋筋膜・深層）",
      targetStructure: "梨状筋および坐骨神経近傍",
      warning: "坐骨神経直撃による電撃痛時は直ちに針を少し引き、角度を微調整する。",
    };
  }

  // スライス別デフォルト
  switch (sliceType) {
    case "face_anterior":
      return {
        angle: "斜刺または平刺 0.2〜0.5寸",
        safeDepth: "0.2〜0.5寸（表情筋層内）",
        targetStructure: "表情筋群筋腹（心地よい得気）",
        warning: "毛細血管が豊富なため内出血に留意し、抜針後は優しく圧迫止血する。",
      };
    case "head_vertex":
      return {
        angle: "横刺（平刺）0.5〜1.0寸（頭皮に沿って進める）",
        safeDepth: "0.5〜1.0寸（帽状腱膜下層）",
        targetStructure: "帽状腱膜下結合組織",
        warning: "直刺は骨膜痛を招くため、針を15〜30度に寝かせて平刺する。",
      };
    case "abdomen_anterior":
      return {
        angle: "直刺 0.8〜1.2寸（体格に応じて調節）",
        safeDepth: "0.8〜1.2寸（腹直筋層内）",
        targetStructure: "腹直筋筋腹（心地よい得気の主座）",
        warning: "腹膜腔への進入（深刺）を避けるため、排尿後に取穴し腹壁筋層内にとどめる。",
      };
    case "thigh_anterior":
      return {
        angle: "直刺または斜刺 1.0〜1.5寸",
        safeDepth: "1.0〜1.5寸（大腿四頭筋筋腹）",
        targetStructure: "大腿四頭筋（外側広筋・直筋）",
        warning: "大腿骨膜への直撃を避け、豊かな筋腹中央を捉える。",
      };
    case "thigh_medial":
      return {
        angle: "直刺または斜刺 0.8〜1.2寸",
        safeDepth: "0.8〜1.2寸（内側広筋・内転筋）",
        targetStructure: "内側広筋または大内転筋",
        warning: "大腿動脈の拍動部（箕門・衝門ライン）を確認し、血管直撃を避ける。",
      };
    case "knee_joint":
      return {
        angle: "斜刺 0.5〜1.0寸（関節腔方向へ）",
        safeDepth: "0.5〜1.0寸（膝蓋下脂肪体）",
        targetStructure: "膝蓋下脂肪体（ホッファ脂肪体）",
        warning: "関節腔内への刺鍼時は手指および局所の厳重な消毒を行う。",
      };
    case "lower_leg_anterior":
      return {
        angle: "直刺 1.0〜1.5寸",
        safeDepth: "1.0〜1.5寸（前脛骨筋筋腹）",
        targetStructure: "前脛骨筋（主たる酸脹感の座）",
        warning: "脛骨骨膜への直撃を避け、筋腹中央を捉える。",
      };
    case "lower_leg_medial":
      return {
        angle: "直刺 0.8〜1.2寸（脛骨後縁に沿って）",
        safeDepth: "0.8〜1.2寸（ヒラメ筋・後脛骨筋）",
        targetStructure: "ヒラメ筋深面・長趾屈筋筋膜",
        warning: "後脛骨動脈の拍動を確認し、血管直撃を避ける。",
      };
    case "lower_leg_posterior":
      return {
        angle: "直刺 0.8〜1.5寸",
        safeDepth: "0.8〜1.5寸（腓腹筋・ヒラメ筋）",
        targetStructure: "腓腹筋筋腹または筋間隙",
        warning: "膝窩中央（委中）では膝窩動静脈・脛骨神経の拍動を指腹で避ける。",
      };
    case "forearm_anterior":
      return {
        angle: "直刺 0.5〜0.8寸",
        safeDepth: "0.5〜0.8寸（浅指屈筋内）",
        targetStructure: "浅指屈筋および腱間隙",
        warning: "正中神経への接触による電撃痛時は直ちに針を少し引き微調整する。",
      };
    default:
      return {
        angle: "直刺または斜刺 0.5〜1.0寸",
        safeDepth: "0.5〜1.0寸（局所筋層内）",
        targetStructure: "局所の筋組織・筋膜（得気の主座）",
        warning: "周囲の動脈拍動および重要神経の走向を確認し愛護的に刺入する。",
      };
  }
}

/**
 * 経穴マスター情報から完全な CrossSectionModel を動的に生成
 */
export function generateCrossSectionModel(point: AcupointMaster): CrossSectionModel {
  const sliceType = classifyAcupointSlice(point);
  const template = SLICE_TEMPLATES[sliceType];
  const needleTrack = generateNeedleTrackForPoint(point, sliceType);

  const title = `${point.name}（${point.code}）${template.titleTemplate}`;

  return {
    id: `cs-${point.codeLower}`,
    title,
    level: template.level,
    sliceType,
    bodySide: template.bodySide,
    posture: template.posture,
    summaryTakeaway: `${point.name}（${point.code}）における${template.summaryTakeaway}`,
    summary: `${point.name}（${point.code}）における${template.summaryTakeaway}`,
    axes: template.axes,
    needleTrack,
    layers: template.layers,
    boundaries: template.boundaries,
    adjacentStructures: template.adjacentStructures,
    svgElements: template.svgElements,
    references: template.references,
    verifiedDate: "2026-09",
  };
}
