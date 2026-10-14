import type { ReactNode } from 'react';
import type { WordlessArtDefinition } from './types';
import { Arrow, Disk, Glyph, accent, gold, ink, surface, water } from './WordlessPrimitives';

function Drawing({ children }: { children: ReactNode }) {
  return <g fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</g>;
}

function Panel({ x, y, width = 104, height = 128, color = accent, children }: { x: number; y: number; width?: number; height?: number; color?: string; children?: ReactNode }) {
  return <g><rect x={x} y={y} width={width} height={height} rx="16" fill={surface} stroke={color} strokeOpacity=".35" />{children}</g>;
}

function Target({ x, y, r = 24 }: { x: number; y: number; r?: number }) {
  return <g stroke={gold}><circle cx={x} cy={y} r={r} /><circle cx={x} cy={y} r={r / 2} opacity=".6" /><circle cx={x} cy={y} r="4" fill={gold} stroke="none" /></g>;
}

function Briefcase({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} stroke={accent}><rect x="5" y="20" width="54" height="34" rx="5" /><path d="M22 20v-8h20v8M5 32q27 12 54 0M29 33v8h6v-8" /></g>;
}

function Home({ x, y, color = accent }: { x: number; y: number; color?: string }) {
  return <g transform={`translate(${x} ${y})`} stroke={color}><path d="m5 29 27-23 27 23M12 25v32h40V25M26 57V39h12v18" /></g>;
}

function Calendar({ x, y, color = accent }: { x: number; y: number; color?: string }) {
  return <g transform={`translate(${x} ${y})`} stroke={color}><rect x="7" y="12" width="50" height="46" rx="6" /><path d="M7 25h50M20 6v12M44 6v12" /><circle cx="21" cy="37" r="2" fill={color} /><circle cx="32" cy="37" r="2" fill={color} /><circle cx="43" cy="37" r="2" fill={color} /><circle cx="21" cy="48" r="2" fill={color} /><circle cx="32" cy="48" r="2" fill={color} /></g>;
}

function Speech({ x, y, color = accent }: { x: number; y: number; color?: string }) {
  return <g transform={`translate(${x} ${y})`} stroke={color}><path d="M10 8h44a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H30L16 59V48h-6a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6Z" fill={surface} /><circle cx="19" cy="28" r="2" fill={color} /><circle cx="32" cy="28" r="2" fill={color} /><circle cx="45" cy="28" r="2" fill={color} /></g>;
}

function Pause({ x, y, color = gold }: { x: number; y: number; color?: string }) {
  return <g stroke={color}><circle cx={x} cy={y} r="24" /><path d={`M${x - 6} ${y - 9}v18M${x + 6} ${y - 9}v18`} strokeWidth="4" /></g>;
}

function OpenBook({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="M4 11c12-5 20-4 28 2 8-6 16-7 28-2v43c-12-5-20-4-28 2-8-6-16-7-28-2ZM32 13v43" fill={surface} stroke={accent} /><path d="M12 23q6-2 12 1M12 33q6-2 12 1M40 24q6-3 12-1M40 34q6-3 12-1" strokeOpacity=".4" /></g>;
}

/** One section-specific, wordless visual for each treatment and practice lesson. */
export const PRACTICE_CONCEPT_ART: Readonly<Record<string, WordlessArtDefinition>> = {
  'lecture-treatment-1': {
    afterHeading: '第1節：治療の3層ゴールモデル',
    variant: 'treatment-goal-layers',
    title: '症状・生活機能・大切な活動を別々に確認する',
    description: '人物を中心に、身体の訴え、日常の仕事、人との活動を異なる広がりで置いた目標の概念図。ひとつの変化が他の目標の達成を保証する図ではありません。',
    artwork: <Drawing>
      <path d="M240 45C333 45 413 91 413 151s-80 96-173 96S67 211 67 151 147 45 240 45Z" fill={accent} fillOpacity=".025" strokeOpacity=".15" />
      <ellipse cx="240" cy="150" rx="119" ry="78" stroke={accent} strokeOpacity=".25" />
      <ellipse cx="240" cy="150" rx="66" ry="56" stroke={gold} strokeOpacity=".45" />
      <Glyph name="person" x={208} y={118} color={accent} />
      <circle cx="274" cy="152" r="8" stroke={gold} />
      <path d="M281 147 302 117" stroke={gold} />
      <Disk x={341} y={95} r={40}><Briefcase x={309} y={63} /></Disk>
      <Disk x={101} y={190} r={40}><Glyph name="people" x={69} y={158} color={water} /></Disk>
      <circle cx="155" cy="103" r="4" fill={gold} stroke="none" />
      <circle cx="357" cy="200" r="4" fill={accent} stroke="none" />
    </Drawing>,
  },
  'lecture-treatment-2': {
    afterHeading: '第1節：治療設計の6階層ピラミッド',
    variant: 'treatment-layered-planning',
    title: '説明の候補から評価までを段階に分ける',
    description: '幅の異なる六つの段と、考える・計画する・評価する記号を組み合わせた図。証名と具体的方法を一対一で結ばず、検討する階層を分けます。',
    artwork: <Drawing>
      {[{ x: 220, y: 41, w: 40 }, { x: 199, y: 72, w: 82 }, { x: 178, y: 103, w: 124 }, { x: 157, y: 134, w: 166 }, { x: 136, y: 165, w: 208 }, { x: 115, y: 196, w: 250 }].map((step, index) => <rect key={step.y} x={step.x} y={step.y} width={step.w} height="23" rx="6" fill={index % 2 ? accent : gold} fillOpacity=".08" stroke={index % 2 ? accent : gold} strokeOpacity=".6" />)}
      <Glyph name="thought" x={73} y={50} scale={.9} color={water} />
      <path d="M134 81h50" stroke={water} strokeDasharray="4 7" />
      <Glyph name="document" x={349} y={107} scale={.9} color={accent} />
      <path d="M309 132h39" stroke={accent} strokeDasharray="4 7" />
      <Arrow d="M96 218C47 219 42 112 74 93" x={74} y={93} angle={-31} color={water} />
      <path d="M177 238h126" strokeOpacity=".14" />
    </Drawing>,
  },
  'lecture-treatment-3': {
    afterHeading: '第2節：寒熱への対応 ― 熱者清之・寒者温之',
    variant: 'treatment-temperature-comparison',
    title: '寒熱の対比を他の所見と合わせて読む',
    description: '寒と熱を表す雪と炎の図形を向かい合わせ、中央の観察の記号と結んだ図。温度の操作や施術法の指示ではなく、対になる伝統概念を比較するための表現です。',
    artwork: <Drawing>
      <path d="M97 69Q240 14 383 69M97 211q143 55 286 0" stroke={accent} strokeOpacity=".15" />
      <Panel x={53} y={77} width={126} height={132} color={water}><Glyph name="snow" x={77} y={104} scale={1.2} color={water} /></Panel>
      <Panel x={301} y={77} width={126} height={132} color={gold}><Glyph name="flame" x={325} y={104} scale={1.2} color={gold} /></Panel>
      <path d="M181 141h22M277 141h22" strokeOpacity=".3" />
      <Disk x={240} y={141} r={37}><Glyph name="eye" x={214} y={115} scale={.8} color={accent} /></Disk>
      <path d="M213 199h54M224 211h32" stroke={accent} strokeOpacity=".4" />
    </Drawing>,
  },
  'lecture-treatment-4': {
    afterHeading: '第1節：本治と標治の定義と役割分担',
    variant: 'treatment-roots-and-branches',
    title: '背景と現在の支障を分けて考える',
    description: '一本の木の枝と根を、上下に離れた観察窓で示す比喩図。本と標の着目点を示し、根本治療や再発予防の効果を示すものではありません。',
    artwork: <Drawing>
      <path d="M52 159H428" stroke={gold} strokeOpacity=".3" strokeDasharray="4 7" />
      <path d="M240 187V88M240 129l-37-33M240 109l40-30M240 186l-24 35M239 195l25 37M226 206l-29 7M252 214l34 8M239 202v36" stroke={accent} strokeWidth="3" />
      <path d="M204 97c-23 4-36-5-38-25 25-4 37 6 38 25ZM279 80c-1-24 12-39 34-38 3 24-11 38-34 38ZM240 96c-16-13-18-29-5-45 20 11 21 29 5 45Z" fill={accent} fillOpacity=".08" stroke={accent} />
      <circle cx="197" cy="81" r="50" stroke={gold} strokeOpacity=".55" />
      <circle cx="253" cy="214" r="39" stroke={water} strokeOpacity=".55" />
      <path d="M144 77H98M296 218h79" strokeOpacity=".35" />
      <Glyph name="eye" x={62} y={59} scale={.55} color={gold} />
      <Glyph name="thought" x={376} y={197} scale={.6} color={water} />
    </Drawing>,
  },
  'lecture-treatment-5': {
    afterHeading: '第3節：気の運動方向の制御 ― 昇降の力学',
    variant: 'treatment-ascent-descent-metaphors',
    title: '昇と降という伝統的な方向を比べる',
    description: '上向きと下向きの二つの曲線を、独立した囲みの中で比べる図。伝統用語の方向の比喩であり、神経伝導や実際の体内物質の動きを描いたものではありません。',
    artwork: <Drawing>
      <rect x="67" y="42" width="146" height="196" rx="68" fill={accent} fillOpacity=".04" stroke={accent} strokeOpacity=".22" />
      <rect x="267" y="42" width="146" height="196" rx="68" fill={water} fillOpacity=".04" stroke={water} strokeOpacity=".22" />
      <Arrow d="M115 202C185 163 96 123 151 76" x={151} y={76} angle={-45} color={accent} />
      <Arrow d="M330 76c-55 47 34 87-36 126" x={294} y={202} angle={151} color={water} />
      <circle cx="115" cy="202" r="7" fill={surface} stroke={accent} />
      <circle cx="330" cy="76" r="7" fill={surface} stroke={water} />
      <path d="M235 128h10M235 152h10" strokeOpacity=".4" />
      <path d="M102 222h65M302 57h65" stroke={gold} strokeOpacity=".45" />
    </Drawing>,
  },
  'lecture-treatment-6': {
    afterHeading: '第3節：津液の不足と停滞を分ける',
    variant: 'treatment-fluid-distinct-patterns',
    title: '不足と停滞を異なる観点として比べる',
    description: 'まばらな滴と集まった滴を別々の観察窓に置いた概念図。伝統分類の比較であり、体液量や水分摂取量を測った図ではありません。',
    artwork: <Drawing>
      <path d="M54 222H426" strokeOpacity=".15" />
      <circle cx="139" cy="133" r="77" fill={water} fillOpacity=".035" stroke={water} strokeOpacity=".35" />
      <circle cx="341" cy="133" r="77" fill={water} fillOpacity=".035" stroke={water} strokeOpacity=".35" />
      <Glyph name="drop" x={121} y={116} scale={.55} color={water} />
      <path d="M93 105h19M165 157h20M131 76v12" stroke={gold} strokeOpacity=".55" />
      <Glyph name="drop" x={305} y={81} scale={.65} color={water} />
      <Glyph name="drop" x={330} y={115} scale={.65} color={water} />
      <Glyph name="drop" x={294} y={135} scale={.65} color={water} />
      <path d="M374 169q-37 25-73 0" stroke={water} strokeOpacity=".65" />
      <path d="M240 83v98" stroke={gold} strokeDasharray="3 8" strokeOpacity=".4" />
      <Glyph name="eye" x={220} y={213} scale={.6} color={accent} />
    </Drawing>,
  },
  'lecture-treatment-7': {
    afterHeading: '第2節：臓腑の関係から考える四つの治法',
    variant: 'treatment-elements-relations',
    title: '五行の関係から治法の言葉を読む',
    description: '木・火・土・金・水を示す図形を円周に置き、中央の開いた本に結ぶ図。伝統用語を学ぶ関係図であり、医学的な臓器の位置や生理回路ではありません。',
    artwork: <Drawing>
      <circle cx="240" cy="140" r="91" stroke={accent} strokeOpacity=".14" />
      <path d="M240 60v43M321 109l-48 20M291 214l-32-44M189 214l32-44M159 109l48 20" stroke={gold} strokeOpacity=".35" strokeDasharray="4 7" />
      <Disk x={240} y={48} r={31}><Glyph name="leaf" x={216} y={24} scale={.75} color={accent} /></Disk>
      <Disk x={327} y={112} r={31}><Glyph name="flame" x={303} y={88} scale={.75} color={gold} /></Disk>
      <Disk x={292} y={219} r={31}><Glyph name="earth" x={268} y={195} scale={.75} color={gold} /></Disk>
      <Disk x={188} y={219} r={31}><Glyph name="metal" x={164} y={195} scale={.75} color={ink} /></Disk>
      <Disk x={153} y={112} r={31}><Glyph name="drop" x={129} y={88} scale={.75} color={water} /></Disk>
      <OpenBook x={208} y={111} />
    </Drawing>,
  },
  'lecture-treatment-8': {
    afterHeading: '第1節：配穴の3大基本ディメンション',
    variant: 'treatment-local-distant-classified-points',
    title: '近さ・つながり・分類という選穴の観点',
    description: '近接した点、離れた点との線、分類して並べた点を三角形に配置した図。実際の経穴位置や配穴の処方ではなく、選び方を比較するための模式表現です。',
    artwork: <Drawing>
      <path d="M132 100 348 100 240 226Z" stroke={accent} strokeOpacity=".18" strokeDasharray="5 8" />
      <circle cx="125" cy="94" r="55" fill={surface} stroke={accent} strokeOpacity=".4" />
      <circle cx="125" cy="94" r="23" stroke={gold} strokeOpacity=".7" />
      <circle cx="116" cy="88" r="5" fill={accent} stroke="none" /><circle cx="135" cy="104" r="5" fill={accent} stroke="none" />
      <circle cx="355" cy="94" r="55" fill={surface} stroke={accent} strokeOpacity=".4" />
      <path d="M326 111q14-55 55-33" stroke={water} /><circle cx="326" cy="111" r="6" fill={surface} stroke={water} /><circle cx="381" cy="78" r="6" fill={surface} stroke={water} />
      <Panel x={183} y={171} width={114} height={75} color={gold}>
        <path d="M221 171v75M259 171v75" stroke={gold} strokeOpacity=".3" />
        {[202, 240, 278].map((x) => <g key={x}><circle cx={x} cy="195" r="5" stroke={accent} /><circle cx={x} cy="220" r="5" fill={gold} fillOpacity=".15" stroke={gold} /></g>)}
      </Panel>
    </Drawing>,
  },
  'lecture-treatment-9': {
    afterHeading: '施術前の確認',
    variant: 'treatment-individual-safety-review',
    title: '本人・記録・安全条件を合わせて確認する',
    description: '人物と記録を大きな安全確認の枠で囲み、保留の記号を添えた図。個別の確認が必要であり、少量の刺激だけで安全と判断しないことを表します。',
    artwork: <Drawing>
      <path d="m240 30 114 38v75c0 53-44 86-114 108-70-22-114-55-114-108V68Z" fill={accent} fillOpacity=".035" stroke={accent} strokeOpacity=".35" />
      <Glyph name="person" x={159} y={105} scale={1.25} color={accent} />
      <Glyph name="document" x={252} y={94} scale={1.35} color={water} />
      <path d="M219 140h26M232 127v26" stroke={gold} />
      <circle cx="127" cy="72" r="26" fill={surface} stroke={gold} />
      <path d="M116 72h22M127 61v22" stroke={gold} />
      <Pause x={349} y={213} />
      <path d="M165 210q70 27 130 0" stroke={accent} strokeOpacity=".3" />
    </Drawing>,
  },
  'lecture-treatment-10': {
    afterHeading: '1. 生活背景を整理する',
    variant: 'treatment-life-context-wheel',
    title: '暮らしの条件を本人と整理する',
    description: '中心の人物を囲むように家、仕事、睡眠、食事を配置した図。生活と症状との関係を確認する視点であり、生活習慣が原因と確定する図ではありません。',
    artwork: <Drawing>
      <path d="M178 86 218 119M302 86l-40 33M179 198l40-29M301 198l-40-29" stroke={accent} strokeOpacity=".3" />
      <Disk x={240} y={144} r={42}><Glyph name="person" x={208} y={112} color={accent} /></Disk>
      <Disk x={148} y={69} r={38}><Home x={116} y={37} /></Disk>
      <Disk x={332} y={69} r={38}><Briefcase x={300} y={37} /></Disk>
      <Disk x={148} y={214} r={38}><Glyph name="moon" x={122} y={188} scale={.8} color={water} /></Disk>
      <Disk x={332} y={214} r={38}><Glyph name="grain" x={306} y={188} scale={.8} color={gold} /></Disk>
      <path d="M78 118q-12 25 0 47M402 118q12 25 0 47" stroke={gold} strokeOpacity=".35" />
    </Drawing>,
  },
  'lecture-treatment-11': {
    afterHeading: '継続・変更・中断・終了',
    variant: 'treatment-review-and-options',
    title: '再評価から次の選択肢を検討する',
    description: '観察の記号から、継続を表す輪、変更する道、保留、終点へ枝分かれする図。経過と本人の希望に応じて選ぶもので、固定した治療手順ではありません。',
    artwork: <Drawing>
      <Disk x={113} y={140} r={45}><Glyph name="eye" x={81} y={108} color={accent} /></Disk>
      <path d="M159 140h57M216 62v156M216 62h80M216 114h80M216 166h80M216 218h80" stroke={accent} strokeOpacity=".45" />
      <g stroke={water}><path d="M339 43a21 21 0 1 0 4 32" /><Arrow x={339} y={43} angle={28} color={water} /></g>
      <path d="M312 114h17q12 0 12-13t12-13h15M329 114q12 0 12 13t12 13h15" stroke={accent} />
      <Pause x={336} y={170} />
      <path d="M312 226h40M354 209v34" stroke={ink} strokeOpacity=".65" />
      <circle cx="216" cy="140" r="5" fill={gold} stroke="none" />
    </Drawing>,
  },
  'lecture-treatment-12': {
    afterHeading: '1. 治療計画書：判断を整理する7つの項目',
    variant: 'treatment-plan-assembly',
    title: '判断・安全条件・評価を計画にまとめる',
    description: '対話、判断、安全確認、評価の記号を中央の計画書へ結び、空欄も残した図。未確認の情報や保留理由も計画に含めることを示します。',
    artwork: <Drawing>
      <Panel x={182} y={59} width={116} height={165}>
        <path d="M202 87h48M202 106h72M202 125h43M202 164h61M202 183h72M202 202h45" stroke={accent} strokeOpacity=".45" />
        <rect x="200" y="135" width="75" height="16" rx="4" stroke={gold} strokeDasharray="3 5" />
      </Panel>
      <Speech x={57} y={42} />
      <Glyph name="thought" x={356} y={42} color={water} />
      <Glyph name="shield" x={57} y={182} color={accent} />
      <Glyph name="measure" x={356} y={182} color={gold} />
      <path d="m119 88 61 22M355 88l-55 22M119 210l61-25M355 210l-55-25" stroke={gold} strokeOpacity=".4" />
    </Drawing>,
  },
  'lecture-practice-1': {
    afterHeading: '2. 手順の遵守（プロトコル）と自己修正ループ',
    variant: 'practice-reasoning-review-loop',
    title: '新しい情報から前の判断へ戻る',
    description: '対話、観察、記録を回る曲線と、途中から戻る矢印で、必要に応じて判断を見直す流れを表した図。実技の実施手順ではありません。',
    artwork: <Drawing>
      <Arrow d="M143 80C221 25 322 54 363 119" x={363} y={119} angle={57} color={accent} />
      <Arrow d="M367 170c-20 73-166 97-243 30" x={124} y={200} angle={220} color={water} />
      <Arrow d="M105 152q-22-42 11-62" x={116} y={90} angle={-38} color={gold} />
      <Disk x={124} y={106} r={42}><Speech x={92} y={74} /></Disk>
      <Disk x={356} y={143} r={42}><Glyph name="eye" x={324} y={111} color={water} /></Disk>
      <Disk x={220} y={220} r={36}><Glyph name="document" x={191} y={191} scale={.9} color={accent} /></Disk>
      <Arrow d="M289 137q-76-22-127 4" x={162} y={141} angle={156} color={gold} />
      <circle cx="247" cy="136" r="4" fill={gold} stroke="none" />
    </Drawing>,
  },
  'lecture-practice-2': {
    afterHeading: '1. 事実と解釈の峻別フレームワーク',
    variant: 'practice-source-separated-records',
    title: '本人の報告・観察・解釈を分ける',
    description: '対話、目、考えの記号を、それぞれ独立した記録欄の上に置いた図。情報の出どころを分け、ひとつに混ぜて確定しないことを表します。',
    artwork: <Drawing>
      <Panel x={47} y={47} width={114} height={181} color={accent}><Speech x={72} y={66} color={accent} /><path d="M72 156h64M72 175h49M72 194h60" stroke={accent} strokeOpacity=".4" /></Panel>
      <Panel x={183} y={47} width={114} height={181} color={water}><Glyph name="eye" x={208} y={66} color={water} /><path d="M208 156h64M208 175h60M208 194h45" stroke={water} strokeOpacity=".4" /></Panel>
      <Panel x={319} y={47} width={114} height={181} color={gold}><Glyph name="thought" x={344} y={66} color={gold} /><path d="M344 156h64M344 175h49M344 194h60" stroke={gold} strokeDasharray="3 6" strokeOpacity=".65" /></Panel>
      <path d="M67 248h345" strokeOpacity=".15" />
    </Drawing>,
  },
  'lecture-practice-3': {
    afterHeading: 'はじめに：施術の前に現在の安全性を確認する',
    variant: 'practice-safety-before-action',
    title: '現在の状態を確認し医療への連携を判断する',
    description: '人物から大きな安全確認の枠を経て、保留と医療機関へ向かう二つの道を描いた図。危険徴候を確認し、必要な対応を優先する考え方を示します。',
    artwork: <Drawing>
      <Glyph name="person" x={61} y={104} scale={1.2} color={accent} />
      <Arrow d="M144 142h34" x={178} y={142} color={accent} />
      <path d="m238 66 54 18v47c0 33-21 57-54 75-33-18-54-42-54-75V84Z" fill={accent} fillOpacity=".055" stroke={accent} />
      <Glyph name="eye" x={210} y={111} scale={.85} color={accent} />
      <path d="M294 140h24V84h30M318 140v62h30" stroke={gold} strokeOpacity=".6" />
      <Pause x={380} y={84} />
      <g stroke={water}><path d="M354 226v-51h52v51M347 226h66M374 226v-17h12v17M371 189h18M380 180v18" /><path d="M362 211h4M396 211h4" /></g>
    </Drawing>,
  },
  'lecture-practice-4': {
    afterHeading: 'はじめに：質問の目的を決める',
    variant: 'practice-open-questions-context',
    title: '開かれた問いから時刻や活動を具体化する',
    description: '対話の記号から、時刻、活動、休息へ広がる図。答えを一つに誘導せず、日常の異なる場面を確かめる質問の組み立てを表します。',
    artwork: <Drawing>
      <Speech x={70} y={107} />
      <path d="M139 139h56M195 75v133M195 75h73M195 140h73M195 208h73" stroke={accent} strokeOpacity=".45" />
      <Disk x={315} y={73} r={33}><Glyph name="clock" x={289} y={47} scale={.8} color={gold} /></Disk>
      <Disk x={379} y={139} r={33}><Briefcase x={347} y={107} /></Disk>
      <path d="M270 140h75" stroke={accent} strokeOpacity=".45" />
      <Disk x={315} y={208} r={33}><Glyph name="moon" x={289} y={182} scale={.8} color={water} /></Disk>
      <path d="M66 200q35 28 69 0" stroke={gold} strokeOpacity=".4" />
      <circle cx="195" cy="140" r="5" fill={gold} stroke="none" />
    </Drawing>,
  },
  'lecture-practice-5': {
    afterHeading: 'はじめに：候補を比較してから要約する',
    variant: 'practice-balanced-hypotheses',
    title: '支持する情報と合わない情報を比較する',
    description: '左右の候補を同じ大きさの皿に置き、満たした点と空いた点を添えた天秤の図。候補の支持・反証・不足を偏りなく比較し、勝敗を確定するものではありません。',
    artwork: <Drawing>
      <path d="M240 82v144M189 236h102M128 96h224" stroke={accent} strokeWidth="3" />
      <circle cx="240" cy="96" r="8" fill={surface} stroke={gold} />
      <path d="m128 98-45 88h90ZM83 186q45 42 90 0M352 98l-45 88h90ZM307 186q45 42 90 0" stroke={accent} strokeOpacity=".65" />
      <Glyph name="thought" x={98} y={119} scale={.9} color={water} />
      <Glyph name="thought" x={322} y={119} scale={.9} color={gold} />
      <circle cx="109" cy="220" r="5" fill={accent} stroke="none" /><circle cx="128" cy="220" r="5" stroke={gold} /><circle cx="147" cy="220" r="5" stroke={water} strokeDasharray="2 3" />
      <circle cx="333" cy="220" r="5" fill={accent} stroke="none" /><circle cx="352" cy="220" r="5" stroke={gold} /><circle cx="371" cy="220" r="5" stroke={water} strokeDasharray="2 3" />
      <path d="M203 48q37-17 74 0" stroke={gold} strokeOpacity=".3" />
    </Drawing>,
  },
  'lecture-practice-6': {
    afterHeading: '2. 短期目標と中長期目標の二層設計',
    variant: 'practice-personal-goals-over-time',
    title: '時期に応じた生活目標を本人と相談する',
    description: '時刻の線に沿って、作業と日常の活動を別々の目標として置いた図。日時や回復を保証せず、本人が大切にする活動と評価時点を考える表現です。',
    artwork: <Drawing>
      <path d="M61 210H419" stroke={accent} strokeOpacity=".4" />
      <circle cx="105" cy="210" r="6" fill={surface} stroke={accent} /><circle cx="245" cy="210" r="6" fill={surface} stroke={accent} /><circle cx="390" cy="210" r="6" fill={surface} stroke={accent} />
      <Calendar x={73} y={120} color={water} />
      <path d="M245 201v-32M390 201v-57" stroke={gold} strokeDasharray="4 6" />
      <Disk x={245} y={128} r={42}><Briefcase x={213} y={96} /></Disk>
      <Disk x={390} y={104} r={42}><Glyph name="leaf" x={358} y={72} color={accent} /></Disk>
      <Target x={245} y={56} r={16} /><Target x={390} y={37} r={14} />
      <path d="M142 92q50-35 89-10" stroke={gold} strokeOpacity=".4" strokeDasharray="4 7" />
    </Drawing>,
  },
  'lecture-practice-7': {
    afterHeading: '1. 介入設計の3つの階層',
    variant: 'practice-options-under-safety-conditions',
    title: '目標・候補・安全条件のつながりを考える',
    description: '共有した目標から二つの候補へ枝分かれし、両方を安全条件の土台に載せた図。どちらか一方の効果や安全性が優れるという判断は示しません。',
    artwork: <Drawing>
      <Target x={240} y={51} r={25} />
      <path d="M240 77v20M146 108V97h188v11" stroke={gold} strokeOpacity=".65" />
      <Panel x={95} y={111} width={102} height={95} color={accent}><Glyph name="document" x={114} y={126} color={accent} /></Panel>
      <Panel x={283} y={111} width={102} height={95} color={water}><Glyph name="document" x={302} y={126} color={water} /></Panel>
      <path d="M65 234h350" stroke={accent} strokeWidth="3" strokeOpacity=".45" />
      <path d="M146 207v26M334 207v26" stroke={accent} strokeOpacity=".4" />
      <circle cx="240" cy="227" r="30" fill={surface} stroke={accent} strokeOpacity=".3" />
      <Glyph name="shield" x={215} y={202} scale={.8} color={accent} />
    </Drawing>,
  },
  'lecture-practice-8': {
    afterHeading: 'はじめに：本人が選べる説明をする',
    variant: 'practice-shared-understanding-and-record',
    title: '双方で理解を確かめ選択を記録する',
    description: '向かい合う二人の人物と、重なり合う対話、下に残す記録を描いた図。説明を一方的に渡すのではなく、本人が選べる対話を表します。',
    artwork: <Drawing>
      <Disk x={105} y={151} r={46}><Glyph name="person" x={68} y={114} scale={1.15} color={accent} /></Disk>
      <Disk x={375} y={151} r={46}><Glyph name="person" x={338} y={114} scale={1.15} color={water} /></Disk>
      <Speech x={174} y={62} color={accent} /><Speech x={239} y={85} color={water} />
      <path d="M147 124q16-38 42-44M333 126q-15-25-33-21" strokeOpacity=".25" />
      <Arrow d="M156 167q74 51 170 0" x={326} y={167} angle={-23} color={gold} />
      <Arrow d="M324 154q-80 34-166 0" x={158} y={154} angle={204} color={gold} opacity={.45} />
      <Glyph name="document" x={216} y={211} scale={.75} color={accent} />
      <path d="M201 237h-38M279 237h38" stroke={accent} strokeOpacity=".25" />
    </Drawing>,
  },
  'lecture-practice-9': {
    afterHeading: '1. 施術直後評価の3ステップ',
    variant: 'practice-comparable-observation-conditions',
    title: '安全を確認し同じ条件で前後を比較する',
    description: '同じ大きさの観察枠と物差しを左右に置き、安全確認の記号を上に、帰宅後の確認を下に添えた図。結果は描かず、比較する条件をそろえることを示します。',
    artwork: <Drawing>
      <Glyph name="shield" x={213} y={13} scale={.85} color={accent} />
      <Panel x={63} y={87} width={130} height={133} color={accent}><Glyph name="person" x={97} y={100} color={accent} /><Glyph name="measure" x={90} y={154} scale={1.2} color={gold} /></Panel>
      <Panel x={287} y={87} width={130} height={133} color={water}><Glyph name="person" x={321} y={100} color={water} /><Glyph name="measure" x={314} y={154} scale={1.2} color={gold} /></Panel>
      <path d="M205 139h70M205 151h70" stroke={gold} strokeOpacity=".6" />
      <path d="M240 184v23" stroke={accent} strokeDasharray="3 6" />
      <Home x={208} y={208} />
      <path d="M131 63h64M286 63h63" stroke={accent} strokeOpacity=".25" />
    </Drawing>,
  },
  'lecture-practice-10': {
    afterHeading: '1. 経過分析の3つの視点：何が良く、何が戻ったか？',
    variant: 'practice-time-course-and-revision',
    title: '時点と条件をそろえて計画を見直す',
    description: '複数の時点を行き来する中立的な折れ線と、記録を書き直す循環を描いた図。治療成績や改善の予測値ではなく、変動する経過を振り返るための模式図です。',
    artwork: <Drawing>
      <Panel x={52} y={53} width={237} height={166} color={water}>
        <path d="M81 85v101h180M81 116h180M81 151h180" stroke={water} strokeOpacity=".16" />
        <path d="m91 140 39-29 39 45 39-18 38 16" stroke={water} strokeWidth="3" />
        {[{ x: 91, y: 140 }, { x: 130, y: 111 }, { x: 169, y: 156 }, { x: 208, y: 138 }, { x: 246, y: 154 }].map((dot) => <circle key={dot.x} cx={dot.x} cy={dot.y} r="5" fill={surface} stroke={water} />)}
      </Panel>
      <Glyph name="document" x={337} y={109} scale={1.1} color={accent} />
      <Arrow d="M308 101q76-67 108 13" x={416} y={114} angle={67} color={gold} />
      <Arrow d="M416 178q-51 76-105 9" x={311} y={187} angle={231} color={gold} />
      <path d="M302 151h23" stroke={accent} strokeOpacity=".4" />
    </Drawing>,
  },
  'lecture-practice-11': {
    afterHeading: 'はじめに：終了も計画の一部にする',
    variant: 'practice-continuation-and-open-exit',
    title: '継続だけでなく終了も相談する',
    description: '再評価する輪から、対話を経て生活へ戻る道も開いた図。全員が同じ順番で回復する意味ではなく、必要性と本人の希望から継続や終了を相談することを示します。',
    artwork: <Drawing>
      <path d="M104 84C49 136 79 220 144 220c66 0 92-79 42-126" stroke={water} strokeOpacity=".5" />
      <Arrow x={186} y={94} angle={228} color={water} />
      <Calendar x={110} y={128} color={water} />
      <Speech x={156} y={48} color={accent} />
      <Arrow d="M218 81h104q38 0 38 37v38" x={360} y={156} angle={90} color={accent} />
      <Home x={328} y={170} />
      <path d="M290 126v105M290 126h21M290 231h21" stroke={gold} strokeOpacity=".45" />
      <path d="M331 242h67" strokeOpacity=".15" />
    </Drawing>,
  },
  'lecture-practice-12': {
    afterHeading: '3. 自分で振り返る6つの観点',
    variant: 'practice-reflection-across-skills',
    title: '六つの観点を振り返り次の学びを選ぶ',
    description: '開いた本を中心に、安全、記録、推論、目標、対話、見直しの記号を配置した図。学習を振り返るための表現で、診療技能の認定や修了証ではありません。',
    artwork: <Drawing>
      <path d="M240 49 340 95 340 191 240 237 140 191 140 95Z" stroke={accent} strokeOpacity=".2" />
      <path d="M240 87v24M306 111l-35 16M306 177l-35-16M240 199v-22M174 177l35-16M174 111l35 16" stroke={gold} strokeOpacity=".35" />
      <OpenBook x={208} y={112} />
      <Disk x={240} y={49} r={29}><Glyph name="shield" x={217} y={26} scale={.7} color={accent} /></Disk>
      <Disk x={340} y={95} r={29}><Glyph name="document" x={317} y={72} scale={.7} color={water} /></Disk>
      <Disk x={340} y={191} r={29}><Glyph name="thought" x={317} y={168} scale={.7} color={gold} /></Disk>
      <Disk x={240} y={237} r={29}><Target x={240} y={237} r={17} /></Disk>
      <Disk x={140} y={191} r={29}><g transform="translate(117 168) scale(.7)"><Speech x={0} y={0} color={accent} /></g></Disk>
      <Disk x={140} y={95} r={29}><path d="M151 80a19 19 0 1 0 5 24" stroke={water} /><Arrow x={151} y={80} angle={29} color={water} /></Disk>
    </Drawing>,
  },
};
