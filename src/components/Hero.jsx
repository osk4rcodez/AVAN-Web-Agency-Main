import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE, fadeUp, fadeDown, stagger } from './SectionReveal.jsx'
import ProjectScreenshot from './ProjectScreenshot.jsx'

const SHOTS = [0, 1, 2]

function HeroMockup() {
  const [idx, setIdx] = useState(0)
  const go = (dir) => setIdx((i) => (i + dir + SHOTS.length) % SHOTS.length)

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUp}
      className="relative mx-auto w-full max-w-[520px]"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-navy/10 via-accent/10 to-silver/20 blur-2xl" />
      <div className="animate-float rounded-2xl border border-navy/10 bg-white p-3 shadow-cardHover">
        <div className="overflow-hidden rounded-xl border border-navy/5 bg-mist">
          <div className="flex items-center gap-1.5 border-b border-navy/5 bg-white px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <div className="ml-3 h-5 flex-1 rounded-md bg-navy/5" />
          </div>
          <div className="relative aspect-[400/260]">
            {SHOTS.map((s) => (
              <motion.div
                key={s}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: s === idx ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <ProjectScreenshot index={s} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Vorheriges Beispiel"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 bg-white text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {SHOTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setIdx(s)}
              aria-label={`Beispiel ${s + 1} anzeigen`}
              className={`h-2 rounded-full transition-all ${
                s === idx ? 'w-6 bg-accent' : 'w-2 bg-silver/50 hover:bg-silver'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Nächstes Beispiel"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 bg-white text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 85% 0%, rgba(139,92,246,0.12), transparent 60%), radial-gradient(50% 50% at 10% 10%, rgba(46,26,71,0.06), transparent 60%)',
        }}
      />
      <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div initial="hidden" animate="show" variants={stagger(0.1)}>
          <motion.p variants={fadeDown} className="eyebrow mb-5">
            Websites · Entwicklung · Betreuung
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold leading-[1.02] text-navy"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Ihre Website.
            <br />
            Online.
            <br />
            <span className="text-accent">Betreut.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70"
          >
            AVAN entwickelt professionelle Websites für Unternehmen und übernimmt Hosting,
            Pflege und Support — damit Sie sich auf Ihr Geschäft konzentrieren können.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#kontakt" className="btn-neon text-base">
              Kostenloses Erstgespräch <ArrowUpRight size={18} />
            </a>
            <a
              href="#leistungen"
              className="group inline-flex items-center gap-1.5 text-base font-semibold text-navy transition-colors hover:text-accent"
            >
              Projekte ansehen
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </motion.div>

        <HeroMockup />
      </div>
    </section>
  )
}
