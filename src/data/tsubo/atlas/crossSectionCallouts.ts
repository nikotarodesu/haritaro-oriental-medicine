import type { CrossSectionModel, SvgAnatomicalElement } from "../types";
import type { SharedAnatomyLandmark } from "./sharedAnatomyLandmarks";
import { circledLandmarkNumber } from "./sharedAnatomyLandmarks";

type Point = { x: number; y: number };
type Landmark = { element: SvgAnatomicalElement; origin: Point; name: string; category: string };
type Callout = Landmark & { x: number; y: number; edge: number; lines: string[] };

const focusCategories = new Set(["bone", "muscle", "tendon"]);

function authoredOrigin(element: SvgAnatomicalElement, shared?: SharedAnatomyLandmark): Point | undefined {
  const sharedPosition = shared?.leaderTo ?? shared?.sectionBadge;
  if (sharedPosition) return { x: sharedPosition[0], y: sharedPosition[1] };
  if (element.cx !== undefined && element.cy !== undefined) return { x: element.cx, y: element.cy };
  if (element.shapeType === "rect" && element.x !== undefined && element.y !== undefined) {
    return { x: element.x + (element.width ?? 40) / 2, y: element.y + (element.height ?? 20) / 2 };
  }
  if (element.labelPos?.anchor === "middle") return element.labelPos;
}

function wrapName(name: string): string[] {
  const characters = Array.from(name, character => ({
    character,
    width: /[\u0020-\u007e]/.test(character) ? .55 : 1,
  }));
  const totalWidth = characters.reduce((sum, character) => sum + character.width, 0);
  const lineWidth = Math.ceil(totalWidth / Math.ceil(totalWidth / 8));
  const lines: string[] = [];
  let line = "";
  let width = 0;
  for (const { character, width: characterWidth } of characters) {
    if (width + characterWidth > lineWidth && character !== "）") {
      lines.push(line.trim());
      line = "";
      width = 0;
    }
    line += character;
    width += characterWidth;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

export function crossSectionCallouts(model: CrossSectionModel, elements: readonly SvgAnatomicalElement[], sharedLandmarks: readonly SharedAnatomyLandmark[], regional: boolean) {
  const originalView = model.diagramViewBox ?? "0 0 500 270";
  const [left, top, width, height] = originalView.trim().split(/[\s,]+/).map(Number);
  const bottom = top + height;
  const categories = new Map([...model.layers, ...model.boundaries ?? [], ...model.adjacentStructures ?? []].map(item => [item.id, item.category]));
  const shared = new Map(sharedLandmarks.map(landmark => [landmark.elementId, landmark]));
  const uniqueNames = new Set<string>();
  const mapped = elements.flatMap(element => {
    const category = categories.get(element.layerId);
    const landmark = shared.get(element.elementId);
    const origin = authoredOrigin(element, landmark);
    if (!category || !origin || origin.x < left || origin.x > left + width || origin.y < top || origin.y > bottom) return [];
    const name = element.label.replace(/（[^）]*(?:主座|得気|目標|深刺)[^）]*）/g, "").trim();
    if (!name || uniqueNames.has(name)) return [];
    uniqueNames.add(name);
    return [{ element, origin, category, name: landmark && !regional ? `${circledLandmarkNumber(landmark.number)} ${name}` : name }];
  });
  const major = mapped.filter(item => shared.has(item.element.elementId) || focusCategories.has(item.category));
  const preferred = major.length ? major : mapped;
  // Match the surface-guide landmarks first and reserve a label for each nearby tissue type when drawn.
  const selected = new Set(preferred.filter(item => shared.has(item.element.elementId)));
  for (const category of focusCategories) {
    if (selected.size >= 4) break;
    if ([...selected].some(item => item.category === category)) continue;
    const item = preferred.find(candidate => candidate.category === category);
    if (item) selected.add(item);
  }
  for (const item of preferred) {
    if (selected.size >= 4) break;
    selected.add(item);
  }
  const byHeight = [...selected].slice(0, 4).sort((a, b) => a.origin.y - b.origin.y);
  const fontSize = width * .052;
  if (!byHeight.length) return { viewBox: originalView, labels: [], fontSize };

  const lineHeight = fontSize * 1.25;
  const center = Math.ceil(byHeight.length / 2);
  function makeRow(items: Landmark[], fromTop: boolean) {
    const row = items.sort((a, b) => a.origin.x - b.origin.x).map(item => ({ ...item, lines: wrapName(item.name) }));
    const longest = Math.max(0, ...row.map(item => item.lines.length));
    const margin = longest ? (longest + 1.2) * lineHeight : 0;
    const labels: Callout[] = row.map((item, index) => {
      const x = row.length > 1
        ? left + width * (index === 0 ? .24 : .76)
        : Math.min(left + width * .75, Math.max(left + width * .25, item.origin.x));
      const y = fromTop ? top - (item.lines.length + .1) * lineHeight : bottom + lineHeight;
      const edge = fromTop ? top - .38 * lineHeight : bottom + .24 * lineHeight;
      return { ...item, x, y, edge };
    });
    return { margin, labels };
  }
  const upper = makeRow(byHeight.slice(0, center), true);
  const lower = makeRow(byHeight.slice(center), false);
  return {
    viewBox: `${left} ${top - upper.margin} ${width} ${height + upper.margin + lower.margin}`,
    labels: [...upper.labels, ...lower.labels],
    fontSize,
  };
}
