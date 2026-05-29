import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Layers, FileText } from "lucide-react";

import type { Opportunity } from "@/data/types";
import { TimingBadge } from "@/components/TimingBadge";
import { ConfidenceDial } from "@/components/ConfidenceDial";

export function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <Link
      to="/opportunities/$id"
      params={{ id: opp.id }}
      className="group block rounded-xl border border-rule bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-[0_4px_20px_-8px_oklch(0.28_0.07_252_/_0.15)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <TimingBadge timing={opp.timing} />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              {opp.segment}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-snug text-ink group-hover:text-accent">
            {opp.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-2">
            {opp.summary}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <ConfidenceDial value={opp.confidence} size="md" />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
            Confidence
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-4 sm:grid-cols-4">
        {opp.evidence.slice(0, 4).map((e) => (
          <div key={e.label}>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {e.label}
            </div>
            <div className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-ink">
              {e.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {opp.competencies.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-2 py-1 text-[11px] text-ink-soft"
            >
              <Layers className="h-3 w-3" />
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[11px] text-ink-soft">
          <span className="inline-flex items-center gap-1 font-mono">
            <FileText className="h-3 w-3" />
            {opp.sources.length} sources · {opp.signalCount} signals
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-accent group-hover:gap-1.5 transition-all">
            Open <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
