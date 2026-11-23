import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import PageIntro from "@/components/design/PageIntro";
import ReadingContents from "@/components/reading/ReadingContents";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH, acupunctureResearchHref } from "@/config/acupunctureLearning";
import { pageSocialMetadata, seriesPageTitle, SITE_ORIGIN } from "@/config/seo";
import { ACUPUNCTURE_RESEARCH_ARTICLES } from "@/data/acupunctureResearch";
import type { AcupunctureResearchArticle } from "@/data/acupunctureResearch/types";
import styles from "../research.module.css";

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

function ResearchComparison({ comparison, sources }: {
  comparison: NonNullable<AcupunctureResearchArticle["comparison"]>;
  sources: AcupunctureResearchArticle["sources"];
}) {
  return (
    <figure id="study-comparison" className={styles.comparison}>
      <table aria-describedby="study-comparison-note">
        <caption>{comparison.caption}</caption>
        <thead>
          <tr><th scope="col">対象</th><th scope="col">測ったもの</th><th scope="col">評価時点</th></tr>
        </thead>
        <tbody>
          {comparison.rows.map(row => (
            <tr key={row.sectionId}>
              <th scope="row">
                <a href={`#${row.sectionId}`} className="ui-text-link">{row.participants}</a>
              </th>
              <td>{row.measure}</td>
              <td>{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption>
        <p id="study-comparison-note">{comparison.note}</p>
        <ul className={styles.sourceLinks} aria-label="表の出典">
          {sources.filter(source => comparison.rows.some(row => row.sourceId === source.id)).map(source => (
            <li key={source.id}><a href={`#source-${source.id}`} className="ui-text-link">{source.label}</a></li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
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
  const headings = [
    ...(article.comparison ? [{ id: "study-comparison", label: article.comparison.caption }] : []),
    ...article.sections.map(section => ({ id: section.id, label: section.title })),
    { id: "sources", label: "出典と確認した範囲" },
  ];
  const titleDivider = article.title.indexOf("｜");
  const displayTitle = titleDivider < 0 ? article.title : (
    <>
      {article.title.slice(0, titleDivider)}
      <span className={styles.subtitle}><span className="sr-only">｜</span>{article.title.slice(titleDivider + 1)}</span>
    </>
  );

  return (
    <article className={`page-layout ${styles.article}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className={styles.articleHeader}>
        <PageBreadcrumb hideCurrent items={[
          { href: "/learn", name: "東洋医学" },
          { href: ACUPUNCTURE_GUIDE.href, name: ACUPUNCTURE_GUIDE.label },
          { href: ACUPUNCTURE_RESEARCH.href, name: ACUPUNCTURE_RESEARCH.title },
          { href: path, name: article.title },
        ]} />
        <PageIntro title={displayTitle} description={<p>{article.description}</p>} compact />
      </div>
      <div className={styles.articleLayout}>
        <div className={styles.mobileContents}><ReadingContents label="記事の目次" headings={headings} /></div>
        <nav aria-labelledby="research-contents-title" className={styles.desktopContents}>
          <h2 id="research-contents-title">目次</h2>
          <ul>
            {headings.map(heading => (
              <li key={heading.id}><a href={`#${heading.id}`}>{heading.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className={styles.articleBody}>
          {article.comparison && <ResearchComparison comparison={article.comparison} sources={article.sources} />}
          {article.sections.map(section => (
            <section key={section.id} id={section.id} className={styles.studySection} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.exercise && (
                <div className={styles.exercise}>
                  <p>{section.exercise.question}</p>
                  <details className="atlas-disclosure">
                    <summary>考え方の例を読む</summary>
                    <p>{section.exercise.answer}</p>
                  </details>
                </div>
              )}
              {section.sources.length > 0 && (
                <ul className={styles.sourceLinks} aria-label="この節の出典">
                  {article.sources.filter(source => section.sources.includes(source.id)).map(source => (
                    <li key={source.id}><a href={`#source-${source.id}`} className="ui-text-link">{source.label}</a></li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <section id="sources" className={styles.studySection} aria-labelledby="research-sources-title">
            <h2 id="research-sources-title">出典と確認した範囲</h2>
            <ul className={styles.sources}>
              {article.sources.map(source => (
                <li id={`source-${source.id}`} key={source.id}>
                  <a href={source.url} className="ui-text-link break-words" data-analytics-action="topic_source">{source.label}</a>
                  <p className="page-muted">{source.scope}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.studySection} aria-labelledby="research-related-title">
            <h2 id="research-related-title">あわせて読む</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {article.related.map(link => (
                <li key={link.href}><Link href={link.href} className="page-secondary-action">{link.label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></li>
              ))}
            </ul>
          </section>
          <AuthorSupervisorCard revisedAt={ACUPUNCTURE_RESEARCH.revisedAt} />
        </div>
      </div>
    </article>
  );
}
