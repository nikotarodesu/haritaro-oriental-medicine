"use client";

import Script from "next/script";
import { useRef, useState } from "react";

type AdSenseWindow = Window & { adsbygoogle?: object[] };

export default function AdSenseSlot({
  publisherId,
  slotId,
}: {
  publisherId: string;
  slotId: string;
}) {
  const ad = useRef<HTMLModElement>(null);
  const requestedAd = useRef<HTMLModElement | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  function requestAd() {
    if (!ad.current || requestedAd.current === ad.current) return;
    requestedAd.current = ad.current;
    const adWindow = window as AdSenseWindow;

    try {
      (adWindow.adsbygoogle ??= []).push({});
    } catch {
      setUnavailable(true);
    }
  }

  if (unavailable) return null;

  return (
    <aside aria-label="広告" className="my-10 border-t border-[#E8E1D1] pt-8 has-[>ins[data-ad-status=unfilled]]:hidden dark:border-[#22303D]">
      <p className="mb-2 text-center text-xs text-[#59615D] dark:text-[#A0B0BC]">広告</p>
      <ins
        ref={ad}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onReady={requestAd}
        onError={() => setUnavailable(true)}
      />
    </aside>
  );
}
