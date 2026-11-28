import type { ReactNode } from "react";
import type { AcupointMaster } from "@/data/tsubo/types";

import { AtlasLocationDiagram, AtlasLocationFigure, AtlasLocationSupplement } from "./atlas/AtlasLocationFigures";
import AtlasLandmarkGuide from "./atlas/AtlasLandmarkGuide";
import HeguHandDiagram from "./atlas/HeguHandDiagram";

export default function AcupointAtlasDiagrams({ point }: { point: AcupointMaster }) {
  if (point.codeLower !== "li4") return null;

  return (
    <AtlasLocationFigure>
      <figure className="atlas-figure atlas-figure--labelled">
        <AtlasLandmarkGuide code="li4" controlsFirst>
          <AtlasLocationDiagram pointName={point.name}>
            <HeguHandDiagram />
          </AtlasLocationDiagram>
        </AtlasLandmarkGuide>
        <figcaption>右手の甲</figcaption>
      </figure>
    </AtlasLocationFigure>
  );
}

export function AcupointAtlasLocationSupplement({ point, meridianPoints, children }: {
  point: AcupointMaster;
  meridianPoints: readonly AcupointMaster[];
  children?: ReactNode;
}) {
  if (point.codeLower !== "li4") return null;
  const nearby = meridianPoints.slice(0, 6);

  return (
    <AtlasLocationSupplement notes={children}>
      <figure className="atlas-figure atlas-figure--overview">
        <svg viewBox="0 0 200 272" role="img" aria-label="全身正面のシルエット。左右の手をオレンジで囲んでいます。" className="mx-auto block max-h-64 w-full">
          <circle cx="100" cy="32" r="19" fill="#D8D5C9" />
          <path d="M85 53h30l27 16 11 39 17 40-16 8-23-38-8-21 3 49-3 50-5 57h-16l-2-97-5 97H79l-5-57-3-50 4-49-8 21-23 38-16-8 17-40 11-39z" fill="#D8D5C9" stroke="#857E70" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M29 144l16 8-5 16-7 7-10-7 1-11zM155 152l16-8 5 13 1 11-10 7-7-7z" fill="#F1B78A" stroke="#9E4B20" strokeWidth="2" strokeLinejoin="round" />
          <path d="M21 156H8m171 0h13" stroke="#9E4B20" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <figcaption>全身正面 · 左右の手</figcaption>
      </figure>

      <figure className="atlas-figure atlas-figure--meridian">
        <svg viewBox="0 0 360 108" role="img" aria-label={`${point.meridian}。${nearby.map((entry) => `${entry.code} ${entry.name}`).join("、")}の順で、${point.name}を強調しています。`} className="mx-auto block w-full max-w-md">
          <path d="M30 44H330" stroke="#A69B87" strokeWidth="2" />
          {nearby.map((entry, index) => {
            const isCurrent = entry.code === point.code;
            return (
              <g key={entry.code} transform={`translate(${30 + 60 * index} 44)`}>
                <circle r={isCurrent ? 10 : 5} fill={isCurrent ? "#9E4B20" : "#F9F5ED"} stroke={isCurrent ? "#7F3520" : "#82725B"} strokeWidth="2" />
                <text textAnchor="middle" y="30" fontSize="13" fill="#332D25" fontWeight={isCurrent ? "bold" : "normal"}>{entry.name}</text>
                <text textAnchor="middle" y="48" fontSize="11" fill="#524637">{entry.code}</text>
              </g>
            );
          })}
        </svg>
        <figcaption>{point.meridian}の順序 · 人差し指から前腕まで</figcaption>
      </figure>
    </AtlasLocationSupplement>
  );
}
