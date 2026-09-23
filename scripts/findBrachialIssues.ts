import { ACUPOINTS_MASTER } from "../src/data/tsubo/acupointsMaster";
import { getAcupointDetail, classifyAcupointSlice } from "../src/data/tsubo";

console.log("=== 上腕部の経穴と橈骨・尺骨の混入チェック ===");

const armPointCodes = [
  // 肺経
  "lu3", "lu4", // 天府、侠白
  // 大腸経
  "li11", "li12", "li13", "li14", // 曲池（肘）、肘髎、手五里、臂臑
  // 心経
  "ht2", "ht3", // 青霊、少海（肘）
  // 小腸経
  "si8", "si9", "si10", // 小海（肘）、肩貞、臑兪
  // 心包経
  "pc2", "pc3", // 天泉、曲沢（肘）
  // 三焦経
  "te10", "te11", "te12", "te13", // 天井（肘）、清冷淵、消濼、臑会
];

for (const raw of ACUPOINTS_MASTER) {
  const pt = getAcupointDetail(raw.code);
  if (!pt) continue;

  const isArm = pt.bodyPart === "手・腕" && (
    pt.locationDetail.includes("上腕") ||
    pt.locationDetail.includes("腋窩") ||
    pt.locationSimple.includes("上腕") ||
    pt.locationSimple.includes("力こぶ") ||
    pt.locationSimple.includes("二の腕") ||
    armPointCodes.includes(pt.codeLower)
  );

  if (isArm) {
    const slice = classifyAcupointSlice(pt);
    const hasRadiusUlna = 
      (pt.howToLocate?.some(s => s.includes("橈骨") || s.includes("尺骨"))) ||
      (pt.palpationLandmarks?.some(l => l.includes("橈骨") || l.includes("尺骨"))) ||
      (pt.crossSection?.boundaries?.some(b => b.name.includes("橈骨") || b.name.includes("尺骨"))) ||
      (pt.crossSection?.layers?.some(l => l.name.includes("橈骨") || l.name.includes("尺骨"))) ||
      (pt.crossSection?.axes && (JSON.stringify(pt.crossSection.axes).includes("橈側") || JSON.stringify(pt.crossSection.axes).includes("尺側")));

    console.log(`[${pt.code}] ${pt.name} (${pt.bodyPart})`);
    console.log(`  Slice: ${slice} | Level: ${pt.crossSection?.level}`);
    console.log(`  Simple: ${pt.locationSimple}`);
    console.log(`  Detail: ${pt.locationDetail}`);
    console.log(`  HowToLocate:`, pt.howToLocate);
    console.log(`  Landmarks:`, pt.palpationLandmarks);
    if (hasRadiusUlna) {
      console.log(`  ⚠️ 橈骨・尺骨混入あり！`);
      if (pt.howToLocate?.some(s => s.includes("橈骨") || s.includes("尺骨"))) console.log(`    - howToLocateに橈骨/尺骨`);
      if (pt.palpationLandmarks?.some(l => l.includes("橈骨") || l.includes("尺骨"))) console.log(`    - palpationLandmarksに橈骨/尺骨`);
      if (pt.crossSection?.boundaries?.some(b => b.name.includes("橈骨") || b.name.includes("尺骨"))) console.log(`    - boundariesに橈骨/尺骨`);
    }
    console.log("--------------------------------------------------");
  }
}
