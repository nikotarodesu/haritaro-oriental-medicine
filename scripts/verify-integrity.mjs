import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const errors = [];

console.log("🔍 [Integrity Check] Starting repository data integrity verification...");

// 1. Check Tsubo Master Data (361 points)
try {
  const tsuboFile = path.join(rootDir, "src", "data", "tsubo", "acupointsMaster.ts");
  if (!fs.existsSync(tsuboFile)) {
    errors.push("src/data/tsubo/acupointsMaster.ts not found.");
  } else {
    const content = fs.readFileSync(tsuboFile, "utf-8");
    
    // Check number of acupoints via code field
    const codeMatches = content.match(/["']?code["']?:\s*["']([A-Z0-9]+)["']/g) || [];
    const codes = codeMatches.map((m) => {
      const match = m.match(/["']?code["']?:\s*["']([A-Z0-9]+)["']/);
      return match ? match[1] : "";
    }).filter(Boolean);
    
    console.log(`  ✓ Acupoint Master: detected ${codes.length} points.`);
    if (codes.length !== 361) {
      errors.push(`Acupoints master must contain exactly 361 points, found ${codes.length}.`);
    }

    // Check code duplicates
    const uniqueCodes = new Set();
    for (const code of codes) {
      if (uniqueCodes.has(code)) {
        errors.push(`Duplicate acupoint code found: ${code}`);
      }
      uniqueCodes.add(code);
    }
  }
} catch (e) {
  errors.push(`Failed to verify acupointsMaster.ts: ${e.message}`);
}

// 2. Check Kokushi Past Exams Data
try {
  const kokushiFile = path.join(rootDir, "src", "data", "kokushiPastExams.ts");
  if (!fs.existsSync(kokushiFile)) {
    errors.push("src/data/kokushiPastExams.ts not found.");
  } else {
    const content = fs.readFileSync(kokushiFile, "utf-8");
    const idMatches = content.match(/["']?id["']?:\s*["']([^"']+)["']/g) || [];
    const ids = idMatches.map((m) => {
      const match = m.match(/["']?id["']?:\s*["']([^"']+)["']/);
      return match ? match[1] : "";
    }).filter(Boolean);
    console.log(`  ✓ Kokushi Questions: detected ${ids.length} questions.`);
    
    if (ids.length !== 10) errors.push(`Expected 10 original practice questions, found ${ids.length}.`);
    const uniqueIds = new Set();
    for (const id of ids) {
      if (uniqueIds.has(id)) {
        errors.push(`Duplicate Kokushi question ID found: ${id}`);
      }
      uniqueIds.add(id);
    }
  }
} catch (e) {
  errors.push(`Failed to verify kokushiPastExams.ts: ${e.message}`);
}

// 3. Check Cross-Section Engine
try {
  const csFile = path.join(rootDir, "src", "data", "tsubo", "crossSectionEngine.ts");
  if (!fs.existsSync(csFile)) {
    errors.push("src/data/tsubo/crossSectionEngine.ts not found.");
  } else {
    const content = fs.readFileSync(csFile, "utf-8");
    if (!content.includes("terminal_digit")) {
      errors.push("crossSectionEngine.ts is missing terminal_digit slice type.");
    } else {
      console.log("  ✓ Cross-Section Engine: terminal_digit slice verified.");
    }
  }
} catch (e) {
  errors.push(`Failed to verify crossSectionEngine.ts: ${e.message}`);
}

// 4. Check Service Worker & PWA Manifest
try {
  const swFile = path.join(rootDir, "public", "sw.js");
  if (!fs.existsSync(swFile)) {
    errors.push("public/sw.js (PWA Service Worker) is missing.");
  } else {
    console.log("  ✓ PWA: public/sw.js verified.");
  }

  const manifestFile = path.join(rootDir, "src", "app", "manifest.ts");
  if (!fs.existsSync(manifestFile)) {
    errors.push("src/app/manifest.ts is missing.");
  } else {
    console.log("  ✓ PWA: manifest.ts verified.");
  }
} catch (e) {
  errors.push(`Failed to verify PWA files: ${e.message}`);
}

// Final Evaluation
if (errors.length > 0) {
  console.error("\n❌ [Integrity Check] FAILED with errors:");
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log("\n✅ [Integrity Check] All repository data integrity checks passed successfully!\n");
  process.exit(0);
}
