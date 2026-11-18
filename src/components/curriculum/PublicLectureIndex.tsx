import Link from "next/link";
import { getPublicLectureGroups, type PublicLectureSeries } from "@/data/publicLectures";

export default function PublicLectureIndex({ series }: { series?: PublicLectureSeries }) {
  return (
    <div className="grid gap-3">
      {getPublicLectureGroups(series).map(group => (
        <section key={group.id} className="ui-card p-4 sm:p-5" id={`chapter-${group.id}`}>
          <details>
            <summary className="cursor-pointer py-2 font-serif text-lg font-bold">{group.label}</summary>
            <ul className="divide-y divide-[var(--border-washi)]">
              {group.entries.map(entry => (
                <li key={entry.id} className="py-3">
                  <Link className="ui-text-link font-semibold" href={`/curriculum/${entry.id}`} prefetch={false}>{entry.title}</Link>
                  <p className="mt-1 text-sm leading-relaxed ui-muted">{entry.description}</p>
                </li>
              ))}
            </ul>
          </details>
        </section>
      ))}
    </div>
  );
}
