"use client";

import { useCallback, useRef } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { trackWebVital } from "@/utils/analytics";

type WebVital = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

export default function WebVitalsReporter({ landingPath }: { landingPath: string }) {
  // These metrics describe a document load, not a client-side route transition.
  const documentPath = useRef(landingPath);
  const reported = useRef(new Set<string>());
  const report = useCallback((metric: WebVital) => {
    const key = `${metric.id}:${metric.name}:${metric.value}`;
    if (reported.current.has(key)) return;
    reported.current.add(key);
    if (reported.current.size > 30) reported.current.delete(reported.current.values().next().value!);
    trackWebVital(metric, documentPath.current);
  }, []);
  useReportWebVitals(report);
  return null;
}
