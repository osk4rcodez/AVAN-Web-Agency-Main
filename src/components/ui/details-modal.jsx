import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '../../lib/motion-variants.js'
import { LiquidMetalButton } from './liquid-metal-button.jsx'
import SupportForm from '../SupportForm.jsx'

// Wiederverwendbares "Mehr-Infos"-Modal mit Weiter/Zurück-Navigation
// zwischen mehreren Eintraegen (Ablauf-Schritte, Leistungen, ...).
// item shape: { key, eyebrow, title, subtitle, details: string[],
//               noteLabel?, noteItems?: string[], outcome? }
export function DetailsModal({
  item,
  onClose,
  onPrev,
  onNext,
  onFinish,
  isFirst,
  isLast,
  finishLabel = 'Projekt starten',
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            style={{ transform: 'translateZ(0)' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Details: ${item.title}`}
            className="glass-panel relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl p-4 sm:rounded-3xl sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Schließen"
              className="absolute right-3 top-3 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-navy transition-colors hover:bg-accent hover:text-white sm:right-4 sm:top-4 sm:h-9 sm:w-9"
            >
              <X size={16} className="sm:hidden" />
              <X size={18} className="hidden sm:block" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {item.eyebrow && <p className="eyebrow mb-2">{item.eyebrow}</p>}
                <h3 className="font-display text-xl font-extrabold text-navy sm:text-3xl">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-1 text-sm font-medium text-accent">{item.subtitle}</p>
                )}

                <ul className="mt-5 space-y-2.5">
                  {item.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/70">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {item.noteItems && (
                  <div className="mt-5 rounded-2xl border border-navy/10 bg-white/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-silver">
                      {item.noteLabel}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {item.noteItems.map((n, i) => (
                        <li key={i} className="text-sm text-ink/65">
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.outcome && (
                  <p className="mt-5 text-sm font-medium text-navy">
                    Ergebnis: <span className="font-normal text-ink/70">{item.outcome}</span>
                  </p>
                )}

                {item.formType === 'support' && <SupportForm />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-navy/10 pt-5">
              <button
                type="button"
                onClick={onPrev}
                disabled={isFirst}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-accent disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Zurück
              </button>
              {isLast ? (
                <LiquidMetalButton label={finishLabel} onClick={onFinish} width={170} />
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-accent"
                >
                  Weiter
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
