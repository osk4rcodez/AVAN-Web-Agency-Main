import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Star } from 'lucide-react'

const NAV_LINKS = ['Zimmer', 'Restaurant', 'Wellness']

// Live-Vorschau fuer die Showcase-Kategorie "Seiten mit Buchungssystem" —
// realistische Hotel-Hero mit Bildhintergrund, Nav und ueberlappendem
// Buchungswidget. Nur bei "Animationen an" aktiv (siehe Showcase.jsx).
export function BookingSystemPage() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white font-sans text-navy">
      <div className="pointer-events-none absolute -right-10 -top-16 -z-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl sm:h-56 sm:w-56" />

      <header className="flex items-center justify-between px-3 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-accent" />
          <span className="text-[10px] font-bold tracking-wide sm:text-sm">Hotel AVAN</span>
        </div>
        <nav className="hidden items-center gap-4 text-[10px] text-navy/70 sm:flex sm:text-xs">
          {NAV_LINKS.map((link) => (
            <span key={link} className="transition-opacity hover:opacity-70">
              {link}
            </span>
          ))}
        </nav>
      </header>

      <div className="flex flex-1 flex-col justify-center px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-1.5 inline-flex w-fit items-center gap-1 rounded-full border border-navy/10 bg-white px-2 py-0.5 text-[8px] font-medium text-navy/60 shadow-sm sm:text-[10px]"
        >
          <Star size={9} className="fill-amber-400 text-amber-400" />
          4,8 · Direkt am See
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-[13rem] text-lg font-bold leading-[1.15] text-navy sm:max-w-sm sm:text-3xl"
        >
          Ihr Rückzugsort am Wasser.
        </motion.h1>
      </div>

      {/* Ueberlappendes Buchungswidget — typisches Hotelseiten-Muster */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mx-3 mb-3 rounded-xl border border-navy/10 bg-white p-2.5 text-navy shadow-cardHover sm:mx-6 sm:mb-5 sm:p-4"
      >
        <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wide text-ink/50 sm:text-xs">
          Verfügbarkeit prüfen
        </p>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex flex-1 items-center gap-1 rounded-lg border border-navy/10 bg-mist px-2 py-1.5 sm:px-3 sm:py-2">
            <CalendarDays size={12} className="shrink-0 text-accent" />
            <span className="text-[8px] text-ink/70 sm:text-xs">Anreise</span>
          </div>
          <div className="flex flex-1 items-center gap-1 rounded-lg border border-navy/10 bg-mist px-2 py-1.5 sm:px-3 sm:py-2">
            <CalendarDays size={12} className="shrink-0 text-accent" />
            <span className="text-[8px] text-ink/70 sm:text-xs">Abreise</span>
          </div>
          <button
            type="button"
            className="rounded-lg bg-navy px-3 py-1.5 text-[8px] font-semibold text-white transition-transform hover:scale-[1.03] sm:px-5 sm:py-2 sm:text-xs"
          >
            Suchen
          </button>
        </div>
      </motion.div>
    </div>
  )
}
