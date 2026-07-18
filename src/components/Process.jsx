import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Erstgespräch',
    description:
      'Ziele und Anforderungen klären — wir hören zu, bevor wir bauen.',
  },
  {
    number: '02',
    title: 'Konzept & Design',
    description:
      'Struktur, Look & Feel, Freigabe. Sie sehen, was kommt, bevor wir entwickeln.',
  },
  {
    number: '03',
    title: 'Entwicklung & Launch',
    description:
      'Umsetzung, Test, Veröffentlichung — sauber und termingerecht.',
  },
  {
    number: '04',
    title: 'Laufende Betreuung',
    description:
      'Hosting, Updates, Support. Wir bleiben an Bord, wenn die Seite live ist.',
  },
]

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(1)

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

  return (
    <section id="ablauf" className="section bg-mist">
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
          <div
            className="glass-panel relative min-h-[16rem] overflow-hidden rounded-3xl px-8 py-10 flex flex-col justify-center"
            aria-live="polite"
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
              </motion.div>
            </AnimatePresence>

            <span className="sr-only">
              Schritt {activeStep + 1} von {steps.length}: {step.title}
            </span>
          </div>

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
    </section>
  )
}
