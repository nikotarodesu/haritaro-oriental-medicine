import { NextResponse, type NextRequest } from "next/server";
import { ACUPOINT_LOOKUP } from "@/data/acupointLookup";
import { getReadingUnitForLecture, readingPartHref } from "@/data/publicLectures/readingUnitCatalog";
import { legacyLectureViewParams, resolveLegacyLectureId } from "@/utils/curriculumLegacyPaths";

const codes = new Map<string, string>();
for (const point of ACUPOINT_LOOKUP) {
  const canonical = point.code.toLowerCase();
  codes.set(canonical, canonical);
  codes.set(point.id.toLowerCase(), canonical);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/curriculum" || pathname.startsWith("/curriculum/")) {
    const ids = pathname === "/curriculum"
      ? request.nextUrl.searchParams.getAll("lecture")
      : [pathname.slice("/curriculum/".length)];
    if (ids.length !== 1 || !ids[0]) return NextResponse.next();

    const rawId = ids[0];
    const id = resolveLegacyLectureId(rawId);
    const unit = getReadingUnitForLecture(id);
    const viewParams = legacyLectureViewParams(request.nextUrl.searchParams);
    if (unit && !viewParams.size) {
      return NextResponse.redirect(new URL(readingPartHref(id), request.url), 308);
    }
    if (rawId !== id || (pathname === "/curriculum" && unit)) {
      const view = viewParams.size ? `?${viewParams}` : "";
      return NextResponse.redirect(new URL(`/curriculum/${id}${view}`, request.url), 308);
    }
    return NextResponse.next();
  }

  const segment = pathname.split("/").at(-1) ?? "";
  const canonical = codes.get(segment.toLowerCase().replace(/^tsubo-/, ""));
  if (canonical && pathname !== `/tsubo/${canonical}`) {
    const destination = request.nextUrl.clone();
    destination.pathname = `/tsubo/${canonical}`;
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/tsubo/:code", "/curriculum", "/curriculum/:id"] };
