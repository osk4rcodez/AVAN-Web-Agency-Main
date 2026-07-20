import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    // Mobile Browser aendern beim Scrollen die Viewport-HOEHE staendig
    // (Adressleiste ein-/ausblenden) und feuern dabei "resize". Nur bei
    // tatsaechlicher BREITEN-Aenderung neu pruefen + debounced, damit eine
    // reine max-width-Query dadurch nicht flackert.
    let lastWidth = window.innerWidth
    let timer = null

    function recheck() {
      const currentWidth = window.innerWidth
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth
        setMatches(window.matchMedia(query).matches)
      }
    }

    function onResize() {
      clearTimeout(timer)
      timer = setTimeout(recheck, 150)
    }

    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [query])

  return matches
}
