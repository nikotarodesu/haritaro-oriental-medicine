import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import KikeiQuizSection from "@/components/kikei/KikeiQuizSection";
import { KIKEI_VESSELS } from "@/data/kikeiData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return KIKEI_VESSELS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vessel = KIKEI_VESSELS.find(item => item.slug === slug);
  if (!vessel) notFound();
  return {
    title: vessel.name + "の確認問題",
    alternates: { canonical: "/kikei/" + slug },
    robots: { index: false, follow: true },
  };
}

export default async function KikeiQuizPage({ params }: Props) {
  const { slug } = await params;
  const vessel = KIKEI_VESSELS.find(item => item.slug === slug);
  if (!vessel) notFound();
  const readingHref = "/kikei/" + slug;

  return (
    <div className="page-layout page-layout--reading space-y-6">
      <PageBreadcrumb items={[
        { href: "/kikei", name: "奇経八脈" },
        { href: readingHref, name: vessel.name },
        { href: readingHref + "/quiz", name: "確認問題" },
      ]} hideCurrent />
      <KikeiQuizSection vessel={vessel} standalone />
      <Link href={readingHref + "#kikei-quiz"} className="ui-text-link inline-flex min-h-11 items-center">本文を見ながら解く</Link>
    </div>
  );
}
