export type FeatureKind = "bone" | "soft" | "guide";
export type ViewDirection = "front" | "back" | "side" | "top";
export type BodyArea = "head" | "neck" | "shoulder" | "upperArm" | "elbow" | "forearm" | "hand" | "chest" | "abdomen" | "flank" | "pelvis" | "back" | "lumbar" | "thigh";

export interface Feature {
  name: string;
  position: readonly [number, number];
  path: string;
  kind: FeatureKind;
}

export interface View {
  name: string;
  area: BodyArea;
  direction: ViewDirection;
  outline: string;
  details: readonly string[];
  features: Readonly<Record<string, Feature>>;
}

export function feature(name: string, x: number, y: number, path: string, kind: FeatureKind = "bone"): Feature {
  return { name, position: [x, y], path, kind };
}
