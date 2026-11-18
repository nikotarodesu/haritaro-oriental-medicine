import type { ReactNode } from "react";
import type { AcupointMaster } from "@/data/tsubo/types";
import type { AcupointAtlasArticle, AtlasMarker, AtlasRegion } from "@/data/tsubo/atlas/types";
import FootDorsumRegion from "./FootDorsumRegion";
import LowerLegRegion from "./LowerLegRegion";
import VolarForearmRegion from "./VolarForearmRegion";

const figureClass = "rounded-2xl border border-[#E5DEC9] bg-[#F9F5ED] p-4 text-[#332D25]";
const captionClass = "mt-2 text-center text-sm font-semibold leading-6";

const regions = {
  volarForearm: { BodyHighlight: <path d="M43 119L32 145m125-26 11 26" />, CloseUp: VolarForearmRegion },
  volarWrist: { BodyHighlight: <path d="M34 148l6 3m120 0 6-3" />, CloseUp: VolarForearmRegion },
  anterolateralLowerLeg: { BodyHighlight: <path d="M81 202l1 15m37-15-1 15" />, CloseUp: LowerLegRegion },
  footDorsum: { BodyHighlight: <path d="M90 253l1 6m19-6-1 6" />, CloseUp: FootDorsumRegion },
} satisfies Record<AtlasRegion, { BodyHighlight: ReactNode; CloseUp: typeof VolarForearmRegion }>;

export default function PointAtlasDiagrams({ point, meridianPoints, illustration, marker }: {
  point: AcupointMaster;
  meridianPoints: readonly AcupointMaster[];
  illustration: AcupointAtlasArticle["illustration"];
  marker: AtlasMarker;
}) {
  const { BodyHighlight, CloseUp } = regions[illustration.region];
  const nearby = meridianPoints.filter(({ meridianOrder }) =>
    meridianOrder >= illustration.meridianStart && meridianOrder <= illustration.meridianEnd
  );
  const lineLength = 300;
  const step = lineLength / Math.max(nearby.length - 1, 1);

  return (
    <div id="acupoint-diagram" className="grid scroll-mt-28 gap-4 md:grid-cols-[1fr_1.55fr]">
      <figure className={figureClass}>
        <svg viewBox="0 0 200 272" role="img" aria-label={`全身正面のシルエット。${illustration.bodyLabel}をオレンジで示しています。`} className="mx-auto block max-h-64 w-full">
          <circle cx="100" cy="32" r="19" fill="#D8D5C9" />
          <g fill="#D8D5C9" stroke="#857E70" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M85 53h30l27 16 11 39 17 40-16 8-23-38-8-21 3 49-3 50-5 57h-16l-2-97-5 97H79l-5-57-3-50 4-49-8 21-23 38-16-8 17-40 11-39z" />
            <path d="M29 144l16 8-5 16-7 7-10-7 1-11zM155 152l16-8 5 13 1 11-10 7-7-7zM79 247h16l-1 15H70q-1-7 9-15Zm23 0h16q11 8 10 15h-25Z" />
          </g>
          <g fill="none" stroke="#9E4B20" strokeWidth="8" strokeLinecap="round">{BodyHighlight}</g>
        </svg>
        <figcaption className={captionClass}>全身で見る · {illustration.bodyLabel}</figcaption>
      </figure>

      <figure className={figureClass}>
        <svg viewBox="0 0 340 300" role="img" aria-label={illustration.closeUpAlt} className="mx-auto block w-full max-w-[340px]">
          <CloseUp marker={marker} label={`${point.name} ${point.code}`} />
          <circle cx={marker.x} cy={marker.y} r="6" fill="#7F3520" stroke="#FFF9F0" strokeWidth="2" />
        </svg>
        <figcaption className={captionClass}>{illustration.closeUpCaption}</figcaption>
      </figure>

      <figure className={`${figureClass} md:col-span-2`}>
        <svg viewBox="0 0 360 108" role="img" aria-label={`${point.meridian}。 ${nearby.map((entry) => `${entry.code} ${entry.name}`).join("、")}の順で、${point.name}を強調しています。`} className="mx-auto block w-full max-w-md">
          <path d="M30 44H330" stroke="#A69B87" strokeWidth="2" />
          {nearby.map((entry, index) => {
            const isCurrent = entry.code === point.code;
            return (
              <g key={entry.code} transform={`translate(${30 + step * index} 44)`}>
                <circle r={isCurrent ? 10 : 5} fill={isCurrent ? "#9E4B20" : "#F9F5ED"} stroke={isCurrent ? "#7F3520" : "#82725B"} strokeWidth="2" />
                <text textAnchor="middle" y="30" fontSize="13" fill="#332D25" fontWeight={isCurrent ? "bold" : "normal"}>{entry.name}</text>
                <text textAnchor="middle" y="48" fontSize="11" fill="#524637">{entry.code}</text>
              </g>
            );
          })}
        </svg>
        <figcaption className={`text-center text-sm font-semibold leading-6`}>
          {point.meridian}の順序 · {illustration.meridianCaption}
        </figcaption>
      </figure>
    </div>
  );
}
