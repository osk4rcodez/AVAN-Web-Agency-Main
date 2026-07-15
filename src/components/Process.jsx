import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { fadeUp, stagger } from './SectionReveal.jsx'

const steps = [
  {
    n: '01',
    title: 'Erstgespräch',
    desc: 'Ziele und Anforderungen klären — wir hören zu, bevor wir bauen.',
  },
  {
    n: '02',
    title: 'Konzept & Design',
    desc: 'Struktur, Look & Feel, Freigabe. Sie sehen, was kommt, bevor wir entwickeln.',
  },
  {
    n: '03',
    title: 'Entwicklung & Launch',
    desc: 'Umsetzung, Test, Veröffentlichung — sauber und termingerecht.',
  },
  {
    n: '04',
    title: 'Laufende Betreuung',
    desc: 'Hosting, Updates, Support. Wir bleiben an Bord, wenn die Seite live ist.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  })
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 })

  return (
    <section id="ablauf" className="section bg-mist">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Ablauf</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            In vier Schritten zur betreuten Website.
          </h2>
        </div>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-navy/10 lg:block" />
          <motion.div
            className="absolute left-0 right-0 top-9 hidden h-px origin-left bg-accent lg:block"
            style={{ scaleX }}
          />

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger(0.15)}
            className="grid gap-12 lg:grid-cols-4 lg:gap-8"
          >
            {steps.map((s) => (
              <motion.li key={s.n} variants={fadeUp} className="relative">
                <div className="relative">
                  <span className="pointer-events-none absolute -top-9 left-0 select-none font-display text-7xl font-extrabold leading-none text-navy/10">
                    {s.n}
                  </span>
                  <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent bg-white text-sm font-bold text-accent">
                    {s.n}
                  </span>
                </div>
                <h3 className="relative z-10 mt-6 text-lg font-bold text-navy">{s.title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-ink/65">
                  {s.desc}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
