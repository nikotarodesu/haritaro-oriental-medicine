"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import WebVitalsReporter from "@/components/WebVitalsReporter";
import { analyticsReferrer, flushAnalyticsEvents, publicAnalyticsPath, trackLearningPageView } from "@/utils/analytics";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [documentPath] = useState(() => pathname ? publicAnalyticsPath(pathname) : null);
  const previousPath = useRef<string | null>(null);
  // A verified property may reuse a previously configured measurement ID.
  const validId = !!gaId && /^G-[A-Z0-9]+$/.test(gaId) && gaId !== "G-XXXXXXXXXX";
  const safePath = pathname ? publicAnalyticsPath(pathname) : null;

  useEffect(() => {
    if (!validId || !gaId) return;
    (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = !safePath;
    if (!safePath) { previousPath.current = null; return; }
    if (!ready || !window.gtag || previousPath.current === safePath) return;
    const referrer = previousPath.current
      ? window.location.origin + previousPath.current
      : analyticsReferrer(document.referrer, window.location.origin);
    previousPath.current = safePath;
    window.gtag("config", gaId, {
      send_page_view: false,
      page_location: window.location.origin + safePath,
      page_referrer: referrer,
    });
    // Query strings may contain search terms or user-entered content.
    window.gtag("event", "page_view", {
      send_to: gaId,
      page_location: window.location.origin + safePath,
      page_referrer: referrer,
      page_path: safePath,
      page_title: document.title,
    });
    flushAnalyticsEvents();
    trackLearningPageView(safePath);
  }, [ready, safePath, gaId, validId]);

  if (!validId) return null;

  return <>
    {safePath && <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />}
    {safePath && <Script id="google-analytics-init" strategy="afterInteractive" onReady={() => setReady(true)}
      dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          send_page_view: false,
          page_location: window.location.origin + ${JSON.stringify(safePath)},
          page_referrer: '',
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      ` }} />}
    {ready && documentPath && <WebVitalsReporter landingPath={documentPath} />}
  </>;
}
