import SectionReveal from './SectionReveal.jsx'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'
import { useTranslate } from '../lib/language-preference.jsx'

export default function FinalCTA() {
  const t = useTranslate()
  return (
    <section id="kontakt" className="section">
      <div className="container-px">
        <SectionReveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2E1A47] to-[#4C2E7A] px-6 py-16 text-center sm:px-12 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 80% at 80% 0%, rgba(167,139,250,0.45), transparent 60%)',
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {t({ de: 'Bereit für Ihre neue Website?', en: 'Ready for your new website?' })}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-silver">
              {t({
                de: 'Lassen Sie uns in einem kurzen, unverbindlichen Gespräch besprechen, wie wir Ihnen helfen können.',
                en: 'Let’s discuss in a short, no-obligation call how we can help you.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#kontakt" className="inline-flex" data-open-project-modal>
                <LiquidMetalButton label={t({ de: 'Projekt starten', en: 'Start project' })} width={190} />
              </a>
              <a href="#kontakt" className="inline-flex" data-open-appointment-modal>
                <LiquidMetalButton label={t({ de: 'Termin vereinbaren', en: 'Schedule a call' })} width={210} />
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
