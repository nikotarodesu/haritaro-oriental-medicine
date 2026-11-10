"use client";

import { useCallback, useEffect, useState } from "react";
import { isSubscriptionSalesEnabled } from "@/config/subscription";

export type SubscriptionAvailability = "checking" | "available" | "unavailable" | "error";
let pending: Promise<Exclude<SubscriptionAvailability, "checking">> | null = null;

/** Share only an in-flight public request; recheck on the next visit. */
function checkAvailability() {
  if (!pending) {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => { controller.abort(); reject(new Error('Availability timed out')); }, 8000);
    });
    pending = Promise.race([fetch("/api/stripe/availability", { cache: "no-store", signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Availability request failed");
        return response.json();
      })
      .then((data): Exclude<SubscriptionAvailability, "checking"> => {
        if (data?.available === true) return "available";
        if (data?.available === false) return "unavailable";
        return "error";
      }), timeout])
      .catch(() => "error" as const)
      .finally(() => { clearTimeout(timer); pending = null; });
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
