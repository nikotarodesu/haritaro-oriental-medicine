import type { SearchCategory } from "./search";
import type { SearchPurpose } from "./searchPurpose";

export const GLOBAL_SEARCH_HISTORY_KEY = "haritaroGlobalSearch";

export interface GlobalSearchHistory {
  location: string;
  query: string;
  category: SearchCategory;
  purpose: SearchPurpose;
}
