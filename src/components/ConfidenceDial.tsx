import { cn } from "@/lib/utils";

export function ConfidenceDial({
  value,
  size = "md",
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  const radius = size === "lg" ? 32 : size === "md" ? 22 : 16;
  const stroke = size === "lg" ? 5 : size === "md" ? 3.5 : 3;
  const dim = (radius + stroke) * 2;
  const c = 2 * Math.PI * radius;
  const offset = c * (1 - value / 100);
  const color =
    value >= 80
      ? "stroke-accent"
      : value >= 65
        ? "stroke-[color:var(--signal-soon)]"
        : "stroke-[color:var(--signal-watch)]";

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: dim, height: dim }}
    >
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          className="stroke-rule"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          className={cn(color, "transition-[stroke-dashoffset]")}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        className={cn(
          "absolute inset-0 grid place-items-center font-mono font-semibold tabular-nums",
          size === "lg" ? "text-base" : size === "md" ? "text-[11px]" : "text-[10px]",
        )}
      >
        {value}
      </div>
    </div>
  );
}
