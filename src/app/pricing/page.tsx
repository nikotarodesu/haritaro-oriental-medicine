import { notFound } from "next/navigation";

// プレミアムプラン料金ページは現在準備中のため非表示（404 Not Found）
export default function PricingPage() {
  notFound();
}
