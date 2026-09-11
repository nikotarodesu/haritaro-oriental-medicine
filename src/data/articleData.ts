import { Article } from "@/types/oriental";
import { MERIDIAN_ARTICLE } from "./articles/meridianArticle";
import { ACUPOINT_ARTICLE } from "./articles/acupointArticle";
import { PULSE_ARTICLE } from "./articles/pulseArticle";
import { ABDOMEN_ARTICLE } from "./articles/abdomenArticle";
import { TONGUE_ARTICLE } from "./articles/tongueArticle";
import { GERD_ARTICLE } from "./articles/gerdArticle";

// 公開記事配列（最新の学術論文・文献抄読・経穴経絡学・東西統合臨床アーカイブ）
export const ARTICLES: Article[] = [
  MERIDIAN_ARTICLE,
  ACUPOINT_ARTICLE,
  PULSE_ARTICLE,
  ABDOMEN_ARTICLE,
  TONGUE_ARTICLE,
  GERD_ARTICLE,
];

// 下書きアーカイブ（必要に応じて保存）
export const DRAFT_ARTICLES: Article[] = [];
