import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { TimingBadge } from "@/components/TimingBadge";
import { feedSignals } from "@/data/signals";
import type { SignalType, Timing } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Market Intelligence Feed — SCHOTT OI" },
      { name: "description", content: "Raw signal layer: clinical trials, approvals, patents, funding, regulatory shifts." },
    ],
  }),
  component: FeedPage,
});

const TYPES: ("ALL" | SignalType)[] = ["ALL", "Clinical Trial", "FDA Approval", "EMA Update", "Patent", "Scientific Paper", "Research Funding", "Startup Funding", "Competitor News", "Regulatory Change", "Article", "Press Release", "Conference", "Procurement"];
const TIMINGS: ("ALL" | Timing)[] = ["ALL", "NOW", "SOON", "EARLY_WATCH"];

function FeedPage() {
  const [type, setType] = useState<"ALL" | SignalType>("ALL");
  const [timing, setTiming] = useState<"ALL" | Timing>("ALL");

  const items = useMemo(() => {
    return [...feedSignals]
      .filter((s) => (type === "ALL" ? true : s.type === type))
      .filter((s) => (timing === "ALL" ? true : s.timing === timing))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [type, timing]);

  return (
    <>
      <TopBar title="Market Intelligence Feed" subtitle="Raw signal layer · public sources only" />
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="flex flex-wrap items-center gap-3 border-b border-rule pb-4">
          <select value={type} onChange={(e) => setType(e.target.value as "ALL" | SignalType)} className="rounded-md border border-rule bg-surface px-3 py-1.5 text-xs text-ink">
            {TYPES.map((t) => <option key={t} value={t}>{t === "ALL" ? "All signal types" : t}</option>)}
          </select>
          <div className="flex items-center gap-1.5">
            {TIMINGS.map((t) => (
              <button
                key={t}
                onClick={() => setTiming(t)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  timing === t ? "border-primary bg-primary text-primary-foreground" : "border-rule bg-surface text-ink-soft hover:border-ink-soft",
                )}
              >
                {t === "ALL" ? "All" : t.replace("_", " ")}
              </button>
            ))}
          </div>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{items.length} signals</span>
        </div>

        <ul className="mt-4 divide-y divide-rule rounded-xl border border-rule bg-surface">
          {items.map((s) => (
            <li key={s.id} className="grid grid-cols-12 gap-4 p-5">
              <div className="col-span-12 flex items-center gap-2 sm:col-span-2">
                <TimingBadge timing={s.timing} size="sm" />
              </div>
              <div className="col-span-12 sm:col-span-7">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-ink-soft">
                  <span>{s.date}</span>·<span>{s.type}</span>·<span>{s.segment}</span>
                </div>
                <div className="mt-1 text-sm font-medium text-ink">{s.title}</div>
                <p className="mt-1 text-xs text-ink-soft">{s.summary}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px]">
                  {s.relatedOpportunityId && (
                    <Link to="/opportunities/$id" params={{ id: s.relatedOpportunityId }} className="text-accent hover:underline">
                      → Related opportunity
                    </Link>
                  )}
                  <span className="text-ink-soft">Competency: {s.competency}</span>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-3 sm:text-right">
                <a href={s.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                  {s.source} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
