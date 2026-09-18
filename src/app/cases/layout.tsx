import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "臨床症例演習モード｜四診合参から弁証・治法・処方配穴を導く臨床推論トレーニング",
  description:
    "主訴・現病歴から四診情報（望聞問切）を段階的に開示し、八綱・気血水・臓腑証から治法と配穴処方を導く本格的症例演習。無料体験3例を含む全20症例対応。",
  alternates: {
    canonical: "/cases",
  },
  openGraph: {
    title: "臨床症例演習モード｜四診合参から弁証・治法・処方配穴を導く臨床推論トレーニング",
    description: "四診情報から八綱・臓腑弁証・治法・配穴を導く臨床推論トレーニング。全20症例。",
    url: "https://www.haritaro.jp/cases",
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
