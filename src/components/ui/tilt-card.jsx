import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// 3D-Tilt-Karte im 21st.dev-Bento-Stil: reagiert auf Mausposition mit
// leichter Rotation + Glanzlicht, entspannt sich per Spring zurück.
export function TiltCard({ children, className = '', variants, style, ...props }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), springConfig)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), springConfig)
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])

  function onPointerMove(e) {
    // Nur echte Maus tilten: bei Touch feuert pointermove auch beim
    // Scrollen ueber die Karte (der Finger "bewegt" sich ueber ihr), was
    // sonst staendig rotateX/rotateY nachjagt und die Karte sichtbar
    // hoch/runter wackeln laesst.
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function onPointerLeave(e) {
    if (e.pointerType !== 'mouse') return
    mx.set(0.5)
    my.set(0.5)
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
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(320px circle at ${gx} ${gy}, rgba(139,92,246,0.16), transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  )
}
