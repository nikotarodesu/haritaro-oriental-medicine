import { Metadata } from "next";
import DiagnosisClient from "@/components/diagnosis/DiagnosisClient";

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const isGorou =
    params.tab === "gorou" ||
    params.tab === "workstyle" ||
    params.tab === "checker";

  if (isGorou) {
    const title = "五労チェッカー（久視・久臥・久坐・久立・久行）｜東洋医学セルフチェック";
    const description =
      "『素問』宣明五気篇に基づく五労（久視・久臥・久坐・久立・久行）理論から、デスクワークや立ち仕事等の動作偏向と五臓の疲弊を判定。生活養生と経穴アドバイスを提供。";
    const url = "https://www.haritaro.jp/diagnosis?tab=gorou";

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
      },
    };
  }

  const title = "気血水体質診断・五労ワークスタイル診断｜東洋医学セルフチェック";
  const description =
    "簡単な質問に答えるだけで気虚・気滞・血虚・瘀血・陰虚・痰湿の体質傾向をスコアリング。デスクワークや現代の生活習慣に対応した五労チェックと、あなたに最適なツボ・養生法を提案。";
  const url = "https://www.haritaro.jp/diagnosis";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
  };
}

export default async function DiagnosisPage({ searchParams }: Props) {
  const params = await searchParams;
  const isGorou =
    params.tab === "gorou" ||
    params.tab === "workstyle" ||
    params.tab === "checker";

  return <DiagnosisClient initialTab={isGorou ? "gorou" : "self"} />;
}
