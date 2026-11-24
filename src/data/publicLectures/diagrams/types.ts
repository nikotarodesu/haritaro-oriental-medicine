export type DiagramIllustration = "temperature" | "dawn" | "qi-blood" | "five-elements" | "meridian" | "water";
export type DiagramIcon = "sun" | "footprints" | "rain" | "moon" | "sunrise" | "eye" | "ear" | "speech" | "hand";

type DiagramPoint = readonly [label: string, explanation: string, icon?: DiagramIcon];
type DiagramRelation = readonly [from: string, to: string, label?: string];
type DiagramCell = string | readonly { label: string; tone?: "warm" | "cool" | "positive" | "neutral" }[];

interface DiagramBase {
  title: string;
  note?: string;
  afterSection?: 1 | 2 | 3;
  anchor?: string;
  illustration?: DiagramIllustration;
}

export type LectureDiagram = DiagramBase & (
  | { layout: "compare" | "flow"; items: readonly DiagramPoint[] }
  | { layout: "relations"; items: readonly DiagramRelation[]; directional?: boolean }
  | { layout: "matrix"; columns: readonly string[]; rows: readonly { label: string; cells: readonly DiagramCell[] }[] }
  | { layout: "bars"; rows: readonly { label: string; percent: number }[] }
);
