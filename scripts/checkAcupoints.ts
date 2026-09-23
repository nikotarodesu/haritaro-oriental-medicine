import { ACUPOINTS_MASTER } from "../src/data/tsubo/acupointsMaster";
import { getAcupointDetail, classifyAcupointSlice } from "../src/data/tsubo";

const testCodes = [
  "lu1", "lu2", "lu3", "li4", "li11", "li20",
  "st1", "st2", "st25", "st31", "st32", "st36",
  "sp6", "bl1", "bl10", "bl13", "bl23", "bl40",
  "ki1", "ki3", "pc6", "gb20", "gb21", "gb30", "gb31",
  "lr3", "gv14", "gv20", "cv4", "cv8", "cv12", "cv17", "cv22"
];

for (const code of testCodes) {
  const pt = getAcupointDetail(code);
  if (!pt) continue;
  const slice = classifyAcupointSlice(pt);
  console.log(`[${pt.code}] ${pt.name} (${pt.bodyPart})`);
  console.log(`  Slice: ${slice} | Level: ${pt.crossSection?.level}`);
  console.log(`  Simple: ${pt.locationSimple}`);
  console.log(`  Detail: ${pt.locationDetail}`);
  console.log(`  Needle: ${pt.crossSection?.needleTrack.angle} / ${pt.crossSection?.needleTrack.safeDepth}`);
  console.log(`  Layers: ${pt.crossSection?.layers.map(l => l.name).join(" -> ")}`);
  if (pt.crossSection?.needleTrack.warning) {
    console.log(`  Warning: ${pt.crossSection?.needleTrack.warning}`);
  }
  console.log("--------------------------------------------------");
}
