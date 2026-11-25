import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { KIKEI_VESSELS } from "@/data/kikeiData";
import KikeiDetailClient from "@/components/kikei/KikeiDetailClient";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return KIKEI_VESSELS.map((vessel) => ({
    slug: vessel.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vessel = KIKEI_VESSELS.find((v) => v.slug === slug);

  if (!vessel) {
    return {
      title: "奇経八脈が見つかりません",
    };
  }

  const title = seriesPageTitle(`${vessel.name}（${vessel.reading}）の流注図・交会穴・古典の記述`, "reading");
  const description = `${vessel.name}が通るとされる経路を図で確認します。八脈交会穴（${vessel.masterPoint.name}と${vessel.couplePoint.name}）と『${vessel.classicQuote.book}』の記述も読めます。`;

  return {
    title,
    description,
    ...pageSocialMetadata(title, description, `/kikei/${vessel.slug}`),
  };
}

export default async function KikeiDetailPage({ params }: Props) {
  const { slug } = await params;
  const vessel = KIKEI_VESSELS.find((v) => v.slug === slug);

  if (!vessel) {
    notFound();
  }

  return <KikeiDetailClient vessel={vessel} />;
}
