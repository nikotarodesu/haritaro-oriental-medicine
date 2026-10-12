"use client";

import { useCallback, useEffect, useState } from "react";
import { isSubscriptionSalesEnabled } from "@/config/subscription";

export type SubscriptionAvailability = "checking" | "available" | "unavailable" | "error";
let pending: Promise<Exclude<SubscriptionAvailability, "checking">> | null = null;

/** Share only an in-flight public request; recheck on the next visit. */
function checkAvailability() {
  if (!pending) {
    pending = fetch("/api/stripe/availability", { cache: "no-store" })
      .then(response => {
        if (!response.ok) throw new Error("Availability request failed");
        return response.json();
      })
      .then((data): Exclude<SubscriptionAvailability, "checking"> => {
        if (data?.available === true) return "available";
        if (data?.available === false) return "unavailable";
        return "error";
      })
      .catch(() => "error" as const)
      .finally(() => { pending = null; });
  }
  return pending;
}

export function useSubscriptionAvailability(active = true) {
  const enabled = isSubscriptionSalesEnabled();
  const [status, setStatus] = useState<SubscriptionAvailability>(enabled ? "checking" : "unavailable");
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => {
    if (!active || !enabled) return;
    setStatus("checking");
    setAttempt(value => value + 1);
  }, [active, enabled]);
  useEffect(() => {
    if (!active || !enabled) return;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setStatus("checking");
      return checkAvailability();
    }).then(result => {
      if (!cancelled && result) setStatus(result);
    });
    return () => { cancelled = true; };
  }, [active, enabled, attempt]);
  return { status, salesEnabled: enabled && status === "available", retry };
}
