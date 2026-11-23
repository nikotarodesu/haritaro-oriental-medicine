import { Search } from "lucide-react";

interface PlatformSearchFormProps {
  query?: string;
  id?: string;
  label?: string;
  placeholder?: string;
}

export default function PlatformSearchForm({
  query = "",
  id = "platform-query",
  label = "ツボ・症状・東洋医学の用語を探す",
  placeholder = "合谷、肩こり、手首のツボ",
}: PlatformSearchFormProps) {
  return (
    <form action="/search" method="get" role="search" className="platform-search" aria-label="サイト内検索">
      <label htmlFor={id}>{label}</label>
      <div className="platform-search-controls">
        <Search aria-hidden="true" />
        <input id={id} name="q" type="search" defaultValue={query} placeholder={placeholder} autoComplete="off" maxLength={100} required />
        <button type="submit">検索</button>
      </div>
    </form>
  );
}
