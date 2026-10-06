import { isClarityPage, isClarityReferrer } from "./utils/clarity";
import type { clarity } from "clarity-js";

let stopped = false;
let recorder: typeof clarity | undefined;

function status(value: string) {
  document.documentElement.dataset.clarityStatus = value;
}

/** Stop synchronously, before React replaces a public page with private content. */
export function onRouterTransitionStart() {
  if (stopped) return;
  stopped = true;
  try { recorder?.stop(); }
  finally { status("stopped"); }
}

function eligible() {
  return !stopped && isClarityPage(window.location.href, window.location.origin)
    && isClarityReferrer(document.referrer, window.location.origin)
    && !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}

const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;
if (projectId && /^[a-z0-9]{6,32}$/.test(projectId) && eligible()) {
  status("loading");
  // Register guards before importing: a delayed SDK cannot start on a private
  // page or after a user has begun entering a search term.
  const guardInteraction = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("input, textarea, select, [contenteditable], [data-clarity-sensitive], [role=dialog], [role=listbox]")) {
      onRouterTransitionStart();
      return;
    }
    const link = target.closest("a[href]");
    if (link && !isClarityPage(link.getAttribute("href") || "", window.location.origin)) onRouterTransitionStart();
  };
  for (const event of ["pointerdown", "click", "focusin", "keydown"]) {
    document.addEventListener(event, guardInteraction, true);
  }
  window.addEventListener("popstate", onRouterTransitionStart, true);
  window.addEventListener("hashchange", onRouterTransitionStart, true);
  window.addEventListener("pagehide", onRouterTransitionStart, true);

  void import("clarity-js").then(({ clarity: sdk }) => {
    if (!eligible()) return;
    // Stop before the SDK history proxy can schedule an automatic restart.
    for (const method of ["pushState", "replaceState"] as const) {
      const original = window.history[method];
      window.history[method] = function(data, unused, url) {
        if (url != null && new URL(String(url), window.location.href).href !== window.location.href) onRouterTransitionStart();
        original.call(this, data, unused, url);
      };
    }
    recorder = sdk;
    sdk.start({
      projectId,
      upload: "https://a.clarity.ms/collect",
      track: false,
      cookies: [],
      content: true,
      mask: ["body"],
      unmask: [],
      fraud: false,
      diagnostics: false,
    });
    sdk.metadata(() => status("active"), false);
  }).catch(() => { status("unavailable"); });
} else {
  status("excluded");
}
