import type { LectureDiagram } from "@/data/publicLectures/diagrams/types";

type RecordingPoint = Extract<LectureDiagram, { layout: "compare" | "flow" }>["items"][number];
type TwoPoints = readonly [RecordingPoint, RecordingPoint];
type ThreePoints = readonly [RecordingPoint, RecordingPoint, RecordingPoint];

export type RecordingChange = "eased" | "remained";

export type SymptomRecordingExample = Pick<LectureDiagram, "title" | "note"> & (
  | ({ layout: "flow" } & (
    { items: TwoPoints; offsets?: readonly [0, number] } |
    { items: ThreePoints; offsets?: readonly [0, number, number] }
  ))
  | { layout: "compare"; mode: "stairs"; items: TwoPoints }
  | {
    layout: "matrix";
    columns: readonly [string, string];
    rows: ReadonlyArray<{ label: string; cells: readonly [string, string]; change: RecordingChange }>;
  }
);
