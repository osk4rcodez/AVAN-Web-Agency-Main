import { Linkedin } from 'lucide-react'
import Logo from './Logo.jsx'
import MotionToggle from './MotionToggle.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import { useTranslate } from '../lib/language-preference.jsx'

const LINKEDIN_URL =
  'https://www.linkedin.com/in/avan-web-agency-a03566422?utm_source=share_via&utm_content=profile&utm_medium=member_ios'

const columns = [
  {
    id: 'leistungen',
    title: { de: 'Leistungen', en: 'Services', pl: 'Usługi' },
    links: [
      { id: 'website', label: { de: 'Website-Entwicklung', en: 'Website development', pl: 'Tworzenie stron' }, href: '#leistungen' },
      { id: 'hosting', label: { de: 'Hosting & Bereitstellung', en: 'Hosting & deployment', pl: 'Hosting i wdrożenie' }, href: '#leistungen' },
      { id: 'wartung', label: { de: 'Wartung & Pflege', en: 'Maintenance & care', pl: 'Konserwacja' }, href: '#leistungen' },
      { id: 'support', label: { de: 'Support & Beratung', en: 'Support & consulting', pl: 'Wsparcie i doradztwo' }, href: '#leistungen', onClick: 'support' },
    ],
  },
  {
    id: 'unternehmen',
    title: { de: 'Unternehmen', en: 'Company', pl: 'Firma' },
    links: [
      { id: 'ueber-uns', label: { de: 'Über uns', en: 'About us', pl: 'O nas' }, href: '#ueber-uns' },
      { id: 'ablauf', label: { de: 'Ablauf', en: 'Process', pl: 'Proces' }, href: '#ablauf' },
      { id: 'showcase', label: { de: 'Showcase', en: 'Showcase', pl: 'Realizacje' }, href: '#showcase' },
      { id: 'kontakt', label: { de: 'Kontakt', en: 'Contact', pl: 'Kontakt' }, href: '#kontakt' },
    ],
  },
  {
    id: 'kontakt',
    title: { de: 'Kontakt', en: 'Contact', pl: 'Kontakt' },
    links: [
      { id: 'email', label: { de: 'avanwebagency@gmail.com', en: 'avanwebagency@gmail.com', pl: 'avanwebagency@gmail.com' }, href: 'mailto:avanwebagency@gmail.com' },
      { id: 'login', label: { de: 'Login / Kundenbereich', en: 'Login / Client area', pl: 'Logowanie / Panel klienta' }, href: '#kontakt', soon: true },
    ],
  },
  {
    id: 'rechtliches',
    title: { de: 'Rechtliches', en: 'Legal', pl: 'Informacje prawne' },
    links: [
      { id: 'impressum', label: { de: 'Impressum', en: 'Imprint', pl: 'Impressum' }, href: '#impressum' },
      { id: 'datenschutz', label: { de: 'Datenschutz', en: 'Privacy policy', pl: 'Polityka prywatności' }, href: '#datenschutz' },
      { id: 'agb', label: { de: 'AGB', en: 'Terms', pl: 'Regulamin' }, href: '#agb' },
      { id: 'barrierefreiheit', label: { de: 'Barrierefreiheit', en: 'Accessibility', pl: 'Dostępność' }, href: '#barrierefreiheit' },
      { id: 'cookies', label: { de: 'Cookie-Einstellungen', en: 'Cookie settings', pl: 'Ustawienia cookies' }, href: '#', onClick: 'cookies' },
    ],
  },
]

export default function Footer() {
  const t = useTranslate()

  return (
    <footer className="relative overflow-hidden rounded-t-[2.5rem] border-t border-navy/10 bg-white bg-[radial-gradient(35%_160px_at_50%_0%,theme(colors.accent/10%),transparent)] sm:rounded-t-[3rem]">
      <div className="absolute left-1/2 right-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur" />
      <div className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              {t({
                de: 'Ihre Website. Unsere Verantwortung. Von der Idee bis zum Server — alles aus einer Hand.',
                en: 'Your website. Our responsibility. From idea to server — all from a single source.',
                pl: 'Twoja strona. Nasza odpowiedzialność. Od pomysłu po serwer — wszystko z jednej ręki.',
              })}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-green-500" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-green-700">
                {t({ de: 'Alle betreuten Websites online', en: 'All managed websites online', pl: 'Wszystkie obsługiwane strony online' })}
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.id}>
              <p className="text-xs font-semibold uppercase tracking-widest text-silver">
                {t(col.title)}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.id}>
                    {l.soon ? (
                      <span className="inline-flex items-center gap-2 text-sm text-ink/50">
                        {t(l.label)}
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-accent">
                          {t({ de: 'Bald', en: 'Soon', pl: 'Wkrótce' })}
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
                            : l.onClick === 'support'
                              ? (e) => {
                                  e.preventDefault()
                                  document.querySelector('#leistungen')?.scrollIntoView({ behavior: 'smooth' })
                                  window.dispatchEvent(new CustomEvent('open-support-details'))
                                }
                              : undefined
                        }
                        className="inline-flex items-center gap-1 text-sm text-ink/70 transition-colors hover:text-accent"
                      >
                        {t(l.label)}
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
            © 2026 AVAN Web Agency &nbsp;·&nbsp; Augsburg &nbsp;·&nbsp;{' '}
            {t({ de: 'Alle Rechte vorbehalten.', en: 'All rights reserved.', pl: 'Wszelkie prawa zastrzeżone.' })}
          </span>
          <div className="flex items-center gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AVAN Web Agency auf LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 text-navy/70 transition-colors hover:border-accent/30 hover:text-accent"
            >
              <Linkedin size={16} />
            </a>
            <MotionToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
