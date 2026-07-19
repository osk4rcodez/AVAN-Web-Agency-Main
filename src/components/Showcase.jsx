import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, revealScale, stagger } from './SectionReveal.jsx'
import ProjectScreenshot from './ProjectScreenshot.jsx'
import { TiltCard } from './ui/tilt-card.jsx'

const projects = [
  {
    name: 'NORDWERK',
    type: 'Corporate Website',
    desc: 'Markenauftritt für ein norddeutsches Handwerksunternehmen — klar, schnell, auffindbar.',
  },
  {
    name: 'MERIDIAN',
    type: 'Landingpage',
    desc: 'Conversion-fokussierte Kampagnenseite mit klarem Call-to-Action und schneller Ladezeit.',
  },
  {
    name: 'LUMA STUDIO',
    type: 'Portfolio',
    desc: 'Eleganter Auftritt für ein Designstudio — Bild im Mittelpunkt, ruhige Typografie.',
  },
]

export default function Showcase() {
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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.1)}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p, i) => (
            <TiltCard
              key={p.name}
              variants={revealScale}
              className="group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-cardHover"
            >
              <div className="relative aspect-[400/260] overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                  <ProjectScreenshot index={i} rounded={false} />
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
      </div>
    </section>
  )
}
