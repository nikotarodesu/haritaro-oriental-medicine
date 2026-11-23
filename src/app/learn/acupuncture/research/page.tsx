import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowDown, ArrowRight, BookOpen, Droplets, HeartPulse, ShieldCheck } from "lucide-react";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import PageIntro from "@/components/design/PageIntro";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH, acupunctureResearchHref } from "@/config/acupunctureLearning";
import { collectionPageJsonLd, pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { ACUPUNCTURE_RESEARCH_ARTICLES, ACUPUNCTURE_RESEARCH_TOPICS } from "@/data/acupunctureResearch";
import styles from "./research.module.css";

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

const topicIcons = {
  "research-pain": Activity,
  "research-treatment": HeartPulse,
  "research-urinary-symptoms": Droplets,
  "research-safety": ShieldCheck,
  "research-patterns": BookOpen,
};

export default function AcupunctureResearchIndexPage() {
  const entries = ACUPUNCTURE_RESEARCH_ARTICLES.map(article => ({
    href: acupunctureResearchHref(article.slug),
    name: article.title,
  }));

  return (
    <div className={`page-layout page-layout--reading ${styles.researchIndex}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: collectionPageJsonLd(href, title, description, "鍼灸の研究解説", entries).replace(/</g, "\\u003c"),
      }} />
      <PageBreadcrumb items={[{ href: "/learn", name: "東洋医学" }, { href: ACUPUNCTURE_GUIDE.href, name: ACUPUNCTURE_GUIDE.label }, { href, name: title }]} />
      <PageIntro title={title} description="症状や安全性から研究を探せます。試験で何を比べたかを読み、原著へのリンクで結果を確かめられます。" art="reading" compact className={styles.hero} />
      <nav aria-labelledby="research-topics-heading" className={styles.topicNavigation}>
        <h2 id="research-topics-heading">研究のテーマ</h2>
        <ul>
          {ACUPUNCTURE_RESEARCH_TOPICS.map(topic => (
            <li key={topic.id}><a href={`#${topic.id}`}>{topic.title}<ArrowDown size={14} aria-hidden="true" /></a></li>
          ))}
        </ul>
      </nav>
      <div className={styles.topicGroups}>
        {ACUPUNCTURE_RESEARCH_TOPICS.map(topic => {
          const Icon = topicIcons[topic.id];
          return (
            <section key={topic.id} id={topic.id} className={styles.topic} aria-labelledby={`${topic.id}-title`}>
              <h2 id={`${topic.id}-title`} className={`page-section-heading ${styles.topicHeading}`}>
                <span className={styles.topicIcon}><Icon size={19} aria-hidden="true" /></span>
                {topic.title}
              </h2>
              <ul className={styles.topicCards}>
                {topic.entries.map(({ article, summary }) => (
                  <li key={article.slug}>
                    <Link href={acupunctureResearchHref(article.slug)} className={`page-link-card ${styles.topicCard}`}>
                      <span>
                        <strong>{article.title}</strong>
                        <span className={styles.topicSummary}>{summary}</span>
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
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
