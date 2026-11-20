import Link from "next/link";
import { ChevronDown } from "lucide-react";
import StudyDiagram from "@/components/reading/StudyDiagram";
import { getCurriculumReadingInserts } from "@/data/curriculumReadingGuides";
import { getPublicLectureDiagram } from "@/data/publicLectures/diagrams";
import { readingLinkHref } from "@/data/publicLectures/readingUnits";
import type { PublicLectureArticle, PublicLectureLink } from "@/data/publicLectures/types";

export function PublicLectureLinks({ links, unitHref }: { links: readonly PublicLectureLink[]; unitHref?: string }) {
  const destinations = links.map(link => ({ ...link, href: unitHref ? readingLinkHref(link.href, unitHref) : link.href }))
    .filter(link => !unitHref || !link.href.startsWith("#"));
  if (destinations.length === 0) return null;
  return (
    <ul className="space-y-1">
      {destinations.map(({ href, label }) => <li key={href}><Link href={href} className="ui-text-link">{label}</Link></li>)}
    </ul>
  );
}

export default function PublicLectureSections({ lectureId, sections, partAnchor, unitHref, collapseDiagram = false }: {
  lectureId: string;
  sections: PublicLectureArticle["sections"];
  partAnchor?: string;
  unitHref?: string;
  collapseDiagram?: boolean;
}) {
  const diagram = getPublicLectureDiagram(lectureId);
  const diagramIndex = (diagram?.afterSection ?? 1) - 1;
  const readingInserts = getCurriculumReadingInserts(lectureId);
  const prefix = partAnchor ?? "lecture";
  const Heading = partAnchor ? "h3" : "h2";
  const figure = diagram && (
    <div id={`${prefix}-diagram`} className="lecture-diagram" tabIndex={-1}>
      {readingInserts.map(({ figure }) => (
        <span key={figure.id} id={`reading-figure-${figure.id}`} className="lecture-diagram-alias" aria-hidden="true" />
      ))}
      <StudyDiagram id={`reading-figure-${diagram.anchor ?? lectureId}`} diagram={diagram} />
      {!partAnchor && readingInserts.map(({ figure }) => figure.exercise ? (
        <div key={figure.id} className="study-diagram-exercise">
          <p>{figure.exercise.prompt}</p>
          <details data-reading-exercise={figure.id}>
            <summary>考え方を確認する</summary>
            <p className="text-muted">{figure.exercise.answer}</p>
          </details>
        </div>
      ) : null)}
    </div>
  );
  const diagramBlock = diagram && collapseDiagram ? (
    <details className="lecture-figure-details">
      <summary>
        <span>図で確認する</span><span className="sr-only"> {diagram.title}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      {figure}
    </details>
  ) : figure;

  return sections.map((section, index) => (
    <section key={section.heading} id={`${prefix}-section-${index + 1}`} tabIndex={-1} data-lecture-section={index} className="lecture-section">
      {(!partAnchor || index > 0) && (
        <Heading className={partAnchor ? "lecture-unit-subtitle" : "reader-section-title"}>{section.heading}</Heading>
      )}
      {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
      {index === diagramIndex && diagramBlock}
      {section.links?.length ? <PublicLectureLinks links={section.links} unitHref={unitHref} /> : null}
    </section>
  ));
}
