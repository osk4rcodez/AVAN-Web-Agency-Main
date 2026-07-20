import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { TiltCard } from './ui/tilt-card.jsx'
import { revealScale } from '../lib/motion-variants.js'
import { DetailsModal } from './ui/details-modal.jsx'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'
import { useMediaQuery } from '../lib/use-media-query.js'

const steps = [
  {
    number: '01',
    title: 'Erstgespräch',
    description:
      'Ziele und Anforderungen klären — wir hören zu, bevor wir bauen.',
    duration: 'ca. 30–45 Minuten',
    details: [
      'Kennenlernen: Ihr Unternehmen, Ihre Zielgruppe und was die Website leisten soll.',
      'Wir sichten vorhandene Materialien — Logo, Texte, Bilder, ggf. Ihre bestehende Seite.',
      'Grober Rahmen: Umfang, Zeitplan und Budget werden gemeinsam abgesteckt.',
    ],
    youProvide: ['Vorhandene Materialien (Logo, Texte, Bilder)', 'Referenzen oder Wunsch-Websites', 'Zugang zur bestehenden Seite, falls vorhanden'],
    outcome: 'Ein klares, unverbindliches Angebot mit Umfang, Zeitplan und Preis.',
  },
  {
    number: '02',
    title: 'Konzept & Design',
    description:
      'Struktur, Look & Feel, Freigabe. Sie sehen, was kommt, bevor wir entwickeln.',
    duration: 'ca. 1–2 Wochen',
    details: [
      'Seitenstruktur (Sitemap) und Wireframes auf Basis des Erstgesprächs.',
      'Visuelles Design: Farben, Typografie, Layout — abgestimmt auf Ihre Marke.',
      'Ein bis zwei Freigabeschleifen, bevor es in die Entwicklung geht.',
    ],
    youProvide: ['Feedback zu den Entwürfen', 'Finale Texte und Bilder, falls vorhanden'],
    outcome: 'Ein von Ihnen freigegebener Design-Entwurf — nichts wird gebaut, das Sie nicht vorher gesehen haben.',
  },
  {
    number: '03',
    title: 'Entwicklung & Launch',
    description:
      'Umsetzung, Test, Veröffentlichung — sauber und termingerecht.',
    duration: 'ca. 2–4 Wochen',
    details: [
      'Technische Umsetzung des freigegebenen Designs, responsiv für alle Geräte.',
      'Performance- und SEO-Grundlagen, Tests in verschiedenen Browsern.',
      'Einrichtung von Domain und Hosting, dann geht die Seite live.',
    ],
    youProvide: ['Finale Freigabe des Designs', 'Zugangsdaten zu Domain/Hosting, falls bereits vorhanden'],
    outcome: 'Ihre Website ist live und erreichbar.',
  },
  {
    number: '04',
    title: 'Laufende Betreuung',
    description:
      'Hosting, Updates, Support. Wir bleiben an Bord, wenn die Seite live ist.',
    duration: 'fortlaufend, kein Enddatum',
    details: [
      'Hosting, Sicherheits-Updates und regelmäßige Checks im Hintergrund.',
      'Kleinere Inhaltsänderungen übernehmen wir für Sie.',
      'Direkter Draht zu den Gründern bei Fragen oder Problemen — keine Ticket-Warteschlange.',
    ],
    youProvide: ['Bescheid geben, wenn sich etwas ändern soll'],
    outcome: 'Ihre Seite bleibt sicher, aktuell und erreichbar.',
  },
]

export default function Process() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    if (!detailsOpen) return
    const onKey = (e) => e.key === 'Escape' && setDetailsOpen(false)
    document.addEventListener('keydown', onKey)
    lockBodyScroll()
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockBodyScroll()
    }
  }, [detailsOpen])

  const goTo = useCallback(
    (next) => {
      setDirection(next > activeStep ? 1 : -1)
      setActiveStep(next)
    },
    [activeStep]
  )

  const handleNext = useCallback(() => {
    if (activeStep < steps.length - 1) {
      setDirection(1)
      setActiveStep((s) => s + 1)
    } else {
      window.dispatchEvent(new CustomEvent('open-project-modal'))
    }
  }, [activeStep])

  const handleBack = useCallback(() => {
    if (activeStep > 0) {
      setDirection(-1)
      setActiveStep((s) => s - 1)
    }
  }, [activeStep])

  const step = steps[activeStep]
  const isLast = activeStep === steps.length - 1

  const modalItem = detailsOpen
    ? {
        key: step.number,
        eyebrow: `Schritt ${step.number}`,
        title: step.title,
        subtitle: step.duration,
        details: step.details,
        noteLabel: 'Was wir von Ihnen brauchen',
        noteItems: step.youProvide,
        outcome: step.outcome,
      }
    : null

  return (
    <section id="ablauf" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Ablauf</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            In vier Schritten zur betreuten Website.
          </h2>
        </div>

        <div className="mt-16 max-w-xl mx-auto">
          {/* Progress dots */}
          <div className="mb-10 flex items-center justify-center gap-3" role="tablist" aria-label="Schritte">
            {steps.map((s, i) => {
              const done = i <= activeStep
              return (
                <button
                  key={s.number}
                  type="button"
                  aria-label={`Zu Schritt ${s.number} springen`}
                  aria-current={i === activeStep ? 'step' : undefined}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    done ? 'w-10 bg-accent' : 'w-6 bg-navy/15'
                  }`}
                />
              )
            })}
          </div>

          {/* Step panel (one at a time) */}
          {isMobile ? (
            // Auf Mobile komplett ohne Framer Motion: kein Einflug, kein
            // Slide-Uebergang zwischen den Schritten.
            <div
              className="glass-panel min-h-[16rem] cursor-pointer overflow-hidden rounded-3xl px-8 py-10 flex flex-col justify-center"
              aria-live="polite"
              role="button"
              tabIndex={0}
              aria-label={`Mehr Infos zu Schritt ${step.number}: ${step.title}`}
              onClick={() => setDetailsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setDetailsOpen(true)
                }
              }}
            >
              <div className="relative">
                <h3 className="relative z-10 text-3xl font-bold text-navy">
                  {step.title}
                </h3>
                <p className="relative z-10 mt-4 max-w-md text-base leading-relaxed text-ink/65">
                  {step.description}
                </p>
                <p className="relative z-10 mt-4 text-xs font-medium text-accent">
                  Mehr erfahren →
                </p>
              </div>

              <span className="sr-only">
                Schritt {activeStep + 1} von {steps.length}: {step.title}
              </span>
            </div>
          ) : (
            <TiltCard
              variants={revealScale}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="glass-panel min-h-[16rem] cursor-pointer overflow-hidden rounded-3xl px-8 py-10 flex flex-col justify-center"
              aria-live="polite"
              role="button"
              tabIndex={0}
              aria-label={`Mehr Infos zu Schritt ${step.number}: ${step.title}`}
              onClick={() => setDetailsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setDetailsOpen(true)
                }
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step.number}
                  custom={direction}
                  initial={{ opacity: 0, x: 40 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 * direction }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <h3 className="relative z-10 text-3xl font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="relative z-10 mt-4 max-w-md text-base leading-relaxed text-ink/65">
                    {step.description}
                  </p>
                  <p className="relative z-10 mt-4 text-xs font-medium text-accent">
                    Mehr erfahren →
                  </p>
                </motion.div>
              </AnimatePresence>

              <span className="sr-only">
                Schritt {activeStep + 1} von {steps.length}: {step.title}
              </span>
            </TiltCard>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <LiquidMetalButton
              label="Zurück"
              onClick={handleBack}
              disabled={activeStep === 0}
              className={activeStep === 0 ? 'opacity-50 pointer-events-none' : ''}
            >
              <ChevronLeft size={18} />
            </LiquidMetalButton>

            <LiquidMetalButton
              label={isLast ? 'Projekt starten' : 'Weiter'}
              onClick={handleNext}
              className="ml-auto"
            >
              {!isLast && <ChevronRight size={18} />}
            </LiquidMetalButton>
          </div>
        </div>
      </div>

      <DetailsModal
        item={modalItem}
        onClose={() => setDetailsOpen(false)}
        onPrev={handleBack}
        onNext={() => {
          if (activeStep < steps.length - 1) {
            setDirection(1)
            setActiveStep((s) => s + 1)
          }
        }}
        onFinish={() => {
          setDetailsOpen(false)
          window.dispatchEvent(new CustomEvent('open-project-modal'))
        }}
        isFirst={activeStep === 0}
        isLast={isLast}
      />
    </section>
  )
}
