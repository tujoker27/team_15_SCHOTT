import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, AlertTriangle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { type Idea, type StageState } from "@/data/ideas";
import { ideaChat } from "@/lib/ideaAi.functions";
import { StageProgress } from "./StageProgress";
import { ProjectCardView } from "./ProjectCard";

function trafficDot(t?: StageState["traffic"]) {
  if (!t) return null;
  const cls =
    t === "green"
      ? "bg-[#22C55E]"
      : t === "amber"
        ? "bg-[#F59E0B]"
        : "bg-[#EF4444]";
  return <span className={`h-2 w-2 rounded-full ${cls}`} />;
}

function CollapsedStage({ stage, index }: { stage: StageState; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-[#1E3158] bg-[#0F1E40]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#112244]"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#22C55E]/15 font-mono text-[10px] font-bold text-[#22C55E]">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-[13px] font-semibold text-white">{stage.name}</h4>
            {trafficDot(stage.traffic)}
          </div>
          {stage.summary && (
            <p className="mt-0.5 truncate text-[12px] text-[#A8B8D8]">
              {stage.summary}
            </p>
          )}
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-white/50" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/50" />
        )}
      </button>
      {open && (
        <div className="border-t border-[#1E3158] bg-[#0A1628] px-4 py-4">
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#D9E1F2]">
            {stage.content || stage.summary}
          </p>
          {stage.source && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#A8B8D8]">
              Source: {stage.source}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-[#3B5BDB]"
          style={{
            animation: "pulse-dot 1.4s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

function ActiveStagePanel({ idea }: { idea: Idea }) {
  const stage = idea.stages[idea.activeStageIndex];
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [streamed, setStreamed] = useState<string | null>(null);
  const callChat = useServerFn(ideaChat);

  // Reset when idea changes
  useEffect(() => {
    setStreamed(null);
    setInput("");
    setTyping(false);
  }, [idea.id]);

  // EUR 50M threshold detection on Market Sizing
  const isMarketSizing = stage?.name === "Market Sizing";
  const responseText = streamed ?? "";
  const m = responseText.match(/EUR\s+(\d+)\s*(?:M|million)/i);
  const belowThreshold =
    isMarketSizing && m ? parseInt(m[1], 10) < 50 : false;

  const typewriter = async (full: string) => {
    setStreamed("");
    const chunkSize = 4;
    for (let i = 0; i <= full.length; i += chunkSize) {
      setStreamed(full.slice(0, i));
      await new Promise((r) => setTimeout(r, 18));
    }
    setStreamed(full);
  };

  const handleGenerate = async () => {
    if (typing) return;
    setStreamed(null);
    setTyping(true);

    // Show typing for 1.5–2s
    const minDelay = new Promise((r) => setTimeout(r, 1600));

    let full: string;
    if (stage?.prewrittenResponse) {
      await minDelay;
      full = stage.prewrittenResponse;
    } else {
      try {
        const [res] = await Promise.all([
          callChat({
            data: {
              ideaTitle: idea.title,
              ideaContext: idea.context,
              activeStage: stage?.name ?? "Spark",
              sector: idea.sector,
              messages: [
                {
                  role: "user",
                  content:
                    input ||
                    `Generate the ${stage?.name} analysis for this idea, following SCHOTT business-development standards.`,
                },
              ],
            },
          }),
          minDelay,
        ]);
        full = res.content;
      } catch (e) {
        setTyping(false);
        toast.error(
          e instanceof Error ? e.message : "Could not generate response",
        );
        return;
      }
    }
    setTyping(false);
    await typewriter(full);
  };

  if (!stage) return null;

  return (
    <div className="rounded-xl border border-[#3B5BDB]/40 bg-gradient-to-b from-[#112244] to-[#0F1E40] p-5 shadow-lg shadow-[#3B5BDB]/5">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#3B5BDB] font-mono text-[11px] font-bold text-white">
          {idea.activeStageIndex + 1}
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B5BDB]">
            Active Stage
          </div>
          <h3 className="text-[16px] font-semibold text-white">{stage.name}</h3>
        </div>
      </div>

      <label className="mt-4 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#A8B8D8]">
        {stage.inputLabel || "Describe your input for this stage"}
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        placeholder="Type your analyst input or leave blank to let the assistant draft from context…"
        className="mt-1.5 w-full resize-none rounded-md border border-[#1E3158] bg-[#0A1628] px-3 py-2.5 text-[13px] text-white placeholder:text-white/35 focus:border-[#3B5BDB] focus:outline-none"
      />

      <button
        onClick={handleGenerate}
        disabled={typing}
        className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#3B5BDB] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#3B5BDB]/90 disabled:opacity-50"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {typing ? "Generating…" : streamed ? "Regenerate" : "Generate"}
      </button>

      <div className="mt-4 min-h-[80px] rounded-lg border border-[#1E3158] bg-[#0A1628] p-4">
        {typing && <TypingDots />}
        {!typing && streamed === null && (
          <p className="text-[12px] italic text-white/40">
            AI response will appear here.
          </p>
        )}
        {!typing && streamed !== null && (
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#D9E1F2]">
            {streamed}
            {streamed.length > 0 && (
              <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-[#3B5BDB] align-middle" />
            )}
          </p>
        )}
      </div>

      {belowThreshold && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#F59E0B]/40 bg-[#F59E0B]/10 p-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
          <p className="text-[12px] leading-relaxed text-[#F5D58A]">
            This opportunity may fall below SCHOTT's minimum investment
            threshold of EUR 50M. Consider refining the scope or exploring an
            adjacent angle before proceeding.
          </p>
        </div>
      )}

      {streamed && !typing && (
        <button
          className={`mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium text-white transition-colors ${
            belowThreshold
              ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
              : "bg-[#3B5BDB] hover:bg-[#3B5BDB]/90"
          }`}
        >
          Continue to next stage →
        </button>
      )}
    </div>
  );
}

export function ActiveSession({ idea }: { idea: Idea }) {
  const completed = idea.stages.filter((s) => s.status === "complete");
  const showProjectCard =
    idea.submitted || idea.stages[idea.activeStageIndex]?.name === "Project Card";

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [idea.id]);

  return (
    <div ref={scrollRef} className="flex h-full flex-col overflow-y-auto bg-[#0D1B3E]">
      <header className="sticky top-0 z-10 border-b border-[#1E3158] bg-[#0D1B3E]/95 px-6 py-4 backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A8B8D8]">
              Active Idea · {idea.sector}
            </div>
            <h1 className="mt-1 text-[20px] font-semibold leading-tight text-white">
              {idea.title}
            </h1>
            <p className="mt-1.5 max-w-3xl text-[12.5px] leading-relaxed text-[#A8B8D8]">
              {idea.context}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <StageProgress idea={idea} />
        </div>
      </header>

      <div className="flex-1 px-6 py-6">
        {showProjectCard && idea.projectCard ? (
          <ProjectCardView idea={idea} />
        ) : (
          <div className="space-y-4">
            {completed.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A8B8D8]">
                  Completed stages
                </h3>
                {completed.map((s) => (
                  <CollapsedStage
                    key={s.name}
                    stage={s}
                    index={idea.stages.indexOf(s)}
                  />
                ))}
              </div>
            )}
            <ActiveStagePanel idea={idea} />
          </div>
        )}
      </div>
    </div>
  );
}
