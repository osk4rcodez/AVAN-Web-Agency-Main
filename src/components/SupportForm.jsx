import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { EASE } from '../lib/motion-variants.js'

const INITIAL = { name: '', email: '', anliegen: '' }
const REQUIRED = ['name', 'email', 'anliegen']

const inputClass =
  'w-full rounded-xl border border-navy/10 bg-white/50 px-4 py-2.5 text-sm text-navy ' +
  'placeholder:text-silver/80 backdrop-blur-sm transition-all duration-200 ' +
  'focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15'

const labelClass = 'mb-1.5 block text-xs font-medium text-navy/70'

// Kompaktes Support-Formular, eingebettet im "Support & Beratung"-Detail
// (siehe details-modal.jsx). Eigenes, kleines Netlify-Formular
// (Form-Name: support-anfrage), unabhaengig vom grossen Projekt-Formular.
export default function SupportForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const setValue = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

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
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'support-anfrage',
          name: form.name,
          email: form.email,
          anliegen: form.anliegen,
        }).toString(),
      })
    } catch (err) {
      console.error('Support-Formular fehlgeschlagen:', err)
    }
    setSubmitting(false)
    setSent(true)
  }

  return (
    <div className="mt-5 rounded-2xl border border-navy/10 bg-white/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-silver">Support-Anfrage</p>

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
            Danke! Wir melden uns in der Regel innerhalb eines Tages.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name="support-anfrage"
            data-netlify="true"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-3 space-y-3"
            noValidate
          >
            <input type="hidden" name="form-name" value="support-anfrage" />

            <div>
              <label htmlFor="sf-name" className={labelClass}>
                Name<span className="text-accent"> *</span>
              </label>
              <input
                id="sf-name"
                type="text"
                className={inputClass}
                placeholder="Ihr Name"
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
                E-Mail<span className="text-accent"> *</span>
              </label>
              <input
                id="sf-email"
                type="email"
                className={inputClass}
                placeholder="Ihre E-Mail"
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
                Ihr Anliegen<span className="text-accent"> *</span>
              </label>
              <textarea
                id="sf-anliegen"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Wobei können wir helfen?"
                value={form.anliegen}
                onChange={(e) => setValue('anliegen', e.target.value)}
              />
              {errors.anliegen && (
                <p className="mt-1 text-xs text-red-500/90" role="alert">
                  {errors.anliegen}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-neon w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-none"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Wird gesendet …
                </>
              ) : (
                'Support kontaktieren'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
