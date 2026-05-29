export function TopBar({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rule bg-background px-6 pb-5 pt-7">
      <div className="min-w-0">
        {subtitle && (
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {subtitle}
          </div>
        )}
        <h1 className="mt-1 truncate text-2xl font-semibold text-ink">
          {title}
        </h1>
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}
