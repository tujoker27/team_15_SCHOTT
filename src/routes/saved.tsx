import { createFileRoute } from "@tanstack/react-router";

import { TopBar } from "@/components/TopBar";
import { OpportunityCard } from "@/components/OpportunityCard";
import { opportunities } from "@/data/opportunities";
import { useWatchlist } from "@/lib/watchlist";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Opportunities — SCHOTT OI" },
      { name: "description", content: "Your watchlist of monitored MedTech opportunities." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const wl = useWatchlist();
  const saved = opportunities.filter((o) => wl.isSaved(o.id));

  return (
    <>
      <TopBar title="Saved Opportunities" subtitle="Your watchlist · stored locally" />
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        {!wl.ready ? null : saved.length === 0 ? (
          <div className="rounded-xl border border-dashed border-rule bg-surface p-12 text-center">
            <p className="text-sm text-ink-soft">
              No saved opportunities yet. Open any opportunity and choose a watchlist status
              (Interesting, Monitor, High Priority, Not Relevant).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {saved.map((o) => (
              <div key={o.id} className="relative">
                <span className="absolute -top-2 right-4 z-10 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-foreground">
                  {wl.statusOf(o.id)}
                </span>
                <OpportunityCard opp={o} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
