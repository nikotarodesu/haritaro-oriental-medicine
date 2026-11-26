import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { PublicLectureSeries } from "@/data/publicLectures";
import { getLectureIndexGroups } from "@/data/publicLectures/readingUnits";

export default function PublicLectureIndex({ series, openFirstChapter = false, excludeHrefs = [] }: {
  series?: PublicLectureSeries;
  openFirstChapter?: boolean;
  excludeHrefs?: readonly string[];
}) {
  const excluded = new Set(excludeHrefs);
  const groups = getLectureIndexGroups(series).map(group => ({
    ...group,
    entries: group.entries.filter(entry => !excluded.has(entry.href)),
  })).filter(group => group.entries.length > 0);
  if (groups.length === 0) return null;

  return (
    <div className="grid gap-2.5">
      {groups.map((group, index) => (
        <section key={group.id} id={`chapter-${group.id}`}>
          <details className="reader-contents" open={openFirstChapter && index === 0 ? true : undefined}>
            <summary><span>{group.label}</span><ChevronDown aria-hidden="true" /></summary>
            <ul className="px-3 pb-2">
              {group.entries.map(entry => (
                <li key={entry.id}>
                  <Link className="lecture-index-link flex min-h-11 items-center justify-between gap-3 border-t border-divider py-2.5 text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" href={entry.href} prefetch={false}>
                    <span className="min-w-0">
                      <strong className="block font-semibold underline underline-offset-4">{entry.title}</strong>
                      <span className="mt-1 block text-sm leading-[1.75] text-muted">{entry.description}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </section>
      ))}
    </div>
  );
}
