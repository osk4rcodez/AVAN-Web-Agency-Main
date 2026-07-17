import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings2, Check } from 'lucide-react'

const STORAGE_KEY = 'avan-cookie-consent'
const CONSENT_VERSION = '1.0'

const CATEGORIES = [
  {
    id: 'necessary',
    label: 'Technisch notwendig',
    description: 'Grundlegende Funktionen wie Seitennavigation, Sicherheit und Formularversand. Können nicht deaktiviert werden.',
    required: true,
  },
  {
    id: 'functional',
    label: 'Funktional',
    description: 'Merken sich Einstellungen (z. B. Sprache, Schriftgröße) für ein komfortableres Nutzungserlebnis.',
    required: false,
  },
  {
    id: 'analytics',
    label: 'Analyse',
    description: 'Anonyme Statistiken zur Nutzung der Website, um Inhalte zu verbessern (z. B. Besucherzahlen).',
    required: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Werbung und Reichweitenmessung, z. B. über Pixel von Drittanbietern.',
    required: false,
  },
]

function loadConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.version !== CONSENT_VERSION) return null
    return data
  } catch {
    return null
  }
}

function saveConsent(selection) {
  const payload = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    selection,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  return payload
}

// Placeholder for loading analytics/marketing scripts ONLY after consent.
// Currently the site uses no third-party trackers — this function is the
// single technical gate so scripts are NEVER set before consent is given.
function applyTrackingScripts(selection) {
  if (selection.analytics) {
    // e.g. window.loadAnalytics() — currently a no-op (no tracker configured)
  }
  if (selection.marketing) {
    // e.g. window.loadMarketingPixel() — currently a no-op
  }
}

export default function CookieConsent() {
  const [consent, setConsent] = useState(() => loadConsent())
  const [showBanner, setShowBanner] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [selection, setSelection] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const existing = loadConsent()
    if (!existing) {
      setShowBanner(true)
    } else {
      applyTrackingScripts(existing.selection)
    }
  }, [])

  // Expose a global opener so the footer "Cookie-Einstellungen" link works.
  useEffect(() => {
    window.openCookieSettings = () => {
      setShowPrefs(true)
      setShowBanner(true)
    }
    return () => {
      delete window.openCookieSettings
    }
  }, [])

  const persist = (next) => {
    const payload = saveConsent(next)
    setConsent(payload)
    setShowBanner(false)
    setShowPrefs(false)
    applyTrackingScripts(next)
  }

  const acceptAll = () =>
    persist({ necessary: true, functional: true, analytics: true, marketing: true })

  const denyAll = () =>
    persist({ necessary: true, functional: false, analytics: false, marketing: false })

  const saveSelection = () => persist({ ...selection, necessary: true })

  const toggle = (id) => {
    if (id === 'necessary') return
    setSelection((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einstellungen"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-white p-5 shadow-cardHover sm:p-6">
            <div className="flex items-start gap-3">
              <Cookie size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-bold text-navy">Datenschutz & Cookies</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Wir verwenden Cookies, um die Website technisch bereitzustellen und — sofern Sie
                  einwilligen — um sie zu verbessern. Notwendige Cookies sind stets aktiv. Eine
                  Einwilligung für Analyse- und Marketing-Cookies ist freiwillig und kann jederzeit
                  widerrufen werden.
                </p>
              </div>
            </div>

            {showPrefs && (
              <div className="mt-4 space-y-2.5">
                {CATEGORIES.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-start gap-3 rounded-xl border border-navy/10 bg-mist/60 p-3"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(c.id)}
                      disabled={c.required}
                      aria-pressed={selection[c.id]}
                      aria-label={`${c.label} ${selection[c.id] ? 'aktiv' : 'inaktiv'}`}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        selection[c.id]
                          ? 'border-accent bg-accent text-white'
                          : 'border-navy/20 bg-white'
                      } ${c.required ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    >
                      {selection[c.id] && <Check size={13} />}
                    </button>
                    <input type="checkbox" className="sr-only" checked={selection[c.id]} readOnly tabIndex={-1} />
                    <span>
                      <span className="block text-sm font-semibold text-navy">
                        {c.label}
                        {c.required && <span className="ml-1 text-xs font-normal text-ink/50">(immer aktiv)</span>}
                      </span>
                      <span className="block text-xs text-ink/60">{c.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowPrefs((v) => !v)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
              >
                <Settings2 size={16} /> Einstellungen
              </button>
              <button
                type="button"
                onClick={denyAll}
                className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
              >
                Ablehnen
              </button>
              <button
                type="button"
                onClick={showPrefs ? saveSelection : acceptAll}
                className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                {showPrefs ? 'Auswahl speichern' : 'Alle akzeptieren'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
