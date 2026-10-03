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
