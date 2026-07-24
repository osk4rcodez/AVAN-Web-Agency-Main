import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion-variants.js'
import { ImageComparison } from './ui/image-comparison-slider.jsx'
import { SpadeHero } from './ui/spade-hero.jsx'
import { BadWebsite } from './ui/bad-website.jsx'
import { BrowserFrame } from './ui/browser-frame.jsx'
import { useMotionPreference } from '../lib/motion-preference.jsx'
import { useMediaQuery } from '../lib/use-media-query.js'

export default function WebsiteComparison() {
  const { reduceMotion } = useMotionPreference()
  const isMobile = useMediaQuery('(max-width: 768px)')
  // Der Browser-Rahmen (Ampel-Punkte + Adressleiste) zeigt sich bei
  // aktivierten Animationen auf PC UND Handy — das Herumziehen der Karte an
  // der oberen Leiste bleibt aber PC-only (auf dem Handy wuerde das mit dem
  // Scrollen/dem Regler kollidieren).
  const showBrowserChrome = !reduceMotion

  return (
    <section className="section pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
      <div className="container-px">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.1)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            Vorher / Nachher
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold sm:text-4xl">
            So viel Unterschied macht eine echte Website.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-ink/70">
            Ziehen Sie den Regler und sehen Sie, was aus einem veralteten Auftritt werden kann —
            klar, schnell und auf jedem Gerät überzeugend.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-navy sm:text-sm">Nachher</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink/50 sm:text-sm">Vorher</span>
          </div>
          {reduceMotion ? (
            <>
              <ImageComparison
                beforeImage="/before-website.svg"
                afterImage="/after-website.svg"
                altBefore="Veralteter Website-Auftritt mit grauem, generischem Layout"
                altAfter="Moderner AVAN-Website-Auftritt mit klarem, markenstarkem Design"
              />
              <p className="mt-3 text-center text-xs text-ink/50 sm:text-sm">
                Tipp: Animationen oben einschalten, um die interaktive Live-Vorschau zu sehen.
              </p>
            </>
          ) : showBrowserChrome ? (
            <BrowserFrame draggable={!isMobile}>
              <ImageComparison
                altBefore="Veralteter Website-Auftritt mit grellen Farben und Comic Sans"
                beforeContent={<BadWebsite />}
                afterContent={<SpadeHero />}
                bare
              />
            </BrowserFrame>
          ) : (
            <ImageComparison
              altBefore="Veralteter Website-Auftritt mit grellen Farben und Comic Sans"
              beforeContent={<BadWebsite />}
              afterContent={<SpadeHero />}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
