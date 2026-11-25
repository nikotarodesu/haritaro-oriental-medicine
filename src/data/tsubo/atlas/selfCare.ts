import type { StudySource } from "./types";

type AtlasSelfCareMethod = {
  kind: "pressure" | "warmth";
  title: string;
  context: string;
  timing: readonly string[];
  instructions: string;
  source: StudySource;
};

const circlePressure = {
  kind: "pressure",
  title: "指で押す",
  timing: ["片側2〜3分", "1日数回"],
  instructions: "反対の手の親指の腹を当て、痛くない強さで、小さく円を描くように押します。反対側も同じように行います。",
} as const;

const stomachPressure = {
  kind: "pressure",
  title: "指で押す",
  context: "胃もたれが気になるとき",
  timing: ["5秒押して5秒休む", "3〜5回"],
  instructions: "いすに座って脚の力を抜き、図の丸印に指の腹を当てます。痛くない強さでゆっくり押し、指を離して休みます。",
  source: {
    label: "明治東洋医学院専門学校 附属治療所「胃もたれ」",
    url: "https://www.meiji-s.ac.jp/fuzoku/2024/02/01/%E2%89%AA%EF%BC%92%E6%9C%88%E2%89%AB%E8%83%83%E3%82%82%E3%81%9F%E3%82%8C/",
  },
} satisfies AtlasSelfCareMethod;

export const ATLAS_SELF_CARE: Readonly<Partial<Record<string, readonly AtlasSelfCareMethod[]>>> = {
  li4: [
    {
      ...circlePressure,
      context: "頭痛などに使われる指圧の例",
      source: {
        label: "MSKがんセンター「痛みと頭痛の指圧」",
        url: "https://www.mskcc.org/cancer-care/patient-education/acupressure-pain-and-headaches",
      },
    },
    {
      kind: "warmth",
      title: "手全体を温める",
      context: "手のこわばりが気になるとき",
      timing: ["1回15分まで", "1日2回程度"],
      instructions: "洗面器にぬるま湯を張り、手全体を浸します。熱く感じるお湯は使いません。",
      source: {
        label: "Royal Devon NHS「手の痛みとこわばりの温冷ケア」（PDF）",
        url: "https://www.royaldevon.nhs.uk/media/thknvieo/heat-and-cold-for-management-of-hand-pain-or-stiffness-rd-21-084-002.pdf#page=2",
      },
    },
  ],
  pc6: [
    {
      ...circlePressure,
      context: "吐き気が気になるときの指圧の例",
      source: {
        label: "MSKがんセンター「吐き気・嘔吐の指圧」",
        url: "https://www.mskcc.org/cancer-care/patient-education/acupressure-nausea-and-vomiting",
      },
    },
  ],
  st36: [stomachPressure],
  st40: [stomachPressure],
};
