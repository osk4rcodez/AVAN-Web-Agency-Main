import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, LayoutGrid, GalleryHorizontalEnd, Workflow, Mail } from 'lucide-react'
import Logo from '../Logo.jsx'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4'

// Baut den Anzeigetext Zeichen fuer Zeichen auf — reine Optik fuer den
// "Nachher"-Zustand, nur aktiv wenn Animationen an sind (siehe WebsiteComparison.jsx).
function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    let interval
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

const NAV_LINKS = [
  { label: 'Leistungen', href: '#leistungen', icon: LayoutGrid },
  { label: 'Showcase', href: '#showcase', icon: GalleryHorizontalEnd },
  { label: 'Ablauf', href: '#ablauf', icon: Workflow },
  { label: 'Kontakt', href: '#kontakt', icon: Mail },
]
const SERVICE_OPTIONS = ['Website', 'Hosting', 'Wartung', 'Beratung']

export function SpadeHero({ compact = false }) {
  const [services, setServices] = useState([])
  const videoRef = useRef(null)
  const { displayed, done } = useTypewriter('Ihre Website.\nUnsere Verantwortung.')

  // Video spielt einfach normal ab (kein Maus-Scrubbing mehr) — die
  // staendigen currentTime-Seeks bei jeder Mausbewegung sorgten fuer
  // spuerbares Ruckeln auf dem PC.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  function toggleService(service) {
    setServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  // compact: erzwingt ueberall die mobilen (kleinen) Groessen, auch auf
  // breiten Bildschirmen — fuer eingebettete Vorschauen (z.B. Showcase-
  // Karte), wo die echte Kartenbreite nicht der Browser-Viewportbreite
  // entspricht, an der sich sm:/lg: normalerweise orientieren.
  const r = (base, desktopExtra) => (compact ? base : `${base} ${desktopExtra}`)

  return (
    <div className="relative isolate flex h-full w-full flex-col overflow-hidden bg-white font-sans text-neutral-900 antialiased selection:bg-[#EAECE9] selection:text-[#1C2E1E]">
      {/* Hintergrund-Video, spielt einfach normal ab */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-neutral-50">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          loop
          className="h-full w-full object-cover object-right-bottom"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/35" />
      </div>

      {/* Navbar */}
      <header className={r('absolute inset-x-0 top-0 z-10 flex flex-row items-center justify-between px-3 py-2', 'sm:px-6 sm:py-4')}>
        <div className={r('flex origin-left scale-75 flex-row items-center gap-2', 'sm:scale-100')}>
          <Logo size={26} />
        </div>

        {!compact && (
          <div className="hidden md:flex">
            <nav className="menu-bar">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <a key={link.href} href={link.href} className="menu-item group" aria-label={link.label}>
                    <Icon size={20} strokeWidth={2} />
                    <span className="menu-label">{link.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>
        )}

        {!compact && (
          <a href="#kontakt" className="btn-white hidden md:inline-flex" data-open-project-modal>
            Projekt starten
          </a>
        )}
      </header>

      {/* Content */}
      <div className={r('relative z-[5] flex w-full flex-1 flex-col justify-center px-4 py-10', 'sm:px-10 sm:py-16')}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className={r('mb-3 w-full whitespace-pre-wrap text-base font-normal leading-[1.2] tracking-tight text-black', 'sm:mb-4 sm:text-3xl lg:text-4xl')}>
            {displayed}
            {!done && <span className="ml-[2px] inline-block h-[1em] w-[2px] animate-blink bg-black align-middle" />}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className={r('mb-5 max-w-[13rem] text-[9px] leading-relaxed text-[#5A635A]', 'sm:mb-8 sm:max-w-md sm:text-base')}>
            Ob Neubau, Relaunch oder Wartung — <br />
            schreiben Sie uns, wir melden uns in der Regel innerhalb eines Tages.
          </p>
        </motion.div>

        <div>
          <p className={r('mb-1 text-xs font-medium tracking-tight', 'sm:text-lg')}>Woran haben Sie Interesse?</p>
          <p className={r('mb-3 text-[10px] text-[#738273] opacity-85', 'sm:mb-5 sm:text-sm')}>Mehrfachauswahl möglich</p>

          <div className={r('flex flex-wrap gap-1.5', 'sm:gap-2.5')}>
            {SERVICE_OPTIONS.map((option) => {
              const active = services.includes(option)
              return (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => toggleService(option)}
                  whileTap={{ scale: 0.97 }}
                  className={`${r('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors', 'sm:px-4 sm:py-2 sm:text-sm')} ${
                    active
                      ? 'transform bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5'
                      : 'border border-[#F1F3F1] bg-white text-[#1C2E1E] hover:bg-[#F1F3F1]/55'
                  }`}
                >
                  {active && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Check size={12} />
                    </motion.span>
                  )}
                  {option}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {services.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className={compact ? 'mt-3 hidden text-[10px] italic text-[#738273]' : 'mt-3 hidden text-[10px] italic text-[#738273] sm:mt-5 sm:block sm:text-xs'}
              >
                Bitte oben auswählen, woran Sie Interesse haben.
              </motion.p>
            ) : (
              <motion.div
                key="active"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={r('mt-3 overflow-hidden', 'sm:mt-5')}
              >
                <div className={r('flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#F1F3F1] bg-[#FAFBF9] px-3 py-2', 'sm:gap-3 sm:px-4 sm:py-3')}>
                  <p className={r('text-[10px] text-[#1C2E1E]', 'sm:text-sm')}>
                    Interesse an: {services.join(', ')}
                  </p>
                  <a
                    href="#kontakt"
                    className={r('whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-[#4D6D47] transition-opacity hover:opacity-70', 'sm:text-xs')}
                  >
                    Jetzt starten →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
