import { ACUPOINTS_MASTER } from "../src/data/tsubo/acupointsMaster";
import { getAcupointDetail, classifyAcupointSlice } from "../src/data/tsubo";

console.log("=== 手・腕の全経穴スライスとランドマーク・解剖の調査 ===");

const armPoints = ACUPOINTS_MASTER.filter(p => p.bodyPart === "手・腕");

for (const raw of armPoints) {
  const pt = getAcupointDetail(raw.code);
  if (!pt) continue;

  const slice = classifyAcupointSlice(pt);
  
  // 判定
  // 1. 上腕・肘（肘頭、上腕二頭筋、上腕三頭筋、上腕骨など）なのに前腕（橈骨・尺骨）になっていないか
  const isBrachialOrElbow = 
    pt.locationDetail.includes("上腕") ||
    pt.locationDetail.includes("肘頭") ||
    pt.locationDetail.includes("上腕骨") ||
    pt.locationDetail.includes("三角筋") ||
    pt.locationDetail.includes("腋窩") ||
    ["lu3", "lu4", "li11", "li12", "li13", "li14", "ht2", "ht3", "si8", "pc2", "pc3", "te10", "te11", "te12", "te13"].includes(pt.codeLower);

  // 2. 前腕（前腕、橈骨、尺骨、手関節）なのに上腕になっていないか
  const isAntebrachial = 
    (pt.locationDetail.includes("前腕") || pt.locationDetail.includes("手関節") || pt.locationDetail.includes("手根")) &&
    !pt.locationDetail.includes("上腕");

  const hasUlnaRadiusInBrachial = isBrachialOrElbow && (
    slice.includes("forearm") ||
    pt.howToLocate?.some(s => s.includes("橈骨") || s.includes("尺骨")) ||
    pt.palpationLandmarks?.some(l => l.includes("橈骨") || l.includes("尺骨"))
  );

  console.log(`[${pt.code}] ${pt.name} -> Slice: ${slice}`);
  console.log(`  Detail: ${pt.locationDetail}`);
  if (hasUlnaRadiusInBrachial) {
    console.log(`  🚨 警告: 上腕/肘なのに橈骨・尺骨・前腕が混入！`);
    console.log(`    Slice: ${slice}`);
    console.log(`    HowToLocate:`, pt.howToLocate?.[1]);
    console.log(`    Landmarks:`, pt.palpationLandmarks);
  }
}
