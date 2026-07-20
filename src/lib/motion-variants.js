// Reine Konstanten/Variant-Objekte, bewusst NICHT in SectionReveal.jsx —
// eine Datei, die sowohl eine Komponente als auch Konstanten exportiert,
// bricht Vites Fast-Refresh-Erkennung und loest bei jeder Aenderung eine
// Neuladen-Kaskade aller importierenden Komponenten aus.

export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Kräftigerer Reveal für Karten-Grids (Scale + Blur statt nur Fade-Up).
export const revealScale = {
  hidden: { opacity: 0, y: 32, scale: 0.94, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
}
