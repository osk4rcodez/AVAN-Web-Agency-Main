import SectionReveal from './SectionReveal.jsx'
import { Quote } from 'lucide-react'
import { useTranslate } from '../lib/language-preference.jsx'

const placeholders = [
  {
    id: 'a',
    initial: 'G',
    name: 'Grzegorz Kielek',
    company: { de: 'Inspektion', en: 'Inspektion' },
    quote: {
      de: 'Die Jungs von AVAN haben richtig gute Arbeit für Inspektion geleistet — schnell, zuverlässig und genau das, was wir gebraucht haben.',
      en: 'The guys at AVAN did really great work for Inspektion — fast, reliable, and exactly what we needed.',
    },
  },
  { id: 'b', initial: 'B', company: { de: 'Unternehmen B', en: 'Company B' } },
  { id: 'c', initial: 'C', company: { de: 'Unternehmen C', en: 'Company C' } },
]

export default function Testimonials() {
  const t = useTranslate()
  return (
    <section className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{t({ de: 'Referenzen', en: 'References' })}</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {t({ de: 'Was unsere Kunden sagen.', en: 'What our clients say.' })}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            {t({
              de: 'Weitere echte Stimmen folgen, sobald mehr Projekte live sind — wir launchen nicht mit erfundenen Zitaten.',
              en: 'More real voices will follow as more projects go live — we don’t launch with made-up quotes.',
            })}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {placeholders.map((p, i) => (
            <SectionReveal
              key={p.id}
              delay={i * 0.1}
              className={
                p.quote
                  ? 'flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card'
                  : 'flex flex-col rounded-2xl border border-dashed border-navy/15 bg-mist/50 p-6'
              }
            >
              <Quote size={28} className={p.quote ? 'text-accent' : 'text-silver'} />
              <p className={`mt-4 flex-1 text-base leading-relaxed ${p.quote ? 'text-ink/80' : 'italic text-ink/45'}`}>
                {p.quote ? t(p.quote) : t({ de: 'Hier kommt dein Zitat.', en: 'Your quote goes here.' })}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 font-bold text-navy">
                  {p.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">
                    {p.name || t({ de: 'Name folgt', en: 'Name coming soon' })}
                  </p>
                  <p className="text-xs text-silver">{t(p.company)}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
