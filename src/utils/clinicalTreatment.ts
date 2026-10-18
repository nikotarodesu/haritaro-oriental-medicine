/** Add a catalogue term while keeping every byte of the clinician's existing wording. */
export function appendClinicalPrinciple(current: string, term: string): string {
  const addition = term.trim();
  if (!addition || current.split(/\r?\n/).some(line => line.trim() === addition) || current.split(/[・、,，;；\n]/).some(part => part.trim() === addition)) return current;
  const next = current ? `${current}\n${addition}` : addition;
  return next.length <= 20000 ? next : current;
}
