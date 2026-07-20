import Logo from './Logo.jsx'
import MotionToggle from './MotionToggle.jsx'

const columns = [
  {
    title: 'Leistungen',
    links: [
      { label: 'Website-Entwicklung', href: '#leistungen' },
      { label: 'Hosting & Bereitstellung', href: '#leistungen' },
      { label: 'Wartung & Pflege', href: '#leistungen' },
      { label: 'Support & Beratung', href: '#leistungen' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '#ueber-uns' },
      { label: 'Ablauf', href: '#ablauf' },
      { label: 'Showcase', href: '#showcase' },
      { label: 'Kontakt', href: '#kontakt' },
    ],
  },
  {
    title: 'Kontakt',
    links: [
      { label: 'avanwebagency@gmail.com', href: 'mailto:avanwebagency@gmail.com' },
      { label: 'Login / Kundenbereich', href: '#kontakt', soon: true },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '#impressum' },
      { label: 'Datenschutz', href: '#datenschutz' },
      { label: 'AGB', href: '#agb' },
      { label: 'Barrierefreiheit', href: '#barrierefreiheit' },
      { label: 'Cookie-Einstellungen', href: '#', onClick: 'cookies' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              Ihre Website. Unsere Verantwortung. Von der Idee bis zum Server — alles aus
              einer Hand.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-green-500" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-green-700">
                Alle betreuten Websites online
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-silver">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.soon ? (
                      <span className="inline-flex items-center gap-2 text-sm text-ink/50">
                        {l.label}
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-accent">
                          Bald
                        </span>
                      </span>
                    ) : (
                      <a
                        href={l.href}
                        onClick={
                          l.onClick === 'cookies'
                            ? (e) => {
                                e.preventDefault()
                                if (window.openCookieSettings) window.openCookieSettings()
                              }
                            : undefined
                        }
                        className="inline-flex items-center gap-1 text-sm text-ink/70 transition-colors hover:text-accent"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-navy/10 pt-6 text-center text-xs text-silver sm:flex-row sm:justify-between sm:text-left">
          <span>
            © 2026 AVAN Web Agency &nbsp;·&nbsp; Augsburg &nbsp;·&nbsp; Alle Rechte vorbehalten.
          </span>
          <MotionToggle />
        </div>
      </div>
    </footer>
  )
}
