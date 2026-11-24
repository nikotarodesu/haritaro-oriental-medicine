import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";
import { circledLandmarkNumber, sharedAnatomyLandmarks } from "@/data/tsubo/atlas/sharedAnatomyLandmarks";

const { palmarisLongus, flexorCarpiRadialis } = sharedAnatomyLandmarks.pc6;

export function VolarForearmArtwork() {
  return (
    <>
      <path d="M91 25q32-14 66 0c-4 74-12 139-8 190l11 42 10 26H62q-3-9 15-31l16-34c2-65-7-131-2-193Z" fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
      <path d="M108 41c-4 49 4 124 1 173m35-173c-6 69-7 126-8 173" fill="none" stroke="#D9CBB9" strokeWidth="8" strokeLinecap="round" />
      <g fill="none" stroke="#A18D7B" strokeWidth="1.5">
        <path d="M96 29q30 9 56 0M93 229q23 7 56 0" />
        <path d="M95 221q26 6 53 0" data-atlas-guide-origin="" />
      </g>
      <path d="M97 265q19-12 27-28m24 26q-8-10-8-21" fill="none" stroke="#C8AE98" strokeWidth="1.5" />
      <g fill="none" stroke="#B86A38" strokeWidth="3.5" strokeLinecap="round">
        <path d="M130 109q0 55-2 117l-1 18" />
        <path d="M113 109q1 60-2 109l-6 25" />
      </g>
    </>
  );
}

export default function VolarForearmRegion({ marker, label, labelled }: AtlasCloseUpProps) {
  return (
    <>
      <VolarForearmArtwork />
      {labelled && <path d="M95 221q26 6 53 0" fill="none" stroke="#8D6654" strokeWidth="2" />}
      {!labelled && <>
        <g fill="none" strokeWidth="1.4">
          <path d={`M${marker.x} ${marker.y}L168 166h14`} stroke="#7F3520" />
          <path d="M130 116l38-19h14M113 119l-48-11H20v-10m130 126h32" stroke="#8D6B49" />
        </g>
        <g fill="#9E4B20" stroke="#F9F5ED" strokeWidth="1.5">
          <circle cx="130" cy="116" r="8" />
          <circle cx="113" cy="119" r="8" />
        </g>
        <g fill="#FFF9F0" fontSize="11" fontWeight="bold" textAnchor="middle">
          <text x="130" y="120">{palmarisLongus.number}</text>
          <text x="113" y="123">{flexorCarpiRadialis.number}</text>
        </g>
        <g fill="#7F3520" fontSize="14" fontWeight="bold">
          <text x="186" y="102" data-landmark-number={palmarisLongus.number}>{circledLandmarkNumber(palmarisLongus.number)} {palmarisLongus.name}</text>
          <text x="12" y="73" data-landmark-number={flexorCarpiRadialis.number}>
            {circledLandmarkNumber(flexorCarpiRadialis.number)} {flexorCarpiRadialis.name.slice(0, 4)}
            <tspan x="20" y="92">{flexorCarpiRadialis.name.slice(4)}</tspan>
          </text>
          <text x="186" y="170">{label}</text>
        </g>
        <text x="187" y="228" fill="#365B4D" fontSize="13" fontWeight="bold">手首のしわ</text>
        <g fill="#524637" fontSize="12">
          <text x="172" y="34">ひじ側</text>
          <text x="174" y="278">手のひら側</text>
          <text x="12" y="270">親指側</text>
        </g>
      </>}
    </>
  );
}
