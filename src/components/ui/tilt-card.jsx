import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMotionPreference } from '../../lib/motion-preference.jsx'

// 3D-Tilt-Karte im 21st.dev-Bento-Stil: reagiert auf Mausposition mit
// leichter Rotation + Glanzlicht, entspannt sich per Spring zurück.
// Auf Touch-Geraeten komplett deaktiviert (kein Tilt, kein Glanzlicht) —
// pointermove feuert dort auch beim Scrollen ueber die Karte und liess sie
// sonst sichtbar wackeln.
export function TiltCard({ children, className = '', variants, style, ...props }) {
  // Hover-Faehigkeit (Maus vs. Touch) bleibt eine reine, einmalige Geraete-
  // abfrage. Die Reduced-Motion-Haelfte kommt reaktiv aus dem gemeinsamen
  // Hook, damit der manuelle Schalter auch hier sofort greift.
  const [pointerHoverCapable] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  const { reduceMotion } = useMotionPreference()
  const hoverCapable = pointerHoverCapable && !reduceMotion

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), springConfig)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), springConfig)
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(320px circle at ${gx} ${gy}, rgba(139,92,246,0.16), transparent 60%)`
  )

  function onPointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function onPointerLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  if (!hoverCapable) {
    return (
      <motion.div variants={variants} className={`relative ${className}`} {...props}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={variants}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      className={`relative [transform-style:preserve-3d] ${className}`}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glareBg }}
      />
      {children}
    </motion.div>
  )
}
