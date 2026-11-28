import { ACUPOINTS_MASTER } from "../acupointsMaster";
import { EXTRA_POINTS } from "../extraPoints";
import { getTraditionalUseSource, TRADITIONAL_POINT_USES } from "./traditionalUses";

export const TSUBO_SYMPTOM_INDEX_PATH = "/tsubo/symptoms";

function normalizeLabel(label: string) {
  return label.normalize("NFC").trim();
}

// Keep published URLs stable when Japanese display copy is edited.
const symptomSlugs: Readonly<Partial<Record<string, string>>> = {
  "あごのこわばり": "jaw-stiffness",
  "いらだち": "irritability",
  "おなかが鳴る": "stomach-rumbling",
  "おなかの張り": "bloating",
  "おなかの痛み": "abdominal-pain",
  "かかとの痛み": "heel-pain",
  "すねの外側のこわばり": "outer-shin-stiffness",
  "すねの冷え": "cold-shin",
  "せき": "cough",
  "においが分かりにくい": "reduced-sense-of-smell",
  "のどのつかえ": "throat-tightness",
  "のどの乾き": "dry-throat",
  "のどの痛み": "sore-throat",
  "のどの不調": "throat-discomfort",
  "ひざ・脚のだるさ": "heavy-knees-and-legs",
  "ひざを曲げ伸ばししにくい": "limited-knee-motion",
  "ひじ・腕の痛み": "elbow-and-arm-pain",
  "ひじのこわばり": "elbow-stiffness",
  "ひじの痛み": "elbow-pain",
  "ひじを曲げ伸ばししにくい": "limited-elbow-motion",
  "ひじを伸ばしにくい": "difficulty-straightening-elbow",
  "へその周りの痛み": "pain-around-navel",
  "みぞおちの張り": "upper-abdominal-fullness",
  "みぞおちの痛み": "upper-abdominal-pain",
  "めまい": "dizziness",
  "胃もたれ": "stomach-heaviness",
  "下の歯の痛み": "lower-toothache",
  "下腹部の張り": "lower-abdominal-fullness",
  "下腹部の痛み": "lower-abdominal-pain",
  "下痢": "diarrhea",
  "顔の腫れ": "facial-swelling",
  "気持ちの落ち着かなさ": "restlessness",
  "脚の筋がつる": "leg-cramps",
  "脚の痛み": "leg-pain",
  "胸・背中の痛み": "chest-and-back-pain",
  "胸・脇腹の張り": "chest-and-side-fullness",
  "胸のつかえ": "chest-tightness",
  "胸の張り": "chest-fullness",
  "月経周期の乱れ": "irregular-menstrual-periods",
  "肩・ひじ・手首の痛み": "shoulder-elbow-and-wrist-pain",
  "肩・背中のこわばり": "shoulder-and-back-stiffness",
  "肩・背中の痛み": "shoulder-and-back-pain",
  "肩・腕のだるさ": "heavy-shoulders-and-arms",
  "肩・腕の痛み": "shoulder-and-arm-pain",
  "肩・腕を動かしにくい": "limited-shoulder-and-arm-movement",
  "肩の痛み": "shoulder-pain",
  "口の乾き": "dry-mouth",
  "口や舌の痛み": "mouth-and-tongue-pain",
  "口内炎": "mouth-sores",
  "腰・下腹部の痛み": "lower-back-and-abdominal-pain",
  "腰のこわばり": "lower-back-stiffness",
  "腰の痛み": "lower-back-pain",
  "腰の冷え": "cold-lower-back",
  "酸っぱいものがこみ上げる": "sour-regurgitation",
  "指の痛み": "finger-pain",
  "歯ぐきの腫れ・痛み": "gum-swelling-and-pain",
  "歯ぐきの痛み": "gum-pain",
  "歯の痛み": "toothache",
  "耳鳴り": "tinnitus",
  "手のしびれ": "hand-numbness",
  "手のひらのほてり": "warm-palms",
  "手首に力が入りにくい": "wrist-weakness",
  "手首を動かしにくい": "limited-wrist-movement",
  "首・肩の痛み": "neck-and-shoulder-pain",
  "首すじのこわばり": "neck-stiffness",
  "首すじの痛み": "soreness-along-the-neck",
  "首の痛み": "neck-pain",
  "消化の不調": "digestive-discomfort",
  "上の歯の痛み": "upper-toothache",
  "食が進まない": "difficulty-eating",
  "食欲の低下": "reduced-appetite",
  "声が出にくい": "difficulty-voicing",
  "足のしびれ": "foot-numbness",
  "足の甲の腫れ": "swelling-on-top-of-foot",
  "足の裏のほてり": "warm-soles",
  "吐き気": "nausea",
  "頭の重さ": "heavy-head",
  "頭痛": "headache",
  "尿が出にくい": "difficulty-urinating",
  "尿もれ": "urine-leakage",
  "排尿の不調": "urinary-discomfort",
  "背中の痛み": "back-pain",
  "皮膚のかゆみ": "itchy-skin",
  "皮膚の痛み": "skin-pain",
  "鼻づまり": "nasal-congestion",
  "不眠": "insomnia",
  "聞こえにくさ": "difficulty-hearing",
  "便通の不調": "irregular-bowel-movements",
  "便秘": "constipation",
  "目の赤み": "eye-redness",
  "脇腹の痛み": "side-pain",
  "腕の曲げ伸ばしがしにくい": "limited-arm-bending-and-straightening",
  "腕の痛み": "arm-pain",
  "腕の内側の痛み": "inner-arm-pain",
  "腕を上げにくい": "difficulty-raising-arm",
  "嘔吐": "vomiting",
};

function getSymptomSlug(label: string) {
  const slug = symptomSlugs[normalizeLabel(label)];
  if (!slug) throw new Error(`Missing symptom route for ${label}`);
  return slug;
}

export function traditionalSymptomPath(label: string) {
  return `${TSUBO_SYMPTOM_INDEX_PATH}/${getSymptomSlug(label)}`;
}

type SymptomPoint = {
  code: string;
  name: string;
  kana: string;
  bodyPart: string;
  href: string;
  source: { label: string; url: string };
};

function getPointIdentity(code: string) {
  const point = ACUPOINTS_MASTER.find(point => point.codeLower === code);
  if (point) {
    return { code: point.code, name: point.name, kana: point.kana, bodyPart: point.bodyPart, href: `/tsubo/${point.codeLower}` };
  }
  return EXTRA_POINTS.find(point => point.code.toLowerCase() === code);
}

const pointsByLabel = new Map<string, SymptomPoint[]>();
for (const [code, use] of Object.entries(TRADITIONAL_POINT_USES)) {
  const point = getPointIdentity(code);
  if (!use || !point) continue;
  for (const rawLabel of new Set(use.labels)) {
    const label = normalizeLabel(rawLabel);
    const points = pointsByLabel.get(label) ?? [];
    points.push({
      code: point.code, name: point.name, kana: point.kana, bodyPart: point.bodyPart, href: point.href,
      source: getTraditionalUseSource(use, rawLabel),
    });
    pointsByLabel.set(label, points);
  }
}

export const TRADITIONAL_SYMPTOMS = Array.from(pointsByLabel, ([label, points]) => ({
  label,
  slug: getSymptomSlug(label),
  href: traditionalSymptomPath(label),
  points,
})).sort((a, b) => a.label.localeCompare(b.label, "ja"));

export function getTraditionalSymptom(slug: string) {
  return TRADITIONAL_SYMPTOMS.find(symptom => symptom.slug === slug);
}
