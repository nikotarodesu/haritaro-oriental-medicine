import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import PageIntro from "@/components/design/PageIntro";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH, acupunctureResearchHref } from "@/config/acupunctureLearning";
import { collectionPageJsonLd, pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { ACUPUNCTURE_RESEARCH_ARTICLES } from "@/data/acupunctureResearch";

const { href, title, description } = ACUPUNCTURE_RESEARCH;
const pageTitle = seriesPageTitle(title, "reading");

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: { canonical: href },
  ...pageSocialMetadata(pageTitle, description, href),
};

const guideStudies = [
  { href: "/symptoms/headache-stiff-neck#guide-studies", label: "頭痛と首の痛みの研究" },
  { href: "/symptoms/dizziness-tinnitus#guide-studies", label: "耳鳴りの研究" },
  { href: "/symptoms/knee-joint-pain#guide-studies", label: "膝の痛みの研究" },
];

export default function AcupunctureResearchIndexPage() {
  const entries = ACUPUNCTURE_RESEARCH_ARTICLES.map(article => ({
    href: acupunctureResearchHref(article.slug),
    name: article.title,
  }));

  return (
    <div className="page-layout page-layout--reading space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: collectionPageJsonLd(href, title, description, "鍼灸の研究解説", entries).replace(/</g, "\\u003c"),
      }} />
      <PageBreadcrumb items={[{ href: "/learn", name: "東洋医学" }, { href: ACUPUNCTURE_GUIDE.href, name: ACUPUNCTURE_GUIDE.label }, { href, name: title }]} />
      <PageIntro title={title} description={<p>{description}</p>} art="reading" compact />
      <ul className="grid gap-3" aria-label="研究解説">
        {ACUPUNCTURE_RESEARCH_ARTICLES.map(article => (
          <li key={article.slug}>
            <Link href={acupunctureResearchHref(article.slug)} className="page-link-card">
              <span>
                <strong>{article.title}</strong>
                <span className="mt-1 block leading-relaxed page-muted">{article.description}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <section className="page-section border-t border-divider pt-5" aria-labelledby="guide-research-title">
        <h2 id="guide-research-title" className="page-section-heading">症状ガイドに掲載している研究</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {guideStudies.map(guide => (
            <li key={guide.href}><Link href={guide.href} className="page-secondary-action">{guide.label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
