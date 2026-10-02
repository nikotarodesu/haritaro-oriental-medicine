import { ARTICLE_LEARNING_GUIDES } from "./articleLearningGuides";
import { SITE_REVISED_AT } from "@/config/contentUpdates";
import { Article } from "@/types/oriental";
import { HISTORY_ARTICLE } from "./articles/historyArticle";
import { YINYANG_GOGYO_ARTICLE } from "./articles/yinyangGogyoArticle";
import { KIKETSUSUI_ARTICLE } from "./articles/kiketsusuiArticle";
import { MERIDIAN_ARTICLE } from "./articles/meridianArticle";
import { ACUPOINT_ARTICLE } from "./articles/acupointArticle";
import { PULSE_ARTICLE } from "./articles/pulseArticle";
import { ABDOMEN_ARTICLE } from "./articles/abdomenArticle";
import { TONGUE_ARTICLE } from "./articles/tongueArticle";
import { ACUPUNCTURE_ARTICLE } from "./articles/acupunctureArticle";
import { KAMPO_ARTICLE } from "./articles/kampoArticle";
import { UNIFIED_THEORY_ARTICLE } from "./articles/unifiedTheoryArticle";
import { GERD_ARTICLE } from "./articles/gerdArticle";

// 公開記事配列（東洋医学自然科学講義録・学術論文・経穴経絡学・四診科学・東西統合臨床・人体統一理論アーカイブ）
const SOURCE_ARTICLES: Article[] = [
  HISTORY_ARTICLE,
  YINYANG_GOGYO_ARTICLE,
  KIKETSUSUI_ARTICLE,
  MERIDIAN_ARTICLE,
  ACUPOINT_ARTICLE,
  PULSE_ARTICLE,
  ABDOMEN_ARTICLE,
  TONGUE_ARTICLE,
  ACUPUNCTURE_ARTICLE,
  KAMPO_ARTICLE,
  UNIFIED_THEORY_ARTICLE,
  GERD_ARTICLE,
];

export const ARTICLES: Article[] = SOURCE_ARTICLES.map(article => ({
  ...article, summary: ARTICLE_LEARNING_GUIDES[article.id]?.summary || article.summary, updatedAt: SITE_REVISED_AT,
  keyPoints: ARTICLE_LEARNING_GUIDES[article.id] ? [ARTICLE_LEARNING_GUIDES[article.id].focus, ARTICLE_LEARNING_GUIDES[article.id].limitation] : article.keyPoints,
}));

export type ArticlePreview = Pick<Article, "id" | "title" | "summary" | "category" | "readTime">;

// ページ側で抽出し、操作画面には紹介に必要な情報だけを渡す。
export function getArticlePreviews(articleIds: readonly string[]): ArticlePreview[] {
  return articleIds.flatMap(id => {
    const article = ARTICLES.find(candidate => candidate.id === id);
    if (!article) return [];
    const { title, summary, category, readTime } = article;
    return [{ id, title, summary, category, readTime }];
  });
}

// 下書きアーカイブ（必要に応じて保存）
export const DRAFT_ARTICLES: Article[] = [];
