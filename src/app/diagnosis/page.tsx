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

  const title = "気血水体質診断・対面問診ツール｜東洋医学の問診・説明・臨床記録";
  const description =
    "気血水12問による体質チェックおよび鍼灸臨床での対面問診補助ツール。回答から状態の傾向を整理し、患者説明用の要約表示や臨床ノートへの連携に対応。五労チェッカーも併載。";
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
  const isClinical = params.tab === "clinical";

  let initialTab: "self" | "clinical" | "gorou" = "self";
  if (isGorou) initialTab = "gorou";
  else if (isClinical) initialTab = "clinical";

  return <DiagnosisClient initialTab={initialTab} />;
}
