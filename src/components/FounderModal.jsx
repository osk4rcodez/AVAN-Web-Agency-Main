import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { EASE } from '../lib/motion-variants.js'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'

const FOUNDERS = {
  oskar: {
    name: 'Oskar Kielek',
    role: 'Entwicklung, Technik & Design',
    photo: '/oskar-kielek.jpg',
    bio: [
      'Oskar kümmert sich bei AVAN um alles, was unter der Haube passiert: sauberer Code, performante Websites und durchdachtes Design. Er sorgt dafür, dass Ihre Seite nicht nur gut aussieht, sondern auch schnell lädt und technisch auf dem neuesten Stand bleibt.',
      'Sein Fokus: Websites, die funktionieren — auf jedem Gerät, in jeder Browser-Situation. Von der ersten Zeile HTML bis zum Live-Gang auf dem Server.',
    ],
    focus: ['Frontend & Backend', 'Performance', 'UI/UX Design'],
  },
  kasum: {
    name: 'Kasum Caka',
    role: 'Entwicklung, Design & Kundenbetreuung',
    photo: '/kasum-caka.jpg',
    bio: [
      'Kasum ist der direkte Ansprechpartner für unsere Kunden. Er verbindet technisches Verständnis mit einem echten Gespür dafür, was ein Unternehmen braucht — und übersetzt Ihre Wünsche in ein Design, das passt.',
      'Bei AVAN ist er derjenige, der den Kontakt hält: vom ersten Gespräch über den Launch bis zur laufenden Betreuung. Bei Kasum landen Ihre Fragen nicht in einem Ticket-System, sondern bei einem Menschen, der die Antwort kennt.',
    ],
    focus: ['Kundenbetreuung', 'Webdesign', 'Projektbegleitung'],
  },
}

export default function FounderModal() {
  const [founderKey, setFounderKey] = useState(null)
  const open = Boolean(founderKey)
  const founder = founderKey ? FOUNDERS[founderKey] : null

  useEffect(() => {
    const onEvent = (e) => setFounderKey(e?.detail?.key ?? null)
    const onClick = (e) => {
      const el = e.target.closest?.('[data-open-founder]')
      if (el) {
        e.preventDefault()
        setFounderKey(el.getAttribute('data-open-founder'))
      }
    }
    window.addEventListener('open-founder', onEvent)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('open-founder', onEvent)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setFounderKey(null)
    document.addEventListener('keydown', onKey)
    lockBodyScroll()
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockBodyScroll()
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && founder && (
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
            onClick={() => setFounderKey(null)}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Über ${founder.name}`}
            className="glass-panel relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => setFounderKey(null)}
              aria-label="Schließen"
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-navy transition-colors hover:bg-accent hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
              <div className="relative h-56 w-full overflow-hidden bg-navy/10 sm:h-full">
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent sm:bg-gradient-to-r" />
              </div>

              <div className="p-6 sm:p-8">
                <p className="eyebrow mb-2">Gründer</p>
                <h3 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {founder.role}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {founder.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-navy"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink/70">
                  {founder.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <a
                  href="#kontakt"
                  data-open-project-modal
                  onClick={() => setFounderKey(null)}
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-accent"
                >
                  Projekt besprechen
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
