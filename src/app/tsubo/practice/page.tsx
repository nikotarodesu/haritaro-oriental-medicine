import { pageSocialMetadata } from "@/config/seo";
import type { Metadata } from "next";
import PracticeClient from "./PracticeClient";

const title = "経穴学習・今日の復習｜間隔反復と14経脈小単位クイズ";
const description = "361経穴の部位・経脈・要穴をクイズで確認。14経脈の小単位演習、回答履歴に応じた間隔復習、中断した回答の端末保存と再開に対応しています。";

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
        <h1>経穴学習・今日の復習｜間隔反復と14経脈小単位クイズ</h1>
        <p>
          十四経脈・361穴の場所、要穴区分、主治を間隔反復で暗記する学習演習モード。今日の復習問題、経脈別5問テスト、保存した経穴の集中演習を行えます。
        </p>
      </div>
      <PracticeClient />
    </div>
  );
}
