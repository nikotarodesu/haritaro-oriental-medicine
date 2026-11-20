import Link from "next/link";
import StudyDiagram from "@/components/reading/StudyDiagram";
import { getCurriculumReadingInserts } from "@/data/curriculumReadingGuides";
import { getPublicLectureDiagram } from "@/data/publicLectures/diagrams";
import { readingLinkHref } from "@/data/publicLectures/readingUnits";
import type { PublicLectureArticle, PublicLectureLink } from "@/data/publicLectures/types";

export function PublicLectureLinks({ links, unitHref }: { links: readonly PublicLectureLink[]; unitHref?: string }) {
  return (
    <ul className="space-y-1">
      {links.map(({ href, label }) => {
        const destination = unitHref ? readingLinkHref(href, unitHref) : href;
        return (
          <li key={href}>
            {destination.startsWith("#")
              ? <a href={destination} className="ui-text-link">{label}</a>
              : <Link href={destination} className="ui-text-link">{label}</Link>}
          </li>
        );
      })}
    </ul>
  );
}

export default function PublicLectureSections({ lectureId, sections, partAnchor, unitHref }: {
  lectureId: string;
  sections: PublicLectureArticle["sections"];
  partAnchor?: string;
  unitHref?: string;
}) {
  const diagram = getPublicLectureDiagram(lectureId);
  const diagramIndex = (diagram?.afterSection ?? 1) - 1;
  const readingInserts = getCurriculumReadingInserts(lectureId);
  const prefix = partAnchor ?? "lecture";
  const Heading = partAnchor ? "h3" : "h2";

  return sections.map((section, index) => (
    <section key={section.heading} id={`${prefix}-section-${index + 1}`} tabIndex={-1} data-lecture-section={index} className="lecture-section">
      <Heading className={partAnchor ? "lecture-unit-subtitle" : "reader-section-title"}>{section.heading}</Heading>
      {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
      {diagram && index === diagramIndex && (
        <div id={`${prefix}-diagram`} className="lecture-diagram" tabIndex={-1}>
          {readingInserts.map(({ figure }) => (
            <span key={figure.id} id={`reading-figure-${figure.id}`} className="lecture-diagram-alias" aria-hidden="true" />
          ))}
          <StudyDiagram id={`reading-figure-${diagram.anchor ?? lectureId}`} diagram={diagram} />
          {readingInserts.map(({ figure }) => figure.exercise ? (
            <div key={figure.id} className="study-diagram-exercise">
              <p>{figure.exercise.prompt}</p>
              <details data-reading-exercise={figure.id}>
                <summary>考え方を確認する</summary>
                <p className="text-muted">{figure.exercise.answer}</p>
              </details>
            </div>
          ) : null)}
        </div>
      )}
      {section.links?.length ? <PublicLectureLinks links={section.links} unitHref={unitHref} /> : null}
    </section>
  ));
}
