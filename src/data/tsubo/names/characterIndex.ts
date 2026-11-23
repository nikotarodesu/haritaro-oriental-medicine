import { ACUPOINTS_MASTER } from "../acupointsMaster";
import type { AcupointMaster } from "../types";
import { CHARACTER_MEANINGS } from "./characterMeanings";
import { STANDARD_NAMES } from "./standardNames";

export const ACUPOINT_NAME_INDEX_PATH = "/tsubo/names";
export const NAME_INDEX_EXAMPLES = ["谷", "泉", "髎", "門", "関", "海", "池", "渓", "丘", "堂", "会", "俞"] as const;

type CharacterGroup = {
  standard: string;
  forms: Set<string>;
  points: AcupointMaster[];
};

const groups = new Map<string, CharacterGroup>();
const aliases = new Map<string, string>();

for (const point of ACUPOINTS_MASTER) {
  const [standardName] = STANDARD_NAMES[point.codeLower];
  const standard = [...standardName];
  const japanese = [...point.name];
  // 耳和髎は、日本語名の和髎の前に「耳」が付く。
  const offset = standardName.endsWith(point.name) ? standard.length - japanese.length : 0;
  const aligned = standard.length === japanese.length + offset;

  for (const character of new Set(standard)) {
    let group = groups.get(character);
    if (!group) {
      group = { standard: character, forms: new Set([character]), points: [] };
      groups.set(character, group);
    }
    group.points.push(point);
  }

  if (aligned) {
    for (const [index, form] of japanese.entries()) {
      const character = standard[index + offset];
      groups.get(character)?.forms.add(form);
      if (form !== character) aliases.set(form, character);
    }
  }
}

export function getAcupointNameCharacter(input: string) {
  const character = input.trim().normalize("NFKC");
  const standard = aliases.get(character) ?? character;
  const group = groups.get(standard);
  if (!group) return undefined;
  return {
    character,
    meaning: CHARACTER_MEANINGS[standard],
    forms: [...group.forms],
    points: group.points,
  };
}

export function acupointNameIndexHref(character: string) {
  return `${ACUPOINT_NAME_INDEX_PATH}?kanji=${encodeURIComponent(character)}`;
}
