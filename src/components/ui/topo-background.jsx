import { useEffect, useRef, useState } from 'react'
import { createNoise2D } from 'simplex-noise'
import { useMotionPreference } from '../../lib/motion-preference.jsx'

// Erzeugt einmalig ~30 fliessende Konturlinien per Flow-Field (Simplex-Noise) —
// statisches generatives Muster, keine Dauer-Animation.
function generatePaths(width, height, lineCount = 32) {
  const noise2D = createNoise2D()
  const freq = 0.0022
  const step = 6
  const maxSteps = 240
  const paths = []

  for (let i = 0; i < lineCount; i++) {
    const seedOffset = i * 41.3
    let x = Math.random() * width
    let y = Math.random() * height
    const points = [[x, y]]

    for (let s = 0; s < maxSteps; s++) {
      const angle = noise2D(x * freq, y * freq + seedOffset) * Math.PI * 4
      x += Math.cos(angle) * step
      y += Math.sin(angle) * step
      if (x < -40 || x > width + 40 || y < -40 || y > height + 40) break
      points.push([x, y])
    }

    paths.push({ points, lineWidth: 1 + Math.random() * 2 })
  }

  return paths
}

function drawPaths(ctx, paths, color, alpha) {
  const { width, height } = ctx.canvas
  ctx.clearRect(0, 0, width, height)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha

  for (const path of paths) {
    if (path.points.length < 2) continue
    ctx.lineWidth = path.lineWidth
    ctx.beginPath()
    ctx.moveTo(path.points[0][0], path.points[0][1])
    for (let i = 1; i < path.points.length; i++) ctx.lineTo(path.points[i][0], path.points[i][1])
    ctx.stroke()
  }
}

// Topografischer Linien-Hintergrund mit Cursor-Reveal: eine sehr blasse
// Basis-Ebene plus eine zweite, volltonige Ebene, die nur in einem weichen
// Radius um den Mauszeiger sichtbar ist (CSS mask-image, GPU-composited).
export default function TopoBackground({ className = '', fixed = false }) {
  const containerRef = useRef(null)
  const baseCanvasRef = useRef(null)
  const revealCanvasRef = useRef(null)
  const rafRef = useRef(null)
  const pathsRef = useRef(null)
  const lastWidthRef = useRef(0)

  const { reduceMotion } = useMotionPreference()
  // Reveal-Effekt jetzt unabhaengig von Maus-/Touch-Faehigkeit — solange
  // Animationen an sind, soll das Leuchten auch auf dem Handy per Antippen/
  // Ziehen funktionieren, genau wie der Hover auf dem PC.
  const hoverCapable = !reduceMotion

  useEffect(() => {
    const container = containerRef.current
    const baseCanvas = baseCanvasRef.current
    const revealCanvas = revealCanvasRef.current
    if (!container || !baseCanvas) return

    const styles = getComputedStyle(document.documentElement)
    const violet = styles.getPropertyValue('--violet').trim() || '#8b5cf6'
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function render() {
      const { width, height } = container.getBoundingClientRect()
      if (width === 0 || height === 0) return

      // Muster nur bei echter BREITEN-Aenderung neu erzeugen — sonst wuerde
      // jede hoehenbedingte Adressleisten-Animation beim Scrollen ein
      // komplett neues Zufallsmuster erzeugen (Math.random()-Startpunkte).
      if (!pathsRef.current || Math.round(width) !== lastWidthRef.current) {
        pathsRef.current = generatePaths(width, height)
        lastWidthRef.current = Math.round(width)
      }
      const paths = pathsRef.current

      for (const canvas of [baseCanvas, revealCanvas]) {
        if (!canvas) continue
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        const ctx = canvas.getContext('2d')
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      drawPaths(baseCanvas.getContext('2d'), paths, violet, hoverCapable ? 0.08 : 0.12)
      if (revealCanvas && hoverCapable) drawPaths(revealCanvas.getContext('2d'), paths, violet, 0.45)
    }

    render()

    // Debounced: auf Mobile loest Ein-/Ausblenden der Adressleiste beim
    // Scrollen wiederholte Resize-Events aus. Ohne Debounce wuerde das
    // komplette Linien-Muster (Noise-Tracing) mehrfach pro Scroll-Geste neu
    // berechnet werden.
    let resizeTimer = null
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(render, 200)
    })
    resizeObserver.observe(container)
    return () => {
      clearTimeout(resizeTimer)
      resizeObserver.disconnect()
    }
  }, [hoverCapable])

  useEffect(() => {
    // Bei Animationen aus: keinerlei Reveal-/Cursor-Interaktion, nur die
    // statische Basis-Ebene wird gezeigt.
    if (!hoverCapable) return
    const container = containerRef.current
    if (!container) return

    function handlePointerMove(x, y) {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        container.style.setProperty('--mx', `${x - rect.left}px`)
        container.style.setProperty('--my', `${y - rect.top}px`)
        rafRef.current = null
      })
    }

    function onPointerMove(e) {
      handlePointerMove(e.clientX, e.clientY)
    }

    // pointerdown zusaetzlich zu pointermove: ein reines Antippen auf dem
    // Handy (ohne Ziehen) feuert kein pointermove — ohne das wuerde der
    // Leucht-Effekt beim ersten Touch nicht am Tipp-Punkt erscheinen.
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerMove)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [hoverCapable])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 -z-10 overflow-hidden bg-[--linen] ${className}`}
      style={{
        '--mx': '50%',
        '--my': '50%',
        // Eigene Compositing-Ebene erzwingen: ohne das ruckelt/wandert der
        // fixe Hintergrund auf iOS/Android beim Scrollen sichtbar hinterher.
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <canvas ref={baseCanvasRef} className="absolute inset-0" />
      {hoverCapable && (
        <canvas
          ref={revealCanvasRef}
          className="absolute inset-0"
          style={{
            WebkitMaskImage: 'radial-gradient(circle 120px at var(--mx) var(--my), black 0%, transparent 100%)',
            maskImage: 'radial-gradient(circle 120px at var(--mx) var(--my), black 0%, transparent 100%)',
          }}
        />
      )}
    </div>
  )
}
