import Link from "next/link";
import { ArrowLeft, ArrowRight, List } from "lucide-react";

interface ReadingDestination {
  href: string;
  title: string;
}

export default function ReadingSequence({ id, label, previous, next, index }: {
  id?: string;
  label: "講義" | "記事";
  previous?: ReadingDestination;
  next?: ReadingDestination;
  index: ReadingDestination;
}) {
  const destination = next ?? index;

  return (
    <nav id={id} className="reading-sequence" aria-label={`${label}を順に読む`}>
      <Link className="reading-sequence-primary" href={destination.href} rel={next ? "next" : undefined}>
        <span className="reading-sequence-copy">
          {next && <span>次の{label}</span>}
          <strong>{destination.title}</strong>
        </span>
        <ArrowRight size={20} aria-hidden="true" />
      </Link>
      <div className="reading-sequence-links">
        {previous && (
          <Link href={previous.href} rel="prev" prefetch={false} className="ui-text-link">
            <ArrowLeft aria-hidden="true" />
            前の{label}<span className="sr-only"> {previous.title}</span>
          </Link>
        )}
        {next && <Link href={index.href} prefetch={false} className="ui-text-link"><List aria-hidden="true" />{index.title}</Link>}
      </div>
    </nav>
  );
}
