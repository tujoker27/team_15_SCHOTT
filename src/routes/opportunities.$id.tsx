import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { TimingBadge } from "@/components/TimingBadge";
import { ConfidenceDial } from "@/components/ConfidenceDial";
import { opportunities } from "@/data/opportunities";
import type { Opportunity, Competency, EvidenceMetric, Source } from "@/data/types";
import { useWatchlist, type WatchlistStatus } from "@/lib/watchlist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/opportunities/$id")({
  loader: ({ params }): Opportunity => {
    const opp = opportunities.find((o) => o.id === params.id);
    if (!opp) throw notFound();
    return opp;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Opportunity"} — SCHOTT OI` },
      { name: "description", content: loaderData?.summary ?? "" },
    ],
  }),
  component: OpportunityDetailPage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-sm text-ink-soft">Opportunity not found.</div>
  ),
});

const STATUSES: WatchlistStatus[] = ["Interesting", "Monitor", "High Priority", "Not Relevant"];

function OpportunityDetailPage() {
  const opp = Route.useLoaderData();
  const wl = useWatchlist();
  const status = wl.statusOf(opp.id);
  const isSaved = Boolean(status);

  return (
    <>
      <TopBar title={opp.title} subtitle="Opportunity detail" />
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.16em] text-ink-soft hover:text-ink">
          <ArrowLeft className="h-3 w-3" /> All opportunities
        </Link>

        {/* HERO */}
        <section className="mt-6 rounded-2xl border border-rule bg-surface p-7">
          <div className="flex flex-wrap items-center gap-2">
            <TimingBadge timing={opp.timing} />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{opp.segment}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-start gap-3">
                <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">{opp.title}</h2>
                <button
                  onClick={() => (isSaved ? wl.remove(opp.id) : wl.set(opp.id, "Interesting"))}
                  className={cn(
                    "mt-1.5 inline-flex items-center justify-center rounded-full border p-2 transition-colors",
                    isSaved
                      ? "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
                      : "border-rule bg-surface text-ink-soft hover:border-ink-soft hover:text-ink",
                  )}
                  title={isSaved ? `Saved as ${status}` : "Save opportunity"}
                >
                  {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{opp.summary}</p>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <Meta label="Demand horizon" value={opp.horizon} />
                <Meta label="Last updated" value={opp.updatedAt} mono />
                <Meta label="Signals supporting" value={`${opp.signalCount}`} mono />
                <Meta label="Sources cited" value={`${opp.sources.length}`} mono />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ConfidenceDial value={opp.confidence} size="lg" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Confidence</span>
            </div>
          </div>

          {/* Watchlist */}
          {isSaved && (
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-rule pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft mr-2">
                <BookmarkCheck className="inline h-3 w-3 mr-1" />
                Watchlist status:
              </span>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => (status === s ? wl.remove(opp.id) : wl.set(opp.id, s))}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium",
                    status === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-rule bg-surface text-ink-soft hover:border-ink-soft",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Why SCHOTT + Why Now */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Panel title="Why relevant to SCHOTT" tag="Capability match">
            <p className="text-sm leading-relaxed text-ink-soft">{opp.whySchott}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {opp.competencies.map((c: Competency) => (
                <span key={c} className="rounded-md bg-surface-2 px-2 py-1 text-[11px] text-ink">{c}</span>
              ))}
            </div>
          </Panel>
          <Panel title="Why now" tag={opp.timing.replace("_", " ")}>
            <p className="text-sm leading-relaxed text-ink-soft">{opp.whyNow}</p>
          </Panel>
        </div>

        {/* Evidence */}
        <Panel title="Data-driven evidence" tag="What the data shows" className="mt-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-rule pb-5 sm:grid-cols-4">
            {opp.evidence.map((e: EvidenceMetric) => (
              <div key={e.label}>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{e.label}</div>
                <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">{e.value}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">{opp.evidenceNarrative}</p>
        </Panel>

        {/* Score drivers */}
        <Panel title="Score drivers" tag={`Confidence ${opp.confidence}%`} className="mt-6">
          <ul className="space-y-2 text-sm text-ink-soft">
            {opp.scoreDrivers.map((d: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 rounded-full bg-accent" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Sources */}
        <Panel title="Source traceability" tag="Where the data came from" className="mt-6">
          <div className="-mx-1 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rule text-left font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  <th className="py-2 pr-3">Date</th>
                  <th className="py-2 pr-3">Type</th>
                  <th className="py-2 pr-3">Source</th>
                  <th className="py-2 pr-3">Relevance</th>
                  <th className="py-2 pr-3"></th>
                </tr>
              </thead>
              <tbody>
                {opp.sources.map((s: Source, i: number) => (
                  <tr key={i} className="border-b border-rule/60 last:border-0">
                    <td className="py-3 pr-3 font-mono text-xs text-ink-soft">{s.date}</td>
                    <td className="py-3 pr-3 text-xs text-ink-soft">{s.type}</td>
                    <td className="py-3 pr-3 text-sm text-ink">{s.title}</td>
                    <td className="py-3 pr-3 text-xs text-ink-soft">{s.note}</td>
                    <td className="py-3 pr-3 text-right">
                      <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                        Open <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Risks */}
        <Panel title="Risks & uncertainties" tag="Read before acting" className="mt-6 mb-12">
          <ul className="space-y-2 text-sm text-ink-soft">
            {opp.risks.map((r: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--signal-now)]" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{label}</div>
      <div className={cn("mt-0.5 text-ink", mono && "font-mono text-xs")}>{value}</div>
    </div>
  );
}

function Panel({ title, tag, children, className }: { title: string; tag?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-rule bg-surface p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {tag && <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{tag}</span>}
      </div>
      {children}
    </section>
  );
}
