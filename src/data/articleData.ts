import { Article } from "@/types/oriental";
import { HISTORY_ARTICLE } from "./articles/historyArticle";
import { YINYANG_GOGYO_ARTICLE } from "./articles/yinyangGogyoArticle";
import { KIKETSUSUI_ARTICLE } from "./articles/kiketsusuiArticle";
import { MERIDIAN_ARTICLE } from "./articles/meridianArticle";
import { ACUPOINT_ARTICLE } from "./articles/acupointArticle";
import { PULSE_ARTICLE } from "./articles/pulseArticle";
import { ABDOMEN_ARTICLE } from "./articles/abdomenArticle";
import { TONGUE_ARTICLE } from "./articles/tongueArticle";
import { GERD_ARTICLE } from "./articles/gerdArticle";

// 公開記事配列（東洋医学自然科学講義録・学術論文・経穴経絡学・四診科学・東西統合臨床アーカイブ）
export const ARTICLES: Article[] = [
  HISTORY_ARTICLE,
  YINYANG_GOGYO_ARTICLE,
  KIKETSUSUI_ARTICLE,
  MERIDIAN_ARTICLE,
  ACUPOINT_ARTICLE,
  PULSE_ARTICLE,
  ABDOMEN_ARTICLE,
  TONGUE_ARTICLE,
  GERD_ARTICLE,
];

// 下書きアーカイブ（必要に応じて保存）
export const DRAFT_ARTICLES: Article[] = [];
