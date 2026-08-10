import { useRef } from 'react'
import { useInView, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useTranslate } from '../lib/language-preference.jsx'

function useCountUp(target, inView, suffix = '', decimals = 0, skipAnimation = false) {
  const [value, setValue] = useState(skipAnimation ? target : 0)
  useEffect(() => {
    if (skipAnimation || !inView) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, target, skipAnimation])
  return decimals
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString('de-DE') + suffix
}

function Stat({ value, suffix = '', label, inView, skipAnimation }) {
  const display = useCountUp(value, inView, suffix, 0, skipAnimation)
  return (
    <div className="text-center">
      <p className="font-display text-5xl font-extrabold tabular-nums text-navy sm:text-6xl">
        {display}
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-accent">
        {label}
      </p>
    </div>
  )
}

export default function Stats() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslate()

  return (
    <section className="border-y border-navy/5 py-16">
      <div ref={ref} className="container-px grid gap-10 sm:grid-cols-3">
        <Stat value={100} suffix="%" label={t({ de: 'Persönliche Betreuung', en: 'Personal support', pl: 'Osobista opieka' })} inView={inView} skipAnimation={isMobile} />
        <Stat value={24} suffix="/7" label={t({ de: 'Erreichbarkeit bei Problemen', en: 'Availability for issues', pl: 'Dostępność w razie problemów' })} inView={inView} skipAnimation={isMobile} />
        <Stat value={2} label={t({ de: 'Gründer, direkter Kontakt', en: 'Founders, direct contact', pl: 'Założycieli, bezpośredni kontakt' })} inView={inView} skipAnimation={isMobile} />
      </div>
    </section>
  )
}
