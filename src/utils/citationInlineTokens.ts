export type CitationInlineToken =
  | { type: "text"; value: string }
  | { type: "citation"; id: string }
  | { type: "link"; label: string; href: string; external: boolean };

function allowedHref(href: string): boolean {
  if (/[\s\\]/u.test(href) || [...href].some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)) return false;
  if (href.startsWith("#")) return true;
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function tokenizeCitationInline(text: string): CitationInlineToken[] {
  // Consume explicit Markdown links before detecting citations.
  // One level of URL parentheses is supported; other syntax remains text.
  const pattern = /!?\[[^\]\r\n]+\]\((?:[^()\r\n]|\([^()\r\n]*\))*\)|\[\^([a-zA-Z0-9_-]+)\]|\[ref:([a-zA-Z0-9_-]+)\]/g;
  const tokens: CitationInlineToken[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index;
    if (index > lastIndex) tokens.push({ type: "text", value: text.slice(lastIndex, index) });
    const raw = match[0];
    if (match[1] || match[2]) {
      tokens.push({ type: "citation", id: match[1] || match[2] });
    } else {
      const link = /^\[([^\]]+)\]\((.*)\)$/.exec(raw);
      if (link && text[index - 1] !== "\\" && allowedHref(link[2])) {
        tokens.push({ type: "link", label: link[1], href: link[2], external: /^https?:\/\//i.test(link[2]) });
      } else {
        tokens.push({ type: "text", value: raw });
      }
    }
    lastIndex = index + raw.length;
  }
  if (lastIndex < text.length) tokens.push({ type: "text", value: text.slice(lastIndex) });
  return tokens;
}
