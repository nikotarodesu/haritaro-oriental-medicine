import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { collectionPageJsonLd, pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { getTraditionalSymptom, TRADITIONAL_SYMPTOMS, TSUBO_SYMPTOM_INDEX_PATH } from "@/data/tsubo/atlas/traditionalSymptomIndex";
import styles from "../symptom-atlas.module.css";

type Props = { params: Promise<{ symptom: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TRADITIONAL_SYMPTOMS.map(({ slug }) => ({ symptom: slug }));
}

async function symptomFromParams(params: Props["params"]) {
  const { symptom: slug } = await params;
  const symptom = getTraditionalSymptom(slug);
  if (!symptom) notFound();
  return symptom;
}

function pageCopy(label: string) {
  const heading = `「${label}」の記載があるツボ`;
  const description = `伝統資料で「${label}」に使われた記載があるツボを、位置と出典つきで一覧できます。`;
  return { heading, description };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { label, href } = await symptomFromParams(params);
  const { heading, description } = pageCopy(label);
  const title = seriesPageTitle(heading, "dictionary");
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: href },
    ...pageSocialMetadata(title, description, href),
  };
}

const urgentSymptoms: Readonly<Partial<Record<string, string>>> = {
  "胸のつかえ": "急に息が苦しくなったり、胸の中央を締め付けるような痛みが2〜3分続いたりするときは、119番に連絡してください。",
  "嘔吐": "血を吐いたときは、119番に連絡してください。",
};

export default async function TsuboSymptomPage({ params }: Props) {
  const { label, href, points } = await symptomFromParams(params);
  const { heading, description } = pageCopy(label);
  const urgent = urgentSymptoms[label];
  const pointLinks = points.map(({ href, name }) => ({ href, name }));
  return (
    <article className={`page-layout atlas-page ${styles.page}`}>
      <PageBreadcrumb items={[
        { href: "/tsubo", name: "ツボ図鑑" },
        { href: TSUBO_SYMPTOM_INDEX_PATH, name: "症状からツボを探す" },
        { href, name: label },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(href, heading, description, heading, pointLinks) }} />
      <header className={styles.heading}>
        <h1>{heading}</h1>
        <p>{points.length}穴を掲載しています。ツボ名を選ぶと、位置図や研究の掲載状況を確認できます。</p>
      </header>
      {urgent && (
        <aside className="atlas-caution-priority" aria-label="受診を急ぐ症状">
          <p>{urgent}</p>
          <a className="atlas-source-link" href="https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html">厚生労働省「こんな時は迷わず119へ」</a>
        </aside>
      )}
      <ul className={styles.results} aria-label="該当するツボ" role="list">
        {points.map(({ code, name, kana, bodyPart, href, source }) => (
          <li key={code} className={styles.result}>
            <Link href={href} prefetch={false} className={styles.point}>
              <span><strong>{name}</strong> <small>{kana}・{code}</small></span><ChevronRight size={17} aria-hidden="true" />
            </Link>
            <p>{bodyPart}</p>
            <a href={source.url} className={`atlas-source-link ${styles.source}`}>{source.label}</a>
          </li>
        ))}
      </ul>
      <nav className={styles.continue} aria-label="関連する検索とガイド">
        <Link href={TSUBO_SYMPTOM_INDEX_PATH} className="atlas-text-action">別の症状から探す</Link>
        <Link href="/symptoms" className="atlas-text-action">受診の目安を調べる</Link>
      </nav>
    </article>
  );
}
