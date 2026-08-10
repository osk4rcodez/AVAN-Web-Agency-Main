import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion-variants.js'
import { ImageComparison } from './ui/image-comparison-slider.jsx'
import { SpadeHero } from './ui/spade-hero.jsx'
import { BadWebsite } from './ui/bad-website.jsx'
import { BrowserFrame } from './ui/browser-frame.jsx'
import { useMotionPreference } from '../lib/motion-preference.jsx'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useTranslate } from '../lib/language-preference.jsx'

export default function WebsiteComparison() {
  const t = useTranslate()
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
            {t({ de: 'Vorher / Nachher', en: 'Before / after' })}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold sm:text-4xl">
            {t({ de: 'So viel Unterschied macht eine echte Website.', en: 'This is the difference a real website makes.' })}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-ink/70">
            {t({
              de: 'Ziehen Sie den Regler und sehen Sie, was aus einem veralteten Auftritt werden kann — klar, schnell und auf jedem Gerät überzeugend.',
              en: 'Drag the slider and see what an outdated presence can become — clear, fast, and convincing on every device.',
            })}
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
            <span className="text-xs font-semibold uppercase tracking-wider text-navy sm:text-sm">{t({ de: 'Nachher', en: 'After' })}</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink/50 sm:text-sm">{t({ de: 'Vorher', en: 'Before' })}</span>
          </div>
          {reduceMotion ? (
            <>
              <ImageComparison
                beforeImage="/before-website.svg"
                afterImage="/after-website.svg"
                altBefore={t({ de: 'Veralteter Website-Auftritt mit grauem, generischem Layout', en: 'Outdated website with a grey, generic layout' })}
                altAfter={t({ de: 'Moderner AVAN-Website-Auftritt mit klarem, markenstarkem Design', en: 'Modern AVAN website with a clear, on-brand design' })}
              />
              <p className="mt-3 text-center text-xs text-ink/50 sm:text-sm">
                {t({ de: 'Tipp: Animationen oben einschalten, um die interaktive Live-Vorschau zu sehen.', en: 'Tip: turn on animations above to see the interactive live preview.' })}
              </p>
            </>
          ) : showBrowserChrome ? (
            <BrowserFrame draggable={!isMobile}>
              <ImageComparison
                altBefore={t({ de: 'Veralteter Website-Auftritt mit grellen Farben und Comic Sans', en: 'Outdated website with garish colors and Comic Sans' })}
                beforeContent={<BadWebsite />}
                afterContent={<SpadeHero />}
                bare
              />
            </BrowserFrame>
          ) : (
            <ImageComparison
              altBefore={t({ de: 'Veralteter Website-Auftritt mit grellen Farben und Comic Sans', en: 'Outdated website with garish colors and Comic Sans' })}
              beforeContent={<BadWebsite />}
              afterContent={<SpadeHero />}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
