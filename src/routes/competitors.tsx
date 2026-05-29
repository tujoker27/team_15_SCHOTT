import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { competitors } from "@/data/competitors";

export const Route = createFileRoute("/competitors")({
  head: () => ({
    meta: [
      { title: "Competitor Tracking — SCHOTT OI" },
      { name: "description", content: "Strategic moves from Gerresheimer, Stevanato, Corning, Nipro, BD, West, AGC, NEG, Ohara, HOYA, Saint-Gobain." },
    ],
  }),
  component: CompetitorsPage,
});

function CompetitorsPage() {
  return (
    <>
      <TopBar title="Competitor Tracking" subtitle="Adjacent & direct players" />
      <div className="mx-auto w-full max-w-6xl px-6 py-8 space-y-5">
        {competitors.map((c) => (
          <section key={c.id} className="rounded-xl border border-rule bg-surface p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{c.category} · {c.hq}</div>
                <h3 className="mt-1 text-lg font-semibold text-ink">{c.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-ink-soft">{c.blurb}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{c.moves.length} recent moves</span>
            </div>

            <ol className="mt-5 space-y-3 border-l border-rule pl-5">
              {c.moves.map((m, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-accent" />
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                    <span>{m.date}</span>·<span>{m.type}</span>
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-ink">{m.title}</div>
                  <p className="mt-0.5 text-xs text-ink-soft">{m.summary}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-[11px]">
                    <a href={m.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                      {m.sourceTitle} <ExternalLink className="h-3 w-3" />
                    </a>
                    {m.relatedOpportunityId && (
                      <Link to="/opportunities/$id" params={{ id: m.relatedOpportunityId }} className="text-accent hover:underline">
                        → Related opportunity
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
