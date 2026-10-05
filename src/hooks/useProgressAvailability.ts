"use client";
import { useEffect, useState } from "react";

/** A delayed account/history response must not leave a navigation card loading forever. */
export function useProgressAvailability(ready: boolean, storageUnavailable: boolean) {
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(() => setTimedOut(true), 6000);
    return () => clearTimeout(timer);
  }, [ready]);
  return storageUnavailable || (!ready && timedOut) ? "unavailable" : ready ? "ready" : "loading";
}
