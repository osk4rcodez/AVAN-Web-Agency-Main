import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'avan-motion-override'

const MotionContext = createContext(null)

function getSystemPrefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function MotionProvider({ children }) {
  // null = kein manueller Override gesetzt -> Default ist "An" (Animationen
  // aktiv), unabhaengig von der Systemeinstellung. Sobald der Nutzer den
  // Schalter selbst bedient, wird dessen Wahl dauerhaft respektiert.
  const [manualOverride, setManualOverride] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === null ? false : stored === 'true'
  })

  const reduceMotion = manualOverride

  // CSS-Regeln (@media prefers-reduced-motion) lesen NUR die Systemeinstellung
  // und wuerden den manuellen Toggle sonst ignorieren -> Klasse am <html>
  // spiegelt die kombinierte Praeferenz, damit reines CSS (Marquee, Hover-
  // Transitions, neon-pulse, ...) ebenfalls dem manuellen Schalter folgt.
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion)
    // motion-force-on: manueller Toggle hat Bewegung erzwungen, obwohl das
    // Betriebssystem Reduced Motion aktiv hat.
    document.documentElement.classList.toggle('motion-force-on', manualOverride === false)
  }, [reduceMotion, manualOverride])

  function toggleMotion() {
    const next = !reduceMotion
    window.localStorage.setItem(STORAGE_KEY, String(next))
    // Seite neu laden, damit alle Effekte (Loading-Screen, Scroll-Animationen,
    // WebGL-Szenen, ...) sauber im neuen Modus neu starten statt mitten in
    // ihrem aktuellen Zustand umzuschalten.
    window.location.reload()
  }

  return (
    <MotionContext.Provider value={{ reduceMotion, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotionPreference() {
  const ctx = useContext(MotionContext)
  if (!ctx) {
    // Fallback fuer den (unwahrscheinlichen) Fall, dass eine Komponente
    // ausserhalb des Providers gerendert wird — verhaelt sich dann wie
    // reine Systemeinstellung ohne manuellen Toggle.
    return { reduceMotion: getSystemPrefersReduced(), toggleMotion: () => {} }
  }
  return ctx
}
