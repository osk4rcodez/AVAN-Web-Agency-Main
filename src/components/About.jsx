import { motion } from 'framer-motion'
import { fadeUp, stagger } from './SectionReveal.jsx'

function FounderCard({ photo, name, role, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-cardHover"
    >
      <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-2xl">
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/25" />
      </div>
      <p className="font-bold text-navy">{name}</p>
      <p className="text-sm text-ink/60">{role}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="ueber-uns" className="section">
      <motion.div
        className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger(0.1)}
      >
        <motion.div variants={fadeUp}>
          <p className="eyebrow mb-4">Über uns</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Zwei Gründer. Direkter Kontakt. Keine Hotline.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            AVAN wurde von Oskar Kielek und Kasum Caka gegründet — mit dem Ziel, Unternehmen
            einen unkomplizierten, persönlichen Zugang zu professionellen Websites zu bieten.
            Kein Callcenter, keine anonymen Tickets: bei AVAN sprechen Sie direkt mit den
            Menschen, die Ihre Website bauen und betreuen.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Wir sind ein junges Team — und genau das ist unser Vorteil: kurze Reaktionszeiten,
            flache Hierarchien und echtes Interesse an Ihrem Projekt. Sie bekommen keine
            Abteilung, Sie bekommen die Gründer.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
          <FounderCard
            photo="/oskar-kielek.jpg"
            name="Oskar Kielek"
            role="Entwicklung, Technik & Design"
            delay={0}
          />
          <FounderCard
            photo="/kasum-caka.jpg"
            name="Kasum Caka"
            role="Entwicklung, Design & Kundenbetreuung"
            delay={0.1}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
