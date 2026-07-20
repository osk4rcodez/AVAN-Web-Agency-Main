'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button"
import { useMediaQuery } from "../../lib/use-media-query.js"
import { useMotionPreference } from "../../lib/motion-preference.jsx"

export function SplineSceneBasic() {
  const robotRef = useRef(null)
  const isInView = useInView(robotRef, { once: true, margin: '-100px' })
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { reduceMotion: prefersReducedMotion } = useMotionPreference()

  return (
    <Card className="w-full h-auto md:h-[650px] bg-gradient-to-br from-navy/80 via-navy/70 to-purple-900/50 rounded-[2rem] shadow-cardHover relative overflow-hidden border-white/10">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#8b5cf6"
      />

      <div className="flex flex-col h-full md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center items-center md:items-start">
          <p className="eyebrow mb-4 text-lilac/90">AVAN Web Agency</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-lilac to-accent -mt-2 pb-1">
            Ihr digitaler Auftritt
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/90 leading-relaxed text-center md:text-left">
            Wir bauen moderne, schnelle Websites für lokale Unternehmen — von der
            Bäckerei bis zum Ferienhotel. Reduziert, durchdacht, mit echtem Handwerk
            statt Baukasten.
          </p>
          <div className="mt-7 w-full flex justify-center md:justify-start">
            <a href="#kontakt" className="inline-flex rounded-full" data-open-project-modal>
              <LiquidMetalButton label="Projekt starten" width={240} />
            </a>
          </div>
        </div>

        {/* Right content - Robot with scroll animation */}
        <div className="flex-1 relative min-h-[266px] md:min-h-[450px] overflow-hidden">
          <motion.div
            ref={robotRef}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full min-h-[266px] md:min-h-[450px]"
          >
            {/* Auf Mobile: Canvas selbst 150% groesser rendern (nicht per
                CSS-scale hochziehen — das gaebe unscharfe/verpixelte Pixel),
                Ueberstand wird vom Elternelement (overflow-hidden) zugeschnitten. */}
            <div
              className={isMobile ? 'absolute' : 'w-full h-full'}
              style={
                isMobile
                  ? { width: '150%', height: '150%', left: '-25%', top: 'calc(-25% + 30px)' }
                  : undefined
              }
            >
              {isInView ? (
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}