import type { PurposeSearchItem } from "@/utils/searchPurpose";

/** Only public labels, excerpts and lookup terms belong in the browser search index. */
export interface SearchResultItem extends PurposeSearchItem {
  id: string;
  title: string;
  subtitle?: string;
  badge: string;
  url: string;
}
