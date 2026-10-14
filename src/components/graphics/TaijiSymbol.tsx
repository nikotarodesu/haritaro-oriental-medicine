/** Shared vector mark. Its parent SVG provides decorative or descriptive semantics. */
export default function TaijiSymbol({ surface = "var(--bg-washi)" }: { surface?: string }) {
  return (
    <g>
      <circle cx="50" cy="50" r="50" fill={surface} stroke="currentColor" strokeWidth=".6" />
      <path d="M50 0A50 50 0 0 0 50 100A25 25 0 0 0 50 50A25 25 0 0 1 50 0Z" fill="currentColor" />
      <circle cx="50" cy="25" r="6.5" fill="currentColor" />
      <circle cx="50" cy="75" r="6.5" fill={surface} />
    </g>
  );
}
