import { useId, type ReactNode } from "react";
import styles from "./AtlasLandmarkGuide.module.css";

const choices = [
  { value: "all", label: "全体" },
  { value: "origin", label: "目印" },
  { value: "direction", label: "目印→ツボ" },
  { value: "point", label: "位置" },
] as const;

const guidance = {
  li4: {
    origin: "人差し指につながる骨をたどり、長さの真ん中を見ます。",
    direction: <><span aria-hidden="true">白丸から、矢印が少し親指側を指しています。</span><span className="sr-only">白丸は人差し指につながる骨の長さの真ん中です。そこから少し親指側へ進みます。</span></>,
    point: "図で「合谷」と書いてある丸印が、ツボの位置です。",
  },
  pc4: {
    origin: "手のひら側の手首とひじの横じわを見比べます。手首のしわが測り始めです。",
    direction: "手首のしわからひじ側へ5寸です。手首とひじの真ん中より、手首側に1寸寄った高さです。",
    point: "①と②の間の丸印が郄門です。①がない場合も、手首から測る高さは同じです。",
  },
  pc5: {
    origin: "手のひら側の手首とひじの横じわを見比べます。手首のしわが測り始めです。",
    direction: "手首のしわからひじ側へ3寸です。手首とひじの間を12等分したうち、手首から3つ分です。",
    point: "①と②の間の丸印が間使です。①がない場合も、手首から測る高さは同じです。",
  },
  pc6: {
    origin: "手のひらを上に向け、手首を横切るしわを見つけます。",
    direction: "矢印は、手首のしわからひじ側へ2寸のところを示しています。",
    point: "手首を通る2本の腱の間にある丸印が内関です。",
  },
  st36: {
    origin: "ひざのお皿のすぐ下にある、外側のくぼみ（犢鼻）を見つけます。",
    direction: "ひざ下の外側のくぼみが目印です。足首の前の真ん中へ向かう線に沿って、くぼみから3寸下です。",
    point: "すねの骨の前の縁より外側にある、筋肉の上の丸印が足三里です。",
  },
} as const;

export default function AtlasLandmarkGuide({ code, children, controlsFirst = false }: {
  code: keyof typeof guidance;
  children: ReactNode;
  controlsFirst?: boolean;
}) {
  const id = useId();
  const descriptions = { all: "「目印→ツボ」を選ぶと、図に矢印が出ます。", ...guidance[code] };
  const diagram = <div id={`${id}-diagram`}>{children}</div>;

  return (
    <div className={styles.guide} data-atlas-landmark-guide="">
      {!controlsFirst && diagram}
      <fieldset className={styles.controls}>
        <legend className="sr-only">ツボの探し方</legend>
        <div className={styles.choices} data-atlas-guide-choices="">
          {choices.map(({ value, label }) => (
            <label key={value}>
              <input
                type="radio"
                name={id}
                value={value}
                defaultChecked={value === "all"}
                className="sr-only"
                aria-controls={`${id}-diagram`}
                aria-describedby={`${id}-${value}`}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <div className={styles.descriptions}>
          {choices.map(({ value }) => (
            <p key={value} id={`${id}-${value}`} data-landmark-description={value}>
              {descriptions[value]}
            </p>
          ))}
        </div>
      </fieldset>
      {controlsFirst && diagram}
    </div>
  );
}
