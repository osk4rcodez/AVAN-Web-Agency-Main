// iOS-sicheres Scroll-Lock: reines `overflow: hidden` auf body laesst
// mobile Browser beim Sperren ihre Adressleiste wieder einblenden, was
// die sichtbare Viewport-Hoehe abrupt aendert (sichtbarer Sprung +
// Repaint-Blitz). Body stattdessen fixieren und Scroll-Position beim
// Entsperren exakt wiederherstellen — Standard-Fix fuer dieses Problem.
// Referenzzaehler, weil mehrere Modals/Sperren unabhaengig voneinander
// (de)aktivieren koennen (z.B. Loading-Screen + danach ein Modal).

let lockCount = 0
let savedScrollY = 0

export function lockBodyScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.classList.add('modal-scroll-lock')
  }
  lockCount += 1
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.classList.remove('modal-scroll-lock')
    window.scrollTo(0, savedScrollY)
  }
}
