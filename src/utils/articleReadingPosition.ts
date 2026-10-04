export interface ArticleReadingMetadata {
  articleId: string;
  revision: string;
  headingIds: readonly string[];
}

export interface ArticleReadingPosition {
  version: 1;
  articleId: string;
  revision: string;
  headingId: string;
  progress: number;
  updatedAt: string;
}

const PREFIX = 'settings:article-reading:';
const ARTICLE_ID = /^[a-z0-9-]{1,80}$/;
const HEADING_ID = /^article-heading-\d{1,5}$/;

/** Compute on the server; only the short revision and public heading IDs enter client props. */
export function articleReadingRevision(content: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < content.length; index++) hash = Math.imul(hash ^ content.charCodeAt(index), 0x01000193);
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function articleReadingKey(articleId: string): string {
  if (!ARTICLE_ID.test(articleId)) throw new Error('記事の識別子を確認できませんでした。');
  return PREFIX + articleId;
}

export function validArticleReadingPosition(value: unknown, metadata: ArticleReadingMetadata): value is ArticleReadingPosition {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const position = value as Partial<ArticleReadingPosition>;
  return ARTICLE_ID.test(metadata.articleId) && position.version === 1 && position.articleId === metadata.articleId
    && /^[a-f\d]{8}$/.test(metadata.revision) && position.revision === metadata.revision
    && typeof position.headingId === 'string' && HEADING_ID.test(position.headingId) && metadata.headingIds.includes(position.headingId)
    && typeof position.progress === 'number' && Number.isInteger(position.progress) && position.progress >= 1 && position.progress <= 100
    && typeof position.updatedAt === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(position.updatedAt)
    && Number.isFinite(Date.parse(position.updatedAt)) && new Date(position.updatedAt).toISOString() === position.updatedAt;
}

export function createArticleReadingPosition(metadata: ArticleReadingMetadata, headingId: string, progress: number, updatedAt: string): ArticleReadingPosition {
  const position: ArticleReadingPosition = { version: 1, articleId: metadata.articleId, revision: metadata.revision, headingId, progress: Math.max(1, Math.min(100, Math.round(progress))), updatedAt };
  if (!validArticleReadingPosition(position, metadata)) throw new Error('記事の閲覧位置を確認できませんでした。');
  return position;
}

export function readArticleReadingPosition(values: Record<string, unknown>, metadata: ArticleReadingMetadata): ArticleReadingPosition | null {
  if (!ARTICLE_ID.test(metadata.articleId)) return null;
  const value = values[articleReadingKey(metadata.articleId)];
  return validArticleReadingPosition(value, metadata) ? value : null;
}

export function readArticleReadingPositions(values: Record<string, unknown>, catalog: readonly ArticleReadingMetadata[]): ArticleReadingPosition[] {
  return catalog.flatMap(metadata => { const position = readArticleReadingPosition(values, metadata); return position ? [position] : []; })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function articleReadingResumeHref(position: ArticleReadingPosition, metadata: ArticleReadingMetadata): string {
  articleReadingKey(metadata.articleId);
  return `/articles/${metadata.articleId}${validArticleReadingPosition(position, metadata) ? `#${position.headingId}` : ''}`;
}
