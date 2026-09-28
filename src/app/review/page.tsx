import { redirect } from "next/navigation";

/**
 * スマート復習機能は、国家試験対策特設ハブ（/kokushi）の
 * 「忘却曲線デイリー復習」および「間違えた問題ストック」へ統合されました。
 */
export default function SmartReviewRedirectPage() {
  redirect("/kokushi");
}
