import { heguLandmarkLabels } from "@/data/tsubo/atlas/regionalLandmarkLabels";
import { whoLocations } from "@/data/tsubo/atlas/whoLocations";
import LandmarkCloseUp from "./LandmarkCloseUp";

// The hand template's landmarks use the same coordinate space as its outline.
const handDorsum = {
  indexBase: { x: 111, y: 231 },
  indexKnuckle: { x: 103, y: 126 },
  thumbBase: { x: 83, y: 215 },
  thumbKnuckle: { x: 58, y: 160 },
};

// LI4 is on the thumb side of the midpoint of the second metacarpal (WHO p. 35).
const indexMidpoint = {
  x: (handDorsum.indexBase.x + handDorsum.indexKnuckle.x) / 2,
  y: (handDorsum.indexBase.y + handDorsum.indexKnuckle.y) / 2,
};

const marker = { x: indexMidpoint.x - 14, y: indexMidpoint.y + 1 };
const indexBone = `M${handDorsum.indexBase.x} ${handDorsum.indexBase.y}L${handDorsum.indexKnuckle.x} ${handDorsum.indexKnuckle.y}`;
const directionArrow = `M${indexMidpoint.x + 8} ${indexMidpoint.y - 18}H${marker.x - 14}m9-7-9 7 9 7`;

export default function HeguHandDiagram({ thumbnail = false }: { thumbnail?: boolean }) {
  const hand = (
    <>
      <path d="M88 257l-7-32-15-31-28-35-12-21c-5-9 7-19 15-11l18 14 25 27 1-42-4-66c-1-12 15-16 18-3l9 63-4-91c0-13 16-16 20-2l8 91 6-82c1-12 17-11 17 2l-1 86 10-56c2-11 16-9 16 3l-5 85c-1 38-9 64-14 101z" fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" strokeLinejoin="round" />
      <path d="M103 142c-6 13-11 23-20 27l-15 1 17 29 21 24z" fill="#E6C7B0" />
      <g fill="none" stroke="#C6B7A4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
        <path d="M125 228l3-105-4-30-3-31-5-30M138 229l12-102v-29l-2-29 1-25M150 231l17-82 3-24 2-25 1-21" />
      </g>
      <g fill="none" stroke="#B86A38" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
        <path d={`${indexBone}l-4-28-4-19-2-18`} />
        <path d={`M${handDorsum.thumbBase.x} ${handDorsum.thumbBase.y}L${handDorsum.thumbKnuckle.x} ${handDorsum.thumbKnuckle.y}l-13-15-11-11`} />
      </g>
      <g fill="#F9F5ED" stroke="#B86A38" strokeWidth="2">
        <circle cx="99" cy="98" r="3.5" />
        <circle cx="103" cy="126" r="3.5" />
        <circle cx="45" cy="145" r="3.5" />
        <circle cx="58" cy="160" r="3.5" />
      </g>
      {!thumbnail && <>
        <circle cx={indexMidpoint.x} cy={indexMidpoint.y} r="3" fill="#F9F5ED" />
        <path d={`M${indexMidpoint.x} ${indexMidpoint.y}L${marker.x} ${marker.y}`} fill="none" stroke="#7F3520" strokeWidth="1.5" strokeLinecap="round" data-atlas-guide-route="" />
        <g data-atlas-guide-direction-overlay="" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={directionArrow} stroke="#FFF9F0" strokeWidth="8" />
          <path d={directionArrow} stroke="#086457" strokeWidth="4" />
        </g>
        <g data-atlas-guide-origin-overlay="" aria-hidden="true">
          <path d={indexBone} data-atlas-guide-origin="" fill="none" strokeLinecap="round" />
          <circle cx={indexMidpoint.x} cy={indexMidpoint.y} r="6" data-atlas-guide-origin="" fill="#FFF9F0" />
        </g>
      </>}
    </>
  );

  if (!thumbnail) {
    return (
      <LandmarkCloseUp marker={marker} pointLabel="合谷 LI4" landmarks={heguLandmarkLabels} numbered description={`合谷 LI4。右手の甲。${whoLocations.li4}`}>
        {hand}
      </LandmarkCloseUp>
    );
  }

  return (
    <svg viewBox="12 10 186 255" role="img" aria-label="手の甲の合谷。人差し指につながる骨の中央から、少し親指側にあります。" className="platform-hand">
      {hand}
      <circle cx={marker.x} cy={marker.y} r="6" fill="#7F3520" stroke="#FFF9F0" strokeWidth="2" />
    </svg>
  );
}
