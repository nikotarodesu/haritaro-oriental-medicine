"use client";

import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import Link from "next/link";
import type { SubscriptionAvailability } from "@/hooks/useSubscriptionAvailability";

export default function SubscriptionAvailabilityNotice({ status, onRetry }: {
  status: SubscriptionAvailability;
  onRetry: () => void;
}) {
  return <div className="space-y-2 text-sm leading-7">
    <div role="status" aria-live="polite">
      {status === "checking" ? <p>申し込みの受付状況を確認しています。8秒ほどで結果を表示します。</p>
        : status === "error" ? <p>受付状況を確認できませんでした。通信状態を確認して、もう一度お試しください。</p>
          : status === "available" ? <p>料金・利用できる機能を確認してからお申し込みいただけます。</p>
            : <><p className="font-semibold">{SUBSCRIPTION_CONFIG.statusMessages.comingSoonTitle}</p><p className="ui-muted">{SUBSCRIPTION_CONFIG.statusMessages.comingSoonSubtitle}</p></>}
    </div>
    {status === "error" ? <button type="button" onClick={onRetry} className="min-h-11 rounded-lg px-2 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">受付状況を再確認する</button> : null}
    {status === "unavailable" ? <><p>受付再開予定：未定。決まり次第、この料金ページと更新情報でお知らせします。</p><Link href="/contact?topic=premium-reopening" className="ui-text-link">受付再開の連絡を希望する →</Link><p className="text-xs ui-muted">お問い合わせフォームから連絡先をお知らせください。自動登録ではありません。</p></> : null}
    {status === "error" ? <Link href="/contact?topic=premium-support" className="ui-text-link">申込みについて問い合わせる →</Link> : null}
  </div>;
}
