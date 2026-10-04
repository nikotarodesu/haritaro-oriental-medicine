export interface ReadingGeometry {
  top: number;
  height: number;
  viewportHeight: number;
  headerHeight: number;
  toolbarHeight: number;
}

/** Viewing position is not evidence that every earlier section has been read. */
export function getBodyReadingPosition(geometry: ReadingGeometry): { progress: number; visible: boolean; threshold: number } {
  const { top, height, viewportHeight, headerHeight, toolbarHeight } = geometry;
  const threshold = headerHeight + toolbarHeight + 16;
  const distance = height - Math.max(1, viewportHeight - headerHeight);
  const travelled = headerHeight - top;
  const progress = distance > 0 ? Math.min(100, Math.max(0, travelled / distance * 100)) : travelled >= 0 ? 100 : 0;
  return { progress, visible: top <= threshold && top + height > threshold, threshold };
}

export function getHeadingJumpScroll(geometry: ReadingGeometry & { headingTop: number; scrollY: number; documentHeight: number }): number {
  const threshold = getBodyReadingPosition(geometry).threshold;
  const maximum = Math.max(0, geometry.documentHeight - geometry.viewportHeight);
  return Math.min(maximum, Math.max(0, geometry.scrollY + geometry.headingTop - threshold));
}

/** Align first, then measure and save the selected section without waiting for a scroll frame. */
export function jumpToReadingHeading(id: string, bodySelector: string): { headingId: string; progress: number } | null {
  const target = document.getElementById(id);
  const body = document.querySelector<HTMLElement>(bodySelector);
  if (!target || !body?.contains(target)) return null;
  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
  const toolbarHeight = document.querySelector('[data-reading-toolbar]')?.getBoundingClientRect().height ?? 44;
  const before = body.getBoundingClientRect();
  const geometry = { top: before.top, height: before.height, viewportHeight: window.innerHeight, headerHeight, toolbarHeight };
  const top = getHeadingJumpScroll({ ...geometry, headingTop: target.getBoundingClientRect().top, scrollY: window.scrollY, documentHeight: document.documentElement.scrollHeight });
  window.scrollTo({ top, behavior: 'instant' });
  const fragment = `#${encodeURIComponent(id)}`;
  if (window.location.hash !== fragment) window.history.pushState(null, '', fragment);
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
  target.focus({ preventScroll: true });
  const after = body.getBoundingClientRect();
  return { headingId: id, progress: getBodyReadingPosition({ ...geometry, top: after.top, height: after.height }).progress };
}
