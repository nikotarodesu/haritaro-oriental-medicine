type LectureKeyEvent = Pick<KeyboardEvent, 'key' | 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'isComposing' | 'defaultPrevented'>;

/** Browser history, assistive technology and input controls keep their own shortcuts. */
export function getLectureShortcut(event: LectureKeyEvent, interactiveTarget: boolean): 'previous' | 'next' | null {
  if (interactiveTarget || event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return null;
  return event.key === '[' ? 'previous' : event.key === ']' ? 'next' : null;
}
