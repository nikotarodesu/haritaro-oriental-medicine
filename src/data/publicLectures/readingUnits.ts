import { getPublicLectureGroups, getPublicLectureSeries, type PublicLectureSeries } from "./index";
import { readingUnits } from "./readingUnitCatalog";

export { getReadingUnit, getReadingUnitForLecture, READING_LECTURES_REVISED_AT, readingLinkHref, readingPartAnchor, readingPartHref, readingUnits } from "./readingUnitCatalog";

export function getLectureIndexGroups(series?: PublicLectureSeries) {
  return getPublicLectureGroups(series).map(group => ({
    id: group.id,
    label: group.label,
    entries: [
      ...(!series || series === "reading" ? readingUnits.filter(unit => unit.chapter === group.id)
        .map(unit => ({ id: unit.slug, href: unit.href, title: unit.title, description: unit.description })) : []),
      ...group.entries.filter(entry => getPublicLectureSeries(entry.id) !== "reading")
        .map(entry => ({ ...entry, href: `/curriculum/${entry.id}` })),
    ],
  }));
}
