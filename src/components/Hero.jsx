import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { fadeUp, fadeDown, stagger } from '../lib/motion-variants.js'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'
import MotionToggle from './MotionToggle.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import { useTranslate } from '../lib/language-preference.jsx'

export default function Hero() {
  const t = useTranslate()

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 xl:pt-32 xl:pb-28 2xl:pt-40 2xl:pb-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 88% 5%, rgba(139,92,246,0.12), transparent 60%), radial-gradient(45% 45% at 6% 12%, rgba(46,26,71,0.06), transparent 60%)',
        }}
      />
      {/* Auf Mobile deckt Hero den globalen Linien-Hintergrund ab — nur der
          Streifen hinter der Navbar (oben, h-16) bleibt frei, damit das
          Muster dort weiter durchscheint. Leichter Fade am Uebergang statt
          hartem Schnitt. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-16 -z-10 md:hidden"
        style={{ background: 'linear-gradient(to bottom, transparent 0px, #ffffff 28px)' }}
      />
      <div className="container-px">
        <div className="pointer-events-none absolute -top-[8%] right-[2%] -z-10 h-[34vmin] max-h-[560px] min-h-[220px] w-[34vmin] min-w-[220px] max-w-[560px] rounded-full bg-accent/10 blur-3xl" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.1)}
          className="lg:mx-auto lg:max-w-3xl lg:text-center"
        >
          <motion.p variants={fadeDown} className="eyebrow mb-5">
            {t({ de: 'Websites · Entwicklung · Betreuung', en: 'Websites · Development · Support', pl: 'Strony · Rozwój · Opieka' })}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold leading-[1.02] text-navy"
            style={{ fontSize: 'clamp(2rem, 8vw, 5.5rem)' }}
          >
            {t({ de: 'Ihre Website.', en: 'Your website.', pl: 'Twoja strona.' })}{' '}
            <span className="hidden sm:inline">
              <br />
            </span>
            {t({ de: 'Online.', en: 'Online.', pl: 'Online.' })}{' '}
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="bg-gradient-to-r from-accent to-navy bg-clip-text text-transparent">
              {t({ de: 'Betreut.', en: 'Supported.', pl: 'Pod opieką.' })}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 lg:mx-auto"
          >
            {t({
              de: 'AVAN entwickelt professionelle Websites für Unternehmen und übernimmt Hosting, Pflege und Support — damit Sie sich auf Ihr Geschäft konzentrieren können.',
              en: 'AVAN builds professional websites for businesses and handles hosting, maintenance and support — so you can focus on your business.',
              pl: 'AVAN tworzy profesjonalne strony internetowe dla firm i przejmuje hosting, konserwację oraz wsparcie — abyście mogli skupić się na swoim biznesie.',
            })}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5 lg:justify-center">
            <a href="#kontakt" className="inline-flex" data-open-project-modal>
              <LiquidMetalButton label={t({ de: 'Erstgespräch', en: 'Free consultation', pl: 'Rozpocznij projekt' })} width={180} />
            </a>
              <a
                href="#showcase"
                className="group inline-flex items-center gap-1.5 text-base font-semibold text-navy transition-colors hover:text-accent"
              >
                {t({ de: 'Projekte ansehen', en: 'View projects', pl: 'Zobacz projekty' })}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
          </motion.div>

          {/* Animationen an/aus + Sprache: direkt im Hero sichtbar, statt nur
              in Navbar/Footer — auf Mobile sonst nur ueber das Menue erreichbar. */}
          <motion.div variants={fadeUp} className="mt-10 lg:flex lg:flex-col lg:items-center">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink/60 sm:text-base sm:font-bold">
                  {t({ de: 'Animationen', en: 'Animations', pl: 'Animacje' })}
                </span>
                <MotionToggle large />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink/60 sm:text-base sm:font-bold">
                  {t({ de: 'Sprache', en: 'Language', pl: 'Język' })}
                </span>
                <LanguageToggle />
              </div>
            </div>
            <p className="mt-2 text-xs text-ink/50 sm:text-sm sm:font-semibold">
              {t({
                de: 'Tipp: Animationen an, für ein flüssigeres AVAN Erlebnis.',
                en: 'Tip: turn animations on for a smoother AVAN experience.',
                pl: 'Wskazówka: włącz animacje, aby AVAN działało płynniej.',
              })}
            </p>
          </motion.div>

          {/* Feature-Zeile: dezente Vertrauenssignale */}
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 lg:justify-center"
          >
            {[
              { de: 'Festpreis, keine Überraschungen', en: 'Fixed price, no surprises', pl: 'Stała cena, bez niespodzianek' },
              { de: 'Hosting & Wartung inklusive', en: 'Hosting & maintenance included', pl: 'Hosting i konserwacja w cenie' },
              { de: 'Persönlich betreut', en: 'Personally supported', pl: 'Osobista opieka' },
            ].map((item) => (
              <li key={item.de} className="flex items-center gap-2 text-sm text-ink/70">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <Check size={13} strokeWidth={3} />
                </span>
                {t(item)}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
