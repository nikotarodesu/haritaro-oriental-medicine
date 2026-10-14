import type { ReactNode } from "react";
import type { WordlessArtDefinition } from "./types";
import { Arrow, Disk, Glyph, accent, gold, ink, surface, water } from "./WordlessPrimitives";

function Panel({ x, y = 45, width = 170, height = 190, children }: { x: number; y?: number; width?: number; height?: number; children?: ReactNode }) {
  return <g><rect x={x} y={y} width={width} height={height} rx="24" fill={surface} stroke={accent} strokeOpacity=".2" strokeWidth="1.5" />{children}</g>;
}

function Wind({ x, y, scale = 1, color = accent }: { x: number; y: number; scale?: number; color?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M0 14h39c17 0 17-22 3-22-6 0-9 4-9 8M0 28h58c16 0 16 22 2 22-6 0-9-4-9-8M8 42h23" /></g>;
}

function Vessel({ x, y, scale = 1, color = accent }: { x: number; y: number; scale?: number; color?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={color} fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 9h58M13 9v50c0 12 10 18 24 18s24-6 24-18V9" /><path d="M15 43q11-8 22 0t22 0v16c0 11-9 16-22 16s-22-5-22-16Z" fill={color} fillOpacity=".1" stroke="none" /><circle cx="28" cy="54" r="4" fill={color} fillOpacity=".5" stroke="none" /><circle cx="46" cy="60" r="3" fill={color} fillOpacity=".3" stroke="none" /></g>;
}

function RecordCard({ x, y, color = accent, children, dashed = false }: { x: number; y: number; color?: string; children?: ReactNode; dashed?: boolean }) {
  return <g><rect x={x} y={y} width="96" height="126" rx="15" fill={surface} stroke={color} strokeWidth="1.8" strokeDasharray={dashed ? "6 7" : undefined} />{children}<path d={`M${x + 20} ${y + 94}h56M${x + 20} ${y + 105}h37`} stroke={color} strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" /></g>;
}

function HalfDisk({ x, y, radius = 43, reverse = false }: { x: number; y: number; radius?: number; reverse?: boolean }) {
  return <g><circle cx={x} cy={y} r={radius} fill={water} fillOpacity=".12" stroke={water} strokeOpacity=".65" strokeWidth="1.8" /><path d={`M${x} ${y - radius}a${radius} ${radius} 0 0 ${reverse ? 0 : 1} 0 ${radius * 2}Z`} fill={gold} fillOpacity=".55" /><path d={`M${x} ${y - radius}v${radius * 2}`} stroke={surface} strokeWidth="2" /></g>;
}

/** Section-specific diagrams are metaphors or classification aids, not anatomy. */
export const FOUNDATION_CONCEPT_ART: Readonly<Record<string, WordlessArtDefinition>> = {
  "lecture-yinyang-1": {
    afterHeading: "2. 陰陽の基本性質", variant: "foundation-paired-qualities",
    title: "対になる明暗・温冷・方向を比べる",
    description: "左右の円に太陽と月を描き、太陽側からは外へ、月側へは内へ向かう矢印を添える。陰陽の代表的な性質を比べる伝統的な分類で、身体の測定結果ではない。",
    artwork: <><circle cx="140" cy="140" r="80" fill={gold} fillOpacity=".07" /><circle cx="340" cy="140" r="80" fill={water} fillOpacity=".07" /><Glyph name="sun" x={102} y={102} scale={1.2} color={gold} /><Glyph name="moon" x={302} y={102} scale={1.2} color={water} /><Arrow d="M140 75V44" x={140} y={44} angle={-90} color={gold} /><Arrow d="M75 140H44" x={44} y={140} angle={180} color={gold} /><Arrow d="M340 44v31" x={340} y={75} angle={90} color={water} /><Arrow d="M436 140h-31" x={405} y={140} angle={180} color={water} /><path d="M233 72v136" stroke={ink} strokeWidth="1" strokeDasharray="3 8" opacity=".22" /></>,
  },
  "lecture-yinyang-3": {
    afterHeading: "3. 陰陽互根（いんようごこん）", variant: "foundation-mutual-ground",
    title: "一方を支える相手との関係",
    description: "色の異なる二つの輪が重なり、上と下を逆向きの矢印で結ぶ。陰陽互根を相互に支え合う関係として表した比喩で、生理学的な生成経路ではない。",
    artwork: <><circle cx="194" cy="140" r="73" fill={gold} fillOpacity=".1" stroke={gold} strokeWidth="2.5" /><circle cx="286" cy="140" r="73" fill={water} fillOpacity=".1" stroke={water} strokeWidth="2.5" /><circle cx="194" cy="140" r="15" fill={water} fillOpacity=".6" /><circle cx="286" cy="140" r="15" fill={gold} fillOpacity=".6" /><Arrow d="M126 66C179 18 301 18 354 66" x={354} y={66} angle={40} color={gold} /><Arrow d="M354 214c-53 48-175 48-228 0" x={126} y={214} angle={-140} color={water} /></>,
  },
  "lecture-yinyang-5": {
    afterHeading: "1. 身体の部位の陰陽", variant: "foundation-comparison-axes",
    title: "上下と内外では比較の基準が異なる",
    description: "左では一つの円を上下に、右では一つの円を中心と外側に分ける。同じ対象でも比べる軸によって分類が変わることを示す抽象図で、人体の部位や安全な深さは示していない。",
    artwork: <><Panel x={46}><circle cx="131" cy="140" r="58" fill={water} fillOpacity=".1" stroke={water} strokeWidth="2" /><path d="M73 140a58 58 0 0 1 116 0Z" fill={gold} fillOpacity=".35" /><path d="M66 140h130" stroke={surface} strokeWidth="3" /><Arrow d="M131 99V73" x={131} y={73} angle={-90} color={gold} /><Arrow d="M131 180v26" x={131} y={206} angle={90} color={water} /></Panel><Panel x={264}><circle cx="349" cy="140" r="58" fill={gold} fillOpacity=".25" stroke={gold} strokeWidth="2" /><circle cx="349" cy="140" r="29" fill={surface} stroke={water} strokeWidth="2" /><circle cx="349" cy="140" r="20" fill={water} fillOpacity=".15" /></Panel></>,
  },
  "lecture-yinyang-6": {
    afterHeading: "1. 「火」と「水」の学習モデル", variant: "foundation-fire-water-balance",
    title: "火と水を対にして偏りを考える",
    description: "同じ高さの天秤の左右に炎と水滴を置く。火を陽、水を陰に見立てる学習モデルで、体温・ホルモン・体液の量や健康状態を測定する図ではない。",
    artwork: <><path d="M100 143h280M240 143v83M210 228h60M240 143l-10 16h20Z" stroke={ink} strokeWidth="2.4" fill={surface} strokeLinecap="round" /><path d="m115 144-34 53h68ZM365 144l-34 53h68Z" fill="none" stroke={ink} strokeOpacity=".3" strokeWidth="1.5" /><path d="M80 199q35 28 70 0M330 199q35 28 70 0" fill={accent} fillOpacity=".07" stroke={accent} strokeWidth="2" /><Glyph name="flame" x={78} y={55} scale={1.15} color={gold} /><Glyph name="drop" x={328} y={55} scale={1.15} color={water} /><circle cx="240" cy="143" r="5" fill={accent} /></>,
  },
  "lecture-yinyang-7": {
    afterHeading: "1. 四診と単一所見の限界", variant: "foundation-four-observations",
    title: "異なる方法で得た情報を集める",
    description: "目、耳、会話、触れて確かめる手の四つの図を、中央の記録用紙へ点線で結ぶ。情報収集の枠組みを示し、所見を集めるだけで診断が決まる図ではない。",
    artwork: <><path d="M111 74l91 45M369 74l-91 45M111 206l91-45M369 206l-91-45" stroke={accent} strokeOpacity=".4" strokeWidth="1.6" strokeDasharray="5 6" /><Disk x={95} y={65} r={42}><Glyph name="eye" x={65} y={35} scale={.94} /></Disk><Disk x={385} y={65} r={42}><path d="M371 67c-12-21 21-37 30-17 7 16-9 19-10 31-1 13-18 15-21 3M379 58c1-12 16-8 14 2-1 7-10 8-10 17" fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" /></Disk><Disk x={95} y={215} r={42}><path d="M69 190h52v37H93l-14 12v-12H69Z" fill="none" stroke={ink} strokeWidth="2.2" strokeLinejoin="round" /><circle cx="83" cy="208" r="2" fill={ink} /><circle cx="95" cy="208" r="2" fill={ink} /><circle cx="107" cy="208" r="2" fill={ink} /></Disk><Disk x={385} y={215} r={42}><path d="M363 218v-15c0-7 8-7 8 0v-16c0-7 8-7 8 0v-4c0-7 8-7 8 0v6c0-7 8-7 8 0v22l7-9c5-6 11 0 7 7l-10 18c-4 7-9 11-17 11-12 0-19-8-19-20Z" fill="none" stroke={ink} strokeWidth="2.1" strokeLinejoin="round" /></Disk><rect x="202" y="95" width="76" height="92" rx="14" fill={surface} stroke={accent} strokeWidth="2" /><Glyph name="document" x={210} y={109} scale={.95} color={accent} /></>,
  },
  "lecture-yinyang-8": {
    afterHeading: "1. 分類・関係・変化の整理", variant: "foundation-classify-relate-change",
    title: "分類・関係・時間変化という三つの視点",
    description: "左は二色を分ける円、中央は対を結ぶ輪、右は小さい円から大きい円への並び。分類、関係、変化という三つの学習上の視点を表す。",
    artwork: <><Panel x={25} y={55} width={130} height={170}><HalfDisk x={90} y={140} radius={40} /></Panel><Panel x={175} y={55} width={130} height={170}><circle cx="223" cy="140" r="29" stroke={gold} strokeWidth="2" fill={gold} fillOpacity=".08" /><circle cx="258" cy="140" r="29" stroke={water} strokeWidth="2" fill={water} fillOpacity=".08" /></Panel><Panel x={325} y={55} width={130} height={170}><circle cx="352" cy="140" r="8" fill={water} fillOpacity=".65" /><circle cx="383" cy="140" r="14" fill={water} fillOpacity=".45" /><circle cx="428" cy="140" r="23" fill={water} fillOpacity=".25" stroke={water} strokeWidth="1.5" /><Arrow d="M347 187h81" x={428} y={187} /></Panel></>,
  },
  "lecture-qiblood-2": {
    afterHeading: "第1節：滋養・滋潤という役割", variant: "foundation-nourish-and-moisten",
    title: "養う役割と潤す役割を自然の比喩で比べる",
    description: "地面に根を張る若葉と、水滴を受ける葉を対にして描く。滋養と滋潤の役割を思い出す比喩で、栄養素や体液の量を示す図ではない。",
    artwork: <><Panel x={45}><Glyph name="leaf" x={99} y={78} scale={1.25} color={accent} /><path d="M129 143v50m0-22-20 19m20-7 18 21M83 175h97M129 193l-9 15" stroke={accent} strokeWidth="2.2" fill="none" strokeLinecap="round" /><path d="M82 219h98" stroke={gold} strokeWidth="2" strokeLinecap="round" /></Panel><Panel x={265}><Glyph name="drop" x={321} y={62} scale={.8} color={water} /><Glyph name="leaf" x={309} y={126} scale={1.2} color={accent} /><path d="M300 212q50-14 100 0" fill="none" stroke={water} strokeWidth="2" strokeLinecap="round" /><circle cx="370" cy="127" r="4" fill={water} fillOpacity=".4" /></Panel></>,
  },
  "lecture-qiblood-4": {
    afterHeading: "第1節：気と血の関係", variant: "foundation-guide-and-support",
    title: "導く役割と支える役割の二つの向き",
    description: "動きを表す風と養いを表す器を、上と下の逆向きの矢印で結ぶ。気と血の相互関係を学ぶ比喩で、物質の生成や測定された循環経路は表していない。",
    artwork: <><Disk x={135} y={140} r={64}><Wind x={105} y={127} /></Disk><Disk x={345} y={140} r={64}><Vessel x={308} y={98} color={water} /></Disk><Arrow d="M167 73c30-28 113-28 146 0" x={313} y={73} angle={35} color={accent} /><Arrow d="M313 207c-33 28-116 28-146 0" x={167} y={207} angle={-145} color={water} /></>,
  },
  "lecture-qiblood-5": {
    afterHeading: "第1節：架空例の情報を三つに分ける", variant: "foundation-fact-language-unknown",
    title: "記載されたこと、用語の説明、まだ分からないこと",
    description: "一つの記録から、目を置いた事実の欄、炎を置いた温める役割の欄、空の点線で示す未確認の欄へ分ける。温かく感じたという訴えを実測値や診断と混同しないための整理図。",
    artwork: <><Glyph name="document" x={214} y={10} scale={.8} color={accent} /><path d="M240 67v20H99v22M240 87v22M240 87h141v22" fill="none" stroke={accent} strokeOpacity=".4" strokeWidth="1.5" /><RecordCard x={51} y={117}><Glyph name="eye" x={68} y={135} scale={.97} /></RecordCard><RecordCard x={192} y={117} color={gold}><Glyph name="flame" x={214} y={134} scale={.82} color={gold} /></RecordCard><RecordCard x={333} y={117} color={water} dashed><circle cx="381" cy="162" r="21" stroke={water} strokeWidth="1.7" strokeDasharray="3 6" fill="none" /></RecordCard></>,
  },
  "lecture-zangfu-1": {
    afterHeading: "五臓六腑の名称", variant: "foundation-five-and-six-groups",
    title: "五つの臓と六つの腑を別のまとまりで数える",
    description: "左の囲みに五つ、右の囲みに六つの円を置く。五臓と六腑という名称の分類を表し、臓器の形や位置は示していない。",
    artwork: <><Panel x={42} width={179}><g fill={accent} fillOpacity=".16" stroke={accent} strokeWidth="2"><circle cx="102" cy="98" r="20" /><circle cx="161" cy="98" r="20" /><circle cx="131" cy="141" r="20" /><circle cx="102" cy="184" r="20" /><circle cx="161" cy="184" r="20" /></g></Panel><Panel x={259} width={179}><g fill={gold} fillOpacity=".08" stroke={gold} strokeWidth="2"><circle cx="320" cy="94" r="20" /><circle cx="378" cy="94" r="20" /><circle cx="320" cy="142" r="20" /><circle cx="378" cy="142" r="20" /><circle cx="320" cy="190" r="20" /><circle cx="378" cy="190" r="20" /></g></Panel></>,
  },
  "lecture-zangfu-2": {
    afterHeading: "宣発と粛降の違い", variant: "foundation-expansion-and-descent",
    title: "上・外へ広がる方向と、下・内へ向かう方向",
    description: "左の中心から上と外へ矢印が広がり、右では上と外から中心へ集まった後、下へ向かう。宣発と粛降という伝統的な働きの方向を示し、気体・液体の測定経路ではない。",
    artwork: <><circle cx="130" cy="158" r="34" fill={gold} fillOpacity=".1" stroke={gold} strokeWidth="2" /><circle cx="350" cy="128" r="34" fill={water} fillOpacity=".1" stroke={water} strokeWidth="2" /><Arrow d="M130 122V63" x={130} y={63} angle={-90} color={gold} /><Arrow d="M104 133 62 93" x={62} y={93} angle={-135} color={gold} /><Arrow d="M155 133 198 93" x={198} y={93} angle={-45} color={gold} /><Arrow d="M287 62 326 101" x={326} y={101} angle={45} color={water} /><Arrow d="M413 62 374 101" x={374} y={101} angle={135} color={water} /><Arrow d="M350 164v58" x={350} y={222} angle={90} color={water} /><path d="M240 45v190" stroke={ink} strokeOpacity=".16" strokeDasharray="3 8" /></>,
  },
  "lecture-zangfu-3": {
    afterHeading: "運化を自分の言葉にする", variant: "foundation-transform-and-distribute",
    title: "受け取る、変化させる、配るという役割",
    description: "穂としずくを左に、受け取る器を中央に、そこから分かれる三つの行き先を右に描く。運化の伝統的な役割を表す比喩で、消化器官や酵素の反応図ではない。",
    artwork: <><Glyph name="grain" x={49} y={52} scale={1.05} color={gold} /><Glyph name="drop" x={65} y={165} scale={.7} color={water} /><Arrow d="M112 97q45 0 62 28" x={174} y={125} angle={48} /><Arrow d="M115 193q38 0 60-32" x={175} y={161} angle={-45} /><Disk x={227} y={141} r={58}><Vessel x={190} y={99} /></Disk><path d="M286 141h29M315 74v136M315 74h42M315 141h42M315 210h42" fill="none" stroke={accent} strokeWidth="1.8" /><circle cx="379" cy="74" r="20" fill={gold} fillOpacity=".15" stroke={gold} strokeWidth="1.8" /><circle cx="379" cy="141" r="20" fill={accent} fillOpacity=".12" stroke={accent} strokeWidth="1.8" /><circle cx="379" cy="210" r="20" fill={water} fillOpacity=".15" stroke={water} strokeWidth="1.8" /></>,
  },
  "lecture-zangfu-4": {
    afterHeading: "経過の長さを分ける", variant: "foundation-record-time-scales",
    title: "短い経過と長い経過を区別して記録する",
    description: "左の時計の横に短い区間の記録と長い区間の記録を上下に置く。同時に語られた情報でも、いつから続くかを別に確認するための図で、病気の推移は示さない。",
    artwork: <><Glyph name="clock" x={39} y={98} scale={1.3} color={accent} /><path d="M154 90h273M154 192h273" stroke={ink} strokeOpacity=".16" strokeWidth="2" /><path d="M174 90h67M174 192h225" stroke={accent} strokeWidth="3" strokeLinecap="round" /><g fill={surface} stroke={accent} strokeWidth="2"><circle cx="174" cy="90" r="7" /><circle cx="241" cy="90" r="7" /><circle cx="174" cy="192" r="7" /><circle cx="249" cy="192" r="7" /><circle cx="324" cy="192" r="7" /><circle cx="399" cy="192" r="7" /></g><path d="M174 115v15h67v-15M174 217v15h225v-15" stroke={gold} strokeWidth="1.5" fill="none" /></>,
  },
  "lecture-lifedynamics-1": {
    afterHeading: "第2節：四つの概念と、それが答える問い", variant: "foundation-four-perspectives",
    title: "要素・分担・領域・方向を別の視点として読む",
    description: "四つの窓に、異なる要素、内外の役割、三つの領域、方向の矢印を描く。同じ身体について異なる問いを立てるための抽象図。",
    artwork: <><Panel x={53} y={25} width={174} height={106}><circle cx="116" cy="75" r="19" fill={gold} fillOpacity=".2" stroke={gold} strokeWidth="1.8" /><circle cx="149" cy="88" r="19" fill={water} fillOpacity=".2" stroke={water} strokeWidth="1.8" /><circle cx="171" cy="61" r="16" fill={accent} fillOpacity=".18" stroke={accent} strokeWidth="1.8" /></Panel><Panel x={253} y={25} width={174} height={106}><circle cx="340" cy="78" r="36" fill="none" stroke={accent} strokeWidth="2" /><circle cx="340" cy="78" r="18" fill={water} fillOpacity=".14" stroke={water} strokeWidth="2" /></Panel><Panel x={53} y={149} width={174} height={106}><rect x="111" y="164" width="58" height="75" rx="12" fill={accent} fillOpacity=".05" stroke={accent} strokeWidth="1.8" /><path d="M112 188h56M112 214h56" stroke={accent} strokeWidth="1.8" /></Panel><Panel x={253} y={149} width={174} height={106}><Arrow d="M340 193v-28" x={340} y={165} angle={-90} /><Arrow d="M349 202h29" x={378} y={202} /><Arrow d="M340 211v28" x={340} y={239} angle={90} color={water} /><Arrow d="M331 202h-29" x={302} y={202} angle={180} color={water} /></Panel></>,
  },
  "lecture-lifedynamics-2": {
    afterHeading: "第1節：精・気・神の三宝と、それぞれの役割", variant: "foundation-three-treasures",
    title: "基盤・活動・精神を支え合う関係で捉える",
    description: "養いを蓄える器、活動を表す風、精神活動を表す思考の図を三角形に置き、方向を固定しない線で結ぶ。精・気・神の伝統的な関係を示す比喩で、物質の変換や悪化段階は示さない。",
    artwork: <><path d="m239 76-113 122h228Z" fill={accent} fillOpacity=".035" stroke={accent} strokeOpacity=".3" strokeWidth="1.8" strokeDasharray="5 7" /><Disk x={240} y={69} r={50}><Glyph name="thought" x={209} y={37} color={gold} /></Disk><Disk x={121} y={201} r={50}><Vessel x={95} y={171} scale={.7} color={water} /></Disk><Disk x={359} y={201} r={50}><Wind x={329} y={188} scale={.85} /></Disk></>,
  },
  "lecture-lifedynamics-3": {
    afterHeading: "第3節：宗気（そうき）の形成 ― 拍動と呼吸のエンジン", variant: "foundation-food-and-breath",
    title: "飲食と呼吸に由来するものを関連づける",
    description: "穂で表した飲食と風で表した呼吸の二つの入口が、一つの輪へ集まる。宗気を説明する伝統的な形成モデルの比喩で、胸部の解剖や代謝経路ではない。",
    artwork: <><Disk x={115} y={72} r={45}><Glyph name="grain" x={84} y={41} scale={.98} color={gold} /></Disk><Disk x={115} y={208} r={45}><Wind x={85} y={195} scale={.85} color={water} /></Disk><Arrow d="M167 72c59 0 62 59 111 64" x={278} y={136} angle={8} color={gold} /><Arrow d="M167 208c59 0 62-59 111-64" x={278} y={144} angle={-8} color={water} /><circle cx="350" cy="140" r="63" fill={accent} fillOpacity=".06" stroke={accent} strokeWidth="2" /><path d="M316 140c0-25 35-38 35-12s35 13 35-12M316 140c0 25 35 38 35 12s35-13 35 12" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" /></>,
  },
  "lecture-lifedynamics-4": {
    afterHeading: "第3節：営衛協調 ― 「如環無端」の二重循環ループ", variant: "foundation-inner-nourish-outer-guard",
    title: "内を養う役割と外を守る役割を重ねて考える",
    description: "葉を内側の輪に、盾を外側の輪に置き、二つの輪が続く形で描く。営気・衛気の役割を内外の比喩で示し、体内の実際の経路や免疫の測定結果は示さない。",
    artwork: <><ellipse cx="240" cy="145" rx="158" ry="99" stroke={accent} strokeWidth="2" fill={accent} fillOpacity=".025" /><ellipse cx="240" cy="145" rx="87" ry="56" stroke={water} strokeWidth="2" fill={water} fillOpacity=".055" /><circle cx="240" cy="145" r="35" fill={surface} /><Glyph name="leaf" x={208} y={113} color={water} /><circle cx="343" cy="71" r="34" fill={surface} /><Glyph name="shield" x={316} y={44} scale={.85} color={accent} /><Arrow x={83} y={145} angle={-90} /><Arrow x={397} y={145} angle={90} /><Arrow x={240} y={89} color={water} /><Arrow x={240} y={201} angle={180} color={water} /></>,
  },
  "lecture-lifedynamics-6": {
    afterHeading: "第1節：臓と腑の根本的な性格の違い", variant: "foundation-store-and-pass",
    title: "蔵する役割と受け入れて通す役割を比べる",
    description: "左は囲いの内側に蓄えた円、右は開いた両側を通って進む円を描く。臓と腑の伝統的な役割の対比で、実際の臓器が物質を全く出さない、保持しないという意味ではない。",
    artwork: <><Panel x={38} width={182}><rect x="82" y="88" width="94" height="106" rx="22" fill={water} fillOpacity=".07" stroke={water} strokeWidth="2" /><g fill={water} fillOpacity=".4"><circle cx="110" cy="124" r="11" /><circle cx="145" cy="124" r="11" /><circle cx="127" cy="158" r="11" /></g></Panel><Panel x={260} width={182}><path d="M305 104q46-32 92 0M305 178q46 32 92 0" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" /><Arrow d="M279 141h139" x={418} y={141} color={gold} /><circle cx="332" cy="141" r="12" fill={surface} stroke={gold} strokeWidth="2" /><circle cx="369" cy="141" r="12" fill={surface} stroke={gold} strokeWidth="2" /></Panel></>,
  },
  "lecture-lifedynamics-10": {
    afterHeading: "第1節：健康とは「復元力のあるゆらぎ」である", variant: "foundation-returning-fluctuation",
    title: "変化の後に戻るという考え方",
    description: "一定の帯の周囲を波打つ線が、大きく変化した後に再び帯の周囲へ戻る。復元するゆらぎを表す概念図で、数値・単位・健康判定の基準や測定データは含まない。",
    artwork: <><rect x="44" y="119" width="392" height="44" rx="22" fill={accent} fillOpacity=".055" /><path d="M45 141h390" stroke={accent} strokeWidth="1" strokeOpacity=".25" strokeDasharray="4 6" /><path d="M45 142c18-29 28 27 47 0s28 20 44-2 23-62 46-76 41 1 49 46 21 85 45 66 22-52 47-30 25 2 41-6 27 9 44 0 22 0 29 0" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" /><circle cx="184" cy="63" r="6" fill={gold} /><Arrow d="M55 222h371" x={426} y={222} color={ink} opacity={.35} /></>,
  },
  "lecture-lifedynamics-11": {
    afterHeading: "第2節：多重サポート構造（冗長性）の神秘", variant: "foundation-shared-role-network",
    title: "一つの働きを複数の役割から説明する",
    description: "中央の水滴に、上・左右・下に置いた四つの異なる形をつなぐ。津液を複数の臓腑や三焦と関連づけて学ぶ概念図で、臓器の位置や病気を代わりに補う仕組みではない。",
    artwork: <><path d="M240 53v60M99 140h98M283 140h98M240 171v61" stroke={accent} strokeWidth="2" strokeOpacity=".45" /><path d="M112 108q128-97 256 0M112 173q128 97 256 0" stroke={accent} strokeWidth="1.3" fill="none" strokeOpacity=".2" strokeDasharray="5 7" /><circle cx="240" cy="140" r="44" fill={surface} stroke={water} strokeWidth="2" /><Glyph name="drop" x={212} y={110} scale={.9} color={water} /><circle cx="240" cy="47" r="23" stroke={accent} strokeWidth="2" fill={accent} fillOpacity=".12" /><rect x="64" y="114" width="52" height="52" rx="12" stroke={gold} strokeWidth="2" fill={gold} fillOpacity=".1" /><path d="m390 109 31 31-31 31-31-31Z" stroke={water} strokeWidth="2" fill={water} fillOpacity=".08" /><rect x="213" y="217" width="54" height="24" rx="12" stroke={accent} strokeWidth="2" fill={surface} /></>,
  },
  "lecture-lifedynamics-12": {
    afterHeading: "第1節：生成・巡り・排泄の整理", variant: "foundation-source-circulation-exit",
    title: "由来、巡り、外へ出る働きを整理する",
    description: "左の入口から中央の循環する輪へ入り、右の開口部へ出る流れを描く。生成・巡り・排泄を区別して復習する抽象図で、解剖学的な水路や細胞の代謝工程ではない。",
    artwork: <><path d="M40 94h45v92H40" fill="none" stroke={gold} strokeWidth="2.3" strokeLinecap="round" /><circle cx="63" cy="140" r="11" fill={gold} fillOpacity=".25" /><Arrow d="M93 140h61" x={154} y={140} color={gold} /><circle cx="240" cy="140" r="72" fill={accent} fillOpacity=".035" stroke={accent} strokeWidth="2" /><circle cx="240" cy="140" r="38" stroke={accent} strokeOpacity=".2" fill="none" strokeWidth="1.5" /><Arrow x={240} y={68} /><Arrow x={240} y={212} angle={180} /><Arrow d="M326 140h61" x={387} y={140} color={water} /><path d="M393 87h34v106h-34" fill="none" stroke={water} strokeWidth="2.3" strokeLinecap="round" /><path d="M427 140h25m-8-8 8 8-8 8" stroke={water} strokeWidth="2" fill="none" strokeLinecap="round" /></>,
  },
  "lecture-wuxing-4": {
    afterHeading: "第1節：五行と五臓の対応", variant: "foundation-five-correspondences",
    title: "五行の分類と五つの項目の対応を並べる",
    description: "木・火・土・金・水を表す自然の象徴を上段に置き、それぞれを下段の五つの欄へ結ぶ。本文の対応表を読むための構造図で、下段の形は臓器の解剖ではない。",
    artwork: <>{(["leaf", "flame", "earth", "metal", "drop"] as const).map((name, index) => { const x = 64 + index * 88; return <g key={name}><Glyph name={name} x={x - 28} y={49} scale={.88} color={index === 4 ? water : index === 1 || index === 2 ? gold : accent} /><path d={`M${x} 115v34`} stroke={accent} strokeOpacity=".35" strokeWidth="1.5" /><rect x={x - 31} y="153" width="62" height="71" rx="15" fill={surface} stroke={accent} strokeOpacity=".4" strokeWidth="1.5" /><circle cx={x} cy="188" r="15" fill={accent} fillOpacity=".12" stroke={accent} strokeWidth="1.5" /></g>; })}</>,
  },
  "lecture-wuxing-5": {
    afterHeading: "第2節：観察した事実と配当を分ける", variant: "foundation-observation-and-assignment",
    title: "目に関する訴えと伝統的な分類を別の欄に置く",
    description: "左の記録欄には目、右の分類欄には葉と対応する丸を置き、二つの欄を離して示す。観察・本人の訴えと五行の配当は別の情報であり、両者から病気を確定する矢印は描かない。",
    artwork: <><Panel x={51} width={168}><Glyph name="eye" x={95} y={72} scale={1.25} /><path d="M87 179h96M87 195h64" stroke={ink} strokeWidth="2" strokeOpacity=".25" strokeLinecap="round" /></Panel><Panel x={261} width={168}><Glyph name="leaf" x={317} y={62} scale={.9} color={accent} /><path d="M346 124v31" stroke={accent} strokeOpacity=".45" strokeWidth="1.5" /><circle cx="346" cy="182" r="26" fill={accent} fillOpacity=".09" stroke={accent} strokeWidth="1.8" /></Panel><path d="M240 69v142" stroke={ink} strokeOpacity=".22" strokeWidth="1.2" strokeDasharray="3 7" /></>,
  },
  "lecture-wuxing-6": {
    afterHeading: "第3節：正常な感情と病態の説明を分ける", variant: "foundation-emotion-in-context",
    title: "本人の経験と感情を具体的に記録する",
    description: "中央の人の周りに、感情の変化を表す異なる曲線の吹き出しと時計・記録を配置する。感情を人の性格や臓器の病気へ直結せず、出来事と経過の情報として読む図。",
    artwork: <><Disk x={240} y={151} r={65}><Glyph name="person" x={199} y={106} scale={1.3} /></Disk><path d="M67 51h102v57h-32l-17 16v-16H67Z" fill={gold} fillOpacity=".05" stroke={gold} strokeWidth="1.7" /><path d="M86 83q9-17 19 0t19 0t19 0" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" /><path d="M311 51h102v57h-51l-15 16v-16h-26Z" fill={water} fillOpacity=".05" stroke={water} strokeWidth="1.7" /><path d="M331 80q30 18 61 0" stroke={water} strokeWidth="2" fill="none" strokeLinecap="round" /><Glyph name="clock" x={84} y={176} scale={.85} color={accent} /><Glyph name="document" x={338} y={176} scale={.85} color={accent} /><path d="m158 201 21-12M303 189l20 12" stroke={accent} strokeOpacity=".3" strokeWidth="1.5" strokeDasharray="4 5" /></>,
  },
  "lecture-wuxing-7": {
    afterHeading: "第1節：季節・気候・五味の配当", variant: "foundation-season-weather-taste",
    title: "季節・気候・味を別の分類軸として読む",
    description: "巡る季節を示す葉と輪、気候を示す太陽と風、味の話題を示す器を三つの窓に置く。自然と生活の分類の違いを示し、天候による病気の予測や食物の治療効果は表していない。",
    artwork: <><Panel x={25} y={51} width={130} height={178}><circle cx="90" cy="138" r="45" stroke={accent} strokeWidth="1.7" fill="none" /><Glyph name="leaf" x={63} y={111} scale={.85} color={accent} /><Arrow x={90} y={93} /><Arrow x={90} y={183} angle={180} /></Panel><Panel x={175} y={51} width={130} height={178}><Glyph name="sun" x={215} y={84} scale={.72} color={gold} /><Wind x={202} y={157} scale={.9} color={water} /></Panel><Panel x={325} y={51} width={130} height={178}><Glyph name="cup" x={350} y={102} scale={1.25} color={gold} /><path d="M374 83q-8-9 0-18M391 83q-8-9 0-18M408 83q-8-9 0-18" stroke={gold} strokeWidth="1.7" fill="none" strokeLinecap="round" opacity=".55" /></Panel></>,
  },
  "lecture-wuxing-8": {
    afterHeading: "第2節：架空例で根拠と保留を分ける", variant: "foundation-evidence-and-open-questions",
    title: "記録の根拠と、保留する判断を分ける",
    description: "元の記録から二つの欄へ分岐し、一方は記録と対応表を合わせて確認、もう一方は空の点線の枠として残す。架空例の限られた情報から医学的な原因や効果を決めないための整理。",
    artwork: <><RecordCard x={44} y={77}><Glyph name="document" x={68} y={88} scale={.8} /></RecordCard><path d="M151 140h43V81h89M194 140v61h89" stroke={accent} strokeOpacity=".45" strokeWidth="1.7" fill="none" /><rect x="292" y="39" width="140" height="83" rx="17" fill={surface} stroke={accent} strokeWidth="1.8" /><Glyph name="document" x={303} y={48} scale={.87} color={accent} /><Glyph name="leaf" x={363} y={55} scale={.68} color={gold} /><rect x="292" y="159" width="140" height="83" rx="17" fill="none" stroke={water} strokeWidth="1.8" strokeDasharray="6 7" /><circle cx="362" cy="200" r="20" fill="none" stroke={water} strokeWidth="1.5" strokeDasharray="3 6" /></>,
  },
  "lecture-meridians-2": {
    afterHeading: "十二と十四を区別する", variant: "foundation-twelve-and-two",
    title: "四群の十二経脈と、追加する二つの経脈を区別する",
    description: "三つずつをまとめた四群の円を大きな囲みに収め、別の囲みに二つの円を置く。十二経脈と任脈・督脈を加えた十四経脈の分類を数える図で、人体上の走行は示していない。",
    artwork: <><rect x="43" y="41" width="283" height="198" rx="26" fill={accent} fillOpacity=".025" stroke={accent} strokeOpacity=".35" strokeWidth="1.5" />{[79, 146, 213, 280].map((x, group) => <g key={x}><rect x={x - 24} y="65" width="48" height="150" rx="23" fill={group < 2 ? water : gold} fillOpacity=".055" /><g fill={surface} stroke={group < 2 ? water : gold} strokeWidth="2"><circle cx={x} cy="94" r="13" /><circle cx={x} cy="140" r="13" /><circle cx={x} cy="186" r="13" /></g></g>)}<rect x="356" y="65" width="81" height="150" rx="25" fill={surface} stroke={accent} strokeWidth="1.5" /><circle cx="397" cy="108" r="22" fill={accent} fillOpacity=".12" stroke={accent} strokeWidth="2" /><circle cx="397" cy="172" r="22" fill={accent} fillOpacity=".12" stroke={accent} strokeWidth="2" /></>,
  },
  "lecture-meridians-4": {
    afterHeading: "情報が増えたら比較し直す", variant: "foundation-revisit-with-new-records",
    title: "新しい情報を加え、説明候補を確かめ直す",
    description: "左の一枚の記録に上から新しい記録を加え、右で二枚を並べ直す。下の戻る矢印は再確認を示し、新情報を最初の説明に無理に合わせない読み方を表す。",
    artwork: <><RecordCard x={42} y={96}><Glyph name="eye" x={65} y={112} scale={.78} /></RecordCard><Glyph name="document" x={193} y={19} scale={.85} color={gold} /><Arrow d="M220 80v35" x={220} y={115} angle={90} color={gold} /><Arrow d="M151 157h105" x={256} y={157} /><rect x="277" y="68" width="66" height="130" rx="13" fill={surface} stroke={accent} strokeWidth="1.8" /><rect x="356" y="68" width="66" height="130" rx="13" fill={surface} stroke={gold} strokeWidth="1.8" /><Glyph name="eye" x={286} y={83} scale={.75} /><Glyph name="document" x={365} y={83} scale={.75} color={gold} /><path d="M291 160h38M291 176h26M370 160h38M370 176h26" stroke={accent} strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" /><Arrow d="M352 211c-35 47-120 47-155 11" x={197} y={222} angle={-135} color={water} /></>,
  },
};
