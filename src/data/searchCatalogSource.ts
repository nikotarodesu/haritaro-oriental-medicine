// Build-time source only: client components import the generated searchCatalog instead.
import { getAllAcupoints } from "@/data/tsubo/index";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { GLOSSARY_TERMS } from "@/data/glossaryData";
import { CLASSICAL_TEXTS } from "@/data/classicalTextsData";
import { VERIFIED_PAPERS as PAPERS_DATABASE } from "@/data/references/papersData";
import { ARTICLES } from "@/data/articleData";
import { ACUPUNCTURE_RESEARCH_ARTICLES } from "@/data/acupunctureResearch/index";
import { SYMPTOMS } from "@/data/symptomData";
import { PUBLIC_SYMPTOM_CONTENT } from "@/data/publicSymptoms";
import { getPublicLectureArticle, getPublicLectureSeries } from "@/data/publicLectures/index";
import { readingUnits } from "@/data/publicLectures/readingUnits";
import { PUBLIC_ARCHIVE_CASES } from "@/data/cases/archiveCases";
import { TOOL_CATALOG } from "@/config/toolCatalog";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { REFLECTION_CASES } from "@/data/learningReflectionCatalog";
import { CLINICAL_COMPLAINTS } from "@/data/clinicalWorkflow";
import type { SearchResultItem } from "@/types/searchCatalog";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH, acupunctureResearchHref, NINE_NEEDLES_GUIDE } from "@/config/acupunctureLearning";

const guideLookupTerms = ["鍼灸", "鍼灸入門", "はじめての鍼灸", "はり", "鍼", "灸", "お灸", "はりとお灸", "はり・お灸・ツボ押しの違い", "ツボ押しとの違い"];
const nineNeedlesLookupTerms = ["九鍼", "古代九鍼", "古代の九鍼", "九鍼十二原", "九鍼十二原篇"];
const historyLookupTerms = ["鍼灸の歴史", "日本の鍼灸の歴史", "管鍼法"];
const symptomLookupTerms: Readonly<Record<string, readonly string[]>> = {
  "headache-stiff-neck": ["頭痛", "肩こり", "首こり"],
  "stress-insomnia": ["不眠", "寝つき", "寝付き"],
};

const STATIC_TOOLS: SearchResultItem[] = [
  { id: "tool-learning-essentials", type: "tool", title: "東洋医学の要点", subtitle: "陰陽・気血津液・経絡などの基本を一問ずつ確認する", badge: "学習ガイド", url: "/learn/essentials", tags: ["東洋医学", "要点", "まとめ", "基礎", "陰陽", "気血津液", "経絡"] },
  { id: 'clinical-home', type: 'tool', title: '臨床演習', subtitle: '体質チェック、模擬症例、主訴別の確認ガイドを選ぶ', badge: '臨床', url: '/clinical', tags: ['主訴','問診','臨床','鍼灸師'] },
  ...CLINICAL_COMPLAINTS.map(item => ({ id: `clinical-${item.slug}`, type: 'tool' as const, searchRole: 'professional-guide' as const, title: `${item.title}｜鍼灸師の確認ガイド`, subtitle: item.summary, badge: '主訴別・専門家', url: `/clinical/symptoms/${item.slug}`, tags: [item.title,'主訴','問診','四診','再評価'] })),
  {
    id: "tool-kokushi",
    type: "tool",
    title: TOOL_CATALOG.kokushi.title,
    subtitle: TOOL_CATALOG.kokushi.description,
    badge: "講義の復習",
    url: "/learn/review",
    tags: ["復習", "講義", "確認問題", "間隔復習", "回答履歴"],
  },
  {
    id: "tool-simulator",
    type: "tool",
    title: TOOL_CATALOG.simulator.title,
    subtitle: TOOL_CATALOG.simulator.description,
    badge: "演習",
    url: "/simulator",
    tags: ["シミュレーター", "弁証", "配穴", "八綱", "気血水", "臓腑", "鑑別"],
  },
  {
    id: "tool-simulator-compare",
    type: "tool",
    title: "鑑別例を見比べる",
    subtitle: "固定3組の教材例で、所見・伝統的な分類・配穴意図の違いを見比べる",
    badge: "臨床鑑別",
    url: "/simulator#comparison-examples",
    tags: ["鑑別", "比較", "シミュレーター", "並列", "2案", "証の比較"],
  },
  {
    id: "tool-library",
    type: "tool",
    title: "文献・古典・症例教材",
    subtitle: "病名、ツボの名前、古典の書名で資料を探す",
    badge: "文献",
    url: "/library",
    tags: ["古典", "素問", "霊枢", "難経", "論文", "エビデンス", "治未病", "ライブラリ"],
  },
  {
    id: "tool-symptoms",
    type: "tool",
    title: "お悩み・症状別 セルフケアガイド",
    subtitle: "頭痛・肩こり・不眠などの受診目安と、セルフケア・養生を学ぶ",
    badge: "セルフケア",
    url: "/symptoms",
    tags: ["症状", "セルフケア", "お悩み", "頭痛", "肩こり", "不眠", "胃もたれ", "生理痛", "冷え性"],
  },
  {
    id: "tool-haiketsu-optimizer",
    type: "tool",
    title: TOOL_CATALOG.haiketsu.title,
    subtitle: TOOL_CATALOG.haiketsu.description,
    badge: "演習",
    url: "/practice/haiketsu",
    tags: ["配穴", "処方", "原穴", "絡穴", "四関", "四総穴", "組み合わせ"],
  },
  {
    id: "tool-tsubo-compare",
    type: "tool",
    title: "経穴比較ツール",
    subtitle: "似た主治や近接する経穴（合谷と太衝、足三里と三陰交など）を並べて比較",
    badge: "学習ツール",
    url: "/tsubo/compare",
    tags: ["比較", "鑑別", "経穴", "ツボ比較"],
  },
  {
    id: "tool-basics-cun",
    type: "tool",
    title: "骨度法・寸の割り出しガイド",
    subtitle: "全身の骨度分寸（等分法・指寸同身寸）の基準と正確な取穴のコツ",
    badge: "解剖基礎",
    url: "/tsubo/basics/bone-cun",
    tags: ["骨度法", "寸", "取穴", "解剖", "基準"],
  },
  {
    id: "tool-kikei",
    type: "tool",
    title: "奇経八脈データベース",
    subtitle: "督脈・任脈・衝脈・帯脈・陰陽蹻脈・陰陽維脈の走行と主治病態",
    badge: "経絡理論",
    url: "/kikei",
    tags: ["奇経", "八脈", "任脈", "督脈", "衝脈", "帯脈"],
  },
  {
    id: "tool-diagnosis-self",
    type: "tool",
    title: "気血水 体質チェック（12問）",
    subtitle: "伝統的な体質分類の学習用チェック。医学的な診断や治療判断には使用しません",
    badge: "セルフチェック",
    url: "/diagnosis",
    tags: ["気血水", "診断", "セルフチェック", "体質", "気虚", "血虚", "瘀血"],
  },
  {
    id: "tool-diagnosis-gorou",
    type: "tool",
    title: "五労チェッカー",
    subtitle: "長く続く生活動作を選び、五労の古典の記述と休憩・動作の例を確認する",
    badge: "生活動作のチェック",
    url: "/diagnosis?tab=gorou",
    exactTerms: ["五労チェッカー", "五労チェック"],
    tags: ["五労", "ごろう", "五労所傷", "久視", "久臥", "久坐", "久立", "久行", "宣明五気篇"],
  },
];


export function buildSearchCatalog(): SearchResultItem[] {
    const list: SearchResultItem[] = [];

    // 1. ツール群
    list.push(...STATIC_TOOLS);
    list.push({
      id: "article-acupuncture-introduction", type: "article", title: ACUPUNCTURE_GUIDE.title,
      subtitle: ACUPUNCTURE_GUIDE.description, badge: "鍼灸入門", url: ACUPUNCTURE_GUIDE.href,
      exactTerms: guideLookupTerms, tags: [...guideLookupTerms, "鍼灸の基礎", "施術の流れ", "お灸の道具"],
    }, {
      id: "article-ancient-nine-needles", type: "article", title: NINE_NEEDLES_GUIDE.title,
      subtitle: "『霊枢』に記された九種類の鍼具の形・名前・読み方・寸法を図で見比べる。",
      badge: "歴史と道具", url: NINE_NEEDLES_GUIDE.href,
      exactTerms: nineNeedlesLookupTerms, tags: [...nineNeedlesLookupTerms, "霊枢", "鑱鍼", "員鍼", "鍉鍼", "鋒鍼", "鈹鍼", "員利鍼", "毫鍼", "長鍼", "大鍼"],
    });
    list.push({
      id: "acupuncture-research-index", type: "article", title: ACUPUNCTURE_RESEARCH.title,
      subtitle: ACUPUNCTURE_RESEARCH.description, badge: "研究解説", url: ACUPUNCTURE_RESEARCH.href,
      exactTerms: ["鍼灸の研究を読む", "鍼灸の研究解説"], tags: ["鍼灸", "研究", "比較試験", "原著論文"],
    });
    list.push(...ACUPUNCTURE_RESEARCH_ARTICLES.map((article): SearchResultItem => ({
      id: `acupuncture-research-${article.slug}`, type: "article", title: article.title,
      subtitle: article.description, badge: "研究解説",
      url: acupunctureResearchHref(article.slug),
      tags: [...article.tags],
    })));
    list.push(...LEARNING_COURSES.map((course): SearchResultItem => ({
      id: `course-${course.slug}`, type: "lecture", title: course.title,
      subtitle: `${course.steps.length}ステップ｜${course.description}`, badge: "目的別コース",
      url: `/learn/courses/${course.slug}`, tags: ["コース", "学び直し", course.eyebrow, ...course.goals],
    })));
    list.push(...ARTICLES.map((article): SearchResultItem => ({
      id: article.id, type: "article", title: article.title,
      subtitle: article.summary, badge: "解説記事",
      url: '/articles/' + article.id,
      tags: article.id === NINE_NEEDLES_GUIDE.articleId ? [...article.tags, ...historyLookupTerms] : article.tags,
      exactTerms: article.id === NINE_NEEDLES_GUIDE.articleId ? historyLookupTerms : undefined,
    })));
    list.push(...REFLECTION_CASES.map((caseItem): SearchResultItem => ({
      id: `progressive-case-${caseItem.id}`, type: "case", title: caseItem.title,
      subtitle: "架空の教材で、追加質問・安全判断・候補の比較・根拠・再評価を段階的に練習",
      badge: "段階式症例演習", url: `/simulator?case=${caseItem.id}#case-training`,
      tags: ["症例", "段階式", "症例演習", "判断根拠", "安全確認", "再評価"],
    })));

    // 2. 東洋医学の講義と、図鑑・演習の個別教材
    for (const unit of readingUnits) {
      list.push({
        id: `reading-lecture-${unit.slug}`,
        type: "lecture",
        title: unit.title,
        subtitle: unit.description,
        badge: "東洋医学の講義",
        url: unit.href,
        tags: unit.parts.flatMap(part => {
          const article = getPublicLectureArticle(part.lectureId);
          return [part.label, article?.title ?? "", ...(article?.sections.map(section => section.heading) ?? [])];
        }),
      });
    }
    CURRICULUM_DATA.forEach((chapter) => {
      chapter.lectures.filter(lecture => lecture.isPublished).forEach((lec) => {
        const article = getPublicLectureArticle(lec.id);
        if (!article) return;
        const series = getPublicLectureSeries(lec.id);
        if (series === "reading") return;
        list.push({
          id: `lecture-${lec.id}`,
          type: "lecture",
          title: article.title,
          subtitle: article.description,
          badge: series === "practice" ? "臨床演習" : "ツボ図鑑",
          url: `/curriculum/${lec.id}`,
          tags: [
            lec.title,
            lec.subtitle || "",
            ...article.sections.map(section => section.heading),
            chapter.title,
            chapter.subtitle || "",
          ],
        });
      });
    });

    // 3. 経穴（全361穴）
    const acupoints = getAllAcupoints();
    acupoints.forEach((pt) => {
      list.push({
        id: `tsubo-${pt.codeLower}`,
        type: "acupoint",
        title: `${pt.name}（${pt.code}）`,
        subtitle: `${pt.meridian}｜${pt.bodyPart}・${pt.locationSimple}`,
        badge: "ツボ図鑑",
        url: `/tsubo/${pt.codeLower}`,
        exactCode: pt.code.toLowerCase(),
        exactTerms: [pt.name, pt.kana, pt.romaji, pt.legacyId, ...(pt.aliases || [])],
        tags: [
          pt.name,
          pt.kana,
          pt.code,
          pt.codeLower,
          pt.romaji,
          pt.legacyId,
          pt.meridian,
          pt.meridianShort,
          pt.bodyPart,
          ...(pt.indications || []),
          ...(pt.categories || []),
          ...(pt.aliases || []),
        ],
      });
    });

    // 5. 古典原典条文（CLASSICAL_TEXTS）
    CLASSICAL_TEXTS.forEach((c) => {
      list.push({
        id: `classic-${c.id}`,
        type: "classic",
        title: `『${c.book}』${c.chapter}：${c.theme}`,
        subtitle: `${c.translation.slice(0, 48)}...`,
        badge: `古典：${c.book}`,
        url: `/library#classic-${c.id}`,
        tags: [
          c.book,
          c.chapter,
          c.theme,
          ...c.tags,
        ],
      });
    });

    // 6. 臨床医学論文（PAPERS_DATABASE）
    PAPERS_DATABASE.forEach((p) => {
      list.push({
        id: `paper-${p.id}`,
        type: "paper",
        title: p.japaneseTitle,
        subtitle: `${p.targetCondition}｜${p.studyDesign}・${p.journal} (${p.year})`,
        badge: p.claimsStatus === "source-checked" ? "論文：原典要約の照合済み" : "論文：書誌照合済み・解釈確認待ち",
        reviewStatus: p.claimsStatus,
        url: `/library#paper-${p.id}`,
        tags: [
          p.title,
          p.japaneseTitle,
          p.targetCondition,
          p.studyDesign,
          p.journal,
          "論文", "研究", "文献", "エビデンス",
          ...p.tags,
          ...(p.interventionProtocol?.acupoints || []),
        ],
      });
    });

    // 7. お悩み・症状別ガイド（SYMPTOMS）
    SYMPTOMS.forEach((s) => {
      const summary = PUBLIC_SYMPTOM_CONTENT[s.id]?.summary ?? s.summary;
      list.push({
        id: `symptom-${s.id}`,
        type: "symptom",
        title: s.title,
        subtitle: summary,
        badge: "症状別ガイド",
        url: `/symptoms/${s.id}`,
        tags: [
          s.title,
          s.category,
          summary,
          ...(symptomLookupTerms[s.id] ?? []),
        ],
      });
    });

    // 8. 症例演習（全20症例）
    CLINICAL_CASES.forEach((c) => {
      list.push({
        id: `case-${c.id}`,
        type: "case",
        title: c.title,
        subtitle: `${c.patient?.chiefComplaint || c.subTitle}（${c.difficulty}・${c.category}）`,
        badge: "症例演習",
        url: `/cases/${c.id}`,
        tags: [
          c.title,
          c.subTitle,
          c.patient?.chiefComplaint || "",
          c.category,
          c.difficulty,
        ],
      });
    });

    // 9. 運動器・自律神経実例アーカイブ（出典確認待ち）
    PUBLIC_ARCHIVE_CASES.forEach((ac) => {
      list.push({
        id: `archive-case-${ac.id}`,
        type: "case",
        title: ac.title,
        subtitle: `${ac.category}｜${ac.location}・${ac.symptoms.slice(0, 40)}...`,
        badge: "症例資料",
        url: `/library#archive-${ac.id}`,
        tags: [
          ac.title,
          ac.category,
          ac.location,
          ac.symptoms,
          ...ac.usedAcupoints,
          ...ac.tags,
        ],
      });
    });

    // 10. 専門用語（Glossary）
    Object.values(GLOSSARY_TERMS).forEach((term) => {
      list.push({
        id: `glossary-${term.term}`,
        type: "glossary",
        title: `${term.term}（${term.reading}）`,
        subtitle: term.oneLiner,
        badge: `用語：${term.category}`,
        url: `/glossary#term-${encodeURIComponent(term.term)}`,
        exactTerms: [term.term, term.reading],
        tags: [term.term, term.reading, term.oneLiner],
      });
    });

    return list.map(item => ({ ...item, tags: [...new Set((item.tags || []).map(term => term.trim()).filter(Boolean))] }));
}
