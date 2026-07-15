import SectionReveal from './SectionReveal.jsx'
import { ArrowUpRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section id="kontakt" className="section">
      <div className="container-px">
        <SectionReveal className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#2E1A47] to-[#4C2E7A] px-6 py-16 text-center sm:px-12 lg:py-20">
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
            <a href="mailto:hallo@avan-agency.de" className="btn-white mt-8 text-base">
              Termin vereinbaren <ArrowUpRight size={18} />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
