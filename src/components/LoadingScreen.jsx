import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Logo from './Logo.jsx'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'
import { useMotionPreference } from '../lib/motion-preference.jsx'

const ZOOM_EASE = [0.76, 0, 0.24, 1]
// Wie lange das Intro-Logo zum Ausblenden braucht — die Seite deckt sich
// erst danach auf, nicht gleichzeitig.
const INTRO_FADE_DURATION = 400

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  // Nach dem Loader kommt bei Animationen an zuerst eine kurze, leere
  // Zwischenseite nur mit dem AVAN-Logo, bevor die eigentliche Seite
  // aufgedeckt wird.
  const [showIntro, setShowIntro] = useState(false)
  // Erst wenn dieses true wird, deckt sich die eigentliche Seite auf.
  const [pageReady, setPageReady] = useState(false)

  const { reduceMotion: prefersReducedMotion } = useMotionPreference()
  const useIntroScreen = !prefersReducedMotion

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 900))
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', resolve, { once: true })
    })

    Promise.all([minTime, pageLoaded]).then(() => {
      setIsLoading(false)
      if (useIntroScreen) setShowIntro(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Intro bleibt stehen, bis der Nutzer versucht zu scrollen (Wheel/Touch/
  // Pfeiltasten/Leertaste) — dann blendet es einfach aus.
  useEffect(() => {
    if (!showIntro) return
    const dismiss = () => setShowIntro(false)
    const onKeyDown = (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Spacebar'].includes(e.key)) dismiss()
    }
    window.addEventListener('wheel', dismiss, { passive: true })
    window.addEventListener('touchmove', dismiss, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', dismiss)
      window.removeEventListener('touchmove', dismiss)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showIntro])

  // Sobald das Intro verschwindet: Seite erst nach dem Ausblenden aufdecken,
  // nicht gleichzeitig damit. Ohne Intro (reduzierte Bewegung) sofort.
  useEffect(() => {
    if (isLoading || showIntro) return
    if (!useIntroScreen) {
      setPageReady(true)
      return
    }
    const t = setTimeout(() => setPageReady(true), INTRO_FADE_DURATION)
    return () => clearTimeout(t)
  }, [isLoading, showIntro, useIntroScreen])

  // Einziger Ort, der das Scroll-Lock haelt/loest — solange die Seite noch
  // nicht aufgedeckt ist (Loader oder Intro), bleibt gesperrt.
  useEffect(() => {
    if (pageReady) return
    lockBodyScroll()
    return () => unlockBodyScroll()
  }, [pageReady])

  const logoExit = prefersReducedMotion ? { opacity: 0 } : { scale: 18, opacity: 0 }
  const logoTransition = prefersReducedMotion
    ? { duration: 0.3, ease: 'easeOut' }
    : { duration: 2.2, ease: ZOOM_EASE }

  const contentHidden = !pageReady

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-accent"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 1.4,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: ZOOM_EASE,
            }}
          >
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={logoExit}
              transition={logoTransition}
            >
              <Logo showWord={false} size={100} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: INTRO_FADE_DURATION / 1000, ease: ZOOM_EASE }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: ZOOM_EASE }}
            >
              <Logo size={72} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-10 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy/40"
            >
              Scroll
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div animate={{ opacity: contentHidden ? 0 : 1 }} transition={{ duration: 0.4 }}>
        {children}
      </motion.div>
    </>
  )
}
