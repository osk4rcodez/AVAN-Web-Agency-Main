import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js'

const ZOOM_EASE = [0.76, 0, 0.24, 1]

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 900))
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', resolve, { once: true })
    })

    Promise.all([minTime, pageLoaded]).then(() => setIsLoading(false))

    lockBodyScroll()
    return () => unlockBodyScroll()
  }, [])

  return (
    <>
      <AnimatePresence onExitComplete={() => unlockBodyScroll()}>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-accent"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              reducedMotion
                ? { duration: 0.3, ease: 'easeOut' }
                : { duration: 1.4, delay: 0.3, ease: ZOOM_EASE }
            }
          >
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { scale: 18, opacity: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0.3, ease: 'easeOut' }
                  : { duration: 2.2, ease: ZOOM_EASE }
              }
            >
              <Logo showWord={false} size={100} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  )
}
