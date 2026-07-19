import SectionReveal from './SectionReveal.jsx'
import { Quote } from 'lucide-react'

const placeholders = [
  { initial: 'A', company: 'Unternehmen A' },
  { initial: 'B', company: 'Unternehmen B' },
  { initial: 'C', company: 'Unternehmen C' },
]

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Referenzen</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Was unsere Kunden sagen.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            Echte Stimmen folgen, sobald die ersten Projekte live sind. Die Struktur steht
            bereit — wir launchen nicht mit erfundenen Zitaten.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {placeholders.map((p, i) => (
            <SectionReveal
              key={p.company}
              delay={i * 0.1}
              className="flex flex-col rounded-2xl border border-dashed border-navy/15 bg-mist/50 p-6"
            >
              <Quote size={28} className="text-silver" />
              <p className="mt-4 flex-1 text-base italic leading-relaxed text-ink/45">
                Hier kommt dein Zitat.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 font-bold text-navy">
                  {p.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">Name folgt</p>
                  <p className="text-xs text-silver">{p.company}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
