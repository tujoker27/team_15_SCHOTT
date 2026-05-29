import { Link } from "@tanstack/react-router";
import { Bell, Moon, Sun } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SchottLogo } from "@/components/SchottLogo";
import { feedSignals } from "@/data/signals";
import { useTheme } from "@/lib/theme";

const UPDATED = "2026-05-28 · 06:21 UTC";
const UNREAD = 4;

export function GlobalHeader() {
  const liveSignals = feedSignals.length;
  const { theme, toggle } = useTheme();

  // Header sits on the navy nav in BOTH themes — use white/translucent classes directly
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[#1E3158] bg-nav px-4 md:px-6 text-white">
      <SidebarTrigger className="text-white/70 hover:text-white" />

      <Link to="/" className="flex items-center gap-3 min-w-0">
        <SchottLogo className="text-white" />
        <span className="h-5 w-px bg-white/20" />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[14px] font-semibold text-white">Prometheus</span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-white/55 sm:block">
            Business Development Intelligence
          </span>
        </div>
      </Link>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] opacity-80" />
          Updated {UPDATED}
        </div>

        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-white">{liveSignals}</span> live signals
        </div>

        <button
          onClick={toggle}
          className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          className="relative grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {UNREAD > 0 && (
            <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#22C55E] px-1 font-mono text-[9px] font-bold text-[#0A1628]">
              {UNREAD}
            </span>
          )}
        </button>

        <div
          className="grid h-9 w-9 place-items-center rounded-full bg-[#3B5BDB] font-mono text-[11px] font-semibold text-white ring-2 ring-white/10"
          aria-label="User"
          title="Strategy Analyst"
        >
          SA
        </div>
      </div>
    </header>
  );
}
