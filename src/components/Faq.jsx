import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { EASE, fadeUp, stagger } from '../lib/motion-variants.js'
import { useMediaQuery } from '../lib/use-media-query.js'
import { useTranslate } from '../lib/language-preference.jsx'

const faqs = [
  {
    id: 'was-macht-avan',
    q: { de: 'Was genau macht AVAN für mich?', en: 'What exactly does AVAN do for me?' },
    a: {
      de: 'Wir konzipieren, bauen und betreiben Ihre Website — von der ersten Idee über Design und Entwicklung bis zu Hosting, Pflege und Support. Sie bekommen alles aus einer Hand und sprechen dabei direkt mit den Gründern, nicht mit einer anonymen Hotline.',
      en: 'We design, build and run your website — from the first idea through design and development to hosting, maintenance and support. You get everything from a single source and speak directly with the founders, not an anonymous hotline.',
    },
  },
  {
    id: 'ablauf',
    q: { de: 'Wie läuft der Ablauf ab?', en: 'How does the process work?' },
    a: {
      de: 'In vier Schritten: Erstgespräch, Konzept & Design, Entwicklung & Launch, danach laufende Betreuung. Sie sehen das Konzept, bevor wir entwickeln, und bleiben auch nach dem Live-Gang an Bord.',
      en: 'In four steps: initial consultation, concept & design, development & launch, then ongoing support. You see the concept before we develop, and we stay on board even after launch.',
    },
  },
  {
    id: 'wie-schnell',
    q: { de: 'Wie schnell ist meine Website online?', en: 'How quickly will my website be live?' },
    a: {
      de: 'Das hängt vom Umfang ab. Eine schlanke Website ist oft innerhalb weniger Wochen live; umfangreichere Projekte planen wir gemeinsam im Erstgespräch terminlich ein.',
      en: 'That depends on the scope. A lean website is often live within a few weeks; larger projects we schedule together during the initial consultation.',
    },
  },
  {
    id: 'kosten',
    q: { de: 'Was kostet eine Website bei euch?', en: 'What does a website cost with you?' },
    a: {
      de: 'Wir arbeiten mit klaren, Festpreis-Angeboten — keine versteckten Kosten. Die genaue Summe stimmen wir im persönlichen Gespräch ab, passend zu Ihrem Vorhaben.',
      en: 'We work with clear, fixed-price offers — no hidden costs. We agree on the exact amount in a personal conversation, matched to your project.',
    },
  },
  {
    id: 'nach-launch',
    q: { de: 'Was ist nach dem Launch enthalten?', en: 'What’s included after launch?' },
    a: {
      de: 'Hosting, Updates, Sicherheits-Checks und Support. Wir kümmern uns laufend um den Betrieb, damit Sie sich auf Ihr Geschäft konzentrieren können.',
      en: 'Hosting, updates, security checks and support. We continuously take care of operations so you can focus on your business.',
    },
  },
  {
    id: 'selbst-aendern',
    q: { de: 'Kann ich meine Inhalte später selbst ändern?', en: 'Can I change my content myself later?' },
    a: {
      de: 'Ja. Wir übergeben Ihnen eine leicht bedienbare Lösung und erklären Ihnen das Nötigste — und wenn Sie lieber wollen, dass wir die Pflege übernehmen, machen wir das.',
      en: 'Yes. We hand over an easy-to-use solution and explain the essentials — and if you’d rather have us handle the maintenance, we’ll do that.',
    },
  },
]

function FaqItem({ item, isOpen, onToggle, t }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-mist/40"
      >
        <span className="text-base font-semibold text-navy">{t(item.q)}</span>
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent transition-colors ${
            isOpen ? 'bg-accent text-white' : 'bg-white'
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-ink/70">{t(item.a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [openIndex, setOpenIndex] = useState(-1)
  const t = useTranslate()

  return (
    <section id="faq" className="section">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {t({ de: 'Häufige Fragen.', en: 'Frequently asked questions.' })}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            {t({
              de: 'Das Wichtigste zu Ablauf, Kosten und Betreuung — kurz zusammengefasst.',
              en: 'The essentials on process, cost and support — summarized briefly.',
            })}
          </p>
        </div>

        {isMobile ? (
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.id}
                item={item}
                t={t}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger(0.06)}
            className="mt-12 grid gap-4 lg:grid-cols-2"
          >
            {faqs.map((item, i) => (
              <motion.div key={item.id} variants={fadeUp}>
                <FaqItem
                  item={item}
                  t={t}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
