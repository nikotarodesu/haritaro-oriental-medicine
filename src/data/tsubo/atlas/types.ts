import type { DigitLandmark } from "./digits";
import type { ExpandedPoint } from "./expanded/types";
import type { FootCode } from "./footLandmarks";
import type { LegCode } from "./legLandmarks";

export type AtlasRegion = "volarForearm" | "volarWrist" | "anterolateralLowerLeg" | "footDorsum" | "finger" | "toe" | "dorsalFoot" | "ankle" | "knee" | "calf" | "sole" | "expanded";

export interface AcupointAtlasArticle {
  titleTopic?: string;
  description: string;
  locationSummary?: string;
  meridianReading: string;
  regionLabel: string;
  lead: string;
  safetyWarning?: string;
  location: readonly string[];
  traditional: readonly string[];
  selfCare: readonly string[];
  cautions: readonly string[];
  expert: readonly string[];
  visualOnly?: boolean;
  symptomLinks?: readonly { href: string; label: string }[];
  relatedPoints: readonly { code: string; text: string }[];
  sources: readonly { name: string; url: string; scope: string }[];
  illustration: {
    region: AtlasRegion;
    bodyLabel: string;
    closeUpAlt: string;
    closeUpCaption: string;
    meridianStart: number;
    meridianEnd: number;
    meridianCaption: string;
  };
}

export interface AtlasMarker {
  x: number;
  y: number;
  boneCun?: number;
  digit?: DigitLandmark;
  footCode?: FootCode;
  legCode?: LegCode;
  expanded?: ExpandedPoint;
}

export interface AtlasCloseUpProps {
  marker: AtlasMarker;
  label: string;
}

export type StudySource = { label: string; url: string };

export interface AtlasStudy {
  id: string;
  topic: string;
  kind: "point" | "combination";
  points: readonly string[];
  comparisonPoints?: readonly string[];
  additionalPointGroups?: readonly { label: string; points: readonly string[]; comparison?: true }[];
  otherPoints?: string;
  guide?: string;
  result: string;
  design: string;
  limits: string;
  sources: readonly StudySource[];
}
