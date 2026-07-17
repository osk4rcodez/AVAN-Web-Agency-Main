import SectionReveal from './SectionReveal.jsx'
import { LiquidMetalButton } from './ui/liquid-metal-button.jsx'

export default function FinalCTA() {
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
              Bereit für Ihre neue Website?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-silver">
              Lassen Sie uns in einem kurzen, unverbindlichen Gespräch besprechen, wie wir
              Ihnen helfen können.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#kontakt" className="inline-flex" data-open-project-modal>
                <LiquidMetalButton label="Projekt starten" width={190} />
              </a>
              <a href="#kontakt" className="inline-flex" data-open-appointment-modal>
                <LiquidMetalButton label="Termin vereinbaren" width={210} />
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
