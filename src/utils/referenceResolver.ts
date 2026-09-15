import { ReferenceItem, ResolvedReference } from "@/types/references";
import { PAPERS_DATABASE } from "@/data/references/papersData";
import { buildAmazonAssociateUrl } from "./amazonAssociate";

/**
 * IDに基づいて論文データベース（PAPERS_DATABASE）から論文情報を取得し、
 * ReferenceItem 形式に正規化して返す。見つからない場合は null。
 */
export function getPaperReferenceById(id: string): ReferenceItem | null {
  const paper = PAPERS_DATABASE.find((p) => p.id === id);
  if (!paper) return null;

  return {
    id: paper.id,
    type: "paper",
    title: paper.japaneseTitle || paper.title,
    originalTitle: paper.title,
    authors: paper.authors,
    source: paper.journal,
    year: paper.year,
    doi: paper.doi,
    pmid: paper.pmid,
    studyDesign: paper.studyDesign,
    sampleSize: paper.sampleSize,
    url: paper.pmid
      ? `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`
      : (paper.doi ? `https://doi.org/${paper.doi}` : undefined),
    note: paper.clinicalTakeaways?.[0] || paper.keyFindings?.[0],
  };
}

/**
 * 記事データ（Article）の references 配列、および本文中のインライン引用タグから
 * 順序付けされた ResolvedReference[] を生成する。
 */
export function resolveArticleReferences(
  declaredRefs?: (string | ReferenceItem)[],
  markdownContent?: string
): ResolvedReference[] {
  const resolvedList: ResolvedReference[] = [];
  const refMap = new Map<string, ResolvedReference>();

  const addOrGet = (item: ReferenceItem): ResolvedReference => {
    if (refMap.has(item.id)) {
      return refMap.get(item.id)!;
    }
    const index = resolvedList.length + 1;

    // AmazonアソシエイトURLの自動生成・正規化
    let amazonUrl = item.amazonUrl;
    if (
      item.type === "book" ||
      item.asin ||
      (item.url && (item.url.includes("amazon") || item.url.includes("amzn")))
    ) {
      amazonUrl = buildAmazonAssociateUrl({
        asin: item.asin,
        url: item.amazonUrl || item.url,
        title: item.title,
      });
    }

    const resolved: ResolvedReference = {
      ...item,
      amazonUrl,
      index,
      anchorId: `ref-${index}`,
    };
    resolvedList.push(resolved);
    refMap.set(item.id, resolved);
    return resolved;
  };

  // 1. 記事側で明示的に定義された references を登録
  if (declaredRefs && declaredRefs.length > 0) {
    for (const ref of declaredRefs) {
      if (typeof ref === "string") {
        const fromDb = getPaperReferenceById(ref);
        if (fromDb) {
          addOrGet(fromDb);
        } else {
          // DBにない場合は任意の文献IDとして登録
          addOrGet({
            id: ref,
            title: ref,
            source: "文献参照",
          });
        }
      } else if (ref && typeof ref === "object") {
        // オブジェクトで渡された場合、もしDBに一致するIDがあればDB情報で補完
        const fromDb = getPaperReferenceById(ref.id);
        if (fromDb) {
          addOrGet({
            ...fromDb,
            ...ref,
          });
        } else {
          addOrGet(ref);
        }
      }
    }
  }

  // 2. 本文中にインライン記述された [^id] や [ref:id] を抽出して未登録なら登録
  if (markdownContent) {
    // [^some-id] または [ref:some-id] を検索
    const inlineMatches = markdownContent.matchAll(/(?:\[\^([a-zA-Z0-9_-]+)\]|\[ref:([a-zA-Z0-9_-]+)\])/g);
    for (const match of inlineMatches) {
      const id = match[1] || match[2];
      if (id && !refMap.has(id)) {
        // 数値単体の [^1] などは宣言済み配列のインデックス参照の可能性もあるが、
        // 文字列IDの場合はDBを検索
        const fromDb = getPaperReferenceById(id);
        if (fromDb) {
          addOrGet(fromDb);
        }
      }
    }
  }

  return resolvedList;
}
