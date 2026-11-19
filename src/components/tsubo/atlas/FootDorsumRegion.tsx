import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";

export default function FootDorsumRegion({ marker, label }: AtlasCloseUpProps) {
  return (
    <>
      <path
        d="M94 284c4-24 7-46 1-70-7-30-28-51-40-73-8-16-13-27-15-45-2-22-5-43 0-62 4-15 16-22 28-20 12 1 20 12 21 27 2 17-4 34 0 50 2 5 6 9 11 10 6-13 1-30 1-45-1-18 1-37 9-45 9-9 22-6 26 4 6 14 2 33 0 49-1 13-2 25 2 35 5-11 7-30 8-44 1-17 8-27 18-25 11 2 13 13 11 28l-7 44c9-8 13-26 16-39 5-14 15-19 23-13 8 7 4 21-1 33l-9 29c8-4 11-15 17-20 8-7 19-3 21 7 3 13-8 30-16 44-12 19-20 44-27 67-7 24-11 49-12 74Z"
        fill="#F4E8D8"
        stroke="#9B8D7D"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M105 251c18-9 47-9 67 0" fill="none" stroke="#D7C8B6" strokeWidth="2" strokeLinecap="round" />

      <g fill="none" stroke="#C6B7A4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M149 202c14-32 15-60 10-91M164 209c19-29 25-58 24-86M178 217c21-26 30-49 32-70" strokeWidth="8" />
        <path d="M160 102l2-22m1-9 1-10m1-8 1-13m25 73 5-19m2-8 2-7m2-8 3-8m8 77 6-13m3-7 3-5" strokeWidth="6" />
      </g>

      <g fill="none" stroke="#B86A38" strokeLinecap="round" strokeLinejoin="round">
        <path data-foot-landmark="first-metatarsal" d="M120 199C101 174 96 138 77 107" strokeWidth="8" />
        <path data-foot-landmark="second-metatarsal" d="M133 200C145 168 121 140 121 107" strokeWidth="8" />
        <path d="M73 93l-7-25m-3-13V32m57 63V74m0-11 1-13m1-10 1-19" strokeWidth="8" />
      </g>

      <path d="M126 195v7l76 29h24" fill="none" stroke="#82725B" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
      <path
        d={`M139 253C129 232 132 203 127 189Q124 181 ${marker.x} ${marker.y}Q115 142 102 114`}
        fill="none"
        stroke="#99524C"
        strokeWidth="1.7"
        strokeDasharray="2 3"
        strokeLinecap="round"
      />
      <path d={`M${marker.x} ${marker.y}L207 164h19`} fill="none" stroke="#7F3520" strokeWidth="1.5" strokeLinecap="round" />

      <g fill="#9E4B20" stroke="#F9F5ED" strokeWidth="1.5">
        <circle cx="85" cy="121" r="9" />
        <circle cx="123" cy="121" r="9" />
      </g>
      <g fill="#FFF9F0" fontSize="12" fontWeight="bold" textAnchor="middle">
        <text x="85" y="125">1</text>
        <text x="123" y="125">2</text>
      </g>

      <g fill="#7F3520" fontSize="13" fontWeight="bold">
        <text x="210" y="37">① 親指につながる骨</text>
        <text x="210" y="75">② 第2趾につながる骨</text>
        <text x="231" y="162">{label}</text>
      </g>
      <g fill="#524637" fontSize="12">
        <text x="215" y="19">↑ 指先側</text>
        <text x="241" y="54">第1中足骨</text>
        <text x="241" y="92">第2中足骨</text>
        <text x="231" y="181">指先側のくぼみ</text>
        <text x="231" y="234">2本の骨の根元</text>
        <text x="231" y="250">が近づく所</text>
        <path d="M212 269h14" stroke="#99524C" strokeWidth="1.7" strokeDasharray="2 3" strokeLinecap="round" />
        <text x="231" y="273">足の甲の動脈</text>
        <text x="215" y="290">↓ 足首側</text>
      </g>
    </>
  );
}
