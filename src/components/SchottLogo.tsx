export function SchottLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M 16 3 A 13 13 0 0 1 28.5 13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.0"
        />
        {/* small gap to mimic SCHOTT mark opening */}
        <rect x="14.5" y="1.5" width="3" height="4" fill="var(--nav)" />
      </svg>
      <span className="font-sans text-[15px] font-bold tracking-[0.22em] leading-none">
        SCHOTT
      </span>
    </span>
  );
}
