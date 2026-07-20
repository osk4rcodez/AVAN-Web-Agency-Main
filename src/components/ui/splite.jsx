import { Suspense, lazy, useEffect, useRef } from 'react'
import { useMotionPreference } from '../../lib/motion-preference.jsx'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function SplineScene({ scene, className }) {
  const appRef = useRef(null)
  const wrapperRef = useRef(null)
  const { reduceMotion } = useMotionPreference()

  // Zusaetzliches Sicherheitsnetz: react-spline raeumt den WebGL-Kontext
  // beim Unmount zwar bereits selbst auf, aber auf iOS Safari ist das
  // Kontext-Limit sehr niedrig ("too many active WebGL contexts") — hier
  // nochmal explizit dispose() aufrufen, falls die Komponente je remounted.
  useEffect(() => {
    return () => {
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose()
      }
      appRef.current = null
    }
  }, [])

  // Die Spline-Szene reagiert intern nur auf "mousemove" (extern gehostet,
  // koennen wir nicht anpassen). Touch erzeugt dieses Event nicht durchgehend
  // beim Ziehen — deshalb leiten wir Touch-Bewegungen als synthetisches
  // mousemove an das Canvas weiter, damit derselbe interne Handler greift.
  //
  // WICHTIG fuers Scrollen: Listener haengen NUR am Canvas selbst (nicht am
  // groesseren Wrapper), sind passive (kein preventDefault) und das Canvas
  // bekommt touch-action:pan-y, damit vertikales Scrollen ueber dem Roboter
  // immer funktioniert — auch falls Splines eigenes internes Touch-Handling
  // sonst Gesten fuer sich beansprucht.
  useEffect(() => {
    const reducedMotion = reduceMotion
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let canvasEl = null

    function forwardAsMouseMove(clientX, clientY) {
      canvasEl?.dispatchEvent(
        new MouseEvent('mousemove', { clientX, clientY, bubbles: true, cancelable: true })
      )
    }

    function onTouchMove(e) {
      const touch = e.touches[0]
      if (touch) forwardAsMouseMove(touch.clientX, touch.clientY)
    }
    function onTouchStart(e) {
      const touch = e.touches[0]
      if (touch) forwardAsMouseMove(touch.clientX, touch.clientY)
    }

    function attachTo(canvas) {
      canvasEl = canvas
      canvas.style.touchAction = 'pan-y'
      if (reducedMotion) {
        // Spline reagiert teils auch OHNE unsere Weiterleitung nativ auf
        // Touch (eigenes internes Handling der Szene). Das laesst sich von
        // aussen nicht abschalten — also Touch/Maus-Events gar nicht erst
        // ans Canvas durchlassen, damit der Roboter still stehen bleibt.
        canvas.style.pointerEvents = 'none'
        return
      }
      canvas.addEventListener('touchmove', onTouchMove, { passive: true })
      canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    }

    const existing = wrapper.querySelector('canvas')
    if (existing) {
      attachTo(existing)
    } else {
      // Spline haengt sein <canvas> erst nach dem Laden (WASM/Szene) ein.
      var observer = new MutationObserver(() => {
        const canvas = wrapper.querySelector('canvas')
        if (canvas) {
          attachTo(canvas)
          observer.disconnect()
        }
      })
      observer.observe(wrapper, { childList: true, subtree: true })
    }

    return () => {
      observer?.disconnect()
      if (canvasEl) {
        canvasEl.removeEventListener('touchmove', onTouchMove)
        canvasEl.removeEventListener('touchstart', onTouchStart)
      }
    }
  }, [reduceMotion])

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        }
      >
        <Spline scene={scene} className={className} onLoad={(app) => (appRef.current = app)} />
      </Suspense>
    </div>
  )
}
