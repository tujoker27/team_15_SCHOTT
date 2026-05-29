import { useState } from "react";
import { Download, FileText, Presentation, Share2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import type { Idea } from "@/data/ideas";

function Panel({
  title,
  children,
  span = 1,
}: {
  title: string;
  children: React.ReactNode;
  span?: 1 | 2;
}) {
  return (
    <section
      className={`rounded-xl border border-[#1E3158] bg-[#112244] p-5 ${
        span === 2 ? "md:col-span-2" : ""
      }`}
    >
      <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A8B8D8]">
        {title}
      </h3>
      <div className="mt-2 text-[13px] leading-relaxed text-[#E5EAF5]">
        {children}
      </div>
    </section>
  );
}

function trafficClass(t: "green" | "amber" | "red") {
  return t === "green"
    ? "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/40"
    : t === "amber"
      ? "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/40"
      : "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/40";
}

function sev(s: "High" | "Medium" | "Low") {
  return s === "High"
    ? "text-[#EF4444]"
    : s === "Medium"
      ? "text-[#F59E0B]"
      : "text-[#22C55E]";
}

export function ProjectCardView({ idea }: { idea: Idea }) {
  const pc = idea.projectCard!;
  const [exporting, setExporting] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  const doExport = (kind: string) => {
    if (exporting) return;
    setExporting(kind);
    setTimeout(() => {
      setExporting(null);
      toast.success("Report generated successfully.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#3B5BDB]/40 bg-gradient-to-r from-[#112244] to-[#0F1E40] p-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B5BDB]">
            Project Card · Stage 7
          </div>
          <h2 className="mt-1 text-[22px] font-semibold text-white">
            {idea.title}
          </h2>
        </div>
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${trafficClass(pc.recommendationBadge)}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              pc.recommendationBadge === "green"
                ? "bg-[#22C55E]"
                : pc.recommendationBadge === "amber"
                  ? "bg-[#F59E0B]"
                  : "bg-[#EF4444]"
            }`}
          />
          Recommendation: {pc.recommendation}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel title="Executive Summary" span={2}>
          {pc.executiveSummary}
        </Panel>

        <Panel title="Market Size Estimate">
          <div className="text-[22px] font-semibold text-white">
            {pc.marketSize}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[12px] text-[#A8B8D8]">
            Confidence: <span className="text-white">{pc.confidence}</span>
            <span
              className={`ml-1 inline-block h-2 w-2 rounded-full ${
                pc.marketTraffic === "green"
                  ? "bg-[#22C55E]"
                  : pc.marketTraffic === "amber"
                    ? "bg-[#F59E0B]"
                    : "bg-[#EF4444]"
              }`}
            />
          </div>
        </Panel>

        <Panel title="SCHOTT Capability Match">
          <div className="flex items-baseline gap-2">
            <span className="text-[22px] font-semibold text-white">
              {pc.capabilityScore}
            </span>
            <span className="text-[12px] text-[#A8B8D8]">/ 10</span>
          </div>
          <p className="mt-2">{pc.capabilityText}</p>
        </Panel>

        <Panel title="Competitive Position" span={2}>
          {pc.competitivePosition}
        </Panel>

        <Panel title="Pro Arguments">
          <ul className="space-y-1.5">
            {pc.pros.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Contra Arguments & Risks">
          <ul className="space-y-1.5">
            {pc.cons.map((c, i) => (
              <li key={i} className="flex items-center justify-between gap-2">
                <span>{c.label}</span>
                <span className={`font-mono text-[10px] uppercase ${sev(c.severity)}`}>
                  {c.severity}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recommendation Justification" span={2}>
          {pc.justification}
        </Panel>
      </div>

      <section className="rounded-xl border border-[#1E3158] bg-[#0F1E40] p-5">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A8B8D8]">
          Export & Sharing
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[
            { k: "pdf", label: "Export PDF", Icon: FileText },
            { k: "ppt", label: "Export PowerPoint", Icon: Presentation },
            { k: "summary", label: "Export One-Page Summary", Icon: Download },
          ].map(({ k, label, Icon }) => (
            <button
              key={k}
              onClick={() => doExport(k)}
              disabled={exporting !== null}
              className="inline-flex items-center gap-2 rounded-md border border-[#1E3158] bg-[#0A1628] px-3 py-2 text-[12px] font-medium text-white hover:border-[#3B5BDB] disabled:opacity-50"
            >
              {exporting === k ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Icon className="h-3.5 w-3.5" />
              )}
              {label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-[12px] text-[#A8B8D8]">
            Visibility: <span className="text-white">{idea.visibility}</span>
            <button
              onClick={() => setShareOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#3B5BDB] px-3 py-1.5 text-white hover:bg-[#3B5BDB]/90"
            >
              <Share2 className="h-3.5 w-3.5" /> Manage Access
            </button>
          </div>
        </div>
      </section>

      {shareOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShareOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-[#1E3158] bg-[#112244] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-white">
                Manage Access
              </h3>
              <button
                onClick={() => setShareOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-[12px] text-[#A8B8D8]">
              Add colleagues and set their permission level for this project card.
            </p>
            <div className="mt-4 space-y-2">
              <input
                placeholder="colleague@schott.com"
                className="w-full rounded-md border border-[#1E3158] bg-[#0A1628] px-3 py-2 text-[13px] text-white placeholder:text-white/35 focus:border-[#3B5BDB] focus:outline-none"
              />
              <div className="flex gap-2">
                <select className="flex-1 rounded-md border border-[#1E3158] bg-[#0A1628] px-2 py-2 text-[13px] text-white focus:border-[#3B5BDB] focus:outline-none">
                  <option>View Only</option>
                  <option>Co-edit</option>
                </select>
                <button
                  onClick={() => {
                    toast.success("Access updated.");
                    setShareOpen(false);
                  }}
                  className="rounded-md bg-[#3B5BDB] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#3B5BDB]/90"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
