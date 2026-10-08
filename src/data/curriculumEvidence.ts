import type { ReferenceItem } from "@/types/references";

const checked = { bibliographyStatus: "matched", claimsStatus: "source-checked", sourceCheckedAt: "2026-10-08" } as const;
const terminology: ReferenceItem = {
  id: "who-tcm-terminology-publisher-overview", type: "guideline",
  title: "WHO international standard terminologies on traditional Chinese medicine（掲載ページの概要）",
  source: "World Health Organization", year: 2022,
  url: "https://www.who.int/publications/i/item/9789240042322", ...checked,
  note: "公式掲載ページで、伝統医学の概念・用語を医療記録や教育で共通化する資料の目的と書誌を確認。PDF本文の個別の定義は未照合です。本講の各診断分類・古典解釈や治療効果を裏付ける引用ではなく、用語を区別して学ぶための背景資料です。",
};
const acupuncture: ReferenceItem = {
  id: "nccih-acupuncture-effectiveness-safety", type: "guideline",
  title: "Acupuncture: Effectiveness and Safety", source: "National Center for Complementary and Integrative Health, NIH",
  url: "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety", ...checked,
  note: "公式ページの、作用機序が完全には解明されていないこと、有効性は対象・比較条件によること、有害事象と必要な受診を遅らせない原則を確認。本講の個別の治法・配穴や架空症例の効果を実証する資料ではありません。",
};
const sharedDecision: ReferenceItem = {
  id: "nice-ng197-shared-decision", type: "guideline", title: "Shared decision making：Recommendations（NG197）",
  source: "National Institute for Health and Care Excellence", year: 2021,
  url: "https://www.nice.org.uk/guidance/ng197/chapter/Recommendations", ...checked,
  note: "推奨1.2.7–1.2.11の、本人の目標・希望、選択肢の利益と不利益、介入しない選択、理解の確認を扱う説明を参照。英国の共同意思決定指針であり、日本の法制度や個別の鍼灸治法の効果・適応を定める資料ではありません。",
};
const soap: ReferenceItem = {
  id: "maryland-acupuncture-soap-documentation", type: "guideline", title: "Professional Documentation Standard（SOAP Notes）",
  source: "Maryland Department of Health, Board of Acupuncture",
  url: "https://health.maryland.gov/bacc/Pages/Professional-Documentation-(SOAP-Notes).aspx", ...checked,
  note: "公式ページのS（本人の報告）、O（観察・検査）、A（評価）、P（計画）の区分と、記録を連携に役立てる説明を確認。米国メリーランド州の資料であり、日本の法的記録要件や本サイトの採点基準を示すものではありません。",
};
const emergencies: ReferenceItem = {
  id: "medlineplus-recognizing-emergencies", type: "guideline", title: "Recognizing medical emergencies",
  source: "MedlinePlus, U.S. National Library of Medicine", year: 2025,
  url: "https://medlineplus.gov/ency/article/001927.htm", ...checked,
  note: "呼吸の異常、意識の変化、胸部症状、突然の強い痛みなどで必要な医療対応を遅らせない原則を確認。米国の案内であり、掲載の電話番号や処置手順を日本向けに転用せず、本講の受診目安を網羅する資料とも扱いません。",
};

const sharedDecisionLectures = new Set(["lecture-treatment-1", "lecture-treatment-4", "lecture-treatment-10", "lecture-treatment-11", "lecture-treatment-12", "lecture-practice-4", "lecture-practice-9", "lecture-practice-10", "lecture-practice-11", "lecture-practice-12"]);
const soapLectures = new Set(["lecture-diagnosis-1", "lecture-diagnosis-2", "lecture-diagnosis-3", "lecture-diagnosis-10", "lecture-diagnosis-11", "lecture-practice-1", "lecture-practice-2", "lecture-practice-3", "lecture-practice-12"]);
const safetyLectures = new Set(["lecture-diagnosis-1", "lecture-diagnosis-7", "lecture-treatment-1", "lecture-treatment-9", "lecture-treatment-12", "lecture-practice-1", "lecture-practice-8", "lecture-practice-12"]);

/** Preserve declared sources; fill the previously empty sections with clearly scoped background material. */
export function getCurriculumReferences(id: string, seriesId: string, declared?: (string | ReferenceItem)[]): (string | ReferenceItem)[] {
  const references = [...(declared ?? [])].map(ref => {
    if (typeof ref === "string") return ref;
    if (ref.id === "book-kiketsusui-standard") {
      return { id: ref.id, type: "book" as const, title: ref.title, source: "旧教材の書名記載（書誌未照合）", bibliographyStatus: "unverified" as const, claimsStatus: "needs-review" as const,
        note: "書名・著者・出版社・刊年・版の一致を確認できていないため、旧教材の著者・刊年・商品番号と内容の推薦文を取り下げています。現時点では本文の根拠として利用を保留します。" };
    }
    if (ref.id === "classic-reisu-30-jueqi") {
      return { ...ref, bibliographyStatus: "unverified" as const, claimsStatus: "needs-review" as const,
        note: "『霊枢』決気篇を参照候補として挙げた旧教材の記載です。使用する底本・篇章・原文・訳文を未照合のため、本文引用の根拠としては保留します。現代のエネルギー代謝との同一性を裏付ける資料としては扱いません。" };
    }
    return ref;
  });
  if (references.length > 0) return references;
  if (seriesId === "diagnosis") references.push(terminology);
  if (seriesId === "treatment") references.push(terminology, acupuncture);
  if (seriesId === "practice") references.push(acupuncture);
  if (soapLectures.has(id)) references.push(soap);
  if (sharedDecisionLectures.has(id)) references.push(sharedDecision);
  if (safetyLectures.has(id)) references.push(emergencies);
  return references;
}

export function getCurriculumEvidenceScope(seriesId: string): string {
  const common = "本文・図解・クイズは本サイトの学習用編集です。文献ごとの『参照した内容・適用範囲』が外部資料との確認範囲です。書誌の一致や背景資料の掲載は、講義全体の検証・専門家監修を意味しません。";
  if (seriesId === "practice") return `${common} 症例の経過・数値・選択肢は架空設定であり、有効性の実証や実技の技能評価ではありません。`;
  if (["diagnosis", "treatment", "pathomechanism"].includes(seriesId)) return `${common} 伝統的な分類・個々の所見の診断精度・古典の原文や版の照合は未完了です。現代医学の診断や個別の治療効果と区別して読みます。`;
  return `${common} 伝統理論と現代医学の比較は、概念の同一性や治療効果の証明と区別して読みます。`;
}
