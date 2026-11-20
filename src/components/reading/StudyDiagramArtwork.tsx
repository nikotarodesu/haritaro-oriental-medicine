import type { ReactNode } from "react";
import type { DiagramIllustration } from "@/data/publicLectures/diagrams/types";

type Node = { label: string; x: number; y: number };

function Canvas({ height, children }: { height: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 360 ${height}`} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      {children}
    </svg>
  );
}

function ArrowMarker({ id, warm = false }: { id: string; warm?: boolean }) {
  return (
    <marker id={id} viewBox="0 0 10 10" markerWidth="9" markerHeight="9" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M1 1l7 4-7 4" className={warm ? "study-artwork-warm" : "study-artwork-accent"} />
    </marker>
  );
}

function NodeLabels({ nodes, height }: { nodes: readonly Node[]; height: number }) {
  return nodes.map(({ label, x, y }) => (
    <span key={label} className="study-artwork-node-label" style={{ left: `${x / 3.6}%`, top: `${y / height * 100}%` }}>{label}</span>
  ));
}

function Temperature({ id }: { id: string }) {
  return (
    <>
      <Canvas height={111}>
        <defs><ArrowMarker id={`${id}-scale`} /></defs>
        <path className="study-artwork-guide" d="M31 96H331" markerEnd={`url(#${id}-scale)`} />
        {[60, 180, 300].map((x, index) => (
          <g transform={`translate(${x} 0)`} key={x} className={index === 0 ? "study-artwork-accent" : "study-artwork-warm"}>
            <path d="M-26 33h52l-5 41a6 6 0 0 1-6 5h-30a6 6 0 0 1-6-5Z" className={index === 1 ? "study-artwork-highlight" : "study-artwork-paper"} />
            <path d="M-23 58q8-4 16 0t16 0 14 0" />
            {index === 0 && <path d="m-16 48 7-7 7 7-7 7Zm17 0 7-7 7 7-7 7Z" />}
            {index === 2 && <path d="M-10 25c-6-7 6-8 1-16M4 25c-6-7 6-8 1-16" />}
            <circle cx="0" cy="96" r={index === 1 ? "5" : "3.5"} className="study-artwork-paper" />
          </g>
        ))}
      </Canvas>
      <div className="study-artwork-scale"><span>氷水</span><strong>40℃の湯</strong><span>沸いた湯</span></div>
    </>
  );
}

function Dawn({ id }: { id: string }) {
  const curve = "M34 85C92 85 128 76 180 60S269 25 326 21";
  return (
    <>
      <Canvas height={109}>
        <defs>
          <linearGradient id={`${id}-light`}>
            <stop offset="0" stopColor="var(--accent-readable)" stopOpacity=".1" />
            <stop offset="1" stopColor="var(--warm-readable)" stopOpacity=".3" />
          </linearGradient>
          <ArrowMarker id={`${id}-time`} />
        </defs>
        <path d={`${curve}V97H34Z`} fill={`url(#${id}-light)`} />
        <path d="M27 97H333" className="study-artwork-guide" markerEnd={`url(#${id}-time)`} />
        <path d="M180 14V97" className="study-artwork-warm study-artwork-dashed" />
        <path d={curve} className="study-artwork-warm" />
        <circle cx="34" cy="85" r="4" className="study-artwork-accent study-artwork-paper" />
        <circle cx="180" cy="60" r="5" className="study-artwork-warm study-artwork-paper" />
        <circle cx="326" cy="21" r="5" className="study-artwork-warm study-artwork-paper" />
      </Canvas>
      <div className="study-artwork-scale"><span>夜</span><strong>夜明け</strong><span>昼</span></div>
    </>
  );
}

const qiNodes = [{ label: "気", x: 72, y: 68 }, { label: "血", x: 288, y: 68 }];

function QiBlood({ id }: { id: string }) {
  return (
    <div className="study-artwork-plot">
      <Canvas height={137}>
        <defs>
          <ArrowMarker id={`${id}-forward`} />
          <ArrowMarker id={`${id}-return`} warm />
        </defs>
        <path d="M100 55Q177 13 256 55" className="study-artwork-accent" markerEnd={`url(#${id}-forward)`} />
        <path d="M260 82Q181 125 104 82" className="study-artwork-warm" markerEnd={`url(#${id}-return)`} />
        {qiNodes.map(({ label, x, y }) => (
          <circle key={label} cx={x} cy={y} r="23" className="study-artwork-accent study-artwork-paper" />
        ))}
      </Canvas>
      <NodeLabels nodes={qiNodes} height={137} />
      <div className="study-artwork-arc-label study-artwork-arc-label--top">巡りを導く</div>
      <div className="study-artwork-arc-label study-artwork-arc-label--bottom">養い支える</div>
    </div>
  );
}

const elementNodes = [
  { label: "木", x: 180, y: 28 },
  { label: "火", x: 282, y: 98 },
  { label: "土", x: 244, y: 205 },
  { label: "金", x: 116, y: 205 },
  { label: "水", x: 78, y: 98 },
];
const elementCycles = [
  { order: [0, 1, 2, 3, 4], type: "support", name: "相生・支える" },
  { order: [0, 2, 4, 1, 3], type: "restrain", name: "相剋・抑える" },
] as const;

function FiveElements({ id }: { id: string }) {
  return (
    <>
      <div className="study-artwork-plot">
        <Canvas height={234}>
          <defs>
            <ArrowMarker id={`${id}-support`} />
            <ArrowMarker id={`${id}-restrain`} warm />
          </defs>
          {elementCycles.map(({ order, type }) => (
            <g key={type} className={type === "support" ? "study-artwork-accent" : "study-artwork-warm study-artwork-dashed"}>
              {order.map((index, edge) => {
                const from = elementNodes[index];
                const to = elementNodes[order[(edge + 1) % order.length]];
                const distance = Math.hypot(to.x - from.x, to.y - from.y);
                const dx = (to.x - from.x) / distance;
                const dy = (to.y - from.y) / distance;
                return (
                  <line key={index} x1={from.x + 21 * dx} y1={from.y + 21 * dy} x2={to.x - 25 * dx} y2={to.y - 25 * dy}
                    markerEnd={`url(#${id}-${type})`} />
                );
              })}
            </g>
          ))}
          {elementNodes.map(({ label, x, y }) => (
            <circle key={label} cx={x} cy={y} r="17" className="study-artwork-accent study-artwork-paper" />
          ))}
        </Canvas>
        <NodeLabels nodes={elementNodes} height={234} />
      </div>
      <ul className="study-artwork-key">
        {elementCycles.map(({ type, name }) => <li key={type}><span data-edge={type} />{name}</li>)}
      </ul>
    </>
  );
}

function Meridian() {
  return (
    <>
      <div className="study-artwork-plot">
        <Canvas height={112}>
          <path d="M22 93h86c28 0 28-16 56-16h82c22 0 27 16 49 16h43" className="study-artwork-guide study-artwork-dashed" />
          <path d="M23 79h70c26 0 34-25 58-25h85c26 0 34 25 61 25h42" className="study-artwork-accent" strokeWidth="3" />
          <circle cx="57" cy="79" r="4.5" className="study-artwork-accent study-artwork-paper" />
          <circle cx="181" cy="54" r="9" className="study-artwork-warm study-artwork-paper" />
          <circle cx="306" cy="79" r="4.5" className="study-artwork-accent study-artwork-paper" />
          <path d="M181 33v12" className="study-artwork-warm" />
        </Canvas>
        <span className="study-artwork-stop">合谷 LI4</span>
      </div>
      <div className="study-artwork-line-caption">線は大腸経の道筋、丸は一つずつの経穴</div>
    </>
  );
}

const waterNodes = [{ label: "脾", x: 72, y: 86 }, { label: "肺", x: 180, y: 33 }, { label: "腎", x: 288, y: 86 }];

function Water() {
  return (
    <div className="study-artwork-plot">
      <Canvas height={142}>
        <rect x="23" y="8" width="314" height="123" rx="24" className="study-artwork-guide study-artwork-dashed" />
        <path d="M94 84h63m23-30v13m23 17h63" className="study-artwork-accent" />
        <path d="M180 69c-5 8-14 15-14 23a14 14 0 0 0 28 0c0-8-9-15-14-23Z" className="study-artwork-highlight study-artwork-accent" />
        {waterNodes.map(({ label, x, y }) => (
          <circle key={label} cx={x} cy={y} r="18" className="study-artwork-accent study-artwork-paper" />
        ))}
      </Canvas>
      <NodeLabels nodes={waterNodes} height={142} />
      <span className="study-artwork-water-caption">三焦</span>
    </div>
  );
}

const artwork = { temperature: Temperature, dawn: Dawn, "qi-blood": QiBlood, "five-elements": FiveElements, meridian: Meridian, water: Water };

export default function StudyDiagramArtwork({ kind, id }: { kind: DiagramIllustration; id: string }) {
  const Art = artwork[kind];
  return <div className="study-artwork" aria-hidden="true" data-study-illustration={kind}><Art id={id} /></div>;
}
