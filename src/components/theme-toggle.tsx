"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "light" | "dark" | "system";

const options: { mode: Mode; label: string; Icon: typeof SunIcon }[] = [
  { mode: "light", label: "Light theme", Icon: SunIcon },
  { mode: "dark", label: "Dark theme", Icon: MoonIcon },
  { mode: "system", label: "System theme", Icon: MonitorIcon },
];

/**
 * Dark / Light / System theme selector. Compact segmented control;
 * keyboard operable, visible focus, pressed state via aria-pressed.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center gap-0.5 border border-border bg-card/60 p-0.5",
        className,
      )}
    >
      {options.map(({ mode, label, Icon }) => {
        const active = theme === mode || (mode === "system" && !theme);
        return (
          <button
            key={mode}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            onClick={() => setTheme(mode)}
            className={cn(
              "flex size-9 items-center justify-center transition",
              active
                ? "bg-brand/15 text-brand-bright"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
