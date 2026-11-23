import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import PageIntro from "@/components/design/PageIntro";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH, acupunctureResearchHref } from "@/config/acupunctureLearning";
import { pageSocialMetadata, seriesPageTitle, SITE_ORIGIN } from "@/config/seo";
import { ACUPUNCTURE_RESEARCH_ARTICLES } from "@/data/acupunctureResearch";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return ACUPUNCTURE_RESEARCH_ARTICLES.map(({ slug }) => ({ slug }));
}

async function getArticle(params: Props["params"]) {
  const { slug } = await params;
  const article = ACUPUNCTURE_RESEARCH_ARTICLES.find(item => item.slug === slug);
  if (!article) notFound();
  return article;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params);
  const path = acupunctureResearchHref(article.slug);
  const title = seriesPageTitle(article.title, "reading");
  const social = pageSocialMetadata(title, article.description, path);
  return {
    title,
    description: article.description,
    alternates: { canonical: path },
    ...social,
    openGraph: { ...social.openGraph, type: "article", modifiedTime: ACUPUNCTURE_RESEARCH.revisedAt },
  };
}

export default async function AcupunctureResearchPage({ params }: Props) {
  const article = await getArticle(params);
  const path = acupunctureResearchHref(article.slug);
  const url = SITE_ORIGIN + path;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "LearningResource"],
    "@id": url + "#webpage",
    url,
    name: article.title,
    description: article.description,
    inLanguage: "ja",
    learningResourceType: "鍼灸の研究解説",
    datePublished: ACUPUNCTURE_RESEARCH.revisedAt,
    dateModified: ACUPUNCTURE_RESEARCH.revisedAt,
    isPartOf: { "@id": SITE_ORIGIN + ACUPUNCTURE_RESEARCH.href },
    citation: article.sources.map(source => source.url),
  };

  return (
    <article className="page-layout page-layout--reading space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageBreadcrumb hideCurrent items={[
        { href: "/learn", name: "東洋医学" },
        { href: ACUPUNCTURE_GUIDE.href, name: ACUPUNCTURE_GUIDE.label },
        { href: ACUPUNCTURE_RESEARCH.href, name: ACUPUNCTURE_RESEARCH.title },
        { href: path, name: article.title },
      ]} />
      <PageIntro title={article.title} description={<p>{article.description}</p>} art="reading" compact />
      <nav aria-label="記事の目次" className="page-help">
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {article.sections.map(section => (
            <li key={section.id}><a href={`#${section.id}`} className="ui-text-link inline-block py-1">{section.title}</a></li>
          ))}
          <li><a href="#sources" className="ui-text-link inline-block py-1">出典と確認した範囲</a></li>
        </ul>
      </nav>
      {article.sections.map(section => (
        <section key={section.id} id={section.id} className="page-section space-y-3 border-t border-divider pt-5" aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`} className="page-section-heading">{section.title}</h2>
          {section.paragraphs.map(paragraph => <p className="leading-relaxed" key={paragraph}>{paragraph}</p>)}
          {section.exercise && (
            <div className="page-help space-y-2">
              <p className="font-semibold">{section.exercise.question}</p>
              <details className="atlas-disclosure">
                <summary>考え方の例を読む</summary>
                <p className="leading-relaxed">{section.exercise.answer}</p>
              </details>
            </div>
          )}
          {section.sources.length > 0 &&
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm" aria-label="この節の出典">
            {article.sources.filter(source => section.sources.includes(source.id)).map(source => (
              <li key={source.id}><a href={`#source-${source.id}`} className="ui-text-link inline-block py-1">{source.label}</a></li>
            ))}
          </ul>}
        </section>
      ))}
      <section id="sources" className="page-section border-t border-divider pt-5" aria-labelledby="research-sources-title">
        <h2 id="research-sources-title" className="page-section-heading">出典と確認した範囲</h2>
        <ul className="space-y-4">
          {article.sources.map(source => (
            <li id={`source-${source.id}`} className="atlas-target space-y-1" key={source.id}>
              <a href={source.url} className="ui-text-link break-words">{source.label}</a>
              <p className="text-sm leading-relaxed page-muted">{source.scope}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="page-section border-t border-divider pt-5" aria-labelledby="research-related-title">
        <h2 id="research-related-title" className="page-section-heading">あわせて読む</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {article.related.map(link => (
            <li key={link.href}><Link href={link.href} className="page-secondary-action">{link.label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></li>
          ))}
        </ul>
      </section>
      <AuthorSupervisorCard revisedAt={ACUPUNCTURE_RESEARCH.revisedAt} />
    </article>
  );
}
