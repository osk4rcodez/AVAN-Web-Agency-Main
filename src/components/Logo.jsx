export default function Logo({ className = '', showWord = true, monochrome = false }) {
  const navy = monochrome ? 'currentColor' : '#2E1A47'
  const silver = monochrome ? 'currentColor' : '#A79FC4'
  const accent = monochrome ? 'currentColor' : '#8B5CF6'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <rect width="64" height="64" rx="14" fill={navy} />
        <path
          d="M32 14 L48 50 H40.5 L37.2 41 H26.8 L23.5 50 H16 Z M30 34 H34 L32 27 Z"
          fill={silver}
        />
        <path d="M20 20 L44 20" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      {showWord && (
        <span className="font-display text-xl font-extrabold tracking-tightest text-navy">
          AVAN
        </span>
      )}
    </span>
  )
}
