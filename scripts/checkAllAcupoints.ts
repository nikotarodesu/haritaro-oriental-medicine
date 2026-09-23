import { ACUPOINTS_MASTER } from "../src/data/tsubo/acupointsMaster";
import { getAcupointDetail, classifyAcupointSlice } from "../src/data/tsubo";

console.log(`Total acupoints: ${ACUPOINTS_MASTER.length}`);

const sliceCounts: Record<string, number> = {};
const issues: Array<{ code: string; name: string; issue: string }> = [];

for (const raw of ACUPOINTS_MASTER) {
  const pt = getAcupointDetail(raw.code);
  if (!pt) {
    issues.push({ code: raw.code, name: raw.name, issue: "Detail not found" });
    continue;
  }
  const slice = classifyAcupointSlice(pt);
  sliceCounts[slice] = (sliceCounts[slice] || 0) + 1;

  // 1. 禁刺穴（神闕 CV8、乳中 ST17）
  if (["cv8", "st17"].includes(pt.code.toLowerCase())) {
    if (!pt.crossSection?.needleTrack.angle?.includes("厳禁") && !pt.crossSection?.needleTrack.angle?.includes("禁忌")) {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `禁刺穴なのに刺鍼可能になっている: ${pt.crossSection?.needleTrack.angle}`
      });
    }
  }

  // 2. 延髄リスク（風府・唖門）
  if (["gv15", "gv16"].includes(pt.code.toLowerCase())) {
    if (!pt.crossSection?.needleTrack.warning?.includes("延髄") && !pt.crossSection?.needleTrack.warning?.includes("大後頭孔")) {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `瘂門/風府なのに延髄・大後頭孔警告がない`
      });
    }
  }

  // 3. 胸骨正中穴（CV16〜CV21）
  if (["cv16", "cv17", "cv18", "cv19", "cv20", "cv21"].includes(pt.code.toLowerCase())) {
    if (slice !== "chest_sternal") {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `胸骨上の任脈穴なのに slice が ${slice} になっている`
      });
    }
    if (pt.crossSection?.needleTrack.warning?.includes("気胸") || pt.crossSection?.needleTrack.angle?.includes("肋骨")) {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `胸骨上の任脈穴なのに肋骨/気胸警告になっている: ${pt.crossSection?.needleTrack.warning}`
      });
    }
  }

  // 4. 督脈脊椎正中穴（GV3〜GV14）
  if (["gv3", "gv4", "gv5", "gv6", "gv7", "gv8", "gv9", "gv10", "gv11", "gv12", "gv13", "gv14"].includes(pt.code.toLowerCase())) {
    if (slice !== "spine_posterior_median") {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `督脈の脊椎正中穴なのに slice が ${slice} になっている`
      });
    }
    if (!pt.crossSection?.needleTrack.warning?.includes("脊柱管") && !pt.crossSection?.needleTrack.warning?.includes("黄靭帯")) {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `督脈の脊椎正中穴なのに脊柱管・黄靭帯警告がない`
      });
    }
  }

  // 5. 気胸リスク穴（肺兪BL13、中府LU1、肩井GB21等）の深度と警告
  if (["bl13", "lu1", "gb21"].includes(pt.code.toLowerCase())) {
    if (!pt.crossSection?.needleTrack.warning?.includes("気胸")) {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `代表的気胸リスク穴なのに気胸警告がない`
      });
    }
  }

  // 6. 頸動脈洞リスク（人迎ST9、水突ST10等）
  if (["st9", "st10"].includes(pt.code.toLowerCase())) {
    if (!pt.crossSection?.needleTrack.warning?.includes("頸動脈洞") && !pt.crossSection?.needleTrack.warning?.includes("総頸動脈")) {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `人迎・水突なのに総頸動脈・頸動脈洞反射の警告がない`
      });
    }
  }

  // 7. 臀部穴（環跳GB30、秩辺BL54等）
  if (["gb30", "bl54", "bl53", "bl36"].includes(pt.code.toLowerCase())) {
    if (slice !== "buttock_gluteal") {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `臀部穴なのに slice が ${slice} になっている`
      });
    }
  }

  // 8. 手部穴（合谷LI4、労宮PC8、中渚TE3等）
  if (["li4", "pc8", "te3", "si3", "lu10"].includes(pt.code.toLowerCase())) {
    if (slice !== "hand_metacarpal") {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `手部穴なのに slice が ${slice} になっている`
      });
    }
  }

  // 9. 足部穴（太衝LR3、湧泉KI1、太白SP3等）
  if (["lr3", "ki1", "sp3", "st44", "gb41"].includes(pt.code.toLowerCase())) {
    if (slice !== "foot_dorsal") {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `足部穴なのに slice が ${slice} になっている`
      });
    }
  }

  // 10. 頭頂穴（百会GV20、四神聡、神庭GV24等）
  if (["gv20", "gv24", "bl6", "bl7"].includes(pt.code.toLowerCase())) {
    if (slice !== "head_vertex") {
      issues.push({
        code: pt.code,
        name: pt.name,
        issue: `頭頂穴なのに slice が ${slice} になっている`
      });
    }
  }
}

console.log("=== SLICE COUNTS ===");
for (const [s, count] of Object.entries(sliceCounts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${s}: ${count}`);
}

console.log("\n=== IDENTIFIED ISSUES ===");
console.log(`Total issues found: ${issues.length}`);
for (const issue of issues) {
  console.log(`- [${issue.code}] ${issue.name}: ${issue.issue}`);
}
