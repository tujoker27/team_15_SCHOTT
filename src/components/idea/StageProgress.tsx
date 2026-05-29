import { Check } from "lucide-react";

import { STAGES, type Idea } from "@/data/ideas";

export function StageProgress({ idea }: { idea: Idea }) {
  return (
    <ol className="flex w-full items-stretch gap-1 overflow-x-auto pb-1">
      {STAGES.map((name, i) => {
        const stage = idea.stages[i];
        const status = stage?.status ?? "future";
        const isActive = status === "active";
        const isComplete = status === "complete";

        return (
          <li key={name} className="flex min-w-0 flex-1">
            <div
              className={`flex w-full items-center gap-2 rounded-md border px-2.5 py-2 transition-colors ${
                isActive
                  ? "border-[#3B5BDB] bg-[#3B5BDB]/15"
                  : isComplete
                    ? "border-[#1E3158] bg-[#0F1E40]"
                    : "border-[#1E3158] bg-[#0A1628]"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[9px] font-bold ${
                  isComplete
                    ? "bg-[#22C55E] text-[#0A1628]"
                    : isActive
                      ? "bg-[#3B5BDB] text-white"
                      : "bg-[#1E3158] text-white/40"
                }`}
              >
                {isComplete ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span
                className={`truncate text-[11px] font-medium ${
                  isActive
                    ? "text-white"
                    : isComplete
                      ? "text-white/80"
                      : "text-white/40"
                }`}
              >
                {name}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
