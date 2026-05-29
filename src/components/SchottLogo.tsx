export function SchottLogo({ className = "" }: { className?: string }) {
  // SCHOTT mark: open ring with a small gap at the top.
  // Two arcs from ~95° around to ~85° leave a clean gap, drawn in currentColor.
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path
          d="M 16.8 3.05
             A 13 13 0 1 1 15.2 3.05"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-sans text-[15px] font-bold tracking-[0.22em] leading-none">
        SCHOTT
      </span>
    </span>
  );
}
