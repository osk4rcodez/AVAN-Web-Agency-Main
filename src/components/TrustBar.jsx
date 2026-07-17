const tech = [
  {
    name: 'React',
    Logo: ({ className }) => (
      <svg viewBox="-11.5 -10.23 23 20.46" className={className} aria-hidden="true">
        <circle r="2.05" fill="currentColor" />
        <g stroke="currentColor" fill="none" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    Logo: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.4 10.55 14.6 11.83 17 11.83c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.6 7.28 14.4 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.4 16.55 9.6 17.83 12 17.83c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.6 13.28 9.4 12 7 12z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    Logo: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 1.8 21 7v10l-9 5.2L3 17V7l9-5.2zM12 4.3 6 7.7v8.6l6 3.4 6-3.4V7.7L12 4.3z" />
        <path d="M11.2 15.3c-.9.5-2 .5-2.8 0-.5-.3-.6-.9-.3-1.4.2-.4.6-.6 1-.6.3 0 .6.2.8.4.2-.5.4-.9.6-1.3-1-.4-2.2-.3-3.1.3-1.1.6-1.7 1.9-1.4 3.1.3 1.3 1.5 2.2 2.8 2.3 1.4.1 2.7-.5 3.3-1.7.2-.5.2-1.1 0-1.6l-.9.6zM14.5 8.7v6.4h1.1V9.8c.6-.2 1.2-.1 1.6.3.4.4.5 1 .3 1.5l1-.5c.3-1 .1-2.1-.7-2.8-.8-.7-1.9-.7-2.9-.4l-.4-2.2h-1z" />
      </svg>
    ),
  },
  {
    name: 'Netlify',
    Logo: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 2 22 20H2L12 2z" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    Logo: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M6 16h9a4 4 0 0 0 .4-7.98A5.5 5.5 0 0 0 5 9.5 3.5 3.5 0 0 0 6 16zm1-2a1.5 1.5 0 0 1 0-3 1 1 0 0 0 1-1 3 3 0 0 1 5.9-.7A2.5 2.5 0 0 1 15 14H7z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    Logo: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" />
        <path fill="#fff" d="M12.7 12.9h-2V9.4h-1.6v6.4h1.6v-2.5h2v2.5h1.6V9.4h-1.6v3.5zM17 9.4h-3.2v1.3H16v1.2h-2.2v1.3H16v1.3h-3.2V17H17V9.4z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    Logo: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M8 2h4v6H8a3 3 0 0 1 0-6zM12 2h4a3 3 0 0 1 0 6h-4V2zM12 8h4a3 3 0 0 1 0 6h-4V8zM8 8h4v6H8a3 3 0 0 1 0-6zM8 14h4v6H8a3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    Logo: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M6 4c-1.5 1-2.5 3-2.7 6C2.9 14 4.5 19 8 20c1 .3 2 .2 2.5-.3.6-.6.4-1.6.3-2.4-.1-1 .6-1.5 1.2-2 .6-.5 1.4-1 1.4-2 0-1.2-1-1.8-1.9-2.3C9.7 9.6 9 8.6 9 7c0-2 .6-3.6 2-4.2" />
        <path d="M15 7.5c2.5.5 4 2.3 4.4 4.8.4 2.7-.4 5.4-2.2 7-.5.4-1.2.4-1.7-.1-.5-.5-.6-1.3-.6-2 0-1 .4-1.7.9-2.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
]

function LogoItem({ name, Logo }) {
  return (
    <div className="logo-item" tabIndex={0} aria-label={name}>
      <Logo className="logo-img" />
      <span className="logo-name">{name}</span>
      <span className="logo-tooltip" role="tooltip">
        {name}
        <span className="logo-tooltip-arrow" aria-hidden="true" />
      </span>
    </div>
  )
}

export default function TrustBar() {
  const items = [...tech, ...tech]
  return (
    <section className="border-y border-navy/5 bg-mist/60 py-8">
      <div className="container-px">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-silver">
          Technologien, mit denen wir arbeiten
        </p>
        <div className="marquee" role="list" aria-label="Technologien, mit denen wir arbeiten">
          <div className="marquee-track">
            {items.map(({ name, Logo }, i) => (
              <LogoItem key={`${name}-${i}`} name={name} Logo={Logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
