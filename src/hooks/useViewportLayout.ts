"use client";

import { useEffect } from "react";

/** Match overlays to the visible area, including the software keyboard and browser chrome. */
export function useViewportLayout() {
  useEffect(() => {
    const root = document.documentElement;
    const viewport = window.visualViewport;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // During pinch zoom preserve the layout, letting the browser pan its visual viewport.
        if (viewport && Math.abs(viewport.scale - 1) > .05) return;
        root.style.setProperty("--visual-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
        root.style.setProperty("--visual-viewport-top", `${viewport?.offsetTop ?? 0}px`);
        const element = document.activeElement;
        const editing = element instanceof HTMLElement && element.matches('input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');
        const keyboard = Boolean(editing && viewport && window.innerHeight - viewport.height > 120);
        root.dataset.keyboardOpen = String(keyboard);
      });
    };
    update();
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    return () => {
      cancelAnimationFrame(frame);
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
      root.style.removeProperty("--visual-viewport-height");
      root.style.removeProperty("--visual-viewport-top");
      delete root.dataset.keyboardOpen;
    };
  }, []);
}
