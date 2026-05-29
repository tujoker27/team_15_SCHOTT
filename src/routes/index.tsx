import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { TopBar } from "@/components/TopBar";
import { OpportunityCard } from "@/components/OpportunityCard";
import { opportunities } from "@/data/opportunities";
import type { Timing, Competency } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Opportunities — SCHOTT Opportunity Intelligence" },
      { name: "description", content: "Ranked MedTech opportunities matched to SCHOTT competencies, with timing, confidence, and traceable sources." },
    ],
  }),
  component: OpportunitiesPage,
});

const TIMING_FILTERS: { id: "ALL" | Timing; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "NOW", label: "Now" },
  { id: "SOON", label: "Soon" },
  { id: "EARLY_WATCH", label: "Early Watch" },
];

const COMPETENCIES: Competency[] = [
  "Pharmaceutical Glass",
  "Specialty Glass & Glass-Ceramics",
  "Glass-to-Metal Seals",
  "Fiber Optics & Light Guides",
  "Display & Cover Glass",
  "Manufacturing & Regulatory",
];

function OpportunitiesPage() {
  const [timing, setTiming] = useState<"ALL" | Timing>("ALL");
  const [comp, setComp] = useState<"ALL" | Competency>("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return opportunities
      .filter((o) => (timing === "ALL" ? true : o.timing === timing))
      .filter((o) => (comp === "ALL" ? true : o.competencies.includes(comp)))
      .filter((o) =>
        query.trim() === ""
          ? true
          : (o.title + " " + o.summary + " " + o.segment).toLowerCase().includes(query.toLowerCase()),
      )
      .sort((a, b) => {
        const order = { NOW: 0, SOON: 1, EARLY_WATCH: 2 } as const;
        if (order[a.timing] !== order[b.timing]) return order[a.timing] - order[b.timing];
        return b.confidence - a.confidence;
      });
  }, [timing, comp, query]);

  const counts = useMemo(() => ({
    NOW: opportunities.filter((o) => o.timing === "NOW").length,
    SOON: opportunities.filter((o) => o.timing === "SOON").length,
    EARLY_WATCH: opportunities.filter((o) => o.timing === "EARLY_WATCH").length,
  }), []);

  return (
    <>
      <TopBar title="Opportunities" subtitle="Ranked MedTech bets · matched to SCHOTT competencies" />
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="NOW" hint="Act now · 1–4 yr demand" value={counts.NOW} accent="now" />
          <StatCard label="SOON" hint="Monitor · 3–6 yr horizon" value={counts.SOON} accent="soon" />
          <StatCard label="EARLY WATCH" hint="Track only · 5–10 yr" value={counts.EARLY_WATCH} accent="watch" />
        </div>

        <div className="mt-8 flex flex-col gap-3 border-b border-rule pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {TIMING_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setTiming(f.id)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  timing === f.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-rule bg-surface text-ink-soft hover:border-ink-soft",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={comp}
              onChange={(e) => setComp(e.target.value as "ALL" | Competency)}
              className="rounded-md border border-rule bg-surface px-3 py-1.5 text-xs text-ink"
            >
              <option value="ALL">All competencies</option>
              {COMPETENCIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities…"
              className="w-56 rounded-md border border-rule bg-surface px-3 py-1.5 text-xs text-ink placeholder:text-ink-soft focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {filtered.map((o) => (<OpportunityCard key={o.id} opp={o} />))}
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-rule bg-surface p-10 text-center text-sm text-ink-soft">
              No opportunities match the current filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({ label, hint, value, accent }: { label: string; hint: string; value: number; accent: "now" | "soon" | "watch" }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]",
          accent === "now" && "badge-now",
          accent === "soon" && "badge-soon",
          accent === "watch" && "badge-watch",
        )}>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {label}
        </span>
        <span className="font-mono text-3xl font-semibold tabular-nums text-ink">{value}</span>
      </div>
      <p className="mt-3 text-xs text-ink-soft">{hint}</p>
    </div>
  );
}
