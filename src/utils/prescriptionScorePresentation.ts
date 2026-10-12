/** Describe only the existing hole-count deduction, without making a clinical judgment. */
export function getPrescriptionCountLabel(count: number): string {
  if (count === 0) return '未選択';
  if (count <= 4) return '穴数による減点なし';
  const deduction = count === 5 ? 15 : (count - 5) * 15;
  return `穴数による減点：${deduction}点`;
}
