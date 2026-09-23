import { getAcupointDetail } from "../src/data/tsubo";

const sampleCodes = [
  "cv8",   // 禁鍼穴（神闕）
  "st17",  // 禁鍼・禁灸穴（乳中）
  "bl1",   // 禁灸穴（睛明）
  "gv15",  // 延髄（瘂門）
  "cv22",  // 気管前壁（天突）
  "st9",   // 頸動脈洞（人迎）
  "gb20",  // 椎骨動脈（風池）
  "gb21",  // 気胸・妊婦禁忌（肩井）
  "lu1",   // 気胸（中府）
  "cv17",  // 胸骨平刺（膻中）
  "gv14",  // 脊椎正中（大椎）
  "li4",   // 妊婦禁忌（合谷）
  "sp6",   // 妊婦禁忌（三陰交）
  "gb30",  // 坐骨神経（環跳）
  "st36",  // 下肢（足三里）
  "ki1",   // 足底（湧泉）
];

for (const code of sampleCodes) {
  const pt = getAcupointDetail(code);
  if (!pt) continue;
  console.log(`========================================`);
  console.log(`[${pt.code}] ${pt.name} (${pt.kana}) - ${pt.bodyPart}`);
  console.log(`【一般向け場所】${pt.locationSimple}`);
  console.log(`【専門部位】${pt.locationDetail}`);
  console.log(`【位置混同・注意点】\n${pt.pitfalls}`);
  console.log(`【3ステップ取穴】`);
  if (pt.howToLocate) {
    pt.howToLocate.forEach((s, idx) => console.log(`  Step ${idx + 1}: ${s}`));
  }
  console.log(`【断面スライス】${pt.crossSection?.sliceType} (${pt.crossSection?.level})`);
  console.log(`【針法・深度】${pt.crossSection?.needleTrack.angle} / ${pt.crossSection?.needleTrack.safeDepth}`);
  console.log(`【警告】${pt.crossSection?.needleTrack.warning || "なし"}`);
}
