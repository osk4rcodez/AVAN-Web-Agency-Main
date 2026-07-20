import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '../lib/motion-variants.js'

/**
 * Eingebetteter Liquid-Glass-Kalender + Zeitfenster-Auswahl.
 * Nutzt ausschließlich vorhandene Tokens (navy, accent, silver, ink, mist).
 *
 * Props:
 *  - selectedDay:  Date | null
 *  - selectedTime: string | null
 *  - onSelectDay(date)
 *  - onSelectTime(time)
 */

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

// Konfigurierbar: bereits gebuchte / gesperrte Slots (Demo).
const DISABLED_SLOTS = []
// Konfigurierbar: feste freie Tage (0=So … 6=Sa). Standard: keine.
const DAYS_OFF = []

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function isSameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

// Mo=0 … So=6
function mondayIndex(jsDay) {
  return (jsDay + 6) % 7
}

export default function AppointmentCalendar({
  selectedDay,
  selectedTime,
  onSelectDay,
  onSelectTime,
}) {
  const today = startOfDay(new Date())
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )

  const canGoPrev =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth())

  const cells = useMemo(() => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const firstOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const lead = mondayIndex(firstOfMonth.getDay())

    const arr = []
    for (let i = 0; i < lead; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(year, month, d))
    return arr
  }, [viewMonth])

  const isUnavailable = (date) => {
    if (!date) return true
    if (startOfDay(date) < today) return true
    const wd = date.getDay()
    if (wd === 0 || wd === 6) return true // Wochenende
    if (DAYS_OFF.includes(wd)) return true
    return false
  }

  return (
    <div>
      {/* Kalender-Oberfläche (nested glass, etwas transparenter) */}
      <div className="rounded-2xl border border-navy/10 bg-white/40 p-4 backdrop-blur-md">
        {/* Monats-Navigation */}
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              canGoPrev &&
              setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
            }
            disabled={!canGoPrev}
            aria-label="Vorheriger Monat"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 bg-white/60 text-navy transition-colors hover:bg-white hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/60 disabled:hover:text-navy"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-navy">
            {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          </span>
          <button
            type="button"
            onClick={() =>
              setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
            }
            aria-label="Nächster Monat"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 bg-white/60 text-navy transition-colors hover:bg-white hover:text-accent"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Wochentage */}
        <div className="mb-1 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="py-1 text-center text-[0.65rem] font-semibold uppercase tracking-wide text-silver"
            >
              {w}
            </div>
          ))}
        </div>

        {/* Tage */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} aria-hidden="true" />
            const unavailable = isUnavailable(date)
            const selected = isSameDay(date, selectedDay)
            return (
              <motion.button
                key={date.toISOString()}
                type="button"
                disabled={unavailable}
                aria-pressed={selected}
                aria-label={`${date.getDate()}. ${MONTHS[date.getMonth()]}`}
                onClick={() => onSelectDay(date)}
                animate={selected ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`flex aspect-square items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  unavailable
                    ? 'cursor-not-allowed text-navy/40 opacity-30'
                    : selected
                      ? 'bg-accent text-white shadow-[0_0_18px_rgba(139,92,246,0.35)]'
                      : 'text-navy hover:bg-accent/10'
                }`}
              >
                {date.getDate()}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Zeitfenster */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-5"
          >
            <span className="mb-2 block text-xs font-medium text-navy/70">
              Uhrzeit wählen
            </span>
            <div
              role="radiogroup"
              aria-label="Uhrzeit wählen"
              className="grid grid-cols-3 gap-2 sm:grid-cols-4"
            >
              {TIME_SLOTS.map((slot) => {
                const disabled = DISABLED_SLOTS.includes(slot)
                const active = selectedTime === slot
                return (
                  <button
                    type="button"
                    key={slot}
                    role="radio"
                    aria-checked={active}
                    disabled={disabled}
                    onClick={() => onSelectTime(slot)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 ${
                      disabled
                        ? 'cursor-not-allowed border-navy/5 bg-white/30 text-navy/40 opacity-40'
                        : active
                          ? 'border-accent bg-accent text-white shadow-[0_0_18px_rgba(139,92,246,0.35)]'
                          : 'border-navy/10 bg-white/50 text-navy hover:border-accent/40 hover:bg-white'
                    }`}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { WEEKDAYS, MONTHS }
