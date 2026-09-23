import { ACUPOINTS_MASTER } from "../src/data/tsubo/acupointsMaster";
import { DETAILED_ACUPOINTS } from "../src/data/tsubo/detailedPoints";
import { getAcupointDetail } from "../src/data/tsubo";

console.log("=== 上腕・肘・前腕の全データにおける橈骨・尺骨言及の総点検 ===");

for (const raw of ACUPOINTS_MASTER) {
  if (raw.bodyPart !== "手・腕") continue;
  const pt = getAcupointDetail(raw.code);
  if (!pt) continue;

  const textToScan = [
    pt.locationSimple,
    pt.locationDetail,
    pt.pitfalls,
    ...(pt.howToLocate || []),
    ...(pt.palpationLandmarks || []),
    pt.crossSection?.title || "",
    pt.crossSection?.level || "",
    pt.crossSection?.summary || "",
    pt.crossSection?.needleTrack.angle || "",
    pt.crossSection?.needleTrack.warning || "",
    ...(pt.crossSection?.layers.map(l => l.name + " " + l.description) || []),
    ...(pt.crossSection?.boundaries?.map(b => b.name + " " + b.description) || []),
    ...(pt.crossSection?.adjacentStructures?.map(a => a.name + " " + a.description) || []),
  ].join(" ");

  const hasRadius = textToScan.includes("橈骨");
  const hasUlna = textToScan.includes("尺骨");

  if (hasRadius || hasUlna) {
    console.log(`[${pt.code}] ${pt.name}`);
    console.log(`  Simple: ${pt.locationSimple}`);
    console.log(`  Detail: ${pt.locationDetail}`);
    console.log(`  Slice: ${pt.crossSection?.sliceType}`);
    
    // どのフィールドに含まれているかを特定
    const matches: string[] = [];
    if (pt.locationSimple.includes("橈骨") || pt.locationSimple.includes("尺骨")) matches.push("locationSimple");
    if (pt.locationDetail.includes("橈骨") || pt.locationDetail.includes("尺骨")) matches.push("locationDetail");
    if (pt.pitfalls.includes("橈骨") || pt.pitfalls.includes("尺骨")) matches.push("pitfalls");
    if (pt.howToLocate?.some(s => s.includes("橈骨") || s.includes("尺骨"))) matches.push("howToLocate");
    if (pt.palpationLandmarks?.some(l => l.includes("橈骨") || l.includes("尺骨"))) matches.push("palpationLandmarks");
    if (pt.crossSection?.boundaries?.some(b => b.name.includes("橈骨") || b.name.includes("尺骨"))) matches.push("crossSection.boundaries");
    if (pt.crossSection?.layers?.some(l => l.name.includes("橈骨") || l.name.includes("尺骨"))) matches.push("crossSection.layers");

    console.log(`  -> 該当フィールド: ${matches.join(", ")}`);
    console.log("--------------------------------------------------");
  }
}
