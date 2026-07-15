import { fadeUp, stagger } from './SectionReveal.jsx'

function FounderCard({ initials, name, role }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy font-display text-xl font-extrabold text-white">
          {initials}
        </div>
        <div>
          <p className="font-bold text-navy">{name}</p>
          <p className="text-sm text-ink/60">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="ueber-uns" className="section">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-4">Über uns</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Zwei Gründer. Direkter Kontakt. Keine Hotline.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            AVAN wurde von Oskar Kielek und Kasum Caka gegründet — mit dem Ziel, Unternehmen
            einen unkomplizierten, persönlichen Zugang zu professionellen Websites zu bieten.
            Kein Callcenter, keine anonymen Tickets: bei AVAN sprechen Sie direkt mit den
            Menschen, die Ihre Website bauen und betreuen.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Wir sind ein junges Team — und genau das ist unser Vorteil: kurze Reaktionszeiten,
            flache Hierarchien und echtes Interesse an Ihrem Projekt. Sie bekommen keine
            Abteilung, Sie bekommen die Gründer.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FounderCard
            initials="OK"
            name="Oskar Kielek"
            role="Gründer, Entwicklung & Technik"
          />
          <FounderCard
            initials="KC"
            name="Kasum Caka"
            role="Gründer, Design & Kundenbetreuung"
          />
        </div>
      </div>
    </section>
  )
}
