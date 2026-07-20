import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../lib/motion-variants.js'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'

export default function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8
      // Kurz vor dem Footer ausblenden, damit der Button nicht den
      // Motion-Switch dort verdeckt.
      const nearFooter =
        window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260
      setShow(pastHero && !nearFooter)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:hidden"
        >
          <a href="#kontakt" className="inline-flex" data-open-project-modal>
            <LiquidMetalButton label="Erstgespräch" width={200} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
