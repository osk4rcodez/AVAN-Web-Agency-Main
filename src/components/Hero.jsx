import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { fadeUp, fadeDown, stagger } from '../lib/motion-variants.js'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'
import MotionToggle from './MotionToggle.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24 xl:pt-32 xl:pb-28 2xl:pt-40 2xl:pb-36">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 88% 5%, rgba(139,92,246,0.12), transparent 60%), radial-gradient(45% 45% at 6% 12%, rgba(46,26,71,0.06), transparent 60%)',
        }}
      />
      {/* Auf Mobile deckt Hero den globalen Linien-Hintergrund ab — nur der
          Streifen hinter der Navbar (oben, h-16) bleibt frei, damit das
          Muster dort weiter durchscheint. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-16 -z-10 bg-white md:hidden" />
      <div className="container-px">
        <div className="pointer-events-none absolute -top-[8%] right-[2%] -z-10 h-[34vmin] max-h-[560px] min-h-[220px] w-[34vmin] min-w-[220px] max-w-[560px] rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.1)}
          className="lg:mx-auto lg:max-w-3xl lg:text-center"
        >
          <motion.p variants={fadeDown} className="eyebrow mb-5">
            Websites · Entwicklung · Betreuung
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold leading-[1.02] text-navy"
            style={{ fontSize: 'clamp(2rem, 8vw, 5.5rem)' }}
          >
            Ihre Website.{' '}
            <span className="hidden sm:inline">
              <br />
            </span>
            Online.{' '}
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="bg-gradient-to-r from-accent to-navy bg-clip-text text-transparent">
              Betreut.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 lg:mx-auto"
          >
            AVAN entwickelt professionelle Websites für Unternehmen und übernimmt Hosting,
            Pflege und Support — damit Sie sich auf Ihr Geschäft konzentrieren können.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5 lg:justify-center">
            <a href="#kontakt" className="inline-flex" data-open-project-modal>
              <LiquidMetalButton label="Erstgespräch" width={180} />
            </a>
              <a
                href="#showcase"
                className="group inline-flex items-center gap-1.5 text-base font-semibold text-navy transition-colors hover:text-accent"
              >
                Projekte ansehen
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
          </motion.div>

          {/* Animationen an/aus: direkt im Hero sichtbar, statt nur in Navbar/Footer. */}
          <motion.div variants={fadeUp} className="mt-10 lg:flex lg:flex-col lg:items-center">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-ink/60 sm:text-base sm:font-bold">
                Animationen
              </span>
              <MotionToggle large />
            </div>
            <p className="mt-2 text-xs text-ink/50 sm:text-sm sm:font-semibold">
              Tipp: Animationen an, für ein flüssigeres AVAN Erlebnis.
            </p>
          </motion.div>

          {/* Feature-Zeile: dezente Vertrauenssignale */}
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 lg:justify-center"
          >
            {['Festpreis, keine Überraschungen', 'Hosting & Wartung inklusive', 'Persönlich betreut'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink/70">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ),
            )}
          </motion.ul>

          {/* Vertrauens-Karte: Gründer + Reaktionszeit */}
          <motion.div
            variants={fadeUp}
            className="mt-36 hidden items-center gap-4 rounded-2xl border border-navy/10 bg-white/60 p-3 pr-5 backdrop-blur-sm sm:inline-flex"
          >
            <div className="flex -space-x-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-accent to-navy text-sm font-bold text-white">
                A
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-navy to-accent text-sm font-bold text-white">
                V
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-navy">Direkt von den Gründern</p>
              <p className="text-xs text-ink/60">
                Antwort in der Regel innerhalb eines Tages
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
