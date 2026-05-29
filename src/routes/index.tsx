import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { TopBar } from "@/components/TopBar";
import { TimingBadge } from "@/components/TimingBadge";
import { opportunities } from "@/data/opportunities";
import type { Timing, Competency } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Opportunities — SCHOTT | Prometheus" },
      { name: "description", content: "Ranked MedTech opportunities for SCHOTT — NOW / SOON / EARLY WATCH, with evidence-backed confidence scoring." },
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

const TIMING_ORDER: Record<Timing, number> = { NOW: 0, SOON: 1, EARLY_WATCH: 2 };

function OpportunitiesPage() {
  const navigate = useNavigate();
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
          : (o.title + " " + o.summary + " " + o.segment)
              .toLowerCase()
              .includes(query.toLowerCase()),
      )
      .sort((a, b) => {
        if (TIMING_ORDER[a.timing] !== TIMING_ORDER[b.timing])
          return TIMING_ORDER[a.timing] - TIMING_ORDER[b.timing];
        return b.confidence - a.confidence;
      });
  }, [timing, comp, query]);

  const counts = useMemo(
    () => ({
      NOW: opportunities.filter((o) => o.timing === "NOW").length,
      SOON: opportunities.filter((o) => o.timing === "SOON").length,
      EARLY_WATCH: opportunities.filter((o) => o.timing === "EARLY_WATCH").length,
    }),
    [],
  );

  return (
    <>
      <TopBar
        title="Opportunities"
        subtitle="AI Market Hunter · Ranked MedTech bets matched to SCHOTT competencies"
      />
      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="NOW" hint="Act now · 1–4 yr demand window" value={counts.NOW} accent="now" />
          <StatCard label="SOON" hint="Monitor closely · 3–6 yr horizon" value={counts.SOON} accent="soon" />
          <StatCard label="EARLY WATCH" hint="Track only · 5–10 yr" value={counts.EARLY_WATCH} accent="watch" />
        </div>

        {/* Filters */}
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
                    : "border-rule bg-surface text-ink-soft hover:border-accent/60 hover:text-ink",
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
              className="rounded-md border border-rule bg-surface px-3 py-1.5 text-xs text-ink focus:border-accent focus:outline-none"
            >
              <option value="ALL">All competencies</option>
              {COMPETENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities…"
              className="w-56 rounded-md border border-rule bg-surface px-3 py-1.5 text-xs text-ink placeholder:text-ink-soft focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Opportunities table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-rule bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-surface-2">
              <tr className="text-left font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                <th className="px-5 py-3 w-[140px]">Timing</th>
                <th className="px-5 py-3">Opportunity</th>
                <th className="px-5 py-3 w-[280px]">Market Segment</th>
                <th className="px-5 py-3 w-[120px] text-right">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() =>
                    navigate({ to: "/opportunities/$id", params: { id: o.id } })
                  }
                  className="group cursor-pointer border-t border-rule transition-colors hover:bg-surface-2 hover:shadow-[inset_3px_0_0_0_var(--accent)]"
                >
                  <td className="px-5 py-4 align-top">
                    <TimingBadge timing={o.timing} size="sm" />
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="font-medium text-ink group-hover:text-ink">
                      {o.title}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top text-xs text-ink-soft">
                    {o.segment}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <ConfidenceChip value={o.confidence} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-sm text-ink-soft">
                    No opportunities match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          Demo data — sources are real, evidence is illustrative. Click any row for detail.
        </p>
      </div>
    </>
  );
}

function ConfidenceChip({ value }: { value: number }) {
  const tone =
    value >= 80
      ? "border-[color:var(--signal-now)]/40 text-[color:var(--signal-now)] bg-[color:var(--signal-now-bg)]"
      : value >= 65
        ? "border-[color:var(--signal-soon)]/40 text-[color:var(--signal-soon)] bg-[color:var(--signal-soon-bg)]"
        : "border-rule text-ink-soft bg-surface-2";
  return (
    <div className="flex justify-end">
      <span
        className={cn(
          "inline-flex min-w-[52px] justify-center rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums",
          tone,
        )}
      >
        {value}
      </span>
    </div>
  );
}

function StatCard({
  label,
  hint,
  value,
  accent,
}: {
  label: string;
  hint: string;
  value: number;
  accent: "now" | "soon" | "watch";
}) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-5">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
            accent === "now" && "badge-now",
            accent === "soon" && "badge-soon",
            accent === "watch" && "badge-watch",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
          {label}
        </span>
        <span className="font-mono text-3xl font-semibold tabular-nums text-white">
          {value}
        </span>
      </div>
      <p className="mt-3 text-xs text-ink-soft">{hint}</p>
    </div>
  );
}
