import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, revealScale, stagger } from '../lib/motion-variants.js'
import ProjectScreenshot from './ProjectScreenshot.jsx'
import { TiltCard } from './ui/tilt-card.jsx'
import { SpadeHero } from './ui/spade-hero.jsx'
import { ClassicSalesPage } from './ui/classic-sales-page.jsx'
import { BookingSystemPage } from './ui/booking-system-page.jsx'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useMotionPreference } from '../lib/motion-preference.jsx'

const projects = [
  {
    name: 'Professionelle Seiten mit Animationen',
    type: 'Design',
    desc: 'Moderne, interaktive Websites mit durchdachten Animationen und Effekten — für Unternehmen, die auffallen wollen.',
  },
  {
    name: 'Klassische, verkaufsstarke Seiten',
    type: 'Conversion',
    desc: 'Reduziertes, klares Design, das auf Conversion ausgelegt ist — schnell, übersichtlich, ohne Ablenkung vom Wesentlichen.',
  },
  {
    name: 'Seiten mit Buchungssystem',
    type: 'Funktion',
    desc: 'Interaktive Seiten mit Buchungssystem — für Hotels und Betriebe, bei denen Kunden direkt online reservieren oder bestellen.',
  },
]

const LIVE_PREVIEWS = [SpadeHero, ClassicSalesPage, BookingSystemPage]

function ProjectCard({ p, i }) {
  const { reduceMotion } = useMotionPreference()
  // Nur bei angemachter Option (Animationen an): jede Karte zeigt eine echte
  // interaktive Live-Vorschau statt des statischen Platzhalters.
  const LivePreview = !reduceMotion ? LIVE_PREVIEWS[i] : null

  return (
    <>
      <div className="relative aspect-[400/260] overflow-hidden">
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
          <h3 className="text-lg font-bold text-navy">{p.name}</h3>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {p.type}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.desc}</p>
      </div>
    </>
  )
}

export default function Showcase() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const cardClass =
    'group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-cardHover'

  return (
    <section id="showcase" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Showcase</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ausgewählte Projekte.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            Eine Auswahl an Websites, die wir konzipiert, gebaut und betreuen. Echte Projekte
            folgen, sobald die ersten Mandate live sind.
          </p>
        </div>

        {isMobile ? (
          // Auf Mobile komplett ohne Framer Motion / Tilt — reine statische
          // Karten, kein Einflug, kein Hover-Rest-Effekt moeglich.
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <div key={p.name} className={cardClass}>
                <ProjectCard p={p} i={i} />
              </div>
            ))}
            <div className="group flex flex-col justify-center rounded-2xl border border-dashed border-navy/15 bg-white/50 p-6">
              <p className="font-display text-2xl font-extrabold text-navy/30">#4</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/45">
                Platzhalter für ein weiteres echtes Projekt.
              </p>
              <a
                href="#kontakt"
                className="group/link mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-navy"
              >
                Eigenes Projekt starten
                <ArrowUpRight
                  size={16}
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
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((p, i) => (
              <TiltCard key={p.name} variants={revealScale} className={cardClass}>
                <ProjectCard p={p} i={i} />
              </TiltCard>
            ))}

            {/* Noch-platzhalter-Karte im selben Stil */}
            <motion.article
              variants={fadeUp}
              className="group flex flex-col justify-center rounded-2xl border border-dashed border-navy/15 bg-white/50 p-6"
            >
              <p className="font-display text-2xl font-extrabold text-navy/30">#4</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/45">
                Platzhalter für ein weiteres echtes Projekt.
              </p>
              <a
                href="#kontakt"
                className="group/link mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-navy"
              >
                Eigenes Projekt starten
                <ArrowUpRight
                  size={16}
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
