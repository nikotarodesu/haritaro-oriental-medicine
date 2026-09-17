import { ALL_ACUPOINTS, MERIDIANS } from "./index";
import { AcupointMaster, QuizQuestion, StudySkillType } from "./types";

export interface CourseUnitDefinition {
  id: string;
  courseId: string;
  courseTitle: string;
  unitTitle: string;
  description: string;
  targetPointCodes: string[];
}

// ==================== 問題文サニタイザー（答え漏洩の完全遮断） ====================

/**
 * 経穴紹介文から経穴名、読み、コード、別名を完全に除去し、
 * 純粋な解剖学的部位・骨性目印のみの問い文章を生成する
 */
export function cleanLocationPrompt(pt: AcupointMaster): string {
  // WHO標準詳細位置をベースにする（最も正確でブレがない）
  let text = pt.locationDetail || pt.locationSimple;

  // 1. 冒頭の「経穴名（CODE）は、」などの定型プレフィックスを除去
  text = text.replace(/^[^、。]+?（[A-Z0-9]+?）は、?/i, "");
  text = text.replace(new RegExp(`^${pt.name}（${pt.code}）は、?`, "i"), "");
  text = text.replace(new RegExp(`^${pt.name}は、?`), "");
  text = text.replace(new RegExp(`^${pt.code}は、?`, "i"), "");

  // 2. 別名が文頭に含まれる場合も除去
  if (pt.aliases) {
    for (const alias of pt.aliases) {
      text = text.replace(new RegExp(`^${alias}は、?`), "");
      text = text.replace(new RegExp(alias, "g"), "〇〇");
    }
  }

  // 3. 文中に漏れた名前・コード・かなの完全伏字化（万が一の混入防止）
  text = text.replace(new RegExp(pt.name, "g"), "〇〇");
  text = text.replace(new RegExp(pt.code, "gi"), "〇〇");
  text = text.replace(new RegExp(pt.kana, "g"), "〇〇");

  // 前後の空白や読点のトリミング
  text = text.replace(/^[、\s]+/, "").trim();

  return text;
}

// ==================== クイズ生成エンジン ====================

/**
 * 指定の経穴群から、指定スキルの一意なクイズリストを生成
 */
export function generateQuestionsForPoints(
  points: AcupointMaster[],
  skill: StudySkillType = "location_to_name",
  limit?: number
): QuizQuestion[] {
  const allMaster = ALL_ACUPOINTS;
  const questions: QuizQuestion[] = [];

  for (const pt of points) {
    if (skill === "location_to_name") {
      const cleanLoc = cleanLocationPrompt(pt);
      const prompt = `【部位・取穴法】\n${cleanLoc}\n\n上記の部位・骨性目印に位置する経穴はどれか？`;

      // 誤答選択肢（同経または同部位のリアルな経穴から抽出）
      const sameMeridianPoints = allMaster.filter(
        (p) => p.meridianId === pt.meridianId && p.code !== pt.code
      );
      const sameBodyPartPoints = allMaster.filter(
        (p) => p.bodyPart === pt.bodyPart && p.code !== pt.code
      );
      
      const candidatePool = [...sameMeridianPoints, ...sameBodyPartPoints];
      const distractors: AcupointMaster[] = [];
      const seenCodes = new Set<string>([pt.code]);

      for (const cand of candidatePool) {
        if (!seenCodes.has(cand.code)) {
          seenCodes.add(cand.code);
          distractors.push(cand);
          if (distractors.length === 3) break;
        }
      }

      // プール不足時は全体から補完
      if (distractors.length < 3) {
        for (const cand of allMaster) {
          if (!seenCodes.has(cand.code)) {
            seenCodes.add(cand.code);
            distractors.push(cand);
            if (distractors.length === 3) break;
          }
        }
      }

      const options = [
        { id: pt.code, text: `${pt.name}（${pt.code}）`, subtext: `${pt.meridianShort} / ${pt.bodyPart}` },
        ...distractors.map((d) => ({
          id: d.code,
          text: `${d.name}（${d.code}）`,
          subtext: `${d.meridianShort} / ${d.bodyPart}`,
        })),
      ];

      // 選択肢のシャッフル（問題IDハッシュによる決定論的シャッフルでSSR整合性を保持）
      const shuffledOptions = deterministicShuffle(options, pt.code);

      questions.push({
        id: `q_loc_${pt.codeLower}`,
        acupointCode: pt.code,
        skill: "location_to_name",
        prompt,
        options: shuffledOptions,
        correctOptionId: pt.code,
        explanation: `${pt.name}（${pt.code}）：${pt.meridian}。\n部位：${pt.locationDetail}\n要穴分類：${pt.categories.join("、") || "なし"}。\n臨床メモ：${pt.clinicalNote}`,
        meridianName: pt.meridian,
        locationReference: pt.locationDetail,
      });
    } else if (skill === "meridian_of_point") {
      const prompt = `経穴「${pt.name}（${pt.code}）」が所属する経脈はどれか？`;
      const correctMeridian = pt.meridian;
      const otherMeridians = MERIDIANS.filter((m) => m.name !== correctMeridian);
      
      // 決定論的シャッフルで誤答3つ選出
      const distractorMeridians = deterministicShuffle(otherMeridians, pt.code).slice(0, 3);

      const options = [
        { id: correctMeridian, text: correctMeridian, subtext: pt.meridianShort },
        ...distractorMeridians.map((m) => ({ id: m.name, text: m.name, subtext: m.shortName })),
      ];

      questions.push({
        id: `q_mer_${pt.codeLower}`,
        acupointCode: pt.code,
        skill: "meridian_of_point",
        prompt,
        options: deterministicShuffle(options, pt.code + "_mer"),
        correctOptionId: correctMeridian,
        explanation: `${pt.name}（${pt.code}）は${pt.meridian}に属します。部位：${pt.locationSimple}`,
        meridianName: pt.meridian,
        locationReference: pt.locationDetail,
      });
    } else if (skill === "category_of_point") {
      if (pt.categories.length === 0) continue; // 要穴のない穴はスキップ
      const primaryCategory = pt.categories[0];
      const prompt = `経穴「${pt.name}（${pt.code}）」が該当する要穴分類として正しいものはどれか？`;

      const allCategories = ["原穴", "絡穴", "郄穴", "募穴", "背部兪穴", "四総穴", "八会穴", "八脈交会穴", "合穴", "井穴", "滎穴", "輸穴", "経穴"];
      const otherCats = allCategories.filter((c) => !pt.categories.includes(c));
      const distractorCats = deterministicShuffle(otherCats, pt.code).slice(0, 3);

      const options = [
        { id: primaryCategory, text: primaryCategory },
        ...distractorCats.map((c) => ({ id: c, text: c })),
      ];

      questions.push({
        id: `q_cat_${pt.codeLower}`,
        acupointCode: pt.code,
        skill: "category_of_point",
        prompt,
        options: deterministicShuffle(options, pt.code + "_cat"),
        correctOptionId: primaryCategory,
        explanation: `${pt.name}（${pt.code}）の要穴分類は「${pt.categories.join("、")}」です。`,
        meridianName: pt.meridian,
        locationReference: pt.locationDetail,
      });
    }
  }

  if (limit && limit > 0) {
    return questions.slice(0, limit);
  }

  return questions;
}

/**
 * 決定論的シャッフル（配列とシード文字列から安定した順序を生成）
 */
function deterministicShuffle<T>(array: T[], seed: string): T[] {
  const copy = [...array];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.abs((hash * (i + 1) * 31) % (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ==================== 14経脈小単位ユニットコース定義 ====================

export const COURSE_UNITS: CourseUnitDefinition[] = [
  // 1. 手の太陰肺経 (11穴)
  {
    id: "lu_unit1",
    courseId: "meridian_lu",
    courseTitle: "手の太陰肺経",
    unitTitle: "肺経 基礎（LU1〜LU6）",
    description: "中府・雲門などの胸部穴から肘部の尺沢・孔最まで",
    targetPointCodes: ["LU1", "LU2", "LU3", "LU4", "LU5", "LU6"],
  },
  {
    id: "lu_unit2",
    courseId: "meridian_lu",
    courseTitle: "手の太陰肺経",
    unitTitle: "肺経 要穴・手部（LU7〜LU11）",
    description: "四総穴の列欠、原穴の太淵から指先の少商まで",
    targetPointCodes: ["LU7", "LU8", "LU9", "LU10", "LU11"],
  },

  // 2. 手の陽明大腸経 (20穴)
  {
    id: "li_unit1",
    courseId: "meridian_li",
    courseTitle: "手の陽明大腸経",
    unitTitle: "大腸経 手指・手背（LI1〜LI5）",
    description: "商陽・二間・三間、原穴の合谷、陽谿",
    targetPointCodes: ["LI1", "LI2", "LI3", "LI4", "LI5"],
  },
  {
    id: "li_unit2",
    courseId: "meridian_li",
    courseTitle: "手の陽明大腸経",
    unitTitle: "大腸経 前腕・肘（LI6〜LI11）",
    description: "偏歴・温溜・手三里・曲池などの臨床要穴",
    targetPointCodes: ["LI6", "LI7", "LI8", "LI9", "LI10", "LI11"],
  },
  {
    id: "li_unit3",
    courseId: "meridian_li",
    courseTitle: "手の陽明大腸経",
    unitTitle: "大腸経 上腕・肩・顔面（LI12〜LI20）",
    description: "肩髃・巨骨から顔面の迎香まで",
    targetPointCodes: ["LI12", "LI13", "LI14", "LI15", "LI16", "LI17", "LI18", "LI19", "LI20"],
  },

  // 3. 足の陽明胃経 (45穴)
  {
    id: "st_unit1",
    courseId: "meridian_st",
    courseTitle: "足の陽明胃経",
    unitTitle: "胃経 頭顔面・頚部（ST1〜ST9）",
    description: "承泣・四白・地倉・下関・頭維・人迎",
    targetPointCodes: ["ST1", "ST2", "ST3", "ST4", "ST5", "ST6", "ST7", "ST8", "ST9"],
  },
  {
    id: "st_unit2",
    courseId: "meridian_st",
    courseTitle: "足の陽明胃経",
    unitTitle: "胃経 胸部・腹部（ST10〜ST25）",
    description: "欠盆・乳中・乳根から大腸募穴の天枢まで",
    targetPointCodes: ["ST10", "ST12", "ST15", "ST18", "ST19", "ST21", "ST25"],
  },
  {
    id: "st_unit3",
    courseId: "meridian_st",
    courseTitle: "足の陽明胃経",
    unitTitle: "胃経 大腿・膝（ST31〜ST36）",
    description: "髀関・伏兎・梁丘・犢鼻、そして足三里",
    targetPointCodes: ["ST31", "ST32", "ST34", "ST35", "ST36"],
  },
  {
    id: "st_unit4",
    courseId: "meridian_st",
    courseTitle: "足の陽明胃経",
    unitTitle: "胃経 下腿・足背（ST37〜ST45）",
    description: "上巨虚・条口・下巨虚・豊隆・解渓・内庭・厲兌",
    targetPointCodes: ["ST37", "ST38", "ST39", "ST40", "ST41", "ST42", "ST43", "ST44", "ST45"],
  },

  // 4. 足の太陰脾経 (21穴)
  {
    id: "sp_unit1",
    courseId: "meridian_sp",
    courseTitle: "足の太陰脾経",
    unitTitle: "脾経 足部・下腿（SP1〜SP10）",
    description: "隠白・大都・太白・公孫・三陰交・陰陵泉・血海",
    targetPointCodes: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6", "SP8", "SP9", "SP10"],
  },
  {
    id: "sp_unit2",
    courseId: "meridian_sp",
    courseTitle: "足の太陰脾経",
    unitTitle: "脾経 腹部・側胸部（SP11〜SP21）",
    description: "府舎・大横・腹哀から脾の大絡の大包まで",
    targetPointCodes: ["SP12", "SP15", "SP16", "SP21"],
  },

  // 5. 手の少陰心経 (9穴)
  {
    id: "ht_unit1",
    courseId: "meridian_ht",
    courseTitle: "手の少陰心経",
    unitTitle: "心経 全穴（HT1〜HT9）",
    description: "極泉・青霊・少海・通里・陰郄・神門・少府・少衝",
    targetPointCodes: ["HT1", "HT2", "HT3", "HT4", "HT5", "HT6", "HT7", "HT8", "HT9"],
  },

  // 6. 手の太陽小腸経 (19穴)
  {
    id: "si_unit1",
    courseId: "meridian_si",
    courseTitle: "手の太陽小腸経",
    unitTitle: "小腸経 手部・前腕（SI1〜SI8）",
    description: "少沢・前谷・後渓・腕骨・陽谷・養老・小海",
    targetPointCodes: ["SI1", "SI2", "SI3", "SI4", "SI5", "SI6", "SI7", "SI8"],
  },
  {
    id: "si_unit2",
    courseId: "meridian_si",
    courseTitle: "手の太陽小腸経",
    unitTitle: "小腸経 肩甲・顔面（SI9〜SI19）",
    description: "肩貞・臑兪・天宗・秉風・肩外兪・天窓・天容・顴髎・聴宮",
    targetPointCodes: ["SI9", "SI10", "SI11", "SI12", "SI13", "SI14", "SI15", "SI16", "SI17", "SI18", "SI19"],
  },

  // 7. 足の太陽膀胱経 (67穴)
  {
    id: "bl_unit1",
    courseId: "meridian_bl",
    courseTitle: "足の太陽膀胱経",
    unitTitle: "膀胱経 頭部・項部（BL1〜BL10）",
    description: "晴明・攅竹・眉衝・曲差・五処・承光・通天・玉枕・天柱",
    targetPointCodes: ["BL1", "BL2", "BL7", "BL10"],
  },
  {
    id: "bl_unit2",
    courseId: "meridian_bl",
    courseTitle: "足の太陽膀胱経",
    unitTitle: "膀胱経 背部兪穴1（BL11〜BL20）",
    description: "大杼・風門・肺兪・厥陰兪・心兪・督兪・膈兪・肝兪・胆兪・脾兪",
    targetPointCodes: ["BL11", "BL12", "BL13", "BL14", "BL15", "BL17", "BL18", "BL19", "BL20"],
  },
  {
    id: "bl_unit3",
    courseId: "meridian_bl",
    courseTitle: "足の太陽膀胱経",
    unitTitle: "膀胱経 背部兪穴2・腰仙部（BL21〜BL35）",
    description: "胃兪・三焦兪・腎兪・大腸兪・小腸兪・膀胱兪・次髎",
    targetPointCodes: ["BL21", "BL22", "BL23", "BL25", "BL27", "BL28", "BL31", "BL32"],
  },
  {
    id: "bl_unit4",
    courseId: "meridian_bl",
    courseTitle: "足の太陽膀胱経",
    unitTitle: "膀胱経 下肢部（BL36〜BL67）",
    description: "承扶・委陽・委中・膏肓・志室・承山・飛揚・昆侖・申脈・至陰",
    targetPointCodes: ["BL36", "BL39", "BL40", "BL43", "BL52", "BL57", "BL58", "BL60", "BL62", "BL67"],
  },

  // 8. 足の少陰腎経 (27穴)
  {
    id: "ki_unit1",
    courseId: "meridian_ki",
    courseTitle: "足の少陰腎経",
    unitTitle: "腎経 足部・下腿（KI1〜KI10）",
    description: "湧泉・然谷・太渓・大鐘・水泉・照海・復溜・交信・陰谷",
    targetPointCodes: ["KI1", "KI2", "KI3", "KI4", "KI5", "KI6", "KI7", "KI8", "KI10"],
  },
  {
    id: "ki_unit2",
    courseId: "meridian_ki",
    courseTitle: "足の少陰腎経",
    unitTitle: "腎経 腹部・胸部（KI11〜KI27）",
    description: "横骨・大赫・肓兪・幽門・神蔵・兪府",
    targetPointCodes: ["KI11", "KI12", "KI16", "KI21", "KI25", "KI27"],
  },

  // 9. 手の厥陰心包経 (9穴)
  {
    id: "pc_unit1",
    courseId: "meridian_pc",
    courseTitle: "手の厥陰心包経",
    unitTitle: "心包経 全穴（PC1〜PC9）",
    description: "天池・曲沢・郄門・間使・内関・大陵・労宮・中衝",
    targetPointCodes: ["PC1", "PC2", "PC3", "PC4", "PC5", "PC6", "PC7", "PC8", "PC9"],
  },

  // 10. 手の少陽三焦経 (23穴)
  {
    id: "te_unit1",
    courseId: "meridian_te",
    courseTitle: "手の少陽三焦経",
    unitTitle: "三焦経 手部・前腕・肘（TE1〜TE10）",
    description: "関衝・液門・中渚・陽池・外関・支溝・天井",
    targetPointCodes: ["TE1", "TE2", "TE3", "TE4", "TE5", "TE6", "TE10"],
  },
  {
    id: "te_unit2",
    courseId: "meridian_te",
    courseTitle: "手の少陽三焦経",
    unitTitle: "三焦経 肩・頸・耳頭部（TE11〜TE23）",
    description: "肩髎・天髎・翳風・角孫・耳門・糸竹空",
    targetPointCodes: ["TE14", "TE15", "TE17", "TE20", "TE21", "TE23"],
  },

  // 11. 足の少陽胆経 (44穴)
  {
    id: "gb_unit1",
    courseId: "meridian_gb",
    courseTitle: "足の少陽胆経",
    unitTitle: "胆経 頭部・側頭部（GB1〜GB20）",
    description: "瞳子髎・聴会・頷厭・率谷・陽白・風池",
    targetPointCodes: ["GB1", "GB2", "GB4", "GB8", "GB14", "GB20"],
  },
  {
    id: "gb_unit2",
    courseId: "meridian_gb",
    courseTitle: "足の少陽胆経",
    unitTitle: "胆経 肩・体幹部（GB21〜GB30）",
    description: "肩井・日月・京門・帯脈・環跳",
    targetPointCodes: ["GB21", "GB24", "GB25", "GB26", "GB30"],
  },
  {
    id: "gb_unit3",
    courseId: "meridian_gb",
    courseTitle: "足の少陽胆経",
    unitTitle: "胆経 下肢・足部（GB31〜GB44）",
    description: "風市・陽陵泉・光明・陽輔・懸鐘・丘墟・足臨泣・足竅陰",
    targetPointCodes: ["GB31", "GB34", "GB37", "GB38", "GB39", "GB40", "GB41", "GB44"],
  },

  // 12. 足の厥陰肝経 (14穴)
  {
    id: "lr_unit1",
    courseId: "meridian_lr",
    courseTitle: "足の厥陰肝経",
    unitTitle: "肝経 足部・下腿（LR1〜LR8）",
    description: "大敦・行間・太衝・中封・蠡溝・中都・曲泉",
    targetPointCodes: ["LR1", "LR2", "LR3", "LR4", "LR5", "LR6", "LR8"],
  },
  {
    id: "lr_unit2",
    courseId: "meridian_lr",
    courseTitle: "足の厥陰肝経",
    unitTitle: "肝経 大腿・胸腹部（LR9〜LR14）",
    description: "陰包・足五里・陰廉・急脈・章門・期門",
    targetPointCodes: ["LR9", "LR10", "LR11", "LR12", "LR13", "LR14"],
  },

  // 13. 督脈 (28穴)
  {
    id: "gv_unit1",
    courseId: "meridian_gv",
    courseTitle: "督脈",
    unitTitle: "督脈 尾骨・腰背部（GV1〜GV14）",
    description: "長強・腰兪・命門・脊中・至陽・身柱・大椎",
    targetPointCodes: ["GV1", "GV2", "GV4", "GV6", "GV9", "GV12", "GV14"],
  },
  {
    id: "gv_unit2",
    courseId: "meridian_gv",
    courseTitle: "督脈",
    unitTitle: "督脈 項部・頭顔面（GV15〜GV28）",
    description: "瘂門・風府・百会・前頂・神庭・素髎・水溝・齦交",
    targetPointCodes: ["GV15", "GV16", "GV20", "GV21", "GV24", "GV25", "GV26", "GV28"],
  },

  // 14. 任脈 (24穴)
  {
    id: "cv_unit1",
    courseId: "meridian_cv",
    courseTitle: "任脈",
    unitTitle: "任脈 下腹部・臍周囲（CV1〜CV11）",
    description: "会陰・曲骨・中極・関元・気海・神闕・水分・建里",
    targetPointCodes: ["CV1", "CV2", "CV3", "CV4", "CV6", "CV8", "CV9", "CV11"],
  },
  {
    id: "cv_unit2",
    courseId: "meridian_cv",
    courseTitle: "任脈",
    unitTitle: "任脈 上腹・胸顔面（CV12〜CV24）",
    description: "中脘・巨闕・鳩尾・膻中・天突・廉泉・承漿",
    targetPointCodes: ["CV12", "CV14", "CV15", "CV17", "CV22", "CV23", "CV24"],
  },
];

// ==================== 検品テスト関数（答え混入検出） ====================

/**
 * すべての経穴に対するクイズ問題文を検査し、
 * 問題文、選択肢、ヒント、補足に答えとなる名称・コード・読みが漏洩していないかを自動検品する
 */
export function validateAllQuizQuestions(): { passed: boolean; errorCount: number; errors: string[] } {
  const allMaster = ALL_ACUPOINTS;
  const errors: string[] = [];

  for (const pt of allMaster) {
    const qLocList = generateQuestionsForPoints([pt], "location_to_name");
    for (const q of qLocList) {
      // 1. 問題文に名称・コード・読みが含まれていないか
      if (q.prompt.includes(pt.name)) {
        errors.push(`[LEAK_NAME] ${pt.code} の問題文に「${pt.name}」が含まれています: ${q.prompt}`);
      }
      if (new RegExp(`\\b${pt.code}\\b`, "i").test(q.prompt)) {
        errors.push(`[LEAK_CODE] ${pt.code} の問題文にコード「${pt.code}」が含まれています: ${q.prompt}`);
      }
      if (q.prompt.includes(pt.kana)) {
        errors.push(`[LEAK_KANA] ${pt.code} の問題文に読み「${pt.kana}」が含まれています: ${q.prompt}`);
      }

      // 2. 選択肢に正解が1つだけ含まれているか
      const correctOptions = q.options.filter((o) => o.id === q.correctOptionId);
      if (correctOptions.length !== 1) {
        errors.push(`[OPTION_ERROR] ${pt.code} の正解選択肢数が ${correctOptions.length} です`);
      }

      // 3. 選択肢の重複がないか
      const optIds = new Set(q.options.map((o) => o.id));
      if (optIds.size !== q.options.length) {
        errors.push(`[DUPLICATE_OPTIONS] ${pt.code} の選択肢に重複があります`);
      }
    }
  }

  return {
    passed: errors.length === 0,
    errorCount: errors.length,
    errors,
  };
}
