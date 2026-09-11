export type MarkdownBlock =
  | { type: "h1"; content: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "h4"; content: string }
  | { type: "hr" }
  | { type: "blockquote"; content: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "paragraph"; content: string }
  | { type: "diagram"; diagramId: string }
  | { type: "eastwest"; termId: string }
  | { type: "image"; src: string; alt: string };

function isListLine(line: string): boolean {
  const t = line.trim();
  return /^[-*]\s+/.test(t) || /^・\s*/.test(t) || /^\d+\.\s+/.test(t);
}

function getListType(line: string): "ordered" | "unordered" | null {
  const t = line.trim();
  if (/^\d+\.\s+/.test(t)) return "ordered";
  if (/^[-*]\s+/.test(t) || /^・\s*/.test(t)) return "unordered";
  return null;
}

function stripListMarker(line: string): string {
  return line.trim().replace(/^(?:[-*]\s+|・\s*|\d+\.\s+)/, "");
}

/**
 * Parses markdown text into structured blocks line-by-line.
 * Guarantees that:
 * 1. Headings (#, ##, ###, ####) consume exactly one line and never swallow subsequent text or lists.
 * 2. Bullet points starting with ・ or - or * or numbers are grouped into vertical lists.
 * 3. Tables, blockquotes, horizontal rules, and custom tags (:::diagram, :::eastwest, ![alt](src))
 *    are properly extracted.
 */
export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  if (!markdown) return [];

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Diagram custom tag
    if (trimmed.startsWith(":::diagram ") || trimmed.startsWith("[DIAGRAM:")) {
      const diagramId = trimmed
        .replace(":::diagram ", "")
        .replace("[DIAGRAM:", "")
        .replace("]", "")
        .trim();
      blocks.push({ type: "diagram", diagramId });
      i++;
      continue;
    }

    // 2. East-West term switcher tag
    if (trimmed.startsWith(":::eastwest") || trimmed.startsWith(":::east-west")) {
      const termMatch = trimmed.match(/term=["']([^"']+)["']/);
      const termIdMatch = trimmed.match(/termId=["']([^"']+)["']/);
      const term = termMatch ? termMatch[1] : (termIdMatch ? termIdMatch[1] : "肝気犯胃");
      blocks.push({ type: "eastwest", termId: term });
      i++;
      continue;
    }

    // 3. Image
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      blocks.push({ type: "image", alt: imgMatch[1], src: imgMatch[2] });
      i++;
      continue;
    }

    // 4. Horizontal rule
    if (trimmed === "---" || trimmed === "----") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // 5. Headings (strictly 1 line!)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3 | 4;
      const content = headingMatch[2].trim();
      const type = `h${level}` as "h1" | "h2" | "h3" | "h4";
      blocks.push({ type, content });
      i++;
      continue;
    }

    // 6. Blockquote
    if (trimmed.startsWith(">")) {
      const qLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        qLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", content: qLines.join("\n") });
      continue;
    }

    // 7. Table
    if (
      trimmed.includes("|") &&
      i + 1 < lines.length &&
      lines[i + 1].includes("|") &&
      lines[i + 1].includes("---")
    ) {
      const tLines: string[] = [];
      while (i < lines.length && lines[i].trim().includes("|")) {
        tLines.push(lines[i].trim());
        i++;
      }
      if (tLines.length >= 2) {
        const headers = tLines[0]
          .split("|")
          .map((s) => s.trim())
          .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1);
        const rows = tLines.slice(2).map((rowLine) =>
          rowLine
            .split("|")
            .map((s) => s.trim())
            .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1)
        );
        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    // 8. List
    const listType = getListType(trimmed);
    if (listType) {
      const items: string[] = [];
      const isOrdered = listType === "ordered";

      while (i < lines.length) {
        const curLine = lines[i];
        const curTrim = curLine.trim();

        if (!curTrim) break;

        const curType = getListType(curTrim);
        if (curType === listType) {
          items.push(stripListMarker(curTrim));
          i++;
        } else if (items.length > 0 && (/^\s{2,}/.test(curLine) || /^\t/.test(curLine))) {
          // Indented continuation line belonging to previous item
          items[items.length - 1] += "\n" + curTrim;
          i++;
        } else {
          break;
        }
      }

      if (items.length > 0) {
        blocks.push({ type: "list", ordered: isOrdered, items });
      }
      continue;
    }

    // 9. Paragraph
    const pLines: string[] = [];
    while (i < lines.length) {
      const curLine = lines[i];
      const curTrim = curLine.trim();

      if (!curTrim) break;

      // Stop paragraph when a new block begins
      if (
        /^#{1,4}\s+/.test(curTrim) ||
        curTrim === "---" ||
        curTrim === "----" ||
        curTrim.startsWith(":::") ||
        curTrim.startsWith("[DIAGRAM:") ||
        /^!\[.*?\]\(.*?\)$/.test(curTrim) ||
        curTrim.startsWith(">") ||
        (curTrim.includes("|") &&
          i + 1 < lines.length &&
          lines[i + 1].includes("|") &&
          lines[i + 1].includes("---")) ||
        isListLine(curTrim)
      ) {
        break;
      }

      pLines.push(curTrim);
      i++;
    }

    if (pLines.length > 0) {
      blocks.push({ type: "paragraph", content: pLines.join("\n") });
    }
  }

  return blocks;
}
