import { pageSocialMetadata } from "@/config/seo";
import type { Metadata } from "next";
import React from "react";

const title = "臨床症例演習｜四診・弁証・配穴";
const description = "架空の症例で、鍼灸の臨床推論を練習。主訴・経過・四診の所見を読み、弁証・治法・配穴を考え、解答例で判断の根拠を確認できます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cases" },
  ...pageSocialMetadata(title, description, "/cases"),
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
