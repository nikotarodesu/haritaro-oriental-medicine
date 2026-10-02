"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (!ready || !window.gtag || !pathname || previousPath.current === pathname) return;
    const referrer = previousPath.current
      ? window.location.origin + previousPath.current
      : document.referrer.split(/[?#]/)[0];
    previousPath.current = pathname;
    // Query strings may contain search terms or user-entered content.
    window.gtag("event", "page_view", {
      send_to: gaId,
      page_location: window.location.origin + pathname,
      page_referrer: referrer,
      page_path: pathname,
      page_title: document.title,
    });
  }, [ready, pathname, gaId]);

  if (!gaId || !/^G-[A-Z0-9]+$/.test(gaId) || gaId === "G-GC398NZKVE") return null;

  return <>
    <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    <Script id="google-analytics-init" strategy="afterInteractive" onReady={() => setReady(true)}
      dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          send_page_view: false,
          page_location: window.location.origin + window.location.pathname,
          page_referrer: document.referrer.split(/[?#]/)[0]
        });
      ` }} />
  </>;
}
