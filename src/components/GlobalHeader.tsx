import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { feedSignals } from "@/data/signals";

const UPDATED = "2026-05-28 · 06:21 UTC";
const UNREAD = 4;

export function GlobalHeader() {
  const liveSignals = feedSignals.length;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-rule bg-nav px-4 md:px-6">
      <SidebarTrigger className="text-ink-soft hover:text-ink" />

      <Link to="/" className="flex items-center gap-3 min-w-0">
        <span className="font-sans text-[15px] font-bold tracking-[0.18em] text-white">
          SCHOTT
        </span>
        <span className="h-5 w-px bg-rule" />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[14px] font-semibold text-white">Prometheus</span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft sm:block">
            Business Development Intelligence
          </span>
        </div>
      </Link>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="hidden items-center gap-2 rounded-md border border-rule bg-surface-2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal-now)] opacity-80" />
          Updated {UPDATED}
        </div>

        <div className="flex items-center gap-2 rounded-md border border-rule bg-surface-2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--signal-now)] opacity-60 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--signal-now)]" />
          </span>
          <span className="text-ink">{liveSignals}</span> live signals
        </div>

        <button
          className="relative grid h-9 w-9 place-items-center rounded-md border border-rule bg-surface-2 text-ink-soft hover:text-ink hover:border-accent/60"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {UNREAD > 0 && (
            <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-[color:var(--signal-now)] px-1 font-mono text-[9px] font-bold text-[#0A1628]">
              {UNREAD}
            </span>
          )}
        </button>

        <div
          className="grid h-9 w-9 place-items-center rounded-full bg-primary font-mono text-[11px] font-semibold text-primary-foreground ring-2 ring-rule"
          aria-label="User"
          title="Strategy Analyst"
        >
          SA
        </div>
      </div>
    </header>
  );
}
