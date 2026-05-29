import { Link } from "@tanstack/react-router";

import { useAppMode } from "@/lib/mode";

export function ModeToggle() {
  const mode = useAppMode();



  const base =
    "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors rounded-[6px]";
  const active = "bg-[#3B5BDB] text-white";
  const inactive =
    "bg-transparent text-[#A8B8D8] hover:text-white hover:bg-white/5";

  return (
    <div className="hidden md:flex items-center rounded-md border border-[#1E3158] bg-white/5 p-0.5">
      <Link
        to="/"
        className={`${base} ${mode === "intelligence" ? active : inactive}`}
        aria-pressed={mode === "intelligence"}
      >
        Intelligence
      </Link>
      <Link
        to="/idea-builder"
        className={`${base} ${mode === "idea-builder" ? active : inactive}`}
        aria-pressed={mode === "idea-builder"}
      >
        Idea Builder
      </Link>
    </div>
  );
}
