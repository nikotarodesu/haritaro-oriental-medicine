import { achillesSideOutline, footSideOutline, medialFootLandmarks } from "@/data/tsubo/atlas/footLandmarks";
import { shinEndpoints } from "@/data/tsubo/atlas/legLandmarks";
import { volarForearmGeometry } from "@/data/tsubo/atlas/markers";
import { comparisonTransforms, type NearbyComparison } from "@/data/tsubo/atlas/nearbyComparisons";
import { LowerLegArtwork } from "./LowerLegRegion";
import { VolarForearmArtwork } from "./VolarForearmRegion";
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

function ShinArtwork() {
  const { knee, ankle } = shinEndpoints;
  const { x, y } = comparisonTransforms.shin;
  const marks = Array.from({ length: 15 }, (_, index) => {
    const fraction = (index + 1) / 16;
    const markX = knee.x + (ankle.x - knee.x) * fraction;
    const markY = knee.y + (ankle.y - knee.y) * fraction;
    return `M${markX - 2.5} ${markY}h5`;
  }).join(" ");

  return (
    <>
      <g transform={transformFor("shin")}>
        <LowerLegArtwork />
        <path className="atlas-comparison-landmark" d={`M${knee.x} ${knee.y}L${ankle.x} ${ankle.y} ${marks}`} />
        <circle className="atlas-comparison-bone" cx={knee.x} cy={knee.y} r="4.5" data-comparison-reference="st35" />
        <circle className="atlas-comparison-bone" cx={ankle.x} cy={ankle.y} r="4.5" data-comparison-reference="st41" />
      </g>
      <path className="atlas-comparison-detail" d={`M132 62H149L${knee.x + x - 5} ${knee.y + y}M${ankle.x + x + 5} ${ankle.y + y}H211`} />
      <text x="18" y="45">ひざ下のくぼみ</text>
      <text x="18" y="63">犢鼻（ST35）</text>
      <text x="321" y="231" textAnchor="end">足首の前の中央</text>
      <text x="321" y="249" textAnchor="end">解谿（ST41）</text>
    </>
  );
}

export default function NearbyComparisonArtwork({ id }: { id: NearbyComparison["id"] }) {
  if (id === "ear") return <EarOutline />;
  if (id === "wrist") return <WristArtwork />;
  if (id === "shin") return <ShinArtwork />;
  if (id === "forearm") return <ForearmArtwork />;
  return <AnkleArtwork />;
}

function ForearmArtwork() {
  const { x, elbowY, wristY, units } = volarForearmGeometry;
  const step = (wristY - elbowY) / units;
  const marks = Array.from({ length: units - 1 }, (_, index) => `M${x - 2.5} ${elbowY + (index + 1) * step}h5`).join(" ");
  const axisX = x + comparisonTransforms.forearm.x;

  return (
    <>
      <g transform={transformFor("forearm")}>
        <VolarForearmArtwork />
        <path className="atlas-comparison-landmark" d={`M${x} ${elbowY}V${wristY} ${marks}`} />
        <circle className="atlas-comparison-bone" cx={x} cy={elbowY} r="4.5" data-comparison-reference="elbow" />
        <circle className="atlas-comparison-bone" cx={x} cy={wristY} r="4.5" data-comparison-reference="wrist" />
      </g>
      <path className="atlas-comparison-detail" d={`M${axisX + 5} ${elbowY}H208M${axisX + 5} ${wristY}H208`} />
      <text x="216" y={elbowY + 5}>ひじのしわ</text>
      <text x="216" y={wristY + 5}>手首のしわ</text>
    </>
  );
}
