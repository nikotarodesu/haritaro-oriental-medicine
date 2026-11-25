import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import type { Metadata } from "next";
import PracticeClient from "./PracticeClient";

const title = seriesPageTitle("ツボの復習｜経絡別5問クイズ", "dictionary");
const description = "今日の復習問題を解くか、経絡を選んで5問のクイズを始めます。保存したツボだけでも練習できます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tsubo/practice",
  },
  ...pageSocialMetadata(title, description, "/tsubo/practice"),
};

export default function PracticePage() {
  return (
    <div className="min-h-screen">
      {/* 検索エンジン・アクセシビリティ用 静的SSRヘッダー */}
      <div className="sr-only">
        <h1>ツボの復習</h1>
        <p>{description}</p>
      </div>
      <PracticeClient />
    </div>
  );
}
