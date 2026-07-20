import { motion } from 'framer-motion'
import { useMediaQuery } from '../lib/use-media-query.js'
import { fadeUp } from '../lib/motion-variants.js'

export default function SectionReveal({ children, className = '', as = 'div', delay = 0 }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const Comp = motion[as] || motion.div

  if (isMobile) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}
