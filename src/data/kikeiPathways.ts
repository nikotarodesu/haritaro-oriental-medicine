import { getAcupointByCode } from "@/data/tsubo/index";

export interface PathwayNode {
  x: number;
  y: number;
  name: string;
  labelLines?: readonly [string, string];
  code?: string;
  desc: string;
}

export interface VesselConfig {
  viewLabel: string;
  mainPath?: string;
  secondPath?: string;
  downPath?: string;
  isRing?: boolean;
  nodes: PathwayNode[];
}

function point(x: number, y: number, code: string): PathwayNode {
  const entry = getAcupointByCode(code);
  if (!entry) throw new Error("Unknown kikei diagram point: " + code);
  return { x, y, code, name: entry.name, desc: entry.locationSimple };
}

export function getKikeiPathway(slug: string): VesselConfig {
  switch (slug) {
    case "toku": // 督脈（背面正中・陽気の統括）
      return {
        viewLabel: "背中の中央から頭へ",
        mainPath: "M 110 320 L 110 260 L 110 190 L 110 135 L 110 75 C 110 42 90 30 80 40 C 72 48 70 70 65 85",
        nodes: [
          point(110, 320, "GV1"),
          point(110, 260, "GV4"),
          point(110, 190, "GV9"),
          point(110, 135, "GV14"),
          point(110, 75, "GV16"),
          point(92, 33, "GV20"),
          point(65, 85, "GV28")
        ]
      };

    case "nin": // 任脈（前面正中・陰気の統括）
      return {
        viewLabel: "おなかと胸の中央を通る経路",
        mainPath: "M 110 320 L 110 280 L 110 230 L 110 185 L 110 140 L 110 95 L 110 75",
        nodes: [
          point(110, 320, "CV1"),
          point(110, 280, "CV4"),
          point(110, 230, "CV8"),
          point(110, 185, "CV12"),
          point(110, 140, "CV17"),
          point(110, 95, "CV22"),
          point(110, 75, "CV24")
        ]
      };

    case "sho": // 衝脈（十二経の海・血海・逆気上衝）
      return {
        viewLabel: "下腹部から体の前面を上る経路",
        mainPath: "M 110 295 C 95 275 92 245 92 180 C 92 140 100 110 110 90",
        secondPath: "M 110 295 C 125 275 128 245 128 180 C 128 140 120 110 110 90",
        downPath: "M 110 295 C 95 315 90 345 88 370",
        nodes: [
          { x: 110, y: 295, name: "胞中", desc: "伝統医学で、衝脈の始まりとされる骨盤内の部位です。" },
          point(92, 275, "ST30"),
          point(92, 245, "KI12"),
          point(92, 185, "KI19"),
          point(92, 145, "KI21"),
          { x: 110, y: 90, name: "咽喉・口唇", desc: "体の前面を上った枝が、のどから唇の周囲へ達するとされます。" },
          {
            x: 88, y: 370,
            name: "下行枝（足底・内果）",
            labelLines: ["下行枝", "（足底・内果）"],
            desc: "脚の内側を足の方へ下る枝を破線で示しています。",
          }
        ]
      };

    case "tai": // 帯脈（体幹水平環状・全経束ね）
      return {
        viewLabel: "腰の周囲を水平に巡る経路",
        isRing: true,
        nodes: [
          point(62, 205, "LR13"),
          point(74, 220, "GB26"),
          point(85, 236, "GB27"),
          point(96, 248, "GB28"),
          {
            x: 155, y: 220,
            name: "腰を一周",
            labelLines: ["腰を", "一周"],
            desc: "帯のように腰の周りを横に一周する道筋として描きます。",
          }
        ]
      };

    case "yokyo": // 陽蹻脈（外果〜体側〜肩〜目頭）
      return {
        viewLabel: "外くるぶしから肩を経て目頭へ",
        mainPath: "M 62 365 L 62 335 L 66 260 L 72 195 L 75 130 L 95 85 L 108 58",
        nodes: [
          point(62, 365, "BL62"),
          point(62, 335, "BL59"),
          point(66, 260, "GB29"),
          point(75, 130, "LI15"),
          point(95, 85, "ST1"),
          point(108, 58, "BL1")
        ]
      };

    case "inkyo": // 陰蹻脈（内果〜前陰〜胸〜目頭）
      return {
        viewLabel: "内くるぶしから体の内側を経て目頭へ",
        mainPath: "M 102 365 L 102 335 L 104 275 L 108 245 L 108 170 L 108 105 L 108 58",
        nodes: [
          point(102, 365, "KI6"),
          point(102, 335, "KI8"),
          { x: 104, y: 275, name: "太ももの内側", desc: "内くるぶしから上り、太ももの内側を通る道筋です。" },
          { x: 108, y: 245, name: "前陰（恥骨部）", desc: "古典では、ここからおなかと胸の中へ向かうとされます。" },
          { x: 108, y: 170, name: "胸・鎖骨の上", desc: "胸を上り、鎖骨の上のくぼみからのどに向かう道筋です。" },
          point(108, 58, "BL1")
        ]
      };

    case "yoi": // 陽維脈（足外側〜側腹〜肩井〜頭維〜風池）
      return {
        viewLabel: "体の外側を上る経路",
        mainPath: "M 62 365 L 65 315 L 75 220 L 78 128 L 84 55 L 102 75",
        nodes: [
          point(62, 365, "BL63"),
          point(65, 315, "GB35"),
          { x: 75, y: 220, name: "脇腹", desc: "脚の外側から肩へ向かう途中で、脇腹を通ります。" },
          point(78, 128, "GB21"),
          point(84, 55, "GB14"),
          point(102, 75, "GB20")
        ]
      };

    case "ini": // 陰維脈（下腿内側〜腹部大横〜期門〜天突）
      return {
        viewLabel: "脚の内側からおなか、胸、のどへ",
        mainPath: "M 98 330 L 98 275 L 85 225 L 88 175 L 110 105 L 110 88",
        nodes: [
          point(98, 330, "KI9"),
          { x: 98, y: 275, name: "太ももの内側", desc: "太ももの内側を通り、下腹部へ向かう道筋です。" },
          point(85, 225, "SP15"),
          point(88, 175, "LR14"),
          point(110, 105, "CV22"),
          point(110, 88, "CV23")
        ]
      };

    default:
      throw new Error("Unknown kikei pathway: " + slug);
  }
}
