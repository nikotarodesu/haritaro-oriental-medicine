export type RegionalStructureKind = "bone" | "muscle" | "tendon" | "cartilage" | "organ" | "space" | "surface" | "softTissue";

export interface RegionalStructure {
  name: string;
  description: string;
  kind: RegionalStructureKind;
  shape: { d: string } | { cx: number; cy: number; rx: number; ry: number };
  badge: readonly [number, number];
}

export interface RegionalSection {
  name: string;
  plane: string;
  axes: {
    horizontal: readonly [string, string];
    vertical: readonly [string, string];
  };
  outline: string;
  structures: readonly RegionalStructure[];
  sources: readonly { title: string; url: string; scope: string }[];
}

export interface RegionalSectionGroup {
  codes: string;
  section: RegionalSection;
}
