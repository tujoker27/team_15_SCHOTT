import { SidebarTrigger } from "@/components/ui/sidebar";

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
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-rule bg-background/85 px-6 py-3 backdrop-blur">
      <SidebarTrigger className="text-ink-soft hover:text-ink" />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          {subtitle ?? "Strategic Intelligence"}
        </div>
        <h1 className="truncate text-base font-semibold text-ink">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {right}
        <div className="hidden items-center gap-2 rounded-md border border-rule bg-surface px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Updated 2026-05-28 · 06:21 UTC
        </div>
      </div>
    </header>
  );
}
