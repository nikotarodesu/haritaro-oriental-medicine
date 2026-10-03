import { pageSocialMetadata, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

const title = "東洋医学の図解記事｜陰陽五行・気血津液・経絡・四診";
const description = "陰陽五行、気・血・津液、経絡・経穴、脈診・舌診などを図解で学ぶ12の解説記事。要点から本文、関連講義と確認クイズへ進めます。伝統的な説明と研究知見を区別し、出典と確認範囲を掲載しています。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/articles",
  },
  ...pageSocialMetadata(`${title} | ${SITE_NAME}`, description, "/articles"),
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
