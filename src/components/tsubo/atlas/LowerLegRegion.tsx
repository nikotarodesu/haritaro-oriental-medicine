import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";

const kneeLandmark = { x: 116, y: 88 };
const ankleLandmark = { x: 124, y: 248 };

export default function LowerLegRegion({ marker, label }: AtlasCloseUpProps) {
  return (
    <>
      <path
        d="M105 35 C97 50 93 65 95 88 C92 110 91 134 96 154 C100 178 105 201 106 228
           C106 239 102 250 95 259 C87 268 85 275 91 279 C95 282 102 283 108 281
           C114 284 120 283 125 281 C132 284 142 282 145 277 C149 270 145 259 141 251
           C137 242 138 230 142 216 C149 196 160 168 165 144 C171 120 169 98 163 85
           C164 65 160 50 156 35 Z"
        fill="#F4E8D8"
        stroke="#9B8D7D"
        strokeWidth="2"
      />
      <path
        d="M105 36 Q131 31 156 36 M110 60 Q133 52 156 60
           M98 278 Q99 272 104 272 M111 281 Q111 274 116 273 M126 281 Q125 274 130 270"
        fill="none"
        stroke="#C6B7A4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M108 100 C100 104 99 117 102 139 C107 169 112 198 114 225
           L119 236 C120 207 117 178 114 150 C112 130 117 117 116 106 Z"
        fill="#E8DCCA"
        stroke="#C6B7A4"
        strokeWidth="1.5"
      />
      <path
        d="M119 93 C110 110 107 131 112 154 C116 177 119 196 123 218
           Q126 233 123 247 L128 246 Q133 232 130 213 C127 186 123 163 125 139
           C126 119 128 103 124 98 Z"
        fill="#DDE4CF"
        stroke="#A6AA8E"
        strokeWidth="1.5"
      />
      <path
        d="M125 94 Q134 89 150 93 Q156 100 151 110 C148 135 145 162 141 186
           C139 207 135 223 137 239 Q133 245 128 241 C125 231 130 215 130 196
           C131 165 129 143 129 118 Q128 108 123 103 Z"
        fill="#E9BD9A"
        stroke="#B86A38"
        strokeWidth="2"
      />
      <path
        d="M130 107 C134 126 133 155 134 178 Q135 203 131 227"
        fill="none"
        stroke="#9E4B20"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M129 74 Q132 79 138 78 L138 102 Q135 107 130 103 Z"
        fill="#F4ECDD"
        stroke="#B9AB98"
        strokeWidth="1.5"
      />
      <path
        d="M120 65 Q121 54 132 53 Q145 52 149 64 Q148 72 136 82
           Q126 77 120 65 Z"
        fill="#E9BD9A"
        stroke="#B86A38"
        strokeWidth="2"
      />

      <g fill="none" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <line
          x1={kneeLandmark.x}
          y1={kneeLandmark.y}
          x2={ankleLandmark.x}
          y2={ankleLandmark.y}
          stroke="#757A6B"
          strokeDasharray="3 5"
        />
        <path d="M85 72 H98 L113 86 M128 248 H196 L205 248" stroke="#877E72" />
        <path d="M146 65 H192 L205 54 M149 144 H186 L203 134" stroke="#9E4B20" />
        <path d="M134 173 H196 M119 203 H196 L204 197" stroke="#877E72" />
        <path d={`M${marker.x} ${marker.y}L168 103h31`} stroke="#7F3520" />
        {marker.boneCun != null && (
          <path
            d={`M92 ${kneeLandmark.y} H98 V${marker.y} H92 M98 ${marker.y} H${marker.x - 9}`}
            stroke="#9E4B20"
          />
        )}
      </g>

      <g fill="#FAF6EE" stroke="#686D60" strokeWidth="1.5">
        <circle cx={kneeLandmark.x} cy={kneeLandmark.y} r="3" />
        <circle cx={ankleLandmark.x} cy={ankleLandmark.y} r="3" />
      </g>
      <g fill="#9E4B20">
        <circle cx="133" cy="65" r="8" />
        <circle cx="141" cy="144" r="8" />
      </g>
      <g fill="white" fontSize="10" fontWeight="700" textAnchor="middle">
        <text x="133" y="68.5">1</text>
        <text x="141" y="147.5">2</text>
      </g>

      <g fill="#51463B" fontSize="11">
        <text x="25" y="23">脚の外側 ←</text>
        <text x="194" y="23">→ 体の中心側</text>
        <text x="83" y="70" textAnchor="end">ひざの外側の</text>
        <text x="83" y="84" textAnchor="end">くぼみ（ST35）</text>
        <text x="206" y="177">すねの前の稜</text>
        <text x="206" y="201">前脛骨筋</text>
        <text x="206" y="216">つま先を上げる筋肉</text>
        <text x="209" y="251">足首の前（ST41）</text>
        <text x="206" y="275">右脚を正面から見た図</text>
      </g>
      <g fill="#7F3520" fontSize="12" fontWeight="700">
        <text x="208" y="57">① 膝蓋骨</text>
        <text x="208" y="72" fontSize="11" fontWeight="400">ひざのお皿</text>
        <text x="207" y="137">② 脛骨</text>
        <text x="207" y="152" fontSize="11" fontWeight="400">すねの骨</text>
        <text x="207" y="108" fontSize="14">{label}</text>
        {marker.boneCun != null && (
          <text x="89" y="107" textAnchor="end">{marker.boneCun}寸（骨度法）</text>
        )}
      </g>
    </>
  );
}
