import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, slideInRight, stagger } from '../lib/motion-variants.js'
import ProjectScreenshot from './ProjectScreenshot.jsx'
import { TiltCard } from './ui/tilt-card.jsx'
import { SpadeHero } from './ui/spade-hero.jsx'
import { ClassicSalesPage } from './ui/classic-sales-page.jsx'
import { BookingSystemPage } from './ui/booking-system-page.jsx'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useMotionPreference } from '../lib/motion-preference.jsx'
import { useTranslate } from '../lib/language-preference.jsx'

const projects = [
  {
    id: 'design',
    name: { de: 'Professionelle Seiten mit Animationen', en: 'Professional pages with animations' },
    type: { de: 'Design', en: 'Design' },
    desc: {
      de: 'Moderne, interaktive Websites mit durchdachten Animationen und Effekten — für Unternehmen, die auffallen wollen.',
      en: 'Modern, interactive websites with thoughtful animations and effects — for businesses that want to stand out.',
    },
  },
  {
    id: 'conversion',
    name: { de: 'Klassische, verkaufsstarke Seiten', en: 'Classic, high-converting pages' },
    type: { de: 'Conversion', en: 'Conversion' },
    desc: {
      de: 'Reduziertes, klares Design, das auf Conversion ausgelegt ist — schnell, übersichtlich, ohne Ablenkung vom Wesentlichen.',
      en: 'Reduced, clear design built for conversion — fast, clear, no distraction from what matters.',
    },
  },
  {
    id: 'booking',
    name: { de: 'Seiten mit Buchungssystem', en: 'Pages with a booking system' },
    type: { de: 'Funktion', en: 'Function' },
    desc: {
      de: 'Interaktive Seiten mit Buchungssystem — für Hotels und Betriebe, bei denen Kunden direkt online reservieren oder bestellen.',
      en: 'Interactive pages with a booking system — for hotels and businesses where customers book or order directly online.',
    },
  },
]

const LIVE_PREVIEWS = [SpadeHero, ClassicSalesPage, BookingSystemPage]

function ProjectCard({ p, i }) {
  const { reduceMotion } = useMotionPreference()
  const t = useTranslate()
  // Nur bei angemachter Option (Animationen an): jede Karte zeigt eine echte
  // interaktive Live-Vorschau statt des statischen Platzhalters.
  const LivePreview = !reduceMotion ? LIVE_PREVIEWS[i] : null

  return (
    <>
      <div className="relative aspect-[400/230] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
          {LivePreview ? (
            <LivePreview compact />
          ) : (
            <ProjectScreenshot index={i} rounded={false} />
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-navy">{t(p.name)}</h3>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {t(p.type)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{t(p.desc)}</p>
      </div>
    </>
  )
}

export default function Showcase() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { reduceMotion } = useMotionPreference()
  const t = useTranslate()
  const cardClass =
    'group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-cardHover'

  return (
    <section id="showcase" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{t({ de: 'Showcase', en: 'Showcase' })}</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {t({ de: 'Ausgewählte Projekte.', en: 'Selected projects.' })}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            {t({
              de: 'Beispiel-Hero-Sektionen, die drei Stile zeigen, die wir umsetzen können. Echte Kundenprojekte folgen, sobald die ersten Mandate live sind.',
              en: 'Example hero sections showing three styles we can build. Real client projects will follow as soon as the first mandates go live.',
            })}
          </p>
        </div>

        {isMobile ? (
          // Auf Mobile komplett ohne Framer Motion / Tilt — reine statische
          // Karten, kein Einflug, kein Hover-Rest-Effekt moeglich.
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <div key={p.id} className={cardClass}>
                <ProjectCard p={p} i={i} />
              </div>
            ))}
            <div className="group flex flex-col justify-center rounded-2xl border border-dashed border-navy/15 bg-white/50 p-6">
              <p className="font-display text-4xl font-extrabold text-navy/30">#4</p>
              <p className="mt-3 text-lg leading-relaxed text-ink/45">
                {t({ de: 'Platzhalter für ein weiteres echtes Projekt.', en: 'Placeholder for another real project.' })}
              </p>
              <a
                href="#kontakt"
                className="group/link mt-5 inline-flex w-fit items-center gap-1.5 text-base font-semibold text-accent transition-colors hover:text-navy"
              >
                {t({ de: 'Eigenes Projekt starten', en: 'Start your own project' })}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger(0.1)}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            {projects.map((p, i) => (
              <TiltCard
                key={p.id}
                variants={reduceMotion ? undefined : slideInRight}
                className={cardClass}
              >
                <ProjectCard p={p} i={i} />
              </TiltCard>
            ))}

            {/* Noch-platzhalter-Karte im selben Stil */}
            <motion.article
              variants={fadeUp}
              className="group flex flex-col justify-center rounded-2xl border border-dashed border-navy/15 bg-white/50 p-6"
            >
              <p className="font-display text-4xl font-extrabold text-navy/30">#4</p>
              <p className="mt-3 text-lg leading-relaxed text-ink/45">
                {t({ de: 'Platzhalter für ein weiteres echtes Projekt.', en: 'Placeholder for another real project.' })}
              </p>
              <a
                href="#kontakt"
                className="group/link mt-5 inline-flex w-fit items-center gap-1.5 text-base font-semibold text-accent transition-colors hover:text-navy"
              >
                {t({ de: 'Eigenes Projekt starten', en: 'Start your own project' })}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            </motion.article>
          </motion.div>
        )}
      </div>
    </section>
  )
}
