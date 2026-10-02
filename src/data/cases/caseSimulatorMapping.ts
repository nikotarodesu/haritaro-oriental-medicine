import { DepthType, TemperatureType, StateType, QixueshuiType, ZangfuType, ComplexStateType } from "@/data/simulatorData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";

export interface CaseSimulatorPreset {
  caseId: string;
  caseNumber: number;
  caseTitle: string;
  pattern: string;
  depth: DepthType;
  temp: TemperatureType;
  state: StateType;
  qixueshui: QixueshuiType;
  zangfu: ZangfuType;
  complexState?: ComplexStateType;
  explanation: string;
}

// 現行の架空症例にひもづく学習用仮説。寒熱が未確認の症例には初期値を付けない。
const PATTERN_AXES: Record<number, { qixueshui: QixueshuiType; zangfu: ZangfuType }> = {
  1: { qixueshui: "qizhi", zangfu: "liver" },
  3: { qixueshui: "yuxue", zangfu: "liver" },
  4: { qixueshui: "yinxu", zangfu: "kidney" },
  5: { qixueshui: "yinxu", zangfu: "heart" },
  6: { qixueshui: "qini", zangfu: "liver" },
  8: { qixueshui: "shuitai", zangfu: "kidney" },
  12: { qixueshui: "xuexu", zangfu: "spleen" },
  13: { qixueshui: "qizhi", zangfu: "liver" },
  15: { qixueshui: "qini", zangfu: "liver" },
  16: { qixueshui: "xuexu", zangfu: "lung" },
  18: { qixueshui: "xuexu", zangfu: "liver" },
  19: { qixueshui: "yinxu", zangfu: "lung" },
};

export const CASE_SIMULATOR_PRESETS: Record<string, CaseSimulatorPreset> = Object.fromEntries(
  CLINICAL_CASES.filter(clinicalCase => PATTERN_AXES[clinicalCase.caseNumber]).map(clinicalCase => {
    const hachiko = clinicalCase.correctDiagnosis.hachiko;
    const preset: CaseSimulatorPreset = {
      caseId: clinicalCase.id,
      caseNumber: clinicalCase.caseNumber,
      caseTitle: clinicalCase.title,
      pattern: clinicalCase.correctDiagnosis.pattern,
      depth: "interior",
      temp: hachiko.includes("熱") ? "heat" : "cold",
      state: hachiko.includes("虚実挟雑") || hachiko.includes("本虚標実") || hachiko.includes("虚") ? "deficiency" : "excess",
      ...(hachiko.includes("虚実挟雑") || hachiko.includes("本虚標実") ? { complexState: "benxu_biaoshi" as const } : {}),
      ...PATTERN_AXES[clinicalCase.caseNumber],
      explanation: clinicalCase.clinicalExplanation.pathomechanism + " シミュレーターの値はこの架空症例の候補を比較する学習用仮説です。現代医学の診断や施術適応を確定するものではなく、危険兆候の確認と医療評価を先に行います。",
    };
    return [clinicalCase.id, preset];
  }),
);

export function getCaseSimulatorPreset(caseId: string): CaseSimulatorPreset | undefined {
  return CASE_SIMULATOR_PRESETS[caseId];
}

export function buildSimulatorUrlFromCase(preset: CaseSimulatorPreset): string {
  const params = new URLSearchParams();
  params.set("depth", preset.depth);
  params.set("temp", preset.temp);
  params.set("state", preset.state);
  params.set("qixueshui", preset.qixueshui);
  params.set("zangfu", preset.zangfu);
  if (preset.complexState && preset.complexState !== "none") params.set("complexState", preset.complexState);
  params.set("fromCase", String(preset.caseNumber));
  params.set("caseTitle", preset.pattern);
  return "/simulator?" + params.toString() + "#simulator-conditions";
}
