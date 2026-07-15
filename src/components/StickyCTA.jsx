import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EASE } from './SectionReveal.jsx'

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
        <motion.a
          href="#kontakt"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="btn-neon fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold md:hidden"
        >
          Kostenloses Erstgespräch
          <ArrowUpRight size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
