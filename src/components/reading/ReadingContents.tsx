import { ChevronDown, List } from "lucide-react";

export default function ReadingContents({ label, headings }: {
  label: string;
  headings: readonly { id: string; label: string }[];
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
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
