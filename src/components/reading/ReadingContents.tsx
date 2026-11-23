import { ChevronDown, List, Network } from "lucide-react";

type ReadingLink = { id: string; label: string };

export default function ReadingContents({ label, headings }: {
  label: string;
  headings: readonly (ReadingLink & { diagram?: ReadingLink })[];
}) {
  if (headings.length === 0) return null;
  return (
    <details className="reader-contents">
      <summary><List aria-hidden="true" />目次<ChevronDown aria-hidden="true" /></summary>
      <nav aria-label={label}>
        <ol>
          {headings.map(heading => (
            <li key={heading.id}>
              <a href={`#${heading.id}`}>{heading.label}</a>
              {heading.diagram && (
                <a href={`#${heading.diagram.id}`} className="reader-contents-diagram">
                  <Network aria-hidden="true" />
                  <span><span className="sr-only">図を見る </span>{heading.diagram.label}</span>
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
