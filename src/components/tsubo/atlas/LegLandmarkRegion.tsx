import { legLandmarks, lateralAnkleY, medialAnkleY, medialCalf, poplitealY, posteriorKnee, soleEndpoints, type LegCode } from "@/data/tsubo/atlas/legLandmarks";
import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";

function Badge({ x, y, number }: { x: number; y: number; number: number }) {
  return <g><circle cx={x} cy={y} r="8" fill="#9E4B20" stroke="#FFF9F0" /><text x={x} y={y + 3.5} textAnchor="middle" fill="white" fontWeight="bold" fontSize="10">{number}</text></g>;
}

function Knee({ code }: { code: LegCode }) {
  return <>
    <path d="M94 34Q76 84 93 133Q103 156 97 177Q89 209 104 263H162Q178 228 171 198Q166 169 178 142Q193 87 175 34Z" fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
    <path d="M112 45Q94 94 104 121L122 139Q116 120 126 85L128 45ZM153 45Q154 93 146 123L151 139Q176 125 174 91L169 45Z" fill="#E8BE9D" stroke="#B97049" strokeWidth="1.4" />
    <path d="M132 41L147 41L146 123L127 124Z" fill="#C5D7C7" stroke="#769482" />
    <path d="M115 132Q136 118 153 132Q157 146 137 157Q125 153 115 132Z" fill="#E8BE9D" stroke="#B97049" strokeWidth="2" />
    <path d="M132 155L143 155L144 190L130 190Z" fill="#C5D7C7" stroke="#769482" />
    <path d="M131 193Q144 190 150 206L147 258H128Z" fill="#E8D4B9" stroke="#B49980" />
    <Badge x={137} y={137} number={1} />
    <text x="204" y="63">右ひざを前から</text>
    <text x="204" y="91">① ひざのお皿</text>
    <text x="204" y="118">{code === "st35" ? "緑はお皿の下のすじ" : code === "st34" ? "緑は太ももの前の腱" : "内側の筋肉のふくらみ"}</text>
    <text x="55" y="282">← 小指側（外）</text><text x="185" y="282">親指側（内） →</text>
  </>;
}

function SideLeg({ code, medial }: { code: LegCode; medial: boolean }) {
  const ankleY = medial ? medialAnkleY : lateralAnkleY;
  const { achillesAtTwoCun, achillesAtFiveCun, soleusAtFiveCun } = medialCalf;
  return <>
    <path d="M92 24Q85 60 93 86Q69 135 88 182L91 224Q78 249 92 262Q109 277 142 269L182 266Q202 255 187 249L145 239Q134 230 139 211L147 82Q163 48 149 24Z"
      fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
    <path d="M96 68Q116 49 136 67Q145 74 133 87L121 226Q124 236 115 244Q107 244 109 234L110 90Z" fill={medial ? "#E8BE9D" : "#E7D7C7"} stroke={medial ? "#B97049" : "#BCA891"} strokeWidth="1.6" />
    {!medial && <path d="M116 57Q128 52 133 61L126 229Q131 240 124 246Q116 247 116 239L119 73Z" fill="#E8BE9D" stroke="#B97049" strokeWidth="1.8" />}
    {code === "ki9" && <path d={`M105 93Q88 122 101 154Q105 163 ${soleusAtFiveCun.x} ${soleusAtFiveCun.y}Q105 196 91 213Q106 207 113 183Q120 159 113 123Q109 105 115 95Z`}
      fill="#E4AFA0" stroke="#B2735C" strokeWidth="1.5" />}
    <path d={medial
      ? `M84 153Q83 164 ${achillesAtFiveCun.x} ${achillesAtFiveCun.y}Q89 196 ${achillesAtTwoCun.x} ${achillesAtTwoCun.y}Q88 228 91 246`
      : "M94 83Q72 122 86 157Q100 191 95 224L91 246"} fill="none" stroke="#718F7E" strokeWidth="5" strokeLinecap="round" />
    <Badge x={medial ? 123 : 121} y={101} number={1} />
    <Badge x={medial ? 116 : 123} y={ankleY} number={2} />
    <text x="203" y="55">脚を{medial ? "内側" : "外側"}から</text>
    <text x="203" y="81">① {medial ? "脛骨（すねの骨）" : "腓骨（外側の骨）"}</text>
    <text x="203" y="106">② {medial ? "内くるぶし" : "外くるぶし"}</text>
    <text x="203" y="198">緑はアキレス腱側</text>
    {code === "ki9" && <text x="203" y="220">赤はヒラメ筋</text>}
    <text x="22" y="286">← かかと側</text><text x="210" y="286">つま先側 →</text>
  </>;
}

function Posterior({ code }: { code: LegCode }) {
  const { medialEnd, lateralEnd, lateralTendon } = posteriorKnee;
  return <>
    <path d={`M78 20Q76 38 ${medialEnd} ${poplitealY}Q63 104 86 159Q96 187 98 218Q94 246 106 262Q122 271 141 260Q151 249 146 225Q146 201 158 173Q180 112 ${lateralEnd} ${poplitealY}Q166 38 163 20Z`} fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
    <path d={`M${medialEnd} ${poplitealY}H${lateralEnd}`} fill="none" stroke="#787F71" strokeDasharray="4 4" strokeWidth="1.8" />
    <path d={`M86 43L90 ${poplitealY}L92 66`} fill="none" stroke={code === "ki10" ? "#B97049" : "#77927B"} strokeWidth="3" strokeLinecap="round" />
    <path d={`M100 43L104 ${poplitealY}L106 66M156 43L${lateralTendon} ${poplitealY}L153 66`} fill="none" stroke="#77927B" strokeWidth="3" strokeLinecap="round" />
    <path d="M87 67Q108 62 121 88Q135 62 151 67Q164 118 143 144Q132 154 121 145Q111 160 95 143Q75 117 87 67Z" fill="#E4AFA0" stroke="#B2735C" strokeWidth="1.7" />
    <path d="M121 79V145M112 149Q120 162 117 242M130 150Q124 183 126 245" fill="none" stroke="#9D755C" strokeWidth="2" />
    <path d="M114 241Q127 235 139 244Q143 255 132 259Q123 263 110 254Z" fill="#E8BE9D" stroke="#B97049" strokeWidth="1.5" />
    {(code === "bl59" || code === "bl58") && <path d="M147 162L145 218Q146 232 141 236" fill="none" stroke="#B97049" strokeWidth="4" />}
    <Badge x={129} y={249} number={1} />
    <text x="202" y="25">右脚を後ろから</text>
    <text x="202" y="52">ひざ裏のしわ</text>
    <text x="202" y="76">{code === "bl39" ? "右の緑は外側の腱" : code === "ki10" ? "橙色は半腱様筋の腱" : code === "lr8" ? "左の緑2本は内側の腱" : "ふくらはぎの2つの筋肉"}</text>
    <text x="202" y="231">① かかとの骨</text>
    <text x="27" y="287">← 内側</text><text x="211" y="287">外側 →</text>
  </>;
}

function Sole() {
  const { web, heel } = soleEndpoints;
  return <>
    <path d="M118 268Q99 255 103 221Q110 193 95 172Q75 147 68 121Q56 90 50 75Q44 62 54 57Q63 52 72 66L77 79L72 49Q69 36 80 32Q92 30 97 48L99 69L100 38Q99 22 111 20Q126 23 127 40L126 64L130 42Q133 22 144 23Q156 25 155 42L153 65L163 33Q169 12 184 16Q198 22 195 46L185 87Q191 126 171 163Q153 193 157 220Q164 254 146 268Q133 275 118 268Z" fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
    <path d="M88 130Q80 105 66 75M101 123Q96 76 83 43M126 172Q121 132 113 104L113 32M138 173Q142 133 140 105L143 37M150 176Q161 138 168 100L181 36" fill="none" stroke="#D3C4B0" strokeWidth="6" strokeLinecap="round" />
    <path d="M126 172Q121 132 113 104L113 32M138 173Q142 133 140 105L143 37" fill="none" stroke="#B97049" strokeWidth="5.5" strokeLinecap="round" />
    <path d={`M${web.x} ${web.y}L${heel.x} ${heel.y}`} fill="none" stroke="#677D70" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx={web.x} cy={web.y} r="4" fill="#5F7767" /><circle cx={heel.x} cy={heel.y} r="4" fill="#5F7767" />
    <Badge x={119} y={120} number={1} /><Badge x={142} y={121} number={2} />
    <text x="209" y="54">足の裏から見た図</text>
    <text x="209" y="82">① 3番目の指の骨</text><text x="209" y="104">② 2番目の指の骨</text>
    <text x="209" y="241">破線は指のまたと</text><text x="209" y="259">かかとを結ぶ目安</text>
  </>;
}

export default function LegLandmarkRegion({ marker, label }: AtlasCloseUpProps) {
  if (!marker.legCode) throw new Error("A leg landmark is required");
  const code = marker.legCode;
  const { view } = legLandmarks[code];
  return (
    <g fill="#51463B" fontSize="11.5">
      {view === "knee" ? <Knee code={code} /> : view === "posterior" ? <Posterior code={code} /> : view === "sole" ? <Sole /> : <SideLeg code={code} medial={view === "medial"} />}
      <path d={`M${marker.x} ${marker.y}L194 ${view === "sole" ? 176 : 155}h10`} fill="none" stroke="#7F3520" strokeWidth="1.5" />
      <text x="208" y={view === "sole" ? 181 : 160} fill="#7F3520" fontSize="13" fontWeight="bold">{label}</text>
    </g>
  );
}
