import SectionReveal from './SectionReveal.jsx'

const tech = [
  'React',
  'Tailwind',
  'Node.js',
  'Vercel',
  'Cloudflare',
  'TypeScript',
  'Figma',
  'PostgreSQL',
]

export default function TrustBar() {
  return (
    <section className="border-y border-navy/5 bg-mist/60 py-8">
      <div className="container-px">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-silver">
          Technologien, mit denen wir arbeiten
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {tech.map((t) => (
            <SectionReveal
              key={t}
              as="span"
              className="font-display text-base font-bold tracking-tight text-navy/40 transition-colors hover:text-navy/70"
            >
              {t}
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
