import { useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

function useCountUp(target, inView, suffix = '', decimals = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, target])
  return decimals
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString('de-DE') + suffix
}

function Stat({ value, suffix = '', label, inView }) {
  const display = useCountUp(value, inView, suffix)
  return (
    <div className="text-center">
      <p className="font-display text-5xl font-extrabold tabular-nums text-navy sm:text-6xl">
        {display}
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-silver">
        {label}
      </p>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="border-y border-navy/5 py-16">
      <div ref={ref} className="container-px grid gap-10 sm:grid-cols-3">
        <Stat value={100} suffix="%" label="Persönliche Betreuung" inView={inView} />
        <Stat value={24} suffix="/7" label="Erreichbarkeit bei Problemen" inView={inView} />
        <Stat value={2} label="Gründer, direkter Kontakt" inView={inView} />
      </div>
    </section>
  )
}
