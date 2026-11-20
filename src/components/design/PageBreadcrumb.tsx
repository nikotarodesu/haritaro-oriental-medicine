import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_ORIGIN } from "@/config/seo";

interface TrailItem {
  href: string;
  name: string;
}

export default function PageBreadcrumb({ items, hideCurrent = false }: { items: readonly TrailItem[]; hideCurrent?: boolean }) {
  const trail = [{ href: "/", name: "ホーム" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ href, name }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(href, SITE_ORIGIN).href,
    })),
  };

  return (
    <nav aria-label="パンくず" className="page-breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ol role="list">
        {trail.map(({ href, name }, index) => (
          <li key={href} className={hideCurrent && index === trail.length - 1 ? "sr-only" : undefined}>
            {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {index === trail.length - 1 ? <span aria-current="page">{name}</span> : <Link href={href}>{name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
