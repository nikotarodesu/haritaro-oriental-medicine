import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { KIKEI_VESSELS } from "@/data/kikeiData";
import KikeiDetailClient from "@/components/kikei/KikeiDetailClient";

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

  return {
    title: `${vessel.name}（${vessel.reading}）の流注・八脈交会穴・主治`,
    description: `${vessel.name}の流注経路、八脈交会穴（${vessel.masterPoint.name}×${vessel.couplePoint.name}）、主治病証、古典（難経・素問）の条文解説。`,
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
