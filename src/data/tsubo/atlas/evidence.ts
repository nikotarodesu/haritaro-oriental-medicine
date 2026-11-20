import { CLINICAL_STUDY_ADDITIONS } from "./clinicalStudies";
import { SUPPLEMENTAL_ATLAS_STUDIES } from "./supplementalClinicalStudies";
import type { AtlasStudy, StudySource } from "./types";

// Codes list the points reported in the intervention, including comparator codes only when labelled as such.
const existingStudies: readonly AtlasStudy[] = [
  {
    id: "pc6-postoperative-nausea",
    topic: "手術後の吐き気・嘔吐の予防",
    kind: "point",
    points: ["pc6"],
    result: "内関への刺激は、偽刺激に比べて手術後の吐き気や嘔吐を減らす可能性があります。制吐薬と非侵襲的な刺激を併用すると、追加の薬が必要になる人も減ると考えられています。",
    design: "手術を受けた人を対象とした77試験・9,847人のコクランレビューです。鍼や指圧バンドなど刺激の方法と、制吐薬の併用の有無を分けて比較しています。",
    limits: "比較ごとに根拠の確かさが異なり、副作用の報告は限られています。つわりや胃痛などにどこまで当てはまるかは、このレビューの範囲外です。",
    sources: [{ label: "Lee ほか · Cochrane（2025）", url: "https://www.cochrane.org/evidence/CD003281_what-are-benefits-and-risks-different-wrist-pc6-acupoint-stimulation-techniques-preventing-nausea" }],
  },
  {
    id: "bl67-breech",
    topic: "骨盤位（逆子）に対する至陰の灸",
    kind: "point",
    points: ["bl67"],
    result: "通常の妊婦健診・管理に至陰への灸を加えると、出生時に頭が下を向いていない割合が減る可能性があります。帝王切開の割合は、ほとんど変わらないと考えられています。",
    design: "単胎の骨盤位を対象としたコクランレビューです。通常管理と比べた出生時の胎位の解析には7試験・1,152人が含まれ、根拠の確かさは中程度でした。",
    limits: "子宮収縮ややけどなどの報告があり、安全性の評価には限界があります。骨盤位や灸については、産科の担当者に相談してください。",
    sources: [{ label: "Coyle ほか · Cochrane（2023）", url: "https://www.cochrane.org/evidence/CD003928_moxibustion-turning-baby-breech-position" }],
  },
  {
    id: "sp6-menstrual-pain",
    topic: "原発性月経困難症の痛み",
    kind: "point",
    points: ["sp6"],
    comparisonPoints: ["gb39"],
    guide: "menstrual-pain-chill",
    result: "初回の電気鍼後、三陰交の群は比較群より痛みが100 mmの尺度で約4 mm小さくなりました。研究者は、この差を臨床的に意味のある大きさとは評価していません。",
    design: "原発性月経困難症の501人を、三陰交・懸鐘・経穴に指定されていない部位の3群に分け、電気鍼後の痛みを比較した試験です。",
    limits: "評価の中心は施術直後の痛みです。子宮内膜症など別の原因がある月経痛や、長期的な改善については、この結果から判断できません。",
    sources: [{ label: "Liu ほか · Pain Medicine（2014）", url: "https://pubmed.ncbi.nlm.nih.gov/24636695/" }],
  },
  {
    id: "migraine-manual-acupuncture",
    topic: "前兆のない反復性片頭痛の予防",
    kind: "combination",
    points: ["li4", "lr3", "gb20", "gb8"],
    otherPoints: "太陽（EX-HN5）も共通で使用し、症状に応じて追加のツボを選択。",
    guide: "headache-stiff-neck",
    result: "鍼を受けた群では、偽鍼の群に比べ、試験の17〜20週に片頭痛があった日数が4週間当たり平均2.1日多く減りました。",
    design: "前兆のない反復性片頭痛の150人が参加した無作為化試験です。通常のケアに複数のツボへの鍼を加えた群、偽鍼を加えた群、通常のケアのみの群を比較しました。",
    limits: "複数のツボを使った施術全体の結果です。個々のツボの寄与や首肩こりへの効果、指で押したときの効果は、この試験の評価範囲外です。",
    sources: [{ label: "Xu ほか · BMJ（2020）", url: "https://www.bmj.com/content/368/bmj.m697" }],
  },
  {
    id: "migraine-four-gates",
    topic: "片頭痛に対する合谷と太衝（四関穴）",
    kind: "combination",
    points: ["li4", "lr3"],
    result: "左右の合谷・太衝に電気鍼を行った群では、比較した内服薬の群より、追跡時の痛みのスコアと片頭痛の日数が少なかったと報告されました。",
    design: "片頭痛があり、伝統医学で肝陽上亢と分類された110人の試験です。左右の合谷と太衝を用いた電気鍼と、フルナリジンの内服を比較しました。",
    limits: "対象は伝統医学の分類で選ばれた人に限られます。偽鍼の群や、合谷だけ・太衝だけを使う群がないため、組み合わせで効果が増すかを評価できません。",
    sources: [{ label: "四関穴の無作為化試験 · 中国鍼灸（2022）", url: "https://pubmed.ncbi.nlm.nih.gov/35543939/" }],
  },
  {
    id: "functional-constipation",
    topic: "重度の慢性機能性便秘",
    kind: "combination",
    points: ["st25", "sp14", "st37"],
    guide: "constipation-ibs",
    result: "電気鍼の群では、偽電気鍼の群に比べ、8週間の治療中に残便感のない自発的な排便の増加が週当たり平均0.90回多くなりました。",
    design: "重度の慢性機能性便秘の1,075人を対象に、天枢・腹結・上巨虚を含む治療と偽電気鍼を比較した試験です。",
    limits: "評価したのは3穴を含む治療全体です。下痢や過敏性腸症候群への効果、天枢と足三里の2穴での効果は、この比較では評価していません。",
    sources: [
      { label: "Liu ほか · Annals of Internal Medicine（2016）", url: "https://pubmed.ncbi.nlm.nih.gov/27618593/" },
      { label: "使用した経穴の資料 · 同試験のサブグループ解析", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6348848/" },
    ],
  },
  {
    id: "postprandial-distress",
    topic: "食後愁訴症候群の食後のもたれ・早期満腹感",
    kind: "combination",
    points: ["gv20", "cv17", "cv12", "cv6", "st25", "pc6", "st36", "sp4"],
    guide: "stomach-fatigue",
    result: "4週時点に全体として改善した割合の推定値は、鍼の群で83.0%、偽鍼の群で51.6%でした。",
    design: "食後愁訴症候群の診断基準を満たした18〜65歳の278人を対象に、複数のツボへの鍼と偽鍼を比較した試験です。",
    limits: "改善割合は参加者が答えた全体的な変化に基づきます。胃炎、逆流、原因を問わない食欲低下への効果や、各ツボの寄与は評価していません。",
    sources: [
      { label: "Yang ほか · Annals of Internal Medicine（2020）", url: "https://pubmed.ncbi.nlm.nih.gov/32422066/" },
      { label: "使用した経穴の資料 · 試験登録 ISRCTN12511434", url: "https://www.isrctn.com/ISRCTN12511434" },
    ],
  },
  {
    id: "chronic-insomnia",
    topic: "不眠症に対する電気鍼",
    kind: "combination",
    points: ["gv20", "ht7", "pc6", "bl63", "ki4"],
    otherPoints: "印堂（EX-HN3）も使用。",
    guide: "stress-insomnia",
    result: "4週時点の不眠の重症度は、通常のケアのみの群より改善しました。偽電気鍼との比較では4週時点で明確な差が見られず、8週・12週時点では差が報告されました。",
    design: "診断基準を満たす不眠症の150人を、複数のツボへの電気鍼・偽電気鍼・通常のケアの3群に分けた試験です。",
    limits: "比較対象や評価時点によって結果が異なります。寝付きの悪さ全般や、不安への単独治療の効果までは評価していません。",
    sources: [{ label: "Lee ほか · Nature and Science of Sleep（2020）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7735782/" }],
  },
  {
    id: "mechanical-low-back-pain",
    topic: "慢性の機械的腰痛と日常動作",
    kind: "combination",
    points: ["gv3", "bl23", "bl40", "ki3"],
    otherPoints: "腰の阿是穴（痛みや圧痛を目印に選ぶ部位）も使用。",
    guide: "lower-back-pain-sciatica",
    result: "8週時点の日常動作のスコアは、鍼の群と模擬鍼の群のどちらも、通常のケアのみの群より改善しました。鍼と模擬鍼の間に明確な差はありませんでした。",
    design: "慢性の機械的腰痛のある成人638人を、標準化した鍼、対象に応じた鍼、模擬鍼、通常のケアに割り付けた試験です。掲載の組み合わせは標準化した鍼の群で使われました。",
    limits: "この結果からは経穴の選び方や各ツボの寄与を判断できません。坐骨神経痛と診断された人は試験の対象外です。",
    sources: [{ label: "Cherkin ほか · Archives of Internal Medicine（2009）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2832641/" }],
  },
  {
    id: "knee-osteoarthritis",
    topic: "変形性膝関節症の痛みと動きやすさ",
    kind: "combination",
    points: ["sp10", "st34", "st35", "st36", "gb34", "sp6", "gb39"],
    otherPoints: "内膝眼（EX-LE4）も使用。",
    guide: "knee-joint-pain",
    result: "6週時点では、電気鍼の群で、偽鍼の群より痛み・こわばり・身体機能を合わせた指標が改善しました。",
    design: "変形性膝関節症の480人を対象に、膝周辺と脚の複数のツボへの電気鍼を、同じ位置で皮膚を刺さない偽鍼と比較した試験です。",
    limits: "複数のツボと電気刺激を含む施術を評価した結果です。各ツボの寄与は分からず、軟骨の再生や長期の構造改善を確かめるには、別の研究が必要です。",
    sources: [{ label: "Hang ほか · eClinicalMedicine（2026）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13223986/" }],
  },
  {
    id: "seasonal-allergic-rhinitis",
    topic: "季節性アレルギー性鼻炎と生活の質",
    kind: "combination",
    points: ["li4", "li11", "li20"],
    otherPoints: "印堂（EX-HN3）も共通で使用し、所見に応じてツボを追加。",
    guide: "allergic-rhinitis-hayfever",
    result: "8週時点では、鍼の群で偽鍼の群より鼻炎に関する生活の質の指標が改善し、抗ヒスタミン薬の使用が少ないと報告されました。",
    design: "季節性アレルギー性鼻炎の422人を対象とした試験です。必要に応じた薬を使える条件で、鍼・偽鍼・薬のみを比較しました。",
    limits: "研究者は差の大きさが患者にとって意味のある程度かは不確かとしています。共通の経穴に個別の選穴を加えた治療で、各ツボの寄与を比較していません。",
    sources: [
      { label: "Brinkhaus ほか · Annals of Internal Medicine（2013）", url: "https://pubmed.ncbi.nlm.nih.gov/23420231/" },
      { label: "使用した経穴の資料 · 同試験の施術報告", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3983860/" },
    ],
  },
  {
    id: "menopausal-hot-flashes",
    topic: "更年期のほてり",
    kind: "combination",
    points: ["ki6", "ki7", "sp6", "ht6", "cv4", "lr3"],
    guide: "climacteric-hot-flash",
    result: "治療終了時に、ほてりの頻度と強さを合わせたスコアは、鍼と皮膚を刺さない偽鍼の間で明確な差がありませんでした。",
    design: "ほてりがあり、伝統医学で腎陰虚に該当した更年期後半・閉経後の327人を対象に、複数のツボへの鍼と偽鍼を比較した試験です。",
    limits: "この対象と配穴での比較です。別の配穴や、更年期の睡眠・気分などほかの症状への効果は、個別に評価する必要があります。",
    sources: [
      { label: "Ee ほか · Annals of Internal Medicine（2016）", url: "https://pubmed.ncbi.nlm.nih.gov/26784863/" },
      { label: "使用した経穴の資料 · 試験プロトコル 表2", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4066294/" },
    ],
  },
  {
    id: "chronic-fatigue",
    topic: "慢性疲労症候群・特発性慢性疲労での疲労感",
    kind: "combination",
    points: ["gv20", "gb20", "bl11", "bl13", "bl15", "bl18", "bl20", "bl23"],
    guide: "chronic-fatigue-lethargy",
    result: "5週時点では、通常のケアに体鍼を加えた群で疲労のスコアが低くなりました。主解析の13週時点では、各群の疲労のスコアに明確な差はありませんでした。",
    design: "慢性疲労症候群または特発性慢性疲労の150人で、通常のケアに体鍼を加える群、別方式の鍼を加える群、通常ケアのみの群を比較しました。掲載の経穴は体鍼の群で使われました。",
    limits: "偽鍼を置かず、受けた治療を参加者が知っていた試験です。期待の影響や各ツボの寄与は分からず、原因を問わない疲労全般には当てはめられません。",
    sources: [{ label: "Kim ほか · Trials（2015）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4515016/" }],
  },
  {
    id: "stress-urinary-incontinence",
    topic: "腹圧性尿失禁と尿漏れ量",
    kind: "combination",
    points: ["bl33", "bl35"],
    result: "6週時点の1時間パッド試験では、中髎・会陽に電気鍼を受けた群で、偽電気鍼の群より尿漏れ量の減少が平均7.4 g大きくなりました。",
    design: "咳や運動など腹圧がかかったときに尿が漏れる腹圧性尿失禁の女性504人を対象に、複数のツボへの電気鍼と偽電気鍼を比較した試験です。",
    limits: "中髎と会陽に電気刺激を加えた施術全体の結果です。各ツボ単独の効果や、尿意切迫を伴う別のタイプの尿失禁への効果は評価していません。",
    sources: [{ label: "Liu ほか · JAMA（2017）", url: "https://jamanetwork.com/journals/jama/fullarticle/2633916" }],
  },
];

const revisedStudies = [...CLINICAL_STUDY_ADDITIONS, ...SUPPLEMENTAL_ATLAS_STUDIES];
export const ATLAS_STUDIES: readonly AtlasStudy[] = [...existingStudies, ...revisedStudies];
export const ATLAS_EVIDENCE_REVISED_AT = "2026-11-20";

const revisedPointCodes = new Set(revisedStudies.flatMap(study => [
  ...study.points,
  ...(study.comparisonPoints ?? []),
  ...(study.additionalPointGroups ?? []).flatMap(group => group.points),
]));
export const REVISED_ATLAS_RESEARCH_ROUTES = [
  ...Array.from(revisedPointCodes, code => `/tsubo/${code}`),
  ...new Set(revisedStudies.flatMap(study => study.guide ? [`/symptoms/${study.guide}`] : [])),
];

interface ClassicalCombination {
  points: readonly string[];
  explanation: string;
  source: StudySource;
}

const volumeFive = "https://ctext.org/wiki.pl?chapter=723936&if=en";
const eightVessels = { label: "『針灸大成』巻五「八法交会八脈」「八穴配合歌」", url: volumeFive };
const jadeDragon = { label: "『針灸大成』巻二「玉龍賦」", url: "https://ctext.org/wiki.pl?chapter=287842&if=en" };
const classicalCombinations: readonly ClassicalCombination[] = [
  { points: ["sp4", "pc6"], source: eightVessels, explanation: "足の公孫を衝脈、腕の内関を陰維脈に通じる穴とし、心・胸・胃の領域を一緒に考える配穴です。" },
  { points: ["si3", "bl62"], source: eightVessels, explanation: "手の後渓を督脈、足の申脈を陽蹺脈に通じる穴とし、首すじや肩などの領域と関連づけています。" },
  { points: ["te5", "gb41"], source: eightVessels, explanation: "腕の外関と足臨泣を、それぞれ陽維脈と帯脈に通じる穴として組み合わせ、耳の後ろや首・肩などと関連づけています。" },
  { points: ["lu7", "ki6"], source: eightVessels, explanation: "腕の列欠を任脈、足の照海を陰蹺脈に通じる穴とし、のどや胸の領域を一緒に考える配穴です。" },
  { points: ["ki6", "te6"], source: jadeDragon, explanation: "足首付近の照海と前腕の支溝を、便通の滞りに関連づけた記述です。手足の離れた部位を組み合わせる古典の例です。" },
  { points: ["gb29", "gb30", "bl40"], source: jadeDragon, explanation: "股関節周辺の居髎・環跳と、ひざ裏の委中を、脚の痛みに関連づけた記述です。同じ下肢の離れた場所を組み合わせています。" },
  { points: ["sp9", "gb34"], source: jadeDragon, explanation: "ひざ下の内側にある陰陵泉と、外側にある陽陵泉を、ひざの腫れに関連づけた記述です。ひざを内外からみる伝統的な配穴です。" },
  { points: ["bl2", "st8"], source: jadeDragon, explanation: "眉頭の攅竹と、額の外側の生え際にある頭維を、目の痛みや頭痛に関連づけた記述です。額と目の近くを組み合わせています。" },
  { points: ["li4", "li3"], source: { label: "『針灸大成』巻三「雑病十一穴歌」", url: "https://ctext.org/wiki.pl?chapter=198016&if=en" }, explanation: "手の甲の合谷と人差し指の付け根の三間を、頭痛や歯の痛みに関連づけた記述です。どちらも手の陽明大腸経に属します。" },
  { points: ["lr3", "gb37"], source: { label: "『針灸大成』巻五「十二經治症主客原絡」", url: volumeFive }, explanation: "肝経の原穴である太衝と、表裏関係にある胆経の絡穴・光明を組み合わせます。経絡の分類を手がかりに選ぶ原絡配穴の例です。" },
];

export function getStudyPointRole(study: AtlasStudy, code: string) {
  if (study.points.includes(code)) return "main";
  if (study.comparisonPoints?.includes(code)) return "comparison";
  const group = study.additionalPointGroups?.find(item => item.points.includes(code));
  if (group) return group.comparison ? "comparison" : "additional";
}

export function getAcupointStudies(code: string) {
  return ATLAS_STUDIES.filter(study => getStudyPointRole(study, code));
}

export function getSymptomStudies(slug: string) {
  return ATLAS_STUDIES.filter(study => study.guide === slug);
}

export function getClassicalCombinations(code: string) {
  return classicalCombinations.filter(combination => combination.points.includes(code));
}
