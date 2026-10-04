"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

/** Keep keyboard navigation in the open menu and return to its trigger on close. */
export function useModalDialog(open: boolean, ref: RefObject<HTMLDivElement | null>, onClose: () => void) {
  const close = useEffectEvent(onClose);

  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
    )).filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0 && !element.closest('[inert]'));
    const focusStart = () => (dialog.querySelector<HTMLElement>("[data-modal-autofocus]") || focusable()[0] || dialog).focus();
    const initialFocus = requestAnimationFrame(focusStart);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.isComposing) {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    const keepFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) focusStart();
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("focusin", keepFocus);
    return () => {
      cancelAnimationFrame(initialFocus);
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("focusin", keepFocus);
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => {
        // A menu can hand over to search/customization. Let the next dialog take focus.
        if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
        const usablePrevious = previousFocus?.isConnected && previousFocus !== document.body
          && previousFocus !== document.documentElement && previousFocus.getClientRects().length > 0;
        const target = usablePrevious ? previousFocus : document.getElementById("mobile-more-trigger");
        if (target?.getClientRects().length) target.focus({ preventScroll: true });
      });
    };
  }, [open, ref]);
}
