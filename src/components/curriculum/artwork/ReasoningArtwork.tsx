import type { ReactNode } from 'react';
import type { WordlessArtDefinition } from './types';
import { Arrow, Disk, Glyph, accent, gold, ink, surface, water } from './WordlessPrimitives';

function Panel({ x, y, width = 120, height = 156, children }: { x: number; y: number; width?: number; height?: number; children?: ReactNode }) {
  return <g><rect x={x} y={y} width={width} height={height} rx="16" fill={surface} stroke={accent} strokeOpacity=".3" strokeWidth="1.5" />{children}</g>;
}

function Bubble({ x, y, scale = 1, color = accent }: { x: number; y: number; scale?: number; color?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={color} strokeWidth="2.3" fill={surface} strokeLinecap="round" strokeLinejoin="round"><path d="M10 5h58a13 13 0 0 1 13 13v29a13 13 0 0 1-13 13H35L16 75V60h-6A13 13 0 0 1-3 47V18A13 13 0 0 1 10 5Z" /><circle cx="22" cy="32" r="3" fill={color} /><circle cx="39" cy="32" r="3" fill={color} /><circle cx="56" cy="32" r="3" fill={color} /></g>;
}

function Empty({ x, y, size = 36 }: { x: number; y: number; size?: number }) {
  return <rect x={x} y={y} width={size} height={size} rx="8" stroke={gold} strokeWidth="2" strokeDasharray="4 6" fill="none" />;
}

function Wind({ x, y, color = accent }: { x: number; y: number; color?: string }) {
  return <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round"><path d="M0 17h48c17 0 17-19 5-19-7 0-10 4-10 8M7 32h64M0 47h39c17 0 17 19 5 19-7 0-10-4-10-8" /></g>;
}

/** Reading aids for the traditional concepts and reasoning tasks in these sections. */
export const REASONING_CONCEPT_ART: Readonly<Record<string, WordlessArtDefinition>> = {
  'lecture-pathomechanism-1': {
    afterHeading: '第3節：失調の起点と「循環論法」の排除',
    variant: 'reasoning-open-the-explanation',
    title: '説明の輪に、新しい観察を加える',
    description: '左の思考を囲む小さな輪に、右の観察から別の線が入る。思考だけを行き来せず、追加の情報で説明を確かめる学習の比喩。',
    artwork: <>
      <circle cx="158" cy="139" r="71" stroke={accent} strokeOpacity=".18" fill="none" strokeWidth="14" />
      <Glyph name="thought" x={112} y={91} scale={1.45} />
      <Arrow d="M103 94a71 71 0 0 1 121 37" x={224} y={131} angle={80} />
      <Arrow d="M211 189a71 71 0 0 1-120-40" x={91} y={149} angle={-100} />
      <Disk x={362} y={105} r={45}><Glyph name="eye" x={330} y={73} color={gold} /></Disk>
      <Arrow d="M329 143q-20 61-91 43" x={238} y={186} angle={190} color={gold} />
      <Empty x={344} y={189} />
    </>,
  },
  'lecture-pathomechanism-2': {
    afterHeading: '第3節：発症を左右する4大ファクター',
    variant: 'reasoning-background-quadrants',
    title: '環境・時間・身体・暮らしを分けて確認する',
    description: '四つの区画に、天候、時計、人、食事と休息の形を配置する。確認する四つの観点であり、原因の割合や発症を計算する図ではない。',
    artwork: <g stroke={accent} strokeWidth="1.5" fill="none">
      <path d="M240 39v202M102 140h276" opacity=".2" />
      <g stroke={water} strokeWidth="2.3" strokeLinecap="round"><path d="M125 84c-13-14 3-31 17-24 8-22 40-17 43 4 22-1 27 30 5 33h-54M143 109l-4 9M159 109l-4 9M175 109l-4 9" /></g>
      <Glyph name="clock" x={287} y={51} color={gold} />
      <Glyph name="person" x={127} y={158} color={accent} />
      <Glyph name="cup" x={267} y={160} scale={.85} />
      <Glyph name="moon" x={329} y={164} scale={.65} color={water} />
      <circle cx="240" cy="140" r="6" fill={surface} />
    </g>,
  },
  'lecture-pathomechanism-3': {
    afterHeading: '導入：不足と滞りは、何を比べているのか',
    variant: 'reasoning-support-and-motion',
    title: '支える働きと、動きのあり方を別々に見る',
    description: '左に支えの一部が点線になった台、右に向きや曲がりが異なる流線を置く。気の不足と運動失調を別の観点として考える比喩で、気の量や体内の経路を示さない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Panel x={60} y={57} width={156} height={166} />
      <Panel x={264} y={57} width={156} height={166} />
      <path d="M91 170h94M103 161v-44h70v44" stroke={accent} strokeWidth="3" />
      <path d="M138 170v28" stroke={gold} strokeWidth="3" strokeDasharray="4 7" />
      <path d="M112 198h52" stroke={accent} strokeWidth="2.3" />
      <circle cx="138" cy="97" r="12" stroke={accent} strokeWidth="2.3" />
      <Arrow d="M295 110h68q28 0 28 29t-28 29h-17" x={346} y={168} angle={180} />
      <Arrow d="M309 195v-44" x={309} y={151} angle={-90} color={gold} />
      <path d="M294 82h30M332 82h17" stroke={accent} strokeWidth="2" strokeDasharray="3 6" />
    </g>,
  },
  'lecture-pathomechanism-4': {
    afterHeading: '第2節：潤す働きの不足と津液不足',
    variant: 'reasoning-moisture-metaphor',
    title: '潤す働きを自然の比喩で考える',
    description: '葉と小さな滴を広い点線の囲みに描く。潤いに着目する伝統用語の比喩であり、体液量の測定や飲水の指示ではない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="247" cy="224" rx="133" ry="12" fill={accent} fillOpacity=".035" />
      <Glyph name="leaf" x={174} y={95} scale={1.75} color={accent} />
      <Glyph name="drop" x={128} y={62} scale={.72} color={water} />
      <circle cx="251" cy="143" r="91" stroke={water} strokeWidth="1.5" strokeOpacity=".35" strokeDasharray="4 10" />
      <path d="M132 191q-28-22-15-46M350 99q24 28 12 62" stroke={water} strokeWidth="2" strokeOpacity=".35" />
      <path d="M194 221h103" stroke={accent} strokeWidth="1.5" strokeOpacity=".25" />
    </g>,
  },
  'lecture-pathomechanism-5': {
    afterHeading: '第3節：瘀血と複数の背景を比較する',
    variant: 'reasoning-stasis-backgrounds',
    title: '停滞という説明と、複数の背景を比較する',
    description: '中央の抽象的な曲線を囲んで、寒・熱と動きの象徴が点線でつながる。比較する背景を表し、血管、血栓や確定した原因を描いたものではない。',
    artwork: <g fill="none" strokeLinecap="round">
      <path d="M146 102 215 128M330 101l-64 27M241 207v-36" stroke={gold} strokeWidth="1.5" strokeDasharray="3 7" />
      <Disk x={240} y={140} r={44}><path d="M210 146c22-43 45 4 21 4s0-41 32-9" stroke={accent} strokeWidth="3" /></Disk>
      <Disk x={121} y={87} r={37}><Glyph name="snow" x={96} y={62} scale={.78} color={water} /></Disk>
      <Disk x={358} y={87} r={37}><Glyph name="sun" x={332} y={61} scale={.82} color={gold} /></Disk>
      <g transform="translate(216 212) scale(.7)"><Wind x={0} y={0} /></g>
    </g>,
  },
  'lecture-pathomechanism-6': {
    afterHeading: '第2節：寒熱の形成 ― 陰陽の偏盛と偏衰（四象限マトリクス）',
    variant: 'reasoning-warm-cool-comparison',
    title: '寒熱と不足・偏盛を別の観点として比べる',
    description: '四区画に炎と滴の組を配置し、一方が強調される組と一方が点線になる組を比べる。偏盛と不足を覚える比喩で、温度や陰陽の絶対量を示さない。',
    artwork: <g fill="none">
      <path d="M240 33v214M77 140h326" stroke={accent} strokeOpacity=".2" strokeWidth="1.5" />
      <Glyph name="flame" x={111} y={49} scale={.98} color={gold} /><Glyph name="drop" x={174} y={68} scale={.6} color={water} />
      <Glyph name="flame" x={277} y={63} scale={.7} color={gold} /><g opacity=".38"><Glyph name="drop" x={335} y={68} scale={.6} color={water} /></g>
      <circle cx="354" cy="88" r="28" stroke={water} strokeDasharray="3 6" strokeOpacity=".45" />
      <Glyph name="drop" x={110} y={158} scale={.96} color={water} /><Glyph name="flame" x={175} y={176} scale={.6} color={gold} />
      <Glyph name="drop" x={276} y={173} scale={.7} color={water} /><g opacity=".38"><Glyph name="flame" x={335} y={175} scale={.6} color={gold} /></g>
      <circle cx="354" cy="195" r="28" stroke={gold} strokeDasharray="3 6" strokeOpacity=".45" />
    </g>,
  },
  'lecture-pathomechanism-7': {
    afterHeading: '第3節：侵入と伝変の多様性（一本道モデルの脱却）',
    variant: 'reasoning-many-possible-courses',
    title: '一つの経過から、複数の説明を保つ',
    description: '一つの記録から複数の点線が枝分かれし、異なる位置の空の輪へ向かう。比較する候補であり、感染の経路や悪化の順番を表さない。',
    artwork: <g fill="none" strokeLinecap="round">
      <Disk x={120} y={141} r={48}><Glyph name="document" x={86} y={105} scale={1.08} /></Disk>
      <path d="M170 140h46q28 0 42-30l15-30M217 140h82M217 140q28 0 42 29l14 29" stroke={accent} strokeWidth="2" strokeDasharray="4 7" />
      <circle cx="300" cy="63" r="29" stroke={gold} strokeWidth="2" />
      <circle cx="351" cy="140" r="35" stroke={water} strokeWidth="2" />
      <circle cx="300" cy="217" r="29" stroke={accent} strokeWidth="2" />
      <circle cx="300" cy="63" r="7" fill={gold} fillOpacity=".14" />
      <path d="M338 140h26M351 127v26" stroke={water} strokeWidth="2" strokeOpacity=".4" />
      <circle cx="300" cy="217" r="12" stroke={accent} strokeDasharray="2 5" />
    </g>,
  },
  'lecture-pathomechanism-8': {
    afterHeading: '第4節：労逸不均（過労と過度の安静）',
    variant: 'reasoning-activity-rest-context',
    title: '活動と休息を、時間や背景と一緒に考える',
    description: '活動する人と休息を表す月を天秤の左右に置き、台座に時計を添える。活動と休息を比較する比喩で、正しい配分や身体の残量を数値化していない。',
    artwork: <g stroke={accent} strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M240 78v132M201 215h78M130 89h220M137 90l-30 89h61l-31-89M343 90l-30 89h61l-31-89" />
      <path d="M107 179q30 24 61 0M313 179q30 24 61 0" fill={accent} fillOpacity=".05" />
      <circle cx="240" cy="88" r="8" fill={surface} />
      <Glyph name="person" x={110} y={113} scale={.85} />
      <Glyph name="moon" x={317} y={112} scale={.8} color={water} />
      <Disk x={240} y={220} r={31}><Glyph name="clock" x={218} y={198} scale={.68} color={gold} /></Disk>
    </g>,
  },
  'lecture-pathomechanism-9': {
    afterHeading: '第2節：気血津液の複数の側面',
    variant: 'reasoning-overlapping-perspectives',
    title: '複数の側面を重ねて見る',
    description: '三つの半透明の円に、動き、養い、潤いの象徴を置く。異なる観点が併存することを表し、病態が順に悪化する矢印は描いていない。',
    artwork: <g>
      <circle cx="190" cy="122" r="76" fill={accent} fillOpacity=".045" stroke={accent} strokeWidth="1.5" strokeOpacity=".45" />
      <circle cx="290" cy="122" r="76" fill={gold} fillOpacity=".045" stroke={gold} strokeWidth="1.5" strokeOpacity=".45" />
      <circle cx="240" cy="183" r="76" fill={water} fillOpacity=".045" stroke={water} strokeWidth="1.5" strokeOpacity=".45" />
      <g transform="translate(143 87) scale(.75)"><Wind x={0} y={0} /></g>
      <Glyph name="leaf" x={279} y={85} scale={.82} color={gold} />
      <Glyph name="drop" x={216} y={182} scale={.78} color={water} />
    </g>,
  },
  'lecture-pathomechanism-10': {
    afterHeading: '第3節：本虚標実（ほんきょひょうじつ）の樹木モデル',
    variant: 'reasoning-root-and-branches',
    title: '根と枝葉で、本と標の二つの視点を覚える',
    description: '地面の上下に枝葉と広がる根を描き、それぞれを別の弧で囲む。本と標を考える樹木の比喩で、身体の深さや病気の原因を示す解剖図ではない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M241 196V88M241 134l-47-39M241 115l46-39M240 164l60-33" stroke={accent} strokeWidth="4" />
      <path d="M190 95c-23-5-38-30-27-50 26 3 41 26 27 50ZM288 77c-3-25 18-44 41-41 5 29-16 44-41 41ZM299 131c3-25 31-40 48-29-4 28-20 38-48 29Z" stroke={accent} strokeWidth="2" fill={accent} fillOpacity=".07" />
      <path d="M114 187h250" stroke={gold} strokeWidth="2" strokeDasharray="3 6" />
      <path d="M241 191l-30 27-37 18M212 217l-11 32M241 191l30 27 39 18M268 216l12 31M241 191v62" stroke={gold} strokeWidth="2.5" />
      <path d="M115 146c-10-44 5-87 41-108M365 154c19-38 12-77-12-98" stroke={accent} strokeOpacity=".25" strokeWidth="1.5" />
      <path d="M127 207q23 46 62 48M351 207q-17 39-42 47" stroke={gold} strokeOpacity=".35" strokeWidth="1.5" />
    </g>,
  },
  'lecture-pathomechanism-11': {
    afterHeading: '第3節：支持情報と「反証」の力学',
    variant: 'reasoning-evidence-does-not-vote',
    title: '合う情報・合わない情報・未確認を残す',
    description: '一枚の大きな記録に、形が合う組、形が異なる組、空の点線枠を別々に置く。情報の数を多数決にせず、種類と内容を比較するための図。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Panel x={117} y={36} width={246} height={208} />
      <path d="M147 105h186M147 172h186" stroke={accent} strokeOpacity=".2" strokeWidth="1.5" />
      <circle cx="181" cy="73" r="15" stroke={accent} strokeWidth="2.5" /><circle cx="291" cy="73" r="15" stroke={accent} strokeWidth="2.5" />
      <path d="M224 73h32" stroke={accent} strokeWidth="2" strokeDasharray="3 5" />
      <circle cx="181" cy="138" r="15" stroke={accent} strokeWidth="2.5" /><path d="m291 119 19 19-19 19-19-19Z" stroke={gold} strokeWidth="2.5" />
      <path d="M224 138h32" stroke={gold} strokeWidth="2" strokeDasharray="3 5" />
      <Empty x={162} y={188} size={36} /><Empty x={273} y={188} size={36} />
      <path d="M77 199V83M71 105l6-22 6 22" stroke={water} strokeWidth="1.5" strokeOpacity=".4" />
    </g>,
  },
  'lecture-pathomechanism-12': {
    afterHeading: '第2節：病機仮説から「診断の問い」への変換',
    variant: 'reasoning-hypothesis-to-inquiry',
    title: '仮説から、次に確かめることへ進む',
    description: '思考の吹き出しから、空の記録欄を拡大する虫眼鏡へつなぐ。説明候補を追加確認の問いに変える学習を表す。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Disk x={120} y={144} r={53}><Glyph name="thought" x={83} y={102} scale={1.2} /></Disk>
      <Arrow d="M180 145h51" x={231} y={145} color={gold} />
      <Panel x={259} y={44} width={126} height={178} />
      <Empty x={280} y={66} size={28} /><Empty x={329} y={66} size={28} />
      <circle cx="319" cy="157" r="44" stroke={accent} strokeWidth="3" fill={surface} />
      <Empty x={301} y={139} />
      <path d="m351 189 41 42" stroke={accent} strokeWidth="5" />
    </g>,
  },
  'lecture-diagnosis-1': {
    afterHeading: '第2節：診断の順序は「基本形」であり、一方通行ではない',
    variant: 'reasoning-return-to-safety',
    title: '新しい情報があれば、確認へ戻る',
    description: '安全を表す盾を上部に置き、観察・思考・記録の図を回る線と戻る線で結ぶ。診断学習で確認と見直しを繰り返すことを表す。',
    artwork: <>
      <Arrow d="M286 69q72 10 74 57" x={360} y={126} angle={90} />
      <Arrow d="M339 193q-43 40-89 39" x={250} y={232} angle={180} />
      <Arrow d="M190 226q-55-8-65-43" x={125} y={183} angle={-105} />
      <Arrow d="M129 119q16-40 65-48" x={194} y={71} angle={-10} />
      <Arrow d="M296 136q-16-30-30-42" x={266} y={94} angle={-130} color={gold} />
      <Disk x={240} y={60} r={41}><Glyph name="shield" x={213} y={33} scale={.84} /></Disk>
      <Disk x={358} y={160} r={39}><Glyph name="eye" x={331} y={133} scale={.85} /></Disk>
      <Disk x={211} y={225} r={38}><Glyph name="thought" x={185} y={199} scale={.8} /></Disk>
      <Disk x={118} y={150} r={38}><Glyph name="document" x={89} y={121} scale={.9} /></Disk>
    </>,
  },
  'lecture-diagnosis-2': {
    afterHeading: '弁証より先に安全性を確認する',
    variant: 'reasoning-safety-before-classification',
    title: '安全性の確認を先に置く',
    description: '左の人と右の記録の間に、大きな盾を前面に置く。分類を進める前に安全性と必要な医学的評価を確認する優先順を表す。',
    artwork: <>
      <path d="M132 144h219" stroke={accent} strokeOpacity=".18" strokeWidth="2" strokeDasharray="4 7" />
      <Glyph name="person" x={74} y={103} scale={1.2} />
      <Glyph name="document" x={341} y={112} scale={.95} />
      <circle cx="240" cy="139" r="84" fill={surface} stroke={gold} strokeOpacity=".3" strokeWidth="1.5" />
      <Glyph name="shield" x={172} y={70} scale={2.15} color={accent} />
      <path d="M192 242h96" stroke={gold} strokeWidth="2" strokeLinecap="round" />
    </>,
  },
  'lecture-diagnosis-3': {
    afterHeading: '第2節：時間軸（タイムライン）の展開',
    variant: 'reasoning-timeline-and-context',
    title: '症状の経過と前後の出来事を並べる',
    description: '一本の時間の線に複数の印を置き、上側に会話と記録、下側に生活と時間の図を分ける。出来事の順序を整理する図で、前後関係から原因を決めない。',
    artwork: <g fill="none" strokeLinecap="round">
      <Arrow d="M65 143h354" x={419} y={143} />
      <path d="M107 112v65M223 112v65M339 112v65" stroke={accent} strokeWidth="2" />
      <circle cx="107" cy="143" r="6" fill={surface} stroke={accent} strokeWidth="2" /><circle cx="223" cy="143" r="6" fill={surface} stroke={accent} strokeWidth="2" /><circle cx="339" cy="143" r="6" fill={surface} stroke={accent} strokeWidth="2" />
      <Bubble x={79} y={48} scale={.75} />
      <Glyph name="document" x={304} y={40} scale={1.05} />
      <Glyph name="cup" x={190} y={184} scale={.8} color={gold} />
      <Glyph name="clock" x={342} y={186} scale={.8} color={water} />
      <path d="M252 207h79" stroke={water} strokeWidth="1.5" strokeDasharray="3 7" strokeOpacity=".5" />
    </g>,
  },
  'lecture-diagnosis-4': {
    afterHeading: '第1節：質問の漏斗（ファネル）モデル',
    variant: 'reasoning-conversation-funnel',
    title: '広く聞き、具体化し、確認する',
    description: '大きな会話の吹き出しを上に置き、幅の狭まる囲みの先に小さな確認の吹き出しを置く。質問を具体化する流れの比喩で、全員に同じ順序を強制する手順ではない。',
    artwork: <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M131 75h218l-76 91v41h-66v-41Z" stroke={accent} strokeWidth="2" fill={accent} fillOpacity=".035" />
      <path d="M165 115h150M197 154h86" stroke={accent} strokeWidth="1.5" strokeDasharray="3 7" strokeOpacity=".4" />
      <Bubble x={188} y={25} scale={1.2} />
      <Bubble x={218} y={209} scale={.55} color={gold} />
      <Arrow d="M370 94q24 39-3 83" x={367} y={177} angle={120} color={gold} opacity={.55} />
    </g>,
  },
  'lecture-diagnosis-5': {
    afterHeading: '第2節：全体から局所へ観察する',
    variant: 'reasoning-whole-and-detail',
    title: '全体を見て、特徴を具体的に確かめる',
    description: '人の全体像の周囲に観察枠を置き、右に拡大した目と小さな観察枠を描く。全体から局所へ見る学習を表し、外見から病名や予後を判定しない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M85 93V53h40M197 53h40v40M237 187v40h-40M125 227H85v-40" stroke={accent} strokeWidth="2" />
      <Glyph name="person" x={103} y={82} scale={1.8} />
      <circle cx="161" cy="114" r="24" stroke={gold} strokeWidth="1.5" strokeDasharray="3 5" />
      <path d="m185 112 112-20M184 129l110 46" stroke={gold} strokeWidth="1.5" strokeOpacity=".45" />
      <circle cx="346" cy="134" r="60" stroke={accent} strokeWidth="2.5" fill={surface} />
      <Glyph name="eye" x={308} y={96} scale={1.2} />
      <path d="m390 177 30 31" stroke={accent} strokeWidth="5" />
    </g>,
  },
  'lecture-diagnosis-6': {
    afterHeading: '第4節：切診の再現性の限界と照合原則',
    variant: 'reasoning-observation-conditions',
    title: '異なる時点の観察を、条件と一緒に残す',
    description: '左右の記録に異なる曲線を描き、各記録の上に時計を添える。観察時点や条件を記録して照合する考え方で、曲線は脈や循環の実測波形ではない。',
    artwork: <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <Panel x={61} y={76} width={140} height={143} /><Panel x={279} y={76} width={140} height={143} />
      <Glyph name="clock" x={106} y={32} scale={.78} color={gold} /><Glyph name="clock" x={324} y={32} scale={.78} color={water} />
      <path d="M87 129q16-24 31 0t31 0 31 0M87 157q16-10 31 0t31 0 31 0" stroke={accent} strokeWidth="2.3" />
      <path d="M305 129q16-10 31 0t31 0 31 0M305 157q16-24 31 0t31 0 31 0" stroke={water} strokeWidth="2.3" />
      <Empty x={95} y={181} size={20} /><Empty x={313} y={181} size={20} />
      <path d="M217 134h46M217 158h46" stroke={gold} strokeWidth="2" strokeDasharray="3 6" />
      <path d="M133 237q105 26 213 0" stroke={accent} strokeWidth="1.5" strokeOpacity=".25" />
    </g>,
  },
  'lecture-diagnosis-7': {
    afterHeading: '第1節：八綱の観点を分ける',
    variant: 'reasoning-separate-classification-axes',
    title: '複数の分類軸を混ぜずに比べる',
    description: '四本の独立した比較線の両端に、外と内、寒と熱、疎と密、明と暗の抽象形を置く。伝統分類の観点を分ける補助で、人体の深度や温度や重症度の尺度ではない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[58, 112, 166, 220].map((y) => <g key={y}><path d={`M165 ${y}h150`} stroke={accent} strokeWidth="1.5" strokeOpacity=".4" /><path d={`M240 ${y - 6}v12`} stroke={accent} strokeWidth="1.5" strokeOpacity=".4" /></g>)}
      <circle cx="125" cy="58" r="20" stroke={accent} strokeWidth="2" /><circle cx="125" cy="58" r="6" stroke={accent} strokeWidth="2" />
      <circle cx="355" cy="58" r="20" stroke={accent} strokeWidth="2" /><circle cx="355" cy="58" r="13" fill={accent} fillOpacity=".1" />
      <Glyph name="snow" x={105} y={92} scale={.62} color={water} /><Glyph name="flame" x={335} y={90} scale={.65} color={gold} />
      <circle cx="125" cy="166" r="19" stroke={gold} strokeWidth="2" strokeDasharray="3 6" /><circle cx="355" cy="166" r="19" stroke={gold} strokeWidth="3" /><circle cx="355" cy="166" r="11" stroke={gold} strokeWidth="2" />
      <circle cx="125" cy="220" r="20" stroke={ink} strokeWidth="1.5" fill={ink} fillOpacity=".11" /><circle cx="355" cy="220" r="20" stroke={gold} strokeWidth="1.5" fill={gold} fillOpacity=".06" />
    </g>,
  },
  'lecture-diagnosis-8': {
    afterHeading: '第3節：津液の異常を、不足と停滞の両面から考える',
    variant: 'reasoning-two-fluid-perspectives',
    title: '不足と停滞の観点を一緒に保つ',
    description: '左右の異なる形の囲みに、小さな滴と、ゆっくり曲がる水の線を描く。潤いの不足と巡りの停滞という比較の比喩で、体液量や飲水量を決める図ではない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M202 71q-70-40-127 22t-4 115q57 41 122-6" stroke={water} strokeWidth="1.8" strokeDasharray="4 8" />
      <path d="M278 71q70-40 127 22t4 115q-57 41-122-6" stroke={water} strokeWidth="1.8" />
      <Glyph name="drop" x={98} y={102} scale={.82} color={water} />
      <path d="M300 118c57-47 95 17 43 25s-24 57 29 38" stroke={water} strokeWidth="3" />
      <path d="M294 102c60-35 108 11 78 33M303 166c-10 35 34 45 68 29" stroke={water} strokeOpacity=".25" strokeWidth="1.5" />
      <Glyph name="comparison" x={209} y={117} scale={1} color={accent} />
    </g>,
  },
  'lecture-diagnosis-9': {
    afterHeading: '第3節：外候と観察の区別',
    variant: 'reasoning-observation-and-traditional-map',
    title: '見えた特徴と、伝統上の関連を分ける',
    description: '左に観察する目、右に象徴を結ぶ小さな関係図を置き、二つを別の枠で囲む。観察と伝統的な配当を区別し、外見から臓器疾患を確定しない。',
    artwork: <g fill="none" strokeLinecap="round">
      <Panel x={55} y={57} width={156} height={166} />
      <Panel x={269} y={57} width={156} height={166} />
      <Glyph name="eye" x={88} y={108} scale={1.4} />
      <path d="M82 85h20M164 85h20M82 195h20M164 195h20" stroke={gold} strokeWidth="2" />
      <path d="m348 95-43 73h84Z" stroke={accent} strokeWidth="1.5" strokeDasharray="3 6" strokeOpacity=".5" />
      <Disk x={348} y={95} r={24}><Glyph name="leaf" x={331} y={78} scale={.53} /></Disk>
      <Disk x={305} y={171} r={24}><Glyph name="drop" x={288} y={154} scale={.53} color={water} /></Disk>
      <Disk x={389} y={171} r={24}><Glyph name="flame" x={372} y={154} scale={.53} color={gold} /></Disk>
      <path d="M240 94v92" stroke={gold} strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="3 8" />
    </g>,
  },
  'lecture-diagnosis-10': {
    afterHeading: '第1節：鑑別仮説マトリクス',
    variant: 'reasoning-comparison-with-missing-cells',
    title: '二つの候補に、合う点・合わない点・空欄を並べる',
    description: '二列の比較表に、同じ形、異なる形、空の点線枠を並べる。候補を比べて不足情報を残す図で、所見の点数化や確率を示さない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Panel x={113} y={32} width={254} height={216} />
      <path d="M240 48v185M131 94h218M131 145h218M131 196h218" stroke={accent} strokeOpacity=".2" strokeWidth="1.5" />
      <Glyph name="thought" x={155} y={41} scale={.7} /><Glyph name="thought" x={281} y={41} scale={.7} color={gold} />
      <circle cx="177" cy="120" r="12" stroke={accent} strokeWidth="2.3" /><circle cx="303" cy="120" r="12" stroke={accent} strokeWidth="2.3" />
      <path d="m177 156 14 14-14 14-14-14ZM289 158h27v26h-27Z" stroke={gold} strokeWidth="2.3" />
      <Empty x={163} y={206} size={28} /><Empty x={289} y={206} size={28} />
      <path d="M89 73V217M385 73v144" stroke={water} strokeOpacity=".2" strokeWidth="2" />
    </g>,
  },
  'lecture-diagnosis-11': {
    afterHeading: '第4節：東洋医学版SOAPカルテ記述フォーマット',
    variant: 'reasoning-four-record-compartments',
    title: '本人の報告・観察・解釈・計画を分けて記録する',
    description: '一枚の記録を四つに分け、会話、目、思考、次へ向かう道を描く。SOAPの各欄の役割を分ける補助で、図内に文字は使わない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Panel x={101} y={25} width={278} height={230} />
      <path d="M240 42v197M116 140h248" stroke={accent} strokeWidth="1.5" strokeOpacity=".2" />
      <Bubble x={139} y={52} scale={.78} />
      <Glyph name="eye" x={277} y={51} scale={1.05} />
      <Glyph name="thought" x={135} y={162} scale={1.05} color={gold} />
      <Arrow d="M279 211h23q14 0 14-14v-14q0-13 14-13h15" x={345} y={170} color={accent} />
      <circle cx="279" cy="211" r="5" fill={surface} stroke={accent} strokeWidth="2" />
    </g>,
  },
  'lecture-diagnosis-12': {
    afterHeading: '第2節：5段階情報開示シミュレーション演習',
    variant: 'reasoning-new-information-revises-record',
    title: '追加された情報を受けて、記録を見直す',
    description: '奥から手前へ重なる記録に、新たな形が加わる。下から戻る矢印は、新しい情報で以前の判断を見直すことを表す。病気の進行や治療の成果を描いていない。',
    artwork: <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Panel x={80} y={32} width={135} height={142} />
      <circle cx="119" cy="75" r="13" stroke={accent} strokeWidth="2.3" /><Empty x={160} y={62} size={26} />
      <Panel x={174} y={66} width={135} height={142} />
      <circle cx="212" cy="108" r="13" stroke={accent} strokeWidth="2.3" /><path d="m262 94 14 14-14 14-14-14Z" stroke={gold} strokeWidth="2.3" />
      <Panel x={268} y={100} width={135} height={142} />
      <circle cx="306" cy="142" r="13" stroke={accent} strokeWidth="2.3" /><path d="m356 128 14 14-14 14-14-14Z" stroke={gold} strokeWidth="2.3" />
      <Empty x={293} y={184} size={27} /><Empty x={343} y={184} size={27} />
      <Arrow d="M264 246q-99 20-138-49" x={126} y={197} angle={-118} color={water} />
    </g>,
  },
};
