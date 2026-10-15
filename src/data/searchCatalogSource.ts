// Build-time source only: client components import the generated searchCatalog instead.
import { getAllAcupoints } from "@/data/tsubo/index";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { GLOSSARY_TERMS } from "@/data/glossaryData";
import { CLASSICAL_TEXTS } from "@/data/classicalTextsData";
import { VERIFIED_PAPERS as PAPERS_DATABASE } from "@/data/references/papersData";
import { ARTICLES } from "@/data/articleData";
import { SYMPTOMS } from "@/data/symptomData";
import { PUBLIC_ARCHIVE_CASES } from "@/data/cases/archiveCases";
import { TOOL_CATALOG } from "@/config/toolCatalog";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { REFLECTION_CASES } from "@/data/learningReflectionCatalog";
import { CLINICAL_COMPLAINTS } from "@/data/clinicalWorkflow";
import type { SearchResultItem } from "@/types/searchCatalog";

const STATIC_TOOLS: SearchResultItem[] = [
  { id: 'clinical-home', type: 'tool', title: '鍼灸師の臨床ホーム', subtitle: '主訴・所見・前回記録から始める', badge: '臨床', url: '/clinical', tags: ['主訴','問診','臨床','鍼灸師'] },
  { id: 'clinical-workspace', type: 'tool', title: '所見から記録まで', subtitle: '四診・候補比較・配穴の理由・再評価', badge: '臨床記録', url: '/clinical/workspace', tags: ['四診','所見','弁証','配穴','再評価'] },
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
    badge: "臨床ツール",
    url: "/simulator",
    tags: ["シミュレーター", "弁証", "配穴", "八綱", "気血水", "臓腑", "鑑別"],
  },
  {
    id: "tool-simulator-compare",
    type: "tool",
    title: "2案並列 鑑別シミュレーター",
    subtitle: "迷いやすい2つの証（例：気虚 vs 気滞、肝火上炎 vs 肝陽上亢）を並べて配穴比較",
    badge: "臨床鑑別",
    url: "/simulator/compare",
    tags: ["鑑別", "比較", "シミュレーター", "並列", "2案", "証の比較"],
  },
  {
    id: "tool-library",
    type: "tool",
    title: "医学文献・古典アーカイブ",
    subtitle: "古典の学習用引用・文献情報を探し、出典や書誌の照合状況を確認",
    badge: "文献アーカイブ",
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
    badge: "臨床ツール",
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
    id: "tool-learning-notes",
    type: "tool",
    title: "学習ノート・振り返り",
    subtitle: "講義や症例の要点・迷った理由・次に確かめることを記録し、以前の考え方と比較",
    badge: "学習記録",
    url: "/notes?tab=learning",
    tags: ["学習ノート", "振り返り", "学習記録", "考え方", "復習"],
  },
  {
    id: "tool-notes",
    type: "tool",
    title: "臨床カルテ・配穴ストックノート",
    subtitle: "患者カルテ、配穴ストック、A4患者養生処方せん・待合室POP印刷対応",
    badge: "臨床管理",
    url: "/notes",
    tags: ["ノート", "カルテ", "記録", "配穴ストック", "患者管理", "印刷", "A4"],
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
    title: "気血水 体質セルフチェック（12問）",
    subtitle: "伝統的な体質分類の学習用チェック。医学的な診断や治療判断には使用しません",
    badge: "セルフチェック",
    url: "/diagnosis",
    tags: ["気血水", "診断", "セルフチェック", "体質", "気虚", "血虚", "瘀血"],
  },
];


export function buildSearchCatalog(): SearchResultItem[] {
    const list: SearchResultItem[] = [];

    // 1. ツール群
    list.push(...STATIC_TOOLS);
    list.push(...LEARNING_COURSES.map((course): SearchResultItem => ({
      id: `course-${course.slug}`, type: "lecture", title: course.title,
      subtitle: `${course.steps.length}ステップ｜${course.description}`, badge: "目的別コース",
      url: `/learn/courses/${course.slug}`, tags: ["コース", "学び直し", course.eyebrow, ...course.goals],
    })));
    list.push(...ARTICLES.map((article): SearchResultItem => ({
      id: article.id, type: "article", title: article.title,
      subtitle: article.summary, badge: "解説記事",
      url: '/articles/' + article.id, tags: article.tags,
    })));
    list.push(...REFLECTION_CASES.map((caseItem): SearchResultItem => ({
      id: `progressive-case-${caseItem.id}`, type: "case", title: caseItem.title,
      subtitle: "架空の教材で、追加質問・安全判断・候補の比較・根拠・再評価を段階的に練習",
      badge: "段階式症例演習", url: `/simulator?case=${caseItem.id}#case-training`,
      tags: ["症例", "段階式", "症例演習", "判断根拠", "安全確認", "再評価"],
    })));

    // 2. 講義カリキュラム（全講義）
    CURRICULUM_DATA.forEach((chapter) => {
      chapter.lectures.filter(lecture => lecture.isPublished).forEach((lec) => {
        list.push({
          id: `lecture-${lec.id}`,
          type: "lecture",
          title: lec.title,
          subtitle: `${lec.stageTitle} ➜ ${lec.seriesTitle || "講義"}（約${lec.duration}）`,
          badge: "講義教材",
          url: `/curriculum/${lec.id}`,
          tags: [
            lec.title,
            lec.subtitle || "",
            lec.summary || "",
            lec.whatYouWillLearn?.canDo || "",
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
        badge: "経穴辞典",
        url: `/tsubo/${pt.codeLower}`,
        exactCode: pt.code.toLowerCase(),
        exactTerms: [pt.name, pt.kana, ...(pt.aliases || [])],
        tags: [
          pt.name,
          pt.kana,
          pt.code,
          pt.codeLower,
          pt.romaji,
          pt.meridian,
          pt.meridianShort,
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
      list.push({
        id: `symptom-${s.id}`,
        type: "symptom",
        title: s.title,
        subtitle: `${s.category}｜${s.summary.slice(0, 48)}...`,
        badge: "症状別ガイド",
        url: `/symptoms/${s.id}`,
        tags: [
          s.title,
          s.category,
          s.summary,
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
