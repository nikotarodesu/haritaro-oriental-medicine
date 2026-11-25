import { getAcupointByCode } from "../index";
import { getAtlasComparisonGuide } from "./nearbyComparisonGuides";
import { NEARBY_COMPARISONS, nearbyComparisonAnchor } from "./nearbyComparisons";

export const NEARBY_COMPARISON_LINKS = NEARBY_COMPARISONS.map(({ id, region, points }) => {
  const codes = points.map(({ code }) => code);
  const names = codes.map(code => getAcupointByCode(code)?.name ?? code.toUpperCase());
  const [firstCode] = codes;
  const guideHref = getAtlasComparisonGuide(id)?.href;
  return { id, region, codes, names, href: `/tsubo/${firstCode}#${nearbyComparisonAnchor(firstCode, id)}`, guideHref };
});
