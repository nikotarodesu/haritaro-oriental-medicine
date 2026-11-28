import { normalizeSearchText } from "@/utils/search";

export type SymptomDirectoryEntry = { slug: string; label: string; href: string; count: number };

const categories = [
  { label: "頭・顔・目・耳", slugs: [
    "headache", "heavy-head", "dizziness", "jaw-stiffness", "facial-swelling",
    "eye-redness", "tinnitus", "difficulty-hearing",
  ] },
  { label: "鼻・口・のど", slugs: [
    "nasal-congestion", "reduced-sense-of-smell", "cough", "throat-tightness", "dry-throat",
    "sore-throat", "throat-discomfort", "difficulty-voicing", "dry-mouth", "mouth-and-tongue-pain",
    "mouth-sores", "toothache", "upper-toothache", "lower-toothache", "gum-swelling-and-pain", "gum-pain",
  ] },
  { label: "首・肩・腕・手", slugs: [
    "neck-pain", "neck-stiffness", "soreness-along-the-neck", "neck-and-shoulder-pain", "shoulder-pain",
    "shoulder-and-arm-pain", "heavy-shoulders-and-arms", "limited-shoulder-and-arm-movement",
    "shoulder-elbow-and-wrist-pain", "elbow-and-arm-pain", "elbow-stiffness", "elbow-pain",
    "limited-elbow-motion", "difficulty-straightening-elbow", "arm-pain", "inner-arm-pain",
    "limited-arm-bending-and-straightening", "difficulty-raising-arm", "finger-pain", "hand-numbness",
    "warm-palms", "wrist-weakness", "limited-wrist-movement",
  ] },
  { label: "胸・背中・腰", slugs: [
    "chest-and-back-pain", "chest-and-side-fullness", "chest-tightness", "chest-fullness", "side-pain",
    "shoulder-and-back-stiffness", "shoulder-and-back-pain", "back-pain", "lower-back-pain",
    "lower-back-and-abdominal-pain", "lower-back-stiffness", "cold-lower-back",
  ] },
  { label: "胃腸・おなか", slugs: [
    "stomach-heaviness", "stomach-rumbling", "bloating", "abdominal-pain", "pain-around-navel",
    "upper-abdominal-fullness", "upper-abdominal-pain", "lower-abdominal-fullness", "lower-abdominal-pain",
    "sour-regurgitation", "digestive-discomfort", "difficulty-eating", "reduced-appetite", "nausea",
    "vomiting", "diarrhea", "constipation", "irregular-bowel-movements",
  ] },
  { label: "ひざ・脚・足", slugs: [
    "heavy-knees-and-legs", "limited-knee-motion", "outer-shin-stiffness", "cold-shin", "leg-cramps",
    "leg-pain", "heel-pain", "foot-numbness", "swelling-on-top-of-foot", "warm-soles",
  ] },
  { label: "排尿・月経", slugs: [
    "difficulty-urinating", "urine-leakage", "urinary-discomfort", "irregular-menstrual-periods",
  ] },
  { label: "皮膚・睡眠・気分", slugs: [
    "itchy-skin", "skin-pain", "insomnia", "irritability", "restlessness",
  ] },
];

const categoryBySlug = new Map(categories.flatMap(({ label, slugs }) => slugs.map(slug => [slug, label] as const)));

export function groupSymptomDirectory(entries: readonly SymptomDirectoryEntry[]) {
  const groups = new Map([...categories.map(({ label }) => label), "そのほか"]
    .map(label => [label, [] as SymptomDirectoryEntry[]]));
  for (const entry of entries) {
    groups.get(categoryBySlug.get(entry.slug) ?? "そのほか")!.push(entry);
  }
  return Array.from(groups, ([label, entries]) => ({ label, entries })).filter(group => group.entries.length > 0);
}

// Search spellings lead to an existing entry and never change its source or linked points.
const alternativeTerms: Readonly<Partial<Record<string, readonly string[]>>> = {
  "headache": ["頭が痛い"],
  "nasal-congestion": ["鼻詰まり", "鼻が詰まる"],
  "cough": ["咳"],
  "dry-mouth": ["口が乾く"],
  "dry-throat": ["のどが乾く"],
  "sore-throat": ["のどが痛い"],
  "eye-redness": ["目の充血", "目が赤い"],
  "toothache": ["歯痛", "歯が痛い"],
  "lower-back-pain": ["腰痛", "腰が痛い"],
  "bloating": ["おなかが張る"],
  "abdominal-pain": ["腹痛", "おなかが痛い"],
  "reduced-appetite": ["食欲不振", "食欲低下", "食欲がない", "食欲が落ちた"],
  "nausea": ["はきけ"],
  "vomiting": ["おうと", "吐いた"],
  "leg-cramps": ["足がつる", "脚がつる"],
  "urine-leakage": ["尿漏れ"],
  "irregular-menstrual-periods": ["月経不順", "生理不順"],
  "itchy-skin": ["皮膚がかゆい"],
};

function normalizeSymptomSearch(text: string) {
  return normalizeSearchText(text)
    .replaceAll("肘", "ひじ").replaceAll("膝", "ひざ").replaceAll("喉", "のど")
    .replaceAll("顎", "あご").replaceAll("踵", "かかと")
    .replaceAll("お腹", "おなか").replaceAll("歯茎", "歯ぐき");
}

export function findSymptomsInDirectory(entries: readonly SymptomDirectoryEntry[], query: string) {
  const term = normalizeSymptomSearch(query);
  return entries.filter(({ slug, label }) => [label, ...(alternativeTerms[slug] ?? [])]
    .some(text => normalizeSymptomSearch(text).includes(term)));
}
