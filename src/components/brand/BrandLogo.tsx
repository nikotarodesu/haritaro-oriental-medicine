import { BRAND_ARC_PATH, BRAND_NEEDLE_PATH, BRAND_WORDMARK } from "@/config/brand";

interface BrandLogoProps {
  className?: string;
  symbolClassName?: string;
  wordmarkClassName?: string;
  inverse?: boolean;
}

export default function BrandLogo({ className = "", symbolClassName = "", wordmarkClassName = "", inverse = false }: BrandLogoProps) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-2.5 ${inverse ? "text-white" : "text-[var(--brand-ink)] dark:text-[var(--brand-paper)]"} ${className}`}>
      <svg viewBox="0 0 100 104" width="40" height="42" className={`h-10 w-10 shrink-0 ${symbolClassName}`} fill="currentColor" aria-hidden="true" focusable="false">
        <path d={BRAND_ARC_PATH} />
        <rect x="47" y="28" width="7" height="18" rx="2.5" />
        <path d={BRAND_NEEDLE_PATH} />
      </svg>
      <span className={`whitespace-nowrap font-sans text-[24px] leading-none font-semibold tracking-[-.025em] ${wordmarkClassName}`}>{BRAND_WORDMARK}</span>
    </span>
  );
}
