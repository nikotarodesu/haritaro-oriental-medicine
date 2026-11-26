import Link from "next/link";

interface Props {
  className?: string;
  pointLocationChecked?: boolean;
  revisedAt?: string;
}

export default function AuthorSupervisorCard({ className = "", pointLocationChecked, revisedAt }: Props) {
  return (
    <aside aria-label="執筆者と出典の確認状況" className={`space-y-2 border-t border-divider pt-4 text-sm leading-relaxed text-muted ${className}`}>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <span>執筆　<Link href="/about#about-operator" className="ui-text-link font-semibold">はり太郎</Link>（はり師・きゅう師）</span>
        {revisedAt && <span>更新日 <time dateTime={revisedAt}>{revisedAt}</time></span>}
      </div>
      <p>{pointLocationChecked && "ツボの標準位置をWHOの資料と照合しています。"}専門家による監修は完了していません。 <Link href="/editorial-policy" className="ui-text-link">出典の確認方針</Link></p>
      <p>症状の原因や、施術を受けられるかどうかは、医療機関などで相談してください。</p>
    </aside>
  );
}
