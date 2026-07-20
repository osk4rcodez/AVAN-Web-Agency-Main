import { motion, useScroll, useSpring } from 'framer-motion'
import { useMotionPreference } from '../lib/motion-preference.jsx'

export default function ScrollProgressBar() {
  const { reduceMotion: reducedMotion } = useMotionPreference()
  const { scrollYProgress } = useScroll()
  // Reduced Motion: 1:1 an die Scroll-Position gebunden, ohne Feder-
  // Nachlauf/Ueberschwingen — reagiert nur direkt auf das Scrollen selbst.
  const springyScaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.3,
  })
  const scaleX = reducedMotion ? scrollYProgress : springyScaleX

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-navy to-accent"
      style={{ scaleX }}
    />
  )
}
