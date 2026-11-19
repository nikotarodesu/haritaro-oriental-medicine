import { armPoints } from "./arms";
import { backPoints } from "./back";
import { headPoints } from "./head";
import { trunkPoints } from "./trunk";
import type { ExpandedPoint } from "./types";

export const expandedPoints: Readonly<Record<string, ExpandedPoint>> = {
  ...headPoints,
  ...armPoints,
  ...trunkPoints,
  ...backPoints,
};

export const alternateLocations: Partial<Record<string, string>> = {
  li19: "WHOの代替位置は、鼻の穴の外縁の真下で、人中を上から3等分した最初の境目と同じ高さです。",
  li20: "WHOの代替位置は、同じ溝の中で、小鼻の下端と同じ高さです。",
  pc8: "WHOの代替位置は、中指と薬指につながる骨の間で、指の付け根より手首側のくぼみです。",
  gb30: "WHOの代替位置は、太ももの外の骨の突起と骨盤の前端を結ぶ線の、太ももの骨から3分の1です。",
  gv26: "WHOの代替位置は、同じ縦の溝を上から3等分した最初の境目です。",
};

export function formatPublicAtlasLocation(code: string): string | undefined {
  const point = expandedPoints[code];
  if (!point) return;
  return `${point.location}。${point.location.includes("寸") ? "寸は体の区間を等分した位置の目安です。" : ""}${alternateLocations[code] ?? ""}`;
}
