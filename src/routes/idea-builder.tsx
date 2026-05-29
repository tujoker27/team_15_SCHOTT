import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { IdeaLibrary } from "@/components/idea/IdeaLibrary";
import { ActiveSession } from "@/components/idea/ActiveSession";
import { ResearchAssistant } from "@/components/idea/ResearchAssistant";
import { ideas, getIdea } from "@/data/ideas";

const search = z.object({
  idea: z.string().optional(),
});

export const Route = createFileRoute("/idea-builder")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Idea Builder — Prometheus | SCHOTT" },
      {
        name: "description",
        content:
          "AI-guided business development workspace turning early ideas into evidence-backed SCHOTT project proposals.",
      },
    ],
  }),
  component: IdeaBuilderPage,
});

function IdeaBuilderPage() {
  const { idea: ideaId } = Route.useSearch();
  const active = (ideaId && getIdea(ideaId)) || ideas[0];

  return (
    <div className="grid h-[calc(100vh-3.5rem)] w-full grid-cols-[280px_minmax(0,1fr)_340px] bg-[#0A1628]">
      <IdeaLibrary activeId={active.id} />
      <ActiveSession idea={active} />
      <ResearchAssistant idea={active} />
    </div>
  );
}
