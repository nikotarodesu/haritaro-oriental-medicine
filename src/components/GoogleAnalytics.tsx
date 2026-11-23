"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import WebVitalsReporter from "@/components/WebVitalsReporter";
import { analyticsDocumentPath, analyticsReferrer, flushAnalyticsEvents, setAnalyticsDisabled, trackLearningPageView, trackPublicNavigationAction } from "@/utils/analytics";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);
  const safePath = pathname ? analyticsDocumentPath(pathname, Boolean(searchParams?.size)) : null;
  const [documentPath] = useState(safePath);
  const previousPath = useRef<string | null>(null);
  // A verified property may reuse a previously configured measurement ID.
  const validId = !!gaId && /^G-[A-Z0-9]+$/.test(gaId) && gaId !== "G-XXXXXXXXXX";

  useEffect(() => {
    if (!validId || !safePath) return;
    function handleNavigationClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || !(event.target instanceof Element)) return;
      const action = event.target.closest("a[data-analytics-action]")?.getAttribute("data-analytics-action");
      trackPublicNavigationAction(action);
    }
    function handleSearchSubmit(event: SubmitEvent) {
      if (event.defaultPrevented || !(event.target instanceof HTMLFormElement)) return;
      trackPublicNavigationAction(event.target.getAttribute("data-analytics-action"));
    }
    document.addEventListener("click", handleNavigationClick, true);
    document.addEventListener("submit", handleSearchSubmit, true);
    return () => {
      document.removeEventListener("click", handleNavigationClick, true);
      document.removeEventListener("submit", handleSearchSubmit, true);
    };
  }, [validId, safePath]);

  useEffect(() => {
    if (!validId || !gaId) return;
    setAnalyticsDisabled(!safePath);
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
    {/* Initialize privacy controls before loading the externally configured tag. */}
    {safePath && ready && <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />}
    {safePath && <Script id="google-analytics-init" strategy="afterInteractive" onReady={() => setReady(true)}
      dangerouslySetInnerHTML={{ __html: `
        // This linked destination emitted automatic, unsanitized private-route URLs.
        // Only the owner's confirmed stream is used by this site.
        window['ga-disable-G-GE4JNB164V'] = true;
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
