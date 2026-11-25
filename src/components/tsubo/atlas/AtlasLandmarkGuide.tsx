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
    direction: "人差し指につながる骨の真ん中が目印です。矢印は、そこから少し親指側を指しています。",
    point: "人差し指につながる骨の真ん中より、少し親指側にある丸印が合谷です。",
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

export default function AtlasLandmarkGuide({ code, children }: {
  code: keyof typeof guidance;
  children: ReactNode;
}) {
  const id = useId();
  const descriptions = { all: "「目印→ツボ」を選ぶと、図に矢印が出ます。", ...guidance[code] };

  return (
    <div className={styles.guide} data-atlas-landmark-guide="">
      <div id={`${id}-diagram`}>{children}</div>
      <fieldset className={styles.controls}>
        <legend className="sr-only">ツボの探し方</legend>
        <div className={styles.choices}>
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
    </div>
  );
}
