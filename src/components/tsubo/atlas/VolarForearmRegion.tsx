import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";

export default function VolarForearmRegion({ marker, label }: AtlasCloseUpProps) {
  return (
    <>
      <path d="M91 25q32-14 66 0c-4 74-12 139-8 190l11 42 10 26H62q-3-9 15-31l16-34c2-65-7-131-2-193Z" fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
      <path d="M108 41c-4 49 4 124 1 173m35-173c-6 69-7 126-8 173" fill="none" stroke="#D9CBB9" strokeWidth="8" strokeLinecap="round" />
      <path d="M96 29q30 9 56 0m-57 192q26 6 53 0m-55 8q23 7 56 0" fill="none" stroke="#A18D7B" strokeWidth="1.5" />
      <path d="M97 265q19-12 27-28m24 26q-8-10-8-21" fill="none" stroke="#C8AE98" strokeWidth="1.5" />
      <g fill="none" stroke="#B86A38" strokeWidth="3.5" strokeLinecap="round">
        <path d="M130 127q0 44-2 99l-1 18" />
        <path d="M113 127q1 56-2 91l-6 25" />
      </g>
      <g fill="none" strokeWidth="1.4">
        <path d={`M${marker.x} ${marker.y}L168 166h14`} stroke="#7F3520" />
        <path d="M130 135l38-38h14m-70 43-47-32H20v-10m130 126h32" stroke="#8D6B49" />
        {marker.boneCun != null && <path d={`M82 ${marker.y}H94M82 ${marker.y}V224h12`} stroke="#59756A" />}
      </g>
      <g fill="#9E4B20" stroke="#F9F5ED" strokeWidth="1.5">
        <circle cx="130" cy="135" r="8" />
        <circle cx="112" cy="140" r="8" />
      </g>
      <g fill="#FFF9F0" fontSize="11" fontWeight="bold" textAnchor="middle">
        <text x="130" y="139">1</text>
        <text x="112" y="144">2</text>
      </g>
      <g fill="#7F3520" fontSize="14" fontWeight="bold">
        <text x="186" y="102">① 長掌筋の腱</text>
        <text x="12" y="73">② 橈側手根</text>
        <text x="20" y="92">屈筋の腱</text>
        <text x="186" y="170">{label}</text>
      </g>
      <g fill="#365B4D" fontSize="13" fontWeight="bold">
        <text x="187" y="228">手首のしわ</text>
        {marker.boneCun != null && <>
          <text x="56" y="203">{marker.boneCun}寸</text>
          <text x="31" y="220" fontSize="11">（骨度法）</text>
        </>}
      </g>
      <g fill="#524637" fontSize="12">
        <text x="172" y="34">ひじ側</text>
        <text x="174" y="278">手のひら側</text>
        <text x="12" y="270">親指側</text>
      </g>
    </>
  );
}
