import { achillesSideOutline, footSideOutline, medialFootLandmarks } from "@/data/tsubo/atlas/footLandmarks";
import { comparisonTransforms, type NearbyComparison } from "@/data/tsubo/atlas/nearbyComparisons";
import { armViews } from "./expanded/armViews";
import { headViews } from "./expanded/headViews";

const handAndWrist = "M66 136Q107 134 151 136L146 226Q145 237 147 248Q155 267 154 283L154 300Q154 308 149 309Q143 310 142 303L139 283L140 316Q140 323 134 324Q128 325 127 317L124 283V324Q124 332 118 332Q112 332 111 323L110 283L108 316Q108 323 102 323Q96 323 95 316V283Q96 277 91 273L83 286Q78 292 73 289Q68 286 71 278L78 258Q83 245 76 232L68 180Z";

function transformFor(view: keyof typeof comparisonTransforms) {
  const { x, y, scaleX, scaleY } = comparisonTransforms[view];
  return `translate(${x} ${y}) scale(${scaleX} ${scaleY})`;
}

function EarOutline() {
  const { ear, tragus, upperTragusNotch, jawSide } = headViews.profile.features;

  return (
    <g transform={transformFor("ear")}>
      <path className="atlas-comparison-outline" d={ear.path} />
      <path className="atlas-comparison-landmark" d={`${tragus.path} ${upperTragusNotch.path}`} />
      <path className="atlas-comparison-detail" d="M130 123Q143 114 150 123Q157 133 145 145M129 144Q135 136 142 140" />
      <path className="atlas-comparison-detail" d={jawSide.path} />
    </g>
  );
}

function WristOutline({ side }: { side: "palm" | "back" }) {
  const palm = side === "palm";
  const crease = palm ? armViews.forearmPalm.features.wristCrease.path : armViews.forearmBack.features.wristBack.path;

  return (
    <g transform={transformFor(side)}>
      <path className="atlas-comparison-outline" d={handAndWrist} />
      {palm ? (
        <path className="atlas-comparison-landmark" d="M104 142Q108 182 108 204T107 243M125 142Q121 178 122 205T123 243" />
      ) : (
        <>
          <path className="atlas-comparison-landmark" d="M84 142L91 219Q93 236 88 238M139 142L140 237" />
          <path className="atlas-comparison-detail" d="M106 171Q111 211 110 266" />
        </>
      )}
      <path className="atlas-comparison-crease" d={crease} />
    </g>
  );
}

function WristArtwork() {
  return (
    <>
      <text x="85" y="28" textAnchor="middle">手のひら側</text>
      <text x="257" y="28" textAnchor="middle">手の甲側</text>
      <path className="atlas-comparison-divider" d="M172 19V197" />
      <WristOutline side="palm" />
      <WristOutline side="back" />
    </>
  );
}

function AnkleArtwork() {
  const { x, y } = medialFootLandmarks.malleolus;
  return (
    <>
      <g transform={transformFor("ankle")}>
        <path className="atlas-comparison-outline" d={footSideOutline} />
        <path className="atlas-comparison-landmark" d={achillesSideOutline} />
        <path className="atlas-comparison-detail" d="M115 75Q119 108 142 139L160 158" />
        <circle className="atlas-comparison-bone" cx={x} cy={y} r="7" />
      </g>
      <text x="151" y="20" textAnchor="middle">内くるぶし</text>
      <path className="atlas-comparison-landmark" d="M151 26V71" />
      <text x="44" y="170">かかと側</text>
      <text x="310" y="191" textAnchor="end">つま先側</text>
    </>
  );
}

export default function NearbyComparisonArtwork({ id }: { id: NearbyComparison["id"] }) {
  if (id === "ear") return <EarOutline />;
  if (id === "wrist") return <WristArtwork />;
  return <AnkleArtwork />;
}
