import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { TiltCard } from './ui/tilt-card.jsx'
import { revealScale } from '../lib/motion-variants.js'
import { DetailsModal } from './ui/details-modal.jsx'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useTranslate } from '../lib/language-preference.jsx'

const steps = [
  {
    number: '01',
    title: { de: 'Erstgespräch', en: 'Initial consultation', pl: 'Pierwsza rozmowa' },
    description: {
      de: 'Ziele und Anforderungen klären — wir hören zu, bevor wir bauen.',
      en: 'Clarifying goals and requirements — we listen before we build.',
      pl: 'Wyjaśniamy cele i wymagania — słuchamy, zanim zaczniemy budować.',
    },
    duration: { de: 'ca. 30–45 Minuten', en: 'approx. 30–45 minutes', pl: 'ok. 30–45 minut' },
    details: [
      {
        de: 'Kennenlernen: Ihr Unternehmen, Ihre Zielgruppe und was die Website leisten soll.',
        en: 'Getting to know each other: your business, your target audience and what the website should achieve.',
        pl: 'Poznajemy się: Twoja firma, grupa docelowa i to, co strona ma osiągnąć.',
      },
      {
        de: 'Wir sichten vorhandene Materialien — Logo, Texte, Bilder, ggf. Ihre bestehende Seite.',
        en: 'We review existing materials — logo, texts, images, and your existing site if you have one.',
        pl: 'Przeglądamy dostępne materiały — logo, teksty, zdjęcia, ewentualnie Twoją obecną stronę.',
      },
      {
        de: 'Grober Rahmen: Umfang, Zeitplan und Budget werden gemeinsam abgesteckt.',
        en: 'Rough framework: scope, timeline and budget are outlined together.',
        pl: 'Ogólne ramy: wspólnie ustalamy zakres, harmonogram i budżet.',
      },
    ],
    youProvide: [
      { de: 'Vorhandene Materialien (Logo, Texte, Bilder)', en: 'Existing materials (logo, texts, images)', pl: 'Dostępne materiały (logo, teksty, zdjęcia)' },
      { de: 'Referenzen oder Wunsch-Websites', en: 'References or websites you like', pl: 'Referencje lub strony, które Ci się podobają' },
      { de: 'Zugang zur bestehenden Seite, falls vorhanden', en: 'Access to your existing site, if any', pl: 'Dostęp do obecnej strony, jeśli istnieje' },
    ],
    outcome: {
      de: 'Ein klares, unverbindliches Angebot mit Umfang, Zeitplan und Preis.',
      en: 'A clear, no-obligation offer with scope, timeline and price.',
      pl: 'Jasna, niezobowiązująca oferta z zakresem, harmonogramem i ceną.',
    },
  },
  {
    number: '02',
    title: { de: 'Konzept & Design', en: 'Concept & design', pl: 'Koncepcja i design' },
    description: {
      de: 'Struktur, Look & Feel, Freigabe. Sie sehen, was kommt, bevor wir entwickeln.',
      en: 'Structure, look & feel, sign-off. You see what’s coming before we develop.',
      pl: 'Struktura, wygląd i styl, akceptacja. Widzisz efekt, zanim zaczniemy programować.',
    },
    duration: { de: 'ca. 1–2 Wochen', en: 'approx. 1–2 weeks', pl: 'ok. 1–2 tygodnie' },
    details: [
      {
        de: 'Seitenstruktur (Sitemap) und Wireframes auf Basis des Erstgesprächs.',
        en: 'Site structure (sitemap) and wireframes based on the initial consultation.',
        pl: 'Struktura strony (mapa) i makiety na podstawie pierwszej rozmowy.',
      },
      {
        de: 'Visuelles Design: Farben, Typografie, Layout — abgestimmt auf Ihre Marke.',
        en: 'Visual design: colors, typography, layout — tailored to your brand.',
        pl: 'Design wizualny: kolory, typografia, układ — dopasowane do Twojej marki.',
      },
      {
        de: 'Ein bis zwei Freigabeschleifen, bevor es in die Entwicklung geht.',
        en: 'One or two review rounds before development begins.',
        pl: 'Jedna lub dwie rundy akceptacji, zanim zaczniemy programowanie.',
      },
    ],
    youProvide: [
      { de: 'Feedback zu den Entwürfen', en: 'Feedback on the drafts', pl: 'Informacja zwrotna do projektów' },
      { de: 'Finale Texte und Bilder, falls vorhanden', en: 'Final texts and images, if available', pl: 'Finalne teksty i zdjęcia, jeśli są dostępne' },
    ],
    outcome: {
      de: 'Ein von Ihnen freigegebener Design-Entwurf — nichts wird gebaut, das Sie nicht vorher gesehen haben.',
      en: 'A design draft approved by you — nothing gets built that you haven’t seen beforehand.',
      pl: 'Zaakceptowany przez Ciebie projekt — nic nie powstaje bez Twojej wcześniejszej zgody.',
    },
  },
  {
    number: '03',
    title: { de: 'Entwicklung & Launch', en: 'Development & launch', pl: 'Rozwój i uruchomienie' },
    description: {
      de: 'Umsetzung, Test, Veröffentlichung — sauber und termingerecht.',
      en: 'Implementation, testing, release — clean and on schedule.',
      pl: 'Realizacja, testy, publikacja — solidnie i na czas.',
    },
    duration: { de: 'ca. 2–4 Wochen', en: 'approx. 2–4 weeks', pl: 'ok. 2–4 tygodnie' },
    details: [
      {
        de: 'Technische Umsetzung des freigegebenen Designs, responsiv für alle Geräte.',
        en: 'Technical implementation of the approved design, responsive for all devices.',
        pl: 'Techniczna realizacja zaakceptowanego designu, responsywna na wszystkich urządzeniach.',
      },
      {
        de: 'Performance- und SEO-Grundlagen, Tests in verschiedenen Browsern.',
        en: 'Performance and SEO fundamentals, testing across different browsers.',
        pl: 'Podstawy wydajności i SEO, testy w różnych przeglądarkach.',
      },
      {
        de: 'Einrichtung von Domain und Hosting, dann geht die Seite live.',
        en: 'Setting up domain and hosting, then the site goes live.',
        pl: 'Konfiguracja domeny i hostingu, a następnie uruchomienie strony.',
      },
    ],
    youProvide: [
      { de: 'Finale Freigabe des Designs', en: 'Final approval of the design', pl: 'Ostateczna akceptacja projektu' },
      { de: 'Zugangsdaten zu Domain/Hosting, falls bereits vorhanden', en: 'Domain/hosting credentials, if you already have them', pl: 'Dane dostępowe do domeny/hostingu, jeśli już je masz' },
    ],
    outcome: { de: 'Ihre Website ist live und erreichbar.', en: 'Your website is live and reachable.', pl: 'Twoja strona jest uruchomiona i dostępna.' },
  },
  {
    number: '04',
    title: { de: 'Laufende Betreuung', en: 'Ongoing support', pl: 'Bieżąca opieka' },
    description: {
      de: 'Hosting, Updates, Support. Wir bleiben an Bord, wenn die Seite live ist.',
      en: 'Hosting, updates, support. We stay on board once the site is live.',
      pl: 'Hosting, aktualizacje, wsparcie. Zostajemy z Tobą, gdy strona jest już uruchomiona.',
    },
    duration: { de: 'fortlaufend, kein Enddatum', en: 'ongoing, no end date', pl: 'ciągle, bez daty końcowej' },
    details: [
      {
        de: 'Hosting, Sicherheits-Updates und regelmäßige Checks im Hintergrund.',
        en: 'Hosting, security updates and regular checks in the background.',
        pl: 'Hosting, aktualizacje bezpieczeństwa i regularne kontrole w tle.',
      },
      {
        de: 'Kleinere Inhaltsänderungen übernehmen wir für Sie.',
        en: 'We handle minor content changes for you.',
        pl: 'Drobne zmiany treści wprowadzamy za Ciebie.',
      },
      {
        de: 'Direkter Draht zu den Gründern bei Fragen oder Problemen — keine Ticket-Warteschlange.',
        en: 'A direct line to the founders for questions or issues — no ticket queue.',
        pl: 'Bezpośredni kontakt z założycielami w razie pytań lub problemów — bez kolejki zgłoszeń.',
      },
    ],
    youProvide: [{ de: 'Bescheid geben, wenn sich etwas ändern soll', en: 'Let us know when something needs to change', pl: 'Dać znać, gdy coś ma się zmienić' }],
    outcome: {
      de: 'Ihre Seite bleibt sicher, aktuell und erreichbar.',
      en: 'Your site stays secure, up to date and reachable.',
      pl: 'Twoja strona pozostaje bezpieczna, aktualna i dostępna.',
    },
  },
]

export default function Process() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const t = useTranslate()

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
        eyebrow: `${t({ de: 'Schritt', en: 'Step', pl: 'Krok' })} ${step.number}`,
        title: t(step.title),
        subtitle: t(step.duration),
        details: step.details.map(t),
        noteLabel: t({ de: 'Was wir von Ihnen brauchen', en: 'What we need from you', pl: 'Czego od Ciebie potrzebujemy' }),
        noteItems: step.youProvide.map(t),
        outcome: t(step.outcome),
      }
    : null

  return (
    <section id="ablauf" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{t({ de: 'Ablauf', en: 'Process', pl: 'Proces' })}</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {t({ de: 'In vier Schritten zur betreuten Website.', en: 'Four steps to a fully supported website.', pl: 'W czterech krokach do w pełni obsługiwanej strony.' })}
          </h2>
        </div>

        <div className="mt-16 max-w-xl mx-auto">
          <div className="mb-10 flex items-center justify-center gap-3" role="tablist" aria-label={t({ de: 'Schritte', en: 'Steps', pl: 'Kroki' })}>
            {steps.map((s, i) => {
              const done = i <= activeStep
              return (
                <button
                  key={s.number}
                  type="button"
                  aria-label={`${t({ de: 'Zu Schritt', en: 'Go to step', pl: 'Przejdź do kroku' })} ${s.number}`}
                  aria-current={i === activeStep ? 'step' : undefined}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    done ? 'w-10 bg-accent' : 'w-6 bg-navy/15'
                  }`}
                />
              )
            })}
          </div>

          {isMobile ? (
            <div
              className="glass-panel min-h-[16rem] cursor-pointer overflow-hidden rounded-3xl px-8 py-10 flex flex-col justify-center"
              aria-live="polite"
              role="button"
              tabIndex={0}
              aria-label={`${t({ de: 'Mehr Infos zu Schritt', en: 'More info on step', pl: 'Więcej informacji o kroku' })} ${step.number}: ${t(step.title)}`}
              onClick={() => setDetailsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setDetailsOpen(true)
                }
              }}
            >
              <div className="relative">
                <h3 className="relative z-10 text-3xl font-bold text-navy">{t(step.title)}</h3>
                <p className="relative z-10 mt-4 max-w-md text-base leading-relaxed text-ink/65">{t(step.description)}</p>
                <p className="relative z-10 mt-4 text-xs font-medium text-accent">{t({ de: 'Mehr erfahren →', en: 'Learn more →', pl: 'Dowiedz się więcej →' })}</p>
              </div>

              <span className="sr-only">
                {t({ de: 'Schritt', en: 'Step', pl: 'Krok' })} {activeStep + 1} {t({ de: 'von', en: 'of', pl: 'z' })} {steps.length}: {t(step.title)}
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
              aria-label={`${t({ de: 'Mehr Infos zu Schritt', en: 'More info on step', pl: 'Więcej informacji o kroku' })} ${step.number}: ${t(step.title)}`}
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
                  <h3 className="relative z-10 text-3xl font-bold text-navy">{t(step.title)}</h3>
                  <p className="relative z-10 mt-4 max-w-md text-base leading-relaxed text-ink/65">{t(step.description)}</p>
                  <p className="relative z-10 mt-4 text-xs font-medium text-accent">{t({ de: 'Mehr erfahren →', en: 'Learn more →', pl: 'Dowiedz się więcej →' })}</p>
                </motion.div>
              </AnimatePresence>

              <span className="sr-only">
                {t({ de: 'Schritt', en: 'Step', pl: 'Krok' })} {activeStep + 1} {t({ de: 'von', en: 'of', pl: 'z' })} {steps.length}: {t(step.title)}
              </span>
            </TiltCard>
          )}

          <div className="mt-8 flex items-center justify-between gap-4">
            <LiquidMetalButton
              label={t({ de: 'Zurück', en: 'Back', pl: 'Wstecz' })}
              onClick={handleBack}
              disabled={activeStep === 0}
              className={activeStep === 0 ? 'opacity-50 pointer-events-none' : ''}
            >
              <ChevronLeft size={18} />
            </LiquidMetalButton>

            <LiquidMetalButton
              label={isLast ? t({ de: 'Projekt starten', en: 'Start project', pl: 'Rozpocznij projekt' }) : t({ de: 'Weiter', en: 'Next', pl: 'Dalej' })}
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
