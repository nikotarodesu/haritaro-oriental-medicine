"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { setAnalyticsDisabled } from "@/utils/analytics";
import { ATLAS_RETURN_STORAGE_KEY, isAtlasReturnPath, readAtlasReturnPosition, type AtlasReturnPosition } from "@/utils/atlasReturnPosition";
import { getAtlasDictionaryReturn, requestAtlasDictionaryRestore } from "@/utils/atlasDictionaryPosition";

type LinkNavigation = { preventDefault(): void };

function navigateToDictionary(router: ReturnType<typeof useRouter>, event: LinkNavigation) {
  const position = getAtlasDictionaryReturn(window);
  if (!position) return;

  event.preventDefault();
  requestAtlasDictionaryRestore(position);
  if (position.href.startsWith("/tsubo?")) setAnalyticsDisabled(true);
  router.push(position.href, { scroll: false });
}

export function useAtlasDictionaryReturn() {
  const router = useRouter();
  return (event: LinkNavigation) => navigateToDictionary(router, event);
}

export function useAtlasReturn(pathname: string, query: string) {
  const router = useRouter();
  const lastPosition = useRef<AtlasReturnPosition | null>(null);
  const pendingRestore = useRef<AtlasReturnPosition | null>(null);

  useEffect(() => {
    if (!isAtlasReturnPath(pathname)) return;

    function readPosition(): AtlasReturnPosition | null {
      const location = window.location;
      if (location.pathname !== pathname) return null;
      return {
        href: location.pathname + location.search + location.hash,
        scrollY: Math.max(0, window.scrollY),
      };
    }
    let position = readPosition();
    function trackPosition() {
      position = readPosition() ?? position;
    }
    function savePosition() {
      trackPosition();
      if (!position) return;
      lastPosition.current = position;
      try {
        window.sessionStorage.setItem(ATLAS_RETURN_STORAGE_KEY, JSON.stringify(position));
      } catch {
        // Keep the current tab's position in memory when storage is unavailable.
      }
    }
    function saveBeforeLink(event: MouseEvent) {
      if (event.target instanceof Element && event.target.closest("a[href]")) savePosition();
    }

    const restore = pendingRestore.current;
    let frame = 0;
    if (restore && restore.href === position?.href) {
      pendingRestore.current = null;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (window.location.pathname !== pathname) return;
          window.scrollTo({ top: restore.scrollY, behavior: "instant" });
          trackPosition();
        });
      });
    }
    window.addEventListener("scroll", trackPosition, { passive: true });
    window.addEventListener("hashchange", trackPosition);
    window.addEventListener("pagehide", savePosition);
    document.addEventListener("click", saveBeforeLink, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", trackPosition);
      window.removeEventListener("hashchange", trackPosition);
      window.removeEventListener("pagehide", savePosition);
      document.removeEventListener("click", saveBeforeLink, true);
      savePosition();
    };
  }, [pathname, query]);

  return (event: LinkNavigation) => {
    if (isAtlasReturnPath(pathname)) {
      if (pathname !== "/tsubo") navigateToDictionary(router, event);
      return;
    }
    let position = lastPosition.current;
    if (!position) {
      try {
        position = readAtlasReturnPosition(window.sessionStorage.getItem(ATLAS_RETURN_STORAGE_KEY));
      } catch {
        return;
      }
    }
    if (!position || (position.href === "/tsubo" && position.scrollY === 0)) return;

    event.preventDefault();
    const restoreScroll = position.scrollY > 0 && !position.href.includes("#");
    pendingRestore.current = restoreScroll ? position : null;
    if (position.href.startsWith("/tsubo?")) setAnalyticsDisabled(true);
    router.push(position.href, { scroll: !restoreScroll });
  };
}
