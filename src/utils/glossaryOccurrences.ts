import { GLOSSARY_TERMS } from "@/data/glossaryData";
import { tokenizeCitationInline } from "@/utils/citationInlineTokens";

const keys = Object.keys(GLOSSARY_TERMS).sort((a, b) => b.length - a.length);
const pattern = keys.length ? new RegExp(`(${keys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g") : null;

/** Match the same longest-first terms as the inline renderer. */
export function splitGlossaryText(text: string): string[] {
  return pattern ? text.split(pattern) : [text];
}

export function getGlossaryTermsInText(text: string): string[] {
  // Formatting boundaries remain boundaries for term recognition.
  return text.split(/\*\*(.*?)\*\*/g).flatMap((part) =>
    splitGlossaryText(part.replace(/\*\*/g, "")).flatMap((segment) =>
      GLOSSARY_TERMS[segment] ? [GLOSSARY_TERMS[segment].term] : []
    )
  );
}

export function getInlineGlossaryTerms(text: string): string[] {
  // Link labels and citation identifiers have their own controls; they do not
  // consume the first eligible glossary occurrence in ordinary text.
  const tokens = tokenizeCitationInline(text);
  if (tokens.every((token) => token.type === "text")) return getGlossaryTermsInText(text);
  return tokens.flatMap((token) => token.type === "text"
    ? token.value.split(/(\*\*)/g).flatMap((part) => part === "**" ? [] : getGlossaryTermsInText(part))
    : []
  );
}

/** Build independent seen-before snapshots without changing caller-owned state. */
export function createGlossarySeenSnapshots(
  texts: readonly string[],
  initialSeenTerms?: ReadonlySet<string>,
  collectTerms: (text: string) => readonly string[] = getGlossaryTermsInText,
): ReadonlySet<string>[] {
  const seen = new Set(initialSeenTerms);
  return texts.map((text) => {
    const before = new Set(seen);
    for (const term of collectTerms(text)) seen.add(term);
    return before;
  });
}
