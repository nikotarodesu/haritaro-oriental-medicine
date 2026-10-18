/** Reveal a linked section before the browser scrolls to an anchor inside lesson supplements. */
export function revealLectureSection(target: HTMLElement): void {
  let ancestor: HTMLElement | null = target;
  while (ancestor) {
    if (ancestor.tagName === 'DETAILS') (ancestor as HTMLDetailsElement).open = true;
    ancestor = ancestor.parentElement;
  }
}
