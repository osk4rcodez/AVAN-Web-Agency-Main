import { useState, useRef, useCallback, useEffect } from 'react'

// Vergleichs-Slider: zeigt zwei Bilder uebereinander, per Ziehen des Griffs
// wird der Anteil des "Nachher"-Bildes freigelegt.
export function ImageComparison({
  beforeImage,
  beforeContent,
  afterImage,
  afterContent,
  altBefore = 'Vorher',
  altAfter = 'Nachher',
  className = '',
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = useCallback(
    (clientX) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      let newPosition = ((clientX - rect.left) / rect.width) * 100
      newPosition = Math.max(0, Math.min(100, newPosition))
      setSliderPosition(newPosition)
    },
    [isDragging]
  )

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e) => handleMove(e.clientX)

  const handleTouchStart = () => setIsDragging(true)
  const handleTouchEnd = () => setIsDragging(false)
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX)

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden rounded-2xl border border-navy/10 shadow-cardHover ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Vorher: immer die unterste Ebene, egal was oben (Nachher) zeigt. */}
      {beforeContent ? (
        // Normaler Fluss (nicht absolute) — legt wie das Vorher-Bild die
        // Hoehe des gesamten Containers fest (aspect-[3/2] entspricht dem
        // Seitenverhaeltnis der SVG-Platzhalter, 1200x800).
        <div className="relative z-0 aspect-[3/2] w-full overflow-hidden">{beforeContent}</div>
      ) : (
        <img
          src={beforeImage}
          alt={altBefore}
          className="relative z-0 block h-full w-full object-cover object-left"
          draggable="false"
        />
      )}

      {/* Nachher: klar per clip-path auf den Regler-Anteil begrenzt, liegt
          per z-index sicher ueber der Vorher-Ebene — nichts vom Vorher-
          Inhalt kann hier durchscheinen. */}
      <div
        className="absolute inset-0 z-10 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {afterContent ? (
          <div className="h-full w-full overflow-hidden">{afterContent}</div>
        ) : (
          <img src={afterImage} alt={altAfter} className="h-full w-full object-cover object-left" draggable="false" />
        )}
      </div>

      <div
        className="absolute top-0 bottom-0 z-20 flex w-1.5 cursor-ew-resize items-center justify-center bg-white/80"
        style={{ left: `calc(${sliderPosition}% - 0.375rem)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 ease-in-out ${
            isDragging ? 'scale-110 shadow-xl' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-navy"
          >
            <line x1="15" y1="18" x2="9" y2="12"></line>
            <line x1="9" y1="6" x2="15" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  )
}
