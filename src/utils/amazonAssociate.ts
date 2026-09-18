export const AMAZON_ASSOCIATE_TAG = "haritarotoyo-22";

/**
 * 書籍タイトルや著者から、リンク切れ（404）が絶対に発生しない
 * Amazon和書カテゴリー（stripbooks）検索URLを生成する。
 * 新装版、Kindle電子書籍版、中古本、関連改訂版もすべて網羅されるため、
 * 固定ASINのような「商品ページ消失によるリンク切れ」を完全に防ぎます。
 */
export function buildAmazonAssociateSearchUrl(options: {
  title: string;
  author?: string;
}): string {
  const { title, author } = options;

  // タイトルから検索ノイズとなる記号を除去
  const cleanTitle = title
    .replace(/[『』【】「」［］（）()〜～・:：/／]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // 著者名があれば著者名を付与して検索精度を極大化（例: "小林信明 著" -> "小林信明"）
  const cleanAuthor = author
    ? author.replace(/(著|監修|編|訳|\(著\)|\(編\))/g, "").trim()
    : "";

  const query = cleanAuthor ? `${cleanTitle} ${cleanAuthor}`.trim() : cleanTitle;

  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&i=stripbooks&tag=${AMAZON_ASSOCIATE_TAG}`;
}

/**
 * 書籍情報（ASIN、既存URL、タイトル、著者）から、トラッキングID付きの
 * 安全なAmazonアソシエイトURLを生成するユーティリティ。
 *
 * リンク切れ（404犬ページ）防止のため、タイトルがある場合は確実に目的の書籍
 * （および新装版・電子版・在庫）が表示される和書カテゴリー検索URLを優先的に提供します。
 */
export function buildAmazonAssociateUrl(options: {
  asin?: string;
  url?: string;
  title?: string;
  author?: string;
  preferDirectDp?: boolean;
}): string | undefined {
  const { asin, url, title, author, preferDirectDp } = options;

  // 1. タイトルが存在し、直接DP指定がない場合は安全な検索URLを生成（404リンク切れ防止の最善策）
  if (title && !preferDirectDp) {
    return buildAmazonAssociateSearchUrl({ title, author });
  }

  // 2. 明示的にASIN直通が希望される場合（またはタイトルが無い場合）
  if (asin) {
    const cleanAsin = asin.trim();
    return `https://www.amazon.co.jp/dp/${cleanAsin}?tag=${AMAZON_ASSOCIATE_TAG}`;
  }

  // 3. URLがすでにAmazonのURLである場合（タグを付与・差し替え）
  if (url && (url.includes("amazon.co.jp") || url.includes("amzn.to") || url.includes("amzn.asia"))) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
      return parsed.toString();
    } catch {
      const sep = url.includes("?") ? "&" : "?";
      return `${url}${sep}tag=${AMAZON_ASSOCIATE_TAG}`;
    }
  }

  // 4. フォールバック：タイトルがある場合
  if (title) {
    return buildAmazonAssociateSearchUrl({ title, author });
  }

  return undefined;
}
