import { Search } from "lucide-react";

export default function PlatformSearchForm({ query = "" }: { query?: string }) {
  return (
    <form action="/search" method="get" role="search" className="platform-search" aria-label="サイト内検索">
      <label htmlFor="platform-query">ツボ・症状・東洋医学の用語を探す</label>
      <div className="platform-search-controls">
        <Search aria-hidden="true" />
        <input id="platform-query" name="q" type="search" defaultValue={query} placeholder="合谷、肩こり、手の甲" autoComplete="off" maxLength={100} required />
        <button type="submit">検索</button>
      </div>
    </form>
  );
}
