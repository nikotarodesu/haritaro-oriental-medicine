"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "yin" ? "ライトモードに切り替える" : "ダークモードに切り替える";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-2.5 text-sm font-semibold hover:bg-panel-selected focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Moon aria-hidden="true" className="h-[18px] w-[18px] dark:hidden" />
      <Sun aria-hidden="true" className="hidden h-[18px] w-[18px] dark:block" />
      {!compact && <span aria-hidden="true"><span className="dark:hidden">ダーク</span><span className="hidden dark:inline">ライト</span></span>}
    </button>
  );
}
