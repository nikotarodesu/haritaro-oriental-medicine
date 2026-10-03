import { ARTICLE_LEARNING_GUIDES } from "@/data/articleLearningGuides";
import type { Article } from "@/types/oriental";
import type { ReadingInsert, ReadingLink } from "@/types/reading";

// 本文を変更せず、指定した節の段落の後に学習用の小図を表示する。
// 既存図のない節や、観察と解釈の区別を補う節だけを選ぶ。
export const CURRICULUM_READING_INSERTS: Readonly<Record<string, ReadingInsert[]>> = {
  "lecture-yinyang-2": [
    {
      afterHeading: "1. 比較する対象・基準の重要性",
      afterParagraph: 2,
      figure: {
        id: "yinyang-comparison-reference",
        title: "同じ40℃でも、比べる相手で見方が変わる",
        layout: "compare",
        items: [
          { label: "0℃と比べる", description: "40℃は、より温かい側として陽に整理します。", icon: "balance" },
          { label: "100℃と比べる", description: "40℃は、より冷たい側として陰に整理します。", icon: "balance" },
        ],
        caption: "対象は同じで、比較する基準が違う学習例です。身体の状態を測定する図ではありません。",
      },
    },
  ],
  "lecture-yinyang-4": [
    {
      afterHeading: "2. 陰陽転化（いんようてんか）",
      afterParagraph: 2,
      figure: {
        id: "yinyang-amount-quality",
        title: "量の変化を見る消長と、性質の変化を見る転化",
        layout: "compare",
        items: [
          { label: "消長", description: "増える・減るという、量の変化に注目します。", icon: "balance" },
          { label: "転化", description: "性質が反対へ変わる、という変化に注目します。", icon: "compass" },
        ],
        caption: "伝統的な概念を区別する図です。体温や症状の変化を予測する機構図ではありません。",
      },
    },
  ],
  "lecture-yinyang-7": [
    {
      afterHeading: "4. 観察・解釈・保留を分ける練習",
      afterParagraph: 1,
      figure: {
        id: "yinyang-observation-interpretation",
        title: "記録したこと、解釈したこと、まだ分からないこと",
        layout: "triad",
        items: [
          { label: "観察した事実", description: "顔の熱感と足の冷え、という訴えを記録します。", icon: "eye" },
          { label: "伝統理論の整理", description: "上下・寒熱の違いを比較して考えます。", icon: "book" },
          { label: "未確認の事項", description: "原因や病気の有無には、必要な医学的評価を考えます。", icon: "flask" },
        ],
        caption: "架空の学習例を三つに分けた図です。伝統的な分類や医学的な診断を、この図だけで確定しません。",
      },
    },
  ],
  "lecture-yinyang-8": [
    {
      afterHeading: "1. 分類・関係・変化の整理",
      afterParagraph: 1,
      figure: {
        id: "yinyang-three-viewpoints",
        title: "ひとつの学習例を、三つの視点から見る",
        layout: "triad",
        items: [
          { label: "分類", description: "どの部位・性質を、何と比較しているか。", icon: "balance" },
          { label: "関係", description: "対になる性質を、伝統理論でどう説明するか。", icon: "book" },
          { label: "変化", description: "いつ始まり、時間とともにどう変わったか。", icon: "compass" },
        ],
        caption: "情報を整理するための学習図です。神経やホルモンの状態、病気の原因を判定する図ではありません。",
      },
    },
  ],
};

export function getCurriculumReadingInserts(lectureId: string): ReadingInsert[] {
  return CURRICULUM_READING_INSERTS[lectureId] ?? [];
}

export function getCurriculumRelatedArticleIds(lectureId: string): string[] {
  return Object.entries(ARTICLE_LEARNING_GUIDES)
    .filter(([, guide]) => guide.lectureId === lectureId)
    .slice(0, 2)
    .map(([articleId]) => articleId);
}

// サーバー側で抽出した公開メタデータだけを受け取る。
// Client Componentへ記事本文や参考文献データを追加で持ち込まない。
export function createCurriculumReadingLinks(
  lectureId: string,
  articlePreviews: ReadonlyArray<Pick<Article, "id" | "title" | "readTime">>,
): ReadingLink[] {
  return getCurriculumRelatedArticleIds(lectureId).flatMap((articleId) => {
    const article = articlePreviews.find((candidate) => candidate.id === articleId);
    if (!article) return [];
    return [{
      href: `/articles/${article.id}`,
      title: article.title,
      description: ARTICLE_LEARNING_GUIDES[articleId].focus,
      meta: `記事 · 約${article.readTime}`,
    }];
  });
}
