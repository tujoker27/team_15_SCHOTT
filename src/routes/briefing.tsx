import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { TimingBadge } from "@/components/TimingBadge";
import { opportunities } from "@/data/opportunities";
import { feedSignals } from "@/data/signals";
import { competitors } from "@/data/competitors";

export const Route = createFileRoute("/briefing")({
  head: () => ({
    meta: [
      { title: "Executive Briefing — SCHOTT OI" },
      { name: "description", content: "Weekly executive summary of top opportunities, new signals, and competitor moves." },
    ],
  }),
  component: BriefingPage,
});

function BriefingPage() {
  const counts = {
    NOW: opportunities.filter((o) => o.timing === "NOW").length,
    SOON: opportunities.filter((o) => o.timing === "SOON").length,
    EARLY_WATCH: opportunities.filter((o) => o.timing === "EARLY_WATCH").length,
  };
  const top = [...opportunities]
    .sort((a, b) => {
      const order = { NOW: 0, SOON: 1, EARLY_WATCH: 2 } as const;
      if (order[a.timing] !== order[b.timing]) return order[a.timing] - order[b.timing];
      return b.confidence - a.confidence;
    })
    .slice(0, 3);
  const newSignals = [...feedSignals].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const competitorMoves = competitors
    .flatMap((c) => c.moves.map((m) => ({ ...m, competitor: c.name })))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <>
      <TopBar title="Executive Briefing" subtitle="Week of 25 May 2026" />
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-rule bg-surface p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Good morning, SCHOTT.</div>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
            This week the system identified <span className="text-accent">{counts.NOW} NOW</span>,{" "}
            {counts.SOON} SOON, and {counts.EARLY_WATCH} EARLY WATCH opportunities.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft max-w-2xl">
            The most important opportunity this week is <strong className="text-ink">{top[0].title}</strong>.
            {" "}{top[0].whyNow.split(". ").slice(0, 1).join(". ")}.
          </p>
        </div>

        <Section title="Top 3 opportunities">
          <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface">
            {top.map((o, i) => (
              <li key={o.id} className="p-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-semibold tabular-nums text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <TimingBadge timing={o.timing} size="sm" />
                  <span className="ml-auto font-mono text-xs text-ink-soft">Confidence {o.confidence}%</span>
                </div>
                <Link to="/opportunities/$id" params={{ id: o.id }} className="mt-2 block text-base font-semibold text-ink hover:text-accent">
                  {o.title} <ArrowUpRight className="inline h-3 w-3" />
                </Link>
                <p className="mt-1 text-sm text-ink-soft">{o.summary}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Key new signals">
          <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface">
            {newSignals.map((s) => (
              <li key={s.id} className="flex flex-wrap items-start gap-3 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{s.date}</span>
                <TimingBadge timing={s.timing} size="sm" />
                <span className="text-sm text-ink flex-1 min-w-[200px]">{s.title}</span>
                <a href={s.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">{s.source}</a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Important competitor moves">
          <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface">
            {competitorMoves.map((m, i) => (
              <li key={i} className="flex flex-wrap items-start gap-3 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{m.date}</span>
                <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase text-ink-soft">{m.type}</span>
                <span className="text-sm text-ink flex-1 min-w-[200px]"><strong>{m.competitor}:</strong> {m.title}</span>
                <a href={m.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">Source</a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Recommended actions">
          <div className="rounded-xl border border-rule bg-surface p-5">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-ink-soft">
              <li>Start strategic evaluation and customer discovery on <strong className="text-ink">{top[0].title.split(" ").slice(0, 4).join(" ")}…</strong></li>
              <li>Schedule R&D review for SOON-window opportunities ({counts.SOON} active).</li>
              <li>Update competitive intelligence file on Stevanato capacity moves.</li>
              <li>Maintain quarterly EARLY_WATCH check-ins ({counts.EARLY_WATCH} topics).</li>
            </ol>
          </div>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">{title}</h3>
      {children}
    </section>
  );
}
