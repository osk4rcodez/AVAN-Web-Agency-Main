import { motion } from 'framer-motion'
import { ArrowRight, Check, Star } from 'lucide-react'
import Logo from '../Logo.jsx'
import { useTranslate } from '../../lib/language-preference.jsx'

const NAV_LINKS = [
  { de: 'Leistungen', en: 'Services', pl: 'Usługi' },
  { de: 'Preise', en: 'Pricing', pl: 'Cennik' },
  { de: 'Referenzen', en: 'References', pl: 'Referencje' },
]

// Live-Vorschau fuer die Showcase-Kategorie "Klassische, verkaufsstarke
// Seiten" — vollstaendige, reduzierte Sales-Hero mit Nav, klarer Botschaft
// und einem CTA. Nur bei "Animationen an" aktiv (siehe Showcase.jsx).
export function ClassicSalesPage() {
  const t = useTranslate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white font-sans text-navy">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-mist via-white to-lilac/40" />
      <div className="pointer-events-none absolute -right-10 -top-16 -z-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl sm:h-56 sm:w-56" />

      <header className="flex items-center justify-between px-3 py-2 sm:px-6 sm:py-4">
        <div className="scale-75 origin-left sm:scale-100">
          <Logo size={22} />
        </div>
        <nav className="hidden items-center gap-4 text-xs text-navy/70 sm:flex">
          {NAV_LINKS.map((link) => (
            <span key={link.de} className="transition-opacity hover:opacity-60">
              {t(link)}
            </span>
          ))}
        </nav>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 text-center sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1 rounded-full border border-navy/10 bg-white px-2.5 py-1 text-[8px] font-semibold text-navy/60 shadow-sm sm:text-[10px]"
        >
          <Star size={10} className="fill-amber-400 text-amber-400" />
          {t({ de: '4,9/5 aus über 60 Bewertungen', en: '4.9/5 from over 60 reviews', pl: '4,9/5 z ponad 60 opinii' })}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 max-w-[16rem] text-lg font-extrabold leading-[1.1] tracking-tight text-navy sm:max-w-xs sm:text-xl"
        >
          {t({ de: 'Mehr Anfragen.', en: 'More inquiries.', pl: 'Więcej zapytań.' })}
          <br />
          {t({ de: 'Weniger Aufwand.', en: 'Less effort.', pl: 'Mniej wysiłku.' })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2.5 max-w-[14rem] text-[9px] leading-relaxed text-ink/60 sm:max-w-xs sm:text-xs"
        >
          {t({
            de: 'Eine klare Seite, ein klares Ziel — Ihre Kunden finden in Sekunden, was sie suchen.',
            en: 'One clear page, one clear goal — your customers find what they need in seconds.',
            pl: 'Jedna przejrzysta strona, jeden jasny cel — Twoi klienci w sekundę znajdą to, czego szukają.',
          })}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="#kontakt"
          data-open-project-modal
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2 text-[10px] font-semibold text-white shadow-md transition-transform hover:scale-105 sm:px-6 sm:py-2.5 sm:text-xs"
        >
          {t({ de: 'Jetzt unverbindlich anfragen', en: 'Inquire now, no obligation', pl: 'Zapytaj teraz, bez zobowiązań' })}
          <ArrowRight size={13} />
        </motion.a>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-5"
        >
          {[
            { de: 'Festpreis', en: 'Fixed price', pl: 'Stała cena' },
            { de: 'Ohne Risiko', en: 'No risk', pl: 'Bez ryzyka' },
            { de: 'Schnell online', en: 'Quick to launch', pl: 'Szybko online' },
          ].map((item) => (
            <li key={item.de} className="flex items-center gap-1 text-[8px] text-ink/60 sm:text-[10px]">
              <Check size={11} className="text-accent" strokeWidth={3} />
              {t(item)}
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}
