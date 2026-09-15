export const AMAZON_ASSOCIATE_TAG = "haritarotoyo-22";

/**
 * 書籍情報（ASIN、既存URL、タイトル）から、トラッキングID付きの
 * 安全なAmazonアソシエイトURLを生成するユーティリティ。
 */
export function buildAmazonAssociateUrl(options: {
  asin?: string;
  url?: string;
  title?: string;
}): string | undefined {
  const { asin, url, title } = options;

  // 1. ASINコードが指定されている場合（最優先・個別商品直通）
  if (asin) {
    const cleanAsin = asin.trim();
    return `https://www.amazon.co.jp/dp/${cleanAsin}?tag=${AMAZON_ASSOCIATE_TAG}`;
  }

  // 2. URLがすでにAmazonのURLである場合（タグを付与・差し替え）
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

  // 3. タイトルからAmazon和書カテゴリー（stripbooks）の検索リンクを自動生成
  if (title) {
    const cleanTitle = title
      .replace(/『|』|【|】|〜|～/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return `https://www.amazon.co.jp/s?k=${encodeURIComponent(cleanTitle)}&i=stripbooks&tag=${AMAZON_ASSOCIATE_TAG}`;
  }

  return undefined;
}
