import { useEffect, useRef, useState } from 'react'
import { createNoise2D } from 'simplex-noise'

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

  const [hoverCapable] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

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

      const paths = generatePaths(width, height)

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
      if (revealCanvas) drawPaths(revealCanvas.getContext('2d'), paths, violet, 0.45)
    }

    render()
    const resizeObserver = new ResizeObserver(render)
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [hoverCapable])

  useEffect(() => {
    if (!hoverCapable) return
    const container = containerRef.current
    if (!container) return

    function onPointerMove(e) {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        container.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        container.style.setProperty('--my', `${e.clientY - rect.top}px`)
        rafRef.current = null
      })
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [hoverCapable])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 -z-10 overflow-hidden bg-[--linen] ${className}`}
      style={{ '--mx': '50%', '--my': '50%' }}
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
