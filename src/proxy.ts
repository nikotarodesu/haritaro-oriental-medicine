import { NextResponse, type NextRequest } from "next/server";
import { ACUPOINT_LOOKUP } from "@/data/acupointLookup";

const codes = new Map<string, string>();
for (const point of ACUPOINT_LOOKUP) {
  const canonical = point.code.toLowerCase();
  codes.set(canonical, canonical);
  codes.set(point.id.toLowerCase(), canonical);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/").at(-1) ?? "";
  const canonical = codes.get(segment.toLowerCase().replace(/^tsubo-/, ""));
  if (canonical && pathname !== `/tsubo/${canonical}`) {
    const destination = request.nextUrl.clone();
    destination.pathname = `/tsubo/${canonical}`;
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/tsubo/:code" };
