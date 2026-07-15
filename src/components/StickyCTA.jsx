import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from './SectionReveal.jsx'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'

export default function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          <a href="#kontakt" className="inline-flex">
            <LiquidMetalButton label="Erstgespräch" width={200} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
