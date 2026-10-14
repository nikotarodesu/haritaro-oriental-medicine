import type { ReactNode } from 'react';

/** Visible shapes only; title and description are screen-reader alternatives. */
export interface WordlessArtDefinition {
  readonly afterHeading: string;
  readonly variant: string;
  readonly title: string;
  readonly description: string;
  readonly artwork: ReactNode;
  readonly viewBox?: string;
}
