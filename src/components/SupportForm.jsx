import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { EASE } from '../lib/motion-variants.js'
import { submitToWeb3Forms } from '../lib/web3forms.js'
import { useTranslate } from '../lib/language-preference.jsx'

const INITIAL = { name: '', email: '', anliegen: '' }
const REQUIRED = ['name', 'email', 'anliegen']

const inputClass =
  'w-full rounded-xl border border-navy/10 bg-white/50 px-4 py-2.5 text-sm text-navy ' +
  'placeholder:text-silver/80 backdrop-blur-sm transition-all duration-200 ' +
  'focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15'

const labelClass = 'mb-1.5 block text-xs font-medium text-navy/70'

// Kompaktes Support-Formular, eingebettet im "Support & Beratung"-Detail
// (siehe details-modal.jsx). Eigenes, kleines Formular, unabhaengig vom
// grossen Projekt-Formular.
export default function SupportForm() {
  const t = useTranslate()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [sent, setSent] = useState(false)

  const setValue = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    REQUIRED.forEach((k) => {
      if (!form[k].trim()) nextErrors[k] = t({ de: 'Bitte ausfüllen.', en: 'Please fill this in.' })
    })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t({ de: 'Bitte eine gültige E-Mail angeben.', en: 'Please enter a valid email address.' })
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      await submitToWeb3Forms({
        subject: `Support-Anfrage: ${form.name}`,
        name: form.name,
        email: form.email,
        anliegen: form.anliegen,
      })
      setSent(true)
    } catch (err) {
      console.error('Support-Formular fehlgeschlagen:', err)
      setSubmitError(t({ de: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', en: 'Something went wrong. Please try again.' }))
    }
    setSubmitting(false)
  }

  return (
    <div className="mt-5 rounded-2xl border border-navy/10 bg-white/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-silver">
        {t({ de: 'Support-Anfrage', en: 'Support request' })}
      </p>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-3 flex items-center gap-2.5 text-sm text-navy"
          >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={16} strokeWidth={2.5} />
            </span>
            {t({ de: 'Danke! Wir melden uns in der Regel innerhalb eines Tages.', en: 'Thanks! We usually get back to you within a day.' })}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name="support-anfrage"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-3 space-y-3"
            noValidate
          >
            {/* Honeypot: fuer echte Nutzer unsichtbar, Bots fuellen es oft aus. */}
            <p className="hidden" aria-hidden="true">
              <label>
                {t({ de: 'Bitte nicht ausfüllen:', en: 'Please leave this empty:' })}{' '}
                <input name="bot-field" tabIndex="-1" autoComplete="off" />
              </label>
            </p>

            <div>
              <label htmlFor="sf-name" className={labelClass}>
                {t({ de: 'Name', en: 'Name' })}<span className="text-accent"> *</span>
              </label>
              <input
                id="sf-name"
                type="text"
                className={inputClass}
                placeholder={t({ de: 'Ihr Name', en: 'Your name' })}
                value={form.name}
                onChange={(e) => setValue('name', e.target.value)}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500/90" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="sf-email" className={labelClass}>
                {t({ de: 'E-Mail', en: 'Email' })}<span className="text-accent"> *</span>
              </label>
              <input
                id="sf-email"
                type="email"
                className={inputClass}
                placeholder={t({ de: 'Ihre E-Mail', en: 'Your email' })}
                value={form.email}
                onChange={(e) => setValue('email', e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500/90" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="sf-anliegen" className={labelClass}>
                {t({ de: 'Ihr Anliegen', en: 'Your request' })}<span className="text-accent"> *</span>
              </label>
              <textarea
                id="sf-anliegen"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder={t({ de: 'Wobei können wir helfen?', en: 'What can we help with?' })}
                value={form.anliegen}
                onChange={(e) => setValue('anliegen', e.target.value)}
              />
              {errors.anliegen && (
                <p className="mt-1 text-xs text-red-500/90" role="alert">
                  {errors.anliegen}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-xs text-red-500/90" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-neon w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-none"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t({ de: 'Wird gesendet …', en: 'Sending …' })}
                </>
              ) : (
                t({ de: 'Support kontaktieren', en: 'Contact support' })
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
