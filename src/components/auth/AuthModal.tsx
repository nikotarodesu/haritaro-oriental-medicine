"use client";

import { useId, useRef } from "react";
import Link from "next/link";
import { X, Crown } from "lucide-react";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import { useModalDialog } from "@/hooks/useModalDialog";
import { useSubscriptionAvailability } from "@/hooks/useSubscriptionAvailability";
import SubscriptionAvailabilityNotice from "@/components/subscription/SubscriptionAvailabilityNotice";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  featureKey?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  title = "プレミアム会員限定機能です",
  description = "この機能はプレミアム会員向けです。無料で使える範囲は、料金ページで確認できます。",
  featureKey,
}: AuthModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const { status, salesEnabled, retry } = useSubscriptionAvailability(isOpen);
  useModalDialog(isOpen, dialogRef, onClose);
  const feature = SUBSCRIPTION_CONFIG.features.find(item => item.id === featureKey);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} tabIndex={-1}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg space-y-5 overflow-y-auto overscroll-contain rounded-2xl border border-[#D8CFC0] bg-[#FAF8F5] p-6 shadow-xl dark:border-[#384C5E] dark:bg-[#152029]">
        <button type="button" onClick={onClose} aria-label="閉じる" data-modal-autofocus className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-black/5 focus-visible:outline-2 dark:hover:bg-white/10">
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
        <Crown aria-hidden="true" className="h-6 w-6 text-[var(--accent-readable)]" />
        <h2 id={titleId} className="pr-8 text-xl font-bold leading-relaxed">{title}</h2>
        <p id={descriptionId} className="text-sm leading-7 ui-muted">{description}</p>
        {feature ? <p className="text-sm leading-7"><strong>無料で使える範囲：</strong>{feature.free}</p> : null}
        <div className="border-t border-[#D8CFC0] pt-4 dark:border-[#384C5E]">
          <SubscriptionAvailabilityNotice status={status} onRetry={retry} />
        </div>
        <div className="flex flex-col gap-3">
          {salesEnabled ? <Link href="/pricing" onClick={onClose} className="ui-button ui-button-primary justify-center">料金と機能を確認する</Link> : <button type="button" onClick={onClose} className="ui-button ui-button-primary justify-center">無料の範囲で続ける</button>}
          {!salesEnabled ? <Link href="/pricing" onClick={onClose} className="inline-flex min-h-11 items-center justify-center text-sm underline underline-offset-4">無料・プレミアムの違いを見る</Link> : <button type="button" onClick={onClose} className="ui-button justify-center">閉じる</button>}
          <Link href="/auth/login" onClick={onClose} className="inline-flex min-h-11 items-center justify-center text-sm underline underline-offset-4">会員の方はログイン</Link>
        </div>
      </div>
    </div>
  );
}
