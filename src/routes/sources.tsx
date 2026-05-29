import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle, Circle, Upload, ExternalLink } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { dataSources } from "@/data/sources";
import type { ConnectionStatus } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Data Sources — SCHOTT OI" },
      { name: "description", content: "Connection status of public data sources powering the platform." },
    ],
  }),
  component: SourcesPage,
});

const STATUS_META: Record<ConnectionStatus, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  connected: { label: "Connected", cls: "text-accent", Icon: CheckCircle2 },
  degraded:  { label: "Degraded",  cls: "text-[color:var(--signal-soon)]", Icon: AlertTriangle },
  offline:   { label: "Offline",   cls: "text-[color:var(--signal-now)]", Icon: AlertTriangle },
  manual:    { label: "Manual upload", cls: "text-ink-soft", Icon: Upload },
};

function SourcesPage() {
  const groups = ["Clinical", "Regulatory", "IP", "Science", "Funding", "Corporate", "SCHOTT"] as const;

  return (
    <>
      <TopBar title="Data Sources" subtitle="Public sources only · no paywalled data" />
      <div className="mx-auto w-full max-w-6xl px-6 py-8 space-y-8">
        {groups.map((g) => {
          const items = dataSources.filter((d) => d.category === g);
          if (items.length === 0) return null;
          return (
            <section key={g}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">{g}</h3>
              <div className="overflow-hidden rounded-xl border border-rule bg-surface">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-rule text-left font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      <th className="px-4 py-2.5">Source</th>
                      <th className="px-4 py-2.5">Mode</th>
                      <th className="px-4 py-2.5">Status</th>
                      <th className="px-4 py-2.5">Last pulled</th>
                      <th className="px-4 py-2.5 text-right">Records</th>
                      <th className="px-4 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((d) => {
                      const meta = STATUS_META[d.status];
                      return (
                        <tr key={d.id} className="border-b border-rule/60 last:border-0">
                          <td className="px-4 py-3">
                            <div className="font-medium text-ink">{d.name}</div>
                            <div className="mt-0.5 text-xs text-ink-soft">{d.example}</div>
                            {d.error && (
                              <div className="mt-1 text-xs text-[color:var(--signal-now)]">{d.error}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs text-ink-soft">{d.mode}</td>
                          <td className="px-4 py-3">
                            <span className={cn("inline-flex items-center gap-1.5 text-xs", meta.cls)}>
                              <meta.Icon className="h-3.5 w-3.5" />
                              {meta.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-ink-soft">{d.lastPulled.replace("T", " ").replace("Z", " UTC")}</td>
                          <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-ink">{d.recordsPulled.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">
                            <a href={d.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                              Open <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        <div className="rounded-xl border border-dashed border-rule bg-surface-2 p-5">
          <div className="flex items-start gap-3">
            <Circle className="mt-0.5 h-4 w-4 text-ink-soft" />
            <div className="text-sm text-ink-soft">
              <strong className="text-ink">Demo data.</strong> Counts and timestamps reflect the seed dataset, not live API pulls.
              SCHOTT internal materials (Intellify, customer base) are used as context for matching only and are never redistributed.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
