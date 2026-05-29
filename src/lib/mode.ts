import { useRouterState } from "@tanstack/react-router";

export type AppMode = "intelligence" | "idea-builder";

export function useAppMode(): AppMode {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return pathname.startsWith("/idea-builder") ? "idea-builder" : "intelligence";
}
