import type { ReactNode } from "react";
import TaijiSymbol from "@/components/graphics/TaijiSymbol";
import { FOUNDATION_CONCEPT_ART } from "./artwork/FoundationArtwork";
import { REASONING_CONCEPT_ART } from "./artwork/ReasoningArtwork";
import { PRACTICE_CONCEPT_ART } from "./artwork/PracticeArtwork";
import type { WordlessArtDefinition } from "./artwork/types";
import { Glyph, Disk, Arrow, ink, accent, surface, gold, water, svgNumber, type GlyphName } from "./artwork/WordlessPrimitives";

type ConceptArtVariant =
  | "context" | "reassessment" | "research" | "observation"
  | "subdivision" | "waxing-waning" | "qi-functions" | "moisture"
  | "paired-groups" | "three-regions" | "directions" | "activity-rest"
  | "seasons" | "five-elements" | "five-properties" | "generation"
  | "path-and-points" | "proportions";

interface ConceptArtDefinition {
  readonly afterHeading: string;
  readonly variant: ConceptArtVariant;
  readonly title: string;
  readonly description: string;
}

/**
 * Wordless metaphors belong to a specific section, rather than the lecture header.
 * These drawings illustrate the taught classification or reading task. They are
 * not anatomical maps, measured clinical results, or claims of treatment effects.
 */
const ORIGINAL_CONCEPT_ART: Readonly<Record<string, ConceptArtDefinition>> = {
  "lecture-intro-1": {
    afterHeading: "症状を関係の中で読む", variant: "context",
    title: "本人の訴えと生活の情報を一緒に読む",
    description: "中央の人を囲んで、会話、食事、睡眠、時間の図が並ぶ。点線は情報を関連づけて読む姿勢を表し、原因を確定する矢印ではない。",
  },
  "lecture-intro-2": {
    afterHeading: "評価は後から付け足すものではない", variant: "reassessment",
    title: "記録して比較し、確認し直す",
    description: "観察する目、記録用紙、比較する二つの図が輪になり、得られた情報を再び確認する学習の流れを表す。",
  },
  "lecture-intro-3": {
    afterHeading: "研究を読むための五つの確認", variant: "research",
    title: "研究で確認する対象・方法・比較・測定・時期",
    description: "人の集まり、方法を記した用紙、二つの比較群、測定目盛り、時計が順に並ぶ。研究結果を読む際の五つの確認項目で、実際の結果や効果の大きさは示していない。",
  },
  "lecture-intro-4": {
    afterHeading: "三つの欄に分ける目的", variant: "observation",
    title: "観察、解釈、未確認の三つを分ける",
    description: "三枚の記録カードに、見た事実を表す目、考えた解釈を表す思考の吹き出し、未確認を表す空の点線枠を分けて描く。",
  },
  "lecture-yinyang-2": {
    afterHeading: "2. 陰陽可分（いんようかぶん）：どこまでも細かく分けられる多層構造", variant: "subdivision",
    title: "一つの比較を、さらに細かな比較へ分ける",
    description: "大きな陰陽の円から、左右に小さな陰陽の円が分かれる。分類は比較する基準によってさらに分けられるという伝統的な考え方を表す。",
  },
  "lecture-yinyang-4": {
    afterHeading: "1. 陰陽消長（いんようしょうちょう）", variant: "waxing-waning",
    title: "昼と夜の移り変わりから消長を考える",
    description: "四つの円で明るい部分と暗い部分の割合が変わる。太陽と月を添え、昼夜を使って量の増減を考える比喩を示す。生理機能の測定図ではない。",
  },
  "lecture-qiblood-1": {
    afterHeading: "第2節：気の五つの作用", variant: "qi-functions",
    title: "気の五つの作用を図の比喩で振り返る",
    description: "前に進む動き、炎、盾、内に保つ囲い、形の変化を表す図が並ぶ。推動・温煦・防御・固摂・気化という伝統的な作用の比喩で、物質や機序を測定した図ではない。",
  },
  "lecture-qiblood-3": {
    afterHeading: "第2節：潤いと正常な巡り", variant: "moisture",
    title: "潤いを支える役割のイメージ",
    description: "しずくと水面、潤った葉を組み合わせた自然の比喩。津液の潤す働きを考える補助であり、飲水量や体液量を判定する図ではない。",
  },
  "lecture-zangfu-5": {
    afterHeading: "表裏関係は六組で読む", variant: "paired-groups",
    title: "六組の表裏関係を整理する",
    description: "六つの組それぞれに二つの形を結び、対として整理する考え方を表す。特定の臓器の位置や病気の同時発生を示す図ではない。組の名称は本文で確認する。",
  },
  "lecture-lifedynamics-5": {
    afterHeading: "第1節：三焦の空間区分と三大メタファー", variant: "three-regions",
    title: "上・中・下を、霧・泡・流れの比喩で分ける",
    description: "三段の空間に霧、泡、流れる水のイメージを分けて描く。三焦の伝統的な比喩を整理した図で、解剖構造や生理機序を示すものではない。",
  },
  "lecture-lifedynamics-7": {
    afterHeading: "第1節：昇降出入の基本概念", variant: "directions",
    title: "昇る・降りる・出る・入るを方向で区別する",
    description: "四つの円に上向き、下向き、外向き、内向きの矢印を描く。伝統的な方向の用語を区別する図で、体内の経路や治療法を示さない。",
  },
  "lecture-lifedynamics-8": {
    afterHeading: "第2節：睡眠と覚醒の力学 ― 「陽入于陰」", variant: "activity-rest",
    title: "活動する時間と休む時間を比べる",
    description: "太陽と動く人、月と眠る人を対にして、活動と休息の時間を比べる。陰陽と神経活動が同じであると示す図ではない。",
  },
  "lecture-lifedynamics-9": {
    afterHeading: "第1節：五季における自然の気と身体の重心移動", variant: "seasons",
    title: "春・夏・長夏・秋・冬の自然のイメージ",
    description: "芽、太陽、穂、落ち葉、雪を円周に配置し、伝統的な五季の移り変わりを表す。季節から身体の状態や病気を予測する図ではない。",
  },
  "lecture-wuxing-1": {
    afterHeading: "第1節：木・火・土・金・水という分類", variant: "five-elements",
    title: "木・火・土・金・水の五つの自然イメージ",
    description: "枝葉、炎、地面、金属を表す結晶、水滴をそれぞれ独立した円に描く。五行という伝統的な分類の象徴で、身体にある五種類の物質を示していない。",
  },
  "lecture-wuxing-2": {
    afterHeading: "第1節：五つの性質の代表的な説明", variant: "five-properties",
    title: "曲がり伸びる・昇る・育つ・変わる・下る",
    description: "曲がる枝、上向きの炎、育つ穂、形を変える金属、下向きの滴を並べ、五行の性質を自然の比喩で表す。医学的な機序ではない。",
  },
  "lecture-wuxing-3": {
    afterHeading: "第1節：相生と母子の関係", variant: "generation",
    title: "相生の順序を自然の象徴でたどる",
    description: "木、火、土、金、水を円周に並べ、木から火、土、金、水、木へ進む矢印で相生の順序を示す。矢印は伝統モデル内の関係で、臓器間の因果関係ではない。",
  },
  "lecture-meridians-1": {
    afterHeading: "経脈と経穴を分ける", variant: "path-and-points",
    title: "つながりを表す線と、個別の位置を表す点",
    description: "左に連続した曲線、右にその線上の点を描き、経脈と経穴という学習対象の違いを表す。人体上の実際の走行や位置を示す地図ではない。",
  },
  "lecture-meridians-3": {
    afterHeading: "比例寸と指寸を混ぜない", variant: "proportions",
    title: "比例による分割と、指幅による目安を分ける",
    description: "左は異なる長さの区間を同じ数に分けた図、右は指幅の輪郭。比例寸と指寸を混同しないための比較で、個別の経穴位置や刺鍼の案内ではない。",
  },
};

const elementGlyphs: GlyphName[] = ["leaf", "flame", "earth", "metal", "drop"];
const seasonGlyphs: GlyphName[] = ["leaf", "sun", "grain", "leaf", "snow"];
const fivePositions = [{ x: 300, y: 36 }, { x: 379, y: 94 }, { x: 349, y: 182 }, { x: 251, y: 182 }, { x: 221, y: 94 }];

function FiveCircle({ seasons = false, arrows = false }: { seasons?: boolean; arrows?: boolean }) {
  const names = seasons ? seasonGlyphs : elementGlyphs;
  return <>
    <circle cx="300" cy="110" r="76" fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity=".18" />
    {arrows && fivePositions.map((point, index) => {
      const next = fivePositions[(index + 1) % fivePositions.length];
      const deltaX = next.x - point.x, deltaY = next.y - point.y;
      const length = Math.hypot(deltaX, deltaY);
      const x1 = svgNumber(point.x + deltaX * 29 / length), y1 = svgNumber(point.y + deltaY * 29 / length);
      const x2 = svgNumber(next.x - deltaX * 31 / length), y2 = svgNumber(next.y - deltaY * 31 / length);
      const angle = svgNumber(Math.atan2(deltaY, deltaX) * 180 / Math.PI);
      return <Arrow key={index} d={`M${x1} ${y1}L${x2} ${y2}`} x={x2} y={y2} angle={angle} />;
    })}
    {fivePositions.map((point, index) => <Disk key={index} x={point.x} y={point.y} r={27}>
      <Glyph name={names[index]} x={point.x - 18} y={point.y - 18} scale={.56} color={seasons && index === 3 ? gold : index === 4 ? water : accent} />
    </Disk>)}
    <circle cx="300" cy="110" r="14" fill={accent} fillOpacity=".06" />
    <circle cx="300" cy="110" r="3" fill={accent} fillOpacity=".4" />
  </>;
}

function Artwork({ variant }: { variant: ConceptArtVariant }) {
  switch (variant) {
    case "context":
      return <>
        <ellipse cx="300" cy="110" rx="180" ry="70" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="3 8" strokeOpacity=".2" />
        <Disk x={300} y={110} r={48}><Glyph name="person" x={268} y={78} /></Disk>
        <Glyph name="thought" x={107} y={69} scale={.8} color={accent} />
        <Glyph name="clock" x={443} y={75} scale={.85} color={accent} />
        <g stroke={ink} fill="none" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M233 31h42c-1 17-8 25-21 25s-20-8-21-25ZM229 31h50M239 22c-5-7 6-10 1-17M252 22c-5-7 6-10 1-17M265 22c-5-7 6-10 1-17M327 169v26M327 178h48v17M327 183h-7M382 178v17" />
          <path d="M331 178v-9h14v9" />
        </g>
      </>;
    case "reassessment":
      return <>
        <path d="M172 89Q300-18 428 89M428 131Q300 238 172 131" fill="none" stroke={accent} strokeOpacity=".3" strokeWidth="2" />
        <Arrow x={424} y={86} angle={35} /><Arrow x={178} y={136} angle={210} />
        <Disk x={160} y={110}><Glyph name="eye" x={131} y={81} scale={.9} /></Disk>
        <Disk x={300} y={58}><Glyph name="document" x={272} y={30} scale={.88} /></Disk>
        <Disk x={440} y={110}><Glyph name="comparison" x={410} y={80} scale={.94} /></Disk>
        <circle cx="300" cy="159" r="8" fill={accent} fillOpacity=".18" />
        <circle cx="300" cy="159" r="17" fill="none" stroke={accent} strokeOpacity=".3" />
      </>;
    case "research":
      return <>
        {["people", "document", "comparison", "measure", "clock"].map((name, index) => <g key={name}>
          <Disk x={70 + index * 115} y={100} r={35}><Glyph name={name as GlyphName} x={43 + index * 115} y={73} scale={.84} /></Disk>
          <path d={`M${70 + index * 115} 143v15`} stroke={accent} strokeWidth="1.5" strokeOpacity=".35" />
          <circle cx={70 + index * 115} cy="166" r="3" fill={accent} fillOpacity=".6" />
        </g>)}
        <path d="M70 166h460" stroke={accent} strokeWidth="1.2" strokeOpacity=".23" />
      </>;
    case "observation":
      return <>
        {[140, 300, 460].map(x => <g key={x}><rect x={x - 56} y="45" width="112" height="132" rx="12" fill={accent} fillOpacity=".025" stroke={accent} strokeWidth="1.3" strokeOpacity=".26" /><path d={`M${x - 34} 151h68`} stroke={accent} strokeWidth="1.2" strokeOpacity=".24" /></g>)}
        <Glyph name="eye" x={111} y={78} scale={.9} />
        <Glyph name="thought" x={271} y={76} scale={.9} />
        <rect x="437" y="88" width="46" height="42" rx="7" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3 5" />
        <circle cx="460" cy="69" r="3" fill={accent} fillOpacity=".4" />
      </>;
    case "subdivision":
      return <>
        <path d="M263 93 179 136M337 93l84 43" fill="none" stroke={accent} strokeWidth="1.3" strokeDasharray="3 6" strokeOpacity=".45" />
        <g transform="translate(255 17) scale(.9)" color={accent}><TaijiSymbol surface={surface} /></g>
        <g transform="translate(117 120) scale(.72)" color={accent}><TaijiSymbol surface={surface} /></g>
        <g transform="translate(411 120) scale(.72)" color={accent}><TaijiSymbol surface={surface} /></g>
        <circle cx="153" cy="156" r="45" fill="none" stroke={accent} strokeOpacity=".18" />
        <circle cx="447" cy="156" r="45" fill="none" stroke={accent} strokeOpacity=".18" />
      </>;
    case "waxing-waning":
      return <>
        {[.82, .45, .18, .45].map((fraction, index) => {
          const x = 120 + index * 120;
          const clipId = `curriculum-waxing-waning-${index}`;
          return <g key={index}>
            <defs><clipPath id={clipId}><circle cx={x} cy="111" r="36" /></clipPath></defs>
            <circle cx={x} cy="111" r="36" fill={surface} />
            <rect x={x - 36} y="75" width={svgNumber(fraction * 72)} height="72" fill={accent} fillOpacity=".85" clipPath={`url(#${clipId})`} />
            <circle cx={x} cy="111" r="36" fill="none" stroke={accent} strokeOpacity=".45" />
            <path d={`M${x - 14} 169h28`} stroke={accent} strokeOpacity=".2" />
          </g>;
        })}
        <Glyph name="moon" x={96} y={22} scale={.48} color={water} />
        <Glyph name="sun" x={340} y={18} scale={.52} color={gold} />
        <path d="M102 194Q300 210 498 194" fill="none" stroke={accent} strokeOpacity=".25" />
      </>;
    case "qi-functions":
      return <>
        {[70, 185, 300, 415, 530].map(x => <Disk key={x} x={x} y={110} r={37} />)}
        <g stroke={accent} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M43 102h45l-9-8M88 102l-9 8M43 120h34l-9-8M77 120l-9 8" /></g>
        <Glyph name="flame" x={160} y={84} scale={.8} color={gold} />
        <Glyph name="shield" x={275} y={84} scale={.8} color={accent} />
        <Glyph name="cup" x={390} y={84} scale={.8} color={accent} />
        <g stroke={accent} fill="none" strokeWidth="2.1" strokeLinecap="round"><circle cx="517" cy="125" r="8" /><path d="M535 118c0-12-6-14-6-23M548 118c0-12-6-14-6-23M514 98c9-14 20-14 31-4" /><path d="m539 92 6 2-2 6" /></g>
      </>;
    case "moisture":
      return <>
        <circle cx="300" cy="104" r="67" fill={water} fillOpacity=".045" />
        <Glyph name="drop" x={263} y={25} scale={1.15} color={water} />
        <Glyph name="leaf" x={176} y={105} scale={1.02} color={accent} />
        <Glyph name="leaf" x={355} y={105} scale={1.02} color={accent} />
        <g stroke={water} strokeOpacity=".5" strokeWidth="1.8" fill="none"><path d="M215 179q20-10 40 0t40 0t40 0t40 0M234 193q18-8 36 0t36 0t36 0" /><circle cx="245" cy="117" r="4" /><circle cx="347" cy="109" r="3" /><circle cx="375" cy="92" r="4" /></g>
      </>;
    case "paired-groups":
      return <>
        {Array.from({ length: 6 }, (_, index) => {
          const x = 95 + index * 82;
          return <g key={index}>
            <path d={`M${x} 85v46`} stroke={accent} strokeWidth="1.6" strokeOpacity=".5" />
            <circle cx={x} cy="68" r="18" fill={accent} fillOpacity=".8" />
            <circle cx={x} cy="149" r="18" fill={surface} stroke={accent} strokeWidth="2" />
            <circle cx={x} cy="108" r="3" fill={accent} fillOpacity=".5" />
          </g>;
        })}
        <path d="M77 190h446" stroke={accent} strokeOpacity=".16" />
      </>;
    case "three-regions":
      return <>
        <rect x="184" y="16" width="232" height="188" rx="40" fill={accent} fillOpacity=".025" stroke={accent} strokeOpacity=".18" />
        <path d="M185 77h230M185 139h230" stroke={accent} strokeOpacity=".17" strokeDasharray="3 6" />
        <g stroke={water} strokeWidth="1.8" fill="none" strokeLinecap="round">
          <path d="M235 36h48M316 36h49M251 48h72M336 48h34M229 60h75M322 60h38" strokeOpacity=".6" />
          {[{ x: 249, y: 106, r: 9 }, { x: 276, y: 113, r: 14 }, { x: 309, y: 100, r: 8 }, { x: 332, y: 111, r: 13 }, { x: 356, y: 100, r: 6 }].map((bubble, index) => <circle key={index} cx={bubble.x} cy={bubble.y} r={bubble.r} strokeOpacity=".65" />)}
          <path d="M234 157q17 10 34 0t34 0t34 0t34 0M241 174q17 10 34 0t34 0t34 0" />
        </g>
      </>;
    case "directions":
      return <>
        {[120, 240, 360, 480].map(x => <Disk key={x} x={x} y={110} r={40} />)}
        <Arrow d="M120 135V86" x={120} y={86} angle={-90} />
        <Arrow d="M240 85v49" x={240} y={134} angle={90} />
        <circle cx="360" cy="110" r="13" fill="none" stroke={accent} strokeWidth="1.4" strokeOpacity=".45" />
        <Arrow d="M352 110h-19" x={333} y={110} angle={180} /><Arrow d="M368 110h19" x={387} y={110} />
        <circle cx="480" cy="110" r="13" fill="none" stroke={accent} strokeWidth="1.4" strokeOpacity=".45" />
        <Arrow d="M455 110h18" x={473} y={110} /><Arrow d="M505 110h-18" x={487} y={110} angle={180} />
      </>;
    case "activity-rest":
      return <>
        <path d="M300 38v149" stroke={accent} strokeWidth="1.2" strokeOpacity=".16" />
        <Glyph name="sun" x={143} y={27} scale={.8} color={gold} />
        <Glyph name="moon" x={402} y={26} scale={.8} color={water} />
        <g stroke={ink} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="177" cy="112" r="8" /><path d="m175 126-10 19 24 10 8 22M164 146l-10 28M173 132l19 8 13-6M172 130l-13 6-8 13" />
          <path d="M386 154h89v24M386 144v34M392 149h14M392 143h14v11M409 154v-14h37q13 0 16 14M382 164h96" />
        </g>
        <path d="M139 187h66M386 187h90" stroke={accent} strokeOpacity=".2" />
      </>;
    case "seasons":
      return <FiveCircle seasons />;
    case "five-elements":
      return <>{elementGlyphs.map((name, index) => <Disk key={name} x={70 + index * 115} y={110} r={37}><Glyph name={name} x={43 + index * 115} y={83} scale={.84} color={index === 1 || index === 2 ? gold : index === 4 ? water : accent} /></Disk>)}</>;
    case "five-properties":
      return <>
        <g stroke={accent} fill="none" strokeWidth="2.2" strokeLinecap="round"><path d="M67 160c35-21-6-48 9-88M78 94l15-13M74 119l-14-10M68 143l19-12" /><path d="M187 153V75" strokeOpacity=".25" /><path d="M529 75v80" stroke={water} strokeOpacity=".3" /></g>
        <Glyph name="flame" x={164} y={94} scale={.8} color={gold} /><Arrow x={187} y={70} angle={-90} color={gold} />
        <Glyph name="grain" x={275} y={83} scale={1} color={gold} /><path d="M267 151h65M272 161h55" stroke={gold} strokeOpacity=".4" />
        <g stroke={ink} fill="none" strokeWidth="1.8"><rect x="382" y="91" width="22" height="38" rx="2" /><path d="m427 91 20 16v23l-20 9-16-9v-23Z" /></g><Arrow d="M409 112h13" x={422} y={112} />
        <Glyph name="drop" x={509} y={92} scale={.65} color={water} /><Arrow x={529} y={159} angle={90} color={water} />
      </>;
    case "generation":
      return <FiveCircle arrows />;
    case "path-and-points":
      return <>
        <path d="M300 34v151" stroke={accent} strokeOpacity=".16" />
        <path d="M102 152C100 82 251 132 249 66M351 152C349 82 500 132 498 66" fill="none" stroke={accent} strokeWidth="3" />
        {[{ x: 354, y: 132 }, { x: 387, y: 115 }, { x: 461, y: 104 }, { x: 496, y: 84 }].map((point, index) => <g key={index}><circle cx={point.x} cy={point.y} r="9" fill={surface} stroke={accent} strokeWidth="1.7" /><circle cx={point.x} cy={point.y} r="3" fill={accent} /></g>)}
        <path d="M100 183h149M352 183h145" stroke={accent} strokeOpacity=".2" />
      </>;
    case "proportions":
      return <>
        <path d="M333 32v153" stroke={accent} strokeOpacity=".16" />
        <g stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M78 79h204M115 141h130" />
          {Array.from({ length: 5 }, (_, index) => <path key={index} d={`M${78 + index * 51} 69v20M${115 + index * 32.5} 131v20`} />)}
          <path d="M420 161v-94c0-15 14-15 14 0v50M434 110V54c0-15 14-15 14 0v57M448 102V62c0-15 14-15 14 0v52M462 106V82c0-14 14-14 14 0v42c0 28-5 47-30 49-14 0-26-3-26-12Z" />
          <path d="M427 188h41M427 183v10M468 183v10" strokeOpacity=".55" />
        </g>
      </>;
  }
}

export function getCurriculumConceptArt(lectureId: string): { afterHeading: string; node: ReactNode } | null {
  const definition = CURRICULUM_CONCEPT_ART[lectureId];
  if (!definition) return null;
  const titleId = `curriculum-concept-${lectureId}-title`;
  const descriptionId = `curriculum-concept-${lectureId}-description`;
  // Compact circular/vertical compositions keep their symbols legible on phones.
  const compactCircle = definition.variant === "generation" || definition.variant === "seasons";
  const compactRegions = definition.variant === "three-regions";
  const expanded = "artwork" in definition;
  const viewBox = expanded ? definition.viewBox ?? "0 0 480 280" : compactCircle ? "185 0 230 220" : compactRegions ? "170 0 260 220" : "0 0 600 220";
  const intrinsicWidth = expanded ? 480 : compactCircle ? 230 : compactRegions ? 260 : 600;
  const intrinsicHeight = expanded ? 280 : 220;
  return {
    afterHeading: definition.afterHeading,
    node: <figure key={lectureId} className={`curriculum-concept-art${expanded ? " curriculum-concept-art--expanded" : ""}`} data-curriculum-concept-art={definition.variant}>
      <svg
        viewBox={viewBox}
        width={intrinsicWidth}
        height={intrinsicHeight}
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        focusable="false"
        style={{ display: "block", width: "100%", height: "auto", maxHeight: `${intrinsicHeight}px`, overflow: "visible" }}
      >
        <title id={titleId}>{definition.title}</title>
        <desc id={descriptionId}>{definition.description}</desc>
        {expanded ? definition.artwork : <Artwork variant={definition.variant} />}
      </svg>
      <details className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        <summary className="min-h-11 cursor-pointer py-2 underline underline-offset-4">図の読み方</summary>
        <p className="mt-1 text-base leading-[1.75]">{definition.description}</p>
      </details>
    </figure>,
  };
}

export const CURRICULUM_CONCEPT_ART: Readonly<Record<string, ConceptArtDefinition | WordlessArtDefinition>> = {
  ...ORIGINAL_CONCEPT_ART,
  ...FOUNDATION_CONCEPT_ART,
  ...REASONING_CONCEPT_ART,
  ...PRACTICE_CONCEPT_ART,
};
