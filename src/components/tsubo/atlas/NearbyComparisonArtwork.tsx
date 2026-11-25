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

function ShoulderArtwork() {
  const { outline, details, features } = armViews.shoulderSide;

  return (
    <>
      <g transform={transformFor("shoulder")}>
        <path className="atlas-comparison-outline" d={outline} />
        {details.map(path => <path key={path} className="atlas-comparison-detail" d={path} />)}
        <path className="atlas-comparison-detail" d={`${features.collarSide.path} ${features.shoulderSpine.path}`} />
        <path className="atlas-comparison-landmark" d={features.acromionSide.path} />
        <path className="atlas-comparison-landmark" d={features.upperHead.path} />
      </g>
      <text x="20" y="28">胸側</text>
      <text x="324" y="28" textAnchor="end">背中側</text>
      <path className="atlas-comparison-detail" d="M226 108l21-31h14" />
      <text x="266" y="82">肩峰</text>
    </>
  );
}

function ElbowArtwork() {
  const { outline, features } = armViews.forearmPalm;

  return (
    <>
      <g transform={transformFor("elbow")}>
        <path className="atlas-comparison-outline" d={outline} />
        <path className="atlas-comparison-landmark" d={features.outerElbow.path} />
        <path className="atlas-comparison-detail" d={features.innerElbow.path} />
        <path className="atlas-comparison-crease" d={features.elbowCrease.path} />
        <path className="atlas-comparison-landmark" d={features.bicepsTendon.path} />
      </g>
      <text x="20" y="28">親指側</text>
      <text x="324" y="28" textAnchor="end">小指側</text>
      <path className="atlas-comparison-detail" d="M151 82l21-34V34" />
      <text x="172" y="28" textAnchor="middle">力こぶの腱</text>
    </>
  );
}

function MedialKneeArtwork() {
  return (
    <>
      <text x="20" y="25">ひざの前側</text>
      <text x="324" y="25" textAnchor="end">ひざ裏側</text>
      <path className="atlas-comparison-outline" d="M118 39H219C227 64 221 86 224 108Q226 127 239 141Q220 151 218 162Q233 197 226 244H119Q124 214 117 186Q112 162 104 148Q97 135 108 121Q121 101 118 39Z" />
      <path className="atlas-comparison-detail" d="M130 50Q149 56 153 76Q159 97 134 119M173 47Q183 79 167 102" />
      <path className="atlas-comparison-bone" d="M114 122Q121 119 130 125Q134 136 120 149Q109 145 109 133Z" />
      <path className="atlas-comparison-bone" d="M144 151Q161 139 178 144Q189 149 181 158L167 166Q159 194 157 244H138Q140 209 134 176Q134 161 144 151Z" />
      <path className="atlas-comparison-landmark" d="M206 58Q205 100 220 136M215 58Q214 98 228 138" />
      <path className="atlas-comparison-crease" d="M207 139Q221 145 239 141" />
      <path className="atlas-comparison-detail" d="M79 132H105M216 104L244 94H257M82 229H133" />
      <text x="15" y="137">お皿</text>
      <text x="329" y="98" textAnchor="end">太もも裏の腱</text>
      <text x="15" y="234">すねの骨</text>
    </>
  );
}

export default function NearbyComparisonArtwork({ id }: { id: NearbyComparison["id"] }) {
  if (id === "ear") return <EarOutline />;
  if (id === "wrist") return <WristArtwork />;
  if (id === "shin") return <ShinArtwork />;
  if (id === "forearm") return <ForearmArtwork />;
  if (id === "shoulder") return <ShoulderArtwork />;
  if (id === "elbow") return <ElbowArtwork />;
  if (id === "medial-knee") return <MedialKneeArtwork />;
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
