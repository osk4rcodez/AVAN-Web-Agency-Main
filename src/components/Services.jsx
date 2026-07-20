import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Server, ShieldCheck, Headset } from 'lucide-react'
import { revealScale, stagger } from '../lib/motion-variants.js'
import { TiltCard } from './ui/tilt-card.jsx'
import { DetailsModal } from './ui/details-modal.jsx'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'
import { useMediaQuery } from '../lib/use-media-query.js'

const services = [
  {
    icon: Globe,
    title: 'Website-Entwicklung',
    desc: 'Individuelles Design & Umsetzung, maßgeschneidert auf das Unternehmen — keine Baukasten-Vorlagen.',
    subtitle: 'Individuelles Design, kein Baukasten',
    details: [
      'Eigenes Konzept und Design, abgestimmt auf Ihre Marke — keine austauschbare Vorlage.',
      'Umsetzung mit modernen, schnellen Technologien statt aufgeblähtem Website-Baukasten.',
      'Responsive für Smartphone, Tablet und Desktop, von Anfang an mitgedacht.',
    ],
    noteLabel: 'Ideal für',
    noteItems: ['Neue Unternehmens-Website', 'Relaunch einer veralteten Seite', 'Landingpages für Kampagnen'],
    outcome: 'Eine Website, die zu Ihrem Unternehmen passt — technisch sauber und visuell eigenständig.',
  },
  {
    icon: Server,
    title: 'Hosting & Bereitstellung',
    desc: 'Wir bringen die Seite zuverlässig online und halten sie am Laufen — performant und sicher.',
    subtitle: 'Zuverlässig online, ohne dass Sie sich kümmern müssen',
    details: [
      'Einrichtung von Domain, Hosting und SSL-Zertifikat — startklar ohne technisches Vorwissen Ihrerseits.',
      'Performance-Optimierung, damit die Seite schnell lädt — wichtig für Nutzer und Google.',
      'Überwachung der Erreichbarkeit — wir merken es, bevor Ihre Kunden es merken.',
    ],
    noteLabel: 'Enthalten',
    noteItems: ['Domain- & SSL-Einrichtung', 'Server-Monitoring', 'Performance-Checks'],
    outcome: 'Ihre Seite ist erreichbar, schnell und technisch abgesichert.',
  },
  {
    icon: ShieldCheck,
    title: 'Wartung & Pflege',
    desc: 'Updates, Sicherheits-Checks, Inhalte pflegen — laufend, nicht einmalig.',
    subtitle: 'Laufend, nicht einmalig',
    details: [
      'Regelmäßige Sicherheits-Updates für Software und Plugins.',
      'Kleinere Inhaltsänderungen (Texte, Bilder, Preise) übernehmen wir auf Zuruf.',
      'Regelmäßige Backups, damit im Ernstfall nichts verloren geht.',
    ],
    noteLabel: 'Enthalten',
    noteItems: ['Sicherheits-Updates', 'Backups', 'Kleinere Textanpassungen'],
    outcome: 'Ihre Website bleibt aktuell, sicher und funktioniert dauerhaft zuverlässig.',
  },
  {
    icon: Headset,
    title: 'Support & Beratung',
    desc: 'Direkter Draht zu den Gründern, keine anonyme Hotline oder Ticket-Schlange.',
    subtitle: 'Direkter Draht zu den Gründern',
    details: [
      'Fragen und Änderungswünsche gehen direkt an Oskar oder Kasum — nicht in ein Ticket-System.',
      'Beratung bei neuen Ideen: Was lohnt sich, was nicht?',
      'Schnelle Reaktionszeiten, weil wir ein kleines, persönliches Team sind.',
    ],
    noteLabel: 'Erreichbar über',
    noteItems: ['avanwebagency@gmail.com', 'Persönliches Gespräch nach Bedarf'],
    outcome: 'Sie haben feste Ansprechpartner statt einer anonymen Hotline.',
  },
]

function ServiceCardContent({ s }) {
  const Icon = s.icon
  return (
    <>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon size={24} strokeWidth={2} />
      </span>
      <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.desc}</p>
      <p className="mt-4 text-xs font-medium text-accent">Mehr erfahren →</p>
    </>
  )
}

export default function Services() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [activeIndex, setActiveIndex] = useState(null)
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

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i > 0 ? i - 1 : i))
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i < services.length - 1 ? i + 1 : i))
  }, [])

  const activeService = open ? services[activeIndex] : null
  const modalItem = activeService
    ? {
        key: activeService.title,
        eyebrow: 'Leistung',
        title: activeService.title,
        subtitle: activeService.subtitle,
        details: activeService.details,
        noteLabel: activeService.noteLabel,
        noteItems: activeService.noteItems,
        outcome: activeService.outcome,
      }
    : null

  const cardClass =
    'group cursor-pointer rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-cardHover'

  return (
    <section id="leistungen" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Leistungen</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Alles aus einer Hand — von der Idee bis zum Server.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            Vier Bausteine, die zusammen eine Website ergeben, die nicht nur gut aussieht,
            sondern zuverlässig für Ihr Unternehmen arbeitet.
          </p>
        </div>

        {isMobile ? (
          // Auf Mobile komplett ohne Framer Motion / Tilt — reine statische
          // Karten, kein Einflug, kein Hover-Rest-Effekt moeglich.
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={cardClass}
                role="button"
                tabIndex={0}
                aria-label={`Mehr Infos zu ${s.title}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIndex(i)
                  }
                }}
              >
                <ServiceCardContent s={s} />
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
                key={s.title}
                variants={revealScale}
                className={cardClass}
                role="button"
                tabIndex={0}
                aria-label={`Mehr Infos zu ${s.title}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIndex(i)
                  }
                }}
              >
                <ServiceCardContent s={s} />
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
