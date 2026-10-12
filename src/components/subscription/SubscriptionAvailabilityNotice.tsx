"use client";

import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import type { SubscriptionAvailability } from "@/hooks/useSubscriptionAvailability";

export default function SubscriptionAvailabilityNotice({ status, onRetry }: {
  status: SubscriptionAvailability;
  onRetry: () => void;
}) {
  return <div className="space-y-2 text-sm leading-7">
    <div role="status" aria-live="polite">
      {status === "checking" ? <p>申し込みの受付状況を確認しています。</p>
        : status === "error" ? <p>受付状況を確認できませんでした。通信状態を確認して、もう一度お試しください。</p>
          : status === "available" ? <p>料金・利用できる機能を確認してからお申し込みいただけます。</p>
            : <><p className="font-semibold">{SUBSCRIPTION_CONFIG.statusMessages.comingSoonTitle}</p><p className="ui-muted">{SUBSCRIPTION_CONFIG.statusMessages.comingSoonSubtitle}</p></>}
    </div>
    {status === "error" ? <button type="button" onClick={onRetry} className="min-h-11 rounded-lg px-2 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">受付状況を再確認する</button> : null}
  </div>;
}
