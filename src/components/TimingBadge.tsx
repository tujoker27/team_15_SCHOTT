import { cn } from "@/lib/utils";
import type { Timing } from "@/data/types";

const LABEL: Record<Timing, string> = {
  NOW: "NOW",
  SOON: "SOON",
  EARLY_WATCH: "EARLY WATCH",
};

const STYLE: Record<Timing, string> = {
  NOW: "badge-now",
  SOON: "badge-soon",
  EARLY_WATCH: "badge-watch",
};

export function TimingBadge({
  timing,
  size = "md",
  className,
}: {
  timing: Timing;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-[0.14em] font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]",
        STYLE[timing],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {LABEL[timing]}
    </span>
  );
}
