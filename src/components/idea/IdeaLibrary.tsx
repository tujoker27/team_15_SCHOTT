import { Link, useSearch } from "@tanstack/react-router";
import { Lock, Users, Eye, Send, Search, Plus } from "lucide-react";
import { useState, useMemo } from "react";

import { ideas, type Idea, type IdeaOwner, type Visibility } from "@/data/ideas";

const TABS: IdeaOwner[] = ["My Ideas", "Team Ideas", "Submitted"];

function VisIcon({ v }: { v: Visibility }) {
  const Icon =
    v === "Private" ? Lock : v === "Submitted" ? Send : v === "Shared" ? Users : Eye;
  return <Icon className="h-3 w-3" />;
}

function trafficClass(t: Idea["traffic"]) {
  return t === "green"
    ? "bg-[#22C55E]"
    : t === "amber"
      ? "bg-[#F59E0B]"
      : "bg-[#EF4444]";
}

export function IdeaLibrary({ activeId }: { activeId: string }) {
  const [tab, setTab] = useState<IdeaOwner>("My Ideas");
  const [q, setQ] = useState("");
  const search = useSearch({ from: "/idea-builder" });

  const filtered = useMemo(() => {
    const byTab = ideas.filter((i) => i.owner === tab);
    if (!q.trim()) return byTab;
    const needle = q.toLowerCase();
    // institutional memory: search across ALL ideas when there is a query
    return ideas.filter(
      (i) =>
        i.title.toLowerCase().includes(needle) ||
        i.sector.toLowerCase().includes(needle) ||
        i.oneLiner.toLowerCase().includes(needle),
    );
  }, [tab, q]);

  return (
    <aside className="flex h-full flex-col border-r border-[#1E3158] bg-[#0A1628]">
      <div className="border-b border-[#1E3158] px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            Idea Library
          </h2>
          <button className="inline-flex items-center gap-1 rounded-md bg-[#3B5BDB] px-2.5 py-1 text-[11px] font-medium text-white hover:bg-[#3B5BDB]/90">
            <Plus className="h-3 w-3" /> New Idea
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-[#1E3158] bg-[#112244] px-2 py-1.5">
          <Search className="h-3.5 w-3.5 text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search all ideas…"
            className="w-full bg-transparent text-[12px] text-white placeholder:text-white/35 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex border-b border-[#1E3158] bg-[#0A1628] px-2">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                active ? "text-white" : "text-white/45 hover:text-white/70"
              }`}
            >
              {t}
              {active && (
                <span className="absolute inset-x-3 -bottom-px h-[2px] bg-[#3B5BDB]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filtered.length === 0 ? (
          <p className="px-2 py-6 text-center text-[12px] text-white/40">
            No ideas in this view.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {filtered.map((idea) => {
              const isActive = idea.id === activeId;
              const total = idea.stages.length;
              const done = idea.stages.filter((s) => s.status === "complete").length;
              return (
                <li key={idea.id}>
                  <Link
                    to="/idea-builder"
                    search={{ ...search, idea: idea.id }}
                    className={`block rounded-lg border p-3 transition-colors ${
                      isActive
                        ? "border-[#3B5BDB] bg-[#112244]"
                        : "border-[#1E3158] bg-[#0F1E40] hover:border-[#3B5BDB]/60 hover:bg-[#112244]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[13px] font-semibold leading-snug text-white">
                        {idea.title}
                      </h3>
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${trafficClass(idea.traffic)}`}
                        title={`Status: ${idea.traffic}`}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-sm border border-[#1E3158] bg-[#0A1628] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#A8B8D8]">
                        {idea.sector}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                        <VisIcon v={idea.visibility} /> {idea.visibility}
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#1E3158]">
                        <div
                          className="h-full bg-[#3B5BDB]"
                          style={{ width: `${(done / total) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                        {idea.submitted
                          ? "Submitted"
                          : `Stage ${idea.activeStageIndex + 1}/${total}`}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
