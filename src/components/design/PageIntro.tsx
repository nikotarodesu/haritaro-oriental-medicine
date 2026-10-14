import type { ReactNode } from 'react';
import PageArtwork, { PageSymbol, type PageArtKind } from './PageArtwork';

interface PageIntroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  art?: PageArtKind;
  children?: ReactNode;
  compact?: boolean;
  className?: string;
  id?: string;
  headingLevel?: 'h1' | 'h2';
}

/** Shared page entrance. The title and actions remain the reading order. */
export default function PageIntro({ eyebrow, title, description, art, children, compact = false, className = '', id, headingLevel = 'h1' }: PageIntroProps) {
  const Heading = headingLevel;
  return <header className={`page-intro${compact ? ' page-intro--compact' : ''}${art ? ' page-intro--illustrated' : ''} ${className}`}>
    <div className="page-intro-copy">
      {eyebrow ? <p className="page-eyebrow">{art ? <PageSymbol kind={art} /> : null}<span>{eyebrow}</span></p> : null}
      <Heading id={id} className="page-intro-title">{title}</Heading>
      {description ? <div className="page-intro-description">{description}</div> : null}
      {children}
    </div>
    {art ? compact ? <PageSymbol className="page-compact-art" kind={art} /> : <PageArtwork kind={art} /> : null}
  </header>;
}
