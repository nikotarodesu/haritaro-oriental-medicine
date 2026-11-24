import { useId, type ReactNode } from "react";
import styles from "./AtlasLandmarkGuide.module.css";

const choices = [
  { value: "all", label: "全体" },
  { value: "origin", label: "目印" },
  { value: "direction", label: "向き" },
  { value: "point", label: "位置" },
] as const;

const guidance = {
  li4: {
    origin: "人差し指につながる骨をたどり、長さの真ん中を見ます。",
    direction: "骨の真ん中から、短い線に沿って親指側へ少し寄ります。",
    point: "人差し指につながる骨の真ん中より、少し親指側にある丸印が合谷です。",
  },
  pc6: {
    origin: "手のひらを上に向け、手首を横切るしわを見つけます。",
    direction: "手首のしわから、矢印に沿ってひじ側へ2寸進みます。",
    point: "手首を通る2本の腱の間にある丸印が内関です。",
  },
  st36: {
    origin: "ひざのお皿のすぐ下にある、外側のくぼみ（犢鼻）を見つけます。",
    direction: "くぼみと足首の前の中央を結ぶ線に沿って、ひざ側から3寸下がります。",
    point: "すねの骨の前の縁より外側にある、筋肉の上の丸印が足三里です。",
  },
} as const;

export default function AtlasLandmarkGuide({ code, children }: {
  code: keyof typeof guidance;
  children: ReactNode;
}) {
  const id = useId();
  const descriptions = { all: "「目印」から順に選ぶと、図の該当箇所が強調されます。", ...guidance[code] };

  return (
    <div className={styles.guide} data-atlas-landmark-guide="">
      <fieldset className={styles.controls}>
        <legend>図で場所をたどる</legend>
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
      <div id={`${id}-diagram`}>{children}</div>
    </div>
  );
}
