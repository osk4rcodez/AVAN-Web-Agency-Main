import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Loader2, ArrowLeft } from 'lucide-react'
import { EASE } from './SectionReveal.jsx'
import AppointmentCalendar, { MONTHS } from './AppointmentCalendar.jsx'

/**
 * Globales Modal für "Projekt starten" und "Termin vereinbaren".
 *
 * Öffnen:
 *  - [data-open-project-modal]     bzw. Event "open-project-modal"     → Formular
 *  - [data-open-appointment-modal] bzw. Event "open-appointment-modal" → Kalender → Formular
 *
 * Ein einziges Shell (Backdrop, Panel, Close/Escape/Backdrop, Fokus).
 * Interner Zustand: mode = "project" | "appointment", step = "calendar" | "form" | "success".
 *
 * Nutzt ausschließlich vorhandene Design-Tokens und den Liquid-Glass-Stil.
 * Keine neuen Farben. Alle Texte auf Deutsch.
 */

const BEDARF_OPTIONEN = [
  'Neue Website',
  'Überarbeitung / Relaunch',
  'Laufende Wartung',
  'Sonstiges',
]

const ZEITRAHMEN_OPTIONEN = [
  'So schnell wie möglich',
  'Innerhalb von 1 Monat',
  'Kein fester Zeitrahmen',
]

const BUDGET_OPTIONEN = ['Unter 200 €', '200–500 €', '500 €+', 'Noch unklar']

const INITIAL_FORM = {
  name: '',
  email: '',
  telefon: '',
  unternehmen: '',
  bedarf: '',
  zeitrahmen: '',
  budget: '',
  nachricht: '',
}

const REQUIRED = ['name', 'email', 'unternehmen', 'bedarf', 'nachricht']

const inputClass =
  'w-full rounded-xl border border-navy/10 bg-white/50 px-4 py-2.5 text-sm text-navy ' +
  'placeholder:text-silver/80 backdrop-blur-sm transition-all duration-200 ' +
  'focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15'

const labelClass = 'mb-1.5 block text-xs font-medium text-navy/70'

function Field({ label, htmlFor, required, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500/90" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Datum hübsch (z. B. "Dienstag, 22. Juli").
function formatDayLong(date) {
  if (!date) return ''
  const wdFull = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
  return `${wdFull[date.getDay()]}, ${date.getDate()}. ${MONTHS[date.getMonth()]}`
}

// Datum kurz (z. B. "22. Juli").
function formatDayShort(date) {
  if (!date) return ''
  return `${date.getDate()}. ${MONTHS[date.getMonth()]}`
}

// ISO-Datum (YYYY-MM-DD) ohne Zeitzonen-Verschiebung.
function toISODate(date) {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function ProjektModal() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('project') // 'project' | 'appointment'
  const [step, setStep] = useState('form') // 'calendar' | 'form' | 'success'

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [agbAccepted, setAgbAccepted] = useState(false)

  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const firstFieldRef = useRef(null)
  const triggerRef = useRef(null)

  // Öffnen via Custom-Events / data-Attribute.
  useEffect(() => {
    const openModal = (nextMode, trigger) => {
      triggerRef.current =
        trigger && trigger !== document.body ? trigger : null
      // Zustand IMMER beim Öffnen frisch setzen (nicht verzögert beim Schließen),
      // damit ein voriger Modus/Step nie den neuen überschreibt.
      setForm(INITIAL_FORM)
      setErrors({})
      setSubmitting(false)
      setAgbAccepted(false)
      setSelectedDay(null)
      setSelectedTime(null)
      setMode(nextMode)
      setStep(nextMode === 'appointment' ? 'calendar' : 'form')
      setOpen(true)
    }
    const onProjectEvent = (e) => openModal('project', e?.detail?.trigger)
    const onAppointmentEvent = (e) => openModal('appointment', e?.detail?.trigger)
    const onClick = (e) => {
      const appt = e.target.closest?.('[data-open-appointment-modal]')
      const proj = e.target.closest?.('[data-open-project-modal]')
      if (appt) {
        e.preventDefault()
        openModal('appointment', appt)
      } else if (proj) {
        e.preventDefault()
        openModal('project', proj)
      }
    }
    window.addEventListener('open-project-modal', onProjectEvent)
    window.addEventListener('open-appointment-modal', onAppointmentEvent)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('open-project-modal', onProjectEvent)
      window.removeEventListener('open-appointment-modal', onAppointmentEvent)
      document.removeEventListener('click', onClick)
    }
  }, [])

  // Escape schließen + Body-Scroll sperren.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKey)
    // Eigene Klasse statt body.style, damit es nicht mit anderen
    // Scroll-Sperren (z. B. Navbar-Menü) kollidiert.
    document.body.classList.add('modal-scroll-lock')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-scroll-lock')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Fokus auf erstes Feld, sobald das Formular sichtbar ist.
  useEffect(() => {
    if (open && step === 'form') {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open, step])

  const handleClose = () => {
    setOpen(false)
    // Fokus defensiv zurück zum auslösenden Element (falls noch im DOM).
    const trigger = triggerRef.current
    triggerRef.current = null
    if (trigger && document.body.contains(trigger)) {
      setTimeout(() => trigger.focus?.(), 0)
    }
    // Zustand wird beim nächsten Öffnen frisch gesetzt – hier kein verzögerter
    // Reset, damit sich nichts mit einem erneuten Öffnen überschneidet.
  }

  const setValue = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateField = (key) => {
    if (REQUIRED.includes(key) && !form[key].trim()) {
      setErrors((prev) => ({ ...prev, [key]: 'Bitte ausfüllen.' }))
    }
  }

  const isValid = REQUIRED.every((k) => form[k].trim()) && agbAccepted
  const cameFromCalendar = mode === 'appointment'
  const terminValue =
    selectedDay && selectedTime ? `${toISODate(selectedDay)} ${selectedTime}` : ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    REQUIRED.forEach((k) => {
      if (!form[k].trim()) nextErrors[k] = 'Bitte ausfüllen.'
    })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Bitte eine gültige E-Mail angeben.'
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    // Echte Anbindung an Netlify Forms (Form-Name: projekt-starten).
    // Felder werden als FormData gesendet (inkl. optionalem `termin`).
    const payload = {
      'form-name': 'projekt-starten',
      name: form.name,
      email: form.email,
      telefon: form.telefon,
      unternehmen: form.unternehmen,
      bedarf: form.bedarf,
      zeitrahmen: form.zeitrahmen,
      budget: form.budget,
      nachricht: form.nachricht,
    }
    if (terminValue) payload.termin = terminValue

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      })
    } catch (err) {
      // Netlify meldet i.d.R. auch bei Erfolg 200 zurück; bei Netzwerkfehler
      // trotzdem Success zeigen, damit der Nutzer nicht hängen bleibt.
      console.error('Formular-Übermittlung fehlgeschlagen:', err)
    }
    setSubmitting(false)
    setStep('success')
  }

  // Live-Ansage für Screenreader je nach Schritt.
  const liveMessage = useMemo(() => {
    if (step === 'calendar') return 'Schritt 1 von 2: Termin wählen'
    if (step === 'form' && cameFromCalendar) return 'Schritt 2 von 2: Ihre Kontaktdaten'
    return ''
  }, [step, cameFromCalendar])

  const ariaLabel =
    mode === 'appointment' ? 'Termin vereinbaren' : 'Projekt starten'

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 260, damping: 24 },
            }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: EASE } }}
            className="glass-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-8 sm:p-10"
          >
            {/* aria-live Region für Schrittwechsel */}
            <div className="sr-only" aria-live="polite">
              {liveMessage}
            </div>

            {/* Back-Arrow: nur im Formular-Schritt des Termin-Flows */}
            {step === 'form' && cameFromCalendar && (
              <button
                type="button"
                onClick={() => setStep('calendar')}
                aria-label="Zurück zur Terminauswahl"
                className="absolute left-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 bg-white/60 text-navy backdrop-blur-sm transition-colors hover:bg-white hover:text-accent"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            {/* Close-Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Schließen"
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 bg-white/60 text-navy backdrop-blur-sm transition-colors hover:bg-white hover:text-accent"
            >
              <X size={18} />
            </button>

            {/* Progress-Dots: nur im Termin-Flow, nicht im Success */}
            {cameFromCalendar && step !== 'success' && (
              <div className="mb-6 flex items-center justify-center gap-2 pt-1">
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === 'calendar' ? 'w-6 bg-accent' : 'w-3 bg-navy/15'
                  }`}
                />
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === 'form' ? 'w-6 bg-accent' : 'w-3 bg-navy/15'
                  }`}
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* ---------- STEP: KALENDER ---------- */}
              {step === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="eyebrow mb-3">Termin vereinbaren</p>
                  <h2 className="font-display text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
                    Wählen Sie einen passenden Termin.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    15 Minuten, unverbindlich — per Telefon oder Video.
                  </p>

                  <div className="mt-8">
                    <AppointmentCalendar
                      selectedDay={selectedDay}
                      selectedTime={selectedTime}
                      onSelectDay={(d) => {
                        setSelectedDay(d)
                        setSelectedTime(null)
                      }}
                      onSelectTime={setSelectedTime}
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!selectedDay || !selectedTime}
                    onClick={() => setStep('form')}
                    className="btn-neon mt-8 w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-none"
                  >
                    Weiter
                  </button>
                </motion.div>
              )}

              {/* ---------- STEP: FORMULAR ---------- */}
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: cameFromCalendar ? 12 : 0, y: cameFromCalendar ? 0 : 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: cameFromCalendar ? -12 : 0, y: cameFromCalendar ? 0 : -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {/* Header */}
                  <p className="eyebrow mb-3">
                    {cameFromCalendar ? 'Ihre Kontaktdaten' : 'Projekt starten'}
                  </p>
                  <h2 className="font-display text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
                    Erzählen Sie uns von Ihrem Vorhaben.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    Wir melden uns in der Regel innerhalb eines Tages zurück.
                  </p>

                  {/* Termin-Chip (nur im Termin-Flow) */}
                  {cameFromCalendar && selectedDay && selectedTime && (
                    <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-navy backdrop-blur-sm">
                      <span>
                        <span className="font-semibold">Ihr Termin:</span>{' '}
                        {formatDayLong(selectedDay)} um {selectedTime} Uhr
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep('calendar')}
                        className="font-semibold text-accent underline underline-offset-2 transition-colors hover:text-navy"
                      >
                        Ändern
                      </button>
                    </div>
                  )}

                  <form
                    name="projekt-starten"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                    noValidate
                  >
                    {/* Netlify Forms: verstecktes Pflichtfeld mit Form-Namen. */}
                    <input type="hidden" name="form-name" value="projekt-starten" />
                    {/* Verstecktes Feld: Termin-Info fließt in denselben Backend-Submit. */}
                    {cameFromCalendar && (
                      <input type="hidden" name="termin" value={terminValue} readOnly />
                    )}

                    <Field label="Name" htmlFor="pm-name" required error={errors.name}>
                      <input
                        id="pm-name"
                        ref={firstFieldRef}
                        type="text"
                        className={inputClass}
                        placeholder="Ihr Name"
                        value={form.name}
                        onChange={(e) => setValue('name', e.target.value)}
                        onBlur={() => validateField('name')}
                      />
                    </Field>

                    <Field label="E-Mail" htmlFor="pm-email" required error={errors.email}>
                      <input
                        id="pm-email"
                        type="email"
                        className={inputClass}
                        placeholder="Ihre E-Mail"
                        value={form.email}
                        onChange={(e) => setValue('email', e.target.value)}
                        onBlur={() => validateField('email')}
                      />
                    </Field>

                    <Field label="Telefon" htmlFor="pm-telefon">
                      <input
                        id="pm-telefon"
                        type="tel"
                        className={inputClass}
                        placeholder="Telefonnummer (optional)"
                        value={form.telefon}
                        onChange={(e) => setValue('telefon', e.target.value)}
                      />
                    </Field>

                    <Field
                      label="Unternehmen / Branche"
                      htmlFor="pm-unternehmen"
                      required
                      error={errors.unternehmen}
                    >
                      <input
                        id="pm-unternehmen"
                        type="text"
                        className={inputClass}
                        placeholder="z. B. Bäckerei Müller"
                        value={form.unternehmen}
                        onChange={(e) => setValue('unternehmen', e.target.value)}
                        onBlur={() => validateField('unternehmen')}
                      />
                    </Field>

                    {/* Bedarf – Single-Select Pills */}
                    <div>
                      <span className={labelClass}>
                        Was brauchen Sie?<span className="text-accent"> *</span>
                      </span>
                      <div
                        role="radiogroup"
                        aria-label="Was brauchen Sie?"
                        className="flex flex-wrap gap-2"
                      >
                        {BEDARF_OPTIONEN.map((opt) => {
                          const active = form.bedarf === opt
                          return (
                            <button
                              type="button"
                              key={opt}
                              role="radio"
                              aria-checked={active}
                              onClick={() => setValue('bedarf', opt)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 ${
                                active
                                  ? 'border-accent bg-accent text-white shadow-[0_0_18px_rgba(139,92,246,0.35)]'
                                  : 'border-navy/10 bg-white/50 text-navy hover:border-accent/40 hover:bg-white'
                              }`}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                      {errors.bedarf && (
                        <p className="mt-1 text-xs text-red-500/90" role="alert">
                          {errors.bedarf}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Zeitrahmen" htmlFor="pm-zeitrahmen">
                        <select
                          id="pm-zeitrahmen"
                          className={inputClass}
                          value={form.zeitrahmen}
                          onChange={(e) => setValue('zeitrahmen', e.target.value)}
                        >
                          <option value="">Bitte wählen</option>
                          {ZEITRAHMEN_OPTIONEN.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Budget-Rahmen" htmlFor="pm-budget">
                        <select
                          id="pm-budget"
                          className={inputClass}
                          value={form.budget}
                          onChange={(e) => setValue('budget', e.target.value)}
                        >
                          <option value="">Bitte wählen</option>
                          {BUDGET_OPTIONEN.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field
                      label="Nachricht"
                      htmlFor="pm-nachricht"
                      required
                      error={errors.nachricht}
                    >
                      <textarea
                        id="pm-nachricht"
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Kurz beschrieben: was schwebt Ihnen vor?"
                        value={form.nachricht}
                        onChange={(e) => setValue('nachricht', e.target.value)}
                        onBlur={() => validateField('nachricht')}
                      />
                    </Field>

                    {/* AGB-Bestätigung (Bestellprozess): aktive, nicht vorangekreuzte Checkbox.
                        Erst bei Bestätigung ist der Submit-Button aktivierbar. */}
                    <div className="rounded-xl border border-navy/10 bg-white/50 p-4 backdrop-blur-sm">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          id="pm-agb"
                          type="checkbox"
                          checked={agbAccepted}
                          onChange={(e) => setAgbAccepted(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-navy/30 text-accent accent-accent focus:ring-2 focus:ring-accent/40"
                        />
                        <span className="text-sm leading-relaxed text-ink/70">
                          Ich habe die{' '}
                          <a
                            href="#agb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-accent underline underline-offset-2 hover:text-navy"
                          >
                            Allgemeinen Geschäftsbedingungen
                          </a>{' '}
                          gelesen und akzeptiere sie.
                        </span>
                      </label>
                      {!agbAccepted && (
                        <p className="mt-2 pl-7 text-xs text-red-500/90" role="alert">
                          Bitte bestätigen Sie die AGB, um Ihre Anfrage abzusenden.
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!isValid || submitting}
                      className="btn-neon w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-none"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Wird gesendet …
                        </>
                      ) : (
                        'Anfrage senden'
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ---------- STEP: SUCCESS ---------- */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent"
                  >
                    <Check size={32} strokeWidth={2.5} />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-navy">
                    Danke!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
                    {cameFromCalendar && selectedDay && selectedTime
                      ? `Ihr Termin am ${formatDayShort(selectedDay)} um ${selectedTime} Uhr ist vorgemerkt — wir melden uns kurz vorher zur Bestätigung.`
                      : 'Wir melden uns bald bei Ihnen.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-8 rounded-full border border-navy/10 bg-white/60 px-6 py-2.5 text-sm font-semibold text-navy backdrop-blur-sm transition-colors hover:bg-white hover:text-accent"
                  >
                    Schließen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
