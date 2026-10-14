import type { ReactNode } from "react";

const ink = "var(--article-cover-ink, #354C42)";
const green = "var(--article-cover-green, #467663)";
const gold = "var(--article-cover-gold, #AD8C58)";
const water = "var(--article-cover-water, #688D9A)";
const paper = "var(--article-cover-paper, #F4F2E9)";

function Book({ x = 160, y = 93 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M0-25C-16-37-38-38-57-32V27C-37 21-16 24 0 35C16 24 37 21 57 27V-32C38-38 16-37 0-25Z" fill={paper} />
    <path d="M0-25V35M-47 36C-28 33-12 37 0 43C12 37 28 33 47 36" opacity=".5" />
    <path d="M-42-15C-30-17-21-15-12-11M12-11C21-15 30-17 42-15M-42 0C-30-2-21 0-12 4M12 4C21 0 30-2 42 0" opacity=".35" />
  </g>;
}

function Lens({ x, y, r = 24 }: { x: number; y: number; r?: number }) {
  return <g stroke={green}>
    <circle cx={x} cy={y} r={r} fill={paper} />
    <path d={`M${x + r * .72} ${y + r * .72}l18 18`} strokeWidth="5" />
  </g>;
}

function Person({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .65 : 1})`}>
    <circle cy="-24" r="12" />
    <path d="M-24 24V10C-24-5-12-9 0-9S24-5 24 10V24M-13 23V7M13 23V7" />
  </g>;
}

function Artwork({ articleId }: { articleId: string }): ReactNode {
  switch (articleId) {
    case "science-of-oriental-medicine-history":
      return <>
        <path d="M64 119C92 145 114 143 135 146M187 144C218 145 239 131 258 110" stroke={gold} opacity=".45" />
        <circle cx="77" cy="134" r="4" fill={gold} stroke="none" />
        <circle cx="243" cy="131" r="4" fill={gold} stroke="none" />
        <Book />
        <path d="M144 33V62L160 53L176 62V33" stroke={gold} fill={paper} />
        <path d="M144 33H176" stroke={gold} />
      </>;
    case "science-of-yinyang-gogyo":
      return <>
        <circle cx="160" cy="90" r="65" stroke={gold} opacity=".28" />
        <circle cx="160" cy="90" r="38" fill={paper} />
        <path d="M160 52A38 38 0 0 1 160 128A19 19 0 0 1 160 90A19 19 0 0 0 160 52Z" fill={green} stroke="none" />
        <circle cx="160" cy="71" r="5" fill={green} stroke="none" />
        <circle cx="160" cy="109" r="5" fill={paper} stroke="none" />
        <circle cx="160" cy="25" r="7" fill={gold} stroke="none" />
        <circle cx="222" cy="70" r="7" fill={green} stroke="none" />
        <circle cx="198" cy="143" r="7" fill={water} stroke="none" />
        <circle cx="122" cy="143" r="7" fill={gold} stroke="none" />
        <circle cx="98" cy="70" r="7" fill={ink} stroke="none" />
      </>;
    case "science-of-qi-blood-fluid":
      return <>
        <path d="M71 107C109 125 144 58 185 78S233 118 259 97M72 122C108 140 146 92 178 99S229 137 259 116" stroke={water} opacity=".4" />
        <path d="M94 65C110 48 132 49 139 62C147 79 127 84 119 76M76 82C91 71 105 74 105 87" stroke={gold} />
        <path d="M175 37C166 50 154 65 154 77A21 21 0 0 0 196 77C196 65 184 50 175 37Z" stroke={green} fill={paper} />
        <path d="M224 63C217 75 208 86 208 96A16 16 0 0 0 240 96C240 86 231 75 224 63Z" stroke={water} fill={paper} />
        <path d="M164 76C164 83 168 87 174 87" stroke={green} opacity=".5" />
      </>;
    case "science-of-meridians-network":
      return <>
        <path d="M74 139C101 120 106 113 124 93S151 58 174 39M124 93C155 111 179 118 211 144M144 70C169 75 194 64 238 48M164 112C187 98 218 103 249 88" stroke={green} />
        <path d="M89 55C115 68 115 84 124 93M202 64C209 76 209 90 217 102" stroke={water} />
        {[[74, 139], [89, 55], [174, 39], [238, 48], [211, 144], [249, 88]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={paper} stroke={gold} />)}
        <circle cx="124" cy="93" r="9" fill={paper} />
        <circle cx="124" cy="93" r="3" fill={green} stroke="none" />
      </>;
    case "science-of-acupoints-mechanotransduction":
      return <>
        <path d="M68 82C102 41 130 126 165 80S218 62 249 93M68 98C102 57 130 142 165 96S218 78 249 109M80 119C112 88 138 155 174 116" stroke={water} opacity=".45" />
        <circle cx="112" cy="87" r="5" fill={gold} stroke="none" />
        <Lens x={190} y={79} r={36} />
        <path d="M170 90C184 73 192 69 210 73" stroke={water} />
        <circle cx="190" cy="78" r="7" fill={paper} stroke={gold} />
        <circle cx="190" cy="78" r="2" fill={gold} stroke="none" />
      </>;
    case "science-of-pulse-diagnosis":
      return <>
        <circle cx="161" cy="87" r="54" stroke={gold} opacity=".3" />
        <path d="M78 89H104C114 89 114 61 126 61S138 112 150 112S162 61 174 61S186 112 198 112S210 89 220 89H242" stroke={green} strokeWidth="3" />
        <path d="M110 133H211" stroke={water} opacity=".6" />
        <path d="M119 129V137M141 129V137M163 129V137M185 129V137M207 129V137" stroke={water} opacity=".6" />
      </>;
    case "science-of-abdominal-diagnosis":
      return <>
        <path d="M141 38C139 51 130 58 114 61L102 102M179 38C181 51 190 58 206 61L218 102M123 74C127 93 126 113 118 141M197 74C193 93 194 113 202 141" stroke={ink} />
        <path d="M141 40C146 47 174 47 179 40" stroke={ink} />
        <ellipse cx="160" cy="105" rx="24" ry="31" fill={green} fillOpacity=".07" stroke="none" />
        <circle cx="160" cy="109" r="3" fill={gold} stroke="none" />
        <path d="M70 70H84V58M70 121H84V133M236 58V70H250M236 133V121H250" stroke={water} opacity=".8" />
      </>;
    case "science-of-tongue-diagnosis":
      return <>
        <path d="M92 77C108 54 123 53 135 62C146 54 162 56 178 77C158 98 113 98 92 77Z" fill={paper} />
        <path d="M109 80V104C109 132 161 132 161 104V80C146 72 124 72 109 80Z" stroke={green} fill={paper} />
        <path d="M135 89V111" stroke={gold} opacity=".7" />
        <Lens x={221} y={85} r={28} />
        <path d="M207 85Q221 70 235 85Q221 100 207 85Z" stroke={water} />
        <circle cx="221" cy="85" r="4" stroke={water} />
      </>;
    case "science-of-acupuncture-neuroscience":
      return <>
        <rect x="76" y="43" width="70" height="94" rx="9" fill={paper} />
        <rect x="174" y="43" width="70" height="94" rx="9" fill={paper} />
        <path d="M160 52V131" stroke={gold} strokeDasharray="2 7" opacity=".6" />
        <circle cx="110" cy="83" r="17" stroke={water} />
        <circle cx="105" cy="80" r="4" stroke={water} />
        <circle cx="117" cy="87" r="3" stroke={water} />
        <path d="M95 116H127" stroke={water} opacity=".55" />
        <Person x={209} y={90} small />
        <path d="M194 116H224" stroke={green} opacity=".55" />
      </>;
    case "science-of-kampo-network-pharmacology":
      return <>
        <path d="M107 132C123 105 127 75 124 44M122 88C106 88 92 77 93 61C111 61 122 71 122 88ZM126 72C145 70 151 57 146 43C131 49 125 59 126 72ZM115 109C97 110 82 99 83 85C101 86 112 95 115 109Z" stroke={green} />
        <path d="M116 134C133 138 148 137 160 130" stroke={gold} opacity=".5" />
        <rect x="180" y="51" width="57" height="81" rx="7" fill={paper} />
        <path d="M196 68H221M196 81H221" stroke={water} opacity=".5" />
        <circle cx="209" cy="105" r="11" stroke={gold} />
        <path d="M209 99V105M209 111h.01" stroke={gold} />
      </>;
    case "east-west-integrative-unified-theory":
      return <>
        <path d="M89 57H117M89 57V126H117M231 57H203M231 57V126H203" stroke={gold} opacity=".55" />
        <circle cx="137" cy="76" r="16" stroke={green} />
        <rect x="123" y="110" width="28" height="23" rx="6" stroke={green} />
        <path d="M174 61L190 88H159Z" stroke={water} />
        <circle cx="174" cy="122" r="12" stroke={water} />
        <path d="M137 92V102M174 97V102" stroke={gold} strokeDasharray="2 5" />
        <path d="M142 41Q156 26 170 41Q156 56 142 41Z" stroke={ink} />
        <circle cx="156" cy="41" r="4" stroke={ink} />
      </>;
    case "east-west-integrative-gerd-gastric":
      return <>
        <path d="M144 35V64C144 81 157 87 160 73C165 53 194 58 201 78C213 111 188 139 160 133C141 129 133 108 119 108H110V125H120C133 143 161 152 185 140" stroke={green} />
        <path d="M128 35V67C128 80 132 92 141 97" stroke={green} />
        <Lens x={237} y={82} r={22} />
        <path d="M232 73L242 82L232 91" stroke={water} />
        <path d="M65 79H92M65 91H87M65 103H82" stroke={gold} opacity=".7" />
      </>;
    default:
      return <Book />;
  }
}

/** Decorative article artwork; the adjacent heading provides the link's name. */
export default function ArticleCover({ articleId, className = "" }: { articleId: string; className?: string }) {
  return <div className={`article-cover ${className}`.trim()} data-article-cover={articleId} aria-hidden="true">
    <svg viewBox="0 0 320 180" width="320" height="180" aria-hidden="true" focusable="false" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="164" cy="92" rx="104" ry="64" fill={green} fillOpacity=".045" stroke="none" />
      <path d="M43 145H71M250 35H278" stroke={gold} strokeWidth="1.5" opacity=".35" />
      <Artwork articleId={articleId} />
    </svg>
  </div>;
}
