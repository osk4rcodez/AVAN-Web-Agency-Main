const palettes = [
  { bg: '#2E1A47', accent: '#8B5CF6', soft: '#A79FC4', name: 'NORDWERK' },
  { bg: '#1E1B2E', accent: '#A78BFA', soft: '#C4B5FD', name: 'MERIDIAN' },
  { bg: '#3B2566', accent: '#8B5CF6', soft: '#D6CBF5', name: 'LUMA STUDIO' },
]

export default function ProjectScreenshot({ index = 0, rounded = true }) {
  const p = palettes[index % palettes.length]
  return (
    <svg
      viewBox="0 0 400 260"
      className={`h-full w-full ${rounded ? 'rounded-lg' : ''}`}
      role="img"
      aria-label={`Beispiel-Website-Projekt ${p.name}`}
    >
      <rect width="400" height="260" fill={p.bg} />
      <rect x="0" y="0" width="400" height="48" fill="rgba(255,255,255,0.04)" />
      <circle cx="24" cy="24" r="5" fill={p.soft} opacity="0.6" />
      <circle cx="40" cy="24" r="5" fill={p.soft} opacity="0.4" />
      <circle cx="56" cy="24" r="5" fill={p.soft} opacity="0.3" />
      <rect x="300" y="16" width="80" height="16" rx="8" fill={p.accent} opacity="0.85" />

      <rect x="28" y="78" width="150" height="14" rx="7" fill="#fff" opacity="0.9" />
      <rect x="28" y="100" width="220" height="10" rx="5" fill={p.soft} opacity="0.55" />
      <rect x="28" y="118" width="180" height="10" rx="5" fill={p.soft} opacity="0.4" />

      <rect x="28" y="150" width="96" height="34" rx="17" fill={p.accent} />
      <rect x="136" y="150" width="96" height="34" rx="17" fill="rgba(255,255,255,0.12)" />

      <rect x="28" y="200" width="100" height="44" rx="8" fill="rgba(255,255,255,0.06)" />
      <rect x="150" y="200" width="100" height="44" rx="8" fill="rgba(255,255,255,0.06)" />
      <rect x="272" y="200" width="100" height="44" rx="8" fill="rgba(255,255,255,0.06)" />

      <text
        x="28"
        y="42"
        fill="#fff"
        opacity="0.85"
        fontFamily="Manrope, Inter, sans-serif"
        fontSize="13"
        fontWeight="800"
      >
        {p.name}
      </text>
    </svg>
  )
}
