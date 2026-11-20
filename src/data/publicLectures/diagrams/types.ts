type DiagramPoint = readonly [label: string, explanation: string];
type DiagramRelation = readonly [from: string, to: string, label?: string];

interface DiagramBase {
  title: string;
  note?: string;
  afterSection?: 1 | 2 | 3;
  anchor?: string;
}

export type LectureDiagram = DiagramBase & (
  | { layout: "compare" | "flow"; items: readonly DiagramPoint[] }
  | { layout: "relations"; items: readonly DiagramRelation[]; directional?: boolean }
);
