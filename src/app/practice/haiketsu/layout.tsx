import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import type { Metadata } from "next";
import React from "react";

const description = "基本32穴から経穴を選び、本治・標治の目的や組み合わせの理由を教材例と比べる練習です。個別の施術適応を判断するものではありません。";
const title = seriesPageTitle("配穴演習｜基本の32穴からツボを選び、理由を書く", "practice");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/practice/haiketsu",
  },
  ...pageSocialMetadata(title, description, "/practice/haiketsu"),
};

export default function HaiketsuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
