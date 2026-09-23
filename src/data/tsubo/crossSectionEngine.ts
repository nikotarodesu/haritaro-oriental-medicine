import {
  CrossSectionModel,
  AnatomicalLayer,
  BoundaryLandmark,
  AdjacentStructure,
  SvgAnatomicalElement,
  AcupointMaster,
} from "./types";
import { isChestBackPneumothoraxRisk, isNeckCarotidRisk, isBrainstemRisk, isContraindicatedNeedle, isContraindicatedMoxa } from "./safetyAndLandmarks";

/**
 * 人体主要12大スライスの型識別子
 */
export type SliceType =
  | "chest_intercostal"    // S1. 前胸部・肋間（気胸リスク領域）
  | "abdomen_anterior"     // S2. 前腹部（腹直筋・腹膜）
  | "back_paravertebral"   // S3. 背部・肩甲間部（背部兪穴）
  | "lumbar_sacral"        // S4. 腰仙部（腎兪・大腸兪・八髎穴）
  | "neck_lateral"         // S5. 前頸部・側頸部（頸動脈・迷走神経）
  | "neck_suboccipital"    // S6. 後頭下部・うなじ（風池・天柱・延髄近接）
  | "forearm_anterior"     // S7. 前腕掌側（内関・正中神経）
  | "forearm_posterior"    // S8. 前腕背側（外関・伸筋群）
  | "hand_metacarpal"      // S9. 手背・手掌（合谷・骨間筋）
  | "lower_leg_anterior"   // S10. 下腿前外側（足三里・前脛骨筋）
  | "lower_leg_medial"     // S11. 下腿内側（三陰交・脛骨後縁）
  | "lower_leg_posterior"  // S12. 下腿後側・膝窩（委中・承山・腓腹筋）
  | "foot_dorsal"          // S13. 足背・足底（太衝・湧泉）
  | "head_cranial";        // S14. 頭頂部・側頭部（百会・太陽）

/**
 * 経穴のマスターデータから適切な解剖断面スライスを判定
 */
export function classifyAcupointSlice(point: AcupointMaster): SliceType {
  const code = point.codeLower;
  const detail = point.locationDetail;
  const bodyPart = point.bodyPart;

  // 手・腕
  if (bodyPart === "手・腕") {
    if (detail.includes("中手骨") || detail.includes("手背") || detail.includes("手掌") || detail.includes("指")) {
      return "hand_metacarpal";
    }
    if (detail.includes("背側") || detail.includes("伸筋") || detail.includes("陽渓") || detail.includes("曲池") || detail.includes("手三里")) {
      return "forearm_posterior";
    }
    return "forearm_anterior";
  }

  // 足・脚
  if (bodyPart === "足・脚") {
    if (detail.includes("中足骨") || detail.includes("足背") || detail.includes("足底") || detail.includes("趾")) {
      return "foot_dorsal";
    }
    if (detail.includes("後面") || detail.includes("膝窩") || detail.includes("アキレス腱") || detail.includes("腓腹筋") || detail.includes("委中") || detail.includes("承山")) {
      return "lower_leg_posterior";
    }
    if (detail.includes("内側") || detail.includes("内果") || detail.includes("脛骨内側面") || detail.includes("三陰交") || detail.includes("陰陵泉")) {
      return "lower_leg_medial";
    }
    return "lower_leg_anterior";
  }

  // 頭部・顔面
  if (bodyPart === "頭部・顔面") {
    if (detail.includes("項") || detail.includes("後頭") || detail.includes("風府") || detail.includes("風池") || detail.includes("天柱")) {
      return "neck_suboccipital";
    }
    return "head_cranial";
  }

  // 首・肩
  if (bodyPart === "首・肩") {
    if (detail.includes("項") || detail.includes("後頭") || detail.includes("天柱") || detail.includes("風池")) {
      return "neck_suboccipital";
    }
    if (detail.includes("背") || detail.includes("肩井") || detail.includes("大椎")) {
      return "back_paravertebral";
    }
    return "neck_lateral";
  }

  // 胸・腹
  if (bodyPart === "胸・腹") {
    if (detail.includes("肋間") || detail.includes("前胸部") || detail.includes("鎖骨") || detail.includes("胸骨") || detail.includes("胸部")) {
      return "chest_intercostal";
    }
    return "abdomen_anterior";
  }

  // 背中・腰
  if (bodyPart === "背中・腰") {
    if (detail.includes("腰") || detail.includes("仙") || detail.includes("腸骨") || detail.includes("臀")) {
      return "lumbar_sacral";
    }
    return "back_paravertebral";
  }

  return "abdomen_anterior";
}

/**
 * スライスごとの基本解剖設定（SVG要素・層構造・境界・隣接組織）
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
 * 12大スライスの定義
 */
const SLICE_TEMPLATES: Record<SliceType, BaseSliceTemplate> = {
  // 1. 前胸部・肋間横断面（中府・雲門・胸郭部）
  chest_intercostal: {
    titleTemplate: "前胸部・肋間局所深浅断面モデル",
    level: "肋間隙レベル水平横断（前胸壁）",
    bodySide: "前胸部",
    posture: "仰臥位（リラックスして両腕を体側に置いた自然肢位）",
    axes: { horizontal: ["内側 (Medial / 胸骨側)", "外側 (Lateral / 腋窩側)"], vertical: ["体表面 (胸壁前面)", "深部 (胸膜・肺側)"] },
    summaryTakeaway: "大胸筋から小胸筋・肋間筋への層構造を把握し、深部の胸膜・肺実質を回避する斜刺・横刺の角度を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚（表皮・真皮）", category: "skin", depthDescription: "表面層", description: "胸壁表面の皮膚。可動性があり、弾力線維が豊富。", dangerLevel: "safe", clinicalSignificance: "素早い切皮で無痛刺入" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下脂肪組織・胸部浅筋膜", category: "subcutaneous", depthDescription: "浅層", description: "皮下脂肪と浅筋膜。皮神経（肋間神経前皮枝）が分布。", dangerLevel: "safe", clinicalSignificance: "表層皮下出血の予防" },
      { depthIndex: 3, id: "pectoralis-major", name: "大胸筋", category: "muscle", depthDescription: "浅層筋（厚い筋腹）", description: "鎖骨・胸骨・肋軟骨から起こる強大な扇状筋。得気（酸脹感）の主座。", dangerLevel: "safe", clinicalSignificance: "刺鍼の第1標的組織（心地よい重だるさ）" },
      { depthIndex: 4, id: "pectoralis-minor", name: "小胸筋 / 外肋間筋", category: "muscle", depthDescription: "中深層筋", description: "第3〜5肋骨から烏口突起へ走る深部筋、および肋骨間を埋める筋群。", dangerLevel: "caution", clinicalSignificance: "これより深部への直刺刺入は厳禁" },
    ],
    boundaries: [
      { id: "rib-cortex", name: "肋骨（骨皮質）", category: "bone", position: "深部骨性境界", relation: "針先が胸膜へ侵入するのを防ぐ安全ストッパー", description: "あばら骨の骨面。肋骨面を指先で検知しながら刺鍼する。", palpationTip: "肋骨の硬い骨面を指腹で触知", dangerLevel: "safe" },
      { id: "sternal-border", name: "胸骨外側縁 / 鎖骨", category: "bone", position: "内側・上方骨性指標", relation: "取穴寸法（寸）の不動の基準線", description: "前正中線および胸骨・鎖骨の骨縁。", palpationTip: "胸骨体および鎖骨下窩を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "pleura-lung", name: "壁側胸膜・肺実質", category: "organ", relation: "肋間筋の直下深層（深刺で直撃）", dangerLevel: "hazard", description: "肺を包む胸膜腔。直刺深刺により胸膜を穿刺すると外傷性気胸を招く重大リスク。", clinicalSignificance: "直刺深刺は絶対厳禁。必ず肋骨に沿った浅い斜刺・横刺とする" },
      { id: "intercostal-nv", name: "肋間動静脈・肋間神経", category: "vessel", relation: "各肋骨の下縁（肋骨溝）を走行", dangerLevel: "caution", description: "肋骨下縁に沿う血管神経束。肋骨上縁寄りを目標とすることで回避可能。", clinicalSignificance: "肋骨下縁を避け、肋骨上縁または肋間中央を狙う" },
    ],
    svgElements: [
      // 背景胸膜・肺
      { layerId: "pleura-lung", elementId: "chest-lung-bg", label: "肺実質・胸膜腔（危険領域）", shapeType: "path", d: "M 40,210 Q 250,225 460,210 L 460,260 L 40,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      // 肋間筋・胸壁内層
      { layerId: "pectoralis-minor", elementId: "chest-intercostal-m", label: "小胸筋・肋間筋層", shapeType: "path", d: "M 40,165 Q 250,175 460,165 L 460,210 Q 250,225 40,210 Z", fill: "#FADBD8", stroke: "#E59866", strokeWidth: 1 },
      // 肋骨断面（2本）
      { layerId: "rib-cortex", elementId: "chest-rib-1", label: "上位肋骨（骨断面）", shapeType: "ellipse", cx: 120, cy: 185, rx: 35, ry: 18, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 120, y: 188, anchor: "middle" } },
      { layerId: "rib-cortex", elementId: "chest-rib-2", label: "下位肋骨（骨断面）", shapeType: "ellipse", cx: 380, cy: 185, rx: 35, ry: 18, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 380, y: 188, anchor: "middle" } },
      // 肋間神経血管束（肋骨下縁）
      { layerId: "intercostal-nv", elementId: "chest-nv-1", label: "肋間動静脈・神経", shapeType: "circle", cx: 140, cy: 202, r: 5, fill: "#E74C3C", stroke: "#C0392B", strokeWidth: 1 },
      // 大胸筋
      { layerId: "pectoralis-major", elementId: "chest-pec-major", label: "大胸筋（主要得気層）", shapeType: "path", d: "M 40,110 Q 250,115 460,110 L 460,165 Q 250,175 40,165 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 1.5, labelPos: { x: 250, y: 142, anchor: "middle" } },
      // 皮下組織
      { layerId: "subcutaneous", elementId: "chest-subcut", label: "皮下組織・浅筋膜", shapeType: "path", d: "M 40,75 Q 250,78 460,75 L 460,110 Q 250,115 40,110 Z", fill: "#FAF1DF", stroke: "#D6C7AC", strokeWidth: 1 },
      // 皮膚表面
      { layerId: "skin", elementId: "chest-skin", label: "皮膚（胸郭表面）", shapeType: "path", d: "M 40,55 Q 250,58 460,55 L 460,75 Q 250,78 40,75 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 68, anchor: "middle" } },
      // 鍼刺入インジケーター（斜刺：肋骨に沿った安全針路）
      { layerId: "needle-indicator", elementId: "chest-needle-path", label: "安全刺針角度（外方斜刺）", shapeType: "path", d: "M 230,20 L 265,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "chest-needle-point", label: "刺鍼到達点（大胸筋深面）", shapeType: "circle", cx: 265, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "プロメテウス解剖学アトラス 胸部/腹部・骨盤部", "鍼灸安全管理マニュアル（気胸防止ガイドライン）"],
  },

  // 2. 前腹部横断面（天枢・中脘・関元）
  abdomen_anterior: {
    titleTemplate: "前腹部・腹壁局所深浅断面モデル",
    level: "腹壁水平横断面（正中・側腹部）",
    bodySide: "前腹部",
    posture: "仰臥位（腹部を脱力させた自然肢位）",
    axes: { horizontal: ["前正中線 (白線側)", "外側 (側腹壁側)"], vertical: ["腹壁表面 (皮膚)", "深部 (腹膜・大網)"] },
    summaryTakeaway: "腹直筋前葉・後葉の鞘構造と筋腹の位置関係を把握し、腹膜腔へ達しない腹壁筋層内での愛護的刺針を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "腹壁の皮膚。柔軟で伸展性が高い。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下脂肪組織（キャンパー筋膜・スカルパ筋膜）", category: "subcutaneous", depthDescription: "浅層", description: "体格・肥満度により厚みが大きく変動する脂肪層。", dangerLevel: "safe", clinicalSignificance: "体格に応じた刺入深度補正の基準" },
      { depthIndex: 3, id: "rectus-sheath-ant", name: "腹直筋鞘前葉", category: "fascia", depthDescription: "筋膜層", description: "腱膜が癒合した強靭な線維性被膜。針先にコリッとした抵抗感。", dangerLevel: "safe", clinicalSignificance: "切皮後の第1抵抗感として深度を把握" },
      { depthIndex: 4, id: "rectus-abdominis", name: "腹直筋", category: "muscle", depthDescription: "主筋層", description: "縦走する帯状の筋。経気（酸脹感）の主座となる筋組織。", dangerLevel: "safe", clinicalSignificance: "心地よい響きを得る目標層" },
      { depthIndex: 5, id: "rectus-sheath-post", name: "腹直筋鞘後葉・腹横筋膜", category: "fascia", depthDescription: "深部境界", description: "腹直筋の深面を裏打ちする薄い筋膜層。", dangerLevel: "caution", clinicalSignificance: "これ以上の深刺は腹膜を穿孔する恐れあり" },
    ],
    boundaries: [
      { id: "linea-alba", name: "白線（前正中線）", category: "tendon", position: "内側境界", relation: "腹直筋が合流する正中の腱組織", description: "任脈の経穴（中脘、関元、気海等）が位置する正中線。", palpationTip: "剣状突起とおへそを結ぶ正中線", dangerLevel: "safe" },
      { id: "rectus-lateral-border", name: "腹直筋外側縁（半月線）", category: "tendon", position: "外側境界", relation: "胃経（外方2寸）と脾経（外方4寸）の境界指標", description: "腹直筋の外側縁。天枢穴の直下骨格。", palpationTip: "腹壁に力を入れたときに浮き出る縦の溝", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "peritoneum-bowel", name: "壁側腹膜・腸管（小腸・結腸）", category: "organ", relation: "腹横筋膜の直下深部", dangerLevel: "hazard", description: "腹腔内。過度の深刺は腹膜穿刺や腸管損傷・腹膜炎のリスクを招く。", clinicalSignificance: "深刺厳禁。必ず排尿後に取穴し、腹壁筋層内にとどめる" },
      { id: "epigastric-vessels", name: "下腹壁動静脈", category: "vessel", relation: "腹直筋深面・鞘後葉の間を走行", dangerLevel: "caution", description: "腹直筋の裏側を縦走する主要血管。直撃による血腫に注意。", clinicalSignificance: "拍動を意識し過度な深刺・強雀啄を控える" },
    ],
    svgElements: [
      // 腹膜・内臓危険領域
      { layerId: "peritoneum-bowel", elementId: "abd-peritoneum-bg", label: "腹膜腔・腸管領域（危険領域）", shapeType: "path", d: "M 40,210 Q 250,220 460,210 L 460,260 L 40,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      // 腹直筋鞘後葉・腹横筋膜
      { layerId: "rectus-sheath-post", elementId: "abd-sheath-post", label: "腹直筋鞘後葉", shapeType: "path", d: "M 110,185 Q 280,190 440,185 L 440,205 Q 280,210 110,205 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 1.5 },
      // 腹直筋
      { layerId: "rectus-abdominis", elementId: "abd-rectus-m", label: "腹直筋（目標組織）", shapeType: "path", d: "M 110,115 Q 280,120 440,115 L 440,185 Q 280,190 110,185 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 275, y: 152, anchor: "middle" } },
      // 腹直筋鞘前葉
      { layerId: "rectus-sheath-ant", elementId: "abd-sheath-ant", label: "腹直筋鞘前葉", shapeType: "path", d: "M 110,95 Q 280,100 440,95 L 440,115 Q 280,120 110,115 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 1.5 },
      // 白線（正中線）
      { layerId: "linea-alba", elementId: "abd-linea-alba", label: "白線（前正中線）", shapeType: "path", d: "M 40,80 L 110,80 L 110,210 L 40,210 Z", fill: "#EDE6DA", stroke: "#8C8275", strokeWidth: 2, labelPos: { x: 75, y: 145, anchor: "middle" } },
      // 皮下脂肪組織
      { layerId: "subcutaneous", elementId: "abd-subcut", label: "皮下脂肪組織", shapeType: "path", d: "M 40,65 Q 250,70 460,65 L 460,95 Q 250,100 40,95 Z", fill: "#FAF1DF", stroke: "#D6C7AC", strokeWidth: 1 },
      // 皮膚
      { layerId: "skin", elementId: "abd-skin", label: "皮膚表面", shapeType: "path", d: "M 40,45 Q 250,50 460,45 L 460,65 Q 250,70 40,65 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 58, anchor: "middle" } },
      // 針路（直刺・筋層内ストップ）
      { layerId: "needle-indicator", elementId: "abd-needle-path", label: "安全刺入深度（腹直筋層内）", shapeType: "path", d: "M 275,15 L 275,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "abd-needle-point", label: "刺鍼到達点（腹直筋腹）", shapeType: "circle", cx: 275, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "解剖学カラーアトラス 第8版", "腹部経穴刺鍼深度の安全性に関する研究"],
  },

  // 3. 背部・肩甲間部横断面（背部兪穴：肺兪・心兪・膈兪）
  back_paravertebral: {
    titleTemplate: "背部・肩甲間部局所深浅断面モデル",
    level: "胸椎棘突起・肋骨角レベル水平横断",
    bodySide: "背部",
    posture: "腹臥位または座位（背中を軽く丸めた肢位）",
    axes: { horizontal: ["後正中線 (棘突起側)", "外側 (肩甲骨・肋骨側)"], vertical: ["背部体表 (皮膚)", "深部 (肋骨・胸膜側)"] },
    summaryTakeaway: "僧帽筋・菱形筋から脊柱起立筋への重なりと、直下を走る肋骨面を指標とした気胸予防の刺針角度を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "背部の皮膚は比較的厚く緻密。", dangerLevel: "safe", clinicalSignificance: "しっかりとした切皮手技" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・浅筋膜", category: "subcutaneous", depthDescription: "浅層", description: "線維成分の多い結合組織層。", dangerLevel: "safe", clinicalSignificance: "浅層での滑動" },
      { depthIndex: 3, id: "trapezius-rhomboid", name: "僧帽筋 / 菱形筋", category: "muscle", depthDescription: "浅背筋群", description: "肩甲骨と脊柱を結ぶ筋肉。肩背部のコリや緊張の主座。", dangerLevel: "safe", clinicalSignificance: "筋緊張緩和の第1目標" },
      { depthIndex: 4, id: "erector-spinae", name: "脊柱起立筋（最長筋・腸肋筋）", category: "muscle", depthDescription: "深背筋群（強力な縦走筋）", description: "背骨の両脇を固める厚い筋肉。背部兪穴の最重要得気組織。", dangerLevel: "safe", clinicalSignificance: "自律神経調整・内臓機能反射の刺激点" },
    ],
    boundaries: [
      { id: "spinous-process", name: "胸椎棘突起（後正中線）", category: "bone", position: "内側基準指標", relation: "督脈および兪穴寸法の基準骨", description: "背骨の中心の突起。触診で高さを数える不動の指標。", palpationTip: "背骨の中心の硬い突起を触知", dangerLevel: "safe" },
      { id: "rib-angle", name: "肋骨（骨面）", category: "bone", position: "深部安全壁", relation: "針先が胸膜腔へ抜けるのを防ぐ物理的障壁", description: "脊柱起立筋の底面を支える肋骨。", palpationTip: "深部で骨面に触れると安全", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "pleura-lung-back", name: "壁側胸膜・肺実質（背側）", category: "organ", relation: "肋骨間隙の直下深層", dangerLevel: "hazard", description: "肺尖および肺後葉。外側へ向けた直刺深刺は気胸を引き起こす。", clinicalSignificance: "外側への深刺厳禁。必ず脊柱方向に向けた斜刺または横刺とする" },
      { id: "posterior-rami-nv", name: "胸神経後枝（内側枝・外側枝）", category: "nerve", relation: "起立筋内を走行", dangerLevel: "safe", description: "脊髄神経後枝。ツボ刺激が脊髄反射を介して内臓に作用する機序物質。", clinicalSignificance: "特有の響き（酸脹感）をもたらす神経線維" },
    ],
    svgElements: [
      // 肺・胸膜危険領域
      { layerId: "pleura-lung-back", elementId: "back-pleura-bg", label: "肺実質・胸膜腔（気胸危険領域）", shapeType: "path", d: "M 150,210 Q 300,225 460,210 L 460,260 L 150,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      // 胸椎棘突起・椎弓
      { layerId: "spinous-process", elementId: "back-vertebra", label: "胸椎棘突起・椎弓", shapeType: "path", d: "M 40,60 L 110,60 L 140,160 L 90,240 L 40,240 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 75, y: 150, anchor: "middle" } },
      // 肋骨断面
      { layerId: "rib-angle", elementId: "back-rib", label: "肋骨（骨面）", shapeType: "ellipse", cx: 320, cy: 195, rx: 45, ry: 18, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 320, y: 198, anchor: "middle" } },
      // 脊柱起立筋
      { layerId: "erector-spinae", elementId: "back-erector-m", label: "脊柱起立筋（主目標組織）", shapeType: "path", d: "M 130,115 Q 280,120 440,125 L 440,185 Q 280,195 130,175 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 260, y: 152, anchor: "middle" } },
      // 僧帽筋・菱形筋
      { layerId: "trapezius-rhomboid", elementId: "back-trapezius", label: "僧帽筋・菱形筋", shapeType: "path", d: "M 110,80 Q 280,85 460,95 L 460,125 Q 280,120 130,115 Z", fill: "#F2E8DC", stroke: "#D4B89B", strokeWidth: 1.5 },
      // 皮膚・皮下
      { layerId: "skin", elementId: "back-skin", label: "皮膚・皮下組織", shapeType: "path", d: "M 40,40 Q 250,45 460,55 L 460,95 Q 280,85 110,80 L 40,60 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 65, anchor: "middle" } },
      // 針路（脊柱方向への安全な斜刺）
      { layerId: "needle-indicator", elementId: "back-needle-path", label: "安全斜刺角度（内側・脊柱方向へ）", shapeType: "path", d: "M 310,15 L 240,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "back-needle-point", label: "刺鍼到達点（起立筋深層）", shapeType: "circle", cx: 240, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床鍼灸マニュアル（背部兪穴刺鍼安全基準）", "グレイ解剖学 第4版"],
  },

  // 4. 腰仙部横断面（腎兪・大腸兪・命門・八髎穴）
  lumbar_sacral: {
    titleTemplate: "腰仙部・腰背局所深浅断面モデル",
    level: "第2〜第4腰椎・仙骨部水平横断",
    bodySide: "腰部",
    posture: "腹臥位（腰椎前弯を減じたフラット肢位）",
    axes: { horizontal: ["後正中線 (棘突起側)", "外側 (腸骨稜側)"], vertical: ["腰部体表 (皮膚)", "深部 (多裂筋・椎体)"] },
    summaryTakeaway: "強靭な胸腰筋膜を通り多裂筋・最長筋へ至る深浅構造と、深部腰神経根・腎臓下極への解剖学的距離を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "腰部の厚い皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "thoracolumbar-fascia", name: "胸腰筋膜（後葉）", category: "fascia", depthDescription: "腱膜層", description: "強靭で硬い線維膜。刺入時に独特のプチッとした感触。", dangerLevel: "safe", clinicalSignificance: "筋膜リリースと腰痛鎮痛の要点" },
      { depthIndex: 3, id: "erector-spinae-lumbar", name: "脊柱起立筋（腰最長筋・腸肋筋）", category: "muscle", depthDescription: "主筋層", description: "腰椎を強固に支える太い筋束。筋筋膜性腰痛の好発部位。", dangerLevel: "safe", clinicalSignificance: "腰痛治療の主目標組織" },
      { depthIndex: 4, id: "multifidus-muscle", name: "多裂筋 / 回旋筋", category: "muscle", depthDescription: "深層インナーマッスル", description: "腰椎椎弓板に接する最深層筋。脊髄神経後枝内側枝が支配。", dangerLevel: "safe", clinicalSignificance: "深部安定化筋への刺鍼" },
    ],
    boundaries: [
      { id: "lumbar-spinous", name: "腰椎棘突起", category: "bone", position: "内側基準指標", relation: "ヤコビー線（第4腰椎）等の骨度指標", description: "腰椎の中心骨。触診で腰椎番号を正確に決定する。", palpationTip: "腰椎棘突起の骨頭を触知", dangerLevel: "safe" },
      { id: "iliac-crest", name: "腸骨稜", category: "bone", position: "外側・下部境界", relation: "骨盤上縁の不動指標", description: "ウエストのくびれで触知される骨盤の骨縁。", palpationTip: "左右の腸骨稜を結ぶ線がヤコビー線", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "kidney-lower-pole", name: "腎臓（下極）※上腰部のみ", category: "organ", relation: "第1〜第2腰椎レベル外側の深部", dangerLevel: "hazard", description: "第12肋骨下縁付近の過度な深刺・外側刺入は腎被膜損傷の危険あり。", clinicalSignificance: "肋骨下縁付近は直刺深刺を避け、斜刺にとどめる" },
      { id: "lumbar-nerve-root", name: "腰神経根（脊髄神経）", category: "nerve", relation: "椎間孔から外側へ走行", dangerLevel: "caution", description: "坐骨神経へ連なる神経根。針尖が直撃すると下肢への電撃痛を生じる。", clinicalSignificance: "強い放散痛時は直ちに針を引き微調整" },
    ],
    svgElements: [
      // 腰椎椎骨・横突起
      { layerId: "lumbar-spinous", elementId: "lumbar-vert", label: "腰椎棘突起・椎弓", shapeType: "path", d: "M 40,50 L 110,50 L 135,140 L 180,180 L 140,230 L 40,230 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 75, y: 140, anchor: "middle" } },
      // 多裂筋（深層）
      { layerId: "multifidus-muscle", elementId: "lumbar-multifidus", label: "多裂筋（深部インナーマッスル）", shapeType: "path", d: "M 135,140 Q 200,150 260,165 L 230,220 L 140,230 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      // 脊柱起立筋
      { layerId: "erector-spinae-lumbar", elementId: "lumbar-erector", label: "脊柱起立筋（最長筋・腸肋筋）", shapeType: "path", d: "M 120,90 Q 280,95 440,110 L 440,185 Q 260,165 135,140 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 280, y: 135, anchor: "middle" } },
      // 胸腰筋膜
      { layerId: "thoracolumbar-fascia", elementId: "lumbar-fascia", label: "胸腰筋膜（強靭な線維膜）", shapeType: "path", d: "M 110,75 Q 280,80 450,95 L 440,110 Q 280,95 120,90 Z", fill: "#DDD5C7", stroke: "#9E9484", strokeWidth: 2 },
      // 皮膚・皮下
      { layerId: "skin", elementId: "lumbar-skin", label: "皮膚・皮下脂肪", shapeType: "path", d: "M 40,35 Q 250,40 460,50 L 450,95 Q 280,80 110,75 L 40,50 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 58, anchor: "middle" } },
      // 針路（直刺・起立筋〜多裂筋深部）
      { layerId: "needle-indicator", elementId: "lumbar-needle-path", label: "標準直刺深度（1.0〜1.5寸）", shapeType: "path", d: "M 270,10 L 270,155", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "lumbar-needle-point", label: "刺鍼到達点（起立筋深層）", shapeType: "circle", cx: 270, cy: 155, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "クリニカルマッサージ 第2版", "脊椎・骨盤部解剖学アトラス"],
  },

  // 5. 前頸部・側頸部横断面（人迎・水突・扶突・天容）
  neck_lateral: {
    titleTemplate: "側頸部・頸動脈三角局所深浅断面モデル",
    level: "甲状軟骨・輪状軟骨高位水平横断",
    bodySide: "前頸部・側頸部",
    posture: "仰臥位（頸部軽度伸展位）",
    axes: { horizontal: ["前内側 (気管・喉頭側)", "後外側 (胸鎖乳突筋側)"], vertical: ["頸部体表 (皮膚)", "深部 (頸動脈鞘・椎体)"] },
    summaryTakeaway: "胸鎖乳突筋の前縁・後縁と総頸動脈・内頸静脈・迷走神経の解剖学的位置関係を把握し、動脈直撃と迷走神経反射を避ける愛護的刺入を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "薄く進展性に富む頸部皮膚。", dangerLevel: "safe", clinicalSignificance: "愛護的切皮" },
      { depthIndex: 2, id: "platysma", name: "浅頸筋膜・広頸筋", category: "muscle", depthDescription: "皮下筋層", description: "顔面神経支配の薄い皮筋。表情と首の皮膚の動きに関与。", dangerLevel: "safe", clinicalSignificance: "浅層刺入部" },
      { depthIndex: 3, id: "sternocleidomastoid", name: "胸鎖乳突筋（SCM）", category: "muscle", depthDescription: "主筋層", description: "側頸部で最も太い筋肉。前縁と後縁が重要経穴の触診境界線。", dangerLevel: "safe", clinicalSignificance: "前縁または後縁の陥凹部を狙う" },
    ],
    boundaries: [
      { id: "thyroid-cartilage", name: "甲状軟骨（喉頭隆起）", category: "bone", position: "前正中境界", relation: "人迎・扶突高位の不動の目印", description: "いわゆる「のどぼとけ」。第4頸椎の高さに相当。", palpationTip: "喉頭隆起の尖端を触知", dangerLevel: "safe" },
      { id: "scm-anterior-border", name: "胸鎖乳突筋前縁", category: "tendon", position: "触診不動線", relation: "人迎・水突の取穴境界線", description: "首を反対側へ回旋するとくっきりと浮き出る筋肉の前の縁。", palpationTip: "首を横に向けたときの太い筋肉の前際", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "common-carotid-artery", name: "総頸動脈（頸動脈球・頸動脈洞）", category: "vessel", relation: "胸鎖乳突筋前縁の直下深部", dangerLevel: "hazard", description: "脳へ血液を送る大動脈。拍動直上への刺鍼や強圧迫は頸動脈洞反射（血圧低下・徐脈・失神）を引き起こす。", clinicalSignificance: "必ず指先で拍動を外側に除けて刺入。直刺深刺は厳禁" },
      { id: "vagus-nerve", name: "迷走神経・内頸静脈", category: "nerve", relation: "頸動脈鞘内に同走", dangerLevel: "hazard", description: "自律神経の最重要幹。過度な深刺による刺激を避ける。", clinicalSignificance: "深刺厳禁。筋層内浅刺にとどめる" },
    ],
    svgElements: [
      // 頸動脈鞘・危険領域
      { layerId: "common-carotid-artery", elementId: "neck-carotid-sheath", label: "頸動脈鞘（危険領域）", shapeType: "ellipse", cx: 210, cy: 175, rx: 40, ry: 30, fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      // 総頸動脈（拍動部）
      { layerId: "common-carotid-artery", elementId: "neck-carotid-art", label: "総頸動脈（拍動部）", shapeType: "circle", cx: 200, cy: 175, r: 14, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 2 },
      // 内頸静脈
      { layerId: "vagus-nerve", elementId: "neck-jugular-vein", label: "内頸静脈", shapeType: "ellipse", cx: 232, cy: 172, rx: 11, ry: 16, fill: "#3498DB", stroke: "#1F618D", strokeWidth: 1.5 },
      // 迷走神経
      { layerId: "vagus-nerve", elementId: "neck-vagus-n", label: "迷走神経", shapeType: "circle", cx: 218, cy: 192, r: 4, fill: "#F1C40F", stroke: "#B7950B", strokeWidth: 1 },
      // 甲状軟骨（喉頭）
      { layerId: "thyroid-cartilage", elementId: "neck-thyroid", label: "甲状軟骨（喉頭）", shapeType: "path", d: "M 40,80 L 110,80 L 120,230 L 40,230 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 75, y: 155, anchor: "middle" } },
      // 胸鎖乳突筋
      { layerId: "sternocleidomastoid", elementId: "neck-scm-m", label: "胸鎖乳突筋（SCM）", shapeType: "ellipse", cx: 330, cy: 145, rx: 70, ry: 45, fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 330, y: 148, anchor: "middle" } },
      // 広頸筋・皮膚
      { layerId: "platysma", elementId: "neck-platysma", label: "広頸筋・浅筋膜", shapeType: "path", d: "M 40,60 Q 250,65 460,75 L 460,95 Q 250,85 40,80 Z", fill: "#FAF1DF", stroke: "#D6C7AC", strokeWidth: 1 },
      { layerId: "skin", elementId: "neck-skin", label: "皮膚表面", shapeType: "path", d: "M 40,40 Q 250,45 460,55 L 460,75 Q 250,65 40,60 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 52, anchor: "middle" } },
      // 針路（胸鎖乳突筋前縁・動脈を避けた安全刺入）
      { layerId: "needle-indicator", elementId: "neck-needle-path", label: "安全刺入ライン（動脈を避けて浅刺）", shapeType: "path", d: "M 270,15 L 260,115", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "neck-needle-point", label: "刺鍼到達点（SCM前縁筋膜）", shapeType: "circle", cx: 260, cy: 115, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "ネッター解剖学アトラス 頭頸部", "日本刺鍼事故防止ガイドライン（頸動脈穿刺対策）"],
  },

  // 6. 後頭下部・うなじ横断面（風池・天柱・風府・唖門）
  neck_suboccipital: {
    titleTemplate: "後頭下部・うなじ局所深浅断面モデル",
    level: "後頭骨下縁・環椎（C1）レベル水平横断",
    bodySide: "後頭部・項部",
    posture: "座位または腹臥位（頭部中間位・軽度前屈）",
    axes: { horizontal: ["後正中線 (項靭帯側)", "外側 (乳様突起側)"], vertical: ["項部体表 (皮膚)", "深部 (後頭下筋・大後頭孔)"] },
    summaryTakeaway: "僧帽筋・頭板状筋・頭半棘筋の層状配列と、深部の大後頭神経・椎骨動脈、および大後頭孔への上方深刺厳禁ルールを理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "頭髪が生える項部の厚い皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・項筋膜", category: "subcutaneous", depthDescription: "浅層", description: "大後頭神経の皮枝が貫通する結合組織。", dangerLevel: "safe", clinicalSignificance: "大後頭神経痛の刺激点" },
      { depthIndex: 3, id: "trapezius-splenius", name: "僧帽筋 / 頭板状筋", category: "muscle", depthDescription: "中層筋群", description: "首を支え回旋させる筋肉。風池・天柱の主要な得気筋腹。", dangerLevel: "safe", clinicalSignificance: "筋緊張性頭痛の主たるコリの座" },
      { depthIndex: 4, id: "semispinalis-capitis", name: "頭半棘筋 / 後頭下筋群", category: "muscle", depthDescription: "深層筋群", description: "後頭骨直下に張る深部筋群。自律神経調整の重要ポイント。", dangerLevel: "caution", clinicalSignificance: "過度の深刺は厳禁" },
    ],
    boundaries: [
      { id: "nuchal-ligament", name: "項靭帯（後正中線）", category: "tendon", position: "内側基準指標", relation: "風府・唖門が位置する正中線", description: "後頭骨から頸椎棘突起を強固につなぐ腱組織。", palpationTip: "うなじ中央の縦の溝", dangerLevel: "safe" },
      { id: "mastoid-process", name: "乳様突起（耳の後ろの骨）", category: "bone", position: "外側基準指標", relation: "風池の外側境界骨", description: "耳介の後ろにある丸い骨のでっぱり。", palpationTip: "耳の後ろの硬い骨を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "foramen-magnum-brainstem", name: "大後頭孔・延髄（生命中枢）", category: "organ", relation: "正中深部（上方へ深刺した時）", dangerLevel: "hazard", description: "呼吸・循環の中枢。針先を上方（頭蓋腔）へ向けて深刺すると延髄を損傷する重大事故のリスク。", clinicalSignificance: "上方への刺入は絶対厳禁。鼻尖または軽度下方へ向けて愛護的に浅刺" },
      { id: "vertebral-artery", name: "椎骨動脈（環椎後頭膜上）", category: "vessel", relation: "後頭下三角内を走行", dangerLevel: "hazard", description: "脳底動脈へ向かう主要動脈。深部での激しい雀啄・回旋は避ける。", clinicalSignificance: "深刺を避け筋層内にとどめる" },
    ],
    svgElements: [
      // 延髄・大後頭孔危険領域
      { layerId: "foramen-magnum-brainstem", elementId: "occipital-stem-danger", label: "大後頭孔・延髄領域（上方深刺厳禁）", shapeType: "path", d: "M 40,205 Q 180,215 260,205 L 260,260 L 40,260 Z", fill: "#FDEDEC", stroke: "#E07A70", strokeWidth: 1.5, strokeDasharray: "4 2" },
      // 項靭帯（正中線）
      { layerId: "nuchal-ligament", elementId: "occipital-nuchal-lig", label: "項靭帯（後正中線）", shapeType: "path", d: "M 40,65 L 90,65 L 90,230 L 40,230 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 65, y: 150, anchor: "middle" } },
      // 後頭下筋群・頭半棘筋（深層）
      { layerId: "semispinalis-capitis", elementId: "occipital-semispinalis", label: "頭半棘筋・後頭下筋群", shapeType: "path", d: "M 90,135 Q 260,140 440,150 L 440,205 Q 260,210 90,200 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      // 椎骨動脈
      { layerId: "vertebral-artery", elementId: "occipital-vert-art", label: "椎骨動脈", shapeType: "circle", cx: 280, cy: 175, r: 8, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      // 僧帽筋・頭板状筋
      { layerId: "trapezius-splenius", elementId: "occipital-splenius-m", label: "頭板状筋・僧帽筋（風池・天柱の座）", shapeType: "path", d: "M 90,85 Q 260,90 450,105 L 440,150 Q 260,140 90,135 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 270, y: 118, anchor: "middle" } },
      // 皮膚・皮下
      { layerId: "skin", elementId: "occipital-skin", label: "項部皮膚・皮下組織", shapeType: "path", d: "M 40,45 Q 250,50 460,60 L 450,105 Q 260,90 90,85 L 40,65 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 68, anchor: "middle" } },
      // 針路（鼻尖へ向けた安全刺入角度）
      { layerId: "needle-indicator", elementId: "occipital-needle-path", label: "安全刺入角度（鼻尖方向へ平刺〜斜刺）", shapeType: "path", d: "M 320,15 L 290,125", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "occipital-needle-point", label: "刺鍼到達点（板状筋筋膜）", shapeType: "circle", cx: 290, cy: 125, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床神経解剖学", "頭頸部刺鍼の解剖学的安全指標（延髄損傷防止）"],
  },

  // 7. 前腕掌側横断面（内関・間使・大陵・神門）
  forearm_anterior: {
    titleTemplate: "前腕掌側・手根部局所深浅断面モデル",
    level: "手関節掌側横紋上方2〜3寸水平横断",
    bodySide: "右前腕",
    posture: "手掌を上（回外位）にして前腕をリラックスさせた肢位",
    axes: { horizontal: ["橈側 (Radial / 親指側)", "尺側 (Ulnar / 小指側)"], vertical: ["掌側面 (表面)", "背側面 (深面)"] },
    summaryTakeaway: "橈側手根屈筋腱と長掌筋腱の間隙から浅指屈筋・深指屈筋に至る層構造と、深部を直走する正中神経の愛護的回避を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "手首掌側の薄く柔軟な皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い無痛切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・前腕浅筋膜", category: "subcutaneous", depthDescription: "浅層", description: "皮下静脈網と前腕皮神経が走る結合組織層。", dangerLevel: "safe", clinicalSignificance: "静脈回避" },
      { depthIndex: 3, id: "flexor-digitorum-superficialis", name: "浅指屈筋", category: "muscle", depthDescription: "中層筋腹", description: "2本の腱（橈側手根屈筋・長掌筋）の直下に広がる筋組織。内関の主たる得気の座。", dangerLevel: "safe", clinicalSignificance: "心地よい酸脹感を得る目標層" },
      { depthIndex: 4, id: "flexor-digitorum-profundus", name: "深指屈筋 / 長母指屈筋", category: "muscle", depthDescription: "深層屈筋群", description: "前腕骨間膜の前面に位置する深部筋群。", dangerLevel: "safe", clinicalSignificance: "深部刺激の終点" },
    ],
    boundaries: [
      { id: "flexor-carpi-radialis-tendon", name: "橈側手根屈筋腱", category: "tendon", position: "橈側境界線", relation: "触診の第1指標", description: "手首を曲げたときに親指側に強く浮き出る腱。", palpationTip: "手首を軽く屈曲させて触知", dangerLevel: "safe" },
      { id: "palmaris-longus-tendon", name: "長掌筋腱", category: "tendon", position: "尺側境界線", relation: "内関の取穴間隙を挟む腱", description: "母指と小指をつまみ合わせると中央に浮き出る細い腱。", palpationTip: "母指球と小指球をすぼめて触知", dangerLevel: "safe" },
      { id: "radius-bone", name: "橈骨（骨幹部）", category: "bone", position: "橈側骨性境界", relation: "前腕の外側骨格", description: "親指側の骨。", palpationTip: "前腕外側縁として触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "median-nerve", name: "正中神経", category: "nerve", relation: "2腱の間隙・浅指屈筋の深面を直走", dangerLevel: "caution", description: "手掌の知覚と母指球筋を支配。針先が接触すると指先へ電撃痛が走る。", clinicalSignificance: "電撃痛を感じたら針先を少し引き、角度を微調整する" },
      { id: "radial-artery", name: "橈骨動脈", category: "vessel", relation: "橈側手根屈筋腱の外側（太淵・経渠ライン）", dangerLevel: "caution", description: "脈拍を触知する動脈。内関からは橈側に外れている。", clinicalSignificance: "太淵・経渠取穴時は拍動直撃を回避" },
    ],
    svgElements: [
      // 橈骨断面
      { layerId: "radius-bone", elementId: "fa-radius", label: "橈骨", shapeType: "ellipse", cx: 100, cy: 155, rx: 32, ry: 25, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 100, y: 158, anchor: "middle" } },
      // 尺骨断面
      { layerId: "radius-bone", elementId: "fa-ulna", label: "尺骨", shapeType: "ellipse", cx: 400, cy: 155, rx: 28, ry: 24, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 400, y: 158, anchor: "middle" } },
      // 深指屈筋
      { layerId: "flexor-digitorum-profundus", elementId: "fa-fdp", label: "深指屈筋群", shapeType: "path", d: "M 135,160 Q 250,170 370,160 L 370,215 Q 250,225 135,215 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      // 浅指屈筋（主得気層）
      { layerId: "flexor-digitorum-superficialis", elementId: "fa-fds", label: "浅指屈筋（主目標組織）", shapeType: "path", d: "M 135,115 Q 250,120 370,115 L 370,160 Q 250,170 135,160 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 250, y: 140, anchor: "middle" } },
      // 正中神経
      { layerId: "median-nerve", elementId: "fa-median-n", label: "正中神経（注意構造）", shapeType: "circle", cx: 250, cy: 160, r: 7, fill: "#F1C40F", stroke: "#B7950B", strokeWidth: 1.5 },
      // 橈側手根屈筋腱
      { layerId: "flexor-carpi-radialis-tendon", elementId: "fa-fcr-tendon", label: "橈側手根屈筋腱", shapeType: "circle", cx: 195, cy: 105, r: 12, fill: "#EDE6DA", stroke: "#8C8275", strokeWidth: 2 },
      // 長掌筋腱
      { layerId: "palmaris-longus-tendon", elementId: "fa-pl-tendon", label: "長掌筋腱", shapeType: "circle", cx: 295, cy: 105, r: 10, fill: "#EDE6DA", stroke: "#8C8275", strokeWidth: 2 },
      // 橈骨動脈
      { layerId: "radial-artery", elementId: "fa-radial-art", label: "橈骨動脈（脈拍部）", shapeType: "circle", cx: 145, cy: 105, r: 7, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      // 皮膚・皮下
      { layerId: "skin", elementId: "fa-skin", label: "掌側皮膚・浅筋膜", shapeType: "path", d: "M 60,65 Q 250,75 440,65 L 440,95 Q 250,105 60,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      // 針路（2腱間隙からの直刺）
      { layerId: "needle-indicator", elementId: "fa-needle-path", label: "標準直刺針路（0.5〜0.8寸）", shapeType: "path", d: "M 245,25 L 245,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "fa-needle-point", label: "刺鍼到達点（浅指屈筋内）", shapeType: "circle", cx: 245, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "Casey GP (2022) 前腕部解剖断面研究", "手の外科解剖アトラス"],
  },

  // 8. 前腕背側横断面（外関・支溝・手三里）
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
      { depthIndex: 3, id: "extensor-digitorum", name: "総指伸筋 / 小指伸筋", category: "muscle", depthDescription: "浅層伸筋群", description: "指を伸ばす筋肉。外関・支溝の主要な得気組織。", dangerLevel: "safe", clinicalSignificance: "酸脹感の主座" },
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
      { layerId: "posterior-interosseous-nv", elementId: "fap-nv", label: "後骨間神経", shapeType: "circle", cx: 250, cy: 155, r: 6, fill: "#F1C40F", stroke: "#B7950B", strokeWidth: 1.5 },
      { layerId: "skin", elementId: "fap-skin", label: "背側皮膚・浅筋膜", shapeType: "path", d: "M 60,65 Q 250,75 440,65 L 440,95 Q 250,105 60,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "fap-needle-path", label: "直刺針路（0.5〜1.0寸）", shapeType: "path", d: "M 250,25 L 250,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "fap-needle-point", label: "刺鍼到達点（伸筋群内）", shapeType: "circle", cx: 250, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "プロメテウス解剖学アトラス 上肢"],
  },

  // 9. 手背・手掌部（合谷・三間・中渚）
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

  // 10. 下腿前外側横断面（足三里・上巨虚・豊隆・陽陵泉）
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
      { depthIndex: 3, id: "tibialis-anterior", name: "前脛骨筋（TA）", category: "muscle", depthDescription: "主筋腹", description: "足関節を背屈させる筋肉。足三里の最大得気座。", dangerLevel: "safe", clinicalSignificance: "強い酸脹感（重だるさ）を生む主座" },
      { depthIndex: 4, id: "extensor-digitorum-longus", name: "長趾伸筋 / 前筋間中隔", category: "muscle", depthDescription: "外側筋群", description: "前脛骨筋の外側に位置する筋肉。", dangerLevel: "safe", clinicalSignificance: "外側区画との筋間取穴" },
    ],
    boundaries: [
      { id: "tibia-anterior-border", name: "脛骨前縁（すねの骨）", category: "bone", position: "内側不動指標", relation: "足三里（外方1横指）の基準線", description: "皮膚の直下で触れる硬いすねの骨縁。", palpationTip: "脛骨前縁の硬い骨稜を触知", dangerLevel: "safe" },
      { id: "fibula-shaft", name: "腓骨", category: "bone", position: "外側骨性境界", relation: "下腿外側区画の支持骨", description: "下腿外側深部の骨。", palpationTip: "腓骨頭から下行するライン", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "anterior-tibial-artery-deep-peroneal-n", name: "前脛骨動静脈・深腓骨神経", category: "nerve", relation: "前脛骨筋と長趾伸筋の筋間深部（骨間膜前面）", dangerLevel: "caution", description: "足背動脈へ連なる動脈と、足背の知覚・伸筋を支配する神経。", clinicalSignificance: "骨間膜直上の過度の深刺・強雀啄は控える" },
    ],
    svgElements: [
      { layerId: "tibia-anterior-border", elementId: "lla-tibia", label: "脛骨（すねの骨）", shapeType: "path", d: "M 70,110 L 140,110 L 160,200 L 90,220 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 115, y: 155, anchor: "middle" } },
      { layerId: "fibula-shaft", elementId: "lla-fibula", label: "腓骨", shapeType: "ellipse", cx: 410, cy: 165, rx: 25, ry: 20, fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2, labelPos: { x: 410, y: 168, anchor: "middle" } },
      { layerId: "tibialis-anterior", elementId: "lla-ta-muscle", label: "前脛骨筋（足三里の主座）", shapeType: "path", d: "M 140,110 Q 250,115 320,120 L 300,185 Q 230,195 160,200 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 230, y: 145, anchor: "middle" } },
      { layerId: "extensor-digitorum-longus", elementId: "lla-edl-muscle", label: "長趾伸筋", shapeType: "path", d: "M 320,120 Q 360,125 390,135 L 385,180 L 300,185 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "anterior-tibial-artery-deep-peroneal-n", elementId: "lla-nv-bundle", label: "前脛骨動静脈・深腓骨神経", shapeType: "circle", cx: 285, cy: 180, r: 7, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "skin", elementId: "lla-skin", label: "下腿前面皮膚・浅筋膜", shapeType: "path", d: "M 50,65 Q 250,75 440,80 L 435,115 Q 250,105 50,95 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 82, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "lla-needle-path", label: "標準直刺針路（1.0〜1.5寸）", shapeType: "path", d: "M 220,20 L 220,145", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "lla-needle-point", label: "刺鍼到達点（前脛骨筋腹）", shapeType: "circle", cx: 220, cy: 145, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "Casey GP (2022) 足三里解剖モデル", "クリニカルマッサージ 第2版"],
  },

  // 11. 下腿内側横断面（三陰交・陰陵泉・太渓）
  lower_leg_medial: {
    titleTemplate: "下腿内側・後脛骨筋区画局所深浅断面モデル",
    level: "内果上方3寸（三陰交高位）水平横断",
    bodySide: "右下腿内側",
    posture: "仰臥位（股関節外旋・膝関節軽度屈曲位）",
    axes: { horizontal: ["前内側 (脛骨内側面)", "後外側 (ヒラメ筋側)"], vertical: ["内側体表 (皮膚)", "深部 (後脛骨筋・骨間膜)"] },
    summaryTakeaway: "脛骨内側縁の骨際からヒラメ筋・長趾屈筋・後脛骨筋へ至る層構造と、後脛骨動脈・脛骨神経の走向を把握します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "下腿内側の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・大伏在静脈", category: "subcutaneous", depthDescription: "浅層", description: "大伏在静脈と伏在神経が縦走する層。", dangerLevel: "safe", clinicalSignificance: "静脈直撃の回避" },
      { depthIndex: 3, id: "soleus-flexor-digitorum", name: "ヒラメ筋 / 長趾屈筋", category: "muscle", depthDescription: "中層筋腹", description: "脛骨内側縁のすぐ後ろにある筋肉。三陰交の主たる得気の座。", dangerLevel: "safe", clinicalSignificance: "婦人科・血行促進の刺激点" },
      { depthIndex: 4, id: "tibialis-posterior", name: "後脛骨筋", category: "muscle", depthDescription: "深層筋", description: "下腿深部に位置する筋。足のアーチを支える。", dangerLevel: "safe", clinicalSignificance: "深部刺激到達層" },
    ],
    boundaries: [
      { id: "tibia-medial-border", name: "脛骨内側縁（骨際）", category: "bone", position: "前側境界指標", relation: "三陰交・陰陵泉の不動の取穴線", description: "すねの内側の硬い骨の縁。骨際に指を潜り込ませる。", palpationTip: "脛骨内側面の後ろの角（骨際）を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "posterior-tibial-artery-tibial-n", name: "後脛骨動脈・脛骨神経", category: "vessel", relation: "ヒラメ筋深面・長趾屈筋と後脛骨筋の間を走行", dangerLevel: "caution", description: "足底へ血液と知覚を送る主要動脈・神経幹。", clinicalSignificance: "太渓・三陰交深刺時の過度な雀啄を避ける" },
    ],
    svgElements: [
      { layerId: "tibia-medial-border", elementId: "llm-tibia", label: "脛骨（内側面・後縁）", shapeType: "path", d: "M 70,80 L 160,80 L 170,190 L 80,180 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 120, y: 135, anchor: "middle" } },
      { layerId: "tibialis-posterior", elementId: "llm-tp-muscle", label: "後脛骨筋（深層）", shapeType: "path", d: "M 170,140 Q 260,150 360,155 L 350,215 L 170,190 Z", fill: "#DFC4B2", stroke: "#B38F78", strokeWidth: 1.5 },
      { layerId: "posterior-tibial-artery-tibial-n", elementId: "llm-nv", label: "後脛骨動脈・脛骨神経", shapeType: "circle", cx: 270, cy: 165, r: 8, fill: "#E74C3C", stroke: "#922B21", strokeWidth: 1.5 },
      { layerId: "soleus-flexor-digitorum", elementId: "llm-soleus", label: "ヒラメ筋・長趾屈筋（三陰交主座）", shapeType: "path", d: "M 160,80 Q 270,90 420,95 L 410,150 Q 270,145 170,140 Z", fill: "#E8D8C8", stroke: "#C49A75", strokeWidth: 2, labelPos: { x: 285, y: 115, anchor: "middle" } },
      { layerId: "skin", elementId: "llm-skin", label: "内側皮膚・浅筋膜", shapeType: "path", d: "M 50,45 Q 250,55 440,60 L 440,85 Q 250,80 50,70 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 62, anchor: "middle" } },
      { layerId: "needle-indicator", elementId: "llm-needle-path", label: "脛骨後縁への直刺針路", shapeType: "path", d: "M 195,15 L 195,135", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "llm-needle-point", label: "刺鍼到達点（屈筋群筋膜）", shapeType: "circle", cx: 195, cy: 135, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "三陰交刺鍼の安全性と深度に関する超音波研究"],
  },

  // 12. 下腿後側・膝窩横断面（委中・承山・合陽）
  lower_leg_posterior: {
    titleTemplate: "下腿後側・膝窩ふくらはぎ局所深浅断面モデル",
    level: "膝窩横紋〜ふくらはぎ中央水平横断",
    bodySide: "右下腿後側",
    posture: "腹臥位（下腿をリラックスさせた自然肢位）",
    axes: { horizontal: ["内側 (内側頭側)", "外側 (外側頭側)"], vertical: ["後表面 (皮膚)", "深部 (骨・膝窩動静脈側)"] },
    summaryTakeaway: "腓腹筋内側頭・外側頭とヒラメ筋の二層構造、および膝窩中央を縦走する脛骨神経・膝窩動静脈の深浅関係を理解します。",
    layers: [
      { depthIndex: 1, id: "skin", name: "皮膚", category: "skin", depthDescription: "表面層", description: "ふくらはぎ後面の皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "subcutaneous", name: "皮下組織・小伏在静脈", category: "subcutaneous", depthDescription: "浅層", description: "表在静脈が縦走する層。", dangerLevel: "safe", clinicalSignificance: "血管回避" },
      { depthIndex: 3, id: "gastrocnemius", name: "腓腹筋（内側頭・外側頭）", category: "muscle", depthDescription: "浅層筋腹", description: "アキレス腱へ連なる力強い筋肉。委中・承山の主座。", dangerLevel: "safe", clinicalSignificance: "こむら返り・腰背部痛の治療点" },
      { depthIndex: 4, id: "soleus-post", name: "ヒラメ筋", category: "muscle", depthDescription: "深層筋", description: "腓腹筋の深面にある幅広い筋肉。", dangerLevel: "safe", clinicalSignificance: "持続的筋緊張の緩和" },
    ],
    boundaries: [
      { id: "popliteal-crease", name: "膝窩横紋", category: "tendon", position: "上下指標", relation: "委中の基準線", description: "膝の裏を曲げたときにできる横じわ。", palpationTip: "膝裏中央のしわを触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "tibial-nerve-popliteal-vessels", name: "脛骨神経・膝窩動静脈", category: "vessel", relation: "膝窩中央・腓腹筋両頭の深部を直走", dangerLevel: "hazard", description: "下肢の主要大動脈と神経幹。直接有痕灸や過度な直刺深刺は禁忌。", clinicalSignificance: "膝窩大血管への直撃回避。指腹で拍動を確認して取穴" },
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

  // 13. 足背・足底（太衝・湧泉・行間）
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
      { id: "metatarsal-1-2", name: "第1・第2中足骨底", category: "bone", position: "内外側骨性境界", relation: "太衝の不動の取穴指標", description: "足の甲で親指と人差し指の骨が合流するV字の底。", palpationTip: "指先で2本の骨の合わせ目を触知", dangerLevel: "safe" },
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

  // 14. 頭頂部・顔面部（百会・四神聡・太陽）
  head_cranial: {
    titleTemplate: "頭頂部・頭蓋冠局所深浅断面モデル",
    level: "頭頂骨・冠状縫合レベル水平横断",
    bodySide: "頭部",
    posture: "座位または仰臥位",
    axes: { horizontal: ["左側 (Left)", "右側 (Right)"], vertical: ["頭皮表面", "深部 (頭蓋骨・硬膜側)"] },
    summaryTakeaway: "帽状腱膜から骨膜に至る薄い頭皮の層構造を理解し、直刺による骨膜痛を避けて皮下に沿わせる横刺（平刺）の手技を把握します。",
    layers: [
      { depthIndex: 1, id: "skin-scalp", name: "頭皮（皮膚）", category: "skin", depthDescription: "表面層", description: "毛根が存在する厚く密な皮膚。", dangerLevel: "safe", clinicalSignificance: "素早い切皮" },
      { depthIndex: 2, id: "galea-aponeurotica", name: "帽状腱膜", category: "fascia", depthDescription: "腱膜層", description: "頭頂部を覆う強靭な腱膜。刺入時に独特の手ごたえ。", dangerLevel: "safe", clinicalSignificance: "横刺（平刺）の針尖進入層" },
      { depthIndex: 3, id: "subaponeurotic-space", name: "腱膜下結合組織", category: "subcutaneous", depthDescription: "滑動層", description: "帽状腱膜と頭蓋骨膜の間にある疎松な層。針が滑らかに進む。", dangerLevel: "safe", clinicalSignificance: "百会の針尖留置目標層" },
      { depthIndex: 4, id: "pericranium", name: "頭蓋骨骨膜", category: "bone", depthDescription: "骨膜層", description: "頭蓋骨表面を覆う骨膜。直刺で直撃すると痛覚過敏を生じる。", dangerLevel: "caution", clinicalSignificance: "骨膜直撃を避け平刺とする" },
    ],
    boundaries: [
      { id: "calvaria-bone", name: "頭蓋骨（頭頂骨・前頭骨）", category: "bone", position: "深部不動境界", relation: "頭蓋腔への侵入を防ぐ強固な骨壁", description: "脳を保護する骨壁。", palpationTip: "硬い頭蓋骨面を触知", dangerLevel: "safe" },
    ],
    adjacentStructures: [
      { id: "superior-sagittal-sinus", name: "上矢状静脈洞（頭蓋内）", category: "vessel", relation: "頭蓋冠直下の硬膜内（※頭蓋骨により完全保護）", dangerLevel: "safe", description: "頭蓋骨内を走る静脈洞。大人の刺鍼で骨を貫通することはない。", clinicalSignificance: "骨膜面を意識し平刺する" },
    ],
    svgElements: [
      { layerId: "calvaria-bone", elementId: "head-skull", label: "頭蓋骨（骨皮質）", shapeType: "path", d: "M 40,165 Q 250,175 460,165 L 460,235 Q 250,245 40,235 Z", fill: "#E8E3D8", stroke: "#78716C", strokeWidth: 2.5, labelPos: { x: 250, y: 200, anchor: "middle" } },
      { layerId: "subaponeurotic-space", elementId: "head-subapo", label: "腱膜下層（針尖進退層）", shapeType: "path", d: "M 40,140 Q 250,150 460,140 L 460,165 Q 250,175 40,165 Z", fill: "#FAF1DF", stroke: "#D6C7AC", strokeWidth: 1.5 },
      { layerId: "galea-aponeurotica", elementId: "head-galea", label: "帽状腱膜（百会の得気層）", shapeType: "path", d: "M 40,105 Q 250,115 460,105 L 460,140 Q 250,150 40,140 Z", fill: "#E2D9CC", stroke: "#A89F91", strokeWidth: 2, labelPos: { x: 250, y: 125, anchor: "middle" } },
      { layerId: "skin-scalp", elementId: "head-scalp", label: "頭皮表面", shapeType: "path", d: "M 40,65 Q 250,75 460,65 L 460,105 Q 250,115 40,105 Z", fill: "#FDF8F2", stroke: "#B8A995", strokeWidth: 2, labelPos: { x: 250, y: 85, anchor: "middle" } },
      // 平刺・横刺の針路（皮膚に沿って寝かせる）
      { layerId: "needle-indicator", elementId: "head-needle-path", label: "横刺（平刺）針路（骨膜に沿って進める）", shapeType: "path", d: "M 140,55 L 290,130", fill: "none", stroke: "#2E7D32", strokeWidth: 2.5 },
      { layerId: "needle-indicator", elementId: "head-needle-point", label: "刺鍼到達点（腱膜下層）", shapeType: "circle", cx: 290, cy: 130, r: 4.5, fill: "#2E7D32", stroke: "#FFFFFF", strokeWidth: 1.5 },
    ],
    references: ["WHO Standard Acupuncture Point Locations (2008)", "臨床頭鍼解剖アトラス"],
  },
};

/**
 * 経穴固有の刺針深度・針路を生成
 */
function generateNeedleTrackForPoint(point: AcupointMaster, sliceType: SliceType): {
  angle: string;
  safeDepth: string;
  targetStructure: string;
  warning?: string;
} {
  const code = point.codeLower;

  if (code === "cv8") {
    return {
      angle: "刺鍼厳禁（禁鍼穴）",
      safeDepth: "0寸（刺鍼不可）",
      targetStructure: "皮膚表面（温熱刺激のみ）",
      warning: "臍中央への刺鍼は絶対禁忌。温灸（間接灸）のみ適応。",
    };
  }

  if (code === "st17") {
    return {
      angle: "鍼灸絶対禁忌（禁鍼・禁灸）",
      safeDepth: "0寸（刺激不可）",
      targetStructure: "骨度法・触診の目印のみ",
      warning: "乳頭中心への刺鍼・施灸は絶対禁忌。",
    };
  }

  if (isBrainstemRisk(code)) {
    return {
      angle: "平刺または鼻尖方向への軽度下向き斜刺 0.5〜1.0寸",
      safeDepth: "0.5〜1.0寸 ※深刺厳禁",
      targetStructure: "頭板状筋・頭半棘筋筋膜",
      warning: "上方（大後頭孔・頭蓋腔方向）への刺入は延髄損傷の危険があるため絶対厳禁。",
    };
  }

  if (isChestBackPneumothoraxRisk(code, point.bodyPart, point.locationDetail)) {
    return {
      angle: "斜刺または横刺（肋骨に沿って外方へ）0.3〜0.5寸",
      safeDepth: "0.3〜0.5寸（肋骨・大胸筋/起立筋筋層内）",
      targetStructure: "大胸筋深面または脊柱起立筋筋腹",
      warning: "直刺による深刺は胸膜・肺を穿刺し気胸（外傷性気胸）を引き起こす危険があるため絶対禁忌。",
    };
  }

  if (isNeckCarotidRisk(code)) {
    return {
      angle: "動脈拍動を指先で外側に避けて直刺 0.3〜0.5寸",
      safeDepth: "0.3〜0.5寸（SCM筋膜・表層筋層）",
      targetStructure: "胸鎖乳突筋前縁または後縁筋膜",
      warning: "総頸動脈直上への刺入や過度な圧迫は頸動脈洞反射（血圧低下・失神）の危険あり。",
    };
  }

  // スライス別デフォルト
  switch (sliceType) {
    case "head_cranial":
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
