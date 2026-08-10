import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Server, ShieldCheck, Headset } from 'lucide-react'
import { revealScale, stagger } from '../lib/motion-variants.js'
import { TiltCard } from './ui/tilt-card.jsx'
import { DetailsModal } from './ui/details-modal.jsx'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useTranslate } from '../lib/language-preference.jsx'

const services = [
  {
    id: 'website',
    icon: Globe,
    title: { de: 'Website-Entwicklung', en: 'Website development', pl: 'Tworzenie stron internetowych' },
    desc: {
      de: 'Individuelles Design & Umsetzung, maßgeschneidert auf das Unternehmen — keine Baukasten-Vorlagen.',
      en: 'Custom design & implementation, tailored to your business — no website-builder templates.',
      pl: 'Indywidualny design i wdrożenie, dopasowane do firmy — bez gotowych szablonów kreatora stron.',
    },
    subtitle: { de: 'Individuelles Design, kein Baukasten', en: 'Custom design, no website builder', pl: 'Indywidualny design, bez kreatora stron' },
    details: [
      {
        de: 'Eigenes Konzept und Design, abgestimmt auf Ihre Marke — keine austauschbare Vorlage.',
        en: 'A custom concept and design matched to your brand — not an interchangeable template.',
        pl: 'Własna koncepcja i design, dopasowane do Twojej marki — nie wymienny szablon.',
      },
      {
        de: 'Umsetzung mit modernen, schnellen Technologien statt aufgeblähtem Website-Baukasten.',
        en: 'Built with modern, fast technology instead of a bloated website builder.',
        pl: 'Realizacja z użyciem nowoczesnych, szybkich technologii zamiast rozdętego kreatora stron.',
      },
      {
        de: 'Responsive für Smartphone, Tablet und Desktop, von Anfang an mitgedacht.',
        en: 'Responsive for phone, tablet and desktop, considered from the start.',
        pl: 'Responsywność dla smartfona, tabletu i komputera, uwzględniona od samego początku.',
      },
    ],
    noteLabel: { de: 'Ideal für', en: 'Ideal for', pl: 'Idealne dla' },
    noteItems: [
      { de: 'Neue Unternehmens-Website', en: 'New company website', pl: 'Nowa strona firmowa' },
      { de: 'Relaunch einer veralteten Seite', en: 'Relaunch of an outdated site', pl: 'Odświeżenie przestarzałej strony' },
      { de: 'Landingpages für Kampagnen', en: 'Landing pages for campaigns', pl: 'Strony docelowe do kampanii' },
    ],
    outcome: {
      de: 'Eine Website, die zu Ihrem Unternehmen passt — technisch sauber und visuell eigenständig.',
      en: 'A website that fits your business — technically clean and visually distinctive.',
      pl: 'Strona dopasowana do Twojej firmy — czysta technicznie i wyróżniająca się wizualnie.',
    },
  },
  {
    id: 'hosting',
    icon: Server,
    title: { de: 'Hosting & Bereitstellung', en: 'Hosting & deployment', pl: 'Hosting i wdrożenie' },
    desc: {
      de: 'Wir bringen die Seite zuverlässig online und halten sie am Laufen — performant und sicher.',
      en: 'We reliably bring your site online and keep it running — fast and secure.',
      pl: 'Niezawodnie publikujemy stronę online i utrzymujemy jej działanie — szybko i bezpiecznie.',
    },
    subtitle: { de: 'Zuverlässig online, ohne dass Sie sich kümmern müssen', en: 'Reliably online, without you having to worry', pl: 'Niezawodnie online, bez Twojego zaangażowania' },
    details: [
      {
        de: 'Einrichtung von Domain, Hosting und SSL-Zertifikat — startklar ohne technisches Vorwissen Ihrerseits.',
        en: 'Setup of domain, hosting and SSL certificate — ready to go without any technical knowledge on your end.',
        pl: 'Konfiguracja domeny, hostingu i certyfikatu SSL — gotowe do startu bez wiedzy technicznej z Twojej strony.',
      },
      {
        de: 'Performance-Optimierung, damit die Seite schnell lädt — wichtig für Nutzer und Google.',
        en: 'Performance optimization so the site loads fast — important for users and Google.',
        pl: 'Optymalizacja wydajności, aby strona ładowała się szybko — ważne dla użytkowników i Google.',
      },
      {
        de: 'Überwachung der Erreichbarkeit — wir merken es, bevor Ihre Kunden es merken.',
        en: 'Uptime monitoring — we notice before your customers do.',
        pl: 'Monitorowanie dostępności — zauważymy problem, zanim zrobią to Twoi klienci.',
      },
    ],
    noteLabel: { de: 'Enthalten', en: 'Included', pl: 'W cenie' },
    noteItems: [
      { de: 'Domain- & SSL-Einrichtung', en: 'Domain & SSL setup', pl: 'Konfiguracja domeny i SSL' },
      { de: 'Server-Monitoring', en: 'Server monitoring', pl: 'Monitoring serwera' },
      { de: 'Performance-Checks', en: 'Performance checks', pl: 'Kontrole wydajności' },
    ],
    outcome: {
      de: 'Ihre Seite ist erreichbar, schnell und technisch abgesichert.',
      en: 'Your site stays reachable, fast and technically secure.',
      pl: 'Twoja strona jest dostępna, szybka i technicznie zabezpieczona.',
    },
  },
  {
    id: 'wartung',
    icon: ShieldCheck,
    title: { de: 'Wartung & Pflege', en: 'Maintenance & care', pl: 'Konserwacja i pielęgnacja' },
    desc: {
      de: 'Updates, Sicherheits-Checks, Inhalte pflegen — laufend, nicht einmalig.',
      en: 'Updates, security checks, content upkeep — ongoing, not a one-off.',
      pl: 'Aktualizacje, kontrole bezpieczeństwa, dbanie o treści — na bieżąco, nie jednorazowo.',
    },
    subtitle: { de: 'Laufend, nicht einmalig', en: 'Ongoing, not a one-off', pl: 'Na bieżąco, nie jednorazowo' },
    details: [
      { de: 'Regelmäßige Sicherheits-Updates für Software und Plugins.', en: 'Regular security updates for software and plugins.', pl: 'Regularne aktualizacje bezpieczeństwa oprogramowania i wtyczek.' },
      {
        de: 'Kleinere Inhaltsänderungen (Texte, Bilder, Preise) übernehmen wir auf Zuruf.',
        en: 'We handle small content changes (text, images, prices) on request.',
        pl: 'Drobne zmiany treści (teksty, zdjęcia, ceny) wprowadzamy na życzenie.',
      },
      { de: 'Regelmäßige Backups, damit im Ernstfall nichts verloren geht.', en: 'Regular backups so nothing is lost in an emergency.', pl: 'Regularne kopie zapasowe, aby nic nie zginęło w razie awarii.' },
    ],
    noteLabel: { de: 'Enthalten', en: 'Included', pl: 'W cenie' },
    noteItems: [
      { de: 'Sicherheits-Updates', en: 'Security updates', pl: 'Aktualizacje bezpieczeństwa' },
      { de: 'Backups', en: 'Backups', pl: 'Kopie zapasowe' },
      { de: 'Kleinere Textanpassungen', en: 'Minor text edits', pl: 'Drobne zmiany tekstu' },
    ],
    outcome: {
      de: 'Ihre Website bleibt aktuell, sicher und funktioniert dauerhaft zuverlässig.',
      en: 'Your website stays current, secure and reliably functional long-term.',
      pl: 'Twoja strona pozostaje aktualna, bezpieczna i niezawodnie działa przez długi czas.',
    },
  },
  {
    id: 'support',
    icon: Headset,
    title: { de: 'Support & Beratung', en: 'Support & consulting', pl: 'Wsparcie i doradztwo' },
    desc: {
      de: 'Direkter Draht zu den Gründern, keine anonyme Hotline oder Ticket-Schlange.',
      en: 'A direct line to the founders — no anonymous hotline or ticket queue.',
      pl: 'Bezpośredni kontakt z założycielami — bez anonimowej infolinii czy kolejki zgłoszeń.',
    },
    subtitle: { de: 'Direkter Draht zu den Gründern', en: 'A direct line to the founders', pl: 'Bezpośredni kontakt z założycielami' },
    details: [
      {
        de: 'Fragen und Änderungswünsche gehen direkt an Oskar oder Kasum — nicht in ein Ticket-System.',
        en: 'Questions and change requests go straight to Oskar or Kasum — not into a ticket system.',
        pl: 'Pytania i prośby o zmiany trafiają bezpośrednio do Oskara lub Kasuma — nie do systemu zgłoszeń.',
      },
      { de: 'Beratung bei neuen Ideen: Was lohnt sich, was nicht?', en: 'Advice on new ideas: what’s worth it, what isn’t?', pl: 'Doradztwo przy nowych pomysłach: co się opłaca, a co nie?' },
      {
        de: 'Schnelle Reaktionszeiten, weil wir ein kleines, persönliches Team sind.',
        en: 'Fast response times because we’re a small, personal team.',
        pl: 'Szybki czas reakcji, ponieważ jesteśmy małym, osobistym zespołem.',
      },
    ],
    noteLabel: { de: 'Erreichbar über', en: 'Reachable via', pl: 'Dostępni przez' },
    noteItems: [
      { de: 'avanwebagency@gmail.com', en: 'avanwebagency@gmail.com', pl: 'avanwebagency@gmail.com' },
      { de: 'Persönliches Gespräch nach Bedarf', en: 'Personal call as needed', pl: 'Osobista rozmowa w razie potrzeby' },
    ],
    outcome: {
      de: 'Sie haben feste Ansprechpartner statt einer anonymen Hotline.',
      en: 'You get fixed contacts instead of an anonymous hotline.',
      pl: 'Masz stałych opiekunów zamiast anonimowej infolinii.',
    },
  },
]

function ServiceCardContent({ s, t }) {
  const Icon = s.icon
  return (
    <>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon size={24} strokeWidth={2} />
      </span>
      <h3 className="mt-5 text-lg font-bold text-navy">{t(s.title)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{t(s.desc)}</p>
      <p className="mt-4 text-xs font-medium text-accent">{t({ de: 'Mehr erfahren →', en: 'Learn more →', pl: 'Dowiedz się więcej →' })}</p>
    </>
  )
}

export default function Services() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [activeIndex, setActiveIndex] = useState(null)
  const t = useTranslate()
  const open = activeIndex !== null
  const isFirst = activeIndex === 0
  const isLast = activeIndex === services.length - 1

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setActiveIndex(null)
    document.addEventListener('keydown', onKey)
    lockBodyScroll()
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockBodyScroll()
    }
  }, [open])

  // Direktlink aus dem Footer ("Support & Beratung") oeffnet das Detail
  // sofort mit dem eingebetteten Support-Formular, statt nur zum Abschnitt
  // zu scrollen.
  useEffect(() => {
    const onOpenSupport = () => {
      const i = services.findIndex((s) => s.id === 'support')
      if (i !== -1) setActiveIndex(i)
    }
    window.addEventListener('open-support-details', onOpenSupport)
    return () => window.removeEventListener('open-support-details', onOpenSupport)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i > 0 ? i - 1 : i))
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i < services.length - 1 ? i + 1 : i))
  }, [])

  const activeService = open ? services[activeIndex] : null
  const modalItem = activeService
    ? {
        key: activeService.id,
        eyebrow: t({ de: 'Leistung', en: 'Service', pl: 'Usługa' }),
        title: t(activeService.title),
        subtitle: t(activeService.subtitle),
        details: activeService.details.map(t),
        noteLabel: t(activeService.noteLabel),
        noteItems: activeService.noteItems.map(t),
        outcome: t(activeService.outcome),
        formType: activeService.id === 'support' ? 'support' : undefined,
      }
    : null

  const cardClass =
    'group cursor-pointer rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-cardHover'

  return (
    <section id="leistungen" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{t({ de: 'Leistungen', en: 'Services', pl: 'Usługi' })}</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {t({ de: 'Alles aus einer Hand — von der Idee bis zum Server.', en: 'Everything from a single source — from idea to server.', pl: 'Wszystko z jednej ręki — od pomysłu po serwer.' })}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            {t({
              de: 'Vier Bausteine, die zusammen eine Website ergeben, die nicht nur gut aussieht, sondern zuverlässig für Ihr Unternehmen arbeitet.',
              en: 'Four building blocks that together make a website that not only looks good but works reliably for your business.',
              pl: 'Cztery elementy, które razem tworzą stronę nie tylko dobrze wyglądającą, ale niezawodnie działającą dla Twojej firmy.',
            })}
          </p>
        </div>

        {isMobile ? (
          // Auf Mobile komplett ohne Framer Motion / Tilt — reine statische
          // Karten, kein Einflug, kein Hover-Rest-Effekt moeglich.
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div
                key={s.id}
                className={cardClass}
                role="button"
                tabIndex={0}
                aria-label={`${t({ de: 'Mehr Infos zu', en: 'More info on', pl: 'Więcej informacji o' })} ${t(s.title)}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIndex(i)
                  }
                }}
              >
                <ServiceCardContent s={s} t={t} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger(0.1)}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((s, i) => (
              <TiltCard
                key={s.id}
                variants={revealScale}
                className={cardClass}
                role="button"
                tabIndex={0}
                aria-label={`${t({ de: 'Mehr Infos zu', en: 'More info on', pl: 'Więcej informacji o' })} ${t(s.title)}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIndex(i)
                  }
                }}
              >
                <ServiceCardContent s={s} t={t} />
              </TiltCard>
            ))}
          </motion.div>
        )}
      </div>

      <DetailsModal
        item={modalItem}
        onClose={() => setActiveIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        onFinish={() => {
          setActiveIndex(null)
          window.dispatchEvent(new CustomEvent('open-project-modal'))
        }}
        isFirst={isFirst}
        isLast={isLast}
      />
    </section>
  )
}
