import { motion, useDragControls } from 'framer-motion'
import { cn } from '../../lib/utils.js'

// Browser-Fensterrahmen (Ampel-Punkte + Adressleisten-Platzhalter), angelehnt
// an gaengige "Safari"-Mockups — reine Optik, kein echter Browser. Nur fuer
// die Live-Vorschau im Vorher/Nachher-Vergleich auf PC gedacht (siehe
// WebsiteComparison.jsx). Mit draggable=true laesst sich die ganze Karte per
// Ziehen an der oberen Leiste frei verschieben, wie ein Fenster auf dem Mac.
export function BrowserFrame({ children, className, draggable = false }) {
  const dragControls = useDragControls()

  const frame = (
    <div className={cn('flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-cardHover', className)}>
      <div
        onPointerDown={draggable ? (e) => dragControls.start(e) : undefined}
        className={`flex shrink-0 items-center gap-2 border-b border-navy/10 bg-mist/60 px-4 py-2.5 ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <div className="ml-3 h-5 max-w-md flex-1 rounded-md bg-navy/10" />
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  )

  if (!draggable) return frame

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.06}
      whileDrag={{ scale: 1.02, boxShadow: '0 24px 48px rgba(46,26,71,0.25)', zIndex: 50 }}
      className="relative h-full"
    >
      {frame}
    </motion.div>
  )
}
