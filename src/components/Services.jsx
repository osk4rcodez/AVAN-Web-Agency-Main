import { motion } from 'framer-motion'
import { Globe, Server, ShieldCheck, Headset } from 'lucide-react'
import { revealScale, stagger } from './SectionReveal.jsx'
import { TiltCard } from './ui/tilt-card.jsx'

const services = [
  {
    icon: Globe,
    title: 'Website-Entwicklung',
    desc: 'Individuelles Design & Umsetzung, maßgeschneidert auf das Unternehmen — keine Baukasten-Vorlagen.',
  },
  {
    icon: Server,
    title: 'Hosting & Bereitstellung',
    desc: 'Wir bringen die Seite zuverlässig online und halten sie am Laufen — performant und sicher.',
  },
  {
    icon: ShieldCheck,
    title: 'Wartung & Pflege',
    desc: 'Updates, Sicherheits-Checks, Inhalte pflegen — laufend, nicht einmalig.',
  },
  {
    icon: Headset,
    title: 'Support & Beratung',
    desc: 'Direkter Draht zu den Gründern, keine anonyme Hotline oder Ticket-Schlange.',
  },
]

export default function Services() {
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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.1)}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => {
            const Icon = s.icon
            return (
              <TiltCard
                key={s.title}
                variants={revealScale}
                className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-cardHover"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon size={24} strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.desc}</p>
              </TiltCard>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
