import type { SharedAnatomyLandmark } from "../atlas/sharedAnatomyLandmarks";
import type { BoundaryLandmark, CrossSectionModel, SvgAnatomicalElement } from "../types";
import { headNeckSections } from "./headNeck";
import { lowerLimbSections } from "./lowerLimb";
import { trunkSections } from "./trunk";
import type { RegionalSection, RegionalStructureKind } from "./types";
import { upperLimbSections } from "./upperLimb";

export const regionalSectionGroups = [...headNeckSections, ...trunkSections, ...upperLimbSections, ...lowerLimbSections];
const sectionsByPoint = new Map(regionalSectionGroups.flatMap(({ codes, section }) =>
  codes.trim().split(/\s+/).map(code => [code, section] as const),
));

const colors: Record<RegionalStructureKind, { fill: string; stroke: string }> = {
  bone: { fill: "#F6E9C9", stroke: "#A28360" },
  muscle: { fill: "#DFAD9B", stroke: "#A15E50" },
  tendon: { fill: "#EDD5A3", stroke: "#9B713D" },
  cartilage: { fill: "#BAD5C6", stroke: "#648577" },
  organ: { fill: "#DCC9DA", stroke: "#886986" },
  space: { fill: "#C9DDE1", stroke: "#6E8F98" },
  surface: { fill: "#E6D8C9", stroke: "#9B7964" },
  softTissue: { fill: "#EAD1BA", stroke: "#AF8C72" },
};
const badgeNumbers = [1, 2, 3, 4, 5, 6] as const;

export function getRegionalSection(code: string): RegionalSection | undefined {
  return sectionsByPoint.get(code);
}

export function createRegionalSectionModel(code: string, section: RegionalSection) {
  const boundaries: BoundaryLandmark[] = [];
  const landmarks: SharedAnatomyLandmark[] = [];
  const svgElements: SvgAnatomicalElement[] = [
    {
      layerId: "outline",
      elementId: `${code}-regional-outline`,
      label: "断面の輪郭",
      shapeType: "path",
      d: section.outline,
      fill: "#F2DFC8",
      stroke: "#9B826D",
      strokeWidth: 3,
    },
  ];

  section.structures.forEach(({ name, description, kind, shape, badge }, index) => {
    const number = badgeNumbers[index];
    const layerId = `landmark-${number}`;
    const elementId = `${code}-regional-${number}`;
    const category = kind === "bone" || kind === "muscle" || kind === "tendon" ? kind : "membrane";
    boundaries.push({ id: layerId, name, category, description, position: "", relation: "", palpationTip: "" });
    svgElements.push({
      layerId, elementId, label: name,
      shapeType: "d" in shape ? "path" : "ellipse",
      ...shape,
      ...colors[kind],
      strokeWidth: 2.5,
    });
    landmarks.push({ number, name, layerId, elementId, sectionBadge: badge });
  });

  const model: CrossSectionModel = {
    id: `regional-${code}`,
    title: section.name,
    level: section.plane,
    axes: { horizontal: [...section.axes.horizontal], vertical: [...section.axes.vertical] },
    needleTrack: { angle: "", safeDepth: "", targetStructure: "" },
    layers: [],
    boundaries,
    svgElements,
    references: section.sources.map(source => source.title),
    verifiedDate: "2026-11-24",
  };
  return { model, landmarks };
}
