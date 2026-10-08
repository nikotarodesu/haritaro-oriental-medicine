import { normalizeSearchText, prepareSearchItem, prepareSearchQuery, scoreSearchItem, searchMatchHint, type SearchableItem, type SearchItemType } from "./search";

export type SearchPurpose = "auto" | "guide" | "research";
export const SEARCH_PURPOSES: ReadonlyArray<{ id: SearchPurpose; label: string }> = [
  { id: "auto", label: "おすすめ順" },
  { id: "guide", label: "学習・症状ガイド" },
  { id: "research", label: "論文・原典" },
];

export interface PurposeSearchItem extends SearchableItem {
  type: SearchItemType;
  searchRole?: "professional-guide";
  reviewStatus?: "source-checked" | "needs-review" | "do-not-use";
}

// These standalone words describe what the reader wants, rather than the condition.
// Keeping the original query when it contains only modifiers also supports "論文".
const RESEARCH_MODIFIERS = new Set([
  "研究", "論文", "文献", "原典", "古典", "エビデンス", "メタ解析", "メタアナリシス",
  "システマティックレビュー", "系統的レビュー", "rct", "research", "study", "trial",
].map(normalizeSearchText));

export function preparePurposeSearchQuery(query: string, requestedPurpose: SearchPurpose = "auto") {
  const originalQuery = prepareSearchQuery(query);
  const hasResearchModifiers = originalQuery.tokens.some(token => RESEARCH_MODIFIERS.has(token));
  const researchFocus = originalQuery.tokens.some(token => token === "古典" || token === "原典") ? "classic" : hasResearchModifiers ? "paper" : "all";
  const topicTokens = originalQuery.tokens.filter(token => !RESEARCH_MODIFIERS.has(token));
  const purpose = requestedPurpose === "auto" ? hasResearchModifiers ? "research" : "guide" : requestedPurpose;
  return {
    purpose,
    researchFocus,
    query: hasResearchModifiers && topicTokens.length ? prepareSearchQuery(topicTokens.join(" ")) : originalQuery,
  };
}

/** Relevance only selects matches; purpose determines the kinds of matching pages shown first. */
export function rankPurposeSearchResults<T extends PurposeSearchItem>(
  indexes: Array<ReturnType<typeof prepareSearchItem<T>>>,
  context: ReturnType<typeof preparePurposeSearchQuery>,
) {
  const matches = indexes
    .filter(index => index.item.reviewStatus !== "do-not-use")
    .map(index => ({ index, item: index.item, score: scoreSearchItem(index, context.query), hint: searchMatchHint(index, context.query) }))
    .filter(result => result.score > 0);

  const isSymptomQuery = matches.some(({ index, item }) =>
    (item.type === "symptom" || item.searchRole === "professional-guide") &&
    context.query.tokens.some(token => token.length >= 2 && index.title.includes(token)),
  );

  function priority({ index, item }: typeof matches[number]) {
    // An explicit point name, reading, alias or code remains a direct lookup in either mode.
    if (item.type === "acupoint" && (index.code === context.query.normalized || index.exactTerms.includes(context.query.normalized))) return 100;
    if (context.purpose === "research") {
      if (item.type === "paper") return item.reviewStatus === "source-checked" ? 90 : 75;
      if (item.type === "classic") return context.researchFocus === "classic" ? 95 : context.researchFocus === "paper" ? 70 : 85;
      return 60;
    }
    if (isSymptomQuery) {
      if (item.type === "symptom") return 95;
      if (item.searchRole === "professional-guide") return 90;
      if (item.type === "acupoint") return 80;
    }
    if (item.type === "paper") return 30;
    if (item.type === "classic") return 40;
    return 60;
  }

  return matches.map(result => ({ ...result, priority: priority(result) }))
    .sort((a, b) => b.priority - a.priority || b.score - a.score)
    .map(({ item, score, hint }) => ({ item, score, hint }));
}
