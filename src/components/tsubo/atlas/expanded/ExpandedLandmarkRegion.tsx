import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";
import type { ExpandedView } from "@/data/tsubo/atlas/expanded/types";
import { armViews } from "./armViews";
import { backViews } from "./backViews";
import { headViews } from "./headViews";
import { trunkViews } from "./trunkViews";
import type { Feature, View } from "./views";

export const expandedViews: Readonly<Record<ExpandedView, View>> = {
  ...headViews,
  ...armViews,
  ...trunkViews,
  ...backViews,
};

function FeaturePath({ feature, active = false }: { feature: Feature; active?: boolean }) {
  const colors = {
    bone: active ? "#C26D3C" : "#CBC0AC",
    soft: active ? "#8D6654" : "#D5BAAB",
    guide: active ? "#76604A" : "#B9AD98",
  };

  return (
    <path
      d={feature.path}
      stroke={colors[feature.kind]}
      strokeWidth={feature.kind === "bone" ? (active ? 3.7 : 2.4) : (active ? 2.2 : 1.3)}
      strokeDasharray={feature.kind === "guide" ? "4 4" : undefined}
    />
  );
}

export default function ExpandedLandmarkRegion({ marker, label, measured }: AtlasCloseUpProps) {
  const point = marker.expanded;
  if (!point) return null;

  const view = expandedViews[point.view];
  const picked = point.landmarks.map((id) => view.features[id]);

  return (
    <>
      <path data-anatomy-outline="" d={view.outline} fill="#F3E2D2" stroke="#AA8B74" strokeWidth="1.6" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {view.details.map((path) => <path key={path} d={path} stroke="#D4AB96" strokeWidth="1.5" />)}
        {Object.entries(view.features).filter(([id]) => !point.landmarks.includes(id)).map(([id, feature]) => (
          <FeaturePath key={id} feature={feature} />
        ))}
        {picked.map((feature) => <FeaturePath key={feature.name} feature={feature} active />)}
        {!measured && point.measurement && (
          <path d={point.measurement} stroke="#8D6654" strokeWidth="1.4" strokeDasharray="3 3" />
        )}
      </g>

      <g fontSize="10" fontWeight="bold" textAnchor="middle">
        {picked.map(({ name, position }, index) => (
          <g key={name} transform={`translate(${position[0]} ${position[1]})`}>
            <circle r="7.5" fill="#8C4A2C" stroke="#F9F5ED" strokeWidth="1.2" />
            <text y="3.5" fill="white">{index + 1}</text>
          </g>
        ))}
      </g>

      <g fill="#3B3229" fontSize="10.5">
        <text x="209" y="56" fontWeight="bold" fontSize="11">{view.name}</text>
        {picked.map(({ name }, index) => (
          <g key={name} transform={`translate(215 ${84 + index * 37})`}>
            <circle r="7.5" fill="#8C4A2C" />
            <text y="3.5" fill="white" fontWeight="bold" textAnchor="middle">{index + 1}</text>
            {name.split("／").flatMap((part) => part.match(/.{1,10}/gu) ?? [])
              .map((line, row) => <text key={row} x="12" y={4 + row * 13}>{line}</text>)}
          </g>
        ))}
        <circle cx="215" cy="175" r="4.5" fill="#7F3520" />
        <text x="226" y="179" fontWeight="bold" fontSize="12">{label}</text>
        <text x="209" y="223" fill="#685745">位置関係を示す模式図</text>
      </g>
    </>
  );
}
