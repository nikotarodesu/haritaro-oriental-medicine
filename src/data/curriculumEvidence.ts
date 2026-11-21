import type { ReferenceItem } from "@/types/references";

const checked = { bibliographyStatus: "matched", claimsStatus: "source-checked", sourceCheckedAt: "2026-10-08" } as const;
const terminology: ReferenceItem = {
  id: "who-tcm-terminology-publisher-overview", type: "guideline",
  title: "WHO international standard terminologies on traditional Chinese medicine（掲載ページの概要）",
  source: "World Health Organization", year: 2022,
  url: "https://www.who.int/publications/i/item/9789240042322", ...checked,
  note: "WHOの紹介ページを参照しました。教育や医療記録で伝統医学の用語をそろえるための資料です。",
};
const acupuncture: ReferenceItem = {
  id: "nccih-acupuncture-effectiveness-safety", type: "guideline",
  title: "Acupuncture: Effectiveness and Safety", source: "National Center for Complementary and Integrative Health, NIH",
  url: "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety", ...checked,
  note: "どの症状と比較条件で研究が行われたか、鍼を受けるときに何に注意するかを参照しました。",
};
const sharedDecision: ReferenceItem = {
  id: "nice-ng197-shared-decision", type: "guideline", title: "Shared decision making：Recommendations（NG197）",
  source: "National Institute for Health and Care Excellence", year: 2021,
  url: "https://www.nice.org.uk/guidance/ng197/chapter/Recommendations", ...checked,
  note: "本人の希望を聞き、選択肢の利点と不利益を一緒に確かめる方法を、英国の指針の1.2.7〜1.2.11から参照しました。",
};
const soap: ReferenceItem = {
  id: "maryland-acupuncture-soap-documentation", type: "guideline", title: "Professional Documentation Standard（SOAP Notes）",
  source: "Maryland Department of Health, Board of Acupuncture",
  url: "https://health.maryland.gov/bacc/Pages/Professional-Documentation-(SOAP-Notes).aspx", ...checked, sourceCheckedAt: "2026-10-09",
  note: "米国メリーランド州の資料から、SOAPの4区分と、記録を関係者の連携に役立てる方法を参照しました。",
};
const emergencies: ReferenceItem = {
  id: "medlineplus-recognizing-emergencies", type: "guideline", title: "Recognizing medical emergencies",
  source: "MedlinePlus, U.S. National Library of Medicine", year: 2025,
  url: "https://medlineplus.gov/ency/article/001927.htm", ...checked,
  note: "急な呼吸の異常や意識の変化などを見逃さないための米国の案内です。日本での連絡先は、当サイトの「受診の目安」をご覧ください。",
};

const sharedDecisionLectures = new Set(["lecture-treatment-1", "lecture-treatment-4", "lecture-treatment-10", "lecture-treatment-11", "lecture-treatment-12", "lecture-practice-4", "lecture-practice-6", "lecture-practice-7", "lecture-practice-8", "lecture-practice-9", "lecture-practice-10", "lecture-practice-11", "lecture-practice-12"]);
const soapLectures = new Set(["lecture-diagnosis-1", "lecture-diagnosis-2", "lecture-diagnosis-3", "lecture-diagnosis-10", "lecture-diagnosis-11", "lecture-practice-1", "lecture-practice-2", "lecture-practice-3", "lecture-practice-8", "lecture-practice-12"]);
const safetyLectures = new Set(["lecture-diagnosis-1", "lecture-diagnosis-7", "lecture-treatment-1", "lecture-treatment-9", "lecture-treatment-12", "lecture-practice-1", "lecture-practice-8", "lecture-practice-12"]);

/** Preserve declared sources; fill the previously empty sections with clearly scoped background material. */
export function getCurriculumReferences(id: string, seriesId: string, declared?: (string | ReferenceItem)[]): (string | ReferenceItem)[] {
  const references = [...(declared ?? [])].map(ref => {
    if (typeof ref === "string") return ref;
    if (ref.id === "book-kiketsusui-standard") {
      return { id: ref.id, type: "book" as const, title: ref.title, source: "旧教材に挙がっている書名", bibliographyStatus: "unverified" as const, claimsStatus: "needs-review" as const,
        note: "旧教材に挙がっている書名です。著者や版を特定できないため、この講義の説明の出典には用いていません。" };
    }
    if (ref.id === "classic-reisu-30-jueqi") {
      return { ...ref, bibliographyStatus: "unverified" as const, claimsStatus: "needs-review" as const,
        note: "気や血について古典を読む際の手がかりとして、旧教材に挙がっていた篇名を示しています。この講義で引用した原文や現代医学の説明の出典には用いていません。" };
    }
    return ref;
  });
  if (id === "lecture-practice-8") {
    for (const source of [soap, sharedDecision]) {
      if (!references.some(ref => typeof ref !== "string" && ref.id === source.id)) references.push(source);
    }
  }
  if (id === "lecture-pathomechanism-1" && !references.some(ref => typeof ref !== "string" && ref.id === terminology.id)) {
    references.push({ ...terminology, sourceCheckedAt: "2026-10-09" });
  }
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
  const common = "資料ごとに、どの用語や内容を参照したかを示しています。";
  if (seriesId === "practice") return `${common} 症例の経過・数値・選択肢は架空設定であり、有効性の実証や実技の技能評価ではありません。`;
  if (["diagnosis", "treatment", "pathomechanism"].includes(seriesId)) return `${common} 伝統医学の分類と、現代医学で診断や治療効果を調べる方法は区別して読みます。`;
  return `${common} 伝統理論と現代医学の比較は、概念の同一性や治療効果の証明と区別して読みます。`;
}
