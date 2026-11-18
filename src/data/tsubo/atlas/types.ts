import type { DigitLandmark } from "./digits";

export type AtlasRegion = "volarForearm" | "volarWrist" | "anterolateralLowerLeg" | "footDorsum" | "finger" | "toe";

export interface AcupointAtlasArticle {
  titleTopic?: string;
  description: string;
  meridianReading: string;
  regionLabel: string;
  lead: string;
  safetyWarning?: string;
  location: readonly string[];
  traditional: readonly string[];
  selfCare: readonly string[];
  cautions: readonly string[];
  expert: readonly string[];
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
}

export interface AtlasCloseUpProps {
  marker: AtlasMarker;
  label: string;
}
