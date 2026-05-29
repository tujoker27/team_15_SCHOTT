import { useEffect, useRef, useState } from "react";
import { Send, Bot } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import type { Idea } from "@/data/ideas";
import { ideaChat } from "@/lib/ideaAi.functions";

type Msg = { role: "user" | "assistant"; content: string };

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-2 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#A8B8D8]"
          style={{
            animation: "pulse-dot 1.4s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

export function ResearchAssistant({ idea }: { idea: Idea }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [streamed, setStreamed] = useState<string>("");
  const callChat = useServerFn(ideaChat);
  const listRef = useRef<HTMLDivElement>(null);
  const stage = idea.stages[idea.activeStageIndex];

  // Reset on idea change
  useEffect(() => {
    setMessages([]);
    setStreamed("");
    setTyping(false);
    setInput("");
  }, [idea.id]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, streamed, typing]);

  const send = async () => {
    const q = input.trim();
    if (!q || typing) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setTyping(true);
    setStreamed("");
    const delay = new Promise((r) => setTimeout(r, 1500));

    try {
      const [res] = await Promise.all([
        callChat({
          data: {
            ideaTitle: idea.title,
            ideaContext: idea.context,
            activeStage: stage?.name ?? "Spark",
            sector: idea.sector,
            messages: next,
          },
        }),
        delay,
      ]);
      setTyping(false);
      const full = res.content;
      for (let i = 0; i <= full.length; i += 4) {
        setStreamed(full.slice(0, i));
        await new Promise((r) => setTimeout(r, 14));
      }
      setStreamed("");
      setMessages([...next, { role: "assistant", content: full }]);
    } catch (e) {
      setTyping(false);
      setStreamed("");
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            (e instanceof Error ? e.message : "Request failed") +
            "\n\nSource: General market data",
        },
      ]);
    }
  };

  return (
    <aside className="flex h-full flex-col border-l border-[#1E3158] bg-[#0A1628]">
      <header className="border-b border-[#1E3158] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#3B5BDB]/20 text-[#3B5BDB]">
            <Bot className="h-3.5 w-3.5" />
          </span>
          <div>
            <h2 className="text-[13px] font-semibold text-white">
              Research Assistant
            </h2>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#A8B8D8]">
              Context-aware · SCHOTT KB
            </p>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-[#1E3158] bg-[#112244] p-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8B8D8]">
            Context · {stage?.name ?? "—"}
          </div>
          <p className="mt-1 text-[11.5px] leading-relaxed text-white/85">
            {idea.context}
          </p>
        </div>
      </header>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
        {messages.length === 0 && !typing && (
          <p className="px-2 py-8 text-center text-[12px] italic text-white/35">
            Ask anything about this idea. Answers use the embedded SCHOTT
            knowledge base and your live Intelligence data sources.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] rounded-lg px-3 py-2 text-[12.5px] leading-relaxed whitespace-pre-line ${
                m.role === "user"
                  ? "bg-[#3B5BDB] text-white"
                  : "bg-[#112244] text-[#E5EAF5] border border-[#1E3158]"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-lg border border-[#1E3158] bg-[#112244]">
              <TypingDots />
            </div>
          </div>
        )}
        {streamed && (
          <div className="flex justify-start">
            <div className="max-w-[90%] whitespace-pre-line rounded-lg border border-[#1E3158] bg-[#112244] px-3 py-2 text-[12.5px] leading-relaxed text-[#E5EAF5]">
              {streamed}
              <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-[#3B5BDB] align-middle" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#1E3158] p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder="Ask anything about this idea."
            className="flex-1 resize-none rounded-md border border-[#1E3158] bg-[#112244] px-3 py-2 text-[12.5px] text-white placeholder:text-white/35 focus:border-[#3B5BDB] focus:outline-none"
          />
          <button
            onClick={send}
            disabled={typing || !input.trim()}
            className="grid h-9 w-9 place-items-center rounded-md bg-[#3B5BDB] text-white hover:bg-[#3B5BDB]/90 disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
