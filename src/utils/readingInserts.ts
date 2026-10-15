import type { MarkdownBlock } from "@/utils/markdownParser";
import type { ReadingFigure, ReadingInsert } from "@/types/reading";

/** Place reviewed figures without changing any source blocks or heading anchors. */
export function resolveReadingInsertions(blocks: readonly MarkdownBlock[], inserts: readonly ReadingInsert[]) {
  const placements = new Map<number, ReadingFigure[]>();
  let heading = "";
  let paragraph = 0;
  const placedIds = new Set<string>();

  blocks.forEach((block, index) => {
    if (block.type === "h1" || block.type === "h2") {
      heading = block.type === "h2" ? block.content : "";
      paragraph = 0;
      return;
    }
    if (block.type !== "paragraph") return;
    paragraph += 1;
    const matched = inserts.filter((insert) => insert.afterHeading === heading && insert.afterParagraph === paragraph && !placedIds.has(insert.figure.id));
    if (matched.length === 0) return;
    placements.set(index, matched.map((insert) => insert.figure));
    matched.forEach((insert) => placedIds.add(insert.figure.id));
  });

  return placements;
}

/** Use one visual explanation per section; an instructional diagram takes priority. */
export function resolveConceptArtPlacement(
  blocks: readonly MarkdownBlock[],
  afterHeading: string,
  figurePlacements: ReadonlyMap<number, readonly ReadingFigure[]>,
): number {
  const headingIndex = blocks.findIndex((block) => block.type === "h2" && block.content === afterHeading);
  if (headingIndex < 0) return -1;
  let firstParagraph = headingIndex;
  for (let index = headingIndex + 1; index < blocks.length; index++) {
    const block = blocks[index];
    if (block.type === "h1" || block.type === "h2") break;
    if (figurePlacements.has(index) || ["diagram", "eastwest", "image"].includes(block.type)) return -1;
    if (block.type === "paragraph" && firstParagraph === headingIndex) firstParagraph = index;
  }
  return firstParagraph;
}
