import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion-variants.js'
import { Plus, Linkedin } from 'lucide-react'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useTranslate } from '../lib/language-preference.jsx'

const LINKEDIN_URL =
  'https://www.linkedin.com/in/avan-web-agency-a03566422?utm_source=share_via&utm_content=profile&utm_medium=member_ios'

function LinkedInLink({ t }) {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-navy"
    >
      <Linkedin size={18} />
      {t({ de: 'AVAN auf LinkedIn', en: 'AVAN on LinkedIn', pl: 'AVAN na LinkedIn' })}
    </a>
  )
}

function TrustCard({ t }) {
  return (
    <div className="mt-6 flex w-fit items-center gap-4 rounded-2xl border border-navy/10 bg-white/60 p-3 pr-5 backdrop-blur-sm lg:ml-auto">
      <div className="flex -space-x-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-accent to-navy text-sm font-bold text-white">
          A
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-navy to-accent text-sm font-bold text-white">
          V
        </span>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-navy">{t({ de: 'Direkt von den Gründern', en: 'Straight from the founders', pl: 'Bezpośrednio od założycieli' })}</p>
        <p className="text-xs text-ink/60">{t({ de: 'Antwort in der Regel innerhalb eines Tages', en: 'Reply usually within one day', pl: 'Odpowiedź zwykle w ciągu jednego dnia' })}</p>
      </div>
    </div>
  )
}

function FounderCard({ photo, name, role, slug, delay = 0, imgClass = '', t }) {
  return (
    <motion.button
      type="button"
      data-open-founder={slug}
      variants={fadeUp}
      transition={{ delay }}
      aria-label={`${t({ de: 'Mehr über', en: 'Learn more about', pl: 'Więcej o' })} ${name}`}
      className="group relative w-full rounded-2xl border border-navy/10 bg-white p-6 text-left shadow-card transition-shadow duration-300 hover:shadow-cardHover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/25"
    >
      <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-2xl">
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${imgClass}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/25" />
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-card transition-all duration-300 group-hover:opacity-100">
          <Plus size={18} />
        </span>
      </div>
      <p className="font-bold text-navy">{name}</p>
      <p className="text-sm text-ink/60">{role}</p>
      <p className="mt-2 text-xs font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {t({ de: 'Mehr erfahren →', en: 'Learn more →', pl: 'Dowiedz się więcej →' })}
      </p>
    </motion.button>
  )
}

export default function About() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const t = useTranslate()

  const roleOskar = t({ de: 'Entwicklung, Technik & Design', en: 'Development, tech & design', pl: 'Rozwój, technika i design' })
  const roleKasum = t({ de: 'Entwicklung, Design & Kundenbetreuung', en: 'Development, design & client care', pl: 'Rozwój, design i obsługa klienta' })

  if (isMobile) {
    return (
      <section id="ueber-uns" className="section">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{t({ de: 'Über uns', en: 'About us', pl: 'O nas' })}</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              {t({ de: 'Zwei Gründer. Direkter Kontakt. Keine Hotline.', en: 'Two founders. Direct contact. No hotline.', pl: 'Dwóch założycieli. Bezpośredni kontakt. Bez infolinii.' })}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              {t({
                de: 'AVAN wurde von Oskar Kielek und Kasum Caka gegründet — mit dem Ziel, Unternehmen einen unkomplizierten, persönlichen Zugang zu professionellen Websites zu bieten. Kein Callcenter, keine anonymen Tickets: bei AVAN sprechen Sie direkt mit den Menschen, die Ihre Website bauen und betreuen.',
                en: 'AVAN was founded by Oskar Kielek and Kasum Caka — with the goal of giving businesses uncomplicated, personal access to professional websites. No call center, no anonymous tickets: at AVAN you speak directly with the people who build and maintain your website.',
                pl: 'AVAN zostało założone przez Oskara Kieleka i Kasuma Cakę — z celem zapewnienia firmom nieskomplikowanego, osobistego dostępu do profesjonalnych stron internetowych. Bez call center, bez anonimowych zgłoszeń: w AVAN rozmawiasz bezpośrednio z ludźmi, którzy budują i utrzymują Twoją stronę.',
              })}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              {t({
                de: 'Wir sind ein junges Team — und genau das ist unser Vorteil: kurze Reaktionszeiten, flache Hierarchien und echtes Interesse an Ihrem Projekt. Sie bekommen keine Abteilung, Sie bekommen die Gründer.',
                en: 'We’re a young team — and that’s exactly our advantage: short response times, flat hierarchies and genuine interest in your project. You don’t get a department, you get the founders.',
                pl: 'Jesteśmy młodym zespołem — i właśnie to jest naszym atutem: krótki czas reakcji, płaskie hierarchie i prawdziwe zainteresowanie Twoim projektem. Nie dostajesz działu, dostajesz założycieli.',
              })}
            </p>
            <LinkedInLink t={t} />
            <TrustCard t={t} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FounderCard photo="/oskar-kielek.jpg" name="Oskar Kielek" role={roleOskar} slug="oskar" t={t} />
            <FounderCard
              photo="/kasum-caka.jpg"
              name="Kasum Caka"
              role={roleKasum}
              slug="kasum"
              imgClass="object-[75%_25%] [filter:saturate(0.95)_hue-rotate(-8deg)]"
              t={t}
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="ueber-uns" className="section">
      <motion.div
        className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger(0.1)}
      >
        <motion.div variants={fadeUp}>
          <p className="eyebrow mb-4">{t({ de: 'Über uns', en: 'About us', pl: 'O nas' })}</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {t({ de: 'Zwei Gründer. Direkter Kontakt. Keine Hotline.', en: 'Two founders. Direct contact. No hotline.', pl: 'Dwóch założycieli. Bezpośredni kontakt. Bez infolinii.' })}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            {t({
              de: 'AVAN wurde von Oskar Kielek und Kasum Caka gegründet — mit dem Ziel, Unternehmen einen unkomplizierten, persönlichen Zugang zu professionellen Websites zu bieten. Kein Callcenter, keine anonymen Tickets: bei AVAN sprechen Sie direkt mit den Menschen, die Ihre Website bauen und betreuen.',
              en: 'AVAN was founded by Oskar Kielek and Kasum Caka — with the goal of giving businesses uncomplicated, personal access to professional websites. No call center, no anonymous tickets: at AVAN you speak directly with the people who build and maintain your website.',
            })}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            {t({
              de: 'Wir sind ein junges Team — und genau das ist unser Vorteil: kurze Reaktionszeiten, flache Hierarchien und echtes Interesse an Ihrem Projekt. Sie bekommen keine Abteilung, Sie bekommen die Gründer.',
              en: 'We’re a young team — and that’s exactly our advantage: short response times, flat hierarchies and genuine interest in your project. You don’t get a department, you get the founders.',
            })}
          </p>
          <LinkedInLink t={t} />
          <TrustCard t={t} />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
          <FounderCard photo="/oskar-kielek.jpg" name="Oskar Kielek" role={roleOskar} slug="oskar" delay={0} t={t} />
          <FounderCard
            photo="/kasum-caka.jpg"
            name="Kasum Caka"
            role={roleKasum}
            slug="kasum"
            delay={0.1}
            imgClass="object-[75%_25%] [filter:saturate(0.95)_hue-rotate(-8deg)]"
            t={t}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
